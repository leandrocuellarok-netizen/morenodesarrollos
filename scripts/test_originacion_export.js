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

class FakeElement {
  constructor(id) {
    this.id = id;
    this.listeners = {};
    this.files = [];
    this.disabled = false;
    this.textContent = "";
    this.dataset = {};
    this.attributes = {};
    this._value = "";
  }
  addEventListener(type, handler) { this.listeners[type] = handler; }
  setAttribute(name, value) { this.attributes[name] = String(value); }
  removeAttribute(name) { delete this.attributes[name]; }
  get value() { return this._value; }
  set value(value) {
    this._value = value;
    if (this.id === "originacion-import-file" && value === "") this.files = [];
  }
}

async function testImportRaceProtection() {
  const ids = [
    "originacion-status", "originacion-print-dossier", "originacion-download-dossier",
    "originacion-clear", "originacion-import-file", "originacion-import-button",
    "originacion-import-status", "opportunity-dossier-print"
  ];
  const elements = Object.fromEntries(ids.map(id => [id, new FakeElement(id)]));
  const document = { getElementById: id => elements[id] || null };
  const applied = [];
  let clearCount = 0;
  const workbench = {
    apply(data) { applied.push(data.reference); },
    clear() { clearCount += 1; },
    validate() { return { ok: true, errors: [], warnings: [] }; },
    read() { return tools.emptyInternalDossier(); }
  };
  const root = {
    document,
    MorenoOpportunityTools: tools,
    MorenoOriginacionWorkbench: workbench,
    confirm: () => true
  };
  exporter.bind(root);

  function rawPayload(reference) {
    const data = tools.emptyInternalDossier();
    data.reference = reference;
    return JSON.stringify(exporter.buildInternalExport(tools, data, exportedAt));
  }

  const oldRaw = rawPayload("MOR-OLD");
  const latestRaw = rawPayload("MOR-LATEST");
  let resolveOld;
  let resolveLatest;
  const fileInput = elements["originacion-import-file"];
  const importButton = elements["originacion-import-button"];
  const importStatus = elements["originacion-import-status"];

  fileInput.files = [{ size: oldRaw.length, text: () => new Promise(resolve => { resolveOld = resolve; }) }];
  fileInput.listeners.change();
  const oldImport = importButton.listeners.click();
  assert.equal(importButton.disabled, true, "el botón se deshabilita mientras se lee el expediente");

  fileInput.files = [{ size: latestRaw.length, text: () => new Promise(resolve => { resolveLatest = resolve; }) }];
  fileInput.listeners.change();
  assert.equal(importButton.disabled, false, "seleccionar otro archivo invalida la lectura anterior y permite continuar");
  const latestImport = importButton.listeners.click();
  assert.equal(importButton.disabled, true, "la importación vigente vuelve a bloquear el botón mientras se lee");

  resolveOld(oldRaw);
  await oldImport;
  assert.deepEqual(applied, [], "una lectura anterior no debe aplicar datos mientras la más reciente sigue pendiente");
  assert.equal(importButton.disabled, true, "una lectura obsoleta no debe habilitar el botón de la importación vigente");

  resolveLatest(latestRaw);
  await latestImport;
  assert.deepEqual(applied, ["MOR-LATEST"], "solo debe aplicarse el expediente seleccionado más recientemente");
  assert.equal(importButton.disabled, false, "el botón vuelve a habilitarse cuando termina la importación vigente");
  assert.equal(importStatus.attributes["aria-busy"], undefined, "el estado accesible de lectura se limpia al finalizar");

  let resolveAfterClear;
  const pendingRaw = rawPayload("MOR-AFTER-CLEAR");
  fileInput.files = [{ size: pendingRaw.length, text: () => new Promise(resolve => { resolveAfterClear = resolve; }) }];
  fileInput.listeners.change();
  const pendingImport = importButton.listeners.click();
  assert.equal(importButton.disabled, true);
  elements["originacion-clear"].listeners.click();
  assert.equal(clearCount, 1, "la acción de limpieza se ejecuta");
  assert.equal(fileInput.value, "", "limpiar el borrador también elimina la selección del archivo");
  assert.deepEqual(fileInput.files, [], "limpiar el borrador vacía el archivo seleccionado");
  assert.match(importStatus.textContent, /Importación cancelada/, "la interfaz informa que la lectura pendiente fue cancelada");
  assert.match(elements["originacion-status"].textContent, /Borrador local vaciado/);

  resolveAfterClear(pendingRaw);
  await pendingImport;
  assert.deepEqual(applied, ["MOR-LATEST"], "una lectura pendiente no debe restaurar datos después de limpiar el expediente");
  assert.match(importStatus.textContent, /Importación cancelada/, "una lectura obsoleta no debe sobrescribir el estado de cancelación");
  assert.equal(importButton.disabled, false);
}

testImportRaceProtection().then(() => {
  console.log("OK: exportación interna v3, importación validada, protección frente a lecturas fuera de orden y cancelación al limpiar.");
}).catch(error => {
  console.error(error);
  process.exitCode = 1;
});
