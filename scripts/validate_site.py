#!/usr/bin/env python3
"""Dependency-free quality gate for the three public MORENO site pages."""
from __future__ import annotations

import json
import shutil
import subprocess
import sys
import tempfile
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parents[1]
SITE_PAGES = (
    Path("index.html"),
    Path("mapa-ia/index.html"),
    Path("erica-acosta/index.html"),
)


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
        if tag == "meta" and (values.get("name") or "").lower() == "description":
            self.has_description = bool(values.get("content", "").strip())

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


def fail(message: str) -> None:
    print(f"ERROR: {message}")
    raise SystemExit(1)


def resolve_local(page: Path, raw_url: str) -> tuple[Path, str]:
    parsed = urlsplit(raw_url)
    if parsed.scheme or parsed.netloc:
        return Path(), parsed.fragment
    if parsed.path.startswith("/"):
        fail(f"{page}: ruta local absoluta no compatible con Pages en subruta: {raw_url}")
    raw_path = unquote(parsed.path)
    target = (ROOT / page.parent / raw_path).resolve() if raw_path else (ROOT / page).resolve()
    if ROOT not in target.parents and target != ROOT:
        fail(f"{page}: referencia fuera del repositorio: {raw_url}")
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
        if parser.duplicates:
            errors.append(f"{relative.as_posix()}: IDs duplicados: {', '.join(sorted(parser.duplicates))}")
        if parser.images_without_alt:
            errors.append(f"{relative.as_posix()}: imágenes sin alt: {', '.join(parser.images_without_alt)}")

        for script_kind, source in parser.scripts:
            if script_kind == "json":
                try:
                    json.loads(source)
                except json.JSONDecodeError as exc:
                    errors.append(f"{relative.as_posix()}: JSON-LD inválido: {exc}")
            else:
                for match in __import__("re").finditer(r'getElementById\(\s*["\']([^"\']+)["\']\s*\)', source):
                    if match.group(1) not in parser.ids:
                        errors.append(f"{relative.as_posix()}: JavaScript busca un ID inexistente: {match.group(1)}")

    for relative, parser in audits.items():
        for tag, raw_url in parser.refs:
            target, fragment = resolve_local(relative, raw_url)
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

    node = shutil.which("node")
    if node:
        for relative, parser in audits.items():
            for index, (kind, source) in enumerate(parser.scripts):
                if kind != "javascript" or not source.strip():
                    continue
                with tempfile.NamedTemporaryFile("w", suffix=".js", encoding="utf-8") as temp:
                    temp.write(source)
                    temp.flush()
                    check = subprocess.run(
                        [node, "--check", temp.name],
                        capture_output=True,
                        text=True,
                        check=False,
                    )
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
        f"OK: {len(audits)} páginas; {refs_count} referencias locales comprobadas; "
        "metadatos, IDs, imágenes, JSON-LD y referencias DOM correctos."
    )
    if node:
        print("OK: sintaxis de JavaScript inline validada con node --check.")


if __name__ == "__main__":
    main()
