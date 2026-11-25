"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const modulePath = path.join(__dirname, "../assets/js/mapa-ia.js");
const source = fs.readFileSync(modulePath, "utf8");
const stylePath = path.join(__dirname, "../assets/css/mapa-ia.css");
const styles = fs.readFileSync(stylePath, "utf8");
const { localities, opportunities, all, filterReferences, buildCsv, buildGeoJson, getSharedReferenceId, buildReferenceUrl, buildOpportunityContactUrl } = require(modulePath);
assert.ok(source.indexOf("mapElement.replaceChildren();") < source.indexOf("new maplibregl.Map("), "el contenedor se vacía antes de crear el mapa");
assert.ok(source.includes("maplibregl.Marker"), "los puntos usan marcadores MapLibre");
assert.ok(source.includes("https://tile.openstreetmap.org/{z}/{x}/{y}.png"), "la capa base usa teselas OSM");
assert.ok(source.includes("attributionControl: { compact: false }"), "la atribución OSM permanece visible también en móvil");
assert.ok(source.includes("https://www.openstreetmap.org/fixthemap"), "se ofrece el enlace para reportar problemas cartográficos");
const mapPage = fs.readFileSync(path.join(__dirname, "../mapa-ia/index.html"), "utf8");
assert.ok(mapPage.includes('id="map-verification-title"'), "el Mapa IA incluye la mesa de verificación documental");
assert.ok(mapPage.includes('href="https://mapas.moreno.gob.ar/"'), "se enlaza el visor cartográfico oficial de Moreno");
assert.ok(mapPage.includes('href="https://arba.gov.ar/geoarba/inicio.asp"'), "se enlaza GeoARBA como fuente provincial");
assert.ok(mapPage.includes('href="https://www.moreno.gob.ar/catastro.php"'), "se enlaza la Dirección de Catastro municipal");
assert.ok(mapPage.includes('href="https://moreno2.moreno.gob.ar/docs/catastro/mapa_zonificacion.pdf"'), "se conserva el plano municipal histórico como antecedente");
for (const sourceUrl of [
  "https://mapas.moreno.gob.ar/",
  "https://arba.gov.ar/geoarba/inicio.asp",
  "https://www.moreno.gob.ar/catastro.php",
  "https://moreno2.moreno.gob.ar/docs/catastro/mapa_zonificacion.pdf"
]) {
  const safeAnchor = new RegExp('<a\\\\b(?=[^>]*href="' + sourceUrl.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\\\assert.ok(mapPage.includes('href="https://moreno2.moreno.gob.ar/docs/catastro/mapa_zonificacion.pdf"'), "se conserva el plano municipal histórico como antecedente");") + '")(?=[^>]*target="_blank")(?=[^>]*rel="noopener noreferrer")[^>]*>');
  assert.match(mapPage, safeAnchor, "las fuentes oficiales abren de forma segura: " + sourceUrl);
}

assert.match(mapPage, /anexo de junio de 2015[\s\S]*no confirma la normativa vigente/i, "el plano histórico advierte que no acredita normativa actual");
assert.match(mapPage, /nomenclatura catastral[\s\S]*certificado o constancia urbanística vigente/i, "la secuencia exige individualización y normativa actual");
assert.match(mapPage, /organismo o profesional consultado, documento, fecha de consulta/i, "la ficha exige trazabilidad documental");

assert.ok(source.includes("function setActiveReference(item, options)"), "la selección sincroniza mapa e inventario");
assert.ok(source.includes("function getSharedReferenceId(search, items)"), "las referencias admiten enlaces directos");
assert.ok(source.includes("function buildReferenceUrl(baseUrl, referenceId)"), "cada ficha puede construir una URL compartible");
assert.ok(source.includes("updateShareUrl(item.id)"), "la selección actualiza la URL sin recargar");
assert.ok(source.includes('shareLink.textContent = "Abrir ficha compartible ↗"'), "las fichas y ventanas emergentes ofrecen enlaces compartibles");
assert.ok(source.includes('link.textContent = "Consultar sobre esta referencia ↗"'), "las fichas conectan con el formulario comercial");
assert.ok(source.includes("function buildOpportunityContactUrl(baseUrl, item)"), "el enlace comercial conserva la referencia de origen");
assert.ok(source.includes('contactLinkNode(item, "map-contact-link")'), "el CTA comercial aparece en fichas y ventanas emergentes");
assert.ok(source.includes("if (sharedItem) focusItem(sharedItem)"), "un enlace directo centra y abre la referencia al cargar");
assert.ok(styles.includes(".map-share-link"), "los enlaces compartibles tienen un estilo identificable");
assert.equal(getSharedReferenceId("?ref=rp25", all), "rp25", "se reconoce una referencia válida desde la URL");
assert.equal(getSharedReferenceId("?ref=no-existe", all), null, "se descarta una referencia desconocida");
assert.equal(getSharedReferenceId("", all), null, "sin parámetro no se fuerza una selección");
const sharedUrl = new URL(buildReferenceUrl("https://example.org/mapa-ia/?layer=all#inventario", "rp25"));
assert.equal(sharedUrl.searchParams.get("ref"), "rp25", "la URL compartible identifica la referencia");
assert.equal(sharedUrl.searchParams.get("layer"), "all", "la URL compartible conserva otros parámetros");
assert.equal(sharedUrl.hash, "#inventario", "la URL compartible conserva el fragmento existente");
const contactUrl = new URL(buildOpportunityContactUrl("https://example.org/proyecto/mapa-ia/", {
  id: "rp25",
  name: "RP25 · Darwin Passaponti"
}));
assert.equal(contactUrl.pathname, "/proyecto/oportunidades/", "el CTA lleva al formulario de oportunidades");
assert.equal(contactUrl.searchParams.get("map_ref"), "rp25", "el contacto conserva el identificador de la referencia");
assert.equal(contactUrl.searchParams.has("map_name"), false, "el contacto no confía en etiquetas editables de la URL");

assert.ok(source.includes("card.dataset.mapItem = item.id"), "cada ficha tiene una identidad enlazable");
assert.ok(source.includes('element.addEventListener("click", () => {'), "seleccionar un marcador abre su ficha asociada");
assert.ok(source.includes('card.scrollIntoView({'), "la ficha seleccionada se revela en el inventario");
assert.ok(source.includes('matchMedia("(prefers-reduced-motion: reduce)")'), "el desplazamiento respeta la preferencia de movimiento reducido");
assert.ok(styles.includes(".map-pin.is-selected"), "el marcador seleccionado tiene un estado visual");
assert.ok(styles.includes(".map-item.is-active"), "la ficha seleccionada tiene un estado visual");
assert.ok(source.includes('getElementById("export-geojson")'), "el inventario ofrece exportación GeoJSON");
assert.ok(source.includes("function exportVisibleGeoJson()"), "la descarga GeoJSON usa las referencias visibles");
assert.ok(source.includes('type: "application/geo+json;charset=utf-8"'), "la descarga declara el tipo MIME GeoJSON");
assert.ok(source.includes('link.download = "moreno-mapa-ia-referencias.geojson"'), "la descarga usa extensión GeoJSON");


assert.equal(localities.length, 6, "se conservan las seis localidades");
assert.equal(opportunities.length, 5, "se conservan las cinco tesis");
assert.equal(all.length, 11, "el inventario completo contiene once referencias");
assert.equal(new Set(all.map(item => item.id)).size, all.length, "los identificadores son únicos");

for (const item of all) {
  assert.ok(Number.isFinite(item.lat) && item.lat > -35 && item.lat < -34, "latitud plausible para Moreno: " + item.name);
  assert.ok(Number.isFinite(item.lng) && item.lng > -59 && item.lng < -58, "longitud plausible para Moreno: " + item.name);
}
for (const item of opportunities) {
  assert.ok(["documented", "hypothesis"].includes(item.stage), "nivel de evidencia explícito: " + item.name);
  assert.match(item.source, /^https:\/\//, "fuente pública HTTPS: " + item.name);
}

assert.equal(filterReferences(all, { category: "locality" }).length, 6);
assert.equal(filterReferences(all, { category: "opportunity" }).length, 5);
assert.equal(filterReferences(all, { evidence: "documented" }).length, 4, "el filtro documentado solo muestra tesis con fuente");
assert.equal(filterReferences(all, { evidence: "hypothesis" }).length, 1, "el filtro de hipótesis no mezcla localidades sin clasificar");
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
assert.match(filteredGeoJson.disclaimer.toLocaleLowerCase("es-AR"), /no identifican parcelas/);
assert.equal(
  buildGeoJson(all).features.length,
  11,
  "la exportación completa conserva las once referencias actuales"
);
assert.ok(
  buildGeoJson(all).features.every(feature => feature.geometry.type === "Point"),
  "ninguna referencia se convierte en geometría parcelaria"
);
assert.ok(
  buildGeoJson(all).features.some(feature => feature.properties.source_url === "https://sibom.slyt.gba.gob.ar/bulletins/14607/contents/2361465"),
  "GeoJSON conserva el enlace a la fuente pública"
);
assert.equal(
  JSON.parse(JSON.stringify(buildGeoJson(all))).features.length,
  11,
  "GeoJSON puede serializarse como JSON válido"
);


console.log("OK: pruebas del motor MapLibre, datos territoriales, filtros, evidencias y exportaciones CSV/GeoJSON del Mapa IA.");
