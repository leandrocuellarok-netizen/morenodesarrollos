"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { spawn } = require("node:child_process");
const { chromium } = require("playwright");

const ROOT = path.resolve(__dirname, "..");
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

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
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

    if (route.slug === "mapa-ia") {
      const disclosureIds = [
        "map-refine-filters",
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
      await page.locator("#map-refine-filters > summary").click();
      check(!(await page.locator("#map-refine-filters").evaluate(element => element.open)), "mapa-ia: los filtros secundarios no se pueden volver a contraer");

      await page.locator("#atlas-index-disclosure > summary").click();
      await page.locator("#kind-filter").selectOption("industrial");
      await delay(80);
      const filteredSummary = await page.locator("#atlas-index-summary").innerText();
      check(filteredSummary.includes("2 referencias"), "mapa-ia: el resumen móvil no refleja el filtro industrial");
      await page.locator("#reset-map").click();
      const resetSummary = await page.locator("#atlas-index-summary").innerText();
      check(resetSummary.includes("11 referencias"), "mapa-ia: el resumen móvil no se actualiza al restablecer el inventario");

      await page.locator("#map-review-disclosure > summary").click();
      check(await page.locator(".map-review-toolbar").isVisible(), "mapa-ia: la bitácora local no se abre");
      await page.locator("#map-verification-disclosure > summary").click();
      check(await page.locator("#map-verification-title").isVisible(), "mapa-ia: la mesa de fuentes oficiales no se abre");
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

(async function main() {
  let server;
  let browser;
  try {
    server = await startServer();
    browser = await chromium.launch({ headless: true });
    for (const route of ROUTES) {
      await auditRoute(browser, route);
    }
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
    console.log(`Auditoría responsive aprobada: ${ROUTES.length} rutas, ${WIDTHS.length} anchos y capturas de escritorio/móvil.`);
  }
})();
