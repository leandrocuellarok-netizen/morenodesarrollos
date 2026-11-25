#!/usr/bin/env python3
"""Dependency-free quality gate for the public MORENO website."""
from __future__ import annotations

import csv
import json
import re
import shutil
import subprocess
import tempfile
import xml.etree.ElementTree as ET
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parents[1]
PUBLIC_BASE = "https://leandrocuellarok-netizen.github.io/morenodesarrollos/"
SITE_PAGES = (
    Path("index.html"),
    Path("mapa-ia/index.html"),
    Path("erica-acosta/index.html"),
    Path("oportunidades/index.html"),
)
PAGE_URLS = {
    Path("index.html"): PUBLIC_BASE,
    Path("mapa-ia/index.html"): PUBLIC_BASE + "mapa-ia/",
    Path("erica-acosta/index.html"): PUBLIC_BASE + "erica-acosta/",
    Path("oportunidades/index.html"): PUBLIC_BASE + "oportunidades/",
}
REQUIRED_SOCIAL_META = ("og:title", "og:description", "og:type", "og:locale", "og:image", "og:image:alt", "twitter:card")


class PageAudit(HTMLParser):
    def __init__(self, path: Path) -> None:
        super().__init__(convert_charrefs=True)
        self.path = path
        self.ids: set[str] = set()
        self.duplicates: set[str] = set()
        self.refs: list[tuple[str, str]] = []
        self.images_without_alt: list[str] = []
        self.title_parts: list[str] = []
        self.has_description = False
        self.meta: dict[str, str] = {}
        self.meta_counts: dict[str, int] = {}
        self.canonicals: list[str] = []
        self.h1_count = 0
        self.lang = ""
        self._in_title = False
        self._script: dict[str, object] | None = None
        self.scripts: list[tuple[str, str]] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        values = dict(attrs)
        element_id = values.get("id")
        if element_id:
            if element_id in self.ids:
                self.duplicates.add(element_id)
            self.ids.add(element_id)

        if tag == "html":
            self.lang = values.get("lang") or ""
        if tag == "title":
            self._in_title = True
        if tag == "h1":
            self.h1_count += 1
        if tag == "meta":
            key = (values.get("property") or values.get("name") or "").lower()
            if key:
                self.meta[key] = (values.get("content") or "").strip()
                self.meta_counts[key] = self.meta_counts.get(key, 0) + 1
            if key == "description":
                self.has_description = bool(self.meta[key])
        if tag == "link" and "canonical" in (values.get("rel") or "").lower().split():
            if values.get("href"):
                self.canonicals.append(values["href"])

        if tag in {"a", "link"} and values.get("href"):
            self.refs.append((tag, values["href"]))
        if tag in {"img", "script", "source", "iframe", "video", "audio"} and values.get("src"):
            self.refs.append((tag, values["src"]))
        if tag == "img" and not values.get("alt", "").strip():
            self.images_without_alt.append(values.get("src", "(imagen sin src)") or "(imagen sin src)")

        if tag == "script":
            self._script = {
                "type": (values.get("type") or "").lower(),
                "src": values.get("src"),
                "parts": [],
            }

    def handle_endtag(self, tag: str) -> None:
        if tag == "title":
            self._in_title = False
        if tag == "script" and self._script is not None:
            script_type = str(self._script["type"])
            source = "".join(self._script["parts"])  # type: ignore[arg-type]
            if script_type == "application/ld+json":
                self.scripts.append(("json", source))
            elif not self._script["src"] and script_type in {"", "text/javascript", "module"}:
                self.scripts.append(("javascript", source))
            self._script = None

    def handle_data(self, data: str) -> None:
        if self._in_title:
            self.title_parts.append(data)
        if self._script is not None:
            self._script["parts"].append(data)  # type: ignore[union-attr]


def resolve_local(page: Path, raw_url: str) -> tuple[Path, str]:
    parsed = urlsplit(raw_url)
    if parsed.scheme or parsed.netloc:
        return Path(), parsed.fragment
    if parsed.path.startswith("/"):
        raise ValueError(f"{page}: ruta local absoluta no compatible con Pages en subruta: {raw_url}")
    raw_path = unquote(parsed.path)
    target = (ROOT / page.parent / raw_path).resolve() if raw_path else (ROOT / page).resolve()
    if ROOT not in target.parents and target != ROOT:
        raise ValueError(f"{page}: referencia fuera del repositorio: {raw_url}")
    if target.is_dir():
        target = target / "index.html"
    return target, parsed.fragment



def extract_array_body(source: str, variable: str) -> str | None:
    """Return the literal body of a small JavaScript data array."""
    match = re.search(rf"const\s+{re.escape(variable)}\s*=\s*\[(.*?)\];", source, re.DOTALL)
    return match.group(1) if match else None


def main() -> None:
    audits: dict[Path, PageAudit] = {}
    errors: list[str] = []

    for relative in SITE_PAGES:
        file_path = ROOT / relative
        if not file_path.is_file():
            errors.append(f"Falta la página pública {relative.as_posix()}")
            continue
        parser = PageAudit(relative)
        try:
            parser.feed(file_path.read_text(encoding="utf-8"))
            parser.close()
        except Exception as exc:
            errors.append(f"{relative.as_posix()}: HTML no procesable: {exc}")
            continue
        audits[relative] = parser

        page_source = file_path.read_text(encoding="utf-8")
        if not re.search(r'<button\b(?=[^>]*class="mobile-menu")(?=[^>]*aria-controls="primary-navigation")(?=[^>]*aria-expanded="false")(?=[^>]*aria-label="Abrir menú de navegación")[^>]*>', page_source, re.IGNORECASE):
            errors.append(f"{relative.as_posix()}: falta el botón accesible del menú móvil")
        if not re.search(r'<nav\b(?=[^>]*id="primary-navigation")(?=[^>]*aria-label="Navegación principal")[^>]*>', page_source, re.IGNORECASE):
            errors.append(f"{relative.as_posix()}: falta la navegación principal identificada para el menú móvil")
        if not re.search(r'<a\b(?=[^>]*class="active")(?=[^>]*aria-current="page")[^>]*>', page_source, re.IGNORECASE):
            errors.append(f"{relative.as_posix()}: el enlace activo debe declarar aria-current=page")
        if not re.search(r'<script\b(?=[^>]*src="(?:\.\./|\./)?assets/js/site-navigation\.js")(?=[^>]*\bdefer\b)[^>]*>', page_source, re.IGNORECASE):
            errors.append(f"{relative.as_posix()}: falta cargar site-navigation.js con defer")

        title = "".join(parser.title_parts).strip()
        if not parser.lang:
            errors.append(f"{relative.as_posix()}: falta lang en <html>")
        if not title:
            errors.append(f"{relative.as_posix()}: falta <title>")
        if not parser.has_description:
            errors.append(f"{relative.as_posix()}: falta meta description")
        if parser.canonicals != [PAGE_URLS[relative]]:
            errors.append(f"{relative.as_posix()}: canonical ausente, duplicada o distinta de {PAGE_URLS[relative]}")
        for key in REQUIRED_SOCIAL_META:
            if not parser.meta.get(key):
                errors.append(f"{relative.as_posix()}: falta metadato social {key}")
            if parser.meta_counts.get(key, 0) != 1:
                errors.append(f"{relative.as_posix()}: el metadato {key} debe aparecer exactamente una vez")
        if parser.h1_count != 1:
            errors.append(f"{relative.as_posix()}: se esperaba exactamente un H1 y se encontraron {parser.h1_count}")
        image_url = parser.meta.get("og:image", "")
        image_parts = urlsplit(image_url)
        base_parts = urlsplit(PUBLIC_BASE)
        if image_parts.netloc != base_parts.netloc or not image_parts.path.startswith(base_parts.path):
            errors.append(f"{relative.as_posix()}: og:image debe apuntar a un recurso del sitio público")
        else:
            image_path = ROOT / unquote(image_parts.path[len(base_parts.path):])
            if not image_path.is_file():
                errors.append(f"{relative.as_posix()}: og:image no existe en el repositorio: {image_url}")
        if parser.duplicates:
            errors.append(f"{relative.as_posix()}: IDs duplicados: {', '.join(sorted(parser.duplicates))}")
        if parser.images_without_alt:
            errors.append(f"{relative.as_posix()}: imágenes sin alt: {', '.join(parser.images_without_alt)}")
        if relative == Path("index.html"):
            page_source = file_path.read_text(encoding="utf-8")
            map_path = ROOT / "mapa-ia/index.html"
            css_path = ROOT / "assets/css/erica.css"
            if not map_path.is_file():
                errors.append("Falta mapa-ia/index.html para contrastar el esquema territorial de Inicio")
            else:
                map_source = map_path.read_text(encoding="utf-8")
                map_data_path = ROOT / "assets/js/mapa-ia.js"
                if not map_data_path.is_file():
                    errors.append("Falta assets/js/mapa-ia.js para contrastar el esquema territorial de Inicio")
                    map_data_source = ""
                else:
                    map_data_source = map_data_path.read_text(encoding="utf-8")
                locality_body = extract_array_body(map_data_source, "localities")
                opportunity_body = extract_array_body(map_data_source, "opportunities")
                if locality_body is None or opportunity_body is None:
                    errors.append("Mapa IA: no se pudieron leer las listas de localidades y tesis desde assets/js/mapa-ia.js")
                else:
                    localities = re.findall(r'\{\s*id:"([^"]+)",\s*name:"([^"]+)",\s*lat:', locality_body)
                    opportunities = re.findall(r'\{\s*id:"([^"]+)",\s*stage:"([^"]+)",\s*name:"([^"]+)",\s*lat:', opportunity_body)
                    svg_match = re.search(r'<svg\b(?=[^>]*\bclass="territory-diagram")[^>]*>(.*?)</svg>', page_source, re.DOTALL)
                    if not svg_match:
                        errors.append("Inicio: falta el esquema SVG de referencias territoriales")
                    else:
                        svg_source = svg_match.group(1)
                        locality_marks = len(re.findall(r'<g\b[^>]*class="locality-mark"', svg_source))
                        thesis_marks = len(re.findall(r'class="thesis-mark\b', svg_source))
                        documented_marks = len(re.findall(r'class="thesis-mark documented-mark"', svg_source))
                        hypothesis_marks = len(re.findall(r'class="thesis-mark hypothesis-mark"', svg_source))
                        expected_documented = sum(stage == "documented" for _, stage, _ in opportunities)
                        expected_hypothesis = sum(stage == "hypothesis" for _, stage, _ in opportunities)
                        if locality_marks != len(localities):
                            errors.append(f"Inicio: el esquema muestra {locality_marks} localidades, pero Mapa IA contiene {len(localities)}")
                        if thesis_marks != len(opportunities):
                            errors.append(f"Inicio: el esquema muestra {thesis_marks} tesis, pero Mapa IA contiene {len(opportunities)}")
                        if documented_marks != expected_documented or hypothesis_marks != expected_hypothesis:
                            errors.append("Inicio: la leyenda visual de evidencia no coincide con las etapas de las tesis del Mapa IA")
                        for _, locality_name in localities:
                            if locality_name.upper() not in svg_source:
                                errors.append(f"Inicio: falta la localidad {locality_name} en el esquema territorial")
                        if 'id="map-preview-title"' not in svg_source or 'id="map-preview-description"' not in svg_source:
                            errors.append("Inicio: el esquema territorial necesita título y descripción accesibles")
                if "no representa límites municipales, calles, parcelas ni disponibilidad inmobiliaria" not in page_source:
                    errors.append("Inicio: falta aclarar que el esquema no es cartografía parcelaria ni acredita disponibilidad")
                if "no una cartografía oficial ni un inventario de terrenos" not in page_source:
                    errors.append("Inicio: falta distinguir el esquema editorial de una cartografía oficial")
            if not css_path.is_file():
                errors.append("Falta assets/css/erica.css para el esquema territorial")
            else:
                css_source = css_path.read_text(encoding="utf-8")
                for required_style in (".territory-diagram", ".map-art-legend", ".hypothesis-mark", ".map-art{min-height:0}"):
                    if required_style not in css_source:
                        errors.append(f"assets/css/erica.css: falta estilo del esquema territorial: {required_style}")

        if relative == Path("mapa-ia/index.html"):
            for required_atlas_markup in (
                'id="atlas-index-status"',
                'id="atlas-localities-count"',
                'id="atlas-documented-count"',
                'id="atlas-hypotheses-count"',
                'id="atlas-total-count"',
                "La forma distingue la clase",
                "El índice cuenta fichas del inventario"
            ):
                if required_atlas_markup not in page_source:
                    errors.append(f"mapa-ia/index.html: falta el índice cartográfico: {required_atlas_markup}")
            if "ficha editorial descargable" not in page_source:
                errors.append("mapa-ia/index.html: falta explicar la ficha editorial descargable para desarrolladores")
            if 'id="export-geojson"' not in page_source:
                errors.append("mapa-ia/index.html: falta la descarga GeoJSON de referencias visibles")
            for review_id in ('id="export-review"', 'id="review-status"'):
                if review_id not in page_source:
                    errors.append(f"mapa-ia/index.html: falta el control de bitácora local {review_id}")
            if "no se envían al servidor" not in page_source or "no certifica" not in page_source:
                errors.append("mapa-ia/index.html: falta explicar privacidad y alcance de la bitácora")
            if "QGIS u otros sistemas GIS" not in page_source:
                errors.append("mapa-ia/index.html: falta explicar el uso y alcance de la exportación GeoJSON")
            for required_source_markup in (
                'id="map-verification-title"',
                'href="https://mapas.moreno.gob.ar/" target="_blank" rel="noopener noreferrer"',
                'href="https://arba.gov.ar/geoarba/inicio.asp" target="_blank" rel="noopener noreferrer"',
                'href="https://geo.arba.gov.ar/geoserver/idera/wms?request=GetCapabilities&amp;service=WMS"',
                'href="https://geo.arba.gov.ar/geoserver/idera/wfs?request=GetCapabilities&amp;service=WFS"',
                'href="https://www.moreno.gob.ar/catastro.php" target="_blank" rel="noopener noreferrer"',
                'href="https://moreno.gob.ar/catastro-contribuyentes.php" target="_blank" rel="noopener noreferrer"',
                'href="https://moreno.gob.ar/catastro.php?c=agrimensores" target="_blank" rel="noopener noreferrer"',
                'href="https://iduar.moreno.gob.ar/obras-particulares/" target="_blank" rel="noopener noreferrer"',
                'href="https://moreno.gob.ar/docs/catastro/codigo_zonificacion.pdf" target="_blank" rel="noopener noreferrer"',
                'href="https://moreno2.moreno.gob.ar/docs/catastro/mapa_zonificacion.pdf" target="_blank" rel="noopener noreferrer"',
                "anexo de junio de 2015",
                "no confirma la normativa vigente",
                "modificatorias y el texto vigente",
                "nomenclatura catastral",
                "fecha de consulta",
                "MORENO no recibe DNI, escrituras ni planos"
            ):
                if required_source_markup not in page_source:
                    errors.append(f"mapa-ia/index.html: falta fuente o control de verificación: {required_source_markup}")
            if len(re.findall(r'<article class="verification-source"', page_source)) != 4:
                errors.append("mapa-ia/index.html: la mesa de verificación debe presentar cuatro rutas institucionales")

            for required_markup in (
                'href="https://unpkg.com/maplibre-gl@5.6.1/dist/maplibre-gl.css"',
                'href="../assets/css/mapa-ia.css"',
                'src="https://unpkg.com/maplibre-gl@5.6.1/dist/maplibre-gl.js"',
                'src="../assets/js/mapa-ia.js"',
            ):
                if required_markup not in page_source:
                    errors.append(f"{relative.as_posix()}: falta integración MapLibre/OpenStreetMap: {required_markup}")
            if "leaflet" in page_source.lower():
                errors.append(f"{relative.as_posix()}: quedaron referencias al motor Leaflet anterior")

            map_js_path = ROOT / "assets/js/mapa-ia.js"
            if not map_js_path.is_file():
                errors.append("Falta assets/js/mapa-ia.js para el Mapa IA")
            else:
                map_js = map_js_path.read_text(encoding="utf-8")
                for required_logic in (
                    "new maplibregl.Map(",
                "mapElement.replaceChildren();",
                    "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
                "attributionControl: { compact: false }",
                "https://www.openstreetmap.org/fixthemap",
                    'map.addSource("moreno-boundary"',
                    'doc.createElement("details")',
                    'doc.createElement("summary")',
                    'addDetail("Línea a investigar", item.business)',
                    'addDetail("Qué sabemos", item.evidence)',
                    'addDetail("Estado de verificación", item.status)',
                    'addDetail("Próximo paso", item.next)',
                    "link.href = item.source",
                    'link.textContent = "Abrir referencia externa ↗"',
                    'focusButton.textContent = "Ubicar en el mapa"',
                    'focusButton.setAttribute("aria-label", "Centrar el mapa en " + item.name)',
                    "function setActiveReference(item, options)",
                    "function getSharedReferenceId(search, items)",
                    "function buildReferenceUrl(baseUrl, referenceId)",
                    "function buildOpportunityContactUrl(baseUrl, item)",
                    'url.searchParams.delete("map_name")',
                    'link.textContent = "Consultar sobre esta referencia ↗"',
                    'contactLinkNode(item, "map-contact-link")',
                    "updateShareUrl(item.id)",
                    'shareLink.textContent = "Abrir ficha compartible ↗"',
                    "if (sharedItem) focusItem(sharedItem)",
                    'map.on("dragstart", markUserNavigation)',
                    'map.on("zoomstart", markUserNavigation)',
                    "function shouldFitMunicipalBounds(selectedReferenceId, userHasNavigated)",
                    "shouldFitMunicipalBounds(selectedReferenceId, userHasNavigated)",
                    "function prefersReducedMotion(view)",
                    "map.jumpTo(camera)",
                    "map.jumpTo(home)",
                    'card.dataset.mapItem = item.id',
                    'element.addEventListener("click", () => {',
                    "function filterReferences",
                    "function countInventory(items)",
                    "function updateAtlasIndex(items)",
                    'getElementById("atlas-localities-count")',
                    'getElementById("atlas-documented-count")',
                    'getElementById("atlas-hypotheses-count")',
                    'getElementById("atlas-total-count")',
                    "updateAtlasIndex(shown)",
                    '"fill-color": "#4a4d46"',
                    '"line-color": "#444840"',
                    "function buildCsv",
                    "function buildGeoJson(items)",
                    "function buildTerritorialBrief(item, generatedAt)",
                    "function buildTerritorialBriefHtml(brief)",
                    "function downloadTerritorialBrief(item)",
                    'briefButton.className = "map-brief-button"',
                    'link.download = "moreno-ficha-prospeccion-" + item.id + ".html"',
                    "function normalizeReviewState(raw, items)",
                    "function isValidReviewDate(value)",
                    "LEGACY_REVIEW_STORAGE_KEY",
                    "source_document:",
                    "consulted_at:",
                    "function readReviewState(storage, items)",
                    "function writeReviewState(storage, state, items)",
                    "function updateReviewState(state, referenceId, taskId, completed, items, details)",
                    "function getReviewSummary(state, referenceId)",
                    "function buildReviewExport(state, items, generatedAt)",
                    "function parseReviewImport(payload, items)",
                    "function mergeReviewStates(localState, importedState, items)",
                    "file.size > 1000000",
                    "function exportVisibleReview()",
                    'getElementById("export-review")',
                    'getElementById("import-review")',
                    'getElementById("import-review-file")',
                    'getElementById("review-status")',
                    "REVIEW_STORAGE_KEY",
                    "line_to_investigate:",
                    "function exportVisibleGeoJson()",
                    'getElementById("export-geojson")',
                    'type: "application/geo+json;charset=utf-8"',
                    'parcel_identified: false',
                    'availability_verified: false'
                ):
                    if required_logic not in map_js:
                        errors.append(f"assets/js/mapa-ia.js: falta comportamiento del Mapa IA: {required_logic}")

            map_css_path = ROOT / "assets/css/mapa-ia.css"
            if not map_css_path.is_file():
                errors.append("Falta assets/css/mapa-ia.css para la cartografía MapLibre")
            else:
                map_css = map_css_path.read_text(encoding="utf-8")
                for required_style in (
                    ".map-canvas .maplibregl-canvas",
                    ".map-atlas-index",
                    ".map-atlas-stat",
                    ".map-pin-hypothesis.is-selected",
                    ".documented-dot",
                    ".hypothesis-dot",
                    ".map-pin-locality",
                    ".map-pin-documented",
                    ".map-pin-hypothesis",
                    ".map-pin.is-selected",
                    ".map-item.is-active",
                    ".map-share-link",
                    ".map-brief-intro",
                    ".map-brief-button",
                    ".map-brief-button:focus-visible",

                    ".map-contact-link",
                    ".map-review-toolbar",
                    ".map-review-toolbar-actions",
                    ".map-review-import-note",
                    ".map-review-panel",
                    ".map-review-checklist",
                    ".map-review-task",
                    ".map-review-fields",
                    ".map-review-field",
                    ".map-review-legacy",
                    "order: -1",
                    "order: 1",
                    "height: 480px",
                    ".map-verification-heading",
                    ".verification-source-grid",
                    ".verification-caution",
                    ".verification-checklist",
                    "@media (max-width: 760px)"
                ):
                    if required_style not in map_css:
                        errors.append(f"assets/css/mapa-ia.css: falta estilo requerido: {required_style}")

        if relative == Path("oportunidades/index.html"):
            page_source = file_path.read_text(encoding="utf-8")
            for required_field in ('name="nombre"', 'name="perfil"', 'name="interes"', 'name="zona"', 'name="ubicacion"', 'name="nomenclatura"', 'name="documentacion"', 'name="verificaciones"'):
                if required_field not in page_source:
                    errors.append(f"{relative.as_posix()}: falta campo obligatorio {required_field}")
            if 'id="opportunity-form"' not in page_source:
                errors.append(f"{relative.as_posix()}: falta el formulario de oportunidades")
            for required_id in ("map-reference-context", "map-reference-value"):
                if required_id not in parser.ids:
                    errors.append(f"{relative.as_posix()}: falta el contexto comercial del Mapa IA: {required_id}")
            if 'class="originacion-workbench"' not in page_source or "Esta mesa no tiene autenticación" not in page_source:
                errors.append("Oportunidades: falta explicar el alcance local y la ausencia de autenticación de la mesa de originación")
            if len(re.findall(r'data-check-id="(?:cadastral|legal|zoning|environment|services|market)"', page_source)) != 6:
                errors.append("Oportunidades: el control de diligencia debe cubrir seis áreas")
            if len(re.findall(r'data-evidence-label="(?:title|classification|url|consultedAt|note)"', page_source)) != 5:
                errors.append("Oportunidades: las cinco etiquetas de fuentes dinámicas deben estar declaradas")
            for check_key in ("cadastral", "legal", "zoning", "environment", "services", "market"):
                for field in ("status", "source", "consultedAt", "note"):
                    control_id = f"originacion-check-{check_key}-{field}"
                    if f'id="{control_id}"' not in page_source or f'for="{control_id}"' not in page_source:
                        errors.append(f"Oportunidades: el control {control_id} debe tener una etiqueta asociada")
            workbench_match = re.search(r'<details\b[^>]*id="originacion-workbench"[^>]*>(.*?)</details>', page_source, re.DOTALL)
            if not workbench_match or re.search(r'\bname\s*=', workbench_match.group(1)):
                errors.append("Oportunidades: la mesa interna no debe añadir campos al mensaje público de contacto")
            if "Los campos internos de originación, negociación y honorarios no forman parte de este mensaje." not in (ROOT / "assets/js/opportunity-tools.js").read_text(encoding="utf-8"):
                errors.append("Oportunidades: los datos internos deben quedar fuera del borrador de WhatsApp")
            if "https://wa.me/5491141671674?text=" not in page_source:
                errors.append(f"{relative.as_posix()}: falta el destino de WhatsApp del formulario")
            if "El sitio no recibe ni almacena estos datos" not in page_source:
                errors.append(f"{relative.as_posix()}: falta la explicación de privacidad del formulario")
            for required_id in ("parcel-area", "parcel-fos", "parcel-fot", "parcel-reference", "feasibility-calculate", "feasibility-results", "contact-address", "contact-cadastral", "documentation-checklist", "verification-checklist", "contact-preview", "contact-message-preview", "copy-contact-message", "open-whatsapp", "download-opportunity-dossier", "originacion-workbench", "originacion-evidence-list", "originacion-evidence-template", "originacion-add-evidence", "originacion-status", "originacion-fee-currency", "originacion-commercial-stage", "originacion-follow-up-date", "originacion-print-dossier", "originacion-download-dossier"):
                if required_id not in parser.ids:
                    errors.append(f"{relative.as_posix()}: falta control de cálculo {required_id}")
            for required_logic in ("MorenoOpportunityTools.calculatePreliminary", "MorenoOpportunityTools.readMapReference", "MorenoOpportunityTools.buildContactMessage", "MorenoOpportunityTools.buildWhatsAppUrl", "MorenoOpportunityTools.buildOpportunityDossierExport", "MorenoOriginacionWorkbench.read()", "MorenoOriginacionWorkbench.apply", "validateOriginacionForExport", "buildInternalDossierInput()", 'data.fields.nombre=""', 'data.fields.detalle=""', "internalData:window.MorenoOriginacionWorkbench.read()", 'formData.getAll("documentacion")', 'formData.getAll("verificaciones")', "navigator.clipboard.writeText", "Consulta iniciada desde el Mapa IA"):
                if required_logic not in page_source:
                    errors.append(f"{relative.as_posix()}: falta integración de la lógica de oportunidades: {required_logic}")
            if not re.search(r"contactPreview\.hidden\s*=\s*false", page_source):
                errors.append(f"{relative.as_posix()}: la vista previa no se muestra al preparar el borrador")
            if not re.search(r'<button\b[^>]*id="feasibility-calculate"[^>]*type="button"[^>]*>', page_source, re.IGNORECASE):
                errors.append(f"{relative.as_posix()}: el botón de cálculo no debe enviar el formulario de contacto")
            originacion_module = ROOT / "assets/js/originacion-workbench.js"
            if not originacion_module.is_file():
                errors.append("Falta assets/js/originacion-workbench.js")
            else:
                originacion_source = originacion_module.read_text(encoding="utf-8")
                for required_logic in ("MorenoOriginacionWorkbench", "function read()", "function apply(data)", "MAX_EVIDENCE = 8", "tools.validateInternalDossier", "data-check-id", "data-evidence-row"):
                    if required_logic not in originacion_source:
                        errors.append(f"assets/js/originacion-workbench.js: falta lógica requerida: {required_logic}")
                for forbidden_logic in ("localStorage", "sessionStorage", "fetch(", "XMLHttpRequest", "innerHTML"):
                    if forbidden_logic in originacion_source:
                        errors.append(f"assets/js/originacion-workbench.js: no debe usar {forbidden_logic}")
            originacion_css = ROOT / "assets/css/originacion.css"
            if not originacion_css.is_file():
                errors.append("Falta assets/css/originacion.css")
            else:
                originacion_style = originacion_css.read_text(encoding="utf-8")
                for required_style in (".originacion-workbench", ".originacion-warning", ".originacion-check-grid", ".originacion-evidence-row", ".originacion-fees-grid", ".originacion-export-actions", ".originacion-status", "@media (max-width: 760px)"):
                    if required_style not in originacion_style:
                        errors.append(f"assets/css/originacion.css: falta estilo requerido: {required_style}")
            module_path = ROOT / "assets/js/opportunity-tools.js"
            if not module_path.is_file():
                errors.append("Falta assets/js/opportunity-tools.js")
            else:
                module_source = module_path.read_text(encoding="utf-8")
                for required_logic in ("area.value * fos.value", "area.value * fot.value", "buildLeadNote", "readMapReference", "mapReferenceNames = Object.freeze({", "mapReferenceNames[id]", "Object.prototype.hasOwnProperty.call(mapReferenceNames, id)", "buildContactMessage", "buildWhatsAppUrl", "formatFieldValue", "Documentación disponible (declarada)", "Consultas realizadas (declaradas)", "no constituyen verificación independiente", "Ubicación o referencia", "Referencia del Mapa IA", "Partida o nomenclatura catastral", "No se realizó el cálculo", "Este resultado es matemático y orientativo", "buildOpportunityDossierExport", "schemaVersion", "preliminary-unverified"):
                    if required_logic not in module_source:
                        errors.append(f"assets/js/opportunity-tools.js: falta lógica requerida: {required_logic}")
            if 'id="contact-message-preview"' in page_source and 'id="contact-message-preview" rows="12" readonly' not in page_source:
                errors.append(f"{relative.as_posix()}: el borrador de contacto debe ser visible solo para lectura")
            if "window.location.href" in page_source:
                errors.append(f"{relative.as_posix()}: el formulario no debe redirigir automáticamente sin revisión del borrador")
            if "Si solo conocés la superficie" not in page_source:
                errors.append(f"{relative.as_posix()}: falta explicar que se puede iniciar contacto sin FOS/FOT")
            documentation_checks = re.findall(r'<input\b[^>]*type="checkbox"[^>]*name="documentacion"', page_source)
            verification_checks = re.findall(r'<input\b[^>]*type="checkbox"[^>]*name="verificaciones"', page_source)
            if len(documentation_checks) < 6:
                errors.append(f"{relative.as_posix()}: se esperaban al menos seis opciones de documentación")
            if len(verification_checks) < 5:
                errors.append(f"{relative.as_posix()}: se esperaban al menos cinco opciones de consultas realizadas")
            if "no constituyen verificación independiente" not in page_source and "no constituyen verificación independiente" not in module_source:
                errors.append(f"{relative.as_posix()}: falta aclarar que las selecciones no son verificaciones independientes")
            opportunity_css = ROOT / "assets/css/erica.css"
            if not opportunity_css.is_file() or ".map-reference-context" not in opportunity_css.read_text(encoding="utf-8"):
                errors.append("assets/css/erica.css: falta estilo del contexto comercial transferido desde el Mapa IA")

        for script_kind, source in parser.scripts:
            if script_kind == "json":
                try:
                    json.loads(source)
                except json.JSONDecodeError as exc:
                    errors.append(f"{relative.as_posix()}: JSON-LD inválido: {exc}")
            else:
                for match in re.finditer(r'getElementById\(\s*["\']([^"\']+)["\']\s*\)', source):
                    if match.group(1) not in parser.ids:
                        errors.append(f"{relative.as_posix()}: JavaScript busca un ID inexistente: {match.group(1)}")

    for relative, parser in audits.items():
        for tag, raw_url in parser.refs:
            try:
                target, fragment = resolve_local(relative, raw_url)
            except ValueError as exc:
                errors.append(str(exc))
                continue
            if target == Path():
                continue
            if not target.exists():
                errors.append(f"{relative.as_posix()}: {tag} apunta a un recurso inexistente: {raw_url}")
                continue
            if fragment and target.suffix.lower() in {".html", ".htm"}:
                target_relative = target.relative_to(ROOT)
                target_audit = audits.get(target_relative)
                if target_audit is None:
                    target_parser = PageAudit(target_relative)
                    try:
                        target_parser.feed(target.read_text(encoding="utf-8"))
                        target_parser.close()
                        target_audit = target_parser
                    except Exception as exc:
                        errors.append(f"No se pudo comprobar el destino {target_relative}: {exc}")
                if target_audit and unquote(fragment) not in target_audit.ids:
                    errors.append(f"{relative.as_posix()}: el fragmento #{fragment} no existe en {target_relative.as_posix()}")

    robots_path = ROOT / "robots.txt"
    if not robots_path.is_file():
        errors.append("Falta robots.txt")
    else:
        robots = robots_path.read_text(encoding="utf-8")
        if "User-agent: *" not in robots or "Allow: /" not in robots:
            errors.append("robots.txt debe permitir el rastreo público")
        if f"Sitemap: {PUBLIC_BASE}sitemap.xml" not in robots:
            errors.append("robots.txt no declara el sitemap.xml canónico")

    sitemap_path = ROOT / "sitemap.xml"
    if not sitemap_path.is_file():
        errors.append("Falta sitemap.xml")
    else:
        try:
            root = ET.parse(sitemap_path).getroot()
            locations = [node.text.strip() for node in root.iter() if node.tag.endswith("loc") and node.text]
            expected = set(PAGE_URLS.values())
            if len(locations) != len(expected) or set(locations) != expected:
                errors.append(f"sitemap.xml debe listar exactamente las {len(expected)} páginas públicas canónicas")
        except (ET.ParseError, OSError) as exc:
            errors.append(f"sitemap.xml inválido: {exc}")


    pipeline_template = ROOT / "docs/plantilla-seguimiento-comercial.csv"
    if not pipeline_template.is_file():
        errors.append("Falta docs/plantilla-seguimiento-comercial.csv")
    else:
        expected_headers = [
            "id_oportunidad", "fecha_alta", "referencia_origen", "localidad", "tipo_activo",
            "identificacion_catastral", "fuente_origen", "tipo_contraparte", "tipo_operacion",
            "etapa_comercial", "estado_documental", "proxima_accion", "fecha_proximo_seguimiento",
            "honorarios_propuestos", "honorarios_acordados", "honorarios_facturados",
            "honorarios_cobrados", "moneda", "fecha_ultima_actualizacion", "observaciones_no_sensibles",
        ]
        try:
            with pipeline_template.open("r", encoding="utf-8-sig", newline="") as template_file:
                template_rows = list(csv.reader(template_file, delimiter=";"))
            if not template_rows or template_rows[0] != expected_headers:
                errors.append("La plantilla CSV no coincide con el esquema de seguimiento comercial esperado")
            if len(template_rows) != 1:
                errors.append("La plantilla CSV debe permanecer vacía, sin oportunidades de ejemplo")
        except (OSError, UnicodeError, csv.Error) as exc:
            errors.append(f"No se pudo leer la plantilla CSV de seguimiento: {exc}")

    node = shutil.which("node")
    if node:
        for test_name in ("test_opportunity_tools.js", "test_site_navigation.js", "test_mapa_ia.js", "test_pipeline_dashboard.js", "test_pipeline_dashboard_ui.js"):
            test_script = ROOT / "scripts" / test_name
            if not test_script.is_file():
                errors.append(f"Falta scripts/{test_name}")
                continue
            unit_test = subprocess.run([node, str(test_script)], capture_output=True, text=True, check=False)
            if unit_test.returncode:
                detail = (unit_test.stderr or unit_test.stdout).strip()
                errors.append(f"Pruebas {test_name} fallidas: {detail}")
            elif unit_test.stdout.strip():
                print(unit_test.stdout.strip())

        for script_path in (ROOT / "assets/js/site-navigation.js", ROOT / "assets/js/opportunity-tools.js", ROOT / "assets/js/originacion-workbench.js", ROOT / "assets/js/mapa-ia.js", ROOT / "assets/js/pipeline-dashboard.js", ROOT / "assets/js/pipeline-agenda.js", ROOT / "assets/js/pipeline-dashboard-ui.js"):
            if script_path.is_file():
                syntax_check = subprocess.run([node, "--check", str(script_path)], capture_output=True, text=True, check=False)
                if syntax_check.returncode:
                    detail = (syntax_check.stderr or syntax_check.stdout).strip()
                    errors.append(f"{script_path.relative_to(ROOT).as_posix()}: sintaxis JavaScript inválida: {detail}")

        for relative, parser in audits.items():
            for index, (kind, source) in enumerate(parser.scripts):
                if kind != "javascript" or not source.strip():
                    continue
                with tempfile.NamedTemporaryFile("w", suffix=".js", encoding="utf-8") as temp:
                    temp.write(source)
                    temp.flush()
                    check = subprocess.run([node, "--check", temp.name], capture_output=True, text=True, check=False)
                if check.returncode:
                    detail = (check.stderr or check.stdout).strip()
                    errors.append(f"{relative.as_posix()}: JavaScript inline #{index + 1} inválido: {detail}")
    else:
        print("WARN: Node.js no está disponible; se omite la comprobación sintáctica de JavaScript.")

    opportunity_page = ROOT / "oportunidades/index.html"
    if not opportunity_page.is_file():
        errors.append("Falta oportunidades/index.html para la importación de expedientes")
    else:
        opportunity_html = opportunity_page.read_text(encoding="utf-8")
        if 'href="../docs/plantilla-seguimiento-comercial.csv"' not in opportunity_html:
            errors.append("Oportunidades debe enlazar la plantilla CSV de seguimiento comercial")
        if "pipeline-template-guide" not in opportunity_html:
            errors.append("Oportunidades debe explicar las etapas y la separación de honorarios")
        if 'id="pipeline-download-agenda"' not in opportunity_html:
            errors.append("Oportunidades debe ofrecer la descarga de la agenda de seguimiento")
        if 'src="../assets/js/pipeline-agenda.js"' not in opportunity_html:
            errors.append("Oportunidades debe cargar el módulo de agenda comercial")
        for required_control in ("dossier-import-file", "validate-dossier-import", "apply-dossier-merge", "apply-dossier-replace"):
            if f'id="{required_control}"' not in opportunity_html:
                errors.append(f"oportunidades/index.html: falta control de importación: {required_control}")
        for required_control in ("pipeline-csv-file", "pipeline-status", "pipeline-dashboard-output", "pipeline-reset", "pipeline-metrics", "pipeline-finance-summary", "pipeline-stage-summary", "pipeline-next-actions", "pipeline-records-body", "pipeline-filter-stage", "pipeline-filter-text", "pipeline-download-summary"):
            if f'id="{required_control}"' not in opportunity_html:
                errors.append(f"oportunidades/index.html: falta control del tablero comercial: {required_control}")
        if 'id="pipeline-download-summary" type="button" disabled' not in opportunity_html:
            errors.append("Oportunidades debe mantener deshabilitada la exportación hasta validar un CSV.")
        if '<link rel="stylesheet" href="../assets/css/originacion.css">' not in opportunity_html:
            errors.append("Oportunidades debe cargar la hoja responsive de la mesa de originación")
        if '<script src="../assets/js/originacion-workbench.js"></script>' not in opportunity_html:
            errors.append("Oportunidades debe cargar el módulo de interfaz de la mesa de originación")
        for script_src in ("../assets/js/pipeline-dashboard.js", "../assets/js/pipeline-dashboard-ui.js"):
            if f'<script src="{script_src}"></script>' not in opportunity_html:
                errors.append(f"oportunidades/index.html: falta cargar {script_src}")


    about_page = ROOT / "erica-acosta/index.html"
    if not about_page.is_file():
        errors.append("Falta erica-acosta/index.html para validar el perfil editorial")
    else:
        about_html = about_page.read_text(encoding="utf-8")
        required_markup = (
            'class="wrap about-hero"',
            'class="about-portrait-plate"',
            'class="development-plate"',
            'aria-labelledby="development-plate-title development-plate-desc"',
            'id="development-plate-title"',
            'id="development-plate-desc"',
            'class="about-contact-path"',
            'href="../oportunidades/?perfil=propietario"',
            'href="../oportunidades/?perfil=inversor"',
        )
        for required in required_markup:
            if required not in about_html:
                errors.append(f"erica-acosta/index.html: falta componente editorial o recorrido comercial: {required}")
        if len(re.findall(r'<article class="process-card"', about_html)) != 5:
            errors.append("erica-acosta/index.html: el marco de desarrollo debe conservar exactamente cinco etapas")
        if "esquema conceptual, no representa un inmueble ni un proyecto real" not in about_html.lower():
            errors.append("erica-acosta/index.html: la ilustración de proceso debe declarar su alcance conceptual")
        opportunity_path = ROOT / "oportunidades/index.html"
        opportunity_html = opportunity_path.read_text(encoding="utf-8") if opportunity_path.is_file() else ""
        if 'if(profileFromLink==="propietario")' not in opportunity_html:
            errors.append("Oportunidades: falta el prellenado del perfil propietario desde la página de Erica")
        if 'if(profileFromLink==="inversor")' not in opportunity_html:
            errors.append("Oportunidades: falta el prellenado del perfil inversor desde la página de Erica")

    opportunity_module = ROOT / "assets/js/opportunity-tools.js"
    if not opportunity_module.is_file():
        errors.append("Falta assets/js/opportunity-tools.js")
    else:
        opportunity_source = opportunity_module.read_text(encoding="utf-8")
        for required_logic in ("parseOpportunityDossierImport", "mergeImportedOpportunityData", "validateInternalDossier", "internalCheckLabels", "schemaVersion: 3"):
            if required_logic not in opportunity_source:
                errors.append(f"assets/js/opportunity-tools.js: falta lógica de expediente: {required_logic}")

    pipeline_module = ROOT / "assets/js/pipeline-dashboard.js"
    pipeline_agenda_module = ROOT / "assets/js/pipeline-agenda.js"
    pipeline_ui_module = ROOT / "assets/js/pipeline-dashboard-ui.js"
    if not pipeline_module.is_file() or not pipeline_agenda_module.is_file() or not pipeline_ui_module.is_file():
        errors.append("Faltan los módulos del tablero comercial local o de su agenda")
    else:
        pipeline_source = pipeline_module.read_text(encoding="utf-8")
        pipeline_agenda_source = pipeline_agenda_module.read_text(encoding="utf-8")
        pipeline_ui_source = pipeline_ui_module.read_text(encoding="utf-8")
        for required_logic in ("parsePipelineCsv", "summarizePipeline", "buildSummaryCsv", "spreadsheetSafeCell", "MAX_ROWS", "MAX_FILE_CHARS"):
            if required_logic not in pipeline_source:
                errors.append(f"assets/js/pipeline-dashboard.js: falta lógica requerida: {required_logic}")
        for required_logic in ("agendaItems", "buildAgendaCsv", "spreadsheetSafeCell"):
            if required_logic not in pipeline_agenda_source:
                errors.append(f"assets/js/pipeline-agenda.js: falta lógica requerida: {required_logic}")
        for required_logic in ("MorenoPipelineDashboard", "file.text()", "textContent", "pipeline-csv-file", "currentSummary = null", "downloadSummaryButton.disabled = true", "downloadAgendaButton.disabled = true", "buildAgendaCsv", "pipeline-download-agenda", "identificacion_catastral", "fuente_origen", "tipo_operacion"):
            if required_logic not in pipeline_ui_source:
                errors.append(f"assets/js/pipeline-dashboard-ui.js: falta lógica requerida: {required_logic}")
        for forbidden_logic in ("localStorage", "sessionStorage", "fetch(", "XMLHttpRequest", "innerHTML"):
            if forbidden_logic in pipeline_ui_source:
                errors.append(f"assets/js/pipeline-dashboard-ui.js: no debe usar {forbidden_logic} para procesar datos locales")

    navigation_module = ROOT / "assets/js/site-navigation.js"
    if not navigation_module.is_file():
        errors.append("Falta assets/js/site-navigation.js")
    else:
        navigation_source = navigation_module.read_text(encoding="utf-8")
        for required_logic in ("aria-expanded", "aria-label", "is-open", "Escape", "matchMedia"):
            if required_logic not in navigation_source:
                errors.append(f"assets/js/site-navigation.js: falta comportamiento requerido: {required_logic}")

    navigation_test = ROOT / "scripts/test_site_navigation.js"
    if not navigation_test.is_file():
        errors.append("Falta scripts/test_site_navigation.js")

    navigation_css = ROOT / "assets/css/erica.css"
    if not navigation_css.is_file():
        errors.append("Falta assets/css/erica.css para la navegación móvil")
    else:
        css_source = navigation_css.read_text(encoding="utf-8")
        for required_style in (".mobile-menu:focus-visible", ".has-js .nav.is-open", ".has-js .mobile-menu"):
            if required_style not in css_source:
                errors.append(f"assets/css/erica.css: falta estilo de navegación móvil: {required_style}")

        for required_style in (
            ".hero .art-panel:after{content:none}",
            ".hero .art-panel .architecture-drawing{",
            "filter:grayscale(1) contrast(1.12)",
        ):
            if required_style not in css_source:
                errors.append(f"assets/css/erica.css: falta tratamiento editorial monocromático: {required_style}")

        for required_style in (
            ".about-hero{",
            ".about-pillars{",
            ".development-plate{",
            ".about-contact-path:focus-visible",
        ):
            if required_style not in css_source:
                errors.append(f"assets/css/erica.css: falta estilo de perfil editorial: {required_style}")

    home_page = ROOT / "index.html"
    if not home_page.is_file():
        errors.append("Falta index.html para validar la lámina arquitectónica de portada")
    else:
        home_html = home_page.read_text(encoding="utf-8")
        for required_markup in (
            'class="art-panel"',
            'class="architecture-drawing"',
            'viewBox="0 0 760 820"',
            'aria-label="Ilustración arquitectónica editorial',
            'class="hero-actions hero-commercial-actions"',
            'href="./oportunidades/?perfil=propietario"',
            'href="./oportunidades/?perfil=inversor"',
            'class="hero-commercial-note"',
            'Conecto propietarios, inversores y desarrolladores en Moreno.',
        ):
            if required_markup not in home_html:
                errors.append(f"index.html: falta componente editorial o recorrido comercial: {required_markup}")
        if 'Conocé el Mapa IA' not in home_html:
            errors.append("index.html: falta el acceso secundario al Mapa IA desde la portada")
        if "no implica tasación, oferta ni compromiso de inversión" not in home_html:
            errors.append("index.html: falta aclarar el alcance exploratorio del primer contacto")

    if errors:
        for error in errors:
            print(f"ERROR: {error}")
        raise SystemExit(1)

    refs_count = sum(len(page.refs) for page in audits.values())
    print(
        f"OK: {len(audits)} páginas; {refs_count} referencias locales; canonical, OG/Twitter, "
        "robots.txt, sitemap.xml, H1, IDs, imágenes, JSON-LD, navegación móvil, MapLibre/OpenStreetMap, referencias DOM y módulos JavaScript correctos."
    )
    if node:
        print("OK: sintaxis JavaScript y pruebas unitarias de oportunidades, navegación móvil y tablero comercial local validadas con Node.js.")


if __name__ == "__main__":
    main()
