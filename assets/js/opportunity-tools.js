(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  if (root) root.MorenoOpportunityTools = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  function parsePositiveDecimal(raw, label, rejectAmbiguousThousands) {
    const text = String(raw == null ? "" : raw).trim();
    const normalized = text.replace(",", ".");
    if (!/^\d+(?:\.\d+)?$/.test(normalized)) {
      return { error: "Revisá " + label + ": usá un número positivo, sin separador de miles." };
    }
    if (rejectAmbiguousThousands && /^[1-9]\d{0,2}\.\d{3}$/.test(normalized)) {
      return { error: "El valor de " + label + " es ambiguo. No uses puntos de miles: para 1.200 m², ingresá 1200." };
    }
    const value = Number(normalized);
    if (!Number.isFinite(value) || value <= 0) {
      return { error: label + " debe ser mayor que cero." };
    }
    return { value: value };
  }

  function calculatePreliminary(input) {
    const data = input || {};
    const areaRaw = String(data.areaRaw || "").trim();
    const fosRaw = String(data.fosRaw || "").trim();
    const fotRaw = String(data.fotRaw || "").trim();
    const referenceRaw = String(data.referenceRaw || "").trim();

    if (!areaRaw && !fosRaw && !fotRaw && !referenceRaw) return { empty: true };
    if (!areaRaw) return { error: "Para calcular, ingresá la superficie del lote." };
    if (!fosRaw && !fotRaw) return { error: "Ingresá al menos el FOS o el FOT que tengas como referencia para esa parcela." };

    const area = parsePositiveDecimal(areaRaw, "la superficie del lote", true);
    if (area.error) return area;
    const fos = fosRaw ? parsePositiveDecimal(fosRaw, "el FOS", false) : null;
    const fot = fotRaw ? parsePositiveDecimal(fotRaw, "el FOT", false) : null;
    if (fos && fos.error) return fos;
    if (fot && fot.error) return fot;

    const format = new Intl.NumberFormat("es-AR", { maximumFractionDigits: 2 });
    const items = [];
    const summary = ["Superficie del lote ingresada: " + format.format(area.value) + " m²."];
    if (fos) {
      const value = area.value * fos.value;
      summary.push("FOS " + format.format(fos.value) + ": " + format.format(value) + " m² teóricos de ocupación en planta.");
      items.push({
        label: "Referencia FOS",
        amount: format.format(value) + " m²",
        detail: "Superficie teórica máxima de ocupación en planta (lote × FOS)."
      });
    }
    if (fot) {
      const value = area.value * fot.value;
      summary.push("FOT " + format.format(fot.value) + ": " + format.format(value) + " m² teóricos de superficie total computable.");
      items.push({
        label: "Referencia FOT",
        amount: format.format(value) + " m²",
        detail: "Superficie teórica total computable (lote × FOT)."
      });
    }
    if (referenceRaw) summary.push("Fuente o referencia ingresada: " + referenceRaw + ".");
    return { ok: true, area: area.value, items: items, summary: summary };
  }

  function buildLeadNote(input) {
    const data = input || {};
    const areaRaw = String(data.areaRaw || "").trim();
    const fosRaw = String(data.fosRaw || "").trim();
    const fotRaw = String(data.fotRaw || "").trim();
    const referenceRaw = String(data.referenceRaw || "").trim();
    const result = calculatePreliminary(data);

    if (result.ok) {
      return {
        empty: false,
        calculated: true,
        lines: ["Cálculo preliminar ingresado por el contacto:"].concat(result.summary, [
          "Este resultado es matemático y orientativo; requiere verificación urbanística y parcelaria."
        ])
      };
    }

    const entries = [];
    if (areaRaw) entries.push("Superficie declarada en calculadora: " + areaRaw + " m².");
    if (fosRaw) entries.push("FOS declarado: " + fosRaw + ".");
    if (fotRaw) entries.push("FOT declarado: " + fotRaw + ".");
    if (referenceRaw) entries.push("Fuente o referencia aportada: " + referenceRaw + ".");
    if (!entries.length) return { empty: true, calculated: false, lines: [] };

    const reason = result.error || "faltan datos para realizar la cuenta";
    return {
      empty: false,
      calculated: false,
      lines: ["Datos urbanísticos aportados, todavía sin cálculo:"].concat(entries, [
        "No se realizó el cálculo: " + reason,
        "Los datos se transcriben como fueron ingresados y requieren verificación."
      ])
    };
  }

  function formatFieldValue(value) {
    const values = Array.isArray(value) ? value : [value];
    return values
      .map(function (item) { return String(item == null ? "" : item).trim(); })
      .filter(Boolean)
      .join("; ");
  }

  const mapReferenceNames = Object.freeze({
    moreno: "Moreno Centro",
    paso: "Paso del Rey",
    lareja: "La Reja",
    alvarez: "Francisco Álvarez",
    trujui: "Trujui",
    cuartel: "Cuartel V",
    rp25: "RP25 · Darwin Passaponti · Av. San Fernando",
    ecoparque: "Nodo RP24/RP25 · Ecoparque Industrial",
    ribera: "Paso del Rey · Camino de la Ribera",
    roggero: "Distrito Ecológico Roggero",
    norte: "Cuartel V · Trujui · La Reja"
  });

  function readMapReference(search) {
    const parameters = new URLSearchParams(String(search || ""));
    const id = String(parameters.get("map_ref") || "").trim();
    if (!/^[a-z0-9-]{1,40}$/.test(id) || !Object.prototype.hasOwnProperty.call(mapReferenceNames, id)) {
      return null;
    }
    return { id: id, name: mapReferenceNames[id] };
  }

  function buildContactMessage(input) {
    const data = input || {};
    const fields = data.fields || {};
    const calculationInput = data.calculationInput || {};
    const areaFromCalculator = String(calculationInput.areaRaw || "").trim();
    const labels = [
      ["Nombre", "nombre"],
      ["Perfil", "perfil"],
      ["Interés", "interes"],
      ["Zona", "zona"],
      ["Tipo de oportunidad", "tipo"],
      ["Ubicación o referencia", "ubicacion"],
      ["Partida o nomenclatura catastral", "nomenclatura"],
      ["Superficie aproximada", "superficie"],
      ["Documentación disponible (declarada)", "documentacion"],
      ["Consultas realizadas (declaradas)", "verificaciones"],
      ["Referencia del Mapa IA", "referencia_mapa"],
      ["Contexto", "detalle"]
    ];
    const lines = ["Hola Erica, quiero iniciar una conversación sobre una oportunidad en MORENO.", ""];
    labels.forEach(function (entry) {
      const label = entry[0];
      const key = entry[1];
      if (key === "superficie" && areaFromCalculator) return;
      const value = formatFieldValue(fields[key]);
      if (value) lines.push(label + ": " + value);
    });
    const note = buildLeadNote(calculationInput);
    if (!note.empty) lines.push("", ...note.lines);
    lines.push("", "Las selecciones de documentación y consultas son declaraciones de quien completa; no constituyen verificación independiente.", "", "Enviado desde el formulario de oportunidades del sitio MORENO.");
    return lines.join("\n");
  }


  function buildOpportunityDossier(input) {
    const data = input || {};
    const fields = data.fields || {};
    const calculationInput = data.calculationInput || {};
    const calculation = calculatePreliminary(calculationInput);

    function makeSection(title, entries) {
      const rows = entries.map(function (entry) {
        return { label: entry[0], value: formatFieldValue(entry[1]) };
      }).filter(function (entry) { return Boolean(entry.value); });
      if (!rows.length) rows.push({ label: "Información", value: "No informada por el contacto." });
      return { title: title, rows: rows };
    }

    const sections = [
      makeSection("Origen y contacto", [
        ["Nombre", fields.nombre],
        ["Perfil declarado", fields.perfil],
        ["Interés declarado", fields.interes],
        ["Referencia territorial de origen (no parcelaria)", fields.referencia_mapa]
      ]),
      makeSection("Inmueble o proyecto", [
        ["Localidad o zona declarada", fields.zona],
        ["Tipo de oportunidad declarado", fields.tipo],
        ["Ubicación o referencia aportada", fields.ubicacion],
        ["Partida o nomenclatura aportada", fields.nomenclatura],
        ["Superficie aproximada declarada", fields.superficie]
      ]),
      makeSection("Documentación y consultas declaradas", [
        ["Documentación indicada como disponible", fields.documentacion],
        ["Consultas o verificaciones declaradas", fields.verificaciones]
      ])
    ];

    const calculationRows = [
      ["Superficie ingresada para cálculo (m²)", calculationInput.areaRaw],
      ["FOS aportado", calculationInput.fosRaw],
      ["FOT aportado", calculationInput.fotRaw],
      ["Fuente o referencia de indicadores aportada", calculationInput.referenceRaw]
    ];
    if (calculation.ok) {
      calculationRows.push(["Resultado aritmético preliminar", calculation.summary.join(" ")]);
    } else if (calculation.error) {
      calculationRows.push(["Estado del cálculo", "No realizado: " + calculation.error]);
    } else {
      calculationRows.push(["Estado del cálculo", "No se ingresaron datos para realizar una cuenta."]);
    }
    sections.push(makeSection("Datos urbanísticos aportados", calculationRows));

    if (formatFieldValue(fields.detalle)) {
      sections.push(makeSection("Contexto adicional aportado", [["Descripción", fields.detalle]]));
    }

    return {
      title: "Ficha preliminar de oportunidad",
      generatedAt: String(data.generatedAt || ""),
      status: "BORRADOR · DATOS APORTADOS, NO VERIFICADOS",
      sections: sections,
      checks: [
        "Identificación catastral, nomenclatura, mensura y geometría de la parcela.",
        "Normativa vigente, usos, indicadores, alturas, retiros y afectaciones.",
        "Titularidad, antecedentes dominiales, gravámenes y restricciones.",
        "Servicios, accesos y condiciones hidráulicas y ambientales.",
        "Factibilidad técnica, costos, estructura financiera y demanda."
      ],
      disclaimers: [
        "Esta ficha reúne exclusivamente datos ingresados por el contacto y resultados aritméticos de referencia. No verifica la autenticidad, vigencia o exactitud de fuentes y documentos, ni acredita identidad, titularidad, disponibilidad o situación urbanística.",
        "Los cálculos FOS/FOT son referencias matemáticas teóricas; no equivalen a superficie efectivamente edificable ni a una aprobación municipal.",
        "Este documento no constituye tasación, oferta, estudio de factibilidad, recomendación de inversión ni compromiso comercial.",
        "Las opciones de documentación y consultas reflejan declaraciones del contacto y requieren contraste independiente."
      ]
    };
  }



  const dossierFieldLimits = Object.freeze({
    nombre: 90, perfil: 60, interes: 90, zona: 120, tipo: 60,
    ubicacion: 180, nomenclatura: 120, superficie: 60,
    referencia_mapa: 180, detalle: 1200
  });
  const dossierFieldLabels = Object.freeze({
    nombre: "nombre", perfil: "perfil", interes: "interés", zona: "zona",
    tipo: "tipo de oportunidad", ubicacion: "ubicación",
    nomenclatura: "nomenclatura catastral", superficie: "superficie",
    referencia_mapa: "referencia territorial", detalle: "contexto"
  });
  const dossierSelectOptions = Object.freeze({
    perfil: ["Propietario/a", "Inversor/a", "Profesional o empresa", "Otro"],
    interes: ["Presentar un terreno o inmueble", "Analizar un proyecto en marcha", "Explorar una inversión", "Buscar un socio o alianza", "Ofrecer servicios profesionales", "Todavía estoy explorando"],
    tipo: ["No definido", "Terreno", "Inmueble existente", "Proyecto en desarrollo", "Inversión o alianza", "Servicios profesionales"]
  });
  const dossierChecklistOptions = Object.freeze({
    documentacion: ["Ubicación o dirección", "Partida o nomenclatura catastral", "Plano o mensura", "Certificado urbanístico o zonificación", "Antecedentes dominiales (sin adjuntar)", "Información sobre servicios"],
    verificaciones: ["Identificación catastral consultada", "Zonificación e indicadores urbanísticos consultados", "Titularidad o antecedentes dominiales consultados", "Servicios y accesos consultados", "Restricciones hidráulicas o ambientales consultadas", "Consultas municipales o prefactibilidades"]
  });
  const dossierCalculationLimits = Object.freeze({
    areaRaw: 18, fosRaw: 18, fotRaw: 18, referenceRaw: 180
  });

  function isRecord(value) {
    return Boolean(value) && typeof value === "object" && !Array.isArray(value);
  }

  function sanitizeImportedFields(source, warnings) {
    if (!isRecord(source)) throw new Error("La sección de datos del expediente no tiene un formato válido.");
    const result = {};
    Object.keys(dossierFieldLimits).forEach(function (key) {
      if (!Object.prototype.hasOwnProperty.call(source, key) || source[key] == null) return;
      if (typeof source[key] !== "string") throw new Error("El campo " + dossierFieldLabels[key] + " debe ser texto.");
      const value = source[key].trim();
      if (value.length > dossierFieldLimits[key]) throw new Error("El campo " + dossierFieldLabels[key] + " supera el largo permitido.");
      if (dossierSelectOptions[key] && value && !dossierSelectOptions[key].includes(value)) {
        warnings.push("Se omitió un valor no reconocido en " + dossierFieldLabels[key] + ".");
        return;
      }
      result[key] = value;
    });
    Object.keys(dossierChecklistOptions).forEach(function (key) {
      if (!Object.prototype.hasOwnProperty.call(source, key) || source[key] == null) {
        result[key] = [];
        return;
      }
      if (!Array.isArray(source[key]) || source[key].length > 12) {
        throw new Error("La lista " + key + " no tiene un formato válido.");
      }
      const allowed = dossierChecklistOptions[key];
      const selected = [];
      source[key].forEach(function (item) {
        if (typeof item !== "string" || item.length > 120) {
          throw new Error("La lista " + key + " contiene un valor inválido.");
        }
        const value = item.trim();
        if (allowed.includes(value) && !selected.includes(value)) selected.push(value);
        else if (value && !allowed.includes(value)) warnings.push("Se omitió una opción no reconocida de " + key + ".");
      });
      result[key] = selected;
    });
    return result;
  }

  function sanitizeImportedCalculation(source) {
    if (!isRecord(source)) throw new Error("Los datos de cálculo no tienen un formato válido.");
    const result = {};
    Object.keys(dossierCalculationLimits).forEach(function (key) {
      if (!Object.prototype.hasOwnProperty.call(source, key) || source[key] == null) return;
      if (typeof source[key] !== "string") throw new Error("El dato de cálculo " + key + " debe ser texto.");
      const value = source[key].trim();
      if (value.length > dossierCalculationLimits[key]) throw new Error("El dato de cálculo " + key + " supera el largo permitido.");
      result[key] = value;
    });
    return result;
  }

  function extractLegacyDossierData(dossier) {
    const fields = {};
    const calculationInput = {};
    const fieldRows = {
      "Origen y contacto": {
        "Nombre": "nombre", "Perfil declarado": "perfil", "Interés declarado": "interes",
        "Referencia territorial de origen (no parcelaria)": "referencia_mapa"
      },
      "Inmueble o proyecto": {
        "Localidad o zona declarada": "zona", "Tipo de oportunidad declarado": "tipo",
        "Ubicación o referencia aportada": "ubicacion", "Partida o nomenclatura aportada": "nomenclatura",
        "Superficie aproximada declarada": "superficie"
      },
      "Documentación y consultas declaradas": {
        "Documentación indicada como disponible": "documentacion",
        "Consultas o verificaciones declaradas": "verificaciones"
      },
      "Contexto adicional aportado": { "Descripción": "detalle" }
    };
    const calculationRows = {
      "Superficie ingresada para cálculo (m²)": "areaRaw",
      "FOS aportado": "fosRaw",
      "FOT aportado": "fotRaw",
      "Fuente o referencia de indicadores aportada": "referenceRaw"
    };
    dossier.sections.forEach(function (section) {
      const fieldMap = fieldRows[section.title];
      const isCalculationSection = section.title === "Datos urbanísticos aportados";
      if (!fieldMap && !isCalculationSection) return;
      section.rows.forEach(function (row) {
        const value = row.value.trim();
        if (!value || value === "No informada por el contacto.") return;
        if (isCalculationSection && calculationRows[row.label]) {
          calculationInput[calculationRows[row.label]] = value;
        } else if (fieldMap && fieldMap[row.label]) {
          const key = fieldMap[row.label];
          fields[key] = key === "documentacion" || key === "verificaciones"
            ? value.split(/\s*;\s*/).filter(Boolean)
            : value;
        }
      });
    });
    return { fields: fields, calculationInput: calculationInput };
  }

  function parseOpportunityDossierImport(raw) {
    let payload;
    if (typeof raw === "string") {
      if (raw.length > 1000000) return { ok: false, error: "El archivo supera el límite de 1 MB." };
      try {
        payload = JSON.parse(raw);
      } catch (error) {
        return { ok: false, error: "El archivo no contiene JSON válido." };
      }
    } else {
      payload = raw;
    }
    try {
      if (!isRecord(payload) || payload.schema !== "moreno.opportunity-dossier") {
        throw new Error("El archivo no corresponde a un expediente MORENO.");
      }
      if (payload.schemaVersion !== 1 && payload.schemaVersion !== 2) {
        throw new Error("La versión del expediente no es compatible. Se admiten las versiones 1 y 2.");
      }
      if (payload.status !== "preliminary-unverified") {
        throw new Error("El expediente no tiene el estado preliminar esperado.");
      }
      const dossier = payload.dossier;
      if (!isRecord(dossier) || dossier.title !== "Ficha preliminar de oportunidad" ||
          dossier.status !== "BORRADOR · DATOS APORTADOS, NO VERIFICADOS" ||
          !Array.isArray(dossier.sections) || dossier.sections.length > 12) {
        throw new Error("La ficha incluida en el expediente está incompleta o no es compatible.");
      }
      dossier.sections.forEach(function (section) {
        if (!isRecord(section) || typeof section.title !== "string" ||
            !Array.isArray(section.rows) || section.rows.length > 20) {
          throw new Error("Una sección del expediente tiene una estructura inválida.");
        }
        section.rows.forEach(function (row) {
          if (!isRecord(row) || typeof row.label !== "string" ||
              typeof row.value !== "string" || row.label.length > 200 || row.value.length > 3000) {
            throw new Error("Una fila del expediente tiene una estructura inválida.");
          }
        });
      });
      if (typeof payload.exportedAt !== "string" ||
          !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(payload.exportedAt) ||
          !Number.isFinite(Date.parse(payload.exportedAt)) ||
          new Date(payload.exportedAt).toISOString() !== payload.exportedAt) {
        throw new Error("La fecha de exportación debe ser una fecha ISO 8601 UTC válida.");
      }
      const warnings = [];
      let sourceData;
      if (payload.schemaVersion === 2) {
        if (!isRecord(payload.sourceData)) throw new Error("El expediente versión 2 no incluye los datos estructurados necesarios para recuperarlo.");
        sourceData = payload.sourceData;
      } else {
        sourceData = extractLegacyDossierData(dossier);
        warnings.push("Archivo versión 1: los campos se recuperaron de la ficha legible. Revisá especialmente las listas y los datos que no aparecen en la impresión.");
      }
      const fields = sanitizeImportedFields(sourceData.fields, warnings);
      const calculationInput = sanitizeImportedCalculation(sourceData.calculationInput);
      return { ok: true, version: payload.schemaVersion, exportedAt: payload.exportedAt, fields: fields, calculationInput: calculationInput, warnings: warnings };
    } catch (error) {
      return { ok: false, error: error && error.message ? error.message : "No se pudo validar el expediente." };
    }
  }

  function mergeImportedOpportunityData(current, imported) {
    const local = current || {};
    const incoming = imported || {};
    const currentFields = local.fields || {};
    const incomingFields = incoming.fields || {};
    const currentCalculation = local.calculationInput || {};
    const incomingCalculation = incoming.calculationInput || {};
    const fields = {};
    const calculationInput = {};
    const conflicts = [];

    function mergeValue(key, label, currentValue, incomingValue) {
      const currentIsArray = Array.isArray(currentValue);
      const incomingIsArray = Array.isArray(incomingValue);
      const currentEmpty = currentIsArray ? currentValue.length === 0 : String(currentValue == null ? "" : currentValue).trim() === "";
      const incomingEmpty = incomingIsArray ? incomingValue.length === 0 : String(incomingValue == null ? "" : incomingValue).trim() === "";
      const same = currentIsArray && incomingIsArray
        ? JSON.stringify(currentValue) === JSON.stringify(incomingValue)
        : String(currentValue == null ? "" : currentValue) === String(incomingValue == null ? "" : incomingValue);
      if (currentEmpty) return incomingValue == null ? (currentIsArray ? [] : "") : incomingValue;
      if (incomingEmpty || same) return currentValue;
      conflicts.push({ key: key, label: label, current: currentValue, imported: incomingValue });
      return currentValue;
    }

    Object.keys(dossierFieldLimits).concat(Object.keys(dossierChecklistOptions)).forEach(function (key) {
      fields[key] = mergeValue(key, dossierFieldLabels[key] || key, currentFields[key], incomingFields[key]);
    });
    Object.keys(dossierCalculationLimits).forEach(function (key) {
      calculationInput[key] = mergeValue(key, key, currentCalculation[key], incomingCalculation[key]);
    });
    return { fields: fields, calculationInput: calculationInput, conflicts: conflicts };
  }

  function copyOpportunitySourceData(fields, calculationInput) {
    const sourceFields = {};
    const sourceCalculation = {};
    const inputFields = isRecord(fields) ? fields : {};
    const inputCalculation = isRecord(calculationInput) ? calculationInput : {};
    Object.keys(dossierFieldLimits).forEach(function (key) {
      if (typeof inputFields[key] === "string") sourceFields[key] = inputFields[key];
    });
    Object.keys(dossierChecklistOptions).forEach(function (key) {
      if (Array.isArray(inputFields[key])) {
        sourceFields[key] = inputFields[key].filter(function (item) { return typeof item === "string"; }).slice(0, 12);
      }
    });
    Object.keys(dossierCalculationLimits).forEach(function (key) {
      if (typeof inputCalculation[key] === "string") sourceCalculation[key] = inputCalculation[key];
    });
    return { fields: sourceFields, calculationInput: sourceCalculation };
  }

  function buildOpportunityDossierExport(input) {
    const data = input || {};
    return {
      schema: "moreno.opportunity-dossier",
      schemaVersion: 2,
      exportedAt: String(data.exportedAt || ""),
      status: "preliminary-unverified",
      sourceData: copyOpportunitySourceData(data.fields, data.calculationInput),
      dossier: buildOpportunityDossier(data)
    };
  }

  function buildWhatsAppUrl(message) {
    return "https://wa.me/5491141671674?text=" + encodeURIComponent(String(message == null ? "" : message));
  }

  return {
    parsePositiveDecimal: parsePositiveDecimal,
    calculatePreliminary: calculatePreliminary,
    buildLeadNote: buildLeadNote,
    readMapReference: readMapReference,
    buildContactMessage: buildContactMessage,
    buildOpportunityDossier: buildOpportunityDossier,
    buildOpportunityDossierExport: buildOpportunityDossierExport,
    parseOpportunityDossierImport: parseOpportunityDossierImport,
    mergeImportedOpportunityData: mergeImportedOpportunityData,
    buildWhatsAppUrl: buildWhatsAppUrl
  };
});
