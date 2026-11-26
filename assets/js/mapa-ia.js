"use strict";

const localities=[
{id:"moreno",name:"Moreno Centro",lat:-34.6508,lng:-58.7914,info:"Cabecera administrativa y nodo urbano del partido."},
{id:"paso",name:"Paso del Rey",lat:-34.6569,lng:-58.7611,info:"Sector este. Observar conectividad, comercio, servicios y relación con Camino de la Ribera."},
{id:"lareja",name:"La Reja",lat:-34.6433,lng:-58.8286,info:"Sector oeste. Referencia para estudiar entorno recreativo, residencial y accesos."},
{id:"alvarez",name:"Francisco Álvarez",lat:-34.6186,lng:-58.8758,info:"Localidad del corredor oeste."},
{id:"trujui",name:"Trujui",lat:-34.5881,lng:-58.7583,info:"Sector norte. Área de prospección territorial."},
{id:"cuartel",name:"Cuartel V",lat:-34.5583,lng:-58.8139,info:"Sector norte. Prospección productiva y de parcelas de mayor escala."}
];
const opportunities=[
{id:"rp25",stage:"documented",name:"RP25 · Darwin Passaponti · Av. San Fernando",lat:-34.5705,lng:-58.7955,kind:"industrial",business:"Suelo industrial/logístico, depósitos, patios operativos, agrupamientos PyME y proveedores industriales.",evidence:"La Ordenanza municipal 7443/25 documenta rezonificaciones puntuales a I1/I2 para parcelas individualizadas. No debe extrapolarse a predios vecinos.",status:"Normativa documentada para polígonos específicos; parcelas y disponibilidad por verificar.",next:"Cruzar polígonos con catastro; verificar CVI, dominio, servicios, accesos y disponibilidad.",source:"https://sibom.slyt.gba.gob.ar/bulletins/14607/contents/2361465"},
{id:"ecoparque",stage:"documented",name:"Nodo RP24/RP25 · Ecoparque Industrial",lat:-34.57755,lng:-58.87202,kind:"industrial",business:"Servicios a empresas, depósitos complementarios, oficinas operativas, gastronomía de ruta y mantenimiento de flotas.",evidence:"El operador publica un fraccionamiento de 78 parcelas de 2.000 a 10.000 m² y describe infraestructura, servicios y parámetros FOS 0,6/FOT 1,2. Son datos publicados por el operador, no una verificación independiente.",status:"Disponibilidad, precios, reglamento y factibilidad actual por parcela sin confirmar.",next:"Solicitar disponibilidad y documentación vigente; contrastar indicadores con el Municipio y revisar dominio, servicios y accesos de cada parcela.",source:"https://ecoparque.com.ar/"},
{id:"ribera",stage:"documented",name:"Paso del Rey · Camino de la Ribera",lat:-34.6575,lng:-58.744,kind:"commercial",business:"Comercio, gastronomía, servicios, estacionamiento y reconversión de inmuebles.",evidence:"La Provincia documentó obras de conexión, puente, pavimentos, drenajes e iluminación.",status:"Infraestructura documentada; activos inmobiliarios concretos por detectar.",next:"Identificar frentes y parcelas; revisar cotas, drenaje, riesgo hídrico y usos.",source:"https://www.gba.gob.ar/node/51424"},
{id:"roggero",stage:"documented",name:"Distrito Ecológico Roggero",lat:-34.675,lng:-58.875,kind:"tourism",business:"Turismo de naturaleza, recreación, gastronomía y servicios compatibles con la protección ambiental.",evidence:"IDUAR presenta el DER como plataforma de desarrollo urbano, ambiental y turístico, articulada con un área natural protegida y obras de infraestructura. Es contexto de planificación, no autorización para desarrollar en cualquier parcela.",status:"Potencial de articulación público-privada sujeto a restricciones ambientales y urbanísticas; predios concretos y usos permitidos por verificar.",next:"Verificar límites del área protegida, Ordenanza 7164/24, zonificación, restricciones ambientales e hidráulicas, servicios y titularidad.",source:"https://iduar.moreno.gob.ar/2025/08/12/distrito-ecologico-roggero-un-espacio-natural-para-descubrir/"},
{id:"norte",stage:"hypothesis",name:"Cuartel V · Trujui · La Reja",lat:-34.61,lng:-58.815,kind:"land",business:"Prospección de parcelas grandes, ensamble de tierra, asociaciones con propietarios y desarrollos por etapas.",evidence:"Los avisos inmobiliarios son pistas de prospección, no prueba de dominio, zonificación ni disponibilidad.",status:"Hipótesis de prospección; sin parcelas individualizadas verificadas.",next:"Construir inventario con nomenclatura catastral, superficie, precio pedido y contacto verificable.",source:"https://www.zonaprop.com.ar/terrenos-venta-moreno-mas-9000-m2.html"}
];

const all = [
  ...localities.map(item => ({ ...item, type: "locality" })),
  ...opportunities.map(item => ({ ...item, type: "opportunity" }))
];
const kindLabel = {
  industrial: "Productivo / logístico",
  commercial: "Comercial / servicios",
  tourism: "Turismo / recreación",
  land: "Prospección de suelo"
};

const reviewTasks = Object.freeze([
  Object.freeze({ id: "cadastral", label: "Individualización catastral y plano de mensura" }),
  Object.freeze({ id: "planning", label: "Normativa vigente, usos e indicadores urbanísticos" }),
  Object.freeze({ id: "legal", label: "Titularidad, antecedentes y restricciones" }),
  Object.freeze({ id: "feasibility", label: "Servicios, accesos y condiciones ambientales e hidráulicas" }),
  Object.freeze({ id: "traceability", label: "Trazabilidad documental y fecha de consulta" })
]);
const REVIEW_STORAGE_KEY = "moreno-map-review-v2";
const LEGACY_REVIEW_STORAGE_KEY = "moreno-map-review-v1";

function isValidReviewDate(value) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(value || ""));
  if (!match) return false;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day;
}

function normalizeReviewRecord(saved) {
  if (saved === true) {
    return { completed: false, legacy_marked: true, source_document: "", consulted_at: "", note: "" };
  }
  if (!saved || typeof saved !== "object" || Array.isArray(saved)) return null;
  const source = String(saved.source_document == null ? "" : saved.source_document).trim().slice(0, 240);
  const consultedAt = isValidReviewDate(saved.consulted_at) ? String(saved.consulted_at) : "";
  const note = String(saved.note == null ? "" : saved.note).trim().slice(0, 500);
  const completed = saved.completed === true && source.length >= 4 && Boolean(consultedAt);
  const legacyMarked = !completed && (saved.legacy_marked === true || saved.completed === true);
  if (!completed && !legacyMarked && !source && !consultedAt && !note) return null;
  return { completed, legacy_marked: legacyMarked, source_document: source, consulted_at: consultedAt, note };
}

function normalizeReviewState(raw, items) {
  const allowedIds = new Set((items || opportunities).map(item => item.id));
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return {};
  const normalized = {};
  Object.keys(raw).forEach(referenceId => {
    if (!allowedIds.has(referenceId)) return;
    const saved = raw[referenceId];
    if (!saved || typeof saved !== "object" || Array.isArray(saved)) return;
    const tasks = {};
    reviewTasks.forEach(task => {
      const record = normalizeReviewRecord(saved[task.id]);
      if (record) tasks[task.id] = record;
    });
    if (Object.keys(tasks).length) normalized[referenceId] = tasks;
  });
  return normalized;
}

function readReviewState(storage, items) {
  if (!storage || typeof storage.getItem !== "function") return {};
  try {
    const current = storage.getItem(REVIEW_STORAGE_KEY);
    if (current) return normalizeReviewState(JSON.parse(current), items);
  } catch (error) {
    // Si la versión actual está dañada, se intenta recuperar la marca anterior.
  }
  try {
    const legacy = storage.getItem(LEGACY_REVIEW_STORAGE_KEY);
    return legacy ? normalizeReviewState(JSON.parse(legacy), items) : {};
  } catch (error) {
    return {};
  }
}

function writeReviewState(storage, state, items) {
  if (!storage || typeof storage.setItem !== "function") return false;
  try {
    storage.setItem(REVIEW_STORAGE_KEY, JSON.stringify(normalizeReviewState(state, items)));
    if (typeof storage.removeItem === "function") {
      try { storage.removeItem(LEGACY_REVIEW_STORAGE_KEY); } catch (error) {}
    }
    return true;
  } catch (error) {
    return false;
  }
}

function clearReviewState(storage) {
  if (!storage) return true;
  if (typeof storage.removeItem !== "function") return false;
  try {
    storage.removeItem(REVIEW_STORAGE_KEY);
    storage.removeItem(LEGACY_REVIEW_STORAGE_KEY);
    return true;
  } catch (error) {
    return false;
  }
}

function updateReviewState(state, referenceId, taskId, completed, items, details) {
  const allowedItems = items || opportunities;
  if (!allowedItems.some(item => item.id === referenceId) ||
      !reviewTasks.some(task => task.id === taskId)) {
    return normalizeReviewState(state, allowedItems);
  }
  const next = normalizeReviewState(state, allowedItems);
  if (!next[referenceId]) next[referenceId] = {};
  const previous = next[referenceId][taskId] || {};
  const supplied = details && typeof details === "object" ? details : {};
  const source = String(supplied.source_document == null ? previous.source_document || "" : supplied.source_document).trim().slice(0, 240);
  const dateValue = supplied.consulted_at == null ? previous.consulted_at || "" : supplied.consulted_at;
  const consultedAt = isValidReviewDate(dateValue) ? String(dateValue) : "";
  const note = String(supplied.note == null ? previous.note || "" : supplied.note).trim().slice(0, 500);
  const isComplete = completed === true && source.length >= 4 && Boolean(consultedAt);
  const legacyMarked = !isComplete && previous.legacy_marked === true;
  if (isComplete || legacyMarked || source || consultedAt || note) {
    next[referenceId][taskId] = {
      completed: isComplete,
      legacy_marked: legacyMarked,
      source_document: source,
      consulted_at: consultedAt,
      note
    };
  } else {
    delete next[referenceId][taskId];
  }
  if (!Object.keys(next[referenceId]).length) delete next[referenceId];
  return next;
}

function getReviewSummary(state, referenceId) {
  const normalized = normalizeReviewState(state, opportunities);
  const entry = normalized[referenceId] || {};
  const completed = reviewTasks.filter(task => entry[task.id] && entry[task.id].completed === true).length;
  return { completed, total: reviewTasks.length, percent: Math.round((completed / reviewTasks.length) * 100) };
}

function buildReviewExport(state, items, generatedAt) {
  const normalized = normalizeReviewState(state, opportunities);
  const visibleIds = new Set((items || opportunities).map(item => item.id));
  return {
    schema_version: 2,
    generated_at: generatedAt || new Date().toISOString(),
    scope: "Registro local de revisiones con fuente o documento y fecha de consulta. No verifica autenticidad, vigencia, titularidad ni cumplimiento normativo; no es una certificación.",
    references: opportunities.filter(item => visibleIds.has(item.id)).map(item => {
      const summary = getReviewSummary(normalized, item.id);
      const entry = normalized[item.id] || {};
      return {
        id: item.id,
        name: item.name,
        completed_tasks: summary.completed,
        total_tasks: summary.total,
        tasks: reviewTasks.map(task => {
          const record = entry[task.id] || {};
          return {
            id: task.id,
            label: task.label,
            review_recorded: record.completed === true,
            source_document: record.source_document || "",
            consulted_at: record.consulted_at || "",
            note: record.note || "",
            legacy_marked: record.legacy_marked === true
          };
        })
      };
    })
  };
}


function parseReviewImport(payload, items) {
  let parsed;
  try { parsed = typeof payload === "string" ? JSON.parse(payload) : payload; }
  catch (error) { return { ok: false, error: "El archivo no contiene JSON válido." }; }
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed) || parsed.schema_version !== 2 || !Array.isArray(parsed.references)) {
    return { ok: false, error: "Formato no compatible: se requiere una bitácora MORENO JSON versión 2." };
  }
  const allowedIds = new Set((items || opportunities).map(item => item.id));
  const knownTasks = new Set(reviewTasks.map(task => task.id));
  const incoming = {};
  const seen = new Set();
  let ignoredReferences = 0;
  let skippedTasks = 0;
  parsed.references.forEach(reference => {
    if (!reference || typeof reference !== "object" || Array.isArray(reference) || !allowedIds.has(reference.id) || !Array.isArray(reference.tasks) || seen.has(reference.id)) {
      ignoredReferences += 1;
      return;
    }
    seen.add(reference.id);
    reference.tasks.forEach(task => {
      if (!task || typeof task !== "object" || Array.isArray(task) || !knownTasks.has(task.id)) {
        skippedTasks += 1;
        return;
      }
      const record = normalizeReviewRecord({
        completed: task.review_recorded === true,
        legacy_marked: task.legacy_marked === true,
        source_document: task.source_document,
        consulted_at: task.consulted_at,
        note: task.note
      });
      if (!record) return;
      if (!incoming[reference.id]) incoming[reference.id] = {};
      incoming[reference.id][task.id] = record;
    });
  });
  return { ok: true, state: normalizeReviewState(incoming, items || opportunities), ignoredReferences, skippedTasks };
}

function mergeReviewStates(localState, importedState, items) {
  const allowedItems = items || opportunities;
  const merged = normalizeReviewState(localState, allowedItems);
  const imported = normalizeReviewState(importedState, allowedItems);
  const conflicts = [];
  let addedRecords = 0;
  let combinedRecords = 0;
  Object.keys(imported).forEach(referenceId => {
    Object.keys(imported[referenceId]).forEach(taskId => {
      const incoming = imported[referenceId][taskId];
      const existing = merged[referenceId] && merged[referenceId][taskId];
      if (!existing) {
        if (!merged[referenceId]) merged[referenceId] = {};
        merged[referenceId][taskId] = { ...incoming };
        addedRecords += 1;
        return;
      }
      const fields = ["source_document", "consulted_at", "note"];
      const differingFields = fields.filter(field =>
        String(existing[field] || "") && String(incoming[field] || "") && String(existing[field]) !== String(incoming[field])
      );
      if (differingFields.length) {
        conflicts.push({ reference_id: referenceId, task_id: taskId, fields: differingFields });
        return;
      }
      const source = existing.source_document || incoming.source_document || "";
      const consultedAt = existing.consulted_at || incoming.consulted_at || "";
      const note = existing.note || incoming.note || "";
      const completed = (existing.completed === true || incoming.completed === true) && source.length >= 4 && isValidReviewDate(consultedAt);
      const legacyMarked = !completed && (existing.legacy_marked === true || incoming.legacy_marked === true);
      merged[referenceId][taskId] = { completed, legacy_marked: legacyMarked, source_document: source, consulted_at: consultedAt, note };
      combinedRecords += 1;
    });
  });
  return { state: normalizeReviewState(merged, allowedItems), addedRecords, combinedRecords, conflicts };
}

const MAP_VIEW_QUERY_KEYS = ["q", "tipo", "sector", "evidencia", "ref"];
const MAP_VIEW_CATEGORIES = ["all", "locality", "opportunity"];
const MAP_VIEW_KINDS = ["all", "industrial", "commercial", "tourism", "land"];
const MAP_VIEW_EVIDENCE = ["all", "documented", "hypothesis"];

function normalizeMapViewState(state, items) {
  const settings = state || {};
  const query = String(settings.query || "").trim().slice(0, 100);
  const category = MAP_VIEW_CATEGORIES.includes(settings.category) ? settings.category : "all";
  const kind = MAP_VIEW_KINDS.includes(settings.kind) ? settings.kind : "all";
  const evidence = MAP_VIEW_EVIDENCE.includes(settings.evidence) ? settings.evidence : "all";
  const candidateReference = String(settings.ref || "");
  const reference = (items || []).some(item => item.id === candidateReference)
    ? candidateReference
    : null;
  return { query, category, kind, evidence, ref: reference };
}

function parseMapViewState(search, items) {
  const parameters = new URLSearchParams(String(search || ""));
  return normalizeMapViewState({
    query: parameters.get("q") || "",
    category: parameters.get("tipo") || "all",
    kind: parameters.get("sector") || "all",
    evidence: parameters.get("evidencia") || "all",
    ref: parameters.get("ref")
  }, items);
}

function buildMapViewUrl(baseUrl, state, items) {
  const url = new URL(String(baseUrl));
  const normalized = normalizeMapViewState(state, items);
  MAP_VIEW_QUERY_KEYS.forEach(key => url.searchParams.delete(key));
  if (normalized.query) url.searchParams.set("q", normalized.query);
  if (normalized.category !== "all") url.searchParams.set("tipo", normalized.category);
  if (normalized.kind !== "all") url.searchParams.set("sector", normalized.kind);
  if (normalized.evidence !== "all") url.searchParams.set("evidencia", normalized.evidence);
  if (normalized.ref) url.searchParams.set("ref", normalized.ref);
  return url.toString();
}

function getSharedReferenceId(search, items) {
  return parseMapViewState(search, items).ref;
}

function buildReferenceUrl(baseUrl, referenceId) {
  const currentUrl = new URL(String(baseUrl));
  const currentState = parseMapViewState(currentUrl.search, all);
  return buildMapViewUrl(baseUrl, { ...currentState, ref: referenceId }, all);
}

function buildOpportunityContactUrl(baseUrl, item) {
  const url = new URL("../oportunidades/", String(baseUrl));
  url.searchParams.set("map_ref", String(item.id));
  url.searchParams.delete("map_name");
  return url.toString();
}

function referenceContactLabel(item) {
  return item && item.type === "opportunity"
    ? "Conversar sobre esta tesis ↗"
    : "Consultar sobre esta localidad ↗";
}

function shouldFitMunicipalBounds(selectedReferenceId, userHasNavigated) {
  return !selectedReferenceId && !userHasNavigated;
}

function prefersReducedMotion(view) {
  return Boolean(
    view &&
    typeof view.matchMedia === "function" &&
    view.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function filterReferences(items, options) {
  const settings = options || {};
  const query = String(settings.query || "").toLocaleLowerCase("es-AR").trim();
  const category = settings.category || "all";
  const kind = settings.kind || "all";
  const evidence = settings.evidence || "all";
  return items.filter(item => {
    const categoryMatches =
      category === "all" ||
      (category === "locality" && item.type === "locality") ||
      (category === "opportunity" && item.type === "opportunity");
    const kindMatches =
      kind === "all" ||
      (item.type === "opportunity" && item.kind === kind);
    const evidenceMatches =
      evidence === "all" ||
      (item.type === "opportunity" && evidence === item.stage);
    const searchable = [
      item.name, item.info, item.business, item.status, item.evidence, item.next,
      item.kind, kindLabel[item.kind]
    ].filter(Boolean).join(" ").toLocaleLowerCase("es-AR");
    return categoryMatches && kindMatches && evidenceMatches && searchable.includes(query);
  });
}

function countInventory(items) {
  const list = Array.isArray(items) ? items : [];
  return list.reduce((counts, item) => {
    if (item.type === "locality") counts.localities += 1;
    else if (item.type === "opportunity" && item.stage === "documented") counts.documented += 1;
    else if (item.type === "opportunity" && item.stage === "hypothesis") counts.hypotheses += 1;
    counts.total += 1;
    return counts;
  }, { localities: 0, documented: 0, hypotheses: 0, total: 0 });
}

function csvCell(value) {
  return '"' + String(value == null ? "" : value).replace(/"/g, '""') + '"';
}

function buildCsv(items) {
  const headers = [
    "tipo", "nombre", "latitud_referencia", "longitud_referencia", "categoria",
    "nivel_evidencia", "linea_a_investigar", "evidencia_publica",
    "estado_de_verificacion", "proximo_paso", "fuente", "alcance_de_coordenada"
  ];
  const rows = items.map(item => [
    item.type === "locality" ? "localidad" : "tesis",
    item.name,
    item.lat,
    item.lng,
    item.type === "locality" ? "localidad" : (kindLabel[item.kind] || item.kind),
    item.type === "locality" ? "referencia territorial" :
      (item.stage === "hypothesis" ? "hipotesis de prospeccion" : "contexto con fuente publica"),
    item.type === "locality" ? item.info : item.business,
    item.type === "locality" ? "Localidad de referencia; no es una evaluacion parcelaria." : item.evidence,
    item.type === "locality" ? "Centro aproximado de localidad; no parcelario." : item.status,
    item.type === "locality" ? "Definir zona y recopilar informacion catastral y normativa." : item.next,
    item.source || "",
    item.type === "locality"
      ? "Coordenada de referencia de localidad; no identifica una parcela."
      : "Centro aproximado de corredor o area; no identifica una parcela."
  ]);
  return "\uFEFF" + [headers, ...rows].map(row => row.map(csvCell).join(",")).join("\r\n");
}

function buildGeoJson(items) {
  const features = items.map(item => {
    const isLocality = item.type === "locality";
    const evidenceLevel = isLocality
      ? "referencia territorial"
      : (item.stage === "hypothesis" ? "hipotesis de prospeccion" : "contexto con fuente publica");
    const coordinateScope = isLocality
      ? "Centro aproximado de localidad; no identifica una parcela."
      : "Centro aproximado de corredor o area; no identifica una parcela.";
    return {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [Number(item.lng), Number(item.lat)]
      },
      properties: {
        id: item.id,
        reference_type: isLocality ? "localidad" : "tesis territorial",
        name: item.name,
        category: isLocality ? "Localidad" : (kindLabel[item.kind] || item.kind),
        evidence_level: evidenceLevel,
        line_to_investigate: isLocality ? item.info : item.business,
        public_evidence: isLocality ? null : item.evidence,
        verification_status: isLocality
          ? "Referencia geográfica de localidad; no es una evaluación parcelaria."
          : item.status,
        next_step: isLocality
          ? "Definir zona y recopilar información catastral y normativa."
          : item.next,
        source_url: item.source || null,
        coordinate_scope: coordinateScope,
        parcel_identified: false,
        availability_verified: false
      }
    };
  });
  return {
    type: "FeatureCollection",
    name: "Mapa IA de Moreno — referencias territoriales",
    description: "Exportación de las referencias visibles del inventario exploratorio de MORENO.",
    disclaimer: "Las coordenadas son referencias aproximadas de localidades o corredores. No identifican parcelas ni acreditan titularidad, disponibilidad, zonificación, factibilidad o rentabilidad. Verificar cada dato con fuentes oficiales y trabajo de campo.",
    features
  };
}


function escapeTerritorialHtml(value) {
  return String(value == null ? "" : value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function safeTerritorialSource(value) {
  try {
    const url = new URL(String(value || ""));
    return url.protocol === "https:" ? url.toString() : "";
  } catch (error) {
    return "";
  }
}

function buildTerritorialBrief(item, generatedAt) {
  if (!item || item.type !== "opportunity" ||
      !["documented", "hypothesis"].includes(item.stage)) return null;
  const latitude = Number(item.lat);
  const longitude = Number(item.lng);
  const timestamp = typeof generatedAt === "string" && Number.isFinite(Date.parse(generatedAt))
    ? new Date(generatedAt).toISOString()
    : new Date().toISOString();
  const localityScope = "Centro aproximado de corredor o área; no identifica una parcela.";
  const stageLabel = item.stage === "hypothesis"
    ? "Hipótesis de prospección"
    : "Contexto con fuente pública";
  return {
    schema: "moreno.territorial-brief",
    schemaVersion: 1,
    generatedAt: timestamp,
    classification: { value: item.stage, label: stageLabel },
    reference: {
      id: String(item.id || "").trim().slice(0, 40),
      name: String(item.name || "Referencia territorial").trim().slice(0, 180),
      category: kindLabel[item.kind] || String(item.kind || "Tesis territorial").slice(0, 80),
      coordinates: {
        latitude: Number.isFinite(latitude) ? latitude : null,
        longitude: Number.isFinite(longitude) ? longitude : null,
        scope: localityScope
      },
      lineToInvestigate: String(item.business || "").trim().slice(0, 1200),
      evidence: String(item.evidence || "").trim().slice(0, 1600),
      verificationStatus: String(item.status || "").trim().slice(0, 800),
      nextStep: String(item.next || "").trim().slice(0, 1000),
      sourceUrl: safeTerritorialSource(item.source)
    },
    diligence: reviewTasks.map(task => ({
      id: task.id, label: task.label, sourceDocument: "", consultedAt: "", recorded: false
    })),
    dataToComplete: [
      "Partida y nomenclatura catastral del inmueble concreto.",
      "Plano de mensura, superficie y geometría parcelaria.",
      "Certificado urbanístico vigente, usos e indicadores aplicables.",
      "Titularidad, antecedentes dominiales, gravámenes y restricciones.",
      "Servicios, accesos y condiciones ambientales e hidráulicas.",
      "Disponibilidad y condiciones económicas respaldadas por una fuente y fecha."
    ],
    disclaimers: [
      "Esta ficha organiza una línea de investigación territorial; no identifica ni ofrece un inmueble.",
      "Las coordenadas son aproximadas y no representan una parcela.",
      "Una fuente pública o una publicación de un operador no equivale a verificación independiente, vigencia normativa ni disponibilidad.",
      "No constituye tasación, oferta, estudio de factibilidad, certificación urbanística ni recomendación de inversión."
    ]
  };
}

function buildTerritorialBriefHtml(brief) {
  if (!brief || brief.schema !== "moreno.territorial-brief" ||
      brief.schemaVersion !== 1 || !brief.reference) return "";
  const reference = brief.reference;
  const safeSource = safeTerritorialSource(reference.sourceUrl);
  const coordinates = reference.coordinates || {};
  const coordinateText = Number.isFinite(coordinates.latitude) && Number.isFinite(coordinates.longitude)
    ? coordinates.latitude.toFixed(5) + ", " + coordinates.longitude.toFixed(5)
    : "No informadas";
  const sourceMarkup = safeSource
    ? '<a href="' + escapeTerritorialHtml(safeSource) + '" target="_blank" rel="noopener noreferrer">' +
      escapeTerritorialHtml(safeSource) + "</a>"
    : "<span>Sin enlace de fuente registrado.</span>";
  const diligenceRows = (Array.isArray(brief.diligence) ? brief.diligence : []).map(task =>
    "<tr><th>" + escapeTerritorialHtml(task.label) +
    '</th><td><span class="write-line"></span></td><td><span class="date-line"></span></td></tr>'
  ).join("");
  const dataRows = (Array.isArray(brief.dataToComplete) ? brief.dataToComplete : []).map(label =>
    '<li><span class="empty-box" aria-hidden="true"></span>' + escapeTerritorialHtml(label) + "</li>"
  ).join("");
  const disclaimerRows = (Array.isArray(brief.disclaimers) ? brief.disclaimers : []).map(note =>
    "<li>" + escapeTerritorialHtml(note) + "</li>"
  ).join("");
  const dateLabel = escapeTerritorialHtml(String(brief.generatedAt || "").slice(0, 10));
  return '<!doctype html><html lang="es-AR"><head><meta charset="utf-8">' +
    '<meta name="viewport" content="width=device-width,initial-scale=1">' +
    '<meta name="robots" content="noindex,nofollow">' +
    "<title>Ficha de prospección · " + escapeTerritorialHtml(reference.name) + "</title>" +
    "<style>" +
    "@page{size:A4;margin:13mm}" +
    ":root{color-scheme:light;--ink:#292e2a;--muted:#686b62;--line:#c9c5b9;--paper:#fbfaf6;--rust:#8b5b43}" +
    "*{box-sizing:border-box}body{margin:0;padding:24px;background:#e9e6dd;color:var(--ink);font:12px/1.65 Arial,sans-serif}" +
    ".sheet{max-width:210mm;min-height:267mm;margin:0 auto;padding:15mm;background:var(--paper);box-shadow:0 8px 30px #20282018}" +
    ".topline{display:flex;justify-content:space-between;gap:20px;padding-bottom:12px;border-bottom:2px solid var(--ink);font-size:9px;letter-spacing:.16em;text-transform:uppercase}" +
    ".eyebrow{color:var(--rust);font-size:9px;font-weight:700;letter-spacing:.16em;text-transform:uppercase}" +
    "h1{max-width:680px;margin:18px 0 8px;font:400 35px/1.04 Georgia,serif;letter-spacing:-.035em}" +
    ".subhead{margin:0 0 18px;color:var(--muted);font-size:11px}" +
    ".badge{display:inline-block;padding:5px 8px;border:1px solid var(--ink);font-size:9px;letter-spacing:.09em;text-transform:uppercase}" +
    ".lead{margin:18px 0;padding:15px 18px;border-left:3px solid var(--rust);background:#f0ede5}" +
    ".lead p{margin:6px 0 0;font:400 18px/1.35 Georgia,serif}" +
    ".grid{display:grid;grid-template-columns:1fr 1fr;gap:0 22px;margin-top:16px}" +
    "section{margin:0 0 17px;break-inside:avoid}h2{margin:0 0 7px;padding-bottom:6px;border-bottom:1px solid var(--line);font:400 18px/1.2 Georgia,serif}" +
    "p{margin:0 0 7px}.muted{color:var(--muted)}.source{overflow-wrap:anywhere;font-size:10px}" +
    ".coordinate{padding:8px 10px;border:1px solid var(--line);font:600 11px/1.5 monospace}" +
    "table{width:100%;border-collapse:collapse;font-size:10px}th,td{padding:8px 7px;border-bottom:1px solid var(--line);text-align:left;vertical-align:top}th{width:48%;font-weight:600}" +
    "td{width:32%}.write-line{display:block;height:17px;border-bottom:1px dotted #8d8b80}.date-line{display:block;height:17px;border-bottom:1px dotted #8d8b80}" +
    ".data-list,.disclaimers{margin:0;padding:0;list-style:none}.data-list li{display:flex;gap:9px;padding:5px 0;border-bottom:1px solid #dedbd2}" +
    ".empty-box{flex:0 0 11px;width:11px;height:11px;margin-top:3px;border:1px solid #77796f}" +
    ".disclaimers{display:grid;gap:4px;color:var(--muted);font-size:9px}.disclaimers li:before{content:'— ';color:var(--rust)}" +
    "footer{margin-top:15px;padding-top:9px;border-top:1px solid var(--ink);color:var(--muted);font-size:8px;letter-spacing:.04em}" +
    ".print-control{display:block;margin:0 auto 14px;padding:10px 15px;border:1px solid var(--ink);background:var(--ink);color:#fff;font-weight:700;cursor:pointer}" +
    "a{color:#79523d;text-decoration-thickness:1px;text-underline-offset:3px}" +
    "@media(max-width:700px){body{padding:0}.sheet{min-height:0;padding:22px}.grid{grid-template-columns:1fr}h1{font-size:30px}.topline{font-size:8px}}" +
    "@media print{body{padding:0;background:#fff}.sheet{max-width:none;min-height:0;margin:0;padding:0;box-shadow:none}.print-control{display:none}a{color:inherit;text-decoration:none}}" +
    '</style></head><body><button class="print-control" type="button" onclick="window.print()">Imprimir / guardar como PDF</button>' +
    '<main class="sheet"><div class="topline"><strong>MORENO · INTELIGENCIA TERRITORIAL</strong><span>Ficha de prospección · ' + dateLabel + "</span></div>" +
    '<p class="eyebrow" style="margin:18px 0 0">Dossier de investigación · ' + escapeTerritorialHtml(reference.id) + "</p>" +
    "<h1>" + escapeTerritorialHtml(reference.name) + "</h1>" +
    '<p class="subhead"><span class="badge">' + escapeTerritorialHtml(brief.classification.label) + "</span> &nbsp; " +
    escapeTerritorialHtml(reference.category) + "</p>" +
    '<section class="lead"><span class="eyebrow">Línea de investigación · no es una propuesta confirmada</span><p>' +
    escapeTerritorialHtml(reference.lineToInvestigate) + "</p></section>" +
    '<div class="grid"><section><h2>Evidencia disponible</h2><p>' + escapeTerritorialHtml(reference.evidence) +
    '</p><p class="muted">La clasificación indica el tipo de respaldo registrado en el inventario; no certifica exactitud o vigencia.</p></section>' +
    "<section><h2>Estado de verificación</h2><p>" + escapeTerritorialHtml(reference.verificationStatus) +
    '</p><p class="muted">La disponibilidad y la identificación parcelaria no se presuponen.</p></section>' +
    "<section><h2>Próximo paso sugerido</h2><p>" + escapeTerritorialHtml(reference.nextStep) + "</p></section>" +
    '<section><h2>Referencia cartográfica</h2><p class="coordinate">' + escapeTerritorialHtml(coordinateText) +
    "</p><p class=\"muted\">" + escapeTerritorialHtml(coordinates.scope || "Referencia aproximada; no parcelaria.") + "</p></section></div>" +
    '<section class="source"><h2>Fuente de origen</h2><p>' + sourceMarkup +
    '</p><p class="muted">Enlace consignado en el inventario MORENO. Consultar el documento original y su fecha antes de utilizarlo en una evaluación.</p></section>' +
    '<section><h2>Bitácora para diligencia documental</h2><table><thead><tr><th>Control</th><th>Documento / fuente</th><th>Fecha</th></tr></thead><tbody>' +
    diligenceRows + "</tbody></table></section>" +
    '<section><h2>Datos a completar para evaluar un inmueble concreto</h2><ul class="data-list">' + dataRows + "</ul></section>" +
    '<section><h2>Alcance y cautelas</h2><ul class="disclaimers">' + disclaimerRows + "</ul></section>" +
    "<footer>ERICA M. ACOSTA · MORENO · Documento generado localmente desde el inventario público. Revisar fuentes y completar verificaciones antes de compartir como antecedente de una operación.</footer>" +
    "</main></body></html>";
}



function buildTerritorialDossier(items, filters, generatedAt) {
  const known = new Map(all.map(item => [item.id, item]));
  const seen = new Set();
  const selected = (Array.isArray(items) ? items : []).map(entry => {
    const id = entry && typeof entry.id === "string" ? entry.id : "";
    if (!id || seen.has(id) || !known.has(id)) return null;
    seen.add(id);
    return known.get(id);
  }).filter(Boolean);
  if (!selected.length) return null;

  const state = normalizeMapViewState(filters, all);
  const categoryLabels = { all: "Todas las capas", locality: "Localidades", opportunity: "Tesis de oportunidad" };
  const evidenceLabels = { all: "Todos los niveles", documented: "Contextos con fuente pública", hypothesis: "Hipótesis de prospección" };
  const filterLabels = [];
  if (state.query) filterLabels.push("Búsqueda: " + state.query);
  if (state.category !== "all") filterLabels.push("Tipo: " + categoryLabels[state.category]);
  if (state.kind !== "all") filterLabels.push("Sector: " + (kindLabel[state.kind] || state.kind));
  if (state.evidence !== "all") filterLabels.push("Evidencia: " + evidenceLabels[state.evidence]);
  if (state.ref) {
    const selectedReference = selected.find(item => item.id === state.ref);
    if (selectedReference) filterLabels.push("Referencia destacada: " + selectedReference.name);
  }
  if (!filterLabels.length) filterLabels.push("Inventario completo · sin filtros adicionales");

  const references = selected.map((item, index) => {
    const isLocality = item.type === "locality";
    const latitude = Number(item.lat);
    const longitude = Number(item.lng);
    return {
      index: index + 1,
      id: item.id,
      name: item.name,
      type: item.type,
      classification: isLocality
        ? { value: "locality", label: "Localidad · referencia territorial" }
        : {
            value: item.stage,
            label: item.stage === "hypothesis" ? "Hipótesis de prospección" : "Contexto con fuente pública"
          },
      category: isLocality ? "Localidad" : (kindLabel[item.kind] || "Tesis territorial"),
      coordinates: {
        latitude: Number.isFinite(latitude) ? latitude : null,
        longitude: Number.isFinite(longitude) ? longitude : null,
        scope: isLocality
          ? "Centro aproximado de localidad; no identifica una parcela."
          : "Centro aproximado de corredor o área; no identifica una parcela."
      },
      lineToInvestigate: isLocality ? String(item.info || "") : String(item.business || ""),
      evidence: isLocality
        ? "Referencia geográfica de localidad; no es una evaluación parcelaria."
        : String(item.evidence || ""),
      verificationStatus: isLocality
        ? "No identifica un inmueble ni acredita titularidad o disponibilidad."
        : String(item.status || ""),
      nextStep: isLocality
        ? "Definir un área concreta y reunir información catastral, urbanística y de servicios."
        : String(item.next || ""),
      sourceUrl: safeTerritorialSource(item.source)
    };
  });

  const counts = countInventory(selected);
  const timestamp = typeof generatedAt === "string" && Number.isFinite(Date.parse(generatedAt))
    ? new Date(generatedAt).toISOString()
    : new Date().toISOString();
  const title = state.kind !== "all"
    ? "Dossier sectorial · " + (kindLabel[state.kind] || state.kind)
    : (state.category !== "all" || state.evidence !== "all" || state.query
      ? "Dossier de selección territorial"
      : "Dossier territorial · Moreno");

  return {
    schema: "moreno.territorial-dossier",
    schemaVersion: 1,
    generatedAt: timestamp,
    title,
    filters: state,
    filterLabels,
    counts,
    references,
    disclaimers: [
      "Este dossier organiza referencias territoriales visibles en el Mapa IA; no identifica ni ofrece inmuebles.",
      "Las coordenadas son aproximadas y no representan parcelas, límites administrativos ni geometrías catastrales.",
      "Una fuente pública o una publicación de un operador no equivale a verificación independiente, vigencia normativa ni disponibilidad.",
      "No constituye tasación, oferta, estudio de factibilidad, certificación urbanística ni recomendación de inversión.",
      "La bitácora local de diligencia, los datos del navegador y los expedientes internos no se incorporan al documento."
    ]
  };
}

function buildTerritorialDossierDiagram(references) {
  const points = (Array.isArray(references) ? references : []).filter(reference =>
    reference && reference.coordinates &&
    Number.isFinite(reference.coordinates.latitude) &&
    Number.isFinite(reference.coordinates.longitude)
  );
  if (!points.length) return '<p class="muted">No hay coordenadas de referencia disponibles para esta selección.</p>';
  const longitudes = points.map(point => point.coordinates.longitude);
  const latitudes = points.map(point => point.coordinates.latitude);
  const minLng = Math.min.apply(null, longitudes);
  const maxLng = Math.max.apply(null, longitudes);
  const minLat = Math.min.apply(null, latitudes);
  const maxLat = Math.max.apply(null, latitudes);
  const lngRange = Math.max(maxLng - minLng, 0.0001);
  const latRange = Math.max(maxLat - minLat, 0.0001);
  const marks = points.map(reference => {
    const x = 74 + ((reference.coordinates.longitude - minLng) / lngRange) * 852;
    const y = 54 + ((maxLat - reference.coordinates.latitude) / latRange) * 252;
    const cx = Math.round(x);
    const cy = Math.round(y);
    const number = String(reference.index).padStart(2, "0");
    let shape = "";
    if (reference.type === "locality") {
      shape = '<circle cx="' + cx + '" cy="' + cy + '" r="12" class="schematic-locality"/>';
    } else if (reference.classification.value === "hypothesis") {
      shape = '<path d="M ' + cx + " " + (cy - 14) + " L " + (cx + 14) + " " + cy + " L " + cx + " " + (cy + 14) + " L " + (cx - 14) + " " + cy + ' Z" class="schematic-hypothesis"/>';
    } else {
      shape = '<rect x="' + (cx - 11) + '" y="' + (cy - 11) + '" width="22" height="22" class="schematic-documented"/>';
    }
    return '<g><title>' + escapeTerritorialHtml(number + " · " + reference.name) + '</title>' +
      shape + '<text x="' + cx + '" y="' + (cy + 4) + '" class="schematic-number">' + number + '</text></g>';
  }).join("");
  return '<svg class="dossier-schematic" viewBox="0 0 1000 360" role="img" aria-labelledby="dossier-map-title dossier-map-desc" xmlns="http://www.w3.org/2000/svg">' +
    '<title id="dossier-map-title">Distribución relativa de referencias seleccionadas</title>' +
    '<desc id="dossier-map-desc">Esquema construido con las coordenadas aproximadas de las fichas. No es cartografía oficial, no tiene escala y no representa parcelas ni límites municipales.</desc>' +
    '<rect x="1" y="1" width="998" height="358" class="schematic-frame"/>' +
    '<g class="schematic-grid"><path d="M250 1V359M500 1V359M750 1V359M1 90H999M1 180H999M1 270H999"/></g>' +
    '<text x="24" y="28" class="schematic-direction">NORTE ↑</text><text x="976" y="338" text-anchor="end" class="schematic-direction">ESTE →</text>' +
    marks +
    '</svg>';
}

function buildTerritorialDossierHtml(dossier) {
  if (!dossier || dossier.schema !== "moreno.territorial-dossier" ||
      dossier.schemaVersion !== 1 || !Array.isArray(dossier.references) ||
      !dossier.references.length || dossier.references.length > 100) return "";
  const dateLabel = escapeTerritorialHtml(String(dossier.generatedAt || "").slice(0, 10));
  const title = escapeTerritorialHtml(dossier.title || "Dossier territorial · Moreno");
  const counts = dossier.counts || {};
  const filterMarkup = (Array.isArray(dossier.filterLabels) ? dossier.filterLabels : [])
    .map(label => '<li>' + escapeTerritorialHtml(label) + '</li>').join("");
  const indexMarkup = dossier.references.map(reference =>
    '<li><span>' + String(Number(reference.index) || 0).padStart(2, "0") + '</span><strong>' +
    escapeTerritorialHtml(reference.name) + '</strong><small>' +
    escapeTerritorialHtml(reference.classification && reference.classification.label || "Referencia territorial") +
    '</small></li>'
  ).join("");
  const referenceMarkup = dossier.references.map(reference => {
    const coordinates = reference.coordinates || {};
    const coordinateText = Number.isFinite(coordinates.latitude) && Number.isFinite(coordinates.longitude)
      ? coordinates.latitude.toFixed(5) + ", " + coordinates.longitude.toFixed(5)
      : "No informadas";
    const source = safeTerritorialSource(reference.sourceUrl);
    const sourceMarkup = source
      ? '<a href="' + escapeTerritorialHtml(source) + '" target="_blank" rel="noopener noreferrer">Consultar fuente original ↗</a>'
      : '<span class="muted">No hay una fuente enlazada para esta referencia.</span>';
    return '<article class="reference-card">' +
      '<header><span class="reference-number">' + String(Number(reference.index) || 0).padStart(2, "0") + '</span><div>' +
      '<p class="eyebrow">' + escapeTerritorialHtml(reference.classification && reference.classification.label || "Referencia territorial") +
      ' · ' + escapeTerritorialHtml(reference.category || "") + '</p><h2>' +
      escapeTerritorialHtml(reference.name) + '</h2></div></header>' +
      '<div class="reference-grid">' +
      '<section><h3>Línea a investigar</h3><p>' + escapeTerritorialHtml(reference.lineToInvestigate) + '</p></section>' +
      '<section><h3>Evidencia registrada</h3><p>' + escapeTerritorialHtml(reference.evidence) + '</p></section>' +
      '<section><h3>Estado de verificación</h3><p>' + escapeTerritorialHtml(reference.verificationStatus) + '</p></section>' +
      '<section><h3>Próximo paso</h3><p>' + escapeTerritorialHtml(reference.nextStep) + '</p></section>' +
      '<section><h3>Coordenada orientativa</h3><p class="coordinate">' + escapeTerritorialHtml(coordinateText) + '</p><p class="muted">' +
      escapeTerritorialHtml(coordinates.scope || "Referencia aproximada; no parcelaria.") + '</p></section>' +
      '<section><h3>Fuente de origen</h3><p class="source-link">' + sourceMarkup + '</p><p class="muted">Revisar el documento original, su alcance y su vigencia antes de utilizarlo en una evaluación.</p></section>' +
      '</div></article>';
  }).join("");
  const disclaimerMarkup = (Array.isArray(dossier.disclaimers) ? dossier.disclaimers : [])
    .map(note => '<li>' + escapeTerritorialHtml(note) + '</li>').join("");
  const diagram = buildTerritorialDossierDiagram(dossier.references);
  const total = Number(counts.total) || dossier.references.length;
  return '<!doctype html><html lang="es-AR"><head><meta charset="utf-8">' +
    '<meta name="viewport" content="width=device-width,initial-scale=1">' +
    '<meta name="robots" content="noindex,nofollow,noarchive">' +
    '<title>' + title + '</title><style>' +
    '@page{size:A4;margin:14mm}' +
    ':root{color-scheme:light;--ink:#292e2a;--muted:#696b63;--line:#c9c5b9;--paper:#fbfaf6;--rust:#8b5b43}' +
    '*{box-sizing:border-box}body{margin:0;padding:24px;background:#e9e6dd;color:var(--ink);font:11px/1.65 Arial,sans-serif}' +
    '.sheet{max-width:210mm;margin:0 auto 22px;padding:15mm;background:var(--paper);box-shadow:0 8px 30px #20282018}' +
    '.cover{min-height:265mm;display:flex;flex-direction:column;justify-content:space-between;break-after:page}' +
    '.topline{display:flex;justify-content:space-between;gap:18px;padding-bottom:12px;border-bottom:2px solid var(--ink);font-size:8px;letter-spacing:.16em;text-transform:uppercase}' +
    '.eyebrow{margin:0;color:var(--rust);font-size:8px;font-weight:700;letter-spacing:.16em;text-transform:uppercase}' +
    'h1{max-width:700px;margin:24px 0 12px;font:400 43px/1.02 Georgia,serif;letter-spacing:-.04em}' +
    '.cover-copy{max-width:560px;color:var(--muted);font:17px/1.5 Georgia,serif}' +
    '.cover-stats{display:grid;grid-template-columns:repeat(4,1fr);border-top:1px solid var(--line);border-bottom:1px solid var(--line)}' +
    '.cover-stat{padding:14px 10px 14px 0;border-right:1px solid var(--line)}.cover-stat:last-child{border:0}' +
    '.cover-stat strong{display:block;font:400 29px/1 Georgia,serif}.cover-stat span{display:block;margin-top:7px;color:var(--muted);font-size:8px;text-transform:uppercase;letter-spacing:.1em}' +
    '.filter-list{display:flex;flex-wrap:wrap;gap:7px;margin:14px 0 0;padding:0;list-style:none}.filter-list li{padding:5px 8px;border:1px solid var(--line);font-size:8px}' +
    '.map-page{break-after:page}.section-title{margin:0 0 10px;font:400 25px/1.1 Georgia,serif}' +
    '.schematic-frame{fill:#f4f1e8;stroke:#bdb9ad;stroke-width:1}.schematic-grid{fill:none;stroke:#d5d1c6;stroke-width:1}' +
    '.dossier-schematic{display:block;width:100%;height:auto;margin:18px 0 10px}.schematic-locality,.schematic-documented,.schematic-hypothesis{fill:#f7f5ed;stroke:#343a33;stroke-width:2}' +
    '.schematic-hypothesis{stroke-dasharray:3 2}.schematic-number{fill:#343a33;text-anchor:middle;font:700 8px Arial,sans-serif}.schematic-direction{fill:#6c6d64;font:700 9px Arial,sans-serif;letter-spacing:1px}' +
    '.diagram-legend{display:flex;flex-wrap:wrap;gap:12px;margin:10px 0 16px;color:var(--muted);font-size:9px}.legend-mark{display:inline-block;width:9px;height:9px;margin-right:5px;border:1.5px solid var(--ink);vertical-align:middle}.legend-circle{border-radius:50%}.legend-diamond{transform:rotate(45deg);border-style:dashed}' +
    '.index-list{display:grid;grid-template-columns:1fr 1fr;gap:0 18px;margin:12px 0;padding:0;list-style:none}.index-list li{display:grid;grid-template-columns:28px 1fr;gap:2px 8px;padding:8px 0;border-bottom:1px solid var(--line)}.index-list li>span{grid-row:span 2;color:var(--rust);font:15px Georgia,serif}.index-list strong{font-size:10px}.index-list small{color:var(--muted);font-size:8px}' +
    '.reference-card{padding:18px 0;border-top:1px solid var(--ink);break-inside:avoid;page-break-inside:avoid}.reference-card header{display:flex;align-items:flex-start;gap:13px;margin-bottom:13px}.reference-number{flex:0 0 34px;color:var(--rust);font:400 26px/1 Georgia,serif}.reference-card h2{margin:4px 0 0;font:400 24px/1.08 Georgia,serif}.reference-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px 22px}.reference-grid section{break-inside:avoid}.reference-grid h3{margin:0 0 5px;padding-bottom:4px;border-bottom:1px solid var(--line);font:700 8px/1.4 Arial,sans-serif;letter-spacing:.12em;text-transform:uppercase}.reference-grid p{margin:0 0 5px}.coordinate{font-family:monospace}.source-link{overflow-wrap:anywhere}.muted{color:var(--muted)}a{color:#79523d;text-decoration-thickness:1px;text-underline-offset:3px}' +
    '.caution{margin-top:18px;padding:12px 14px;border-left:3px solid var(--rust);background:#efede5}.caution ul{margin:6px 0 0;padding-left:17px}.caution li{margin:3px 0}.print-control{display:block;margin:0 auto 14px;padding:10px 15px;border:1px solid var(--ink);background:var(--ink);color:#fff;font-weight:700;cursor:pointer}' +
    'footer{margin-top:20px;padding-top:10px;border-top:1px solid var(--ink);color:var(--muted);font-size:8px;letter-spacing:.04em}' +
    '@media(max-width:700px){body{padding:0}.sheet{min-height:0;margin:0 0 12px;padding:22px}.cover{min-height:85vh}.cover-stats{grid-template-columns:1fr 1fr}.cover-stat:nth-child(2){border-right:0}.cover-stat:nth-child(-n+2){border-bottom:1px solid var(--line)}.index-list,.reference-grid{grid-template-columns:1fr}h1{font-size:34px}}' +
    '@media print{body{padding:0;background:#fff}.sheet{max-width:none;margin:0;padding:0;box-shadow:none}.cover{min-height:255mm;break-after:page}.map-page{break-after:page}.print-control{display:none}a{color:inherit;text-decoration:none}}' +
    '</style></head><body><button class="print-control" type="button" onclick="window.print()">Imprimir / guardar como PDF</button>' +
    '<main><section class="sheet cover"><div><div class="topline"><strong>MORENO · INTELIGENCIA TERRITORIAL</strong><span>Documento de trabajo · ' + dateLabel + '</span></div>' +
    '<p class="eyebrow" style="margin-top:26px">Lectura territorial · ' + total + ' referencias seleccionadas</p><h1>' + title + '</h1>' +
    '<p class="cover-copy">Una síntesis de las referencias visibles en el Mapa IA para ordenar una conversación de prospección. La selección no constituye un inventario de inmuebles ni acredita disponibilidad.</p></div>' +
    '<div><div class="cover-stats"><div class="cover-stat"><strong>' + String(Number(counts.localities) || 0).padStart(2, "0") + '</strong><span>Localidades</span></div>' +
    '<div class="cover-stat"><strong>' + String(Number(counts.documented) || 0).padStart(2, "0") + '</strong><span>Contextos con fuente</span></div>' +
    '<div class="cover-stat"><strong>' + String(Number(counts.hypotheses) || 0).padStart(2, "0") + '</strong><span>Hipótesis</span></div>' +
    '<div class="cover-stat"><strong>' + total + '</strong><span>Referencias incluidas</span></div></div>' +
    '<p class="eyebrow" style="margin-top:18px">Criterios de selección</p><ul class="filter-list">' + filterMarkup + '</ul>' +
    '<footer>ERICA M. ACOSTA · MORENO · Generado localmente desde la vista filtrada del inventario.</footer></div></section>' +
    '<section class="sheet map-page"><p class="eyebrow">Lámina de conjunto · esquema sin escala</p><h2 class="section-title">Distribución relativa de las referencias.</h2>' +
    '<p class="muted">Los puntos se ordenan únicamente por sus coordenadas aproximadas. El esquema no contiene cartografía base, límites municipales, calles ni geometrías parcelarias.</p>' +
    diagram +
    '<div class="diagram-legend"><span><i class="legend-mark legend-circle"></i> Localidad</span><span><i class="legend-mark"></i> Contexto con fuente</span><span><i class="legend-mark legend-diamond"></i> Hipótesis</span></div>' +
    '<h2 class="section-title">Índice de referencias.</h2><ol class="index-list">' + indexMarkup + '</ol>' +
    '<div class="caution"><strong>Alcance de esta lámina</strong><ul><li>Es un esquema relativo, no un mapa oficial ni un plano a escala.</li><li>Los números identifican las referencias del índice; no representan parcelas ni predios disponibles.</li><li>Las coordenadas no sustituyen la individualización catastral ni la consulta de normativa vigente.</li></ul></div></section>' +
    '<section class="sheet"><p class="eyebrow">Fichas de referencia · ' + total + ' registros</p><h2 class="section-title">Evidencia, estado y próximos pasos.</h2>' +
    referenceMarkup +
    '<div class="caution"><strong>Advertencias de uso</strong><ul>' + disclaimerMarkup + '</ul></div>' +
    '<footer>Documento de trabajo de MORENO · Las fuentes externas deben consultarse en origen y contrastarse antes de cualquier decisión o presentación como antecedente de una operación.</footer></section></main></body></html>';
}



function initResponsiveDisclosures(doc) {
  const view = doc && doc.defaultView;
  if (!view || typeof view.matchMedia !== "function") return;
  const media = view.matchMedia("(max-width: 760px)");
  const disclosures = Array.from(doc.querySelectorAll("details[data-mobile-collapsible]"));
  if (!disclosures.length) return;
  const mobileStates = new WeakMap();

  disclosures.forEach(disclosure => {
    const summary = disclosure.querySelector("summary");
    if (summary) {
      summary.addEventListener("click", () => {
        if (media.matches) mobileStates.set(disclosure, !disclosure.open);
      });
    }
  });

  const applyViewportDefault = isMobile => {
    disclosures.forEach(disclosure => {
      if (!isMobile) disclosure.open = true;
      else disclosure.open = mobileStates.has(disclosure) ? mobileStates.get(disclosure) : false;
    });
  };

  applyViewportDefault(media.matches);
  if (typeof media.addEventListener === "function") {
    media.addEventListener("change", event => applyViewportDefault(event.matches));
  } else if (typeof media.addListener === "function") {
    media.addListener(event => applyViewportDefault(event.matches));
  }
}

function initMapPage(doc) {
  const mapElement = doc.getElementById("map");
  if (!mapElement) return;
  initResponsiveDisclosures(doc);

  const statusElement = doc.getElementById("map-status");
  const boundaryElement = doc.getElementById("boundary-status");
  const searchInput = doc.getElementById("search");
  const categoryInput = doc.getElementById("category");
  const kindInput = doc.getElementById("kind-filter");
  const evidenceInput = doc.getElementById("evidence-filter");
  const shareViewButton = doc.getElementById("share-map-view");
  const shareViewStatus = doc.getElementById("map-share-status");
  const shareFallbackWrap = doc.getElementById("map-share-fallback-wrap");
  const shareFallbackInput = doc.getElementById("map-share-url");
  const dossierExportButton = doc.getElementById("export-dossier");
  const dossierStatusElement = doc.getElementById("dossier-status");
  const localityList = doc.getElementById("locality-list");
  const opportunityList = doc.getElementById("opportunity-list");
  const exportButton = doc.getElementById("export-csv");
  const geoJsonExportButton = doc.getElementById("export-geojson");
  const reviewExportButton = doc.getElementById("export-review");
  const reviewImportButton = doc.getElementById("import-review");
  const reviewImportInput = doc.getElementById("import-review-file");
  const reviewClearButton = doc.getElementById("clear-review");
  const reviewStatusElement = doc.getElementById("review-status");
  const atlasCounts = {
    localities: doc.getElementById("atlas-localities-count"),
    documented: doc.getElementById("atlas-documented-count"),
    hypotheses: doc.getElementById("atlas-hypotheses-count"),
    total: doc.getElementById("atlas-total-count"),
    status: doc.getElementById("atlas-index-status"),
    summary: doc.getElementById("atlas-index-summary")
  };
  const markers = new Map();
  let map = null;
  let visibleItems = all;
  let reviewStorage = null;
  try {
    reviewStorage = doc.defaultView ? doc.defaultView.localStorage : null;
  } catch (error) {
    reviewStorage = null;
  }
  let reviewState = readReviewState(reviewStorage, opportunities);
  let reviewImportSequence = 0;
  reviewStatusElement.textContent = reviewStorage
    ? "Las marcas se guardan en este navegador; no se envían al servidor."
    : "El almacenamiento local no está disponible; exportá la bitácora para conservar las marcas mientras trabajás.";
  const initialViewState = parseMapViewState(
    doc.defaultView && doc.defaultView.location ? doc.defaultView.location.search : "",
    all
  );
  searchInput.value = initialViewState.query;
  categoryInput.value = initialViewState.category;
  kindInput.value = initialViewState.kind;
  evidenceInput.value = initialViewState.evidence;
  let selectedReferenceId = initialViewState.ref;
  let userHasNavigated = false;

  let staticFallbackActive = false;

  function renderStaticFallback(items) {
    const visible = Array.isArray(items) ? items : all;
    const container = doc.createElement("section");
    container.className = "map-static-fallback";
    container.setAttribute("aria-label", "Esquema territorial alternativo");

    const heading = doc.createElement("header");
    heading.className = "map-static-fallback-head";
    const eyebrow = doc.createElement("span");
    eyebrow.className = "map-static-kicker";
    eyebrow.textContent = "ESQUEMA TERRITORIAL / REFERENCIAS APROXIMADAS";
    const title = doc.createElement("h3");
    title.textContent = "Moreno, en relación.";
    const explanation = doc.createElement("p");
    explanation.className = "map-static-message";
    explanation.textContent = fallbackMessage;
    heading.append(eyebrow, title, explanation);

    const svgNamespace = "http://www.w3.org/2000/svg";
    const svg = doc.createElementNS(svgNamespace, "svg");
    svg.setAttribute("class", "map-static-diagram");
    svg.setAttribute("viewBox", "0 0 960 420");
    svg.setAttribute("role", "img");
    svg.setAttribute("aria-labelledby", "map-static-title map-static-desc");
    const svgTitle = doc.createElementNS(svgNamespace, "title");
    svgTitle.setAttribute("id", "map-static-title");
    svgTitle.textContent = "Distribución relativa de las referencias territoriales visibles";
    const svgDescription = doc.createElementNS(svgNamespace, "desc");
    svgDescription.setAttribute("id", "map-static-desc");
    svgDescription.textContent = "Esquema construido con coordenadas aproximadas del inventario. No es cartografía oficial, no tiene escala y no representa calles, límites ni parcelas.";
    const background = doc.createElementNS(svgNamespace, "rect");
    background.setAttribute("class", "map-static-frame");
    background.setAttribute("x", "1");
    background.setAttribute("y", "1");
    background.setAttribute("width", "958");
    background.setAttribute("height", "418");
    const grid = doc.createElementNS(svgNamespace, "path");
    grid.setAttribute("class", "map-static-grid");
    grid.setAttribute("d", "M240 1V419M480 1V419M720 1V419M1 105H959M1 210H959M1 315H959");
    const markerLayer = doc.createElementNS(svgNamespace, "g");
    markerLayer.setAttribute("class", "map-static-markers");

    const longitudes = all.map(item => Number(item.lng));
    const latitudes = all.map(item => Number(item.lat));
    const minLng = Math.min(...longitudes);
    const maxLng = Math.max(...longitudes);
    const minLat = Math.min(...latitudes);
    const maxLat = Math.max(...latitudes);
    const lngRange = Math.max(maxLng - minLng, 0.0001);
    const latRange = Math.max(maxLat - minLat, 0.0001);

    visible.forEach(item => {
      const x = 64 + ((Number(item.lng) - minLng) / lngRange) * 832;
      const y = 42 + ((maxLat - Number(item.lat)) / latRange) * 330;
      const group = doc.createElementNS(svgNamespace, "g");
      const markerClass = item.type === "locality"
        ? "map-static-marker map-static-marker-locality"
        : (item.stage === "hypothesis"
          ? "map-static-marker map-static-marker-hypothesis"
          : "map-static-marker map-static-marker-documented");
      group.setAttribute("class", markerClass);
      group.setAttribute("data-static-map-reference", item.id);
      group.classList.toggle("is-selected", selectedReferenceId === item.id);

      const markerTitle = doc.createElementNS(svgNamespace, "title");
      const index = all.findIndex(entry => entry.id === item.id) + 1;
      const number = String(index).padStart(2, "0");
      markerTitle.textContent = number + " · " + item.name;
      group.append(markerTitle);

      if (item.type === "locality") {
        const shape = doc.createElementNS(svgNamespace, "circle");
        shape.setAttribute("cx", String(x));
        shape.setAttribute("cy", String(y));
        shape.setAttribute("r", "11");
        group.append(shape);
      } else if (item.stage === "hypothesis") {
        const shape = doc.createElementNS(svgNamespace, "path");
        shape.setAttribute("d", "M " + x + " " + (y - 14) + " L " + (x + 14) + " " + y + " L " + x + " " + (y + 14) + " L " + (x - 14) + " " + y + " Z");
        group.append(shape);
      } else {
        const shape = doc.createElementNS(svgNamespace, "rect");
        shape.setAttribute("x", String(x - 10));
        shape.setAttribute("y", String(y - 10));
        shape.setAttribute("width", "20");
        shape.setAttribute("height", "20");
        group.append(shape);
      }

      const label = doc.createElementNS(svgNamespace, "text");
      label.setAttribute("x", String(x));
      label.setAttribute("y", String(y + 4));
      label.setAttribute("text-anchor", "middle");
      label.textContent = number;
      group.append(label);
      markerLayer.append(group);
    });

    const north = doc.createElementNS(svgNamespace, "text");
    north.setAttribute("class", "map-static-direction");
    north.setAttribute("x", "930");
    north.setAttribute("y", "26");
    north.setAttribute("text-anchor", "end");
    north.textContent = "NORTE ↑";
    svg.append(svgTitle, svgDescription, background, grid, markerLayer, north);

    const indexHeading = doc.createElement("h4");
    indexHeading.className = "map-static-index-title";
    indexHeading.textContent = "Referencias visibles · seleccioná una para abrir su ficha";
    const index = doc.createElement("ol");
    index.className = "map-static-index";
    if (!visible.length) {
      const empty = doc.createElement("li");
      empty.className = "map-static-empty";
      empty.textContent = "No hay referencias que coincidan con los filtros actuales.";
      index.append(empty);
    }

    visible.forEach(item => {
      const listItem = doc.createElement("li");
      const button = doc.createElement("button");
      button.type = "button";
      button.className = "map-static-index-button";
      button.dataset.fallbackReference = item.id;
      button.setAttribute("aria-pressed", String(selectedReferenceId === item.id));
      const number = doc.createElement("span");
      number.className = "map-static-index-number";
      number.textContent = String(all.findIndex(entry => entry.id === item.id) + 1).padStart(2, "0");
      const name = doc.createElement("strong");
      name.textContent = item.name;
      const meta = doc.createElement("small");
      meta.textContent = item.type === "locality"
        ? "Localidad · referencia territorial"
        : ((item.stage === "hypothesis" ? "Hipótesis de prospección" : "Contexto con fuente pública") +
          " · " + (kindLabel[item.kind] || "Tesis territorial"));
      button.append(number, name, meta);
      button.setAttribute("aria-label", "Seleccionar referencia " + item.name);
      button.addEventListener("click", () => setActiveReference(item, { reveal: true, scroll: true }));
      listItem.append(button);
      index.append(listItem);
    });

    const note = doc.createElement("p");
    note.className = "map-static-note";
    note.textContent = "Este esquema conserva la relación espacial aproximada de las fichas sin depender de teselas externas. No muestra calles ni límites administrativos, no tiene escala y no representa parcelas.";
    container.append(heading, svg, indexHeading, index, note);
    mapElement.replaceChildren(container);
  }

  let fallbackMessage = "La cartografía interactiva no está disponible. Se conserva el inventario en un esquema local.";
  function showFallback(message) {
    staticFallbackActive = true;
    mapElement.classList.add("is-static-fallback");
    fallbackMessage = String(message || fallbackMessage);
    markers.forEach(marker => {
      try { marker.remove(); } catch (error) {}
    });
    markers.clear();
    const activeMap = map;
    map = null;
    if (activeMap) {
      try { activeMap.remove(); } catch (error) {}
    }
    renderStaticFallback(visibleItems);
    statusElement.textContent = "Esquema territorial alternativo · fichas de investigación activas";
    boundaryElement.textContent = "Límite municipal: no representado en el esquema";
  }

  function popupNode(item) {
    const box = doc.createElement("div");
    const addLine = (label, value) => {
      const paragraph = doc.createElement("p");
      const strong = doc.createElement("strong");
      strong.textContent = label + " ";
      paragraph.append(strong, doc.createTextNode(value));
      box.append(paragraph);
    };
    const title = doc.createElement("h3");
    title.textContent = item.name;
    box.append(title);
    if (item.type === "locality") {
      addLine("Lectura:", item.info);
      box.append(contactLinkNode(item, "map-contact-link"));
      return box;
    }
    const stage = doc.createElement("small");
    stage.textContent =
      (item.stage === "hypothesis" ? "Hipótesis de prospección" : "Contexto con fuente pública") +
      " · " + (kindLabel[item.kind] || "Tesis territorial");
    box.prepend(stage);
    addLine("Línea a investigar:", item.business);
    addLine("Qué sabemos:", item.evidence);
    addLine("Estado:", item.status);
    addLine("Siguiente paso:", item.next);
    const link = doc.createElement("a");
    link.href = item.source;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = "Consultar fuente pública ↗";
    box.append(link);
    const note = doc.createElement("p");
    note.textContent = "Área/corredor aproximado. No representa una parcela ni acredita disponibilidad.";
    box.append(note);
    const shareLink = doc.createElement("a");
    shareLink.href = buildReferenceUrl(doc.defaultView.location.href, item.id);
    shareLink.target = "_blank";
    shareLink.rel = "noopener noreferrer";
    shareLink.textContent = "Abrir ficha compartible ↗";
    box.append(shareLink, contactLinkNode(item, "map-contact-link"));
    return box;
  }

  function contactLinkNode(item, className) {
    const link = doc.createElement("a");
    link.className = className;
    link.href = buildOpportunityContactUrl(doc.baseURI || doc.defaultView.location.href, item);
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = referenceContactLabel(item);
    link.setAttribute("aria-label", referenceContactLabel(item) + " · " + item.name);
    return link;
  }

  function currentMapViewState(referenceId) {
    return {
      query: searchInput.value,
      category: categoryInput.value,
      kind: kindInput.value,
      evidence: evidenceInput.value,
      ref: typeof referenceId === "undefined" ? selectedReferenceId : referenceId
    };
  }

  function updateShareUrl(referenceId) {
    const view = doc.defaultView;
    if (!view || !view.location || !view.history || typeof view.history.replaceState !== "function") return "";
    const url = buildMapViewUrl(view.location.href, currentMapViewState(referenceId), all);
    view.history.replaceState(null, "", url);
    return url;
  }

  function showManualShareUrl(url) {
    shareFallbackWrap.hidden = false;
    shareFallbackInput.value = url;
    shareFallbackInput.focus();
    shareFallbackInput.select();
    shareViewStatus.textContent = "Copiá el enlace seleccionado para compartir esta vista.";
  }

  function copyShareUrl(url) {
    const view = doc.defaultView;
    const clipboard = view && view.navigator && view.navigator.clipboard;
    if (clipboard && typeof clipboard.writeText === "function") {
      clipboard.writeText(url).then(() => {
        shareFallbackWrap.hidden = true;
        shareViewStatus.textContent = "Enlace de la vista copiado.";
      }).catch(() => showManualShareUrl(url));
      return;
    }
    showManualShareUrl(url);
  }

  function shareCurrentView() {
    const view = doc.defaultView;
    const url = updateShareUrl();
    if (!view || !url) return;
    const shareData = {
      title: "Mapa IA de Moreno · MORENO",
      text: "Vista territorial filtrada. Las referencias no acreditan disponibilidad inmobiliaria.",
      url
    };
    if (view.navigator && typeof view.navigator.share === "function") {
      try {
        view.navigator.share(shareData).then(() => {
          shareViewStatus.textContent = "Vista compartida.";
        }).catch(error => {
          if (!error || error.name !== "AbortError") copyShareUrl(url);
        });
        return;
      } catch (error) {
        copyShareUrl(url);
        return;
      }
    }
    copyShareUrl(url);
  }

  function setActiveReference(item, options) {
    const settings = options || {};
    selectedReferenceId = item.id;
    updateShareUrl(item.id);
    markers.forEach((marker, id) => {
      marker.getElement().classList.toggle("is-selected", id === item.id);
    });
    if (staticFallbackActive) {
      mapElement.querySelectorAll("[data-static-map-reference]").forEach(marker => {
        marker.classList.toggle("is-selected", marker.getAttribute("data-static-map-reference") === item.id);
      });
      mapElement.querySelectorAll("[data-fallback-reference]").forEach(button => {
        button.setAttribute("aria-pressed", String(button.dataset.fallbackReference === item.id));
      });
    }
    [localityList, opportunityList].forEach(list => {
      list.querySelectorAll("[data-map-item]").forEach(card => {
        const selected = card.dataset.mapItem === item.id;
        card.classList.toggle("is-active", selected);
        if (selected && settings.reveal) card.open = true;
        if (selected && settings.scroll) {
          const reduceMotion = doc.defaultView &&
            typeof doc.defaultView.matchMedia === "function" &&
            doc.defaultView.matchMedia("(prefers-reduced-motion: reduce)").matches;
          card.scrollIntoView({
            behavior: reduceMotion ? "auto" : "smooth",
            block: "nearest"
          });
        }
      });
    });
    statusElement.textContent = "Referencia seleccionada: " + item.name;
  }

  function focusItem(item) {
    const marker = markers.get(item.id);
    if (!map || !marker) return;
    setActiveReference(item, { reveal: true });
    const camera = { center: [item.lng, item.lat], zoom: 14 };
    if (prefersReducedMotion(doc.defaultView)) map.jumpTo(camera);
    else map.flyTo({ ...camera, essential: true });
    const popup = marker.getPopup();
    if (popup && !popup.isOpen()) marker.togglePopup();
  }


  function updateReviewProgress(progressElement, item) {
    const summary = getReviewSummary(reviewState, item.id);
    progressElement.textContent = summary.completed + " de " + summary.total + " revisiones documentadas";
  }

  function reviewPanelNode(item) {
    const panel = doc.createElement("section");
    panel.className = "map-review-panel";
    const title = doc.createElement("h4");
    title.textContent = "Bitácora de verificación";
    const intro = doc.createElement("p");
    intro.className = "map-review-intro";
    intro.textContent = "Para marcar una revisión como registrada, completá una fuente o documento y la fecha de consulta. No ingreses datos personales ni documentación confidencial.";
    const progress = doc.createElement("p");
    progress.className = "map-review-progress";
    progress.setAttribute("role", "status");
    progress.setAttribute("aria-live", "polite");
    updateReviewProgress(progress, item);
    const fieldset = doc.createElement("fieldset");
    fieldset.className = "map-review-checklist";
    const legend = doc.createElement("legend");
    legend.textContent = "Control interno · evidencia y fecha";
    fieldset.append(legend);

    reviewTasks.forEach(task => {
      const saved = reviewState[item.id] && reviewState[item.id][task.id]
        ? reviewState[item.id][task.id]
        : {};
      const row = doc.createElement("div");
      row.className = "map-review-task";
      const checkLabel = doc.createElement("label");
      checkLabel.className = "map-review-check-label";
      const checkbox = doc.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = saved.completed === true;
      checkbox.disabled = !checkbox.checked &&
        !(String(saved.source_document || "").trim().length >= 4 && isValidReviewDate(saved.consulted_at));
      checkbox.setAttribute("aria-label", task.label + " · " + item.name);
      const taskText = doc.createElement("span");
      taskText.textContent = task.label;
      checkLabel.append(checkbox, taskText);

      const fields = doc.createElement("div");
      fields.className = "map-review-fields";
      const sourceLabel = doc.createElement("label");
      sourceLabel.className = "map-review-field";
      const sourceCaption = doc.createElement("span");
      sourceCaption.textContent = "Fuente, documento o folio";
      const sourceInput = doc.createElement("input");
      sourceInput.type = "text";
      sourceInput.maxLength = 240;
      sourceInput.autocomplete = "off";
      sourceInput.placeholder = "Organismo, enlace o identificación del documento";
      sourceInput.value = saved.source_document || "";
      sourceInput.setAttribute("aria-label", "Fuente o documento para " + task.label + " · " + item.name);
      sourceLabel.append(sourceCaption, sourceInput);

      const dateLabel = doc.createElement("label");
      dateLabel.className = "map-review-field map-review-date";
      const dateCaption = doc.createElement("span");
      dateCaption.textContent = "Fecha de consulta";
      const dateInput = doc.createElement("input");
      dateInput.type = "date";
      dateInput.value = saved.consulted_at || "";
      dateInput.setAttribute("aria-label", "Fecha de consulta para " + task.label + " · " + item.name);
      dateLabel.append(dateCaption, dateInput);

      const noteLabel = doc.createElement("label");
      noteLabel.className = "map-review-field map-review-note";
      const noteCaption = doc.createElement("span");
      noteCaption.textContent = "Observación breve (opcional)";
      const noteInput = doc.createElement("textarea");
      noteInput.rows = 2;
      noteInput.maxLength = 500;
      noteInput.value = saved.note || "";
      noteInput.placeholder = "Alcance, artículo, folio o punto pendiente; sin datos personales.";
      noteInput.setAttribute("aria-label", "Observación para " + task.label + " · " + item.name);
      noteLabel.append(noteCaption, noteInput);

      const help = doc.createElement("small");
      help.className = "map-review-help";
      help.textContent = "La revisión cuenta como documentada cuando tiene una fuente de al menos 4 caracteres y una fecha válida.";
      const legacyNotice = doc.createElement("small");
      legacyNotice.className = "map-review-legacy";
      legacyNotice.textContent = "Marca anterior recuperada: completá fuente y fecha para volver a registrarla.";
      legacyNotice.hidden = saved.legacy_marked !== true;

      function persistTaskRecord() {
        const details = {
          source_document: sourceInput.value,
          consulted_at: dateInput.value,
          note: noteInput.value
        };
        const eligible = details.source_document.trim().length >= 4 && isValidReviewDate(details.consulted_at);
        if (!eligible && checkbox.checked) checkbox.checked = false;
        checkbox.disabled = !eligible && !checkbox.checked;
        reviewState = updateReviewState(reviewState, item.id, task.id, checkbox.checked, opportunities, details);
        const current = reviewState[item.id] && reviewState[item.id][task.id];
        legacyNotice.hidden = !(current && current.legacy_marked === true);
        updateReviewProgress(progress, item);
        const savedLocally = writeReviewState(reviewStorage, reviewState, opportunities);
        reviewStatusElement.textContent = savedLocally
          ? "Bitácora actualizada en este navegador; fuente y fecha quedan asociadas a cada revisión."
          : "No se pudo guardar localmente; descargá la bitácora JSON antes de cerrar.";
      }

      checkbox.addEventListener("change", persistTaskRecord);
      sourceInput.addEventListener("input", persistTaskRecord);
      dateInput.addEventListener("change", persistTaskRecord);
      noteInput.addEventListener("input", persistTaskRecord);
      fields.append(sourceLabel, dateLabel, noteLabel, help, legacyNotice);
      row.append(checkLabel, fields);
      fieldset.append(row);
    });
    panel.append(title, intro, progress, fieldset);
    return panel;
  }

  function makeCards(items, target) {
    target.replaceChildren();
    items.forEach(item => {
      const card = doc.createElement("details");
      card.className = "map-item";
      card.dataset.mapItem = item.id;
      if (selectedReferenceId === item.id) {
        card.classList.add("is-active");
        card.open = true;
      }
      const summary = doc.createElement("summary");
      summary.addEventListener("click", () => setActiveReference(item));
      const title = doc.createElement("strong");
      title.textContent = item.name;
      const meta = doc.createElement("span");
      meta.textContent = item.type === "locality"
        ? "Localidad · referencia territorial"
        : ((item.stage === "hypothesis" ? "Hipótesis de prospección" : "Contexto con fuente pública") +
          " · " + (kindLabel[item.kind] || "Tesis territorial"));
      summary.append(title, meta);
      card.append(summary);

      const body = doc.createElement("div");
      body.className = "map-item-body";
      const actions = doc.createElement("div");
      actions.className = "map-item-actions";
      actions.append(contactLinkNode(item, "map-contact-link map-contact-primary"));

      if (item.type === "opportunity") {
        const briefButton = doc.createElement("button");
        briefButton.type = "button";
        briefButton.className = "map-brief-button";
        briefButton.textContent = "Descargar ficha editorial ↧";
        briefButton.setAttribute("aria-label", "Descargar ficha editorial de " + item.name);
        briefButton.addEventListener("click", () => downloadTerritorialBrief(item));
        actions.append(briefButton);
      }

      const shareLink = doc.createElement("a");
      shareLink.className = "map-share-link";
      shareLink.href = buildReferenceUrl(doc.defaultView.location.href, item.id);
      shareLink.target = "_blank";
      shareLink.rel = "noopener noreferrer";
      shareLink.setAttribute("aria-label", "Abrir enlace directo a " + item.name + " en una pestaña nueva");
      shareLink.textContent = "Abrir ficha compartible ↗";
      actions.append(shareLink);

      if (map) {
        const focusButton = doc.createElement("button");
        focusButton.type = "button";
        focusButton.className = "map-focus-button";
        focusButton.textContent = "Ubicar en el mapa";
        focusButton.setAttribute("aria-label", "Centrar el mapa en " + item.name);
        focusButton.addEventListener("click", () => focusItem(item));
        actions.append(focusButton);
      }
      body.append(actions);

      const addDetail = (label, value) => {
        if (!value) return;
        const paragraph = doc.createElement("p");
        const heading = doc.createElement("strong");
        heading.textContent = label;
        paragraph.append(heading, doc.createTextNode(value));
        body.append(paragraph);
      };

      if (item.type === "locality") {
        addDetail("Lectura territorial", item.info);
      } else {
        addDetail("Línea a investigar", item.business);
        addDetail("Qué sabemos", item.evidence);
        addDetail("Estado de verificación", item.status);
        addDetail("Próximo paso", item.next);
        if (item.source) {
          const link = doc.createElement("a");
          link.className = "map-source-link";
          link.href = item.source;
          link.target = "_blank";
          link.rel = "noopener noreferrer";
          link.textContent = "Abrir referencia externa ↗";
          body.append(link);
        }
        body.append(reviewPanelNode(item));
      }

      card.append(body);
      target.append(card);
    });
  }

  function updateAtlasIndex(items) {
    const counts = countInventory(items);
    if (atlasCounts.localities) atlasCounts.localities.textContent = String(counts.localities).padStart(2, "0");
    if (atlasCounts.documented) atlasCounts.documented.textContent = String(counts.documented).padStart(2, "0");
    if (atlasCounts.hypotheses) atlasCounts.hypotheses.textContent = String(counts.hypotheses).padStart(2, "0");
    if (atlasCounts.total) atlasCounts.total.textContent = counts.total + " / " + all.length;
    if (atlasCounts.status) {
      atlasCounts.status.textContent = counts.total + " de " + all.length +
        " referencias visibles · " + counts.localities + " localidades, " +
        counts.documented + " contextos con fuente y " + counts.hypotheses + " hipótesis.";
    }
    if (atlasCounts.summary) {
      atlasCounts.summary.textContent = counts.total + " referencias · " +
        counts.localities + " localidades · " + counts.documented +
        " contextos con fuente · " + counts.hypotheses + " hipótesis";
    }
  }

  function render() {
    const shown = filterReferences(all, {
      query: doc.getElementById("search").value,
      category: doc.getElementById("category").value,
      kind: doc.getElementById("kind-filter").value,
      evidence: doc.getElementById("evidence-filter").value
    });
    visibleItems = shown;
    updateAtlasIndex(shown);
    exportButton.disabled = shown.length === 0;
    geoJsonExportButton.disabled = shown.length === 0;
    dossierExportButton.disabled = shown.length === 0;
    reviewExportButton.disabled = !shown.some(item => item.type === "opportunity");
    if (selectedReferenceId && !shown.some(item => item.id === selectedReferenceId)) {
      selectedReferenceId = null;
      updateShareUrl(null);
      markers.forEach(marker => marker.getElement().classList.remove("is-selected"));
    }
    markers.forEach((marker, id) => {
      const shouldShow = shown.some(item => item.id === id);
      const attached = marker.getElement().isConnected;
      if (shouldShow && !attached) marker.addTo(map);
      if (!shouldShow && attached) marker.remove();
    });
    makeCards(shown.filter(item => item.type === "locality"), localityList);
    makeCards(shown.filter(item => item.type === "opportunity"), opportunityList);
    if (staticFallbackActive) renderStaticFallback(shown);
    const selectedItem = all.find(item => item.id === selectedReferenceId);
    statusElement.textContent = selectedItem
      ? "Enlace directo · " + selectedItem.name
      : shown.length + " referencias visibles · capa exploratoria";
    updateShareUrl();
  }

  function exportVisibleCsv() {
    if (!visibleItems.length) return;
    const view = doc.defaultView;
    const blob = new view.Blob([buildCsv(visibleItems)], { type: "text/csv;charset=utf-8" });
    const url = view.URL.createObjectURL(blob);
    const link = doc.createElement("a");
    link.href = url;
    link.download = "moreno-mapa-ia-referencias.csv";
    doc.body.append(link);
    link.click();
    link.remove();
    view.setTimeout(() => view.URL.revokeObjectURL(url), 1500);
  }

  function exportVisibleGeoJson() {
    if (!visibleItems.length) return;
    const view = doc.defaultView;
    const content = JSON.stringify(buildGeoJson(visibleItems), null, 2);
    const blob = new view.Blob([content], { type: "application/geo+json;charset=utf-8" });
    const url = view.URL.createObjectURL(blob);
    const link = doc.createElement("a");
    link.href = url;
    link.download = "moreno-mapa-ia-referencias.geojson";
    doc.body.append(link);
    link.click();
    link.remove();
    view.setTimeout(() => view.URL.revokeObjectURL(url), 1500);
  }



  function downloadTerritorialDossier() {
    const dossier = buildTerritorialDossier(visibleItems, currentMapViewState(), new Date().toISOString());
    if (!dossier) {
      dossierStatusElement.textContent = "No hay referencias visibles para preparar un dossier.";
      return;
    }
    const content = buildTerritorialDossierHtml(dossier);
    if (!content) {
      dossierStatusElement.textContent = "No se pudo preparar el documento con esta selección.";
      return;
    }
    const view = doc.defaultView;
    const blob = new view.Blob([content], { type: "text/html;charset=utf-8" });
    const url = view.URL.createObjectURL(blob);
    const link = doc.createElement("a");
    link.href = url;
    link.download = dossier.filters.kind === "all"
      ? "moreno-dossier-territorial.html"
      : "moreno-dossier-" + dossier.filters.kind + ".html";
    doc.body.append(link);
    link.click();
    link.remove();
    view.setTimeout(() => view.URL.revokeObjectURL(url), 1500);
    dossierStatusElement.textContent = "Dossier preparado localmente: " + dossier.references.length +
      " referencias. No incluye bitácora, datos del navegador ni expedientes internos.";
  }

  function importReviewFile(file) {
    if (!file) return;
    const requestId = ++reviewImportSequence;
    if (file.size > 1000000) {
      reviewImportInput.value = "";
      reviewStatusElement.removeAttribute("aria-busy");
      reviewStatusElement.textContent = "El archivo supera el límite de 1 MB. Exportá una bitácora más pequeña e intentá nuevamente.";
      return;
    }
    if (typeof file.text !== "function") {
      reviewImportInput.value = "";
      reviewStatusElement.removeAttribute("aria-busy");
      reviewStatusElement.textContent = "Este navegador no permite leer el archivo seleccionado. Podés continuar usando la exportación JSON.";
      return;
    }
    reviewStatusElement.setAttribute("aria-busy", "true");
    reviewStatusElement.textContent = "Leyendo y validando la bitácora JSON…";
    Promise.resolve().then(() => file.text()).then(content => {
      if (requestId !== reviewImportSequence) return;
      const parsed = parseReviewImport(content, opportunities);
      if (!parsed.ok) {
        reviewStatusElement.textContent = parsed.error;
        return;
      }
      const result = mergeReviewStates(reviewState, parsed.state, opportunities);
      reviewState = result.state;
      const saved = writeReviewState(reviewStorage, reviewState, opportunities);
      render();
      const conflictDetails = result.conflicts.slice(0, 3).map(conflict => {
        const reference = opportunities.find(item => item.id === conflict.reference_id);
        const task = reviewTasks.find(item => item.id === conflict.task_id);
        return (reference ? reference.name : conflict.reference_id) + " · " + (task ? task.label : conflict.task_id) + " (" + conflict.fields.join(", ") + ")";
      });
      const conflictText = result.conflicts.length
        ? " Conflictos: " + result.conflicts.length + ". Se conservaron los datos locales en: " + conflictDetails.join("; ") + (result.conflicts.length > conflictDetails.length ? "; y otros." : ".")
        : " No se detectaron conflictos.";
      const ignoredText = parsed.ignoredReferences || parsed.skippedTasks
        ? " Elementos ignorados: " + parsed.ignoredReferences + " referencias y " + parsed.skippedTasks + " tareas desconocidas."
        : "";
      const persistenceText = saved
        ? " Los cambios quedaron guardados en este navegador."
        : " El almacenamiento local no está disponible; los cambios siguen en esta sesión. Exportá la bitácora antes de cerrar.";
      reviewStatusElement.textContent = "Importación revisada: " + result.addedRecords + " registros nuevos y " + result.combinedRecords + " registros combinados." + conflictText + ignoredText + persistenceText;
    }).catch(() => {
      if (requestId !== reviewImportSequence) return;
      reviewStatusElement.textContent = "No se pudo leer el archivo. Verificá que sea un JSON válido y volvé a intentarlo.";
    }).finally(() => {
      if (requestId !== reviewImportSequence) return;
      reviewStatusElement.removeAttribute("aria-busy");
      reviewImportInput.value = "";
    });
  }

  function exportVisibleReview() {
    const visibleOpportunities = visibleItems.filter(item => item.type === "opportunity");
    if (!visibleOpportunities.length) return;
    const content = JSON.stringify(buildReviewExport(reviewState, visibleOpportunities), null, 2);
    const view = doc.defaultView;
    const blob = new view.Blob([content], { type: "application/json;charset=utf-8" });
    const url = view.URL.createObjectURL(blob);
    const link = doc.createElement("a");
    link.href = url;
    link.download = "moreno-mapa-ia-bitacora.json";
    doc.body.append(link);
    link.click();
    link.remove();
    view.setTimeout(() => view.URL.revokeObjectURL(url), 1500);
    reviewStatusElement.textContent = "Bitácora JSON exportada: " + visibleOpportunities.length + " tesis visibles.";
  }


  function downloadTerritorialBrief(item) {
    const brief = buildTerritorialBrief(item);
    if (!brief) return;
    const content = buildTerritorialBriefHtml(brief);
    const view = doc.defaultView;
    const blob = new view.Blob([content], { type: "text/html;charset=utf-8" });
    const url = view.URL.createObjectURL(blob);
    const link = doc.createElement("a");
    link.href = url;
    link.download = "moreno-ficha-prospeccion-" + item.id + ".html";
    doc.body.append(link);
    link.click();
    link.remove();
    view.setTimeout(() => view.URL.revokeObjectURL(url), 1500);
    statusElement.textContent = "Ficha editorial preparada: " + item.name;
  }

  if (typeof maplibregl === "undefined") {
    showFallback("No se pudo cargar el motor cartográfico. Las fichas, los filtros y las fuentes siguen disponibles.");
  } else {
    try {
      mapElement.replaceChildren();
      map = new maplibregl.Map({
        container: mapElement,
        style: {
          version: 8,
          sources: {
            "osm-raster": {
              type: "raster",
              tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
              tileSize: 256,
              attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap contributors</a> · <a href="https://www.openstreetmap.org/fixthemap" target="_blank" rel="noopener noreferrer">Reportar un problema</a>'
            }
          },
          layers: [{ id: "osm-raster-layer", type: "raster", source: "osm-raster" }]
        },
        center: [-58.7914, -34.6508],
        zoom: 12,
        maxZoom: 19,
        attributionControl: { compact: false },
        renderWorldCopies: false
      });
      map.addControl(new maplibregl.NavigationControl({ showCompass: true }), "top-right");
      const markUserNavigation = () => {
        userHasNavigated = true;
      };
      map.on("dragstart", markUserNavigation);
      map.on("zoomstart", markUserNavigation);
      map.on("rotatestart", markUserNavigation);
      let rasterTileErrors = 0;
      map.on("error", event => {
        if (event && event.sourceId === "osm-raster") {
          rasterTileErrors += 1;
          statusElement.textContent = "Teselas OSM no disponibles · inventario y filtros conservados";
          if (rasterTileErrors >= 4 && !staticFallbackActive) {
            showFallback("La cartografía base no respondió. Se muestra un esquema territorial local con las referencias y sus fichas.");
          }
        }
      });
      map.on("load", () => {
        map.resize();
        all.forEach(item => {
          const element = doc.createElement("button");
          element.type = "button";
          element.className = "map-pin " + (item.type === "locality"
            ? "map-pin-locality"
            : (item.stage === "hypothesis" ? "map-pin-hypothesis" : "map-pin-documented"));
          element.setAttribute("aria-label", "Ver " + item.name + " en el mapa");
          element.title = item.name;
          const popup = new maplibregl.Popup({ offset: 16, maxWidth: "340px" })
            .setDOMContent(popupNode(item));
          element.addEventListener("click", () => {
            setActiveReference(item, { reveal: true, scroll: true });
          });
          const marker = new maplibregl.Marker({ element, anchor: "center" })
            .setLngLat([item.lng, item.lat])
            .setPopup(popup)
            .addTo(map);
          markers.set(item.id, marker);
        });

        const boundaryUrl = "https://apis.datos.gob.ar/georef/api/v2.0/municipios?nombre=Moreno&provincia=Buenos%20Aires&formato=geojson";
        fetch(boundaryUrl).then(response => {
          if (!response.ok) throw new Error("Georef no disponible");
          return response.json();
        }).then(data => {
          let geo = data;
          if (!data.type && data.municipios) {
            geo = {
              type: "FeatureCollection",
              features: data.municipios.map(entry => entry.geojson).filter(Boolean)
            };
          }
          if (geo.type !== "FeatureCollection" || !Array.isArray(geo.features) || !geo.features.length) {
            throw new Error("Geometría municipal no disponible");
          }
          geo.features = geo.features.filter(feature => {
            const properties = feature.properties || {};
            const name = String(properties.nombre || properties.NAM || properties.nombre_completo || "");
            return !name || name.toLocaleLowerCase("es-AR").includes("moreno");
          });
          if (!geo.features.length) throw new Error("No se encontró el municipio solicitado");

          map.addSource("moreno-boundary", { type: "geojson", data: geo });
          map.addLayer({
            id: "moreno-boundary-fill",
            type: "fill",
            source: "moreno-boundary",
            paint: { "fill-color": "#4a4d46", "fill-opacity": 0.055 }
          });
          map.addLayer({
            id: "moreno-boundary-line",
            type: "line",
            source: "moreno-boundary",
            paint: { "line-color": "#444840", "line-width": 2, "line-opacity": 0.82 }
          });

          const bounds = new maplibregl.LngLatBounds();
          const collectCoordinates = coordinates => {
            if (Array.isArray(coordinates) && typeof coordinates[0] === "number") {
              bounds.extend(coordinates);
            } else if (Array.isArray(coordinates)) {
              coordinates.forEach(collectCoordinates);
            }
          };
          geo.features.forEach(feature => {
            if (feature.geometry) collectCoordinates(feature.geometry.coordinates);
          });
          if (!bounds.isEmpty() && shouldFitMunicipalBounds(selectedReferenceId, userHasNavigated)) {
            map.fitBounds(bounds, { padding: 36, maxZoom: 12, duration: 0 });
          }
          boundaryElement.textContent = "Límite municipal: cargado desde Georef";
        }).catch(error => {
          boundaryElement.textContent = "Límite municipal: no disponible ahora";
          console.info("Límite municipal no cargado; el mapa continúa disponible.", error);
        });
        render();
        const sharedItem = all.find(item => item.id === selectedReferenceId);
        if (sharedItem) focusItem(sharedItem);
      });
    } catch (error) {
      map = null;
      showFallback("El navegador no pudo iniciar el mapa interactivo. Las fichas, los filtros y las fuentes siguen disponibles.");
      console.info("MapLibre no pudo inicializarse.", error);
    }
  }

  exportButton.addEventListener("click", exportVisibleCsv);
  exportButton.hidden = false;
  geoJsonExportButton.hidden = false;
  geoJsonExportButton.addEventListener("click", exportVisibleGeoJson);
  reviewExportButton.hidden = false;
  reviewExportButton.addEventListener("click", exportVisibleReview);
  reviewImportButton.hidden = false;
  reviewImportButton.addEventListener("click", () => reviewImportInput.click());
  reviewImportInput.addEventListener("change", event => importReviewFile(event.target.files && event.target.files[0]));
  if (reviewClearButton) {
    reviewClearButton.addEventListener("click", () => {
      const view = doc.defaultView;
      if (view && typeof view.confirm === "function" &&
          !view.confirm("¿Borrar la bitácora guardada en este navegador? Las copias JSON descargadas no se eliminarán.")) return;
      reviewImportSequence += 1;
      reviewStatusElement.removeAttribute("aria-busy");
      reviewImportInput.value = "";
      const cleared = clearReviewState(reviewStorage);
      if (cleared) {
        reviewState = {};
        render();
        reviewStatusElement.textContent = reviewStorage
          ? "Bitácora local borrada de este navegador. Las copias JSON descargadas deben eliminarse por separado."
          : "Bitácora de esta sesión borrada. El almacenamiento local no está disponible.";
      } else {
        reviewState = readReviewState(reviewStorage, opportunities);
        render();
        reviewStatusElement.textContent = "El navegador no permitió borrar toda la bitácora local. Los registros que sigan disponibles se conservaron.";
      }
    });
  }
  searchInput.addEventListener("input", render);
  categoryInput.addEventListener("change", render);
  kindInput.addEventListener("change", render);
  evidenceInput.addEventListener("change", render);
  shareViewButton.addEventListener("click", shareCurrentView);
  dossierExportButton.addEventListener("click", downloadTerritorialDossier);
  doc.getElementById("reset-map").addEventListener("click", () => {
    searchInput.value = "";
    categoryInput.value = "all";
    kindInput.value = "all";
    evidenceInput.value = "all";
    selectedReferenceId = null;
    updateShareUrl(null);
    render();
    if (map) {
      const home = { center: [-58.7914, -34.6508], zoom: 12 };
      if (prefersReducedMotion(doc.defaultView)) map.jumpTo(home);
      else map.flyTo({ ...home, essential: true });
    }
  });
  render();
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    localities, opportunities, all, countInventory, filterReferences, buildCsv, buildGeoJson,
    getSharedReferenceId, normalizeMapViewState, parseMapViewState, buildMapViewUrl,
    buildReferenceUrl, buildOpportunityContactUrl, referenceContactLabel,
    shouldFitMunicipalBounds, prefersReducedMotion, reviewTasks, REVIEW_STORAGE_KEY, LEGACY_REVIEW_STORAGE_KEY,
    isValidReviewDate, normalizeReviewState, readReviewState, writeReviewState, clearReviewState, updateReviewState,
    getReviewSummary, buildReviewExport, parseReviewImport, mergeReviewStates,
    buildTerritorialBrief, buildTerritorialBriefHtml,
    buildTerritorialDossier, buildTerritorialDossierDiagram, buildTerritorialDossierHtml
  };
}
if (typeof document !== "undefined") initMapPage(document);
