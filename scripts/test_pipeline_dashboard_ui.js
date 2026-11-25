"use strict";
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const dashboard = require("../assets/js/pipeline-dashboard.js");
require("../assets/js/pipeline-agenda.js");

class Element {
  constructor(id) {
    this.id = id;
    this.children = [];
    this.listeners = {};
    this.hidden = false;
    this.disabled = false;
    this.value = "";
    this.files = [];
    this.textContent = "";
    this.className = "";
    this.style = {};
  }
  addEventListener(type, handler) { this.listeners[type] = handler; }
  append(...items) { this.children.push(...items); }
  replaceChildren(...items) { this.children = items; }
  remove() { this.removed = true; }
  click() { this.clicked = true; }
}
(async function () {
  const ids = [
    "pipeline-csv-file", "pipeline-status", "pipeline-dashboard-output", "pipeline-reset",
    "pipeline-download-summary", "pipeline-download-agenda", "pipeline-filter-stage", "pipeline-filter-text", "pipeline-metrics",
    "pipeline-finance-summary", "pipeline-stage-summary", "pipeline-next-actions",
    "pipeline-records-body", "pipeline-records-count", "pipeline-warnings"
  ];
  const elements = Object.fromEntries(ids.map(id => [id, new Element(id)]));
  const document = {
    getElementById(id) { return elements[id] || null; },
    createElement(tag) { return new Element(tag); },
    body: new Element("body")
  };
  let objectUrlCalls = 0;
  const window = {
    MorenoPipelineDashboard: dashboard,
    URL: {
      createObjectURL() { objectUrlCalls += 1; return "blob:test"; },
      revokeObjectURL() {}
    },
    setTimeout() {}
  };
  const source = fs.readFileSync(require.resolve("../assets/js/pipeline-dashboard-ui.js"), "utf8");
  vm.runInNewContext(source, { window, document, Blob, Intl, Date });
  const fileInput = elements["pipeline-csv-file"];
  const download = elements["pipeline-download-summary"];
  const agendaDownload = elements["pipeline-download-agenda"];
  const reset = elements["pipeline-reset"];
  const stageFilter = elements["pipeline-filter-stage"];
  const textFilter = elements["pipeline-filter-text"];
  assert.equal(download.disabled, true, "la descarga del resumen debe comenzar deshabilitada");
  assert.equal(agendaDownload.disabled, true, "la descarga de agenda debe comenzar deshabilitada");

  const headers = dashboard.headers;
  function makeRow(overrides) {
    const fields = Object.fromEntries(headers.map(key => [key, ""]));
    Object.assign(fields, overrides);
    return headers.map(key => {
      const value = String(fields[key] == null ? "" : fields[key]);
      return /[;"\r\n]/.test(value) ? '"' + value.replace(/"/g, '""') + '"' : value;
    }).join(";");
  }
  const validCsv = headers.join(";") + "\n" + makeRow({
    id_oportunidad:"M-UI-1", localidad:"Moreno", tipo_activo:"Terreno",
    identificacion_catastral:"PARCELA-123", fuente_origen:"Catastro consultado",
    etapa_comercial:"primer contacto", proxima_accion:"Solicitar documentación",
    fecha_proximo_seguimiento:"2026-11-27"
  });
  fileInput.files = [{size:validCsv.length, text:async () => validCsv}];
  textFilter.value = "filtro anterior";
  await fileInput.listeners.change();
  assert.equal(download.disabled, false, "la descarga del resumen se habilita después de una importación válida");
  assert.equal(agendaDownload.disabled, false, "la descarga de agenda se habilita después de una importación válida");
  agendaDownload.listeners.click();
  assert.equal(objectUrlCalls, 1, "la agenda válida debe generar un archivo descargable");
  assert.match(elements["pipeline-status"].textContent, /Agenda descargada/);
  assert.equal(textFilter.value, "", "la búsqueda anterior se limpia al importar otro CSV");
  assert.equal(elements["pipeline-dashboard-output"].hidden, false);
  textFilter.value = "PARCELA-123";
  elements["pipeline-filter-text"].listeners.input();
  assert.match(elements["pipeline-records-count"].textContent, /Mostrando 1 de 1/);

  const invalidCsv = "encabezado;incorrecto\nvalor";
  fileInput.files = [{size:invalidCsv.length, text:async () => invalidCsv}];
  await fileInput.listeners.change();
  assert.equal(download.disabled, true, "un CSV inválido no debe permitir exportar el resumen anterior");
  assert.equal(agendaDownload.disabled, true, "un CSV inválido no debe permitir exportar la agenda anterior");
  assert.equal(elements["pipeline-dashboard-output"].hidden, true);
  download.listeners.click();
  agendaDownload.listeners.click();
  assert.equal(objectUrlCalls, 1, "no debe generarse ningún archivo con datos de una importación anterior");

  fileInput.files = [{size:validCsv.length, text:async () => validCsv}];
  await fileInput.listeners.change();
  assert.equal(download.disabled, false);
  assert.equal(agendaDownload.disabled, false);
  reset.listeners.click();
  assert.equal(download.disabled, true, "limpiar la sesión invalida también el resumen");
  assert.equal(agendaDownload.disabled, true, "limpiar la sesión invalida también la agenda");
  assert.equal(elements["pipeline-dashboard-output"].hidden, true);
  assert.equal(textFilter.value, "");
  assert.equal(stageFilter.children.length, 1);
  console.log("OK: estado de exportación, limpieza entre importaciones, filtros catastrales y reinicio del tablero.");
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
