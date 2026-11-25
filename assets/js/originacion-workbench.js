(function () {
  "use strict";

  const root = document.getElementById("originacion-workbench");
  if (!root || !window.MorenoOpportunityTools) return;

  const tools = window.MorenoOpportunityTools;
  const evidenceList = document.getElementById("originacion-evidence-list");
  const evidenceTemplate = document.getElementById("originacion-evidence-template");
  const status = document.getElementById("originacion-status");
  const MAX_EVIDENCE = 8;

  const byId = (id) => document.getElementById(id);
  const value = (id) => byId(id).value.trim();

  function setStatus(message) {
    if (status) status.textContent = message;
  }

  function addEvidenceRow(entry) {
    const rows = evidenceList.querySelectorAll("[data-evidence-row]");
    if (rows.length >= MAX_EVIDENCE) {
      setStatus("El registro admite hasta ocho fuentes por expediente.");
      return false;
    }
    const fragment = evidenceTemplate.content.cloneNode(true);
    const row = fragment.querySelector("[data-evidence-row]");
    const data = entry || {};
    row.querySelectorAll("[data-evidence-field]").forEach((control) => {
      const key = control.getAttribute("data-evidence-field");
      control.value = typeof data[key] === "string" ? data[key] : "";
    });
    row.querySelector("[data-remove-evidence]").addEventListener("click", () => {
      row.remove();
      if (!evidenceList.querySelector("[data-evidence-row]")) addEvidenceRow();
      setStatus("Fuente retirada del borrador local.");
    });
    evidenceList.append(fragment);
    return true;
  }

  function read() {
    const evidence = Array.from(evidenceList.querySelectorAll("[data-evidence-row]"))
      .map((row) => {
        const entry = {};
        row.querySelectorAll("[data-evidence-field]").forEach((control) => {
          entry[control.getAttribute("data-evidence-field")] = control.value.trim();
        });
        return entry;
      })
      .filter((entry) => Object.values(entry).some(Boolean));

    const checks = {};
    root.querySelectorAll("[data-check-id]").forEach((row) => {
      const key = row.getAttribute("data-check-id");
      const entry = {};
      row.querySelectorAll("[data-check-field]").forEach((control) => {
        entry[control.getAttribute("data-check-field")] = control.value.trim();
      });
      checks[key] = entry;
    });

    return {
      reference: value("originacion-reference"),
      counterpartyType: value("originacion-counterparty-type"),
      organization: value("originacion-organization"),
      commercialStage: value("originacion-commercial-stage"),
      nextAction: value("originacion-next-action"),
      followUpDate: value("originacion-follow-up-date"),
      negotiationNotes: value("originacion-negotiation-notes"),
      evidence: evidence,
      checks: checks,
      fees: {
        currency: value("originacion-fee-currency"),
        proposed: value("originacion-fee-proposed"),
        agreed: value("originacion-fee-agreed"),
        invoiced: value("originacion-fee-invoiced"),
        collected: value("originacion-fee-collected")
      }
    };
  }

  function apply(data) {
    const source = data && typeof data === "object" ? data : {};
    const scalarFields = {
      reference: "originacion-reference",
      counterpartyType: "originacion-counterparty-type",
      organization: "originacion-organization",
      commercialStage: "originacion-commercial-stage",
      nextAction: "originacion-next-action",
      followUpDate: "originacion-follow-up-date",
      negotiationNotes: "originacion-negotiation-notes"
    };
    Object.entries(scalarFields).forEach(([key, id]) => {
      byId(id).value = typeof source[key] === "string" ? source[key] : "";
    });

    const fees = source.fees && typeof source.fees === "object" ? source.fees : {};
    const feeFields = {
      currency: "originacion-fee-currency",
      proposed: "originacion-fee-proposed",
      agreed: "originacion-fee-agreed",
      invoiced: "originacion-fee-invoiced",
      collected: "originacion-fee-collected"
    };
    Object.entries(feeFields).forEach(([key, id]) => {
      byId(id).value = typeof fees[key] === "string" ? fees[key] : "";
    });

    const checks = source.checks && typeof source.checks === "object" ? source.checks : {};
    root.querySelectorAll("[data-check-id]").forEach((row) => {
      const entry = checks[row.getAttribute("data-check-id")] || {};
      row.querySelectorAll("[data-check-field]").forEach((control) => {
        const key = control.getAttribute("data-check-field");
        control.value = typeof entry[key] === "string" ? entry[key] : (key === "status" ? "pending" : "");
      });
    });

    evidenceList.replaceChildren();
    const entries = Array.isArray(source.evidence) ? source.evidence.slice(0, MAX_EVIDENCE) : [];
    if (entries.length) entries.forEach(addEvidenceRow);
    else addEvidenceRow();
    root.open = true;
    setStatus("Datos internos recuperados en este navegador. Revisá fuentes, fechas y estados antes de exportar.");
  }

  function clear() {
    apply({});
    setStatus("La mesa de originación quedó vacía. No se modificaron archivos guardados.");
  }

  document.getElementById("originacion-add-evidence").addEventListener("click", () => {
    if (addEvidenceRow()) setStatus("Agregá la fuente y clasificá su procedencia.");
  });

  addEvidenceRow();

  window.MorenoOriginacionWorkbench = Object.freeze({
    read: read,
    apply: apply,
    clear: clear,
    validate: function () { return tools.validateInternalDossier(read()); },
    setStatus: setStatus
  });
})();
