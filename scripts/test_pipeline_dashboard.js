"use strict";
const assert = require("node:assert/strict");
require("./test_pipeline_dashboard_base.js");
const dashboard = require("../assets/js/pipeline-dashboard.js");
require("../assets/js/pipeline-agenda.js");
const headers = dashboard.headers;
function row(overrides) {
  const values = Object.fromEntries(headers.map(key => [key, ""]));
  Object.assign(values, overrides || {});
  return headers.map(key => {
    const value = String(values[key] == null ? "" : values[key]);
    return /[;"\r\n]/.test(value) ? '"' + value.replace(/"/g, '""') + '"' : value;
  }).join(";");
}
const records = [
  row({id_oportunidad:"A-01",localidad:"Moreno",etapa_comercial:"negociación",proxima_accion:"Solicitar plano",fecha_proximo_seguimiento:"2026-11-24"}),
  row({id_oportunidad:"A-02",localidad:"La Reja",etapa_comercial:"primer contacto",proxima_accion:"Coordinar reunión",fecha_proximo_seguimiento:"2026-11-27"}),
  row({id_oportunidad:"A-03",localidad:"Trujui",etapa_comercial:"documentación solicitada"}),
  row({id_oportunidad:"A-04",localidad:"Cuartel V",etapa_comercial:"primer contacto",fecha_proximo_seguimiento:"2026-12-10"}),
  row({id_oportunidad:"A-05",localidad:"Moreno",etapa_comercial:"ganada",fecha_proximo_seguimiento:"2026-11-20"}),
  row({id_oportunidad:"A-06",localidad:"Paso del Rey",etapa_comercial:"primer contacto",proxima_accion:"Esperar respuesta",fecha_proximo_seguimiento:"2026-12-10"})
];
const parsed=dashboard.parsePipelineCsv([headers.join(";"),...records].join("\n"));
assert.equal(parsed.ok,true);
const summary=dashboard.summarizePipeline(parsed.records,"2026-11-25");
assert.equal(summary.agendaItems.length,4);
assert.deepEqual(summary.agendaItems.map(item=>item.priority),["Vencida","Próxima 7 días","Sin fecha","Sin acción"]);
const csv=dashboard.buildAgendaCsv(summary);
for(const id of ["A-01","A-02","A-03","A-04"]) assert.ok(csv.includes(id));
assert.doesNotMatch(csv,/A-05|A-06/);
const malicious=row({id_oportunidad:"SAFE",etapa_comercial:"primer contacto",proxima_accion:'=HYPERLINK("https://example.invalid","Abrir")',fecha_proximo_seguimiento:"2026-11-26"});
const unsafe=dashboard.parsePipelineCsv([headers.join(";"),malicious].join("\n"));
assert.equal(unsafe.ok,true);
assert.ok(dashboard.buildAgendaCsv(dashboard.summarizePipeline(unsafe.records,"2026-11-25")).includes("'=HYPERLINK"));
console.log("OK: agenda completa, prioridades, exclusión de etapas cerradas y protección contra fórmulas.");
