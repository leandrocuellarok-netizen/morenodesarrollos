(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  if (root) root.MorenoOpportunityTools = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  function parsePositiveDecimal(raw, label, rejectAmbiguousThousands) {
    const text = String(raw == null ? "" : raw).trim();
    const normalized = text.replace(",", ".");
    if (!/^\d+(?:\.\d+)?$/.test(normalized)) {
      return { error: "Revisá " + label + ": usá un número positivo, sin separador de miles." };
    }
    if (rejectAmbiguousThousands && /^[1-9]\d{0,2}\.\d{3}$/.test(normalized)) {
      return { error: "El valor de " + label + " es ambiguo. No uses puntos de miles: para 1.200 m², ingresá 1200." };
    }
    const value = Number(normalized);
    if (!Number.isFinite(value) || value <= 0) {
      return { error: label + " debe ser mayor que cero." };
    }
    return { value: value };
  }

  function calculatePreliminary(input) {
    const data = input || {};
    const areaRaw = String(data.areaRaw || "").trim();
    const fosRaw = String(data.fosRaw || "").trim();
    const fotRaw = String(data.fotRaw || "").trim();
    const referenceRaw = String(data.referenceRaw || "").trim();

    if (!areaRaw && !fosRaw && !fotRaw && !referenceRaw) return { empty: true };
    if (!areaRaw) return { error: "Para calcular, ingresá la superficie del lote." };
    if (!fosRaw && !fotRaw) return { error: "Ingresá al menos el FOS o el FOT que tengas como referencia para esa parcela." };

    const area = parsePositiveDecimal(areaRaw, "la superficie del lote", true);
    if (area.error) return area;
    const fos = fosRaw ? parsePositiveDecimal(fosRaw, "el FOS", false) : null;
    const fot = fotRaw ? parsePositiveDecimal(fotRaw, "el FOT", false) : null;
    if (fos && fos.error) return fos;
    if (fot && fot.error) return fot;

    const format = new Intl.NumberFormat("es-AR", { maximumFractionDigits: 2 });
    const items = [];
    const summary = ["Superficie del lote ingresada: " + format.format(area.value) + " m²."];
    if (fos) {
      const value = area.value * fos.value;
      summary.push("FOS " + format.format(fos.value) + ": " + format.format(value) + " m² teóricos de ocupación en planta.");
      items.push({
        label: "Referencia FOS",
        amount: format.format(value) + " m²",
        detail: "Superficie teórica máxima de ocupación en planta (lote × FOS)."
      });
    }
    if (fot) {
      const value = area.value * fot.value;
      summary.push("FOT " + format.format(fot.value) + ": " + format.format(value) + " m² teóricos de superficie total computable.");
      items.push({
        label: "Referencia FOT",
        amount: format.format(value) + " m²",
        detail: "Superficie teórica total computable (lote × FOT)."
      });
    }
    if (referenceRaw) summary.push("Fuente o referencia ingresada: " + referenceRaw + ".");
    return { ok: true, area: area.value, items: items, summary: summary };
  }

  function buildLeadNote(input) {
    const data = input || {};
    const areaRaw = String(data.areaRaw || "").trim();
    const fosRaw = String(data.fosRaw || "").trim();
    const fotRaw = String(data.fotRaw || "").trim();
    const referenceRaw = String(data.referenceRaw || "").trim();
    const result = calculatePreliminary(data);

    if (result.ok) {
      return {
        empty: false,
        calculated: true,
        lines: ["Cálculo preliminar ingresado por el contacto:"].concat(result.summary, [
          "Este resultado es matemático y orientativo; requiere verificación urbanística y parcelaria."
        ])
      };
    }

    const entries = [];
    if (areaRaw) entries.push("Superficie declarada en calculadora: " + areaRaw + " m².");
    if (fosRaw) entries.push("FOS declarado: " + fosRaw + ".");
    if (fotRaw) entries.push("FOT declarado: " + fotRaw + ".");
    if (referenceRaw) entries.push("Fuente o referencia aportada: " + referenceRaw + ".");
    if (!entries.length) return { empty: true, calculated: false, lines: [] };

    const reason = result.error || "faltan datos para realizar la cuenta";
    return {
      empty: false,
      calculated: false,
      lines: ["Datos urbanísticos aportados, todavía sin cálculo:"].concat(entries, [
        "No se realizó el cálculo: " + reason,
        "Los datos se transcriben como fueron ingresados y requieren verificación."
      ])
    };
  }

  function formatFieldValue(value) {
    const values = Array.isArray(value) ? value : [value];
    return values
      .map(function (item) { return String(item == null ? "" : item).trim(); })
      .filter(Boolean)
      .join("; ");
  }

  const mapReferenceNames = Object.freeze({
    "moreno": "Moreno Centro",
    "paso": "Paso del Rey",
    "lareja": "La Reja",
    "alvarez": "Francisco Álvarez",
    "trujui": "Trujui",
    "cuartel": "Cuartel V",
    "rp25": "RP25 · Darwin Passaponti · Av. San Fernando",
    "ecoparque": "Nodo RP24/RP25 · Ecoparque Industrial",
    "ribera": "Paso del Rey · Camino de la Ribera",
    "roggero": "Distrito Ecológico Roggero",
    "norte": "Cuartel V · Trujui · La Reja",
    "sumio-lote-338": "Lote 01 · Loteo Sumio · 338 m²",
    "sumio-lote-450": "Lote 02 · Loteo Sumio · 450 m²",
    "sumio-proyecto": "Loteo Sumio · Proyecto N.º 41",
    "parque-francisco-lote-300": "Parque Francisco · lote de 300 m² · anticipo",
    "parque-francisco-proyecto": "Parque Francisco · barrio abierto",
    "parques-morenito-lote-594": "Parques del Morenito · lote publicado de 594 m²",
    "parques-morenito-proyecto": "Parques del Morenito · barrio abierto",
    "trujui-lote-isabel-catolica-400": "Lote en Trujui · Isabel la Católica al 3300",
    "la-reja-lote-general-hornos-471": "Lote en barrio Azteca · La Reja · 471 m²",
    "cuartel-v-fraccion-san-fernando-galicia": "Fracción comercial/productiva · 4.431 m²",
    "moreno-casa-martin-fierro-5000": "Casa en venta · Martín Fierro al 5000",
    "moreno-casa-martin-fierro-4900": "Casa apta crédito · Martín Fierro al 4900",
    "la-reja-casa-belisario-roldan-1800": "Casa para refacción · Belisario Roldán al 1800",
    "paso-del-rey-casa-lebensohn-300": "Casa de 6 ambientes · Lebensohn 300",
    "moreno-lote-tres-de-febrero-7800": "Lote baldío · Tres de Febrero 7800 · 316 m²",
    "moreno-lote-industrial-gutenberg-5662": "Lote industrial · Gutenberg 5662 · 3.192 m²",
    "cuartel-v-lote-lamadrid-2737": "Lote 16 · Gral. Aráoz de Lamadrid 6702 · 2.737 m²",
    "la-reja-casa-quinta-santa-teresa-2401": "Casa quinta con parque, pileta y tenis · Santa Teresa de Jesús 2401",
    "terreno-san-juan-bautista-1374": "Terreno en Altos del Monte · San Juan Bautista s/n · 1.374 m²",
    "terreno-ricardo-rojas-4418-3830": "Lote en Moreno · Ricardo Rojas 4418 · 3.830 m²",
    "terreno-general-alvarado-322-922": "Lote industrial · General Alvarado 322 · 922 m²",
    "casa-bernardino-rivadavia-1000": "Casa en Centro de Moreno · Bernardino Rivadavia 1000",
    "casa-naciones-unidas-1500": "Casa 3 ambientes con local y departamento a terminar · Naciones Unidas 1500",
    "casa-country-san-diego-1500": "Casa 6 ambientes en Club de Campo San Diego",
    "desarrollo-barrio-del-golf-atuel-2700": "Barrio Cerrado del Golf · Francisco Álvarez",
    "desarrollo-colonos-ii-2300": "Complejo Comercial Colonos II",
    "desarrollo-ibis-iv-273": "Edificio Ibis IV · Moreno Centro",
    "desarrollo-140-camilli": "140 Camilli · Moreno Centro",
    "terreno-bouchard-300-461": "Bouchard 300 · 461 m²",
    "terreno-sarmiento-500-750": "Sarmiento 500 · esquina con Guatemala · 750 m²",
    "terreno-ecoparque-irlanda-2000": "Ecoparque Industrial · Ruta 24 y calle Irlanda · 2.000 m²",
    "casa-centenario-600-360": "Casa · Centenario al 600",
    "casa-venezuela-2400-456": "Chalet · Venezuela al 2400 · Moreno Norte",
    "casa-francisco-de-aguirre-6400": "Casa en Francisco de Aguirre 6400",
    "casa-racine-800-no-vigente": "Casa con pileta y quincho · Racine 800 · publicación reactivada",
    "desarrollo-prados-del-oeste-hornos-2800": "Prados del Oeste 1 y 2 · Gral. Hornos al 2800",
    "terreno-teniente-camilli-240-975": "Camilli al 200/240 · casa sobre lote publicado de 975 m²",
    "terreno-yapeyu-rafael-arcos-2850": "Yapeyú y Rafael Arcos · fracción de 2.850 m²",
    "terreno-prados-del-oeste-lote-230-800": "Prados del Oeste 1-B · Lote 230 · 800 m²",
    "terreno-general-savio-100-2050": "General Savio 100 · 2.050 m² (superficie contradictoria)",
    "desarrollo-ecoparque-78-parcelas": "Ecoparque Industrial Moreno · 78 parcelas",
    "terreno-parques-morenito-300-300": "Parques del Morenito · lote 300 m²",
    "terreno-pim-i-parque-municipal-2493": "Parque Municipal PIM I · 2.493 m²",
    "terreno-pim-ii-rp24-2677": "Parque Industrial PIM II · 2.677 m²",
    "terreno-pim-ii-rp24-7700-2103": "PIM II · parcela 67 · RP 24 al 7700 · 2.103 m²",
    "casa-san-ramon-2700-251": "Dos casas independientes · San Ramón al 2700",
    "casa-perito-moreno-3800-350": "Casa · Perito Moreno 3800/3870 · La Reja",
    "terreno-los-abedules-4100-521": "Lote en esquina · Los Abedules 4100 · Álvarez del Bosque · 520,7 m²",
    "terreno-chacabuco-emilio-mitre-206": "Dos lotes en Chacabuco entre Emilio Mitre y Moreno · 206,42 m²",
    "casa-francisco-piovano-3700-2960": "Casa quinta sobre tres lotes · Francisco Piovano 3700 · 2.960 m²",
    "casa-faraday-2700-1472": "Casa quinta con pileta · Faraday 2700 · 1.472 m²",
    "casa-intendente-pagano-2600-320": "Chalet 3 ambientes con pileta · Intendente Pagano al 2600 · 320 m²",
    "casa-intendente-corvalan-2400-792": "Casa 4 ambientes · Haras María Eugenia · Intendente Corvalán 2400",
    "desarrollo-villa-justina-2199": "Villa Justina · Independencia 2199 · Moreno",
    "terreno-ruta24-10ha-100000": "Fracción de 10 ha · Ruta 24 · entorno Ruta 24/Ruta 25",
    "terreno-larrea-2419-220": "Lote · Larrea 2419 · 220 m² · Moreno Sur",
    "terreno-general-hornos-sn-939": "Lote con proyecto declarado · General Hornos S/N · Prados del Oeste II",
    "terreno-salto-600-595": "Lote en esquina · Salto 600 · 595 m²",
    "terreno-juan-diaz-solis-1800-595": "Lote en esquina · Juan Díaz de Solís 1800 y Funes · Paso del Rey · 595 m²",
    "terreno-los-abedules-lote121-600": "Lote central N.º 121 · Los Abedules 4100 · Álvarez del Bosque · 600 m²",
    "terreno-ensenada-6000-36000": "Ensenada 6000 · 36.000 m² · cinco viviendas",
    "terreno-ruta25-2500-404": "Ruta Provincial 25 2500 · fracción de 404 m²",
    "casa-padre-fahy-90-322": "Casa 3 ambientes · Padre Fahy al 90 · La Reja",
    "casa-jose-hernandez-4001-400": "Casa quinta · José Hernández 4001 y Lobos · Paso del Rey",
    "casa-general-belgrano-600-593": "Casa 4 ambientes · General Manuel Belgrano 600",
    "casa-nemesio-alvarez-200-688": "Casa a refaccionar · Avenida Nemesio Álvarez 200",
    "casa-camilli-5200-300": "Casa 4 ambientes · Camilli al 5200",
    "casa-dorrego-2800-731": "Chalet 5 ambientes · Dorrego al 2800",
    "casa-canton-400-400": "Casa 4 ambientes con parque y pileta · Cantón al 400",
    "terreno-chiclana-600-359-historico": "Chiclana 600 · lote de 359 m² · antecedente retirado",
    "terreno-ensenada-6300-30000-historico": "Ensenada 6300 · 30.000 m² · tres viviendas · antecedente retirado",
    "terreno-lamadrid-6300-2737-historico": "General Aráoz de Lamadrid 6300 · cuatro lotes de 2.737 m² · antecedente retirado",
    "terreno-paz-del-canon-594-historico": "José María Paz y Del Cañón · lote de 594 m² · antecedente retirado",
    "desarrollo-pir25-ruta25-donbosco": "PIR 25 · Parque Industrial · 27 ha · 60 unidades funcionales",
    "pir25-up30-2713": "PIR 25 · UP 30 · 2.713,73 m²",
    "pir25-up50-2895": "PIR 25 · UP 50 · 2.895,61 m²",
    "pir25-up60-4171": "PIR 25 · UP 60 · 4.171,73 m²",
    "casa-patricias-argentinas-2300-2762": "Casa quinta · Patricias Argentinas 2300/2301 · 2.762 m²",
    "casa-chiclana-100-1988": "Casa de 12 ambientes · Chiclana 100 · Moreno",
    "desarrollo-chacras-teofilo-galileo-7300": "Chacras de Teófilo · loteo de 35 parcelas · Trujui",
    "terreno-derqui-7660-384": "Lote · Avenida Derqui 7660 · 384 m²",
    "terreno-abdon-calderon-1000-250": "Lote comercial · Abdón Calderón 1000 · 250 m²",
    "terreno-conscripto-bernardi-1800-3888": "Conscripto Bernardi al 1800 · 3.888 m²",
    "terreno-lamadrid-el-vergel-2161": "Gral. Aráoz de Lamadrid 100 · barrio El Vergel · 2.161 m²",
    "terreno-camilli-60-1000": "Teniente Oscar Camilli al 60 · 1.000 m²",
    "terreno-justo-daract-2000-630": "Justo Daract al 2000 · 630 m²",
    "terreno-vidt-1700-420": "Loteo Las Casuarinas · Vidt al 1700 · 420 m²",
    "terreno-paramaribo-alvarez-jonte-425": "Paramaribo y Álvarez Jonte · 425 m²",
    "terreno-jose-obregoso-600-600": "Loteo La Herradura · José Obregoso al 600 · 600 m²",
    "terreno-diario-la-nacion-iguazu-420": "Diario La Nación esquina Iguazú · 420 m²",
    "terreno-nanduti-2000-324-mejoras": "Ñanduti al 2000 · lote con mejoras · 324 m²",
    "terreno-san-fernando-araucanos-7522-historico": "Av. San Fernando y Araucanos · macrolote 7.522 m² · no vigente",
    "desarrollo-fructuoso-rivera-ruta25-460000-338parcelas": "Fracción Ruta 25 y Gral. Fructuoso Rivera · 46 ha · proyecto de 338 parcelas",
    "desarrollo-ampliacion-sip2-cuarter-v-52ha": "Ampliación del Sector Industrial Planificado II · Cuartel V",
    "chacras-teofilo-lote-324-historico": "Chacras de Teófilo · lote 324 m² · aviso anterior no vigente",
    "casa-el-casco-733-212-historico": "Casa 4 ambientes · Barrio El Casco · Paso del Rey · 733 m²",
    "casa-cervino-100-350-historico": "Casa · Cervino 100 · Moreno · 350 m²",
    "casa-leandro-alem-2100-562-historico": "Casa 6 ambientes · Leandro N. Alem al 2100 · Moreno",
    "terreno-r25-2000-200000": "Polo Veinticinco · lote de 2.000 m² (lote interno no informado)",
    "terreno-r25-lote33-2888": "Polo Veinticinco · lote 33 perimetral · 2.888 m²",
    "terreno-r25-5000-500000": "Polo Veinticinco · lote de 5.000 m² (lote interno no informado)",
    "terreno-ricchieri-50000-industrial": "Teniente General Pablo Ricchieri · fracción industrial de 5 ha",
    "terreno-ruta25-4700-9835": "Ruta Provincial 25 4700 · fracción de 9.835 m²",
    "terreno-goncalves-eiras-don-bosco-75020": "Gonçalves Eiras y Don Bosco 100 · predio de 75.020 m²",
    "terreno-polo24-gral-hornos-6100-4860": "Parque Industrial Polo 24 · lotes A04 y A18 · 4.860 m²",
    "terreno-pueyrredon-2025-337": "Juan Martín de Pueyrredón 2025 · 337,5 m²",
    "terreno-jose-maria-paz-600-356": "José María Paz 600 · 356 m²",
    "terreno-prados-oeste2-lote145-781": "Prados del Oeste II · lote 145 · 781 m²",
    "terreno-joaquin-v-gonzalez-2400-615": "Joaquín V. González 2400 · 615 m² y estructura de hormigón",
    "desarrollo-polo-veinticinco-15ha-37-lotes": "Polo Veinticinco · parque industrial · 15 ha · 37 lotes",
    "desarrollo-parque-industrial-reconquista-80ha": "Parque Industrial Reconquista · 80 ha · Trujui",
    "desarrollo-parque-industrial-desarrollo-productivo-40ha": "Parque Industrial Desarrollo Productivo · 40 ha · Cuartel V",
    "terreno-esteban-de-luca-2200-415": "Terreno en esquina · Esteban De Luca 2200 · 415 m²",
    "terreno-paysandu-900-380": "Terreno con galpón, baño y pileta · Paysandú 900 · 380 m²",
    "terreno-agrelo-5300-1500": "Terreno con galpón y departamento · Agrelo 5300 · 1.500 m²",
    "terreno-jacinto-verdaguer-juan-maciel-1500": "Bloque de lotes · Jacinto Verdaguer y Juan B. Maciel · 1.500 m²",
    "terreno-jose-marti-1000-2164": "Terreno de escala · José Martí 1000 · 2.164 m²",
    "terreno-lorenzo-lopez-300-1123": "Terreno parquizado · Lorenzo López 300 · 1.123 m²",
    "terreno-puccini-1600-366": "Terreno comercial · Puccini 1600 · 366 m²",
    "terreno-juan-diaz-de-solis-3400-350": "Solares de Zapiola · Juan Díaz de Solís 3400 · ficha con superficie y precio divergentes",
    "terreno-ruta5-cadiz-320": "Terreno comercial con dos casas · Ruta 5 (Ex 7) y Cádiz · 320 m²",
    "quinta-racine-300-678": "Quinta a refaccionar · Racine J al 300 · 678 m²",
    "terreno-dr-vera-1200-374": "Terreno con casa a refaccionar · Dr. Vera 1200 · 374 m²",
    "terreno-salta-nemesio-alvarez-600": "Terreno con construcción a terminar · Salta / Nemesio Álvarez · 600 m²",
    "terreno-felix-mendelsohn-1400-325": "Terreno con vivienda a refaccionar · Félix Mendelsohn 1400 · 325 m²",
    "terreno-la-tradicion-700-719": "Lote 35 · Fincas de Álvarez · La Tradición 700 · 719 m²",
    "terreno-joaquin-v-gonzalez-600-612": "Terreno con losa · Joaquín V. González 600 · 612 m²",
    "terreno-las-tres-marias-lote-6-411": "Lote 6 · Las Tres Marías · 411 m²",
    "terreno-prados-del-oeste-2-lote-central-839": "Lote central · Prados del Oeste II · 839,12 m²",
    "terreno-prados-del-oeste-2-lote-esquina-814": "Lote esquina · Prados del Oeste II · 814,11 m²",
    "terreno-general-hornos-200-prados-del-oeste-2-786": "Lote · General Hornos 200 · Prados del Oeste II · 786 m²",
    "terreno-domingo-martinez-de-irala-1600-1107": "Terreno · Domingo Martínez de Irala 1600 · 1.107 m²",
    "terreno-vicente-lopez-y-planes-1300-240": "Terreno con construcción · Vicente López y Planes 1300 · 240 m²",
    "casa-emilio-mitre-2200-782": "Casa con parque y pileta · Emilio Mitre 2200",
    "casa-zeballos-600-382": "Casa a estrenar · Zeballos 600 · 382 m² de terreno",
    "casa-posadas-1100-390": "Casa a estrenar · Posadas 1100 · 390 m² de terreno",
    "casa-doctor-marcelo-alvear-2800-1125": "Casa quinta · Dr. Marcelo T. de Alvear 2800 / 2878 · 1.125 m²",
    "casa-primero-de-mayo-125-311": "Casa con pileta y quincho · Primero de Mayo 125",
    "inmueble-mixto-saenz-pena-2200": "Casa con dos locales comerciales · Sáenz Peña 2200",
    "casa-alcorta-2400-potencial-desarrollo": "Casa sobre lote con potencial de desarrollo · Alcorta 2400 · 846 m²",
    "desarrollo-maria-eugenia-residences-village": "María Eugenia Residences & Village · Moreno",
    "terreno-bosque-zapiola-dastugue-4051-325": "Bosque Zapiola · Intendente Dastugue 4051 · 325 m²",
    "terreno-guemes-victorica-2820": "Güemes y Av. Victorica · fracción de 2.820 m²",
    "terreno-colectora-gaona-5200-2400": "Colectora Av. Gaona 5200 · Belgrano y Entre Ríos · 2.400 m²",
    "terreno-colectora-norte-tuyuti-3400": "Colectora Norte Acceso Oeste y Tuyutí · 3.400 m²",
    "terreno-arenales-4300-2508": "Arenales 4300 · esquina Mariscal Antonio José de Sucre · 2.508 m²",
    "terreno-victor-hugo-1100-1050": "Víctor Hugo 1100 · lote con mejoras · 1.050 m²",
    "terreno-graham-bell-16781": "Fracción Graham Bell · 16.781 m²",
    "terreno-jose-cortejarena-7930": "José Cortejarena · fracción de 7.930 m²",
    "terreno-rodes-edison-2000": "Rodes y Edison · Colectora Norte Acceso Oeste · 2.000 m²",
    "terreno-acceso-oeste-km34-10900": "Acceso Oeste km 34 · 10.900 m²",
    "terreno-diagonal-canon-centenario-320": "Diagonal del Cañón y Centenario · lotes desde 320 m²",
    "casa-ituzaingo-234-1660": "Ituzaingó 200 / 234 · terreno de 1.660 m² con casa a refaccionar",
    "casa-joly-2400-476": "Chalet · Claudio María Joly 2400",
    "casa-yapeyu-2300-merged": "Casa con parque y piscina · Yapeyú al 2300",
    "desarrollo-bufo-maipu-1500": "Complejo Residencial Bufó Maipú · unidades en comercialización anunciada",
    "desarrollo-copa-entre-rios-2501": "COPA · Entre Ríos 2501",
    "terreno-carola-lorenzini-aymaraes-2175": "Carola Lorenzini / Aymaraes · lote 6 · 2.175 m²",
    "predio-industrial-ruta24-66763": "Predio industrial Ruta Provincial 24 · 66.763 m²",
    "terreno-polo24-2432": "Parque Industrial Polo 24 · lote de 2.432 m²",
    "terreno-r25-lote21-2741": "Parque Industrial R25 · lote 21 · 2.741 m²",
    "terreno-r24-r25-5500": "Fracción industrial · intersección RP24/RP25 · 5.500 m²",
    "terreno-rp25-45280": "Fracción sobre RP25 · 45.280 m² · frente a C.C. San Diego",
    "terreno-rp24-7600-4541": "Terreno en parque industrial · Ruta 24 al 7600 · 4.541 m²",
    "casa-alberdi-1100-739": "Juan Bautista Alberdi 1100 · dos parcelas contiguas con casa y pileta",
    "casa-martin-fierro-5400-200": "Martín Fierro al 5400 · casa de 6 ambientes · La Perlita",
    "casa-alberti-2346-240": "Alberti 2346 · casa de 3 ambientes con escritura",
    "casa-colombia-300-550": "Colombia al 300 · casa con parque y pileta",
    "casa-ambrosetti-300-348": "Ambrosetti al 300 · casa de 3 dormitorios · La Reja Sur",
    "quinta-sarratea-200-1350": "Manuel de Sarratea 200 · quinta con potencial de desarrollo",
    "desarrollo-madiba-xiv-asseff-286": "Madiba XIV · Asseff 286 esquina Alem",
    "terreno-julian-aguirre-17000": "Julián Aguirre 100 · fracción de 17.000 m²",
    "casa-independencia-2400-1462": "Independencia 2400 · terreno de 1.462 m² con vivienda y planos anunciados",
    "casa-los-abedules-4100-485": "Casa 5 ambientes · Los Abedules 4100 · Álvarez del Bosque",
    "casa-acceso-oeste-km34-1200": "Chalet quinta · Acceso Oeste km 34 · 1.200 m²",
    "casa-cornelio-saavedra-100-375": "Cornelio Saavedra 100 · casa de 4 ambientes con quincho",
    "desarrollo-haras-maria-elena-unidades": "Haras María Elena · unidades desde USD 199.000",
    "casa-san-carlos-2400-370": "San Carlos 2400 · casa de 3 ambientes con pileta y local",
    "casa-cura-brochero-6600-170": "Cura Brochero 6600 · casa de 3 ambientes",
    "terreno-pir25-4188": "Parque Industrial PIR25 · lote de 4.188,30 m²",
    "terreno-pir25-2709": "Parque Industrial PIR25 · lote de 2.709,33 m² · Gírgola",
    "terreno-polo24-rp24-rp25-2914": "Ruta 24 y 25 · Polo 24 · terreno de 2.914 m²",
    "terreno-libertad-637-845-historico": "Libertad 637 · lote de 845 m² con mejoras · enlace no vigente",
    "moreno-terreno-el-salvador-tupungato-393": "Calle El Salvador y Tupungato · 393 m²",
    "prados-oeste-1b-lote-182-800": "Prados del Oeste 1-B · Lote 182 · 800 m²",
    "sofocles-3000-terreno-casa-330": "Sófocles 3000 · terreno con vivienda · 330 m²",
    "casa-quinta-patricias-argentinas-2100-5150": "Casa quinta · Patricias Argentinas 2100 · 5.150 m²",
    "alvarez-prado-2031-terreno-339": "Álvarez Prado 2031 · lote de 339 m² · permiso provisorio para dos locales",
    "parques-morenito-felix-de-azara-300": "Parques del Morenito · Lote L20 Mza C · Felix de Azara 8200 · 300 m²",
    "colectora-sur-km31-5-fraccion-33000": "Colectora Sur Acceso Oeste km 31,5 · fracción de 33.000 m²",
    "casa-leopoldo-lugones-900-5000": "Leopoldo Lugones 900 · casona sobre 5.000 m²",
    "terreno-marco-sastre-10552-dos-lotes-360": "Marco Sastre 10552 · dos lotes de 360 m² cada uno",
    "terreno-juan-stefani-torre-alta-iii-420": "Juan Stefani · Barrio Torre Alta III · 420 m²",
    "terreno-aeronautica-argentina-2300-430": "Aeronautica Argentina 2300 · lote de 430 m²",
    "loteo-barrio-malaver-etapa-2-pitagoras-echeverria-400": "Barrio Malaver · segunda etapa · lote de 400 m² en Pitágoras y Echeverría",
    "terreno-gervasio-mendez-10500-400": "Gervasio Méndez 10500 · lote de 400 m²",
    "casa-quinta-ambrosetti-2000-3195": "Ambrosetti al 2000 · casa quinta · La Reja Sur",
    "casa-quinta-juan-bautista-alberdi-1400-2000": "Juan Bautista Alberdi 1400 · casa quinta sobre 2.000 m²",
    "casa-prados-oeste-general-hornos-2900-850": "General Hornos 2900 · casa en construcción · Prados del Oeste II",
    "casa-quinta-infanta-isabel-4200-1527": "Infanta Isabel 4200 · quinta Parque Gorriti",
    "terreno-juan-jose-castelli-2500-8435": "Juan José Castelli 2500 · fracción de 8.435 m² · Villa Salas",
    "terreno-general-hornos-1800-prados-oeste2-800": "Prados del Oeste · lote central de 800 m² · General Hornos 1800",
    "terreno-don-bosco-8700-san-francisco-325": "Barrio San Francisco · Don Bosco 8599/8700 · 325 m²",
    "terrenos-mariano-moreno-la-reja-lotes-5-11-925": "Loteo Mariano Moreno · lotes 5 y 11 · 925 m² cada uno",
    "terreno-de-la-vega-200-dos-lotes-970": "De la Vega al 200 · dos lotes · 970 m²",
    "terreno-leandro-alem-2365-600": "Leandro N. Alem 2365 · lote de 600 m²",
    "terreno-marconi-1700-2200": "Marconi 1700 · lote de 2.200 m² · próximo a Acceso Oeste",
    "terreno-solares-zapiola-lote22-450": "Solares de Zapiola · lote 22 · 450 m²",
    "casa-piovano-3322-234": "Av. Francisco Piovano 3322 · chalet de 5 ambientes",
    "casa-damicis-1485-270": "Damicis 1485 · casa y dos departamentos independientes",
    "casa-ecuador-2300-241-no-vigente": "Ecuador 2300 · dos viviendas independientes · Villa Anita",
    "terreno-espana-700-928-casa-galpon": "España 700/747 · lote de 928 m² con casa, galpón y pileta",
    "fraccion-monsegur-3100-6150-la-reja": "Avenida Monsegur 3100 · fracción de 6.150 m² · La Reja",
    "activo-mixto-bartolome-mitre-1400-4000": "Av. Bartolomé Mitre 1400 · 4.000 m² · triple acceso",
    "inmueble-comercial-libertador-500-368": "Avenida del Libertador al 500 · galpón y vivienda · 368 m²",
    "terreno-4-vientos-pitagoras-336": "Barrio 4 Vientos · lote sobre Pitágoras · 336 m²",
    "terreno-molina-campos-400-1434": "Florencio Molina Campos 400 · terreno de 1.434 m²",
    "casa-luzuriaga-2698-900": "Luzuriaga 2698 · casa a refaccionar sobre 900 m²",
    "casa-teniente-camilli-520-279": "Teniente Camilli al 520 · casa de 4 ambientes",
    "casa-libertad-200-229": "Libertad 200 · casa de 4 ambientes · Moreno Centro",
    "casa-lucia-rueda-42-660": "Lucía Rueda 42 · casa quinta en Paso del Rey",
    "casa-el-resuello-720": "Casa en Barrio Cerrado El Resuello · lote de 720 m²",
    "casa-almafuerte-3900-banco-provincia-924": "Almafuerte al 3900 · casa en Country Club Banco Provincia",
    "casa-mariano-luciano-vega-613-367": "Mariano y Luciano de la Vega 613 · casa con depósito",
    "casa-piovano-3700-superficie-conflictiva": "Francisco Piovano al 3700 · casa quinta sobre tres lotes anunciados",
    "casa-facundo-quiroga-1100-300-pendiente": "Facundo Quiroga 1100 · casa de 4 ambientes",
    "casa-pueyrredon-2544-560-pendiente": "Pueyrredon al 2544 · chalet de 3 dormitorios",
    "terreno-valparaiso-100-lote10-300": "Valparaíso 100 · lote 10 · 300 m² · Barrio Güemes",
    "terreno-valparaiso-100-lote11-300": "Valparaíso 100 · lote 11 · 300 m² · Barrio Güemes",
    "terreno-9-de-julio-46-487": "9 de Julio 46 · lote de 487 m² con estructura para cuatro departamentos",
    "terreno-jose-marmol-rivadavia-1418": "José Mármol 100 · esquina Bernardino Rivadavia · 1.418 m²",
    "terreno-guatemala-2500-valentin-alsina-590": "Guatemala 2500 esquina Valentín Alsina · 590 m²",
    "terreno-justo-daract-2751-2163": "Justo Daract 2751 · dos parcelas por 2.163 m²",
    "casa-quinta-samaniego-4900-4200": "Samaniego 4900 · casa quinta sobre 4.200 m²",
    "casa-martinez-melo-300-161": "Martínez Melo al 300 · casa de 5 ambientes a refaccionar",
    "casa-25-de-mayo-2700-350": "25 de Mayo 2700 · casa clásica tipo americana · Paso del Rey",
    "casa-concordia-2545-311": "Concordia 2545 · casa de cinco ambientes · Moreno",
    "terreno-bartolome-mitre-3200-1260": "Avenida Bartolomé Mitre 3200 · lote comercial de 1.260 m²",
    "casa-doctor-asseff-400-361": "Casa con jardín y departamento independiente · Dr. Asseff 400",
    "desarrollo-fincas-san-jose-87ha-650": "Fincas San José · 87 ha · 650 lotes de 800 m²",
    "fincas-san-jose-lote-800-etapa3-30600": "Fincas San José · lote publicado de 800 m² · etapa 3",
    "terreno-boulevard-evita-100-111-pendiente": "Terreno sobre Boulevard Evita 100 · Moreno Centro · ficha a corregir",
    "casa-emilio-mitre-2300-1100-historico": "Block de viviendas y monoambientes · Emilio Mitre 2300",
    "terreno-colectora-norte-fray-cayetano-1348-historico": "Colectora Norte Acceso Oeste km 0 · esquina Fray Cayetano Rodríguez · 1.348 m²",
    "casa-antartida-argentina-600-342-historico": "Casa, local y depósito · Antártida Argentina 600",
    "terreno-intendente-corvalan-1500-586": "Intendente Corvalán 1500 · lote de 586,44 m²",
    "terreno-alcorta-2400-846": "Alcorta al 2400 · lote comercial de 846 m²",
    "terreno-sarmiento-596-750": "Sarmiento 596 y Guatemala · lote de 750 m²",
    "terreno-espana-1100-1255-cu3": "España al 1100 · parcela CU3 de 1.255 m²",
    "terreno-joly-1800-1163-tres-lotes": "Claudio María Joly 1800 y 1° de Mayo · 1.163 m²",
    "terreno-soule-alberdi-200": "Soule y Alberdi · lote de 200 m²",
    "casa-san-luis-1557-100": "Casa 3 ambientes · San Luis 1557",
    "casa-leandro-alem-2500-305": "Casa 3 ambientes · Leandro N. Alem 2500",
    "casa-ituzaingo-azcuenaga-218": "Casa 5 ambientes · Ituzaingo y Azcuénaga",
    "terreno-sancti-spiritu-1500-816": "Sancti Spiritu 1500 · lote de 816,93 m²",
    "terreno-prados-oeste2-general-hornos-2800-806": "Prados del Oeste 2 · lote de 806 m² · General Hornos 2800",
    "terreno-prados-oeste2-lote231-812": "Prados del Oeste 2 · lote 231 · 812,65 m²",
    "terreno-prados-oeste2-lote5-821": "Prados del Oeste 2 · lote 5 · 821,19 m²",
    "terreno-parque-la-arboleda-beato-escriva": "Barrio Parque La Arboleda · Beato Escrivá de Balaguer",
    "terreno-domingo-matheu-2000-236": "Domingo Matheu 2000 y Antártida Argentina · lote de 236 m²",
    "casaquinta-chacras-teofilo-lote-471-historico": "Chacras de Teófilo · lote anunciado de 471 m²",
    "propiedad-mixta-irlanda-2100-historico": "Irlanda al 2100 · dos casas y terreno · publicaciones con precio divergente",
    "casa-blas-parera-1100-historica": "Casa 3 ambientes · Blas Parera 1100",
    "casa-zeballos-1900-historica": "Zeballos 1900 · casa en La Reja · dos avisos con datos incompatibles",
    "terreno-canada-alsina-1250-industrial": "Canadá y Alsina 0 · lote pasante de 1.250 m²",
    "terreno-intendente-corvalan-1600-390": "Intendente Corvalán 1600 · lote de 390 m²",
    "terreno-marmol-648-1200": "Mármol 648 · lote de 1.200 m²",
    "terreno-miero-3751-7100-historico": "Miero 3751 · fracción con superficie contradictoria",
    "casa-maipu-1341-el-casco-historica": "Maipú 1341 · El Casco de Moreno · casa con pileta",
    "casa-ituzaingo-1400-723": "Ituzaingó 1400 · casa y dos terrenos adicionales",
    "casa-antartida-argentina-1000-jurisdiccion-pendiente": "Antártida Argentina al 1000 · casa con posibilidad de ampliación",
    "casa-soule-rafael-nunez-300-dos-unidades": "Soule entre Rafael y Núñez · dos propiedades en un predio",
    "casa-aristobulo-del-valle-1600-560": "Aristóbulo del Valle al 1600 · casa principal y segunda vivienda",
    "casa-eugenia-ottone-asconape-3300-300": "Eugenia Ottone de Asconape al 3300 · casa a refaccionar",
    "casa-leandro-alem-carpintero-pedro-mena-263": "Leandro N. Alem entre El Carpintero y Pedro de Mena · casa de 3 dormitorios",
    "casa-jose-maria-paz-cabildo-emilio-mitre-400": "José María Paz entre Cabildo y Emilio Mitre · casa de 4 dormitorios",
    "casa-general-hornos-axteca-los-olmos-500": "General Hornos entre Axteca y Los Olmos · casa de 4 dormitorios",
    "casa-don-segundo-sombra-1700-281": "Don Segundo Sombra 1700 · casa de 3 ambientes",
    "casa-marcelino-soule-1200-195": "Marcelino Soule al 1200 · casa de 3 ambientes",
    "casa-zeballos-900-140": "Zeballos 900 · dúplex de 5 ambientes",
    "casa-leandro-n-alem-1700-historico": "Leandro N. Alem 1700 · casa de 4 ambientes (retirada)",
    "terreno-mariano-moreno-lote1-650": "Nuevo loteo Mariano Moreno · lote 1 · 650,38 m²",
    "terreno-mariano-moreno-lotes-2-3-4-7-8-801": "Nuevo loteo Mariano Moreno · lotes 2, 3, 4, 7 y 8 · 801,30–805,80 m²",
    "desarrollo-loteo-mariano-moreno-la-reja": "Nuevo fraccionamiento sobre calle Mariano Moreno · La Reja",
    "terreno-loteo-la-quebrada-copernico-200-300-financiado": "Loteo La Quebrada · Copérnico al 200 · 300 m² · oferta financiada",
    "terreno-loteo-la-quebrada-copernico-200-300-contado": "Loteo La Quebrada · Copérnico al 200 · 300 m² · oferta contado",
    "terreno-diario-la-prensa-general-savio-9200": "Diario La Prensa y General Savio · fracción de 9.200 m²",
    "terreno-parque-industrial-reconquista-3420": "Parque Industrial Reconquista · lote de 3.420 m² · Trujui",
    "desarrollo-distrito-ecologico-roggero": "Distrito Ecológico Roggero · plataforma de desarrollo urbano, ambiental y turístico",
    "terreno-prados-oeste2-lote132-800-historico": "Prados del Oeste II · lote interno 132 · 800 m² (aviso retirado)",
    "terreno-riccheri-638": "Lote sobre calle Teniente General Pablo Riccheri · 638 m²",
    "terreno-gervasio-mendez-300-umbrales": "Gervasio Méndez · lote de 300 m²",
    "terreno-ricardo-gutierrez-8900-312": "Malaver · Ricardo Gutiérrez 8900 · lote 4, manzana 32",
    "terreno-los-molinos-lotes-800-850": "Barrio Los Molinos · lotes 1, 3 y 10 · El Molino",
    "terreno-prados-oeste2-lote15-928": "Prados del Oeste 2 · etapa 1 · lote 15 · 928 m²",
    "terreno-prados-oeste1b-lote295-745": "Prados del Oeste 1-B · lote 295",
    "terreno-potosi-sin-altura-345-posible-reactivacion": "Potosí s/n · lote de 345 m² · posible reaparición de lotes de Barrio Parque Moreno",
    "casa-general-hornos-2800-prados-oeste1-819": "Casa 4 ambientes · Prados del Oeste I · General Hornos 2800",
    "casa-prados-oeste1a-lote62-801": "Prados del Oeste 1-A · lote 62 · casa de 6 ambientes",
    "casa-prados-oeste1b-lote169-819": "Prados del Oeste 1-B · casa lote 169",
    "casa-prados-oeste1b-lote275-800": "Prados del Oeste 1-B · casa lote 275",
    "casa-prados-oeste1b-lote234-810": "Prados del Oeste 1-B · casa lote 234",
    "casa-el-carpintero-100": "Casa 2 ambientes · El Carpintero 100",
    "casa-de-la-quintana-moreno": "Casa de 5 ambientes · De La Quintana",
    "casa-claudio-maria-joly-1900-252": "Casa 3 ambientes · Claudio María Joly al 1900",
    "casa-graham-bell-2800-840": "Alejandro Graham Bell 2800 · casa sobre lote en esquina",
    "casa-rafael-arcos-1800-860": "Casa quinta · Rafael Arcos 1800",
    "casa-esteban-bongiovanni-1200-1000": "Esteban Bongiovanni al 1200 · casa y cabaña a terminar",
    "casa-gervasio-mendez-4900-70": "Umbrales de la Merced · dúplex Gervasio Méndez al 4900",
    "casa-gervasio-mendez-5000-154": "Umbrales de la Merced II · dúplex Gervasio Méndez al 5000",
    "terreno-fincas-san-jose-etapa2-800": "Fincas San José · lote genérico de 800 m² · etapa 2",
    "casa-prados-oeste1b-lote212-813": "Prados del Oeste 1-B · Casa Uno · lote 212 · obra anunciada",
    "terreno-coronel-suarez-neuquen-lote31-500": "Coronel Suárez y Neuquén · lote N.º 31 · 500 m²",
    "desarrollo-parque-central-av-libertador-6400": "Parque Central · loteo abierto sobre Av. Libertador al 6400",
    "terreno-chile-133-1036": "Chile 133 · tres lotes unificados · 1.036,15 m²",
    "casa-salvador-6300-300": "Casa de un dormitorio · Salvador al 6300 · Mi Barrio",
    "terreno-haras-maria-victoria-lote32-800": "Haras María Victoria · lote 32 · Atahualpa 5",
    "casa-labarden-2000-800-industrial": "Labarden al 2000 · fracción industrial con casa y quincho",
    "terreno-santa-teresa-de-jesus-2900-221": "Santa Teresa de Jesús al 2900 · terreno con mejoras",
    "predio-piovano-4300-18816": "Av. Francisco Piovano al 4300 · predio de siete lotes · 18.816 m²",
    "terreno-prados-oeste1-lote137-778": "Prados del Oeste 1 · lote 137 · etapa 1 A · proyecto de 234 m²",
    "terreno-prados-oeste2-831": "Prados del Oeste II · lote interno de 831 m²",
    "terreno-casco-alvarez-725": "Casco de Álvarez · lote central en esquina",
    "terreno-san-carlos-4500-552": "San Carlos al 4500 · quincho con pileta",
    "terreno-reverendo-padre-fahy-2300-756": "El Resuello · lote sobre Reverendo Padre Fahy al 2300",
    "quinta-constituyentes-800-1261": "Quintas de Álvarez · Constituyentes 800",
    "quinta-el-arreo-2900-779": "El Arreo 2900 · casa quinta con pileta",
    "quinta-reverendo-padre-fahy-200-1300": "Reverendo Padre Fahy 200 · quinta con pileta",
    "quinta-leguizamon-1400-1200": "Leguizamón al 1400 · quinta de cuatro ambientes",
    "quinta-los-aromos-400-1308": "Los Aromos 400 · Barrio La Tradición · tres lotes unificados",
    "quinta-la-providencia-900-1537": "La Providencia 900 · casa quinta de seis ambientes",
    "quinta-juana-de-arco-700-600": "Juana de Arco al 700 · quinta con pileta y quincho",
    "quinta-zuloaga-1500-1680": "Zuloaga 1500 · quinta de cinco ambientes",
    "predio-deportivo-san-luis-2600-10860": "San Luis al 2600 · predio deportivo de 10.860 m²",
    "fraccion-rocha-blaquier-2001-10000": "Rocha Blaquier 2001 · fracción de 10.000 m² con mejoras",
    "terreno-libano-echeverria-2-lotes-456": "Líbano y Echeverría · dos lotes de 456 m² cada uno",
    "terreno-boulogne-sebastian-el-cano-373": "Boulogne Sur Mer y Sebastián El Cano · lote de 373,10 m²",
    "quinta-nemesio-alvarez-3900-1100": "Nemesio Álvarez al 3900 · quinta de tres ambientes",
    "quinta-tegucigalpa-4500-300": "Tegucigalpa al 4500 · quinta con pileta",
    "quinta-los-robles-2900-270": "Los Robles 2900 · casa quinta tipo loft",
    "quinta-mercedes-100-696": "Mercedes 100 · quinta de tres ambientes",
    "quinta-mercedes-2200-1260": "Mercedes 2200 · quinta con dos viviendas y pileta",
    "casa-bolivia-2100-400": "Casa 4 ambientes · Bolivia 2100 · 400 m²",
    "casa-panama-5300-300": "Casa 6 ambientes · Panamá 5300 · 300 m²",
    "quinta-formosa-3400-3600": "Casa quinta con dos viviendas · Formosa 3400 · 3.600 m²",
    "casa-urquiza-2600-299": "Casa 3 ambientes · Justo José de Urquiza 2600",
    "desarrollo-altos-del-monte-san-juan-bautista-2400": "Condominio Altos del Monte · unidades terminadas · San Juan Bautista 2400",
    "casa-concordia-1600-219": "Casa 2 ambientes · Concordia 1600 · 219 m²",
    "casa-maria-eugenia-residences-coravalan-2300-187": "Dúplex · María Eugenia Residences & Village · Intendente Coravalan al 2300",
    "terreno-diario-la-prensa-700-960": "Lote UF 272 · Campos de Álvarez · Diario La Prensa 700 · 960 m²",
    "quinta-intendente-dastugue-4200-2500": "Casa quinta con segunda vivienda a terminar · Intendente Dastugue 4200",
    "quinta-rembrandt-3800-2700": "Casa quinta · Rembrandt 3800 · 2.700 m²",
    "casa-libertad-300-175": "Casa 3 ambientes · Libertad al 300 · 175 m²",
    "casa-puente-marquez-1202-1000": "Casa con pileta y quincho · Puente de Márquez 1202 · 1.000 m²",
    "terreno-san-diego-1687": "Terreno · San Diego Club de Campo · 1.687 m²",
    "terreno-san-diego-2175-historico": "Terreno histórico no vigente · San Diego Club de Campo · 2.175 m²"
  });

  function listMapReferenceIds() {
    return Object.keys(mapReferenceNames);
  }

  function readMapReference(search) {
    const parameters = new URLSearchParams(String(search || ""));
    const id = String(parameters.get("map_ref") || "").trim().toLowerCase().replace(/[^a-z0-9-]/g, "");
    if (!/^[a-z0-9-]{1,80}$/.test(id) || !Object.prototype.hasOwnProperty.call(mapReferenceNames, id)) {
      return null;
    }
    return { id: id, name: mapReferenceNames[id] };
  }

  function buildContactMessage(input) {
    const data = input || {};
    const fields = data.fields || {};
    const calculationInput = data.calculationInput || {};
    const areaFromCalculator = String(calculationInput.areaRaw || "").trim();
    const labels = [
      ["Nombre", "nombre"],
      ["Perfil", "perfil"],
      ["Interés", "interes"],
      ["Zona", "zona"],
      ["Email de contacto", "email_contacto"],
      ["Teléfono de contacto", "telefono_contacto"],
      ["Tipo de oportunidad", "tipo"],
      ["Ubicación o referencia", "ubicacion"],
      ["Partida o nomenclatura catastral", "nomenclatura"],
      ["Superficie aproximada", "superficie"],
      ["Documentación disponible (declarada)", "documentacion"],
      ["Consultas realizadas (declaradas)", "verificaciones"],
      ["Referencia del Mapa IA", "referencia_mapa"],
      ["Contexto", "detalle"]
    ];
    const lines = ["Hola Erica, quiero iniciar una conversación sobre una oportunidad en MORENO.", ""];
    labels.forEach(function (entry) {
      const label = entry[0];
      const key = entry[1];
      if (key === "superficie" && areaFromCalculator) return;
      const value = formatFieldValue(fields[key]);
      if (value) lines.push(label + ": " + value);
    });
    const note = buildLeadNote(calculationInput);
    if (!note.empty) lines.push("", ...note.lines);
    lines.push("", "Las selecciones de documentación y consultas son declaraciones de quien completa; no constituyen verificación independiente.", "Los campos internos de originación, negociación y honorarios no forman parte de este mensaje.", "", "Enviado desde el formulario de oportunidades del sitio MORENO.");
    return lines.join("\n");
  }


  function buildOpportunityDossier(input) {
    const data = input || {};
    const fields = data.fields || {};
    const calculationInput = data.calculationInput || {};
    const includePublic = data.includePublic !== false;
    const includeInternal = data.includeInternal !== false;
    const internal = validateInternalDossier(data.internalData).value;

    function makeSection(title, entries, emptyLabel) {
      const rows = entries.map(function (entry) {
        return { label: entry[0], value: formatFieldValue(entry[1]) };
      }).filter(function (entry) { return Boolean(entry.value); });
      if (!rows.length) rows.push({ label: "Información", value: emptyLabel || "No informada por el contacto." });
      return { title: title, rows: rows };
    }

    const sections = [];
    if (includePublic) {
      sections.push(
        makeSection("Origen y contacto", [
          ["Nombre", fields.nombre],
          ["Email de contacto", fields.email_contacto],
          ["Teléfono de contacto", fields.telefono_contacto],
          ["Perfil declarado", fields.perfil],
          ["Interés declarado", fields.interes],
          ["Referencia territorial de origen (no parcelaria)", fields.referencia_mapa]
        ]),
        makeSection("Inmueble o proyecto", [
          ["Localidad o zona declarada", fields.zona],
          ["Tipo de oportunidad declarado", fields.tipo],
          ["Ubicación o referencia aportada", fields.ubicacion],
          ["Partida o nomenclatura aportada", fields.nomenclatura],
          ["Superficie aproximada declarada", fields.superficie]
        ]),
        makeSection("Documentación y consultas declaradas", [
          ["Documentación indicada como disponible", fields.documentacion],
          ["Consultas o verificaciones declaradas", fields.verificaciones]
        ])
      );

      const calculation = calculatePreliminary(calculationInput);
      const calculationRows = [
        ["Superficie ingresada para cálculo (m²)", calculationInput.areaRaw],
        ["FOS aportado", calculationInput.fosRaw],
        ["FOT aportado", calculationInput.fotRaw],
        ["Fuente o referencia de indicadores aportada", calculationInput.referenceRaw]
      ];
      if (calculation.ok) {
        calculationRows.push(["Resultado aritmético preliminar", calculation.summary.join(" ")]);
      } else if (calculation.error) {
        calculationRows.push(["Estado del cálculo", "No realizado: " + calculation.error]);
      } else {
        calculationRows.push(["Estado del cálculo", "No se ingresaron datos para realizar una cuenta."]);
      }
      sections.push(makeSection("Datos urbanísticos aportados", calculationRows));

      if (formatFieldValue(fields.detalle)) {
        sections.push(makeSection("Contexto adicional aportado", [["Descripción", fields.detalle]]));
      }
    }

    if (includeInternal) {
      const counterpartyLabels = {
        owner: "Propietario/a",
        representative: "Representante",
        developer: "Desarrollador/a",
        investor: "Inversor/a",
        company: "Profesional o empresa",
        other: "Otro"
      };
      const commercialStageLabels = {
        not_started: "Sin iniciar",
        first_contact: "Primer contacto",
        response: "Respuesta recibida",
        meeting: "Reunión",
        documents: "Documentación solicitada",
        analysis: "Análisis preliminar",
        proposal: "Propuesta enviada",
        negotiation: "Negociación",
        won: "Ganada",
        lost: "No concretada",
        paused: "Pausada"
      };
      const evidenceClassLabels = {
        counterparty: "Declaración de contraparte",
        public: "Fuente pública",
        technical: "Documento técnico recibido",
        checked: "Contraste registrado por quien opera"
      };
      const diligenceStatusLabels = {
        pending: "Pendiente",
        in_progress: "En curso",
        documented: "Fuente o documento cargado",
        professional_review: "Requiere revisión profesional",
        blocked: "Bloqueado"
      };
      sections.push(makeSection("Seguimiento y negociación · uso interno", [
        ["Referencia interna", internal.reference],
        ["Tipo de contraparte", counterpartyLabels[internal.counterpartyType] || ""],
        ["Organización o empresa (sin datos personales)", internal.organization],
        ["Etapa comercial", commercialStageLabels[internal.commercialStage] || ""],
        ["Próxima acción", internal.nextAction],
        ["Fecha de seguimiento", internal.followUpDate],
        ["Notas de negociación", internal.negotiationNotes]
      ], "Sin datos internos registrados."));
      const evidenceRows = internal.evidence.map(function (entry, index) {
        return [
          "Fuente " + (index + 1),
          [entry.title, evidenceClassLabels[entry.classification] || "", entry.url, entry.consultedAt, entry.note].filter(Boolean).join(" · ")
        ];
      });
      if (!evidenceRows.length) evidenceRows.push(["Registro de fuentes", "Sin fuentes registradas."]);
      sections.push(makeSection("Registro de fuentes y evidencia", evidenceRows));
      const diligenceRows = Object.keys(internalCheckLabels).map(function (key) {
        const entry = internal.checks[key];
        const details = [
          diligenceStatusLabels[entry.status] || "Pendiente",
          entry.source,
          entry.consultedAt,
          entry.note
        ].filter(Boolean).join(" · ");
        return [internalCheckLabels[key], details];
      });
      sections.push(makeSection("Control de diligencia", diligenceRows));
      const feeRows = [
        ["Moneda común del registro", internal.fees.currency],
        ["Honorarios propuestos", internal.fees.proposed],
        ["Honorarios acordados", internal.fees.agreed],
        ["Honorarios facturados", internal.fees.invoiced],
        ["Honorarios cobrados", internal.fees.collected]
      ];
      if (!internal.fees.currency && ![internal.fees.proposed, internal.fees.agreed, internal.fees.invoiced, internal.fees.collected].some(Boolean)) {
        feeRows[0][1] = "Sin importes registrados.";
      }
      sections.push(makeSection("Honorarios · importes independientes, sin conversión ni suma", feeRows));
    }

    const disclaimers = [
      "Este documento no constituye tasación, oferta, estudio de factibilidad, recomendación de inversión ni compromiso comercial."
    ];
    if (includePublic) {
      disclaimers.unshift("Esta ficha reúne exclusivamente datos ingresados por el contacto y resultados aritméticos de referencia. No verifica la autenticidad, vigencia o exactitud de fuentes y documentos, ni acredita identidad, titularidad, disponibilidad o situación urbanística.");
      disclaimers.push("Los cálculos FOS/FOT son referencias matemáticas teóricas; no equivalen a superficie efectivamente edificable ni a una aprobación municipal.");
      disclaimers.push("Las opciones de documentación y consultas reflejan declaraciones del contacto y requieren contraste independiente.");
    }
    if (includeInternal) {
      disclaimers.push("Los estados de diligencia, las clasificaciones de evidencia y las notas internas son registros ingresados por quien opera; el sistema no los verifica automáticamente.");
      disclaimers.push("Esta herramienta no tiene autenticación ni control de acceso. No ingreses DNI, escrituras, teléfonos, correos, datos bancarios ni información personal; usala solo en un dispositivo confiable y conservá el JSON bajo tu control.");
    }

    return {
      title: "Ficha preliminar de oportunidad",
      generatedAt: String(data.generatedAt || ""),
      status: "BORRADOR · DATOS APORTADOS, NO VERIFICADOS",
      sections: sections,
      checks: [
        "Identificación catastral, nomenclatura, mensura y geometría de la parcela.",
        "Normativa vigente, usos, indicadores, alturas, retiros y afectaciones.",
        "Titularidad, antecedentes dominiales, gravámenes y restricciones.",
        "Servicios, accesos y condiciones hidráulicas y ambientales.",
        "Factibilidad técnica, costos, estructura financiera y demanda."
      ],
      disclaimers: disclaimers
    };
  }

const dossierFieldLimits = Object.freeze({
    nombre: 90, perfil: 60, interes: 90, zona: 120,
    email_contacto: 254, telefono_contacto: 40, tipo: 60,
    ubicacion: 180, nomenclatura: 120, superficie: 60,
    referencia_mapa: 180, detalle: 1200
  });
  const dossierFieldLabels = Object.freeze({
    nombre: "nombre", perfil: "perfil", interes: "interés", zona: "zona",
    email_contacto: "email de contacto", telefono_contacto: "teléfono de contacto",
    tipo: "tipo de oportunidad", ubicacion: "ubicación",
    nomenclatura: "nomenclatura catastral", superficie: "superficie",
    referencia_mapa: "referencia territorial", detalle: "contexto"
  });
  const dossierSelectOptions = Object.freeze({
    perfil: ["Propietario/a", "Inversor/a", "Desarrollador/a", "Profesional o empresa", "Otro"],
    interes: ["Presentar un terreno o inmueble", "Analizar un proyecto en marcha", "Evaluar una oportunidad de desarrollo", "Explorar una inversión", "Buscar un socio o alianza", "Ofrecer servicios profesionales", "Todavía estoy explorando"],
    tipo: ["No definido", "Terreno", "Inmueble existente", "Proyecto en desarrollo", "Inversión o alianza", "Servicios profesionales"]
  });
  const dossierChecklistOptions = Object.freeze({
    documentacion: ["Ubicación o dirección", "Partida o nomenclatura catastral", "Plano o mensura", "Certificado urbanístico o zonificación", "Antecedentes dominiales (sin adjuntar)", "Información sobre servicios"],
    verificaciones: ["Identificación catastral consultada", "Zonificación e indicadores urbanísticos consultados", "Titularidad o antecedentes dominiales consultados", "Servicios y accesos consultados", "Restricciones hidráulicas o ambientales consultadas", "Consultas municipales o prefactibilidades"]
  });
  const dossierCalculationLimits = Object.freeze({
    areaRaw: 18, fosRaw: 18, fotRaw: 18, referenceRaw: 180
  });
  const internalCheckLabels = Object.freeze({
    cadastral: "Catastral y mensura",
    legal: "Dominial y legal",
    zoning: "Urbanística y normativa",
    environment: "Ambiental e hidráulica",
    services: "Servicios y accesos",
    market: "Mercado y demanda"
  });
  const internalCounterpartyOptions = Object.freeze(["owner", "representative", "developer", "investor", "company", "other"]);
  const internalCommercialStages = Object.freeze(["not_started", "first_contact", "response", "meeting", "documents", "analysis", "proposal", "negotiation", "won", "lost", "paused"]);
  const internalEvidenceClasses = Object.freeze(["counterparty", "public", "technical", "checked"]);
  const internalDiligenceStatuses = Object.freeze(["pending", "in_progress", "documented", "professional_review", "blocked"]);

  function emptyInternalDossier() {
    const checks = {};
    Object.keys(internalCheckLabels).forEach(function (key) {
      checks[key] = { status: "pending", source: "", consultedAt: "", note: "" };
    });
    return {
      reference: "",
      counterpartyType: "",
      organization: "",
      commercialStage: "",
      nextAction: "",
      followUpDate: "",
      negotiationNotes: "",
      evidence: [],
      checks: checks,
      fees: { currency: "", proposed: "", agreed: "", invoiced: "", collected: "" }
    };
  }

  function validISODate(value) {
    return !value || (
      /^\d{4}-\d{2}-\d{2}$/.test(value) &&
      Number.isFinite(Date.parse(value + "T00:00:00Z")) &&
      new Date(value + "T00:00:00Z").toISOString().slice(0, 10) === value
    );
  }

  function validateInternalDossier(source) {
    const input = isRecord(source) ? source : {};
    const value = emptyInternalDossier();
    const errors = [];
    const warnings = [];

    function readText(object, key, max, label) {
      const raw = object[key];
      if (raw == null) return "";
      if (typeof raw !== "string") {
        errors.push(label + " debe ser texto.");
        return "";
      }
      const text = raw.trim();
      if (text.length > max) errors.push(label + " supera el máximo de " + max + " caracteres.");
      return text.slice(0, max);
    }

    value.reference = readText(input, "reference", 50, "La referencia interna");
    value.counterpartyType = readText(input, "counterpartyType", 30, "El tipo de contraparte");
    if (value.counterpartyType && !internalCounterpartyOptions.includes(value.counterpartyType)) {
      errors.push("El tipo de contraparte no está reconocido.");
      value.counterpartyType = "";
    }
    value.organization = readText(input, "organization", 120, "La organización");
    value.commercialStage = readText(input, "commercialStage", 30, "La etapa comercial");
    if (value.commercialStage && !internalCommercialStages.includes(value.commercialStage)) {
      errors.push("La etapa comercial no está reconocida.");
      value.commercialStage = "";
    }
    value.nextAction = readText(input, "nextAction", 180, "La próxima acción");
    value.followUpDate = readText(input, "followUpDate", 10, "La fecha de seguimiento");
    if (!validISODate(value.followUpDate)) errors.push("La fecha de seguimiento debe ser una fecha válida AAAA-MM-DD.");
    value.negotiationNotes = readText(input, "negotiationNotes", 800, "Las notas de negociación");

    if (value.nextAction && !value.followUpDate) warnings.push("Hay una próxima acción sin fecha de seguimiento.");
    if (value.followUpDate && !value.nextAction) warnings.push("Hay una fecha de seguimiento sin acción definida.");

    if (input.evidence != null && !Array.isArray(input.evidence)) {
      errors.push("El registro de fuentes debe ser una lista.");
    } else if (Array.isArray(input.evidence)) {
      if (input.evidence.length > 8) errors.push("Se admiten hasta ocho fuentes por expediente.");
      input.evidence.slice(0, 8).forEach(function (raw, index) {
        const label = "La fuente " + (index + 1);
        if (!isRecord(raw)) {
          errors.push(label + " tiene una estructura inválida.");
          return;
        }
        const entry = {
          title: readText(raw, "title", 140, label + " · título"),
          classification: readText(raw, "classification", 30, label + " · clasificación"),
          url: readText(raw, "url", 500, label + " · URL"),
          consultedAt: readText(raw, "consultedAt", 10, label + " · fecha"),
          note: readText(raw, "note", 300, label + " · nota")
        };
        if (entry.title || entry.classification || entry.url || entry.consultedAt || entry.note) {
          if (!entry.title) errors.push(label + ": indicá un título o nombre de documento.");
          if (!internalEvidenceClasses.includes(entry.classification)) errors.push(label + ": seleccioná una clasificación de evidencia.");
          if (entry.url && !/^https:\/\/[^\s]+$/i.test(entry.url)) errors.push(label + ": la fuente debe usar una URL HTTPS válida.");
          if (!validISODate(entry.consultedAt)) errors.push(label + ": la fecha debe ser válida AAAA-MM-DD.");
          value.evidence.push(entry);
        }
      });
    }

    if (input.checks != null && !isRecord(input.checks)) errors.push("Los controles de diligencia deben tener una estructura válida.");
    const rawChecks = isRecord(input.checks) ? input.checks : {};
    Object.keys(internalCheckLabels).forEach(function (key) {
      if (rawChecks[key] != null && !isRecord(rawChecks[key])) errors.push(internalCheckLabels[key] + ": el registro tiene una estructura inválida.");
      const raw = isRecord(rawChecks[key]) ? rawChecks[key] : {};
      const entry = {
        status: readText(raw, "status", 30, internalCheckLabels[key] + " · estado") || "pending",
        source: readText(raw, "source", 180, internalCheckLabels[key] + " · fuente"),
        consultedAt: readText(raw, "consultedAt", 10, internalCheckLabels[key] + " · fecha"),
        note: readText(raw, "note", 300, internalCheckLabels[key] + " · nota")
      };
      if (!internalDiligenceStatuses.includes(entry.status)) {
        errors.push(internalCheckLabels[key] + ": el estado no está reconocido.");
        entry.status = "pending";
      }
      if (!validISODate(entry.consultedAt)) errors.push(internalCheckLabels[key] + ": la fecha debe ser válida AAAA-MM-DD.");
      if (entry.status === "documented" && !entry.source && !entry.note) {
        warnings.push(internalCheckLabels[key] + ": se marcó una fuente/documento cargado sin referencia ni nota.");
      }
      value.checks[key] = entry;
    });

    if (input.fees != null && !isRecord(input.fees)) errors.push("Los honorarios deben tener una estructura válida.");
    const rawFees = isRecord(input.fees) ? input.fees : {};
    value.fees.currency = readText(rawFees, "currency", 3, "La moneda de honorarios");
    if (value.fees.currency && !["ARS", "USD"].includes(value.fees.currency)) {
      errors.push("La moneda debe ser ARS o USD.");
      value.fees.currency = "";
    }
    ["proposed", "agreed", "invoiced", "collected"].forEach(function (key) {
      const label = "Honorarios " + key;
      const amount = readText(rawFees, key, 18, label);
      if (amount && (!/^\d+(?:[,.]\d{1,2})?$/.test(amount) || /^\d{1,3}[,.]\d{3}$/.test(amount) || !Number.isFinite(Number(amount.replace(",", "."))) || Number(amount.replace(",", ".")) < 0)) {
        errors.push(label + ": ingresá un importe no negativo, sin separador de miles y con hasta dos decimales.");
      }
      value.fees[key] = amount;
    });
    if ([value.fees.proposed, value.fees.agreed, value.fees.invoiced, value.fees.collected].some(Boolean) && !value.fees.currency) {
      errors.push("Seleccioná una moneda (ARS o USD) para interpretar los importes de honorarios.");
    }

    return { ok: errors.length === 0, errors: errors, warnings: warnings, value: value };
  }

  function isRecord(value) {
    return Boolean(value) && typeof value === "object" && !Array.isArray(value);
  }

  function sanitizeImportedFields(source, warnings) {
    if (!isRecord(source)) throw new Error("La sección de datos del expediente no tiene un formato válido.");
    const result = {};
    Object.keys(dossierFieldLimits).forEach(function (key) {
      if (!Object.prototype.hasOwnProperty.call(source, key) || source[key] == null) return;
      if (typeof source[key] !== "string") throw new Error("El campo " + dossierFieldLabels[key] + " debe ser texto.");
      const value = source[key].trim();
      if (value.length > dossierFieldLimits[key]) throw new Error("El campo " + dossierFieldLabels[key] + " supera el largo permitido.");
      if (key === "email_contacto" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        throw new Error("El email de contacto no tiene un formato válido.");
      }
      if (dossierSelectOptions[key] && value && !dossierSelectOptions[key].includes(value)) {
        warnings.push("Se omitió un valor no reconocido en " + dossierFieldLabels[key] + ".");
        return;
      }
      result[key] = value;
    });
    Object.keys(dossierChecklistOptions).forEach(function (key) {
      if (!Object.prototype.hasOwnProperty.call(source, key) || source[key] == null) {
        result[key] = [];
        return;
      }
      if (!Array.isArray(source[key]) || source[key].length > 12) {
        throw new Error("La lista " + key + " no tiene un formato válido.");
      }
      const allowed = dossierChecklistOptions[key];
      const selected = [];
      source[key].forEach(function (item) {
        if (typeof item !== "string" || item.length > 120) {
          throw new Error("La lista " + key + " contiene un valor inválido.");
        }
        const value = item.trim();
        if (allowed.includes(value) && !selected.includes(value)) selected.push(value);
        else if (value && !allowed.includes(value)) warnings.push("Se omitió una opción no reconocida de " + key + ".");
      });
      result[key] = selected;
    });
    return result;
  }

  function sanitizeImportedCalculation(source) {
    if (!isRecord(source)) throw new Error("Los datos de cálculo no tienen un formato válido.");
    const result = {};
    Object.keys(dossierCalculationLimits).forEach(function (key) {
      if (!Object.prototype.hasOwnProperty.call(source, key) || source[key] == null) return;
      if (typeof source[key] !== "string") throw new Error("El dato de cálculo " + key + " debe ser texto.");
      const value = source[key].trim();
      if (value.length > dossierCalculationLimits[key]) throw new Error("El dato de cálculo " + key + " supera el largo permitido.");
      result[key] = value;
    });
    return result;
  }

  function extractLegacyDossierData(dossier) {
    const fields = {};
    const calculationInput = {};
    const fieldRows = {
      "Origen y contacto": {
        "Nombre": "nombre", "Perfil declarado": "perfil", "Interés declarado": "interes",
        "Referencia territorial de origen (no parcelaria)": "referencia_mapa"
      },
      "Inmueble o proyecto": {
        "Localidad o zona declarada": "zona", "Tipo de oportunidad declarado": "tipo",
        "Ubicación o referencia aportada": "ubicacion", "Partida o nomenclatura aportada": "nomenclatura",
        "Superficie aproximada declarada": "superficie"
      },
      "Documentación y consultas declaradas": {
        "Documentación indicada como disponible": "documentacion",
        "Consultas o verificaciones declaradas": "verificaciones"
      },
      "Contexto adicional aportado": { "Descripción": "detalle" }
    };
    const calculationRows = {
      "Superficie ingresada para cálculo (m²)": "areaRaw",
      "FOS aportado": "fosRaw",
      "FOT aportado": "fotRaw",
      "Fuente o referencia de indicadores aportada": "referenceRaw"
    };
    dossier.sections.forEach(function (section) {
      const fieldMap = fieldRows[section.title];
      const isCalculationSection = section.title === "Datos urbanísticos aportados";
      if (!fieldMap && !isCalculationSection) return;
      section.rows.forEach(function (row) {
        const value = row.value.trim();
        if (!value || value === "No informada por el contacto.") return;
        if (isCalculationSection && calculationRows[row.label]) {
          calculationInput[calculationRows[row.label]] = value;
        } else if (fieldMap && fieldMap[row.label]) {
          const key = fieldMap[row.label];
          fields[key] = key === "documentacion" || key === "verificaciones"
            ? value.split(/\s*;\s*/).filter(Boolean)
            : value;
        }
      });
    });
    return { fields: fields, calculationInput: calculationInput };
  }

  function parseOpportunityDossierImport(raw) {
    let payload;
    if (typeof raw === "string") {
      if (raw.length > 1000000) return { ok: false, error: "El archivo supera el límite de 1 MB." };
      try {
        payload = JSON.parse(raw);
      } catch (error) {
        return { ok: false, error: "El archivo no contiene JSON válido." };
      }
    } else {
      payload = raw;
    }
    try {
      if (!isRecord(payload) || payload.schema !== "moreno.opportunity-dossier") {
        throw new Error("El archivo no corresponde a un expediente MORENO.");
      }
      if (payload.schemaVersion !== 1 && payload.schemaVersion !== 2 && payload.schemaVersion !== 3) {
        throw new Error("La versión del expediente no es compatible. Se admiten las versiones 1, 2 y 3.");
      }
      if (payload.status !== "preliminary-unverified") {
        throw new Error("El expediente no tiene el estado preliminar esperado.");
      }
      const dossier = payload.dossier;
      if (!isRecord(dossier) || dossier.title !== "Ficha preliminar de oportunidad" ||
          dossier.status !== "BORRADOR · DATOS APORTADOS, NO VERIFICADOS" ||
          !Array.isArray(dossier.sections) || dossier.sections.length > 12) {
        throw new Error("La ficha incluida en el expediente está incompleta o no es compatible.");
      }
      dossier.sections.forEach(function (section) {
        if (!isRecord(section) || typeof section.title !== "string" ||
            !Array.isArray(section.rows) || section.rows.length > 20) {
          throw new Error("Una sección del expediente tiene una estructura inválida.");
        }
        section.rows.forEach(function (row) {
          if (!isRecord(row) || typeof row.label !== "string" ||
              typeof row.value !== "string" || row.label.length > 200 || row.value.length > 3000) {
            throw new Error("Una fila del expediente tiene una estructura inválida.");
          }
        });
      });
      if (typeof payload.exportedAt !== "string" ||
          !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(payload.exportedAt) ||
          !Number.isFinite(Date.parse(payload.exportedAt)) ||
          new Date(payload.exportedAt).toISOString() !== payload.exportedAt) {
        throw new Error("La fecha de exportación debe ser una fecha ISO 8601 UTC válida.");
      }
      const warnings = [];
      let sourceData;
      if (payload.schemaVersion === 2 || payload.schemaVersion === 3) {
        if (!isRecord(payload.sourceData)) throw new Error("El expediente versión " + payload.schemaVersion + " no incluye los datos estructurados necesarios para recuperarlo.");
        sourceData = payload.sourceData;
      } else {
        sourceData = extractLegacyDossierData(dossier);
        warnings.push("Archivo versión 1: los campos se recuperaron de la ficha legible. Revisá especialmente las listas y los datos que no aparecen en la impresión.");
      }
      const fields = sanitizeImportedFields(sourceData.fields, warnings);
      const calculationInput = sanitizeImportedCalculation(sourceData.calculationInput);
      let internalData = emptyInternalDossier();
      if (payload.schemaVersion === 3) {
        if (!isRecord(payload.internalData)) throw new Error("El expediente versión 3 no incluye la mesa interna de originación.");
        const internalValidation = validateInternalDossier(payload.internalData);
        if (!internalValidation.ok) throw new Error("Datos internos inválidos: " + internalValidation.errors.join(" "));
        internalData = internalValidation.value;
        warnings.push.apply(warnings, internalValidation.warnings);
      }
      return { ok: true, version: payload.schemaVersion, exportedAt: payload.exportedAt, fields: fields, calculationInput: calculationInput, internalData: internalData, warnings: warnings };
    } catch (error) {
      return { ok: false, error: error && error.message ? error.message : "No se pudo validar el expediente." };
    }
  }

  function mergeImportedOpportunityData(current, imported) {
    const local = current || {};
    const incoming = imported || {};
    const currentFields = local.fields || {};
    const incomingFields = incoming.fields || {};
    const currentCalculation = local.calculationInput || {};
    const incomingCalculation = incoming.calculationInput || {};
    const currentInternal = isRecord(local.internalData) ? local.internalData : emptyInternalDossier();
    const incomingInternal = incoming.version && incoming.version < 3
      ? {}
      : (isRecord(incoming.internalData) ? incoming.internalData : {});
    const fields = {};
    const calculationInput = {};
    const internalData = emptyInternalDossier();
    const conflicts = [];

    function mergeValue(key, label, currentValue, incomingValue) {
      const currentIsArray = Array.isArray(currentValue);
      const incomingIsArray = Array.isArray(incomingValue);
      const currentEmpty = currentIsArray ? currentValue.length === 0 : String(currentValue == null ? "" : currentValue).trim() === "";
      const incomingEmpty = incomingIsArray ? incomingValue.length === 0 : String(incomingValue == null ? "" : incomingValue).trim() === "";
      const same = currentIsArray && incomingIsArray
        ? JSON.stringify(currentValue) === JSON.stringify(incomingValue)
        : String(currentValue == null ? "" : currentValue) === String(incomingValue == null ? "" : incomingValue);
      if (currentEmpty) return incomingValue == null ? (currentIsArray ? [] : "") : incomingValue;
      if (incomingEmpty || same) return currentValue;
      conflicts.push({ key: key, label: label, current: currentValue, imported: incomingValue });
      return currentValue;
    }

    Object.keys(dossierFieldLimits).concat(Object.keys(dossierChecklistOptions)).forEach(function (key) {
      fields[key] = mergeValue(key, dossierFieldLabels[key] || key, currentFields[key], incomingFields[key]);
    });
    Object.keys(dossierCalculationLimits).forEach(function (key) {
      calculationInput[key] = mergeValue(key, key, currentCalculation[key], incomingCalculation[key]);
    });
    ["reference", "counterpartyType", "organization", "commercialStage", "nextAction", "followUpDate", "negotiationNotes"].forEach(function (key) {
      internalData[key] = mergeValue("internalData." + key, key, currentInternal[key], incomingInternal[key]);
    });
    internalData.evidence = mergeValue("internalData.evidence", "registro de fuentes", currentInternal.evidence, incomingInternal.evidence);
    Object.keys(internalCheckLabels).forEach(function (key) {
      internalData.checks[key] = {};
      ["status", "source", "consultedAt", "note"].forEach(function (field) {
        internalData.checks[key][field] = mergeValue(
          "internalData.checks." + key + "." + field,
          internalCheckLabels[key] + " · " + field,
          currentInternal.checks && currentInternal.checks[key] && currentInternal.checks[key][field],
          incomingInternal.checks && incomingInternal.checks[key] && incomingInternal.checks[key][field]
        );
      });
    });
    ["currency", "proposed", "agreed", "invoiced", "collected"].forEach(function (key) {
      internalData.fees[key] = mergeValue("internalData.fees." + key, "honorarios " + key, currentInternal.fees && currentInternal.fees[key], incomingInternal.fees && incomingInternal.fees[key]);
    });
    return { fields: fields, calculationInput: calculationInput, internalData: internalData, conflicts: conflicts };
  }

  function copyOpportunitySourceData(fields, calculationInput) {
    const sourceFields = {};
    const sourceCalculation = {};
    const inputFields = isRecord(fields) ? fields : {};
    const inputCalculation = isRecord(calculationInput) ? calculationInput : {};
    Object.keys(dossierFieldLimits).forEach(function (key) {
      if (typeof inputFields[key] === "string") sourceFields[key] = inputFields[key];
    });
    Object.keys(dossierChecklistOptions).forEach(function (key) {
      if (Array.isArray(inputFields[key])) {
        sourceFields[key] = inputFields[key].filter(function (item) { return typeof item === "string"; }).slice(0, 12);
      }
    });
    Object.keys(dossierCalculationLimits).forEach(function (key) {
      if (typeof inputCalculation[key] === "string") sourceCalculation[key] = inputCalculation[key];
    });
    return { fields: sourceFields, calculationInput: sourceCalculation };
  }

  function buildOpportunityDossierExport(input) {
    const data = input || {};
    const internalValidation = validateInternalDossier(data.internalData);
    if (!internalValidation.ok) throw new Error(internalValidation.errors.join(" "));
    const normalized = Object.assign({}, data, { internalData: internalValidation.value });
    return {
      schema: "moreno.opportunity-dossier",
      schemaVersion: 3,
      exportedAt: String(data.exportedAt || ""),
      status: "preliminary-unverified",
      sourceData: copyOpportunitySourceData(data.fields, data.calculationInput),
      internalData: internalValidation.value,
      dossier: buildOpportunityDossier(normalized)
    };
  }

  function buildWhatsAppUrl(message) {
    return "https://wa.me/5491141671674?text=" + encodeURIComponent(String(message == null ? "" : message));
  }

  return {
    parsePositiveDecimal: parsePositiveDecimal,
    calculatePreliminary: calculatePreliminary,
    buildLeadNote: buildLeadNote,
    readMapReference: readMapReference,
    listMapReferenceIds: listMapReferenceIds,
    buildContactMessage: buildContactMessage,
    buildOpportunityDossier: buildOpportunityDossier,
    buildOpportunityDossierExport: buildOpportunityDossierExport,
    validateInternalDossier: validateInternalDossier,
    emptyInternalDossier: emptyInternalDossier,
    parseOpportunityDossierImport: parseOpportunityDossierImport,
    mergeImportedOpportunityData: mergeImportedOpportunityData,
    buildWhatsAppUrl: buildWhatsAppUrl
  };
});
