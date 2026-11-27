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

const publishedProperties = [
  {
    "id": "sumio-lote-338",
    "recordType": "Terreno individual",
    "name": "Lote 01 · Loteo Sumio · 338 m²",
    "locality": "Moreno",
    "address": "Av. Derqui 5890",
    "geocodeQuery": "Av. Derqui 5890",
    "geocodeMatch": "DERQUI 5890",
    "source": "https://pabloaquinoinmobiliaria.com.ar/propiedades/lote-sumio-anticipo-y-cuotas/",
    "agency": "Pablo Aquino Inmobiliaria",
    "contact": "Tel. +54 9 11 7001-7411 / 02320-423003",
    "phone": "+54 9 11 7001-7411",
    "price": "Anticipo USD 12.000 + 60 cuotas de USD 250",
    "currency": "USD",
    "landSurfaceM2": 338,
    "surfaceNote": "12,50 × 27,40 m · lote 01, manzana 4",
    "observations": "La inmobiliaria informa visación municipal y subdivisión por Geodesia en trámite ante Catastro PBA. El importe corresponde al anticipo, no al precio total.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: se consultará Georef para la dirección publicada."
  },
  {
    "id": "sumio-lote-450",
    "recordType": "Terreno individual",
    "name": "Lote 02 · Loteo Sumio · 450 m²",
    "locality": "Moreno",
    "address": "Av. Derqui 5890",
    "geocodeQuery": "Av. Derqui 5890",
    "geocodeMatch": "DERQUI 5890",
    "source": "https://pabloaquinoinmobiliaria.com.ar/propiedades/venta-lote-450m2-sumio/",
    "agency": "Pablo Aquino Inmobiliaria",
    "contact": "Tel. +54 9 11 7001-7411 / 02320-423003",
    "phone": "+54 9 11 7001-7411",
    "price": "Anticipo USD 14.000 + 60 cuotas de USD 250",
    "currency": "USD",
    "landSurfaceM2": 450,
    "surfaceNote": "12 × 37,50 m · lote 02, manzana 4",
    "observations": "La inmobiliaria informa visación municipal y subdivisión por Geodesia en trámite ante Catastro PBA. El importe corresponde al anticipo, no al precio total.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: se consultará Georef para la dirección publicada."
  },
  {
    "id": "sumio-proyecto",
    "recordType": "Desarrollo inmobiliario",
    "name": "Loteo Sumio · Proyecto N.º 41",
    "locality": "Moreno",
    "address": "Av. Derqui casi esquina Av. San Fernando",
    "geocodeQuery": "Av. Derqui 5890",
    "geocodeMatch": "DERQUI 5890",
    "source": "https://pabloaquinoinmobiliaria.com.ar/loteo-sumio/",
    "agency": "Pablo Aquino Inmobiliaria",
    "contact": "Tel. +54 9 11 7001-7411 / 02320-423003",
    "phone": "+54 9 11 7001-7411",
    "price": "Anticipos publicados USD 12.000–14.000 + 60 cuotas de USD 250",
    "currency": "USD",
    "surfaceNote": "26 parcelas; lotes publicados de 300 a 600 m²",
    "publicationDate": "2026-03-19",
    "observations": "La inmobiliaria anuncia avances de obra. Publicación del 19/03/2026; ejecución física no verificada independientemente.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: se consultará Georef para la dirección publicada."
  },
  {
    "id": "parque-francisco-lote-300",
    "recordType": "Terreno individual",
    "name": "Parque Francisco · lote de 300 m² · anticipo",
    "locality": "Francisco Álvarez",
    "address": "Lapacho y Schubert",
    "geocodeQuery": "Lapacho y Schubert",
    "geocodeMatch": "LAPACHO SCHUBERT",
    "source": "https://www.puglieseinmobiliaria.com.ar/p/7727829-Terreno-en-Venta-en-Francisco-Alvarez-Lapacho-y-Schubert",
    "agency": "Pugliese Inmobiliaria",
    "contact": "Nicolás Di Puglia Pugliese, CMCPDJMGR 225 · tel. (011) 15 5015-3003",
    "phone": "+54 11 50153003",
    "price": "Anticipo USD 3.000 + hasta 60 cuotas desde USD 360; contado desde USD 14.000",
    "currency": "USD",
    "landSurfaceM2": 300,
    "surfaceNote": "12 × 25 m · terreno descubierto",
    "observations": "El valor de publicación corresponde al anticipo. La ficha individual informa 93 parcelas; la ficha del emprendimiento, 95. Subdivisión en trámite según la inmobiliaria.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: se consultará Georef para la dirección publicada."
  },
  {
    "id": "parque-francisco-proyecto",
    "recordType": "Desarrollo inmobiliario",
    "name": "Parque Francisco · barrio abierto",
    "locality": "Francisco Álvarez",
    "address": "Calle Lapacho, intersección Schubert",
    "geocodeQuery": "Lapacho y Schubert",
    "geocodeMatch": "LAPACHO SCHUBERT",
    "source": "https://www.puglieseinmobiliaria.com.ar/d/69884-Parque-Francisco-en-Francisco-Alvarez",
    "agency": "Pugliese Inmobiliaria",
    "contact": "Nicolás Di Puglia Pugliese, CMCPDJMGR 225 · tel. (011) 15 5015-3003",
    "phone": "+54 11 50153003",
    "price": "Contado desde USD 14.000; anticipos desde USD 3.000 y hasta 60 cuotas fijas",
    "currency": "USD",
    "surfaceNote": "La ficha de emprendimiento informa 95 terrenos desde 300 m²; la ficha individual menciona 93.",
    "observations": "La ficha anuncia obra iniciada en noviembre de 2025 y entrega en enero de 2027. Discrepancia de cantidad: 95 terrenos en emprendimiento y 93 parcelas en aviso individual; verificar avance, permisos y masterplan.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: se consultará Georef para la dirección publicada."
  },
  {
    "id": "parques-morenito-lote-594",
    "recordType": "Terreno individual",
    "name": "Parques del Morenito · lote publicado de 594 m²",
    "locality": "Moreno · Tierras del Morenito",
    "address": "Enrique Larreta al 8300",
    "geocodeQuery": "Enrique Larreta 8300",
    "geocodeMatch": "ENRIQUE LARRETA 8300",
    "source": "https://www.zonaprop.com.ar/propiedades/clasificado/vecltrin-lote-terreno-en-venta-594-m-sup2--moreno-norte-52034721.html",
    "agency": "Aviso en Zonaprop; desarrollo comercializado por Ramirez Mandatos y Negocios Inmobiliarios",
    "contact": "Formulario Zonaprop; matrículas COMARCOMGR 71/183 y CUCICBA 8496; teléfono no visible.",
    "price": "USD 20.000",
    "currency": "USD",
    "landSurfaceM2": 594,
    "surfaceNote": "Lote publicado de 594 m²",
    "observations": "El aviso afirma escritura inmediata y ofrece anticipo más cuotas, pero no publica el plan exacto para este lote. Confirmar título, plano, precio y stock.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: se consultará Georef para la dirección publicada."
  },
  {
    "id": "parques-morenito-proyecto",
    "recordType": "Desarrollo inmobiliario · antecedente",
    "name": "Parques del Morenito · barrio abierto",
    "locality": "Moreno · Tierras del Morenito",
    "address": "Enrique Larreta 8300",
    "geocodeQuery": "Enrique Larreta 8300",
    "geocodeMatch": "ENRIQUE LARRETA 8300",
    "source": "https://ramirezmandatos.tuinmobiliaria.com.ar/d/40279-Parques-del-Morenito-en-Moreno",
    "agency": "Ramirez Mandatos y Negocios Inmobiliarios",
    "contact": "Formulario público del desarrollador; teléfono no visible.",
    "surfaceNote": "3 hectáreas; 56 lotes publicados de 300 a 1.200 m²",
    "observations": "La ficha publica entrega en julio de 2022; se registra como antecedente de desarrollo finalizado, no como obra vigente. No inferir stock actual.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: se consultará Georef para la dirección publicada."
  },
  {
    "id": "trujui-lote-isabel-catolica-400",
    "recordType": "Terreno individual",
    "name": "Lote en Trujui · Isabel la Católica al 3300",
    "locality": "Trujui",
    "address": "Isabel la Católica al 3300",
    "geocodeQuery": "Isabel la Catolica 3300",
    "geocodeMatch": "ISABEL CATOLICA 3300",
    "source": "https://www.zonaprop.com.ar/propiedades/clasificado/vecltrin-venta-lote-trujui-moreno-51698308.html",
    "agency": "Aviso en Zonaprop; oficina asociada Keller Williams",
    "contact": "Julian Aguilar Amat, CMCPSI 6737 / CUCICBA 7839; formulario Zonaprop; teléfono no expuesto.",
    "price": "USD 28.000 en encabezado; descripción: USD 18.000 + cuotas",
    "currency": "USD",
    "landSurfaceM2": 400,
    "surfaceNote": "400 m² totales",
    "observations": "Discrepancia material de precio dentro del aviso: USD 28.000 en encabezado y USD 18.000 más cuotas en descripción. Confirmar antes de evaluar.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: se consultará Georef para la dirección publicada."
  },
  {
    "id": "la-reja-lote-general-hornos-471",
    "recordType": "Terreno individual",
    "name": "Lote en barrio Azteca · La Reja · 471 m²",
    "locality": "La Reja",
    "address": "General Hornos 1850, entre Los Olmos y Azteca 1800",
    "geocodeQuery": "General Hornos 1850",
    "geocodeMatch": "HORNOS 1850",
    "source": "https://www.zonaprop.com.ar/propiedades/clasificado/vecltrin-terreno-lote-en-venta-en-la-reja-grande-la-reja-59211698.html",
    "agency": "Campal Propiedades",
    "contact": "Fabián Diego Campal, matrícula 221; teléfono no expuesto.",
    "price": "USD 35.000",
    "currency": "USD",
    "landSurfaceM2": 471,
    "surfaceNote": "Descripción: aprox. 470 m²; medidas 15 × 31 m",
    "observations": "Barrio Azteca semi-cerrado según aviso. El aviso publica 471 m² y describe aproximadamente 470 m²; medidas sujetas a título y mensura.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: se consultará Georef para la dirección publicada."
  },
  {
    "id": "cuartel-v-fraccion-san-fernando-galicia",
    "recordType": "Fracción de terreno",
    "name": "Fracción comercial/productiva · 4.431 m²",
    "locality": "Cuartel V",
    "address": "Av. San Fernando y Galicia",
    "geocodeQuery": "Av. San Fernando y Galicia",
    "geocodeMatch": "SAN FERNANDO GALICIA",
    "source": "https://www.zonaprop.com.ar/propiedades/clasificado/vecltrin-terreno-en-venta-cuartel-v-moreno-47191040.html",
    "agency": "Aviso en Zonaprop",
    "contact": "Martín Dambolena, CMCPDJMGR 205 / CUCICBA 7176; teléfono no expuesto.",
    "price": "USD 85.000",
    "currency": "USD",
    "landSurfaceM2": 4431,
    "surfaceNote": "Frente 60,70 m sobre Galicia y 73 m sobre Av. San Fernando; salida a dos calles",
    "observations": "El aviso publica referencias a Alineamiento Comercial C y Producción Extensiva con indicadores distintos. Exigir certificado urbanístico parcelario y mensura.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: se consultará Georef para la dirección publicada."
  },
  {
    "id": "moreno-casa-martin-fierro-5000",
    "recordType": "Casa individual",
    "name": "Casa en venta · Martín Fierro al 5000",
    "locality": "Moreno",
    "address": "Martín Fierro al 5000",
    "geocodeQuery": "Martin Fierro 5000",
    "geocodeMatch": "MARTIN FIERRO 5000",
    "source": "https://www.zonaprop.com.ar/propiedades/clasificado/veclcain-casa-en-venta-en-moreno-59397081.html",
    "agency": "Pugliese Inmobiliaria",
    "contact": "Nicolás Di Puglia Pugliese, CMCPDJMGR 225 · tel. (011) 15 5015-3003",
    "phone": "+54 11 50153003",
    "price": "USD 76.000",
    "currency": "USD",
    "landSurfaceM2": 291,
    "coveredSurfaceM2": 90,
    "surfaceNote": "5 ambientes · 2 dormitorios · 1 baño · 2 cocheras",
    "observations": "La descripción informa escritura inmediata, acepta vehículo en parte de pago y escucha ofertas de contado. Verificar medidas en título y plano.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: se consultará Georef para la dirección publicada."
  },
  {
    "id": "moreno-casa-martin-fierro-4900",
    "recordType": "Casa individual",
    "name": "Casa apta crédito · Martín Fierro al 4900",
    "locality": "Moreno",
    "address": "Martín Fierro al 4900",
    "geocodeQuery": "Martin Fierro 4900",
    "geocodeMatch": "MARTIN FIERRO 4900",
    "source": "https://www.zonaprop.com.ar/propiedades/clasificado/veclcain-casa-en-moreno-apto-credito-59287060.html",
    "agency": "Pugliese Inmobiliaria",
    "contact": "Nicolás Di Puglia Pugliese, CMCPDJMGR 225 · tel. (011) 15 5015-3003",
    "phone": "+54 11 50153003",
    "price": "USD 80.000",
    "currency": "USD",
    "landSurfaceM2": 291,
    "coveredSurfaceM2": 85,
    "surfaceNote": "4 ambientes · 2 dormitorios · 1 baño · 2 cocheras",
    "observations": "El aviso declara aptitud crediticia, planos y escritura; verificar la documentación con banco, escribano y corredor.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: se consultará Georef para la dirección publicada."
  },
  {
    "id": "la-reja-casa-belisario-roldan-1800",
    "recordType": "Casa individual · a refaccionar",
    "name": "Casa para refacción · Belisario Roldán al 1800",
    "locality": "Moreno · descripción indica La Reja; portal clasifica Moreno",
    "address": "Belisario Roldán al 1800",
    "geocodeQuery": "Belisario Roldan 1800",
    "geocodeMatch": "BELISARIO ROLDAN 1800",
    "source": "https://www.zonaprop.com.ar/propiedades/clasificado/veclcain-oportunidad-de-invertir-casa-en-venta-refaccion-53543201.html",
    "agency": "Pugliese Inmobiliaria",
    "contact": "Nicolás Di Puglia Pugliese, CMCPDJMGR 225 · tel. (011) 15 5015-3003",
    "phone": "+54 11 50153003",
    "price": "USD 50.000",
    "currency": "USD",
    "landSurfaceM2": 300,
    "coveredSurfaceM2": 54,
    "surfaceNote": "Lote 10 × 30 m · 3 ambientes · 2 dormitorios",
    "observations": "El encabezado ubica el inmueble en Moreno y la descripción lo presenta como La Reja. Se conserva la discrepancia y no se asigna localidad definitiva.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: se consultará Georef para la dirección publicada."
  },
  {
    "id": "paso-del-rey-casa-lebensohn-300",
    "recordType": "Casa individual",
    "name": "Casa de 6 ambientes · Lebensohn 300",
    "locality": "Paso del Rey",
    "address": "Lebensohn 300",
    "geocodeQuery": "Lebensohn 300",
    "geocodeMatch": "LEBENSOHN 300",
    "source": "https://www.zonaprop.com.ar/propiedades/clasificado/veclcain-impecable-casa-en-venta.-centro-de-paso-del-rey-lado-58214296.html",
    "agency": "Mateo Propiedades",
    "contact": "Matrícula 36; teléfono no expuesto.",
    "price": "USD 180.000",
    "currency": "USD",
    "landSurfaceM2": 450,
    "coveredSurfaceM2": 1,
    "surfaceNote": "El portal muestra 1 m² cubierto; descripción relata casa de dos plantas y quincho 10 × 7 m",
    "observations": "La ficha informa lote aproximado 10 × 45 m y vivienda en dos plantas. El dato de 1 m² cubierto es inconsistente con la descripción; solicitar plano y superficie real.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: se consultará Georef para la dirección publicada."
  }
];

publishedProperties.push(
  {
    id:"moreno-lote-tres-de-febrero-7800",recordType:"Terreno individual",name:"Lote baldío · Tres de Febrero 7800 · 316 m²",
    locality:"Moreno",address:"Tres de Febrero 7800, entre Montevideo y Río de la Plata",
    geocodeQuery:"Tres de Febrero 7800",geocodeMatch:"TRES DE FEBRERO 7800",
    source:"https://pabloaquinoinmobiliaria.com.ar/propiedades/venta-lotemoreno/",
    agency:"Pablo Aquino Inmobiliaria",contact:"Tel. +54 9 11 7001-7411 / 02320-423003",phone:"+54 9 11 7001-7411",
    price:"USD 16.000 contado; financiación: anticipo USD 10.000 + 30 cuotas de USD 260",currency:"USD",
    landSurfaceM2:316,coveredSurfaceM2:null,surfaceNote:"13,40 × 22,40 m. La ficha tiene un campo técnico que muestra 'superficie cubierta 316 m²', pero la descripción lo identifica como lote baldío y superficie total.",
    observations:"La inmobiliaria informa escritura lista para transferir. No tiene servicios instalados; el aviso indica posibilidad de solicitar energía prepaga. Precio contado y plan de cuotas publicados en la descripción."
  },
  {
    id:"moreno-lote-industrial-gutenberg-5662",recordType:"Terreno industrial",name:"Lote industrial · Gutenberg 5662 · 3.192 m²",
    locality:"Moreno",address:"Gutenberg 5662, a tres cuadras de Ruta 24",
    geocodeQuery:"Gutenberg 5662",geocodeMatch:"GUTENBERG 5662",
    source:"https://pabloaquinoinmobiliaria.com.ar/propiedades/venta-loteindustrial-moreno/",
    agency:"Pablo Aquino Inmobiliaria",contact:"Tel. +54 9 11 7001-7411 / 02320-423003",phone:"+54 9 11 7001-7411",
    price:"USD 65.000 contado",currency:"USD",landSurfaceM2:3192,coveredSurfaceM2:null,
    surfaceNote:"40 m de frente × 79,81 m de fondo; pequeño ambiente de guardado existente",
    observations:"El aviso publica Zona Industrial 2, FOS 0,5 y FOT 0,8, y afirma escritura. Verificar certificado urbanístico parcelario, afectaciones, uso admitido y estado del ambiente de guardado."
  },
  {
    id:"cuartel-v-lote-lamadrid-2737",recordType:"Terreno individual",name:"Lote 16 · Gral. Aráoz de Lamadrid 6702 · 2.737 m²",
    locality:"Cuartel V",address:"Gral. Aráoz de Lamadrid 6702, entre Av. San Fernando y Curapaligüe",
    geocodeQuery:"General Araoz de Lamadrid 6702",geocodeMatch:"ARAOZ DE LAMADRID 6702",
    source:"https://pabloaquinoinmobiliaria.com.ar/propiedades/lote-de-3750-x-73-m-moreno-financiacion/",
    agency:"Pablo Aquino Inmobiliaria",contact:"Tel. +54 9 11 7001-7411 / 02320-423003",phone:"+54 9 11 7001-7411",
    price:"USD 28.000 contado; financiación: anticipo USD 15.000 + 25 cuotas de USD 600",currency:"USD",
    landSurfaceM2:2737,coveredSurfaceM2:null,surfaceNote:"37,50 × 73 m · lote 16",
    observations:"La inmobiliaria informa escritura e impuestos al día y entrega inmediata. La página de listado muestra anticipo USD 15.000; la descripción especifica USD 28.000 contado o 15.000 + 25 cuotas de 600."
  }
);
publishedProperties.push({
  id:"la-reja-casa-quinta-santa-teresa-2401",recordType:"Casa quinta / fracción con vivienda",
  name:"Casa quinta con parque, pileta y tenis · Santa Teresa de Jesús 2401",
  locality:"La Reja",address:"Santa Teresa de Jesús 2401, La Reja",
  geocodeQuery:"Santa Teresa de Jesus 2401",geocodeMatch:"SANTA TERESA DE JESUS 2401",
  source:"https://www.zonaprop.com.ar/propiedades/clasificado/vecltrin-lote-terreno-en-venta-la-reja-moreno-9962-m-sup2-60468286.html",
  agency:"Aviso en Zonaprop · corredor responsable Fernando Ariel García, CPI 9898 / CMCPDJLM 1137",
  contact:"Romina Aran · formulario de contacto de Zonaprop; teléfono no visible",
  price:"USD 425.000",currency:"USD",landSurfaceM2:9966,coveredSurfaceM2:300,
  surfaceNote:"El título del aviso indica 9.962 m²; la descripción informa aproximadamente 9.966 m². Vivienda de 7 ambientes, quincho, pileta y cancha de tenis.",
  observations:"La publicación describe seis lotes integrados y una casa quinta. Verificar si se vende como una sola unidad o por parcelas, títulos, plano de subdivisión, superficies exactas, estado de la vivienda y permisos de uso."
});
publishedProperties.slice(-1).forEach(item => {
  item.lat = null;
  item.lng = null;
  item.lastCheckedAt = "2026-11-27";
  item.verificationStatus = "Aviso Zonaprop accesible el 27/11/2026; disponibilidad comercial no confirmada.";
  item.availabilityStatus = "No confirmada";
  item.geolocationStatus = "Pendiente: se consultará Georef para la dirección publicada.";
});
publishedProperties.slice(-3).forEach(item => {
  item.lat = null;
  item.lng = null;
  item.lastCheckedAt = "2026-11-27";
  item.verificationStatus = "Aviso directo de la inmobiliaria accesible el 27/11/2026; disponibilidad comercial no confirmada.";
  item.availabilityStatus = "No confirmada";
  item.geolocationStatus = "Pendiente: se consultará Georef para la dirección publicada.";
});


const nov27NewPublishedEntries = [
  {
    "id": "terreno-san-juan-bautista-1374",
    "recordType": "Terreno individual",
    "name": "Terreno en Altos del Monte · San Juan Bautista s/n · 1.374 m²",
    "locality": "Moreno · Altos del Monte",
    "address": "San Juan Bautista s/n, entre Abraham Lincoln y Rafael Arcos",
    "geocodeQuery": "San Juan Bautista S/N",
    "geocodeMatch": "SAN JUAN BAUTISTA S/N",
    "source": "https://www.zonaprop.com.ar/propiedades/clasificado/vecltrin-venta-terreno-en-moreno-provincia-de-buenos-aires-60780068.html",
    "agency": "RE/MAX · aviso en Zonaprop; corredor responsable Micaela Ferreira CPI 9705",
    "contact": "Gustavo Hernandez (contacto indicado en el aviso); formulario Zonaprop; teléfono y email no visibles.",
    "price": "USD 62.300",
    "currency": "USD",
    "landSurfaceM2": 1374,
    "surfaceNote": "25 × 54,95 m; acceso por calle de tierra mejorada.",
    "observations": "Aviso accesible el 27/11/2026. Ubicado entre Abraham Lincoln y Rafael Arcos, sin altura de puerta publicada. El aviso declara electricidad, agua corriente, gas y cloacas en la zona; verificar disponibilidad efectiva de cada servicio, título, mensura y precio.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "verificationStatus": "Publicación original accesible el 27/11/2026; dirección sin altura y disponibilidad comercial no confirmada.",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: ubicación textual sin altura; no se asigna coordenada parcelaria."
  },
  {
    "id": "terreno-ricardo-rojas-4418-3830",
    "recordType": "Terreno individual",
    "name": "Lote en Moreno · Ricardo Rojas 4418 · 3.830 m²",
    "locality": "Moreno",
    "address": "Ricardo Rojas 4418",
    "geocodeQuery": "Ricardo Rojas 4418",
    "geocodeMatch": "RICARDO ROJAS 4418",
    "source": "https://www.argenprop.com/terreno-en-venta-en-moreno--20538336",
    "agency": "Guillermo Koenig Bienes Raíces · aviso en Argenprop",
    "contact": "Formulario Argenprop; el teléfono aparece parcialmente oculto por el portal.",
    "price": "USD 69.000",
    "currency": "USD",
    "landSurfaceM2": 3830,
    "surfaceNote": "3.830 m² totales y construibles según el aviso; incluye construcciones de cancha de tenis y pádel a reciclar o demoler.",
    "observations": "Aviso accesible el 27/11/2026. La descripción menciona una antena Movistar con contrato hasta octubre de 2026; ese plazo ya transcurrió. Verificar si el contrato fue renovado, si la antena continúa y si existe renta vigente. No tomar el ingreso histórico anunciado como renta actual.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "verificationStatus": "Publicación original accesible el 27/11/2026; condición contractual de la antena requiere actualización.",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: Georef deberá devolver una coincidencia inequívoca para la dirección publicada."
  },
  {
    "id": "terreno-general-alvarado-322-922",
    "recordType": "Fracción de terreno",
    "name": "Lote industrial · General Alvarado 322 · 922 m²",
    "locality": "Moreno Centro",
    "address": "General Alvarado 322",
    "geocodeQuery": "General Alvarado 322",
    "geocodeMatch": "GENERAL ALVARADO 322",
    "source": "https://www.argenprop.com/terreno-en-venta-en-centro-moreno--16095811",
    "agency": "Dambolena · aviso en Argenprop",
    "contact": "Corredor Martín Dambolena CMCPDJMGR 205 / CUCICBA 7176; formulario Argenprop; teléfono parcialmente oculto.",
    "price": "USD 37.500",
    "currency": "USD",
    "landSurfaceM2": 922,
    "surfaceNote": "Lote 4; el aviso declara zonificación Industrial 1, FOS 0,6 y FOT 1,0; a 150 m de Ruta 25.",
    "observations": "Publicación original accesible el 27/11/2026. El título del portal redondea la dirección a General Alvarado 300, mientras la descripción indica 322. Zonificación e indicadores son datos declarados en el aviso, no certificado urbanístico vigente. Verificar altura, nomenclatura, mensura, usos permitidos, retiros y factibilidad ante el Municipio.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "verificationStatus": "Publicación original accesible el 27/11/2026; parámetros urbanísticos sujetos a verificación oficial parcelaria.",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: Georef deberá devolver una coincidencia inequívoca para la dirección publicada."
  },
  {
    "id": "casa-bernardino-rivadavia-1000",
    "recordType": "Casa individual",
    "name": "Casa en Centro de Moreno · Bernardino Rivadavia 1000",
    "locality": "Moreno Centro",
    "address": "Bernardino Rivadavia 1000",
    "geocodeQuery": "Bernardino Rivadavia 1000",
    "geocodeMatch": "BERNARDINO RIVADAVIA 1000",
    "source": "https://www.zonaprop.com.ar/propiedades/clasificado/veclcain-excelente-ubicacion-y-solida-construccion-59530765.html?n_pg=1&n_pills=Parrilla&n_pos=1&n_src=Listado",
    "agency": "Mateo Propiedades · aviso en Zonaprop",
    "contact": "Formulario Zonaprop; matrícula informada: 36 Dpto. M-Gr.; teléfono no visible.",
    "price": "USD 150.000 en ficha individual; el listado general mostró USD 170.000.",
    "currency": "USD",
    "landSurfaceM2": 597,
    "coveredSurfaceM2": 80,
    "surfaceNote": "3 ambientes, 2 dormitorios y 2 baños; 597 m² totales y 80 m² cubiertos.",
    "observations": "Ficha individual accesible el 27/11/2026. Existe una diferencia de USD 20.000 entre el precio de la ficha individual (USD 150.000) y el resumen del listado general (USD 170.000). Confirmar precio vigente y superficies con Mateo Propiedades.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "verificationStatus": "Ficha individual accesible el 27/11/2026; discrepancia de precio entre ficha y listado pendiente de aclaración.",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: Georef deberá devolver una coincidencia inequívoca para la dirección publicada."
  },
  {
    "id": "casa-naciones-unidas-1500",
    "recordType": "Casa individual con local y departamento a terminar",
    "name": "Casa 3 ambientes con local y departamento a terminar · Naciones Unidas 1500",
    "locality": "Moreno",
    "address": "Naciones Unidas 1500",
    "geocodeQuery": "Naciones Unidas 1500",
    "geocodeMatch": "NACIONES UNIDAS 1500",
    "source": "https://www.zonaprop.com.ar/propiedades/clasificado/veclcain-casa-3-amb.-local-en-esquina-depto-a-terminar-moreno-60097155.html?n_pg=1&n_pills=Luminoso&n_pos=2&n_src=Listado",
    "agency": "Golden Haus Real Estate S.R.L. · aviso en Zonaprop",
    "contact": "Corredor Esteban Paz CUCICBA 9214 / MGR 334 y Martín Naidich MGR 337; formulario Zonaprop.",
    "price": "USD 61.000",
    "currency": "USD",
    "landSurfaceM2": 194,
    "coveredSurfaceM2": 95,
    "surfaceNote": "95 m² cubiertos y 194 m² totales según el aviso; casa de 3 ambientes, local a la calle y estructura de departamento de 3 ambientes en planta alta sin terminar.",
    "observations": "Publicación original accesible el 27/11/2026. El departamento de planta alta tiene estructura ejecutada, pero faltan instalaciones y terminaciones. Verificar planos, superficies, estado constructivo, habilitación del local y documentación.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "verificationStatus": "Publicación original accesible el 27/11/2026; estado de terminación y superficies deben comprobarse en visita y planos.",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: Georef deberá devolver una coincidencia inequívoca para la dirección publicada."
  },
  {
    "id": "casa-country-san-diego-1500",
    "recordType": "Casa individual",
    "name": "Casa 6 ambientes en Club de Campo San Diego",
    "locality": "Club de Campo San Diego · Moreno",
    "address": "Club de Campo San Diego, Moreno (sin calle ni lote publicados)",
    "geocodeQuery": "Club de Campo San Diego, Moreno",
    "geocodeMatch": "DIRECCION NO PUBLICADA",
    "source": "https://www.zonaprop.com.ar/propiedades/clasificado/veclcain-venta-casa-6-ambientes-en-club-country-san-diego-58043920.html?n_pg=1&n_pills=Quincho&n_pos=1&n_src=Listado",
    "agency": "Central Real Estate Argentina · aviso en Zonaprop",
    "contact": "Corredores Gustavo Guastello CUCICBA 869 y Carlos Belsito CSI 5790; formulario Zonaprop.",
    "price": "USD 549.999",
    "currency": "USD",
    "landSurfaceM2": 1500,
    "coveredSurfaceM2": 720,
    "surfaceNote": "6 ambientes, 5 dormitorios, 5 baños y 6 cocheras; 1.500 m² totales y 720 m² cubiertos según el aviso.",
    "observations": "Publicación original accesible el 27/11/2026. La ubicación se publica sólo a nivel de barrio, sin calle ni lote; se conserva la referencia textual y no se asigna un punto parcelario.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "verificationStatus": "Publicación original accesible el 27/11/2026; ubicación interna y disponibilidad comercial no confirmadas.",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: el aviso no publica calle ni lote; no corresponde asignar coordenadas."
  },
  {
    "id": "desarrollo-barrio-del-golf-atuel-2700",
    "recordType": "Desarrollo inmobiliario · barrio cerrado",
    "name": "Barrio Cerrado del Golf · Francisco Álvarez",
    "locality": "Francisco Álvarez",
    "address": "Atuel 2700, Barrio del Golf, Francisco Álvarez",
    "geocodeQuery": "Atuel 2700",
    "geocodeMatch": "ATUEL 2700",
    "source": "https://www.zonaprop.com.ar/propiedades/emprendimiento/ememhoin-barrio-cerrado-del-golf-60047239.html?n_pg=1&n_pos=1&n_src=Listado",
    "agency": "Sarro Pucheta Propiedades · publicación en Zonaprop",
    "contact": "Formulario Zonaprop; teléfono no visible en la ficha consultada.",
    "price": "Terrenos desde USD 47.961",
    "currency": "USD",
    "surfaceNote": "6 unidades publicadas de 730 a 1.635 m²; desarrollo de 12 hectáreas y 106 lotes declarados por el anunciante.",
    "observations": "Ficha accesible el 27/11/2026; muestra “Entrega inmediata”, pero también despliega etiquetas “En pozo”, “En construcción” y “Terminado” juntas, por lo que el estado físico no queda inequívoco. Publica 6 unidades de 730 a 1.635 m² y describe 106 lotes en 12 hectáreas. Verificar avance, stock individual, reglamento, expensas, servicios y escritura.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "verificationStatus": "Ficha de emprendimiento accesible el 27/11/2026; estado físico declarado por el anunciante, sin verificación independiente.",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: Georef deberá devolver una coincidencia inequívoca para la dirección publicada."
  },
  {
    "id": "desarrollo-colonos-ii-2300",
    "recordType": "Desarrollo inmobiliario comercial · locales y oficinas",
    "name": "Complejo Comercial Colonos II",
    "locality": "Francisco Álvarez",
    "address": "Carola Lorenzini 2300, Francisco Álvarez",
    "geocodeQuery": "Carola Lorenzini 2300",
    "geocodeMatch": "CAROLA LORENZINI 2300",
    "source": "https://www.zonaprop.com.ar/propiedades/emprendimiento/ememhoin-complejo-colonos-ii-58757120.html?n_pg=1&n_pos=8&n_src=Listado",
    "agency": "Mauricio Moskovic · publicación en Zonaprop",
    "contact": "Formulario Zonaprop; teléfono y email no visibles en la ficha consultada.",
    "price": "Desde USD 1.700; la ficha no especifica si es por m², unidad o anticipo.",
    "currency": "USD",
    "surfaceNote": "52 a 235 m² totales y cubiertos según ficha; 15 locales y 14 oficinas declarados; entrega anunciada para noviembre de 2028.",
    "observations": "Ficha accesible el 27/11/2026; publica entrega noviembre de 2028, aunque las etiquetas “En pozo”, “En construcción” y “Terminado” aparecen juntas y no permiten determinar por sí solas la etapa física. Muestra 6 unidades; la descripción detalla 15 locales y 14 oficinas como programa del complejo. El precio desde USD 1.700 no identifica unidad de medida ni alcance; solicitar lista comercial, inventario disponible y cronograma de obra.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "verificationStatus": "Ficha de emprendimiento accesible el 27/11/2026; ejecución y condiciones comerciales no verificadas independientemente.",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: Georef deberá devolver una coincidencia inequívoca para la dirección publicada."
  },
  {
    "id": "desarrollo-ibis-iv-273",
    "recordType": "Desarrollo inmobiliario vertical · edificio en construcción",
    "name": "Edificio Ibis IV · Moreno Centro",
    "locality": "Moreno Centro",
    "address": "Dr. Vera 273",
    "geocodeQuery": "Dr. Vera 273",
    "geocodeMatch": "VERA 273",
    "source": "https://www.zonaprop.com.ar/propiedades/emprendimiento/ememvein-edificio-ibis-iv-58757107.html?n_pg=1&n_pos=9&n_src=Listado",
    "agency": "Mauricio Moskovic · publicación en Zonaprop",
    "contact": "Formulario Zonaprop; teléfono y email no visibles en la ficha consultada.",
    "price": "Departamentos desde USD 51.600; anticipo desde USD 19.780 + saldo en 30 cuotas; cocheras desde USD 15.000.",
    "currency": "USD",
    "surfaceNote": "3 unidades publicadas de 43 a 48 m² totales y 40 a 45 m² cubiertos; 2 ambientes; inicio de obra informado en febrero de 2025 y entrega estimada en noviembre de 2027.",
    "observations": "Ficha accesible el 27/11/2026. Informa inicio de obra en febrero de 2025 y entrega estimada en noviembre de 2027. Otra ficha del mismo desarrollo muestra 1 unidad en lugar de las 3 publicadas aquí; confirmar inventario real. Las fechas y el avance son datos del anunciante, no verificación independiente. Revisar planos, permisos, estado de obra y precio final.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "verificationStatus": "Ficha de emprendimiento accesible el 27/11/2026; fechas y avance de obra declarados por el anunciante.",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: Georef deberá devolver una coincidencia inequívoca para la dirección publicada."
  },
  {
    "id": "desarrollo-140-camilli",
    "recordType": "Desarrollo inmobiliario vertical · edificio en pozo / construcción",
    "name": "140 Camilli · Moreno Centro",
    "locality": "Moreno Centro",
    "address": "Camilli 140",
    "geocodeQuery": "Camilli 140",
    "geocodeMatch": "CAMILLI 140",
    "source": "https://www.zonaprop.com.ar/propiedades/emprendimiento/ememvein-140-camilli-59085756.html?n_pg=1&n_pos=11&n_src=Listado",
    "agency": "Rossi Propiedades · Dalmazz Guarino Arquitectura & Construcción · publicación en Zonaprop",
    "contact": "contacto@rossiprop.com.ar · @rossipropiedades_ (datos publicados en la ficha).",
    "price": "Desde USD 49.300 en el encabezado; la descripción usa también importes con '$' y cuotas en pesos, por lo que el alcance y la moneda deben confirmarse.",
    "currency": "USD (encabezado; descripción ambigua)",
    "surfaceNote": "12 unidades; 35 a 92 m² totales y 32 a 81 m² cubiertos; 1 a 3 ambientes; entrega anunciada para diciembre de 2027.",
    "observations": "Ficha accesible el 27/11/2026; publica entrega diciembre de 2027, pero las etiquetas “En pozo”, “En construcción” y “Terminado” aparecen juntas y no identifican inequívocamente el avance físico. La descripción publica planes en pesos y el encabezado indica USD 49.300. No asumir equivalencia: solicitar lista de precios, moneda y esquema de cuotas por escrito.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "verificationStatus": "Ficha de emprendimiento accesible el 27/11/2026; moneda y condiciones comerciales requieren aclaración.",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: Georef deberá devolver una coincidencia inequívoca para la dirección publicada."
  }
];
publishedProperties.push(...nov27NewPublishedEntries);

const nov27HourlyEntries = [
  {
    "id": "terreno-bouchard-300-461",
    "recordType": "Terreno con construcciones",
    "name": "Bouchard 300 · 461 m²",
    "locality": "Moreno Centro",
    "address": "Bouchard 300, Moreno",
    "geocodeQuery": "Bouchard 300, Moreno",
    "geocodeMatch": "BOUCHARD 300",
    "source": "https://www.argenprop.com/terreno-en-venta-en-moreno--20950413",
    "agency": "RE/MAX · oficina independiente (publicación en Argenprop)",
    "contact": "Nicolás Kardahi · corredora responsable Silvana Inés Palini, CPI 8862 / CMCPM 2955; teléfono completo no visible",
    "price": "USD 120.000",
    "currency": "USD",
    "landSurfaceM2": 461,
    "surfaceNote": "Incluye galpón/deposito, piscina, quincho y baño/habitación; superficie cubierta no informada.",
    "observations": "El aviso informa FOS 0,6 y FOT 1,0. Hay contradicción interna sobre cloacas: primero las incluye entre servicios y luego indica cloacas NO. Verificar factibilidad y normativa municipal antes de modelar.",
    "lat": null,
    "lng": null,
    "availabilityStatus": "No confirmada",
    "verificationStatus": "Ficha directa de Argenprop accesible el 27/11/2026; precio y superficie visibles. La publicación no confirma disponibilidad ni documentación parcelaria.",
    "geolocationStatus": "Pendiente: Georef debe devolver una coincidencia inequívoca para la dirección publicada."
  },
  {
    "id": "terreno-sarmiento-500-750",
    "recordType": "Terreno con construcciones",
    "name": "Sarmiento 500 · esquina con Guatemala · 750 m²",
    "locality": "Moreno Centro",
    "address": "Sarmiento 500 y Guatemala, Moreno",
    "geocodeQuery": "Sarmiento 500 y Guatemala, Moreno",
    "geocodeMatch": "SARMIENTO 500",
    "source": "https://www.argenprop.com/23085396--terreno-en-venta-en-centro-moreno--19911511",
    "agency": "C21 Gran Bahía S.A.",
    "contact": "Gabriela Teresa Crespi y Mariano Canedo · matrículas CUCICBA 8503 / CSI 5981; teléfono no visible completo",
    "price": "USD 79.000",
    "currency": "USD",
    "landSurfaceM2": 750,
    "surfaceNote": "Casa principal a reciclar, galería aprox. 36 m², construcción independiente aprox. 40 m², quincho y parrilla; el aviso no informa superficie cubierta total.",
    "observations": "La publicación presenta la oportunidad principalmente como lote con construcciones existentes; servicios y estado deben verificarse en visita y documentación.",
    "lat": null,
    "lng": null,
    "availabilityStatus": "No confirmada",
    "verificationStatus": "Ficha directa de Argenprop accesible el 27/11/2026; precio, superficie y responsables visibles. No se confirma disponibilidad.",
    "geolocationStatus": "Pendiente: Georef debe devolver una coincidencia inequívoca para la dirección publicada."
  },
  {
    "id": "terreno-ecoparque-irlanda-2000",
    "recordType": "Terreno industrial individual",
    "name": "Ecoparque Industrial · Ruta 24 y calle Irlanda · 2.000 m²",
    "locality": "Francisco Álvarez",
    "address": "Ruta Provincial 24 y calle Irlanda, Francisco Álvarez, Moreno",
    "geocodeQuery": "Ruta Provincial 24 y calle Irlanda, Francisco Alvarez, Moreno",
    "geocodeMatch": "RUTA PROVINCIAL 24 IRLANDA",
    "source": "https://www.argenprop.com/terreno-en-venta-en-moreno--20572344",
    "agency": "Francesco Tucci Negocios Inmobiliarios",
    "contact": "Francesco Tucci Negocios Inmobiliarios · teléfono completo no visible; el operador del parque publica WhatsApp +54 9 11 5010-2564",
    "price": "USD 240.000 (USD 120/m² contado; financiación publicada a USD 130/m²)",
    "currency": "USD",
    "landSurfaceM2": 2000,
    "surfaceNote": "40 m de frente × 50 m de fondo; sin superficie cubierta publicada.",
    "observations": "No se publica número de parcela. Otras fichas indexadas de Argenprop anuncian lotes genéricos de 2.000 m² dentro del mismo parque con precios diferentes; algunas URL directas ya no abren y ninguna identifica número de lote. No se agregan como registros separados ni se presume que sean la misma parcela.",
    "lat": null,
    "lng": null,
    "availabilityStatus": "No confirmada",
    "verificationStatus": "Ficha directa de Argenprop accesible el 27/11/2026; ubicación, superficie y precio publicados. Identificación de lote y stock pendientes.",
    "geolocationStatus": "Pendiente: la intersección es una referencia de acceso al parque, no una parcela individual."
  },
  {
    "id": "casa-centenario-600-360",
    "recordType": "Casa individual",
    "name": "Casa · Centenario al 600",
    "locality": "Moreno",
    "address": "Centenario al 600, entre Ameghino y Esteban de Luca, Moreno",
    "geocodeQuery": "Centenario 600, Moreno",
    "geocodeMatch": "CENTENARIO 600",
    "source": "https://www.zonaprop.com.ar/propiedades/clasificado/veclcain-casa-moreno-vendo-60301810.html",
    "agency": "Anunciante no identificado en la ficha individual de Zonaprop",
    "contact": "Formulario de contacto de Zonaprop; no se publica teléfono ni nombre de inmobiliaria en la ficha abierta",
    "price": "USD 149.800",
    "currency": "USD",
    "landSurfaceM2": 360,
    "coveredSurfaceM2": 110,
    "surfaceNote": "7 ambientes; el aviso describe cochera, patio, pérgola y galpón al fondo.",
    "observations": "La ficha individual mantiene USD 149.800; la publicación no muestra fecha de alta o actualización. Confirmar identidad del anunciante, título y medidas con documentación.",
    "lat": null,
    "lng": null,
    "availabilityStatus": "No confirmada",
    "verificationStatus": "Ficha individual de Zonaprop accesible el 27/11/2026; precio y superficies publicados. No se identifica la inmobiliaria en la página consultada.",
    "geolocationStatus": "Pendiente: Georef debe devolver una coincidencia inequívoca para la dirección publicada."
  },
  {
    "id": "casa-venezuela-2400-456",
    "recordType": "Casa individual",
    "name": "Chalet · Venezuela al 2400 · Moreno Norte",
    "locality": "Moreno Norte",
    "address": "Venezuela al 2400, entre Güemes y Alsina, Moreno",
    "geocodeQuery": "Venezuela 2400, Moreno",
    "geocodeMatch": "VENEZUELA 2400",
    "source": "https://www.zonaprop.com.ar/propiedades/clasificado/veclcain-venta-chalet-5-ambientes-garage-parque-pileta-y-60208007.html",
    "agency": "DI PASCUALE Propiedades",
    "contact": "DI PASCUALE Propiedades · matrícula DJMGR 41 / 230; formulario/WhatsApp de Zonaprop, teléfono no visible en la ficha",
    "price": "USD 80.000",
    "currency": "USD",
    "landSurfaceM2": 456,
    "coveredSurfaceM2": 120,
    "surfaceNote": "18 m² semicubiertos publicados; chalet en dos plantas, pileta y terraza.",
    "observations": "El aviso indica que requiere reciclaje. No tomar las superficies como verificadas por plano; confirmar estado, servicios y alcance de obra.",
    "lat": null,
    "lng": null,
    "availabilityStatus": "No confirmada",
    "verificationStatus": "Ficha individual de Zonaprop accesible el 27/11/2026; precio, superficie y anunciante publicados. Disponibilidad no confirmada.",
    "geolocationStatus": "Pendiente: Georef debe devolver una coincidencia inequívoca para la dirección publicada."
  },
  {
    "id": "casa-francisco-de-aguirre-6400",
    "recordType": "Casa individual",
    "name": "Casa en Francisco de Aguirre 6400",
    "locality": "Francisco Álvarez",
    "address": "Francisco de Aguirre 6400, entre La Pintura y Curapaligüe, Francisco Álvarez",
    "geocodeQuery": "Francisco de Aguirre 6400, Francisco Alvarez, Moreno",
    "geocodeMatch": "FRANCISCO DE AGUIRRE 6400",
    "source": "https://www.argenprop.com/casa-en-venta-en-francisco-alvarez-4-ambientes--19948479",
    "agency": "Rosana Gularte Propiedades",
    "contact": "Rosana Gularte Propiedades · teléfono publicado parcialmente en Argenprop; solicitar número completo por el portal",
    "price": "USD 35.000",
    "currency": "USD",
    "landSurfaceM2": 300,
    "coveredSurfaceM2": 140,
    "surfaceNote": "10 × 30 m; dos plantas, primer piso a terminar.",
    "observations": "El aviso informa agua de pozo, gas envasado y pilar eléctrico instalado pero pendiente de solicitar servicio. Acepta vehículo como parte de pago según publicación.",
    "lat": null,
    "lng": null,
    "availabilityStatus": "No confirmada",
    "verificationStatus": "Ficha directa de Argenprop accesible el 27/11/2026; precio, superficies, ubicación y anunciante visibles. No confirma stock ni estado documental.",
    "geolocationStatus": "Pendiente: Georef debe devolver una coincidencia inequívoca para la dirección publicada."
  },
  {
    "id": "casa-racine-800-no-vigente",
    "recordType": "Casa individual · histórico",
    "name": "Casa en Racine 800 · publicación retirada",
    "locality": "Francisco Álvarez",
    "address": "Racine 800, Francisco Álvarez, Moreno",
    "geocodeQuery": "Racine 800, Francisco Alvarez, Moreno",
    "geocodeMatch": "RACINE 800",
    "source": "https://www.argenprop.com/casa-en-venta-en-francisco-alvarez-4-ambientes--20469282",
    "agency": "RE/MAX Premium II",
    "contact": "Contacto publicado originalmente: Daniel Rearte; el aviso ya no abre",
    "price": "USD 75.000 (último precio visible en el resultado indexado)",
    "currency": "USD",
    "landSurfaceM2": 427,
    "coveredSurfaceM2": 130,
    "surfaceNote": "El aviso describía casa de 4 ambientes, pileta y construcción independiente de aprox. 30 m².",
    "observations": "La URL directa devolvió 410 Gone el 27/11/2026. Existió otra publicación para Racine 800 a USD 76.500, también con URL directa 410 Gone. Se conserva una sola ficha histórica por dirección; no presentar como oportunidad vigente.",
    "lat": null,
    "lng": null,
    "availabilityStatus": "No vigente",
    "verificationStatus": "No vigente: la URL primaria de Argenprop devolvió 410 Gone el 27/11/2026; la segunda publicación encontrada para la misma dirección también devolvió 410 Gone.",
    "geolocationStatus": "Pendiente: registro histórico; no asignar coordenadas parcelarias."
  },
  {
    "id": "desarrollo-prados-del-oeste-hornos-2800",
    "recordType": "Desarrollo inmobiliario / loteo",
    "name": "Prados del Oeste 1 y 2 · Gral. Hornos al 2800",
    "locality": "Moreno",
    "address": "General Hornos al 2800, Moreno, Partido de Moreno",
    "geocodeQuery": "General Hornos 2800, Moreno",
    "geocodeMatch": "GENERAL HORNOS 2800",
    "source": "https://www.zonaprop.com.ar/propiedades/emprendimiento/ememhoin-barrio-cerrado-prados-del-oeste-country-lotes-en-53772476.html",
    "agency": "Sarro Pucheta Propiedades · inmobiliaria anunciada como oficial del barrio",
    "contact": "Formulario de Zonaprop / Sarro Pucheta Propiedades; teléfono no visible en la ficha consultada",
    "price": "Desde USD 39.668 (ejemplo: lote 193 de 899 m², contado promocional; valor de lista USD 41.756)",
    "currency": "USD",
    "surfaceNote": "14 unidades publicadas de 784 a 899 m². Prados del Oeste 2 declara 256 lotes; Prados 1 etapas A y B figuran entregadas y escrituradas.",
    "observations": "La ficha mezcla etiquetas de pozo, construcción y terminado, pero el texto informa posesión inmediata para Prados 2 y próxima escrituración. Verificar etapa, lote, expensas y disponibilidad real.",
    "lat": null,
    "lng": null,
    "availabilityStatus": "No confirmada",
    "verificationStatus": "Ficha de emprendimiento de Zonaprop accesible el 27/11/2026; el anunciante declara posesión inmediata de Prados 2 y etapas 1A/1B entregadas. Estado de obra no verificado independientemente.",
    "geolocationStatus": "Pendiente: la altura publicada identifica el acceso/sector del desarrollo, no un lote individual."
  },
  {
    "id": "terreno-teniente-camilli-240-975",
    "recordType": "Terreno con construcción",
    "name": "Teniente Camilli al 200/240 · 975 m²",
    "locality": "Moreno",
    "address": "Teniente Camilli al 200 (título) / 240 (descripción), Moreno",
    "source": "https://www.argenprop.com/terreno-en-venta-en-moreno--17335118",
    "agency": "Guillermo Díaz Propiedades",
    "contact": "Guillermo Díaz Propiedades · corredor responsable Guillermo Díaz, CMCPDJMGR 277; teléfono no visible completo",
    "price": "USD 240.000",
    "currency": "USD",
    "landSurfaceM2": 975,
    "coveredSurfaceM2": 237,
    "surfaceNote": "17 m de frente × 56 m de fondo; la ficha denomina 237 m² como superficie construida.",
    "observations": "La altura difiere entre título (al 200) y descripción (240); no georreferenciar hasta aclarar. El aviso informa zonificación R1A, FOS 0,6 y FOT 1,4; validar indicadores con Municipio y parcela.",
    "lat": null,
    "lng": null,
    "availabilityStatus": "No confirmada",
    "verificationStatus": "Ficha directa de Argenprop accesible el 27/11/2026; precio, terreno y superficie construida publicados. Dirección exacta contradictoria dentro del aviso.",
    "geolocationStatus": "Pendiente: dirección inconsistente entre título y descripción; no asignar punto hasta aclararla."
  },
  {
    "id": "terreno-yapeyu-rafael-arcos-2850",
    "recordType": "Fracción de terreno",
    "name": "Yapeyú y Rafael Arcos · fracción de 2.850 m²",
    "locality": "Moreno",
    "address": "Intersección aproximada de Yapeyú y Rafael Arcos, Moreno",
    "geocodeQuery": "Yapeyu y Rafael Arcos, Moreno",
    "geocodeMatch": "YAPEYU RAFAEL ARCOS",
    "source": "https://www.argenprop.com/terreno-en-venta-en-moreno--20925842",
    "agency": "Girgola",
    "contact": "Girgola · martillera responsable Agustina Scalese, CPI 8928 / MGR 313; teléfono completo no visible",
    "price": "USD 189.000",
    "currency": "USD",
    "landSurfaceM2": 2850,
    "surfaceNote": "Aprox. 51 m de frente × 56 m de fondo; se ofrece en conjunto o por lotes.",
    "observations": "El aviso informa zonificación R4b, FOS 0,60 y FOT 1,00, sujetos a verificación municipal y a la parcela resultante. Calle de tierra con mejorado; factibilidad de servicios por lote a consultar.",
    "lat": null,
    "lng": null,
    "availabilityStatus": "No confirmada",
    "verificationStatus": "Ficha directa de Argenprop accesible el 27/11/2026; precio, superficie y ubicación aproximada publicados. No se confirma subdivisión ni disponibilidad.",
    "geolocationStatus": "Pendiente: Georef debe resolver inequívocamente la intersección; no representa parcela."
  },
  {
    "id": "terreno-prados-del-oeste-lote-230-800",
    "recordType": "Terreno individual",
    "name": "Prados del Oeste 1-B · Lote 230 · 800 m²",
    "locality": "Moreno",
    "address": "Prados del Oeste 1-B, lote 230, Moreno",
    "source": "https://www.argenprop.com/terreno-en-venta-en-moreno--16808124",
    "agency": "Valencia Viudes Bienes Raíces",
    "contact": "Matías G. Valencia, col. 3034 CMCPM y Matías F. Viudes, col. 3047 CMCPM; teléfono no visible completo",
    "price": "USD 67.000",
    "currency": "USD",
    "landSurfaceM2": 800,
    "surfaceNote": "22 m de frente × 36 m de fondo; el aviso informa escritura y posesión inmediata.",
    "observations": "La ficha identifica lote interno 1-B, orientación norte y servicios. No se publica calle interna ni nomenclatura catastral; no ubicar como parcela exacta.",
    "lat": null,
    "lng": null,
    "availabilityStatus": "No confirmada",
    "verificationStatus": "Ficha directa de Argenprop accesible el 27/11/2026; precio, superficie, lote y comercializadora visibles. Disponibilidad no confirmada.",
    "geolocationStatus": "Pendiente: no se publica dirección interna suficiente para ubicar el lote."
  },
  {
    "id": "terreno-general-savio-100-2050",
    "recordType": "Terreno industrial / fracción",
    "name": "General Savio 100 · 2.050 m² (superficie contradictoria)",
    "locality": "La Reja / Moreno",
    "address": "General Savio 100, Moreno (la descripción ubica en La Reja)",
    "geocodeQuery": "General Savio 100, La Reja, Moreno",
    "geocodeMatch": "GENERAL SAVIO 100",
    "source": "https://www.argenprop.com/terreno-en-venta-en-moreno--19316560",
    "agency": "Konkolyi Propiedades",
    "contact": "Konkolyi Propiedades · teléfono completo no visible en la ficha",
    "price": "USD 124.000",
    "currency": "USD",
    "landSurfaceM2": 2050,
    "surfaceNote": "El encabezado informa 2.050 m²; la descripción comercial dice “2 hectáreas”.",
    "observations": "Contradicción crítica de superficie: 2.050 m² en los datos estructurados frente a 20.000 m² en el texto. No usar USD/m² ni evaluar factibilidad hasta recibir plano, título y nomenclatura. El aviso lo presenta como zona industrial a 250 m de Acceso Oeste.",
    "lat": null,
    "lng": null,
    "availabilityStatus": "No confirmada",
    "verificationStatus": "Ficha directa de Argenprop accesible el 27/11/2026; precio y superficie de encabezado visibles, pero el texto contradice la superficie en diez veces.",
    "geolocationStatus": "Pendiente: la localidad y la altura deben confirmarse por la discrepancia entre título y descripción."
  },
  {
    "id": "desarrollo-ecoparque-78-parcelas",
    "recordType": "Desarrollo industrial",
    "name": "Ecoparque Industrial Moreno · 78 parcelas",
    "locality": "Francisco Álvarez (sector RP24/RP25)",
    "address": "Corredor de Ruta Provincial 24, próximo al cruce con Ruta Provincial 25, Partido de Moreno",
    "geocodeQuery": "Ruta Provincial 24 y Ruta Provincial 25, Moreno",
    "geocodeMatch": "RUTA PROVINCIAL 24",
    "source": "https://ecoparque.com.ar/",
    "agency": "Ecoparque Industrial Moreno · sitio oficial del operador",
    "contact": "WhatsApp oficial +54 9 11 5010-2564 · formulario del sitio",
    "surfaceNote": "El sitio describe 78 parcelas de 2.000 a 10.000 m²; no identifica lotes concretos ni stock actual.",
    "observations": "El sitio publica F.O.S.: “06” (así figura, confirmar si corresponde a 0,6) y F.O.T.: 1,2, además de infraestructura industrial y seguridad 24/7. El texto oficial declara 78 parcelas y el contador visible aparece en cero; un resultado indexado de terceros menciona 79, pero su URL directa devolvió 410. Cantidad de lotes y disponibilidad deben confirmarse con el operador.",
    "lat": null,
    "lng": null,
    "availabilityStatus": "No confirmada",
    "verificationStatus": "Sitio oficial accesible el 27/11/2026; descripción informa 78 parcelas y contacto oficial. El contador dinámico de parcelas aparece en cero y no permite confirmar stock.",
    "geolocationStatus": "Pendiente: corredor vial aproximado; no se publicó dirección de parcela."
  },
  {
    "id": "terreno-parques-morenito-300-300",
    "recordType": "Terreno individual",
    "name": "Parques del Morenito · lote 300 m²",
    "locality": "Moreno Norte",
    "address": "Enrique Larreta al 8300, Moreno Norte",
    "geocodeQuery": "Enrique Larreta 8300, Moreno",
    "geocodeMatch": "ENRIQUE LARRETA 8300",
    "source": "https://www.argenprop.com/terreno-en-venta-en-moreno--11643213",
    "agency": "Ramírez Mandatos y Negocios Inmobiliarios",
    "contact": "Ramírez Mandatos y Negocios Inmobiliarios · profesionales matriculados COMARCOMGR 71 / 183 y CUCICBA 8496; teléfono no visible completo",
    "price": "USD 13.000",
    "currency": "USD",
    "landSurfaceM2": 300,
    "observations": "La ficha ofrece lotes de 300, 594 y 1.200 m² con escritura inmediata y anticipo/cuotas. No publica número de lote ni confirma stock actual; no fusionar con la publicación independiente de 594 m².",
    "lat": null,
    "lng": null,
    "availabilityStatus": "No confirmada",
    "verificationStatus": "Ficha directa de Argenprop accesible en la revisión del 27/11/2026; precio y superficie publicados. Lote exacto y disponibilidad no confirmados.",
    "geolocationStatus": "Pendiente: la dirección identifica el barrio, no el lote individual."
  },
  {
    "id": "terreno-pim-i-parque-municipal-2493",
    "recordType": "Terreno industrial individual",
    "name": "Parque Municipal PIM I · 2.493 m²",
    "locality": "Cuartel V",
    "address": "Parque Municipal PIM I 100, Cuartel V, Moreno",
    "geocodeQuery": "Parque Municipal PIM I, Cuartel V, Moreno",
    "geocodeMatch": "PARQUE MUNICIPAL PIM 1",
    "source": "https://www.argenprop.com/terreno-en-venta-en-cuartel-v--20925111",
    "agency": "Girgola",
    "contact": "Girgola · martillera responsable Agustina Scalese, CPI 8928 / MGR 313; teléfono completo no visible",
    "price": "USD 249.990",
    "currency": "USD",
    "landSurfaceM2": 2493,
    "surfaceNote": "Expensas publicadas: $ 500.000 (moneda no especificada en la ficha); el aviso informa FOS 0,60 / FOT 1,20 y altura máxima 21 m.",
    "observations": "El aviso lo ubica en parque operativo con calles pavimentadas, seguridad 24/7 y servicios. Categorías industriales I, II y III según publicación; verificar reglamento, expensas y admisibilidad municipal.",
    "lat": null,
    "lng": null,
    "availabilityStatus": "No confirmada",
    "verificationStatus": "Ficha directa de Argenprop accesible el 27/11/2026; precio, superficie, expensas e indicadores publicados. Stock no confirmado.",
    "geolocationStatus": "Pendiente: no se publica número de parcela; la referencia corresponde al parque."
  },
  {
    "id": "terreno-pim-ii-rp24-2677",
    "recordType": "Terreno industrial individual",
    "name": "Parque Industrial PIM II · 2.677 m²",
    "locality": "Cuartel V",
    "address": "RP 24 al 7100, Parque Industrial PIM II, Cuartel V, Moreno",
    "geocodeQuery": "Ruta Provincial 24 7100, Cuartel V, Moreno",
    "geocodeMatch": "RUTA PROVINCIAL 24 7100",
    "source": "https://www.argenprop.com/terreno-en-venta-en-cuartel-v--18518251",
    "agency": "Marisol Espinosa Propiedades",
    "contact": "Marisol Espinosa Propiedades · teléfono completo no visible en la ficha",
    "price": "USD 250.000",
    "currency": "USD",
    "landSurfaceM2": 2677,
    "surfaceNote": "51 m × 51 m; el aviso informa FOS 0,60 / FOT 1,20 y altura máxima 21 m.",
    "observations": "La ficha no publica número de parcela. Ofrece financiación y/o inmueble en parte de pago. Confirmar identificación parcelaria y si es distinta de otras ofertas PIM II de la zona.",
    "lat": null,
    "lng": null,
    "availabilityStatus": "No confirmada",
    "verificationStatus": "Ficha directa de Argenprop accesible el 27/11/2026; precio, superficie y parámetros publicados. No confirma disponibilidad.",
    "geolocationStatus": "Pendiente: referencia de parque, no de parcela individual."
  },
  {
    "id": "terreno-pim-ii-rp24-7700-2103",
    "recordType": "Terreno industrial individual",
    "name": "PIM II · parcela 67 · RP 24 al 7700 · 2.103 m²",
    "locality": "Cuartel V",
    "address": "Ruta Provincial 24 al 7700, Moreno, Cuartel V",
    "geocodeQuery": "Ruta Provincial 24 7700, Moreno",
    "geocodeMatch": "RUTA PROVINCIAL 24 7700",
    "source": "https://www.argenprop.com/terreno-en-venta-en-moreno--20706609",
    "agency": "J.P. Stella Inversiones Inmobiliarias",
    "contact": "J.P. Stella Inversiones Inmobiliarias · teléfono completo no visible en la ficha",
    "price": "USD 220.000",
    "currency": "USD",
    "landSurfaceM2": 2103,
    "surfaceNote": "2.103,58 m² informados en la descripción; 50 × 40 m; identificada como parcela 67.",
    "observations": "El aviso informa frente a dos calles internas, gas industrial y zonificación industrial categorías 1, 2 y 3. Superficies aproximadas sujetas a escritura y plano.",
    "lat": null,
    "lng": null,
    "availabilityStatus": "No confirmada",
    "verificationStatus": "Ficha directa de Argenprop accesible el 27/11/2026; parcela, precio y superficie publicados. No confirma disponibilidad.",
    "geolocationStatus": "Pendiente: verificar que la altura RP24 al 7700 corresponda al acceso del PIM II y no a una parcela."
  },
  {
    "id": "casa-san-ramon-2700-251",
    "recordType": "Casa individual / dos unidades",
    "name": "Dos casas independientes · San Ramón al 2700",
    "locality": "La Reja",
    "address": "San Ramón al 2700, esquina Benavente, La Reja, Moreno",
    "geocodeQuery": "San Ramon 2700 y Benavente, La Reja, Moreno",
    "geocodeMatch": "SAN RAMON 2700",
    "source": "https://www.argenprop.com/casa-en-venta-en-la-reja-4-ambientes--19658108",
    "agency": "Blanes Estudio Inmobiliario",
    "contact": "María Elena Blanes, CPMCLZ 4255 y Juan José Blanes, CUCICBA 2793; teléfono no visible completo",
    "price": "USD 42.000",
    "currency": "USD",
    "landSurfaceM2": 251,
    "coveredSurfaceM2": 87,
    "surfaceNote": "La descripción indica 252 m² de terreno; el encabezado y datos estructurados muestran 251 m². Dos unidades independientes.",
    "observations": "El aviso describe dos viviendas/departamentos sobre lote propio; confirmar si los 87 m² cubiertos corresponden a ambas unidades y revisar planos.",
    "lat": null,
    "lng": null,
    "availabilityStatus": "No confirmada",
    "verificationStatus": "Ficha directa de Argenprop accesible el 27/11/2026; precio, superficie y comercializadora visibles. Hay diferencia menor de superficie entre encabezado y descripción.",
    "geolocationStatus": "Pendiente: Georef debe devolver una coincidencia inequívoca para la esquina publicada."
  },
  {
    "id": "casa-perito-moreno-3800-350",
    "recordType": "Casa individual",
    "name": "Casa · Perito Moreno 3800/3870 · La Reja",
    "locality": "La Reja",
    "address": "Perito Moreno 3800 (descripción: 3870), entre Mariano Moreno y Del Valle Inclán, La Reja",
    "source": "https://www.argenprop.com/casa-en-venta-en-la-reja-4-ambientes--20903735",
    "agency": "Broker Inmobiliario Claudia Mateoli",
    "contact": "Broker Inmobiliario Claudia Mateoli · teléfono publicado parcialmente en Argenprop",
    "price": "USD 50.000",
    "currency": "USD",
    "landSurfaceM2": 350,
    "coveredSurfaceM2": 85,
    "surfaceNote": "3 dormitorios, 2 baños y cochera techada para tres autos.",
    "observations": "El título informa altura 3800 y la descripción 3870; conservar geolocalización pendiente hasta aclarar. Gas envasado según aviso.",
    "lat": null,
    "lng": null,
    "availabilityStatus": "No confirmada",
    "verificationStatus": "Ficha directa de Argenprop accesible el 27/11/2026; precio y superficies publicados. Dirección con discrepancia interna.",
    "geolocationStatus": "Pendiente: altura contradictoria entre título y descripción."
  }
];
publishedProperties.push(...nov27HourlyEntries);

publishedProperties.forEach(item => {
  item.lastCheckedAt = "2026-11-27";
  if (item.lat == null) item.lat = null;
  if (item.lng == null) item.lng = null;
  if (!item.verificationStatus) {
    item.verificationStatus = "Fuente original accesible en la revisión del 27/11/2026; disponibilidad comercial no confirmada.";
  }
  if (!item.availabilityStatus) item.availabilityStatus = "No confirmada";
  if (!item.geolocationStatus) {
    item.geolocationStatus = "Pendiente: Georef deberá devolver una coincidencia inequívoca para la dirección publicada.";
  }
});

const nov27ById = id => publishedProperties.find(item => item.id === id);
const nov27MartinFierro4900 = nov27ById("moreno-casa-martin-fierro-4900");
if (nov27MartinFierro4900) {
  nov27MartinFierro4900.source = "https://www.zonaprop.com.ar/propiedades/clasificado/veclcain-casa-en-moreno-apto-credito-59287060.html?n_pg=1&n_pos=5&n_src=Listado";
  nov27MartinFierro4900.verificationStatus = "Ficha individual accesible el 27/11/2026; precio USD 80.000 y superficies 291 m² totales / 85 m² cubiertos.";
  nov27MartinFierro4900.availabilityStatus = "No confirmada";
}
const nov27MartinFierro5000 = nov27ById("moreno-casa-martin-fierro-5000");
if (nov27MartinFierro5000) {
  nov27MartinFierro5000.verificationStatus = "Vigencia pendiente: la URL primaria no abrió en esta revisión; aparecen referencias recientes en agregadores, pero no se confirmó que correspondan exactamente al aviso original.";
  nov27MartinFierro5000.availabilityStatus = "Pendiente de revalidación";
  nov27MartinFierro5000.observations = (nov27MartinFierro5000.observations || "") + " En la revisión del 27/11/2026 no se pudo abrir la URL primaria de Zonaprop; existen referencias recientes de terceros para Martín Fierro al 5000, pero no se confirmó identidad ni continuidad exacta del aviso.";
}
const nov27MorenitoProject = nov27ById("parques-morenito-proyecto");
if (nov27MorenitoProject) {
  nov27MorenitoProject.verificationStatus = "Antecedente de desarrollo finalizado: la ficha original informa entrega en julio de 2022.";
  nov27MorenitoProject.availabilityStatus = "No vigente";
}
const nov27SantaTeresa = nov27ById("la-reja-casa-quinta-santa-teresa-2401");
if (nov27SantaTeresa) {
  nov27SantaTeresa.verificationStatus = "No vigente: el enlace directo de Zonaprop devolvió 410 Gone en la revisión del 27/11/2026; se conserva el registro histórico.";
  nov27SantaTeresa.availabilityStatus = "No vigente";
  nov27SantaTeresa.geolocationStatus = "Pendiente: publicación retirada o no accesible; conservar ubicación textual histórica.";
}

const hourlyById = id => publishedProperties.find(item => item.id === id);
const hourlyAppendObservation = (item, note) => {
  if (!item) return;
  item.observations = [item.observations, note].filter(Boolean).join(" ");
};
const hourlySumio338 = hourlyById("sumio-lote-338");
if (hourlySumio338) {
  hourlySumio338.price = "Anticipo USD 12.000 + 60 cuotas de USD 250";
  hourlySumio338.currency = "USD";
  hourlySumio338.verificationStatus = "Ficha directa de Pablo Aquino Inmobiliaria accesible el 27/11/2026; indica lote 01, manzana 4, 338 m² y preventa con anticipo/cuotas.";
  hourlySumio338.availabilityStatus = "No confirmada";
  hourlyAppendObservation(hourlySumio338, "La inmobiliaria informa visación municipal y subdivisión por Geodesia en trámite ante Catastro PBA; no asumir parcela escriturable hasta verificar la subdivisión.");
}
const hourlySumio450 = hourlyById("sumio-lote-450");
if (hourlySumio450) {
  hourlySumio450.verificationStatus = "No vigente: la ficha de la inmobiliaria presenta el aviso como VENDIDO en la revisión del 27/11/2026; se conserva el historial.";
  hourlySumio450.availabilityStatus = "No vigente";
  hourlyAppendObservation(hourlySumio450, "La ficha original incluye el título VENDIDO para el lote de 450 m².");
}
const hourlySumioProject = hourlyById("sumio-proyecto");
if (hourlySumioProject) {
  hourlySumioProject.publicationDate = "19/03/2026";
  hourlySumioProject.verificationStatus = "Ficha directa de Pablo Aquino Inmobiliaria accesible el 27/11/2026; publicación fechada 19/03/2026 declara que avanzan las obras y describe 26 parcelas.";
  hourlySumioProject.availabilityStatus = "No confirmada";
}
const hourlyMorenitoProject = hourlyById("parques-morenito-proyecto");
if (hourlyMorenitoProject) {
  hourlyMorenitoProject.verificationStatus = "Ficha del desarrollo accesible el 27/11/2026; declara entrega en julio de 2022 y continúa anunciando lotes de 300 a 1.200 m². La disponibilidad comercial actual no está confirmada.";
  hourlyMorenitoProject.availabilityStatus = "No confirmada";
  hourlyAppendObservation(hourlyMorenitoProject, "La ficha del desarrollador informa 56 lotes; otra ficha de Argenprop describe 50 lotes. Se conserva la diferencia sin resolver.");
}
const hourlyMartin4900 = hourlyById("moreno-casa-martin-fierro-4900");
if (hourlyMartin4900) {
  hourlyMartin4900.verificationStatus = "Pendiente de revalidación: la URL primaria no fue accesible el 27/11/2026; no se obtuvo respuesta 410 ni una ficha primaria alternativa que confirme continuidad.";
  hourlyMartin4900.availabilityStatus = "Pendiente de revalidación";
}
const hourlyRivadavia = hourlyById("casa-bernardino-rivadavia-1000");
if (hourlyRivadavia) {
  hourlyRivadavia.price = "USD 150.000 (ficha individual; el listado general había mostrado USD 170.000)";
  hourlyRivadavia.currency = "USD";
  hourlyRivadavia.landSurfaceM2 = 597;
  hourlyRivadavia.coveredSurfaceM2 = 80;
  hourlyRivadavia.agency = "Mateo Propiedades";
  hourlyRivadavia.contact = "Mateo Propiedades · matrícula 36 Dpto. M-Gr.; teléfono no visible en la ficha consultada";
  hourlyRivadavia.verificationStatus = "Ficha individual de Zonaprop accesible el 27/11/2026; precio USD 150.000, 597 m² totales y 80 m² cubiertos. Un listado general mostraba USD 170.000.";
  hourlyRivadavia.availabilityStatus = "No confirmada";
}
const hourlyRicardoRojas = hourlyById("terreno-ricardo-rojas-4418-3830");
if (hourlyRicardoRojas) {
  hourlyRicardoRojas.verificationStatus = "Ficha de Argenprop accesible el 27/11/2026; publica 3.830 m² y USD 69.000. El aviso menciona contrato de antena Movistar hasta octubre de 2026, plazo ya transcurrido.";
  hourlyRicardoRojas.availabilityStatus = "No confirmada";
  hourlyAppendObservation(hourlyRicardoRojas, "Existen otras publicaciones para Ricardo Rojas 4418 con 9.435 m² o 13.265 m² agregados; no fusionar sin nomenclatura catastral. El contrato de antena mencionado vencía en octubre de 2026 y no debe modelarse como ingreso vigente sin renovación documentada.");
}
const hourlyTrujui = hourlyById("trujui-lote-isabel-catolica-400");
if (hourlyTrujui) {
  hourlyTrujui.price = "USD 28.000 (encabezado) / USD 18.000 + cuotas (descripción)";
  hourlyTrujui.currency = "USD";
  hourlyAppendObservation(hourlyTrujui, "El precio publicado difiere entre el encabezado y la descripción; solicitar propuesta comercial escrita antes de comparar.");
}
const hourlyBelisario = hourlyById("la-reja-casa-belisario-roldan-1800");
if (hourlyBelisario) hourlyAppendObservation(hourlyBelisario, "La ficha presenta una inconsistencia de localidad: título/portal indica Moreno, mientras la descripción menciona La Reja. Confirmar domicilio exacto.");
const hourlyLebensohn = hourlyById("paso-del-rey-casa-lebensohn-300");
if (hourlyLebensohn) {
  hourlyLebensohn.coveredSurfaceM2 = null;
  hourlyLebensohn.surfaceNote = "El portal informa 1 m² cubierto, dato inconsistente con la descripción de una casa en dos plantas; superficie cubierta útil no confirmada.";
  hourlyAppendObservation(hourlyLebensohn, "No utilizar el dato de 1 m² cubierto para cálculos: parece un error de carga y requiere plano o confirmación del anunciante.");
}
const hourlyNations = hourlyById("casa-naciones-unidas-1500");
if (hourlyNations) {
  hourlyNations.verificationStatus = "Ficha individual de Zonaprop accesible el 27/11/2026; mantiene USD 61.000, 194 m² totales y 95 m² cubiertos.";
  hourlyNations.availabilityStatus = "No confirmada";
}
const hourlySanDiego = hourlyById("casa-country-san-diego-1500");
if (hourlySanDiego) {
  hourlySanDiego.verificationStatus = "Ficha individual de Zonaprop accesible el 27/11/2026; mantiene USD 549.999, 1.500 m² totales y 720 m² cubiertos. Ubicación interna sin lote publicado.";
  hourlySanDiego.availabilityStatus = "No confirmada";
}
const hourlyGolf = hourlyById("desarrollo-barrio-del-golf-atuel-2700");
if (hourlyGolf) {
  hourlyGolf.verificationStatus = "Ficha de Zonaprop accesible el 27/11/2026; informa 6 unidades publicadas, lotes de 730 a 1.635 m², desde USD 47.961 y entrega inmediata.";
  hourlyGolf.availabilityStatus = "No confirmada";
  hourlyAppendObservation(hourlyGolf, "La ficha mezcla etiquetas de pozo, construcción y terminado; el texto indica entrega inmediata. Confirmar etapa y stock por lote.");
}
const hourlyColonos = hourlyById("desarrollo-colonos-ii-2300");
if (hourlyColonos) {
  hourlyColonos.verificationStatus = "Ficha de Zonaprop accesible el 27/11/2026; mantiene entrega anunciada para noviembre de 2028 y unidades de 52 a 235 m².";
  hourlyColonos.availabilityStatus = "No confirmada";
  hourlyAppendObservation(hourlyColonos, "El precio publicado desde USD 1.700 no aclara si corresponde a m², unidad, anticipo u otro concepto; no usarlo como precio total.");
}
const hourlyIbis = hourlyById("desarrollo-ibis-iv-273");
if (hourlyIbis) {
  hourlyIbis.verificationStatus = "Ficha de Zonaprop accesible el 27/11/2026; informa inicio de obra en febrero de 2025, entrega estimada noviembre de 2027 y tres unidades publicadas.";
  hourlyIbis.availabilityStatus = "No confirmada";
  hourlyAppendObservation(hourlyIbis, "La cantidad de unidades publicadas difiere entre fichas del mismo desarrollo; confirmar inventario y estado de obra con la desarrolladora.");
}
const hourlyCamilliProject = hourlyById("desarrollo-140-camilli");
if (hourlyCamilliProject) {
  hourlyCamilliProject.verificationStatus = "Ficha de Zonaprop accesible el 27/11/2026; informa 12 unidades, entrega diciembre de 2027 y precios en encabezado desde USD 49.300.";
  hourlyCamilliProject.availabilityStatus = "No confirmada";
  hourlyAppendObservation(hourlyCamilliProject, "La descripción usa importes con símbolo $ y cuotas en pesos indexadas por CAC, mientras el encabezado expresa USD. Solicitar lista comercial con moneda y unidad de precio.");
}

const all = [
  ...localities.map(item => ({ ...item, type: "locality" })),
  ...opportunities.map(item => ({ ...item, type: "opportunity" })),
  ...publishedProperties.map(item => ({ ...item, type: "published" }))
];
const kindLabel = {
  industrial: "Productivo / logístico",
  commercial: "Comercial / servicios",
  tourism: "Turismo / recreación",
  land: "Prospección de suelo"
};

const reviewTasks = Object.freeze([
  Object.freeze({ id: "cadastral", label: "Individualización catastral y plano de mensura" }),
  Object.freeze({ id: "planning", label: "Normativa vigente, usos e indicadores urbanísticos" }),
  Object.freeze({ id: "legal", label: "Titularidad, antecedentes y restricciones" }),
  Object.freeze({ id: "feasibility", label: "Servicios, accesos y condiciones ambientales e hidráulicas" }),
  Object.freeze({ id: "traceability", label: "Trazabilidad documental y fecha de consulta" })
]);
const REVIEW_STORAGE_KEY = "moreno-map-review-v2";
const LEGACY_REVIEW_STORAGE_KEY = "moreno-map-review-v1";

function isValidReviewDate(value) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(value || ""));
  if (!match) return false;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day;
}

function normalizeReviewRecord(saved) {
  if (saved === true) {
    return { completed: false, legacy_marked: true, source_document: "", consulted_at: "", note: "" };
  }
  if (!saved || typeof saved !== "object" || Array.isArray(saved)) return null;
  const source = String(saved.source_document == null ? "" : saved.source_document).trim().slice(0, 240);
  const consultedAt = isValidReviewDate(saved.consulted_at) ? String(saved.consulted_at) : "";
  const note = String(saved.note == null ? "" : saved.note).trim().slice(0, 500);
  const completed = saved.completed === true && source.length >= 4 && Boolean(consultedAt);
  const legacyMarked = !completed && (saved.legacy_marked === true || saved.completed === true);
  if (!completed && !legacyMarked && !source && !consultedAt && !note) return null;
  return { completed, legacy_marked: legacyMarked, source_document: source, consulted_at: consultedAt, note };
}

function normalizeReviewState(raw, items) {
  const allowedIds = new Set((items || opportunities).map(item => item.id));
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return {};
  const normalized = {};
  Object.keys(raw).forEach(referenceId => {
    if (!allowedIds.has(referenceId)) return;
    const saved = raw[referenceId];
    if (!saved || typeof saved !== "object" || Array.isArray(saved)) return;
    const tasks = {};
    reviewTasks.forEach(task => {
      const record = normalizeReviewRecord(saved[task.id]);
      if (record) tasks[task.id] = record;
    });
    if (Object.keys(tasks).length) normalized[referenceId] = tasks;
  });
  return normalized;
}

function readReviewState(storage, items) {
  if (!storage || typeof storage.getItem !== "function") return {};
  try {
    const current = storage.getItem(REVIEW_STORAGE_KEY);
    if (current) return normalizeReviewState(JSON.parse(current), items);
  } catch (error) {
    // Si la versión actual está dañada, se intenta recuperar la marca anterior.
  }
  try {
    const legacy = storage.getItem(LEGACY_REVIEW_STORAGE_KEY);
    return legacy ? normalizeReviewState(JSON.parse(legacy), items) : {};
  } catch (error) {
    return {};
  }
}

function writeReviewState(storage, state, items) {
  if (!storage || typeof storage.setItem !== "function") return false;
  try {
    storage.setItem(REVIEW_STORAGE_KEY, JSON.stringify(normalizeReviewState(state, items)));
    if (typeof storage.removeItem === "function") {
      try { storage.removeItem(LEGACY_REVIEW_STORAGE_KEY); } catch (error) {}
    }
    return true;
  } catch (error) {
    return false;
  }
}

function clearReviewState(storage) {
  if (!storage) return true;
  if (typeof storage.removeItem !== "function") return false;
  try {
    storage.removeItem(REVIEW_STORAGE_KEY);
    storage.removeItem(LEGACY_REVIEW_STORAGE_KEY);
    return true;
  } catch (error) {
    return false;
  }
}

function updateReviewState(state, referenceId, taskId, completed, items, details) {
  const allowedItems = items || opportunities;
  if (!allowedItems.some(item => item.id === referenceId) ||
      !reviewTasks.some(task => task.id === taskId)) {
    return normalizeReviewState(state, allowedItems);
  }
  const next = normalizeReviewState(state, allowedItems);
  if (!next[referenceId]) next[referenceId] = {};
  const previous = next[referenceId][taskId] || {};
  const supplied = details && typeof details === "object" ? details : {};
  const source = String(supplied.source_document == null ? previous.source_document || "" : supplied.source_document).trim().slice(0, 240);
  const dateValue = supplied.consulted_at == null ? previous.consulted_at || "" : supplied.consulted_at;
  const consultedAt = isValidReviewDate(dateValue) ? String(dateValue) : "";
  const note = String(supplied.note == null ? previous.note || "" : supplied.note).trim().slice(0, 500);
  const isComplete = completed === true && source.length >= 4 && Boolean(consultedAt);
  const legacyMarked = !isComplete && previous.legacy_marked === true;
  if (isComplete || legacyMarked || source || consultedAt || note) {
    next[referenceId][taskId] = {
      completed: isComplete,
      legacy_marked: legacyMarked,
      source_document: source,
      consulted_at: consultedAt,
      note
    };
  } else {
    delete next[referenceId][taskId];
  }
  if (!Object.keys(next[referenceId]).length) delete next[referenceId];
  return next;
}

function getReviewSummary(state, referenceId) {
  const normalized = normalizeReviewState(state, opportunities);
  const entry = normalized[referenceId] || {};
  const completed = reviewTasks.filter(task => entry[task.id] && entry[task.id].completed === true).length;
  return { completed, total: reviewTasks.length, percent: Math.round((completed / reviewTasks.length) * 100) };
}

function buildReviewExport(state, items, generatedAt) {
  const normalized = normalizeReviewState(state, opportunities);
  const visibleIds = new Set((items || opportunities).map(item => item.id));
  return {
    schema_version: 2,
    generated_at: generatedAt || new Date().toISOString(),
    scope: "Registro local de revisiones con fuente o documento y fecha de consulta. No verifica autenticidad, vigencia, titularidad ni cumplimiento normativo; no es una certificación.",
    references: opportunities.filter(item => visibleIds.has(item.id)).map(item => {
      const summary = getReviewSummary(normalized, item.id);
      const entry = normalized[item.id] || {};
      return {
        id: item.id,
        name: item.name,
        completed_tasks: summary.completed,
        total_tasks: summary.total,
        tasks: reviewTasks.map(task => {
          const record = entry[task.id] || {};
          return {
            id: task.id,
            label: task.label,
            review_recorded: record.completed === true,
            source_document: record.source_document || "",
            consulted_at: record.consulted_at || "",
            note: record.note || "",
            legacy_marked: record.legacy_marked === true
          };
        })
      };
    })
  };
}


function parseReviewImport(payload, items) {
  let parsed;
  try { parsed = typeof payload === "string" ? JSON.parse(payload) : payload; }
  catch (error) { return { ok: false, error: "El archivo no contiene JSON válido." }; }
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed) || parsed.schema_version !== 2 || !Array.isArray(parsed.references)) {
    return { ok: false, error: "Formato no compatible: se requiere una bitácora MORENO JSON versión 2." };
  }
  const allowedIds = new Set((items || opportunities).map(item => item.id));
  const knownTasks = new Set(reviewTasks.map(task => task.id));
  const incoming = {};
  const seen = new Set();
  let ignoredReferences = 0;
  let skippedTasks = 0;
  parsed.references.forEach(reference => {
    if (!reference || typeof reference !== "object" || Array.isArray(reference) || !allowedIds.has(reference.id) || !Array.isArray(reference.tasks) || seen.has(reference.id)) {
      ignoredReferences += 1;
      return;
    }
    seen.add(reference.id);
    reference.tasks.forEach(task => {
      if (!task || typeof task !== "object" || Array.isArray(task) || !knownTasks.has(task.id)) {
        skippedTasks += 1;
        return;
      }
      const record = normalizeReviewRecord({
        completed: task.review_recorded === true,
        legacy_marked: task.legacy_marked === true,
        source_document: task.source_document,
        consulted_at: task.consulted_at,
        note: task.note
      });
      if (!record) return;
      if (!incoming[reference.id]) incoming[reference.id] = {};
      incoming[reference.id][task.id] = record;
    });
  });
  return { ok: true, state: normalizeReviewState(incoming, items || opportunities), ignoredReferences, skippedTasks };
}

function mergeReviewStates(localState, importedState, items) {
  const allowedItems = items || opportunities;
  const merged = normalizeReviewState(localState, allowedItems);
  const imported = normalizeReviewState(importedState, allowedItems);
  const conflicts = [];
  let addedRecords = 0;
  let combinedRecords = 0;
  Object.keys(imported).forEach(referenceId => {
    Object.keys(imported[referenceId]).forEach(taskId => {
      const incoming = imported[referenceId][taskId];
      const existing = merged[referenceId] && merged[referenceId][taskId];
      if (!existing) {
        if (!merged[referenceId]) merged[referenceId] = {};
        merged[referenceId][taskId] = { ...incoming };
        addedRecords += 1;
        return;
      }
      const fields = ["source_document", "consulted_at", "note"];
      const differingFields = fields.filter(field =>
        String(existing[field] || "") && String(incoming[field] || "") && String(existing[field]) !== String(incoming[field])
      );
      if (differingFields.length) {
        conflicts.push({ reference_id: referenceId, task_id: taskId, fields: differingFields });
        return;
      }
      const source = existing.source_document || incoming.source_document || "";
      const consultedAt = existing.consulted_at || incoming.consulted_at || "";
      const note = existing.note || incoming.note || "";
      const completed = (existing.completed === true || incoming.completed === true) && source.length >= 4 && isValidReviewDate(consultedAt);
      const legacyMarked = !completed && (existing.legacy_marked === true || incoming.legacy_marked === true);
      merged[referenceId][taskId] = { completed, legacy_marked: legacyMarked, source_document: source, consulted_at: consultedAt, note };
      combinedRecords += 1;
    });
  });
  return { state: normalizeReviewState(merged, allowedItems), addedRecords, combinedRecords, conflicts };
}

const MAP_VIEW_QUERY_KEYS = ["q", "tipo", "sector", "evidencia", "ref"];
const MAP_VIEW_CATEGORIES = ["all", "locality", "opportunity", "published"];
const MAP_VIEW_KINDS = ["all", "industrial", "commercial", "tourism", "land"];
const MAP_VIEW_EVIDENCE = ["all", "documented", "hypothesis"];

function normalizeMapViewState(state, items) {
  const settings = state || {};
  const query = String(settings.query || "").trim().slice(0, 100);
  const category = MAP_VIEW_CATEGORIES.includes(settings.category) ? settings.category : "all";
  const kind = MAP_VIEW_KINDS.includes(settings.kind) ? settings.kind : "all";
  const evidence = MAP_VIEW_EVIDENCE.includes(settings.evidence) ? settings.evidence : "all";
  const candidateReference = String(settings.ref || "");
  const reference = (items || []).some(item => item.id === candidateReference)
    ? candidateReference
    : null;
  return { query, category, kind, evidence, ref: reference };
}

function parseMapViewState(search, items) {
  const parameters = new URLSearchParams(String(search || ""));
  return normalizeMapViewState({
    query: parameters.get("q") || "",
    category: parameters.get("tipo") || "all",
    kind: parameters.get("sector") || "all",
    evidence: parameters.get("evidencia") || "all",
    ref: parameters.get("ref")
  }, items);
}

function buildMapViewUrl(baseUrl, state, items) {
  const url = new URL(String(baseUrl));
  const normalized = normalizeMapViewState(state, items);
  MAP_VIEW_QUERY_KEYS.forEach(key => url.searchParams.delete(key));
  if (normalized.query) url.searchParams.set("q", normalized.query);
  if (normalized.category !== "all") url.searchParams.set("tipo", normalized.category);
  if (normalized.kind !== "all") url.searchParams.set("sector", normalized.kind);
  if (normalized.evidence !== "all") url.searchParams.set("evidencia", normalized.evidence);
  if (normalized.ref) url.searchParams.set("ref", normalized.ref);
  return url.toString();
}

function getSharedReferenceId(search, items) {
  return parseMapViewState(search, items).ref;
}

function buildReferenceUrl(baseUrl, referenceId) {
  const currentUrl = new URL(String(baseUrl));
  const currentState = parseMapViewState(currentUrl.search, all);
  return buildMapViewUrl(baseUrl, { ...currentState, ref: referenceId }, all);
}

function buildOpportunityContactUrl(baseUrl, item) {
  const url = new URL("../oportunidades/", String(baseUrl));
  url.searchParams.set("map_ref", String(item.id));
  url.searchParams.delete("map_name");
  return url.toString();
}

function referenceContactLabel(item) {
  if (item && item.type === "opportunity") return "Conversar sobre esta tesis ↗";
  if (item && item.type === "published") return "Consultar esta publicación ↗";
  return "Consultar sobre esta localidad ↗";
}

function shouldFitMunicipalBounds(selectedReferenceId, userHasNavigated) {
  return !selectedReferenceId && !userHasNavigated;
}

function prefersReducedMotion(view) {
  return Boolean(
    view &&
    typeof view.matchMedia === "function" &&
    view.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function filterReferences(items, options) {
  const settings = options || {};
  const query = String(settings.query || "").toLocaleLowerCase("es-AR").trim();
  const category = settings.category || "all";
  const kind = settings.kind || "all";
  const evidence = settings.evidence || "all";
  return items.filter(item => {
    const categoryMatches =
      category === "all" ||
      (category === "locality" && item.type === "locality") ||
      (category === "opportunity" && item.type === "opportunity") ||
      (category === "published" && item.type === "published");
    const kindMatches = kind === "all" || (item.type === "opportunity" && item.kind === kind);
    const evidenceMatches = evidence === "all" || (item.type === "opportunity" && evidence === item.stage);
    const searchable = [
      item.name, item.info, item.business, item.status, item.evidence, item.next,
      item.kind, kindLabel[item.kind], item.recordType, item.locality, item.address,
      item.agency, item.contact, item.price, item.verificationStatus, item.observations
    ].filter(Boolean).join(" ").toLocaleLowerCase("es-AR");
    return categoryMatches && kindMatches && evidenceMatches && searchable.includes(query);
  });
}

function countInventory(items) {
  const list = Array.isArray(items) ? items : [];
  return list.reduce((counts, item) => {
    if (item.type === "locality") counts.localities += 1;
    else if (item.type === "opportunity" && item.stage === "documented") counts.documented += 1;
    else if (item.type === "opportunity" && item.stage === "hypothesis") counts.hypotheses += 1;
    else if (item.type === "published") counts.published += 1;
    counts.total += 1;
    return counts;
  }, { localities: 0, documented: 0, hypotheses: 0, published: 0, total: 0 });
}

function csvCell(value) {
  return '"' + String(value == null ? "" : value).replace(/"/g, '""') + '"';
}

function hasCoordinates(item) {
  return Boolean(item && item.lat != null && item.lng != null && Number.isFinite(Number(item.lat)) && Number.isFinite(Number(item.lng)));
}

function normalizeAddressText(value) {
  return String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase().replace(/[^A-Z0-9]+/g, " ").trim();
}

function georefAddressMatches(item, entry) {
  const expected = normalizeAddressText(item && (item.geocodeMatch || item.address));
  const actual = normalizeAddressText(entry && entry.nomenclatura);
  const tokens = expected.split(/\s+/).filter(token => token.length > 2 || /\d/.test(token));
  return Boolean(tokens.length && actual && tokens.every(token => actual.includes(token)));
}

function buildCsv(items) {
  const headers = [
    "tipo", "nombre", "latitud_referencia", "longitud_referencia", "categoria", "nivel_evidencia",
    "linea_a_investigar", "evidencia_publica", "estado_de_verificacion", "proximo_paso", "fuente",
    "alcance_de_coordenada", "localidad", "ubicacion_publicada", "direccion_publicada", "anunciante",
    "contacto_publico", "precio_publicado", "moneda", "superficie_terreno_m2", "superficie_cubierta_m2",
    "nota_de_superficie", "fecha_aviso", "fecha_revision", "geolocalizacion", "disponibilidad"
  ];
  const rows = items.map(item => {
    const isLocality = item.type === "locality";
    const isPublished = item.type === "published";
    const coordinatesAvailable = hasCoordinates(item);
    const coordinateScope = isLocality
      ? "Coordenada de referencia de localidad; no identifica una parcela."
      : (isPublished ? (coordinatesAvailable ? "Georreferencia aproximada de dirección por Georef; no parcelaria." : "Geolocalización pendiente; ubicación textual conservada.") : "Centro aproximado de corredor o área; no identifica una parcela.");
    const base = [
      isLocality ? "localidad" : (isPublished ? item.recordType : "tesis"), item.name,
      coordinatesAvailable ? item.lat : "", coordinatesAvailable ? item.lng : "",
      isLocality ? "localidad" : (isPublished ? "Propiedades y desarrollos publicados" : (kindLabel[item.kind] || item.kind)),
      isLocality ? "referencia territorial" : (isPublished ? "publicación comercial" : (item.stage === "hypothesis" ? "hipotesis de prospeccion" : "contexto con fuente publica")),
      isLocality ? item.info : (isPublished ? [item.recordType, item.locality, item.address].filter(Boolean).join(" · ") : item.business),
      isLocality ? "Localidad de referencia; no es una evaluación parcelaria." : (isPublished ? item.observations : item.evidence),
      isLocality ? "Centro aproximado de localidad; no parcelario." : (isPublished ? item.verificationStatus : item.status),
      isLocality ? "Definir zona y recopilar información catastral y normativa." : (isPublished ? "Confirmar vigencia, precio, stock y documentación con el anunciante." : item.next),
      item.source || "", coordinateScope
    ];
    const details = isPublished ? [
      item.locality, item.location || item.address, item.address, item.agency, item.contact,
      item.price, item.currency, item.landSurfaceM2, item.coveredSurfaceM2, item.surfaceNote,
      item.publicationDate, item.lastCheckedAt, item.geolocationStatus, item.availabilityStatus
    ] : ["","","","","","","","","","","","","",""];
    return base.concat(details);
  });
  return "\uFEFF" + [headers, ...rows].map(row => row.map(csvCell).join(",")).join("\r\n");
}

function buildGeoJson(items) {
  const features = items.map(item => {
    const isLocality = item.type === "locality";
    const isPublished = item.type === "published";
    const evidenceLevel = isLocality ? "referencia territorial" : (isPublished ? "publicación comercial" : (item.stage === "hypothesis" ? "hipotesis de prospeccion" : "contexto con fuente publica"));
    const coordinateScope = isLocality
      ? "Centro aproximado de localidad; no identifica una parcela."
      : (isPublished ? (hasCoordinates(item) ? "Georreferencia aproximada de dirección por Georef; no representa parcela." : "Geolocalización pendiente; no se asignó coordenada.") : "Centro aproximado de corredor o area; no identifica una parcela.");
    const geometry = hasCoordinates(item) ? { type: "Point", coordinates: [Number(item.lng), Number(item.lat)] } : null;
    return {
      type: "Feature",
      geometry,
      properties: {
        id: item.id, reference_type: isLocality ? "localidad" : (isPublished ? item.recordType : "tesis territorial"),
        name: item.name, category: isLocality ? "Localidad" : (isPublished ? "Propiedades y desarrollos publicados" : (kindLabel[item.kind] || item.kind)),
        evidence_level: evidenceLevel,
        line_to_investigate: isLocality ? item.info : (isPublished ? [item.recordType, item.locality, item.address].filter(Boolean).join(" · ") : item.business),
        public_evidence: isLocality ? null : (isPublished ? item.observations : item.evidence),
        verification_status: isLocality ? "Referencia geográfica de localidad; no es una evaluación parcelaria." : (isPublished ? item.verificationStatus : item.status),
        next_step: isLocality ? "Definir zona y recopilar información catastral y normativa." : (isPublished ? "Confirmar vigencia, precio, disponibilidad, dominio y documentación." : item.next),
        source_url: item.source || null, coordinate_scope: coordinateScope,
        locality: isPublished ? item.locality : null, published_address: isPublished ? item.address : null,
        agency: isPublished ? item.agency : null, public_contact: isPublished ? item.contact : null,
        published_price: isPublished ? item.price : null, currency: isPublished ? item.currency : null,
        land_surface_m2: isPublished ? item.landSurfaceM2 : null, covered_surface_m2: isPublished ? item.coveredSurfaceM2 : null,
        publication_date: isPublished ? item.publicationDate : null, checked_at: isPublished ? item.lastCheckedAt : null,
        geolocation_status: isPublished ? item.geolocationStatus : null, availability_status: isPublished ? item.availabilityStatus : null,
        parcel_identified: false, availability_verified: false
      }
    };
  });
  return {
    type: "FeatureCollection",
    name: "Mapa IA de Moreno — referencias territoriales y publicaciones inmobiliarias",
    description: "Exportación de las referencias visibles del inventario exploratorio de MORENO.",
    disclaimer: "Las coordenadas de localidades y tesis son aproximadas. Las publicaciones comerciales conservan geometry:null hasta obtener una georreferencia inequívoca de la dirección mediante Georef. Ninguna coordenada identifica una parcela ni acredita titularidad, disponibilidad, zonificación, factibilidad o rentabilidad.",
    features
  };
}


function escapeTerritorialHtml(value) {
  return String(value == null ? "" : value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function safeTerritorialSource(value) {
  try {
    const url = new URL(String(value || ""));
    return url.protocol === "https:" ? url.toString() : "";
  } catch (error) {
    return "";
  }
}

function buildTerritorialBrief(item, generatedAt) {
  if (!item || item.type !== "opportunity" ||
      !["documented", "hypothesis"].includes(item.stage)) return null;
  const latitude = Number(item.lat);
  const longitude = Number(item.lng);
  const timestamp = typeof generatedAt === "string" && Number.isFinite(Date.parse(generatedAt))
    ? new Date(generatedAt).toISOString()
    : new Date().toISOString();
  const localityScope = "Centro aproximado de corredor o área; no identifica una parcela.";
  const stageLabel = item.stage === "hypothesis"
    ? "Hipótesis de prospección"
    : "Contexto con fuente pública";
  return {
    schema: "moreno.territorial-brief",
    schemaVersion: 1,
    generatedAt: timestamp,
    classification: { value: item.stage, label: stageLabel },
    reference: {
      id: String(item.id || "").trim().slice(0, 40),
      name: String(item.name || "Referencia territorial").trim().slice(0, 180),
      category: kindLabel[item.kind] || String(item.kind || "Tesis territorial").slice(0, 80),
      coordinates: {
        latitude: Number.isFinite(latitude) ? latitude : null,
        longitude: Number.isFinite(longitude) ? longitude : null,
        scope: localityScope
      },
      lineToInvestigate: String(item.business || "").trim().slice(0, 1200),
      evidence: String(item.evidence || "").trim().slice(0, 1600),
      verificationStatus: String(item.status || "").trim().slice(0, 800),
      nextStep: String(item.next || "").trim().slice(0, 1000),
      sourceUrl: safeTerritorialSource(item.source)
    },
    diligence: reviewTasks.map(task => ({
      id: task.id, label: task.label, sourceDocument: "", consultedAt: "", recorded: false
    })),
    dataToComplete: [
      "Partida y nomenclatura catastral del inmueble concreto.",
      "Plano de mensura, superficie y geometría parcelaria.",
      "Certificado urbanístico vigente, usos e indicadores aplicables.",
      "Titularidad, antecedentes dominiales, gravámenes y restricciones.",
      "Servicios, accesos y condiciones ambientales e hidráulicas.",
      "Disponibilidad y condiciones económicas respaldadas por una fuente y fecha."
    ],
    disclaimers: [
      "Esta ficha organiza una línea de investigación territorial; no identifica ni ofrece un inmueble.",
      "Las coordenadas son aproximadas y no representan una parcela.",
      "Una fuente pública o una publicación de un operador no equivale a verificación independiente, vigencia normativa ni disponibilidad.",
      "No constituye tasación, oferta, estudio de factibilidad, certificación urbanística ni recomendación de inversión."
    ]
  };
}

function buildTerritorialBriefHtml(brief) {
  if (!brief || brief.schema !== "moreno.territorial-brief" ||
      brief.schemaVersion !== 1 || !brief.reference) return "";
  const reference = brief.reference;
  const safeSource = safeTerritorialSource(reference.sourceUrl);
  const coordinates = reference.coordinates || {};
  const coordinateText = Number.isFinite(coordinates.latitude) && Number.isFinite(coordinates.longitude)
    ? coordinates.latitude.toFixed(5) + ", " + coordinates.longitude.toFixed(5)
    : "No informadas";
  const sourceMarkup = safeSource
    ? '<a href="' + escapeTerritorialHtml(safeSource) + '" target="_blank" rel="noopener noreferrer">' +
      escapeTerritorialHtml(safeSource) + "</a>"
    : "<span>Sin enlace de fuente registrado.</span>";
  const diligenceRows = (Array.isArray(brief.diligence) ? brief.diligence : []).map(task =>
    "<tr><th>" + escapeTerritorialHtml(task.label) +
    '</th><td><span class="write-line"></span></td><td><span class="date-line"></span></td></tr>'
  ).join("");
  const dataRows = (Array.isArray(brief.dataToComplete) ? brief.dataToComplete : []).map(label =>
    '<li><span class="empty-box" aria-hidden="true"></span>' + escapeTerritorialHtml(label) + "</li>"
  ).join("");
  const disclaimerRows = (Array.isArray(brief.disclaimers) ? brief.disclaimers : []).map(note =>
    "<li>" + escapeTerritorialHtml(note) + "</li>"
  ).join("");
  const dateLabel = escapeTerritorialHtml(String(brief.generatedAt || "").slice(0, 10));
  return '<!doctype html><html lang="es-AR"><head><meta charset="utf-8">' +
    '<meta name="viewport" content="width=device-width,initial-scale=1">' +
    '<meta name="robots" content="noindex,nofollow">' +
    "<title>Ficha de prospección · " + escapeTerritorialHtml(reference.name) + "</title>" +
    "<style>" +
    "@page{size:A4;margin:13mm}" +
    ":root{color-scheme:light;--ink:#292e2a;--muted:#686b62;--line:#c9c5b9;--paper:#fbfaf6;--rust:#8b5b43}" +
    "*{box-sizing:border-box}body{margin:0;padding:24px;background:#e9e6dd;color:var(--ink);font:12px/1.65 Arial,sans-serif}" +
    ".sheet{max-width:210mm;min-height:267mm;margin:0 auto;padding:15mm;background:var(--paper);box-shadow:0 8px 30px #20282018}" +
    ".topline{display:flex;justify-content:space-between;gap:20px;padding-bottom:12px;border-bottom:2px solid var(--ink);font-size:9px;letter-spacing:.16em;text-transform:uppercase}" +
    ".eyebrow{color:var(--rust);font-size:9px;font-weight:700;letter-spacing:.16em;text-transform:uppercase}" +
    "h1{max-width:680px;margin:18px 0 8px;font:400 35px/1.04 Georgia,serif;letter-spacing:-.035em}" +
    ".subhead{margin:0 0 18px;color:var(--muted);font-size:11px}" +
    ".badge{display:inline-block;padding:5px 8px;border:1px solid var(--ink);font-size:9px;letter-spacing:.09em;text-transform:uppercase}" +
    ".lead{margin:18px 0;padding:15px 18px;border-left:3px solid var(--rust);background:#f0ede5}" +
    ".lead p{margin:6px 0 0;font:400 18px/1.35 Georgia,serif}" +
    ".grid{display:grid;grid-template-columns:1fr 1fr;gap:0 22px;margin-top:16px}" +
    "section{margin:0 0 17px;break-inside:avoid}h2{margin:0 0 7px;padding-bottom:6px;border-bottom:1px solid var(--line);font:400 18px/1.2 Georgia,serif}" +
    "p{margin:0 0 7px}.muted{color:var(--muted)}.source{overflow-wrap:anywhere;font-size:10px}" +
    ".coordinate{padding:8px 10px;border:1px solid var(--line);font:600 11px/1.5 monospace}" +
    "table{width:100%;border-collapse:collapse;font-size:10px}th,td{padding:8px 7px;border-bottom:1px solid var(--line);text-align:left;vertical-align:top}th{width:48%;font-weight:600}" +
    "td{width:32%}.write-line{display:block;height:17px;border-bottom:1px dotted #8d8b80}.date-line{display:block;height:17px;border-bottom:1px dotted #8d8b80}" +
    ".data-list,.disclaimers{margin:0;padding:0;list-style:none}.data-list li{display:flex;gap:9px;padding:5px 0;border-bottom:1px solid #dedbd2}" +
    ".empty-box{flex:0 0 11px;width:11px;height:11px;margin-top:3px;border:1px solid #77796f}" +
    ".disclaimers{display:grid;gap:4px;color:var(--muted);font-size:9px}.disclaimers li:before{content:'— ';color:var(--rust)}" +
    "footer{margin-top:15px;padding-top:9px;border-top:1px solid var(--ink);color:var(--muted);font-size:8px;letter-spacing:.04em}" +
    ".print-control{display:block;margin:0 auto 14px;padding:10px 15px;border:1px solid var(--ink);background:var(--ink);color:#fff;font-weight:700;cursor:pointer}" +
    "a{color:#79523d;text-decoration-thickness:1px;text-underline-offset:3px}" +
    "@media(max-width:700px){body{padding:0}.sheet{min-height:0;padding:22px}.grid{grid-template-columns:1fr}h1{font-size:30px}.topline{font-size:8px}}" +
    "@media print{body{padding:0;background:#fff}.sheet{max-width:none;min-height:0;margin:0;padding:0;box-shadow:none}.print-control{display:none}a{color:inherit;text-decoration:none}}" +
    '</style></head><body><button class="print-control" type="button" onclick="window.print()">Imprimir / guardar como PDF</button>' +
    '<main class="sheet"><div class="topline"><strong>MORENO · INTELIGENCIA TERRITORIAL</strong><span>Ficha de prospección · ' + dateLabel + "</span></div>" +
    '<p class="eyebrow" style="margin:18px 0 0">Dossier de investigación · ' + escapeTerritorialHtml(reference.id) + "</p>" +
    "<h1>" + escapeTerritorialHtml(reference.name) + "</h1>" +
    '<p class="subhead"><span class="badge">' + escapeTerritorialHtml(brief.classification.label) + "</span> &nbsp; " +
    escapeTerritorialHtml(reference.category) + "</p>" +
    '<section class="lead"><span class="eyebrow">Línea de investigación · no es una propuesta confirmada</span><p>' +
    escapeTerritorialHtml(reference.lineToInvestigate) + "</p></section>" +
    '<div class="grid"><section><h2>Evidencia disponible</h2><p>' + escapeTerritorialHtml(reference.evidence) +
    '</p><p class="muted">La clasificación indica el tipo de respaldo registrado en el inventario; no certifica exactitud o vigencia.</p></section>' +
    "<section><h2>Estado de verificación</h2><p>" + escapeTerritorialHtml(reference.verificationStatus) +
    '</p><p class="muted">La disponibilidad y la identificación parcelaria no se presuponen.</p></section>' +
    "<section><h2>Próximo paso sugerido</h2><p>" + escapeTerritorialHtml(reference.nextStep) + "</p></section>" +
    '<section><h2>Referencia cartográfica</h2><p class="coordinate">' + escapeTerritorialHtml(coordinateText) +
    "</p><p class=\"muted\">" + escapeTerritorialHtml(coordinates.scope || "Referencia aproximada; no parcelaria.") + "</p></section></div>" +
    '<section class="source"><h2>Fuente de origen</h2><p>' + sourceMarkup +
    '</p><p class="muted">Enlace consignado en el inventario MORENO. Consultar el documento original y su fecha antes de utilizarlo en una evaluación.</p></section>' +
    '<section><h2>Bitácora para diligencia documental</h2><table><thead><tr><th>Control</th><th>Documento / fuente</th><th>Fecha</th></tr></thead><tbody>' +
    diligenceRows + "</tbody></table></section>" +
    '<section><h2>Datos a completar para evaluar un inmueble concreto</h2><ul class="data-list">' + dataRows + "</ul></section>" +
    '<section><h2>Alcance y cautelas</h2><ul class="disclaimers">' + disclaimerRows + "</ul></section>" +
    "<footer>ERICA M. ACOSTA · MORENO · Documento generado localmente desde el inventario público. Revisar fuentes y completar verificaciones antes de compartir como antecedente de una operación.</footer>" +
    "</main></body></html>";
}



function buildTerritorialDossier(items, filters, generatedAt) {
  const known = new Map(all.map(item => [item.id, item]));
  const seen = new Set();
  const selected = (Array.isArray(items) ? items : []).map(entry => {
    const id = entry && typeof entry.id === "string" ? entry.id : "";
    if (!id || seen.has(id) || !known.has(id)) return null;
    seen.add(id);
    return known.get(id);
  }).filter(Boolean);
  if (!selected.length) return null;

  const state = normalizeMapViewState(filters, all);
  const categoryLabels = { all: "Todas las capas", locality: "Localidades", opportunity: "Tesis de oportunidad", published: "Propiedades y desarrollos publicados" };
  const evidenceLabels = { all: "Todos los niveles", documented: "Contextos con fuente pública", hypothesis: "Hipótesis de prospección" };
  const filterLabels = [];
  if (state.query) filterLabels.push("Búsqueda: " + state.query);
  if (state.category !== "all") filterLabels.push("Tipo: " + categoryLabels[state.category]);
  if (state.kind !== "all") filterLabels.push("Sector: " + (kindLabel[state.kind] || state.kind));
  if (state.evidence !== "all") filterLabels.push("Evidencia: " + evidenceLabels[state.evidence]);
  if (state.ref) {
    const selectedReference = selected.find(item => item.id === state.ref);
    if (selectedReference) filterLabels.push("Referencia destacada: " + selectedReference.name);
  }
  if (!filterLabels.length) filterLabels.push("Inventario completo · sin filtros adicionales");

  const references = selected.map((item, index) => {
    const isLocality = item.type === "locality";
    const isPublished = item.type === "published";
    const latitude = item.lat == null ? NaN : Number(item.lat);
    const longitude = item.lng == null ? NaN : Number(item.lng);
    return {
      index: index + 1, id: item.id, name: item.name, type: item.type,
      classification: isLocality
        ? { value: "locality", label: "Localidad · referencia territorial" }
        : (isPublished ? { value: "published", label: "Publicación inmobiliaria · vigencia no confirmada" } : {
            value: item.stage,
            label: item.stage === "hypothesis" ? "Hipótesis de prospección" : "Contexto con fuente pública"
          }),
      category: isLocality ? "Localidad" : (isPublished ? "Propiedades y desarrollos publicados" : (kindLabel[item.kind] || "Tesis territorial")),
      coordinates: {
        latitude: Number.isFinite(latitude) ? latitude : null,
        longitude: Number.isFinite(longitude) ? longitude : null,
        scope: isLocality ? "Centro aproximado de localidad; no identifica una parcela." :
          (isPublished ? (hasCoordinates(item) ? "Georreferencia aproximada de dirección por Georef; no identifica una parcela." : "Geolocalización pendiente; se conserva la ubicación textual y no se asigna coordenada.") : "Centro aproximado de corredor o área; no identifica una parcela.")
      },
      lineToInvestigate: isLocality ? String(item.info || "") : (isPublished ? [item.recordType,item.locality,item.address,item.price].filter(Boolean).join(" · ") : String(item.business || "")),
      evidence: isLocality ? "Referencia geográfica de localidad; no es una evaluación parcelaria." : (isPublished ? String(item.observations || "") : String(item.evidence || "")),
      verificationStatus: isLocality ? "No identifica un inmueble ni acredita titularidad o disponibilidad." : (isPublished ? String(item.verificationStatus || "") : String(item.status || "")),
      nextStep: isLocality ? "Definir un área concreta y reunir información catastral, urbanística y de servicios." : (isPublished ? "Confirmar vigencia, precio, stock, contacto, dominio, mensura y documentación antes de negociar." : String(item.next || "")),
      sourceUrl: safeTerritorialSource(item.source)
    };
  });

  const counts = countInventory(selected);
  const timestamp = typeof generatedAt === "string" && Number.isFinite(Date.parse(generatedAt))
    ? new Date(generatedAt).toISOString()
    : new Date().toISOString();
  const title = state.kind !== "all"
    ? "Dossier sectorial · " + (kindLabel[state.kind] || state.kind)
    : (state.category !== "all" || state.evidence !== "all" || state.query
      ? "Dossier de selección territorial"
      : "Dossier territorial · Moreno");

  return {
    schema: "moreno.territorial-dossier",
    schemaVersion: 1,
    generatedAt: timestamp,
    title,
    filters: state,
    filterLabels,
    counts,
    references,
    disclaimers: [
      "Este dossier organiza referencias territoriales visibles en el Mapa IA; no identifica ni ofrece inmuebles.",
      "Las coordenadas son aproximadas y no representan parcelas, límites administrativos ni geometrías catastrales.",
      "Una fuente pública o una publicación de un operador no equivale a verificación independiente, vigencia normativa ni disponibilidad.",
      "No constituye tasación, oferta, estudio de factibilidad, certificación urbanística ni recomendación de inversión.",
      "La bitácora local de diligencia, los datos del navegador y los expedientes internos no se incorporan al documento."
    ]
  };
}

function buildTerritorialDossierDiagram(references) {
  const points = (Array.isArray(references) ? references : []).filter(reference =>
    reference && reference.coordinates &&
    Number.isFinite(reference.coordinates.latitude) &&
    Number.isFinite(reference.coordinates.longitude)
  );
  if (!points.length) return '<p class="muted">No hay coordenadas de referencia disponibles para esta selección.</p>';
  const longitudes = points.map(point => point.coordinates.longitude);
  const latitudes = points.map(point => point.coordinates.latitude);
  const minLng = Math.min.apply(null, longitudes);
  const maxLng = Math.max.apply(null, longitudes);
  const minLat = Math.min.apply(null, latitudes);
  const maxLat = Math.max.apply(null, latitudes);
  const lngRange = Math.max(maxLng - minLng, 0.0001);
  const latRange = Math.max(maxLat - minLat, 0.0001);
  const marks = points.map(reference => {
    const x = 74 + ((reference.coordinates.longitude - minLng) / lngRange) * 852;
    const y = 54 + ((maxLat - reference.coordinates.latitude) / latRange) * 252;
    const cx = Math.round(x);
    const cy = Math.round(y);
    const number = String(reference.index).padStart(2, "0");
    let shape = "";
    if (reference.type === "locality") {
      shape = '<circle cx="' + cx + '" cy="' + cy + '" r="12" class="schematic-locality"/>';
    } else if (reference.type === "published") {
      shape = '<path d="M ' + cx + " " + (cy - 13) + " L " + (cx + 12) + " " + (cy - 6) + " L " + (cx + 12) + " " + (cy + 6) + " L " + cx + " " + (cy + 13) + " L " + (cx - 12) + " " + (cy + 6) + " L " + (cx - 12) + " " + (cy - 6) + ' Z" class="schematic-published"/>';
    } else if (reference.classification.value === "hypothesis") {
      shape = '<path d="M ' + cx + " " + (cy - 14) + " L " + (cx + 14) + " " + cy + " L " + cx + " " + (cy + 14) + " L " + (cx - 14) + " " + cy + ' Z" class="schematic-hypothesis"/>';
    } else {
      shape = '<rect x="' + (cx - 11) + '" y="' + (cy - 11) + '" width="22" height="22" class="schematic-documented"/>';
    }
    return '<g><title>' + escapeTerritorialHtml(number + " · " + reference.name) + '</title>' +
      shape + '<text x="' + cx + '" y="' + (cy + 4) + '" class="schematic-number">' + number + '</text></g>';
  }).join("");
  return '<svg class="dossier-schematic" viewBox="0 0 1000 360" role="img" aria-labelledby="dossier-map-title dossier-map-desc" xmlns="http://www.w3.org/2000/svg">' +
    '<title id="dossier-map-title">Distribución relativa de referencias seleccionadas</title>' +
    '<desc id="dossier-map-desc">Esquema construido con las coordenadas aproximadas de las fichas. No es cartografía oficial, no tiene escala y no representa parcelas ni límites municipales.</desc>' +
    '<rect x="1" y="1" width="998" height="358" class="schematic-frame"/>' +
    '<g class="schematic-grid"><path d="M250 1V359M500 1V359M750 1V359M1 90H999M1 180H999M1 270H999"/></g>' +
    '<text x="24" y="28" class="schematic-direction">NORTE ↑</text><text x="976" y="338" text-anchor="end" class="schematic-direction">ESTE →</text>' +
    marks +
    '</svg>';
}

function buildTerritorialDossierHtml(dossier) {
  if (!dossier || dossier.schema !== "moreno.territorial-dossier" ||
      dossier.schemaVersion !== 1 || !Array.isArray(dossier.references) ||
      !dossier.references.length || dossier.references.length > 100) return "";
  const dateLabel = escapeTerritorialHtml(String(dossier.generatedAt || "").slice(0, 10));
  const title = escapeTerritorialHtml(dossier.title || "Dossier territorial · Moreno");
  const counts = dossier.counts || {};
  const filterMarkup = (Array.isArray(dossier.filterLabels) ? dossier.filterLabels : [])
    .map(label => '<li>' + escapeTerritorialHtml(label) + '</li>').join("");
  const indexMarkup = dossier.references.map(reference =>
    '<li><span>' + String(Number(reference.index) || 0).padStart(2, "0") + '</span><strong>' +
    escapeTerritorialHtml(reference.name) + '</strong><small>' +
    escapeTerritorialHtml(reference.classification && reference.classification.label || "Referencia territorial") +
    '</small></li>'
  ).join("");
  const referenceMarkup = dossier.references.map(reference => {
    const coordinates = reference.coordinates || {};
    const coordinateText = Number.isFinite(coordinates.latitude) && Number.isFinite(coordinates.longitude)
      ? coordinates.latitude.toFixed(5) + ", " + coordinates.longitude.toFixed(5)
      : "No informadas";
    const source = safeTerritorialSource(reference.sourceUrl);
    const sourceMarkup = source
      ? '<a href="' + escapeTerritorialHtml(source) + '" target="_blank" rel="noopener noreferrer">Consultar fuente original ↗</a>'
      : '<span class="muted">No hay una fuente enlazada para esta referencia.</span>';
    return '<article class="reference-card">' +
      '<header><span class="reference-number">' + String(Number(reference.index) || 0).padStart(2, "0") + '</span><div>' +
      '<p class="eyebrow">' + escapeTerritorialHtml(reference.classification && reference.classification.label || "Referencia territorial") +
      ' · ' + escapeTerritorialHtml(reference.category || "") + '</p><h2>' +
      escapeTerritorialHtml(reference.name) + '</h2></div></header>' +
      '<div class="reference-grid">' +
      '<section><h3>Línea a investigar</h3><p>' + escapeTerritorialHtml(reference.lineToInvestigate) + '</p></section>' +
      '<section><h3>Evidencia registrada</h3><p>' + escapeTerritorialHtml(reference.evidence) + '</p></section>' +
      '<section><h3>Estado de verificación</h3><p>' + escapeTerritorialHtml(reference.verificationStatus) + '</p></section>' +
      '<section><h3>Próximo paso</h3><p>' + escapeTerritorialHtml(reference.nextStep) + '</p></section>' +
      '<section><h3>Coordenada orientativa</h3><p class="coordinate">' + escapeTerritorialHtml(coordinateText) + '</p><p class="muted">' +
      escapeTerritorialHtml(coordinates.scope || "Referencia aproximada; no parcelaria.") + '</p></section>' +
      '<section><h3>Fuente de origen</h3><p class="source-link">' + sourceMarkup + '</p><p class="muted">Revisar el documento original, su alcance y su vigencia antes de utilizarlo en una evaluación.</p></section>' +
      '</div></article>';
  }).join("");
  const disclaimerMarkup = (Array.isArray(dossier.disclaimers) ? dossier.disclaimers : [])
    .map(note => '<li>' + escapeTerritorialHtml(note) + '</li>').join("");
  const diagram = buildTerritorialDossierDiagram(dossier.references);
  const total = Number(counts.total) || dossier.references.length;
  return '<!doctype html><html lang="es-AR"><head><meta charset="utf-8">' +
    '<meta name="viewport" content="width=device-width,initial-scale=1">' +
    '<meta name="robots" content="noindex,nofollow,noarchive">' +
    '<title>' + title + '</title><style>' +
    '@page{size:A4;margin:14mm}' +
    ':root{color-scheme:light;--ink:#292e2a;--muted:#696b63;--line:#c9c5b9;--paper:#fbfaf6;--rust:#8b5b43}' +
    '*{box-sizing:border-box}body{margin:0;padding:24px;background:#e9e6dd;color:var(--ink);font:11px/1.65 Arial,sans-serif}' +
    '.sheet{max-width:210mm;margin:0 auto 22px;padding:15mm;background:var(--paper);box-shadow:0 8px 30px #20282018}' +
    '.cover{min-height:265mm;display:flex;flex-direction:column;justify-content:space-between;break-after:page}' +
    '.topline{display:flex;justify-content:space-between;gap:18px;padding-bottom:12px;border-bottom:2px solid var(--ink);font-size:8px;letter-spacing:.16em;text-transform:uppercase}' +
    '.eyebrow{margin:0;color:var(--rust);font-size:8px;font-weight:700;letter-spacing:.16em;text-transform:uppercase}' +
    'h1{max-width:700px;margin:24px 0 12px;font:400 43px/1.02 Georgia,serif;letter-spacing:-.04em}' +
    '.cover-copy{max-width:560px;color:var(--muted);font:17px/1.5 Georgia,serif}' +
    '.cover-stats{display:grid;grid-template-columns:repeat(5,1fr);border-top:1px solid var(--line);border-bottom:1px solid var(--line)}' +
    '.cover-stat{padding:14px 10px 14px 0;border-right:1px solid var(--line)}.cover-stat:last-child{border:0}' +
    '.cover-stat strong{display:block;font:400 29px/1 Georgia,serif}.cover-stat span{display:block;margin-top:7px;color:var(--muted);font-size:8px;text-transform:uppercase;letter-spacing:.1em}' +
    '.filter-list{display:flex;flex-wrap:wrap;gap:7px;margin:14px 0 0;padding:0;list-style:none}.filter-list li{padding:5px 8px;border:1px solid var(--line);font-size:8px}' +
    '.map-page{break-after:page}.section-title{margin:0 0 10px;font:400 25px/1.1 Georgia,serif}' +
    '.schematic-frame{fill:#f4f1e8;stroke:#bdb9ad;stroke-width:1}.schematic-grid{fill:none;stroke:#d5d1c6;stroke-width:1}' +
    '.dossier-schematic{display:block;width:100%;height:auto;margin:18px 0 10px}.schematic-locality,.schematic-documented,.schematic-hypothesis,.schematic-published{fill:#f7f5ed;stroke:#343a33;stroke-width:2}' +
    '.schematic-hypothesis{stroke-dasharray:3 2}.schematic-published{fill:#e7d8c9;stroke:#80533a}.schematic-number{fill:#343a33;text-anchor:middle;font:700 8px Arial,sans-serif}.schematic-direction{fill:#6c6d64;font:700 9px Arial,sans-serif;letter-spacing:1px}' +
    '.diagram-legend{display:flex;flex-wrap:wrap;gap:12px;margin:10px 0 16px;color:var(--muted);font-size:9px}.legend-mark{display:inline-block;width:9px;height:9px;margin-right:5px;border:1.5px solid var(--ink);vertical-align:middle}.legend-circle{border-radius:50%}.legend-diamond{transform:rotate(45deg);border-style:dashed}.legend-published{background:#e7d8c9;border-color:#80533a;clip-path:polygon(50% 0,90% 25%,90% 75%,50% 100%,10% 75%,10% 25%)}' +
    '.index-list{display:grid;grid-template-columns:1fr 1fr;gap:0 18px;margin:12px 0;padding:0;list-style:none}.index-list li{display:grid;grid-template-columns:28px 1fr;gap:2px 8px;padding:8px 0;border-bottom:1px solid var(--line)}.index-list li>span{grid-row:span 2;color:var(--rust);font:15px Georgia,serif}.index-list strong{font-size:10px}.index-list small{color:var(--muted);font-size:8px}' +
    '.reference-card{padding:18px 0;border-top:1px solid var(--ink);break-inside:avoid;page-break-inside:avoid}.reference-card header{display:flex;align-items:flex-start;gap:13px;margin-bottom:13px}.reference-number{flex:0 0 34px;color:var(--rust);font:400 26px/1 Georgia,serif}.reference-card h2{margin:4px 0 0;font:400 24px/1.08 Georgia,serif}.reference-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px 22px}.reference-grid section{break-inside:avoid}.reference-grid h3{margin:0 0 5px;padding-bottom:4px;border-bottom:1px solid var(--line);font:700 8px/1.4 Arial,sans-serif;letter-spacing:.12em;text-transform:uppercase}.reference-grid p{margin:0 0 5px}.coordinate{font-family:monospace}.source-link{overflow-wrap:anywhere}.muted{color:var(--muted)}a{color:#79523d;text-decoration-thickness:1px;text-underline-offset:3px}' +
    '.caution{margin-top:18px;padding:12px 14px;border-left:3px solid var(--rust);background:#efede5}.caution ul{margin:6px 0 0;padding-left:17px}.caution li{margin:3px 0}.print-control{display:block;margin:0 auto 14px;padding:10px 15px;border:1px solid var(--ink);background:var(--ink);color:#fff;font-weight:700;cursor:pointer}' +
    'footer{margin-top:20px;padding-top:10px;border-top:1px solid var(--ink);color:var(--muted);font-size:8px;letter-spacing:.04em}' +
    '@media(max-width:700px){body{padding:0}.sheet{min-height:0;margin:0 0 12px;padding:22px}.cover{min-height:85vh}.cover-stats{grid-template-columns:1fr 1fr}.cover-stat:nth-child(2){border-right:0}.cover-stat:nth-child(-n+2){border-bottom:1px solid var(--line)}.index-list,.reference-grid{grid-template-columns:1fr}h1{font-size:34px}}' +
    '@media print{body{padding:0;background:#fff}.sheet{max-width:none;margin:0;padding:0;box-shadow:none}.cover{min-height:255mm;break-after:page}.map-page{break-after:page}.print-control{display:none}a{color:inherit;text-decoration:none}}' +
    '</style></head><body><button class="print-control" type="button" onclick="window.print()">Imprimir / guardar como PDF</button>' +
    '<main><section class="sheet cover"><div><div class="topline"><strong>MORENO · INTELIGENCIA TERRITORIAL</strong><span>Documento de trabajo · ' + dateLabel + '</span></div>' +
    '<p class="eyebrow" style="margin-top:26px">Lectura territorial · ' + total + ' referencias seleccionadas</p><h1>' + title + '</h1>' +
    '<p class="cover-copy">Una síntesis de las referencias visibles en el Mapa IA para ordenar una conversación de prospección. La selección no constituye un inventario de inmuebles ni acredita disponibilidad.</p></div>' +
    '<div><div class="cover-stats"><div class="cover-stat"><strong>' + String(Number(counts.localities) || 0).padStart(2, "0") + '</strong><span>Localidades</span></div>' +
    '<div class="cover-stat"><strong>' + String(Number(counts.documented) || 0).padStart(2, "0") + '</strong><span>Contextos con fuente</span></div>' +
    '<div class="cover-stat"><strong>' + String(Number(counts.hypotheses) || 0).padStart(2, "0") + '</strong><span>Hipótesis</span></div>' +
    '<div class="cover-stat"><strong>' + String(Number(counts.published) || 0).padStart(2, "0") + '</strong><span>Avisos / proyectos</span></div>' +
     '<div class="cover-stat"><strong>' + total + '</strong><span>Referencias incluidas</span></div></div>' +
    '<p class="eyebrow" style="margin-top:18px">Criterios de selección</p><ul class="filter-list">' + filterMarkup + '</ul>' +
    '<footer>ERICA M. ACOSTA · MORENO · Generado localmente desde la vista filtrada del inventario.</footer></div></section>' +
    '<section class="sheet map-page"><p class="eyebrow">Lámina de conjunto · esquema sin escala</p><h2 class="section-title">Distribución relativa de las referencias.</h2>' +
    '<p class="muted">Los puntos se ordenan únicamente por sus coordenadas aproximadas. El esquema no contiene cartografía base, límites municipales, calles ni geometrías parcelarias.</p>' +
    diagram +
    '<div class="diagram-legend"><span><i class="legend-mark legend-circle"></i> Localidad</span><span><i class="legend-mark"></i> Contexto con fuente</span><span><i class="legend-mark legend-diamond"></i> Hipótesis</span><span><i class="legend-mark legend-published"></i> Publicación</span></div>' +
    '<h2 class="section-title">Índice de referencias.</h2><ol class="index-list">' + indexMarkup + '</ol>' +
    '<div class="caution"><strong>Alcance de esta lámina</strong><ul><li>Es un esquema relativo, no un mapa oficial ni un plano a escala.</li><li>Los números identifican las referencias del índice; no representan parcelas ni predios disponibles.</li><li>Las coordenadas no sustituyen la individualización catastral ni la consulta de normativa vigente.</li></ul></div></section>' +
    '<section class="sheet"><p class="eyebrow">Fichas de referencia · ' + total + ' registros</p><h2 class="section-title">Evidencia, estado y próximos pasos.</h2>' +
    referenceMarkup +
    '<div class="caution"><strong>Advertencias de uso</strong><ul>' + disclaimerMarkup + '</ul></div>' +
    '<footer>Documento de trabajo de MORENO · Las fuentes externas deben consultarse en origen y contrastarse antes de cualquier decisión o presentación como antecedente de una operación.</footer></section></main></body></html>';
}



function initResponsiveDisclosures(doc) {
  const view = doc && doc.defaultView;
  if (!view || typeof view.matchMedia !== "function") return;
  const media = view.matchMedia("(max-width: 760px)");
  const disclosures = Array.from(doc.querySelectorAll("details[data-mobile-collapsible]"));
  if (!disclosures.length) return;
  const mobileStates = new WeakMap();

  disclosures.forEach(disclosure => {
    const summary = disclosure.querySelector("summary");
    if (summary) {
      summary.addEventListener("click", () => {
        if (media.matches) mobileStates.set(disclosure, !disclosure.open);
      });
    }
  });

  const applyViewportDefault = isMobile => {
    disclosures.forEach(disclosure => {
      if (!isMobile) disclosure.open = true;
      else disclosure.open = mobileStates.has(disclosure) ? mobileStates.get(disclosure) : false;
    });
  };

  applyViewportDefault(media.matches);
  if (typeof media.addEventListener === "function") {
    media.addEventListener("change", event => applyViewportDefault(event.matches));
  } else if (typeof media.addListener === "function") {
    media.addListener(event => applyViewportDefault(event.matches));
  }
}

function initMapPage(doc) {
  const mapElement = doc.getElementById("map");
  if (!mapElement) return;
  initResponsiveDisclosures(doc);

  const statusElement = doc.getElementById("map-status");
  const boundaryElement = doc.getElementById("boundary-status");
  const searchInput = doc.getElementById("search");
  const categoryInput = doc.getElementById("category");
  const kindInput = doc.getElementById("kind-filter");
  const evidenceInput = doc.getElementById("evidence-filter");
  const shareViewButton = doc.getElementById("share-map-view");
  const shareViewStatus = doc.getElementById("map-share-status");
  const shareFallbackWrap = doc.getElementById("map-share-fallback-wrap");
  const shareFallbackInput = doc.getElementById("map-share-url");
  const dossierExportButton = doc.getElementById("export-dossier");
  const dossierStatusElement = doc.getElementById("dossier-status");
  const localityList = doc.getElementById("locality-list");
  const opportunityList = doc.getElementById("opportunity-list");
  const publishedList = doc.getElementById("published-list");
  const exportButton = doc.getElementById("export-csv");
  const geoJsonExportButton = doc.getElementById("export-geojson");
  const reviewExportButton = doc.getElementById("export-review");
  const reviewImportButton = doc.getElementById("import-review");
  const reviewImportInput = doc.getElementById("import-review-file");
  const reviewClearButton = doc.getElementById("clear-review");
  const reviewStatusElement = doc.getElementById("review-status");
  const atlasCounts = {
    localities: doc.getElementById("atlas-localities-count"),
    documented: doc.getElementById("atlas-documented-count"),
    hypotheses: doc.getElementById("atlas-hypotheses-count"),
    published: doc.getElementById("atlas-published-count"),
    total: doc.getElementById("atlas-total-count"),
    status: doc.getElementById("atlas-index-status"),
    summary: doc.getElementById("atlas-index-summary")
  };
  const markers = new Map();
  let map = null;
  let visibleItems = all;
  let reviewStorage = null;
  try {
    reviewStorage = doc.defaultView ? doc.defaultView.localStorage : null;
  } catch (error) {
    reviewStorage = null;
  }
  let reviewState = readReviewState(reviewStorage, opportunities);
  let reviewImportSequence = 0;
  reviewStatusElement.textContent = reviewStorage
    ? "Las marcas se guardan en este navegador; no se envían al servidor."
    : "El almacenamiento local no está disponible; exportá la bitácora para conservar las marcas mientras trabajás.";
  const initialViewState = parseMapViewState(
    doc.defaultView && doc.defaultView.location ? doc.defaultView.location.search : "",
    all
  );
  searchInput.value = initialViewState.query;
  categoryInput.value = initialViewState.category;
  kindInput.value = initialViewState.kind;
  evidenceInput.value = initialViewState.evidence;
  let selectedReferenceId = initialViewState.ref;
  let userHasNavigated = false;

  let staticFallbackActive = false;

  function renderStaticFallback(items) {
    const visible = Array.isArray(items) ? items : all;
    const container = doc.createElement("section");
    container.className = "map-static-fallback";
    container.setAttribute("aria-label", "Esquema territorial alternativo");

    const heading = doc.createElement("header");
    heading.className = "map-static-fallback-head";
    const eyebrow = doc.createElement("span");
    eyebrow.className = "map-static-kicker";
    eyebrow.textContent = "ESQUEMA TERRITORIAL / REFERENCIAS APROXIMADAS";
    const title = doc.createElement("h3");
    title.textContent = "Moreno, en relación.";
    const explanation = doc.createElement("p");
    explanation.className = "map-static-message";
    explanation.textContent = fallbackMessage;
    heading.append(eyebrow, title, explanation);

    const svgNamespace = "http://www.w3.org/2000/svg";
    const svg = doc.createElementNS(svgNamespace, "svg");
    svg.setAttribute("class", "map-static-diagram");
    svg.setAttribute("viewBox", "0 0 960 420");
    svg.setAttribute("role", "img");
    svg.setAttribute("aria-labelledby", "map-static-title map-static-desc");
    const svgTitle = doc.createElementNS(svgNamespace, "title");
    svgTitle.setAttribute("id", "map-static-title");
    svgTitle.textContent = "Distribución relativa de las referencias con coordenadas disponibles";
    const svgDescription = doc.createElementNS(svgNamespace, "desc");
    svgDescription.setAttribute("id", "map-static-desc");
    svgDescription.textContent = "Esquema construido con coordenadas aproximadas del inventario. Solo muestra referencias con coordenadas disponibles; las publicaciones sin coincidencia inequívoca en Georef permanecen en el índice sin punto. No es cartografía oficial, no tiene escala y no representa calles, límites ni parcelas.";
    const background = doc.createElementNS(svgNamespace, "rect");
    background.setAttribute("class", "map-static-frame");
    background.setAttribute("x", "1");
    background.setAttribute("y", "1");
    background.setAttribute("width", "958");
    background.setAttribute("height", "418");
    const grid = doc.createElementNS(svgNamespace, "path");
    grid.setAttribute("class", "map-static-grid");
    grid.setAttribute("d", "M240 1V419M480 1V419M720 1V419M1 105H959M1 210H959M1 315H959");
    const markerLayer = doc.createElementNS(svgNamespace, "g");
    markerLayer.setAttribute("class", "map-static-markers");

    const positioned = all.filter(hasCoordinates);
    const longitudes = positioned.map(item => Number(item.lng));
    const latitudes = positioned.map(item => Number(item.lat));
    const minLng = Math.min(...longitudes);
    const maxLng = Math.max(...longitudes);
    const minLat = Math.min(...latitudes);
    const maxLat = Math.max(...latitudes);
    const lngRange = Math.max(maxLng - minLng, 0.0001);
    const latRange = Math.max(maxLat - minLat, 0.0001);

    visible.filter(hasCoordinates).forEach(item => {
      const x = 64 + ((Number(item.lng) - minLng) / lngRange) * 832;
      const y = 42 + ((maxLat - Number(item.lat)) / latRange) * 330;
      const group = doc.createElementNS(svgNamespace, "g");
      const markerClass = item.type === "locality"
        ? "map-static-marker map-static-marker-locality"
        : (item.type === "published"
          ? "map-static-marker map-static-marker-published"
          : (item.stage === "hypothesis"
            ? "map-static-marker map-static-marker-hypothesis"
            : "map-static-marker map-static-marker-documented"));
      group.setAttribute("class", markerClass);
      group.setAttribute("data-static-map-reference", item.id);
      group.classList.toggle("is-selected", selectedReferenceId === item.id);

      const markerTitle = doc.createElementNS(svgNamespace, "title");
      const index = all.findIndex(entry => entry.id === item.id) + 1;
      const number = String(index).padStart(2, "0");
      markerTitle.textContent = number + " · " + item.name;
      group.append(markerTitle);

      if (item.type === "locality") {
        const shape = doc.createElementNS(svgNamespace, "circle");
        shape.setAttribute("cx", String(x));
        shape.setAttribute("cy", String(y));
        shape.setAttribute("r", "11");
        group.append(shape);
      } else if (item.type === "published") {
        const shape = doc.createElementNS(svgNamespace, "path");
        shape.setAttribute("d", "M " + x + " " + (y - 13) + " L " + (x + 12) + " " + (y - 6) + " L " + (x + 12) + " " + (y + 6) + " L " + x + " " + (y + 13) + " L " + (x - 12) + " " + (y + 6) + " L " + (x - 12) + " " + (y - 6) + " Z");
        group.append(shape);
      } else if (item.stage === "hypothesis") {
        const shape = doc.createElementNS(svgNamespace, "path");
        shape.setAttribute("d", "M " + x + " " + (y - 14) + " L " + (x + 14) + " " + y + " L " + x + " " + (y + 14) + " L " + (x - 14) + " " + y + " Z");
        group.append(shape);
      } else {
        const shape = doc.createElementNS(svgNamespace, "rect");
        shape.setAttribute("x", String(x - 10));
        shape.setAttribute("y", String(y - 10));
        shape.setAttribute("width", "20");
        shape.setAttribute("height", "20");
        group.append(shape);
      }

      const label = doc.createElementNS(svgNamespace, "text");
      label.setAttribute("x", String(x));
      label.setAttribute("y", String(y + 4));
      label.setAttribute("text-anchor", "middle");
      label.textContent = number;
      group.append(label);
      markerLayer.append(group);
    });

    const north = doc.createElementNS(svgNamespace, "text");
    north.setAttribute("class", "map-static-direction");
    north.setAttribute("x", "930");
    north.setAttribute("y", "26");
    north.setAttribute("text-anchor", "end");
    north.textContent = "NORTE ↑";
    svg.append(svgTitle, svgDescription, background, grid, markerLayer, north);

    const indexHeading = doc.createElement("h4");
    indexHeading.className = "map-static-index-title";
    indexHeading.textContent = "Referencias visibles · seleccioná una para abrir su ficha";
    const index = doc.createElement("ol");
    index.className = "map-static-index";
    if (!visible.length) {
      const empty = doc.createElement("li");
      empty.className = "map-static-empty";
      empty.textContent = "No hay referencias que coincidan con los filtros actuales.";
      index.append(empty);
    }

    visible.forEach(item => {
      const listItem = doc.createElement("li");
      const button = doc.createElement("button");
      button.type = "button";
      button.className = "map-static-index-button";
      button.dataset.fallbackReference = item.id;
      button.setAttribute("aria-pressed", String(selectedReferenceId === item.id));
      const number = doc.createElement("span");
      number.className = "map-static-index-number";
      number.textContent = String(all.findIndex(entry => entry.id === item.id) + 1).padStart(2, "0");
      const name = doc.createElement("strong");
      name.textContent = item.name;
      const meta = doc.createElement("small");
      meta.textContent = item.type === "locality"
        ? "Localidad · referencia territorial"
        : (item.type === "published"
          ? item.recordType + " · " + (hasCoordinates(item) ? "Georreferenciada por Georef" : "Geolocalización pendiente")
          : ((item.stage === "hypothesis" ? "Hipótesis de prospección" : "Contexto con fuente pública") +
            " · " + (kindLabel[item.kind] || "Tesis territorial")));
      button.append(number, name, meta);
      button.setAttribute("aria-label", "Seleccionar referencia " + item.name);
      button.addEventListener("click", () => setActiveReference(item, { reveal: true, scroll: true }));
      listItem.append(button);
      index.append(listItem);
    });

    const note = doc.createElement("p");
    note.className = "map-static-note";
    note.textContent = "Este esquema conserva la relación espacial aproximada de las fichas con coordenadas disponibles sin depender de teselas externas; no es cartografía oficial, no tiene escala y no representa calles, límites administrativos ni parcelas. Las publicaciones sin coincidencia inequívoca en Georef permanecen en el índice con su ubicación textual y geolocalización pendiente, sin punto asignado.";
    container.append(heading, svg, indexHeading, index, note);
    mapElement.replaceChildren(container);
  }

  let fallbackMessage = "La cartografía interactiva no está disponible. Se conserva el inventario en un esquema local.";
  function showFallback(message) {
    staticFallbackActive = true;
    mapElement.classList.add("is-static-fallback");
    fallbackMessage = String(message || fallbackMessage);
    markers.forEach(marker => {
      try { marker.remove(); } catch (error) {}
    });
    markers.clear();
    const activeMap = map;
    map = null;
    if (activeMap) {
      try { activeMap.remove(); } catch (error) {}
    }
    renderStaticFallback(visibleItems);
    statusElement.textContent = "Esquema territorial alternativo · fichas de investigación activas";
    boundaryElement.textContent = "Límite municipal: no representado en el esquema";
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
      box.append(contactLinkNode(item, "map-contact-link"));
      return box;
    }
    if (item.type === "published") {
      const label = doc.createElement("small");
      label.textContent = item.recordType + " · " + item.locality;
      box.prepend(label);
      addLine("Ubicación publicada:", item.address);
      addLine("Precio publicado:", item.price);
      addLine("Superficie:", item.landSurfaceM2 != null ? item.landSurfaceM2 + " m² de terreno" : item.surfaceNote);
      addLine("Anunciante:", item.agency);
      addLine("Contacto público:", item.contact);
      addLine("Verificación:", item.verificationStatus);
      addLine("Geolocalización:", item.geolocationStatus);
      const sourceLink = doc.createElement("a");
      sourceLink.href = item.source;
      sourceLink.target = "_blank";
      sourceLink.rel = "noopener noreferrer";
      sourceLink.textContent = "Abrir aviso original ↗";
      box.append(sourceLink);
      box.append(contactLinkNode(item, "map-contact-link"));
      const caution = doc.createElement("p");
      caution.textContent = "Publicación de terceros. No acredita stock, disponibilidad, dominio ni condiciones vigentes.";
      box.append(caution);
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
    const shareLink = doc.createElement("a");
    shareLink.href = buildReferenceUrl(doc.defaultView.location.href, item.id);
    shareLink.target = "_blank";
    shareLink.rel = "noopener noreferrer";
    shareLink.textContent = "Abrir ficha compartible ↗";
    box.append(shareLink, contactLinkNode(item, "map-contact-link"));
    return box;
  }

  function contactLinkNode(item, className) {
    const link = doc.createElement("a");
    link.className = className;
    link.href = buildOpportunityContactUrl(doc.baseURI || doc.defaultView.location.href, item);
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = referenceContactLabel(item);
    link.setAttribute("aria-label", referenceContactLabel(item) + " · " + item.name);
    return link;
  }

  function addMapMarker(item) {
    if (!map || !hasCoordinates(item) || markers.has(item.id)) return null;
    const element = doc.createElement("button");
    element.type = "button";
    element.className = "map-pin " + (item.type === "locality"
      ? "map-pin-locality"
      : (item.type === "published" ? "map-pin-published" :
        (item.stage === "hypothesis" ? "map-pin-hypothesis" : "map-pin-documented")));
    element.setAttribute("aria-label", "Ver " + item.name + " en el mapa");
    element.title = item.name;
    const popup = new maplibregl.Popup({ offset: 16, maxWidth: "340px" }).setDOMContent(popupNode(item));
    element.addEventListener("click", () => {
      setActiveReference(item, { reveal: true, scroll: true });
    });
    const marker = new maplibregl.Marker({ element, anchor: "center" })
      .setLngLat([Number(item.lng), Number(item.lat)])
      .setPopup(popup)
      .addTo(map);
    markers.set(item.id, marker);
    return marker;
  }

  function geocodePublishedAddresses() {
    const view = doc.defaultView;
    const fetcher = view && view.fetch;
    if (typeof fetcher !== "function") {
      publishedProperties.forEach(item => {
        item.geolocationStatus = "Pendiente: el navegador no habilitó la consulta de Georef.";
      });
      render();
      return;
    }
    const queries = new Map();
    publishedProperties.forEach(item => {
      const query = item.geocodeQuery || item.address;
      if (!query || queries.has(query)) return;
      const params = new URLSearchParams({
        direccion: query,
        provincia: "Buenos Aires",
        departamento: "Moreno",
        max: "5"
      });
      const url = "https://apis.datos.gob.ar/georef/api/v2.0/direcciones?" + params.toString();
      const request = fetcher.call(view, url, { headers: { Accept: "application/json" } })
        .then(response => {
          if (!response.ok) throw new Error("Georef no disponible");
          return response.json();
        })
        .then(data => {
          const sample = publishedProperties.find(candidate => (candidate.geocodeQuery || candidate.address) === query) || {};
          const matches = (Array.isArray(data.direcciones) ? data.direcciones : []).filter(entry =>
            entry && entry.ubicacion && georefAddressMatches(sample, entry)
          );
          if (matches.length !== 1) return null;
          const point = matches[0].ubicacion;
          const lat = Number(point.lat);
          const lng = Number(point.lon);
          return Number.isFinite(lat) && Number.isFinite(lng)
            ? { lat, lng, nomenclatura: matches[0].nomenclatura || "" }
            : null;
        })
        .catch(() => null);
      queries.set(query, request);
    });
    Promise.all(Array.from(queries.entries()).map(async ([query, request]) => [query, await request]))
      .then(results => {
        const resolved = new Map(results);
        publishedProperties.forEach(item => {
          const point = resolved.get(item.geocodeQuery || item.address);
          if (point) {
            item.lat = point.lat;
            item.lng = point.lng;
            item.geocodeReference = point.nomenclatura;
            item.geolocationStatus = "Georreferencia aproximada de dirección obtenida mediante Georef; no parcelaria.";
          } else {
            item.lat = null;
            item.lng = null;
            item.geolocationStatus = "Pendiente: Georef no devolvió una coincidencia inequívoca para la dirección publicada.";
          }
          addMapMarker(item);
        });
        render();
        const selected = all.find(item => item.id === selectedReferenceId);
        if (selected && markers.has(selected.id) && !userHasNavigated) focusItem(selected);
        const located = publishedProperties.filter(hasCoordinates).length;
        statusElement.textContent = located + " de " + publishedProperties.length +
          " publicaciones georreferenciadas por dirección; el resto conserva ubicación textual pendiente.";
      })
      .catch(() => {
        publishedProperties.forEach(item => {
          item.geolocationStatus = "Pendiente: no fue posible consultar Georef en esta sesión.";
        });
        render();
      });
  }

  function currentMapViewState(referenceId) {
    return {
      query: searchInput.value,
      category: categoryInput.value,
      kind: kindInput.value,
      evidence: evidenceInput.value,
      ref: typeof referenceId === "undefined" ? selectedReferenceId : referenceId
    };
  }

  function updateShareUrl(referenceId) {
    const view = doc.defaultView;
    if (!view || !view.location || !view.history || typeof view.history.replaceState !== "function") return "";
    const url = buildMapViewUrl(view.location.href, currentMapViewState(referenceId), all);
    view.history.replaceState(null, "", url);
    return url;
  }

  function showManualShareUrl(url) {
    shareFallbackWrap.hidden = false;
    shareFallbackInput.value = url;
    shareFallbackInput.focus();
    shareFallbackInput.select();
    shareViewStatus.textContent = "Copiá el enlace seleccionado para compartir esta vista.";
  }

  function copyShareUrl(url) {
    const view = doc.defaultView;
    const clipboard = view && view.navigator && view.navigator.clipboard;
    if (clipboard && typeof clipboard.writeText === "function") {
      clipboard.writeText(url).then(() => {
        shareFallbackWrap.hidden = true;
        shareViewStatus.textContent = "Enlace de la vista copiado.";
      }).catch(() => showManualShareUrl(url));
      return;
    }
    showManualShareUrl(url);
  }

  function shareCurrentView() {
    const view = doc.defaultView;
    const url = updateShareUrl();
    if (!view || !url) return;
    const shareData = {
      title: "Mapa IA de Moreno · MORENO",
      text: "Vista territorial filtrada. Las referencias no acreditan disponibilidad inmobiliaria.",
      url
    };
    if (view.navigator && typeof view.navigator.share === "function") {
      try {
        view.navigator.share(shareData).then(() => {
          shareViewStatus.textContent = "Vista compartida.";
        }).catch(error => {
          if (!error || error.name !== "AbortError") copyShareUrl(url);
        });
        return;
      } catch (error) {
        copyShareUrl(url);
        return;
      }
    }
    copyShareUrl(url);
  }

  function setActiveReference(item, options) {
    const settings = options || {};
    selectedReferenceId = item.id;
    updateShareUrl(item.id);
    markers.forEach((marker, id) => {
      marker.getElement().classList.toggle("is-selected", id === item.id);
    });
    if (staticFallbackActive) {
      mapElement.querySelectorAll("[data-static-map-reference]").forEach(marker => {
        marker.classList.toggle("is-selected", marker.getAttribute("data-static-map-reference") === item.id);
      });
      mapElement.querySelectorAll("[data-fallback-reference]").forEach(button => {
        button.setAttribute("aria-pressed", String(button.dataset.fallbackReference === item.id));
      });
    }
    [localityList, opportunityList, publishedList].forEach(list => {
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
    const camera = { center: [item.lng, item.lat], zoom: 14 };
    if (prefersReducedMotion(doc.defaultView)) map.jumpTo(camera);
    else map.flyTo({ ...camera, essential: true });
    const popup = marker.getPopup();
    if (popup && !popup.isOpen()) marker.togglePopup();
  }


  function updateReviewProgress(progressElement, item) {
    const summary = getReviewSummary(reviewState, item.id);
    progressElement.textContent = summary.completed + " de " + summary.total + " revisiones documentadas";
  }

  function reviewPanelNode(item) {
    const panel = doc.createElement("section");
    panel.className = "map-review-panel";
    const title = doc.createElement("h4");
    title.textContent = "Bitácora de verificación";
    const intro = doc.createElement("p");
    intro.className = "map-review-intro";
    intro.textContent = "Para marcar una revisión como registrada, completá una fuente o documento y la fecha de consulta. No ingreses datos personales ni documentación confidencial.";
    const progress = doc.createElement("p");
    progress.className = "map-review-progress";
    progress.setAttribute("role", "status");
    progress.setAttribute("aria-live", "polite");
    updateReviewProgress(progress, item);
    const fieldset = doc.createElement("fieldset");
    fieldset.className = "map-review-checklist";
    const legend = doc.createElement("legend");
    legend.textContent = "Control interno · evidencia y fecha";
    fieldset.append(legend);

    reviewTasks.forEach(task => {
      const saved = reviewState[item.id] && reviewState[item.id][task.id]
        ? reviewState[item.id][task.id]
        : {};
      const row = doc.createElement("div");
      row.className = "map-review-task";
      const checkLabel = doc.createElement("label");
      checkLabel.className = "map-review-check-label";
      const checkbox = doc.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = saved.completed === true;
      checkbox.disabled = !checkbox.checked &&
        !(String(saved.source_document || "").trim().length >= 4 && isValidReviewDate(saved.consulted_at));
      checkbox.setAttribute("aria-label", task.label + " · " + item.name);
      const taskText = doc.createElement("span");
      taskText.textContent = task.label;
      checkLabel.append(checkbox, taskText);

      const fields = doc.createElement("div");
      fields.className = "map-review-fields";
      const sourceLabel = doc.createElement("label");
      sourceLabel.className = "map-review-field";
      const sourceCaption = doc.createElement("span");
      sourceCaption.textContent = "Fuente, documento o folio";
      const sourceInput = doc.createElement("input");
      sourceInput.type = "text";
      sourceInput.maxLength = 240;
      sourceInput.autocomplete = "off";
      sourceInput.placeholder = "Organismo, enlace o identificación del documento";
      sourceInput.value = saved.source_document || "";
      sourceInput.setAttribute("aria-label", "Fuente o documento para " + task.label + " · " + item.name);
      sourceLabel.append(sourceCaption, sourceInput);

      const dateLabel = doc.createElement("label");
      dateLabel.className = "map-review-field map-review-date";
      const dateCaption = doc.createElement("span");
      dateCaption.textContent = "Fecha de consulta";
      const dateInput = doc.createElement("input");
      dateInput.type = "date";
      dateInput.value = saved.consulted_at || "";
      dateInput.setAttribute("aria-label", "Fecha de consulta para " + task.label + " · " + item.name);
      dateLabel.append(dateCaption, dateInput);

      const noteLabel = doc.createElement("label");
      noteLabel.className = "map-review-field map-review-note";
      const noteCaption = doc.createElement("span");
      noteCaption.textContent = "Observación breve (opcional)";
      const noteInput = doc.createElement("textarea");
      noteInput.rows = 2;
      noteInput.maxLength = 500;
      noteInput.value = saved.note || "";
      noteInput.placeholder = "Alcance, artículo, folio o punto pendiente; sin datos personales.";
      noteInput.setAttribute("aria-label", "Observación para " + task.label + " · " + item.name);
      noteLabel.append(noteCaption, noteInput);

      const help = doc.createElement("small");
      help.className = "map-review-help";
      help.textContent = "La revisión cuenta como documentada cuando tiene una fuente de al menos 4 caracteres y una fecha válida.";
      const legacyNotice = doc.createElement("small");
      legacyNotice.className = "map-review-legacy";
      legacyNotice.textContent = "Marca anterior recuperada: completá fuente y fecha para volver a registrarla.";
      legacyNotice.hidden = saved.legacy_marked !== true;

      function persistTaskRecord() {
        const details = {
          source_document: sourceInput.value,
          consulted_at: dateInput.value,
          note: noteInput.value
        };
        const eligible = details.source_document.trim().length >= 4 && isValidReviewDate(details.consulted_at);
        if (!eligible && checkbox.checked) checkbox.checked = false;
        checkbox.disabled = !eligible && !checkbox.checked;
        reviewState = updateReviewState(reviewState, item.id, task.id, checkbox.checked, opportunities, details);
        const current = reviewState[item.id] && reviewState[item.id][task.id];
        legacyNotice.hidden = !(current && current.legacy_marked === true);
        updateReviewProgress(progress, item);
        const savedLocally = writeReviewState(reviewStorage, reviewState, opportunities);
        reviewStatusElement.textContent = savedLocally
          ? "Bitácora actualizada en este navegador; fuente y fecha quedan asociadas a cada revisión."
          : "No se pudo guardar localmente; descargá la bitácora JSON antes de cerrar.";
      }

      checkbox.addEventListener("change", persistTaskRecord);
      sourceInput.addEventListener("input", persistTaskRecord);
      dateInput.addEventListener("change", persistTaskRecord);
      noteInput.addEventListener("input", persistTaskRecord);
      fields.append(sourceLabel, dateLabel, noteLabel, help, legacyNotice);
      row.append(checkLabel, fields);
      fieldset.append(row);
    });
    panel.append(title, intro, progress, fieldset);
    return panel;
  }

  function makeCards(items, target) {
    target.replaceChildren();
    items.forEach(item => {
      const card = doc.createElement("details");
      card.className = "map-item";
      card.dataset.mapItem = item.id;
      if (selectedReferenceId === item.id) {
        card.classList.add("is-active");
        card.open = true;
      }
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
      const actions = doc.createElement("div");
      actions.className = "map-item-actions";
      actions.append(contactLinkNode(item, "map-contact-link map-contact-primary"));

      if (item.type === "opportunity") {
        const briefButton = doc.createElement("button");
        briefButton.type = "button";
        briefButton.className = "map-brief-button";
        briefButton.textContent = "Descargar ficha editorial ↧";
        briefButton.setAttribute("aria-label", "Descargar ficha editorial de " + item.name);
        briefButton.addEventListener("click", () => downloadTerritorialBrief(item));
        actions.append(briefButton);
      }

      const shareLink = doc.createElement("a");
      shareLink.className = "map-share-link";
      shareLink.href = buildReferenceUrl(doc.defaultView.location.href, item.id);
      shareLink.target = "_blank";
      shareLink.rel = "noopener noreferrer";
      shareLink.setAttribute("aria-label", "Abrir enlace directo a " + item.name + " en una pestaña nueva");
      shareLink.textContent = "Abrir ficha compartible ↗";
      actions.append(shareLink);

      if (map) {
        const focusButton = doc.createElement("button");
        focusButton.type = "button";
        focusButton.className = "map-focus-button";
        focusButton.textContent = "Ubicar en el mapa";
        focusButton.setAttribute("aria-label", "Centrar el mapa en " + item.name);
        focusButton.addEventListener("click", () => focusItem(item));
        actions.append(focusButton);
      }
      body.append(actions);

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
        body.append(reviewPanelNode(item));
      }

      card.append(body);
      target.append(card);
    });
  }

  function makePublishedCards(items, target) {
    if (!target) return;
    target.replaceChildren();
    items.forEach(item => {
      const card = doc.createElement("details");
      card.className = "map-item map-item-published";
      card.dataset.mapItem = item.id;
      if (selectedReferenceId === item.id) { card.classList.add("is-active"); card.open = true; }
      const summary = doc.createElement("summary");
      summary.addEventListener("click", () => setActiveReference(item));
      const title = doc.createElement("strong");
      title.textContent = item.name;
      const meta = doc.createElement("span");
      meta.textContent = item.recordType + " · " + item.locality + " · " + item.verificationStatus;
      summary.append(title, meta);
      card.append(summary);
      const body = doc.createElement("div");
      body.className = "map-item-body";
      const actions = doc.createElement("div");
      actions.className = "map-item-actions";
      const sourceLink = doc.createElement("a");
      sourceLink.className = "map-source-link map-source-primary";
      sourceLink.href = item.source;
      sourceLink.target = "_blank";
      sourceLink.rel = "noopener noreferrer";
      sourceLink.textContent = "Abrir aviso original ↗";
      actions.append(sourceLink);
      actions.append(contactLinkNode(item, "map-contact-link"));
      const shareLink = doc.createElement("a");
      shareLink.className = "map-share-link";
      shareLink.href = buildReferenceUrl(doc.defaultView.location.href, item.id);
      shareLink.target = "_blank";
      shareLink.rel = "noopener noreferrer";
      shareLink.textContent = "Compartir ficha MORENO ↗";
      actions.append(shareLink);
      if (markers.has(item.id)) {
        const focusButton = doc.createElement("button");
        focusButton.type = "button";
        focusButton.className = "map-focus-button";
        focusButton.textContent = "Ubicar en el mapa";
        focusButton.addEventListener("click", () => focusItem(item));
        actions.append(focusButton);
      } else {
        const pending = doc.createElement("span");
        pending.className = "map-published-pending";
        pending.textContent = "Ubicación textual · geolocalización pendiente";
        actions.append(pending);
      }
      if (item.phone) {
        const phoneLink = doc.createElement("a");
        phoneLink.className = "map-contact-link";
        phoneLink.href = "tel:" + item.phone.replace(/[^+\d]/g, "");
        phoneLink.textContent = "Llamar al anunciante ↗";
        actions.append(phoneLink);
      }
      body.append(actions);
      const addDetail = (label, value) => {
        if (value == null || value === "") return;
        const paragraph = doc.createElement("p");
        const heading = doc.createElement("strong");
        heading.textContent = label + " ";
        paragraph.append(heading, doc.createTextNode(String(value)));
        body.append(paragraph);
      };
      addDetail("Tipo:", item.recordType);
      addDetail("Localidad:", item.locality);
      addDetail("Ubicación publicada:", item.address);
      addDetail("Precio publicado:", item.price);
      addDetail("Superficie de terreno:", item.landSurfaceM2 != null ? item.landSurfaceM2 + " m²" : item.surfaceNote);
      addDetail("Superficie cubierta:", item.coveredSurfaceM2 != null ? item.coveredSurfaceM2 + " m²" : "");
      addDetail("Fecha del aviso:", item.publicationDate || "No informada");
      addDetail("Inmobiliaria / desarrolladora:", item.agency);
      addDetail("Contacto público:", item.contact);
      addDetail("Estado de verificación:", item.verificationStatus);
      addDetail("Disponibilidad:", item.availabilityStatus);
      addDetail("Geolocalización:", item.geolocationStatus);
      addDetail("Observaciones:", item.observations);
      card.append(body);
      target.append(card);
    });
  }

  function updateAtlasIndex(items) {
    const counts = countInventory(items);
    if (atlasCounts.localities) atlasCounts.localities.textContent = String(counts.localities).padStart(2, "0");
    if (atlasCounts.documented) atlasCounts.documented.textContent = String(counts.documented).padStart(2, "0");
    if (atlasCounts.hypotheses) atlasCounts.hypotheses.textContent = String(counts.hypotheses).padStart(2, "0");
    if (atlasCounts.published) atlasCounts.published.textContent = String(counts.published).padStart(2, "0");
    if (atlasCounts.total) atlasCounts.total.textContent = counts.total + " / " + all.length;
    if (atlasCounts.status) {
      atlasCounts.status.textContent = counts.total + " de " + all.length +
        " referencias visibles · " + counts.localities + " localidades, " +
        counts.documented + " contextos con fuente, " + counts.hypotheses +
        " hipótesis y " + counts.published + " publicaciones.";
    }
    if (atlasCounts.summary) {
      atlasCounts.summary.textContent = counts.total + " referencias · " +
        counts.localities + " localidades · " + counts.documented +
        " contextos con fuente · " + counts.hypotheses + " hipótesis · " +
        counts.published + " avisos y proyectos";
    }
  }

  function render() {
    const shown = filterReferences(all, {
      query: doc.getElementById("search").value,
      category: doc.getElementById("category").value,
      kind: doc.getElementById("kind-filter").value,
      evidence: doc.getElementById("evidence-filter").value
    });
    visibleItems = shown;
    updateAtlasIndex(shown);
    exportButton.disabled = shown.length === 0;
    geoJsonExportButton.disabled = shown.length === 0;
    dossierExportButton.disabled = shown.length === 0;
    reviewExportButton.disabled = !shown.some(item => item.type === "opportunity");
    if (selectedReferenceId && !shown.some(item => item.id === selectedReferenceId)) {
      selectedReferenceId = null;
      updateShareUrl(null);
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
    makePublishedCards(shown.filter(item => item.type === "published"), publishedList);
    if (staticFallbackActive) renderStaticFallback(shown);
    const selectedItem = all.find(item => item.id === selectedReferenceId);
    statusElement.textContent = selectedItem
      ? "Enlace directo · " + selectedItem.name
      : shown.length + " referencias visibles · capa exploratoria";
    updateShareUrl();
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



  function downloadTerritorialDossier() {
    const dossier = buildTerritorialDossier(visibleItems, currentMapViewState(), new Date().toISOString());
    if (!dossier) {
      dossierStatusElement.textContent = "No hay referencias visibles para preparar un dossier.";
      return;
    }
    const content = buildTerritorialDossierHtml(dossier);
    if (!content) {
      dossierStatusElement.textContent = "No se pudo preparar el documento con esta selección.";
      return;
    }
    const view = doc.defaultView;
    const blob = new view.Blob([content], { type: "text/html;charset=utf-8" });
    const url = view.URL.createObjectURL(blob);
    const link = doc.createElement("a");
    link.href = url;
    link.download = dossier.filters.kind === "all"
      ? "moreno-dossier-territorial.html"
      : "moreno-dossier-" + dossier.filters.kind + ".html";
    doc.body.append(link);
    link.click();
    link.remove();
    view.setTimeout(() => view.URL.revokeObjectURL(url), 1500);
    dossierStatusElement.textContent = "Dossier preparado localmente: " + dossier.references.length +
      " referencias. No incluye bitácora, datos del navegador ni expedientes internos.";
  }

  function importReviewFile(file) {
    if (!file) return;
    const requestId = ++reviewImportSequence;
    if (file.size > 1000000) {
      reviewImportInput.value = "";
      reviewStatusElement.removeAttribute("aria-busy");
      reviewStatusElement.textContent = "El archivo supera el límite de 1 MB. Exportá una bitácora más pequeña e intentá nuevamente.";
      return;
    }
    if (typeof file.text !== "function") {
      reviewImportInput.value = "";
      reviewStatusElement.removeAttribute("aria-busy");
      reviewStatusElement.textContent = "Este navegador no permite leer el archivo seleccionado. Podés continuar usando la exportación JSON.";
      return;
    }
    reviewStatusElement.setAttribute("aria-busy", "true");
    reviewStatusElement.textContent = "Leyendo y validando la bitácora JSON…";
    Promise.resolve().then(() => file.text()).then(content => {
      if (requestId !== reviewImportSequence) return;
      const parsed = parseReviewImport(content, opportunities);
      if (!parsed.ok) {
        reviewStatusElement.textContent = parsed.error;
        return;
      }
      const result = mergeReviewStates(reviewState, parsed.state, opportunities);
      reviewState = result.state;
      const saved = writeReviewState(reviewStorage, reviewState, opportunities);
      render();
      const conflictDetails = result.conflicts.slice(0, 3).map(conflict => {
        const reference = opportunities.find(item => item.id === conflict.reference_id);
        const task = reviewTasks.find(item => item.id === conflict.task_id);
        return (reference ? reference.name : conflict.reference_id) + " · " + (task ? task.label : conflict.task_id) + " (" + conflict.fields.join(", ") + ")";
      });
      const conflictText = result.conflicts.length
        ? " Conflictos: " + result.conflicts.length + ". Se conservaron los datos locales en: " + conflictDetails.join("; ") + (result.conflicts.length > conflictDetails.length ? "; y otros." : ".")
        : " No se detectaron conflictos.";
      const ignoredText = parsed.ignoredReferences || parsed.skippedTasks
        ? " Elementos ignorados: " + parsed.ignoredReferences + " referencias y " + parsed.skippedTasks + " tareas desconocidas."
        : "";
      const persistenceText = saved
        ? " Los cambios quedaron guardados en este navegador."
        : " El almacenamiento local no está disponible; los cambios siguen en esta sesión. Exportá la bitácora antes de cerrar.";
      reviewStatusElement.textContent = "Importación revisada: " + result.addedRecords + " registros nuevos y " + result.combinedRecords + " registros combinados." + conflictText + ignoredText + persistenceText;
    }).catch(() => {
      if (requestId !== reviewImportSequence) return;
      reviewStatusElement.textContent = "No se pudo leer el archivo. Verificá que sea un JSON válido y volvé a intentarlo.";
    }).finally(() => {
      if (requestId !== reviewImportSequence) return;
      reviewStatusElement.removeAttribute("aria-busy");
      reviewImportInput.value = "";
    });
  }

  function exportVisibleReview() {
    const visibleOpportunities = visibleItems.filter(item => item.type === "opportunity");
    if (!visibleOpportunities.length) return;
    const content = JSON.stringify(buildReviewExport(reviewState, visibleOpportunities), null, 2);
    const view = doc.defaultView;
    const blob = new view.Blob([content], { type: "application/json;charset=utf-8" });
    const url = view.URL.createObjectURL(blob);
    const link = doc.createElement("a");
    link.href = url;
    link.download = "moreno-mapa-ia-bitacora.json";
    doc.body.append(link);
    link.click();
    link.remove();
    view.setTimeout(() => view.URL.revokeObjectURL(url), 1500);
    reviewStatusElement.textContent = "Bitácora JSON exportada: " + visibleOpportunities.length + " tesis visibles.";
  }


  function downloadTerritorialBrief(item) {
    const brief = buildTerritorialBrief(item);
    if (!brief) return;
    const content = buildTerritorialBriefHtml(brief);
    const view = doc.defaultView;
    const blob = new view.Blob([content], { type: "text/html;charset=utf-8" });
    const url = view.URL.createObjectURL(blob);
    const link = doc.createElement("a");
    link.href = url;
    link.download = "moreno-ficha-prospeccion-" + item.id + ".html";
    doc.body.append(link);
    link.click();
    link.remove();
    view.setTimeout(() => view.URL.revokeObjectURL(url), 1500);
    statusElement.textContent = "Ficha editorial preparada: " + item.name;
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
      const markUserNavigation = () => {
        userHasNavigated = true;
      };
      map.on("dragstart", markUserNavigation);
      map.on("zoomstart", markUserNavigation);
      map.on("rotatestart", markUserNavigation);
      let rasterTileErrors = 0;
      map.on("error", event => {
        if (event && event.sourceId === "osm-raster") {
          rasterTileErrors += 1;
          statusElement.textContent = "Teselas OSM no disponibles · inventario y filtros conservados";
          if (rasterTileErrors >= 4 && !staticFallbackActive) {
            showFallback("La cartografía base no respondió. Se muestra un esquema territorial local con las referencias y sus fichas.");
          }
        }
      });
      map.on("load", () => {
        map.resize();
        all.forEach(addMapMarker);
        geocodePublishedAddresses();

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
            paint: { "fill-color": "#4a4d46", "fill-opacity": 0.055 }
          });
          map.addLayer({
            id: "moreno-boundary-line",
            type: "line",
            source: "moreno-boundary",
            paint: { "line-color": "#444840", "line-width": 2, "line-opacity": 0.82 }
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
          if (!bounds.isEmpty() && shouldFitMunicipalBounds(selectedReferenceId, userHasNavigated)) {
            map.fitBounds(bounds, { padding: 36, maxZoom: 12, duration: 0 });
          }
          boundaryElement.textContent = "Límite municipal: cargado desde Georef";
        }).catch(error => {
          boundaryElement.textContent = "Límite municipal: no disponible ahora";
          console.info("Límite municipal no cargado; el mapa continúa disponible.", error);
        });
        render();
        const sharedItem = all.find(item => item.id === selectedReferenceId);
        if (sharedItem) focusItem(sharedItem);
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
  reviewExportButton.hidden = false;
  reviewExportButton.addEventListener("click", exportVisibleReview);
  reviewImportButton.hidden = false;
  reviewImportButton.addEventListener("click", () => reviewImportInput.click());
  reviewImportInput.addEventListener("change", event => importReviewFile(event.target.files && event.target.files[0]));
  if (reviewClearButton) {
    reviewClearButton.addEventListener("click", () => {
      const view = doc.defaultView;
      if (view && typeof view.confirm === "function" &&
          !view.confirm("¿Borrar la bitácora guardada en este navegador? Las copias JSON descargadas no se eliminarán.")) return;
      reviewImportSequence += 1;
      reviewStatusElement.removeAttribute("aria-busy");
      reviewImportInput.value = "";
      const cleared = clearReviewState(reviewStorage);
      if (cleared) {
        reviewState = {};
        render();
        reviewStatusElement.textContent = reviewStorage
          ? "Bitácora local borrada de este navegador. Las copias JSON descargadas deben eliminarse por separado."
          : "Bitácora de esta sesión borrada. El almacenamiento local no está disponible.";
      } else {
        reviewState = readReviewState(reviewStorage, opportunities);
        render();
        reviewStatusElement.textContent = "El navegador no permitió borrar toda la bitácora local. Los registros que sigan disponibles se conservaron.";
      }
    });
  }
  searchInput.addEventListener("input", render);
  categoryInput.addEventListener("change", render);
  kindInput.addEventListener("change", render);
  evidenceInput.addEventListener("change", render);
  shareViewButton.addEventListener("click", shareCurrentView);
  dossierExportButton.addEventListener("click", downloadTerritorialDossier);
  doc.getElementById("reset-map").addEventListener("click", () => {
    searchInput.value = "";
    categoryInput.value = "all";
    kindInput.value = "all";
    evidenceInput.value = "all";
    selectedReferenceId = null;
    updateShareUrl(null);
    render();
    if (map) {
      const home = { center: [-58.7914, -34.6508], zoom: 12 };
      if (prefersReducedMotion(doc.defaultView)) map.jumpTo(home);
      else map.flyTo({ ...home, essential: true });
    }
  });
  render();
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    localities, opportunities, publishedProperties, all, countInventory, filterReferences, buildCsv, buildGeoJson, hasCoordinates, georefAddressMatches,
    getSharedReferenceId, normalizeMapViewState, parseMapViewState, buildMapViewUrl,
    buildReferenceUrl, buildOpportunityContactUrl, referenceContactLabel,
    shouldFitMunicipalBounds, prefersReducedMotion, reviewTasks, REVIEW_STORAGE_KEY, LEGACY_REVIEW_STORAGE_KEY,
    isValidReviewDate, normalizeReviewState, readReviewState, writeReviewState, clearReviewState, updateReviewState,
    getReviewSummary, buildReviewExport, parseReviewImport, mergeReviewStates,
    buildTerritorialBrief, buildTerritorialBriefHtml,
    buildTerritorialDossier, buildTerritorialDossierDiagram, buildTerritorialDossierHtml
  };
}
if (typeof document !== "undefined") initMapPage(document);
