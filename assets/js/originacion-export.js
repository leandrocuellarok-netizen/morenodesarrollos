(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  if (root && root.document) api.bind(root);
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  function buildInternalExport(tools, internalData, now) {
    const date = now instanceof Date ? now : new Date(now || Date.now());
    return tools.buildOpportunityDossierExport({
      fields: {},
      calculationInput: {},
      internalData: internalData || tools.emptyInternalDossier(),
      includePublic: false,
      includeInternal: true,
      generatedAt: new Intl.DateTimeFormat("es-AR", { dateStyle: "long", timeStyle: "short" }).format(date),
      exportedAt: date.toISOString()
    });
  }

  function parseInternalImport(tools, raw) {
    return tools.parseOpportunityDossierImport(raw);
  }

  function bind(root) {
    const doc = root.document;
    const tools = root.MorenoOpportunityTools;
    const workbench = root.MorenoOriginacionWorkbench;
    if (!doc || !tools || !workbench) return;

    const status = doc.getElementById("originacion-status");
    const printButton = doc.getElementById("originacion-print-dossier");
    const downloadButton = doc.getElementById("originacion-download-dossier");
    const clearButton = doc.getElementById("originacion-clear");
    const importFile = doc.getElementById("originacion-import-file");
    const importButton = doc.getElementById("originacion-import-button");
    const importStatus = doc.getElementById("originacion-import-status");
    const dossierPrint = doc.getElementById("opportunity-dossier-print");
    let importSequence = 0;

    function setStatus(message, isError) {
      if (!status) return;
      if (isError) status.dataset.state = "error";
      else status.removeAttribute("data-state");
      status.textContent = message;
    }

    function validate() {
      const result = workbench.validate();
      if (!result.ok) {
        setStatus("No se puede exportar el expediente: " + result.errors.join(" "), true);
        return false;
      }
      const warningText = result.warnings.length ? " Advertencias: " + result.warnings.join(" ") : "";
      setStatus("Control local completado. Las fuentes y verificaciones siguen siendo responsabilidad de quien registra." + warningText, false);
      return true;
    }

    function buildInput() {
      const date = new Date();
      return {
        fields: {},
        calculationInput: {},
        internalData: workbench.read(),
        includePublic: false,
        includeInternal: true,
        generatedAt: new Intl.DateTimeFormat("es-AR", { dateStyle: "long", timeStyle: "short" }).format(date),
        exportedAt: date.toISOString()
      };
    }

    function renderDossier(dossier) {
      const sheet = doc.createElement("article");
      sheet.className = "opportunity-dossier-sheet";
      const header = doc.createElement("header");
      header.className = "dossier-sheet-header";
      const brand = doc.createElement("p");
      brand.className = "dossier-brand";
      brand.textContent = "MORENO / ERICA M. ACOSTA";
      const title = doc.createElement("h1");
      title.textContent = "Expediente interno de originación";
      const documentStatus = doc.createElement("p");
      documentStatus.className = "dossier-status";
      documentStatus.textContent = dossier.status;
      const date = doc.createElement("p");
      date.className = "dossier-date";
      date.textContent = dossier.generatedAt ? "Generado: " + dossier.generatedAt : "Ficha interna";
      header.append(brand, title, documentStatus, date);
      sheet.append(header);

      dossier.sections.forEach(sectionData => {
        const section = doc.createElement("section");
        section.className = "dossier-section";
        const heading = doc.createElement("h2");
        heading.textContent = sectionData.title;
        const list = doc.createElement("dl");
        sectionData.rows.forEach(row => {
          const item = doc.createElement("div");
          item.className = "dossier-row";
          const label = doc.createElement("dt");
          label.textContent = row.label;
          const value = doc.createElement("dd");
          value.textContent = row.value;
          item.append(label, value);
          list.append(item);
        });
        section.append(heading, list);
        sheet.append(section);
      });

      const checks = doc.createElement("section");
      checks.className = "dossier-section dossier-checks";
      const checksHeading = doc.createElement("h2");
      checksHeading.textContent = "Aspectos a verificar antes de evaluar una operación";
      const checksNote = doc.createElement("p");
      checksNote.textContent = "Lista de control general. Esta ficha no confirma que estos puntos hayan sido revisados.";
      const checksList = doc.createElement("ul");
      dossier.checks.forEach(entry => {
        const item = doc.createElement("li");
        item.textContent = entry;
        checksList.append(item);
      });
      checks.append(checksHeading, checksNote, checksList);
      sheet.append(checks);

      const disclaimer = doc.createElement("footer");
      disclaimer.className = "dossier-disclaimers";
      dossier.disclaimers.forEach(entry => {
        const paragraph = doc.createElement("p");
        paragraph.textContent = entry;
        disclaimer.append(paragraph);
      });
      const localNote = doc.createElement("p");
      localNote.className = "dossier-local-note-print";
      localNote.textContent = "Documento generado localmente desde la Mesa Operativa. No se transmitió al sitio MORENO.";
      disclaimer.append(localNote);
      sheet.append(disclaimer);

      dossierPrint.replaceChildren(sheet);
      dossierPrint.hidden = false;
      doc.body.dataset.printDossier = "true";
      root.addEventListener("afterprint", () => {
        delete doc.body.dataset.printDossier;
        dossierPrint.hidden = true;
      }, { once: true });
      root.print();
    }

    if (printButton) {
      printButton.addEventListener("click", () => {
        if (!validate()) return;
        const dossier = tools.buildOpportunityDossier(buildInput());
        renderDossier(dossier);
      });
    }

    if (downloadButton) {
      downloadButton.addEventListener("click", () => {
        if (!validate()) return;
        try {
          const payload = buildInternalExport(tools, workbench.read(), new Date());
          const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json;charset=utf-8" });
          const objectUrl = root.URL.createObjectURL(blob);
          const link = doc.createElement("a");
          link.href = objectUrl;
          link.download = "moreno-expediente-interno-" + new Date().toISOString().slice(0, 10) + ".json";
          link.style.display = "none";
          doc.body.append(link);
          link.click();
          link.remove();
          root.setTimeout(() => root.URL.revokeObjectURL(objectUrl), 1000);
          setStatus("Expediente interno v3 descargado. Revisá la ubicación y las notas antes de compartir el archivo.", false);
        } catch (error) {
          setStatus("No se pudo generar el expediente interno en este navegador. Revisá los datos e intentá nuevamente.", true);
        }
      });
    }

    if (importButton) {
      importButton.addEventListener("click", async () => {
        const requestId = ++importSequence;
        const file = importFile && importFile.files && importFile.files[0];
        if (!file) {
          importButton.disabled = false;
          if (importStatus) importStatus.textContent = "Seleccioná primero un archivo JSON.";
          return;
        }
        if (file.size > 1000000) {
          importButton.disabled = false;
          if (importStatus) importStatus.textContent = "El archivo supera el límite de 1 MB. No se abrió ni se procesó.";
          return;
        }
        importButton.disabled = true;
        if (importStatus) {
          importStatus.setAttribute("aria-busy", "true");
          importStatus.textContent = "Leyendo y validando el expediente…";
        }
        try {
          const raw = await file.text();
          if (requestId !== importSequence) return;
          const result = parseInternalImport(tools, raw);
          if (requestId !== importSequence) return;
          if (!result.ok) {
            if (importStatus) importStatus.textContent = result.error;
            return;
          }
          workbench.apply(result.internalData);
          const versionNote = result.version < 3
            ? " El formato v1/v2 no contiene la mesa interna; se cargó una estructura vacía."
            : " Se recuperaron los datos internos del expediente v3.";
          const warningText = result.warnings.length ? " Advertencias: " + result.warnings.join(" ") : "";
          if (importStatus) importStatus.textContent = "Expediente validado y cargado localmente." + versionNote + warningText;
          setStatus("Revisá las fuentes, las fechas y los estados antes de volver a exportar.", false);
        } catch (error) {
          if (requestId !== importSequence) return;
          if (importStatus) importStatus.textContent = "No se pudo leer el archivo en este navegador. Intentá seleccionarlo nuevamente.";
        } finally {
          if (requestId === importSequence) {
            importButton.disabled = false;
            if (importStatus) importStatus.removeAttribute("aria-busy");
          }
        }
      });
    }
    if (clearButton) {
      clearButton.addEventListener("click", () => {
        if (typeof root.confirm === "function" && !root.confirm("¿Vaciar todos los campos de este borrador local?")) return;
        importSequence += 1;
        workbench.clear();
        if (importFile) importFile.value = "";
        if (importButton) importButton.disabled = false;
        if (importStatus) {
          importStatus.removeAttribute("aria-busy");
          importStatus.textContent = "Importación cancelada. Seleccioná un expediente guardado.";
        }
        setStatus("Borrador local vaciado. No se modificaron archivos descargados.", false);
      });
    }

    if (importFile) {
      importFile.addEventListener("change", () => {
        importSequence += 1;
        if (importButton) importButton.disabled = false;
        if (importStatus) {
          importStatus.removeAttribute("aria-busy");
          importStatus.textContent = importFile.files && importFile.files[0]
            ? "Archivo seleccionado. Presioná «Validar y cargar expediente» para revisar su estructura."
            : "Seleccioná un expediente guardado.";
        }
      });
    }
  }

  return { buildInternalExport, parseInternalImport, bind };
});
