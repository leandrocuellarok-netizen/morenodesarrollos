"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { spawn } = require("node:child_process");
const { chromium } = require("playwright");

const ROOT = path.resolve(__dirname, "..");
const { all: mapInventory, filterReferences } = require("../assets/js/mapa-ia.js");
const expectedDiligenceCounts = {
  complete: filterReferences(mapInventory, { diligence: "complete" }).length,
  pending: filterReferences(mapInventory, { diligence: "pending" }).length
};
const PORT = 4173;
const BASE_URL = `http://127.0.0.1:${PORT}`;
const ROUTES = [
  { slug: "inicio", path: "/", navigation: true },
  { slug: "mapa-ia", path: "/mapa-ia/", navigation: false },
  { slug: "sobre-erica", path: "/erica-acosta/", navigation: true },
  { slug: "oportunidades", path: "/oportunidades/", navigation: true },
  { slug: "mesa-operativa", path: "/mesa-operativa/", navigation: false }
];
const WIDTHS = [320, 360, 390, 768, 1024, 1440];
const failures = [];

function check(condition, message) {
  if (!condition) {
    failures.push(message);
    console.error(`FAIL: ${message}`);
  }
}

const publishedRecords = mapInventory.filter(record => record && record.type === "published");
const publishedIds = publishedRecords.map(record => record.id);
const publishedSources = publishedRecords.map(record => record.source);
check(publishedRecords.length > 0, "mapa-ia: la capa de propiedades y desarrollos publicados no está vacía");
check(new Set(publishedIds).size === publishedIds.length, "mapa-ia: los identificadores de publicaciones son únicos");
check(new Set(publishedSources).size === publishedSources.length, "mapa-ia: los enlaces primarios de publicaciones son únicos");
check(publishedRecords.every(record => record.id && record.recordType && record.name && record.address && record.source && record.availabilityStatus && record.verificationStatus && record.geolocationStatus), "mapa-ia: cada publicación conserva identificación, fuente y estados de verificación/geolocalización");
check(publishedRecords.every(record => record.availabilityStatus !== "Confirmada"), "mapa-ia: ningún aviso publicado se presenta como disponibilidad comercial confirmada");
check(publishedRecords.every(record => (record.lat == null) === (record.lng == null) && !(record.geocodeDisabled === true && (record.lat != null || record.lng != null))), "mapa-ia: las coordenadas no están incompletas ni asignadas a registros con geolocalización deshabilitada");

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function auditHomeCartography(page) {
  const markers = await page.locator(".territory-marker").evaluateAll(elements => elements.map(element => ({
    id: element.dataset.id,
    kind: element.dataset.kind,
    lat: Number(element.dataset.lat),
    lng: Number(element.dataset.lng),
    x: Number(element.dataset.x),
    y: Number(element.dataset.y)
  })));
  const source = fs.readFileSync(path.join(ROOT, "assets/js/mapa-ia.js"), "utf8");

  function readRecords(name, defaultKind) {
    const match = source.match(new RegExp("const " + name + "=\\[([\\s\\S]*?)\\];"));
    if (!match) return [];
    return (match[1].match(/\{[^{}]*\}/g) || []).map(entry => {
      const id = entry.match(/id:"([^"]+)"/);
      const lat = entry.match(/lat:([-0-9.]+)/);
      const lng = entry.match(/lng:([-0-9.]+)/);
      const stage = entry.match(/stage:"([^"]+)"/);
      const coordinateSource = entry.match(/coordinateSource:"([^"]+)"/);
      const coordinateCheckedAt = entry.match(/coordinateCheckedAt:"([^"]+)"/);
      return {
        id: id ? id[1] : null,
        lat: lat ? Number(lat[1]) : NaN,
        lng: lng ? Number(lng[1]) : NaN,
        sourceUrl: coordinateSource ? coordinateSource[1] : null,
        checkedAt: coordinateCheckedAt ? coordinateCheckedAt[1] : null,
        kind: defaultKind === "locality" ? "locality" : (stage ? stage[1] : null)
      };
    });
  }

  const allRecords = [
    ...readRecords("localities", "locality"),
    ...readRecords("opportunities", "reference")
  ];
  const expected = allRecords.filter(record =>
    Number.isFinite(record.lat) &&
    Number.isFinite(record.lng) &&
    /^https:\/\//.test(record.sourceUrl || "") &&
    /^\d{4}-\d{2}-\d{2}$/.test(record.checkedAt || "")
  );
  const expectedCounts = expected.reduce((counts, record) => {
    counts[record.kind] = (counts[record.kind] || 0) + 1;
    return counts;
  }, {});
  const expectedById = new Map(expected.map(record => [record.id, record]));
  check(markers.length === expected.length, "inicio: el plano solo muestra referencias con coordenadas, fuente y fecha verificables");
  check(expectedCounts.locality === 6 && markers.filter(marker => marker.kind === "locality").length === 6, "inicio: el plano conserva las seis localidades con fuente trazable");
  check(expectedCounts.documented === 1 && markers.filter(marker => marker.kind === "documented").length === 1, "inicio: el plano muestra únicamente el contexto documentado con coordenada trazable");
  check((expectedCounts.hypothesis || 0) === 0 && markers.filter(marker => marker.kind === "hypothesis").length === 0, "inicio: las hipótesis sin coordenada trazable permanecen sin marcador");
  check(new Set(markers.map(marker => marker.id)).size === markers.length, "inicio: los identificadores del plano no están duplicados");

  for (const marker of markers) {
    const record = expectedById.get(marker.id);
    check(Boolean(record), "inicio: " + marker.id + " existe en el inventario del Mapa IA");
    if (!record) continue;
    check(Math.abs(marker.lat - record.lat) < 0.000001 && Math.abs(marker.lng - record.lng) < 0.000001, "inicio: " + marker.id + " conserva las coordenadas de su ficha");
    check(marker.kind === record.kind, "inicio: " + marker.id + " conserva su clasificación de evidencia");
    const expectedX = 78 + ((record.lng + 58.9) / 0.18) * 600;
    const expectedY = 430 - ((record.lat + 34.69) / 0.15) * 352;
    check(Math.abs(marker.x - expectedX) < 0.16 && Math.abs(marker.y - expectedY) < 0.16, "inicio: " + marker.id + " está colocado según su coordenada geográfica");
  }

  check(await page.locator("body.home-page").count() === 1, "inicio: la portada usa su sistema editorial específico");
  check(await page.locator(".home-map-plate .territory-diagram[role='img']").count() === 1, "inicio: el plano editorial tiene descripción accesible");
  check(await page.locator(".home-map-plate figcaption").textContent().then(text => text.includes("no representa límites municipales")), "inicio: el plano aclara que no representa límites municipales");
  check(await page.locator(".architecture-drawing").count() === 1, "inicio: la portada incorpora una única lámina arquitectónica");
  const drawingText = await page.locator(".architecture-drawing").textContent();
  check(drawingText.includes("ESTUDIO VOLUMÉTRICO") && drawingText.includes("no corresponde a un inmueble identificado"), "inicio: la lámina identifica el dibujo como estudio conceptual");
}

async function startServer() {
  const server = spawn("python3", ["-m", "http.server", String(PORT), "--bind", "127.0.0.1"], {
    cwd: ROOT,
    stdio: "ignore"
  });
  for (let attempt = 0; attempt < 60; attempt += 1) {
    try {
      const response = await fetch(BASE_URL);
      if (response.ok) return server;
    } catch (_) {
      await delay(200);
    }
  }
  server.kill("SIGTERM");
  throw new Error("No se pudo iniciar el servidor HTTP local para la auditoría.");
}

async function auditRoute(browser, route) {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
    deviceScaleFactor: 1
  });
  const pageErrors = [];
  const localRequestFailures = [];
  page.on("pageerror", error => pageErrors.push(error.message));
  page.on("requestfailed", request => {
    try {
      const url = new URL(request.url());
      if (url.hostname === "127.0.0.1") localRequestFailures.push(url.pathname);
    } catch (_) {}
  });

  try {
    const response = await page.goto(BASE_URL + route.path, { waitUntil: "domcontentloaded" });
    check(Boolean(response && response.ok()), `${route.slug}: HTTP ${response ? response.status() : "sin respuesta"}`);

    await page.locator("main#main-content").waitFor({ state: "attached", timeout: 5000 }).catch(() => {});
    const title = await page.title();
    const h1Count = await page.locator("main h1").count();
    check(Boolean(title.trim()), `${route.slug}: falta título de documento`);
    check(h1Count === 1, `${route.slug}: se esperaba un H1 dentro de main y se encontraron ${h1Count}`);
    if (route.slug === "inicio") {
      check(await page.locator('a[href="./mapa-ia/"]').count() >= 1, "inicio: el acceso al Mapa IA está presente");
      check(await page.locator('a[href="./erica-acosta/"]').count() >= 1, "inicio: el acceso a SOY MORENO está presente");
      check(await page.locator('a[href="./oportunidades/"]').count() >= 1, "inicio: el acceso a INFO PYME MORENO está presente");
      check(await page.locator(".hero-commercial-actions").isVisible(), "inicio: las acciones comerciales actuales están visibles");
      await auditHomeCartography(page);
    }
    if (route.slug === "sobre-erica") {
      check(await page.locator(".soy-moreno-hero").isVisible(), "SOY MORENO: la presentación principal está visible");
      check((await page.locator("h1").innerText()).toLowerCase().includes("soy moreno"), "SOY MORENO: el título identifica la sección vigente");
      check(await page.locator('a[href="../mapa-ia/"]').count() >= 1, "SOY MORENO: conserva el acceso al Mapa IA");
      check(await page.locator('a[href="../oportunidades/"]').count() >= 1, "SOY MORENO: conserva el acceso a INFO PYME MORENO");
    }
    check(await page.locator(".skip-link[href='#main-content']").count() === 1, `${route.slug}: falta el enlace único para saltar al contenido`);
    check(await page.locator("main#main-content[tabindex='-1']").count() === 1, `${route.slug}: falta el destino de foco del enlace de salto`);

    const skipRestingState = await page.locator(".skip-link").evaluate(element => ({ clipPath: getComputedStyle(element).clipPath, width: element.getBoundingClientRect().width, height: element.getBoundingClientRect().height }));
    check(skipRestingState.clipPath === "inset(50%)" && skipRestingState.width <= 1 && skipRestingState.height <= 1, `${route.slug}: el enlace de salto no está visualmente oculto cuando no recibe foco`);

    await page.keyboard.press("Tab");
    const skipFocused = await page.evaluate(() => document.activeElement?.matches(".skip-link") === true);
    check(skipFocused, `${route.slug}: el primer foco de teclado no llega al enlace de salto`);
    if (skipFocused) {
      const skipVisibleOnFocus = await page.locator(".skip-link").evaluate(element => { const rect = element.getBoundingClientRect(); return getComputedStyle(element).clipPath === "none" && rect.width > 1 && rect.height > 1; });
      check(skipVisibleOnFocus, `${route.slug}: el enlace de salto no se revela al recibir foco`);
      await page.keyboard.press("Enter");
      const mainFocused = await page.evaluate(() => document.activeElement?.id === "main-content");
      check(mainFocused, `${route.slug}: el enlace de salto no mueve el foco a main`);
      const skipHiddenAgain = await page.locator(".skip-link").evaluate(element => getComputedStyle(element).clipPath === "inset(50%)");
      check(skipHiddenAgain, `${route.slug}: el enlace de salto permanece visible después de usarlo`);
    }

    const imageResults = await page.locator("img").evaluateAll(async images => {
      return Promise.all(images.map(async image => {
        image.loading = "eager";
        try {
          await image.decode();
          return null;
        } catch (_) {
          return image.currentSrc || image.src || "(imagen sin URL)";
        }
      }));
    });
    for (const broken of imageResults.filter(Boolean)) {
      check(false, `${route.slug}: imagen no decodificable: ${broken}`);
    }

    if (route.navigation) {
      const currentLinks = await page.locator("#primary-navigation a[aria-current='page']").count();
      check(currentLinks === 1, `${route.slug}: se esperaba un único enlace activo en la navegación`);

      await page.setViewportSize({ width: 390, height: 844 });
      const menu = page.locator(".mobile-menu");
      const nav = page.locator("#primary-navigation");
      check(await menu.isVisible(), `${route.slug}: el botón de menú no es visible en móvil`);
      check(!(await nav.isVisible()), `${route.slug}: el menú móvil debe iniciar cerrado`);

      if (await menu.isVisible()) {
        await menu.click();
        check(await nav.isVisible(), `${route.slug}: el menú no se abre al activar el botón`);
        check(await menu.getAttribute("aria-expanded") === "true", `${route.slug}: aria-expanded no cambia al abrir`);
        await page.keyboard.press("Escape");
        check(!(await nav.isVisible()), `${route.slug}: Escape no cierra el menú`);
        check(await page.evaluate(() => document.activeElement?.classList.contains("mobile-menu") === true), `${route.slug}: Escape no devuelve el foco al botón`);
        check(await menu.getAttribute("aria-expanded") === "false", `${route.slug}: aria-expanded no se restablece al cerrar`);

        await menu.click();
        await page.locator("main").click({ position: { x: 5, y: 5 }, force: true });
        check(!(await nav.isVisible()), `${route.slug}: un clic fuera no cierra el menú`);
        check(await menu.getAttribute("aria-expanded") === "false", `${route.slug}: el estado ARIA no se actualiza al hacer clic fuera`);
      }

      await page.setViewportSize({ width: 1440, height: 1000 });
      check(await page.locator("#primary-navigation").isVisible(), `${route.slug}: la navegación de escritorio no está visible`);
      check(!(await page.locator(".mobile-menu").isVisible()), `${route.slug}: el botón móvil aparece en escritorio`);
    }

    for (const width of WIDTHS) {
      await page.setViewportSize({ width, height: 900 });
      await delay(60);
      const dimensions = await page.evaluate(() => ({
        viewport: window.innerWidth,
        document: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth)
      }));
      check(
        dimensions.document <= dimensions.viewport + 1,
        `${route.slug}: desbordamiento horizontal a ${width}px (documento ${dimensions.document}px)`
      );
    }

    if (route.slug === "mesa-operativa") {
      await page.locator(".pipeline-workbench").evaluate(element => { element.open = true; });
      const calendarButton = page.locator("#pipeline-download-calendar");
      check(await calendarButton.count() === 1, "mesa-operativa: existe el control de exportación iCalendar");
      check(await calendarButton.isDisabled(), "mesa-operativa: el calendario permanece deshabilitado antes de validar un CSV");
      const makeCalendarCsv = async withDate => page.evaluate(includeDate => {
        const headers = window.MorenoPipelineDashboard.headers;
        const values = Object.fromEntries(headers.map(header => [header, ""]));
        const followUp = new Date();
        followUp.setDate(followUp.getDate() + 1);
        const dateValue = includeDate
          ? [followUp.getFullYear(), String(followUp.getMonth() + 1).padStart(2, "0"), String(followUp.getDate()).padStart(2, "0")].join("-")
          : "";
        Object.assign(values, {
          id_oportunidad: "AUDIT-ICS-001",
          localidad: "Moreno",
          tipo_activo: "Terreno",
          tipo_contraparte: "Desarrollador/a",
          etapa_comercial: "primer contacto",
          proxima_accion: "Revisar documentación pública",
          fecha_proximo_seguimiento: dateValue
        });
        const row = headers.map(header => {
          const value = String(values[header] == null ? "" : values[header]);
          return /[;"\r\n]/.test(value) ? '"' + value.replace(/"/g, '""') + '"' : value;
        }).join(";");
        return headers.join(";") + "\n" + row;
      }, withDate);
      const datedCsv = await makeCalendarCsv(true);
      await page.locator("#pipeline-csv-file").setInputFiles({
        name: "moreno-audit-calendar.csv",
        mimeType: "text/csv",
        buffer: Buffer.from(datedCsv, "utf8")
      });
      await page.waitForFunction(() => document.querySelector("#pipeline-status")?.textContent.includes("CSV validado"), null, { timeout: 5000 });
      check(!(await calendarButton.isDisabled()), "mesa-operativa: una fecha validada habilita la exportación de calendario");
      check(await page.locator("#pipeline-counterparty-summary table").count() === 1, "mesa-operativa: el resumen por contraparte se renderiza tras validar el CSV");
      check((await page.locator("#pipeline-counterparty-summary").innerText()).includes("Desarrollador/a"), "mesa-operativa: la categoría de desarrollador aparece en el resumen");
      check((await page.locator("#pipeline-counterparty-summary").innerText()).includes("Total general"), "mesa-operativa: el resumen muestra el total general");
      const [calendarDownload] = await Promise.all([
        page.waitForEvent("download"),
        calendarButton.click()
      ]);
      check(calendarDownload.suggestedFilename().endsWith(".ics"), "mesa-operativa: el calendario se descarga con extensión ICS");
      const downloadedPath = await calendarDownload.path();
      const calendarText = downloadedPath ? fs.readFileSync(downloadedPath, "utf8") : "";
      check(calendarText.includes("BEGIN:VCALENDAR") && calendarText.includes("DTSTART;VALUE=DATE:"), "mesa-operativa: el archivo descargado contiene eventos de día completo");
      check(calendarText.includes("AUDIT-ICS-001") && calendarText.includes("Revisar documentación pública"), "mesa-operativa: el evento conserva el ID y la próxima acción");
      check(!/email|telefono|dni/i.test(calendarText), "mesa-operativa: el calendario no incluye datos personales de contacto");

      const undatedCsv = await makeCalendarCsv(false);
      await page.locator("#pipeline-csv-file").setInputFiles({
        name: "moreno-audit-undated.csv",
        mimeType: "text/csv",
        buffer: Buffer.from(undatedCsv, "utf8")
      });
      await page.waitForFunction(() => document.querySelector("#pipeline-status")?.textContent.includes("CSV validado"), null, { timeout: 5000 });
      check(await calendarButton.isDisabled(), "mesa-operativa: los registros sin fecha no generan eventos de calendario");
      await page.locator("#pipeline-reset").click();
      check(await calendarButton.isDisabled(), "mesa-operativa: limpiar la sesión deshabilita nuevamente el calendario");
      await page.locator(".pipeline-workbench").evaluate(element => { element.open = false; });
    }
    if (route.slug === "mapa-ia") {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.waitForFunction(() => document.getElementById("search-results-status")?.textContent.includes("referencias cargadas"), null, { timeout: 8000 });
      check(await page.locator(".map-sidebar").isVisible(), "mapa-ia: el panel lateral de investigación está visible");
      check(await page.locator("#map").isVisible(), "mapa-ia: el mapa ocupa el espacio principal");
      check(await page.locator(".map-panel-heading").isVisible(), "mapa-ia: la cabecera del panel está visible");
      check(await page.locator(".map-panel-home").isVisible(), "mapa-ia: existe una salida clara hacia el sitio principal");
      check(await page.locator(".map-navigation-help").isVisible(), "mapa-ia: las instrucciones de arrastre, zoom, selección y reencuadre están visibles");
      check(await page.locator(".map-legend").isVisible(), "mapa-ia: la leyenda de símbolos y evidencia está visible");
      check((await page.locator(".map-note").innerText()).includes("Solo se dibujan puntos con fuente cartográfica y fecha de verificación"), "mapa-ia: el alcance de coordenadas trazables está explicado");
      check(await page.locator("#search").isVisible(), "mapa-ia: el buscador principal está visible");
      for (const id of ["locality-filter", "activity-filter", "next-step-filter", "category", "evidence-filter", "availability-filter", "diligence-filter"]) {
        check(await page.locator("#" + id).isVisible(), "mapa-ia: el filtro " + id + " está disponible sin desplegables");
      }
      const initialCount = await page.locator("#atlas-total-count").innerText();
      check(initialCount.startsWith(mapInventory.length + " /"), "mapa-ia: el índice informa el inventario completo al abrir");
      check((await page.locator("#search-results-status").innerText()).includes("fichas sin coordenadas"), "mapa-ia: el buscador anuncia que conserva referencias sin coordenadas");

      const searchFor = async (query, category) => {
        if (category) await page.locator("#category").selectOption(category);
        await page.locator("#search").fill(query);
        await page.waitForFunction(() => {
          const status = document.getElementById("search-results-status");
          return Boolean(status && (status.textContent.includes("coincidencias") || status.textContent.includes("referencias cargadas")));
        }, null, { timeout: 5000 });
      };

      await searchFor("FRANCISCO ÁLVAREZ", "locality");
      await page.locator('#locality-list [data-map-item="alvarez"]').waitFor({ state: "attached", timeout: 5000 });
      check((await page.locator("#search-results-status").innerText()).startsWith("1 coincidencias:"), "mapa-ia: la búsqueda simple de localidad informa una coincidencia exacta");

      await searchFor("Derqui 5890", "published");
      await page.locator('#published-list [data-map-item="sumio-lote-338"]').waitFor({ state: "attached", timeout: 5000 });
      const streetCard = page.locator('#published-list [data-map-item="sumio-lote-338"]');
      if (!(await streetCard.evaluate(element => element.open))) await streetCard.locator("summary").click();
      check((await streetCard.innerText()).includes("Av. Derqui 5890"), "mapa-ia: la búsqueda encuentra una calle y dirección publicadas");

      await searchFor("338 m²", "published");
      await page.locator('#published-list [data-map-item="sumio-lote-338"]').waitFor({ state: "attached", timeout: 5000 });
      const surfaceResultCount = Number.parseInt(await page.locator("#search-results-status").innerText(), 10);
      check(Number.isInteger(surfaceResultCount) && surfaceResultCount > 0, "mapa-ia: la búsqueda reconoce superficies expresadas en m² y cuenta el resultado");

      await searchFor("IDUAR 400.000 m²", "opportunity");
      await page.locator('#opportunity-list [data-map-item="base-aerea-moreno-norte"]').waitFor({ state: "attached", timeout: 5000 });
      const sourceSurfaceCard = page.locator('#opportunity-list [data-map-item="base-aerea-moreno-norte"]');
      if (!(await sourceSurfaceCard.evaluate(element => element.open))) await sourceSurfaceCard.locator("summary").click();
      check((await sourceSurfaceCard.innerText()).includes("400.000 m²"), "mapa-ia: la búsqueda compuesta cruza fuente pública y superficie documentada");

      await searchFor("solicitar planos", "opportunity");
      await page.locator('#opportunity-list [data-map-item="base-aerea-moreno-norte"]').waitFor({ state: "attached", timeout: 5000 });
      const nextStepCount = Number.parseInt(await page.locator("#search-results-status").innerText(), 10);
      check(Number.isInteger(nextStepCount) && nextStepCount > 0, "mapa-ia: la búsqueda indexa el próximo paso registrado y devuelve coincidencias");

      await searchFor("SIBOM 7443/25", "opportunity");
      await page.locator('#opportunity-list [data-map-item="rp25"]').waitFor({ state: "attached", timeout: 5000 });
      const ordinanceCard = page.locator('#opportunity-list [data-map-item="rp25"]');
      if (!(await ordinanceCard.evaluate(element => element.open))) await ordinanceCard.locator("summary").click();
      check((await ordinanceCard.innerText()).includes("Ordenanza 7443/25"), "mapa-ia: la búsqueda encuentra evidencia normativa y su referencia SIBOM");
      check(await ordinanceCard.locator(".map-published-pending").isVisible(), "mapa-ia: RP25 permanece en el índice sin coordenada trazable");
      check(await page.locator('.map-pin[data-map-reference="rp25"]').count() === 0, "mapa-ia: RP25 no recibe un marcador sin coordenada fuente");


      await searchFor("Ordenanza 7497/26 mensuras títulos imperfectos", "opportunity");
      const imperfectTitleCard = page.locator('#opportunity-list [data-map-item="ordenanza-7497-26-titulos-imperfectos"]');
      await imperfectTitleCard.waitFor({ state: "attached", timeout: 5000 });
      if (!(await imperfectTitleCard.evaluate(element => element.open))) await imperfectTitleCard.locator("summary").click();
      check((await page.locator("#search-results-status").innerText()).startsWith("1 coincidencias:"), "mapa-ia: la ordenanza 7497/26 devuelve una coincidencia real");
      check((await imperfectTitleCard.innerText()).includes("no confiere dominio"), "mapa-ia: la ficha distingue permiso provisorio de titularidad dominial");
      check(await imperfectTitleCard.locator('a[href="https://sibom.slyt.gba.gob.ar/bulletins/15901/contents/2456561"]').isVisible(), "mapa-ia: la ficha enlaza la ordenanza oficial");
      check(await page.locator('.map-pin[data-map-reference="ordenanza-7497-26-titulos-imperfectos"]').count() === 0, "mapa-ia: la ordenanza sin coordenadas permanece solo en el índice");

      await searchFor("Ordenanza 7542/26 depósitos 300 m²", "opportunity");
      const habilitationCard = page.locator('#opportunity-list [data-map-item="ordenanza-7542-26-habilitaciones-industriales-logistica"]');
      await habilitationCard.waitFor({ state: "attached", timeout: 5000 });
      if (!(await habilitationCard.evaluate(element => element.open))) await habilitationCard.locator("summary").click();
      check((await page.locator("#search-results-status").innerText()).startsWith("1 coincidencias:"), "mapa-ia: la ordenanza 7542/26 devuelve una coincidencia real");
      check((await habilitationCard.innerText()).includes("300 m²") && (await habilitationCard.innerText()).includes("1.000 m²"), "mapa-ia: la ficha conserva los umbrales de superficie de la norma");
      check(await habilitationCard.locator('a[href="https://sibom.slyt.gba.gob.ar/bulletins/16019/contents/2463040"]').isVisible(), "mapa-ia: la ficha enlaza la fuente oficial de habilitaciones");
      check(await page.locator('.map-pin[data-map-reference="ordenanza-7542-26-habilitaciones-industriales-logistica"]').count() === 0, "mapa-ia: la norma industrial no recibe coordenadas inventadas");

      await searchFor("Los Olivos 9.897,35 m² cesiones", "opportunity");
      const losOlivosCard = page.locator('#opportunity-list [data-map-item="los-olivos-convenio-urbanistico-7572-26"]');
      await losOlivosCard.waitFor({ state: "attached", timeout: 5000 });
      if (!(await losOlivosCard.evaluate(element => element.open))) await losOlivosCard.locator("summary").click();
      check((await page.locator("#search-results-status").innerText()).startsWith("1 coincidencias:"), "mapa-ia: Los Olivos devuelve una coincidencia real por proyecto y superficie");
      check((await losOlivosCard.innerText()).includes("USD 138.562,90") && (await losOlivosCard.innerText()).includes("no precios de mercado"), "mapa-ia: las valuaciones del convenio se distinguen de precios de oferta");
      check(await losOlivosCard.locator('a[href="https://sibom.slyt.gba.gob.ar/bulletins/16019/contents/2463473"]').isVisible(), "mapa-ia: la ficha enlaza el convenio urbanístico oficial");
      check(await page.locator('.map-pin[data-map-reference="los-olivos-convenio-urbanistico-7572-26"]').count() === 0, "mapa-ia: Los Olivos permanece en el índice sin geolocalización no verificada");

      await page.locator("#search").fill("Los Olivos");
      await page.locator("#activity-filter").selectOption("land");
      await page.locator("#next-step-filter").selectOption("cadastral");
      await page.locator("#evidence-filter").selectOption("documented");
      await page.waitForFunction(() => document.getElementById("search-results-status")?.textContent.startsWith("1 coincidencias:"), null, { timeout: 5000 });
      const losOlivosFilteredIds = await page.locator("#opportunity-list [data-map-item]").evaluateAll(elements => elements.map(element => element.dataset.mapItem));
      check(losOlivosFilteredIds.length === 1 && losOlivosFilteredIds[0] === "los-olivos-convenio-urbanistico-7572-26", "mapa-ia: los filtros de sector, próximo paso y evidencia se combinan con la búsqueda normativa");
      await page.locator("#reset-map").click();

      await searchFor("Ecoparque Industrial", "opportunity");
      await page.locator('#opportunity-list [data-map-item="ecoparque"]').waitFor({ state: "attached", timeout: 5000 });
      const ecoparqueCard = page.locator('#opportunity-list [data-map-item="ecoparque"]');
      if (!(await ecoparqueCard.evaluate(element => element.open))) await ecoparqueCard.locator("summary").click();
      const ecoparqueCoordinateLink = ecoparqueCard.locator(".map-coordinate-source-link");
      check(await ecoparqueCoordinateLink.isVisible() && await ecoparqueCoordinateLink.getAttribute("href") === "https://www.google.com/maps/search/?api=1&query=-34.5776245,-58.8709859", "mapa-ia: el Ecoparque muestra el pin publicado por su operador y su fuente");
      check(await page.locator('.map-pin[data-map-reference="ecoparque"]').count() === 1, "mapa-ia: el Ecoparque solo se dibuja con coordenada y fuente verificables");

      await searchFor("Cuartel V PROMEBA veredas", "opportunity");
      await page.locator('#opportunity-list [data-map-item="promeba-cuartel-v"]').waitFor({ state: "attached", timeout: 5000 });
      check((await page.locator("#search-results-status").innerText()).includes("fichas sin coordenadas verificables siguen en el índice"), "mapa-ia: las búsquedas compuestas cuentan fichas sin geolocalización");

      await searchFor("CUÁRTEL-V PROMEBA", "opportunity");
      const punctuatedIds = await page.locator("#opportunity-list [data-map-item]").evaluateAll(elements => elements.map(element => element.dataset.mapItem).sort());
      await searchFor("cuartel v promeba", "opportunity");
      const normalizedIds = await page.locator("#opportunity-list [data-map-item]").evaluateAll(elements => elements.map(element => element.dataset.mapItem).sort());
      check(JSON.stringify(punctuatedIds) === JSON.stringify(normalizedIds) && normalizedIds.includes("promeba-cuartel-v"), "mapa-ia: tildes, mayúsculas y puntuación no alteran los resultados");

      await page.locator("#search").fill("cuartel v");
      await page.locator("#locality-filter").selectOption("cuartel");
      await page.locator("#activity-filter").selectOption("industrial");
      await page.locator("#next-step-filter").selectOption("contact");
      await page.locator("#evidence-filter").selectOption("documented");
      await page.waitForFunction(() => document.getElementById("search-results-status")?.textContent.startsWith("1 coincidencias:"), null, { timeout: 5000 });
      const combinedIds = await page.locator("#opportunity-list [data-map-item]").evaluateAll(elements => elements.map(element => element.dataset.mapItem));
      check(combinedIds.length === 1 && combinedIds[0] === "base-aerea-moreno-norte", "mapa-ia: localidad, actividad, próximo paso, evidencia y texto se combinan correctamente");
      check((await page.locator("#atlas-total-count").innerText()).startsWith("1 /"), "mapa-ia: el índice actualiza la cantidad de coincidencias filtradas");
      const unlocatedCard = page.locator('#opportunity-list [data-map-item="base-aerea-moreno-norte"]');
      if (!(await unlocatedCard.evaluate(element => element.open))) await unlocatedCard.locator("summary").click();
      check(await unlocatedCard.locator(".map-published-pending").isVisible(), "mapa-ia: una ficha sin coordenadas sigue accesible en el índice y declara que no tiene marcador");

      await page.locator("#search").fill("zzzxqv 918273");
      await page.waitForFunction(() => document.getElementById("search-results-status")?.textContent.startsWith("0 coincidencias"), null, { timeout: 5000 });
      check(await page.locator("#map-empty-state").isVisible(), "mapa-ia: una consulta sin coincidencias presenta un estado vacío útil");
      await page.locator("#reset-empty-state").click();
      check((await page.locator("#atlas-total-count").innerText()).startsWith(mapInventory.length + " /"), "mapa-ia: restablecer recupera el inventario completo");

      const localityMarker = page.locator('.map-pin[aria-label="Ver Moreno Centro en el mapa"]');
      if (await localityMarker.count()) {
        await localityMarker.click();
        await page.waitForFunction(() => document.querySelector('[data-map-item="moreno"]')?.classList.contains("is-active"), null, { timeout: 5000 });
        check(await page.locator('#locality-list [data-map-item="moreno"]').evaluate(element => element.open), "mapa-ia: seleccionar un marcador abre la ficha lateral correspondiente");
        const morenoCoordinateLink = page.locator('#locality-list [data-map-item="moreno"] .map-coordinate-source-link');
        check(await morenoCoordinateLink.isVisible() && await morenoCoordinateLink.getAttribute("href") === "https://www.openstreetmap.org/node/1215663604", "mapa-ia: la ficha de localidad expone la fuente OSM de su coordenada");
        const canvas = page.locator(".maplibregl-canvas");
        const canvasBox = await canvas.boundingBox();
        const markerTransformBeforeDrag = await localityMarker.evaluate(element => element.style.transform);
        if (canvasBox) {
          const dragX = canvasBox.x + canvasBox.width * 0.75;
          const dragY = canvasBox.y + canvasBox.height * 0.6;
          await page.mouse.move(dragX, dragY);
          await page.mouse.down();
          await page.mouse.move(dragX + 90, dragY + 55, { steps: 5 });
          await page.mouse.up();
          await page.waitForFunction(previous => {
            const marker = document.querySelector('.map-pin[aria-label="Ver Moreno Centro en el mapa"]');
            return marker && marker.style.transform !== previous;
          }, markerTransformBeforeDrag, { timeout: 4000 });
          const markerTransformAfterDrag = await localityMarker.evaluate(element => element.style.transform);
          check(markerTransformAfterDrag !== markerTransformBeforeDrag, "mapa-ia: arrastrar el lienzo desplaza la cartografía y sus marcadores");
          await page.locator("#map-zoom-in").click();
          await page.waitForTimeout(220);
          const markerTransformAfterZoom = await localityMarker.evaluate(element => element.style.transform);
          await page.locator("#map-fit-all").click();
          await page.waitForFunction(previous => {
            const marker = document.querySelector('.map-pin[aria-label="Ver Moreno Centro en el mapa"]');
            return marker && marker.style.transform !== previous;
          }, markerTransformAfterZoom, { timeout: 4000 });
          const markerTransformAfterFit = await localityMarker.evaluate(element => element.style.transform);
          check(markerTransformAfterFit !== markerTransformAfterZoom, "mapa-ia: Ver todo reencuadra la vista después del zoom");
        }
      }

      const selectedThesisCard = page.locator('#opportunity-list [data-map-item="rp25"]');
      await selectedThesisCard.locator("summary").click();
      check(await selectedThesisCard.evaluate(element => element.open && element.classList.contains("is-active")), "mapa-ia: seleccionar una ficha lateral sincroniza la referencia activa");

      await page.setViewportSize({ width: 390, height: 844 });
      check(await page.locator(".map-sidebar").isVisible(), "mapa-ia: el panel lateral permanece disponible en móvil");
      check(await page.locator(".map-navigation-help").isVisible(), "mapa-ia: las instrucciones de uso siguen visibles en móvil");
      check(await page.locator(".map-legend").isVisible(), "mapa-ia: la leyenda sigue visible en móvil");
      const interactiveCanvasReady = await page.locator(".maplibregl-canvas").count() > 0;
      if (interactiveCanvasReady) {
        check(await page.locator("#map-touch-controls").isVisible(), "mapa-ia: los controles táctiles aparecen en móvil");
        const touchTargets = await page.locator("#map-zoom-in, #map-zoom-out, #map-fit-all").evaluateAll(elements => elements.map(element => {
          const box = element.getBoundingClientRect();
          return { width: box.width, height: box.height };
        }));
        check(touchTargets.length === 3 && touchTargets.every(box => box.width >= 44 && box.height >= 44), "mapa-ia: zoom y reencuadre tienen objetivos táctiles de al menos 44 px");
        await page.locator("#map-zoom-in").click();
        await page.locator("#map-zoom-out").click();
        await page.locator("#map-fit-all").click();
        check(await page.locator("#map-fit-all").isEnabled(), "mapa-ia: los controles de zoom y reencuadre siguen operativos en móvil");
      } else {
        check(await page.locator(".map-static-fallback").isVisible(), "mapa-ia: el esquema alternativo queda disponible sin cartografía interactiva");
      }

      const thesisCard = page.locator('[data-map-item="rp25"]');
      if (!(await thesisCard.evaluate(element => element.open))) await thesisCard.locator("summary").click();
      const thesisContact = thesisCard.locator(".map-item-actions .map-contact-link");
      check(await thesisContact.isVisible(), "mapa-ia: la consulta comercial de la tesis no queda al inicio de la ficha");
      check((await thesisContact.innerText()).includes("Consultar esta tesis con MORENO"), "mapa-ia: la acción comercial identifica el destino de consulta vigente");
      check(await thesisCard.locator(".map-item-actions .map-brief-button").isVisible(), "mapa-ia: la descarga de ficha no queda accesible junto a la acción comercial");
      const actionOrder = await thesisCard.locator(".map-item-actions, .map-review-panel").evaluateAll(elements => elements.map(element => element.className));
      check(actionOrder.indexOf("map-item-actions") >= 0 && actionOrder.indexOf("map-review-panel") > actionOrder.indexOf("map-item-actions"), "mapa-ia: las acciones comerciales y la ficha aparecen antes de la bitácora extensa");

      const contactHref = await thesisContact.getAttribute("href");
      const contactUrl = new URL(contactHref);
      const contactMessage = contactUrl.searchParams.get("text") || "";
      check(contactUrl.hostname === "wa.me" && contactUrl.pathname === "/5491141671674", "mapa-ia: la consulta sale al WhatsApp público de MORENO, no al portal INFO PYME");
      check(contactMessage.includes("RP25") && contactMessage.includes("rp25"), "mapa-ia: el enlace de WhatsApp conserva la referencia seleccionada");


      const contactChannelsPage = await browser.newPage({ viewport: { width: 390, height: 844 } });
      await contactChannelsPage.goto(BASE_URL + "/mapa-ia/?ref=desarrollo-pir25-ruta25-donbosco", { waitUntil: "domcontentloaded" });
      const contactChannelsCard = contactChannelsPage.locator('#published-list [data-map-item="desarrollo-pir25-ruta25-donbosco"]');
      await contactChannelsCard.waitFor({ state: "attached", timeout: 5000 });
      const publicPhoneHrefs = await contactChannelsCard.locator(".map-public-contact-phone").evaluateAll(links => links.map(link => link.getAttribute("href")));
      const publicEmailHrefs = await contactChannelsCard.locator(".map-public-contact-email").evaluateAll(links => links.map(link => link.getAttribute("href")));
      check(publicPhoneHrefs.includes("tel:+541176004000") && publicPhoneHrefs.includes("tel:+5491171877878"), "mapa-ia: los dos teléfonos completos publicados quedan disponibles para llamar");
      check(publicEmailHrefs.includes("mailto:inmobiliaria@torrespropiedades.info"), "mapa-ia: el email público queda disponible como enlace mailto");
      check(await contactChannelsCard.locator(".map-public-contact-link").first().isVisible(), "mapa-ia: los canales de contacto directos son visibles en móvil");
      await contactChannelsPage.close();

      const partialChannelsPage = await browser.newPage({ viewport: { width: 390, height: 844 } });
      await partialChannelsPage.goto(BASE_URL + "/mapa-ia/?ref=terreno-guemes-victorica-2820", { waitUntil: "domcontentloaded" });
      const partialChannelsCard = partialChannelsPage.locator('#published-list [data-map-item="terreno-guemes-victorica-2820"]');
      await partialChannelsCard.waitFor({ state: "attached", timeout: 5000 });
      check(await partialChannelsCard.locator(".map-public-contact-phone").count() === 0, "mapa-ia: un teléfono parcial no genera un enlace de llamada");
      await partialChannelsPage.close();

      const deepReferenceId = mapInventory.filter(item => item.type === "published").at(-1).id;
      const deepReferencePage = await browser.newPage({ viewport: { width: 390, height: 844 } });
      await deepReferencePage.goto(BASE_URL + "/mapa-ia/?ref=" + encodeURIComponent(deepReferenceId), { waitUntil: "domcontentloaded" });
      const deepReferenceCard = deepReferencePage.locator('#published-list [data-map-item="' + deepReferenceId + '"]');
      await deepReferenceCard.waitFor({ state: "attached", timeout: 5000 });
      check(await deepReferenceCard.evaluate(element => element.open && element.classList.contains("is-active")), "mapa-ia: un enlace directo abre la ficha seleccionada aunque esté fuera del primer tramo");
      check(await deepReferencePage.locator("#published-list .map-published-pagination-status").innerText().then(text => text.includes("referencia seleccionada fuera de este tramo")), "mapa-ia: la paginación explica la ficha profunda seleccionada");
      await deepReferencePage.close();
    }

    const screenshotDir = path.join(ROOT, "test-results", "visual");
    fs.mkdirSync(screenshotDir, { recursive: true });
    const screenshotPage = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
    await screenshotPage.goto(BASE_URL + route.path, { waitUntil: "domcontentloaded" });
    await screenshotPage.locator("main#main-content").waitFor({ state: "attached", timeout: 5000 });
    await screenshotPage.evaluate(() => { if (document.activeElement && typeof document.activeElement.blur === "function") document.activeElement.blur(); window.scrollTo(0, 0); });
    await screenshotPage.screenshot({ path: path.join(screenshotDir, `${route.slug}-desktop.png`), fullPage: true, animations: "disabled" });
    await screenshotPage.setViewportSize({ width: 390, height: 844 });
    await screenshotPage.evaluate(() => window.scrollTo(0, 0));
    await screenshotPage.screenshot({ path: path.join(screenshotDir, `${route.slug}-mobile.png`), fullPage: true, animations: "disabled" });
    await screenshotPage.close();

    check(pageErrors.length === 0, `${route.slug}: errores JavaScript: ${pageErrors.join(" | ")}`);
    check(localRequestFailures.length === 0, `${route.slug}: recursos locales fallidos: ${localRequestFailures.join(", ")}`);
    console.log(`PASS: ${route.slug} — escritorio, móvil, teclado y recursos`);
  } catch (error) {
    check(false, `${route.slug}: auditoría interrumpida: ${error.message}`);
  } finally {
    await page.close();
  }
}

async function auditOpportunityFlow(browser) {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
  const pageErrors = [];
  page.on("pageerror", error => pageErrors.push(error.message));
  try {
    const response = await page.goto(BASE_URL + "/oportunidades/", { waitUntil: "domcontentloaded" });
    check(Boolean(response && response.ok()), "INFO PYME: el portal responde correctamente");
    await page.locator("main#main-content").waitFor({ state: "visible", timeout: 5000 });
    check(await page.locator("h1").count() === 1, "INFO PYME: conserva un único H1");
    check((await page.locator("h1").innerText()).toLowerCase().includes("info pyme"), "INFO PYME: el título identifica el portal vigente");
    check((await page.locator("#pyme-total-count").innerText()).toLocaleLowerCase("es-AR").includes("30 noticias"), "INFO PYME: informa el total editorial");
    check(await page.locator("#pyme-featured .pyme-card").count() === 4, "INFO PYME: presenta cuatro noticias destacadas");
    check(await page.locator("#pyme-news-grid .pyme-card").count() === 26, "INFO PYME: conserva las otras 26 noticias en el índice");
    check(await page.locator(".pyme-card").count() === 30, "INFO PYME: el inventario visible contiene las 30 noticias");
    check(await page.locator(".pyme-featured-tag").count() === 4, "INFO PYME: identifica visualmente las cuatro destacadas");
    check(await page.locator(".pyme-editorial-note").isVisible(), "INFO PYME: explica el alcance editorial y la fecha de consulta");
    for (const width of [320, 360, 390, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await delay(50);
      const dimensions = await page.evaluate(() => ({
        viewport: window.innerWidth,
        document: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth)
      }));
      check(dimensions.document <= dimensions.viewport + 1, "INFO PYME: no hay desbordamiento horizontal a " + width + "px");
    }
    check(pageErrors.length === 0, "INFO PYME: errores JavaScript: " + pageErrors.join(" | "));
    console.log("PASS: INFO PYME — 30 fichas, cuatro destacadas y seis anchos responsive");
  } catch (error) {
    check(false, "INFO PYME: auditoría responsive interrumpida: " + error.message);
  } finally {
    await page.close();
  }
}

async function auditOpportunityFaq(browser) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const pageErrors = [];
  page.on("pageerror", error => pageErrors.push(error.message));
  try {
    const response = await page.goto(BASE_URL + "/oportunidades/", { waitUntil: "domcontentloaded" });
    check(Boolean(response && response.ok()), "INFO PYME fuentes: el portal responde correctamente");
    const links = await page.locator(".pyme-read-link").evaluateAll(elements => elements.map(element => ({
      href: element.href,
      target: element.getAttribute("target"),
      rel: element.getAttribute("rel") || ""
    })));
    check(links.length === 30, "INFO PYME fuentes: cada noticia conserva un enlace");
    check(links.every(link => link.href.startsWith("https://") && link.target === "_blank" && link.rel.includes("noopener") && link.rel.includes("noreferrer")), "INFO PYME fuentes: los 30 enlaces HTTPS abren de forma segura");
    check(new Set(links.map(link => link.href)).size === 30, "INFO PYME fuentes: no hay URLs duplicadas");
    const dates = await page.locator(".pyme-card-meta time").allTextContents();
    check(dates.length === 30 && dates.every(value => value.trim().length > 0), "INFO PYME fuentes: las 30 fichas muestran fecha");
    const sources = await page.locator(".pyme-card-source").allTextContents();
    check(sources.length === 30 && sources.every(value => value.trim().startsWith("Publicación:")), "INFO PYME fuentes: las 30 fichas identifican su fuente");
    const contributionLink = page.locator(".pyme-contribute-band a[href^='https://wa.me/']");
    check(await contributionLink.isVisible(), "INFO PYME fuentes: el canal para aportar noticias está visible");
    const contributionUrl = new URL(await contributionLink.getAttribute("href"));
    check(contributionUrl.hostname === "wa.me" && contributionUrl.pathname === "/5491141671674", "INFO PYME fuentes: el canal editorial apunta al WhatsApp público");
    check(pageErrors.length === 0, "INFO PYME fuentes: errores JavaScript: " + pageErrors.join(" | "));
    console.log("PASS: INFO PYME — fuentes HTTPS, fechas, unicidad y canal editorial");
  } catch (error) {
    check(false, "INFO PYME fuentes: auditoría interrumpida: " + error.message);
  } finally {
    await page.close();
  }
}

async function auditMapFallback(browser) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  const pageErrors = [];
  page.on("pageerror", error => pageErrors.push(error.message));
  try {
    await page.route("https://unpkg.com/maplibre-gl@5.6.1/dist/maplibre-gl.js", route => route.abort());
    const response = await page.goto(BASE_URL + "/mapa-ia/", { waitUntil: "domcontentloaded" });
    check(Boolean(response && response.ok()), "mapa-ia fallback: la página responde aunque falle el motor cartográfico");
    await page.locator(".map-static-fallback").waitFor({ state: "visible", timeout: 5000 });
    check(await page.locator(".map-static-diagram").count() === 1, "mapa-ia fallback: se genera el esquema SVG sin MapLibre");
    const fallbackReferenceCount = await page.locator("#atlas-total-count").evaluate(element => Number(element.textContent.split("/")[0].trim()));
    check(fallbackReferenceCount > 0, "mapa-ia fallback: el índice publica el total del inventario");
    check(await page.locator("[data-fallback-reference]").count() === fallbackReferenceCount, "mapa-ia fallback: el esquema conserva todas las referencias del índice");
    check((await page.locator(".map-static-note").innerText()).includes("no tiene escala"), "mapa-ia fallback: el alcance no parcelario queda explicado");
    check(await page.locator('[data-fallback-reference="base-aerea-moreno-norte"]').count() === 1, "mapa-ia fallback: una referencia sin coordenadas sigue accesible en el índice alternativo");
    check(await page.locator('[data-fallback-reference="rp25"]').count() === 1, "mapa-ia fallback: RP25 sin coordenada sigue en el índice alternativo");
    check(await page.locator('.map-pin[aria-label*="Base Aérea"]').count() === 0, "mapa-ia fallback: una referencia sin coordenadas no recibe un marcador ficticio");
    check(await page.locator("#search").isVisible(), "mapa-ia fallback: el buscador sigue disponible");
    await page.locator("#search").fill("Base Aérea");
    await page.waitForFunction(() => document.getElementById("search-results-status")?.textContent.includes("coincidencias"), null, { timeout: 5000 });
    check(await page.locator('[data-fallback-reference="base-aerea-moreno-norte"]').count() === 1, "mapa-ia fallback: la búsqueda encuentra una referencia sin geolocalización");
    check((await page.locator("#search-results-status").innerText()).includes("fichas sin coordenadas verificables siguen en el índice"), "mapa-ia fallback: el recuento declara las referencias sin punto");
    check(await page.locator("#map-touch-controls").isHidden(), "mapa-ia fallback: oculta controles interactivos cuando no existe motor cartográfico");
    await page.locator("#search").fill("zzzxqv 918273");
    check(await page.locator("[data-fallback-reference]").count() === 0, "mapa-ia fallback: una búsqueda vacía no conserva referencias ajenas al filtro");
    check(await page.locator("#map-empty-state").isVisible(), "mapa-ia fallback: informa cuando no hay coincidencias");
    await page.locator("#reset-map").click();
    check(await page.locator("[data-fallback-reference]").count() === fallbackReferenceCount, "mapa-ia fallback: restablecer recupera todo el inventario");
    await page.setViewportSize({ width: 390, height: 844 });
    check(await page.locator(".map-sidebar").isVisible(), "mapa-ia fallback: el panel lateral permanece visible en móvil");
    check(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), "mapa-ia fallback: no hay desbordamiento horizontal en móvil");
    const screenshotDir = path.join(ROOT, "test-results", "visual");
    fs.mkdirSync(screenshotDir, { recursive: true });
    await page.screenshot({ path: path.join(screenshotDir, "mapa-ia-fallback-mobile.png"), fullPage: true, animations: "disabled" });
    check(pageErrors.length === 0, "mapa-ia fallback: errores JavaScript: " + pageErrors.join(" | "));
    console.log("PASS: mapa-ia — esquema alternativo, búsqueda, índice sin coordenadas y controles seguros");
  } catch (error) {
    check(false, "mapa-ia fallback: auditoría interrumpida: " + error.message);
  } finally {
    await page.close();
  }
}
async function auditLegacyMapRedirect(browser) {
  const legacyUrl = BASE_URL + "/web/mapa-moreno/";
  const response = await fetch(legacyUrl);
  check(response.ok, "mapa histórico: la ruta de compatibilidad responde correctamente");
  const source = await response.text();
  check(source.includes('<meta name="robots" content="noindex,follow">'), "mapa histórico: no solicita indexación");
  check(source.includes("https://leandrocuellarok-netizen.github.io/morenodesarrollos/mapa-ia/"), "mapa histórico: declara como canonical el Mapa IA vigente");
  check(source.includes('<meta http-equiv="refresh" content="0;url=../../mapa-ia/">'), "mapa histórico: contiene redirección inmediata");
  check(source.includes('href="../../mapa-ia/"'), "mapa histórico: conserva un enlace manual alternativo");

  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
  const pageErrors = [];
  page.on("pageerror", error => pageErrors.push(error.message));
  try {
    await page.goto(legacyUrl, { waitUntil: "domcontentloaded" });
    await page.waitForURL(url => new URL(url).pathname.endsWith("/mapa-ia/"), { timeout: 5000 }).catch(() => {});
    check(new URL(page.url()).pathname.endsWith("/mapa-ia/"), "mapa histórico: Chromium llega a la ruta canónica /mapa-ia/");
    check(await page.locator("main h1").count() === 1, "mapa histórico: el destino conserva un único encabezado principal");
    check((await page.title()).includes("Mapa IA de Moreno"), "mapa histórico: el destino carga el título de la herramienta vigente");
    check(pageErrors.length === 0, "mapa histórico: no produce errores JavaScript durante la redirección");
    console.log("PASS: ruta cartográfica histórica — canonical, noindex y redirección a Mapa IA");
  } catch (error) {
    check(false, "mapa histórico: auditoría interrumpida: " + error.message);
  } finally {
    await page.close();
  }
}

(async function main() {
  let server;
  let browser;
  try {
    server = await startServer();
    browser = await chromium.launch({ headless: true });
    for (const route of ROUTES) {
      await auditRoute(browser, route);
    }
    await auditOpportunityFlow(browser);
    await auditOpportunityFaq(browser);
    await auditMapFallback(browser);
    await auditLegacyMapRedirect(browser);
  } catch (error) {
    check(false, error.message);
  } finally {
    if (browser) await browser.close();
    if (server) server.kill("SIGTERM");
  }

  if (failures.length) {
    console.error(`${failures.length} comprobación(es) fallaron.`);
    process.exitCode = 1;
  } else {
    console.log(`Auditoría responsive aprobada: ${ROUTES.length} rutas, 1 redirección histórica y ${WIDTHS.length} anchos; capturas de escritorio/móvil.`);
  }
})();
