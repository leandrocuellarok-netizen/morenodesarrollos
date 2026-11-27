"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const modulePath = path.join(__dirname, "../assets/js/mapa-ia.js");
const source = fs.readFileSync(modulePath, "utf8");
const stylePath = path.join(__dirname, "../assets/css/mapa-ia.css");
const styles = fs.readFileSync(stylePath, "utf8");
const { localities, opportunities, publishedProperties, all, countInventory, filterReferences, buildCsv, buildGeoJson, hasCoordinates, georefAddressMatches, resolvePublishedGeoreferences, resolvePublishedGeoreferencesCached, GEOREF_CACHE_KEY, GEOREF_CACHE_TTL_MS, GEOREF_MAX_CONCURRENCY, buildTerritorialBrief, buildTerritorialBriefHtml, MAX_TERRITORIAL_DOSSIER_REFERENCES, buildTerritorialDossier, buildTerritorialDossierDiagram, buildTerritorialDossierHtml, getSharedReferenceId, referenceContactLabel, normalizeMapViewState, parseMapViewState, buildMapViewUrl, buildReferenceUrl, buildOpportunityContactUrl, availabilityFilterKey, formatSourceReviewDate, publishedDiligenceSummary, publishedContactChannels, collectPotentialDuplicatePairs, paginatePublishedCards, PUBLISHED_CARD_PAGE_SIZE, shouldFitMunicipalBounds, prefersReducedMotion, reviewTasks, REVIEW_STORAGE_KEY, normalizeReviewState, readReviewState, writeReviewState, clearReviewState, updateReviewState, getReviewSummary, buildReviewExport, parseReviewImport, mergeReviewStates, isValidReviewDate, LEGACY_REVIEW_STORAGE_KEY } = require(modulePath);
assert.ok(source.indexOf("mapElement.replaceChildren();") < source.indexOf("new maplibregl.Map("), "el contenedor se vacía antes de crear el mapa");
assert.ok(source.includes("maplibregl.Marker"), "los puntos usan marcadores MapLibre");
assert.ok(source.includes("https://tile.openstreetmap.org/{z}/{x}/{y}.png"), "la capa base usa teselas OSM");
assert.ok(source.includes("attributionControl: { compact: false }"), "la atribución OSM permanece visible también en móvil");
assert.ok(source.includes("https://www.openstreetmap.org/fixthemap"), "se ofrece el enlace para reportar problemas cartográficos");
const mapPage = fs.readFileSync(path.join(__dirname, "../mapa-ia/index.html"), "utf8");
assert.ok(mapPage.includes('class="map-filter-group"'), "los filtros se agrupan en una barra editorial");
assert.ok(mapPage.includes('id="kind-filter" type="hidden"'), "el atlas conserva compatibilidad con enlaces sectoriales heredados");
assert.ok(mapPage.includes('id="locality-filter"'), "el atlas permite filtrar por localidad");
assert.ok(mapPage.includes('id="activity-filter"'), "el atlas permite filtrar por actividad");
assert.ok(mapPage.includes('id="next-step-filter"'), "el atlas permite filtrar por próximo paso");
assert.ok(mapPage.includes('id="map-empty-state"'), "la búsqueda presenta un estado vacío útil");
assert.ok(mapPage.includes('id="search-results-status"'), "el buscador comunica en vivo la cantidad y tipo de coincidencias");
assert.ok(mapPage.includes('class="map-panel-heading"'), "el mapa conserva una cabecera y navegación dentro del panel flotante");
assert.equal(mapPage.split("<details").length - 1, 0, "las secciones de página ya no se ocultan detrás de disclosures móviles");
assert.ok(mapPage.includes('id="availability-filter"'), "el atlas permite filtrar el estado registrado de las publicaciones");
assert.ok(mapPage.includes('id="diligence-filter"'), "el atlas permite filtrar la presencia de datos de prospección");
assert.ok(mapPage.includes('id="duplicate-review-disclosure"') && mapPage.includes('id="duplicate-review-summary"') && mapPage.includes('id="duplicate-review-list"'), "el atlas ofrece una bandeja accesible para revisar posibles duplicados");
assert.ok(mapPage.includes("no duplicados confirmados") && mapPage.includes("no se fusiona ni elimina ninguna publicación"), "la bandeja explica que las coincidencias requieren revisión humana y no fusiona fichas");
assert.ok(mapPage.includes("El recuento mide la presencia de siete campos"), "el filtro aclara que la integridad no equivale a verificación");
for (const state of ["no-confirmada", "pendiente-revalidacion", "no-vigente"]) {
  assert.ok(mapPage.includes('option value="' + state + '"'), "el filtro ofrece el estado " + state);
}
for (const kind of ["industrial", "commercial", "tourism", "land", "infrastructure"]) {
  assert.ok(mapPage.includes('option value="' + kind + '"'), "el filtro ofrece el sector " + kind);
}
assert.ok(mapPage.includes('label class="map-filter-field'), "cada filtro tiene una etiqueta visible y asociada");
assert.ok(mapPage.includes("Actividad / sector"), "la actividad reúne el filtro sectorial visible");
assert.ok(source.includes('getElementById("kind-filter")'), "el motor conecta el control sectorial");
assert.ok(source.includes("kind: kindInput.value"), "la renderización utiliza el sector seleccionado");
assert.ok(source.includes("locality: localityInput.value") && source.includes("activity: activityInput.value") && source.includes("nextStep: nextStepInput.value"), "la renderización combina localidad, actividad y próximo paso");
assert.ok(source.includes("function searchQueryMatches(query,searchable)") && source.includes("function normalizeSearchText(value)"), "el buscador normaliza acentos, tokens y pequeñas erratas");
assert.ok(source.includes("searchResultsStatus.textContent") && source.includes("sourceAlternates"), "el buscador informa resultados y busca también en fuentes alternativas");
assert.ok(source.includes('kindInput.addEventListener("change", resetPublishedPaginationAndRender)'), "el cambio de sector reinicia la página visible y vuelve a renderizar el inventario");
assert.ok(source.includes('kindInput.value = "all"'), "restablecer limpia también el filtro sectorial");
assert.ok(source.includes('localityInput.value = "all"') && source.includes('activityInput.value = "all"') && source.includes('nextStepInput.value = "all"'), "restablecer limpia los filtros nuevos");
assert.ok(mapPage.includes('id="map-verification-title"'), "el Mapa IA incluye la mesa de verificación documental");
for (const indexId of ["atlas-index-status", "atlas-localities-count", "atlas-documented-count", "atlas-hypotheses-count", "atlas-published-count", "atlas-total-count"]) {
  assert.ok(mapPage.includes('id="' + indexId + '"'), "el atlas muestra el indicador " + indexId);
}
const initialInventoryCounts = countInventory(all);

const duplicateReview = collectPotentialDuplicatePairs(all);
const pairHasIds = (pairs, first, second) => pairs.some(pair =>
  [pair.left.id, pair.right.id].sort().join("::") === [first, second].sort().join("::")
);
assert.ok(pairHasIds(duplicateReview.pairs, "terreno-pir25-2709", "terreno-r25-lote21-2741"), "la relación declarada del parque industrial aparece en la bandeja de revisión");
assert.ok(pairHasIds(duplicateReview.pairs, "terreno-polo24-rp24-rp25-2914", "terreno-polo24-2432"), "la relación declarada de Polo 24 aparece en la bandeja de revisión");
assert.equal(duplicateReview.unresolved.length, 0, "todas las relaciones declaradas apuntan a una ficha existente");
assert.ok(duplicateReview.pairs.every(pair => pair.left.id !== pair.right.id), "la revisión nunca compara una ficha consigo misma");

const duplicateReviewSample = collectPotentialDuplicatePairs([
  { type: "published", id: "source-a", recordType: "Terreno", name: "Fuente A", source: "https://example.org/aviso/1?utm_source=mail" },
  { type: "published", id: "source-b", recordType: "Terreno", name: "Fuente B", source: "https://portal.example/otro", sourceAlternates: [{ url: "https://example.org/aviso/1" }] },
  { type: "published", id: "declared-a", recordType: "Terreno", name: "Declarada A", source: "https://example.org/aviso/2", potentialDuplicateOf: "source-a" },
  { type: "published", id: "missing-target", recordType: "Terreno", name: "Destino ausente", source: "https://example.org/aviso/3", potentialDuplicateOf: "not-in-inventory" },
  { type: "published", id: "lot-10", recordType: "Terreno", name: "Lote 10", source: "https://example.org/lote-10", address: "Valparaíso 100", landSurfaceM2: 300 },
  { type: "published", id: "lot-11", recordType: "Terreno", name: "Lote 11", source: "https://example.org/lote-11", address: "Valparaíso 100", landSurfaceM2: 300 }
]);
assert.ok(pairHasIds(duplicateReviewSample.pairs, "source-a", "source-b"), "una URL compartida se reconoce aunque aparezca como fuente complementaria y tenga parámetros de seguimiento");
assert.ok(pairHasIds(duplicateReviewSample.pairs, "source-a", "declared-a"), "se conserva una relación declarada aunque las fuentes sean distintas");
assert.equal(duplicateReviewSample.unresolved.length, 1, "un destino inexistente se informa sin crear una ficha ficticia");
assert.equal(pairHasIds(duplicateReviewSample.pairs, "lot-10", "lot-11"), false, "dirección y superficie iguales no bastan para declarar un duplicado: lotes distintos permanecen separados");
assert.equal(publishedProperties.length, initialInventoryCounts.published, "la bandeja de revisión no fusiona ni elimina publicaciones");

const completeDiligenceSample = publishedDiligenceSummary({
  type: "published", source: "https://example.org/aviso", lastCheckedAt: "2026-11-27",
  price: "USD 85.000", landSurfaceM2: 320, agency: "Inmobiliaria de prueba",
  contact: "Formulario público", address: "Av. de prueba 100", locality: "Moreno"
});
assert.deepEqual(completeDiligenceSample, { reported: 7, total: 7, missing: [], complete: true });
const incompleteDiligenceSample = publishedDiligenceSummary({
  type: "published", source: "https://example.org/aviso", lastCheckedAt: "2026-11-27",
  price: "", surfaceNote: "", agency: "Inmobiliaria de prueba", contact: "",
  address: "Av. de prueba 100", locality: "Moreno"
});
assert.deepEqual(incompleteDiligenceSample.missing, ["Referencia de precio", "Superficie", "Referencia de contacto"]);
const placeholderDiligenceSample = publishedDiligenceSummary({
  type: "published", source: "https://example.org/aviso", lastCheckedAt: "2026-11-27",
  price: "A consultar", surfaceNote: "La ficha no informa superficie cubierta",
  agency: "Publicación en Zonaprop; inmobiliaria y corredor no visibles en ficha consultada.",
  contact: "No visible en la ficha indexada", address: "Av. de prueba 100", locality: "Moreno"
});
assert.deepEqual(placeholderDiligenceSample.missing, ["Referencia de precio", "Superficie", "Anunciante", "Referencia de contacto"]);
const portalContactDiligenceSample = publishedDiligenceSummary({
  type: "published", source: "https://example.org/aviso", lastCheckedAt: "2026-11-27",
  price: "USD 33.000", landSurfaceM2: 325, agency: "Inmobiliaria de prueba",
  contact: "Formulario Zonaprop; teléfono no visible", address: "Av. de prueba 100", locality: "Moreno"
});
assert.equal(portalContactDiligenceSample.missing.includes("Referencia de contacto"), false, "un formulario público sí es un canal de contacto aunque el teléfono no aparezca");

const publicChannelsSample = publishedContactChannels({
  contact: "Municipio: Impacto Inmobiliaria, +54 11 7600 4000. Torres Propiedades: +54 9 11 7187-7878 · inmobiliaria@torrespropiedades.info."
});
assert.deepEqual(publicChannelsSample, {
  phones: [
    { value: "+54 11 7600 4000", href: "tel:+541176004000" },
    { value: "+54 9 11 7187-7878", href: "tel:+5491171877878" }
  ],
  emails: [
    { value: "inmobiliaria@torrespropiedades.info", href: "mailto:inmobiliaria@torrespropiedades.info" }
  ]
}, "los teléfonos completos y emails del contacto público se convierten en enlaces directos");

const deduplicatedChannelsSample = publishedContactChannels({
  phone: "+54 9 11 5702-5130",
  contact: "WhatsApp +54 9 11 5702-5130 · ventas@ramirezprop.com.ar"
});
assert.equal(deduplicatedChannelsSample.phones.length, 1, "el mismo teléfono en dos campos no crea enlaces duplicados");
assert.equal(deduplicatedChannelsSample.emails.length, 1, "el email público se reconoce sin exigir un campo separado");

const partialContactSample = publishedContactChannels({
  contact: "Teléfono parcialmente visible 1139313; CPI 8928 / MGR 313."
});
assert.equal(partialContactSample.phones.length, 0, "un teléfono parcial y números de matrícula no se convierten en enlaces");

const completeDiligenceItems = filterReferences(all, { diligence: "complete" });
const pendingDiligenceItems = filterReferences(all, { diligence: "pending" });
assert.ok(completeDiligenceItems.every(item => item.type === "published" && publishedDiligenceSummary(item).complete));
assert.ok(pendingDiligenceItems.every(item => item.type === "published" && !publishedDiligenceSummary(item).complete));
assert.equal(completeDiligenceItems.length + pendingDiligenceItems.length, publishedProperties.length, "la clasificación de diligencia cubre todas las publicaciones sin incluir otras capas");
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
assert.ok(mapPage.includes("No hay referencias para esta combinación"), "el estado vacío ayuda a recuperar una búsqueda sin resultados");
assert.ok(mapPage.includes("contexto con fuente") && mapPage.includes("hipótesis") && mapPage.includes("fichas sin coordenadas verificables siguen en el índice"), "la leyenda distingue contexto, hipótesis y referencias sin punto");
assert.ok(mapPage.includes('option value="published"'), "el filtro ofrece la capa de publicaciones inmobiliarias");
assert.ok(mapPage.includes('id="published-list"'), "el mapa contiene una lista independiente de publicaciones");
const publicationIntro = mapPage.match(/<p class="map-published-intro">([\s\S]*?)<\/p>/)?.[1] || "";
assert.ok(publicationIntro && !/\d{2}\/\d{2}\/\d{4}/.test(publicationIntro), "la introducción no debe congelar una fecha global de revisión");
assert.ok(source.includes("function geocodePublishedAddresses()"), "la capa intenta georreferenciar las direcciones publicadas");
assert.ok(source.includes("https://apis.datos.gob.ar/georef/api/v2.0/direcciones"), "la georreferencia utiliza el servicio oficial Georef");
assert.ok(source.includes("function readGeorefCache(storage, now)"), "la georreferencia puede recuperar coordenadas desde caché local");
assert.ok(source.includes("function resolvePublishedGeoreferencesCached(items, fetcher, context, storage, now, concurrency)"), "la georreferencia combina caché y consultas nuevas");
assert.equal(GEOREF_CACHE_KEY, "moreno-georef-cache-v1", "la caché usa una clave versionada e independiente de la bitácora");
assert.equal(GEOREF_CACHE_TTL_MS, 30 * 24 * 60 * 60 * 1000, "las coordenadas cacheadas vencen a los 30 días");
assert.ok(source.includes("function availabilityFilterKey(value)"), "el motor normaliza estados comerciales permitidos");
assert.ok(source.includes('url.searchParams.set("vigencia",n.availability)'), "el enlace compartido conserva el estado de publicación");
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
assert.equal((mapPage.match(/<h1\b/g) || []).length, 1, "el mapa conserva un único H1 accesible");
assert.ok(mapPage.includes("Arrastrá para desplazarte") && mapPage.includes("pellizcá con dos"), "la ayuda explica desplazamiento y zoom en escritorio y móvil");
assert.ok(mapPage.includes('id="map-zoom-in"') && mapPage.includes('id="map-zoom-out"') && mapPage.includes('id="map-fit-all"'), "hay controles táctiles visibles para zoom y reencuadre");
assert.ok(mapPage.includes('id="kind-filter" type="hidden"') && !mapPage.includes('class="map-filter-field map-filter-sector"'), "el sector redundante queda integrado en Actividad sin romper enlaces heredados");
assert.ok(styles.includes(".map-touch-controls") && styles.includes("min-height: 48px"), "los controles tienen objetivos táctiles amplios");
assert.ok(source.includes("function reframeMap()") && source.includes("map.zoomIn(") && source.includes("map.zoomOut(") && source.includes("map.fitBounds(bounds"), "el zoom y el reencuadre están conectados al motor cartográfico");
assert.ok(source.includes('mapTouchControls.hidden = true'), "los controles se ocultan si se activa el esquema estático");
assert.ok(source.includes('makeCards(shown.filter(item => item.type === "opportunity"), opportunityList)'), "las tesis sin coordenadas permanecen en el índice");
assert.ok(source.includes('makePublishedCards(shown.filter(item => item.type === "published"), publishedList)'), "las publicaciones sin coordenadas permanecen en el índice");
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
assert.ok(styles.includes(".map-public-contact-link"), "los teléfonos y emails públicos tienen accesos directos con estilo propio");
assert.ok(mapPage.includes("números parciales y matrículas no se convierten en enlaces"), "la página explica el criterio conservador de enlaces de contacto");
assert.ok(styles.includes(".map-published-review-date"), "las fichas muestran la fecha de consulta de la fuente");
assert.ok(styles.includes(".map-toolbar-actions"), "las acciones del mapa se agrupan fuera de los filtros");
assert.equal(getSharedReferenceId("?ref=rp25", all), "rp25", "se reconoce una referencia válida desde la URL");
assert.equal(getSharedReferenceId("?ref=no-existe", all), null, "se descarta una referencia desconocida");
assert.equal(getSharedReferenceId("", all), null, "sin parámetro no se fuerza una selección");
const parsedMapView = parseMapViewState(
  "?q=log%C3%ADstica&tipo=opportunity&sector=industrial&localidad=cuartel&actividad=industrial&proximo=planning&evidencia=documented&vigencia=no-vigente&diligencia=pending&ref=rp25",
  all
);
assert.deepEqual(parsedMapView, {
  query: "logística",
  category: "opportunity",
  kind: "industrial",
  locality: "cuartel",
  activity: "industrial",
  nextStep: "planning",
  evidence: "documented",
  availability: "no-vigente",
  diligence: "pending",
  ref: "rp25"
}, "la URL restaura búsqueda, tipo, sector, evidencia, estado de publicación y referencia");
assert.deepEqual(parseMapViewState("?tipo=desconocido&sector=ilegal&evidencia=pendiente&vigencia=ilegal&diligencia=ilegal&ref=falso", all), {
  query: "", category: "all", kind: "all", locality: "all", activity: "all", nextStep: "all", evidence: "all", availability: "all", diligence: "all", ref: null
}, "los parámetros no permitidos vuelven a valores seguros");
assert.equal(parseMapViewState("?q=" + "x".repeat(140), all).query.length, 100, "la búsqueda compartida se limita a cien caracteres");
const normalizedMapView = normalizeMapViewState({
  query: "  suelo  ",
  category: "opportunity",
  kind: "land",
  locality: "trujui",
  activity: "land",
  nextStep: "cadastral",
  evidence: "hypothesis",
  availability: "pendiente-revalidacion",
  diligence: "complete",
  ref: "cuartel"
}, all);
assert.equal(normalizedMapView.query, "suelo");
assert.equal(normalizedMapView.locality, "trujui");
assert.equal(normalizedMapView.activity, "land");
assert.equal(normalizedMapView.nextStep, "cadastral");
assert.equal(normalizedMapView.availability, "pendiente-revalidacion");
assert.equal(normalizedMapView.diligence, "complete");
const mapViewUrl = new URL(buildMapViewUrl(
  "https://example.org/mapa-ia/?utm_source=mail&q=viejo&sector=tourism#inventario",
  parsedMapView,
  all
));
assert.equal(mapViewUrl.searchParams.get("utm_source"), "mail", "se conservan parámetros ajenos al mapa");
assert.equal(mapViewUrl.searchParams.get("q"), "logística");
assert.equal(mapViewUrl.searchParams.get("tipo"), "opportunity");
assert.equal(mapViewUrl.searchParams.get("sector"), "industrial");
assert.equal(mapViewUrl.searchParams.get("localidad"), "cuartel");
assert.equal(mapViewUrl.searchParams.get("actividad"), "industrial");
assert.equal(mapViewUrl.searchParams.get("proximo"), "planning");
assert.equal(mapViewUrl.searchParams.get("evidencia"), "documented");
assert.equal(mapViewUrl.searchParams.get("vigencia"), "no-vigente");
assert.equal(mapViewUrl.searchParams.get("diligencia"), "pending");
assert.equal(mapViewUrl.searchParams.get("ref"), "rp25");
assert.equal(mapViewUrl.hash, "#inventario", "la URL compartida conserva el fragmento");
const defaultMapViewUrl = new URL(buildMapViewUrl(
  "https://example.org/mapa-ia/?q=viejo&tipo=locality&sector=land&evidencia=hypothesis&vigencia=no-confirmada&diligencia=pending&ref=rp25",
  {},
  all
));
assert.equal(["q", "tipo", "sector", "localidad", "actividad", "proximo", "evidencia", "vigencia", "diligencia", "ref"].some(key => defaultMapViewUrl.searchParams.has(key)), false, "restablecer elimina todos los parámetros del mapa");
const sharedUrl = new URL(buildReferenceUrl("https://example.org/mapa-ia/?layer=all&sector=industrial&q=dep%C3%B3sitos&vigencia=no-confirmada#inventario", "rp25"));
assert.equal(sharedUrl.searchParams.get("ref"), "rp25", "la URL compartible identifica la referencia");
assert.equal(sharedUrl.searchParams.get("layer"), "all", "la URL compartible conserva otros parámetros");
assert.equal(sharedUrl.searchParams.get("sector"), "industrial", "la ficha compartible conserva los filtros activos");
assert.equal(sharedUrl.searchParams.get("q"), "depósitos", "la ficha compartible conserva la búsqueda activa");
assert.equal(sharedUrl.searchParams.get("vigencia"), "no-confirmada", "la ficha compartible conserva el filtro de estado registrado");
assert.equal(sharedUrl.hash, "#inventario", "la URL compartible conserva el fragmento existente");
assert.ok(mapPage.includes('id="map-data-export-disclosure"'), "las exportaciones cartográficas permanecen integradas como sección visible");
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
assert.equal(contactUrl.hostname, "wa.me", "el CTA no apunta a INFO PYME como si fuera un formulario");
assert.equal(contactUrl.pathname, "/5491141671674", "la consulta se dirige al WhatsApp público de MORENO");
assert.match(contactUrl.searchParams.get("text"), /RP25/);
assert.match(contactUrl.searchParams.get("text"), /rp25/);
assert.equal(referenceContactLabel({ type: "opportunity" }), "Consultar esta tesis con MORENO ↗", "la tesis identifica claramente el destino comercial");
assert.equal(referenceContactLabel({ type: "locality" }), "Consultar esta localidad con MORENO ↗", "la localidad identifica claramente el destino comercial");
assert.equal(referenceContactLabel({ type: "published" }), "Consultar esta ficha con MORENO ↗", "la publicación distingue consulta editorial de contacto del anunciante");

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
assert.equal(opportunities.length, 10, "se conservan cinco tesis previas y se agregan cinco contextos públicos documentados");
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
  "desarrollo-parque-industrial-reconquista-80ha",
  "desarrollo-parque-industrial-desarrollo-productivo-40ha",
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
  "terreno-esteban-de-luca-2200-415",
  "terreno-paysandu-900-380",
  "terreno-agrelo-5300-1500",
  "terreno-jacinto-verdaguer-juan-maciel-1500",
  "terreno-jose-marti-1000-2164",
  "terreno-lorenzo-lopez-300-1123",
  "terreno-puccini-1600-366",
  "terreno-juan-diaz-de-solis-3400-350",
  "terreno-ruta5-cadiz-320",
  "quinta-racine-300-678",
  "terreno-dr-vera-1200-374",
  "terreno-salta-nemesio-alvarez-600",
  "terreno-felix-mendelsohn-1400-325",
  "terreno-la-tradicion-700-719",
  "terreno-joaquin-v-gonzalez-600-612",
  "terreno-las-tres-marias-lote-6-411",
  "terreno-prados-del-oeste-2-lote-central-839",
  "terreno-prados-del-oeste-2-lote-esquina-814",
  "terreno-general-hornos-200-prados-del-oeste-2-786",
  "terreno-domingo-martinez-de-irala-1600-1107",
  "terreno-vicente-lopez-y-planes-1300-240",
  "casa-emilio-mitre-2200-782",
  "casa-zeballos-600-382",
  "casa-posadas-1100-390",
  "casa-doctor-marcelo-alvear-2800-1125",
  "casa-primero-de-mayo-125-311",
  "inmueble-mixto-saenz-pena-2200",
  "casa-alcorta-2400-potencial-desarrollo",
  "desarrollo-maria-eugenia-residences-village",
];
for (const id of hourlyExpectedIds) {
  assert.ok(publishedProperties.some(item => item.id === id), "la revisión horaria incorpora " + id);
}
const nov27CurrentReviewIds = [
  "terreno-esteban-de-luca-2200-415",
  "terreno-paysandu-900-380",
  "terreno-agrelo-5300-1500",
  "terreno-jacinto-verdaguer-juan-maciel-1500",
  "terreno-jose-marti-1000-2164",
  "terreno-lorenzo-lopez-300-1123",
  "terreno-puccini-1600-366",
  "terreno-juan-diaz-de-solis-3400-350",
  "terreno-ruta5-cadiz-320",
  "quinta-racine-300-678",
  "terreno-dr-vera-1200-374",
  "terreno-salta-nemesio-alvarez-600",
  "terreno-felix-mendelsohn-1400-325",
  "terreno-la-tradicion-700-719",
  "terreno-joaquin-v-gonzalez-600-612",
  "terreno-las-tres-marias-lote-6-411",
  "terreno-prados-del-oeste-2-lote-central-839",
  "terreno-prados-del-oeste-2-lote-esquina-814",
  "terreno-general-hornos-200-prados-del-oeste-2-786",
  "terreno-domingo-martinez-de-irala-1600-1107",
  "terreno-vicente-lopez-y-planes-1300-240",
  "casa-emilio-mitre-2200-782",
  "casa-zeballos-600-382",
  "casa-posadas-1100-390",
  "casa-doctor-marcelo-alvear-2800-1125",
  "casa-primero-de-mayo-125-311",
  "inmueble-mixto-saenz-pena-2200",
  "casa-alcorta-2400-potencial-desarrollo",
  "desarrollo-maria-eugenia-residences-village"
];
for (const id of nov27CurrentReviewIds) {
  const item = publishedProperties.find(record => record.id === id);
  assert.ok(item, "la revisión incorpora " + id);
  assert.equal(item.availabilityStatus, (id === "sofocles-3000-terreno-casa-330" || id === "terreno-juan-diaz-de-solis-3400-350") ? "Pendiente de revalidación" : "No confirmada", "no se presume disponibilidad para " + id);
  assert.equal(item.lastCheckedAt, "2026-11-27", "fecha de revisión registrada para " + id);
  assert.equal(item.lat, null, "no se inventa latitud para " + id);
  assert.equal(item.lng, null, "no se inventa longitud para " + id);
}


const turn7ExpectedIds = [
  "moreno-terreno-el-salvador-tupungato-393",
  "prados-oeste-1b-lote-182-800",
  "sofocles-3000-terreno-casa-330",
  "casa-quinta-patricias-argentinas-2100-5150",
  "alvarez-prado-2031-terreno-339",
  "parques-morenito-felix-de-azara-300",
  "colectora-sur-km31-5-fraccion-33000",
  "casa-leopoldo-lugones-900-5000",
  "terreno-marco-sastre-10552-dos-lotes-360",
  "terreno-juan-stefani-torre-alta-iii-420",
  "terreno-aeronautica-argentina-2300-430",
  "loteo-barrio-malaver-etapa-2-pitagoras-echeverria-400",
  "terreno-gervasio-mendez-10500-400",
  "casa-quinta-ambrosetti-2000-3195",
  "casa-quinta-juan-bautista-alberdi-1400-2000",
  "casa-prados-oeste-general-hornos-2900-850",
  "casa-quinta-infanta-isabel-4200-1527"
];
for (const id of turn7ExpectedIds) {
  const item = publishedProperties.find(record => record.id === id);
  assert.ok(item, "la séptima revisión horaria incorpora " + id);
  assert.equal(item.availabilityStatus, (id === "sofocles-3000-terreno-casa-330" || id === "terreno-juan-diaz-de-solis-3400-350") ? "Pendiente de revalidación" : "No confirmada", "no se presume disponibilidad para " + id);
  assert.equal(item.lastCheckedAt, "2026-11-27", "fecha de revisión registrada para " + id);
  assert.equal(item.lat, null, "no se inventa latitud para " + id);
  assert.equal(item.lng, null, "no se inventa longitud para " + id);
}
const turn7Ibis = publishedProperties.find(item => item.id === "desarrollo-ibis-iv-273");
assert.equal(turn7Ibis.source, "https://www.zonaprop.com.ar/propiedades/emprendimiento/ememvein-edificio-ibis-iv-58757107.html");
assert.ok(turn7Ibis.sourceAlternates.some(item => item.url === "https://www.zonaprop.com.ar/propiedades/emprendimiento/ememvein-edificio-ibis-iv-58757105.html"));
assert.match(turn7Ibis.observations, /3 unidades/);
assert.match(turn7Ibis.observations, /estructura ya es visible/);
const turn7Sofocles = publishedProperties.find(item => item.id === "sofocles-3000-terreno-casa-330");
assert.equal(turn7Sofocles.source, "https://terreno.mercadolibre.com.ar/MLA-2256050333-terreno-y-casa-en-venta-zona-industrial-moreno-_JM");
assert.ok(turn7Sofocles.sourceAlternates.some(item => item.url.includes("proppies.app")));
assert.equal(turn7Sofocles.availabilityStatus, "Pendiente de revalidación");
const turn7Chacras = publishedProperties.find(item => item.id === "desarrollo-chacras-teofilo-galileo-7300");
assert.match(turn7Chacras.observations, /entrega aproximada mayo de 2027/);

assert.equal(publishedProperties.find(item => item.id === "la-reja-casa-quinta-santa-teresa-2401").availabilityStatus, "No vigente");
assert.equal(publishedProperties.find(item => item.id === "parques-morenito-proyecto").availabilityStatus, "No confirmada");
assert.equal(publishedProperties.find(item => item.id === "sumio-lote-450").availabilityStatus, "No vigente");
assert.equal(publishedProperties.find(item => item.id === "casa-racine-800-no-vigente").availabilityStatus, "No confirmada"); // Nueva ficha directa accesible; conservar el historial anterior.
assert.equal(publishedProperties.find(item => item.id === "moreno-casa-martin-fierro-4900").availabilityStatus, "Pendiente de revalidación");
assert.ok(publishedProperties.find(item => item.id === "casa-bernardino-rivadavia-1000").price.startsWith("USD 150.000"));

assert.equal(new Set(publishedProperties.map(item => item.id)).size, publishedProperties.length, "no hay IDs duplicados en publicaciones");

const expectedInventoryCounts = { localities: 6, documented: 9, hypotheses: 1, published: publishedProperties.length, total: all.length };
assert.deepEqual(countInventory(all), expectedInventoryCounts);

const allPublishedForPaging = filterReferences(all, { category: "published" });
assert.equal(PUBLISHED_CARD_PAGE_SIZE, 24, "la interfaz carga 24 fichas inmobiliarias por tramo");
const firstPublishedPage = paginatePublishedCards(allPublishedForPaging, PUBLISHED_CARD_PAGE_SIZE, null);
assert.equal(firstPublishedPage.items.length, 24);
assert.equal(firstPublishedPage.shown, 24);
assert.equal(firstPublishedPage.total, publishedProperties.length);
assert.equal(firstPublishedPage.hasMore, true);
assert.equal(firstPublishedPage.nextLimit, 48);
const laterPublished = allPublishedForPaging[149];
const directPublishedPage = paginatePublishedCards(allPublishedForPaging, PUBLISHED_CARD_PAGE_SIZE, laterPublished.id);
assert.equal(directPublishedPage.items.length, 25, "una referencia profunda se añade sin cargar las 149 fichas anteriores");
assert.equal(directPublishedPage.items.at(-1).id, laterPublished.id);
assert.equal(directPublishedPage.selectedOutsidePage, true);
assert.equal(directPublishedPage.shown, 24, "la referencia profunda no altera el tamaño nominal del tramo");
const secondPublishedPage = paginatePublishedCards(allPublishedForPaging, 48, null);
assert.equal(secondPublishedPage.items.length, 48);
assert.equal(secondPublishedPage.nextLimit, 72);
const completePublishedPage = paginatePublishedCards(allPublishedForPaging, 999, null);
assert.equal(completePublishedPage.items.length, publishedProperties.length);
assert.equal(completePublishedPage.hasMore, false);
assert.equal(paginatePublishedCards([], 24, null).items.length, 0);
assert.equal(paginatePublishedCards(allPublishedForPaging, 0, null).items.length, 24, "un límite inválido vuelve al tamaño seguro por defecto");
assert.ok(source.includes("function makePublishedCards(items, target)"));
assert.ok(source.includes('more.id = "show-more-published"'));
assert.ok(source.includes("renderedPublishedCardIds.has(item.id)"));
assert.ok(mapPage.includes("las fichas se muestran en tramos de 24"));
assert.ok(styles.includes(".map-published-pagination"));
assert.ok(styles.includes(".map-published-more:focus-visible"));
assert.deepEqual(
  countInventory(filterReferences(all, { evidence: "documented" })),
  { localities: 0, documented: 9, hypotheses: 0, published: 0, total: 9 },
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
    assert.ok(["No confirmada", "No vigente", "Pendiente de revalidación", "No es una oferta de parcela"].includes(item.availabilityStatus), "el estado comercial se conserva sin afirmar disponibilidad: " + item.name);
    assert.match(item.source, /^https:\/\//);
    continue;
  }
  if (!hasCoordinates(item)) {
    assert.equal(item.type, "opportunity", "solo las tesis sin coordenadas permanecen sin punto: " + item.name);
    assert.equal(item.lat, null, "no se inventa latitud para " + item.id);
    assert.equal(item.lng, null, "no se inventa longitud para " + item.id);
    assert.match(item.source, /^https:\/\//, "la tesis sin coordenadas conserva fuente pública: " + item.id);
    assert.ok(item.sourceDate && item.lastCheckedAt, "la tesis sin coordenadas conserva fecha de fuente y consulta: " + item.id);
    assert.equal(item.price, undefined, "no se inventa precio para " + item.id);
    assert.equal(item.contact, undefined, "no se inventa contacto para " + item.id);
    assert.equal(item.availabilityStatus, undefined, "no se inventa disponibilidad para " + item.id);
    continue;
  }
  assert.ok(Number.isFinite(item.lat) && item.lat > -35 && item.lat < -34, "latitud plausible para Moreno: " + item.name);
  assert.ok(Number.isFinite(item.lng) && item.lng > -59 && item.lng < -58, "longitud plausible para Moreno: " + item.name);
}
assert.equal(georefAddressMatches({ geocodeMatch: "MARTIN FIERRO 5000" }, { nomenclatura: "MARTIN FIERRO 5000, MORENO, BUENOS AIRES" }), true);
assert.equal(georefAddressMatches({ geocodeMatch: "MARTIN FIERRO 5000" }, { nomenclatura: "MARTIN FIERRO 4900, MORENO, BUENOS AIRES" }), false);

assert.equal(GEOREF_MAX_CONCURRENCY, 3, "las consultas a Georef tienen un límite conservador de concurrencia");
assert.ok(source.includes("async function resolvePublishedGeoreferences(items, fetcher, context, concurrency)"), "la resolución de Georef está aislada y puede probarse sin red");
assert.ok(source.includes("resolvePublishedGeoreferencesCached(") && source.includes("reviewStorage,\n      Date.now(),\n      GEOREF_MAX_CONCURRENCY"), "la página utiliza caché local y la cola limitada para consultar direcciones");
for (const item of opportunities) {
  assert.ok(["documented", "hypothesis"].includes(item.stage), "nivel de evidencia explícito: " + item.name);
  assert.match(item.source, /^https:\/\//, "fuente pública HTTPS: " + item.name);
}

assert.equal(filterReferences(all, { category: "locality" }).length, 6);
assert.equal(filterReferences(all, { category: "opportunity" }).length, 10);
assert.equal(filterReferences(all, { category: "published" }).length, publishedProperties.length);
for (const [status, key] of [
  ["No confirmada", "no-confirmada"],
  ["Pendiente de revalidación", "pendiente-revalidacion"],
  ["No vigente", "no-vigente"],
  ["No es una oferta de parcela", "no-es-oferta"]
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
assert.equal(availabilityFilterKey("No es una oferta de parcela"), "no-es-oferta");
assert.equal(formatSourceReviewDate("2026-11-27"), "27/11/2026");
assert.equal(formatSourceReviewDate(""), "No informada");
assert.ok(publishedProperties.every(item => /^\d{4}-\d{2}-\d{2}$/.test(item.lastCheckedAt || "")), "cada publicación conserva una fecha de revisión explícita");
assert.ok(!source.includes('publishedProperties.forEach(item => {\n  item.lastCheckedAt ='), "la fecha de consulta no se asigna en bloque sin evidencia individual");
assert.ok(source.includes("No hay constancia individual de consulta de la fuente"), "una ficha sin evidencia individual no recibe una afirmación automática de accesibilidad");
assert.equal(filterReferences(all, { query: "Isabel la Católica", category: "published" }).length, 1);
assert.equal(filterReferences(all, { query: "Santa Teresa", category: "published" }).length, 2, "la búsqueda distingue las dos publicaciones de Santa Teresa con direcciones diferentes");
assert.equal(filterReferences(all, { evidence: "documented" }).length, 9, "el filtro documentado solo muestra tesis con fuente");
assert.equal(filterReferences(all, { evidence: "published-source" }).length, publishedProperties.length, "el nivel de evidencia separa avisos de terceros de contextos institucionales");
assert.equal(filterReferences(all, { evidence: "hypothesis" }).length, 1, "el filtro de hipótesis no mezcla localidades sin clasificar");
assert.deepEqual(filterReferences(all, { kind: "industrial" }).map(item => item.id), ["rp25", "ecoparque", "base-aerea-moreno-norte"], "el filtro productivo/logístico incluye el antecedente de Base Aérea");
assert.deepEqual(filterReferences(all, { kind: "commercial" }).map(item => item.id), ["ribera"], "el filtro comercial muestra la referencia existente");
assert.deepEqual(filterReferences(all, { kind: "tourism" }).map(item => item.id), ["roggero"], "el filtro de turismo muestra la referencia existente");
assert.deepEqual(filterReferences(all, { kind: "land" }).map(item => item.id), ["norte", "mui-mo-monitoreo-urbano-inmobiliario"], "el filtro de suelo incluye la hipótesis y el sistema municipal de control de loteos");
assert.ok(filterReferences(all, { query: "loteos autorizados", category: "opportunity" }).some(item => item.id === "mui-mo-monitoreo-urbano-inmobiliario"), "el buscador indexa el sistema municipal de loteos autorizados");
assert.deepEqual(filterReferences(all, { kind: "industrial", evidence: "documented" }).map(item => item.id), ["rp25", "ecoparque", "base-aerea-moreno-norte"], "el filtro sectorial se combina con el nivel de evidencia");
assert.deepEqual(filterReferences(all, { kind: "infrastructure" }).map(item => item.id), ["promeba-trujui", "promeba-cuartel-v", "utopia-bonaerense-moreno"], "la infraestructura pública tiene una línea sectorial propia");
assert.ok(filterReferences(all, { locality: "paso", category: "opportunity" }).some(item => item.id === "ribera"), "la localidad filtra referencias territoriales");
assert.ok(filterReferences(all, { locality: "cuartel", category: "opportunity" }).some(item => item.id === "base-aerea-moreno-norte"), "las referencias sin coordenadas pueden filtrarse por localidad declarada");
assert.ok(filterReferences(all, { activity: "infrastructure", category: "opportunity" }).some(item => item.id === "promeba-trujui"), "la actividad se filtra de forma independiente del sector");
assert.ok(filterReferences(all, { nextStep: "publication", category: "published" }).length > 0, "el próximo paso permite priorizar revalidaciones de publicaciones");
assert.deepEqual(filterReferences(all, { kind: "industrial", category: "locality" }), [], "un sector de oportunidad no incorpora localidades");
assert.deepEqual(filterReferences(all, { query: "productivo", kind: "industrial" }).map(item => item.id), ["rp25", "ecoparque", "base-aerea-moreno-norte"], "la búsqueda reconoce la etiqueta visible del sector, no solo su código interno");
assert.ok(filterReferences(all, { query: "logistca", category: "opportunity" }).some(item => item.id === "base-aerea-moreno-norte"), "el buscador tolera una errata simple en términos largos");
assert.ok(filterReferences(all, { query: "francisco alvarez", category: "locality" }).some(item => item.id === "alvarez"), "el buscador encuentra localidades aunque se omitan los acentos");
assert.ok(filterReferences(all, { query: "FRANCISCO ÁLVAREZ", category: "locality" }).some(item => item.id === "alvarez"), "la búsqueda ignora diferencias de mayúsculas y acentos");
assert.equal(filterReferences(all, { query: "cadena-sin-coincidencias-xyz" }).length, 0, "el estado vacío corresponde a cero coincidencias reales");
assert.ok(filterReferences(all, { query: "veredas cuartel", category: "opportunity" }).some(item => item.id === "promeba-cuartel-v"), "la búsqueda cruza localidad y evidencia real de la ficha");
assert.ok(filterReferences(all, { query: "cuartel v promeba veredas", category: "opportunity" }).some(item => item.id === "promeba-cuartel-v"), "la búsqueda compuesta relaciona localidad, actividad y evidencia");
assert.ok(filterReferences(all, { query: "iduar 400.000 m²", category: "opportunity" }).some(item => item.id === "base-aerea-moreno-norte"), "la búsqueda reconoce la fuente y una superficie expresada en m²");
assert.ok(filterReferences(all, { query: "solicitar planos", category: "opportunity" }).some(item => item.id === "base-aerea-moreno-norte"), "la búsqueda indexa el próximo paso");
assert.ok(filterReferences(all, { query: "logística cuartel v", category: "opportunity" }).some(item => item.id === "base-aerea-moreno-norte"), "la búsqueda indexa actividad y localidad");
assert.ok(filterReferences(all, { query: "sibom 7443/25", category: "opportunity" }).some(item => item.id === "rp25"), "la búsqueda indexa la fuente normativa");
assert.ok(filterReferences(all, { query: "Derqui 5890", category: "published" }).some(item => item.id === "sumio-lote-338"), "la búsqueda indexa calles y direcciones publicadas");
assert.ok(filterReferences(all, { query: "338 m2", category: "published" }).some(item => item.id === "sumio-lote-338"), "la búsqueda indexa superficies numéricas y convierte m² a m2");
assert.ok(filterReferences(all, { query: "Pablo Aquino Derqui 5890 338 m²", category: "published" }).some(item => item.id === "sumio-lote-338"), "la búsqueda compuesta cruza anunciante, calle y superficie");
assert.deepEqual(
  filterReferences(all, { query: "CUÁRTEL-V PROMEBA" }).map(item => item.id).sort(),
  filterReferences(all, { query: "cuartel v promeba" }).map(item => item.id).sort(),
  "la búsqueda ignora tildes, mayúsculas y puntuación"
);
const combinedFilters = filterReferences(all, { query: "cuartel v", locality: "cuartel", activity: "industrial", nextStep: "contact", evidence: "documented" });
assert.deepEqual(combinedFilters.map(item => item.id), ["base-aerea-moreno-norte"], "la búsqueda y los filtros de localidad, actividad, próximo paso y evidencia se combinan");
const unlocatedOpportunityIds = opportunities.filter(item => !hasCoordinates(item)).map(item => item.id).sort();
assert.deepEqual(unlocatedOpportunityIds, ["base-aerea-moreno-norte", "mui-mo-monitoreo-urbano-inmobiliario", "promeba-cuartel-v", "promeba-trujui", "utopia-bonaerense-moreno"].sort(), "las cinco referencias sin geolocalización no reciben coordenadas inventadas");
const utopiaReference = opportunities.find(item => item.id === "utopia-bonaerense-moreno");
assert.ok(utopiaReference.sourceAlternates.some(source => source.url === "https://nube.minfra.gba.gob.ar/index.php/s/TrMYQtYjHf4tSrJ/download"), "la ficha Utopía conserva el acta oficial de apertura como fuente directa");
const baseAereaReference = opportunities.find(item => item.id === "base-aerea-moreno-norte");
assert.equal(hasCoordinates(baseAereaReference), false, "la referencia sin coordenadas no recibe un punto inventado");
assert.ok(filterReferences(all, { query: "base aérea", category: "opportunity" }).some(item => item.id === "base-aerea-moreno-norte"), "la referencia sin coordenadas sigue encontrándose desde el índice");
assert.deepEqual(
  filterReferences(all, { query: "paso del rey", category: "locality" }).map(item => item.id),
  ["paso"]
);
assert.deepEqual(
  filterReferences(all, { query: "7443/25", category: "opportunity", evidence: "documented" }).map(item => item.id),
  ["rp25"]
);
assert.deepEqual(
  filterReferences(all, { query: "zzzxqv 918273" }).map(item => item.id),
  [],
  "una consulta realmente ajena al inventario devuelve cero coincidencias"
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
assert.ok(csv.includes("tipo_de_evidencia") && csv.includes("nivel_de_confianza") && csv.includes("fecha_de_fuente") && csv.includes("fecha_de_consulta"), "CSV exporta la trazabilidad de la evidencia");
assert.ok(csv.includes("no identifica una parcela"), "CSV conserva la advertencia parcelaria");
const publishedCsv = buildCsv(all.filter(item => item.type === "published").slice(0, 1));
assert.ok(publishedCsv.includes("precio_publicado"), "CSV incluye el campo de precio de los avisos");
assert.ok(publishedCsv.includes("Anticipo USD 12.000"), "CSV conserva el precio publicado sin reinterpretarlo");
assert.ok(publishedCsv.includes("Geolocalización pendiente"), "CSV conserva el estado de geolocalización pendiente");

const spreadsheetSafetyCsv = buildCsv([{
  type: "published",
  recordType: "Terreno",
  name: '=HYPERLINK("https://example.invalid","Abrir")',
  locality: "Moreno",
  address: "Moreno",
  agency: "  +SUM(1,1)",
  contact: String.fromCharCode(9) + "=1+1",
  observations: "@SUM(1,1)",
  lat: -34.6,
  lng: -58.8,
  source: "https://example.invalid",
  price: "-1+1",
  surfaceNote: "\r=1+1",
  publicationDate: "\n=1+1",
  currency: "\uFEFF=1+1"
}]);
assert.ok(spreadsheetSafetyCsv.includes('"\'=HYPERLINK'), "CSV neutraliza fórmulas que comienzan con =");
assert.ok(spreadsheetSafetyCsv.includes('"\'  +SUM'), "CSV neutraliza fórmulas precedidas por espacios");
assert.ok(spreadsheetSafetyCsv.includes("'" + String.fromCharCode(9) + "=1+1"), "CSV neutraliza fórmulas precedidas por tabulación");
assert.ok(spreadsheetSafetyCsv.includes('"\'@SUM'), "CSV neutraliza fórmulas que comienzan con @");
assert.ok(spreadsheetSafetyCsv.includes('"\'-1+1"'), "CSV neutraliza fórmulas que comienzan con -");
assert.ok(spreadsheetSafetyCsv.includes('"\r=1+1"') === false && spreadsheetSafetyCsv.includes('"\'\r=1+1"'), "CSV neutraliza fórmulas precedidas por retorno de carro");
assert.ok(spreadsheetSafetyCsv.includes('"\'\n=1+1"'), "CSV neutraliza fórmulas precedidas por salto de línea");
assert.ok(spreadsheetSafetyCsv.includes("'\uFEFF=1+1"), "CSV neutraliza fórmulas precedidas por BOM");
assert.ok(spreadsheetSafetyCsv.includes('"-34.6","-58.8"'), "CSV conserva coordenadas numéricas negativas");
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
  buildGeoJson(all).features.filter(feature => feature.properties.category !== "Propiedades y desarrollos publicados" && feature.geometry !== null).every(feature => feature.geometry.type === "Point"),
  "las referencias territoriales con coordenadas conservan puntos de referencia"
);
assert.ok(
  buildGeoJson(all).features.filter(feature => feature.properties.category !== "Propiedades y desarrollos publicados" && feature.geometry === null).every(feature => /Sin coordenada precisa/.test(feature.properties.coordinate_scope)),
  "las referencias sin coordenadas no se dibujan ni se exportan como puntos"
);
const muiFeature = buildGeoJson(all).features.find(feature => feature.properties.id === "mui-mo-monitoreo-urbano-inmobiliario");
assert.equal(muiFeature.geometry, null, "MUI-MO no recibe una coordenada que la fuente no publica");
assert.match(muiFeature.properties.coordinate_scope, /Sin coordenada precisa/);
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
assert.equal(reviewExport.references.length, 10, "la exportación excluye localidades y conserva las diez tesis visibles");
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
assert.equal(territorialBrief.reference.coordinates.latitude, -34.5705);
assert.equal(territorialBrief.diligence.length, reviewTasks.length);
const unlocatedBrief = buildTerritorialBrief(all.find(item => item.id === "mui-mo-monitoreo-urbano-inmobiliario"), "2026-11-25T21:00:00.000Z");
assert.equal(unlocatedBrief.reference.coordinates.latitude, null, "las referencias sin coordenadas no se convierten en latitud cero");
assert.equal(unlocatedBrief.reference.coordinates.longitude, null, "las referencias sin coordenadas no se convierten en longitud cero");
assert.match(unlocatedBrief.reference.coordinates.scope, /Sin coordenada precisa/);
assert.equal(territorialBrief.diligence.every(task => task.recorded === false), true);
assert.equal(territorialBrief.dataToComplete.length, 6);
assert.equal(buildTerritorialBrief(localities[0]), null, "las localidades no se presentan como tesis inmobiliarias");
const territorialHtml = buildTerritorialBriefHtml(territorialBrief);
assert.match(territorialHtml, /<!doctype html>/i);
assert.match(territorialHtml, /Evidencia disponible/);
assert.match(territorialHtml, /Calidad y trazabilidad/);
assert.match(territorialHtml, /Nivel de confianza/);
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
assert.equal(industrialDossier.references.length, 3, "el dossier sectorial solo incluye las referencias visibles");
assert.equal(industrialDossier.counts.documented, 3);
assert.equal(industrialDossier.counts.localities, 0);
assert.ok(industrialDossier.filterLabels.includes("Sector: Productivo / logístico"));
assert.equal(industrialDossier.references[0].sourceUrl, opportunities.find(item => item.id === "rp25").source);
assert.match(industrialDossier.references[0].coordinates.scope, /no identifica una parcela/);
assert.equal(buildTerritorialDossier([], {}, "2026-11-26T03:00:00.000Z"), null, "una vista vacía no produce un dossier");
const completeDossier = buildTerritorialDossier(all, {}, "2026-11-26T03:00:00.000Z");
assert.equal(completeDossier.references.length, all.length, "el dossier completo incluye todas las referencias del inventario");
assert.ok(MAX_TERRITORIAL_DOSSIER_REFERENCES >= all.length, "el límite HTML admite el inventario territorial completo vigente");
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


const nov27_1032ExpectedIds = [
  "terreno-9-de-julio-46-487",
  "terreno-jose-marmol-rivadavia-1418",
  "terreno-guatemala-2500-valentin-alsina-590",
  "terreno-justo-daract-2751-2163",
  "casa-quinta-samaniego-4900-4200",
  "casa-martinez-melo-300-161",
  "casa-25-de-mayo-2700-350",
  "casa-concordia-2545-311",
  "terreno-bartolome-mitre-3200-1260"
];
for (const id of nov27_1032ExpectedIds) {
  assert.ok(publishedProperties.some(item => item.id === id), "la revisión 10:32 incorpora " + id);
}
const mariaEugenia = publishedProperties.find(item => item.id === "desarrollo-maria-eugenia-residences-village");
assert.ok(mariaEugenia && mariaEugenia.sourceAlternates.some(source => source.url === "https://bocetos.xintel.com.ar/vcolanding/"), "María Eugenia conserva la fuente institucional de Grupo Vaccaro");
assert.ok(!mariaEugenia.contact.includes("4492-28174"), "María Eugenia no conserva el teléfono con dígito adicional");
assert.equal(publishedProperties.find(item => item.id === "terreno-jose-marmol-rivadavia-1418").geocodeDisabled, true, "José Mármol no se geolocaliza mientras exista posible solapamiento de parcelas");
const tresDeFebrero = publishedProperties.find(item => item.id === "moreno-lote-tres-de-febrero-7800");
assert.ok(tresDeFebrero && tresDeFebrero.price.includes("USD 17.800") && tresDeFebrero.observations.includes("No tiene servicios instalados"), "Tres de Febrero se actualiza en su registro canónico sin duplicar la URL");
assert.equal(publishedProperties.find(item => item.id === "terreno-9-de-julio-46-487").geocodeDisabled, true, "9 de Julio 46 no se geolocaliza mientras el título del portal contradiga la dirección");
assert.equal(publishedProperties.find(item => item.id === "terreno-bartolome-mitre-3200-1260").availabilityStatus, "Pendiente de revalidación");
assert.equal(publishedProperties.find(item => item.id === "casa-concordia-2545-311").availabilityStatus, "Pendiente de revalidación");

console.log("OK: pruebas del Mapa IA, exportaciones cartográficas y fichas editoriales imprimibles.");

async function testGeorefRequestQueue() {
  const items = [
    { id: "shared-a", geocodeQuery: "San Juan Bautista 100", geocodeMatch: "SAN JUAN BAUTISTA 100" },
    { id: "shared-b", geocodeQuery: "San Juan Bautista 100", geocodeMatch: "SAN JUAN BAUTISTA 100" },
    { id: "camilli", geocodeQuery: "Camilli 140", geocodeMatch: "CAMILLI 140" },
    { id: "ambiguous", geocodeQuery: "Ambigua 500", geocodeMatch: "AMBIGUA 500" },
    { id: "failed", geocodeQuery: "Falla 10", geocodeMatch: "FALLA 10" },
    { id: "out-of-range", geocodeQuery: "Fuera de rango 1", geocodeMatch: "FUERA DE RANGO 1" },
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
      if (query === "Fuera de rango 1") {
        return {
          ok: true,
          json: async () => ({
            direcciones: [{
              nomenclatura: "FUERA DE RANGO 1, MORENO, BUENOS AIRES",
              ubicacion: { lat: "95", lon: "-58.80" }
            }]
          })
        };
      }
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
  assert.equal(calls.length, 5, "una dirección repetida genera una sola consulta");
  assert.equal(new Set(calls).size, 5, "cada consulta única se procesa una vez");
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
  assert.equal(result.get("Fuera de rango 1"), null, "coordenadas fuera del rango geográfico válido se rechazan");
  assert.equal(result.has("Galileo Galilei al 7300"), false, "una ubicación aproximada marcada como no geocodificable no consulta Georef");
  assert.equal((await resolvePublishedGeoreferences([], fakeFetch)).size, 0, "un inventario vacío no genera consultas");
}

async function testGeorefCache() {
  const item = {
    id: "cache-a",
    geocodeQuery: "Av. Derqui 5890",
    geocodeMatch: "DERQUI 5890",
    address: "Av. Derqui 5890"
  };
  const storage = {
    value: null,
    getItem(key) {
      assert.equal(key, GEOREF_CACHE_KEY);
      return this.value;
    },
    setItem(key, value) {
      assert.equal(key, GEOREF_CACHE_KEY);
      this.value = value;
    }
  };
  let calls = 0;
  const fakeFetch = async url => {
    calls += 1;
    assert.equal(new URL(url).searchParams.get("direccion"), "Av. Derqui 5890");
    return {
      ok: true,
      json: async () => ({
        direcciones: [{
          nomenclatura: "DERQUI 5890, MORENO, BUENOS AIRES",
          ubicacion: { lat: "-34.6508", lon: "-58.7914" }
        }]
      })
    };
  };

  const first = await resolvePublishedGeoreferencesCached([item], fakeFetch, null, storage, 1000, 2);
  assert.equal(first.requested, 1, "la primera visita consulta la dirección en Georef");
  assert.equal(first.cacheHits, 0, "la primera visita no informa aciertos de caché");
  assert.equal(calls, 1);
  assert.equal(first.results.get(item.geocodeQuery).lat, -34.6508);
  assert.ok(storage.value && storage.value.includes("DERQUI 5890, MORENO, BUENOS AIRES"), "la coordenada inequívoca se conserva en caché local");

  const second = await resolvePublishedGeoreferencesCached([item], fakeFetch, null, storage, 2000, 2);
  assert.equal(second.cacheHits, 1, "la visita siguiente recupera la dirección de caché");
  assert.equal(second.requested, 0, "una dirección cacheada no vuelve a consultar Georef");
  assert.equal(calls, 1, "la caché evita la solicitud repetida");
  assert.equal(second.results.get(item.geocodeQuery).lng, -58.7914);

  const expired = await resolvePublishedGeoreferencesCached(
    [item], fakeFetch, null, storage, 1000 + GEOREF_CACHE_TTL_MS + 1, 2
  );
  assert.equal(expired.cacheHits, 0, "una coordenada vencida no se reutiliza");
  assert.equal(expired.requested, 1, "una coordenada vencida vuelve a verificarse");
  assert.equal(calls, 2);

  storage.value = JSON.stringify({
    version: 1,
    records: {
      "AV DERQUI 5890": {
        checkedAt: 5000,
        lat: 95,
        lng: -58.7914,
        nomenclatura: "DERQUI 5890, MORENO, BUENOS AIRES"
      }
    }
  });
  const corrupted = await resolvePublishedGeoreferencesCached([item], fakeFetch, null, storage, 6000, 2);
  assert.equal(corrupted.cacheHits, 0, "la caché descarta latitudes fuera de rango");
  assert.equal(corrupted.requested, 1);
  assert.equal(calls, 3);

  const unavailableStorage = await resolvePublishedGeoreferencesCached([item], fakeFetch, null, null, 7000, 2);
  assert.equal(unavailableStorage.cacheHits, 0, "sin almacenamiento local el mapa conserva la consulta normal");
  assert.equal(unavailableStorage.requested, 1);
  assert.equal(calls, 4);

  let failedCalls = 0;
  const failedStorage = {
    value: null,
    getItem() { return this.value; },
    setItem(key, value) { this.value = value; }
  };
  const failedFetch = async () => {
    failedCalls += 1;
    return { ok: false, json: async () => ({ direcciones: [] }) };
  };
  await resolvePublishedGeoreferencesCached([item], failedFetch, null, failedStorage, 8000, 2);
  await resolvePublishedGeoreferencesCached([item], failedFetch, null, failedStorage, 9000, 2);
  assert.equal(failedCalls, 2, "los errores HTTP no se cachean como si fueran coordenadas válidas");
  assert.equal(failedStorage.value, null, "los resultados fallidos no se persisten");
}


const turn11ExpectedIds = [
  "terreno-riccheri-638",
  "terreno-gervasio-mendez-300-umbrales",
  "terreno-ricardo-gutierrez-8900-312",
  "terreno-los-molinos-lotes-800-850",
  "terreno-prados-oeste2-lote15-928",
  "terreno-prados-oeste1b-lote295-745",
  "terreno-potosi-sin-altura-345-posible-reactivacion",
  "casa-general-hornos-2800-prados-oeste1-819",
  "casa-prados-oeste1a-lote62-801",
  "casa-prados-oeste1b-lote169-819",
  "casa-prados-oeste1b-lote275-800",
  "casa-prados-oeste1b-lote234-810",
  "casa-el-carpintero-100",
  "casa-de-la-quintana-moreno",
  "casa-claudio-maria-joly-1900-252",
  "casa-graham-bell-2800-840",
  "casa-rafael-arcos-1800-860",
  "casa-esteban-bongiovanni-1200-1000",
  "casa-gervasio-mendez-4900-70",
  "casa-gervasio-mendez-5000-154",
  "terreno-fincas-san-jose-etapa2-800",
  "casa-prados-oeste1b-lote212-813",
  "terreno-coronel-suarez-neuquen-lote31-500"
];
for (const id of turn11ExpectedIds) {
  const item = publishedProperties.find(record => record.id === id);
  assert.ok(item, "la revisión 11 incorpora " + id);
  assert.equal(item.lastCheckedAt, "2026-11-27");
  assert.ok(item.source && item.source.startsWith("https://"));
  assert.equal(item.availabilityStatus, id === "casa-salvador-6300-300" || id === "terreno-san-carlos-4500-552" ? "Pendiente de revalidación" : "No confirmada");
}
const racineReactivated = publishedProperties.find(record => record.id === "casa-racine-800-no-vigente");
assert.ok(racineReactivated);
assert.equal(racineReactivated.availabilityStatus, "No confirmada");
assert.ok(racineReactivated.source.includes("20962051"));
const turn12ExpectedIds = [
  "desarrollo-parque-central-av-libertador-6400",
  "terreno-chile-133-1036",
  "casa-salvador-6300-300",
  "terreno-haras-maria-victoria-lote32-800",
  "casa-labarden-2000-800-industrial",
  "terreno-santa-teresa-de-jesus-2900-221",
  "predio-piovano-4300-18816",
  "terreno-prados-oeste1-lote137-778",
  "terreno-prados-oeste2-831",
  "terreno-casco-alvarez-725",
  "terreno-san-carlos-4500-552",
  "terreno-reverendo-padre-fahy-2300-756",
  "quinta-constituyentes-800-1261",
  "quinta-el-arreo-2900-779",
  "quinta-reverendo-padre-fahy-200-1300",
  "quinta-leguizamon-1400-1200",
  "quinta-los-aromos-400-1308",
  "quinta-la-providencia-900-1537",
  "quinta-juana-de-arco-700-600",
  "quinta-zuloaga-1500-1680",
  "predio-deportivo-san-luis-2600-10860",
  "fraccion-rocha-blaquier-2001-10000",
  "terreno-libano-echeverria-2-lotes-456",
  "terreno-boulogne-sebastian-el-cano-373",
  "quinta-nemesio-alvarez-3900-1100",
  "quinta-tegucigalpa-4500-300",
  "quinta-los-robles-2900-270",
  "quinta-mercedes-100-696",
  "quinta-mercedes-2200-1260"
];
for (const id of turn12ExpectedIds) {
  const item = publishedProperties.find(record => record.id === id);
  assert.ok(item, "la revisión 12 incorpora " + id);
  assert.equal(item.lastCheckedAt, "2026-11-27");
  assert.ok(item.source && item.source.startsWith("https://"));
  assert.equal(item.availabilityStatus, id === "casa-salvador-6300-300" || id === "terreno-san-carlos-4500-552" ? "Pendiente de revalidación" : "No confirmada");
}

const turn13ExpectedIds = [
  "casa-bolivia-2100-400",
  "casa-panama-5300-300",
  "quinta-formosa-3400-3600",
  "casa-urquiza-2600-299",
  "desarrollo-altos-del-monte-san-juan-bautista-2400",
  "casa-concordia-1600-219",
  "casa-maria-eugenia-residences-coravalan-2300-187",
  "terreno-diario-la-prensa-700-960",
  "quinta-intendente-dastugue-4200-2500",
  "quinta-rembrandt-3800-2700",
  "casa-libertad-300-175",
  "casa-puente-marquez-1202-1000",
  "terreno-san-diego-1687",
  "terreno-san-diego-2175-historico"
];
const turn13PendingIds = new Set([
  "casa-libertad-300-175",
  "casa-puente-marquez-1202-1000",
  "terreno-san-diego-1687"
]);
const turn13WithdrawnIds = new Set(["terreno-san-diego-2175-historico"]);
for (const id of turn13ExpectedIds) {
  const item = publishedProperties.find(record => record.id === id);
  assert.ok(item, "la revisión 13 incorpora " + id);
  assert.equal(item.lastCheckedAt, "2026-11-27");
  assert.ok(item.source && item.source.startsWith("https://"));
  const expectedStatus = turn13WithdrawnIds.has(id)
    ? "No vigente"
    : turn13PendingIds.has(id)
      ? "Pendiente de revalidación"
      : "No confirmada";
  assert.equal(item.availabilityStatus, expectedStatus);
}
const maipuReactivated = publishedProperties.find(record => record.id === "casa-maipu-1341-el-casco-historica");
assert.equal(maipuReactivated.availabilityStatus, "No confirmada");
assert.ok(maipuReactivated.source.includes("0c28e77c"));
assert.ok(maipuReactivated.sourceAlternates.some(source => source.url.includes("20725083") && source.label.includes("410 Gone")));
assert.equal(maipuReactivated.geocodeDisabled, true);
assert.ok(maipuReactivated.address.includes("1300") && maipuReactivated.address.includes("1341"));
assert.ok(publishedProperties.find(record => record.id === "casa-ituzaingo-1400-723").sourceAlternates.some(source => source.url.includes("77606a04")));
assert.ok(publishedProperties.find(record => record.id === "casa-doctor-asseff-400-361").sourceAlternates.some(source => source.url.includes("3023930f")));


const parqueCentral = publishedProperties.find(record => record.id === "desarrollo-parque-central-av-libertador-6400");
assert.ok(parqueCentral.publicationDate.includes("12/11/2026"));
assert.ok(parqueCentral.sourceAlternates.some(source => source.url.includes("infraestructura-electrica")));
const harasVictoria = publishedProperties.find(record => record.id === "terreno-haras-maria-victoria-lote32-800");
assert.ok(harasVictoria.sourceAlternates.length === 1);
const sanCarlos = publishedProperties.find(record => record.id === "terreno-san-carlos-4500-552");
assert.ok(sanCarlos.observations.includes("cesión de derechos"));
assert.ok(sanCarlos.sourceAlternates.some(source => source.url.includes("59995707") && source.label.includes("410 Gone")));
const laProvidencia = publishedProperties.find(record => record.id === "quinta-la-providencia-900-1537");
assert.ok(laProvidencia.observations.includes("no cuentan con planos aprobados"));
const sourceUrls = publishedProperties.map(record => record.source).filter(Boolean);
assert.equal(new Set(sourceUrls).size, sourceUrls.length, "no se duplican enlaces primarios");
assert.equal(publishedProperties.length, 356, "el catálogo incorpora 29 altas netas sin duplicados");
assert.equal(all.length, 372, "el inventario completo refleja 356 publicaciones y 16 referencias territoriales");


testGeorefRequestQueue()
  .then(() => testGeorefCache())
  .then(() => console.log("OK: Georef con concurrencia limitada, deduplicación, caché local temporal y rechazo de coordenadas inválidas."))
  .catch(error => {
    console.error(error);
    process.exitCode = 1;
  });
