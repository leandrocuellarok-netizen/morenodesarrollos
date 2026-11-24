"use strict";

const localities=[
{id:"moreno",name:"Moreno Centro",lat:-34.6508,lng:-58.7914,info:"Cabecera administrativa y nodo urbano del partido."},
{id:"paso",name:"Paso del Rey",lat:-34.6569,lng:-58.7611,info:"Sector este. Observar conectividad, comercio, servicios y relación con Camino de la Ribera."},
{id:"lareja",name:"La Reja",lat:-34.6433,lng:-58.8286,info:"Sector oeste. Referencia para estudiar entorno recreativo, residencial y accesos."},
{id:"alvarez",name:"Francisco Álvarez",lat:-34.6186,lng:-58.8758,info:"Localidad del corredor oeste."},
{id:"trujui",name:"Trujui",lat:-34.5881,lng:-58.7583,info:"Sector norte. Área de prospección territorial."},
{id:"cuartel",name:"Cuartel V",lat:-34.5583,lng:-58.8139,info:"Sector norte. Prospección productiva y de parcelas de mayor escala."}
];
const opportunities=[
{id:"rp25",stage:"documented",name:"RP25 · Darwin Passaponti · Av. San Fernando",lat:-34.5705,lng:-58.7955,kind:"industrial",business:"Suelo industrial/logístico, depósitos, patios operativos, agrupamientos PyME y proveedores industriales.",evidence:"La Ordenanza municipal 7443/25 documenta rezonificaciones puntuales a I1/I2 para parcelas individualizadas. No debe extrapolarse a predios vecinos.",status:"Normativa documentada para polígonos específicos; parcelas y disponibilidad por verificar.",next:"Cruzar polígonos con catastro; verificar CVI, dominio, servicios, accesos y disponibilidad.",source:"https://sibom.slyt.gba.gob.ar/bulletins/14607/contents/2361465"},
{id:"ecoparque",stage:"documented",name:"Nodo RP24/RP25 · Ecoparque Industrial",lat:-34.57755,lng:-58.87202,kind:"industrial",business:"Servicios a empresas, depósitos complementarios, oficinas operativas, gastronomía de ruta y mantenimiento de flotas.",evidence:"El operador publica un fraccionamiento de 78 parcelas de 2.000 a 10.000 m² y describe infraestructura, servicios y parámetros FOS 0,6/FOT 1,2. Son datos publicados por el operador, no una verificación independiente.",status:"Disponibilidad, precios, reglamento y factibilidad actual por parcela sin confirmar.",next:"Solicitar disponibilidad y documentación vigente; contrastar indicadores con el Municipio y revisar dominio, servicios y accesos de cada parcela.",source:"https://ecoparque.com.ar/"},
{id:"ribera",stage:"documented",name:"Paso del Rey · Camino de la Ribera",lat:-34.6575,lng:-58.744,kind:"commercial",business:"Comercio, gastronomía, servicios, estacionamiento y reconversión de inmuebles.",evidence:"La Provincia documentó obras de conexión, puente, pavimentos, drenajes e iluminación.",status:"Infraestructura documentada; activos inmobiliarios concretos por detectar.",next:"Identificar frentes y parcelas; revisar cotas, drenaje, riesgo hídrico y usos.",source:"https://www.gba.gob.ar/node/51424"},
{id:"roggero",stage:"documented",name:"Distrito Ecológico Roggero",lat:-34.675,lng:-58.875,kind:"tourism",business:"Turismo de naturaleza, recreación, gastronomía y servicios compatibles con la protección ambiental.",evidence:"IDUAR presenta el DER como plataforma de desarrollo urbano, ambiental y turístico, articulada con un área natural protegida y obras de infraestructura. Es contexto de planificación, no autorización para desarrollar en cualquier parcela.",status:"Potencial de articulación público-privada sujeto a restricciones ambientales y urbanísticas; predios concretos y usos permitidos por verificar.",next:"Verificar límites del área protegida, Ordenanza 7164/24, zonificación, restricciones ambientales e hidráulicas, servicios y titularidad.",source:"https://iduar.moreno.gob.ar/2025/08/12/distrito-ecologico-roggero-un-espacio-natural-para-descubrir/"},
{id:"norte",stage:"hypothesis",name:"Cuartel V · Trujui · La Reja",lat:-34.61,lng:-58.815,kind:"land",business:"Prospección de parcelas grandes, ensamble de tierra, asociaciones con propietarios y desarrollos por etapas.",evidence:"Los avisos inmobiliarios son pistas de prospección, no prueba de dominio, zonificación ni disponibilidad.",status:"Hipótesis de prospección; sin parcelas individualizadas verificadas.",next:"Construir inventario con nomenclatura catastral, superficie, precio pedido y contacto verificable.",source:"https://www.zonaprop.com.ar/terrenos-venta-moreno-mas-9000-m2.html"}
];

const all = [
  ...localities.map(item => ({ ...item, type: "locality" })),
  ...opportunities.map(item => ({ ...item, type: "opportunity" }))
];
const kindLabel = {
  industrial: "Productivo / logístico",
  commercial: "Comercial / servicios",
  tourism: "Turismo / recreación",
  land: "Prospección de suelo"
};

function filterReferences(items, options) {
  const settings = options || {};
  const query = String(settings.query || "").toLocaleLowerCase("es-AR").trim();
  const category = settings.category || "all";
  const evidence = settings.evidence || "all";
  return items.filter(item => {
    const categoryMatches =
      category === "all" ||
      (category === "locality" && item.type === "locality") ||
      (category === "opportunity" && item.type === "opportunity");
    const evidenceMatches =
      evidence === "all" ||
      (item.type === "opportunity" && evidence === item.stage);
    const searchable = [
      item.name, item.info, item.business, item.status, item.evidence, item.next, item.kind
    ].filter(Boolean).join(" ").toLocaleLowerCase("es-AR");
    return categoryMatches && evidenceMatches && searchable.includes(query);
  });
}

function csvCell(value) {
  return '"' + String(value == null ? "" : value).replace(/"/g, '""') + '"';
}

function buildCsv(items) {
  const headers = [
    "tipo", "nombre", "latitud_referencia", "longitud_referencia", "categoria",
    "nivel_evidencia", "linea_a_investigar", "evidencia_publica",
    "estado_de_verificacion", "proximo_paso", "fuente", "alcance_de_coordenada"
  ];
  const rows = items.map(item => [
    item.type === "locality" ? "localidad" : "tesis",
    item.name,
    item.lat,
    item.lng,
    item.type === "locality" ? "localidad" : (kindLabel[item.kind] || item.kind),
    item.type === "locality" ? "referencia territorial" :
      (item.stage === "hypothesis" ? "hipotesis de prospeccion" : "contexto con fuente publica"),
    item.type === "locality" ? item.info : item.business,
    item.type === "locality" ? "Localidad de referencia; no es una evaluacion parcelaria." : item.evidence,
    item.type === "locality" ? "Centro aproximado de localidad; no parcelario." : item.status,
    item.type === "locality" ? "Definir zona y recopilar informacion catastral y normativa." : item.next,
    item.source || "",
    item.type === "locality"
      ? "Coordenada de referencia de localidad; no identifica una parcela."
      : "Centro aproximado de corredor o area; no identifica una parcela."
  ]);
  return "\uFEFF" + [headers, ...rows].map(row => row.map(csvCell).join(",")).join("\r\n");
}

function buildGeoJson(items) {
  const features = items.map(item => {
    const isLocality = item.type === "locality";
    const evidenceLevel = isLocality
      ? "referencia territorial"
      : (item.stage === "hypothesis" ? "hipotesis de prospeccion" : "contexto con fuente publica");
    const coordinateScope = isLocality
      ? "Centro aproximado de localidad; no identifica una parcela."
      : "Centro aproximado de corredor o area; no identifica una parcela.";
    return {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [Number(item.lng), Number(item.lat)]
      },
      properties: {
        id: item.id,
        reference_type: isLocality ? "localidad" : "tesis territorial",
        name: item.name,
        category: isLocality ? "Localidad" : (kindLabel[item.kind] || item.kind),
        evidence_level: evidenceLevel,
        description: isLocality ? item.info : item.business,
        public_evidence: isLocality ? null : item.evidence,
        verification_status: isLocality
          ? "Referencia geográfica de localidad; no es una evaluación parcelaria."
          : item.status,
        next_step: isLocality
          ? "Definir zona y recopilar información catastral y normativa."
          : item.next,
        source_url: item.source || null,
        coordinate_scope: coordinateScope,
        parcel_identified: false,
        availability_verified: false
      }
    };
  });
  return {
    type: "FeatureCollection",
    name: "Mapa IA de Moreno — referencias territoriales",
    description: "Exportación de las referencias visibles del inventario exploratorio de MORENO.",
    disclaimer: "Las coordenadas son referencias aproximadas de localidades o corredores. No identifican parcelas ni acreditan titularidad, disponibilidad, zonificación, factibilidad o rentabilidad. Verificar cada dato con fuentes oficiales y trabajo de campo.",
    features
  };
}

function initMapPage(doc) {
  const mapElement = doc.getElementById("map");
  if (!mapElement) return;

  const statusElement = doc.getElementById("map-status");
  const boundaryElement = doc.getElementById("boundary-status");
  const localityList = doc.getElementById("locality-list");
  const opportunityList = doc.getElementById("opportunity-list");
  const exportButton = doc.getElementById("export-csv");
  const geoJsonExportButton = doc.getElementById("export-geojson");
  const markers = new Map();
  let map = null;
  let visibleItems = all;

  function showFallback(message) {
    const fallback = doc.createElement("p");
    fallback.className = "map-fallback";
    fallback.textContent = message;
    mapElement.replaceChildren(fallback);
    statusElement.textContent = "Mapa no disponible · fichas de investigación activas";
    boundaryElement.textContent = "Límite municipal: cartografía no disponible";
  }

  function popupNode(item) {
    const box = doc.createElement("div");
    const addLine = (label, value) => {
      const paragraph = doc.createElement("p");
      const strong = doc.createElement("strong");
      strong.textContent = label + " ";
      paragraph.append(strong, doc.createTextNode(value));
      box.append(paragraph);
    };
    const title = doc.createElement("h3");
    title.textContent = item.name;
    box.append(title);
    if (item.type === "locality") {
      addLine("Lectura:", item.info);
      return box;
    }
    const stage = doc.createElement("small");
    stage.textContent =
      (item.stage === "hypothesis" ? "Hipótesis de prospección" : "Contexto con fuente pública") +
      " · " + (kindLabel[item.kind] || "Tesis territorial");
    box.prepend(stage);
    addLine("Línea a investigar:", item.business);
    addLine("Qué sabemos:", item.evidence);
    addLine("Estado:", item.status);
    addLine("Siguiente paso:", item.next);
    const link = doc.createElement("a");
    link.href = item.source;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = "Consultar fuente pública ↗";
    box.append(link);
    const note = doc.createElement("p");
    note.textContent = "Área/corredor aproximado. No representa una parcela ni acredita disponibilidad.";
    box.append(note);
    return box;
  }

  let selectedReferenceId = null;

  function setActiveReference(item, options) {
    const settings = options || {};
    selectedReferenceId = item.id;
    markers.forEach((marker, id) => {
      marker.getElement().classList.toggle("is-selected", id === item.id);
    });
    [localityList, opportunityList].forEach(list => {
      list.querySelectorAll("[data-map-item]").forEach(card => {
        const selected = card.dataset.mapItem === item.id;
        card.classList.toggle("is-active", selected);
        if (selected && settings.reveal) card.open = true;
        if (selected && settings.scroll) {
          const reduceMotion = doc.defaultView &&
            typeof doc.defaultView.matchMedia === "function" &&
            doc.defaultView.matchMedia("(prefers-reduced-motion: reduce)").matches;
          card.scrollIntoView({
            behavior: reduceMotion ? "auto" : "smooth",
            block: "nearest"
          });
        }
      });
    });
    statusElement.textContent = "Referencia seleccionada: " + item.name;
  }

  function focusItem(item) {
    const marker = markers.get(item.id);
    if (!map || !marker) return;
    setActiveReference(item, { reveal: true });
    map.flyTo({ center: [item.lng, item.lat], zoom: 14, essential: true });
    const popup = marker.getPopup();
    if (popup && !popup.isOpen()) marker.togglePopup();
  }

  function makeCards(items, target) {
    target.replaceChildren();
    items.forEach(item => {
      const card = doc.createElement("details");
      card.className = "map-item";
      card.dataset.mapItem = item.id;
      if (selectedReferenceId === item.id) card.classList.add("is-active");
      const summary = doc.createElement("summary");
      summary.addEventListener("click", () => setActiveReference(item));
      const title = doc.createElement("strong");
      title.textContent = item.name;
      const meta = doc.createElement("span");
      meta.textContent = item.type === "locality"
        ? "Localidad · referencia territorial"
        : ((item.stage === "hypothesis" ? "Hipótesis de prospección" : "Contexto con fuente pública") +
          " · " + (kindLabel[item.kind] || "Tesis territorial"));
      summary.append(title, meta);
      card.append(summary);

      const body = doc.createElement("div");
      body.className = "map-item-body";
      const addDetail = (label, value) => {
        if (!value) return;
        const paragraph = doc.createElement("p");
        const heading = doc.createElement("strong");
        heading.textContent = label;
        paragraph.append(heading, doc.createTextNode(value));
        body.append(paragraph);
      };

      if (item.type === "locality") {
        addDetail("Lectura territorial", item.info);
      } else {
        addDetail("Línea a investigar", item.business);
        addDetail("Qué sabemos", item.evidence);
        addDetail("Estado de verificación", item.status);
        addDetail("Próximo paso", item.next);
        if (item.source) {
          const link = doc.createElement("a");
          link.className = "map-source-link";
          link.href = item.source;
          link.target = "_blank";
          link.rel = "noopener noreferrer";
          link.textContent = "Abrir referencia externa ↗";
          body.append(link);
        }
      }

      if (map) {
        const focusButton = doc.createElement("button");
        focusButton.type = "button";
        focusButton.className = "map-focus-button";
        focusButton.textContent = "Ubicar en el mapa";
        focusButton.setAttribute("aria-label", "Centrar el mapa en " + item.name);
        focusButton.addEventListener("click", () => focusItem(item));
        body.append(focusButton);
      }
      card.append(body);
      target.append(card);
    });
  }

  function render() {
    const shown = filterReferences(all, {
      query: doc.getElementById("search").value,
      category: doc.getElementById("category").value,
      evidence: doc.getElementById("evidence-filter").value
    });
    visibleItems = shown;
    exportButton.disabled = shown.length === 0;
    geoJsonExportButton.disabled = shown.length === 0;
    if (selectedReferenceId && !shown.some(item => item.id === selectedReferenceId)) {
      selectedReferenceId = null;
      markers.forEach(marker => marker.getElement().classList.remove("is-selected"));
    }
    markers.forEach((marker, id) => {
      const shouldShow = shown.some(item => item.id === id);
      const attached = marker.getElement().isConnected;
      if (shouldShow && !attached) marker.addTo(map);
      if (!shouldShow && attached) marker.remove();
    });
    makeCards(shown.filter(item => item.type === "locality"), localityList);
    makeCards(shown.filter(item => item.type === "opportunity"), opportunityList);
    statusElement.textContent = shown.length + " referencias visibles · capa exploratoria";
  }

  function exportVisibleCsv() {
    if (!visibleItems.length) return;
    const view = doc.defaultView;
    const blob = new view.Blob([buildCsv(visibleItems)], { type: "text/csv;charset=utf-8" });
    const url = view.URL.createObjectURL(blob);
    const link = doc.createElement("a");
    link.href = url;
    link.download = "moreno-mapa-ia-referencias.csv";
    doc.body.append(link);
    link.click();
    link.remove();
    view.setTimeout(() => view.URL.revokeObjectURL(url), 1500);
  }

  function exportVisibleGeoJson() {
    if (!visibleItems.length) return;
    const view = doc.defaultView;
    const content = JSON.stringify(buildGeoJson(visibleItems), null, 2);
    const blob = new view.Blob([content], { type: "application/geo+json;charset=utf-8" });
    const url = view.URL.createObjectURL(blob);
    const link = doc.createElement("a");
    link.href = url;
    link.download = "moreno-mapa-ia-referencias.geojson";
    doc.body.append(link);
    link.click();
    link.remove();
    view.setTimeout(() => view.URL.revokeObjectURL(url), 1500);
  }

  if (typeof maplibregl === "undefined") {
    showFallback("No se pudo cargar el motor cartográfico. Las fichas, los filtros y las fuentes siguen disponibles.");
  } else {
    try {
      mapElement.replaceChildren();
      map = new maplibregl.Map({
        container: mapElement,
        style: {
          version: 8,
          sources: {
            "osm-raster": {
              type: "raster",
              tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
              tileSize: 256,
              attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap contributors</a> · <a href="https://www.openstreetmap.org/fixthemap" target="_blank" rel="noopener noreferrer">Reportar un problema</a>'
            }
          },
          layers: [{ id: "osm-raster-layer", type: "raster", source: "osm-raster" }]
        },
        center: [-58.7914, -34.6508],
        zoom: 12,
        maxZoom: 19,
        attributionControl: { compact: false },
        renderWorldCopies: false
      });
      map.addControl(new maplibregl.NavigationControl({ showCompass: true }), "top-right");
      map.on("error", event => {
        if (event && event.sourceId === "osm-raster") {
          statusElement.textContent = "Teselas OSM no disponibles · inventario y filtros conservados";
        }
      });
      map.on("load", () => {
        map.resize();
        all.forEach(item => {
          const element = doc.createElement("button");
          element.type = "button";
          element.className = "map-pin " + (item.type === "locality"
            ? "map-pin-locality"
            : (item.stage === "hypothesis" ? "map-pin-hypothesis" : "map-pin-documented"));
          element.setAttribute("aria-label", "Ver " + item.name + " en el mapa");
          element.title = item.name;
          const popup = new maplibregl.Popup({ offset: 16, maxWidth: "340px" })
            .setDOMContent(popupNode(item));
          element.addEventListener("click", () => {
            setActiveReference(item, { reveal: true, scroll: true });
          });
          const marker = new maplibregl.Marker({ element, anchor: "center" })
            .setLngLat([item.lng, item.lat])
            .setPopup(popup)
            .addTo(map);
          markers.set(item.id, marker);
        });

        const boundaryUrl = "https://apis.datos.gob.ar/georef/api/v2.0/municipios?nombre=Moreno&provincia=Buenos%20Aires&formato=geojson";
        fetch(boundaryUrl).then(response => {
          if (!response.ok) throw new Error("Georef no disponible");
          return response.json();
        }).then(data => {
          let geo = data;
          if (!data.type && data.municipios) {
            geo = {
              type: "FeatureCollection",
              features: data.municipios.map(entry => entry.geojson).filter(Boolean)
            };
          }
          if (geo.type !== "FeatureCollection" || !Array.isArray(geo.features) || !geo.features.length) {
            throw new Error("Geometría municipal no disponible");
          }
          geo.features = geo.features.filter(feature => {
            const properties = feature.properties || {};
            const name = String(properties.nombre || properties.NAM || properties.nombre_completo || "");
            return !name || name.toLocaleLowerCase("es-AR").includes("moreno");
          });
          if (!geo.features.length) throw new Error("No se encontró el municipio solicitado");

          map.addSource("moreno-boundary", { type: "geojson", data: geo });
          map.addLayer({
            id: "moreno-boundary-fill",
            type: "fill",
            source: "moreno-boundary",
            paint: { "fill-color": "#b78a3c", "fill-opacity": 0.08 }
          });
          map.addLayer({
            id: "moreno-boundary-line",
            type: "line",
            source: "moreno-boundary",
            paint: { "line-color": "#a95d3c", "line-width": 2.5, "line-opacity": 0.9 }
          });

          const bounds = new maplibregl.LngLatBounds();
          const collectCoordinates = coordinates => {
            if (Array.isArray(coordinates) && typeof coordinates[0] === "number") {
              bounds.extend(coordinates);
            } else if (Array.isArray(coordinates)) {
              coordinates.forEach(collectCoordinates);
            }
          };
          geo.features.forEach(feature => {
            if (feature.geometry) collectCoordinates(feature.geometry.coordinates);
          });
          if (!bounds.isEmpty()) map.fitBounds(bounds, { padding: 36, maxZoom: 12, duration: 0 });
          boundaryElement.textContent = "Límite municipal: cargado desde Georef";
        }).catch(error => {
          boundaryElement.textContent = "Límite municipal: no disponible ahora";
          console.info("Límite municipal no cargado; el mapa continúa disponible.", error);
        });
        render();
      });
    } catch (error) {
      map = null;
      showFallback("El navegador no pudo iniciar el mapa interactivo. Las fichas, los filtros y las fuentes siguen disponibles.");
      console.info("MapLibre no pudo inicializarse.", error);
    }
  }

  exportButton.addEventListener("click", exportVisibleCsv);
  exportButton.hidden = false;
  geoJsonExportButton.hidden = false;
  geoJsonExportButton.addEventListener("click", exportVisibleGeoJson);
  doc.getElementById("search").addEventListener("input", render);
  doc.getElementById("category").addEventListener("change", render);
  doc.getElementById("evidence-filter").addEventListener("change", render);
  doc.getElementById("reset-map").addEventListener("click", () => {
    doc.getElementById("search").value = "";
    doc.getElementById("category").value = "all";
    doc.getElementById("evidence-filter").value = "all";
    render();
    if (map) map.flyTo({ center: [-58.7914, -34.6508], zoom: 12 });
  });
  render();
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { localities, opportunities, all, filterReferences, buildCsv, buildGeoJson };
}
if (typeof document !== "undefined") initMapPage(document);
