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
      ["Email de contacto", "email_contacto"],
      ["Teléfono de contacto", "telefono_contacto"],
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
    lines.push("", "Las selecciones de documentación y consultas son declaraciones de quien completa; no constituyen verificación independiente.", "Los campos internos de originación, negociación y honorarios no forman parte de este mensaje.", "", "Enviado desde el formulario de oportunidades del sitio MORENO.");
    return lines.join("\n");
  }


  function buildOpportunityDossier(input) {
    const data = input || {};
    const fields = data.fields || {};
    const calculationInput = data.calculationInput || {};
    const includePublic = data.includePublic !== false;
    const includeInternal = data.includeInternal !== false;
    const internal = validateInternalDossier(data.internalData).value;

    function makeSection(title, entries, emptyLabel) {
      const rows = entries.map(function (entry) {
        return { label: entry[0], value: formatFieldValue(entry[1]) };
      }).filter(function (entry) { return Boolean(entry.value); });
      if (!rows.length) rows.push({ label: "Información", value: emptyLabel || "No informada por el contacto." });
      return { title: title, rows: rows };
    }

    const sections = [];
    if (includePublic) {
      sections.push(
        makeSection("Origen y contacto", [
          ["Nombre", fields.nombre],
          ["Email de contacto", fields.email_contacto],
          ["Teléfono de contacto", fields.telefono_contacto],
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
      );

      const calculation = calculatePreliminary(calculationInput);
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
    }

    if (includeInternal) {
      const counterpartyLabels = {
        owner: "Propietario/a",
        representative: "Representante",
        developer: "Desarrollador/a",
        investor: "Inversor/a",
        company: "Profesional o empresa",
        other: "Otro"
      };
      const commercialStageLabels = {
        not_started: "Sin iniciar",
        first_contact: "Primer contacto",
        response: "Respuesta recibida",
        meeting: "Reunión",
        documents: "Documentación solicitada",
        analysis: "Análisis preliminar",
        proposal: "Propuesta enviada",
        negotiation: "Negociación",
        won: "Ganada",
        lost: "No concretada",
        paused: "Pausada"
      };
      const evidenceClassLabels = {
        counterparty: "Declaración de contraparte",
        public: "Fuente pública",
        technical: "Documento técnico recibido",
        checked: "Contraste registrado por quien opera"
      };
      const diligenceStatusLabels = {
        pending: "Pendiente",
        in_progress: "En curso",
        documented: "Fuente o documento cargado",
        professional_review: "Requiere revisión profesional",
        blocked: "Bloqueado"
      };
      sections.push(makeSection("Seguimiento y negociación · uso interno", [
        ["Referencia interna", internal.reference],
        ["Tipo de contraparte", counterpartyLabels[internal.counterpartyType] || ""],
        ["Organización o empresa (sin datos personales)", internal.organization],
        ["Etapa comercial", commercialStageLabels[internal.commercialStage] || ""],
        ["Próxima acción", internal.nextAction],
        ["Fecha de seguimiento", internal.followUpDate],
        ["Notas de negociación", internal.negotiationNotes]
      ], "Sin datos internos registrados."));
      const evidenceRows = internal.evidence.map(function (entry, index) {
        return [
          "Fuente " + (index + 1),
          [entry.title, evidenceClassLabels[entry.classification] || "", entry.url, entry.consultedAt, entry.note].filter(Boolean).join(" · ")
        ];
      });
      if (!evidenceRows.length) evidenceRows.push(["Registro de fuentes", "Sin fuentes registradas."]);
      sections.push(makeSection("Registro de fuentes y evidencia", evidenceRows));
      const diligenceRows = Object.keys(internalCheckLabels).map(function (key) {
        const entry = internal.checks[key];
        const details = [
          diligenceStatusLabels[entry.status] || "Pendiente",
          entry.source,
          entry.consultedAt,
          entry.note
        ].filter(Boolean).join(" · ");
        return [internalCheckLabels[key], details];
      });
      sections.push(makeSection("Control de diligencia", diligenceRows));
      const feeRows = [
        ["Moneda común del registro", internal.fees.currency],
        ["Honorarios propuestos", internal.fees.proposed],
        ["Honorarios acordados", internal.fees.agreed],
        ["Honorarios facturados", internal.fees.invoiced],
        ["Honorarios cobrados", internal.fees.collected]
      ];
      if (!internal.fees.currency && ![internal.fees.proposed, internal.fees.agreed, internal.fees.invoiced, internal.fees.collected].some(Boolean)) {
        feeRows[0][1] = "Sin importes registrados.";
      }
      sections.push(makeSection("Honorarios · importes independientes, sin conversión ni suma", feeRows));
    }

    const disclaimers = [
      "Este documento no constituye tasación, oferta, estudio de factibilidad, recomendación de inversión ni compromiso comercial."
    ];
    if (includePublic) {
      disclaimers.unshift("Esta ficha reúne exclusivamente datos ingresados por el contacto y resultados aritméticos de referencia. No verifica la autenticidad, vigencia o exactitud de fuentes y documentos, ni acredita identidad, titularidad, disponibilidad o situación urbanística.");
      disclaimers.push("Los cálculos FOS/FOT son referencias matemáticas teóricas; no equivalen a superficie efectivamente edificable ni a una aprobación municipal.");
      disclaimers.push("Las opciones de documentación y consultas reflejan declaraciones del contacto y requieren contraste independiente.");
    }
    if (includeInternal) {
      disclaimers.push("Los estados de diligencia, las clasificaciones de evidencia y las notas internas son registros ingresados por quien opera; el sistema no los verifica automáticamente.");
      disclaimers.push("Esta herramienta no tiene autenticación ni control de acceso. No ingreses DNI, escrituras, teléfonos, correos, datos bancarios ni información personal; usala solo en un dispositivo confiable y conservá el JSON bajo tu control.");
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
      disclaimers: disclaimers
    };
  }

const dossierFieldLimits = Object.freeze({
    nombre: 90, perfil: 60, interes: 90, zona: 120,
    email_contacto: 254, telefono_contacto: 40, tipo: 60,
    ubicacion: 180, nomenclatura: 120, superficie: 60,
    referencia_mapa: 180, detalle: 1200
  });
  const dossierFieldLabels = Object.freeze({
    nombre: "nombre", perfil: "perfil", interes: "interés", zona: "zona",
    email_contacto: "email de contacto", telefono_contacto: "teléfono de contacto",
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
  const internalCheckLabels = Object.freeze({
    cadastral: "Catastral y mensura",
    legal: "Dominial y legal",
    zoning: "Urbanística y normativa",
    environment: "Ambiental e hidráulica",
    services: "Servicios y accesos",
    market: "Mercado y demanda"
  });
  const internalCounterpartyOptions = Object.freeze(["owner", "representative", "developer", "investor", "company", "other"]);
  const internalCommercialStages = Object.freeze(["not_started", "first_contact", "response", "meeting", "documents", "analysis", "proposal", "negotiation", "won", "lost", "paused"]);
  const internalEvidenceClasses = Object.freeze(["counterparty", "public", "technical", "checked"]);
  const internalDiligenceStatuses = Object.freeze(["pending", "in_progress", "documented", "professional_review", "blocked"]);

  function emptyInternalDossier() {
    const checks = {};
    Object.keys(internalCheckLabels).forEach(function (key) {
      checks[key] = { status: "pending", source: "", consultedAt: "", note: "" };
    });
    return {
      reference: "",
      counterpartyType: "",
      organization: "",
      commercialStage: "",
      nextAction: "",
      followUpDate: "",
      negotiationNotes: "",
      evidence: [],
      checks: checks,
      fees: { currency: "", proposed: "", agreed: "", invoiced: "", collected: "" }
    };
  }

  function validISODate(value) {
    return !value || (
      /^\d{4}-\d{2}-\d{2}$/.test(value) &&
      Number.isFinite(Date.parse(value + "T00:00:00Z")) &&
      new Date(value + "T00:00:00Z").toISOString().slice(0, 10) === value
    );
  }

  function validateInternalDossier(source) {
    const input = isRecord(source) ? source : {};
    const value = emptyInternalDossier();
    const errors = [];
    const warnings = [];

    function readText(object, key, max, label) {
      const raw = object[key];
      if (raw == null) return "";
      if (typeof raw !== "string") {
        errors.push(label + " debe ser texto.");
        return "";
      }
      const text = raw.trim();
      if (text.length > max) errors.push(label + " supera el máximo de " + max + " caracteres.");
      return text.slice(0, max);
    }

    value.reference = readText(input, "reference", 50, "La referencia interna");
    value.counterpartyType = readText(input, "counterpartyType", 30, "El tipo de contraparte");
    if (value.counterpartyType && !internalCounterpartyOptions.includes(value.counterpartyType)) {
      errors.push("El tipo de contraparte no está reconocido.");
      value.counterpartyType = "";
    }
    value.organization = readText(input, "organization", 120, "La organización");
    value.commercialStage = readText(input, "commercialStage", 30, "La etapa comercial");
    if (value.commercialStage && !internalCommercialStages.includes(value.commercialStage)) {
      errors.push("La etapa comercial no está reconocida.");
      value.commercialStage = "";
    }
    value.nextAction = readText(input, "nextAction", 180, "La próxima acción");
    value.followUpDate = readText(input, "followUpDate", 10, "La fecha de seguimiento");
    if (!validISODate(value.followUpDate)) errors.push("La fecha de seguimiento debe ser una fecha válida AAAA-MM-DD.");
    value.negotiationNotes = readText(input, "negotiationNotes", 800, "Las notas de negociación");

    if (value.nextAction && !value.followUpDate) warnings.push("Hay una próxima acción sin fecha de seguimiento.");
    if (value.followUpDate && !value.nextAction) warnings.push("Hay una fecha de seguimiento sin acción definida.");

    if (input.evidence != null && !Array.isArray(input.evidence)) {
      errors.push("El registro de fuentes debe ser una lista.");
    } else if (Array.isArray(input.evidence)) {
      if (input.evidence.length > 8) errors.push("Se admiten hasta ocho fuentes por expediente.");
      input.evidence.slice(0, 8).forEach(function (raw, index) {
        const label = "La fuente " + (index + 1);
        if (!isRecord(raw)) {
          errors.push(label + " tiene una estructura inválida.");
          return;
        }
        const entry = {
          title: readText(raw, "title", 140, label + " · título"),
          classification: readText(raw, "classification", 30, label + " · clasificación"),
          url: readText(raw, "url", 500, label + " · URL"),
          consultedAt: readText(raw, "consultedAt", 10, label + " · fecha"),
          note: readText(raw, "note", 300, label + " · nota")
        };
        if (entry.title || entry.classification || entry.url || entry.consultedAt || entry.note) {
          if (!entry.title) errors.push(label + ": indicá un título o nombre de documento.");
          if (!internalEvidenceClasses.includes(entry.classification)) errors.push(label + ": seleccioná una clasificación de evidencia.");
          if (entry.url && !/^https:\/\/[^\s]+$/i.test(entry.url)) errors.push(label + ": la fuente debe usar una URL HTTPS válida.");
          if (!validISODate(entry.consultedAt)) errors.push(label + ": la fecha debe ser válida AAAA-MM-DD.");
          value.evidence.push(entry);
        }
      });
    }

    if (input.checks != null && !isRecord(input.checks)) errors.push("Los controles de diligencia deben tener una estructura válida.");
    const rawChecks = isRecord(input.checks) ? input.checks : {};
    Object.keys(internalCheckLabels).forEach(function (key) {
      if (rawChecks[key] != null && !isRecord(rawChecks[key])) errors.push(internalCheckLabels[key] + ": el registro tiene una estructura inválida.");
      const raw = isRecord(rawChecks[key]) ? rawChecks[key] : {};
      const entry = {
        status: readText(raw, "status", 30, internalCheckLabels[key] + " · estado") || "pending",
        source: readText(raw, "source", 180, internalCheckLabels[key] + " · fuente"),
        consultedAt: readText(raw, "consultedAt", 10, internalCheckLabels[key] + " · fecha"),
        note: readText(raw, "note", 300, internalCheckLabels[key] + " · nota")
      };
      if (!internalDiligenceStatuses.includes(entry.status)) {
        errors.push(internalCheckLabels[key] + ": el estado no está reconocido.");
        entry.status = "pending";
      }
      if (!validISODate(entry.consultedAt)) errors.push(internalCheckLabels[key] + ": la fecha debe ser válida AAAA-MM-DD.");
      if (entry.status === "documented" && !entry.source && !entry.note) {
        warnings.push(internalCheckLabels[key] + ": se marcó una fuente/documento cargado sin referencia ni nota.");
      }
      value.checks[key] = entry;
    });

    if (input.fees != null && !isRecord(input.fees)) errors.push("Los honorarios deben tener una estructura válida.");
    const rawFees = isRecord(input.fees) ? input.fees : {};
    value.fees.currency = readText(rawFees, "currency", 3, "La moneda de honorarios");
    if (value.fees.currency && !["ARS", "USD"].includes(value.fees.currency)) {
      errors.push("La moneda debe ser ARS o USD.");
      value.fees.currency = "";
    }
    ["proposed", "agreed", "invoiced", "collected"].forEach(function (key) {
      const label = "Honorarios " + key;
      const amount = readText(rawFees, key, 18, label);
      if (amount && (!/^\d+(?:[,.]\d{1,2})?$/.test(amount) || /^\d{1,3}[,.]\d{3}$/.test(amount) || !Number.isFinite(Number(amount.replace(",", "."))) || Number(amount.replace(",", ".")) < 0)) {
        errors.push(label + ": ingresá un importe no negativo, sin separador de miles y con hasta dos decimales.");
      }
      value.fees[key] = amount;
    });
    if ([value.fees.proposed, value.fees.agreed, value.fees.invoiced, value.fees.collected].some(Boolean) && !value.fees.currency) {
      errors.push("Seleccioná una moneda (ARS o USD) para interpretar los importes de honorarios.");
    }

    return { ok: errors.length === 0, errors: errors, warnings: warnings, value: value };
  }

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
      if (key === "email_contacto" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        throw new Error("El email de contacto no tiene un formato válido.");
      }
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
      if (payload.schemaVersion !== 1 && payload.schemaVersion !== 2 && payload.schemaVersion !== 3) {
        throw new Error("La versión del expediente no es compatible. Se admiten las versiones 1, 2 y 3.");
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
      if (payload.schemaVersion === 2 || payload.schemaVersion === 3) {
        if (!isRecord(payload.sourceData)) throw new Error("El expediente versión " + payload.schemaVersion + " no incluye los datos estructurados necesarios para recuperarlo.");
        sourceData = payload.sourceData;
      } else {
        sourceData = extractLegacyDossierData(dossier);
        warnings.push("Archivo versión 1: los campos se recuperaron de la ficha legible. Revisá especialmente las listas y los datos que no aparecen en la impresión.");
      }
      const fields = sanitizeImportedFields(sourceData.fields, warnings);
      const calculationInput = sanitizeImportedCalculation(sourceData.calculationInput);
      let internalData = emptyInternalDossier();
      if (payload.schemaVersion === 3) {
        if (!isRecord(payload.internalData)) throw new Error("El expediente versión 3 no incluye la mesa interna de originación.");
        const internalValidation = validateInternalDossier(payload.internalData);
        if (!internalValidation.ok) throw new Error("Datos internos inválidos: " + internalValidation.errors.join(" "));
        internalData = internalValidation.value;
        warnings.push.apply(warnings, internalValidation.warnings);
      }
      return { ok: true, version: payload.schemaVersion, exportedAt: payload.exportedAt, fields: fields, calculationInput: calculationInput, internalData: internalData, warnings: warnings };
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
    const currentInternal = isRecord(local.internalData) ? local.internalData : emptyInternalDossier();
    const incomingInternal = incoming.version && incoming.version < 3
      ? {}
      : (isRecord(incoming.internalData) ? incoming.internalData : {});
    const fields = {};
    const calculationInput = {};
    const internalData = emptyInternalDossier();
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
    ["reference", "counterpartyType", "organization", "commercialStage", "nextAction", "followUpDate", "negotiationNotes"].forEach(function (key) {
      internalData[key] = mergeValue("internalData." + key, key, currentInternal[key], incomingInternal[key]);
    });
    internalData.evidence = mergeValue("internalData.evidence", "registro de fuentes", currentInternal.evidence, incomingInternal.evidence);
    Object.keys(internalCheckLabels).forEach(function (key) {
      internalData.checks[key] = {};
      ["status", "source", "consultedAt", "note"].forEach(function (field) {
        internalData.checks[key][field] = mergeValue(
          "internalData.checks." + key + "." + field,
          internalCheckLabels[key] + " · " + field,
          currentInternal.checks && currentInternal.checks[key] && currentInternal.checks[key][field],
          incomingInternal.checks && incomingInternal.checks[key] && incomingInternal.checks[key][field]
        );
      });
    });
    ["currency", "proposed", "agreed", "invoiced", "collected"].forEach(function (key) {
      internalData.fees[key] = mergeValue("internalData.fees." + key, "honorarios " + key, currentInternal.fees && currentInternal.fees[key], incomingInternal.fees && incomingInternal.fees[key]);
    });
    return { fields: fields, calculationInput: calculationInput, internalData: internalData, conflicts: conflicts };
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
    const internalValidation = validateInternalDossier(data.internalData);
    if (!internalValidation.ok) throw new Error(internalValidation.errors.join(" "));
    const normalized = Object.assign({}, data, { internalData: internalValidation.value });
    return {
      schema: "moreno.opportunity-dossier",
      schemaVersion: 3,
      exportedAt: String(data.exportedAt || ""),
      status: "preliminary-unverified",
      sourceData: copyOpportunitySourceData(data.fields, data.calculationInput),
      internalData: internalValidation.value,
      dossier: buildOpportunityDossier(normalized)
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
    validateInternalDossier: validateInternalDossier,
    emptyInternalDossier: emptyInternalDossier,
    parseOpportunityDossierImport: parseOpportunityDossierImport,
    mergeImportedOpportunityData: mergeImportedOpportunityData,
    buildWhatsAppUrl: buildWhatsAppUrl
  };
});
