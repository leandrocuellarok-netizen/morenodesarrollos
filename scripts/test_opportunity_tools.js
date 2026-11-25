"use strict";
const assert = require("node:assert/strict");
const tools = require("../assets/js/opportunity-tools.js");
const mapCatalogue = require("../assets/js/mapa-ia.js");

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
assert.doesNotMatch(missingFactors.error, /verificado/i, "la calculadora no debe presentar como verificado un indicador que solo fue ingresado");

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

const mapReference = tools.readMapReference("?map_ref=rp25");
assert.deepEqual(mapReference, {
  id: "rp25",
  name: "RP25 · Darwin Passaponti · Av. San Fernando"
});
assert.deepEqual(
  tools.readMapReference("?map_ref=rp25&map_name=%3Cscript%3E"),
  mapReference,
  "el formulario ignora nombres manipulados en la URL y usa el catálogo canónico"
);
assert.deepEqual(
  tools.readMapReference("?map_ref=rp25&map_name=Una+parcela+disponible"),
  mapReference,
  "un parámetro editable no puede cambiar la referencia comercial"
);
assert.equal(tools.readMapReference("?map_ref=bad%2Fid"), null);
assert.equal(tools.readMapReference("?map_ref=unknown&map_name=Zona"), null);
assert.deepEqual(tools.readMapReference("?map_ref=rp25"), mapReference);
assert.deepEqual(
  tools.readMapReference("?map_ref=ecoparque"),
  { id: "ecoparque", name: "Nodo RP24/RP25 · Ecoparque Industrial" }
);
assert.deepEqual(
  tools.readMapReference("?map_ref=moreno"),
  { id: "moreno", name: "Moreno Centro" }
);

for (const item of mapCatalogue.all) {
  assert.deepEqual(
    tools.readMapReference("?map_ref=" + encodeURIComponent(item.id) + "&map_name=Etiqueta+no+confiable"),
    { id: item.id, name: item.name },
    "el formulario resuelve desde el catálogo canónico: " + item.id
  );
}

const contactMessage = tools.buildContactMessage({
  fields: {
    nombre: "Contacto de prueba",
    referencia_mapa: "RP25 · Darwin Passaponti (rp25)",
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
assert.match(contactMessage, /Referencia del Mapa IA: RP25 · Darwin Passaponti \(rp25\)/);
assert.match(contactMessage, /Ubicación o referencia: Cerca de la estación/);
assert.match(contactMessage, /Partida o nomenclatura catastral: Circ\. II, Secc\. B, Quinta 14/);
assert.match(contactMessage, /Superficie declarada en calculadora: 1200 m²/);
assert.doesNotMatch(contactMessage, /Superficie aproximada: 1200/);
assert.match(contactMessage, /Dato aportado/);
assert.ok(contactMessage.includes("\nUbicación o referencia:"));
assert.equal(contactMessage.includes("\\n"), false);

const whatsappUrl = tools.buildWhatsAppUrl(contactMessage);
assert.match(whatsappUrl, /^https:\/\/wa\.me\/5491141671674\?text=/);
assert.equal(new URL(whatsappUrl).searchParams.get("text"), contactMessage);
assert.ok(whatsappUrl.includes("%0A"));

const checklistMessage = tools.buildContactMessage({
  fields: {
    nombre: "Contacto con checklist",
    perfil: "Propietario/a",
    interes: "Presentar un terreno o inmueble",
    zona: "Moreno",
    documentacion: ["Plano o mensura", "Certificado urbanístico o zonificación"],
    verificaciones: ["Zonificación e indicadores urbanísticos consultados", "Servicios y accesos consultados"]
  },
  calculationInput: {}
});
assert.match(checklistMessage, /Documentación disponible \(declarada\): Plano o mensura; Certificado urbanístico o zonificación/);
assert.match(checklistMessage, /Consultas realizadas \(declaradas\): Zonificación e indicadores urbanísticos consultados; Servicios y accesos consultados/);
assert.match(checklistMessage, /no constituyen verificación independiente/);
assert.doesNotMatch(checklistMessage, /\[object Object\]/);

const noChecklistMessage = tools.buildContactMessage({
  fields: { nombre: "Contacto sin checklist", perfil: "Otro", interes: "Todavía estoy explorando", zona: "Moreno", documentacion: [], verificaciones: [] },
  calculationInput: {}
});
assert.doesNotMatch(noChecklistMessage, /Documentación disponible \(declarada\):/);
assert.doesNotMatch(noChecklistMessage, /Consultas realizadas \(declaradas\):/);


const dossier = tools.buildOpportunityDossier({
  fields: {
    nombre: "Contacto de prueba",
    perfil: "Propietario/a",
    interes: "Presentar un terreno o inmueble",
    zona: "La Reja",
    tipo: "Terreno",
    ubicacion: "Cerca de la estación",
    nomenclatura: "Circ. II, Secc. B, Quinta 14",
    documentacion: ["Plano o mensura", "Certificado urbanístico o zonificación"],
    verificaciones: ["Zonificación e indicadores urbanísticos consultados"],
    referencia_mapa: "RP25 · Darwin Passaponti (rp25)",
    detalle: "<script>texto de prueba</script>"
  },
  calculationInput: {
    areaRaw: "1200",
    fosRaw: "0,60",
    referenceRaw: "Certificado aportado por el contacto"
  },
  generatedAt: "25 de noviembre de 2026, 06:30"
});
assert.equal(dossier.title, "Ficha preliminar de oportunidad");
assert.match(dossier.status, /NO VERIFICADOS/);
assert.match(JSON.stringify(dossier), /Resultado aritmético preliminar/);
assert.match(JSON.stringify(dossier), /720 m²/);
assert.match(JSON.stringify(dossier), /Circ\. II, Secc\. B, Quinta 14/);
assert.match(JSON.stringify(dossier), /Certificado aportado por el contacto/);
assert.match(JSON.stringify(dossier), /texto de prueba/);
assert.match(JSON.stringify(dossier), /Identificación catastral/);
assert.match(JSON.stringify(dossier), /no constituye tasación/);
assert.match(JSON.stringify(dossier), /declaraciones del contacto/);

const dossierWithoutIndicators = tools.buildOpportunityDossier({
  fields: { nombre: "Contacto sin indicadores", zona: "Moreno" },
  calculationInput: {},
  generatedAt: "25 de noviembre de 2026"
});
assert.match(JSON.stringify(dossierWithoutIndicators), /No se ingresaron datos para realizar una cuenta/);
assert.match(dossierWithoutIndicators.status, /NO VERIFICADOS/);
assert.doesNotMatch(JSON.stringify(dossierWithoutIndicators), /superficie edificable aprobada/);

const dossierExport = tools.buildOpportunityDossierExport({
  fields: { nombre: "Contacto de exportación", zona: "Moreno" },
  calculationInput: {},
  generatedAt: "25 de noviembre de 2026, 07:40",
  exportedAt: "2026-11-25T10:40:00.000Z"
});
assert.equal(dossierExport.schema, "moreno.opportunity-dossier");
assert.equal(dossierExport.schemaVersion, 1);
assert.equal(dossierExport.status, "preliminary-unverified");
assert.equal(dossierExport.exportedAt, "2026-11-25T10:40:00.000Z");
assert.equal(Number.isNaN(Date.parse(dossierExport.exportedAt)), false, "la fecha de exportación debe ser ISO 8601");
assert.equal(dossierExport.dossier.title, "Ficha preliminar de oportunidad");
assert.equal(dossierExport.dossier.status, "BORRADOR · DATOS APORTADOS, NO VERIFICADOS");
assert.equal(JSON.parse(JSON.stringify(dossierExport)).schemaVersion, 1);


console.log("OK: 14 grupos de pruebas de cálculo, datos parciales, listas declaradas, URL, borrador, ficha imprimible y exportación JSON versionada.");
