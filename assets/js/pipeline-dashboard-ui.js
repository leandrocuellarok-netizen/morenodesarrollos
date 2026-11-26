(function () {
  "use strict";
  const api = window.MorenoPipelineDashboard;
  const fileInput = document.getElementById("pipeline-csv-file");
  const status = document.getElementById("pipeline-status");
  const output = document.getElementById("pipeline-dashboard-output");
  const resetButton = document.getElementById("pipeline-reset");
  const downloadSummaryButton = document.getElementById("pipeline-download-summary");
  const downloadAgendaButton = document.getElementById("pipeline-download-agenda");
  if (!api || !fileInput || !status || !output || !resetButton || !downloadSummaryButton || !downloadAgendaButton) return;
  let records = [];
  let currentSummary = null;
  let importSequence = 0;
  const stageFilter = document.getElementById("pipeline-filter-stage");
  const textFilter = document.getElementById("pipeline-filter-text");
  const metrics = document.getElementById("pipeline-metrics");
  const financeTable = document.getElementById("pipeline-finance-summary");
  const stageTable = document.getElementById("pipeline-stage-summary");
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
    const query = api.normalizeStage(textFilter.value);
    const filtered = records.filter(record => {
      const fields = record.fields;
      if (selectedStage === "__sin_etapa__" && fields.etapa_comercial) return false;
      if (selectedStage && selectedStage !== "__sin_etapa__" && fields.etapa_comercial !== selectedStage) return false;
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

  function renderWarnings(items) {
    warnings.replaceChildren();
    if (!items.length) { warnings.hidden = true; return; }
    warnings.hidden = false;
    warnings.append(node("strong", "pipeline-warning-title", "Observaciones de calidad de datos (" + items.length + ")"));
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
    renderMetrics(summary);
    renderFinance(summary.finance);
    renderStages(summary.stageCounts);
    renderNextActions(summary);
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
    stageFilter.replaceChildren(node("option", "", "Todas las etapas"));
    stageFilter.value = "";
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
  fileInput.addEventListener("change", importFile);
  resetButton.addEventListener("click", () => {
    importSequence += 1;
    records = [];
    currentSummary = null;
    downloadSummaryButton.disabled = true;
    downloadAgendaButton.disabled = true;
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
  textFilter.addEventListener("input", renderRecords);
})();
