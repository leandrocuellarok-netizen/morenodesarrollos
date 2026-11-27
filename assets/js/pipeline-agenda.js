(function (root, factory) {
  const install = factory();
  if (typeof module === "object" && module.exports) module.exports = install;
  if (root && root.MorenoPipelineDashboard) install(root.MorenoPipelineDashboard);
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  const CLOSED_STAGES = new Set(["ganada", "no concretada", "pausada"]);
  const PRIORITY_ORDER = new Map([
    ["Vencida", 0],
    ["Vencida · sin acción", 1],
    ["Próxima 7 días", 2],
    ["Próxima 7 días · sin acción", 3],
    ["Sin fecha", 4],
    ["Sin acción", 5]
  ]);

  function addDays(dateString, days) {
    const parts = dateString.split("-").map(Number);
    return new Date(Date.UTC(parts[0], parts[1] - 1, parts[2] + days)).toISOString().slice(0, 10);
  }

  function spreadsheetSafeCell(value) {
    const text = String(value == null ? "" : value);
    const formulaLike = /^[\t\r\n]/.test(text) || /^[\s\uFEFF]*[=+\-@]/.test(text);
    const safeText = formulaLike ? "'" + text : text;
    return /[;"\r\n]/.test(safeText) ? '"' + safeText.replace(/"/g, '""') + '"' : safeText;
  }

  function icsEscape(value) {
    return String(value == null ? "" : value)
      .replace(/\\/g, "\\\\")
      .replace(/\r\n|\r|\n/g, "\\n")
      .replace(/;/g, "\\;")
      .replace(/,/g, "\\,");
  }

  function foldIcsLine(line) {
    const output = [];
    let current = "";
    let octets = 0;
    Array.from(String(line)).forEach(function (character) {
      const code = character.codePointAt(0);
      const size = code <= 0x7f ? 1 : code <= 0x7ff ? 2 : code <= 0xffff ? 3 : 4;
      if (octets + size > 75) {
        output.push(current);
        current = " " + character;
        octets = 1 + size;
      } else {
        current += character;
        octets += size;
      }
    });
    output.push(current);
    return output.join("\r\n");
  }

  function install(api) {
    if (!api || api.__agendaInstalled || typeof api.summarizePipeline !== "function") return api;
    const summarize = api.summarizePipeline;
    api.summarizePipeline = function (records, today) {
      const summary = summarize(records, today);
      const endOfWindow = addDays(summary.today, 7);
      const agendaItems = [];
      (records || []).forEach(function (record) {
        const fields = record.fields || {};
        if (CLOSED_STAGES.has(api.normalizeStage(fields.etapa_comercial))) return;
        const date = fields.fecha_proximo_seguimiento || "";
        const hasAction = Boolean(String(fields.proxima_accion || "").trim());
        let priority = "";
        if (!date) priority = "Sin fecha";
        else if (date < summary.today) priority = hasAction ? "Vencida" : "Vencida · sin acción";
        else if (date <= endOfWindow) priority = hasAction ? "Próxima 7 días" : "Próxima 7 días · sin acción";
        else if (!hasAction) priority = "Sin acción";
        if (priority) agendaItems.push({ record: record, priority: priority });
      });
      agendaItems.sort(function (a, b) {
        const priorityDifference = PRIORITY_ORDER.get(a.priority) - PRIORITY_ORDER.get(b.priority);
        if (priorityDifference) return priorityDifference;
        const dateA = a.record.fields.fecha_proximo_seguimiento || "9999-12-31";
        const dateB = b.record.fields.fecha_proximo_seguimiento || "9999-12-31";
        return dateA.localeCompare(dateB) || a.record.id.localeCompare(b.record.id, "es");
      });
      summary.agendaItems = agendaItems;
      return summary;
    };
    api.buildAgendaCsv = function (summary) {
      const rows = [[
        "fecha_corte", "prioridad", "id_oportunidad", "localidad", "tipo_activo",
        "etapa_comercial", "estado_documental", "proxima_accion", "fecha_proximo_seguimiento"
      ]];
      (summary.agendaItems || []).forEach(function (item) {
        const fields = item.record.fields;
        rows.push([
          summary.today, item.priority, item.record.id, fields.localidad, fields.tipo_activo,
          fields.etapa_comercial, fields.estado_documental, fields.proxima_accion,
          fields.fecha_proximo_seguimiento
        ]);
      });
      return "\uFEFF" + rows.map(function (row) { return row.map(spreadsheetSafeCell).join(";"); }).join("\r\n") + "\r\n";
    };
    api.buildAgendaIcs = function (summary) {
      const datedItems = (summary.agendaItems || []).filter(function (item) {
        const fields = item && item.record && item.record.fields;
        return fields && api.validDate(fields.fecha_proximo_seguimiento);
      });
      const stamp = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
      const lines = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//MORENO//Agenda comercial//ES",
        "CALSCALE:GREGORIAN",
        "METHOD:PUBLISH",
        "X-WR-CALNAME:MORENO - Seguimientos"
      ];
      datedItems.forEach(function (item) {
        const record = item.record || {};
        const fields = record.fields || {};
        const date = fields.fecha_proximo_seguimiento;
        const action = String(fields.proxima_accion || "").trim() || "Definir próxima acción";
        const description = [
          "Prioridad: " + item.priority,
          "ID interno: " + record.id,
          "Localidad: " + (fields.localidad || "Sin dato"),
          "Tipo de activo: " + (fields.tipo_activo || "Sin dato"),
          "Etapa comercial: " + (fields.etapa_comercial || "Sin etapa"),
          "Estado documental: " + (fields.estado_documental || "Sin dato"),
          "Próxima acción: " + action,
          "Fecha de seguimiento: " + date,
          "Registro operativo de MORENO. No incluye datos de contacto."
        ].join("\n");
        lines.push(
          "BEGIN:VEVENT",
          "UID:moreno-" + encodeURIComponent(String(record.id || "sin-id")) + "-" + date.replace(/-/g, "") + "@morenodesarrollos.github.io",
          "DTSTAMP:" + stamp,
          "DTSTART;VALUE=DATE:" + date.replace(/-/g, ""),
          "DTEND;VALUE=DATE:" + addDays(date, 1).replace(/-/g, ""),
          "SUMMARY:" + icsEscape("MORENO · " + String(record.id || "Sin ID") + " · " + action),
          "DESCRIPTION:" + icsEscape(description),
          "LOCATION:" + icsEscape(fields.localidad || ""),
          "TRANSP:TRANSPARENT",
          "END:VEVENT"
        );
      });
      lines.push("END:VCALENDAR");
      return lines.map(foldIcsLine).join("\r\n") + "\r\n";
    };
    Object.defineProperty(api, "__agendaInstalled", { value: true, enumerable: false });
    return api;
  }

  return install;
});
