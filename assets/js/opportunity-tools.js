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
    if (!fosRaw && !fotRaw) return { error: "Ingresá al menos el FOS o el FOT verificado de la parcela." };

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
    buildWhatsAppUrl: buildWhatsAppUrl
  };
});
