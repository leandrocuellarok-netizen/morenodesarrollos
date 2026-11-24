#!/usr/bin/env python3
"""Dependency-free quality gate for the public MORENO website."""
from __future__ import annotations

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
                    'card.dataset.mapItem = item.id',
                    'element.addEventListener("click", () => {',
                    "function filterReferences",
                    "function buildCsv"
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
                    ".map-pin-locality",
                    ".map-pin-documented",
                    ".map-pin-hypothesis",
                    ".map-pin.is-selected",
                    ".map-item.is-active",
                    "order: -1",
                    "order: 1",
                    "height: 480px"
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
            if "https://wa.me/5491141671674?text=" not in page_source:
                errors.append(f"{relative.as_posix()}: falta el destino de WhatsApp del formulario")
            if "El sitio no recibe ni almacena estos datos" not in page_source:
                errors.append(f"{relative.as_posix()}: falta la explicación de privacidad del formulario")
            for required_id in ("parcel-area", "parcel-fos", "parcel-fot", "parcel-reference", "feasibility-calculate", "feasibility-results", "contact-address", "contact-cadastral", "documentation-checklist", "verification-checklist", "contact-preview", "contact-message-preview", "copy-contact-message", "open-whatsapp"):
                if required_id not in parser.ids:
                    errors.append(f"{relative.as_posix()}: falta control de cálculo {required_id}")
            for required_logic in ("MorenoOpportunityTools.calculatePreliminary", "MorenoOpportunityTools.buildContactMessage", "MorenoOpportunityTools.buildWhatsAppUrl", 'formData.getAll("documentacion")', 'formData.getAll("verificaciones")', "navigator.clipboard.writeText"):
                if required_logic not in page_source:
                    errors.append(f"{relative.as_posix()}: falta integración de la lógica de oportunidades: {required_logic}")
            if not re.search(r"contactPreview\.hidden\s*=\s*false", page_source):
                errors.append(f"{relative.as_posix()}: la vista previa no se muestra al preparar el borrador")
            if not re.search(r'<button\b[^>]*id="feasibility-calculate"[^>]*type="button"[^>]*>', page_source, re.IGNORECASE):
                errors.append(f"{relative.as_posix()}: el botón de cálculo no debe enviar el formulario de contacto")
            module_path = ROOT / "assets/js/opportunity-tools.js"
            if not module_path.is_file():
                errors.append("Falta assets/js/opportunity-tools.js")
            else:
                module_source = module_path.read_text(encoding="utf-8")
                for required_logic in ("area.value * fos.value", "area.value * fot.value", "buildLeadNote", "buildContactMessage", "buildWhatsAppUrl", "formatFieldValue", "Documentación disponible (declarada)", "Consultas realizadas (declaradas)", "no constituyen verificación independiente", "Ubicación o referencia", "Partida o nomenclatura catastral", "No se realizó el cálculo", "Este resultado es matemático y orientativo"):
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

    node = shutil.which("node")
    if node:
        for test_name in ("test_opportunity_tools.js", "test_site_navigation.js", "test_mapa_ia.js"):
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

        for script_path in (ROOT / "assets/js/site-navigation.js", ROOT / "assets/js/opportunity-tools.js", ROOT / "assets/js/mapa-ia.js"):
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
        print("OK: sintaxis JavaScript y pruebas unitarias de oportunidades y navegación móvil validadas con Node.js.")


if __name__ == "__main__":
    main()
