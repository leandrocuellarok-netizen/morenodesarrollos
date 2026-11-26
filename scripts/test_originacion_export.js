"use strict";

const assert = require("node:assert/strict");
const tools = require("../assets/js/opportunity-tools.js");
const exporter = require("../assets/js/originacion-export.js");

const internal = tools.emptyInternalDossier();
internal.reference = "MOR-TEST-002";
internal.counterpartyType = "developer";
internal.organization = "Desarrolladora de prueba";
internal.commercialStage = "meeting";
internal.nextAction = "Solicitar documentación";
internal.followUpDate = "2026-11-28";
internal.evidence.push({
  title: "Visor cartográfico consultado",
  classification: "public",
  url: "https://geo.arba.gov.ar/",
  consultedAt: "2026-11-25",
  note: "Referencia de contexto; no acredita parcela."
});

const exportedAt = new Date("2026-11-25T23:00:00.000Z");
const payload = exporter.buildInternalExport(tools, internal, exportedAt);
assert.equal(payload.schema, "moreno.opportunity-dossier");
assert.equal(payload.schemaVersion, 3);
assert.deepEqual(payload.sourceData.fields, {});
assert.deepEqual(payload.sourceData.calculationInput, {});
assert.equal(payload.internalData.reference, "MOR-TEST-002");
assert.match(JSON.stringify(payload.dossier), /Seguimiento y negociación/);
assert.match(JSON.stringify(payload.dossier), /Registro de fuentes y evidencia/);
assert.doesNotMatch(JSON.stringify(payload.dossier), /Origen y contacto|Inmueble o proyecto/);

const imported = exporter.parseInternalImport(tools, JSON.stringify(payload));
assert.equal(imported.ok, true);
assert.equal(imported.version, 3);
assert.equal(imported.internalData.reference, "MOR-TEST-002");
assert.equal(imported.internalData.evidence[0].classification, "public");
assert.equal(exporter.parseInternalImport(tools, "{json inválido").ok, false);

console.log("OK: exportación interna v3 separada, sin datos del formulario público, e importación local validada.");
