"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const source = fs.readFileSync(path.join(__dirname, "../assets/js/site-navigation.js"), "utf8");

function harness() {
  const buttonEvents = {};
  const navigationEvents = {};
  const documentEvents = {};
  const mediaEvents = {};
  const htmlClasses = new Set();
  const navClasses = new Set();
  const attributes = new Map([
    ["aria-expanded", "false"],
    ["aria-label", "Abrir menú de navegación"]
  ]);
  const label = { textContent: "Menú" };
  let focused = false;

  const classList = {
    add(name) { navClasses.add(name); },
    remove(name) { navClasses.delete(name); },
    contains(name) { return navClasses.has(name); },
    toggle(name, force) {
      const shouldAdd = typeof force === "boolean" ? force : !navClasses.has(name);
      if (shouldAdd) navClasses.add(name);
      else navClasses.delete(name);
      return shouldAdd;
    }
  };

  const button = {
    addEventListener(name, callback) { buttonEvents[name] = callback; },
    getAttribute(name) { return attributes.get(name) || null; },
    setAttribute(name, value) { attributes.set(name, value); },
    querySelector(selector) { return selector === ".mobile-menu-label" ? label : null; },
    focus() { focused = true; }
  };

  const navigation = {
    classList,
    addEventListener(name, callback) { navigationEvents[name] = callback; }
  };

  const document = {
    documentElement: { classList: { add(name) { htmlClasses.add(name); } } },
    querySelector(selector) { return selector === ".mobile-menu" ? button : null; },
    getElementById(id) { return id === "primary-navigation" ? navigation : null; },
    addEventListener(name, callback) { documentEvents[name] = callback; }
  };

  const media = {
    matches: false,
    addEventListener(name, callback) { mediaEvents[name] = callback; }
  };
  const window = {
    matchMedia(query) {
      assert.equal(query, "(min-width: 761px)");
      return media;
    }
  };

  vm.runInNewContext(source, { document, window });

  return {
    buttonEvents, navigationEvents, documentEvents, mediaEvents,
    htmlClasses, navClasses, attributes, label, media,
    get focused() { return focused; }
  };
}

const app = harness();
assert.ok(app.htmlClasses.has("has-js"), "el documento debe activar el modo con JavaScript");
assert.equal(app.attributes.get("aria-expanded"), "false");
assert.equal(app.label.textContent, "Menú");

app.buttonEvents.click();
assert.ok(app.navClasses.has("is-open"), "el botón debe abrir el menú");
assert.equal(app.attributes.get("aria-expanded"), "true");
assert.equal(app.label.textContent, "Cerrar");
assert.equal(app.attributes.get("aria-label"), "Cerrar menú de navegación");

app.buttonEvents.click();
assert.ok(!app.navClasses.has("is-open"), "el segundo clic debe cerrar el menú");
assert.equal(app.attributes.get("aria-expanded"), "false");

app.buttonEvents.click();
app.documentEvents.keydown({ key: "Escape" });
assert.ok(!app.navClasses.has("is-open"), "Escape debe cerrar el menú");
assert.equal(app.attributes.get("aria-expanded"), "false");
assert.equal(app.focused, true, "Escape debe devolver el foco al botón");

app.buttonEvents.click();
app.navigationEvents.click({ target: { closest(selector) { return selector === "a" ? {} : null; } } });
assert.ok(!app.navClasses.has("is-open"), "seguir un enlace debe cerrar el menú");

app.buttonEvents.click();
app.mediaEvents.change({ matches: true });
assert.ok(!app.navClasses.has("is-open"), "pasar a escritorio debe cerrar el menú");
assert.equal(app.attributes.get("aria-expanded"), "false");

console.log("OK: 6 pruebas de navegación móvil, estados ARIA, Escape, enlaces y cambio a escritorio.");
