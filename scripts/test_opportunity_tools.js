"use strict";
const assert = require("node:assert/strict");
const tools = require("../assets/js/opportunity-tools.js");

const both = tools.calculatePreliminary({
  areaRaw: "1200",
  fosRaw: "0,60",
  fotRaw: "1,20",
  referenceRaw: "Certificado urbanístico"
});
assert.equal(both.ok, true);
assert.equal(both.items.length, 2);
assert.equal(both.items[0].amount, "720 m²");
assert.equal(both.items[1].amount, "1.440 m²");

const onlyFot = tools.calculatePreliminary({ areaRaw: "800", fotRaw: "1.5" });
assert.equal(onlyFot.ok, true);
assert.equal(onlyFot.items.length, 1);
assert.equal(onlyFot.items[0].amount, "1.200 m²");

const missingFactors = tools.calculatePreliminary({ areaRaw: "1200" });
assert.match(missingFactors.error, /FOS o el FOT/);

const partialLead = tools.buildLeadNote({ areaRaw: "1200", referenceRaw: "Dato del propietario" });
assert.equal(partialLead.empty, false);
assert.equal(partialLead.calculated, false);
assert.match(partialLead.lines.join("\n"), /Superficie declarada en calculadora: 1200 m²/);
assert.match(partialLead.lines.join("\n"), /No se realizó el cálculo/);

const invalidLead = tools.buildLeadNote({ areaRaw: "aprox. 1200", fosRaw: "0,6" });
assert.equal(invalidLead.empty, false);
assert.equal(invalidLead.calculated, false);
assert.match(invalidLead.lines.join("\n"), /aprox\. 1200/);

const ambiguousArea = tools.calculatePreliminary({ areaRaw: "1.200", fosRaw: "0,6" });
assert.match(ambiguousArea.error, /ambiguo/);

const emptyLead = tools.buildLeadNote({});
assert.equal(emptyLead.empty, true);

const contactMessage = tools.buildContactMessage({
  fields: {
    nombre: "Contacto de prueba",
    perfil: "Propietario/a",
    interes: "Presentar un terreno o inmueble",
    zona: "La Reja",
    tipo: "Terreno",
    ubicacion: "Cerca de la estación",
    nomenclatura: "Circ. II, Secc. B, Quinta 14",
    superficie: "1200",
    documentacion: "Partida o nomenclatura catastral",
    detalle: "Consulta de prueba"
  },
  calculationInput: { areaRaw: "1200", referenceRaw: "Dato aportado" }
});
assert.match(contactMessage, /Ubicación o referencia: Cerca de la estación/);
assert.match(contactMessage, /Partida o nomenclatura catastral: Circ\. II, Secc\. B, Quinta 14/);
assert.match(contactMessage, /Superficie declarada en calculadora: 1200 m²/);
assert.doesNotMatch(contactMessage, /Superficie aproximada: 1200/);
assert.match(contactMessage, /Dato aportado/);
assert.ok(contactMessage.includes("\nUbicación o referencia:"));
assert.equal(contactMessage.includes("\\n"), false);

console.log("OK: 8 grupos de pruebas de cálculo, datos parciales, campos parcelarios y borrador de contacto.");
