(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  if (root) root.MorenoPipelineDashboard = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";
  const MAX_FILE_CHARS = 2000000;
  const MAX_ROWS = 10000;
  const HEADERS = [
    "id_oportunidad", "fecha_alta", "referencia_origen", "localidad", "tipo_activo",
    "identificacion_catastral", "fuente_origen", "tipo_contraparte", "tipo_operacion",
    "etapa_comercial", "estado_documental", "proxima_accion", "fecha_proximo_seguimiento",
    "honorarios_propuestos", "honorarios_acordados", "honorarios_facturados",
    "honorarios_cobrados", "moneda", "fecha_ultima_actualizacion", "observaciones_no_sensibles"
  ];
  const AMOUNT_FIELDS = ["honorarios_propuestos", "honorarios_acordados", "honorarios_facturados", "honorarios_cobrados"];
  const CLOSED_STAGES = new Set(["ganada", "no concretada", "pausada"]);

  function parseDelimited(text, delimiter) {
    const rows = [];
    let row = [];
    let field = "";
    let quoted = false;
    let afterQuote = false;
    for (let i = 0; i < text.length; i += 1) {
      const char = text[i];
      if (quoted) {
        if (char === '"') {
          if (text[i + 1] === '"') { field += '"'; i += 1; }
          else { quoted = false; afterQuote = true; }
        } else field += char;
        continue;
      }
      if (afterQuote) {
        if (char === delimiter) { row.push(field); field = ""; afterQuote = false; }
        else if (char === "\n" || char === "\r") {
          row.push(field); rows.push(row); row = []; field = ""; afterQuote = false;
          if (char === "\r" && text[i + 1] === "\n") i += 1;
        } else if (char !== " " && char !== "\t") {
          throw new Error("El CSV contiene caracteres inesperados después de una comilla de cierre.");
        }
        continue;
      }
      if (char === '"' && field.length === 0) quoted = true;
      else if (char === '"') throw new Error("El CSV contiene una comilla dentro de un campo no entrecomillado.");
      else if (char === delimiter) { row.push(field); field = ""; }
      else if (char === "\n" || char === "\r") {
        row.push(field); rows.push(row); row = []; field = "";
        if (char === "\r" && text[i + 1] === "\n") i += 1;
      } else field += char;
    }
    if (quoted) throw new Error("El CSV contiene un campo entrecomillado que no se cerró.");
    if (field.length || row.length || afterQuote) { row.push(field); rows.push(row); }
    return rows.filter(entry => entry.some(value => String(value).trim() !== ""));
  }

  function validDate(value) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
    const parts = value.split("-").map(Number);
    const date = new Date(Date.UTC(parts[0], parts[1] - 1, parts[2]));
    return date.getUTCFullYear() === parts[0] && date.getUTCMonth() === parts[1] - 1 && date.getUTCDate() === parts[2];
  }

  function parseAmount(value, rowNumber, fieldName) {
    const raw = String(value || "").trim();
    if (!raw) return null;
    if (!/^\d+(?:[.,]\d{1,2})?$/.test(raw)) {
      throw new Error("Fila " + rowNumber + ": " + fieldName + " debe ser un número sin separador de miles y con hasta dos decimales.");
    }
    const amount = Number(raw.replace(",", "."));
    if (!Number.isFinite(amount) || amount > 1000000000000000) {
      throw new Error("Fila " + rowNumber + ": " + fieldName + " está fuera del rango admitido.");
    }
    return amount;
  }

  function parsePipelineCsv(rawText) {
    if (typeof rawText !== "string" || !rawText.trim()) return { ok: false, error: "El archivo está vacío." };
    if (rawText.length > MAX_FILE_CHARS) return { ok: false, error: "El CSV supera el límite de 2 MB." };
    let rows;
    try { rows = parseDelimited(rawText.replace(/^\uFEFF/, ""), ";"); }
    catch (error) { return { ok: false, error: error.message }; }
    if (!rows.length) return { ok: false, error: "No se encontraron encabezados en el CSV." };
    const headers = rows[0].map(value => String(value).trim().toLowerCase());
    const duplicates = headers.filter((value, index) => headers.indexOf(value) !== index);
    if (duplicates.length) return { ok: false, error: "El CSV contiene encabezados duplicados: " + Array.from(new Set(duplicates)).join(", ") + "." };
    const unknown = headers.filter(value => !HEADERS.includes(value));
    const missing = HEADERS.filter(value => !headers.includes(value));
    if (unknown.length || missing.length) {
      const details = [];
      if (missing.length) details.push("faltan " + missing.join(", "));
      if (unknown.length) details.push("sobran " + unknown.join(", "));
      return { ok: false, error: "El esquema del CSV no coincide con la plantilla MORENO: " + details.join("; ") + ". No se importaron datos." };
    }
    const indexByHeader = Object.fromEntries(headers.map((header, index) => [header, index]));
    const dataRows = rows.slice(1);
    if (dataRows.length > MAX_ROWS) return { ok: false, error: "El CSV supera el límite de " + MAX_ROWS + " oportunidades." };
    const seenIds = new Set();
    const records = [];
    const warnings = [];
    try {
      for (let i = 0; i < dataRows.length; i += 1) {
        const rowNumber = i + 2;
        const values = dataRows[i];
        if (values.length !== headers.length) {
          return { ok: false, error: "Fila " + rowNumber + ": se esperaban " + headers.length + " columnas y se encontraron " + values.length + "." };
        }
        const fields = {};
        HEADERS.forEach(header => {
          const value = String(values[indexByHeader[header]] || "").trim();
          if (value.length > 2000) throw new Error("Fila " + rowNumber + ": el campo " + header + " supera los 2.000 caracteres.");
          fields[header] = value;
        });
        const id = fields.id_oportunidad;
        if (!id) return { ok: false, error: "Fila " + rowNumber + ": falta el identificador interno de oportunidad." };
        if (id.length > 80) return { ok: false, error: "Fila " + rowNumber + ": el identificador supera los 80 caracteres." };
        const normalizedId = id.toLocaleLowerCase("es-AR");
        if (seenIds.has(normalizedId)) return { ok: false, error: "Fila " + rowNumber + ": el identificador " + id + " está duplicado." };
        seenIds.add(normalizedId);
        ["fecha_alta", "fecha_proximo_seguimiento", "fecha_ultima_actualizacion"].forEach(fieldName => {
          if (fields[fieldName] && !validDate(fields[fieldName])) {
            throw new Error("Fila " + rowNumber + ": " + fieldName + " debe usar una fecha real con formato AAAA-MM-DD.");
          }
        });
        const amounts = {};
        let hasAmount = false;
        AMOUNT_FIELDS.forEach(fieldName => {
          amounts[fieldName] = parseAmount(fields[fieldName], rowNumber, fieldName);
          if (amounts[fieldName] !== null) hasAmount = true;
        });
        const currency = fields.moneda.toUpperCase();
        if (hasAmount && !currency) throw new Error("Fila " + rowNumber + ": indicá la moneda cuando cargues honorarios.");
        if (currency && !/^[A-Z]{3}$/.test(currency)) throw new Error("Fila " + rowNumber + ": la moneda debe ser un código de tres letras, por ejemplo ARS o USD.");
        fields.moneda = currency;
        if (!fields.etapa_comercial) warnings.push("Fila " + rowNumber + " (" + id + "): falta la etapa comercial.");
        if (!fields.fecha_proximo_seguimiento) warnings.push("Fila " + rowNumber + " (" + id + "): no tiene fecha de próximo seguimiento.");
        if (!fields.proxima_accion) warnings.push("Fila " + rowNumber + " (" + id + "): no tiene próxima acción registrada.");
        records.push({ id: id, fields: fields, amounts: amounts, rowNumber: rowNumber });
      }
    } catch (error) {
      return { ok: false, error: error.message || "No se pudo validar una fila del CSV." };
    }
    if (!records.length) warnings.push("El archivo contiene solo encabezados; todavía no hay oportunidades para resumir.");
    return { ok: true, records: records, warnings: warnings, headers: HEADERS.slice() };
  }

  function normalizeStage(value) {
    return String(value || "").trim().toLocaleLowerCase("es-AR").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  function addDays(dateString, days) {
    const parts = dateString.split("-").map(Number);
    return new Date(Date.UTC(parts[0], parts[1] - 1, parts[2] + days)).toISOString().slice(0, 10);
  }

  function summarizePipeline(records, today) {
    const currentDate = today || new Date().toISOString().slice(0, 10);
    if (!validDate(currentDate)) throw new Error("La fecha de referencia debe usar AAAA-MM-DD.");
    const active = records.filter(record => !CLOSED_STAGES.has(normalizeStage(record.fields.etapa_comercial)));
    const stageCounts = {};
    const finance = {};
    const overdue = [];
    const dueSoon = [];
    const missingFollowUp = [];
    const endOfWindow = addDays(currentDate, 7);
    records.forEach(record => {
      const fields = record.fields;
      const stage = fields.etapa_comercial.trim() || "Sin etapa";
      stageCounts[stage] = (stageCounts[stage] || 0) + 1;
      if (!CLOSED_STAGES.has(normalizeStage(stage))) {
        if (!fields.fecha_proximo_seguimiento) missingFollowUp.push(record);
        else if (fields.fecha_proximo_seguimiento < currentDate) overdue.push(record);
        else if (fields.fecha_proximo_seguimiento <= endOfWindow) dueSoon.push(record);
      }
      const currency = fields.moneda;
      const hasRecordedAmount = AMOUNT_FIELDS.some(fieldName => record.amounts[fieldName] !== null);
      if (currency && hasRecordedAmount) {
        if (!finance[currency]) {
          finance[currency] = {
            honorarios_propuestos: 0, honorarios_acordados: 0, honorarios_facturados: 0, honorarios_cobrados: 0,
            counts: { honorarios_propuestos: 0, honorarios_acordados: 0, honorarios_facturados: 0, honorarios_cobrados: 0 }
          };
        }
        AMOUNT_FIELDS.forEach(fieldName => {
          if (record.amounts[fieldName] !== null) {
            finance[currency][fieldName] += record.amounts[fieldName];
            finance[currency].counts[fieldName] += 1;
          }
        });
      }
    });
    const sortByDate = (a, b) => a.fields.fecha_proximo_seguimiento.localeCompare(b.fields.fecha_proximo_seguimiento);
    overdue.sort(sortByDate);
    dueSoon.sort(sortByDate);
    return {
      total: records.length, active: active.length, overdue: overdue.length, dueSoon: dueSoon.length,
      missingFollowUp: missingFollowUp.length,
      stageCounts: Object.entries(stageCounts).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "es")),
      finance: finance, nextActions: overdue.concat(dueSoon).slice(0, 20), today: currentDate
    };
  }

  return {
    headers: HEADERS.slice(), parsePipelineCsv: parsePipelineCsv, summarizePipeline: summarizePipeline,
    normalizeStage: normalizeStage, validDate: validDate
  };
});