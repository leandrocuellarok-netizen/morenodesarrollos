(function () {
  "use strict";
  const api = window.MorenoPipelineDashboard;
  const fileInput = document.getElementById("pipeline-csv-file");
  const status = document.getElementById("pipeline-status");
  const output = document.getElementById("pipeline-dashboard-output");
  const resetButton = document.getElementById("pipeline-reset");
  const downloadSummaryButton = document.getElementById("pipeline-download-summary");
  const downloadAgendaButton = document.getElementById("pipeline-download-agenda");
  const downloadCalendarButton = document.getElementById("pipeline-download-calendar");
  const followUpFilter = document.getElementById("pipeline-filter-followup");
  if (!api || !fileInput || !status || !output || !resetButton || !downloadSummaryButton || !downloadAgendaButton || !downloadCalendarButton || !followUpFilter || !counterpartyTable) return;
  let records = [];
  let currentSummary = null;
  let importSequence = 0;
  const stageFilter = document.getElementById("pipeline-filter-stage");
  const textFilter = document.getElementById("pipeline-filter-text");
  const metrics = document.getElementById("pipeline-metrics");
  const financeTable = document.getElementById("pipeline-finance-summary");
  const stageTable = document.getElementById("pipeline-stage-summary");
  const counterpartyTable = document.getElementById("pipeline-counterparty-summary");
  const actionsList = document.getElementById("pipeline-next-actions");
  const recordsTable = document.getElementById("pipeline-records-body");
  const recordsCount = document.getElementById("pipeline-records-count");
  const warnings = document.getElementById("pipeline-warnings");

  function node(tag, className, text) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  }
  function localDate() {
    const now = new Date();
    return [now.getFullYear(), String(now.getMonth() + 1).padStart(2, "0"), String(now.getDate()).padStart(2, "0")].join("-");
  }
  function addDays(dateString, days) {
    const parts = dateString.split("-").map(Number);
    return new Date(Date.UTC(parts[0], parts[1] - 1, parts[2] + days)).toISOString().slice(0, 10);
  }
  function isActiveRecord(record) {
    return !["ganada", "no concretada", "pausada"].includes(api.normalizeStage(record.fields.etapa_comercial));
  }
  function updateFollowUpFilter(summary) {
    const active = records.filter(isActiveRecord);
    const endOfWindow = addDays(summary.today, 7);
    const counts = {
      overdue: active.filter(record => record.fields.fecha_proximo_seguimiento && record.fields.fecha_proximo_seguimiento < summary.today).length,
      dueSoon: active.filter(record => record.fields.fecha_proximo_seguimiento && record.fields.fecha_proximo_seguimiento >= summary.today && record.fields.fecha_proximo_seguimiento <= endOfWindow).length,
      missingDate: active.filter(record => !record.fields.fecha_proximo_seguimiento).length,
      missingAction: active.filter(record => !String(record.fields.proxima_accion || "").trim()).length
    };
    const options = [
      ["", "Todos los seguimientos (" + records.length + ")"],
      ["overdue", "Vencidas (" + counts.overdue + ")"],
      ["due-soon", "Próximos 7 días (" + counts.dueSoon + ")"],
      ["missing-date", "Sin fecha (" + counts.missingDate + ")"],
      ["missing-action", "Sin próxima acción (" + counts.missingAction + ")"]
    ];
    followUpFilter.replaceChildren();
    options.forEach(entry => {
      const option = node("option", "", entry[1]);
      option.value = entry[0];
      followUpFilter.append(option);
    });
    followUpFilter.value = "";
  }
  function displayDate(value) {
    if (!value) return "Sin fecha";
    const parts = value.split("-");
    return parts.length === 3 ? parts[2] + "/" + parts[1] + "/" + parts[0] : value;
  }
  function displayAmount(value, currency, count) {
    if (count === 0) return "Sin dato";
    if (value === null || value === undefined) return "—";
    return new Intl.NumberFormat("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value) + " " + currency;
  }
  function appendCell(row, value, tag) {
    const cell = node(tag || "td", "", value || "—");
    row.append(cell);
    return cell;
  }
  function renderMetrics(summary) {
    metrics.replaceChildren();
    [
      ["Oportunidades", summary.total, "Registros importados"],
      ["En seguimiento", summary.active, "No cerradas ni pausadas"],
      ["Vencidas", summary.overdue, "Requieren revisar la próxima acción"],
      ["Próximos 7 días", summary.dueSoon, "Seguimientos con fecha"],
      ["Sin fecha", summary.missingFollowUp, "Activas sin seguimiento programado"]
    ].forEach(entry => {
      const card = node("article", "pipeline-kpi");
      card.append(node("span", "pipeline-kpi-label", entry[0]));
      card.append(node("strong", "pipeline-kpi-value", String(entry[1])));
      card.append(node("small", "pipeline-kpi-note", entry[2]));
      metrics.append(card);
    });
  }
  function renderFinance(finance) {
    financeTable.replaceChildren();
    const currencies = Object.keys(finance).sort();
    if (!currencies.length) {
      financeTable.append(node("p", "pipeline-empty", "Todavía no hay honorarios registrados con una moneda válida."));
      return;
    }
    const table = node("table", "pipeline-table");
    const head = node("thead");
    const headerRow = node("tr");
    ["Moneda", "Propuestos", "Acordados", "Facturados", "Cobrados"].forEach(label => appendCell(headerRow, label, "th"));
    head.append(headerRow);
    const body = node("tbody");
    currencies.forEach(currency => {
      const values = finance[currency];
      const row = node("tr");
      appendCell(row, currency);
      appendCell(row, displayAmount(values.honorarios_propuestos, currency, values.counts.honorarios_propuestos));
      appendCell(row, displayAmount(values.honorarios_acordados, currency, values.counts.honorarios_acordados));
      appendCell(row, displayAmount(values.honorarios_facturados, currency, values.counts.honorarios_facturados));
      appendCell(row, displayAmount(values.honorarios_cobrados, currency, values.counts.honorarios_cobrados));
      body.append(row);
    });
    table.append(head, body);
    financeTable.append(table);
  }
  function renderStages(stageCounts) {
    stageTable.replaceChildren();
    if (!stageCounts.length) {
      stageTable.append(node("p", "pipeline-empty", "No hay etapas para resumir."));
      return;
    }
    const table = node("table", "pipeline-table pipeline-stage-table");
    const head = node("thead");
    const headerRow = node("tr");
    appendCell(headerRow, "Etapa comercial", "th");
    appendCell(headerRow, "Cantidad", "th");
    head.append(headerRow);
    const body = node("tbody");
    stageCounts.forEach(entry => {
      const row = node("tr");
      appendCell(row, entry[0]);
      appendCell(row, String(entry[1]));
      body.append(row);
    });
    table.append(head, body);
    stageTable.append(table);
  }
  function renderCounterparties(items) {
    counterpartyTable.replaceChildren();
    if (!items.length) {
      counterpartyTable.append(node("p", "pipeline-empty", "Todavía no hay contrapartes para clasificar."));
      return;
    }
    const table = node("table", "pipeline-table pipeline-counterparty-table");
    const head = node("thead");
    const headerRow = node("tr");
    ["Tipo de contraparte", "Total", "Activas", "Ganadas", "No concretadas", "Pausadas"].forEach(label => appendCell(headerRow, label, "th"));
    head.append(headerRow);
    const body = node("tbody");
    const totals = { total: 0, active: 0, won: 0, notCompleted: 0, paused: 0 };
    items.forEach(entry => {
      const row = node("tr");
      appendCell(row, entry.type);
      appendCell(row, String(entry.total));
      appendCell(row, String(entry.active));
      appendCell(row, String(entry.won));
      appendCell(row, String(entry.notCompleted));
      appendCell(row, String(entry.paused));
      body.append(row);
      Object.keys(totals).forEach(key => { totals[key] += entry[key]; });
    });
    const totalRow = node("tr", "pipeline-counterparty-total");
    appendCell(totalRow, "Total general");
    appendCell(totalRow, String(totals.total));
    appendCell(totalRow, String(totals.active));
    appendCell(totalRow, String(totals.won));
    appendCell(totalRow, String(totals.notCompleted));
    appendCell(totalRow, String(totals.paused));
    body.append(totalRow);
    table.append(head, body);
    counterpartyTable.append(table);
  }
  function renderNextActions(summary) {
    actionsList.replaceChildren();
    if (!summary.nextActions.length) {
      actionsList.append(node("p", "pipeline-empty", "No hay seguimientos vencidos ni programados para los próximos siete días."));
      return;
    }
    summary.nextActions.forEach(record => {
      const fields = record.fields;
      const item = node("li", "pipeline-action-item");
      const top = node("div", "pipeline-action-top");
      const overdue = fields.fecha_proximo_seguimiento < summary.today;
      top.append(node("span", overdue ? "pipeline-action-flag is-overdue" : "pipeline-action-flag", overdue ? "Vencida" : "Próxima"));
      top.append(node("time", "pipeline-action-date", displayDate(fields.fecha_proximo_seguimiento)));
      item.append(top);
      item.append(node("strong", "pipeline-action-title", record.id + " · " + (fields.localidad || "Localidad sin dato")));
      item.append(node("p", "pipeline-action-description", fields.proxima_accion || "Definir próxima acción"));
      item.append(node("small", "pipeline-action-meta", fields.etapa_comercial || "Sin etapa"));
      actionsList.append(item);
    });
  }
  function renderRecords() {
    const selectedStage = stageFilter.value;
    const selectedFollowUp = followUpFilter.value;
    const query = api.normalizeStage(textFilter.value);
    const today = currentSummary ? currentSummary.today : localDate();
    const endOfWindow = addDays(today, 7);
    const filtered = records.filter(record => {
      const fields = record.fields;
      const active = isActiveRecord(record);
      const followUpDate = fields.fecha_proximo_seguimiento;
      if (selectedStage === "__sin_etapa__" && fields.etapa_comercial) return false;
      if (selectedStage && selectedStage !== "__sin_etapa__" && fields.etapa_comercial !== selectedStage) return false;
      if (selectedFollowUp === "overdue" && (!active || !followUpDate || followUpDate >= today)) return false;
      if (selectedFollowUp === "due-soon" && (!active || !followUpDate || followUpDate < today || followUpDate > endOfWindow)) return false;
      if (selectedFollowUp === "missing-date" && (!active || followUpDate)) return false;
      if (selectedFollowUp === "missing-action" && (!active || String(fields.proxima_accion || "").trim())) return false;
      if (!query) return true;
      return [
        record.id, fields.localidad, fields.tipo_activo, fields.identificacion_catastral,
        fields.referencia_origen, fields.fuente_origen, fields.tipo_contraparte,
        fields.tipo_operacion, fields.etapa_comercial, fields.estado_documental, fields.proxima_accion
      ].some(value => api.normalizeStage(value).includes(query));
    });
    recordsTable.replaceChildren();
    filtered.forEach(record => {
      const fields = record.fields;
      const row = node("tr");
      appendCell(row, record.id);
      appendCell(row, fields.localidad);
      appendCell(row, fields.tipo_activo);
      appendCell(row, fields.etapa_comercial);
      appendCell(row, fields.estado_documental);
      appendCell(row, fields.proxima_accion);
      appendCell(row, displayDate(fields.fecha_proximo_seguimiento));
      appendCell(row, fields.moneda ? displayAmount(record.amounts.honorarios_cobrados, fields.moneda) : "—");
      recordsTable.append(row);
    });
    recordsCount.textContent = "Mostrando " + filtered.length + " de " + records.length + " oportunidades.";
  }
  downloadSummaryButton.disabled = true;
  downloadAgendaButton.disabled = true;
  downloadCalendarButton.disabled = true;

  function renderWarnings(items) {
    warnings.replaceChildren();
    if (!items.length) { warnings.hidden = true; return; }
    warnings.hidden = false;
    warnings.append(node("strong", "pipeline-warning-title", "Observaciones de calidad de datos y honorarios (" + items.length + ")"));
    const list = node("ul", "pipeline-warning-list");
    items.slice(0, 20).forEach(item => list.append(node("li", "", item)));
    warnings.append(list);
    if (items.length > 20) warnings.append(node("p", "pipeline-warning-more", "Se muestran las primeras 20 observaciones."));
  }
  function render() {
    const summary = api.summarizePipeline(records, localDate());
    currentSummary = summary;
    downloadSummaryButton.disabled = false;
    downloadAgendaButton.disabled = false;
    downloadCalendarButton.disabled = !(summary.agendaItems || []).some(item => api.validDate(item.record.fields.fecha_proximo_seguimiento));
    renderMetrics(summary);
    renderFinance(summary.finance);
    renderStages(summary.stageCounts);
    renderCounterparties(summary.counterpartyCounts || []);
    renderNextActions(summary);
    updateFollowUpFilter(summary);
    stageFilter.replaceChildren(node("option", "", "Todas las etapas"));
    summary.stageCounts.forEach(entry => {
      const option = node("option", "", entry[0]);
      option.value = entry[0] === "Sin etapa" ? "__sin_etapa__" : entry[0];
      stageFilter.append(option);
    });
    renderRecords();
    output.hidden = false;
  }
  async function importFile() {
    const requestId = ++importSequence;
    const file = fileInput.files && fileInput.files[0];
    records = [];
    currentSummary = null;
    downloadSummaryButton.disabled = true;
    downloadAgendaButton.disabled = true;
    downloadCalendarButton.disabled = true;
    stageFilter.replaceChildren(node("option", "", "Todas las etapas"));
    stageFilter.value = "";
    followUpFilter.replaceChildren(node("option", "", "Todos los seguimientos"));
    followUpFilter.value = "";
    textFilter.value = "";
    output.hidden = true;
    warnings.replaceChildren();
    warnings.hidden = true;
    resetButton.disabled = !file;
    if (!file) {
      status.textContent = "Seleccioná un CSV generado a partir de la plantilla MORENO.";
      return;
    }
    if (file.size > 2000000) {
      status.textContent = "El archivo supera el límite de 2 MB. No se abrió ni se procesó.";
      resetButton.disabled = false;
      return;
    }
    status.textContent = "Leyendo y validando el CSV seleccionado…";
    try {
      const rawText = await file.text();
      if (requestId !== importSequence) return;
      const result = api.parsePipelineCsv(rawText);
      if (!result.ok) {
        status.textContent = result.error;
        resetButton.disabled = false;
        return;
      }
      records = result.records;
      renderWarnings(result.warnings);
      render();
      status.textContent = "CSV validado: " + records.length + " oportunidades. Los datos permanecen en memoria en esta pestaña; no se transmiten ni se guardan.";
      resetButton.disabled = false;
    } catch (error) {
      if (requestId !== importSequence) return;
      records = [];
      status.textContent = "No se pudo procesar el archivo. " + (error.message || "Revisá el CSV e intentá nuevamente.");
      resetButton.disabled = false;
    }
  }
  downloadSummaryButton.addEventListener("click", function () {
    if (!currentSummary) return;
    try {
      const blob = new Blob([api.buildSummaryCsv(currentSummary)], { type: "text/csv;charset=utf-8" });
      const objectUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = "moreno-resumen-comercial-" + currentSummary.today + ".csv";
      link.style.display = "none";
      document.body.append(link);
      link.click();
      link.remove();
      window.setTimeout(function () { window.URL.revokeObjectURL(objectUrl); }, 1000);
      status.textContent = "Resumen agregado descargado. No contiene identificadores de oportunidad ni datos de contacto.";
    } catch (error) {
      status.textContent = "No se pudo generar el resumen CSV en este navegador.";
    }
  });
  downloadAgendaButton.addEventListener("click", function () {
    if (!currentSummary) return;
    try {
      const blob = new Blob([api.buildAgendaCsv(currentSummary)], { type: "text/csv;charset=utf-8" });
      const objectUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = "moreno-agenda-seguimiento-" + currentSummary.today + ".csv";
      link.style.display = "none";
      document.body.append(link);
      link.click();
      link.remove();
      window.setTimeout(function () { window.URL.revokeObjectURL(objectUrl); }, 1000);
      status.textContent = "Agenda descargada: " + currentSummary.agendaItems.length + " acciones para revisar. No contiene datos de contacto.";
    } catch (error) {
      status.textContent = "No se pudo generar la agenda CSV en este navegador.";
    }
  });
  downloadCalendarButton.addEventListener("click", function () {
    if (!currentSummary) return;
    const datedItems = (currentSummary.agendaItems || []).filter(item => api.validDate(item.record.fields.fecha_proximo_seguimiento));
    if (!datedItems.length) {
      status.textContent = "No hay seguimientos con fecha para incorporar al calendario. Las tareas sin fecha permanecen en la agenda CSV.";
      return;
    }
    try {
      const blob = new Blob([api.buildAgendaIcs(currentSummary)], { type: "text/calendar;charset=utf-8" });
      const objectUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = "moreno-agenda-seguimiento-" + currentSummary.today + ".ics";
      link.style.display = "none";
      document.body.append(link);
      link.click();
      link.remove();
      window.setTimeout(function () { window.URL.revokeObjectURL(objectUrl); }, 1000);
      status.textContent = "Calendario descargado: " + datedItems.length + " seguimientos como eventos de día completo, sin horarios inventados ni datos de contacto.";
    } catch (error) {
      status.textContent = "No se pudo generar el archivo de calendario en este navegador.";
    }
  });
  fileInput.addEventListener("change", importFile);
  resetButton.addEventListener("click", () => {
    importSequence += 1;
    records = [];
    currentSummary = null;
    downloadSummaryButton.disabled = true;
    downloadAgendaButton.disabled = true;
    downloadCalendarButton.disabled = true;
    fileInput.value = "";
    stageFilter.replaceChildren(node("option", "", "Todas las etapas"));
    stageFilter.value = "";
    textFilter.value = "";
    output.hidden = true;
    warnings.hidden = true;
    status.textContent = "Sesión local limpiada. Seleccioná un CSV cuando quieras revisar el seguimiento.";
    resetButton.disabled = true;
  });
  stageFilter.addEventListener("change", renderRecords);
  followUpFilter.addEventListener("change", renderRecords);
  textFilter.addEventListener("input", renderRecords);
})();
