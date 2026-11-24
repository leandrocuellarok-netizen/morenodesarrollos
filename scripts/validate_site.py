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
        if relative == Path("oportunidades/index.html"):
            page_source = file_path.read_text(encoding="utf-8")
            for required_field in ('name="nombre"', 'name="perfil"', 'name="interes"', 'name="zona"'):
                if required_field not in page_source:
                    errors.append(f"{relative.as_posix()}: falta campo obligatorio {required_field}")
            if 'id="opportunity-form"' not in page_source:
                errors.append(f"{relative.as_posix()}: falta el formulario de oportunidades")
            if "https://wa.me/5491141671674?text=" not in page_source:
                errors.append(f"{relative.as_posix()}: falta el destino de WhatsApp del formulario")
            if "El sitio no recibe ni almacena estos datos" not in page_source:
                errors.append(f"{relative.as_posix()}: falta la explicación de privacidad del formulario")

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
                errors.append("sitemap.xml debe listar exactamente las tres páginas públicas canónicas")
        except (ET.ParseError, OSError) as exc:
            errors.append(f"sitemap.xml inválido: {exc}")

    node = shutil.which("node")
    if node:
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

    if errors:
        for error in errors:
            print(f"ERROR: {error}")
        raise SystemExit(1)

    refs_count = sum(len(page.refs) for page in audits.values())
    print(
        f"OK: {len(audits)} páginas; {refs_count} referencias locales; canonical, OG/Twitter, "
        "robots.txt, sitemap.xml, H1, IDs, imágenes, JSON-LD y referencias DOM correctos."
    )
    if node:
        print("OK: sintaxis de JavaScript inline validada con node --check.")


if __name__ == "__main__":
    main()
