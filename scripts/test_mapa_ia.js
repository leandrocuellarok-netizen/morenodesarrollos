"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const modulePath = path.join(__dirname, "../assets/js/mapa-ia.js");
const source = fs.readFileSync(modulePath, "utf8");
const stylePath = path.join(__dirname, "../assets/css/mapa-ia.css");
const styles = fs.readFileSync(stylePath, "utf8");
const { localities, opportunities, publishedProperties, all, countInventory, filterReferences, buildCsv, buildGeoJson, hasCoordinates, georefAddressMatches, resolvePublishedGeoreferences, GEOREF_MAX_CONCURRENCY, buildTerritorialBrief, buildTerritorialBriefHtml, buildTerritorialDossier, buildTerritorialDossierDiagram, buildTerritorialDossierHtml, getSharedReferenceId, referenceContactLabel, normalizeMapViewState, parseMapViewState, buildMapViewUrl, buildReferenceUrl, buildOpportunityContactUrl, availabilityFilterKey, formatSourceReviewDate, shouldFitMunicipalBounds, prefersReducedMotion, reviewTasks, REVIEW_STORAGE_KEY, normalizeReviewState, readReviewState, writeReviewState, clearReviewState, updateReviewState, getReviewSummary, buildReviewExport, parseReviewImport, mergeReviewStates, isValidReviewDate, LEGACY_REVIEW_STORAGE_KEY } = require(modulePath);
assert.ok(source.indexOf("mapElement.replaceChildren();") < source.indexOf("new maplibregl.Map("), "el contenedor se vacía antes de crear el mapa");
assert.ok(source.includes("maplibregl.Marker"), "los puntos usan marcadores MapLibre");
assert.ok(source.includes("https://tile.openstreetmap.org/{z}/{x}/{y}.png"), "la capa base usa teselas OSM");
assert.ok(source.includes("attributionControl: { compact: false }"), "la atribución OSM permanece visible también en móvil");
assert.ok(source.includes("https://www.openstreetmap.org/fixthemap"), "se ofrece el enlace para reportar problemas cartográficos");
const mapPage = fs.readFileSync(path.join(__dirname, "../mapa-ia/index.html"), "utf8");
assert.ok(mapPage.includes('class="map-filter-group"'), "los filtros se agrupan en una barra editorial");
assert.ok(mapPage.includes('id="kind-filter"'), "el atlas permite filtrar por sector o línea de desarrollo");
assert.ok(mapPage.includes('id="availability-filter"'), "el atlas permite filtrar el estado registrado de las publicaciones");
for (const state of ["no-confirmada", "pendiente-revalidacion", "no-vigente"]) {
  assert.ok(mapPage.includes('option value="' + state + '"'), "el filtro ofrece el estado " + state);
}
for (const kind of ["industrial", "commercial", "tourism", "land"]) {
  assert.ok(mapPage.includes('option value="' + kind + '"'), "el filtro ofrece el sector " + kind);
}
assert.ok(mapPage.includes('label class="map-filter-field'), "cada filtro tiene una etiqueta visible y asociada");
assert.ok(mapPage.includes("Sector / línea de desarrollo"), "la función del filtro sectorial se explica en pantalla");
assert.ok(source.includes('getElementById("kind-filter")'), "el motor conecta el control sectorial");
assert.ok(source.includes('kind: doc.getElementById("kind-filter").value'), "la renderización utiliza el sector seleccionado");
assert.ok(source.includes('kindInput.addEventListener("change", render)'), "el cambio de sector vuelve a renderizar el inventario");
assert.ok(source.includes('kindInput.value = "all"'), "restablecer limpia también el filtro sectorial");
assert.ok(mapPage.includes('id="map-verification-title"'), "el Mapa IA incluye la mesa de verificación documental");
for (const indexId of ["atlas-index-status", "atlas-localities-count", "atlas-documented-count", "atlas-hypotheses-count", "atlas-published-count", "atlas-total-count"]) {
  assert.ok(mapPage.includes('id="' + indexId + '"'), "el atlas muestra el indicador " + indexId);
}
const initialInventoryCounts = countInventory(all);
function readStaticAtlasCount(id) {
  const match = mapPage.match(new RegExp('id="' + id + '">([^<]+)<'));
  assert.ok(match, "el HTML inicial conserva el contador " + id);
  return match[1].trim();
}
assert.equal(readStaticAtlasCount("atlas-localities-count"), String(initialInventoryCounts.localities).padStart(2, "0"));
assert.equal(readStaticAtlasCount("atlas-documented-count"), String(initialInventoryCounts.documented).padStart(2, "0"));
assert.equal(readStaticAtlasCount("atlas-hypotheses-count"), String(initialInventoryCounts.hypotheses).padStart(2, "0"));
assert.equal(readStaticAtlasCount("atlas-published-count"), String(initialInventoryCounts.published), "el HTML inicial coincide con los avisos y proyectos publicados");
assert.equal(readStaticAtlasCount("atlas-total-count"), initialInventoryCounts.total + " / " + initialInventoryCounts.total, "el HTML inicial coincide con el total del inventario");
assert.ok(mapPage.includes(initialInventoryCounts.total + " referencias · " + initialInventoryCounts.localities + " localidades · " + initialInventoryCounts.documented + " contextos con fuente · " + initialInventoryCounts.hypotheses + " hipótesis · " + initialInventoryCounts.published + " avisos y proyectos"), "el resumen estático coincide con el catálogo");
assert.ok(mapPage.includes(initialInventoryCounts.total + " de " + initialInventoryCounts.total + " referencias visibles"), "el estado estático coincide con el catálogo");
assert.ok(mapPage.includes("La forma distingue la clase"), "la leyenda explica la semántica de los símbolos sin depender del color");
assert.ok(mapPage.includes('option value="published"'), "el filtro ofrece la capa de publicaciones inmobiliarias");
assert.ok(mapPage.includes('id="published-list"'), "el mapa contiene una lista independiente de publicaciones");
const publicationIntro = mapPage.match(/<p class="map-published-intro">([\s\S]*?)<\/p>/)?.[1] || "";
assert.ok(publicationIntro && !/\d{2}\/\d{2}\/\d{4}/.test(publicationIntro), "la introducción no debe congelar una fecha global de revisión");
assert.ok(source.includes("function geocodePublishedAddresses()"), "la capa intenta georreferenciar las direcciones publicadas");
assert.ok(source.includes("https://apis.datos.gob.ar/georef/api/v2.0/direcciones"), "la georreferencia utiliza el servicio oficial Georef");
assert.ok(source.includes("function availabilityFilterKey(value)"), "el motor normaliza estados comerciales permitidos");
assert.ok(source.includes('url.searchParams.set("vigencia", normalized.availability)'), "el enlace compartido conserva el estado de publicación");
assert.ok(styles.includes(".map-pin-published") && styles.includes(".published-dot"), "la capa publicada tiene símbolo cartográfico propio");
assert.ok(mapPage.includes('id="export-review"'), "el Mapa IA permite exportar la bitácora local");
assert.ok(mapPage.includes('id="review-status"'), "el Mapa IA explica el estado y alcance del guardado local");
assert.ok(mapPage.includes('id="clear-review"'), "el Mapa IA permite borrar la bitácora local desde la interfaz");
assert.match(mapPage, /almacenamiento local del navegador sin cifrado/i, "la bitácora explica que el almacenamiento local no está cifrado");
assert.ok(source.includes("function clearReviewState(storage)"), "el motor expone una operación controlada de borrado");
assert.ok(source.includes('reviewClearButton.addEventListener("click"'), "el control de borrado está conectado a la interfaz");
assert.ok(source.includes("let reviewImportSequence = 0;"), "la importación de bitácora controla solicitudes concurrentes");
assert.ok(source.includes("requestId !== reviewImportSequence"), "las lecturas obsoletas no pueden aplicar cambios ni limpiar el estado de una importación nueva");
assert.ok(source.includes('reviewStatusElement.setAttribute("aria-busy", "true")'), "el estado de lectura se comunica a tecnologías de asistencia");
assert.match(mapPage, /no se envían al servidor[\s\S]*Exportar bitácora JSON/i, "la página explica que la bitácora no se transmite y puede exportarse");
assert.ok(mapPage.includes('href="https://mapas.moreno.gob.ar/"'), "se enlaza el visor cartográfico oficial de Moreno");
assert.ok(mapPage.includes('href="https://arba.gov.ar/geoarba/inicio.asp"'), "se enlaza GeoARBA como fuente provincial");
assert.ok(mapPage.includes('href="https://www.moreno.gob.ar/catastro.php"'), "se enlaza la Dirección de Catastro municipal");
assert.ok(mapPage.includes('href="https://moreno2.moreno.gob.ar/docs/catastro/mapa_zonificacion.pdf"'), "se conserva el plano municipal histórico como antecedente");
const safeSourceLinks = [
  'href="https://mapas.moreno.gob.ar/" target="_blank" rel="noopener noreferrer"',
  'href="https://arba.gov.ar/geoarba/inicio.asp" target="_blank" rel="noopener noreferrer"',
  'href="https://www.moreno.gob.ar/catastro.php" target="_blank" rel="noopener noreferrer"',
  'href="https://moreno2.moreno.gob.ar/docs/catastro/mapa_zonificacion.pdf" target="_blank" rel="noopener noreferrer"'
];
for (const safeLink of safeSourceLinks) {
  assert.ok(mapPage.includes(safeLink), "las fuentes oficiales abren de forma segura: " + safeLink);
}

assert.match(mapPage, /anexo de junio de 2015[\s\S]*no confirma la normativa vigente/i, "el plano histórico advierte que no acredita normativa actual");
assert.match(mapPage, /nomenclatura catastral[\s\S]*certificado o constancia urbanística vigente/i, "la secuencia exige individualización y normativa actual");
assert.match(mapPage, /organismo o profesional consultado, documento, fecha de consulta/i, "la ficha exige trazabilidad documental");

assert.ok(source.includes("function setActiveReference(item, options)"), "la selección sincroniza mapa e inventario");
assert.ok(source.includes("function getSharedReferenceId(search, items)"), "las referencias admiten enlaces directos");
assert.ok(source.includes("function buildReferenceUrl(baseUrl, referenceId)"), "cada ficha puede construir una URL compartible");
assert.ok(source.includes("updateShareUrl(item.id)"), "la selección actualiza la URL sin recargar");
assert.ok(source.includes('shareLink.textContent = "Abrir ficha compartible ↗"'), "las fichas y ventanas emergentes ofrecen enlaces compartibles");
assert.ok(source.includes("function referenceContactLabel(item)"), "el enlace comercial distingue localidad y tesis");
assert.ok(source.includes("link.textContent = referenceContactLabel(item)"), "la ficha muestra una acción comercial contextual");
assert.ok(source.includes("function buildOpportunityContactUrl(baseUrl, item)"), "el enlace comercial conserva la referencia de origen");
assert.ok(source.includes('contactLinkNode(item, "map-contact-link")'), "el CTA comercial aparece en fichas y ventanas emergentes");
assert.ok(source.includes("if (sharedItem) focusItem(sharedItem)"), "un enlace directo centra y abre la referencia al cargar");
assert.ok(source.includes('map.on("dragstart", markUserNavigation)'), "el mapa registra el desplazamiento manual");
assert.ok(source.includes('map.on("zoomstart", markUserNavigation)'), "el mapa registra el zoom manual");
assert.ok(source.includes('if (!bounds.isEmpty() && shouldFitMunicipalBounds(selectedReferenceId, userHasNavigated))'), "el límite municipal no reemplaza una vista elegida o manipulada");
assert.ok(source.includes("function shouldFitMunicipalBounds(selectedReferenceId, userHasNavigated)"), "la política de encuadre municipal es comprobable");
assert.equal(shouldFitMunicipalBounds(null, false), true, "sin selección ni interacción el límite puede encuadrar el mapa");
assert.equal(shouldFitMunicipalBounds("rp25", false), false, "una referencia compartida conserva su encuadre");
assert.equal(shouldFitMunicipalBounds(null, true), false, "la navegación manual conserva la vista elegida");
assert.ok(source.includes("function prefersReducedMotion(view)"), "la cámara consulta la preferencia de movimiento reducido");
assert.equal(prefersReducedMotion({ matchMedia: query => ({ matches: query === "(prefers-reduced-motion: reduce)" }) }), true);
assert.equal(prefersReducedMotion({ matchMedia: () => ({ matches: false }) }), false);
assert.equal(prefersReducedMotion(null), false);
assert.ok(source.includes("map.jumpTo(camera)"), "las referencias evitan animaciones cuando el sistema reduce movimiento");
assert.ok(source.includes("map.jumpTo(home)"), "restablecer el mapa respeta el movimiento reducido");
assert.ok(styles.includes(".map-share-link"), "los enlaces compartibles tienen un estilo identificable");
assert.ok(styles.includes(".map-item-actions"), "las acciones principales de cada ficha tienen una composición propia");
assert.ok(styles.includes(".map-data-export-disclosure"), "las exportaciones tienen un acceso secundario propio");
assert.ok(styles.includes(".map-filter-group"), "los filtros tienen una composición responsive propia");
assert.ok(styles.includes("minmax(300px, 2fr)"), "la refinación dispone de ancho suficiente para sus dos selectores en escritorio");
assert.ok(styles.includes(".map-filter-field"), "los controles muestran etiquetas y foco visible");
assert.ok(styles.includes(".map-published-status"), "las fichas distinguen visualmente el estado comercial registrado");
assert.ok(styles.includes(".map-published-review-date"), "las fichas muestran la fecha de consulta de la fuente");
assert.ok(styles.includes(".map-toolbar-actions"), "las acciones del mapa se agrupan fuera de los filtros");
assert.equal(getSharedReferenceId("?ref=rp25", all), "rp25", "se reconoce una referencia válida desde la URL");
assert.equal(getSharedReferenceId("?ref=no-existe", all), null, "se descarta una referencia desconocida");
assert.equal(getSharedReferenceId("", all), null, "sin parámetro no se fuerza una selección");
const parsedMapView = parseMapViewState(
  "?q=log%C3%ADstica&tipo=opportunity&sector=industrial&evidencia=documented&vigencia=no-vigente&ref=rp25",
  all
);
assert.deepEqual(parsedMapView, {
  query: "logística",
  category: "opportunity",
  kind: "industrial",
  evidence: "documented",
  availability: "no-vigente",
  ref: "rp25"
}, "la URL restaura búsqueda, tipo, sector, evidencia, estado de publicación y referencia");
assert.deepEqual(parseMapViewState("?tipo=desconocido&sector=ilegal&evidencia=pendiente&vigencia=ilegal&ref=falso", all), {
  query: "", category: "all", kind: "all", evidence: "all", availability: "all", ref: null
}, "los parámetros no permitidos vuelven a valores seguros");
assert.equal(parseMapViewState("?q=" + "x".repeat(140), all).query.length, 100, "la búsqueda compartida se limita a cien caracteres");
const normalizedMapView = normalizeMapViewState({
  query: "  suelo  ",
  category: "opportunity",
  kind: "land",
  evidence: "hypothesis",
  availability: "pendiente-revalidacion",
  ref: "cuartel"
}, all);
assert.equal(normalizedMapView.query, "suelo");
assert.equal(normalizedMapView.availability, "pendiente-revalidacion");
const mapViewUrl = new URL(buildMapViewUrl(
  "https://example.org/mapa-ia/?utm_source=mail&q=viejo&sector=tourism#inventario",
  parsedMapView,
  all
));
assert.equal(mapViewUrl.searchParams.get("utm_source"), "mail", "se conservan parámetros ajenos al mapa");
assert.equal(mapViewUrl.searchParams.get("q"), "logística");
assert.equal(mapViewUrl.searchParams.get("tipo"), "opportunity");
assert.equal(mapViewUrl.searchParams.get("sector"), "industrial");
assert.equal(mapViewUrl.searchParams.get("evidencia"), "documented");
assert.equal(mapViewUrl.searchParams.get("vigencia"), "no-vigente");
assert.equal(mapViewUrl.searchParams.get("ref"), "rp25");
assert.equal(mapViewUrl.hash, "#inventario", "la URL compartida conserva el fragmento");
const defaultMapViewUrl = new URL(buildMapViewUrl(
  "https://example.org/mapa-ia/?q=viejo&tipo=locality&sector=land&evidencia=hypothesis&vigencia=no-confirmada&ref=rp25",
  {},
  all
));
assert.equal(["q", "tipo", "sector", "evidencia", "vigencia", "ref"].some(key => defaultMapViewUrl.searchParams.has(key)), false, "restablecer elimina todos los parámetros del mapa");
const sharedUrl = new URL(buildReferenceUrl("https://example.org/mapa-ia/?layer=all&sector=industrial&q=dep%C3%B3sitos&vigencia=no-confirmada#inventario", "rp25"));
assert.equal(sharedUrl.searchParams.get("ref"), "rp25", "la URL compartible identifica la referencia");
assert.equal(sharedUrl.searchParams.get("layer"), "all", "la URL compartible conserva otros parámetros");
assert.equal(sharedUrl.searchParams.get("sector"), "industrial", "la ficha compartible conserva los filtros activos");
assert.equal(sharedUrl.searchParams.get("q"), "depósitos", "la ficha compartible conserva la búsqueda activa");
assert.equal(sharedUrl.searchParams.get("vigencia"), "no-confirmada", "la ficha compartible conserva el filtro de estado registrado");
assert.equal(sharedUrl.hash, "#inventario", "la URL compartible conserva el fragmento existente");
assert.ok(mapPage.includes('id="map-data-export-disclosure"'), "las exportaciones cartográficas se agrupan en un acceso secundario");
assert.ok(mapPage.includes("CSV para hojas de cálculo"), "la descarga CSV explica su uso");
assert.ok(mapPage.includes("GeoJSON para QGIS y otros GIS"), "la descarga GeoJSON explica su uso");
assert.ok(mapPage.includes('id="share-map-view"'), "el atlas ofrece una acción para compartir la vista filtrada");
assert.ok(mapPage.includes('id="map-share-status"'), "la acción anuncia el resultado de compartir");
assert.ok(mapPage.includes('id="map-share-url"'), "existe una alternativa manual si el portapapeles no está disponible");
assert.ok(mapPage.includes("no comparte la bitácora local"), "el enlace compartible excluye la bitácora privada del navegador");
assert.ok(source.includes("function parseMapViewState(search, items)"), "la URL se puede restaurar al abrir el enlace");
assert.ok(source.includes("function buildMapViewUrl(baseUrl, state, items)"), "la vista completa se serializa en una URL");
assert.ok(source.includes("function shareCurrentView()"), "la interfaz ofrece compartir o copiar la vista");
assert.ok(source.includes('shareViewButton.addEventListener("click", shareCurrentView)'), "el botón está conectado a la acción de compartir");
assert.ok(source.includes("navigator.clipboard"), "se usa el portapapeles con alternativa manual");
assert.ok(styles.includes(".map-share-status"), "el estado de compartir tiene presentación accesible");
assert.ok(styles.includes(".map-share-fallback"), "la alternativa manual tiene estilos propios");
const contactUrl = new URL(buildOpportunityContactUrl("https://example.org/proyecto/mapa-ia/", {
  id: "rp25",
  name: "RP25 · Darwin Passaponti"
}));
assert.equal(contactUrl.pathname, "/proyecto/oportunidades/", "el CTA lleva al formulario de oportunidades");
assert.equal(contactUrl.searchParams.get("map_ref"), "rp25", "el contacto conserva el identificador de la referencia");
assert.equal(contactUrl.searchParams.has("map_name"), false, "el contacto no confía en etiquetas editables de la URL");
assert.equal(referenceContactLabel({ type: "opportunity" }), "Conversar sobre esta tesis ↗", "la tesis ofrece una acción comercial contextual");
assert.equal(referenceContactLabel({ type: "locality" }), "Consultar sobre esta localidad ↗", "la localidad ofrece una acción comercial contextual");

assert.ok(source.includes("card.dataset.mapItem = item.id"), "cada ficha tiene una identidad enlazable");
assert.ok(source.includes('actions.className = "map-item-actions"'), "cada ficha reúne las acciones principales antes de la diligencia");
assert.ok(source.includes('actions.append(contactLinkNode(item, "map-contact-link map-contact-primary"))'), "la consulta comercial queda al inicio de la ficha");
assert.ok(source.includes("body.append(reviewPanelNode(item))"), "la bitácora permanece después de las acciones de la ficha");
assert.ok(source.includes('element.addEventListener("click", () => {'), "seleccionar un marcador abre su ficha asociada");
assert.ok(source.includes('card.scrollIntoView({'), "la ficha seleccionada se revela en el inventario");
assert.ok(source.includes('matchMedia("(prefers-reduced-motion: reduce)")'), "el desplazamiento respeta la preferencia de movimiento reducido");
assert.ok(styles.includes(".map-pin.is-selected"), "el marcador seleccionado tiene un estado visual");
assert.ok(styles.includes(".map-pin-hypothesis.is-selected"), "el rombo conserva su forma al seleccionarse");
assert.ok(styles.includes(".map-atlas-index"), "el índice editorial tiene una composición propia");
assert.ok(styles.includes(".map-atlas-stat:nth-of-type(even)"), "en móvil los bordes del índice respetan la primera columna");
assert.ok(styles.includes(".documented-dot"), "la leyenda diferencia el contexto con fuente por forma");
assert.ok(styles.includes(".hypothesis-dot"), "la leyenda diferencia la hipótesis por forma");
assert.ok(styles.includes(".map-item.is-active"), "la ficha seleccionada tiene un estado visual");
assert.ok(source.includes('getElementById("export-geojson")'), "el inventario ofrece exportación GeoJSON");
assert.ok(source.includes("function exportVisibleGeoJson()"), "la descarga GeoJSON usa las referencias visibles");
assert.ok(source.includes('type: "application/geo+json;charset=utf-8"'), "la descarga declara el tipo MIME GeoJSON");
assert.ok(source.includes('link.download = "moreno-mapa-ia-referencias.geojson"'), "la descarga usa extensión GeoJSON");


assert.equal(localities.length, 6, "se conservan las seis localidades");
assert.equal(opportunities.length, 5, "se conservan las cinco tesis");
assert.ok(publishedProperties.length >= 28, "la capa publicada conserva el inventario histórico y las incorporaciones verificadas");
assert.equal(all.length, localities.length + opportunities.length + publishedProperties.length, "el total coincide con localidades, tesis y publicaciones");
assert.equal(new Set(all.map(item => item.id)).size, all.length, "los identificadores son únicos");
assert.equal(new Set(publishedProperties.map(item => item.source)).size, publishedProperties.length, "los enlaces de publicaciones no se duplican");

const nov27ExpectedIds = [
  "terreno-san-juan-bautista-1374",
  "terreno-ricardo-rojas-4418-3830",
  "terreno-general-alvarado-322-922",
  "casa-bernardino-rivadavia-1000",
  "casa-naciones-unidas-1500",
  "casa-country-san-diego-1500",
  "desarrollo-barrio-del-golf-atuel-2700",
  "desarrollo-colonos-ii-2300",
  "desarrollo-ibis-iv-273",
  "desarrollo-140-camilli"
];
for (const id of nov27ExpectedIds) {
  assert.ok(publishedProperties.some(item => item.id === id), "la revisión incorpora " + id);
}

const followupExpectedIds = [
  "desarrollo-polo-veinticinco-15ha-37-lotes",
  "terreno-r25-2000-200000",
  "terreno-r25-lote33-2888",
  "terreno-r25-5000-500000",
  "terreno-ricchieri-50000-industrial",
  "terreno-ruta25-4700-9835",
  "terreno-goncalves-eiras-don-bosco-75020",
  "terreno-polo24-gral-hornos-6100-4860",
  "terreno-pueyrredon-2025-337",
  "terreno-jose-maria-paz-600-356",
  "terreno-prados-oeste2-lote145-781",
  "terreno-joaquin-v-gonzalez-2400-615",
  "casa-patricias-argentinas-2300-2762",
  "casa-chiclana-100-1988",
  "desarrollo-chacras-teofilo-galileo-7300",
  "terreno-derqui-7660-384",
  "terreno-abdon-calderon-1000-250",
  "terreno-conscripto-bernardi-1800-3888",
  "terreno-lamadrid-el-vergel-2161",
  "terreno-camilli-60-1000",
  "terreno-justo-daract-2000-630",
  "terreno-vidt-1700-420",
  "terreno-paramaribo-alvarez-jonte-425",
  "terreno-jose-obregoso-600-600",
  "terreno-diario-la-nacion-iguazu-420",
  "terreno-nanduti-2000-324-mejoras",
  "terreno-san-fernando-araucanos-7522-historico",
  "desarrollo-fructuoso-rivera-ruta25-460000-338parcelas",
  "desarrollo-ampliacion-sip2-cuarter-v-52ha",
  "chacras-teofilo-lote-324-historico",
  "casa-el-casco-733-212-historico",
  "casa-cervino-100-350-historico",
  "casa-leandro-alem-2100-562-historico"
];
for (const id of followupExpectedIds) {
  assert.ok(publishedProperties.some(item => item.id === id), "la revisión de seguimiento incorpora " + id);
}
assert.equal(publishedProperties.find(item => item.id === "terreno-san-fernando-araucanos-7522-historico").availabilityStatus, "No vigente");
assert.equal(publishedProperties.find(item => item.id === "chacras-teofilo-lote-324-historico").availabilityStatus, "No vigente");
assert.equal(publishedProperties.find(item => item.id === "desarrollo-fructuoso-rivera-ruta25-460000-338parcelas").availabilityStatus, "No vigente");
assert.ok(publishedProperties.filter(item => item.geocodeDisabled === true).every(item => item.lat === null && item.lng === null), "las ubicaciones aproximadas o ambiguas no reciben coordenadas");
assert.equal(publishedProperties.find(item => item.id === "terreno-r25-lote33-2888").availabilityStatus, "No confirmada");

const hourlyExpectedIds = [
  "terreno-bouchard-300-461",
  "terreno-sarmiento-500-750",
  "terreno-ecoparque-irlanda-2000",
  "casa-centenario-600-360",
  "casa-venezuela-2400-456",
  "casa-francisco-de-aguirre-6400",
  "casa-racine-800-no-vigente",
  "desarrollo-prados-del-oeste-hornos-2800",
  "terreno-teniente-camilli-240-975",
  "terreno-yapeyu-rafael-arcos-2850",
  "terreno-prados-del-oeste-lote-230-800",
  "terreno-general-savio-100-2050",
  "desarrollo-ecoparque-78-parcelas",
  "terreno-parques-morenito-300-300",
  "terreno-pim-i-parque-municipal-2493",
  "terreno-pim-ii-rp24-2677",
  "terreno-pim-ii-rp24-7700-2103",
  "casa-san-ramon-2700-251",
  "casa-perito-moreno-3800-350",
  "terreno-los-abedules-4100-521",
  "terreno-chacabuco-emilio-mitre-206",
  "casa-francisco-piovano-3700-2960",
  "casa-faraday-2700-1472",
  "casa-intendente-pagano-2600-320",
  "casa-intendente-corvalan-2400-792",
  "desarrollo-villa-justina-2199",
  "terreno-ruta24-10ha-100000",
  "terreno-larrea-2419-220",
  "terreno-general-hornos-sn-939",
  "terreno-salto-600-595",
  "terreno-juan-diaz-solis-1800-595",
  "terreno-los-abedules-lote121-600",
];
for (const id of hourlyExpectedIds) {
  assert.ok(publishedProperties.some(item => item.id === id), "la revisión horaria incorpora " + id);
}
assert.equal(publishedProperties.find(item => item.id === "la-reja-casa-quinta-santa-teresa-2401").availabilityStatus, "No vigente");
assert.equal(publishedProperties.find(item => item.id === "parques-morenito-proyecto").availabilityStatus, "No confirmada");
assert.equal(publishedProperties.find(item => item.id === "sumio-lote-450").availabilityStatus, "No vigente");
assert.equal(publishedProperties.find(item => item.id === "casa-racine-800-no-vigente").availabilityStatus, "No vigente");
assert.equal(publishedProperties.find(item => item.id === "moreno-casa-martin-fierro-4900").availabilityStatus, "Pendiente de revalidación");
assert.ok(publishedProperties.find(item => item.id === "casa-bernardino-rivadavia-1000").price.startsWith("USD 150.000"));

assert.equal(new Set(publishedProperties.map(item => item.id)).size, publishedProperties.length, "no hay IDs duplicados en publicaciones");

const expectedInventoryCounts = { localities: 6, documented: 4, hypotheses: 1, published: publishedProperties.length, total: all.length };
assert.deepEqual(countInventory(all), expectedInventoryCounts);
assert.deepEqual(
  countInventory(filterReferences(all, { evidence: "documented" })),
  { localities: 0, documented: 4, hypotheses: 0, published: 0, total: 4 },
  "el índice refleja el filtro de contextos con fuente"
);
assert.deepEqual(
  countInventory(filterReferences(all, { evidence: "hypothesis" })),
  { localities: 0, documented: 0, hypotheses: 1, published: 0, total: 1 },
  "el índice separa las hipótesis de los contextos con fuente"
);

for (const item of all) {
  if (item.type === "published") {
    assert.equal(hasCoordinates(item), false, "no se inventan coordenadas para publicaciones pendientes: " + item.name);
    assert.match(item.geolocationStatus, /Pendiente/);
    assert.ok(item.verificationStatus && item.verificationStatus.length > 0, "cada ficha conserva un estado de verificación: " + item.name);
    assert.ok(["No confirmada", "No vigente", "Pendiente de revalidación"].includes(item.availabilityStatus), "el estado comercial se conserva sin afirmar disponibilidad: " + item.name);
    assert.match(item.source, /^https:\/\//);
    continue;
  }
  assert.ok(Number.isFinite(item.lat) && item.lat > -35 && item.lat < -34, "latitud plausible para Moreno: " + item.name);
  assert.ok(Number.isFinite(item.lng) && item.lng > -59 && item.lng < -58, "longitud plausible para Moreno: " + item.name);
}
assert.equal(georefAddressMatches({ geocodeMatch: "MARTIN FIERRO 5000" }, { nomenclatura: "MARTIN FIERRO 5000, MORENO, BUENOS AIRES" }), true);
assert.equal(georefAddressMatches({ geocodeMatch: "MARTIN FIERRO 5000" }, { nomenclatura: "MARTIN FIERRO 4900, MORENO, BUENOS AIRES" }), false);

assert.equal(GEOREF_MAX_CONCURRENCY, 3, "las consultas a Georef tienen un límite conservador de concurrencia");
assert.ok(source.includes("async function resolvePublishedGeoreferences(items, fetcher, context, concurrency)"), "la resolución de Georef está aislada y puede probarse sin red");
assert.ok(source.includes("resolvePublishedGeoreferences(publishedProperties, fetcher, view, GEOREF_MAX_CONCURRENCY)"), "la página utiliza la cola limitada para consultar direcciones");
for (const item of opportunities) {
  assert.ok(["documented", "hypothesis"].includes(item.stage), "nivel de evidencia explícito: " + item.name);
  assert.match(item.source, /^https:\/\//, "fuente pública HTTPS: " + item.name);
}

assert.equal(filterReferences(all, { category: "locality" }).length, 6);
assert.equal(filterReferences(all, { category: "opportunity" }).length, 5);
assert.equal(filterReferences(all, { category: "published" }).length, publishedProperties.length);
for (const [status, key] of [
  ["No confirmada", "no-confirmada"],
  ["Pendiente de revalidación", "pendiente-revalidacion"],
  ["No vigente", "no-vigente"]
]) {
  const expected = publishedProperties.filter(item => item.availabilityStatus === status).length;
  assert.ok(expected > 0, "el inventario contiene registros con estado " + status);
  const filtered = filterReferences(all, { availability: key });
  assert.equal(filtered.length, expected, "el filtro devuelve exactamente las publicaciones con estado " + status);
  assert.ok(filtered.every(item => item.type === "published" && item.availabilityStatus === status));
}
assert.equal(filterReferences(all, { availability: "no-confirmada", category: "locality" }).length, 0, "el estado comercial no convierte localidades en publicaciones");
assert.equal(filterReferences(all, { availability: "no-confirmada", query: "no confirmada" }).length, publishedProperties.filter(item => item.availabilityStatus === "No confirmada").length, "la búsqueda reconoce el estado comercial registrado");
assert.equal(filterReferences(all, { availability: "estado-invalido" }).length, all.length, "un filtro de estado desconocido vuelve a la vista completa");
assert.equal(availabilityFilterKey("Pendiente de revalidación"), "pendiente-revalidacion");
assert.equal(availabilityFilterKey("No vigente"), "no-vigente");
assert.equal(formatSourceReviewDate("2026-11-27"), "27/11/2026");
assert.equal(formatSourceReviewDate(""), "No informada");
assert.equal(filterReferences(all, { query: "Isabel la Católica", category: "published" }).length, 1);
assert.equal(filterReferences(all, { query: "Santa Teresa", category: "published" }).length, 1);
assert.equal(filterReferences(all, { evidence: "documented" }).length, 4, "el filtro documentado solo muestra tesis con fuente");
assert.equal(filterReferences(all, { evidence: "hypothesis" }).length, 1, "el filtro de hipótesis no mezcla localidades sin clasificar");
assert.deepEqual(filterReferences(all, { kind: "industrial" }).map(item => item.id), ["rp25", "ecoparque"], "el filtro productivo/logístico muestra las dos referencias industriales existentes");
assert.deepEqual(filterReferences(all, { kind: "commercial" }).map(item => item.id), ["ribera"], "el filtro comercial muestra la referencia existente");
assert.deepEqual(filterReferences(all, { kind: "tourism" }).map(item => item.id), ["roggero"], "el filtro de turismo muestra la referencia existente");
assert.deepEqual(filterReferences(all, { kind: "land" }).map(item => item.id), ["norte"], "el filtro de prospección de suelo muestra la hipótesis existente");
assert.deepEqual(filterReferences(all, { kind: "industrial", evidence: "documented" }).map(item => item.id), ["rp25", "ecoparque"], "el filtro sectorial se combina con el nivel de evidencia");
assert.deepEqual(filterReferences(all, { kind: "industrial", category: "locality" }), [], "un sector de oportunidad no incorpora localidades");
assert.deepEqual(filterReferences(all, { query: "productivo", kind: "industrial" }).map(item => item.id), ["rp25", "ecoparque"], "la búsqueda reconoce la etiqueta visible del sector, no solo su código interno");
assert.deepEqual(
  filterReferences(all, { query: "paso del rey", category: "locality" }).map(item => item.id),
  ["paso"]
);
assert.deepEqual(
  filterReferences(all, { query: "7443/25", category: "opportunity", evidence: "documented" }).map(item => item.id),
  ["rp25"]
);
assert.deepEqual(
  filterReferences(all, { query: "sin coincidencias" }),
  []
);

const csv = buildCsv([{
  type: "opportunity",
  name: 'Parcela "A", sector norte',
  lat: -34.6,
  lng: -58.8,
  kind: "land",
  stage: "hypothesis",
  business: "Prospección",
  evidence: "Sin datos",
  status: "Por verificar",
  next: "Revisar",
  source: "https://example.com"
}]);
assert.ok(csv.startsWith("\uFEFF"), "CSV compatible con acentos en hojas de cálculo");
assert.ok(csv.includes('"Parcela ""A"", sector norte"'), "CSV escapa comillas y comas");
assert.ok(csv.includes("alcance_de_coordenada"), "CSV informa el alcance de las coordenadas");
assert.ok(csv.includes("no identifica una parcela"), "CSV conserva la advertencia parcelaria");
const publishedCsv = buildCsv(all.filter(item => item.type === "published").slice(0, 1));
assert.ok(publishedCsv.includes("precio_publicado"), "CSV incluye el campo de precio de los avisos");
assert.ok(publishedCsv.includes("Anticipo USD 12.000"), "CSV conserva el precio publicado sin reinterpretarlo");
assert.ok(publishedCsv.includes("Geolocalización pendiente"), "CSV conserva el estado de geolocalización pendiente");
const filteredGeoJson = buildGeoJson(filterReferences(all, {
  category: "opportunity",
  evidence: "hypothesis"
}));
assert.equal(filteredGeoJson.type, "FeatureCollection", "la exportación cumple la estructura GeoJSON");
assert.equal(filteredGeoJson.features.length, 1, "GeoJSON respeta los filtros activos");
const hypothesisFeature = filteredGeoJson.features[0];
assert.equal(hypothesisFeature.type, "Feature");
assert.equal(hypothesisFeature.geometry.type, "Point", "las referencias se exportan como puntos, no como parcelas");
assert.deepEqual(
  hypothesisFeature.geometry.coordinates,
  [-58.815, -34.61],
  "GeoJSON usa el orden longitud, latitud de RFC 7946"
);
assert.equal(hypothesisFeature.properties.name, "Cuartel V · Trujui · La Reja");
assert.equal(hypothesisFeature.properties.line_to_investigate, "Prospección de parcelas grandes, ensamble de tierra, asociaciones con propietarios y desarrollos por etapas.");
assert.equal(hypothesisFeature.properties.parcel_identified, false);
assert.equal(hypothesisFeature.properties.availability_verified, false);
assert.match(hypothesisFeature.properties.coordinate_scope, /no identifica una parcela/);
assert.match(filteredGeoJson.disclaimer.toLocaleLowerCase("es-AR"), /ninguna coordenada identifica una parcela/);
assert.equal(
  buildGeoJson(all).features.length,
  all.length,
  "la exportación completa conserva todas las referencias actuales"
);
assert.ok(
  buildGeoJson(all).features.filter(feature => feature.properties.category !== "Propiedades y desarrollos publicados").every(feature => feature.geometry.type === "Point"),
  "las referencias territoriales conservan puntos de referencia"
);
assert.ok(
  buildGeoJson(all).features.filter(feature => feature.properties.category === "Propiedades y desarrollos publicados").every(feature => feature.geometry === null),
  "las publicaciones pendientes no reciben coordenadas inventadas en GeoJSON"
);
assert.ok(
  buildGeoJson(all).features.some(feature => feature.properties.source_url === "https://sibom.slyt.gba.gob.ar/bulletins/14607/contents/2361465"),
  "GeoJSON conserva el enlace a la fuente pública"
);
assert.equal(
  JSON.parse(JSON.stringify(buildGeoJson(all))).features.length,
  all.length,
  "GeoJSON puede serializarse como JSON válido con todo el inventario"
);


assert.equal(reviewTasks.length, 5, "cada tesis conserva cinco controles internos de diligencia");
assert.equal(isValidReviewDate("2026-11-25"), true);
assert.equal(isValidReviewDate("2026-02-29"), false, "se rechazan fechas inexistentes");
assert.equal(isValidReviewDate("25/11/2026"), false, "la fecha usa el formato ISO del control date");
assert.deepEqual(getReviewSummary({}, "rp25"), { completed: 0, total: 5, percent: 0 });
const firstReviewState = updateReviewState({}, "rp25", "cadastral", true, opportunities, {
  source_document: "Ordenanza municipal 7443/25 · SIBOM",
  consulted_at: "2026-11-25",
  note: "La rezonificación documentada corresponde a polígonos individualizados."
});
assert.equal(getReviewSummary(firstReviewState, "rp25").completed, 1);
assert.equal(getReviewSummary(firstReviewState, "rp25").percent, 20);
assert.equal(getReviewSummary(firstReviewState, "norte").completed, 0);
const incompleteReview = updateReviewState({}, "rp25", "planning", true, opportunities, {
  source_document: "Certificado municipal",
  consulted_at: "",
  note: ""
});
assert.equal(getReviewSummary(incompleteReview, "rp25").completed, 0, "una marca sin fecha no cuenta como revisión documentada");
const invalidDateReview = updateReviewState({}, "rp25", "planning", true, opportunities, {
  source_document: "Certificado municipal",
  consulted_at: "2026-02-29"
});
assert.equal(getReviewSummary(invalidDateReview, "rp25").completed, 0);
assert.deepEqual(updateReviewState(firstReviewState, "rp25", "task-inventada", true, opportunities), firstReviewState);
assert.deepEqual(updateReviewState(firstReviewState, "referencia-inexistente", "cadastral", true, opportunities), firstReviewState);
const legacyReviewState = normalizeReviewState({
  rp25: { cadastral: true, planning: false, tarea_inventada: true },
  referencia_inexistente: { cadastral: true }
}, opportunities);
assert.deepEqual(legacyReviewState, {
  rp25: {
    cadastral: {
      completed: false,
      legacy_marked: true,
      source_document: "",
      consulted_at: "",
      note: ""
    }
  }
}, "las marcas antiguas se recuperan como pendientes de documentar, no como verificaciones completas");
const restoredReviewState = readReviewState({
  getItem: key => key === "moreno-map-review-v2" ? JSON.stringify(firstReviewState) : null
}, opportunities);
assert.deepEqual(restoredReviewState, firstReviewState);
assert.deepEqual(readReviewState({ getItem: key => key === LEGACY_REVIEW_STORAGE_KEY ? JSON.stringify({rp25:{cadastral:true}}) : null }, opportunities), legacyReviewState);
assert.deepEqual(readReviewState({ getItem: () => "{json roto" }, opportunities), {});
let savedReviewPayload = null;
let removedLegacyKey = null;
assert.equal(writeReviewState({
  setItem: (key, value) => { savedReviewPayload = { key, value }; },
  removeItem: key => { removedLegacyKey = key; }
}, firstReviewState, opportunities), true);
assert.equal(savedReviewPayload.key, "moreno-map-review-v2");
assert.equal(removedLegacyKey, LEGACY_REVIEW_STORAGE_KEY);
assert.deepEqual(JSON.parse(savedReviewPayload.value), firstReviewState);
assert.equal(writeReviewState({ setItem: () => { throw new Error("storage bloqueado"); } }, firstReviewState, opportunities), false);
const removedReviewKeys = [];
assert.equal(clearReviewState({ removeItem: key => removedReviewKeys.push(key) }), true);
assert.deepEqual(removedReviewKeys, [REVIEW_STORAGE_KEY, LEGACY_REVIEW_STORAGE_KEY]);
assert.equal(clearReviewState(null), true, "sin almacenamiento persistente, se puede limpiar el estado de esta sesión");
assert.equal(clearReviewState({ removeItem: () => { throw new Error("storage bloqueado"); } }), false);
const reviewExport = buildReviewExport(firstReviewState, all, "2026-11-25T06:00:00.000Z");
assert.equal(reviewExport.schema_version, 2);
assert.equal(reviewExport.generated_at, "2026-11-25T06:00:00.000Z");
assert.equal(reviewExport.references.length, 5, "la exportación excluye localidades y conserva las cinco tesis visibles");
const exportedRp25 = reviewExport.references.find(reference => reference.id === "rp25");
assert.equal(exportedRp25.completed_tasks, 1);
assert.equal(exportedRp25.total_tasks, 5);
assert.equal(exportedRp25.tasks.find(task => task.id === "cadastral").review_recorded, true);
assert.equal(exportedRp25.tasks.find(task => task.id === "cadastral").source_document, "Ordenanza municipal 7443/25 · SIBOM");
assert.equal(exportedRp25.tasks.find(task => task.id === "cadastral").consulted_at, "2026-11-25");
assert.equal(exportedRp25.tasks.find(task => task.id === "planning").review_recorded, false);
assert.match(reviewExport.scope, /no es una certificación/i);
assert.ok(source.includes("localStorage"));
assert.ok(source.includes("function isValidReviewDate(value)"));
assert.ok(source.includes("LEGACY_REVIEW_STORAGE_KEY"));
assert.ok(source.includes("source_document"));
assert.ok(source.includes("consulted_at"));
assert.ok(source.includes("function exportVisibleReview()"));
assert.ok(source.includes('link.download = "moreno-mapa-ia-bitacora.json"'));
assert.ok(source.includes("Para marcar una revisión como registrada, completá una fuente o documento y la fecha de consulta."));
assert.ok(styles.includes(".map-review-panel"));
assert.ok(styles.includes(".map-review-toolbar"));
assert.ok(styles.includes(".map-review-fields"));
assert.ok(styles.includes(".map-review-task"));
assert.ok(styles.includes(".map-review-legacy"));
assert.ok(styles.includes(".map-review-privacy"));
assert.ok(styles.includes(".map-review-clear"));



const parsedReviewImport = parseReviewImport(reviewExport, opportunities);
assert.equal(parsedReviewImport.ok, true);
assert.equal(getReviewSummary(parsedReviewImport.state, "rp25").completed, 1);
assert.equal(parseReviewImport({ schema_version: 1, references: [] }, opportunities).ok, false);
assert.equal(parseReviewImport("{json inválido", opportunities).ok, false);
const importWithUnknowns = parseReviewImport({ schema_version: 2, references: [
  { id: "parcela-inventada", tasks: [{ id: "cadastral", review_recorded: true }] },
  { id: "rp25", tasks: [{ id: "tarea-desconocida", review_recorded: true }] }
]}, opportunities);
assert.equal(importWithUnknowns.ok, true);
assert.equal(importWithUnknowns.ignoredReferences, 1);
assert.equal(importWithUnknowns.skippedTasks, 1);
assert.deepEqual(importWithUnknowns.state, {});
const complementaryLocal = updateReviewState({}, "rp25", "cadastral", false, opportunities, { source_document: "Ordenanza 7443/25", consulted_at: "", note: "" });
const complementaryIncoming = parseReviewImport({ schema_version: 2, references: [{ id: "rp25", tasks: [{
  id: "cadastral", review_recorded: false, source_document: "", consulted_at: "2026-11-25", note: "Fecha contrastada en el portal."
}]}]}, opportunities);
const complementaryMerge = mergeReviewStates(complementaryLocal, complementaryIncoming.state, opportunities);
assert.equal(complementaryMerge.conflicts.length, 0);
assert.equal(complementaryMerge.state.rp25.cadastral.source_document, "Ordenanza 7443/25");
assert.equal(complementaryMerge.state.rp25.cadastral.consulted_at, "2026-11-25");
assert.equal(complementaryMerge.state.rp25.cadastral.note, "Fecha contrastada en el portal.");
const conflictingLocal = updateReviewState({}, "rp25", "cadastral", true, opportunities, {
  source_document: "Fuente local original", consulted_at: "2026-11-20", note: "Revisión local"
});
const conflictingIncoming = parseReviewImport({ schema_version: 2, references: [{ id: "rp25", tasks: [{
  id: "cadastral", review_recorded: true, source_document: "Fuente importada diferente",
  consulted_at: "2026-11-21", note: "Revisión de otro dispositivo"
}]}]}, opportunities);
const conflictMerge = mergeReviewStates(conflictingLocal, conflictingIncoming.state, opportunities);
assert.equal(conflictMerge.conflicts.length, 1);
assert.deepEqual(conflictMerge.conflicts[0].fields, ["source_document", "consulted_at", "note"]);
assert.equal(conflictMerge.state.rp25.cadastral.source_document, "Fuente local original");
assert.equal(conflictMerge.state.rp25.cadastral.consulted_at, "2026-11-20");
assert.equal(conflictMerge.state.rp25.cadastral.note, "Revisión local");
assert.ok(source.includes("function parseReviewImport(payload, items)"));
assert.ok(source.includes("function mergeReviewStates(localState, importedState, items)"));
assert.ok(source.includes("file.size > 1000000"));
assert.ok(source.includes('reviewImportInput.addEventListener("change"'));
assert.ok(mapPage.includes('id="import-review"'));
assert.ok(mapPage.includes('id="import-review-file"'));
assert.match(mapPage, /ante diferencias, no se sobrescriben automáticamente/i);
assert.ok(styles.includes(".map-review-toolbar-actions"));
assert.ok(styles.includes(".map-review-import-note"));




const territorialBrief = buildTerritorialBrief(
  all.find(item => item.id === "rp25"),
  "2026-11-25T21:00:00.000Z"
);
assert.equal(territorialBrief.schema, "moreno.territorial-brief");
assert.equal(territorialBrief.schemaVersion, 1);
assert.equal(territorialBrief.generatedAt, "2026-11-25T21:00:00.000Z");
assert.equal(territorialBrief.classification.label, "Contexto con fuente pública");
assert.equal(territorialBrief.reference.name, "RP25 · Darwin Passaponti · Av. San Fernando");
assert.equal(territorialBrief.reference.sourceUrl, opportunities.find(item => item.id === "rp25").source);
assert.equal(territorialBrief.reference.coordinates.scope, "Centro aproximado de corredor o área; no identifica una parcela.");
assert.equal(territorialBrief.diligence.length, reviewTasks.length);
assert.equal(territorialBrief.diligence.every(task => task.recorded === false), true);
assert.equal(territorialBrief.dataToComplete.length, 6);
assert.equal(buildTerritorialBrief(localities[0]), null, "las localidades no se presentan como tesis inmobiliarias");
const territorialHtml = buildTerritorialBriefHtml(territorialBrief);
assert.match(territorialHtml, /<!doctype html>/i);
assert.match(territorialHtml, /Evidencia disponible/);
assert.match(territorialHtml, /Próximo paso sugerido/);
assert.match(territorialHtml, /Bitácora para diligencia documental/);
assert.match(territorialHtml, /Imprimir \/ guardar como PDF/);
assert.match(territorialHtml, /@page\{size:A4/);
assert.match(territorialHtml, /no identifica una parcela/);
assert.match(territorialHtml, /https:\/\/sibom\.slyt\.gba\.gob\.ar/);
assert.ok(!/<script\b/i.test(territorialHtml), "la ficha no necesita scripts ni recursos externos");
const hostileTerritorialBrief = buildTerritorialBrief({
  ...all.find(item => item.id === "rp25"),
  name: '<img src=x onerror="alert(1)">',
  business: '<svg onload="alert(1)">',
  source: "javascript:alert(1)"
}, "2026-11-25T21:00:00.000Z");
const hostileTerritorialHtml = buildTerritorialBriefHtml(hostileTerritorialBrief);
assert.ok(hostileTerritorialHtml.includes("&lt;img src=x onerror=&quot;alert(1)&quot;&gt;"));
assert.ok(!hostileTerritorialHtml.includes("<img src=x"), "el contenido de la ficha se escapa antes de generar HTML");
assert.ok(!hostileTerritorialHtml.includes("javascript:"));
assert.ok(!/<svg onload/i.test(hostileTerritorialHtml));
assert.ok(source.includes('briefButton.className = "map-brief-button"'));
assert.ok(source.includes("function downloadTerritorialBrief(item)"));
assert.ok(source.includes('link.download = "moreno-ficha-prospeccion-" + item.id + ".html"'));
assert.ok(mapPage.includes("Cada tesis incluye una ficha editorial"));
assert.equal((mapPage.match(/class="verification-source"/g) || []).length, 4, "la mesa de verificación presenta cuatro rutas institucionales");
for (const officialResource of [
  "https://geo.arba.gov.ar/geoserver/idera/wms?request=GetCapabilities&amp;service=WMS",
  "https://geo.arba.gov.ar/geoserver/idera/wfs?request=GetCapabilities&amp;service=WFS",
  "https://moreno.gob.ar/catastro-contribuyentes.php",
  "https://moreno.gob.ar/catastro.php?c=agrimensores",
  "https://iduar.moreno.gob.ar/obras-particulares/",
  "https://moreno.gob.ar/docs/catastro/codigo_zonificacion.pdf"
]) assert.ok(mapPage.includes(officialResource), "falta el recurso institucional verificado: " + officialResource);
assert.ok(mapPage.includes("MORENO no recibe DNI, escrituras ni planos"), "la página debe advertir que no se envía documentación sensible a MORENO");
assert.ok(styles.includes(".verification-source-grid {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));"), "las cuatro rutas institucionales deben organizarse en dos columnas");
assert.ok(styles.includes(".map-brief-intro"));
assert.ok(styles.includes(".map-brief-button:focus-visible"));


const industrialDossier = buildTerritorialDossier(
  filterReferences(all, { kind: "industrial" }),
  { kind: "industrial" },
  "2026-11-26T03:00:00.000Z"
);
assert.equal(industrialDossier.schema, "moreno.territorial-dossier");
assert.equal(industrialDossier.schemaVersion, 1);
assert.equal(industrialDossier.title, "Dossier sectorial · Productivo / logístico");
assert.equal(industrialDossier.references.length, 2, "el dossier sectorial solo incluye las referencias visibles");
assert.equal(industrialDossier.counts.documented, 2);
assert.equal(industrialDossier.counts.localities, 0);
assert.ok(industrialDossier.filterLabels.includes("Sector: Productivo / logístico"));
assert.equal(industrialDossier.references[0].sourceUrl, opportunities.find(item => item.id === "rp25").source);
assert.match(industrialDossier.references[0].coordinates.scope, /no identifica una parcela/);
assert.equal(buildTerritorialDossier([], {}, "2026-11-26T03:00:00.000Z"), null, "una vista vacía no produce un dossier");
const completeDossier = buildTerritorialDossier(all, {}, "2026-11-26T03:00:00.000Z");
assert.equal(completeDossier.references.length, all.length, "el dossier completo incluye todas las referencias del inventario");
assert.deepEqual(completeDossier.counts, expectedInventoryCounts);
assert.equal(completeDossier.references.filter(reference => reference.type === "published").length, publishedProperties.length);
const expectedSourceCount = all.filter(item => /^https:\/\//.test(String(item.source || ""))).length;
assert.equal(completeDossier.references.filter(reference => reference.sourceUrl).length, expectedSourceCount, "el dossier conserva todas las fuentes HTTPS registradas");
const dossierDiagram = buildTerritorialDossierDiagram(industrialDossier.references);
assert.match(dossierDiagram, /<svg/);
assert.match(dossierDiagram, /Distribución relativa de referencias/);
assert.match(dossierDiagram, /no es cartografía oficial/i);
assert.match(dossierDiagram, /schematic-documented/);
const dossierHtml = buildTerritorialDossierHtml(industrialDossier);
assert.match(dossierHtml, /Dossier sectorial/);
assert.match(dossierHtml, /RP25 · Darwin Passaponti/);
assert.match(dossierHtml, /Evidencia registrada/);
assert.match(dossierHtml, /Próximo paso/);
assert.match(dossierHtml, /Consultar fuente original/);
assert.match(dossierHtml, /Imprimir \/ guardar como PDF/);
assert.match(dossierHtml, /no identifica una parcela/);
assert.match(buildTerritorialDossierHtml(completeDossier), /Avisos \/ proyectos/);
const geolocatedPublished = { ...completeDossier.references.find(reference => reference.type === "published"), coordinates: { latitude: -34.62, longitude: -58.82, scope: "Georreferencia aproximada de dirección; no parcelaria." } };
assert.match(buildTerritorialDossierDiagram([geolocatedPublished]), /schematic-published/);
assert.match(dossierHtml, /no se incorporan/);
assert.match(dossierHtml, /@page\{size:A4/);
assert.ok(!/<script\b/i.test(dossierHtml), "el dossier es autónomo y no carga scripts");
assert.ok(!dossierHtml.includes("moreno-map-review-v2"), "el dossier no incluye la bitácora local");
assert.ok(!dossierHtml.includes("originacion-workbench"), "el dossier no incluye herramientas internas");
const hostileDossier = JSON.parse(JSON.stringify(industrialDossier));
hostileDossier.references[0].name = '<img src=x onerror="alert(1)">';
hostileDossier.references[0].sourceUrl = "javascript:alert(1)";
const hostileDossierHtml = buildTerritorialDossierHtml(hostileDossier);
assert.ok(hostileDossierHtml.includes("&lt;img src=x onerror=&quot;alert(1)&quot;&gt;"));
assert.ok(!hostileDossierHtml.includes("<img src=x"), "el nombre se escapa antes de generar HTML");
assert.ok(!hostileDossierHtml.includes("javascript:"), "se rechazan protocolos de fuente inseguros");
const mapPageForDossier = fs.readFileSync(path.join(__dirname, "../mapa-ia/index.html"), "utf8");
assert.ok(mapPageForDossier.includes('id="export-dossier"'));
assert.ok(mapPageForDossier.includes('id="dossier-status"'));
assert.ok(source.includes("function downloadTerritorialDossier()"));
assert.ok(source.includes("dossierExportButton.addEventListener(\"click\", downloadTerritorialDossier)"));
assert.ok(styles.includes(".map-dossier-export"));
assert.ok(styles.includes(".map-dossier-status"));

console.log("OK: pruebas del Mapa IA, exportaciones cartográficas y fichas editoriales imprimibles.");

async function testGeorefRequestQueue() {
  const items = [
    { id: "shared-a", geocodeQuery: "San Juan Bautista 100", geocodeMatch: "SAN JUAN BAUTISTA 100" },
    { id: "shared-b", geocodeQuery: "San Juan Bautista 100", geocodeMatch: "SAN JUAN BAUTISTA 100" },
    { id: "camilli", geocodeQuery: "Camilli 140", geocodeMatch: "CAMILLI 140" },
    { id: "ambiguous", geocodeQuery: "Ambigua 500", geocodeMatch: "AMBIGUA 500" },
    { id: "failed", geocodeQuery: "Falla 10", geocodeMatch: "FALLA 10" },
    { id: "approximate", geocodeQuery: "Galileo Galilei al 7300", geocodeDisabled: true }
  ];
  let active = 0;
  let maximumActive = 0;
  const calls = [];
  const fakeFetch = async url => {
    const query = new URL(url).searchParams.get("direccion");
    calls.push(query);
    active += 1;
    maximumActive = Math.max(maximumActive, active);
    try {
      await new Promise(resolve => setTimeout(resolve, 8));
      if (query === "Camilli 140") return { ok: false, json: async () => ({ direcciones: [] }) };
      if (query === "Falla 10") throw new Error("fallo simulado");
      if (query === "Ambigua 500") {
        return {
          ok: true,
          json: async () => ({
            direcciones: [
              { nomenclatura: "AMBIGUA 500, MORENO, BUENOS AIRES", ubicacion: { lat: "-34.60", lon: "-58.80" } },
              { nomenclatura: "AMBIGUA 500, MORENO, BUENOS AIRES", ubicacion: { lat: "-34.61", lon: "-58.81" } }
            ]
          })
        };
      }
      return {
        ok: true,
        json: async () => ({
          direcciones: [
            { nomenclatura: "SAN JUAN BAUTISTA 100, MORENO, BUENOS AIRES", ubicacion: { lat: "-34.62", lon: "-58.82" } }
          ]
        })
      };
    } finally {
      active -= 1;
    }
  };

  const result = await resolvePublishedGeoreferences(items, fakeFetch, null, 2);
  assert.equal(calls.length, 4, "una dirección repetida genera una sola consulta");
  assert.equal(new Set(calls).size, 4, "cada consulta única se procesa una vez");
  assert.ok(maximumActive <= 2, "la cola respeta el límite de dos solicitudes simultáneas de la prueba");
  assert.ok(maximumActive > 1, "la cola conserva concurrencia controlada sin serializar todas las consultas");
  assert.deepEqual(result.get("San Juan Bautista 100"), {
    lat: -34.62,
    lng: -58.82,
    nomenclatura: "SAN JUAN BAUTISTA 100, MORENO, BUENOS AIRES"
  });
  assert.equal(result.get("Camilli 140"), null, "una respuesta HTTP fallida queda pendiente");
  assert.equal(result.get("Ambigua 500"), null, "las coincidencias ambiguas no generan coordenadas");
  assert.equal(result.get("Falla 10"), null, "un error de red queda pendiente sin interrumpir la cola");
  assert.equal(result.has("Galileo Galilei al 7300"), false, "una ubicación aproximada marcada como no geocodificable no consulta Georef");
  assert.equal((await resolvePublishedGeoreferences([], fakeFetch)).size, 0, "un inventario vacío no genera consultas");
}

testGeorefRequestQueue()
  .then(() => console.log("OK: cola de Georef con concurrencia limitada, deduplicación y rechazo de coincidencias ambiguas."))
  .catch(error => {
    console.error(error);
    process.exitCode = 1;
  });
