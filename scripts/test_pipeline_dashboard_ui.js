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
    "pipeline-download-summary", "pipeline-download-agenda", "pipeline-filter-stage", "pipeline-filter-followup", "pipeline-filter-text", "pipeline-metrics",
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
  const followUpFilter = elements["pipeline-filter-followup"];
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

  function offsetDate(days) {
    const date = new Date();
    date.setHours(12, 0, 0, 0);
    date.setDate(date.getDate() + days);
    return [date.getFullYear(), String(date.getMonth() + 1).padStart(2, "0"), String(date.getDate()).padStart(2, "0")].join("-");
  }
  const followUpCsv = headers.join(";") + "\n" + [
    makeRow({id_oportunidad:"M-OVERDUE", localidad:"Moreno", tipo_activo:"Terreno", etapa_comercial:"primer contacto", proxima_accion:"Llamar", fecha_proximo_seguimiento:offsetDate(-1)}),
    makeRow({id_oportunidad:"M-DUE-SOON", localidad:"Paso del Rey", tipo_activo:"Terreno", etapa_comercial:"reunión pendiente", proxima_accion:"Enviar antecedentes", fecha_proximo_seguimiento:offsetDate(3)}),
    makeRow({id_oportunidad:"M-NO-DATE", localidad:"La Reja", tipo_activo:"Inmueble", etapa_comercial:"documentación solicitada", proxima_accion:"Solicitar fecha", fecha_proximo_seguimiento:""}),
    makeRow({id_oportunidad:"M-NO-ACTION", localidad:"Trujui", tipo_activo:"Terreno", etapa_comercial:"análisis preliminar", proxima_accion:"", fecha_proximo_seguimiento:offsetDate(10)}),
    makeRow({id_oportunidad:"M-CLOSED", localidad:"Cuartel V", tipo_activo:"Terreno", etapa_comercial:"ganada", proxima_accion:"", fecha_proximo_seguimiento:""})
  ].join("\n");
  fileInput.files = [{size:followUpCsv.length, text:async () => followUpCsv}];
  await fileInput.listeners.change();
  assert.equal(followUpFilter.children.length, 5, "el filtro ofrece todas las categorías de seguimiento");
  assert.match(followUpFilter.children[1].textContent, /Vencidas \(1\)/, "el filtro informa el total de seguimientos vencidos");
  assert.match(followUpFilter.children[2].textContent, /Próximos 7 días \(1\)/, "el filtro informa los próximos siete días");
  assert.match(followUpFilter.children[3].textContent, /Sin fecha \(1\)/, "el filtro cuenta oportunidades activas sin fecha");
  assert.match(followUpFilter.children[4].textContent, /Sin próxima acción \(1\)/, "el filtro cuenta oportunidades activas sin acción");
  const visibleIds = () => elements["pipeline-records-body"].children.map(row => row.children[0].textContent);
  [
    ["overdue", ["M-OVERDUE"]],
    ["due-soon", ["M-DUE-SOON"]],
    ["missing-date", ["M-NO-DATE"]],
    ["missing-action", ["M-NO-ACTION"]]
  ].forEach(([value, expected]) => {
    followUpFilter.value = value;
    followUpFilter.listeners.change();
    assert.deepEqual(visibleIds(), expected, "el filtro " + value + " muestra solo las oportunidades correspondientes");
  });
  followUpFilter.value = "";
  followUpFilter.listeners.change();
  assert.equal(visibleIds().length, 5, "restablecer la prioridad vuelve a mostrar todas las oportunidades, incluidas las cerradas");

  const invalidCsv = "encabezado;incorrecto\nvalor";
  fileInput.files = [{size:invalidCsv.length, text:async () => invalidCsv}];
  await fileInput.listeners.change();
  assert.equal(download.disabled, true, "un CSV inválido no debe permitir exportar el resumen anterior");
  assert.equal(agendaDownload.disabled, true, "un CSV inválido no debe permitir exportar la agenda anterior");
  assert.equal(elements["pipeline-dashboard-output"].hidden, true);
  assert.equal(followUpFilter.value, "", "una importación inválida restablece el filtro de prioridad");
  download.listeners.click();
  agendaDownload.listeners.click();
  assert.equal(objectUrlCalls, 1, "no debe generarse ningún archivo con datos de una importación anterior");

  fileInput.files = [{size:validCsv.length, text:async () => validCsv}];
  await fileInput.listeners.change();
  assert.equal(download.disabled, false);
  assert.equal(agendaDownload.disabled, false);

  const financialCsv = headers.join(";") + "\\n" + makeRow({
    id_oportunidad:"M-UI-FIN", localidad:"Moreno", tipo_activo:"Terreno",
    etapa_comercial:"negociación", proxima_accion:"Revisar conciliación",
    fecha_proximo_seguimiento:"2026-11-27", honorarios_acordados:"250",
    honorarios_facturados:"300", honorarios_cobrados:"450", moneda:"ARS"
  });
  fileInput.files = [{size:financialCsv.length, text:async () => financialCsv}];
  await fileInput.listeners.change();
  assert.equal(elements["pipeline-warnings"].hidden, false, "las alertas de honorarios deben mostrarse tras importar");
  assert.match(elements["pipeline-warnings"].children[0].textContent, /honorarios/i, "el título debe identificar el contenido de las alertas");
  const renderedWarnings = elements["pipeline-warnings"].children[1].children.map(item => item.textContent).join("\\n");
  assert.match(renderedWarnings, /M-UI-FIN/);
  assert.match(renderedWarnings, /cobrados superan los facturados/);
  assert.match(renderedWarnings, /facturados superan los acordados/);

  let resolveSlowImport;
  const slowCsv = headers.join(";") + "\n" + makeRow({
    id_oportunidad:"M-UI-OLD", localidad:"Archivo anterior", tipo_activo:"Terreno",
    etapa_comercial:"primer contacto"
  });
  const latestCsv = headers.join(";") + "\n" + makeRow({
    id_oportunidad:"M-UI-LATEST", localidad:"Archivo más reciente", tipo_activo:"Terreno",
    etapa_comercial:"primer contacto"
  });
  fileInput.files = [{size:slowCsv.length, text:() => new Promise(resolve => { resolveSlowImport = resolve; })}];
  const slowImportPromise = fileInput.listeners.change();
  fileInput.files = [{size:latestCsv.length, text:async () => latestCsv}];
  await fileInput.listeners.change();
  resolveSlowImport(slowCsv);
  await slowImportPromise;
  const recordRows = elements["pipeline-records-body"].children;
  assert.equal(recordRows.length, 1, "solo debe quedar una fila después de dos importaciones superpuestas");
  assert.equal(recordRows[0].children[0].textContent, "M-UI-LATEST", "una lectura anterior que termina tarde no debe reemplazar el CSV más reciente");

  let resolveAfterReset;
  fileInput.files = [{size:slowCsv.length, text:() => new Promise(resolve => { resolveAfterReset = resolve; })}];
  const pendingResetPromise = fileInput.listeners.change();
  reset.listeners.click();
  resolveAfterReset(slowCsv);
  await pendingResetPromise;
  assert.equal(download.disabled, true, "limpiar la sesión invalida también el resumen");
  assert.equal(agendaDownload.disabled, true, "limpiar la sesión invalida también la agenda");
  assert.match(elements["pipeline-status"].textContent, /Sesión local limpiada/, "una lectura pendiente no debe revertir el mensaje de limpieza");
  assert.equal(elements["pipeline-dashboard-output"].hidden, true);
  assert.equal(textFilter.value, "");
  assert.equal(stageFilter.children.length, 1);
  assert.equal(followUpFilter.value, "", "limpiar la sesión restablece la prioridad de seguimiento");
  console.log("OK: importaciones, exportaciones, filtros de etapa y prioridad de seguimiento, y reinicio del tablero.");
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
