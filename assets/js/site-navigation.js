(function () {
  "use strict";

  const button = document.querySelector(".mobile-menu");
  const navigation = document.getElementById("primary-navigation");
  if (!button || !navigation) return;

  document.documentElement.classList.add("has-js");

  const label = button.querySelector(".mobile-menu-label");
  const desktopQuery = window.matchMedia("(min-width: 761px)");

  function setMenuOpen(open, restoreFocus) {
    navigation.classList.toggle("is-open", open);
    button.setAttribute("aria-expanded", String(open));
    button.setAttribute("aria-label", open ? "Cerrar menú de navegación" : "Abrir menú de navegación");
    if (label) label.textContent = open ? "Cerrar" : "Menú";
    if (restoreFocus) button.focus();
  }

  button.addEventListener("click", function () {
    setMenuOpen(button.getAttribute("aria-expanded") !== "true", false);
  });

  navigation.addEventListener("click", function (event) {
    const clickedLink = event.target && typeof event.target.closest === "function" && event.target.closest("a");
    if (clickedLink) setMenuOpen(false, false);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && button.getAttribute("aria-expanded") === "true") {
      setMenuOpen(false, true);
    }
  });

  function closeOnDesktop(event) {
    if (event.matches) setMenuOpen(false, false);
  }

  if (typeof desktopQuery.addEventListener === "function") {
    desktopQuery.addEventListener("change", closeOnDesktop);
  } else if (typeof desktopQuery.addListener === "function") {
    desktopQuery.addListener(closeOnDesktop);
  }
})();
