"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const modulePath = path.join(__dirname, "../assets/js/mapa-ia.js");
const source = fs.readFileSync(modulePath, "utf8");
const { localities, opportunities, all, filterReferences, buildCsv } = require(modulePath);
assert.ok(source.indexOf("mapElement.replaceChildren();") < source.indexOf("new maplibregl.Map("), "el contenedor se vacía antes de crear el mapa");
assert.ok(source.includes("maplibregl.Marker"), "los puntos usan marcadores MapLibre");
assert.ok(source.includes("https://tile.openstreetmap.org/{z}/{x}/{y}.png"), "la capa base usa teselas OSM");

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
assert.equal(filterReferences(all, { evidence: "documented" }).length, 10, "el filtro de evidencia conserva las localidades como referencias neutrales");
assert.equal(filterReferences(all, { evidence: "hypothesis" }).length, 7);
assert.deepEqual(
  filterReferences(all, { query: "paso del rey", category: "locality" }).map(item => item.id),
  ["paso"]
);
assert.deepEqual(
  filterReferences(all, { query: "ordenanza 7443", category: "opportunity", evidence: "documented" }).map(item => item.id),
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

console.log("OK: pruebas del motor MapLibre, datos territoriales, filtros, evidencias y exportación CSV del Mapa IA.");
