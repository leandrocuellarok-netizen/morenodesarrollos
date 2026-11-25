"use strict";
const assert = require("node:assert/strict");
const dashboard = require("../assets/js/pipeline-dashboard.js");
const headers = dashboard.headers;
function makeRow(overrides) {
  const values = Object.fromEntries(headers.map(key => [key, ""]));
  Object.assign(values, overrides || {});
  return headers.map(key => {
    const value = String(values[key] == null ? "" : values[key]);
    return /[;"\r\n]/.test(value) ? '"' + value.replace(/"/g, '""') + '"' : value;
  }).join(";");
}
const csv = [
  headers.join(";"),
  makeRow({id_oportunidad:"M-001",fecha_alta:"2026-11-01",referencia_origen:"web",localidad:"Moreno",tipo_activo:"Terreno",fuente_origen:"referencia pública",tipo_contraparte:"Propietario",tipo_operacion:"Venta",etapa_comercial:"negociación",estado_documental:"fuentes consultadas",proxima_accion:"Solicitar plano",fecha_proximo_seguimiento:"2026-11-24",honorarios_propuestos:"1000,50",honorarios_acordados:"800",honorarios_facturados:"500",honorarios_cobrados:"250",moneda:"ARS",fecha_ultima_actualizacion:"2026-11-20",observaciones_no_sensibles:"Observación con; separador"}),
  makeRow({id_oportunidad:"M-002",fecha_alta:"2026-11-20",referencia_origen:"referido",localidad:"La Reja",tipo_activo:"Inmueble",fuente_origen:"referido",tipo_contraparte:"Desarrollador",tipo_operacion:"Asociación",etapa_comercial:"reunión pendiente",estado_documental:"sin iniciar",proxima_accion:"Coordinar llamada",fecha_proximo_seguimiento:"2026-11-27",honorarios_propuestos:"200",honorarios_acordados:"200",moneda:"USD",fecha_ultima_actualizacion:"2026-11-20",observaciones_no_sensibles:"Sin datos sensibles"}),
  makeRow({id_oportunidad:"M-003",fecha_alta:"2026-11-20",referencia_origen:"web",localidad:"Moreno",tipo_activo:"Terreno",fuente_origen:"mapa",tipo_contraparte:"Inversor",tipo_operacion:"Aporte",etapa_comercial:"ganada",estado_documental:"documentación recibida",proxima_accion:"Cerrar archivo",fecha_proximo_seguimiento:"2026-11-21",honorarios_propuestos:"300",honorarios_acordados:"300",honorarios_facturados:"300",honorarios_cobrados:"300",moneda:"ARS",fecha_ultima_actualizacion:"2026-11-21"})
].join("\r\n");
const parsed = dashboard.parsePipelineCsv("\uFEFF" + csv + "\r\n");
assert.equal(parsed.ok, true);
assert.equal(parsed.records.length, 3);
assert.equal(parsed.records[0].fields.observaciones_no_sensibles, "Observación con; separador");
assert.equal(parsed.records[0].amounts.honorarios_propuestos, 1000.5);
const summary = dashboard.summarizePipeline(parsed.records, "2026-11-25");
assert.equal(summary.total, 3);
assert.equal(summary.active, 2);
assert.equal(summary.overdue, 1);
assert.equal(summary.dueSoon, 1);
assert.equal(summary.finance.ARS.honorarios_cobrados, 550);
assert.equal(summary.finance.ARS.counts.honorarios_cobrados, 2);
assert.equal(summary.finance.ARS.counts.honorarios_propuestos, 2);
assert.equal(summary.finance.USD.honorarios_acordados, 200);
assert.equal(summary.nextActions[0].id, "M-001");
const summaryCsv = dashboard.buildSummaryCsv(summary);
assert.match(summaryCsv, /fecha_corte;tipo;indicador;moneda;valor/);
assert.match(summaryCsv, /honorarios;honorarios_cobrados;ARS;550,00/);
assert.match(summaryCsv, /pipeline;seguimientos_vencidos;;1/);
assert.doesNotMatch(summaryCsv, /M-001|Propietario|Solicitar plano/);
const injectionCsv = [
  headers.join(";"),
  makeRow({id_oportunidad:"SAFE-1",etapa_comercial:'=HYPERLINK("https://example.invalid","Abrir")'}),
  makeRow({id_oportunidad:"SAFE-2",etapa_comercial:"  +SUM(1,1)"}),
  makeRow({id_oportunidad:"SAFE-3",etapa_comercial:"\\t=1+1"})
].join("\\n");
const injectionParsed = dashboard.parsePipelineCsv(injectionCsv);
assert.equal(injectionParsed.ok, true);
const protectedCsv = dashboard.buildSummaryCsv(dashboard.summarizePipeline(injectionParsed.records, "2026-11-25"));
assert.match(protectedCsv, /"'=HYPERLINK/);
assert.match(protectedCsv, /"'  \\+SUM/);
assert.match(protectedCsv, /'\\t=1\\+1/);
assert.equal(dashboard.parsePipelineCsv(headers.join(";") + "\n").records.length, 0);
assert.match(dashboard.parsePipelineCsv(headers.join(";") + "\n" + makeRow({id_oportunidad:"M-1",fecha_alta:"2026-02-31"})).error, /fecha real/);
assert.match(dashboard.parsePipelineCsv(headers.join(";") + "\n" + makeRow({id_oportunidad:"M-1",honorarios_propuestos:"1.000",moneda:"ARS"})).error, /sin separador de miles/);
assert.match(dashboard.parsePipelineCsv(headers.join(";") + "\n" + makeRow({id_oportunidad:"M-1",honorarios_propuestos:"100"})).error, /indicá la moneda/);
assert.match(dashboard.parsePipelineCsv(headers.join(";") + "\n" + makeRow({id_oportunidad:"M-1",moneda:"PESO"})).error, /tres letras/);
const duplicateCsv = headers.join(";") + "\n" + makeRow({id_oportunidad:"M-1"}) + "\n" + makeRow({id_oportunidad:"m-1"});
assert.match(dashboard.parsePipelineCsv(duplicateCsv).error, /duplicado/);
assert.equal(dashboard.parsePipelineCsv(headers.join(";") + ";nombre;telefono\n").ok, false);
assert.equal(dashboard.parsePipelineCsv('"a;b\n"no cerrado').ok, false);
assert.equal(dashboard.parsePipelineCsv("x".repeat(2000001)).ok, false);
assert.match(dashboard.parsePipelineCsv(headers.join(";") + "\n" + makeRow({id_oportunidad:"M-1"}).replace(/;[^;]*$/, "")).error, /columnas/);
assert.equal(dashboard.validDate("2024-02-29"), true);
assert.equal(dashboard.validDate("2025-02-29"), false);
assert.equal(dashboard.normalizeStage("GANÁDA"), "ganada");
console.log("OK: importación CSV estricta, privacidad de columnas, fechas, importes, duplicados, resumen por moneda y seguimiento.");
