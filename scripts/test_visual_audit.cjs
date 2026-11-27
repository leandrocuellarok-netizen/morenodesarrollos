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
  { slug: "mapa-ia", path: "/mapa-ia/", navigation: true },
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
      return {
        id: id ? id[1] : null,
        lat: lat ? Number(lat[1]) : NaN,
        lng: lng ? Number(lng[1]) : NaN,
        kind: defaultKind === "locality" ? "locality" : (stage ? stage[1] : null)
      };
    });
  }

  const expected = [
    ...readRecords("localities", "locality"),
    ...readRecords("opportunities", "reference")
  ];
  const expectedById = new Map(expected.map(record => [record.id, record]));
  check(markers.length === 11, "inicio: el plano contiene seis localidades y cinco referencias territoriales");
  check(new Set(markers.map(marker => marker.id)).size === markers.length, "inicio: los identificadores del plano no están duplicados");
  check(markers.filter(marker => marker.kind === "locality").length === 6, "inicio: el plano distingue las seis localidades");
  check(markers.filter(marker => marker.kind === "documented").length === 4, "inicio: el plano distingue las cuatro referencias documentadas");
  check(markers.filter(marker => marker.kind === "hypothesis").length === 1, "inicio: el plano distingue la hipótesis de prospección");

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
      const disclosureIds = [
        "map-refine-filters",
        "map-data-export-disclosure",
        "atlas-index-disclosure",
        "map-review-disclosure",
        "map-verification-disclosure"
      ];
      await page.setViewportSize({ width: 1440, height: 900 });
      for (const id of disclosureIds) {
        const disclosure = page.locator("#" + id);
        check(await disclosure.evaluate(element => element.open), `mapa-ia: ${id} debe iniciar abierto en escritorio`);
        check(!(await page.locator("#" + id + " > summary").isVisible()), `mapa-ia: ${id} no debe mostrar el resumen en escritorio`);
      }

      await page.setViewportSize({ width: 390, height: 844 });
      await delay(100);
      for (const id of disclosureIds) {
        const disclosure = page.locator("#" + id);
        check(!(await disclosure.evaluate(element => element.open)), `mapa-ia: ${id} debe iniciar cerrado en móvil`);
        check(await page.locator("#" + id + " > summary").isVisible(), `mapa-ia: ${id} debe ofrecer un resumen visible en móvil`);
      }

      await page.locator("#map-refine-filters > summary").click();
      check(await page.locator("#map-refine-filters").evaluate(element => element.open), "mapa-ia: los filtros secundarios no se abren");
      check(await page.locator("#category").isVisible() && await page.locator("#evidence-filter").isVisible(), "mapa-ia: los filtros secundarios no quedan disponibles al expandir");
      check(await page.locator("#availability-filter").isVisible(), "mapa-ia: el filtro de estado de publicación debe estar visible en móvil");
      check(await page.locator("#diligence-filter").isVisible(), "mapa-ia: el filtro de integridad de ficha debe estar visible en móvil");
      await page.locator("#availability-filter").selectOption("no-vigente");
      const historicStatuses = (await page.locator("#published-list .map-published-status").allTextContents()).map(value => value.trim());
      check(historicStatuses.length > 0 && historicStatuses.every(value => value === "No vigente"), "mapa-ia: el filtro no debe mezclar publicaciones con otros estados");
      const sharedStatus = await page.evaluate(() => new URL(window.location.href).searchParams.get("vigencia"));
      check(sharedStatus === "no-vigente", "mapa-ia: la vista compartible debe conservar el estado registrado");
      const reviewDate = await page.locator("#published-list .map-published-review-date").first().innerText();
      check(/^Revisión de fuente: \d{2}\/\d{2}\/\d{4}$/.test(reviewDate), "mapa-ia: la ficha debe mostrar la fecha de revisión de la fuente");
      await page.locator("#availability-filter").selectOption("no-es-oferta");
      const nonOfferStatuses = (await page.locator("#published-list .map-published-status").allTextContents()).map(value => value.trim());
      check(nonOfferStatuses.length === 1 && nonOfferStatuses[0] === "No es una oferta de parcela", "mapa-ia: el proyecto público no se presenta como una oferta de parcela");
      const sharedNonOfferStatus = await page.evaluate(() => new URL(window.location.href).searchParams.get("vigencia"));
      check(sharedNonOfferStatus === "no-es-oferta", "mapa-ia: el enlace compartido conserva el tipo de ficha no comercial");
      await page.locator("#reset-map").click();
      await page.locator("#diligence-filter").selectOption("pending");
      const pendingDiligenceCount = await page.locator("#published-list .map-item-published").count();
      const pendingInitialCount = Math.min(expectedDiligenceCounts.pending, 24);
      check(pendingDiligenceCount === pendingInitialCount, "mapa-ia: el filtro pendiente muestra el primer tramo de hasta 24 fichas");
      const pendingPaginationStatus = await page.locator("#published-list .map-published-pagination-status").innerText();
      check(pendingPaginationStatus.includes("Mostrando " + pendingInitialCount + " de " + expectedDiligenceCounts.pending), "mapa-ia: el estado informa el total filtrado y el tramo visible");
      if (expectedDiligenceCounts.pending > 24) {
        const morePending = page.locator("#show-more-published");
        check(await morePending.isVisible(), "mapa-ia: existe una acción accesible para cargar el siguiente tramo");
        await morePending.click();
        check(await page.locator("#published-list .map-item-published").count() === Math.min(48, expectedDiligenceCounts.pending), "mapa-ia: cargar más incorpora el segundo tramo sin duplicar fichas");
        while (await page.locator("#show-more-published").count()) {
          await page.locator("#show-more-published").click();
        }
        check(await page.locator("#published-list .map-item-published").count() === expectedDiligenceCounts.pending, "mapa-ia: todos los resultados filtrados pueden cargarse progresivamente");
      }
      const pendingDiligenceStates = await page.locator("#published-list .map-published-diligence").evaluateAll(elements => elements.map(element => element.dataset.diligence));
      check(pendingDiligenceStates.every(value => value === "pending"), "mapa-ia: las fichas pendientes identifican los campos faltantes");
      check(await page.locator("#locality-list .map-item, #opportunity-list .map-item").count() === 0, "mapa-ia: la diligencia no mezcla localidades ni tesis territoriales");
      check(await page.evaluate(() => new URL(window.location.href).searchParams.get("diligencia")) === "pending", "mapa-ia: el enlace compartible conserva la integridad pendiente");
      await page.locator("#diligence-filter").selectOption("complete");
      const completeDiligenceCount = await page.locator("#published-list .map-item-published").count();
      check(completeDiligenceCount === Math.min(expectedDiligenceCounts.complete, 24), "mapa-ia: el filtro completo muestra su primer tramo sin perder el total calculado");
      const completeDiligenceStates = await page.locator("#published-list .map-published-diligence").evaluateAll(elements => elements.map(element => element.dataset.diligence));
      check(completeDiligenceStates.every(value => value === "complete"), "mapa-ia: las fichas completas indican presencia de los siete campos");
      await page.locator("#reset-map").click();
      await page.locator("#map-refine-filters > summary").click();
      check(!(await page.locator("#map-refine-filters").evaluate(element => element.open)), "mapa-ia: los filtros secundarios no se pueden volver a contraer");
      await page.setViewportSize({ width: 1440, height: 900 });
      await delay(100);
      check(await page.locator("#map-refine-filters").evaluate(element => element.open), "mapa-ia: los filtros secundarios deben volver a abrirse al pasar a escritorio");
      await page.setViewportSize({ width: 390, height: 844 });
      await delay(80);
      check(!(await page.locator("#map-refine-filters").evaluate(element => element.open)), "mapa-ia: la preferencia manual móvil debe conservarse al volver a teléfono");
      check(await page.locator(".map-navigation-help").isVisible(), "mapa-ia: las instrucciones de arrastre, zoom y selección están visibles en móvil");
      const interactiveCanvasReady = await page.locator(".maplibregl-canvas").count() > 0;
      if (interactiveCanvasReady) {
        check(await page.locator("#map-touch-controls").isVisible(), "mapa-ia: los controles táctiles aparecen cuando el mapa interactivo está disponible");
        const touchTargets = await page.locator("#map-zoom-in, #map-zoom-out, #map-fit-all").evaluateAll(elements => elements.map(element => {
          const box = element.getBoundingClientRect();
          return { width: box.width, height: box.height };
        }));
        check(touchTargets.length === 3 && touchTargets.every(box => box.width >= 44 && box.height >= 44), "mapa-ia: zoom y reencuadre tienen objetivos táctiles de al menos 44 px");
        await page.locator("#map-fit-all").click();
        await page.waitForFunction(() => document.getElementById("map-status")?.textContent.includes("Vista general del Partido de Moreno."), null, { timeout: 3000 }).catch(() => {});
        check((await page.locator("#map-status").innerText()).includes("Vista general del Partido de Moreno."), "mapa-ia: Ver todo reencuadra el municipio");
      } else {
        check(await page.locator(".map-static-fallback").isVisible(), "mapa-ia: el fallback está disponible cuando no carga MapLibre");
      }

      await page.locator("#map-refine-filters > summary").click();
      await page.locator("#category").selectOption("opportunity");
      await page.locator("#activity-filter").selectOption("industrial");
      await page.locator("#atlas-index-disclosure > summary").click();
      await delay(80);
      const filteredSummary = await page.locator("#atlas-index-summary").innerText();
      check(filteredSummary.includes("3 referencias"), "mapa-ia: el resumen móvil cuenta las tres tesis industriales");
      check(await page.locator("#opportunity-list .map-item").count() === 3, "mapa-ia: el filtro combinado conserva las tres tesis industriales en el índice");
      check(await page.locator('#opportunity-list [data-map-item="base-aerea-moreno-norte"] .map-no-marker').isVisible(), "mapa-ia: la tesis sin coordenadas sigue accesible en el índice");
      await page.locator("#reset-map").click();
      if (await page.locator("#map-refine-filters").evaluate(element => element.open)) await page.locator("#map-refine-filters > summary").click();
      const resetSummary = await page.locator("#atlas-index-summary").innerText();
      const resetCount = (await page.locator("#atlas-total-count").innerText()).split("/")[0].trim();
      check(resetSummary.includes(resetCount + " referencias"), "mapa-ia: el resumen móvil no se actualiza al restablecer el inventario");

      await page.locator("#map-review-disclosure > summary").click();
      check(await page.locator(".map-review-toolbar").isVisible(), "mapa-ia: la bitácora local no se abre");

      await page.evaluate(() => {
        const originalText = File.prototype.text;
        File.prototype.text = function () {
          if (this.name === "moreno-slow-review.json") {
            return new Promise((resolve, reject) => {
              setTimeout(() => originalText.call(this).then(resolve, reject), 300);
            });
          }
          return originalText.call(this);
        };
        window.confirm = () => true;
        localStorage.removeItem("moreno-map-review-v2");
        localStorage.removeItem("moreno-map-review-v1");
      });
      const reviewFile = (name, taskId, note) => ({
        name,
        mimeType: "application/json",
        buffer: Buffer.from(JSON.stringify({
          schema_version: 2,
          generated_at: "2026-11-26T00:00:00.000Z",
          scope: "Prueba automatizada sin datos reales.",
          references: [{
            id: "rp25",
            name: "Referencia de prueba",
            completed_tasks: 1,
            total_tasks: 5,
            tasks: [{
              id: taskId,
              label: taskId,
              review_recorded: true,
              source_document: "Documento de prueba",
              consulted_at: "2026-11-26",
              note
            }]
          }]
        }))
      });
      await page.locator("#import-review-file").setInputFiles(reviewFile("moreno-slow-review.json", "cadastral", "registro lento"));
      await page.waitForFunction(() => document.getElementById("review-status")?.getAttribute("aria-busy") === "true");
      await page.locator("#import-review-file").setInputFiles(reviewFile("moreno-fast-review.json", "legal", "registro rápido"));
      await page.waitForFunction(() => document.getElementById("review-status")?.textContent.includes("Importación revisada:"));
      await delay(380);
      const latestReviewState = await page.evaluate(() => JSON.parse(localStorage.getItem("moreno-map-review-v2") || "{}"));
      check(Boolean(latestReviewState.rp25?.legal) && latestReviewState.rp25.legal.note === "registro rápido" && !latestReviewState.rp25.cadastral, "mapa-ia: la importación más reciente prevalece sobre una lectura anterior más lenta");

      await page.locator("#import-review-file").setInputFiles(reviewFile("moreno-slow-review.json", "cadastral", "debe descartarse al borrar"));
      await page.waitForFunction(() => document.getElementById("review-status")?.getAttribute("aria-busy") === "true");
      await page.locator("#clear-review").click();
      await delay(380);
      const clearedReviewState = await page.evaluate(() => ({
        current: localStorage.getItem("moreno-map-review-v2"),
        legacy: localStorage.getItem("moreno-map-review-v1"),
        status: document.getElementById("review-status")?.textContent,
        busy: document.getElementById("review-status")?.getAttribute("aria-busy")
      }));
      check(clearedReviewState.current === null && clearedReviewState.legacy === null, "mapa-ia: una importación pendiente no restaura la bitácora después de borrarla");
      check(clearedReviewState.status.includes("Bitácora local borrada") && !clearedReviewState.busy, "mapa-ia: el resultado del borrado permanece visible después de finalizar la lectura obsoleta");

      await page.locator("#map-verification-disclosure > summary").click();
      check(await page.locator("#map-verification-title").isVisible(), "mapa-ia: la mesa de fuentes oficiales no se abre");

      await page.locator("#map-data-export-disclosure > summary").click();
      check(await page.locator("#map-data-export-disclosure").evaluate(element => element.open), "mapa-ia: el grupo de exportaciones no se abre");
      check(await page.locator("#export-csv").isVisible() && await page.locator("#export-geojson").isVisible(), "mapa-ia: las descargas CSV y GeoJSON quedan disponibles al abrir exportaciones");

      const thesisCard = page.locator('[data-map-item="rp25"]');
      await thesisCard.locator("summary").click();
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
    check((await page.locator("#pyme-total-count").innerText()).includes("30 noticias"), "INFO PYME: informa el total editorial");
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
    await page.addInitScript(() => {
      localStorage.setItem("moreno-map-review-v2", JSON.stringify({
        rp25: { cadastral: {
          completed: true,
          source_document: "Fuente sintética de auditoría",
          consulted_at: "2026-11-26",
          note: "Dato de prueba; no corresponde a un inmueble real."
        } }
      }));
    });
    await page.route("https://unpkg.com/maplibre-gl@5.6.1/dist/maplibre-gl.js", route => route.abort());
    const response = await page.goto(BASE_URL + "/mapa-ia/", { waitUntil: "domcontentloaded" });
    check(Boolean(response && response.ok()), "mapa-ia fallback: la página responde aunque falle el motor cartográfico");
    await page.locator(".map-static-fallback").waitFor({ state: "visible", timeout: 5000 });
    check(await page.locator(".map-static-diagram").count() === 1, "mapa-ia fallback: se genera el esquema SVG sin MapLibre");
    const fallbackReferenceCount = await page.locator("#atlas-total-count").evaluate(element => Number(element.textContent.split("/")[0].trim()));
    check(fallbackReferenceCount > 0, "mapa-ia fallback: el índice publica el total del inventario");
    check(await page.locator("[data-fallback-reference]").count() === fallbackReferenceCount, "mapa-ia fallback: el índice alternativo incluye todo el inventario");
    check((await page.locator(".map-static-note").innerText()).includes("no tiene escala"), "mapa-ia fallback: el alcance no parcelario queda explicado");
    check(await page.locator('[data-fallback-reference="terreno-san-juan-bautista-1374"]').count() === 1, "mapa-ia fallback: una publicación nueva permanece en el índice aunque no tenga coordenadas");
    check((await page.locator('[data-fallback-reference="terreno-san-juan-bautista-1374"]').innerText()).includes("Geolocalización pendiente"), "mapa-ia fallback: las publicaciones sin coincidencia no reciben un punto ficticio");
    check((await page.locator(".map-review-privacy").innerText()).includes("sin cifrado"), "mapa-ia: la bitácora advierte que el almacenamiento local no está cifrado");
    check(await page.locator("#clear-review").isVisible(), "mapa-ia: el control para borrar la bitácora está disponible");
    check(await page.locator("#duplicate-review-disclosure").evaluate(element => element.open), "mapa-ia: la bandeja de coincidencias se abre por defecto en escritorio");
    const duplicatePairCount = await page.locator("#duplicate-review-list .map-duplicate-pair").count();
    check(duplicatePairCount >= 2, "mapa-ia: la bandeja muestra las relaciones de posible duplicación declaradas");
    const duplicateReviewText = await page.locator("#duplicate-review-list").innerText();
    check(duplicateReviewText.includes("PIR25") && duplicateReviewText.includes("Polo 24"), "mapa-ia: las dos relaciones territoriales conocidas quedan identificadas");
    const duplicateReferenceHrefs = await page.locator("#duplicate-review-list [data-duplicate-reference]").evaluateAll(links => links.map(link => link.href));
    check(duplicateReferenceHrefs.length >= 4 && duplicateReferenceHrefs.every(href => Boolean(new URL(href).searchParams.get("ref"))), "mapa-ia: cada relación ofrece enlaces directos a ambas fichas");
    check((await page.locator(".map-duplicate-review-note").innerText()).includes("no se fusiona"), "mapa-ia: la interfaz advierte que las coincidencias no fusionan publicaciones");
    check(await page.evaluate(() => Boolean(localStorage.getItem("moreno-map-review-v2"))), "mapa-ia: la auditoría cargó una bitácora sintética en el navegador");
    await page.evaluate(() => { window.confirm = () => true; });
    await page.locator("#clear-review").click();
    check(await page.evaluate(() => localStorage.getItem("moreno-map-review-v2") === null && localStorage.getItem("moreno-map-review-v1") === null), "mapa-ia: borrar la bitácora elimina las claves actuales y heredadas");
    check((await page.locator("#review-status").innerText()).includes("Bitácora local borrada"), "mapa-ia: la interfaz confirma el borrado realizado");

    await page.setViewportSize({ width: 390, height: 844 });
    const duplicateDisclosure = page.locator("#duplicate-review-disclosure");
    check(!(await duplicateDisclosure.evaluate(element => element.open)), "mapa-ia: la bandeja se pliega por defecto en móvil");
    await duplicateDisclosure.locator("> summary").click();
    check(await duplicateDisclosure.evaluate(element => element.open), "mapa-ia: la bandeja se abre con un toque en móvil");
    check(await page.locator(".map-duplicate-review-note").isVisible(), "mapa-ia: la advertencia de revisión humana queda visible al abrir la bandeja");
    const fallbackLayoutIsNatural = await page.locator(".map-canvas.is-static-fallback").evaluate(element => {
      const panel = element.querySelector(".map-static-fallback");
      const diagram = panel && panel.querySelector(".map-static-diagram");
      const indexHeading = panel && panel.querySelector(".map-static-index-title");
      if (!panel || !diagram || !indexHeading) return false;
      const diagramBox = diagram.getBoundingClientRect();
      const headingBox = indexHeading.getBoundingClientRect();
      return getComputedStyle(element).overflowY === "visible" &&
        getComputedStyle(panel).overflowY === "visible" &&
        element.scrollHeight <= element.clientHeight + 1 &&
        panel.scrollHeight <= panel.clientHeight + 1 &&
        headingBox.top >= diagramBox.bottom - 1;
    });
    check(fallbackLayoutIsNatural, "mapa-ia fallback: el diagrama y el índice fluyen sin solapamiento ni scroll anidado en móvil");
    check(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), "mapa-ia fallback: no hay desbordamiento horizontal en móvil");
    check(await page.locator("[data-fallback-reference]").count() === fallbackReferenceCount, "mapa-ia fallback: todas las referencias siguen dentro del flujo visible");
    if (!(await page.locator("#map-refine-filters").evaluate(element => element.open))) {
      await page.locator("#map-refine-filters > summary").click();
    }
    await page.locator("#category").selectOption("opportunity");
    await page.locator("#activity-filter").selectOption("industrial");
    check(await page.locator("[data-fallback-reference]").count() === 3, "mapa-ia fallback: el filtro combinado conserva tres tesis industriales");
    const fallbackNames = await page.locator(".map-static-index-button").allInnerTexts();
    check(fallbackNames.some(value => value.includes("RP25")) && fallbackNames.some(value => value.includes("Ecoparque")) && fallbackNames.some(value => value.includes("Base Aérea")), "mapa-ia fallback: las tres referencias industriales permanecen identificables");
    check(await page.locator("#map-touch-controls").isHidden(), "mapa-ia fallback: oculta controles interactivos cuando no existe motor cartográfico");

    await page.locator('[data-fallback-reference="rp25"]').click();
    check(new URL(page.url()).searchParams.get("ref") === "rp25", "mapa-ia fallback: seleccionar una referencia actualiza el enlace compartible");
    check(await page.locator('[data-map-item="rp25"]').evaluate(element => element.open), "mapa-ia fallback: seleccionar una referencia abre su ficha");
    check(await page.locator('[data-map-item="rp25"]').evaluate(element => element.classList.contains("is-active")), "mapa-ia fallback: la selección se sincroniza con el inventario");

    await page.locator("#search").fill("zzzxqv 918273");
    check(await page.locator("[data-fallback-reference]").count() === 0, "mapa-ia fallback: una búsqueda vacía no conserva marcadores ajenos al filtro");
    check(await page.locator(".map-static-empty").isVisible(), "mapa-ia fallback: informa cuando no hay coincidencias");
    await page.locator("#reset-map").click();
    check(await page.locator("[data-fallback-reference]").count() === fallbackReferenceCount, "mapa-ia fallback: restablecer recupera todo el inventario");

    const screenshotDir = path.join(ROOT, "test-results", "visual");
    fs.mkdirSync(screenshotDir, { recursive: true });
    await page.screenshot({ path: path.join(screenshotDir, "mapa-ia-fallback-mobile.png"), fullPage: true, animations: "disabled" });
    check(pageErrors.length === 0, "mapa-ia fallback: errores JavaScript: " + pageErrors.join(" | "));
    console.log("PASS: mapa-ia — esquema alternativo sin MapLibre, filtros, selección y enlace directo");
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
