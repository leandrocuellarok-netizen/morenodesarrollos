"use strict";

const localities=[
{id:"moreno",name:"Moreno Centro",lat:-34.6397,lng:-58.7898,coordinateSource:"https://www.openstreetmap.org/node/1215663604",coordinateSourceLabel:"OpenStreetMap · nodo de localidad",coordinateCheckedAt:"2026-11-27",coordinatePrecision:"Nodo OSM de localidad; no identifica una parcela ni una dirección particular.",info:"Cabecera administrativa y nodo urbano del partido."},
{id:"paso",name:"Paso del Rey",lat:-34.64333,lng:-58.75219,coordinateSource:"https://www.openstreetmap.org/node/198409601",coordinateSourceLabel:"OpenStreetMap · nodo de localidad",coordinateCheckedAt:"2026-11-27",coordinatePrecision:"Nodo OSM de localidad; no identifica una parcela ni una dirección particular.",info:"Sector este. Observar conectividad, comercio, servicios y relación con Camino de la Ribera."},
{id:"lareja",name:"La Reja",lat:-34.6461,lng:-58.83003,coordinateSource:"https://www.openstreetmap.org/node/1216947756",coordinateSourceLabel:"OpenStreetMap · nodo de localidad",coordinateCheckedAt:"2026-11-27",coordinatePrecision:"Nodo OSM de localidad; no identifica una parcela ni una dirección particular.",info:"Sector oeste. Referencia para estudiar entorno recreativo, residencial y accesos."},
{id:"alvarez",name:"Francisco Álvarez",lat:-34.62373,lng:-58.86038,coordinateSource:"https://www.openstreetmap.org/node/198450676",coordinateSourceLabel:"OpenStreetMap · nodo de localidad",coordinateCheckedAt:"2026-11-27",coordinatePrecision:"Nodo OSM de localidad; no identifica una parcela ni una dirección particular.",info:"Localidad del corredor oeste."},
{id:"trujui",name:"Trujui",lat:-34.5986,lng:-58.75161,coordinateSource:"https://www.openstreetmap.org/node/1216961535",coordinateSourceLabel:"OpenStreetMap · nodo de localidad",coordinateCheckedAt:"2026-11-27",coordinatePrecision:"Nodo OSM de localidad; no identifica una parcela ni una dirección particular.",info:"Sector norte. Área de prospección territorial."},
{id:"cuartel",name:"Cuartel V",lat:-34.54437,lng:-58.80661,coordinateSource:"https://www.openstreetmap.org/node/1216953479",coordinateSourceLabel:"OpenStreetMap · nodo de localidad",coordinateCheckedAt:"2026-11-27",coordinatePrecision:"Nodo OSM de localidad; no identifica una parcela ni una dirección particular.",info:"Sector norte. Prospección productiva y de parcelas de mayor escala."}
];
const opportunities=[
{id:"rp25",stage:"documented",name:"RP25 · Darwin Passaponti · Av. San Fernando",lat:null,lng:null,kind:"industrial",locality:"",activity:"Productivo y logístico",evidenceType:"Ordenanza municipal publicada en SIBOM",confidence:"Alta para las parcelas expresamente individualizadas; no extrapolable a predios vecinos.",sourceDate:"Sancionada 11/12/2025 · promulgada 16/12/2025",lastCheckedAt:"2026-11-27",business:"Suelo industrial/logístico, depósitos, patios operativos, agrupamientos PyME y proveedores industriales.",evidence:"La Ordenanza 7443/25 desafecta y afecta a I2 las parcelas de Circunscripción V 1380 AB, 1399 C, H, M, N y 1399 B; y a I1 parcelas de Circunscripción II, Sección B, Quinta 14, Manzana 14a, 1C, 1D, 7, 8, 9 y 14, Fracción 1 parcelas 2, 3, 4A y 4B; además de Circunscripción V parcelas 1341 F y 1341 G. El artículo 5 limita el cambio a los polígonos y linderos expresamente descriptos; el artículo 6 prevé CVI. No se extiende a predios vecinos.",status:"Normativa publicada y promulgada; la aplicación parcelaria, la CVI y la disponibilidad de inmuebles concretos requieren verificación individual.",next:"Superponer los polígonos y nomenclaturas de los artículos 1 a 5 con Catastro; obtener constancia urbanística vigente; revisar CVI, dominio, servicios, accesos y restricciones antes de evaluar un inmueble.",source:"https://sibom.slyt.gba.gob.ar/bulletins/14607/contents/2361465"},
{id:"ecoparque",stage:"documented",name:"Nodo RP24/RP25 · Ecoparque Industrial",lat:-34.5776245,lng:-58.8709859,coordinateSource:"https://www.google.com/maps/search/?api=1&query=-34.5776245,-58.8709859",coordinateSourceLabel:"Google Maps · pin enlazado desde el sitio oficial del operador",coordinateCheckedAt:"2026-11-27",coordinatePrecision:"Pin de referencia publicado por el operador; no identifica una parcela individual.",kind:"industrial",locality:"",activity:"Industria, logística y servicios a empresas",evidenceType:"Sitio oficial del operador",confidence:"Media: la información es declarada por el operador y requiere corroboración documental independiente.",sourceDate:"No informada en la página consultada",lastCheckedAt:"2026-11-27",business:"Servicios a empresas, depósitos complementarios, oficinas operativas, gastronomía de ruta y mantenimiento de flotas.",evidence:"El sitio del operador describe un fraccionamiento industrial de 78 parcelas de 2.000 a 10.000 m², infraestructura para tránsito pesado y parámetros publicados FOS 0,6/FOT 1,2. Son características declaradas por el operador; no acreditan parcelas disponibles, precios ni factibilidad individual.",status:"Existencia y características generales publicadas por el operador; disponibilidad, precios, reglamento y factibilidad actual por parcela sin confirmar.",next:"Solicitar plano de subdivisión, reglamento, estado de cada parcela y condiciones económicas; contrastar indicadores con el Municipio y revisar dominio, servicios y accesos.",source:"https://ecoparque.com.ar/"},
{id:"ribera",stage:"documented",name:"Paso del Rey · Camino de la Ribera",lat:null,lng:null,kind:"commercial",locality:"Paso del Rey",activity:"Comercio, servicios y conectividad urbana",evidenceType:"Nota oficial del Ministerio de Infraestructura de la Provincia",confidence:"Alta para el contenido de la publicación oficial; el estado actual de obra y sus efectos sobre inmuebles debe revalidarse.",sourceDate:"31/10/2025",lastCheckedAt:"2026-11-27",business:"Comercio, gastronomía, servicios, estacionamiento y reconversión de inmuebles.",evidence:"La Provincia informó el 31/10/2025 trabajos sobre más de 6 km del Camino de la Ribera en Paso del Rey, un nuevo puente sobre el Río Reconquista, pavimentación, cañerías, sumideros, cámaras, drenaje e iluminación. La nota es un antecedente de obra publicado en 2025, no una certificación de su estado actual.",status:"Infraestructura documentada en una publicación provincial de 2025; avance actual, cotas y activos inmobiliarios concretos por verificar.",next:"Confirmar el estado y recepción de las obras; identificar frentes y parcelas; revisar cotas, drenaje, riesgo hídrico, accesos, normativa y usos.",source:"https://www.gba.gob.ar/node/51424"},
{id:"roggero",stage:"documented",name:"Distrito Ecológico Roggero",lat:null,lng:null,kind:"tourism",locality:"",activity:"Turismo de naturaleza, recreación y servicios compatibles",evidenceType:"Fuente institucional municipal · IDUAR",confidence:"Alta para el contexto y las obras descriptas por el Municipio; baja para cualquier conclusión sobre usos o disponibilidad de una parcela concreta.",sourceDate:"12/08/2025",lastCheckedAt:"2026-11-27",business:"Turismo de naturaleza, recreación, gastronomía y servicios compatibles con la protección ambiental.",evidence:"IDUAR presenta el Distrito Ecológico Roggero como política pública de desarrollo urbano, ambiental y turístico. La nota informa la ampliación del Área Natural Protegida de 250 a 550 hectáreas y obras financiadas por FonDER. El contexto no autoriza desarrollos en cualquier parcela ni reemplaza la revisión de límites, normativa y restricciones.",status:"Contexto institucional documentado; predios concretos, límites del área protegida y usos permitidos requieren verificación parcelaria y ambiental.",next:"Obtener cartografía oficial del área protegida; verificar Ordenanza 7164/24, zonificación vigente, restricciones ambientales e hidráulicas, servicios y titularidad.",source:"https://iduar.moreno.gob.ar/2025/08/12/distrito-ecologico-roggero-un-espacio-natural-para-descubrir/"},
{id:"norte",stage:"hypothesis",name:"Cuartel V · Trujui · La Reja",lat:null,lng:null,kind:"land",locality:"",activity:"Prospección de suelo y ensamble de parcelas",evidenceType:"Búsqueda agregada en portal inmobiliario",confidence:"Baja: la página es dinámica y no individualiza activos, titularidad, zonificación ni disponibilidad.",sourceDate:"Listado dinámico; fecha individual de publicación no consolidada",lastCheckedAt:"2026-11-27",business:"Prospección de parcelas grandes, ensamble de tierra, asociaciones con propietarios y desarrollos por etapas.",evidence:"La búsqueda agregada de Zonaprop muestra oferta de terrenos de gran superficie en el Partido de Moreno y filtros por distintas localidades. Es una pista para localizar avisos individuales; no prueba dominio, zonificación ni disponibilidad de un activo específico.",status:"Hipótesis de prospección multizona; sin parcelas individualizadas verificadas.",next:"Seleccionar avisos individuales, registrar URL y fecha por ficha, y construir inventario con nomenclatura catastral, superficie, precio pedido y contacto verificable.",source:"https://www.zonaprop.com.ar/terrenos-venta-moreno-mas-9000-m2.html"},
{id:"base-aerea-moreno-norte",stage:"documented",name:"Base Aérea Moreno Norte · Cuartel V",lat:null,lng:null,kind:"industrial",locality:"Cuartel V",activity:"Logística, desarrollo PyME y planificación urbana",evidenceType:"Nota institucional municipal · IDUAR",confidence:"Alta para el plan y las cifras comunicadas por IDUAR; no identifica parcelas privadas disponibles ni acredita factibilidad individual.",sourceDate:"12/08/2025",lastCheckedAt:"2026-11-27",business:"Planificación urbana, infraestructura vial, transporte de carga y pasajeros, logística aeroportuaria y desarrollo productivo PyME.",evidence:"IDUAR describe un Plan Integral para Cuartel V con actualización normativa, nuevo trazado urbano, infraestructura vial y planificación de transporte. La publicación informa procesos de recuperación de suelo —400.000 m² por vacancia, 30.000 m² por prescripción adquisitiva y 20.000 m² correspondientes a 16 inmuebles— y avances de diseño del loteo San Joaquín y continuidad urbana de La Gloria. Estas cifras describen actuaciones públicas, no suelo ofrecido ni disponible.",status:"Antecedente de planificación y gestión de suelo pública; no se asigna punto cartográfico porque la fuente no identifica una parcela o coordenada única.",next:"Solicitar a IDUAR planos, polígonos y estado administrativo de cada actuación; distinguir tierra pública de activos privados y verificar dominio, régimen de uso, zonificación, servidumbres, accesos y factibilidad.",source:"https://iduar.moreno.gob.ar/2025/08/12/urbanizacion-participacion-y-desarrollo-en-la-base-aerea-moreno-norte/"},
{id:"promeba-trujui",stage:"documented",name:"PRO.ME.BA IV · Haras Trujui y Santa Brígida",lat:null,lng:null,kind:"infrastructure",locality:"Trujui",activity:"Infraestructura urbana y equipamiento comunitario",evidenceType:"Ficha institucional municipal · IDUAR",confidence:"Alta para las obras que IDUAR describe como ejecutadas; no acredita estado actual de conservación ni disponibilidad de suelo.",sourceDate:"Fecha de publicación no informada en la página consultada",lastCheckedAt:"2026-11-27",business:"Equipamiento comunitario, salud, educación, red vial, iluminación y espacio público.",evidence:"La ficha de IDUAR sobre PROMEBA IV en Trujui informa obras en Haras Trujui y Santa Brígida: salón vecinal, espacios deportivos y recreativos, equipamiento educativo de 600 m², centro de salud de 548 m², pavimentación perimetral, extensión eléctrica, luminarias LED y señalética. La publicación describe obras realizadas; no constituye una oferta inmobiliaria.",status:"Obras descritas por IDUAR como ejecutadas; estado actual, mantenimiento, nuevas etapas y polígono exacto requieren consulta.",next:"Verificar con IDUAR el estado de conservación y si existen nuevas etapas; ubicar el polígono del PEI y separar equipamiento público de posibles activos privados sin vinculación demostrada.",source:"https://iduar.moreno.gob.ar/promeba-en-trujui/"},
{id:"promeba-cuartel-v",stage:"documented",name:"PRO.ME.BA · Cuartel V · ocho barrios",lat:null,lng:null,kind:"infrastructure",locality:"Cuartel V",activity:"Infraestructura urbana, espacio público y equipamiento comunitario",evidenceType:"Ficha institucional municipal · IDUAR/PROMEBA",confidence:"Alta para los barrios y ejes de intervención descritos; la ejecución por módulo y el estado actual requieren el PEI y actas de obra.",sourceDate:"Fecha de publicación no informada en la página consultada",lastCheckedAt:"2026-11-27",business:"Veredas, plazas, mobiliario urbano, equipamiento comunitario y mejora del espacio público.",evidence:"IDUAR identifica ocho barrios de Cuartel V: 6 de Enero, San Norberto, San Norberto II, Complejo Alem, El Milenio, Namuncurá, Don Sancho y Papa Francisco. La ficha describe el proyecto “Potenciar el Hábitat”: Módulo I de veredas como primera etapa realizada; Módulo II de veredas y juegos en las plazas Alem y 6 de Enero como etapa planificada; y Módulo III de puesta en valor de plazas y equipamiento comunitario, que la página informa como ejecutado, con dos plazas públicas, veredas y taller de nomencladores urbanos. No identifica parcelas privadas disponibles.",status:"Intervención PROMEBA documentada para ocho barrios; el estado de cada módulo y de conservación actual debe revalidarse.",next:"Descargar y revisar el PEI de Cuartel V; confirmar con IDUAR la ejecución del Módulo II, polígonos, obras posteriores y estado actual de plazas y veredas. No inferir disponibilidad de suelo privado.",source:"https://iduar.moreno.gob.ar/promeba-en-cuartel-v/"},
{id:"mui-mo-monitoreo-urbano-inmobiliario",stage:"documented",name:"MUI-MO · Monitoreo Urbano Inmobiliario",lat:null,lng:null,kind:"land",locality:"Alcance distrital",activity:"Monitoreo de oferta de suelo y loteos autorizados",evidenceType:"Política pública municipal · IDUAR",confidence:"Alta para la existencia y los objetivos declarados del sistema; la publicación no certifica que cada ficha del registro esté actualizada ni que un inmueble esté disponible o autorizado.",sourceDate:"12/08/2025",lastCheckedAt:"2026-11-27",business:"Consulta de loteos y barrios autorizados, control de urbanizaciones irregulares y verificación de oferta de suelo.",evidence:"IDUAR presentó MUI-MO como política pública para monitorear la oferta de inmuebles y loteos, prevenir urbanizaciones irregulares no declaradas y sistematizar información del mercado local de suelo. La publicación describe una Plataforma Inteligente con sistemas de información geográfica e inteligencia artificial, capacitación de más de 150 agentes municipales y un Registro de Loteos y Barrios Autorizados, abiertos y cerrados, que poseen autorización o están en proceso. Es una fuente de control y diligencia; no una lista de activos disponibles.",status:"Política y herramientas institucionales documentadas; acceso actual, cobertura, actualización del registro y situación de cada loteo requieren consulta individual.",next:"Consultar MUI-MO y el Registro de Loteos y Barrios Autorizados; verificar cada desarrollo por expediente, autorización, ubicación, titularidad y fecha de actualización antes de evaluar una oferta.",source:"https://iduar.moreno.gob.ar/2025/08/12/mui-mo-monitoreo-urbano-inmobiliario-de-moreno/"},
{id:"utopia-bonaerense-moreno",stage:"documented",name:"Utopía Bonaerense · Parque urbano e infraestructura",lat:null,lng:null,kind:"infrastructure",locality:"No precisada",activity:"Equipamiento público, parque urbano e infraestructura",evidenceType:"Ficha oficial de licitación provincial",confidence:"Alta para el llamado y las cuatro ofertas consignadas en el acta; no equivale a adjudicación ni contrato.",sourceDate:"Autorización 19/11/2025 · apertura y acta 20/01/2026",lastCheckedAt:"2026-11-27",business:"Equipamiento público, infraestructura y parque urbano; referencia de inversión pública y transformación territorial.",evidence:"La ficha del Ministerio de Infraestructura registra la Licitación Pública 51/2025 para equipamiento, infraestructura y parque urbano de la Utopía Bonaerense en Moreno. Publica estado “En Evaluación”, presupuesto oficial de $7.396.350.515,64 y plazo de 457 días. El acta de apertura del 20/01/2026 registra cuatro ofertas; la menor cotización consignada es $5.506.587.350,43 de Grupo Constructor del Oeste S.R.L. La apertura de ofertas no acredita adjudicación, contrato ni inicio de obra; la ficha no precisa la localidad ni identifica suelo privado disponible.",status:"La ficha oficial seguía indicando “En Evaluación” al 27/11/2026; el acta acredita recepción de cuatro ofertas, pero no se verificó un acto de adjudicación.",next:"Obtener el acto de adjudicación y contrato; confirmar contratista, monto contractual, redeterminaciones, inicio y avance de obra, y polígono exacto antes de atribuir efectos a parcelas cercanas.",source:"https://www.minfra.gba.gob.ar/licitacionesV2/bidding/show/1130/",sourceAlternates:[{label:"Acta de apertura oficial · PDF · 20/01/2026",url:"https://nube.minfra.gba.gob.ar/index.php/s/TrMYQtYjHf4tSrJ/download"}]},
  {id:"ordenanza-7497-26-titulos-imperfectos",stage:"documented",name:"Ordenanza 7497/26 · Permisos provisorios para títulos imperfectos",lat:null,lng:null,kind:"land",locality:"Alcance distrital",activity:"Regularización dominial, obras, mensuras y subdivisiones parcelarias",evidenceType:"Ordenanza municipal publicada en SIBOM",confidence:"Alta para el texto normativo y su promulgación; la aplicación a un inmueble exige verificar posesión, requisitos, vigencia, reglamentación y compatibilidad urbanística.",sourceDate:"Sancionada 11/06/2026 · promulgada por Decreto 1996/26 (18/06/2026) · publicada en SIBOM 331 (09/10/2026)",lastCheckedAt:"2026-11-27",business:"Diligencia de inmuebles con títulos imperfectos; regularización de obras, mensuras, subdivisiones y unificaciones parcelarias.",evidence:"La Ordenanza 7497/26 crea un Régimen de Permisos Provisorios para Inmuebles con Títulos Imperfectos. Incluye inmuebles con posesión legítima acreditable, obras existentes o en ejecución, emprendimientos comerciales, industriales y de servicios, y mensuras, subdivisiones o unificaciones que no puedan tramitarse por falta de título perfecto. Exige acreditar posesión con ánimo de dueño, aportar documentación y planos firmados por profesional; contempla restricciones para espacios públicos, zonas prohibidas, riberas protegidas, reservas, afectaciones y parcelas con inhibiciones o restricciones no resueltas. El permiso no confiere dominio, no regulariza por sí solo la titularidad ni exime del Código de Zonificación, Edificación y normativa ambiental o territorial; además exige regularizar obligaciones tributarias municipales. La norma fija una vigencia de dos años desde su publicación y reportes semestrales; el Boletín SIBOM 331 fue publicado el 09/10/2026. La reglamentación operativa y el cómputo legal del plazo deben confirmarse antes de iniciar una actuación.",status:"Régimen creado, promulgado y publicado en SIBOM 331 el 09/10/2026; la norma prevé dos años desde la publicación. La reglamentación operativa y la aplicación a inmuebles particulares no están verificadas; no acredita título perfecto ni permiso ya otorgado.",next:"Solicitar la reglamentación y el criterio vigente de Obras Particulares y Catastro; verificar posesión legítima, antecedentes dominiales, deudas municipales, planos y mensura, nomenclatura, zonificación, restricciones ambientales e hidráulicas y eventuales derechos de terceros.",source:"https://sibom.slyt.gba.gob.ar/bulletins/15901/contents/2456561"},
  {id:"ordenanza-7542-26-habilitaciones-industriales-logistica",stage:"documented",name:"Ordenanza 7542/26 · Habilitaciones industriales y logísticas",lat:null,lng:null,kind:"industrial",locality:"Alcance distrital",activity:"Habilitación de industrias, depósitos, distribución, logística y grandes superficies comerciales",evidenceType:"Ordenanza municipal publicada en SIBOM",confidence:"Alta para el texto normativo publicado; la habilitación y compatibilidad de cada actividad deben revisarse por parcela y ante la autoridad de aplicación.",sourceDate:"Sancionada 27/08/2026 · comunicada al D.E. 01/09/2026 · promulgación automática · publicada en SIBOM 334 (22/10/2026)",lastCheckedAt:"2026-11-27",business:"Diligencia de suelos y establecimientos industriales, depósitos, centros de distribución, logística y comercio mayorista.",evidence:"La Ordenanza 7542/26 regula la habilitación de industrias, depósitos en general, distribución y logística, hipermercados con salón de ventas superior a 1.000 m², supermercados mayoristas y oficinas administrativas vinculadas a esos rubros. Para depósitos mayores a 300 m², asigna intervención a la Subsecretaría de Industria y Comercio. Permite más de una actividad compatible en una misma unidad parcelaria bajo condiciones de uso privativo, ingreso individual y separación física, además de los controles de seguridad, salubridad y ambiente. Prevé habilitaciones definitivas, simplificadas y provisorias; la simplificada se limita a industrias de hasta Categoría II y superficie cubierta inferior a 1.000 m², con requisitos técnicos y ambientales, y la provisoria caduca a los 180 días salvo renovación evaluada. No modifica por sí sola la zonificación ni garantiza habilitación en una parcela concreta.",status:"Ordenanza sancionada y comunicada; no se presume factibilidad ni habilitación de un establecimiento. La autoridad debe confirmar procedimientos, reglamentación, requisitos y aplicación actual.",next:"Solicitar una preconsulta escrita a la Subsecretaría de Industria y Comercio; comprobar zonificación y uso permitido, superficie cubierta, categoría ambiental, certificado de aptitud ambiental, planos, accesos individuales, separación física y vigencia de cualquier habilitación.",source:"https://sibom.slyt.gba.gob.ar/bulletins/16019/contents/2463040"},
  {id:"los-olivos-convenio-urbanistico-7572-26",stage:"documented",name:"Los Olivos · Convenio de regularización urbanística · Ordenanza 7572/26",lat:null,lng:null,kind:"land",locality:"No precisada",activity:"Desarrollo urbanístico, cesiones, equipamiento comunitario y contribución por valorización",evidenceType:"Ordenanza municipal publicada en SIBOM",confidence:"Alta para la homologación y los importes consignados en la ordenanza; no acredita ejecución posterior de pagos, transferencias registrales, aprobaciones adicionales ni disponibilidad de inmuebles.",sourceDate:"Sancionada 24/09/2026 · comunicada 29/09/2026 · promulgada por Decreto 3230/26 · publicada en SIBOM 334 (22/10/2026)",lastCheckedAt:"2026-11-27",business:"Diligencia de desarrollos urbanísticos, cesiones obligatorias, contribución por valorización, transferencias en especie y cumplimiento de convenios.",evidence:"La Ordenanza 7572/26 convalida el convenio de regularización y cumplimiento de obligaciones urbanísticas del emprendimiento Los Olivos, proyectado como barrio cerrado sobre Circunscripción IV, Parcelas Rurales 660 C, D, E, F, G, H, J, K y M. La norma consigna un saldo de cesiones de 9.897,35 m² (7.767,94 m² de área verde y 2.129,41 m² de equipamiento comunitario), valuado en USD 138.562,90, y una contribución por valorización inmobiliaria de USD 464.639,06. El convenio firmado el 21/09/2026 prevé transferir al Municipio dos inmuebles: Circunscripción II, Sección A, Chacra 5, Fracción 1, Parcela 5, de 6.189 m² con una edificación apta para fines sanitarios, asistenciales, comunitarios o institucionales, valuada en USD 370.000; y Circunscripción IV, Sección Z, Quinta 27, Parcela 11, Partida 92.786, de 4.027 m² dentro del Área Natural Protegida Dique Ing. Roggero, valuada en USD 31.000. Ambas prestaciones en especie se computan por USD 401.000 y la ordenanza consigna un saldo de USD 202.201,96 en diez cuotas con cheques diferidos e interés. Son magnitudes y valuaciones del convenio municipal, no precios de mercado ni ofertas. La norma no demuestra que los pagos se hayan completado, que las transferencias estén inscriptas ni que existan parcelas disponibles.",status:"Convenio homologado por ordenanza; la ejecución de pagos, transferencias dominiales, eventuales adendas y aprobaciones urbanísticas posteriores no queda acreditada por la sola norma. Las parcelas mencionadas no se presentan como disponibles.",next:"Obtener el convenio íntegro y el expediente 4078-284576-I-2026; cotejar nomenclatura y polígonos con Catastro, revisar escrituras y asientos registrales de las transferencias, verificar pagos de las cuotas, adendas y estado de las obligaciones urbanísticas. Confirmar límites y restricciones del Área Natural Protegida Dique Roggero antes de analizar cualquier inmueble.",source:"https://sibom.slyt.gba.gob.ar/bulletins/16019/contents/2463473"}

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
  ,
    "verificationStatus": "Ficha accesible en la última revisión registrada del 27/11/2026; disponibilidad comercial no confirmada."
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
    "availabilityStatus": "No vigente",
    "geolocationStatus": "Pendiente: se consultará Georef para la dirección publicada."
  ,
    "verificationStatus": "La ficha directa de Pablo Aquino marca VENDIDO en el título y la descripción; se conserva el registro histórico como no vigente."
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
  ,
    "verificationStatus": "Ficha accesible en la última revisión registrada del 27/11/2026; disponibilidad comercial no confirmada."
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
  sourceAlternates: [{url:"https://www.puglieseinmobiliaria.com.ar/p/7728348-Terreno-en-Venta-en-Francisco-Alvarez-Lapacho-al-2100",label:"Pugliese Inmobiliaria: lote de 300 m² en Lapacho al 2100, USD 16.500, entrega anunciada enero 2027; no identifica número de lote y podría coincidir con el lote de 300 m² publicado con anticipo USD 3.000."}],
    "agency": "Pugliese Inmobiliaria",
    "contact": "Nicolás Di Puglia Pugliese, CMCPDJMGR 225 · tel. (011) 15 5015-3003",
    "phone": "+54 11 50153003",
    "price": "Anticipo USD 3.000 + hasta 60 cuotas desde USD 360; contado desde USD 14.000",
    "currency": "USD",
    "landSurfaceM2": 300,
    "surfaceNote": "12 × 25 m · terreno descubierto",
    "observations": "El valor de publicación corresponde al anticipo. La ficha individual informa 93 parcelas; la ficha del emprendimiento, 95. Subdivisión en trámite según la inmobiliaria. Otra ficha de Pugliese para Parque Francisco publica 300 m² a USD 16.500 en Lapacho al 2100; la ficha primaria Lapacho y Schubert publica USD 3.000 como anticipo más cuotas. Sin número de lote no se sabe si es la misma parcela o una distinta; se agrega como fuente alternativa, no como nueva oportunidad. La ficha alternativa de Pugliese (Lapacho al 2100, 300 m², USD 16.500, entrega enero 2027) declara que el proyecto contará con aprobación municipal y escritura individual, en futuro; no prueba que estén aprobadas. Servicios: gas envasado, electricidad, energía trifásica, alumbrado público y biodigestor; sin agua corriente/potable, cable ni cloaca. Sin número de lote, puede ser la misma parcela o una distinta.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: se consultará Georef para la dirección publicada."
  ,
    "verificationStatus": "Ficha principal de Pugliese para Lapacho y Schubert accesible; ficha alternativa de la misma inmobiliaria para Lapacho al 2100 accesible el 27/11/2026, USD 16.500, 300 m² y entrega enero 2027. La aprobación municipal y escritura individual se anuncian en futuro; sin identificación de lote, posible solapamiento y disponibilidad no confirmada."
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
    "publicationDate": "Ficha individual reciente vista 27/11/2026; declara obra iniciada noviembre de 2025 y entrega estimada enero de 2027.",
    "agency": "Pugliese Inmobiliaria",
    "contact": "Nicolás Di Puglia Pugliese, CMCPDJMGR 225 · tel. (011) 15 5015-3003",
    "phone": "+54 11 50153003",
    "price": "Contado desde USD 14.000; anticipos desde USD 3.000 y hasta 60 cuotas fijas",
    "currency": "USD",
    "surfaceNote": "La ficha de emprendimiento informa 95 terrenos desde 300 m²; la ficha individual menciona 93.",
    "observations": "La ficha individual reciente de Pugliese para Lapacho al 2100 (vinculada en el registro del lote de 300 m²) reitera 95 lotes desde 300 m², obra iniciada en noviembre de 2025 y entrega estimada enero de 2027. Servicios declarados: gas envasado, energía trifásica, alumbrado público, biodigestor y electricidad; declara que no hay agua corriente, agua potable, cable ni cloaca. El texto dice que el proyecto contará con aprobación municipal y escritura individual, en futuro: no acredita que ya estén aprobadas la subdivisión ni las escrituras. Otra ficha individual había mencionado 93 parcelas; la cantidad sigue discrepante. No hay stock ni avance físico certificados independientemente.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: se consultará Georef para la dirección publicada."
  ,
    "verificationStatus": "Fichas directas de Pugliese accesibles el 27/11/2026; la ficha individual reciente publica 95 lotes desde 300 m², obra iniciada noviembre 2025, entrega enero 2027 y precio de contado desde USD 14.000. La aprobación municipal y escritura individual se expresan como futuras, no como aprobaciones ya obtenidas. Servicios incompletos (sin agua corriente/potable, cable ni cloaca). Cantidad 93/95 discrepante; disponibilidad no confirmada."
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
  ,
    "verificationStatus": "Ficha accesible en la última revisión registrada del 27/11/2026; disponibilidad comercial no confirmada."
  },
  {
    "id": "parques-morenito-proyecto",
    "recordType": "Desarrollo inmobiliario · barrio abierto consolidado / comercialización de lotes",
    "name": "Parques del Morenito · barrio abierto",
    "locality": "Moreno · Tierras del Morenito",
    "address": "Enrique Larreta 8300",
    "geocodeQuery": "Enrique Larreta 8300",
    "geocodeMatch": "ENRIQUE LARRETA 8300",
    "source": "https://ramirezmandatos.tuinmobiliaria.com.ar/d/40279-Parques-del-Morenito-en-Moreno",
    "agency": "Ramirez Mandatos y Negocios Inmobiliarios",
    "contact": "Formulario público del desarrollador; teléfono no visible.",
    "surfaceNote": "3 hectáreas; 56 lotes publicados de 300 a 1.200 m²",
    "observations": "La ficha de desarrollo informa entrega en julio de 2022, pero sigue publicando lotes en venta y escritura inmediata. Se conserva como desarrollo consolidado con comercialización anunciada; no presentarlo como obra en ejecución. Stock, títulos, servicios y disponibilidad de lotes deben confirmarse.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: se consultará Georef para la dirección publicada."
  ,
    "verificationStatus": "Ficha de desarrollo accesible el 27/11/2026 y continúa mostrando lotes en comercialización; la entrega del barrio figura en julio de 2022. No se confirma stock ni avance de obra actual."
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
  ,
    "verificationStatus": "Ficha accesible en la última revisión registrada del 27/11/2026; disponibilidad comercial no confirmada."
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
  ,
    "verificationStatus": "Ficha accesible en la última revisión registrada del 27/11/2026; disponibilidad comercial no confirmada."
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
  ,
    "verificationStatus": "Ficha accesible en la última revisión registrada del 27/11/2026; disponibilidad comercial no confirmada."
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
    "availabilityStatus": "Pendiente de revalidación",
    "geolocationStatus": "Pendiente: se consultará Georef para la dirección publicada."
  ,
    "verificationStatus": "El enlace directo no pudo consultarse en esta revisión; no hay evidencia suficiente de venta o retiro. Confirmar vigencia, precio y disponibilidad con Pugliese Inmobiliaria."
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
    "availabilityStatus": "Pendiente de revalidación",
    "geolocationStatus": "Pendiente: se consultará Georef para la dirección publicada."
  ,
    "verificationStatus": "El enlace directo no pudo consultarse en esta revisión; no hay evidencia suficiente de venta o retiro. Confirmar vigencia, precio y disponibilidad con Pugliese Inmobiliaria."
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
  ,
    "verificationStatus": "Ficha accesible en la última revisión registrada del 27/11/2026; disponibilidad comercial no confirmada."
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
  ,
    "verificationStatus": "Ficha accesible en la última revisión registrada del 27/11/2026; disponibilidad comercial no confirmada."
  }
];

publishedProperties.push(
  {
    id:"moreno-lote-tres-de-febrero-7800",recordType:"Terreno individual",name:"Lote baldío · Tres de Febrero 7800 · 316 m²",
    locality:"Moreno · entorno limítrofe con José C. Paz",address:"Tres de Febrero 7800, entre Montevideo y Río de la Plata, Moreno",
    geocodeQuery:"Tres de Febrero 7800, Moreno, Buenos Aires",geocodeMatch:"TRES DE FEBRERO 7800",
    source:"https://pabloaquinoinmobiliaria.com.ar/propiedades/venta-lotemoreno/",
    agency:"Pablo Aquino Inmobiliaria",contact:"Tel. +54 9 11 7001-7411 / 02320-423003; oficina Hipólito Yrigoyen 1119, José C. Paz",phone:"+54 9 11 7001-7411",
    price:"USD 16.000 contado; financiación: anticipo USD 10.000 + 30 cuotas de USD 260 (total financiado USD 17.800)",currency:"USD",
    landSurfaceM2:316,coveredSurfaceM2:null,surfaceNote:"316 m² (13,40 × 22,40 m). Lote baldío; la ficha técnica muestra un campo de superficie cubierta de 316 m², pero la descripción lo identifica como terreno sin mejoras; no se registra superficie cubierta.",
    observations:"El anunciante afirma escritura lista para transferir. No tiene servicios instalados; indica posibilidad de solicitar energía prepaga. La descripción publica USD 16.000 contado o USD 10.000 de anticipo más 30 cuotas de USD 260 (USD 17.800 financiado); la cabecera destaca el anticipo. Confirmar precio, plan, servicios, escritura y nomenclatura. La ubicación está a dos cuadras del límite con José C. Paz."
  ,
    "availabilityStatus": "No confirmada",
    "verificationStatus": "Ficha directa de Pablo Aquino accesible el 27/11/2026; publica USD 16.000 contado o anticipo USD 10.000 + 30 cuotas de USD 260. Disponibilidad no confirmada.",
    "lastCheckedAt": "2026-11-27",
    "geolocationStatus": "Pendiente: dirección publicada sin coordenada parcelaria verificada."
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
  ,
    "availabilityStatus": "No confirmada",
    "verificationStatus": "Ficha directa de Pablo Aquino accesible el 27/11/2026; publica USD 65.000 y 3.192 m². Disponibilidad no confirmada.",
    "lastCheckedAt": "2026-11-27",
    "geolocationStatus": "Pendiente: dirección publicada sin coordenada parcelaria verificada."
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
  ,
    "availabilityStatus": "No confirmada",
    "verificationStatus": "Ficha directa de Pablo Aquino accesible el 27/11/2026; publica USD 28.000 contado o anticipo USD 15.000 + 25 cuotas de USD 600. Disponibilidad no confirmada.",
    "lastCheckedAt": "2026-11-27",
    "geolocationStatus": "Pendiente: dirección publicada sin coordenada parcelaria verificada."
  }
);
publishedProperties.push({
  id:"la-reja-casa-quinta-santa-teresa-2401",recordType:"Casa quinta / fracción con vivienda",
  name:"Casa quinta con parque, pileta y tenis · Santa Teresa de Jesús 2401",
  locality:"La Reja",address:"Santa Teresa de Jesús 2401, La Reja",
  geocodeQuery:"Santa Teresa de Jesus 2401",geocodeMatch:"SANTA TERESA DE JESUS 2401",
  "source": "https://platastar.com/propiedad/terreno-de-9966-m2-en-venta-en-la-reja-926f61e3",
  "sourceAlternates": [{url:"https://www.zonaprop.com.ar/propiedades/clasificado/vecltrin-lote-terreno-en-venta-la-reja-moreno-9962-m-sup2-60468286.html",label:"Aviso original de Zonaprop; devolvió 410 Gone el 27/11/2026."}],
  "agency": "RE/MAX Metro · corredor responsable Fernando Ariel García, CPI 9898 / CMCPDJLM 1137",
  "contact": "Romina Aran · formulario de PlataStar/RE/MAX Metro; teléfono no visible en la ficha principal.",
  price:"USD 425.000",currency:"USD",landSurfaceM2:9966,coveredSurfaceM2:300,
  surfaceNote:"El título del aviso indica 9.962 m²; la descripción informa aproximadamente 9.966 m². Vivienda de 7 ambientes, quincho, pileta y cancha de tenis.",
  observations: "La publicación describe seis lotes integrados y una casa quinta. Verificar si se vende como una sola unidad o por parcelas, títulos, plano de subdivisión, superficies exactas, estado de la vivienda y permisos de uso. PlataStar publica el mismo conjunto de seis lotes y casa quinta, con dirección 2400 en cabecera y 2401 en descripción; se agregó como fuente alternativa, no como propiedad duplicada."
,
    "availabilityStatus": "No confirmada",
    "verificationStatus": "Ficha alternativa de PlataStar accesible el 27/11/2026, publicada el 17/06/2026, USD 425.000 y 9.966 m². El enlace anterior de Zonaprop devolvió 410 Gone. La dirección aparece como 2400 en cabecera y 2401 en descripción; disponibilidad no confirmada.",
    "lastCheckedAt": "2026-11-27",
    "geolocationStatus": "Pendiente: las fichas publican 2400/2401; no asignar coordenada parcelaria hasta resolver la numeración exacta."
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
    "observations": "El aviso informa dos canchas a reciclar o demoler y una antena Movistar. El contrato de antena indicado en el aviso vencía en octubre de 2026; ese plazo ya transcurrió. No computar ingresos por antena ni asumir renovación hasta obtener contrato vigente y confirmación escrita.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "verificationStatus": "Ficha directa accesible el 27/11/2026; disponibilidad no confirmada.",
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
    "verificationStatus": "El enlace de la ficha individual no pudo abrirse en esta revisión; no se declara retirado. El último precio visible fue USD 150.000, frente a USD 170.000 en el listado general.",
    "availabilityStatus": "Pendiente de revalidación",
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
    "surfaceNote": "La ficha actual publica 3 unidades de 2 ambientes, 43–48 m² totales y 40–45 m² cubiertos. El texto general indica departamentos de 43–54 m².",
    "observations": "La ficha consultada el 27/11/2026 publica tres unidades de 43–48 m² totales y 40–45 m² cubiertos, desde USD 51.600, con entrega estimada en noviembre de 2027 e inicio de obra declarado en febrero de 2025. Sin embargo, la misma ficha muestra simultáneamente las etiquetas “En Pozo”, “En Construcción” y “Terminado”; la etapa física real y el stock deben confirmarse con el anunciante.",
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
    "agency": "RE/MAX Vita",
    "contact": "Nicolás Kardahi · corredora responsable Silvana Inés Palini, CPI 8862 / CMCPM 2955; teléfono completo no visible",
    "price": "USD 120.000",
    "currency": "USD",
    "landSurfaceM2": 461,
    "surfaceNote": "Incluye galpón/deposito, piscina, quincho y baño/habitación; superficie cubierta no informada.",
    "observations": "La ficha publica USD 120.000 y 461 m². Describe galpón, pileta, quincho y baño/habitación. Contradicción de servicios: la descripción general menciona cloacas, mientras el detalle técnico declara cloacas: NO. También publica Alineamiento Comercial A, FOS 0,6/FOT 1,0 y altura máxima 9 m; verificar certificado urbanístico vigente y servicios.",
    "lat": null,
    "lng": null,
    "availabilityStatus": "No confirmada",
    "verificationStatus": "Ficha directa accesible el 27/11/2026; disponibilidad no confirmada. La descripción indica cloacas disponibles, pero el apartado técnico declara cloacas: NO.",
    "geolocationStatus": "Pendiente: Georef debe devolver una coincidencia inequívoca para la dirección publicada."
  ,
    "lastCheckedAt": "2026-11-27"
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
    "lastCheckedAt": "2026-11-27",
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
    "lastCheckedAt": "2026-11-27",
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
    "sourceAlternates": [
      {
        "url": "https://www.argenprop.com/casa-en-venta-en-moreno-7-ambientes--20589067",
        "label": "Publicación paralela de Argenprop; identifica a Mosca Propiedades"
      }
    ],
    "agency": "Aviso principal en Zonaprop; publicación paralela de Argenprop identifica a Mosca Propiedades",
    "contact": "Formulario de Zonaprop; Argenprop muestra teléfono parcialmente oculto, sin número completo verificable.",
    "price": "USD 149.800",
    "currency": "USD",
    "landSurfaceM2": 360,
    "coveredSurfaceM2": 110,
    "surfaceNote": "7 ambientes; 4 dormitorios; el aviso describe cochera, patio, pérgola y galpón al fondo.",
    "observations": "Ficha directa de Zonaprop y publicación paralela de Argenprop accesibles el 27/11/2026. Ambas coinciden en precio USD 149.800, terreno 360 m² y cubierta 110 m². La disponibilidad sigue sin confirmación y las superficies deben cotejarse con título y planos.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "verificationStatus": "Zonaprop y Argenprop accesibles el 27/11/2026; precio y superficies publicados coincidentes. No se confirma disponibilidad ni identidad registral.",
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
    "lastCheckedAt": "2026-11-27",
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
    "lastCheckedAt": "2026-11-27",
    "geolocationStatus": "Pendiente: Georef debe devolver una coincidencia inequívoca para la dirección publicada."
  },
  {
    "id": "casa-racine-800-no-vigente",
    "recordType": "Casa individual · publicación reactivada en otra URL",
    "name": "Casa con pileta y quincho · Racine 800 · publicación reactivada",
    "locality": "Francisco Álvarez",
    "address": "Racine 800, Francisco Álvarez, Moreno",
    "geocodeQuery": "Racine 800, Francisco Alvarez, Moreno",
    "geocodeMatch": "RACINE 800",
    "source": "https://www.inmuebles.clarin.com/casa-en-venta-en-moreno-4-ambientes--20962051",
    "sourceAlternates": [
      {"url": "https://www.argenprop.com/casa-en-venta-en-francisco-alvarez-4-ambientes--20469282", "label": "Publicación anterior de la misma dirección; URL retirada"}
    ],
    "agency": "RE/MAX Premium II",
    "contact": "Daniel Rearte; responsables Ariel Champanier, CUCICBA 4330, y Andrea Berre, CMCPSI 6763. El teléfono aparece incompleto en la ficha.",
    "price": "USD 75.000",
    "currency": "USD",
    "landSurfaceM2": 427,
    "coveredSurfaceM2": 130,
    "surfaceNote": "El aviso informa además una construcción independiente de aproximadamente 30 m²; no se suma a la superficie cubierta sin plano.",
    "observations": "La ficha nueva de Inmuebles Clarín identifica Racine 800, Francisco Álvarez, casa de 4 ambientes, 3 dormitorios, pileta climatizada y quincho/jardín de invierno. La URL anterior de Argenprop devolvió 410 Gone, pero la publicación nueva está accesible. Se actualiza el registro histórico sin crear un duplicado por dirección.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "verificationStatus": "Ficha directa nueva de Inmuebles Clarín accesible el 27/11/2026 con USD 75.000, 427 m² de terreno y 130 m² cubiertos. Disponibilidad comercial no confirmada.",
    "geolocationStatus": "Pendiente: dirección exacta publicada; solo asignar coordenadas si Georef devuelve coincidencia inequívoca."
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
    "observations": "La ficha de emprendimiento sigue accesible. Tres avisos individuales consultados el 27/11/2026 publican lotes de 786 m² (USD 37.000), 839,12 m² (USD 52.400) y 814,11 m² (USD 41.900). RE/MAX Village afirma infraestructura 100% terminada, 114 propietarios, club house equipado, plano aprobado y posesión inmediata. Son datos comerciales del anunciante; confirmar stock, lote interno, expensas, escritura y documentación.",
    "lat": null,
    "lng": null,
    "availabilityStatus": "No confirmada",
    "verificationStatus": "Ficha del desarrollo y tres avisos individuales accesibles el 27/11/2026; infraestructura, plano y posesión son declaraciones de los anunciantes, no verificación municipal o registral.",
    "lastCheckedAt": "2026-11-27",
    "geolocationStatus": "Pendiente: la altura publicada identifica el acceso/sector del desarrollo, no un lote individual."
  },
  {
    "id": "terreno-teniente-camilli-240-975",
    "recordType": "Casa con terreno amplio / posible activo para desarrollo",
    "name": "Camilli al 200/240 · casa sobre lote publicado de 975 m²",
    "locality": "Moreno",
    "address": "Calle Camilli, numeración no coincidente entre avisos (200/240)",
    "source": "https://www.argenprop.com/casa-en-venta-en-moreno-4-ambientes--17792886",
    "agency": "Calderón Inmobiliaria (aviso de casa); aviso alternativo de terreno con anunciante no confirmado",
    "contact": "Calderón Inmobiliaria mediante Argenprop; teléfono parcialmente visible, sin número completo verificable",
    "price": "USD 260.000 (casa) / USD 240.000 (aviso alternativo del terreno; confirmar identidad y precio)",
    "currency": "USD",
    "landSurfaceM2": 975,
    "coveredSurfaceM2": 237,
    "surfaceNote": "17 m de frente × 56 m de fondo; la ficha denomina 237 m² como superficie construida.",
    "observations": "La ficha de casa publica USD 260.000, 975 m² de lote y 237 m² cubiertos; un aviso alternativo de terreno publica USD 240.000 y la misma superficie, con numeración Camilli 200/240. Se agrupan como posible misma oportunidad para evitar duplicación, pero la identidad parcelaria no está confirmada.",
    "lat": null,
    "lng": null,
    "availabilityStatus": "No confirmada",
    "verificationStatus": "Dos fichas accesibles con superficie de 975 m² y calle Camilli, pero la numeración y el tipo de oferta difieren. Posible duplicado: confirmar nomenclatura catastral antes de considerar que se trata de la misma parcela.",
    "geolocationStatus": "Pendiente: la ficha nueva solo publica calle Camilli y el aviso alternativo usa 200/240; no asignar coordenadas hasta identificar la parcela."
  ,
    "sourceAlternates": [{"url":"https://www.argenprop.com/terreno-en-venta-en-moreno--17335118","label":"Aviso alternativo del terreno · USD 240.000"}]
  ,
    "lastCheckedAt": "2026-11-27"
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
    "sourceAlternates": [
      {
        "url": "https://www.zonaprop.com.ar/propiedades/clasificado/vecltrin-terreno-en-venta-en-moreno-2.850-m-sup2--venta-60753032.html",
        "label": "Ficha paralela de Zonaprop accesible el 27/11/2026"
      }
    ],
    "agency": "Girgola Propiedades; martillera responsable Agustina Scalese, CPI 8928 / MGR 313",
    "contact": "Formulario de Argenprop/Zonaprop; teléfono completo no visible.",
    "price": "USD 189.000",
    "currency": "USD",
    "landSurfaceM2": 2850,
    "surfaceNote": "Aprox. 51 m de frente × 56 m de fondo; se ofrece en conjunto o por lotes.",
    "observations": "Argenprop y Zonaprop muestran la fracción en la zona de Yapeyú y Rafael Arcos, con precio USD 189.000 y 2.850 m². El aviso informa R4b, FOS 0,60 y FOT 1,00, sujetos a verificación municipal y a la parcela resultante. Servicios disponibles en la zona, pero factibilidad por lote a consultar. No se confirmó subdivisión ni stock.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "verificationStatus": "Fichas de Argenprop y Zonaprop accesibles el 27/11/2026; precio, superficie y ubicación aproximada coincidentes. Disponibilidad comercial y subdivisión no confirmadas.",
    "geolocationStatus": "Pendiente: Georef puede ubicar la intersección, pero no representa una parcela individual."
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
    "lastCheckedAt": "2026-11-27",
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
    "lastCheckedAt": "2026-11-27",
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
    "lastCheckedAt": "2026-11-27",
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
    "observations": "La ficha ofrece lotes de 300, 594 y 1.200 m² con escritura inmediata y anticipo/cuotas. No publica número de lote ni confirma stock actual; no fusionar con la publicación independiente de 594 m². Existe ficha específica L20, manzana C, 300 m² a USD 19.000; puede ser la misma parcela o un lote distinto. No se fusionan hasta confirmar lote y nomenclatura.",
    "lat": null,
    "lng": null,
    "availabilityStatus": "No confirmada",
    "verificationStatus": "Ficha directa de Argenprop accesible en la revisión del 27/11/2026; precio y superficie publicados. Lote exacto y disponibilidad no confirmados.",
    "geolocationStatus": "Pendiente: la dirección identifica el barrio, no el lote individual.",
    "lastCheckedAt": "2026-11-27"
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
    "lastCheckedAt": "2026-11-27",
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
    "lastCheckedAt": "2026-11-27",
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
    "lastCheckedAt": "2026-11-27",
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
    "lastCheckedAt": "2026-11-27",
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
    "lastCheckedAt": "2026-11-27",
    "geolocationStatus": "Pendiente: altura contradictoria entre título y descripción."
  }
];
publishedProperties.push(...nov27HourlyEntries);

publishedProperties.forEach(item => {
  if (item.lat == null) item.lat = null;
  if (item.lng == null) item.lng = null;
  if (!item.verificationStatus) {
    item.verificationStatus = "No hay constancia individual de consulta de la fuente; verificar el enlace, el precio y la disponibilidad.";
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
  hourlySumio338.contact = "Pablo Aquino Inmobiliaria";
  hourlySumio338.phone = "+54 9 11 7001-7411 / 02320-423003";
  hourlySumio338.verificationStatus = "Ficha directa de Pablo Aquino Inmobiliaria accesible el 27/11/2026; indica lote 01, manzana 4, 338 m² y preventa con anticipo/cuotas.";
  hourlySumio338.availabilityStatus = "No confirmada";
  hourlyAppendObservation(hourlySumio338, "La inmobiliaria informa visación municipal y subdivisión por Geodesia en trámite ante Catastro PBA; no asumir parcela escriturable hasta verificar la subdivisión.");
}
const hourlySumio450 = hourlyById("sumio-lote-450");
if (hourlySumio450) {
  hourlySumio450.verificationStatus = "No vigente: la ficha de la inmobiliaria presenta el aviso como VENDIDO en la revisión del 27/11/2026; se conserva el historial.";
  hourlySumio450.availabilityStatus = "No vigente";
  hourlySumio450.price = "USD 14.000 + 60 cuotas de USD 250 (último precio publicado; aviso VENDIDO)";
  hourlySumio450.currency = "USD";
  hourlySumio450.contact = "Pablo Aquino Inmobiliaria";
  hourlySumio450.phone = "+54 9 11 7001-7411 / 02320-423003";
  hourlyAppendObservation(hourlySumio450, "La ficha original incluye el título VENDIDO para el lote de 450 m², aunque conserva en el cuerpo un texto genérico antiguo que dice “últimos 4 lotes disponibles”; prevalece el título VENDIDO y se debe consultar si hubo reactivación.");
}
const hourlySumioProject = hourlyById("sumio-proyecto");
if (hourlySumioProject) {
  hourlySumioProject.publicationDate = "19/03/2026";
  hourlySumioProject.verificationStatus = "Ficha directa de Pablo Aquino Inmobiliaria accesible el 27/11/2026; publicación fechada 19/03/2026 declara que avanzan las obras y describe 26 parcelas.";
  hourlySumioProject.availabilityStatus = "No confirmada";
  hourlySumioProject.contact = "Pablo Aquino Inmobiliaria · publicación firmada por Rocío Rodríguez";
  hourlySumioProject.phone = "+54 9 11 7001-7411 / 02320-423003";
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

publishedProperties.push(
...[
  {
    "id": "terreno-los-abedules-4100-521",
    "recordType": "Terreno individual · lote en barrio cerrado",
    "name": "Lote en esquina · Los Abedules 4100 · Álvarez del Bosque · 520,7 m²",
    "locality": "Francisco Álvarez",
    "address": "Los Abedules 4100, lote en esquina entre calles 1 y 2, barrio Álvarez del Bosque",
    "geocodeQuery": "Los Abedules 4100",
    "geocodeMatch": "LOS ABEDULES 4100",
    "source": "https://inmoclick.com/86888-remax-crea/inmuebles/3938/ficha/terreno-en-venta-en-los-abedules-4100",
    "agency": "RE/MAX Crea · publicación en Inmoclick",
    "contact": "Karen Scigliano; corredor responsable Rene Vera CUCICBA 6778 / CSI 5848; formulario público, teléfono no visible.",
    "price": "USD 52.000 en Inmoclick; otra copia en Argenprop publica USD 55.000",
    "currency": "USD",
    "landSurfaceM2": 520.7,
    "surfaceNote": "Lote en esquina; el portal redondea la superficie a 521 m². No se informa superficie cubierta.",
    "publicationDate": "Publicado hoy (27/11/2026) en Inmoclick",
    "observations": "La ficha describe un lote en esquina entre calles 1 y 2, dentro de Álvarez del Bosque, sobre Ruta 7 y a 9 cuadras de Acceso Oeste. Informa servicios subterráneos y amenities del barrio. Una copia anterior de Argenprop, rastreada hace cuatro meses, muestra USD 55.000; la ficha actual de Inmoclick muestra USD 52.000. Confirmar precio vigente, identificación del lote, expensas y documentación.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "verificationStatus": "Ficha de Inmoclick accesible y marcada como publicada hoy; una copia de Argenprop de cuatro meses muestra USD 55.000, por lo que el precio vigente requiere confirmación.",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: Georef debe devolver una coincidencia inequívoca para la dirección publicada."
  },
  {
    "id": "terreno-chacabuco-emilio-mitre-206",
    "recordType": "Terreno · dos lotes",
    "name": "Dos lotes en Chacabuco entre Emilio Mitre y Moreno · 206,42 m²",
    "locality": "Moreno Sur",
    "address": "Chacabuco entre Emilio Mitre y Moreno, sin numeración publicada",
    "geocodeQuery": "Chacabuco entre Emilio Mitre y Moreno",
    "geocodeMatch": "CHACABUCO ENTRE EMILIO MITRE Y MORENO",
    "source": "https://platastar.com/propiedad/terreno-de-206-42-m2-en-venta-en-moreno-d24f1835",
    "agency": "Arcieri y Sana Inmobiliaria · publicación en PlataStar",
    "contact": "Contacto mediante la ficha pública de PlataStar; nombre y teléfono no visibles en la consulta.",
    "price": "USD 58.000 por ambos lotes; USD 29.000 cada uno, según el aviso",
    "currency": "USD",
    "landSurfaceM2": 206.42,
    "surfaceNote": "Superficie total combinada de dos lotes; la ficha no detalla la superficie individual de cada uno.",
    "publicationDate": "20/11/2026",
    "observations": "El aviso indica que los dos lotes se venden juntos o separados. PlataStar advierte que la posición puede ser aproximada y que no se informa el uso permitido. Confirmar nomenclatura catastral, medidas individuales, subdivisión, zonificación y precio antes de evaluar.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "verificationStatus": "Aviso publicado el 20/11/2026 y accesible el 27/11/2026; dirección sin altura y posición aproximada.",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: dirección sin número; no se asigna coordenada sin coincidencia inequívoca."
  },
  {
    "id": "casa-francisco-piovano-3700-2960",
    "recordType": "Casa quinta / fracción con vivienda",
    "name": "Casa quinta sobre tres lotes · Francisco Piovano 3700 · 2.960 m²",
    "locality": "Moreno",
    "address": "Av. Francisco Piovano al 3700, Ruta 5 km 38,2",
    "geocodeQuery": "Francisco Piovano 3700",
    "geocodeMatch": "FRANCISCO PIOVANO 3700",
    "source": "https://www.puglieseinmobiliaria.com.ar/p/5575512-Casa-en-Venta-en-Moreno-Francisco-Piovano-al-3700",
    "agency": "Pugliese Inmobiliaria",
    "contact": "Nicolás Di Puglia Pugliese, CMCPDJMGR 225 · +54 11 5015-3003",
    "phone": "+54 11 5015-3003",
    "price": "USD 260.000 en la web directa de Pugliese; Argenprop y Zonaprop muestran USD 220.000. Precio discrepante, confirmar.",
    "currency": "USD",
    "landSurfaceM2": 2960,
    "coveredSurfaceM2": 250,
    "surfaceNote": "Tres lotes; 45 m de frente y 72 m de fondo según ficha directa. Incluye un departamento independiente según la descripción.",
    "observations": "La ficha directa de Pugliese muestra USD 260.000; Argenprop y Zonaprop muestran USD 220.000 en publicaciones recientes. Diferencia material: solicitar precio vigente por escrito. La posibilidad de subdividir en tres lotes y los indicadores R4A, FOS 0,5 y FOT 0,8 son declaraciones del aviso, no factibilidad municipal. Verificar título, mensura, subdivisión, normativa y construcciones.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "verificationStatus": "Ficha directa de Pugliese accesible; portales recientes exhiben un precio diferente. Precio y disponibilidad no confirmados.",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: Georef debe devolver una coincidencia inequívoca para la dirección publicada."
  },
  {
    "id": "casa-faraday-2700-1472",
    "recordType": "Casa quinta individual",
    "name": "Casa quinta con pileta · Faraday 2700 · 1.472 m²",
    "locality": "Moreno",
    "address": "Faraday 2700, a dos cuadras de colectora de Acceso Oeste y Ruta 7",
    "geocodeQuery": "Faraday 2700",
    "geocodeMatch": "FARADAY 2700",
    "source": "https://homes4you.com.ar/propiedad/venta-casaquinta-pileta-moreno-apto-credito",
    "agency": "RE/MAX La Vie · publicación en Homes4you",
    "contact": "Guadalupe Manzorro; contacto directo mediante formulario público; teléfono no visible.",
    "price": "USD 87.000",
    "currency": "USD",
    "landSurfaceM2": 1472,
    "coveredSurfaceM2": 150,
    "surfaceNote": "50 m² semicubiertos según la descripción; medidas aproximadas.",
    "observations": "Casa de 3 ambientes y 2 dormitorios; la descripción informa pileta de 12 × 5 m y quincho. El sitio compara precios con publicaciones de Moreno al 19/11/2026; esa comparación no es una tasación. Confirmar título, superficies, estado de pileta, servicios, zonificación y vigencia comercial.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "verificationStatus": "Ficha accesible en la revisión; el precio y las superficies son datos del aviso y requieren confirmación con RE/MAX La Vie.",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: Georef debe devolver una coincidencia inequívoca para la dirección publicada."
  },
  {
    "id": "casa-intendente-pagano-2600-320",
    "recordType": "Casa individual · chalet con pileta",
    "name": "Chalet 3 ambientes con pileta · Intendente Pagano al 2600 · 320 m²",
    "locality": "Moreno Centro · lado norte",
    "address": "Intendente Pagano al 2600",
    "geocodeQuery": "Intendente Pagano 2600",
    "geocodeMatch": "INTENDENTE PAGANO 2600",
    "source": "https://inmoup.com.ar/252859-sabrina-peluso-inmobiliaria/inmuebles/1562/ficha/casa-en-venta-en-intendente-pagano-al-2600",
    "agency": "Sabrina Peluso Inmobiliaria · publicación en InmoUP",
    "contact": "Sabrina Peluso Inmobiliaria; formulario y botón de llamada en la ficha pública; número no expuesto.",
    "price": "USD 150.000 contado",
    "currency": "USD",
    "landSurfaceM2": 320,
    "coveredSurfaceM2": 146,
    "surfaceNote": "Chalet en una planta; 2 dormitorios, 1 baño y cochera para dos vehículos. La ficha informa 30 años de antigüedad y la descripción aproximadamente 40.",
    "observations": "La ficha consultada el 27/11/2026 publica 146 m² cubiertos y 320 m² totales, pileta y garage para dos vehículos. Existe una diferencia en la antigüedad informada (30 años en datos técnicos y aprox. 40 en descripción). Medidas aproximadas: verificar documentación, estado, expensas y precio vigente.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "verificationStatus": "Ficha accesible el 27/11/2026; superficies y antigüedad presentan datos aproximados que requieren cotejo.",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: Georef debe devolver una coincidencia inequívoca para la dirección publicada."
  },
  {
    "id": "casa-intendente-corvalan-2400-792",
    "recordType": "Casa individual · barrio cerrado",
    "name": "Casa 4 ambientes · Haras María Eugenia · Intendente Corvalán 2400",
    "locality": "Moreno · Haras María Eugenia",
    "address": "Intendente Corvalán 2400, Haras María Eugenia",
    "geocodeQuery": "Intendente Corvalan 2400",
    "geocodeMatch": "INTENDENTE CORVALAN 2400",
    "source": "https://plataplace.com/propiedad/casa-de-4-ambientes-en-venta-en-moreno-2f07fb2f",
    "agency": "Century 21 Portela Sabrina · fuente declarada en PlataPlace",
    "contact": "Century 21 Portela Sabrina; formulario público de consulta; teléfono del asesor no visible.",
    "price": "USD 340.000",
    "currency": "USD",
    "landSurfaceM2": 792.8,
    "coveredSurfaceM2": 200.03,
    "surfaceNote": "4,80 m² semicubiertos; lote 792,80 m²; pileta de 33,20 m² de espejo de agua.",
    "publicationDate": "28/09/2026",
    "observations": "La ficha marca el aviso activo, sin cambios de precio registrados y visto en la fuente el 23/11/2026. Describe 4 ambientes, 3 dormitorios, 3 baños, pileta y cochera. Confirmar vigencia, dirección exacta, expensas, estado de obra y documentación con Century 21.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "verificationStatus": "Aviso marcado activo por PlataPlace; última vista allí el 23/11/2026 y reabierto el 27/11/2026. Disponibilidad no confirmada.",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: Georef debe devolver una coincidencia inequívoca para la dirección publicada."
  },
  {
  "id": "desarrollo-villa-justina-2199",
  "recordType": "Desarrollo inmobiliario · condominio de 9 torres",
  "name": "Villa Justina · Independencia 2199 · Moreno",
  "locality": "Moreno Centro",
  "address": "Independencia 2199",
  "geocodeQuery": "Independencia 2199",
  "geocodeMatch": "INDEPENDENCIA 2199",
  "source": "https://www.barrosbienesraices.com/d/68838-Villa-Justina--en-Moreno",
  "sourceAlternates": [{ "url": "https://www.zonaprop.com.ar/propiedades/emprendimiento/ememvein-villa-justina-57899405.html", "label": "Ficha actual del emprendimiento en Zonaprop" }],
  "agency": "Barros Bienes Raíces",
  "contact": "Tel. (011) 6248-6226 · consultas@barrosbienesraices.com",
  "phone": "+54 11 6248-6226",
  "price": "Zonaprop: desde USD 88.946 en el encabezado; la descripción general del mismo aviso y Barros publican un rango de USD 63.000–232.000. Valores no conciliados; solicitar lista por unidad.",
  "currency": "USD",
  "surfaceNote": "La ficha actual de Zonaprop muestra 4 unidades, de 46 a 106 m² totales y 38 a 94 m² cubiertos. La descripción general menciona unidades de 30 a 115 m². Desarrollo de 9 torres; Barros informa 12.000 m² de parque.",
  "observations": "La ficha directa actual de Zonaprop muestra 4 unidades, desde USD 88.946 y superficies de 46–106 m² totales / 38–94 m² cubiertos. Sin embargo, la descripción del mismo aviso y la página de Barros mantienen un rango general de USD 63.000–232.000 y superficies de 30–115 m²; se conserva la discrepancia. La ficha reúne etiquetas “En Pozo”, “En Construcción” y “Terminado” con entrega inmediata, mientras Barros describe torres en distintas etapas. Una entrega de unidad anunciada para agosto de 2026 ya transcurrió. Solicitar inventario por torre, actas de final de obra, habilitaciones, reglamento, expensas y lista comercial escrita.",
  "lat": null,
  "lng": null,
  "lastCheckedAt": "2026-11-27",
  "verificationStatus": "Ficha directa de Barros y ficha específica de Zonaprop accesibles el 27/11/2026. La ficha actual publica 4 unidades y precio desde USD 88.946, pero el texto general conserva otro rango. No se verificaron entrega efectiva, final de obra ni stock.",
  "availabilityStatus": "Pendiente de revalidación",
  "geolocationStatus": "Pendiente: Georef debe devolver una coincidencia inequívoca para la dirección publicada."
},
  {
    "id": "terreno-ruta24-10ha-100000",
    "recordType": "Fracción de terreno · 10 hectáreas",
    "name": "Fracción de 10 ha · Ruta 24 · entorno Ruta 24/Ruta 25",
    "locality": "Moreno · corredor RP24/RP25",
    "address": "Ruta 24, entre Autopista del Oeste y Ruta 25, lindera al ex predio deportivo de la Universidad de Belgrano",
    "geocodeQuery": "Ruta 24 entre Autopista del Oeste y Ruta 25",
    "geocodeMatch": "RUTA 24 ENTRE AUTOPISTA DEL OESTE Y RUTA 25",
    "source": "https://www.argenprop.com/terreno-en-venta-en-moreno--6529047",
    "agency": "Urrutia & Asoc. Consultora Inmobiliaria · publicación en Argenprop",
    "contact": "Contacto por Argenprop/WhatsApp; el teléfono aparece parcialmente visible (+54 11 44…); solicitar número completo.",
    "price": "USD 1.600.000",
    "currency": "USD",
    "landSurfaceM2": 100000,
    "surfaceNote": "10 ha; el portal declara 100.000 m² construibles, dato no respaldado por certificado urbanístico en la ficha.",
    "observations": "Aviso accesible el 27/11/2026; fecha de publicación o actualización no informada. Ubicación aproximada cerca de la rotonda de Ruta 24 y Ruta 25. El campo “construible 100.000 m²” es un dato del portal, no una edificabilidad acreditada. Confirmar nomenclatura catastral, zonificación, accesos, servicios, afectaciones hidráulicas y disponibilidad.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "verificationStatus": "Publicación accesible el 27/11/2026; fecha de actualización y disponibilidad comercial no informadas.",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: ubicación de corredor sin altura ni parcela; no asignar coordenada parcelaria."
  },
  {
  "id": "terreno-larrea-2419-220",
  "recordType": "Terreno individual",
  "name": "Lote · Larrea 2419 · 220 m² · Moreno Sur",
  "locality": "Moreno Sur",
  "address": "Larrea 2419",
  "geocodeQuery": "Larrea 2419",
  "geocodeMatch": "LARREA 2419",
  "source": "https://www.girgola.com.ar/propiedad/156261_terreno-en-venta-en-moreno/",
  "agency": "Girgola Propiedades",
  "contact": "Nadia Soledad Galvan · +54 9 11 7118-8154 · ngalvan@girgola.com.ar",
  "phone": "+54 9 11 7118-8154",
  "price": "USD 35.990",
  "currency": "USD",
  "landSurfaceM2": 220,
  "surfaceNote": "10 × 22 m según la ficha; superficies aproximadas.",
  "publicationDate": "Actualizado 30/03/2026",
  "observations": "La ficha directa sigue marcada “En venta”, pero la última actualización declarada es 30/03/2026; vigencia comercial a reconfirmar. El aviso menciona electricidad, gas natural, cloacas y agua de perforación. Verificar título, servicios efectivamente conectables, accesibilidad, medidas y precio actual. La ficha original ya no responde en su URL directa; no se confirma venta, pero se marca no vigente en el inventario hasta que la inmobiliaria publique o confirme una nueva ficha.",
  "lat": null,
  "lng": null,
  "lastCheckedAt": "2026-11-27",
  "verificationStatus": "La URL directa de Girgola devolvió 404 Not Found el 27/11/2026; la ficha anterior se conserva como historial, no como oferta vigente.",
  "availabilityStatus": "No vigente",
  "geolocationStatus": "Pendiente: Georef debe devolver una coincidencia inequívoca para la dirección publicada."
}
]
);

publishedProperties.push(
...[
  {
    "id": "terreno-general-hornos-sn-939",
    "recordType": "Terreno con proyecto de vivienda declarado",
    "name": "Lote con proyecto declarado · General Hornos S/N · Prados del Oeste II",
    "locality": "Moreno · Prados del Oeste II",
    "address": "General Hornos S/N, Prados del Oeste II",
    "geocodeQuery": "General Hornos S/N, Prados del Oeste II",
    "geocodeMatch": "GENERAL HORNOS S N PRADOS DEL OESTE II",
    "source": "https://inmoclick.com/121788-re-max-la-vie/inmuebles/2053/ficha/terreno-en-venta-en-general-hornos-sn",
    "agency": "RE/MAX La Vie · publicación en Inmoclick",
    "contact": "Formulario público de Inmoclick; agente individual y teléfono no visibles.",
    "price": "USD 42.000",
    "currency": "USD",
    "landSurfaceM2": 939,
    "surfaceNote": "El encabezado indica 939 m²; la descripción menciona 940 m² y también 800 m². Proyecto propuesto de 245 m² cubiertos + 90 m² semicubiertos, no construido.",
    "publicationDate": "Publicado hace 15 días al 27/11/2026",
    "observations": "La ficha declara proyecto de vivienda registrado y permiso municipal de obra aprobado, pero no adjunta número de expediente ni resolución. Superficie contradictoria: 939 m² en encabezado, 940 m² en descripción y 800 m² en otra línea. El proyecto propone 245 m² cubiertos y 90 m² semicubiertos. Una publicación relacionada del mismo barrio afirma 114 propietarios y Club House equipado; es una declaración comercial, no verificación independiente. Confirmar expediente, vigencia del permiso, planos, mensura, lote exacto, expensas y disponibilidad.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "verificationStatus": "Ficha publicada hace 15 días y accesible el 27/11/2026; permiso declarado por el anunciante, sin verificación en expediente municipal.",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: dirección sin número y sin identificación de lote; no asignar coordenada parcelaria."
  },
  {
    "id": "terreno-salto-600-595",
    "recordType": "Terreno individual · lote en esquina",
    "name": "Lote en esquina · Salto 600 · 595 m²",
    "locality": "Moreno",
    "address": "Salto 600, Moreno",
    "geocodeQuery": "Salto 600, Moreno",
    "geocodeMatch": "SALTO 600",
    "source": "https://inmoclick.com/248084-re-max-namai/inmuebles/1579/ficha/terreno-en-venta-en-salto-600",
    "agency": "RE/MAX Namai · publicación en Inmoclick",
    "contact": "Formulario público de Inmoclick; agente individual y teléfono no visibles.",
    "price": "USD 44.000",
    "currency": "USD",
    "landSurfaceM2": 595,
    "surfaceNote": "Lote en esquina, cerrado con portones; superficie aproximada según aviso.",
    "publicationDate": "Publicado hace 15 días al 27/11/2026",
    "observations": "El aviso describe un lote propio, esquina, cerrado y elevado respecto del terreno circundante. Ofrece varias alternativas de financiación directa y acepta permuta/vehículos según publicación. La ficha no precisa la calle transversal. Verificar nomenclatura catastral, escritura, medidas, servicios, condiciones de financiación y precio vigente.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "verificationStatus": "Aviso publicado hace 15 días y accesible el 27/11/2026; ubicación exacta de la esquina pendiente.",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: falta la calle transversal para validar la esquina y evitar una geolocalización ambigua."
  },
  {
  "id": "terreno-juan-diaz-solis-1800-595",
  "recordType": "Terreno individual · lote en esquina",
  "name": "Lote en esquina · Juan Díaz de Solís 1800 y Funes · Paso del Rey · 595 m²",
  "locality": "Paso del Rey",
  "address": "Esquina Funes y Juan Díaz de Solís al 1800",
  "geocodeQuery": "Juan Díaz de Solís 1800 y Funes, Paso del Rey",
  "geocodeMatch": "JUAN DIAZ DE SOLIS 1800 FUNES",
  "source": "https://inmoclick.com/280711-mosca-propiedades/inmuebles/687/ficha/terreno-en-venta-en-juan-diaz-de-solis-al-1800",
  "agency": "Mosca Propiedades · publicación en Inmoclick",
  "contact": "Formulario público de Inmoclick; teléfono no visible.",
  "price": "USD 45.000",
  "currency": "USD",
  "landSurfaceM2": 595,
  "surfaceNote": "Lote en esquina; la superficie publicada es aproximada y debe cotejarse con el estado parcelario.",
  "publicationDate": "Publicado hace 3 meses al 27/11/2026",
  "observations": "La ficha sigue accesible, pero la publicación tiene aproximadamente tres meses y requiere reconfirmación comercial. Describe esquina Funes/Juan Díaz de Solís, a una cuadra de Acceso Oeste. Verificar medidas, título, servicios, zonificación y precio actual antes de tratarlo como oportunidad vigente.",
  "lat": null,
  "lng": null,
  "lastCheckedAt": "2026-11-27",
  "verificationStatus": "Ficha directa de Inmoclick accesible el 27/11/2026; publicada hace aproximadamente tres meses, con precio USD 45.000 y 595 m². Disponibilidad comercial no confirmada.",
  "availabilityStatus": "No confirmada",
  "geolocationStatus": "Pendiente: esquina publicada sin número parcelario; no asignar coordenada hasta confirmar ambas calles."
}
]
);

publishedProperties.push(
...[
  {
    "id": "terreno-los-abedules-lote121-600",
    "recordType": "Terreno individual · lote central en barrio cerrado",
    "name": "Lote central N.º 121 · Los Abedules 4100 · Álvarez del Bosque · 600 m²",
    "locality": "Francisco Álvarez",
    "address": "Los Abedules 4100, lote central N.º 121, barrio Álvarez del Bosque",
    "geocodeQuery": "Los Abedules 4100, lote central N.º 121",
    "geocodeMatch": "LOS ABEDULES 4100 LOTE 121",
    "source": "https://inmoclick.com/57484-remax-vita/inmuebles/16765/ficha/terreno-en-venta-en-los-abedules-4100",
    "agency": "RE/MAX Vita · publicación en Inmoclick",
    "contact": "RE/MAX Vita · WhatsApp público informado en ficha sindicada: +54 11 2234-1800.",
    "phone": "+54 11 2234-1800",
    "price": "USD 37.000",
    "currency": "USD",
    "landSurfaceM2": 600,
    "surfaceNote": "Lote central N.º 121; superficie publicada de 600 m².",
    "publicationDate": "Publicado hoy (27/11/2026) en Inmoclick",
    "observations": "La ficha describe un lote central N.º 121 en Álvarez del Bosque, con SUM, pileta climatizada, canchas de tenis y fútbol en construcción, 20 ha arboladas y seguridad 24 h. Existe una copia anterior de Inmoclick.ai por USD 40.000 y 600 m², publicada hace 7 meses; la ficha actual de RE/MAX Vita muestra USD 37.000. Confirmar que ambas referencias corresponden al mismo lote, precio, expensas, amenities y documentación. No confundir con el lote en esquina de 520,7 m² también publicado en Los Abedules 4100.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "verificationStatus": "Ficha de RE/MAX Vita accesible el 27/11/2026 y marcada como publicada hoy; precio y disponibilidad no confirmados con el corredor.",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: la dirección del barrio no identifica la parcela interna; no colocar un pin en el centro del barrio."
  },
  {
    "id": "terreno-ensenada-6000-36000",
    "recordType": "Fracción de terreno con viviendas existentes",
    "name": "Ensenada 6000 · 36.000 m² · cinco viviendas",
    "locality": "Cuartel V",
    "address": "Ensenada 6000, con acceso a Ruta Provincial 24",
    "source": "https://www.argenprop.com/terreno-en-venta-en-cuartel-v--20861100",
    "sourceAlternates": [
      {
        "url": "https://www.argenprop.com/terreno-en-venta-en-cuartel-v--20312843",
        "label": "Aviso anterior de la misma fracción · USD 163.000 · enlace retirado"
      }
    ],
    "agency": "Publicación Argenprop / RE/MAX; corredor responsable Juan Alberto Crescimone CMCPSM 2821 / CPI 9670",
    "contact": "Silvana De Martino; contacto mediante Argenprop",
    "price": "USD 145.000",
    "currency": "USD",
    "landSurfaceM2": 36000,
    "surfaceNote": "Cinco viviendas construidas en 2008 y quincho; superficie cubierta conjunta no publicada.",
    "observations": "La ficha actual publica USD 145.000. Una publicación anterior de la misma ubicación y superficie mostraba USD 163.000 y hoy devuelve 410 Gone. No sumar renta ni valor de las viviendas sin inspección, planos y documentación.",
    "lat": null,
    "lng": null,
    "geocodeQuery": "Ensenada 6000, Cuartel V, Moreno, Buenos Aires",
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: se intentará geocodificar la dirección pública; no hay coordenadas asignadas.",
    "verificationStatus": "Ficha directa accesible en la revisión del 27/11/2026; disponibilidad, precio final y situación dominial no confirmados con el corredor."
  },
  {
    "id": "terreno-ruta25-2500-404",
    "recordType": "Terreno individual / fracción",
    "name": "Ruta Provincial 25 2500 · fracción de 404 m²",
    "locality": "Moreno Centro",
    "address": "Ruta Provincial 25 2500, Moreno",
    "source": "https://www.argenprop.com/terreno-en-venta-en-centro-moreno--14862810",
    "agency": "Dambolena",
    "contact": "Martín Dambolena, CMCPDJMGR 205 / CUCICBA 7176; formulario de Argenprop; teléfono incompleto en la ficha.",
    "price": "USD 45.000",
    "currency": "USD",
    "landSurfaceM2": 404,
    "surfaceNote": "Frente 13 m; ochava 4,66 m; fondos publicados de 27,98 m y 30,94 m.",
    "observations": "El aviso publica usos y parámetros urbanísticos heterogéneos (Alineamiento Comercial C, Residencial 3 y Comercial B). No asumir que todos corresponden a la misma parcela: exigir nomenclatura catastral y certificado urbanístico vigente. La zonificación del aviso no sustituye la consulta municipal.",
    "lat": null,
    "lng": null,
    "geocodeQuery": "Ruta Provincial 25 2500, Moreno, Buenos Aires",
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: se intentará geocodificar la dirección publicada.",
    "verificationStatus": "Ficha directa accesible en la revisión del 27/11/2026; precio y disponibilidad comercial no confirmados."
  },
  {
    "id": "casa-padre-fahy-90-322",
    "recordType": "Casa individual",
    "name": "Casa 3 ambientes · Padre Fahy al 90 · La Reja",
    "locality": "La Reja",
    "address": "Padre Fahy al 90",
    "source": "https://www.zonaprop.com.ar/propiedades/clasificado/veclcain-venta-casa-3-ambientes-jardin-patio-galeria-59326892.html?n_pg=0&n_pos=1&n_src=Listado",
    "agency": "Meraki Real Estate · Luciana L. Fedele, CPI 7756 / CMCPSI 6712",
    "contact": "WhatsApp público en ficha sindicada: +54 11 3019-7772; verificar número con la corredora antes de avanzar.",
    "price": "USD 64.900",
    "currency": "USD",
    "landSurfaceM2": 322.78,
    "coveredSurfaceM2": 87.28,
    "surfaceNote": "322,78 m² totales; 87,28 m² cubiertos y 208,5 m² descubiertos.",
    "observations": "Dos dormitorios, un baño y espacios exteriores. La ficha sindicada registra una baja desde USD 69.000 (28/09/2026) a USD 64.900; tomar el valor actual solo como precio pedido y confirmar con la corredora. La ficha declara escritura inmediata; verificar título, planos, estado de ocupación y medidas definitivas.",
    "lat": null,
    "lng": null,
    "geocodeQuery": "Padre Fahy 90, La Reja, Moreno, Buenos Aires",
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: se intentará geocodificar la dirección pública.",
    "verificationStatus": "Ficha individual de Zonaprop accesible el 27/11/2026; precio y datos de superficie publicados. Disponibilidad no confirmada; el teléfono proviene de una ficha sindicada del mismo aviso."
  ,
    "sourceAlternates": [{"url":"https://proppies.app/propiedad/buenos-aires/moreno/casa-3-amb-en-venta-en-la-reja-8053008","label":"Ficha sindicada con contacto de Luciana L. Fedele ↗"}]
  ,
    "phone": "+54 11 3019-7772"
  },
  {
    "id": "casa-jose-hernandez-4001-400",
    "recordType": "Casa quinta individual",
    "name": "Casa quinta · José Hernández 4001 y Lobos · Paso del Rey",
    "locality": "Paso del Rey",
    "address": "José Hernández 4001, esquina Lobos",
    "source": "https://www.zonaprop.com.ar/propiedades/clasificado/veclcain-quinta-en-venta-paso-del-rey-moreno-60703667.html",
    "agency": "AR Negocios Inmobiliarios SRL",
    "contact": "Formulario de contacto de Zonaprop; no se publica teléfono directo en la ficha.",
    "price": "USD 99.000",
    "currency": "USD",
    "landSurfaceM2": 400,
    "coveredSurfaceM2": 136,
    "surfaceNote": "La ficha resume 136 m² cubiertos; la descripción redondea a 137 m² y menciona 27 m² semicubiertos.",
    "observations": "Tres dormitorios, pileta, galería y esquina ochava. Confirmar diferencia de superficie cubierta, documentación y servicios.",
    "lat": null,
    "lng": null,
    "geocodeQuery": "José Hernández 4001 y Lobos, Paso del Rey, Moreno, Buenos Aires",
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: se intentará geocodificar la esquina publicada.",
    "verificationStatus": "Ficha individual accesible en Zonaprop el 27/11/2026; disponibilidad no confirmada."
  },
  {
    "id": "casa-general-belgrano-600-593",
    "recordType": "Casa individual",
    "name": "Casa 4 ambientes · General Manuel Belgrano 600",
    "locality": "Moreno",
    "address": "General Manuel Belgrano 600",
    "source": "https://www.argenprop.com/casa-en-venta-en-moreno-4-ambientes--20069547",
    "agency": "Mateo Propiedades",
    "contact": "Formulario de Argenprop; teléfono mostrado parcialmente en la ficha, no utilizable como número completo.",
    "price": "USD 135.000",
    "currency": "USD",
    "landSurfaceM2": 593,
    "surfaceNote": "La descripción declara terreno de 593 m²; la ficha técnica de Argenprop muestra 'Sup. Total: 100 m²'. No informa superficie cubierta. Dato contradictorio pendiente.",
    "observations": "Tres dormitorios, dos baños, dos cocheras y quincho/garaje. No asignar 593 m² como superficie verificada hasta cotejar título y plano; el propio portal presenta 100 m² como superficie total.",
    "lat": null,
    "lng": null,
    "geocodeQuery": "General Manuel Belgrano 600, Moreno, Buenos Aires",
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: se intentará geocodificar la dirección pública.",
    "verificationStatus": "Ficha individual accesible en Argenprop el 27/11/2026; superficie contradictoria y disponibilidad no confirmada."
  },
  {
    "id": "casa-nemesio-alvarez-200-688",
    "recordType": "Casa individual para refacción",
    "name": "Casa a refaccionar · Avenida Nemesio Álvarez 200",
    "locality": "Moreno Centro",
    "address": "Avenida Nemesio Álvarez 200",
    "source": "https://www.argenprop.com/casa-en-venta-en-moreno-4-ambientes--18351992",
    "agency": "Germán Leandro Toledo",
    "contact": "Contacto mediante Argenprop; teléfono parcialmente visible en la ficha, sin número completo verificable.",
    "price": "USD 140.000",
    "currency": "USD",
    "landSurfaceM2": 688,
    "coveredSurfaceM2": 404,
    "surfaceNote": "La ficha publica 688 m² totales y 404 m² cubiertos.",
    "observations": "Tres dormitorios, tres baños y cuatro ambientes; el estado publicado es 'a refaccionar'. Verificar si la superficie cubierta es consistente con el plano aprobado y el estado edilicio.",
    "lat": null,
    "lng": null,
    "geocodeQuery": "Avenida Nemesio Álvarez 200, Moreno, Buenos Aires",
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: se intentará geocodificar la dirección pública.",
    "verificationStatus": "Ficha individual accesible en Argenprop el 27/11/2026; disponibilidad no confirmada."
  },
  {
    "id": "casa-camilli-5200-300",
    "recordType": "Casa individual",
    "name": "Casa 4 ambientes · Camilli al 5200",
    "locality": "Moreno Centro",
    "address": "Camilli al 5200",
    "source": "https://www.argenprop.com/casa-en-venta-en-centro-moreno-4-ambientes--20634756",
    "agency": "Mosca Propiedades",
    "contact": "Formulario de Argenprop; teléfono incompleto en la ficha.",
    "price": "USD 59.900",
    "currency": "USD",
    "landSurfaceM2": 300,
    "coveredSurfaceM2": 110,
    "surfaceNote": "300 m² de terreno; 110 m² cubiertos.",
    "observations": "Dos dormitorios, dos cocheras descubiertas y galería. El aviso describe la ubicación como Moreno Norte, aunque el portal la clasifica en Centro - Moreno; confirmar entorno exacto.",
    "lat": null,
    "lng": null,
    "geocodeQuery": "Camilli 5200, Moreno, Buenos Aires",
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: se intentará geocodificar la dirección pública.",
    "verificationStatus": "Ficha individual accesible en Argenprop el 27/11/2026; disponibilidad no confirmada."
  },
  {
    "id": "casa-dorrego-2800-731",
    "recordType": "Casa individual",
    "name": "Chalet 5 ambientes · Dorrego al 2800",
    "locality": "Moreno Centro",
    "address": "Dorrego al 2800",
    "source": "https://www.argenprop.com/casa-en-venta-en-moreno-5-ambientes--19899612",
    "agency": "Melogno Propiedades",
    "contact": "Formulario de Argenprop; teléfono parcialmente visible, sin número completo verificable.",
    "price": "USD 330.000",
    "currency": "USD",
    "landSurfaceM2": 731,
    "coveredSurfaceM2": 326,
    "surfaceNote": "731 m² de terreno; 326 m² cubiertos.",
    "observations": "Cuatro dormitorios, tres baños, toilette, pileta y cochera para cuatro autos. Confirmar medidas, planos, estado de la piscina y disponibilidad.",
    "lat": null,
    "lng": null,
    "geocodeQuery": "Dorrego 2800, Moreno, Buenos Aires",
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: se intentará geocodificar la dirección publicada.",
    "verificationStatus": "Ficha individual accesible en Argenprop el 27/11/2026; disponibilidad no confirmada."
  },
  {
    "id": "casa-canton-400-400",
    "recordType": "Casa individual",
    "name": "Casa 4 ambientes con parque y pileta · Cantón al 400",
    "locality": "Moreno",
    "address": "Cantón al 400",
    "source": "https://www.zonaprop.com.ar/propiedades/clasificado/veclcain-venta-de-casa-4-ambientes-con-parque-y-pileta-en-56644991.html",
    "agency": "Aviso en Zonaprop; responsables Matías G. Valencia, Col. 3034 CMCPM y Matías F. Viudes, Col. 3047 CMCPM",
    "contact": "Formulario / WhatsApp de Zonaprop; contacto comercial a través de Valencia Viudes Bienes Raíces.",
    "price": "USD 159.000",
    "currency": "USD",
    "landSurfaceM2": 400,
    "coveredSurfaceM2": 160,
    "surfaceNote": "400 m² totales; 160 m² cubiertos.",
    "observations": "Tres dormitorios, dos baños y toilette, cuatro cocheras, pileta y quincho. La ficha informa apto crédito; corroborar título, planos y disponibilidad.",
    "lat": null,
    "lng": null,
    "geocodeQuery": "Cantón 400, Moreno, Buenos Aires",
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: se intentará geocodificar la dirección pública.",
    "verificationStatus": "Ficha individual accesible en Zonaprop el 27/11/2026; la ficha directa publica USD 159.000, 400 m² totales y 160 m² cubiertos. Disponibilidad no confirmada."
  },
  {
    "id": "terreno-chiclana-600-359-historico",
    "recordType": "Terreno individual · antecedente no vigente",
    "name": "Chiclana 600 · lote de 359 m² · antecedente retirado",
    "locality": "Moreno Centro",
    "address": "Chiclana 600, entre Belgrano y España",
    "source": "https://www.argenprop.com/terreno-en-venta-en-moreno--19919131",
    "agency": "RE/MAX Grammar",
    "contact": "Florencia Acosta, mediante Argenprop; teléfono no visible en el extracto.",
    "price": "USD 55.000 · último precio indexado",
    "currency": "USD",
    "landSurfaceM2": 359,
    "surfaceNote": "El aviso también redondeaba la superficie a 360 m².",
    "observations": "La URL directa devuelve 410 Gone en la revisión del 27/11/2026. Se conserva como antecedente; no debe tratarse como oferta vigente.",
    "lat": null,
    "lng": null,
    "geocodeQuery": "Chiclana 600, Moreno, Buenos Aires",
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No vigente",
    "geolocationStatus": "Pendiente: dirección publicada, sin coordenadas verificadas.",
    "verificationStatus": "Enlace directo devuelve 410 Gone el 27/11/2026; registro histórico conservado."
  },
  {
    "id": "terreno-ensenada-6300-30000-historico",
    "recordType": "Fracción de terreno con viviendas · antecedente no vigente",
    "name": "Ensenada 6300 · 30.000 m² · tres viviendas · antecedente retirado",
    "locality": "Cuartel V",
    "address": "Ensenada 6300, con acceso a Ruta Provincial 24",
    "source": "https://www.argenprop.com/terreno-en-venta-en-cuartel-v--20490471",
    "agency": "Publicación Argenprop / RE/MAX; corredor responsable Juan Alberto Crescimone CMCPSM 2821 / CPI 9670",
    "contact": "Silvana De Martino; contacto mediante Argenprop",
    "price": "USD 165.000 · último precio indexado",
    "currency": "USD",
    "landSurfaceM2": 30000,
    "surfaceNote": "Tres viviendas construidas en 2003 y quincho; superficie cubierta conjunta no publicada.",
    "observations": "La URL directa devuelve 410 Gone el 27/11/2026. Es una ubicación distinta de Ensenada 6000; conservar como antecedente y no confundir ambas fracciones.",
    "lat": null,
    "lng": null,
    "geocodeQuery": "Ensenada 6300, Cuartel V, Moreno, Buenos Aires",
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No vigente",
    "geolocationStatus": "Pendiente: dirección publicada, sin coordenadas verificadas.",
    "verificationStatus": "Enlace directo devuelve 410 Gone el 27/11/2026; registro histórico conservado."
  },
  {
    "id": "terreno-lamadrid-6300-2737-historico",
    "recordType": "Terrenos individuales · antecedente no vigente",
    "name": "General Aráoz de Lamadrid 6300 · cuatro lotes de 2.737 m² · antecedente retirado",
    "locality": "Cuartel V / Cuartel IV según la descripción",
    "address": "General Aráoz de Lamadrid 6300, entre Curapaligüe y Av. San Fernando",
    "source": "https://www.argenprop.com/terreno-en-venta-en-cuartel-v--18686429",
    "agency": "Aviso Argenprop; anunciante no identificable en la ficha recuperada",
    "contact": "No visible en la ficha indexada",
    "price": "USD 15.000 de anticipo + 36 cuotas de USD 400 y una última de USD 600; total publicado USD 28.000 por lote",
    "currency": "USD",
    "landSurfaceM2": 2737,
    "surfaceNote": "El aviso describía cuatro parcelas 15–18, cada una de 2.737 m², en conjunto o por separado.",
    "observations": "La URL directa devuelve 410 Gone el 27/11/2026. La ficha se contradice entre Cuartel V en el título y Cuartel IV en la descripción. Posible solapamiento territorial con el lote 16 de General Aráoz de Lamadrid 6702 ya registrado en el mapa (2.737 m²); no tratarlo como parcela distinta sin nomenclatura catastral. Ubicación y plan de pagos son antecedentes, no oferta vigente.",
    "lat": null,
    "lng": null,
    "geocodeQuery": "General Aráoz de Lamadrid 6300, Moreno, Buenos Aires",
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No vigente",
    "geolocationStatus": "Pendiente: dirección publicada y localidad contradictoria.",
    "verificationStatus": "Enlace directo devuelve 410 Gone el 27/11/2026; registro histórico conservado."
  },
  {
    "id": "terreno-paz-del-canon-594-historico",
    "recordType": "Terreno individual · antecedente no vigente",
    "name": "José María Paz y Del Cañón · lote de 594 m² · antecedente retirado",
    "locality": "Moreno",
    "address": "José María Paz y Del Cañón, Moreno",
    "source": "https://www.argenprop.com/22063619--terreno-en-venta-en-moreno--18823313",
    "agency": "Publicación Argenprop; inmobiliaria no identificada en el extracto recuperado",
    "contact": "Contacto mediante el portal; datos directos no visibles",
    "price": "USD 20.000 · último precio indexado",
    "currency": "USD",
    "landSurfaceM2": 594,
    "surfaceNote": "10 × 59,40 m según el aviso.",
    "observations": "La URL directa devuelve 410 Gone el 27/11/2026. La cercanía a una nueva conexión vial es una afirmación del aviso, no una verificación de obra ni de acceso.",
    "lat": null,
    "lng": null,
    "geocodeQuery": "José María Paz y Del Cañón, Moreno, Buenos Aires",
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No vigente",
    "geolocationStatus": "Pendiente: intersección publicada, sin coordenadas verificadas.",
    "verificationStatus": "Enlace directo devuelve 410 Gone el 27/11/2026; registro histórico conservado."
  },
  {"id":"desarrollo-pir25-ruta25-donbosco","recordType":"Desarrollo inmobiliario industrial · parque finalizado","name":"PIR 25 · Parque Industrial · 27 ha · 60 unidades funcionales","locality":"La Reja / Cuartel V","address":"Ruta Provincial 25 y Don Bosco; la ficha municipal también consigna Ruta 25 y Moctezuma","source":"https://torrespropiedades0.tuinmobiliaria.com.ar/d/63604-PIR-25-%7C-parque-industrial-en-moreno--en-Moreno","sourceAlternates":[{"url":"https://www.moreno.gob.ar/industrias-parques-web.php","label":"Listado municipal de parques industriales ↗"},{"url":"https://moreno.gob.ar/noticia-detalle.php?id=2718","label":"Decreto de creación anunciado por Municipio y Provincia · 07/12/2022 ↗"}],"agency":"PIR 25; comercialización publicada por Torres Propiedades. El Municipio identifica Impacto Inmobiliaria como contacto.","contact":"Municipio: Impacto Inmobiliaria, +54 11 7600 4000. Torres Propiedades: +54 9 11 7187-7878 · inmobiliaria@torrespropiedades.info.","surfaceNote":"27 ha; 60 unidades funcionales; unidades publicadas de 2.000 a 4.200 m². La ficha del comercializador informa final de obras aprobado y entrega enero de 2023.","observations":"No es una obra en curso: el comercializador informa entrega enero de 2023 y final de obras otorgado en 2021. El Municipio lo incluye en su listado de parques industriales y una noticia oficial del 07/12/2022 documenta la entrega del decreto de creación del Parque Industrial Privado R25 “PIR25” de La Reja. La ficha comercial publica aprobación provincial, aptitud hidráulica y ambiental y plano de subdivisión aprobado por ARBA; corroborar copias oficiales antes de invertir. El municipio consigna Ruta 25 y Moctezuma, mientras el comercializador ubica el parque sobre Ruta 25 y Don Bosco: confirmar acceso y nomenclatura. Otra publicación comercializa el parque R25 como 17 ha y 30 lotes; no está verificado si es el mismo emprendimiento, una etapa o un polígono distinto. No sumar superficies ni fusionar inventarios hasta verificar operador, plano y límites.","lat":null,"lng":null,"lastCheckedAt":"2026-11-27","availabilityStatus":"No confirmada","geolocationStatus":"Pendiente: ubicación de acceso publicada con dos referencias de intersección; sin punto parcelario verificado.","verificationStatus":"Ficha de emprendimiento accesible el 27/11/2026 y referencia municipal localizada; se informa parque finalizado, pero no se verificó stock de lotes."},
  {
    "id": "pir25-up30-2713",
    "recordType": "Terreno industrial individual · unidad funcional",
    "name": "PIR 25 · UP 30 · 2.713,73 m²",
    "locality": "La Reja",
    "address": "Parque Industrial PIR 25, Ruta Provincial 25 y Don Bosco · UP 30",
    "source": "https://www.torrespropiedades.com.ar/p/6993186-Terreno-industrial-en-Venta-en-Moreno-ruta-provincial-25%2C-Don-bosco-PIR-25-parque-industrial-ruta-25%2C-provincia-de-Buenos-Aires-Argentina",
    "agency": "Torres Propiedades",
    "contact": "+54 9 11 7187-7878 · inmobiliaria@torrespropiedades.info",
    "price": "USD 325.560",
    "currency": "USD",
    "landSurfaceM2": 2713.73,
    "surfaceNote": "Ficha técnica: 2.713,73 m²; descripción: 2.800 m² (45 × 60 m).",
    "observations": "La diferencia entre superficie técnica y descripción debe cotejarse con la unidad funcional y plano aprobado. La ficha publica zonificación Industrial 1, todos los servicios salvo gas y posibilidad de financiación.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: unidad interna sin coordenada parcelaria pública verificada.",
    "verificationStatus": "Ficha directa de Torres Propiedades accesible en la revisión; no se confirmó stock, precio final ni condiciones."
  },
  {
    "id": "pir25-up50-2895",
    "recordType": "Terreno industrial individual · unidad funcional",
    "name": "PIR 25 · UP 50 · 2.895,61 m²",
    "locality": "La Reja",
    "address": "Parque Industrial PIR 25, Ruta Provincial 25 y Don Bosco · UP 50",
    "source": "https://www.torrespropiedades.com.ar/p/6993065-Terreno-industrial-en-Venta-en-Moreno-PIR-25-parque-industrial--%7C-UP-50",
    "agency": "Torres Propiedades",
    "contact": "+54 9 11 7187-7878 · inmobiliaria@torrespropiedades.info",
    "price": "USD 347.000",
    "currency": "USD",
    "landSurfaceM2": 2895.61,
    "surfaceNote": "Ficha técnica: 2.895,61 m²; descripción: 2.900 m² (45 × 64 m).",
    "observations": "La ficha publica zonificación Industrial 1, todos los servicios salvo gas y posibilidad de financiación. Confirmar plano, unidad funcional, stock y condiciones de pago.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: unidad interna sin coordenada parcelaria pública verificada.",
    "verificationStatus": "Ficha directa de Torres Propiedades accesible en la revisión; no se confirmó stock, precio final ni condiciones."
  },
  {
    "id": "pir25-up60-4171",
    "recordType": "Terreno industrial individual · unidad funcional",
    "name": "PIR 25 · UP 60 · 4.171,73 m²",
    "locality": "La Reja",
    "address": "Parque Industrial PIR 25, Ruta Provincial 25 y Don Bosco · UP 60",
    "source": "https://torrespropiedades0.tuinmobiliaria.com.ar/p/6988979-Terreno-industrial-en-Venta-en-Moreno-ruta-provincial-25%2C-Don-bosco-PIR-25-parque-industrial-ruta-25%2C-provincia-de-Buenos-Aires-Argentina",
    "agency": "Torres Propiedades",
    "contact": "+54 9 11 7187-7878 · inmobiliaria@torrespropiedades.info",
    "price": "USD 500.000",
    "currency": "USD",
    "landSurfaceM2": 4171.73,
    "surfaceNote": "Ficha técnica: 4.171,73 m²; descripción: 4.200 m² (45 × 92 m).",
    "observations": "La ficha tiene una inconsistencia de operación: el título habla de nave industrial en alquiler, pero el encabezado comercial muestra venta por USD 500.000. No considerar el precio confirmado hasta obtener una propuesta escrita. Publica zonificación Industrial 1 y servicios salvo gas.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: unidad interna sin coordenada parcelaria pública verificada.",
    "verificationStatus": "Ficha directa de Torres Propiedades accesible en la revisión; precio y modalidad contradictorios, stock no confirmado."
  }
]);


const nov27FollowupEntries = [
  {
    "id": "casa-patricias-argentinas-2300-2762",
    "recordType": "Casa quinta individual",
    "name": "Casa quinta · Patricias Argentinas 2300/2301 · 2.762 m²",
    "locality": "Cuartel V / Trujui (discrepancia interna del aviso)",
    "address": "Patricias Argentinas 2300 (la descripción menciona 2301), barrio Tierras del Morenito; el encabezado ubica en Cuartel V y la descripción menciona Trujui, Moreno",
    "source": "https://www.argenprop.com/quinta-en-venta-en-cuartel-v--20907347",
    "sourceAlternates": [
      {
        "url": "https://www.inmuebles.clarin.com/quinta-en-venta-en-cuartel-v--20907347",
        "label": "Copia en Inmuebles Clarín"
      },
      {
        "url": "https://proppies.app/propiedad/buenos-aires/cuartel-v/casa-3-amb-en-venta-en-cuartel-v-41711819",
        "label": "Registro histórico Proppies: inactivo, último precio USD 87.000"
      }
    ],
    "agency": "RE/MAX Grammar; publicación en Zonaprop e Inmuebles Clarín",
    "contact": "María Laura Torralba; corredor responsable Juan Alberto Crescimone, CMCPSM 2821 / CPI 9670. Teléfono completo no visible en la ficha.",
    "price": "USD 82.000",
    "currency": "USD",
    "landSurfaceM2": 2762,
    "coveredSurfaceM2": 102,
    "surfaceNote": "La publicación desglosa vivienda principal de 46 m², vivienda de huéspedes de 23,5 m² y quincho de 32,8 m². Superficie total cubierta declarada: 102 m².",
    "observations": "La ficha individual de Argenprop publica USD 82.000 y la copia de Inmuebles Clarín coincide. Proppies conserva un registro anterior de la misma propiedad marcado inactivo con último precio USD 87.000 el 24/09/2026. El título indica altura 2300 y la descripción 2301. Confirmar precio, altura, mensura, estado de las construcciones y servicios.",
    "lat": null,
    "lng": null,
    "geocodeDisabled": true,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: el aviso discrepa entre Cuartel V y Trujui y entre altura 2300 y 2301; no se asigna coordenada.",
    "verificationStatus": "Ficha directa de Zonaprop accesible el 27/11/2026; precio y superficies publicados, pero disponibilidad comercial no confirmada."
  },
  {
    "id": "casa-chiclana-100-1988",
    "recordType": "Casa individual",
    "name": "Casa de 12 ambientes · Chiclana 100 · Moreno",
    "locality": "Moreno",
    "address": "Chiclana 100, Moreno",
    "source": "https://www.argenprop.com/casa-en-venta-en-moreno-12-ambientes--20806552",
    "agency": "Urrutia y Asociados Consultora Inmobiliaria",
    "contact": "Contacto mediante formulario de Argenprop; teléfono parcialmente visible en la ficha: 4483-45.",
    "price": "USD 670.000",
    "currency": "USD",
    "landSurfaceM2": 1988,
    "coveredSurfaceM2": 370,
    "surfaceNote": "Casa de 12 ambientes; el aviso describe salida a dos calles, pileta y cancha de pádel.",
    "observations": "El precio y las superficies son datos del aviso. Solicitar plano, estado parcelario, título, zonificación y confirmación de la superficie cubierta; no asumir aptitud de subdivisión ni de desarrollo por la salida a dos calles.",
    "lat": null,
    "lng": null,
    "geocodeQuery": "Chiclana 100, Moreno, Buenos Aires",
    "geocodeMatch": "CHICLANA 100",
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: Georef debe devolver una única coincidencia inequívoca para Chiclana 100.",
    "verificationStatus": "Ficha individual de Argenprop accesible el 27/11/2026; precio y superficies publicados, sin confirmación del propietario."
  },
  {
    "id": "desarrollo-chacras-teofilo-galileo-7300",
    "recordType": "Desarrollo inmobiliario · loteo de 35 parcelas; comercialización de lotes no revalidada",
    "name": "Chacras de Teófilo · loteo de 35 parcelas · Trujui",
    "locality": "Trujui",
    "address": "Galileo Galilei al 7300, Trujui, Moreno",
    "source": "https://www.zonaprop.com.ar/propiedades/clasificado/vecltrin-terrenos-en-trujui-58930130.html",
    "sourceAlternates": [{url:"https://www.zonaprop.com.ar/propiedades/clasificado/vecltrin-venta-de-lote-en-moreno-59977491.html",label:"Aviso histórico de 324 m² / USD 25.000; enlace devolvió 410 Gone el 27/11/2026."}, {url:"https://www.argenprop.com/terreno-en-venta-en-trujui--20559575",label:"Argenprop: lote de 324 m² / USD 25.000; enlace devolvió 410 Gone el 27/11/2026."}],
    "agency": "Avisos históricos de Natalio Carames y RE/MAX Buro II; intermediarios y stock actuales no revalidados.",
    "contact": "Natalio Carames (ficha histórica de 326 m²) y Sebastián García / RE/MAX Buro II (ficha histórica de 471 m²); teléfonos no revalidados.",
    "price": "Sin precio vigente verificable; avisos históricos USD 23.000–36.000",
    "publicationDate": "Entregas estimadas en avisos históricos: mayo de 2027 para un lote de 326 m² y octubre de 2026 para lotes de 324/471 m²; fechas no verificadas.",
    "currency": "USD",
    "landSurfaceM2": null,
    "surfaceNote": "Desarrollo anunciado sobre 18.000 m²; avisos individuales históricos publicaron lotes de 324, 326 y 471 m². La superficie total no corresponde a una parcela individual.",
    "observations": "Los avisos históricos describen un barrio semicerrado de 35 lotes sobre 18.000 m², con lotes entre 324 y 471 m², acceso asfaltado, cordón/cuneta, electricidad y agua, sin expensas. Una ficha para lote de 326 m² anunció entrega en mayo de 2027; otras para 324 y 471 m² anunciaron octubre de 2026. Los enlaces directos de Zonaprop para 326/324 m² y Argenprop para 324/471 m² devolvieron 410 Gone el 27/11/2026. No se verificaron subdivisión, permisos, avance físico, entrega ni stock. Se conserva como antecedente del desarrollo, no como disponibilidad confirmada.",
    "lat": null,
    "lng": null,
    "geocodeDisabled": true,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "Pendiente de revalidación",
    "geolocationStatus": "Pendiente: Galileo Galilei al 7300 identifica el acceso del desarrollo, no la ubicación exacta de cada lote.",
    "verificationStatus": "Los enlaces directos de Zonaprop para lotes de 326/324 m², Argenprop para 324/471 m² y la ficha sindicada de Inmoclick devolvieron 410 Gone el 27/11/2026. Las fechas de entrega anunciadas (octubre de 2026 y mayo de 2027) y la ejecución del desarrollo no se verificaron independientemente. Sin disponibilidad confirmada."
  },
  {
    "id": "terreno-derqui-7660-384",
    "recordType": "Terreno individual",
    "name": "Lote · Avenida Derqui 7660 · 384 m²",
    "locality": "Cuartel V",
    "address": "Avenida Derqui 7660, Cuartel V, Moreno",
    "source": "https://www.zonaprop.com.ar/propiedades/clasificado/vecltrin-venta-lote-en-moreno-384-m-sup2--i-60337609.html",
    "agency": "Publicación en Zonaprop; corredor responsable Marta Beatriz Zalazar Denett, C.M.C.P.S.M. 2582",
    "contact": "Formulario de Zonaprop; teléfono no visible en la ficha.",
    "price": "USD 22.000",
    "currency": "USD",
    "landSurfaceM2": 384,
    "surfaceNote": "12 × 32 m según el aviso. No se informa superficie cubierta.",
    "observations": "El aviso lo presenta como lote apto para proyecto residencial, comercial o inversión, pero no acompaña certificado urbanístico. Verificar parcela, escritura, zonificación, retiros y servicios.",
    "lat": null,
    "lng": null,
    "geocodeQuery": "Avenida Derqui 7660, Cuartel V, Moreno, Buenos Aires",
    "geocodeMatch": "DERQUI 7660",
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: Georef debe devolver una única coincidencia inequívoca para Avenida Derqui 7660.",
    "verificationStatus": "Ficha directa de Zonaprop accesible el 27/11/2026; precio y superficie publicados; disponibilidad no confirmada."
  },
  {
  "id": "terreno-abdon-calderon-1000-250",
  "recordType": "Terreno individual",
  "name": "Lote comercial · Abdón Calderón 1000 · 250 m²",
  "locality": "Moreno",
  "address": "Abdón Calderón 1000, Moreno",
  "source": "https://www.zonaprop.com.ar/propiedades/clasificado/vecltrin-venta-lote-terreno-250-m-sup2--en-moreno-60769310.html",
  "agency": "RE/MAX; corredor responsable María de los Ángeles Meade, CPI 9172 / CMCPM 3083",
  "contact": "Sebastián Stos; contacto mediante formulario de Zonaprop.",
  "price": "USD 45.000",
  "currency": "USD",
  "landSurfaceM2": 250,
  "surfaceNote": "El aviso informa 250 m²; no publica superficie cubierta.",
  "observations": "La ficha lo ubica a unos 100 m de Av. Victorica y 150 m de Acceso Oeste, Ruta 23, Bingo y Shopping Nine. El uso comercial sugerido es una propuesta del anunciante, no una habilitación ni zonificación verificada. Se deduplicaron cuatro copias adicionales de Argenprop/Zonaprop por coincidir dirección, superficie, precio y contacto; se conserva una sola oportunidad con enlaces alternativos.",
  "lat": null,
  "lng": null,
  "geocodeQuery": "Abdon Calderon 1000, Moreno, Buenos Aires",
  "geocodeMatch": "ABDON CALDERON 1000",
  "lastCheckedAt": "2026-11-27",
  "availabilityStatus": "No confirmada",
  "geolocationStatus": "Pendiente: Georef debe devolver una única coincidencia inequívoca para Abdón Calderón 1000.",
  "verificationStatus": "Ficha individual de Zonaprop accesible el 27/11/2026; precio y superficie publicados; disponibilidad no confirmada.",
  "sourceAlternates": [
    {
      "url": "https://www.argenprop.com/terreno-en-venta-en-moreno--20504273",
      "label": "Copia de Argenprop del mismo aviso"
    },
    {
      "url": "https://www.argenprop.com/terreno-en-venta-en-moreno--20724444",
      "label": "Otra ficha de Argenprop del mismo lote"
    },
    {
      "url": "https://www.zonaprop.com.ar/propiedades/clasificado/vecltrin-venta-lote-terreno-250-m-sup2--en-moreno-59946189.html",
      "label": "Copia anterior en Zonaprop"
    },
    {
      "url": "https://www.argenprop.com/terreno-en-venta-en-moreno--20297323",
      "label": "Otra copia de Argenprop"
    }
  ],
  "publicationDate": "La ficha primaria de Zonaprop estaba indexada hace 5 días; las copias del mismo aviso aparecían indexadas entre 2 y 3 meses antes. Fecha original no informada."
},
  {
    "id": "terreno-conscripto-bernardi-1800-3888",
    "recordType": "Terreno individual · zona rural declarada",
    "name": "Conscripto Bernardi al 1800 · 3.888 m²",
    "locality": "Cuartel V",
    "address": "Conscripto Bernardi al 1800, Cuartel V, Moreno",
    "source": "https://www.argenprop.com/terreno-en-venta-en-cuartel-v--20877598",
    "sourceAlternates": [
      {
        "url": "https://terreno.mercadolibre.com.ar/MLA-4191950248-lote-terreno-en-venta-3800-m2-moreno-norte-_JM",
        "label": "Publicación de Ramirez Propiedades en Mercado Libre"
      },
      {
        "url": "https://www.zonaprop.com.ar/propiedades/clasificado/vecltrin-lote-terreno-en-venta-3800-m-sup2--moreno-norte-60687358.html",
        "label": "Copia sindicada en Zonaprop"
      }
    ],
    "agency": "Ramirez Mandatos y Negocios Inmobiliarios",
    "contact": "0810-220-0033 · WhatsApp +54 9 11 5702-5130 · ventas@ramirezprop.com.ar",
    "price": "USD 20.000",
    "currency": "USD",
    "landSurfaceM2": 3888,
    "surfaceNote": "El portal muestra frente 39 m y fondo 52 m; la descripción detalla lados de 52,86 m, 80,84 m, 88,01 m y 39,80 m. Requiere cotejo de mensura.",
    "observations": "El aviso declara zona rural, lote a desmontar y escritura. No se verificaron título, estado parcelario, uso admisible ni factibilidad de servicios. La diferencia entre medidas de ficha y descripción impide asignar coordenadas parcelarias.",
    "lat": null,
    "lng": null,
    "geocodeDisabled": true,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: dirección por altura aproximada y geometría contradictoria; no se asigna coordenada.",
    "verificationStatus": "Ficha de Argenprop accesible el 27/11/2026; también figura en Mercado Libre como publicada hace 14 días. Precio y superficie no equivalen a disponibilidad confirmada."
  },
  {
    "id": "terreno-lamadrid-el-vergel-2161",
    "recordType": "Terreno individual · uso industrial/logístico declarado",
    "name": "Gral. Aráoz de Lamadrid 100 · barrio El Vergel · 2.161 m²",
    "locality": "Cuartel V",
    "address": "G. Aráoz de Lamadrid 100, barrio El Vergel, Cuartel V, Moreno",
    "source": "https://www.argenprop.com/terreno-en-venta-en-cuartel-v--19260750",
    "agency": "Mundo Inmobiliario",
    "contact": "Teléfono parcialmente visible en Argenprop: 4713-07; formulario del portal.",
    "price": "USD 25.000",
    "currency": "USD",
    "landSurfaceM2": 2161,
    "surfaceNote": "La ficha técnica declara 2.161 m²; la descripción indica 2.167 m² y medidas de 34 × 64 m.",
    "observations": "El aviso lo describe como apto para industria y logística, cerca de la rotonda de RP24/RP25, con zonificación III/II declarada. La superficie y zonificación requieren mensura y certificado municipal. No confundir con el lote 16 de Lamadrid al 6700 ya registrado.",
    "lat": null,
    "lng": null,
    "geocodeDisabled": true,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: el aviso usa 'G. 100' y no aporta una altura parcelaria inequívoca.",
    "verificationStatus": "Ficha individual de Argenprop accesible el 27/11/2026; precio y superficies publicadas con discrepancia interna."
  },
  {
    "id": "terreno-camilli-60-1000",
    "recordType": "Terreno individual · oportunidad para desarrolladores declarada",
    "name": "Teniente Oscar Camilli al 60 · 1.000 m²",
    "locality": "Moreno Centro",
    "address": "Teniente Oscar Camilli al 60, Moreno",
    "source": "https://www.ramirezprop.ar/p/8612219-Terreno-en-Venta-en-Moreno-Teniente-Oscar-Camilli-al-60",
    "agency": "Ramirez Mandatos y Negocios Inmobiliarios",
    "contact": "0810-220-0033 · WhatsApp +54 9 11 5702-5130 · ventas@ramirezprop.com.ar",
    "price": "USD 300.000",
    "currency": "USD",
    "landSurfaceM2": 1000,
    "surfaceNote": "20 × 50 m según ficha. Servicios declarados: agua corriente, gas natural, electricidad y cable; cloacas: no.",
    "observations": "El aviso sugiere locales en primer/segundo piso y departamentos arriba. Es una propuesta comercial del anunciante, no una capacidad constructiva aprobada. Solicitar nomenclatura catastral, zonificación y certificado urbanístico.",
    "lat": null,
    "lng": null,
    "geocodeDisabled": true,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: 'al 60' es una referencia aproximada, no una puerta exacta.",
    "verificationStatus": "Ficha directa de Ramirez Propiedades accesible el 27/11/2026; precio y superficie publicados; disponibilidad no confirmada."
  },
  {
    "id": "terreno-justo-daract-2000-630",
    "recordType": "Terreno individual",
    "name": "Justo Daract al 2000 · 630 m²",
    "locality": "Moreno",
    "address": "Justo Daract al 2000, Moreno",
    "source": "https://www.ramirezprop.ar/p/8609803-Terreno-en-Venta-en-Moreno-Justo-Daract-al-2000",
    "agency": "Ramirez Mandatos y Negocios Inmobiliarios",
    "contact": "0810-220-0033 · WhatsApp +54 9 11 5702-5130 · ventas@ramirezprop.com.ar",
    "price": "USD 85.000",
    "currency": "USD",
    "landSurfaceM2": 630,
    "surfaceNote": "18 × 35 m según la ficha. El anunciante declara agua corriente, gas natural, electricidad, cable y cloacas.",
    "observations": "La ficha lo ubica cerca de la Universidad Nacional de Moreno, hospitales, comercios, Acceso Oeste y transporte. Confirmar altura exacta, servicios conectables y normativa de la parcela.",
    "lat": null,
    "lng": null,
    "geocodeDisabled": true,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: la publicación indica altura aproximada 'al 2000'.",
    "verificationStatus": "Ficha directa de Ramirez Propiedades accesible el 27/11/2026; precio y superficie publicados; disponibilidad no confirmada."
  },
  {
    "id": "terreno-vidt-1700-420",
    "recordType": "Terreno individual · loteo",
    "name": "Loteo Las Casuarinas · Vidt al 1700 · 420 m²",
    "locality": "Francisco Álvarez",
    "address": "Vidt al 1700, Loteo Las Casuarinas, Francisco Álvarez, Moreno",
    "source": "https://www.ramirezprop.ar/p/8594683-Terreno-en-Venta-en-Francisco-Alvarez-Vidt-al-1700",
    "agency": "Ramirez Mandatos y Negocios Inmobiliarios",
    "contact": "0810-220-0033 · WhatsApp +54 9 11 5702-5130 · ventas@ramirezprop.com.ar",
    "price": "USD 21.000",
    "currency": "USD",
    "landSurfaceM2": 420,
    "surfaceNote": "12 × 35 m. La ficha declara electricidad; agua corriente, agua potable, cable y cloacas: no.",
    "observations": "El aviso ubica el lote a 200 m de calle asfaltada, próximo a comercios y líneas de colectivos. No informa subdivisión individual ni servicios sanitarios; verificar escritura, accesos y factibilidad.",
    "lat": null,
    "lng": null,
    "geocodeDisabled": true,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: altura aproximada dentro de un loteo, sin lote o manzana identificados.",
    "verificationStatus": "Ficha directa de Ramirez Propiedades accesible el 27/11/2026; precio y superficie publicados; disponibilidad no confirmada."
  },
  {
    "id": "terreno-paramaribo-alvarez-jonte-425",
    "recordType": "Terreno individual",
    "name": "Paramaribo y Álvarez Jonte · 425 m²",
    "locality": "Francisco Álvarez",
    "address": "Esquina de Paramaribo y Álvarez Jonte, Francisco Álvarez, Moreno",
    "source": "https://www.ramirezprop.ar/p/8518084-Terreno-en-Venta-en-Francisco-Alvarez-Paramaribo-y-Alvarez-Jonte",
    "agency": "Ramirez Mandatos y Negocios Inmobiliarios",
    "contact": "0810-220-0033 · WhatsApp +54 9 11 5702-5130 · ventas@ramirezprop.com.ar",
    "price": "USD 38.000",
    "currency": "USD",
    "landSurfaceM2": 425,
    "surfaceNote": "20,35 × 16,60 m. La ficha declara que no dispone de agua corriente, agua potable, cable ni cloacas; gas natural disponible en la zona.",
    "observations": "El aviso menciona calle asfaltada, 200 m del centro comercial, 100 m de Ruta 5 y 400 m de plaza/estación. Verificar disponibilidad efectiva de gas, servicios, título y normativa.",
    "lat": null,
    "lng": null,
    "geocodeDisabled": true,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: intersección publicada sin número de puerta ni coordenada parcelaria.",
    "verificationStatus": "Ficha directa de Ramirez Propiedades accesible el 27/11/2026; precio y superficie publicados; disponibilidad no confirmada."
  },
  {
    "id": "terreno-jose-obregoso-600-600",
    "recordType": "Terreno individual · lote con mejoras",
    "name": "Loteo La Herradura · José Obregoso al 600 · 600 m²",
    "locality": "Francisco Álvarez",
    "address": "José Obregoso al 600, loteo La Herradura, Francisco Álvarez, Moreno",
    "source": "https://www.ramirezprop.ar/p/8512807-Terreno-en-Venta-en-Francisco-Alvarez-Jose-obregoso-al-600",
    "agency": "Ramirez Mandatos y Negocios Inmobiliarios",
    "contact": "0810-220-0033 · WhatsApp +54 9 11 5702-5130 · ventas@ramirezprop.com.ar",
    "price": "USD 28.000",
    "currency": "USD",
    "landSurfaceM2": 600,
    "surfaceNote": "20,90 × 28,71 m. El aviso menciona perforación como mejora.",
    "observations": "La publicación indica venta de contado y entorno de casas quinta. Declara ausencia de agua corriente, agua potable, cable y cloacas. Verificar perforación, calidad del agua, título, servicios y normativa.",
    "lat": null,
    "lng": null,
    "geocodeDisabled": true,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: altura aproximada dentro de loteo, sin identificación de lote.",
    "verificationStatus": "Ficha directa de Ramirez Propiedades accesible el 27/11/2026; precio y superficie publicados; disponibilidad no confirmada."
  },
  {
    "id": "terreno-diario-la-nacion-iguazu-420",
    "recordType": "Terreno individual",
    "name": "Diario La Nación esquina Iguazú · 420 m²",
    "locality": "Francisco Álvarez",
    "address": "Esquina de Diario La Nación e Iguazú, Francisco Álvarez, Moreno",
    "source": "https://www.ramirezprop.ar/p/8505391-Terreno-en-Venta-en-Francisco-Alvarez-Diario-La-Nacion-Esquina-Iguazu",
    "agency": "Ramirez Mandatos y Negocios Inmobiliarios",
    "contact": "0810-220-0033 · WhatsApp +54 9 11 5702-5130 · ventas@ramirezprop.com.ar",
    "price": "USD 18.000",
    "currency": "USD",
    "landSurfaceM2": 420,
    "surfaceNote": "12 × 32 m. La ficha declara alumbrado público; no declara agua corriente, agua potable, cable ni cloacas.",
    "observations": "El aviso informa venta únicamente de contado y proximidad a escuela, jardín, centro de salud, calle asfaltada y colectivos. Verificar servicios, título, medidas y normativa.",
    "lat": null,
    "lng": null,
    "geocodeDisabled": true,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: esquina sin número de puerta ni parcela individual identificada.",
    "verificationStatus": "Ficha directa de Ramirez Propiedades accesible el 27/11/2026; precio y superficie publicados; disponibilidad no confirmada."
  },
  {
    "id": "terreno-nanduti-2000-324-mejoras",
    "recordType": "Terreno individual con vivienda premoldeada y pileta",
    "name": "Ñanduti al 2000 · lote con mejoras · 324 m²",
    "locality": "Francisco Álvarez",
    "address": "Ñanduti al 2000, Francisco Álvarez, Moreno",
    "source": "https://www.ramirezprop.ar/p/6000745-Terreno-en-Venta-en-Francisco-Alvarez-%C3%91anduti-al-2000",
    "agency": "Ramirez Mandatos y Negocios Inmobiliarios",
    "contact": "0810-220-0033 · WhatsApp +54 9 11 5702-5130 · ventas@ramirezprop.com.ar",
    "price": "USD 25.000",
    "currency": "USD",
    "landSurfaceM2": 324,
    "surfaceNote": "11,18 × 20,20 m. La ficha describe una casa premoldeada de dos dormitorios, cocina-comedor, baño y pileta; no informa superficie cubierta.",
    "observations": "El anuncio se clasifica como terreno con mejoras; la casa está para refaccionar. Declara electricidad y gas envasado. Verificar estado de la vivienda, pileta, título, servicios y si las mejoras están declaradas.",
    "lat": null,
    "lng": null,
    "geocodeDisabled": true,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: altura aproximada 'al 2000', sin parcela exacta.",
    "verificationStatus": "Ficha directa de Ramirez Propiedades accesible el 27/11/2026; precio, lote y mejoras publicados; disponibilidad no confirmada."
  },
  {
    "id": "terreno-san-fernando-araucanos-7522-historico",
    "recordType": "Macrolote individual · antecedente no vigente",
    "name": "Av. San Fernando y Araucanos · macrolote 7.522 m² · no vigente",
    "locality": "Cuartel V",
    "address": "Avenida San Fernando y Araucanos, Cuartel V, Moreno",
    "source": "https://proppies.app/propiedad/buenos-aires/cuartel-v/terreno-en-venta-en-cuartel-v-36890771",
    "sourceAlternates": [
      {
        "url": "https://inmoclick.com/17501-re-max-life/inmuebles/14551/ficha/lote-en-venta-en-avenida-san-fernando-sn",
        "label": "Copia de Inmoclick; enlace directo devolvió 410"
      },
      {
        "url": "https://www.argenprop.com/terreno-en-venta-en-cuartel-v--19959773",
        "label": "Copia de Argenprop; enlace directo devolvió 410"
      },
      {
        "url": "https://www.inmuebles.clarin.com/terreno-en-venta-en-cuartel-v--19959773",
        "label": "Copia de Inmuebles Clarín"
      }
    ],
    "agency": "RE/MAX Life",
    "contact": "Contacto del aviso: Laura Lanza; corredor responsable Laura Palini, CSM 2733 / CPI 7752. Teléfono completo no publicado.",
    "price": "USD 35.000 (último precio publicado el 16/09/2026; antecedente histórico). Otra copia de Inmoclick mostraba USD 64.000.",
    "currency": "USD",
    "landSurfaceM2": 7522,
    "surfaceNote": "Macrolote; FOS 0,6 y FOT 1,0 son parámetros declarados por el anuncio, no certificados parcelarios verificados.",
    "publicationDate": "16/09/2026 · último precio registrado por Proppies",
    "observations": "Proppies indica expresamente que la propiedad ya no está disponible y que el aviso no recibe consultas. No considerar ninguno de los precios como oferta vigente. Los portales muestran valores históricos contradictorios (USD 35.000 / USD 64.000).",
    "lat": null,
    "lng": null,
    "geocodeDisabled": true,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No vigente",
    "geolocationStatus": "Pendiente: esquina publicada sin coordenada parcelaria; se conserva ubicación textual histórica.",
    "verificationStatus": "Proppies marca la propiedad como no disponible y registra USD 35.000 como último precio el 16/09/2026; los enlaces originales de Inmoclick y Argenprop devolvieron 410."
  },
  {
    "id": "desarrollo-fructuoso-rivera-ruta25-460000-338parcelas",
    "recordType": "Fracción y proyecto de subdivisión comercial/productiva · anuncio de portal",
    "name": "Fracción Ruta 25 y Gral. Fructuoso Rivera · 46 ha · proyecto de 338 parcelas",
    "locality": "Cuartel V",
    "address": "Ruta Provincial 25 y calle Gral. Fructuoso Rivera, Cuartel V, Moreno",
    "source": "https://www.argenprop.com/terreno-en-venta-en-cuartel-v--8079438",
    "sourceAlternates": [
      {
        "url": "https://www.argenprop.com/inmobiliarias/dambolena/terrenos/venta/partido-de-moreno",
        "label": "Listado de terrenos de Dambolena en Argenprop"
      }
    ],
    "agency": "Dambolena",
    "contact": "Formulario de Argenprop; teléfono mostrado parcialmente en la ficha: (11) 23.",
    "price": "USD 4.000.000",
    "currency": "USD",
    "landSurfaceM2": 460000,
    "surfaceNote": "El anuncio declara proyecto de 338 parcelas con planos municipales aprobados; FOS 0,6, FOT 1,0 y altura máxima 12 m según el aviso.",
    "publicationDate": "Fecha original no informada; resultado indexado aproximadamente un mes antes de la revisión.",
    "observations": "La ficha individual de Argenprop devolvió 410 Gone el 27/11/2026; el resultado indexado describe un proyecto de 338 parcelas y planos municipales supuestamente aprobados. No se pudo comprobar disponibilidad ni documentación. Conservar como antecedente no vigente, no como oferta actual.",
    "lat": null,
    "lng": null,
    "geocodeDisabled": true,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No vigente",
    "geolocationStatus": "Pendiente: esquina vial publicada sin nomenclatura catastral ni coordenada parcelaria.",
    "verificationStatus": "Resultado de Argenprop indexado aproximadamente un mes antes de la revisión; ficha individual devolvió 410 Gone el 27/11/2026. Se conserva el precio histórico de USD 4.000.000 y el proyecto declarado de 338 parcelas, pero no se trata como oportunidad vigente. La aprobación de planos y el estado del proyecto no se verificaron independientemente."
  },
  {
    "id": "desarrollo-ampliacion-sip2-cuarter-v-52ha",
    "recordType": "Desarrollo industrial público · ampliación del Sector Industrial Planificado II",
    "name": "Ampliación del Sector Industrial Planificado II · Cuartel V",
    "locality": "Cuartel V",
    "address": "Circunscripción V, parcelas 1371 y 1372; entorno de calle Máximo Paz entre Bernardi y Juan B. Molière, Cuartel V (ubicación aproximada)",
    "source": "https://sibom.slyt.gba.gob.ar/bulletins/13860/contents/2308258",
    "sourceAlternates": [
      {
        "url": "https://www.moreno.gob.ar/industrias-parques-web.php",
        "label": "Listado municipal de parques industriales y contacto"
      },
      {
        "url": "https://www.perspectivasureste.org/2026/08/20/moreno-ampliara-el-parque-industrial-municipal-ii-con-52-hectareas/",
        "label": "Nota local del 20/08/2026 sobre la ampliación de 52 ha"
      }
    ],
    "agency": "Municipalidad de Moreno / Fideicomiso Parques Industriales Moreno (FIDEPIM)",
    "contact": "contacto@pimoreno.com.ar (Parque Industrial Moreno II) · promociondeindustria@moreno.gov.ar (Secretaría municipal de Industria y Comercio) · formulario municipal de consulta de PIM II.",
    "surfaceNote": "La Ordenanza 7371/25 identifica las parcelas catastrales Circunscripción V, parcelas 1371 y 1372, pero no publica superficie total. La referencia a 52 hectáreas procede de una nota local del 20/08/2026 y no está cuantificada en la ordenanza.",
    "publicationDate": "Ordenanza sancionada el 31/07/2025; publicación en SIBOM el 28/11/2025; nota sobre ampliación publicada el 20/08/2026.",
    "observations": "La Ordenanza 7371/25 autoriza aportar las parcelas 1371 y 1372 a FIDEPIM para ampliar el SIP II. El artículo 3 fija USD 1.128.000 como valor de adquisición de los inmuebles aportados; el artículo 4 establece un reintegro municipal del 50% del valor de venta de cada parcela hasta completar ese importe. Esa cifra no es un precio de venta al público. No se verificó avance físico, subdivisión, cronograma ni disponibilidad comercial. No es una oferta individual de tierra.",
    "lat": null,
    "lng": null,
    "geocodeDisabled": true,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: se trata de un polígono industrial y un tramo vial; no se asigna punto parcelario.",
    "verificationStatus": "Respaldo jurídico oficial en Ordenanza 7371/25; la superficie de 52 ha procede de una nota periodística. Avance físico y comercialización no verificados."
  },
  {
    "id": "chacras-teofilo-lote-324-historico",
    "recordType": "Terreno individual · antecedente no vigente",
    "name": "Chacras de Teófilo · lote 324 m² · aviso anterior no vigente",
    "locality": "Trujui",
    "address": "Galileo Galilei al 7300, Trujui, Moreno",
    "source": "https://www.zonaprop.com.ar/propiedades/clasificado/vecltrin-terreno-en-venta-en-chacras-de-teofilo-59484862.html",
    "sourceAlternates": [
      {
        "url": "https://www.zonaprop.com.ar/propiedades/clasificado/vecltrin-terreno-en-venta-en-chacras-de-teofilo-59977491.html",
        "label": "Otra ficha anterior indexada con los mismos datos generales"
      }
    ],
    "agency": "Publicación de Zonaprop; corredor responsable según ficha indexada: Micaela Pérez CSI 6671 / Lucas Federico Delgado CUCICBA 6339",
    "contact": "Contacto mediante formulario del portal; teléfono no publicado.",
    "price": "USD 25.000 (último precio indexado)",
    "currency": "USD",
    "landSurfaceM2": 324,
    "publicationDate": "Fecha original no informada; resultado indexado aproximadamente cinco meses antes de la revisión.",
    "observations": "La ficha anterior anunciaba entrega octubre de 2026 y 324 m². El enlace directo devolvió 410; se conserva como antecedente no vigente. No fusionar con el nuevo aviso de 326 m², USD 23.000 y entrega estimada mayo de 2027 sin verificar identidad del lote.",
    "lat": null,
    "lng": null,
    "geocodeDisabled": true,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No vigente",
    "geolocationStatus": "Pendiente: altura aproximada al 7300, sin lote identificado.",
    "verificationStatus": "El enlace directo de Zonaprop devolvió 410 el 27/11/2026; datos anteriores se conservan como referencia histórica."
  },
  {
    "id": "casa-el-casco-733-212-historico",
    "recordType": "Casa individual · antecedente no vigente",
    "name": "Casa 4 ambientes · Barrio El Casco · Paso del Rey · 733 m²",
    "locality": "Paso del Rey",
    "address": "Barrio El Casco, Paso del Rey, Moreno (sin calle ni lote publicados)",
    "source": "https://www.argenprop.com/casa-en-venta-en-paso-del-rey-4-ambientes--20568960",
    "agency": "Publicación de Argenprop; martillera mencionada en resultado indexado: Agustina Scalese, CPI 8928 / MGR 313",
    "contact": "Formulario de Argenprop; teléfono no disponible en la ficha consultada.",
    "price": "USD 269.990 (último precio indexado)",
    "currency": "USD",
    "landSurfaceM2": 733,
    "coveredSurfaceM2": 212,
    "observations": "El enlace directo devolvió 410 el 27/11/2026. No se presenta como oferta vigente; se conserva el último dato indexado para historial. Dirección interna del barrio sin lote identificado.",
    "lat": null,
    "lng": null,
    "geocodeDisabled": true,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No vigente",
    "geolocationStatus": "Pendiente: no se publica calle ni lote interno.",
    "verificationStatus": "Resultado de búsqueda indexado con precio y superficies; ficha directa de Argenprop devolvió 410 el 27/11/2026."
  },
  {
    "id": "casa-cervino-100-350-historico",
    "recordType": "Casa individual · aviso reactivado con fuentes cruzadas",
    "name": "Casa · Cervino 100 · Moreno · 350 m²",
    "locality": "Moreno",
    "address": "Cervino 100, Moreno",
    "geocodeQuery": "Cervino 100, Moreno",
    "geocodeMatch": "CERVINO 100",
    "source": "https://www.argenprop.com/casa-en-venta-en-moreno-5-ambientes--20792419",
    "sourceAlternates": [
      {
        "url": "https://www.zonaprop.com.ar/propiedades/clasificado/veclcain-casa-venta-5-ambientes-pileta-moreno-apta-credito-60768201.html",
        "label": "Ficha de Zonaprop accesible el 27/11/2026"
      },
      {
        "url": "https://www.inmuebles.clarin.com/casa-en-venta-en-moreno-5-ambientes--20792419",
        "label": "Publicación sindicada en Inmuebles Clarín"
      }
    ],
    "agency": "RE/MAX Leven (pie de ficha de Argenprop); corredor responsable Silvana Inés Palini, CPI 8862 / CMCPM 2955",
    "contact": "Sebastián Campos Ugarte; formulario de Argenprop/Zonaprop. Teléfono completo no visible.",
    "price": "USD 130.000",
    "currency": "USD",
    "landSurfaceM2": 350,
    "surfaceNote": "Superficie cubierta contradictoria: cabecera técnica 135 m²; descripción 91 m². No se adopta una superficie cubierta cierta hasta ver planos.",
    "observations": "Aviso reactivado con nueva ficha accesible en Argenprop y Zonaprop. Cuatro dormitorios, dos baños, pileta y dos cocheras según anuncio. La superficie cubierta figura como 135 m² en la cabecera y 91 m² en la descripción; no valorar ni calcular precio por m² cubierto hasta cotejar plano y estado parcelario. Apto crédito es una afirmación del anunciante.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: dirección exacta publicada; marcador sujeto a coincidencia inequívoca de Georef.",
    "verificationStatus": "Ficha directa de Argenprop y ficha paralela de Zonaprop accesibles el 27/11/2026; precio USD 130.000 y terreno 350 m² coincidentes. Disponibilidad comercial no confirmada; superficie cubierta contradictoria."
  },
  {
    "id": "casa-leandro-alem-2100-562-historico",
    "recordType": "Casa individual · antecedente no vigente",
    "name": "Casa 6 ambientes · Leandro N. Alem al 2100 · Moreno",
    "locality": "Moreno",
    "address": "Leandro N. Alem al 2100, Moreno",
    "source": "https://www.argenprop.com/casa-en-venta-en-moreno-6-ambientes--19938855",
    "agency": "Publicación de Argenprop; anunciante no identificado en la ficha consultada.",
    "contact": "Formulario del portal; teléfono no disponible.",
    "price": "USD 200.000 (último precio indexado)",
    "currency": "USD",
    "landSurfaceM2": 562,
    "coveredSurfaceM2": 226,
    "observations": "El enlace directo devolvió 410 el 27/11/2026. El resultado indexado describe cuatro dormitorios, quincho, pileta y tres cocheras; se conserva como antecedente no vigente, sin confirmar disponibilidad.",
    "lat": null,
    "lng": null,
    "geocodeDisabled": true,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No vigente",
    "geolocationStatus": "Pendiente: altura aproximada al 2100, sin número de puerta verificado.",
    "verificationStatus": "Resultado indexado de Argenprop; ficha directa devolvió 410 el 27/11/2026."
  },
  {
    "id": "terreno-r25-2000-200000",
    "recordType": "Terreno industrial individual · parque R25",
    "name": "Polo Veinticinco · lote de 2.000 m² (lote interno no informado)",
    "locality": "Cuartel V",
    "address": "Ruta 25 y Gral. Fructuoso Rivera, Polo Veinticinco, Cuartel V, Moreno (lote interno no informado)",
    "source": "https://www.argenprop.com/terreno-en-venta-en-cuartel-v--19726523",
    "agency": "Hernán Callone Operaciones Inmobiliarias · desarrollo Polo Veinticinco / Krak RE",
    "contact": "Hernán Callone, contacto mediante Argenprop (teléfono parcialmente visible 1139313). Comercialización oficial: Krak RE, 11 3888 2095, info@krak.com.ar; Marcelo Alberto Napolitano, CMCPSI 6645 / CUCICBA 5456.",
    "price": "USD 200.000",
    "currency": "USD",
    "landSurfaceM2": 2000,
    "surfaceNote": "El lote publicado es de 2.000 m², coincidente con el mínimo de superficie que el sitio oficial de Polo Veinticinco anuncia para sus lotes. La ficha individual no informa lote interno.",
    "observations": "La ficha principal no identifica lote. Otros anuncios del mismo parque describen lotes de 2.000 m² numerados 2, 12 y 13; no se presume que sean la misma unidad. El parque R25 es descrito por otro aviso como 17 ha y 30 lotes; el mapa ya contiene un registro separado de PIR25 (27 ha/60 unidades). Confirmar si R25 y PIR25 son el mismo emprendimiento, fase o polígonos distintos; no sumar superficies hasta verificar límites y razón social. La web oficial de Polo Veinticinco informa 15 hectáreas y 37 lotes de 2.000 a 5.700 m²; algunos anuncios de portales describen 17 hectáreas y 30 lotes. Se prioriza el dato del sitio oficial y se deja la diferencia pendiente de conciliación. El Municipio lista Polo 25 por separado de PIR25; no fusionar ambos parques.",
    "lat": null,
    "lng": null,
    "geocodeDisabled": true,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: lote interno no identificado; no se asigna coordenada.",
    "verificationStatus": "Ficha individual de Argenprop accesible el 27/11/2026; precio y superficie publicados; disponibilidad y número de lote no confirmados."
  },
  {
    "id": "terreno-r25-lote33-2888",
    "recordType": "Terreno industrial individual · parque R25",
    "name": "Polo Veinticinco · lote 33 perimetral · 2.888 m²",
    "locality": "Cuartel V",
    "address": "Ruta Provincial 25 4100, Polo Veinticinco, Cuartel V, Moreno",
    "source": "https://www.zonaprop.com.ar/propiedades/clasificado/vecltrin-r25-parque-industrial-terreno-fraccion-en-venta-56155778.html",
    "agency": "Desarrollo Polo Veinticinco / Krak RE; publicación individual en Zonaprop",
    "contact": "Comercialización oficial: Krak RE, 11 3888 2095, info@krak.com.ar; Marcelo Alberto Napolitano, CMCPSI 6645 / CUCICBA 5456. Contacto del aviso de Zonaprop mediante formulario.",
    "price": "USD 288.800",
    "currency": "USD",
    "landSurfaceM2": 2888,
    "surfaceNote": "Lote 33 perimetral; 40 m de frente y 72,20 m de fondo según el aviso. La superficie está dentro del rango oficial de 2.000 a 5.700 m² publicado por Polo Veinticinco.",
    "publicationDate": "Fecha original no informada; ficha indexada aproximadamente un mes antes de la revisión.",
    "observations": "La descripción comercial presenta R25 como parque industrial/logístico de 17 ha y 30 lotes, distribuidos en dos etapas; anuncia disponibilidad inmediata de la primera etapa. Informa energía de media tensión, gas, red cloacal industrial, planta de tratamiento, desagües, seguridad y pavimento. Estos datos y la disponibilidad requieren confirmación del desarrollador. Posible relación con PIR25 (27 ha/60 unidades) ya registrado; no se presume identidad. La web oficial de Polo Veinticinco informa 15 hectáreas y 37 lotes de 2.000 a 5.700 m²; algunos anuncios de portales describen 17 hectáreas y 30 lotes. Se prioriza el dato del sitio oficial y se deja la diferencia pendiente de conciliación. El Municipio lista Polo 25 por separado de PIR25; no fusionar ambos parques.",
    "lat": null,
    "lng": null,
    "geocodeDisabled": true,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: el lote interno está identificado como 33, pero no se publica plano georreferenciado del parque.",
    "verificationStatus": "Ficha de Zonaprop accesible el 27/11/2026; precio, lote y superficie publicados; stock y estado del parque no confirmados."
  },
  {
    "id": "terreno-r25-5000-500000",
    "recordType": "Terreno industrial individual · parque R25",
    "name": "Polo Veinticinco · lote de 5.000 m² (lote interno no informado)",
    "locality": "Cuartel V",
    "address": "Ruta 25 y Gral. Fructuoso Rivera, Polo Veinticinco, Cuartel V, Moreno (lote interno no informado)",
    "source": "https://www.argenprop.com/terreno-en-venta-en-cuartel-v--19726402",
    "agency": "Hernán Callone Operaciones Inmobiliarias · desarrollo Polo Veinticinco / Krak RE",
    "contact": "Hernán Callone, contacto mediante Argenprop (teléfono parcialmente visible 1139313). Comercialización oficial: Krak RE, 11 3888 2095, info@krak.com.ar; Marcelo Alberto Napolitano, CMCPSI 6645 / CUCICBA 5456.",
    "price": "USD 500.000",
    "currency": "USD",
    "landSurfaceM2": 5000,
    "surfaceNote": "El lote publicado es de 5.000 m², dentro del rango oficial de 2.000 a 5.700 m² anunciado por Polo Veinticinco. La ficha no informa número de lote.",
    "publicationDate": "Fecha original no informada; ficha indexada aproximadamente una semana antes de la revisión.",
    "observations": "No se identifica lote interno. La descripción ubica el parque en el entorno de confluencia de Moreno, San Miguel y Luján, sobre RP25. Verificar plano de subdivisión, identidad del parque, lote disponible y servicios conectables. No confundir con el lote de 2.000 m² ni con el lote 33 de 2.888 m². La web oficial de Polo Veinticinco informa 15 hectáreas y 37 lotes de 2.000 a 5.700 m²; algunos anuncios de portales describen 17 hectáreas y 30 lotes. Se prioriza el dato del sitio oficial y se deja la diferencia pendiente de conciliación. El Municipio lista Polo 25 por separado de PIR25; no fusionar ambos parques.",
    "lat": null,
    "lng": null,
    "geocodeDisabled": true,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: parque industrial sin número de lote ni coordenada parcelaria.",
    "verificationStatus": "Ficha individual de Argenprop accesible el 27/11/2026; precio y superficie publicados; disponibilidad no confirmada."
  },
  {
    "id": "terreno-ricchieri-50000-industrial",
    "recordType": "Terreno industrial · fracción para desarrollo",
    "name": "Teniente General Pablo Ricchieri · fracción industrial de 5 ha",
    "locality": "Cuartel V",
    "address": "Teniente General Pablo Ricchieri, Cuartel V, Moreno (sin altura publicada)",
    "source": "https://www.argenprop.com/terreno-en-venta-en-cuartel-v--20787930",
    "agency": "RE/MAX Platino",
    "contact": "Contacto del aviso: Mariana Gómez; corredor responsable Walter Pascualini, CPI 3763 / CSI 5601. Teléfono parcialmente visible: +54 (11).",
    "price": "USD 550.000",
    "currency": "USD",
    "landSurfaceM2": 50000,
    "surfaceNote": "El aviso declara zonificación industrial, FOS 0,6, FOT 1,0, altura máxima 12 m y lotes potenciales de 20 × 30 m. No publica superficie cubierta.",
    "publicationDate": "Fecha original no informada; ficha indexada aproximadamente tres semanas antes de la revisión.",
    "observations": "El anunciante declara escritura y aptitud para loteo; ubica el predio a unos 300 m de Ruta Nacional 24. Zonificación, subdivisión, acceso, servicios y posibilidad efectiva de lotear deben verificarse con expediente municipal, catastro y títulos. No tratar los lotes potenciales como subdivisión aprobada.",
    "lat": null,
    "lng": null,
    "geocodeDisabled": true,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: la publicación no informa altura ni nomenclatura catastral.",
    "verificationStatus": "Ficha individual de Argenprop accesible el 27/11/2026; precio y superficie publicados; titularidad, zonificación y posibilidad de loteo no verificadas."
  },
  {
    "id": "terreno-ruta25-4700-9835",
    "recordType": "Terreno individual · fracción comercial/productiva",
    "name": "Ruta Provincial 25 4700 · fracción de 9.835 m²",
    "locality": "Cuartel V",
    "address": "Ruta Provincial 25 4700, Cuartel V, Moreno",
    "source": "https://www.argenprop.com/terreno-en-venta-en-cuartel-v--20908642",
    "agency": "Dambolena",
    "contact": "Martín Dambolena, CMCPDJMGR 205 / CUCICBA 7176; teléfono parcialmente visible en Argenprop: (11) 23.",
    "price": "USD 480.000",
    "currency": "USD",
    "landSurfaceM2": 9835,
    "surfaceNote": "84 m de frente sobre Ruta 25 y 140 m de fondo según el aviso. No se informa superficie cubierta.",
    "observations": "El aviso declara Alineamiento Comercial C, FOS 0,6, FOT 1,0 y altura máxima 12 m, con usos comerciales, depósitos, servicios y productivos. Estos parámetros son datos del anunciante y deben cotejarse con certificado urbanístico municipal y nomenclatura catastral. El aviso indica que escucha oferta de contado.",
    "lat": null,
    "lng": null,
    "geocodeQuery": "Ruta Provincial 25 4700, Cuartel V, Moreno, Buenos Aires",
    "geocodeMatch": "RUTA 25 4700",
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: Georef debe devolver una única coincidencia inequívoca para Ruta 25 4700.",
    "verificationStatus": "Ficha individual de Argenprop accesible el 27/11/2026; precio, dirección y superficie publicados; disponibilidad no confirmada."
  },
  {
    "id": "terreno-goncalves-eiras-don-bosco-75020",
    "recordType": "Fracción con construcciones existentes · oportunidad de desarrollo",
    "name": "Gonçalves Eiras y Don Bosco 100 · predio de 75.020 m²",
    "locality": "Cuartel V",
    "address": "Gonçalves Eiras y Don Bosco 100, Cuartel V, Moreno",
    "source": "https://www.argenprop.com/terreno-en-venta-en-cuartel-v--20951662",
    "agency": "RE/MAX Life",
    "contact": "Contacto del aviso: Sebastián Paz; corredor responsable Laura Palini, CSM 2733 / CPI 7752. Teléfono parcialmente visible: +54 (11).",
    "price": "USD 498.000",
    "currency": "USD",
    "landSurfaceM2": 75020,
    "surfaceNote": "El aviso declara 660 m² construidos y varias unidades: casona principal, casa de caseros, vivienda con cuatro habitaciones con baño y una unidad de tres ambientes a refaccionar. No desglosa superficie cubierta por edificio.",
    "observations": "El anunciante plantea alternativas residenciales multifamiliares, deportivas o comerciales; no publica certificado urbanístico ni proyecto aprobado. Verificar título, mensura, afectaciones, zonificación, servicios, estado y superficies de cada construcción antes de modelar un desarrollo.",
    "lat": null,
    "lng": null,
    "geocodeDisabled": true,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: esquina y altura publicada sin parcela catastral inequívoca.",
    "verificationStatus": "Ficha individual de Argenprop accesible el 27/11/2026; precio, terreno y superficie construida declarados por el anunciante; disponibilidad no confirmada."
  },
  {
    "id": "terreno-polo24-gral-hornos-6100-4860",
    "recordType": "Terreno industrial individual · dos lotes linderos",
    "name": "Parque Industrial Polo 24 · lotes A04 y A18 · 4.860 m²",
    "locality": "Francisco Álvarez",
    "address": "General Hornos 6100, Parque Industrial Polo 24, Francisco Álvarez, Moreno",
    "source": "https://www.argenprop.com/terreno-en-venta-en-francisco-alvarez--20512097",
    "agency": "Piccione Propiedades",
    "contact": "Piccione Propiedades; teléfono parcialmente visible en Argenprop: 1140867. Contacto del Parque Industrial Polo 24 publicado por el Municipio: admpolo24@gmail.com.",
    "price": "USD 365.000",
    "currency": "USD",
    "landSurfaceM2": 4860,
    "surfaceNote": "Dos lotes linderos de 2.430 m² cada uno, identificados como A04 y A18 en el plano del aviso; se venden juntos. Medidas aproximadas conjuntas: 40 × 120 m.",
    "observations": "El anuncio informa salida a dos calles, pavimento, energía, agua, cloacas, seguridad y alumbrado; declara FOS 60% y FOT 1,20. Verificar plano de mensura, identidad de los lotes, zonificación y que ambos se transmitan conjuntamente.",
    "lat": null,
    "lng": null,
    "geocodeQuery": "General Hornos 6100, Francisco Alvarez, Moreno, Buenos Aires",
    "geocodeMatch": "GENERAL HORNOS 6100",
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: Georef debe devolver una única coincidencia inequívoca para General Hornos 6100.",
    "verificationStatus": "Ficha individual de Argenprop accesible el 27/11/2026; precio, lotes y superficies publicados; disponibilidad no confirmada."
  },
  {
    "id": "terreno-pueyrredon-2025-337",
    "recordType": "Terreno individual",
    "name": "Juan Martín de Pueyrredón 2025 · 337,5 m²",
    "locality": "Moreno",
    "address": "Juan Martín de Pueyrredón 2025, Moreno",
    "source": "https://www.zonaprop.com.ar/propiedades/clasificado/vecltrin-terreno-lote-en-venta-de-337.5-m-sup2--ubicado-en-60689498.html",
    "agency": "Fabricio Orsino · Negocios Inmobiliarios",
    "contact": "Fabricio Orsino; España 302, local 11, Moreno Centro; COL. 356 MGR. Teléfono no visible en la ficha.",
    "price": "USD 30.000",
    "currency": "USD",
    "landSurfaceM2": 337.5,
    "observations": "La publicación declara acceso por calle de tierra, alumbrado público e internet en la zona. No menciona agua, cloacas ni gas. Verificar servicios, medidas, título y normativa.",
    "lat": null,
    "lng": null,
    "geocodeQuery": "Juan Martin de Pueyrredon 2025, Moreno, Buenos Aires",
    "geocodeMatch": "JUAN MARTIN DE PUEYRREDON 2025",
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: Georef debe devolver una única coincidencia inequívoca para Pueyrredón 2025.",
    "verificationStatus": "Ficha individual de Zonaprop accesible el 27/11/2026; precio y superficie publicados; disponibilidad no confirmada."
  },
  {
    "id": "terreno-jose-maria-paz-600-356",
    "recordType": "Terreno individual",
    "name": "José María Paz 600 · 356 m²",
    "locality": "Moreno",
    "address": "José María Paz 600, entre Esteban de Luca y Florentino Ameghino, Moreno",
    "source": "https://www.zonaprop.com.ar/propiedades/clasificado/vecltrin-terreno-lote-de-350-m-en-venta-moreno-58852339.html",
    "agency": "Martín Vacas Negocios Inmobiliarios",
    "contact": "Martín Vacas Negocios Inmobiliarios, Belgrano 315, Moreno; teléfono no expuesto completo en la ficha.",
    "price": "USD 40.000",
    "currency": "USD",
    "landSurfaceM2": 356,
    "surfaceNote": "10 m de frente por 35,6 m de fondo. El aviso declara luz, gas, agua corriente, cloaca e internet en la cuadra.",
    "observations": "Verificar conexión efectiva de cada servicio, mensura, título y normativa. No confundir con el antecedente de José María Paz y Del Cañón, de otra superficie y ubicación.",
    "lat": null,
    "lng": null,
    "geocodeQuery": "Jose Maria Paz 600, Moreno, Buenos Aires",
    "geocodeMatch": "JOSE MARIA PAZ 600",
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: Georef debe devolver una única coincidencia inequívoca para José María Paz 600.",
    "verificationStatus": "Ficha individual de Zonaprop accesible el 27/11/2026; precio, dirección y superficie publicados; disponibilidad no confirmada."
  },
  {
    "id": "terreno-prados-oeste2-lote145-781",
    "recordType": "Terreno individual · lote en barrio cerrado",
    "name": "Prados del Oeste II · lote 145 · 781 m²",
    "locality": "La Reja",
    "address": "General Hornos 2998, Prados del Oeste II, La Reja, Moreno",
    "source": "https://www.zonaprop.com.ar/propiedades/clasificado/vecltrin-venta-lote-prados-del-oeste-ii-central-60616963.html",
    "agency": "Sabrina Eva Portela Inmobiliaria",
    "contact": "Sabrina Eva Portela, CUCICBA 8933 / CMCPM 3000; contacto mediante formulario de Zonaprop.",
    "price": "USD 55.000",
    "currency": "USD",
    "landSurfaceM2": 781,
    "observations": "Lote 145 en cul-de-sac. La ficha anuncia seguridad 24 h, agua potable, cloacas, electricidad, gas natural, internet, calles pavimentadas y amenities. Confirmar expensas, reglamento, estado de infraestructura y disponibilidad. Otra ficha indexada para General Hornos 2998 publicaba 902,49 m² y USD 20.000, pero el enlace directo devolvió 410 el 27/11/2026. Sin número de lote no se pudo demostrar si es la misma parcela; se conserva como referencia histórica, no como oferta activa separada.",
    "lat": null,
    "lng": null,
    "geocodeQuery": "General Hornos 2998, La Reja, Moreno, Buenos Aires",
    "geocodeMatch": "GENERAL HORNOS 2998",
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: Georef debe devolver una única coincidencia inequívoca para General Hornos 2998.",
    "verificationStatus": "Ficha individual de Zonaprop accesible el 27/11/2026; precio, lote y superficie publicados; disponibilidad no confirmada. Otra ficha indexada de la misma dirección devolvió 410 y presenta superficie/precio distintos; identidad parcelaria pendiente.",
    "sourceAlternates": [
      {
        "url": "https://www.zonaprop.com.ar/propiedades/clasificado/vecltrin-terreno-en-venta-en-prados-del-oeste-2-60355714.html",
        "label": "Ficha indexada para General Hornos 2998, 902,49 m² y USD 20.000; enlace directo 410 el 27/11/2026; posible duplicado."
      }
    ]
  },
  {
    "id": "terreno-joaquin-v-gonzalez-2400-615",
    "recordType": "Terreno individual con estructura existente",
    "name": "Joaquín V. González 2400 · 615 m² y estructura de hormigón",
    "locality": "Moreno",
    "address": "Joaquín V. González 2400, Moreno",
    "source": "https://www.zonaprop.com.ar/propiedades/clasificado/vecltrin-terreno-lote-en-venta-moreno-59348651.html",
    "agency": "Dambolena",
    "contact": "Martín Dambolena, CMCPDJMGR 205 / CUCICBA 7176; contacto mediante formulario de Zonaprop.",
    "price": "USD 67.000",
    "currency": "USD",
    "landSurfaceM2": 615,
    "surfaceNote": "El aviso menciona una estructura de hormigón de 100 m²; no confirma que sea superficie cubierta computable ni vivienda terminada.",
    "observations": "La ficha declara zonificación Residencial 3 y FOT 1,0, y menciona usos residenciales mixtos y productivos. Los parámetros y usos deben confirmarse mediante certificado urbanístico municipal y expediente de obra; no valorar la estructura sin inspección técnica.",
    "lat": null,
    "lng": null,
    "geocodeQuery": "Joaquin V Gonzalez 2400, Moreno, Buenos Aires",
    "geocodeMatch": "JOAQUIN V GONZALEZ 2400",
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: Georef debe devolver una única coincidencia inequívoca para Joaquín V. González 2400.",
    "verificationStatus": "Ficha individual de Zonaprop accesible el 27/11/2026; precio, superficie y estructura declarados; disponibilidad no confirmada."
  },
  {
    "id": "desarrollo-polo-veinticinco-15ha-37-lotes",
    "recordType": "Desarrollo industrial privado · parque industrial y logístico",
    "name": "Polo Veinticinco · parque industrial · 15 ha · 37 lotes",
    "locality": "Cuartel V",
    "address": "Ruta Provincial 25 y Gral. Fructuoso Rivera, frente al Club de Campo San Diego, Cuartel V, Moreno",
    "source": "https://www.polo25.com/",
    "sourceAlternates": [
      {
        "url": "https://www.moreno.gob.ar/industrias-parques-web.php",
        "label": "Directorio oficial municipal de parques industriales"
      }
    ],
    "agency": "Polo Veinticinco · Krak RE (agencia de ventas)",
    "contact": "11 3888 2095 · info@krak.com.ar · Marcelo Alberto Napolitano, CMCPSI 6645 / CUCICBA 5456.",
    "price": null,
    "currency": null,
    "landSurfaceM2": 150000,
    "surfaceNote": "El sitio oficial declara 15 hectáreas (150.000 m²), 37 lotes y superficies individuales de 2.000 a 5.700 m². Admite industrias de categorías 1, 2 y 3; publica FOS 0,6 y FOT 1,0.",
    "observations": "El sitio oficial informa seguridad 24 h, energía de media tensión, fibra óptica, gas industrial, calles de hormigón, calzada de 10 m, cerco perimetral y tránsito pesado. Publica financiación con anticipo del 35% y 24 cuotas, sin lista de precios ni stock por lote. Algunos avisos de portales describen 17 ha y 30 lotes, discrepancia que debe aclarar el operador. El Municipio lista Polo 25 en Ruta 25 y Fructuoso Rivera y PIR25 en Ruta 25 y Moctezuma por separado; no son el mismo registro. El sitio oficial publica financiación con anticipo del 35% y 24 cuotas; no muestra importes ni lista de precios por lote.",
    "lat": null,
    "lng": null,
    "geocodeDisabled": true,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: se publica ubicación del parque, pero no plano parcelario georreferenciado para un marcador de lote.",
    "verificationStatus": "Sitio oficial de Polo Veinticinco accesible el 27/11/2026; el directorio municipal también lo identifica por separado de PIR25. No se verificaron avance físico, stock, precios ni escrituras de lotes."
  },
  {
    "id": "desarrollo-parque-industrial-reconquista-80ha",
    "recordType": "Desarrollo industrial privado · parque industrial",
    "name": "Parque Industrial Reconquista · 80 ha · Trujui",
    "locality": "Trujui",
    "address": "General Martín de Gainza 1900, Trujui, Moreno",
    "source": "https://www.grupoposadas.com.ar/proyectos/industrial",
    "sourceAlternates": [
      {
        "url": "https://www.moreno.gob.ar/industrias-parques-web.php",
        "label": "Directorio oficial municipal de parques industriales"
      },
      {
        "url": "https://www.moreno.gob.ar/noticia-detalle.php?id=6389",
        "label": "Fuente municipal 28/05/2025: 80 ha, 60 empresas y lotes disponibles ya adquiridos."
      }
    ],
    "agency": "Grupo Posadas",
    "contact": "+54 11 2153 1882 · info@grupoposadas.com.ar",
    "landSurfaceM2": 800000,
    "surfaceNote": "El desarrollador declara 80 hectáreas de superficie total, un galpón de 25.000 m² y lotes desde 2.400 a 15.000 m². No publica inventario individual, precio ni superficie cubierta de una unidad en venta.",
    "observations": "La ficha oficial de Grupo Posadas incluye Parque Industrial Reconquista en su cartera industrial. El Municipio también lo lista en Martín de Gainza al 2.000, Trujui. No se publican precios, stock de lotes, fecha de entrega, plano de subdivisión, zonificación parcelaria ni estado de obras; solicitar documentación y disponibilidad directamente al desarrollador. El Municipio informó el 28/05/2025 que el parque tiene 80 ha, 60 empresas con radicación confirmada y que todos los lotes disponibles ya habían sido adquiridos. No se presenta como stock abierto. Una publicación Zonaprop consultada el 27/11/2026 ofrece 3.420 m² por 'USD 150' sin unidad aclarada; se registra aparte como posible reventa pendiente.",
    "lat": null,
    "lng": null,
    "geocodeQuery": "General Martin de Gainza 1900, Trujui, Moreno, Buenos Aires",
    "geocodeMatch": "GENERAL MARTIN DE GAINZA 1900",
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: Georef debe devolver una coincidencia inequívoca para la dirección del acceso; el punto sería de parque, no parcelario.",
    "verificationStatus": "Desarrollador accesible y fuente municipal del 28/05/2025: parque de 80 ha, 60 empresas y todos los lotes disponibles ya adquiridos. Stock actual no verificado."
  },
  {
    "id": "desarrollo-parque-industrial-desarrollo-productivo-40ha",
    "recordType": "Parque industrial · desarrollado / comercialización no publicada",
    "name": "Parque Industrial Desarrollo Productivo · 40 ha · Cuartel V",
    "locality": "Cuartel V",
    "address": "Ruta Provincial 24 5801, Cuartel V, Moreno (a pocos metros de Ruta 25)",
    "source": "https://www.parqueproductivo.com.ar/",
    "sourceAlternates": [
      {
        "url": "https://www.moreno.gob.ar/industrias-parques-web.php",
        "label": "Directorio oficial municipal de parques industriales"
      }
    ],
    "agency": "Parque Industrial Desarrollo Productivo; operador inmobiliario no identificado en la ficha pública",
    "contact": "info@parqueproductivo.com.ar · contacto municipal publicado: desarrolloproductivopi@gmail.com",
    "landSurfaceM2": 400000,
    "surfaceNote": "El sitio oficial declara 40 hectáreas desarrolladas; menciona lago de 3 ha, calles internas de doble circuito, red eléctrica de media y baja tensión, y fibra óptica. No publica superficies de lotes individuales.",
    "observations": "El sitio lo presenta como parque desarrollado para industria y logística, con acceso para camiones y cercanía a RP25. El Municipio lo lista en Ruta 24 5801, Cuartel V. No se publica precio, stock de parcelas, plano de subdivisión ni disponibilidad actual; registrar como desarrollo/activo industrial, no como oferta de lote confirmada.",
    "lat": null,
    "lng": null,
    "geocodeDisabled": true,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: se conserva ubicación textual; no se asigna punto sin plano o dirección de acceso inequívoca.",
    "verificationStatus": "Sitio oficial accesible el 27/11/2026 declara 40 ha desarrolladas; el Municipio confirma dirección y correo de contacto. No hay precios ni inventario de parcelas publicados."
  }
];
publishedProperties.push(...nov27FollowupEntries);

const nov27CurrentReviewEntries = [
  {
    "id": "terreno-esteban-de-luca-2200-415",
    "recordType": "Terreno individual",
    "name": "Terreno en esquina · Esteban De Luca 2200 · 415 m²",
    "locality": "Moreno",
    "address": "Esteban De Luca al 2200, esquina De la Vega, Moreno",
    "source": "https://inmoclick.com/251109-cuccioli-propiedades/inmuebles/82/ficha/terreno-en-venta-en-esteban-de-luca-al-2200",
    "agency": "Cuccioli Propiedades",
    "contact": "Formulario público de Inmoclick; teléfono no expuesto.",
    "price": "USD 60.000",
    "currency": "USD",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: Georef debe confirmar una coincidencia inequívoca; no se asignan coordenadas manuales.",
    "verificationStatus": "Ficha directa accesible el 27/11/2026; disponibilidad comercial no confirmada.",
    "landSurfaceM2": 415,
    "geocodeQuery": "Esteban De Luca 2200, Moreno, Buenos Aires",
    "publicationDate": "Publicado hace 5 meses, según Inmoclick.",
    "surfaceNote": "Lote en esquina; la ficha declara gas natural y cloacas.",
    "observations": "Esquina de Esteban De Luca y De la Vega. Confirmar nomenclatura catastral, conexión efectiva de servicios, precio y disponibilidad."
  },
  {
    "id": "terreno-paysandu-900-380",
    "recordType": "Terreno con galpón y mejoras",
    "name": "Terreno con galpón, baño y pileta · Paysandú 900 · 380 m²",
    "locality": "Moreno Norte",
    "address": "Paysandú al 900, Moreno Norte",
    "source": "https://inmoclick.com/280711-mosca-propiedades/inmuebles/1045/ficha/terreno-en-venta-en-paysandu-al-900",
    "agency": "Mosca Propiedades",
    "contact": "Formulario público de Inmoclick; teléfono no expuesto.",
    "price": "USD 59.500",
    "currency": "USD",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: Georef debe confirmar una coincidencia inequívoca; no se asignan coordenadas manuales.",
    "verificationStatus": "Ficha directa accesible el 27/11/2026; disponibilidad comercial no confirmada.",
    "landSurfaceM2": 380,
    "coveredSurfaceM2": 20,
    "geocodeQuery": "Paysandu 900, Moreno, Buenos Aires",
    "publicationDate": "Publicado hace 7 días, según Inmoclick.",
    "surfaceNote": "380 m² totales y 20 m² cubiertos según ficha; describe galpón con baño, parrilla y pileta.",
    "observations": "El aviso lo ubica a 200 m de Av. Victorica y cerca del Shopping Nine. Cotejar plano y superficie cubierta real."
  },
  {
    "id": "terreno-agrelo-5300-1500",
    "recordType": "Terreno con mejoras · galpón y departamento",
    "name": "Terreno con galpón y departamento · Agrelo 5300 · 1.500 m²",
    "locality": "La Reja",
    "address": "Agrelo al 5300, La Reja, Moreno",
    "source": "https://inmoclick.com/252859-sabrina-peluso-inmobiliaria/inmuebles/2305/ficha/terreno-en-venta-en-agrelo-al-5300",
    "agency": "Sabrina Peluso Inmobiliaria",
    "contact": "Formulario público de Inmoclick; teléfono no expuesto.",
    "price": "USD 45.000",
    "currency": "USD",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: Georef debe confirmar una coincidencia inequívoca; no se asignan coordenadas manuales.",
    "verificationStatus": "Ficha directa accesible el 27/11/2026; disponibilidad comercial no confirmada.",
    "landSurfaceM2": 1500,
    "geocodeQuery": "Agrelo 5300, La Reja, Moreno, Buenos Aires",
    "publicationDate": "Publicado hace 3 meses, según Inmoclick.",
    "surfaceNote": "Galpón declarado de 12 × 12 m, dos baños, piso de hormigón, departamento y pileta; no se informa superficie cubierta total.",
    "observations": "El aviso lo ubica a 30 m de Ruta Provincial 25. Las dimensiones del galpón no equivalen a superficie cubierta total certificada. Verificar zonificación, habilitaciones, servicios y construcciones."
  },
  {
    "id": "terreno-jacinto-verdaguer-juan-maciel-1500",
    "recordType": "Terreno / bloque de lotes",
    "name": "Bloque de lotes · Jacinto Verdaguer y Juan B. Maciel · 1.500 m²",
    "locality": "La Reja",
    "address": "Jacinto Verdaguer esquina Juan B. Maciel, La Reja, Moreno",
    "source": "https://inmoclick.com/252859-sabrina-peluso-inmobiliaria/inmuebles/2511/ficha/terreno-en-venta-en-jacinto-verdaguer-esq-juan-b-maciel",
    "agency": "Sabrina Peluso Inmobiliaria",
    "contact": "Formulario público de Inmoclick; teléfono no expuesto.",
    "price": "USD 60.000",
    "currency": "USD",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: se conserva la esquina publicada; no se asigna punto parcelario sin identificación catastral.",
    "verificationStatus": "Ficha directa accesible el 27/11/2026; disponibilidad comercial no confirmada.",
    "landSurfaceM2": 1500,
    "geocodeQuery": "Jacinto Verdaguer y Juan B Maciel, La Reja, Moreno, Buenos Aires",
    "publicationDate": "Publicado hace 3 meses, según Inmoclick.",
    "surfaceNote": "La ficha declara un bloque de 1.500 m² (37,50 × 40 m); habla de lotes en plural y precio promocional por bloque, sin cantidad ni subdivisión.",
    "observations": "Ubicado junto a Prados del Oeste y Las Tres Marías, a unos 300 m de Ruta 25 según el aviso. Se ofrece anticipo de USD 30.000 y saldo a convenir. No asumir que los 1.500 m² son una única parcela; pedir plano y nomenclatura.",
    "geocodeDisabled": true
  },
  {
    "id": "terreno-jose-marti-1000-2164",
    "recordType": "Terreno para desarrollo",
    "name": "Terreno de escala · José Martí 1000 · 2.164 m²",
    "locality": "Francisco Álvarez",
    "address": "José Martí 1000, Francisco Álvarez, Moreno",
    "source": "https://inmoclick.com/17494-re-max-elite/inmuebles/8648/ficha/terreno-en-venta-en-jose-marti-1000",
    "agency": "RE/MAX Elite",
    "contact": "Formulario público de Inmoclick; teléfono no expuesto.",
    "price": "USD 59.000",
    "currency": "USD",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: Georef debe confirmar una coincidencia inequívoca; no se asignan coordenadas manuales.",
    "verificationStatus": "Ficha directa accesible el 27/11/2026; disponibilidad comercial no confirmada.",
    "landSurfaceM2": 2164,
    "geocodeQuery": "Jose Marti 1000, Francisco Alvarez, Moreno, Buenos Aires",
    "publicationDate": "Publicado hace 15 días, según Inmoclick.",
    "surfaceNote": "2.164 m²; el aviso publica R5, FOS 0,4 y FOT 0,5, pero declara que no dispone de agua corriente ni cloacas.",
    "observations": "A unos 70 m de la colectora sur de Acceso Oeste y 200 m de la bajada del km 44, según el aviso. Zonificación, FOS/FOT, usos y restricciones son datos del anunciante; validar con certificado urbanístico. La falta de agua y cloacas es una contingencia relevante."
  },
  {
    "id": "terreno-lorenzo-lopez-300-1123",
    "recordType": "Terreno individual",
    "name": "Terreno parquizado · Lorenzo López 300 · 1.123 m²",
    "locality": "Francisco Álvarez",
    "address": "Lorenzo López 300, esquina San Martín, Francisco Álvarez, Moreno",
    "source": "https://www.zonaprop.com.ar/propiedades/clasificado/vecltrin-terreno-francisco-alvarez-56486428.html",
    "agency": "Mosca Propiedades · publicación en Zonaprop",
    "contact": "WhatsApp público de Mosca Propiedades: +54 11 3240-1534 (publicado en Proppies).",
    "price": "USD 39.900",
    "currency": "USD",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: Georef debe confirmar una coincidencia inequívoca; no se asignan coordenadas manuales.",
    "verificationStatus": "Ficha directa accesible el 27/11/2026; disponibilidad comercial no confirmada.",
    "landSurfaceM2": 1123,
    "phone": "+541132401534",
    "geocodeQuery": "Lorenzo Lopez 300, Francisco Alvarez, Moreno, Buenos Aires",
    "sourceAlternates": [
      {
        "url": "https://proppies.app/propiedad/buenos-aires/moreno/terreno-en-venta-en-francisco-alvarez-45664693",
        "label": "Ficha sindicada de Proppies con WhatsApp público e historial de precio"
      }
    ],
    "publicationDate": "Publicado hace 2 meses en Proppies; reducción registrada el 07/10/2026 de USD 42.900 a USD 39.900.",
    "surfaceNote": "La ficha técnica informa 1.123 m²; la descripción redondea a 1.100 m². Lote parquizado con arboleda.",
    "observations": "En la intersección de Lorenzo López y San Martín, a unos 150 m del Cruce La Tradición, según el aviso. Proppies registra reducción de USD 42.900 a USD 39.900 el 07/10/2026. Confirmar medidas, precio y disponibilidad."
  },
  {
    "id": "terreno-puccini-1600-366",
    "recordType": "Terreno comercial",
    "name": "Terreno comercial · Puccini 1600 · 366 m²",
    "locality": "Trujui",
    "address": "Puccini al 1600, Trujui, Moreno",
    "source": "https://inmoclick.com/275867-kw-on/inmuebles/73/ficha/terreno-en-venta-en-puccini-al-1600",
    "agency": "Keller Williams ON",
    "contact": "Julian Aguilar Amat, CMCPSI 6737 / CUCICBA 7839; contacto mediante Inmoclick.",
    "price": "USD 42.000",
    "currency": "USD",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: Georef debe confirmar una coincidencia inequívoca; no se asignan coordenadas manuales.",
    "verificationStatus": "Ficha directa accesible el 27/11/2026; disponibilidad comercial no confirmada.",
    "landSurfaceM2": 366,
    "geocodeQuery": "Puccini 1600, Trujui, Moreno, Buenos Aires",
    "publicationDate": "Publicado hace 1 mes, según Inmoclick.",
    "surfaceNote": "366 m²; el aviso lo presenta como terreno comercial, sin superficie cubierta informada.",
    "observations": "El aviso lo ubica frente a escuelas y una sala de primeros auxilios, con acceso a transporte y servicios. La aptitud comercial y usos permitidos deben confirmarse con normativa municipal."
  },
  {
    "id": "terreno-juan-diaz-de-solis-3400-350",
    "recordType": "Terreno individual dentro del complejo cerrado Solares de Zapiola · publicaciones divergentes",
    "name": "Solares de Zapiola · Juan Díaz de Solís 3400 · ficha con superficie y precio divergentes",
    "locality": "Paso del Rey",
    "address": "Juan Díaz de Solís 3400, Solares de Zapiola, Paso del Rey, Moreno",
    "source": "https://platastar.com/propiedad/terreno-de-450-m2-en-venta-en-moreno-539c7e7f",
    "sourceAlternates": [{url:"https://inmoclick.com/143272-remax-up/inmuebles/1518/ficha/terreno-en-venta-en-juan-diaz-de-solis-3400",label:"Ficha anterior de Inmoclick: USD 36.000 y 350 m²; posible misma parcela o lote distinto del complejo."}],
    "agency": "RE/MAX Up",
    "contact": "Alejo Gabriel González · RE/MAX Up, formulario de PlataStar; la ficha anterior de Inmoclick no expone teléfono.",
    "price": "USD 29.500 (PlataStar) / USD 36.000 (Inmoclick)",
    "currency": "USD",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "Pendiente de revalidación",
    "geolocationStatus": "Pendiente: lote interno sin número; la dirección identifica el complejo, no la parcela.",
    "verificationStatus": "PlataStar accesible el 27/11/2026, publicada el 16/10/2026: USD 29.500 y 450 m². Inmoclick mantiene una ficha del mismo domicilio/desarrollo con USD 36.000 y 350 m². Sin lote interno no se puede confirmar si es la misma parcela; verificar precio, superficie y disponibilidad.",
    "landSurfaceM2": null,
    "publicationDate": "PlataStar: 16/10/2026; ficha anterior de Inmoclick: fecha no revalidada.",
    "surfaceNote": "PlataStar publica 450 m²; ficha anterior de Inmoclick publica 350 m². Ninguna identifica número interno de lote; no adoptar una superficie hasta cotejar plano y parcela.",
    "observations": "Lote anunciado dentro de Solares de Zapiola, complejo cerrado de 28 lotes sobre un predio de 15.000 m², con servicios instalados, asfalto interior y seguridad; a 700 m de Acceso Oeste y a 20 minutos de la estación de Paso del Rey. La ficha de PlataStar publica USD 29.500 y 450 m²; la ficha previa de Inmoclick publica USD 36.000 y 350 m² para Juan Díaz de Solís 3400. Sin número de lote, puede ser una diferencia de medición o parcelas distintas. El aviso menciona financiación hipotecaria de hasta 35%, sujeta a condiciones del anunciante.",
    "geocodeDisabled": true
  },
  {
    "id": "terreno-ruta5-cadiz-320",
    "recordType": "Terreno comercial con dos viviendas",
    "name": "Terreno comercial con dos casas · Ruta 5 (Ex 7) y Cádiz · 320 m²",
    "locality": "Francisco Álvarez",
    "address": "Ruta 5 (Ex 7), esquina Cádiz, Francisco Álvarez, Moreno",
    "source": "https://inmoclick.com/288702-ir-inmobiliaria/inmuebles/198/ficha/terreno-en-venta-en-ruta-5-ex-7-esquina-cadiz",
    "agency": "IR Inmobiliaria · Ivana Ramírez, CMCPDJM 4060",
    "contact": "Formulario público de Inmoclick; teléfono no expuesto.",
    "price": "USD 45.000",
    "currency": "USD",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: Georef debe confirmar una coincidencia inequívoca; no se asignan coordenadas manuales.",
    "verificationStatus": "Ficha directa accesible el 27/11/2026; disponibilidad comercial no confirmada.",
    "landSurfaceM2": 320,
    "geocodeQuery": "Ruta 5 Ex 7 y Cadiz, Francisco Alvarez, Moreno, Buenos Aires",
    "publicationDate": "Publicado hace 4 meses, según Inmoclick.",
    "surfaceNote": "320 m² totales; el aviso describe dos casas, sin superficie cubierta conjunta.",
    "observations": "El anunciante lo presenta como terreno comercial, listo para escriturar, con financiación del 50% y opción a un segundo lote. Confirmar títulos, planos de ambas construcciones y si el segundo lote es otra parcela."
  },
  {
    "id": "quinta-racine-300-678",
    "recordType": "Casa quinta / terreno con construcción",
    "name": "Quinta a refaccionar · Racine J al 300 · 678 m²",
    "locality": "Moreno",
    "address": "Racine J al 300, Moreno (localidad no precisada)",
    "source": "https://inmoclick.com/244112-intermedia-estudio-inmobiliario/inmuebles/1199/ficha/terreno-en-venta-en-racine-j-al-300",
    "agency": "Intermedia Estudio Inmobiliario",
    "contact": "Formulario público de Inmoclick; teléfono no expuesto.",
    "price": "USD 46.000",
    "currency": "USD",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: Georef debe confirmar una coincidencia inequívoca; no se asignan coordenadas manuales.",
    "verificationStatus": "Ficha directa accesible el 27/11/2026; disponibilidad comercial no confirmada.",
    "landSurfaceM2": 678,
    "geocodeQuery": "Racine J 300, Moreno, Buenos Aires",
    "publicationDate": "Publicado hace 1 mes, según Inmoclick.",
    "surfaceNote": "678 m²; existe construcción rústica de unos 50 años, pero no se informa superficie cubierta. Describe parque, pileta circular, parrilla y sector semicubierto.",
    "observations": "La publicación recomienda refacción. No considerar la construcción como superficie habitable o computable hasta revisar planos, estado estructural, servicios y documentación."
  },
  {
    "id": "terreno-dr-vera-1200-374",
    "recordType": "Terreno con vivienda a refaccionar",
    "name": "Terreno con casa a refaccionar · Dr. Vera 1200 · 374 m²",
    "locality": "Moreno Centro",
    "address": "Dr. Vera al 1200, Moreno",
    "source": "https://inmoclick.com/280711-mosca-propiedades/inmuebles/503/ficha/terreno-en-venta-en-dr-vera-al-1200",
    "agency": "Mosca Propiedades",
    "contact": "Formulario público de Inmoclick; teléfono no expuesto.",
    "price": "USD 42.000",
    "currency": "USD",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: Georef debe confirmar una coincidencia inequívoca; no se asignan coordenadas manuales.",
    "verificationStatus": "Ficha directa accesible el 27/11/2026; disponibilidad comercial no confirmada.",
    "landSurfaceM2": 374,
    "coveredSurfaceM2": 50,
    "geocodeQuery": "Doctor Vera 1200, Moreno, Buenos Aires",
    "publicationDate": "Publicado hace 1 mes, según Inmoclick.",
    "surfaceNote": "Lote de 8,66 × 43 m, con estructura cubierta de 50 m² a refaccionar.",
    "observations": "El aviso indica cercanía a estación y centro comercial y disponibilidad de agua, cloacas, gas y electricidad. Confirmar conexiones efectivas, estado de la construcción y normativa."
  },
  {
    "id": "terreno-salta-nemesio-alvarez-600",
    "recordType": "Terreno con construcción a terminar",
    "name": "Terreno con construcción a terminar · Salta / Nemesio Álvarez · 600 m²",
    "locality": "Francisco Álvarez",
    "address": "Título: Salto y Nemesio Álvarez; descripción: Salta entre Nemesio Álvarez y Río de Janeiro, Francisco Álvarez, Moreno",
    "source": "https://inmoclick.com/280711-mosca-propiedades/inmuebles/47/ficha/terreno-en-venta-en-salto-y-nemesio-alvarez",
    "agency": "Mosca Propiedades",
    "contact": "Formulario público de Inmoclick; teléfono no expuesto.",
    "price": "USD 29.999",
    "currency": "USD",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: discrepancia entre título y descripción de la calle; no geolocalizar hasta confirmar dirección.",
    "verificationStatus": "Ficha directa accesible el 27/11/2026; disponibilidad comercial no confirmada.",
    "landSurfaceM2": 600,
    "coveredSurfaceM2": 40,
    "publicationDate": "Publicado hace 1 mes, según Inmoclick.",
    "surfaceNote": "600 m² de terreno y 40 m² de construcción a terminar, según descripción.",
    "observations": "La dirección difiere entre título (Salto) y descripción (Salta entre Nemesio Álvarez y Río de Janeiro). Se conserva ubicación textual y no se asigna punto hasta resolver discrepancia.",
    "geocodeDisabled": true
  },
  {
    "id": "terreno-felix-mendelsohn-1400-325",
    "recordType": "Terreno con vivienda a refaccionar",
    "name": "Terreno con vivienda a refaccionar · Félix Mendelsohn 1400 · 325 m²",
    "locality": "Paso del Rey",
    "address": "Félix Mendelsohn 1400, Paso del Rey, Moreno",
    "source": "https://inmoclick.com/17501-re-max-life/inmuebles/15332/ficha/terreno-en-venta-en-felix-mendelsohn-1400",
    "agency": "RE/MAX Life",
    "contact": "Formulario público de Inmoclick; teléfono no expuesto.",
    "price": "USD 49.000",
    "currency": "USD",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: Georef debe confirmar una coincidencia inequívoca; no se asignan coordenadas manuales.",
    "verificationStatus": "Ficha directa accesible el 27/11/2026; disponibilidad comercial no confirmada.",
    "landSurfaceM2": 325,
    "coveredSurfaceM2": 54,
    "geocodeQuery": "Felix Mendelsohn 1400, Paso del Rey, Moreno, Buenos Aires",
    "publicationDate": "Publicado hace 15 días, según Inmoclick.",
    "surfaceNote": "325 m² de terreno y vivienda existente de aproximadamente 54 m² cubiertos, a refaccionar.",
    "observations": "El aviso destaca cercanía de unos 50 m a Acceso Oeste y financiación de hasta 35% según condiciones del anunciante. Verificar estado de vivienda, planos y normativa."
  },
  {
    "id": "terreno-la-tradicion-700-719",
    "recordType": "Terreno en barrio privado",
    "name": "Lote 35 · Fincas de Álvarez · La Tradición 700 · 719 m²",
    "locality": "Francisco Álvarez",
    "address": "La Tradición 700, Fincas de Álvarez, Francisco Álvarez, Moreno · UF 35",
    "source": "https://inmoclick.com/248084-re-max-namai/inmuebles/1343/ficha/terreno-en-venta-en-la-tradicion-700",
    "agency": "RE/MAX Namai",
    "contact": "Formulario público de Inmoclick; teléfono no expuesto.",
    "price": "USD 69.000",
    "currency": "USD",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: el lote interno UF 35 no tiene coordenada parcelaria pública verificable.",
    "verificationStatus": "Ficha directa accesible el 27/11/2026; disponibilidad comercial no confirmada.",
    "landSurfaceM2": 719,
    "publicationDate": "Publicado hace 15 días, según Inmoclick.",
    "surfaceNote": "Unidad funcional 35 de 719 m². El aviso declara agua, gas, electricidad, internet, cloacas y seguridad.",
    "observations": "El aviso publica expensas mensuales de $850.000. Confirmar expensas vigentes, reglamento, deuda, servicios y escritura. No se conoce la posición exacta del lote dentro del barrio.",
    "geocodeDisabled": true
  },
  {
    "id": "terreno-joaquin-v-gonzalez-600-612",
    "recordType": "Terreno con losa / obra parcial",
    "name": "Terreno con losa · Joaquín V. González 600 · 612 m²",
    "locality": "Moreno",
    "address": "Joaquín V. González 600, Moreno",
    "source": "https://inmoclick.com/280711-mosca-propiedades/inmuebles/793/ficha/terreno-en-venta-en-joaquin-v-gonzales-600",
    "agency": "Mosca Propiedades",
    "contact": "Formulario público de Inmoclick; teléfono no expuesto.",
    "price": "USD 61.500",
    "currency": "USD",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: Georef debe confirmar una coincidencia inequívoca; no se asignan coordenadas manuales.",
    "verificationStatus": "Ficha directa accesible el 27/11/2026; disponibilidad comercial no confirmada.",
    "landSurfaceM2": 612,
    "coveredSurfaceM2": 110,
    "geocodeQuery": "Joaquin V Gonzalez 600, Moreno, Buenos Aires",
    "publicationDate": "Publicado hace 1 mes, según Inmoclick.",
    "surfaceNote": "612 m² de terreno y losa construida de aproximadamente 110 m²; no equivale a superficie cubierta terminada.",
    "observations": "El aviso declara zonificación R3, todos los servicios y cercanía a Av. Güemes. Zonificación y posibilidad de desarrollo deben verificarse con certificado urbanístico y documentación de la losa."
  },
  {
    "id": "terreno-las-tres-marias-lote-6-411",
    "recordType": "Terreno individual en desarrollo",
    "name": "Lote 6 · Las Tres Marías · 411 m²",
    "locality": "La Reja",
    "address": "Las Tres Marías, lote 6, La Reja, Moreno",
    "source": "https://inmoclick.com/252859-sabrina-peluso-inmobiliaria/inmuebles/2372/ficha/terreno-en-venta-en-las-tres-marias-lote-6",
    "agency": "Sabrina Peluso Inmobiliaria",
    "contact": "Formulario público de Inmoclick; teléfono no expuesto.",
    "price": "USD 48.050",
    "currency": "USD",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: el aviso identifica lote interno 6, pero no publica plano parcelario georreferenciado.",
    "verificationStatus": "Ficha directa accesible el 27/11/2026; disponibilidad comercial no confirmada.",
    "landSurfaceM2": 411,
    "publicationDate": "Publicado hace 4 meses, según Inmoclick.",
    "surfaceNote": "Lote 6 de 411 m². El aviso anuncia barrio perimetrado y lotes escriturables, según el vendedor.",
    "observations": "Financiación publicada: anticipo USD 5.000 + 75 cuotas de USD 570 y una última cuota de USD 300; suma USD 48.050. Verificar escritura individual, reglamento, expensas, servicios y que lote 6 siga libre.",
    "geocodeDisabled": true
  },
  {
    "id": "terreno-prados-del-oeste-2-lote-central-839",
    "recordType": "Terreno individual en desarrollo",
    "name": "Lote central · Prados del Oeste II · 839,12 m²",
    "locality": "Moreno · Prados del Oeste II",
    "address": "Prados del Oeste II, Moreno · lote central, número interno no publicado",
    "source": "https://inmoclick.com/252859-sabrina-peluso-inmobiliaria/inmuebles/1574/ficha/terreno-en-venta-en-prados-del-oeste-2",
    "agency": "Sabrina Peluso Inmobiliaria",
    "contact": "Formulario público de Inmoclick; teléfono no expuesto.",
    "price": "USD 52.400",
    "currency": "USD",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: falta número de lote y plano parcelario para ubicar marcador.",
    "verificationStatus": "Ficha directa accesible el 27/11/2026; disponibilidad comercial no confirmada.",
    "landSurfaceM2": 839.12,
    "publicationDate": "Publicado hace 7 meses, según Inmoclick.",
    "surfaceNote": "Lote central anunciado de 839,12 m²; el desarrollo se describe con 97 hectáreas y 256 lotes.",
    "observations": "El aviso lo presenta como último lote central y ofrece financiación con anticipo USD 23.300 más 12 cuotas. No se publica número interno. Confirmar stock, expensas, reglamento, plano y financiación.",
    "geocodeDisabled": true
  },
  {
    "id": "terreno-prados-del-oeste-2-lote-esquina-814",
    "recordType": "Terreno individual en desarrollo",
    "name": "Lote esquina · Prados del Oeste II · 814,11 m²",
    "locality": "Moreno · Prados del Oeste II",
    "address": "Prados del Oeste II, Moreno · lote esquina, número interno no publicado",
    "source": "https://inmoclick.com/252859-sabrina-peluso-inmobiliaria/inmuebles/1575/ficha/terreno-en-venta-en-prados-del-oeste-2",
    "agency": "Sabrina Peluso Inmobiliaria",
    "contact": "Formulario público de Inmoclick; teléfono no expuesto.",
    "price": "USD 41.900",
    "currency": "USD",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: falta número de lote y plano parcelario para ubicar marcador.",
    "verificationStatus": "Ficha directa accesible el 27/11/2026; disponibilidad comercial no confirmada.",
    "landSurfaceM2": 814.11,
    "publicationDate": "Publicado hace 7 meses, según Inmoclick.",
    "surfaceNote": "Lote esquina de 814,11 m²; encabezado redondea a 814 m².",
    "observations": "Financiación publicada: anticipo USD 18.600 más 12 cuotas. El aviso describe un desarrollo de 97 hectáreas y 256 lotes, sin informar número interno. Confirmar stock, expensas, reglamento y plano.",
    "geocodeDisabled": true
  },
  {
    "id": "terreno-general-hornos-200-prados-del-oeste-2-786",
    "recordType": "Terreno individual en desarrollo",
    "name": "Lote · General Hornos 200 · Prados del Oeste II · 786 m²",
    "locality": "Moreno · Prados del Oeste II",
    "address": "General Hornos 200, acceso de Prados del Oeste II, Moreno; lote interno no informado",
    "source": "https://inmoclick.com/68938-re-max-village/inmuebles/1742/ficha/terreno-en-venta-en-general-hornos-200",
    "agency": "RE/MAX Village",
    "contact": "Formulario público de Inmoclick; teléfono no expuesto.",
    "price": "USD 37.000",
    "currency": "USD",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: General Hornos 200 identifica el acceso/desarrollo, no la parcela individual.",
    "verificationStatus": "Ficha directa accesible el 27/11/2026; disponibilidad comercial no confirmada.",
    "landSurfaceM2": 786,
    "publicationDate": "Publicado hace 15 días, según Inmoclick.",
    "surfaceNote": "786 m²; no se informa número interno de lote.",
    "observations": "El anunciante afirma infraestructura 100% terminada, amenities operativos, 114 propietarios, plano aprobado y posesión inmediata. Pedir plano aprobado, reglamento, escritura, expensas y confirmación del lote específico.",
    "geocodeDisabled": true
  },
  {
    "id": "terreno-domingo-martinez-de-irala-1600-1107",
    "recordType": "Terreno individual",
    "name": "Terreno · Domingo Martínez de Irala 1600 · 1.107 m²",
    "locality": "Francisco Álvarez",
    "address": "Domingo Martínez de Irala al 1600, Francisco Álvarez, Moreno",
    "source": "https://inmoclick.com/288702-ir-inmobiliaria/inmuebles/234/ficha/terreno-en-venta-en-domingo-martinez-de-irala-al-1600",
    "agency": "IR Inmobiliaria · Ivana Ramírez, CMCPDJM 4060",
    "contact": "Formulario público de Inmoclick; teléfono no expuesto.",
    "price": "USD 35.000",
    "currency": "USD",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: Georef debe confirmar una coincidencia inequívoca; no se asignan coordenadas manuales.",
    "verificationStatus": "Ficha directa accesible el 27/11/2026; disponibilidad comercial no confirmada.",
    "landSurfaceM2": 1107,
    "geocodeQuery": "Domingo Martinez de Irala 1600, Francisco Alvarez, Moreno, Buenos Aires",
    "publicationDate": "Publicado hace 3 meses, según Inmoclick.",
    "surfaceNote": "1.107 m²; frente 25,45 m por fondo 43,49 m, según el aviso.",
    "observations": "La publicación declara tranquera de acceso y que está listo para escriturar; ubica el lote a 50 m de Intendente Tulissi y a pocos minutos de estación y Ruta 7. Verificar título, mensura, servicios, zonificación y precio."
  },
  {
    "id": "terreno-vicente-lopez-y-planes-1300-240",
    "recordType": "Terreno con construcción a reacondicionar",
    "name": "Terreno con construcción · Vicente López y Planes 1300 · 240 m²",
    "locality": "Moreno",
    "address": "Vicente López y Planes al 1300, Moreno",
    "source": "https://inmoclick.com/251109-cuccioli-propiedades/inmuebles/29/ficha/terreno-en-venta-en-vicente-lopez-y-planes-al-1300",
    "agency": "Cuccioli Propiedades",
    "contact": "Formulario público de Inmoclick; teléfono no expuesto.",
    "price": "USD 35.000",
    "currency": "USD",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: Georef debe confirmar una coincidencia inequívoca; no se asignan coordenadas manuales.",
    "verificationStatus": "Ficha directa accesible el 27/11/2026; disponibilidad comercial no confirmada.",
    "landSurfaceM2": 240,
    "coveredSurfaceM2": 30,
    "geocodeQuery": "Vicente Lopez y Planes 1300, Moreno, Buenos Aires",
    "publicationDate": "Publicado hace 6 meses, según Inmoclick.",
    "surfaceNote": "240 m² de terreno y 30 m² cubiertos; una habitación, un baño y cochera para dos vehículos, según ficha.",
    "observations": "El aviso describe construcción a reacondicionar. Verificar planos, estado edilicio, servicios, título y precio por antigüedad de la publicación."
  },
  {
    "id": "casa-emilio-mitre-2200-782",
    "recordType": "Casa individual",
    "name": "Casa con parque y pileta · Emilio Mitre 2200",
    "locality": "Moreno",
    "address": "Emilio Mitre 2200, Moreno",
    "source": "https://www.argenprop.com/casa-en-venta-en-moreno-4-ambientes--19727397",
    "agency": "Mateo Propiedades · aviso en Argenprop",
    "contact": "Mateo Propiedades, matrícula 203 Dpto. M-Gr.; teléfono parcialmente visible en Argenprop, no se consigna incompleto.",
    "price": "USD 180.000",
    "currency": "USD",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: Georef debe confirmar una coincidencia inequívoca; no se asignan coordenadas manuales.",
    "verificationStatus": "Ficha directa de Argenprop accesible el 27/11/2026; publicación alternativa duplicada retirada (410 Gone), disponibilidad no confirmada.",
    "landSurfaceM2": 782,
    "coveredSurfaceM2": 247,
    "publicationDate": "Fecha original no informada; ficha directa accesible el 27/11/2026.",
    "surfaceNote": "782 m² de terreno y 247 m² cubiertos; 3 dormitorios, 3 baños, pileta y parque.",
    "sourceAlternates": [
      {
        "url": "https://www.zonaprop.com.ar/propiedades/clasificado/veclqvin-venta-quinta-5-amb.-pileta-y-parque.-moreno-sur-60398073.html",
        "label": "Publicación alternativa de la misma dirección; enlace devuelve 410 Gone y último precio indexado USD 175.000"
      }
    ],
    "observations": "La misma dirección y superficies aparecen en una publicación alternativa de Zonaprop/RE/MAX New con último precio indexado de USD 175.000; ese enlace devuelve 410 Gone el 27/11/2026. Se conserva un único registro para evitar duplicar la propiedad. Confirmar precio actual con Mateo Propiedades.",
    "geocodeQuery": "Emilio Mitre 2200, Moreno, Buenos Aires"
  },
  {
    "id": "casa-zeballos-600-382",
    "recordType": "Casa individual",
    "name": "Casa a estrenar · Zeballos 600 · 382 m² de terreno",
    "locality": "Moreno Centro",
    "address": "Zeballos 600, Moreno Centro",
    "source": "https://www.argenprop.com/casa-en-venta-en-centro-moreno-4-ambientes--18854189",
    "agency": "LEAL PROP SA",
    "contact": "Leonardo Héctor Pereyra, CUCICBA 9908 / CMCPDJM 2904; contacto por Argenprop, teléfono no visible completo.",
    "price": "USD 89.000",
    "currency": "USD",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: Georef debe confirmar una coincidencia inequívoca; no se asignan coordenadas manuales.",
    "verificationStatus": "Ficha directa accesible el 27/11/2026; disponibilidad comercial no confirmada.",
    "landSurfaceM2": 382,
    "coveredSurfaceM2": 133,
    "geocodeQuery": "Zeballos 600, Moreno, Buenos Aires",
    "publicationDate": "Fecha original no informada; ficha directa accesible el 27/11/2026.",
    "surfaceNote": "382 m² de terreno y 133 m² cubiertos; 2 dormitorios, 1 baño, 4 ambientes y 2 cocheras.",
    "observations": "El aviso la describe a estrenar, con jardín, lavadero, espacio de guardado y cochera cubierta y descubierta. Verificar planos, aptitud crediticia, título y disponibilidad."
  },
  {
    "id": "casa-posadas-1100-390",
    "recordType": "Casa individual",
    "name": "Casa a estrenar · Posadas 1100 · 390 m² de terreno",
    "locality": "Moreno Centro",
    "address": "Posadas 1100, Moreno Centro",
    "source": "https://www.argenprop.com/casa-en-venta-en-centro-moreno-4-ambientes--19279435",
    "agency": "C21 BUI / Build It Up SRL",
    "contact": "Pablo Javier Stodart, CSI 6617 / CPI 6803; contacto por Argenprop, teléfono no visible completo.",
    "price": "USD 65.000",
    "currency": "USD",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: Georef debe confirmar una coincidencia inequívoca; no se asignan coordenadas manuales.",
    "verificationStatus": "Ficha directa accesible el 27/11/2026; disponibilidad comercial no confirmada.",
    "landSurfaceM2": 390,
    "coveredSurfaceM2": 139,
    "geocodeQuery": "Posadas 1100, Moreno, Buenos Aires",
    "publicationDate": "Fecha original no informada; ficha directa accesible el 27/11/2026.",
    "surfaceNote": "390 m² de terreno y 139 m² cubiertos; 2 dormitorios, 1 baño, 4 ambientes y 2 cocheras.",
    "observations": "El aviso describe casa a estrenar, garage techado con entrepiso y fondo con baño y lavadero. Verificar planos, final de obra, título y disponibilidad."
  },
  {
    "id": "casa-doctor-marcelo-alvear-2800-1125",
    "recordType": "Casa individual sobre lote amplio",
    "name": "Casa quinta · Dr. Marcelo T. de Alvear 2800 / 2878 · 1.125 m²",
    "locality": "Moreno",
    "address": "Doctor Marcelo T. de Alvear 2800 (el cuerpo de la descripción indica 2878), Moreno",
    "source": "https://www.zonaprop.com.ar/propiedades/clasificado/veclcain-casa-4-ambientes-en-venta-parque-y-pileta-moreno-60779386.html",
    "sourceAlternates": [{ "url": "https://plataplace.com/propiedad/casa-de-4-ambientes-en-venta-en-moreno-573fa442", "label": "Ficha de PlataPlace; aviso activo y visto el 26/11/2026" }],
    "agency": "RE/MAX Argentina",
    "contact": "Franco Casella; corredores responsables Gabriel Castellanos, CMCPM 3107, y María José Sosa Viñoles, CPI 9915; teléfono no visible.",
    "price": "USD 139.000",
    "currency": "USD",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: discrepancia entre altura 2800 y 2878; no asignar coordenadas hasta confirmar puerta y parcela.",
    "verificationStatus": "Ficha directa de Zonaprop accesible el 27/11/2026; dirección inconsistente dentro del aviso y disponibilidad no confirmada.",
    "landSurfaceM2": 1125,
    "coveredSurfaceM2": 110,
    "publicationDate": "Ficha sindicada informa publicación el 24/09/2026; ficha directa accesible el 27/11/2026.",
    "surfaceNote": "1.125 m² de terreno, 110 m² cubiertos y 15 m² semicubiertos; 3 dormitorios, pileta, galería y cochera.",
    "observations": "La dirección difiere entre encabezado (2800) y descripción (2878). PlataPlace mostraba el aviso activo y visto el 26/11/2026; la ficha directa de Zonaprop seguía accesible el 27/11/2026. La descripción informa 1.125 m² de lote, 110 m² cubiertos y 15 m² semicubiertos, mientras la cabecera de Zonaprop indica 1.140 m² totales. No geolocalizar hasta resolver numeración. Verificar superficies, planos, servicios, estado de pileta y disponibilidad.",
    "geocodeDisabled": true
  },
  {
    "id": "casa-primero-de-mayo-125-311",
    "recordType": "Casa individual",
    "name": "Casa con pileta y quincho · Primero de Mayo 125",
    "locality": "Moreno · Barrio Alcorta según descripción",
    "address": "Primero de Mayo 125, Moreno; la descripción ubica la propiedad en Barrio Alcorta",
    "source": "https://www.zonaprop.com.ar/propiedades/clasificado/veclcain-casa-3-dorm.-parque-pileta-quincho-moreno-57146199.html",
    "agency": "Fernanda Jorge Mandarini · publicación en Zonaprop",
    "contact": "Formulario público de Zonaprop; teléfono no visible en ficha consultada.",
    "price": "USD 130.000",
    "currency": "USD",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: dirección y barrio no son consistentes dentro de la ficha.",
    "verificationStatus": "Ficha directa de Zonaprop accesible el 27/11/2026; discrepancia de ubicación y disponibilidad no confirmada.",
    "landSurfaceM2": 311,
    "coveredSurfaceM2": 153,
    "publicationDate": "Fecha original no informada; ficha directa accesible el 27/11/2026.",
    "surfaceNote": "311 m² totales y 153 m² cubiertos; descripción refiere aproximadamente 311,5 m² de terreno.",
    "observations": "La ficha publica dirección Primero de Mayo 125, pero la descripción identifica Barrio Alcorta. Incluye 3 dormitorios, pileta, quincho, galpón y cochera para 3 autos. Confirmar dirección, parcela, superficies y documentación.",
    "geocodeDisabled": true
  },
  {
    "id": "inmueble-mixto-saenz-pena-2200",
    "recordType": "Inmueble mixto residencial / comercial",
    "name": "Casa con dos locales comerciales · Sáenz Peña 2200",
    "locality": "Moreno Centro",
    "address": "Sáenz Peña 2200, Moreno",
    "source": "https://www.zonaprop.com.ar/propiedades/clasificado/veclcain-venta-casa-5-ambientes-con-locales-en-moreno-58204566.html",
    "agency": "Estudio I14 · publicación en Zonaprop",
    "contact": "Formulario público de Zonaprop; teléfono y responsable comercial no visibles en ficha consultada.",
    "price": "USD 249.900",
    "currency": "USD",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: Georef debe confirmar una coincidencia inequívoca; no se asignan coordenadas manuales.",
    "verificationStatus": "Ficha directa de Zonaprop accesible el 27/11/2026; superficies contradictorias y disponibilidad no confirmada.",
    "geocodeQuery": "Saenz Pena 2200, Moreno, Buenos Aires",
    "publicationDate": "Fecha original no informada; ficha directa accesible el 27/11/2026.",
    "surfaceNote": "Ficha técnica: 220 m² totales y 300 m² cubiertos, dato inconsistente. La descripción menciona dos locales de aproximadamente 50 m² cada uno y vivienda en tres plantas; no usar superficies hasta cotejar planos.",
    "observations": "Incluye dos locales, garaje para tres vehículos, quincho, pileta y vivienda en tres plantas. No calcular valor por m² ni rentabilidad sin planos aprobados y medición."
  },
  {
    "id": "casa-alcorta-2400-potencial-desarrollo",
    "recordType": "Casa sobre lote con potencial de desarrollo",
    "name": "Casa sobre lote con potencial de desarrollo · Alcorta 2400 · 846 m²",
    "locality": "Moreno Centro",
    "address": "Alcorta 2400, Moreno Centro",
    "source": "https://www.zonaprop.com.ar/propiedades/clasificado/veclcain-casa-en-venta-moreno-centro-ideal-desarrollo-58847125.html",
    "agency": "Publicación en Zonaprop; inmobiliaria y corredor no visibles en ficha consultada.",
    "contact": "Formulario público de Zonaprop; teléfono no visible.",
    "price": "USD 259.000",
    "currency": "USD",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: Georef debe confirmar una coincidencia inequívoca; no se asignan coordenadas manuales.",
    "verificationStatus": "Ficha directa de Zonaprop accesible el 27/11/2026; potencial edificatorio declarado por anunciante, no validado por el Municipio.",
    "landSurfaceM2": 846,
    "coveredSurfaceM2": 276,
    "geocodeQuery": "Alcorta 2400, Moreno, Buenos Aires",
    "publicationDate": "Fecha original no informada; ficha directa accesible el 27/11/2026.",
    "surfaceNote": "Lote 12,52 × 67,60 m (846 m²) y 276 m² cubiertos. El anunciante declara 2.538 m² edificables, 2.030 m² vendibles, PB + 6 pisos, FOS 0,6 y FOT 3.",
    "observations": "Tiene casa, parque, pileta, quincho y departamento independiente. Los indicadores y superficies edificables son afirmaciones del aviso, no prefactibilidad municipal. Solicitar nomenclatura catastral, certificado urbanístico, afectaciones, retiros, densidad y factibilidad de servicios."
  },
  {
    "id": "desarrollo-maria-eugenia-residences-village",
    "recordType": "Desarrollo residencial terminado · comercialización de unidades",
    "name": "María Eugenia Residences & Village · Moreno",
    "locality": "Moreno · entorno Haras María Eugenia",
    "address": "Intendente Corvalán 2302, Moreno",
    "source": "https://www.zonaprop.com.ar/propiedades/emprendimiento/ememhoin-maria-eugenia-residences-village-maria-eugenia-50620018.html",
    "agency": "Grupo Vaccaro · desarrolladora",
    "contact": "Oficina Moreno de Grupo Vaccaro: +54 11 4492-2817 · WhatsApp general: +54 11 5053-5918 · showroom en Intendente Corvalán 2302; contacto mediante formulario oficial.",
    "price": "Venta desde USD 139.000; alquiler desde USD 700 según la misma ficha. No usar el importe de alquiler como precio de venta.",
    "currency": "USD",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: Georef debe confirmar el acceso del desarrollo; el marcador no representará una unidad individual.",
    "verificationStatus": "Ficha de Zonaprop accesible el 27/11/2026 y página institucional de Grupo Vaccaro consultada. Zonaprop muestra 17 unidades y Argenprop 18; el desarrollador describe el barrio como consolidado con más de 150 familias. Stock y estado de cada unidad no confirmados.",
    "phone": "+541150535918",
    "sourceAlternates": [
      {
        "url": "https://www.grupovaccaro.com/vaccaro",
        "label": "Sitio oficial de Grupo Vaccaro"
      },
      {
        "url": "https://bocetos.xintel.com.ar/vcolanding/",
        "label": "Página institucional de María Eugenia Residences & Village; declara barrio consolidado con más de 150 familias"
      }
    ],
    "publicationDate": "Fecha original no informada; ficha del emprendimiento consultada el 27/11/2026.",
    "surfaceNote": "Desarrollo sobre 8 ha y 240 viviendas según la publicación; Grupo Vaccaro afirma que más de 150 familias ya residen allí. Zonaprop muestra 17 unidades de 59 a 314 m² totales y 58 a 202 m² cubiertos, mientras Argenprop muestra 18. No se informa superficie de terreno individual para cada unidad.",
    "observations": "La ficha de Zonaprop muestra 17 unidades y venta desde USD 139.000; Argenprop muestra 18, por lo que el inventario publicado difiere entre portales. Grupo Vaccaro declara que el barrio está totalmente consolidado y que más de 150 familias ya residen allí; por ello se clasifica como barrio terminado con unidades en comercialización, no como obra nueva. Zonaprop conserva etiquetas mixtas de pozo, construcción, terminado y entrega inmediata. Confirmar stock, estado y precio por unidad, escritura y expensas.",
    "geocodeQuery": "Intendente Corvalan 2302, Moreno, Buenos Aires"
  }
];
publishedProperties.push(...nov27CurrentReviewEntries);



publishedProperties.push(...[
  {
    "id": "terreno-bosque-zapiola-dastugue-4051-325",
    "recordType": "Terreno individual · barrio cerrado",
    "name": "Bosque Zapiola · Intendente Dastugue 4051 · 325 m²",
    "locality": "Villa Zapiola · Moreno",
    "address": "Intendente Dastugue 4051, barrio cerrado Bosque Zapiola; sobre General Zapiola entre Intendente Dastugue y Lucía Rueda y Lobos",
    "source": "https://www.inmuebles.clarin.com/terreno-en-venta-en-moreno--18567034",
    "agency": "Coldwell Banker SER",
    "contact": "Oficina a cargo de Sergio Romaniuk, CUCICBA 3148, y Alejandra Caloyri, CMCPSI 6840. El teléfono aparece parcialmente en la ficha.",
    "price": "USD 33.000",
    "currency": "USD",
    "landSurfaceM2": 325,
    "observations": "El aviso publica expensas de ARS 50.000. La ubicación combina altura y descripción de calles; verificar lote, reglamento, expensas y disponibilidad con la oficina.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: geocodificar solo tras confirmar la parcela interna del barrio.",
    "verificationStatus": "Ficha directa de Inmuebles Clarín accesible el 27/11/2026; precio y superficie publicados, sin confirmación del vendedor."
  },
  {
    "id": "terreno-guemes-victorica-2820",
    "recordType": "Fracción de terreno con construcción existente",
    "name": "Güemes y Av. Victorica · fracción de 2.820 m²",
    "locality": "Moreno Centro",
    "address": "Güemes y Avenida Victorica, Moreno",
    "source": "https://www.inmuebles.clarin.com/terreno-en-venta-en-moreno--11616125",
    "agency": "Ricardo Cervetto Propiedades",
    "contact": "La ficha muestra el teléfono 2374625 sin prefijo completo; solicitar contacto completo a la inmobiliaria.",
    "price": "USD 550.000",
    "currency": "USD",
    "landSurfaceM2": 2820,
    "surfaceNote": "Frente 60 m × fondo 47 m; incluye una propiedad, sin superficie cubierta publicada.",
    "observations": "El anunciante la describe como apta para emprendimiento multifamiliar o comercial. Es una afirmación comercial, no certificado de uso ni prefactibilidad. Verificar nomenclatura, zonificación, dominio y estado de la construcción.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: intersección publicada; no asignar punto parcelario sin identificar la parcela.",
    "verificationStatus": "Ficha directa de Inmuebles Clarín accesible el 27/11/2026; precio y superficie publicados, sin disponibilidad confirmada."
  },
  {
    "id": "terreno-colectora-gaona-5200-2400",
    "recordType": "Fracción de terreno · esquina",
    "name": "Colectora Av. Gaona 5200 · Belgrano y Entre Ríos · 2.400 m²",
    "locality": "Moreno Centro",
    "address": "Colectora Sur / Av. Gaona 5200, esquinas Belgrano y Entre Ríos, mano hacia CABA",
    "source": "https://www.inmuebles.clarin.com/terreno-en-venta-en-moreno--14573738",
    "agency": "Ricardo Cervetto Propiedades",
    "contact": "La ficha muestra el teléfono 2374625 sin prefijo completo; solicitar contacto completo a la inmobiliaria.",
    "price": null,
    "currency": null,
    "landSurfaceM2": 2400,
    "observations": "Precio no publicado: consultar. El aviso la describe apta para torres, galpón industrial o comercio; no se aporta certificado urbanístico ni edificabilidad. Declara escritura y servicios, a verificar documentalmente.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: la dirección combina colectora y esquinas; confirmar nomenclatura catastral antes de geocodificar.",
    "verificationStatus": "Ficha directa de Inmuebles Clarín accesible el 27/11/2026; superficie publicada, precio ausente y disponibilidad no confirmada."
  },
  {
    "id": "terreno-colectora-norte-tuyuti-3400",
    "recordType": "Fracción de terreno industrial/comercial",
    "name": "Colectora Norte Acceso Oeste y Tuyutí · 3.400 m²",
    "locality": "Moreno",
    "address": "Colectora Norte del Acceso Oeste, esquina Tuyutí, entre Camino del Buen Ayre y Puente Intendente Gnecco",
    "source": "https://www.inmuebles.clarin.com/terreno-en-venta-en-moreno--11965027",
    "agency": "Urrutia y Asociados",
    "contact": "Teléfono parcialmente visible en la ficha (+54 11 44…); solicitar número completo.",
    "price": "USD 1.100.000",
    "currency": "USD",
    "landSurfaceM2": 3400,
    "surfaceNote": "72 m de frente publicados.",
    "observations": "El aviso declara zonificación industrial y electricidad. No se publica certificado urbanístico ni se detallan los restantes servicios; verificar uso, afectaciones de colectora, accesos y dominio.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: esquina y corredor publicados; requiere confirmar parcela y frente exacto.",
    "verificationStatus": "Ficha directa de Inmuebles Clarín accesible el 27/11/2026; precio, frente y superficie publicados, sin disponibilidad confirmada."
  },
  {
    "id": "terreno-arenales-4300-2508",
    "recordType": "Terreno individual",
    "name": "Arenales 4300 · esquina Mariscal Antonio José de Sucre · 2.508 m²",
    "locality": "La Reja",
    "address": "Arenales 4300 y Mariscal Antonio José de Sucre, La Reja",
    "source": "https://www.inmuebles.clarin.com/terreno-en-venta-en-la-reja--20913677",
    "agency": "NOA Propiedades",
    "contact": "Teléfono parcialmente visible en la ficha: 4752-73; solicitar número completo.",
    "price": "USD 42.000",
    "currency": "USD",
    "landSurfaceM2": 2508,
    "observations": "El aviso menciona medidor de electricidad instalado y un encadenado de aproximadamente 4 × 6 m. El portal rotula la superficie como construible, pero eso no acredita edificabilidad municipal. Verificar mensura, servicios y restricciones ambientales/hidráulicas del entorno.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: la intersección requiere coincidencia inequívoca de Georef.",
    "verificationStatus": "Ficha directa de Inmuebles Clarín accesible el 27/11/2026; precio y superficie publicados, sin disponibilidad confirmada."
  },
  {
    "id": "terreno-victor-hugo-1100-1050",
    "recordType": "Terreno con mejoras / construcción inconclusa",
    "name": "Víctor Hugo 1100 · lote con mejoras · 1.050 m²",
    "locality": "Francisco Álvarez",
    "address": "Víctor Hugo 1100, frente al Country San Patricio, Francisco Álvarez",
    "source": "https://www.inmuebles.clarin.com/terreno-en-venta-en-francisco-alvarez--18188434",
    "agency": "Caudana Propiedades",
    "contact": "Teléfono parcialmente visible en la ficha: 1155808; solicitar número completo.",
    "price": "USD 95.000",
    "currency": "USD",
    "landSurfaceM2": 1050,
    "surfaceNote": "30 m de frente × 35 m de fondo. La ficha menciona una construcción de tres dormitorios sin techo y un cuarto de 4 × 4 m con techo de chapa; no informa superficie cubierta certificada.",
    "observations": "El portal consigna 630 m² como superficie construible, dato que no debe interpretarse como capacidad urbanística aprobada. Verificar planos, permisos, estado estructural y normativa.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: dirección publicada sin altura catastral verificada.",
    "verificationStatus": "Ficha directa de Inmuebles Clarín accesible el 27/11/2026; precio y terreno publicados, sin disponibilidad confirmada."
  },
  {
    "id": "terreno-graham-bell-16781",
    "recordType": "Fracción de terreno",
    "name": "Fracción Graham Bell · 16.781 m²",
    "locality": "Moreno",
    "address": "Graham Bell, a media cuadra de Acceso Oeste y a una cuadra del puente Graham Bell",
    "source": "https://www.inmuebles.clarin.com/terreno-en-venta-en-moreno--19726499",
    "agency": "Hernán Callone Operaciones Inmobiliarias",
    "contact": "Teléfono parcialmente visible en la ficha: 1139313; solicitar número completo.",
    "price": "USD 4.800.000",
    "currency": "USD",
    "landSurfaceM2": 16781,
    "observations": "El aviso indica que podría anexarse otra fracción de 10.000 m² con 40 m de frente a Acceso Oeste. No se identifica esa segunda fracción en esta ficha; no sumarla al área ni al precio. Verificar parcelas y servidumbres.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: ubicación aproximada sobre Graham Bell; falta numeración o nomenclatura catastral.",
    "verificationStatus": "Ficha directa de Inmuebles Clarín accesible el 27/11/2026; precio y superficie publicados, sin disponibilidad confirmada."
  },
  {
    "id": "terreno-jose-cortejarena-7930",
    "recordType": "Fracción de terreno",
    "name": "José Cortejarena · fracción de 7.930 m²",
    "locality": "Moreno",
    "address": "Calle José Cortejarena, Moreno; lindera a cables Epuyén",
    "source": "https://www.inmuebles.clarin.com/terreno-en-venta-en-moreno--19727200",
    "agency": "Hernán Callone Operaciones Inmobiliarias",
    "contact": "Teléfono parcialmente visible en la ficha: 1139313; solicitar número completo.",
    "price": "USD 790.000",
    "currency": "USD",
    "landSurfaceM2": 7930,
    "observations": "El aviso la ubica a siete cuadras de Acceso Oeste y diez de Ruta 25. No informa número de puerta, frente, zonificación ni factibilidad. Requiere individualización catastral.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: calle sin altura y referencia a tendido eléctrico; no asignar coordenadas parcelarias.",
    "verificationStatus": "Ficha directa de Inmuebles Clarín accesible el 27/11/2026; precio y superficie publicados, sin disponibilidad confirmada."
  },
  {
    "id": "terreno-rodes-edison-2000",
    "recordType": "Fracción de terreno",
    "name": "Rodes y Edison · Colectora Norte Acceso Oeste · 2.000 m²",
    "locality": "Moreno",
    "address": "Rodes y Edison, Colectora Norte del Acceso Oeste, altura del puente Graham Bell",
    "source": "https://www.inmuebles.clarin.com/terreno-en-venta-en-moreno--12095415",
    "agency": "Urrutia y Asociados",
    "contact": "Teléfono parcialmente visible en la ficha (+54 11 44…); solicitar número completo.",
    "price": "USD 750.000",
    "currency": "USD",
    "landSurfaceM2": 2000,
    "observations": "El aviso destaca visibilidad desde Acceso Oeste y cercanía a rutas 23, 25 y Camino del Buen Ayre. No publica frente, zonificación parcelaria ni factibilidad de servicios.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: intersección publicada; confirmar parcela exacta antes de geocodificar.",
    "verificationStatus": "Ficha directa de Inmuebles Clarín accesible el 27/11/2026; precio y superficie publicados, sin disponibilidad confirmada."
  },
  {
    "id": "terreno-acceso-oeste-km34-10900",
    "recordType": "Fracción de terreno industrial",
    "name": "Acceso Oeste km 34 · 10.900 m²",
    "locality": "Moreno",
    "address": "Acceso Oeste km 34, Moreno",
    "source": "https://www.inmuebles.clarin.com/terreno-en-venta-en-moreno--6217297",
    "agency": "Urrutia y Asociados",
    "contact": "Teléfono parcialmente visible en la ficha (+54 11 44…); solicitar número completo.",
    "price": "USD 2.540.000",
    "currency": "USD",
    "landSurfaceM2": 10900,
    "observations": "La ficha lo describe como terreno en zona industrial y declara 10.900 m² construibles. No se aporta certificado urbanístico. Existe otra fracción de mayor superficie publicada en el entorno de Graham Bell; no asumir que sean la misma parcela ni que puedan anexarse.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: referencia por kilómetro sin identificación parcelaria.",
    "verificationStatus": "Ficha directa de Inmuebles Clarín accesible el 27/11/2026; precio y superficie publicados, sin disponibilidad confirmada."
  },
  {
    "id": "terreno-diagonal-canon-centenario-320",
    "recordType": "Lote individual · financiación en pesos",
    "name": "Diagonal del Cañón y Centenario · lotes desde 320 m²",
    "locality": "Moreno Sur",
    "address": "Diagonal del Cañón y Centenario, Moreno",
    "source": "https://www.inmuebles.clarin.com/terreno-en-venta-en-moreno--20180060",
    "agency": "Mateo Propiedades",
    "contact": "Teléfono parcialmente visible en la ficha: 0237463; solicitar número completo.",
    "price": "Anticipo ARS 3.000.000 + cuotas ARS 400.000; precio total no publicado",
    "currency": "ARS",
    "landSurfaceM2": 320,
    "observations": "El aviso indica 22 cuadras de la estación Moreno, lado sur. No informa cantidad de cuotas, ajuste, lote específico, escritura ni precio total. No calcular un total sin esos datos.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: intersección aproximada; falta identificar lote y nomenclatura.",
    "verificationStatus": "Ficha directa de Inmuebles Clarín accesible el 27/11/2026; superficie y esquema de anticipo/cuotas publicados, sin disponibilidad confirmada."
  },
  {
    "id": "casa-ituzaingo-234-1660",
    "recordType": "Casa individual sobre lote de interés para desarrollo",
    "name": "Ituzaingó 200 / 234 · terreno de 1.660 m² con casa a refaccionar",
    "locality": "Moreno Centro · lado sur",
    "address": "Ituzaingó 200 en encabezado; descripción indica Ituzaingó 234, entre Aristóbulo del Valle y Alem",
    "source": "https://www.inmuebles.clarin.com/casa-en-venta-en-moreno-3-ambientes--20942114",
    "agency": "Estudio Inmobiliario JM",
    "contact": "Teléfono parcialmente visible en la ficha: 1127415; solicitar número completo.",
    "price": "USD 600.000",
    "currency": "USD",
    "landSurfaceM2": 1660,
    "surfaceNote": "La ficha no informa superficie cubierta; declara casa a refaccionar de dos dormitorios y un baño.",
    "observations": "El aviso se dirige a desarrolladores y menciona que el propietario tomaría parte de la inversión en metros cuadrados. Existe discrepancia de altura 200/234. No se publicó edificabilidad; verificar parcela, normativa, dominio y condiciones de permuta.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: discrepancia entre altura 200 y 234; no geocodificar hasta confirmar puerta y parcela.",
    "verificationStatus": "Ficha directa de Inmuebles Clarín accesible el 27/11/2026; precio y terreno publicados, sin disponibilidad confirmada."
  },
  {
    "id": "casa-joly-2400-476",
    "recordType": "Casa individual",
    "name": "Chalet · Claudio María Joly 2400",
    "locality": "Moreno Centro",
    "address": "Claudio María Joly 2400, Moreno",
    "source": "https://www.inmuebles.clarin.com/casa-en-venta-en-moreno-5-ambientes--20605016",
    "agency": "C21 D'Adam",
    "contact": "Ximena D'Adam, CUCICBA 6943 / CMCPSI 6371; el teléfono aparece parcialmente en la ficha.",
    "price": "USD 265.000",
    "currency": "USD",
    "landSurfaceM2": 476,
    "coveredSurfaceM2": 326,
    "surfaceNote": "5 ambientes, 4 dormitorios; piscina y parrilla.",
    "observations": "La ficha publica 326 m² cubiertos y 476 m² de terreno. Medidas aproximadas sujetas a título y plano de mensura. Confirmar estado, precio y disponibilidad.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: dirección pública; geocodificar solo si Georef devuelve coincidencia inequívoca.",
    "verificationStatus": "Ficha directa de Inmuebles Clarín accesible el 27/11/2026; precio y superficies publicados, sin disponibilidad confirmada."
  },
  {
    "id": "casa-yapeyu-2300-merged",
    "recordType": "Casa individual · anuncios potencialmente duplicados",
    "name": "Casa con parque y piscina · Yapeyú al 2300",
    "locality": "Moreno",
    "address": "Yapeyú 2300, Moreno",
    "source": "https://www.inmuebles.clarin.com/casa-en-venta-en-moreno-6-ambientes--20925819",
    "sourceAlternates": [
      {
        "url": "https://www.inmuebles.clarin.com/casa-en-venta-en-moreno-6-ambientes--20730882",
        "label": "Anuncio alternativo en la misma altura · Mónica Parodi Propiedades"
      }
    ],
    "agency": "Girgola Propiedades (aviso principal); existe un segundo anuncio de Mónica Parodi Propiedades en la misma altura.",
    "contact": "Aviso principal: Agustina Scalese, CPI 8928 / MGR 313; teléfono parcialmente visible. Aviso alternativo: Mónica Parodi Propiedades, matrícula 350 M-GR.",
    "price": "USD 139.000 (aviso principal) / USD 139.900 (aviso alternativo)",
    "currency": "USD",
    "surfaceNote": "Aviso principal: 658 m² totales y 258 m² cubiertos. Aviso alternativo: lote 653 m² y 243,55 m² cubiertos.",
    "observations": "Dos publicaciones en Yapeyú al 2300 describen casas con piscina y superficies/precios similares pero no idénticos. Se agrupan provisionalmente para evitar duplicar; no se confirma que sea la misma parcela. Verificar nomenclatura, fotos, planos y titular antes de fusionar definitivamente.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "Pendiente de revalidación",
    "geolocationStatus": "Pendiente: altura aproximada sin número de puerta confirmado.",
    "verificationStatus": "Dos fichas de Inmuebles Clarín accesibles el 27/11/2026; coincidencia de dirección aproximada con datos discrepantes. Identidad de la propiedad pendiente."
  },
  {
    "id": "desarrollo-bufo-maipu-1500",
    "recordType": "Desarrollo residencial · obra avanzada anunciada",
    "name": "Complejo Residencial Bufó Maipú · unidades en comercialización anunciada",
    "locality": "Moreno Norte",
    "address": "Maipú 1500, frente al barrio cerrado El Casco, Moreno",
    "source": "https://www.zonaprop.com.ar/propiedades/clasificado/veclapin-venta-dpto-2-ambientes-57-m-sup2--cochera-sum-moreno-60770859.html",
    "sourceAlternates": [
      {
        "url": "https://www.argenprop.com/departamento-en-venta-en-moreno-2-ambientes--20937158",
        "label": "Anuncio indexado de unidad de 2 ambientes"
      },
      {
        "url": "https://www.zonaprop.com.ar/propiedades/clasificado/veclapin-venta-dpto-3-amb.-98-m-sup2--con-cochera-patio-moreno-60523141.html",
        "label": "Anuncio indexado de unidad de 3 ambientes"
      }
    ],
    "agency": "Publicaciones atribuidas a RE/MAX Caminos; el desarrollador no queda identificado por razón social en las fichas consultadas.",
    "contact": "Maria Ester Montenegro; corredor responsable Damian Perrone, CUCICBA 2787, y Patricia Alejandra Cordoba, CMCPDJMGR 246.",
    "price": "USD 78.638 (unidad de 2 ambientes indexada); otra unidad de 3 ambientes se anunciaba a USD 135.000",
    "currency": "USD",
    "surfaceNote": "Unidad de 2 ambientes: 57,4 m² totales y 47,4 m² cubiertos según el anuncio indexado. Unidad alternativa: 98 m² totales y 89 m² cubiertos.",
    "observations": "Las fichas describen obra avanzada y entrega estimada en diciembre de 2026, con financiación directa del desarrollador. Los enlaces directos consultados devolvieron 410 Gone; el proyecto y el avance físico no se consideran confirmados. Solicitar visita de obra, desarrollador, permisos y estado actual.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "Pendiente de revalidación",
    "geolocationStatus": "Pendiente: dirección de edificio publicada; no se geolocaliza unidad individual.",
    "verificationStatus": "Resultados indexados hace pocos días, pero las fichas directas devolvieron 410 Gone el 27/11/2026. No tratar como oferta vigente hasta recuperar confirmación directa."
  },
  {
    "id": "desarrollo-copa-entre-rios-2501",
    "recordType": "Desarrollo residencial / proyecto arquitectónico documentado",
    "name": "COPA · Entre Ríos 2501",
    "locality": "Moreno Centro",
    "address": "Entre Ríos 2501, Moreno",
    "source": "https://mcl-studio.com/desarrollos/edificio-copa",
    "agency": "MCL Studio · estudio de arquitectura que publica el proyecto",
    "contact": "No se publica un contacto comercial específico del desarrollo en la ficha consultada.",
    "price": null,
    "currency": null,
    "surfaceNote": "No se publican superficies de unidades ni disponibilidad comercial en la ficha de proyecto.",
    "observations": "La página del estudio describe el edificio y su concepto arquitectónico, pero no informa fecha, etapa de obra, desarrolladora, unidades en venta ni disponibilidad. Se registra como proyecto documentado, no como obra en ejecución ni oportunidad comercial confirmada.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "Pendiente de revalidación",
    "geolocationStatus": "Pendiente: dirección exacta publicada; marcador solo tras coincidencia inequívoca.",
    "verificationStatus": "Página del estudio accesible el 27/11/2026; acredita proyecto y dirección, no etapa física ni comercialización."
  }
]);



publishedProperties.push(...[
  {
    "id": "terreno-carola-lorenzini-aymaraes-2175",
    "recordType": "Terreno industrial/comercial · lote individual dentro de oferta de varios lotes",
    "name": "Carola Lorenzini / Aymaraes · lote 6 · 2.175 m²",
    "locality": "Francisco Álvarez",
    "address": "Sobre Carola Lorenzini y Aymaraes, frente al Arroyo Las Catonas, Francisco Álvarez",
    "source": "https://www.inmuebles.clarin.com/terreno-en-venta-en-francisco-alvarez--15820454",
    "agency": "Verónica Martínez Propiedades",
    "contact": "Teléfono parcialmente visible en la ficha: 2302374; solicitar número completo.",
    "price": "USD 130.000 (lote 6, 2.175 m² según encabezado)",
    "currency": "USD",
    "landSurfaceM2": 2175,
    "surfaceNote": "El aviso también enumera lote 4 de 1.555 m² y lote 5 de 1.847 m²; no asigna precio individual a esos lotes.",
    "observations": "La publicación declara zonificación R1 y propone usos industriales/logísticos/comerciales; debe verificarse la zonificación efectiva y el alcance de los usos ante el Municipio. La ubicación se describe sobre dos calles y frente al arroyo, sin número de puerta ni nomenclatura catastral. Existe otro desarrollo publicado sobre Carola Lorenzini 2300, pero no se pudo establecer si las parcelas son contiguas o coincidentes.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: la ficha agrupa lotes sobre Carola Lorenzini y Aymaraes sin individualizar el lote 6 por parcela catastral.",
    "verificationStatus": "Ficha directa de Inmuebles Clarín accesible el 27/11/2026; precio y superficie del lote 6 publicados, sin disponibilidad confirmada."
  },
  {
    "id": "predio-industrial-ruta24-66763",
    "recordType": "Predio industrial con mejoras",
    "name": "Predio industrial Ruta Provincial 24 · 66.763 m²",
    "locality": "Moreno · corredor de Ruta Provincial 24",
    "address": "Ruta Provincial 24, Partido de Moreno; la ficha no publica altura ni intersección precisa",
    "source": "https://www.inmuebles.clarin.com/terreno-en-venta-en-moreno--18155186",
    "agency": "MJM Propiedades",
    "contact": "La ficha muestra teléfono parcialmente visible (+54 9 11 3…); martillero responsable JEA, matrícula profesional CMCPMGR 0178.",
    "price": "USD 7.200.000",
    "currency": "USD",
    "landSurfaceM2": 66763,
    "surfaceNote": "La publicación describe nave industrial, depósitos, oficinas, docks de carga, silos, red de hidrantes, tanque de 200.000 litros, red de gas industrial, 1.260 kVA y balanza para camiones; no informa superficie cubierta.",
    "observations": "El aviso presenta un predio industrial con mejoras y equipamiento, no un lote baldío. Ubicación exacta y nomenclatura catastral ausentes. Hay otro registro previo de 10 ha en el corredor RP24/RP25; no se fusionan porque superficies y descripción difieren, pero existe riesgo de solapamiento hasta cotejar parcelas.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: Ruta Provincial 24 sin altura ni coordenada parcelaria.",
    "verificationStatus": "Ficha directa de Inmuebles Clarín accesible el 27/11/2026; precio, superficie y mejoras descriptas, sin disponibilidad confirmada."
  }
]);

publishedProperties.push(...[
  {
    "id": "terreno-polo24-2432",
    "recordType": "Terreno industrial individual",
    "name": "Parque Industrial Polo 24 · lote de 2.432 m²",
    "locality": "Cuartel V",
    "address": "Polo 24, a unos 300 m de la intersección RP24/RP25, Cuartel V, Moreno; lote interno no publicado",
    "source": "https://www.zonaprop.com.ar/propiedades/clasificado/vecltrin-terreno-en-venta-60730922.html",
    "agency": "Publicación en Zonaprop; martillero Alejandro Ale, CSM 2623 / CUCICBA 8460; inmobiliaria no identificada en la ficha",
    "contact": "Formulario de Zonaprop; teléfono no visible en la ficha consultada",
    "price": "USD 178.000",
    "currency": "USD",
    "landSurfaceM2": 2432,
    "surfaceNote": "2.432 m² de terreno; no se publica superficie cubierta ni número interno de lote.",
    "observations": "El aviso sitúa el predio a unos 300 m de RP24/RP25 y menciona estudios de impacto ambiental y obra hidráulica aprobados, infraestructura interna y red cloacal para efluentes industriales. Son declaraciones del anunciante; solicitar constancias y nomenclatura catastral. Un resultado indexado anterior mostraba USD 180.000 para 2.432 m²; la ficha accesible en esta revisión publica USD 178.000.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geocodeDisabled": true,
    "geolocationStatus": "Pendiente: no se publica lote interno ni dirección parcelaria verificable.",
    "verificationStatus": "Ficha directa de Zonaprop accesible el 27/11/2026; precio y superficie publicados. Disponibilidad, lote interno y aprobaciones declaradas no verificados independientemente."
  },
  {
    "id": "terreno-r25-lote21-2741",
    "recordType": "Terreno industrial individual",
    "name": "Parque Industrial R25 · lote 21 · 2.741 m²",
    "locality": "Moreno (localidad no especificada en el aviso)",
    "address": "Ruta Provincial 25 al 4100, Parque Industrial R25, lote 21; parcela interna no identificada",
    "source": "https://www.zonaprop.com.ar/propiedades/clasificado/vecltrin-terreno-industrial-en-moreno-60570030.html",
    "agency": "Publicación en Zonaprop; anunciante y corredor no identificados en la ficha consultada",
    "contact": "Formulario de Zonaprop; teléfono no visible",
    "price": "USD 233.000",
    "currency": "USD",
    "landSurfaceM2": 2741,
    "surfaceNote": "2.741 m² de terreno; el aviso describe el parque con 30 lotes interiores sobre 17 ha y depósitos/oficinas de 140 a 210 m².",
    "observations": "La ficha declara zonificación Industrial II y expensas de ARS 400.000. La oferta se identifica como lote 21. Confirmar stock, reglamento, expensas, titularidad y certificado urbanístico; no se publica superficie cubierta para este lote.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geocodeDisabled": true,
    "geolocationStatus": "Pendiente: lote interno sin coordenada parcelaria verificable.",
    "verificationStatus": "Ficha directa de Zonaprop accesible el 27/11/2026; precio, superficie y número de lote publicados. Disponibilidad y expensas sujetas a confirmación."
  },
  {
    "id": "terreno-r24-r25-5500",
    "recordType": "Fracción industrial / comercial",
    "name": "Fracción industrial · intersección RP24/RP25 · 5.500 m²",
    "locality": "Moreno",
    "address": "Intersección Ruta Provincial 24 y Ruta Provincial 25, Moreno; fracción sin altura ni parcela publicada",
    "source": "https://www.zonaprop.com.ar/propiedades/clasificado/vecltrin-terreno-fraccion-en-venta-o-permuta-moreno-53876027.html",
    "agency": "Dambolena",
    "contact": "Martín Dambolena, CMCPDJMGR 205 / CUCICBA 7176; formulario de Zonaprop",
    "price": "USD 1.200.000; venta o permuta",
    "currency": "USD",
    "landSurfaceM2": 5500,
    "surfaceNote": "5.500 m² de terreno. El aviso declara zonificación Industrial II, FOS 0,50 y FOT 0,80; no informa superficie cubierta.",
    "observations": "La ficha sitúa la fracción en la rotonda de RP24/RP25 y enumera usos productivos, comerciales y de depósito. Zonificación e indicadores son datos del anunciante, sujetos a certificado municipal vigente. Posible solapamiento con otra fracción de 10 ha ya registrada en el corredor RP24/RP25; individualizar catastralmente antes de considerarla una parcela independiente.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geocodeDisabled": true,
    "geolocationStatus": "Pendiente: intersección vial sin nomenclatura parcelaria.",
    "verificationStatus": "Ficha directa de Zonaprop accesible el 27/11/2026; precio, superficie y parámetros declarados visibles. Disponibilidad y zonificación no certificadas independientemente."
  },
  {
    "id": "terreno-rp25-45280",
    "recordType": "Fracción industrial y comercial",
    "name": "Fracción sobre RP25 · 45.280 m² · frente a C.C. San Diego",
    "locality": "Moreno · corredor Cuartel V",
    "address": "Ruta Provincial 25 entre Bartolomé Díaz y Manuela Pedraza, a 2,2 km de la rotonda RP24/RP25, frente al acceso de C.C. San Diego",
    "source": "https://www.oyhanarteprop.com.ar/p/3866232-Terreno-en-Venta-en-Moreno-FRACCI%C3%93N-INDUSTRIAL-y-COMERCIAL-en-VENTA-sobre-RUTA-25",
    "agency": "Oyhanarte Propiedades",
    "contact": "(011) 4624-0023; sucursal Moreno (0237) 483-2680; info@oyhanarteprop.com.ar; WhatsApp +54 11 4526-1554 / +54 11 7250-0000",
    "price": "USD 1.200.000",
    "currency": "USD",
    "landSurfaceM2": 45280,
    "surfaceNote": "45.280 m²; 80 m de frente por 566 m de fondo. No se publica superficie cubierta.",
    "observations": "La ficha declara zonificación Industrial 2 y alineamiento comercial C; también indica que no cuenta con agua corriente, agua potable, cable ni cloacas. Las medidas son aproximadas según el anunciante. Posible solapamiento espacial con la fracción de 46 ha sobre RP25/Fructuoso Rivera ya registrada; no fusionar ni asumir que son parcelas independientes sin nomenclatura catastral.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geocodeDisabled": true,
    "geolocationStatus": "Pendiente: tramo de ruta y referencias de cruces, sin altura ni parcela verificable.",
    "verificationStatus": "Ficha directa de Oyhanarte accesible en la revisión; precio, superficie, frente, fondo y contacto publicados. Disponibilidad, dominio y zonificación requieren confirmación documental."
  },
  {
    "id": "terreno-rp24-7600-4541",
    "recordType": "Terreno industrial individual",
    "name": "Terreno en parque industrial · Ruta 24 al 7600 · 4.541 m²",
    "locality": "Cuartel V",
    "address": "Ruta Provincial 24 al 7600, Moreno",
    "source": "https://www.inmuebles.clarin.com/terreno-en-venta-en-moreno--20602565",
    "agency": "Toribio Achaval",
    "contact": "Formulario y WhatsApp de Inmuebles Clarín; teléfono parcialmente visible en la ficha (+54 011 4…)",
    "price": "USD 523.000",
    "currency": "USD",
    "landSurfaceM2": 4541,
    "surfaceNote": "4.541 m²; 43 m de frente por 104 m de fondo. La ficha también declara 4.541 m² construibles, dato a validar con certificado urbanístico.",
    "observations": "El aviso ubica el lote en un parque industrial de Cuartel V, a 2 km de RP25, y declara red de gas, electricidad, calles internas pavimentadas y desagües pluviales. No se publica número de lote ni nomenclatura catastral. Posible relación espacial con ofertas PIM II del mismo corredor; no asumir identidad ni independencia sin cotejo parcelario.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geocodeDisabled": true,
    "geolocationStatus": "Pendiente: altura sobre ruta sin identificación parcelaria.",
    "verificationStatus": "Ficha directa de Inmuebles Clarín accesible el 27/11/2026; precio, superficie y medidas de frente/fondo publicados. Disponibilidad y capacidad constructiva no confirmadas."
  },
  {
    "id": "casa-alberdi-1100-739",
    "recordType": "Terreno con vivienda y mejoras · dos parcelas contiguas",
    "name": "Juan Bautista Alberdi 1100 · dos parcelas contiguas con casa y pileta",
    "locality": "Moreno (las fuentes difieren entre Moreno Centro y Moreno Sur)",
    "address": "Juan Bautista Alberdi 1100, entre Intendente Ibáñez y Martín García según una ficha; otras solo indican Alberdi 1100.",
    "source": "https://www.zonaprop.com.ar/propiedades/clasificado/vecltrin-lote-en-venta-dos-parcelas-desarrollo-moreno-739-60642448.html",
    "agency": "RE/MAX New",
    "contact": "Paola Gisela Amarante; WhatsApp +54 11 3626-8888; responsable Fiorella Velardez, CPI 8214 / CMCPDJLM 1022.",
    "price": "USD 98.000",
    "currency": "USD",
    "landSurfaceM2": 739,
    "coveredSurfaceM2": 100,
    "surfaceNote": "Dos parcelas contiguas; 739 m² de terreno publicados. Una ficha sindicada informa 100 m² cubiertos para la vivienda; el galpón no tiene superficie separada.",
    "observations": "Activo consolidado desde publicaciones de RE/MAX New, Buscainmueble y PlataStar. Precio más reciente USD 98.000; PlataStar publicaba USD 105.000 el 06/10/2026. Se describen dos parcelas, vivienda, galpón y pileta. FOS/FOT y metros construibles son afirmaciones del anunciante, no certificado urbanístico. Fuentes difieren entre Moreno Centro y Sur; confirmar nomenclatura catastral.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geocodeDisabled": true,
    "geolocationStatus": "Pendiente: dos parcelas contiguas y referencias barriales contradictorias; no asignar coordenadas sin nomenclatura catastral.",
    "verificationStatus": "Ficha Zonaprop accesible 27/11/2026; Proppies y Buscainmueble publican USD 98.000 y 739 m²; PlataStar conserva precio histórico de USD 105.000. Disponibilidad no confirmada.",
    "publicationDate": "Proppies indica publicación hace 20 días al 27/11/2026; PlataStar publicaba USD 105.000 el 06/10/2026.",
    "sourceAlternates": [
      {
        "url": "https://www.buscainmueble.com/terreno-en-venta-en-moreno--20872470",
        "label": "Ficha sindicada RE/MAX New; 739 m² de terreno y 100 m² cubiertos."
      },
      {
        "url": "https://platastar.com/propiedad/terreno-de-739-m2-en-venta-en-moreno-98768f89",
        "label": "Publicación anterior del 06/10/2026, USD 105.000."
      },
      {
        "url": "https://proppies.app/propiedad/buenos-aires/moreno/terreno-en-venta-en-moreno-67704483",
        "label": "Ficha agregadora reciente; USD 98.000 y contacto RE/MAX New."
      }
    ]
  },
  {
    "id": "casa-martin-fierro-5400-200",
    "recordType": "Casa individual",
    "name": "Martín Fierro al 5400 · casa de 6 ambientes · La Perlita",
    "locality": "La Perlita · Moreno Norte",
    "address": "Martín Fierro al 5400, barrio La Perlita, Moreno",
    "source": "https://www.inmuebles.clarin.com/casa-en-venta-en-moreno-6-ambientes--10720949",
    "agency": "RAMIREZ Mandatos y Negocios Inmobiliarios",
    "contact": "Hipólito Enrique Ramírez / Carolina Noelia Ramírez, COMARCOMGR N71 / N183; Hipólito Agustín Alejo Ramírez, CUCICBA 8496; formulario del portal, teléfono parcialmente visible",
    "price": "USD 88.900",
    "currency": "USD",
    "landSurfaceM2": 200,
    "coveredSurfaceM2": 145,
    "surfaceNote": "200 m² de terreno; 145 m² cubiertos; lote 10 × 20 m según descripción.",
    "observations": "Casa en dos plantas con tres dormitorios, dos baños, local al frente, quincho, garage y parrilla. La ficha menciona 600 m de Acceso Oeste y Ruta 23 en el título, y 500 m de Acceso Oeste en la descripción; confirmar distancias y servicios en visita. El precio figura como rebajado, sin fecha de reducción publicada.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geocodeDisabled": true,
    "geolocationStatus": "Pendiente: la publicación informa Martín Fierro al 5400, sin altura exacta.",
    "verificationStatus": "Ficha directa de Inmuebles Clarín accesible el 27/11/2026; precio, superficies, anunciante y responsables publicados. Disponibilidad no confirmada."
  },
  {
    "id": "casa-alberti-2346-240",
    "recordType": "Casa individual",
    "name": "Alberti 2346 · casa de 3 ambientes con escritura",
    "locality": "Moreno",
    "address": "Alberti 2346, entre Juramento y Mariano y Luciano de la Vega, Moreno",
    "geocodeQuery": "Alberti 2346, Moreno",
    "geocodeMatch": "ALBERTI 2346",
    "source": "https://www.zonaprop.com.ar/propiedades/clasificado/veclcain-casa-moreno-60207981.html",
    "agency": "Publicación en Zonaprop; anunciante no identificado en la ficha consultada",
    "contact": "Formulario de Zonaprop; teléfono y corredor no visibles en la ficha",
    "price": "USD 30.000",
    "currency": "USD",
    "landSurfaceM2": 240,
    "coveredSurfaceM2": 80,
    "surfaceNote": "240 m² de terreno aproximados; 80 m² cubiertos aproximados.",
    "observations": "La descripción informa dos dormitorios, un baño, lavadero, sector de guardado, portón vehicular y escritura; gas natural disponible en la puerta. Discrepancia de la ficha: la descripción habla de 3 ambientes, mientras el encabezado técnico muestra 4 ambientes y la etiqueta automática indica “a estrenar”. Confirmar estado físico y documentación.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: Georef debe devolver coincidencia inequívoca para Alberti 2346.",
    "verificationStatus": "Ficha directa de Zonaprop accesible el 27/11/2026; precio, terreno, cubierta y ubicación publicados. Disponibilidad no confirmada."
  },
  {
    "id": "casa-colombia-300-550",
    "recordType": "Casa individual",
    "name": "Colombia al 300 · casa con parque y pileta",
    "locality": "Moreno",
    "address": "Colombia al 300, a 300 m de RP23 y Av. Victorica, Moreno",
    "source": "https://www.zonaprop.com.ar/propiedades/clasificado/veclcain-vendo-casa-en-moreno-cerca-acceso-oeste-con-parque-y-58448911.html",
    "agency": "Publicación en Zonaprop; anunciante no identificado en la ficha consultada",
    "contact": "Formulario de Zonaprop; teléfono y corredor no visibles en la ficha",
    "price": "USD 71.900",
    "currency": "USD",
    "landSurfaceM2": 550,
    "coveredSurfaceM2": 70,
    "surfaceNote": "550 m² de terreno; 70 m² cubiertos.",
    "observations": "Casa de una planta, dos dormitorios, pileta de fibra, jardín y losa preparada para futura ampliación. La ficha declara agua corriente, gas natural y electricidad. El anunciante no se identifica en el extracto consultado; verificar títulos, servicios y medidas.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geocodeDisabled": true,
    "geolocationStatus": "Pendiente: la dirección se publica como Colombia al 300, sin altura exacta.",
    "verificationStatus": "Ficha directa de Zonaprop accesible el 27/11/2026; precio, superficies y descripción visibles. Disponibilidad no confirmada."
  },
  {
    "id": "casa-ambrosetti-300-348",
    "recordType": "Casa individual",
    "name": "Ambrosetti al 300 · casa de 3 dormitorios · La Reja Sur",
    "locality": "La Reja",
    "address": "Ambrosetti al 300, entre Posadas y Catamarca, La Reja Sur, Moreno",
    "source": "https://www.zonaprop.com.ar/propiedades/clasificado/veclcain-venta-casa-3-dorm.-patio-y-pileta-la-reja-sur-60481947.html",
    "agency": "DI PASCUALE Propiedades",
    "contact": "DI PASCUALE Propiedades, matrícula D.J.M.G.R. N.º 41 / N.º 230; formulario de Zonaprop",
    "price": "USD 75.000",
    "currency": "USD",
    "landSurfaceM2": 348,
    "coveredSurfaceM2": 86,
    "surfaceNote": "348 m² de terreno (18 × 19,37 m); 86 m² cubiertos.",
    "observations": "Casa americana de tres dormitorios, galpón de 3,50 × 5 m y pileta de fibra. La ficha indica gas natural, cercanía a Padre Fahy y salida a Ruta 5. El encabezado automático muestra “a estrenar”, aunque la descripción detalla una vivienda existente; confirmar antigüedad y estado real.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geocodeDisabled": true,
    "geolocationStatus": "Pendiente: la publicación informa Ambrosetti al 300 y cruces, sin altura exacta.",
    "verificationStatus": "Ficha directa de Zonaprop accesible el 27/11/2026; precio, superficies, inmobiliaria y matrícula publicados. Disponibilidad no confirmada."
  },
  {
    "id": "quinta-sarratea-200-1350",
    "recordType": "Casa quinta / inmueble con potencial de desarrollo",
    "name": "Manuel de Sarratea 200 · quinta con potencial de desarrollo",
    "locality": "Moreno Centro",
    "address": "Manuel de Sarratea 200, entre Tte. Oscar Camilli y Bernardino Rivadavia, Moreno",
    "geocodeQuery": "Manuel de Sarratea 200, Moreno",
    "geocodeMatch": "SARRATEA 200",
    "source": "https://www.zonaprop.com.ar/propiedades/clasificado/veclqvin-venta-de-quinta-5-ambientes-en-moreno-59094717.html",
    "agency": "Grupo Vaccaro",
    "contact": "Grupo Vaccaro; oficina publicada en Av. Sarmiento 3110; formulario de Zonaprop y WhatsApp con número parcialmente oculto",
    "price": "USD 499.000",
    "currency": "USD",
    "landSurfaceM2": 1350,
    "coveredSurfaceM2": 300,
    "surfaceNote": "1.350 m² totales; 300 m² cubiertos según ficha.",
    "observations": "Casa quinta de cinco ambientes, cuatro dormitorios, tres baños, parque arbolado, pileta y quincho. El anunciante la considera apta para evaluar edificios, pero no publica certificado urbanístico, FOS/FOT ni nomenclatura catastral. No asumir capacidad constructiva por la descripción comercial.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: Georef debe confirmar la coincidencia de Manuel de Sarratea 200.",
    "verificationStatus": "Ficha directa de Zonaprop accesible el 27/11/2026; precio, superficies, dirección y anunciante publicados. Potencial de desarrollo y disponibilidad no confirmados."
  },
  {
    "id": "desarrollo-madiba-xiv-asseff-286",
    "recordType": "Desarrollo inmobiliario / edificio en pozo",
    "name": "Madiba XIV · Asseff 286 esquina Alem",
    "locality": "Moreno Centro",
    "address": "Asseff 286 esquina Alem, Moreno",
    "geocodeQuery": "Asseff 286, Moreno",
    "geocodeMatch": "ASSEFF 286",
    "source": "https://www.melognopropiedades.com.ar/d/56360-Madiba-XIV----Ideal-Inversion-en-Centro-(Moreno)",
    "agency": "Melogno Propiedades; desarrolla Madiba S.R.L.",
    "contact": "WhatsApp +54 9 11 4079-9980; oficina@melognopropiedades.com.ar",
    "price": "Precio total no publicado; anticipo declarado USD 20.000 + 36 cuotas (importe de cuotas no informado)",
    "currency": "USD",
    "surfaceNote": "Edificio de 7 pisos y 7 departamentos por piso según la ficha. Departamentos de 2 ambientes: 39 m², 45 m², 50,10 m² y 58,10 m²; oficinas de 35 m².",
    "observations": "La ficha declara venta en pozo y entrega en noviembre de 2027. Incluye departamentos de dos ambientes, oficinas y cocheras. No publica precio total ni importe de las 36 cuotas; el avance físico, permisos, stock y documentación del desarrollador deben verificarse.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: Georef debe devolver coincidencia inequívoca para Asseff 286; no se asigna centroide de edificio.",
    "verificationStatus": "Ficha directa de Melogno accesible el 27/11/2026; desarrollador, dirección, tipologías y entrega declarada publicados. Precio total, avance físico y disponibilidad no verificados."
  }
]);


const nov27FreshEntries = [
  {
    "id": "terreno-julian-aguirre-17000",
    "recordType": "Fracción de terreno · anteproyecto de loteo",
    "name": "Julián Aguirre 100 · fracción de 17.000 m²",
    "locality": "Moreno Centro",
    "address": "Julián Aguirre 100, entre Enrique Larreta y Evaristo Carriego, Moreno",
    "geocodeQuery": "Julián Aguirre 100, Moreno",
    "source": "https://www.argenprop.com/terreno-en-venta-en-centro-moreno--9869622",
    "agency": "Dambolena",
    "contact": "Martín Dambolena, CMCPDJMGR 205 / CUCICBA 7176; teléfono visible parcialmente como (11) 23; formulario Argenprop.",
    "price": "USD 140.000 · venta o permuta; el aviso menciona financiación",
    "currency": "USD",
    "landSurfaceM2": 17000,
    "surfaceNote": "Frente publicado: 98 m sobre Julián Aguirre; fondo: 180 m. Anteproyecto de loteo declarado.",
    "observations": "El aviso declara zonificación Residencial 2, FOS 0,6 y FOT 1,0, y menciona un anteproyecto de loteo. No se aporta certificado urbanístico parcelario ni aprobación del loteo. El anunciante advierte que las superficies son aproximadas y surgirán del estado parcelario. Solicitar nomenclatura, mensura, anteproyecto, factibilidad de servicios y constancia urbanística vigente.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geocodeDisabled": true,
    "geolocationStatus": "Pendiente: fracción extensa con ubicación por frente y entrecalles; no se asigna coordenada parcelaria."
  ,
    "verificationStatus": "Ficha directa de Argenprop accesible el 27/11/2026; precio, superficie, frente, fondo y anteproyecto declarados visibles. Zonificación y anteproyecto no verificados independientemente; disponibilidad no confirmada."
  },
  {
    "id": "casa-independencia-2400-1462",
    "recordType": "Terreno con vivienda existente / inmueble con potencial de desarrollo",
    "name": "Independencia 2400 · terreno de 1.462 m² con vivienda y planos anunciados",
    "locality": "Moreno Centro",
    "address": "Independencia 2400, Centro de Moreno",
    "geocodeQuery": "Independencia 2400, Moreno",
    "source": "https://platastar.com/propiedad/terreno-de-1462-m2-en-venta-en-moreno-e11a5176",
  sourceAlternates: [{url:"https://platastar.com/propiedad/terreno-de-1462-m2-en-venta-en-moreno-e11a5176",label:"PlataStar: mismo domicilio y superficie aproximada (1.462 m²), publicado a USD 350.000; posible mismo activo que la ficha Argenprop de USD 320.000."},
      {url:"https://www.argenprop.com/casa-en-venta-en-centro-moreno-6-ambientes--20956082",label:"Ficha anterior de Argenprop: USD 320.000, casa de seis ambientes; precio anterior y superficies contradictorias."}],
    "agency": "RE/MAX Fly · publicación en Argenprop / RAU S.R.L.",
    "contact": "Paola Silva; corredora responsable Evelyn Buzzelli, CPI 8884 / CMCPDJMGR 311. Teléfono visible parcialmente como +54 (11).",
    "price": "USD 350.000",
    "currency": "USD",
    "landSurfaceM2": 1462.41,
    "coveredSurfaceM2": null,
    "surfaceNote": "La ficha actual publica 1.462 m² de terreno. La ficha anterior de casa muestra 41,2 m² cubiertos, 663 m² semicubiertos, 618,98 m² descubiertos y 1.323 m² totales, cifras que no concilian; no se adopta superficie cubierta como dato confirmado.",
    "observations": "La publicación actual ofrece el terreno de 1.462 m² a USD 350.000 e incluye una construcción existente de seis ambientes. El anunciante afirma que hay derechos constructivos aprobados, planos electromecánicos y prefactibilidad eléctrica abonada; no se revisaron expedientes ni certificados. La ficha anterior de casa publicaba USD 320.000 y superficies componentes que no concilian (41,2 m² cubiertos, 663 m² semicubiertos, 618,98 m² descubiertos y 1.323 m² totales). Exigir nomenclatura, mensura, título, planos aprobados y constancia municipal antes de valorar el potencial.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: dirección pública con lote extenso; geocodificar solo si Georef devuelve coincidencia inequívoca."
  ,
    "verificationStatus": "Ficha de PlataStar accesible el 27/11/2026, publicada el 30/06/2026, a USD 350.000 y 1.462 m². La ficha de terreno de Argenprop devolvió 410 Gone el 27/11/2026; una ficha anterior de casa de Argenprop publicaba USD 320.000 y superficies contradictorias. Los derechos constructivos, planos y factibilidades son declaraciones del anunciante, no verificados documentalmente; disponibilidad no confirmada."
  },
  {
    "id": "casa-los-abedules-4100-485",
    "recordType": "Casa individual · barrio cerrado",
    "name": "Casa 5 ambientes · Los Abedules 4100 · Álvarez del Bosque",
    "locality": "Álvarez del Bosque · Moreno",
    "address": "Los Abedules 4100, barrio Álvarez del Bosque, Moreno",
    "source": "https://www.argenprop.com/casa-en-venta-en-countries-y-barrios-cerrados-en-moreno-5-ambientes--20893112",
    "agency": "RE/MAX Vita",
    "contact": "Pablo Ariel Schinca; corredora responsable Silvana Inés Palini, CPI 8862 / CMCPM 2955. Teléfono parcialmente visible en Argenprop.",
    "price": "USD 249.900 + expensas publicadas ARS 300.000",
    "currency": "USD",
    "landSurfaceM2": 485,
    "coveredSurfaceM2": 236,
    "surfaceNote": "La ficha informa además 246 m² de superficie total, dato que no coincide con los 485 m² de terreno.",
    "observations": "Casa de dos plantas, cuatro dormitorios, cuatro baños, pileta y dos cocheras. Antigüedad declarada: cuatro años. La ficha publica expensas de ARS 300.000 y una superficie total de 246 m², menor que la superficie de terreno informada (485 m²); verificar qué representa cada campo, reglamento, expensas actuales, planos y lote interno.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geocodeDisabled": true,
    "geolocationStatus": "Pendiente: barrio cerrado sin lote interno identificado; no asignar punto parcelario."
  ,
    "verificationStatus": "Ficha directa de Argenprop accesible el 27/11/2026; precio, superficies, responsable y expensas publicados. Disponibilidad y expensas actuales no confirmadas."
  },
  {
    "id": "casa-acceso-oeste-km34-1200",
    "recordType": "Casa quinta / chalet",
    "name": "Chalet quinta · Acceso Oeste km 34 · 1.200 m²",
    "locality": "Moreno",
    "address": "Autopista Acceso Oeste, km 34, Moreno; sin calle ni parcela publicados",
    "source": "https://www.argenprop.com/casa-en-venta-en-moreno--10648855",
    "agency": "Cantera Propiedades",
    "contact": "Teléfono parcialmente visible en Argenprop: 15-522; número completo no expuesto.",
    "price": "USD 165.000",
    "currency": "USD",
    "landSurfaceM2": 1200,
    "coveredSurfaceM2": 150,
    "surfaceNote": "60 m² semicubiertos declarados; el aviso menciona la posibilidad de anexar otro lote de 1.200 m², no incluido en esta oferta.",
    "observations": "Chalet de una planta, cuatro ambientes, tres dormitorios, pileta, galería, parrilla y galpón de herramientas. El aviso lo declara apto crédito y en muy buen estado. No publica altura ni nomenclatura catastral; el lote adicional se menciona sin precio ni identificación. Verificar acceso, parcela, servicios y si el lote anexo es realmente contiguo y disponible.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geocodeDisabled": true,
    "geolocationStatus": "Pendiente: referencia por kilómetro de autopista sin identificación parcelaria."
  ,
    "verificationStatus": "Ficha directa de Argenprop accesible el 27/11/2026; precio, superficies y anunciante publicados. Disponibilidad no confirmada; la referencia km 34 no identifica la parcela."
  },
  {
    "id": "casa-cornelio-saavedra-100-375",
    "recordType": "Casa individual",
    "name": "Cornelio Saavedra 100 · casa de 4 ambientes con quincho",
    "locality": "Moreno Centro",
    "address": "Cornelio Saavedra 100, Moreno",
    "geocodeQuery": "Cornelio Saavedra 100, Moreno",
    "source": "https://www.argenprop.com/casa-en-venta-en-moreno-4-ambientes--20846180",
    "agency": "RE/MAX Platino 2 · publicación en Argenprop / RAU S.R.L.",
    "contact": "Natalia Pereyra; responsable Walter Pascualini, CPI 3763 / CSI 5601; WhatsApp público +54 9 11 5455-2460 según Proppies.",
    "price": "USD 190.000",
    "currency": "USD",
    "landSurfaceM2": 375,
    "coveredSurfaceM2": 211,
    "surfaceNote": "Casa de dos plantas, tres dormitorios, dos baños, quincho cerrado y galpón/depósito; 27 años de antigüedad declarados.",
    "observations": "La ficha publica servicios activos y superficies aproximadas. Verificar medidas con título y mensura, estado de instalaciones, documentación de ampliaciones y precio vigente con RE/MAX Platino 2. Nueva ficha Proppies/Zonaprop del 27/11/2026 publica USD 190.000, 375 m² totales y 211 m² cubiertos, con tres dormitorios y dos baños. La nueva ficha dice Cornelio Saavedra 0 y la anterior 100; se consolida como un solo activo por coincidencia de precio, superficies y características. El enlace directo de Zonaprop asociado a la copia nueva devolvió 410; Argenprop permanece como fuente principal.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: dirección publicada; se requiere coincidencia inequívoca de Georef para colocar marcador.",
    "verificationStatus": "Argenprop permanece como fuente principal; Proppies muestra copia nueva el 27/11/2026 con mismo precio y superficies. La URL Zonaprop de esa copia devuelve 410; dirección 0/100 pendiente.",
    "publicationDate": "Proppies indica una nueva ficha publicada el 27/11/2026.",
    "sourceAlternates": [
      {
        "url": "https://proppies.app/propiedad/buenos-aires/moreno/casa-4-amb-en-venta-en-moreno-76030633",
        "label": "Nueva ficha Proppies del 27/11/2026; USD 190.000, 375 m² y 211 m² cubiertos."
      },
      {
        "url": "https://www.zonaprop.com.ar/propiedades/clasificado/veclcain-casa-4-ambientes-211-m-sup2--moreno-60798874.html",
        "label": "Enlace Zonaprop asociado; devolvió 410."
      }
    ]
  },
  {
    "id": "desarrollo-haras-maria-elena-unidades",
    "recordType": "Barrio privado consolidado · unidades en comercialización",
    "name": "Haras María Elena · unidades desde USD 199.000",
    "locality": "La Reja · Haras María Elena · Moreno",
    "address": "Estados Unidos al 2502, Haras María Elena, Moreno",
    "geocodeQuery": "Estados Unidos 2502, Moreno",
    "source": "https://www.zonaprop.com.ar/propiedades/emprendimiento/ememhoin-haras-maria-elena-la-reja-moreno-49677253.html",
    "sourceAlternates": [
      {
        "url": "https://www.grupovaccaro.com/vaccaro",
        "label": "Sitio de Grupo Vaccaro · trayectoria y contacto institucional"
      }
    ],
    "agency": "Grupo Vaccaro · desarrolladora y comercializadora del barrio",
    "contact": "Oficina Moreno: 11 4492-2817; WhatsApp Grupo Vaccaro: 11 5053-5918; atencionalcliente@grupovaccaro.com.",
    "price": "Desde USD 199.000",
    "currency": "USD",
    "landSurfaceM2": null,
    "coveredSurfaceM2": null,
    "surfaceNote": "La ficha publica 3 unidades, de 200 a 818 m² totales y 176 a 200 m² cubiertos. Describe un barrio de 9 ha y 122 lotes de 400 a 800 m².",
    "observations": "La ficha de Zonaprop consultada el 27/11/2026 muestra estado “Terminado” y entrega “noviembre de 2026”; una versión previa indicaba septiembre de 2026. El barrio se describe como consolidado y la ficha anuncia 3 unidades. La entrega efectiva de cada unidad, el stock y la posesión no están verificados independientemente; no clasificar como obra nueva en ejecución.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geocodeDisabled": true,
    "geolocationStatus": "Pendiente: barrio privado y unidad interna no identificada; no asignar coordenadas de parcela."
  ,
    "verificationStatus": "Ficha del emprendimiento accesible en Zonaprop el 27/11/2026; encabezado indica “Terminado · entrega noviembre 2026”. Precio desde USD 199.000 y rangos de superficie publicados; entrega efectiva, stock y disponibilidad no confirmados."
  }
];
publishedProperties.push(...nov27FreshEntries);


const nov27SupplementalEntries = [
  {
    "id": "casa-san-carlos-2400-370",
    "recordType": "Casa individual · Barrio Levin",
    "name": "San Carlos 2400 · casa de 3 ambientes con pileta y local",
    "locality": "Moreno",
    "address": "San Carlos 2400, Barrio Levin, Moreno",
    "source": "https://www.zonaprop.com.ar/propiedades/clasificado/veclcain-casa-3-amb-en-moreno-con-pileta-y-cochera-permuta-60715834.html",
    "agency": "Publicación en Zonaprop / plataforma RAU S.R.L.; oficina inmobiliaria no identificada en la ficha consultada",
    "contact": "Noelia Amoroso; corredores responsables José Smarke, CPI 7702, y Lucrecia Saulle, CSI 5520. Teléfono no visible.",
    "price": "USD 43.000 · el aviso evalúa permuta",
    "currency": "USD",
    "landSurfaceM2": null,
    "coveredSurfaceM2": 73,
    "surfaceNote": "La cabecera informa 123 m² totales y 73 m² cubiertos; la descripción declara 370 m² totales. No se determina superficie de terreno fiable.",
    "observations": "Casa de dos dormitorios, local/ambiente comercial previo, pileta que requiere reparaciones y base de ampliación en terraza. La ficha también difiere entre 1 cochera en cabecera y 3 cocheras en descripción. No usar superficie ni cantidad de cocheras para una tasación sin mensura y visita.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geocodeDisabled": true,
    "geolocationStatus": "Pendiente: la dirección es pública, pero las superficies y el alcance del inmueble son contradictorios; no se asigna punto parcelario.",
    "verificationStatus": "Ficha directa de Zonaprop accesible el 27/11/2026; precio, dirección y superficie cubierta publicados. La superficie total y las cocheras presentan contradicciones internas; disponibilidad no confirmada."
  },
  {
    "id": "casa-cura-brochero-6600-170",
    "recordType": "Casa individual · Barrio La Victoria",
    "name": "Cura Brochero 6600 · casa de 3 ambientes",
    "locality": "Moreno",
    "address": "Cura Brochero 6600, Barrio La Victoria, Moreno",
    "source": "https://www.zonaprop.com.ar/propiedades/clasificado/veclcain-casa-3-ambientes-moreno-170-m-sup2--oportunidad-unica!-60774907.html",
    "agency": "Publicación en Zonaprop / plataforma RAU S.R.L.; oficina inmobiliaria no identificada en la ficha consultada",
    "contact": "Pablo Ariel Schinca; corredora responsable Silvana Inés Palini, CPI 8862 / CMCPM 2955. Contacto mediante Zonaprop.",
    "price": "USD 44.900",
    "currency": "USD",
    "landSurfaceM2": null,
    "coveredSurfaceM2": 170,
    "surfaceNote": "La ficha declara 180 m² totales y 170 m² cubiertos; no informa superficie de terreno separada.",
    "observations": "Dos dormitorios, dos baños, cuatro cocheras declaradas en la cabecera y garaje de unos 17 m de largo descrito en el aviso. Se menciona posible uso comercial y una antigua fábrica de pan. Existió otro enlace de Zonaprop con características similares que devolvió 410 Gone; se registra esta URL accesible como publicación actual y no se cuenta el enlace antiguo como una segunda propiedad.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: dirección pública, pero no se asigna coordenada hasta coincidencia inequívoca de Georef.",
    "verificationStatus": "Ficha directa de Zonaprop accesible el 27/11/2026; precio, dirección, superficies y contacto/corredora visibles. Disponibilidad comercial no confirmada."
  },
  {
    "id": "terreno-pir25-4188",
    "recordType": "Terreno industrial individual · parque privado",
    "name": "Parque Industrial PIR25 · lote de 4.188,30 m²",
    "locality": "Moreno",
    "address": "Parque Industrial PIR25, Moreno; lote interno no identificado",
    "source": "https://www.girgola.com.ar/propiedad/158614_venta-lote-moreno-parque-industrial-pir25/",
    "agency": "Gírgola Propiedades",
    "contact": "Agustina Scalese, CPI 8928 / MGR 313; +54 11 5009-5429; admin@girgola.com.ar.",
    "price": "USD 544.480",
    "currency": "USD",
    "landSurfaceM2": 4188.3,
    "surfaceNote": "45,52 m de frente y 92,01 m de fondo, según la ficha. No se publica superficie cubierta.",
    "observations": "La publicación declara zonificación Industrial 1, FOS 0,60, FOT 1,20, altura máxima 21 m, infraestructura industrial y aprobación del parque. Son datos del anunciante que requieren respaldo documental. La ficha figura En venta, pero su última actualización visible es 06/05/2026; solicitar confirmación de stock, lote interno, escritura y expensas antes de considerarlo vigente.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "Pendiente de revalidación",
    "geocodeDisabled": true,
    "geolocationStatus": "Pendiente: lote interno sin numeración publicada; no asignar coordenada parcelaria.",
    "verificationStatus": "Ficha directa de Gírgola accesible el 27/11/2026; último cambio visible 06/05/2026. Precio, superficie, martillera y contacto publicados; vigencia comercial pendiente de revalidación."
  },
  {
    "id": "terreno-pir25-2709",
    "recordType": "Terreno industrial individual · identidad parcelaria pendiente",
    "name": "Parque Industrial PIR25 · lote de 2.709,33 m² · Gírgola",
    "locality": "Moreno",
    "address": "Parque Industrial PIR25, Moreno; lote interno no identificado",
    "source": "https://www.girgola.com.ar/propiedad/158891_venta-lote-moreno-parque-industrial-pir25-2700-m2/",
    "agency": "Gírgola Propiedades",
    "contact": "Agustina Scalese, CPI 8928 / MGR 313; +54 11 5009-5429; ascalese@girgola.com.ar.",
    "price": "USD 352.213",
    "currency": "USD",
    "landSurfaceM2": 2709.33,
    "surfaceNote": "39,35 m de frente y 60,10 m de fondo, según la ficha. No se publica superficie cubierta.",
    "observations": "Actualización visible 04/11/2026 y estado En venta. Posible solapamiento con el registro existente Parque Industrial R25, lote 21, de 2.741 m²: ambos carecen de nomenclatura interna comparable y las superficies/precios difieren (USD 352.213 frente a USD 233.000). No considerarlos parcelas independientes hasta confirmar lote interno y nomenclatura catastral.",
    "potentialDuplicateOf": "terreno-r25-lote21-2741",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geocodeDisabled": true,
    "geolocationStatus": "Pendiente: parque industrial y lote interno no identificado.",
    "verificationStatus": "Ficha directa de Gírgola accesible el 27/11/2026; actualización visible 04/11/2026. Precio, superficie, dimensiones y contacto publicados. Posible coincidencia con otro lote del mismo parque pendiente de verificación catastral."
  },
  {
    "id": "terreno-polo24-rp24-rp25-2914",
    "recordType": "Terreno industrial individual · posible relación con otro aviso Polo 24",
    "name": "Ruta 24 y 25 · Polo 24 · terreno de 2.914 m²",
    "locality": "Cuartel V",
    "address": "Ruta 24 y Ruta 25, Polo 24, Cuartel V, Moreno; lote interno no publicado",
    "source": "https://www.argenprop.com/terreno-en-venta-en-cuartel-v--18918378",
    "agency": "Adrián Mercado Real Estate",
    "contact": "Formulario de Argenprop; teléfono parcialmente visible como 11 62758, no completo. Corredores publicados: Leandro Mercado, CUCICBA 5604, y Adrián Mercado, CMCPSI 5712.",
    "price": "USD 189.000",
    "currency": "USD",
    "landSurfaceM2": 2914,
    "surfaceNote": "2.914 m² totales; no se publica superficie cubierta.",
    "observations": "El aviso ubica el lote a unos 300 m de RP24, dentro de Polo 24, y declara calles internas, seguridad, gas industrial, energía trifásica, red cloacal y estudios ambiental e hidráulico aprobados. Esas afirmaciones deben verificarse con documentación. Posible relación con otro aviso de Polo 24 de 2.432 m² ya registrado: no se fusionó porque la superficie y el precio publicados son distintos, pero falta lote interno para descartar duplicación.",
    "potentialDuplicateOf": "terreno-polo24-2432",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geocodeDisabled": true,
    "geolocationStatus": "Pendiente: parque industrial sin lote interno ni coordenada parcelaria.",
    "verificationStatus": "Ficha directa de Argenprop accesible el 27/11/2026; precio, superficie, ubicación general y corredor publicados. Lote interno y disponibilidad comercial no confirmados."
  },
  {
    "id": "terreno-libertad-637-845-historico",
    "recordType": "Terreno con mejoras · antecedente histórico",
    "name": "Libertad 637 · lote de 845 m² con mejoras · enlace no vigente",
    "locality": "Moreno",
    "address": "Libertad 637, Moreno, a unos 450 m de Av. Victorica",
    "source": "https://www.argenprop.com/terreno-en-venta-en-moreno--20319669",
    "agency": "Publicación en Argenprop / plataforma RAU S.R.L.; oficina inmobiliaria no identificada en la ficha indexada",
    "contact": "Ana Larisa Perdomo Castagnino; corredora responsable Silvana Inés Palini, CPI 8862 / CMCPM 2955. Teléfono no disponible en la ficha indexada.",
    "price": "USD 64.800 · último precio indexado",
    "currency": "USD",
    "landSurfaceM2": 845,
    "surfaceNote": "La ficha indexada describe lote de 845 m² con perforación y piscina de material de 32 m².",
    "observations": "El enlace directo devolvió 410 Gone en la revisión del 27/11/2026. Se conserva solo como antecedente y no como oportunidad vigente. No se confirmó si fue retirado, vendido o si la URL fue reemplazada; no usar el precio como oferta actual.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No vigente",
    "geocodeDisabled": true,
    "geolocationStatus": "Pendiente: registro histórico sin ficha primaria accesible.",
    "verificationStatus": "Resultado indexado de Argenprop con precio USD 64.800 y 845 m²; el enlace directo devolvió 410 Gone el 27/11/2026. Se conserva como no vigente en el inventario, sin afirmar venta confirmada."
  }
];
publishedProperties.push(...nov27SupplementalEntries);


const nov27Turn7Entries = [
  {
    "id": "moreno-terreno-el-salvador-tupungato-393",
    "recordType": "Terreno individual",
    "name": "Calle El Salvador y Tupungato · 393 m²",
    "locality": "Moreno",
    "address": "Calle El Salvador y Tupungato, Moreno",
    "geocodeQuery": "Calle El Salvador y Tupungato, Moreno",
    "geocodeMatch": "EL SALVADOR TUPUNGATO",
    "source": "https://www.argenprop.com/terreno-en-venta-en-moreno--20831012",
    "agency": "RE/MAX Caminos",
    "contact": "Andrea Janczuk; corredores responsables Damián Perrone (CUCICBA 2787) y Patricia Alejandra Córdoba (CMCPDJMGR 246). El teléfono aparece incompleto en el portal.",
    "price": "USD 60.000",
    "currency": "USD",
    "landSurfaceM2": 393,
    "surfaceNote": "Frente publicado: 22,50 m. Superficie cubierta no informada. Electricidad según el aviso.",
    "observations": "El anuncio describe paredón, portón y puerta, y ubica el lote en la esquina de El Salvador y Tupungato, cerca de Acceso Oeste y COTO. La aptitud constructiva es una afirmación comercial y requiere certificado urbanístico y documentación parcelaria.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "verificationStatus": "Ficha directa de Argenprop accesible en la revisión del 27/11/2026; precio, superficie, contacto y ubicación publicados. Disponibilidad comercial no confirmada.",
    "geolocationStatus": "Pendiente: Georef debe devolver una coincidencia inequívoca para la intersección; no representa geometría parcelaria."
  },
  {
    "id": "prados-oeste-1b-lote-182-800",
    "recordType": "Terreno individual en barrio cerrado",
    "name": "Prados del Oeste 1-B · Lote 182 · 800 m²",
    "locality": "La Reja",
    "address": "Prados del Oeste 1-B, lote 182, La Reja, Moreno",
    "geocodeDisabled": true,
    "source": "https://www.zonaprop.com.ar/propiedades/clasificado/vecltrin-venta-lote-182-en-barrio-cerrado-prados-del-oeste-59068041.html",
    "agency": "Valencia Viudes Bienes Raíces",
    "contact": "Matías G. Valencia, col. 3034 CMCPM, y Matías F. Viudes, col. 3047 CMCPM. Teléfono no visible en la ficha.",
    "price": "USD 59.000; expensas publicadas ARS 550.000",
    "currency": "USD",
    "landSurfaceM2": 800,
    "surfaceNote": "Lote interno, orientación norte según el aviso. No se informa superficie cubierta.",
    "observations": "La publicación declara escritura, posesión inmediata, servicios y proyecto aprobado para construir. Verificar vigencia de expensas, reglamento, identificación del lote, permiso y condiciones de posesión antes de avanzar.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "verificationStatus": "Ficha directa de Zonaprop accesible en la revisión del 27/11/2026; precio, superficie, lote y responsables publicados. Disponibilidad comercial no confirmada.",
    "geolocationStatus": "Pendiente: la publicación identifica un lote interno, pero no aporta una dirección parcelaria suficiente para ubicarlo."
  },
  {
    "id": "sofocles-3000-terreno-casa-330",
    "recordType": "Terreno con vivienda y mejoras",
    "name": "Sófocles 3000 · terreno con vivienda · 330 m²",
    "locality": "Francisco Álvarez",
    "address": "Sófocles 3000, Francisco Álvarez, Moreno",
    "geocodeQuery": "Sofocles 3000, Francisco Alvarez, Moreno",
    "geocodeMatch": "SOFOCLES 3000",
    "source": "https://www.zonaprop.com.ar/propiedades/clasificado/vecltrin-terreno-y-casa-en-venta-zona-industrial-moreno-54309890.html",
    "agency": "Calderón Propiedades / Calderón Inmobiliaria",
    "contact": "Consultas mediante Zonaprop. Una ficha sindicada de Argenprop muestra el teléfono parcial 5292-11; no se publica un número completo verificable.",
    "price": "USD 120.000",
    "currency": "USD",
    "landSurfaceM2": 330,
    "coveredSurfaceM2": 100,
    "surfaceNote": "100 m² cubiertos declarados por Zonaprop; terreno de 330 m² totales. Vivienda en planta baja y estructura preparada para continuar una planta alta.",
    "observations": "El aviso ubica la propiedad a metros de Colectora Norte de Acceso Oeste, km 41, y la describe como zona industrial. Verificar zonificación parcelaria, planos, habilitaciones y estado de la construcción; no inferir permiso industrial por la descripción del anunciante.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "verificationStatus": "Ficha directa de Zonaprop accesible el 27/11/2026; precio, superficies y descripción publicados. Disponibilidad comercial no confirmada.",
    "geolocationStatus": "Pendiente: Georef debe devolver una coincidencia inequívoca para la dirección publicada."
  },
  {
    "id": "casa-quinta-patricias-argentinas-2100-5150",
    "recordType": "Casa quinta individual",
    "name": "Casa quinta · Patricias Argentinas 2100 · 5.150 m²",
    "locality": "Cuartel V · Tierras del Morenito",
    "address": "Patricias Argentinas 2100, Tierras del Morenito, Cuartel V, Moreno",
    "geocodeQuery": "Patricias Argentinas 2100, Cuartel V, Moreno",
    "geocodeMatch": "PATRICIAS ARGENTINAS 2100",
    "source": "https://www.zonaprop.com.ar/propiedades/clasificado/veclcain-casa-quinta-sobre-lote-premium-5.150-m-sup2--moreno-60661542.html",
    "agency": "RE/MAX; oficina no identificada en la ficha consultada",
    "contact": "María Laura Torralba; corredor responsable Juan Alberto Crescimone, CMCPSM 2821 / CPI 9670. Teléfono no visible en la ficha.",
    "price": "USD 90.000",
    "currency": "USD",
    "landSurfaceM2": 5150,
    "coveredSurfaceM2": 150,
    "surfaceNote": "40 m² semicubiertos según la descripción; 3 ambientes, 2 dormitorios y 2 baños. Antigüedad publicada: 21 años.",
    "observations": "El aviso describe quincho, pileta y parque. El encabezado indica 190 m² totales, mientras la descripción informa 150 m² cubiertos y 40 m² semicubiertos; esos 190 m² corresponden a la construcción, no al terreno de 5.150 m². No se infiere potencial de subdivisión.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "verificationStatus": "Ficha directa de Zonaprop accesible el 27/11/2026; precio, superficies, contacto y ubicación publicados. Disponibilidad comercial no confirmada.",
    "geolocationStatus": "Pendiente: Georef debe devolver una coincidencia inequívoca para la dirección pública."
  },
  {
    "id": "alvarez-prado-2031-terreno-339",
    "recordType": "Terreno individual con permiso anunciado",
    "name": "Álvarez Prado 2031 · lote de 339 m² · permiso provisorio para dos locales",
    "locality": "Trujui",
    "address": "Álvarez Prado 2031 (el portal lo ubica en Álvarez Prado 2000), Trujui, Moreno",
    "geocodeQuery": "Alvarez Prado 2031, Trujui, Moreno",
    "geocodeMatch": "ALVAREZ PRADO 2031",
    "source": "https://www.argenprop.com/terreno-en-venta-en-trujui--18404916",
    "agency": "Néstor Donato Negocios Inmobiliarios",
    "contact": "Teléfono parcial publicado: 5292-11. No se identifica contacto personal en la ficha.",
    "price": "USD 40.000",
    "currency": "USD",
    "landSurfaceM2": 339,
    "surfaceNote": "10 × 33,90 m según la descripción. El aviso afirma un permiso provisorio para dos locales de aproximadamente 200 m² cubiertos; esa superficie sería proyectada, no construida.",
    "observations": "El anuncio declara plano visado, permiso provisorio para dos locales, servicios y zonificación Acc R3, Área U. Exigir expediente municipal, plano visado, vigencia del permiso y certificado urbanístico actual. La zonificación no fue verificada independientemente.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "verificationStatus": "Ficha directa de Argenprop accesible el 27/11/2026; precio, superficie, anunciante y permiso declarado publicados. Disponibilidad comercial no confirmada.",
    "geolocationStatus": "Pendiente: el aviso alterna entre altura 2031 y referencia de portal 2000; verificar numeración antes de geocodificar."
  },
  {
    "id": "parques-morenito-felix-de-azara-300",
    "recordType": "Terreno individual en barrio abierto",
    "name": "Parques del Morenito · Lote L20 Mza C · Felix de Azara 8200 · 300 m²",
    "locality": "Trujui · Tierras del Morenito",
    "address": "Felix de Azara al 8200, Trujui, Moreno; referencia interna L20, manzana C, PDM",
    "geocodeDisabled": true,
    "source": "https://www.zonaprop.com.ar/propiedades/clasificado/vecltrin-lote-terreno-en-venta-300-m-sup2--loteo-parques-del-57225090.html",
    "sourceAlternates": [
      {"url": "https://www.inmuebles.clarin.com/terreno-en-venta-en-moreno--19003454", "label": "Aviso de Felix de Azara y Ozanam, 300 m², USD 20.000, con encadenado de 99 m²; probable misma parcela, pendiente de cotejo."}
    ],
    "agency": "RAMIREZ Mandatos y Negocios Inmobiliarios",
    "contact": "Matrículas COMARCOMGR 71/183: Hipólito Enrique Ramírez y Carolina Noelia Ramírez; CUCICBA 8496: Hipólito Agustín Alejo Ramírez. Teléfono no publicado en la ficha.",
    "price": "USD 19.000",
    "currency": "USD",
    "landSurfaceM2": 300,
    "surfaceNote": "12 × 25 m según el portal; lote identificado como L20, manzana C, PDM. No se informa superficie cubierta.",
    "observations": "El anuncio declara lote perimetrado y escritura inmediata dentro de Parques del Morenito, barrio abierto de 3 ha y 50 lotes según la publicación. Es distinto del lote de 594 m² ya registrado; verificar nomenclatura, escritura y disponibilidad. Revalidada la ficha L20/Mza C: otra publicación genérica de 300 m² en Parques del Morenito por USD 13.000 no informa lote; puede ser esta misma parcela o un lote distinto. No fusionar ni contar dos parcelas hasta confirmar nomenclatura. Revisión adicional: aviso en Felix de Azara y Ozanam por 300 m², USD 20.000 y encadenado de 99 m². Coinciden barrio, superficie, dimensiones 12×25/25×12 y misma inmobiliaria; probable misma parcela que L20/Mza C, pero el nuevo aviso no publica esa identificación. Se conserva una sola ficha hasta cotejar nomenclatura.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "verificationStatus": "Ficha Zonaprop L20/Mza C accesible el 27/11/2026; USD 19.000 y 300 m². Otra ficha genérica de 300 m² podría coincidir; identidad pendiente.",
    "geolocationStatus": "Pendiente: el aviso identifica lote interno; no se asigna coordenada de parcela."
  },
  {
    "id": "colectora-sur-km31-5-fraccion-33000",
    "recordType": "Fracción con mejoras y obra parcial",
    "name": "Colectora Sur Acceso Oeste km 31,5 · fracción de 33.000 m²",
    "locality": "Moreno",
    "address": "Colectora Sur Acceso Oeste km 31,5, Moreno",
    "geocodeDisabled": true,
    "source": "https://coldwellbankergrupoelite.com.ar/propiedad/terreno-en-moreno--4609501",
    "sourceAlternates": [
      {
        "url": "https://www.argenprop.com/terreno-en-venta-en-moreno--19350623",
        "label": "Publicación sindicada del mismo aviso: 33.000 m² y USD 7.400.000"
      },
      {
        "url": "https://www.argenprop.com/terreno-en-venta-en-moreno--15520093",
        "label": "Aviso anterior de Urrutia en el mismo km: 28.600 m²; el precio actual del portal figura USD 300, dato anómalo y no utilizable"
      }
    ],
    "agency": "Coldwell Banker Grupo Elite",
    "contact": "+54 9 11 5356 3294; responsables publicados: Adriana Daniela González (CUCICBA 9701), Claudio Marcelo Rodríguez Castro (CMCPDJLM 1114) y Silvina Vanesa Berton (CMCPSL, MP 980, tomo II, folio 323).",
    "price": "USD 7.400.000",
    "currency": "USD",
    "landSurfaceM2": 33000,
    "surfaceNote": "90 m de frente. No se publica superficie cubierta. El aviso describe salón de eventos, piscina, segundo salón en construcción, vivienda, quincho, vestuarios y casa de casero.",
    "observations": "La ficha de Coldwell Banker publica FOS 0,60 y FOT 1, además de usos posibles; deben verificarse con certificado municipal vigente. Existe un aviso anterior de Urrutia en el mismo km 31,5 con 28.600 m² y mejoras similares, pero muestra USD 300 en Argenprop y la ficha directa de Urrutia devuelve 404. Se registra como posible mismo activo, no como segunda fracción; verificar mensura, dominio, superficie y precio por escrito.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "verificationStatus": "Ficha directa de Coldwell Banker accesible en la revisión del 27/11/2026; precio, superficie, contacto y mejoras publicados. Disponibilidad y superficie registral no confirmadas.",
    "geolocationStatus": "Pendiente: referencia por corredor vial; no se asigna coordenada ni parcela."
  },
  {
    "id": "casa-leopoldo-lugones-900-5000",
    "recordType": "Casa quinta / casona individual",
    "name": "Leopoldo Lugones 900 · casona sobre 5.000 m²",
    "locality": "Moreno",
    "address": "Leopoldo Lugones 900, Moreno",
    "geocodeQuery": "Leopoldo Lugones 900, Moreno",
    "geocodeMatch": "LEOPOLDO LUGONES 900",
    "source": "https://www.zonaprop.com.ar/propiedades/clasificado/veclcain-casa-en-venta-moreno-a-5-minutos-del-centro-60654396.html?n_pg=1&n_pos=9&n_src=Listado",
    "agency": "RE/MAX; oficina no identificada en la ficha consultada",
    "contact": "Andrea Burnowicz; corredores responsables Damián Perrone (CUCICBA 2787) y Patricia Alejandra Córdoba (CMCPDJMGR 246). Teléfono no visible en la ficha.",
    "price": "USD 220.000",
    "currency": "USD",
    "landSurfaceM2": 5000,
    "coveredSurfaceM2": 200,
    "surfaceNote": "5 ambientes, 4 dormitorios, 4 baños y 2 cocheras. Antigüedad publicada: 96 años. Incluye quincho, pileta y casa de visitas/casero; superficies de anexos no informadas.",
    "observations": "La ficha directa de Zonaprop muestra USD 220.000. Una ficha sindicada anterior mostraba USD 250.000; se prioriza el precio de la ficha directa actual. No se publica mensura ni potencial urbanístico; no asumir subdivisión.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "verificationStatus": "Ficha directa de Zonaprop accesible el 27/11/2026; precio, superficies, contacto y ubicación publicados. Disponibilidad comercial no confirmada.",
    "geolocationStatus": "Pendiente: Georef debe devolver una coincidencia inequívoca para la dirección pública."
  }
];
publishedProperties.push(...nov27Turn7Entries);

const turn7Ibis = publishedProperties.find(item => item.id === "desarrollo-ibis-iv-273");
if (turn7Ibis) {
  turn7Ibis.sourceAlternates = [
    ...(turn7Ibis.sourceAlternates || []),
    { url: "https://www.zonaprop.com.ar/propiedades/emprendimiento/ememvein-edificio-ibis-iv-58757105.html", label: "Ficha individual paralela del mismo desarrollo: 1 unidad, 43 m² totales y 41 m² cubiertos" }
  ];
  turn7Ibis.source = "https://www.zonaprop.com.ar/propiedades/emprendimiento/ememvein-edificio-ibis-iv-58757107.html";
  turn7Ibis.price = "Desde USD 51.600; ficha del desarrollo: 3 unidades de 43–48 m² totales / 40–45 m² cubiertos; ficha individual paralela: 1 unidad de 43/41 m²";
  turn7Ibis.surfaceNote = "La ficha del desarrollo publica 3 unidades de 43–48 m² totales y 40–45 m² cubiertos; una ficha individual paralela publica 1 unidad de 43 m² totales y 41 m² cubiertos. No sumar unidades: puede existir solapamiento entre inventarios.";
  turn7Ibis.observations = "Dos fichas directas consultadas el 27/11/2026: la ficha de emprendimiento muestra 3 unidades y etiquetas simultáneas “En Pozo”, “En Construcción” y “Terminado”; una ficha individual paralela muestra 1 unidad y declara que la estructura ya es visible desde la calle. Ambas indican entrega estimada en noviembre de 2027. No se pudo establecer si la unidad individual está incluida en las tres del emprendimiento, ni confirmar stock, etapa física real o fecha efectiva de entrega; solicitar inventario actualizado y visita de obra.";
  turn7Ibis.lastCheckedAt = "2026-11-27";
  turn7Ibis.availabilityStatus = "No confirmada";
  turn7Ibis.verificationStatus = "Ficha directa de Zonaprop accesible el 27/11/2026; el anunciante declara estructura visible y entrega estimada noviembre de 2027. Avance físico y stock no verificados independientemente.";
}
const turn7Chacras = publishedProperties.find(item => item.id === "desarrollo-chacras-teofilo-galileo-7300");
if (turn7Chacras) {
  turn7Chacras.lastCheckedAt = "2026-11-27";
  turn7Chacras.availabilityStatus = "No confirmada";
  turn7Chacras.verificationStatus = "Ficha directa de Zonaprop accesible el 27/11/2026; el aviso publica 35 lotes, 18.000 m² de desarrollo y entrega estimada mayo de 2027. Stock y ejecución no verificados independientemente.";
  turn7Chacras.observations = "La ficha directa consultada el 27/11/2026 mantiene publicado un lote individual de 326 m² a USD 23.000 contado o anticipo USD 5.000 más cuotas hasta 36 meses (total indicado USD 30.000). El proyecto se describe con 35 lotes sobre 18.000 m², calle de acceso asfaltada, sin expensas y servicio de electricidad; entrega aproximada mayo de 2027. No se verificaron subdivisión, agua/gas/cloacas, avance físico ni stock.";
}


const nov27Turn7FollowupEntries = [
  {
    "id": "terreno-marco-sastre-10552-dos-lotes-360",
    "recordType": "Terrenos individuales · dos lotes publicados en un aviso",
    "name": "Marco Sastre 10552 · dos lotes de 360 m² cada uno",
    "locality": "Trujui",
    "address": "Marco Sastre 10552, Trujui, Moreno (el encabezado del portal muestra Marco Sastre 100)",
    "geocodeDisabled": true,
    "source": "https://www.argenprop.com/terreno-en-venta-en-trujui--18259773",
    "agency": "Broker Inmobiliario Claudia Mateoli",
    "contact": "Claudia Mateoli; teléfono parcialmente visible: 1557354. No se publica un número completo verificable.",
    "price": "USD 27.000 por lote; dos lotes publicados",
    "currency": "USD",
    "landSurfaceM2": 360,
    "surfaceNote": "El aviso ofrece dos lotes, cada uno de 360 m² (10 × 36 m). El precio de USD 27.000 corresponde a cada lote, no al conjunto.",
    "observations": "La descripción ubica los lotes en Marco Sastre 10552, cerca de Ruta 23 y Cruce de Castelar; el encabezado del portal muestra Marco Sastre 100. Declara carpeta de hormigón, baño precario y escritura. Verificar numeración, nomenclatura catastral y si ambos lotes siguen disponibles; se registra un único aviso para no duplicar la publicación.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "verificationStatus": "Ficha directa de Argenprop accesible el 27/11/2026; precio por lote, superficies, contacto y descripción publicados. Disponibilidad no confirmada.",
    "geolocationStatus": "Pendiente: existe discrepancia entre la altura 10552 de la descripción y 100 en el encabezado; no se asigna coordenada."
  },
  {
    "id": "terreno-juan-stefani-torre-alta-iii-420",
    "recordType": "Terreno individual en barrio",
    "name": "Juan Stefani · Barrio Torre Alta III · 420 m²",
    "locality": "Trujui",
    "address": "Calle Juan Stefani, Barrio Torre Alta III, Trujui, Moreno",
    "geocodeDisabled": true,
    "source": "https://www.argenprop.com/terreno-en-venta-en-trujui--18049157",
    "agency": "Broker Inmobiliario Claudia Mateoli",
    "contact": "Claudia Mateoli; teléfono parcialmente visible: 1557354. No se publica un número completo verificable.",
    "price": "USD 22.000",
    "currency": "USD",
    "landSurfaceM2": 420,
    "surfaceNote": "12 m de frente × 35 m de fondo. No se informa superficie cubierta.",
    "observations": "El aviso declara escritura y financiación: anticipo USD 4.000, 12 cuotas de USD 700 y 12 cuotas de USD 800. Confirmar precio contado, saldo financiado, tasa, gastos y nomenclatura del lote; la dirección no incluye altura ni identificación interna.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "verificationStatus": "Ficha directa de Argenprop accesible en la revisión del 27/11/2026; precio, superficie, condiciones y anunciante publicados. Disponibilidad no confirmada.",
    "geolocationStatus": "Pendiente: calle y barrio sin altura ni lote interno; no se asigna marcador."
  },
  {
    "id": "terreno-aeronautica-argentina-2300-430",
    "recordType": "Terreno individual",
    "name": "Aeronautica Argentina 2300 · lote de 430 m²",
    "locality": "Trujui",
    "address": "Aeronautica Argentina 2300, Trujui, Moreno",
    "geocodeQuery": "Aeronautica Argentina 2300, Trujui, Moreno",
    "geocodeMatch": "AERONAUTICA ARGENTINA 2300",
    "source": "https://www.argenprop.com/terreno-en-venta-en-trujui--20913079",
    "agency": "RE/MAX Life",
    "contact": "Pablo Quinteiro; corredor responsable Laura Palini, CSM 2733 / CPI 7752. El teléfono aparece incompleto como +54 (11).",
    "price": "USD 24.000",
    "currency": "USD",
    "landSurfaceM2": 430,
    "surfaceNote": "Superficie total publicada: 430 m². El título indica mejoras, pero la descripción no las detalla ni cuantifica.",
    "observations": "Ficha directa de Argenprop con ubicación y precio publicados. Solicitar mensura, nomenclatura, detalle de mejoras, servicios y certificado urbanístico antes de considerar el valor de construcción.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "verificationStatus": "Ficha directa de Argenprop accesible el 27/11/2026; precio, superficie, corredor y contacto publicados. Disponibilidad no confirmada.",
    "geolocationStatus": "Pendiente: Georef debe devolver coincidencia inequívoca para la dirección."
  },
  {
    "id": "loteo-barrio-malaver-etapa-2-pitagoras-echeverria-400",
    "recordType": "Loteo anunciado · segunda etapa con lote individual publicado",
    "name": "Barrio Malaver · segunda etapa · lote de 400 m² en Pitágoras y Echeverría",
    "locality": "Trujui · Barrio Malaver",
    "address": "Intersección de Pitágoras y Echeverría, Barrio Malaver, Trujui, Moreno",
    "geocodeDisabled": true,
    "source": "https://www.argenprop.com/terreno-en-venta-en-trujui--20827036",
    "agency": "RE/MAX Life",
    "contact": "Pablo Quinteiro; corredor responsable Laura Palini, CSM 2733 / CPI 7752. El teléfono aparece incompleto como +54 (11).",
    "price": "USD 17.500 por el lote publicado de 400 m²",
    "currency": "USD",
    "landSurfaceM2": 400,
    "surfaceNote": "La publicación anuncia lotes de 300, 400 y 500 m²; este aviso específico corresponde a 400 m². No se informa superficie cubierta.",
    "observations": "La descripción anuncia segunda etapa de Barrio Malaver con 63 lotes; afirma que la primera etapa de 50 lotes fue vendida y escriturada y que los nuevos lotes están listos para posesión inmediata. Condiciones publicadas: 50% de anticipo y saldo en cuotas; acepta vehículos y pagos en pesos o dólares. Verificar aprobación del loteo, planos, títulos, infraestructura y disponibilidad de cada parcela. Se registra una sola ficha para no duplicar el proyecto y el lote del mismo aviso.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "verificationStatus": "Ficha directa de Argenprop accesible el 27/11/2026; precio del lote, superficie y datos comerciales de la segunda etapa publicados. Aprobaciones, posesión y stock no verificados independientemente.",
    "geolocationStatus": "Pendiente: el aviso identifica una intersección y un desarrollo de múltiples lotes, no la parcela individual."
  },
  {
    "id": "terreno-gervasio-mendez-10500-400",
    "recordType": "Terreno individual",
    "name": "Gervasio Méndez 10500 · lote de 400 m²",
    "locality": "Trujui",
    "address": "Gervasio Méndez 10500, Trujui, Moreno",
    "geocodeQuery": "Gervasio Mendez 10500, Trujui, Moreno",
    "geocodeMatch": "GERVASIO MENDEZ 10500",
    "source": "https://www.argenprop.com/terreno-en-venta-en-trujui--20792507",
    "agency": "RE/MAX Life",
    "contact": "Pablo Quinteiro; corredor responsable Laura Palini, CSM 2733 / CPI 7752. El teléfono aparece incompleto como +54 (11).",
    "price": "USD 16.500",
    "currency": "USD",
    "landSurfaceM2": 400,
    "surfaceNote": "Superficie total publicada: 400 m². El aviso menciona oferta de lotes de 300 y 400 m².",
    "observations": "El anuncio ofrece financiación con anticipo USD 8.500 y 24 cuotas de USD 385. Esa suma de cuotas no coincide exactamente con el precio publicado de USD 16.500; pedir liquidación escrita y confirmar si la financiación corresponde a este lote. No se informa escritura, servicios parcelarios ni número de lote.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "verificationStatus": "Ficha directa de Argenprop accesible el 27/11/2026; precio, superficie, dirección, contacto y financiación publicados. Disponibilidad no confirmada.",
    "geolocationStatus": "Pendiente: Georef debe devolver coincidencia inequívoca para la dirección."
  },
  {
    "id": "casa-quinta-ambrosetti-2000-3195",
    "recordType": "Casa quinta individual",
    "name": "Ambrosetti al 2000 · casa quinta · La Reja Sur",
    "locality": "La Reja",
    "address": "Ambrosetti al 2000, entre Ambrosetti y Pereda, La Reja Sur, Moreno",
    "geocodeDisabled": true,
    "source": "https://www.zonaprop.com.ar/propiedades/clasificado/veclqvin-venta-casa-quinta-con-4-dorm.-quincho-parrilla-y-57712270.html?n_pg=1&n_pills=Quincho&n_pos=5&n_src=Listado",
    "agency": "DI PASCUALE Propiedades",
    "contact": "DI PASCUALE Propiedades; matrícula D.J.M.G.R. N.º 41 / N.º 230. Teléfono y contacto personal no visibles en la ficha consultada.",
    "price": "USD 240.000",
    "currency": "USD",
    "landSurfaceM2": 3195,
    "coveredSurfaceM2": 293,
    "surfaceNote": "3.195 m² de terreno (54 × 59,16 m); 293 m² cubiertos. El quincho integrado declara 140 m² cubiertos dentro de la descripción; no sumarlo nuevamente a la cubierta total.",
    "observations": "La ficha directa describe chalet de dos plantas, cuatro dormitorios, cuatro baños, quincho, pileta, galpón y lavadero. Ubicación aproximada: Ambrosetti y Pereda, a 150 m de Padre Fahy y con salida a Ruta 5. Verificar medidas, estado, planos y servicios.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "verificationStatus": "Ficha directa de Zonaprop accesible el 27/11/2026; precio, superficies, ubicación y anunciante publicados. Disponibilidad no confirmada.",
    "geolocationStatus": "Pendiente: la publicación brinda altura aproximada y referencias de calles, no una dirección parcelaria inequívoca."
  },
  {
    "id": "casa-quinta-juan-bautista-alberdi-1400-2000",
    "recordType": "Casa quinta individual",
    "name": "Juan Bautista Alberdi 1400 · casa quinta sobre 2.000 m²",
    "locality": "Moreno Centro",
    "address": "Juan Bautista Alberdi 1400, Moreno",
    "geocodeQuery": "Juan Bautista Alberdi 1400, Moreno",
    "geocodeMatch": "JUAN BAUTISTA ALBERDI 1400",
    "source": "https://www.zonaprop.com.ar/propiedades/clasificado/veclcain-casa-quinta-5-ambientes-con-pileta-y-parque-venta-51153815.html?n_pg=1&n_pos=5&n_src=Listado",
    "agency": "Inmobiliaria Claudio Godoy",
    "contact": "Inmobiliaria Claudio Godoy; el botón de datos y el formulario de Zonaprop son el contacto público disponible. Teléfono no visible.",
    "price": "USD 130.000",
    "currency": "USD",
    "landSurfaceM2": 2000,
    "coveredSurfaceM2": 200,
    "surfaceNote": "200 m² cubiertos publicados; lote de 2.000 m². Casa de 5 ambientes, 4 dormitorios y 3 baños; antigüedad indicada: 80 años.",
    "observations": "Casa señorial a refaccionar, con pileta, quincho y parque. El anunciante menciona potencial para ampliación o construcción adicional y acepta propiedad en parte de pago; no existe certificado urbanístico adjunto que confirme edificabilidad adicional.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "verificationStatus": "Ficha directa de Zonaprop accesible el 27/11/2026; precio, superficies, dirección y agencia publicados. Disponibilidad no confirmada.",
    "geolocationStatus": "Pendiente: Georef debe devolver coincidencia inequívoca para la dirección."
  },
  {
    "id": "casa-prados-oeste-general-hornos-2900-850",
    "recordType": "Casa individual en construcción",
    "name": "General Hornos 2900 · casa en construcción · Prados del Oeste II",
    "locality": "La Reja · Prados del Oeste II",
    "address": "General Hornos 2900, Prados del Oeste II, La Reja, Moreno",
    "geocodeQuery": "General Hornos 2900, Prados del Oeste II, La Reja, Moreno",
    "geocodeMatch": "GENERAL HORNOS 2900",
    "source": "https://www.zonaprop.com.ar/propiedades/clasificado/veclcain-venta-de-casa-5-ambientes-en-prados-del-oeste-moreno-60436698.html?n_pg=1&n_pills=Parrilla&n_pos=1&n_src=Listado",
    "agency": "Anunciante en Zonaprop; firma inmobiliaria no identificada en el texto de la ficha consultada",
    "contact": "Formulario de Zonaprop; nombre y teléfono no visibles en la ficha abierta.",
    "price": "USD 295.000",
    "currency": "USD",
    "landSurfaceM2": 850,
    "coveredSurfaceM2": 170,
    "surfaceNote": "70 m² semicubiertos. El encabezado indica 240 m² totales de construcción (170 cubiertos + 70 semicubiertos); el terreno es de 850 m². El aviso describe 3 dormitorios y escritorio, mientras la cabecera indica 4 dormitorios.",
    "observations": "La publicación identifica expresamente la vivienda como en construcción, dentro de Prados del Oeste II. Describe losa radiante, jardín interno y diseño moderno. Las superficies, cantidad de dormitorios y terminaciones deben confirmarse en planos y contrato; la ficha advierte que la información es ilustrativa y no vinculante.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "verificationStatus": "Ficha directa de Zonaprop accesible el 27/11/2026; precio, lote, superficies y estado de obra declarado publicados. Avance físico y disponibilidad no verificados independientemente.",
    "geolocationStatus": "Pendiente: Georef debe devolver coincidencia inequívoca; la parcela interna no está identificada."
  },
  {
    "id": "casa-quinta-infanta-isabel-4200-1527",
    "recordType": "Casa quinta individual",
    "name": "Infanta Isabel 4200 · quinta Parque Gorriti",
    "locality": "Francisco Álvarez",
    "address": "Infanta Isabel 4200, Francisco Álvarez, Moreno",
    "geocodeQuery": "Infanta Isabel 4200, Francisco Alvarez, Moreno",
    "geocodeMatch": "INFANTA ISABEL 4200",
    "source": "https://www.argenprop.com/quinta-en-venta-en-francisco-alvarez--20794729",
    "sourceAlternates": [
      {
        "url": "https://www.zonaprop.com.ar/propiedades/clasificado/veclqvin-quinta-en-venta-parque-gorriti-56819435.html?n_pg=1&n_pos=5&n_src=Listado",
        "label": "Copia anterior en Zonaprop: mostraba USD 240.000; enlace directo devuelve 410 Gone, no vigente"
      }
    ],
    "agency": "Matías Szpira Bienes Raíces",
    "contact": "Federico Racciatti; corredor responsable Sergio Rua, CPI 8154, y Liliana Fernández, CMQ 1049. Teléfono parcialmente visible: +54 11 27.",
    "price": "USD 220.000",
    "currency": "USD",
    "landSurfaceM2": 1527.43,
    "coveredSurfaceM2": 197.82,
    "surfaceNote": "La ficha sindicada también informa 63 m² semicubiertos. Lote de 1.527,43 m²; vivienda de 4 ambientes, 3 dormitorios y pileta.",
    "observations": "La ficha directa actual de Argenprop publica USD 220.000 y 1.527 m² de terreno / 197 m² cubiertos; declara plano actualizado aprobado, apto crédito y financiación. Una copia anterior de Zonaprop mostraba USD 240.000, pero su enlace devuelve 410 Gone. Se prioriza el aviso directo vigente a USD 220.000; verificar plano, servicios (la descripción indica sistema de pozo y ausencia de cloacas) y precio final.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "verificationStatus": "Ficha directa de Argenprop accesible el 27/11/2026; precio, superficies, contacto y ubicación publicados. La copia de Zonaprop está retirada/no accesible. Disponibilidad comercial no confirmada.",
    "geolocationStatus": "Pendiente: Georef debe devolver coincidencia inequívoca para la dirección pública."
  }
];
publishedProperties.push(...nov27Turn7FollowupEntries);


const turn7Sofocles = publishedProperties.find(item => item.id === "sofocles-3000-terreno-casa-330");
if (turn7Sofocles) {
  turn7Sofocles.source = "https://terreno.mercadolibre.com.ar/MLA-2256050333-terreno-y-casa-en-venta-zona-industrial-moreno-_JM";
  turn7Sofocles.sourceAlternates = [
    ...(turn7Sofocles.sourceAlternates || []),
    { url: "https://proppies.app/propiedad/buenos-aires/moreno/terreno-en-venta-en-francisco-alvarez-45664953", label: "Ficha sindicada: informa 100 m² cubiertos; el aviso original de MercadoLibre solo publica 330 m² totales" }
  ];
  turn7Sofocles.agency = "Calderón Propiedades";
  turn7Sofocles.contact = "Contacto mediante mensajería de MercadoLibre; no se publica teléfono ni persona de contacto. Publicador identificado: Calderón Propiedades.";
  turn7Sofocles.surfaceNote = "Terreno de 330 m² totales según el aviso original de MercadoLibre. Una ficha sindicada de Proppies informa 100 m² cubiertos; esa superficie no aparece en el aviso original y queda pendiente de documentación.";
  turn7Sofocles.observations = "El aviso original describe una construcción con living comedor, cocina integrada, baño y dormitorios, preparada para continuar una planta alta; la ficha sindicada de Proppies atribuye 100 m² cubiertos. La descripción ubica el inmueble a metros de Colectora Norte de Acceso Oeste km 41 y lo denomina zona industrial. Verificar superficie cubierta, planos, zonificación parcelaria y habilitaciones.";
  turn7Sofocles.lastCheckedAt = "2026-11-27";
  turn7Sofocles.availabilityStatus = "Pendiente de revalidación";
  turn7Sofocles.verificationStatus = "MercadoLibre indexó el aviso hace tres semanas, pero el acceso directo devolvió 403 en esta revisión; Proppies conserva una ficha sindicada. Precio y 330 m² totales visibles, superficie cubierta no confirmada en la fuente original. Disponibilidad no confirmada.";
}

const nov27_0855NewEntries = [
  {
    "id": "terreno-juan-jose-castelli-2500-8435",
    "recordType": "Fracción de terreno · posible loteo",
    "name": "Juan José Castelli 2500 · fracción de 8.435 m² · Villa Salas",
    "locality": "Villa Salas · Moreno",
    "address": "Juan José Castelli 2550, entre Marcos Paz e Ituzaingó, Villa Salas, Moreno",
    "geocodeDisabled": true,
    "source": "https://inmoclick.com/297534-remax-evolution/inmuebles/315/ficha/terreno-en-venta-en-juan-jose-castelli-2500",
    "agency": "RE/MAX Evolution",
    "contact": "Formulario público de Inmoclick; no se muestra un teléfono completo en la ficha consultada.",
    "price": "USD 340.900",
    "currency": "USD",
    "landSurfaceM2": 8435.25,
    "coveredSurfaceM2": null,
    "surfaceNote": "8.435,25 m² según descripción; frente publicado de 75 m y fondo de 112,47 m. Sin superficie cubierta informada.",
    "publicationDate": "Publicado hace 15 días según la ficha de Inmoclick; consultado el 27/11/2026.",
    "observations": "El anunciante lo ofrece por su dimensión y posible loteo, pero no se verificó prefactibilidad ni aprobación de subdivisión. La ficha menciona calle mejorada y electricidad; otros servicios quedarían sujetos a factibilidad. Medidas y superficie son orientativas según el propio aviso. Solicitar título, mensura, nomenclatura catastral, zonificación y factibilidades.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: dirección pública identificada, pero no se obtuvo una coincidencia Georef inequívoca para colocar marcador.",
    "verificationStatus": "Ficha directa de Inmoclick accesible el 27/11/2026; precio, superficie y ubicación publicados. Disponibilidad, título y posibilidad de loteo no confirmados."
  },
  {
    "id": "terreno-general-hornos-1800-prados-oeste2-800",
    "recordType": "Terreno individual · reventa en barrio cerrado",
    "name": "Prados del Oeste · lote central de 800 m² · General Hornos 1800",
    "locality": "Moreno · Prados del Oeste (localidad exacta no indicada en ficha)",
    "address": "General Hornos 1800, Prados del Oeste II, Moreno",
    "geocodeDisabled": true,
    "source": "https://inmoclick.com/287671-grupo-vaccaro/inmuebles/506/ficha/lote-en-venta-en-general-hornos-1800",
    "agency": "Grupo Vaccaro",
    "contact": "Formulario público de Inmoclick; oficina Moreno de Grupo Vaccaro: +54 11 4492-2817 · atencionalcliente@grupovaccaro.com.",
    "phone": "+541144922817",
    "price": "USD 24.000",
    "currency": "USD",
    "landSurfaceM2": 800,
    "coveredSurfaceM2": null,
    "surfaceNote": "Lote central de 800 m² según descripción; no se informa superficie cubierta.",
    "publicationDate": "La ficha abierta indica “Publicado hace 1 mes”; un resultado indexado anterior mostraba 7 días. Fecha relativa no reconciliada.",
    "observations": "Aviso de reventa en Prados del Oeste; la ficha no especifica fase I o II. La descripción del barrio menciona 256 lotes unifamiliares y servicios comunes, pero no se verificó el reglamento ni el estado de este lote individual. La dirección 1800 funciona como referencia del aviso y no identifica la parcela interna; no colocar marcador en la puerta de calle.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: lote interno sin identificación parcelaria; se conserva la ubicación textual y no se geocodifica.",
    "verificationStatus": "Ficha directa de Inmoclick accesible el 27/11/2026; precio y lote de 800 m² publicados. Disponibilidad y documentación no confirmadas.",
    "sourceAlternates": [
      {
        "url": "https://www.grupovaccaro.com/sucursales",
        "label": "Sucursales oficiales y contacto de Grupo Vaccaro"
      }
    ]
  },
  {
    "id": "terreno-don-bosco-8700-san-francisco-325",
    "recordType": "Terreno individual · barrio cerrado",
    "name": "Barrio San Francisco · Don Bosco 8599/8700 · 325 m²",
    "locality": "Cuartel V · Moreno",
    "address": "Don Bosco 8599/8700, barrio cerrado San Francisco, Cuartel V, frente a Quinta La Celina",
    "geocodeDisabled": true,
    "source": "https://inmoclick.com/307926-estudio-inmobiliario-jm/inmuebles/354/ficha/terreno-en-venta-en-don-bosco-8700",
    "agency": "Estudio Inmobiliario JM",
    "contact": "Formulario público de Inmoclick; teléfono no visible en la ficha.",
    "price": "USD 13.000",
    "currency": "USD",
    "landSurfaceM2": 325,
    "coveredSurfaceM2": null,
    "surfaceNote": "12 × 25 m, 325 m² totales. El campo técnico del portal repite 325 m² como cubiertos, pero la descripción habla de un lote sin edificación; no se registra superficie cubierta.",
    "publicationDate": "Publicado hace 2 meses según la ficha consultada el 27/11/2026.",
    "observations": "La ficha alterna Don Bosco 8700 en el título y Don Bosco 8599 en la descripción. Indica lote perimetral, tranquera al frente, tejido y paredón al fondo, y escritura según anunciante. Confirmar numeración, ubicación, escritura y expensas/reglamento del barrio antes de cualquier seña.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: dirección contradictoria y lote interno; no asignar coordenadas.",
    "verificationStatus": "Ficha directa de Inmoclick accesible el 27/11/2026; precio y superficie total publicados. Dirección y campo de superficie cubierta presentan inconsistencias."
  },
  {
    "id": "terrenos-mariano-moreno-la-reja-lotes-5-11-925",
    "recordType": "Dos terrenos individuales ofrecidos en un aviso",
    "name": "Loteo Mariano Moreno · lotes 5 y 11 · 925 m² cada uno",
    "locality": "La Reja · Moreno",
    "address": "Calle Mariano Moreno entre Gervasio Posadas y Av. Francisco Miero, La Reja",
    "geocodeDisabled": true,
    "source": "https://inmoclick.com/252859-sabrina-peluso-inmobiliaria/inmuebles/2676/ficha/terreno-en-venta-en-mariano-moreno",
    "sourceAlternates": [
      {
        "url": "https://terreno.mercadolibre.com.ar/MLA-4166209024-lotes-premium-925m2-la-reja-mariano-moreno-financiacion-_JM",
        "label": "Resultado de MercadoLibre indexado como reciente; el acceso directo devolvió 403 el 27/11/2026"
      }
    ],
    "agency": "Sabrina Peluso Inmobiliaria · Col. 267 MGR",
    "contact": "Sabrina Peluso Inmobiliaria, Col. 267 MGR; formulario Inmoclick; teléfono no visible.",
    "price": "USD 38.000 por lote; el aviso ofrece dos lotes (5 y 11). Anticipo publicado: USD 10.000 por lote y saldo financiable.",
    "currency": "USD",
    "landSurfaceM2": 925,
    "coveredSurfaceM2": null,
    "surfaceNote": "Dos parcelas separadas de 925 m² cada una; 20 × 46,25 m cada lote. No sumar como una sola fracción sin confirmar que se venden juntas.",
    "publicationDate": "Inmoclick indica publicado hace 21 días al 27/11/2026.",
    "observations": "La ficha enumera lotes 5 y 11 con igual superficie y precio por unidad, factibilidad de luz aprobada y financiación directa. La disponibilidad de ambos lotes debe consultarse por separado; no se publica numeración catastral ni plano de subdivisión en la ficha. Revalidado con ficha directa Inmoclick 2676: lotes 5 y 11, 925 m² cada uno, USD 38.000 cada uno. Publicado hace 21 días. No se confirma disponibilidad individual ni aprobación municipal.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: se publica un tramo de calle, sin altura ni identificación inequívoca de cada lote.",
    "verificationStatus": "Ficha directa Inmoclick accesible 27/11/2026, publicada hace 21 días; lotes 5 y 11, USD 38.000 por lote. Stock no confirmado."
  },
  {
    "id": "terreno-de-la-vega-200-dos-lotes-970",
    "recordType": "Dos lotes contiguos · terreno para desarrollo",
    "name": "De la Vega al 200 · dos lotes · 970 m²",
    "locality": "Moreno Centro",
    "address": "De la Vega al 200, entre Alem y Aristóbulo del Valle, Moreno",
    "geocodeDisabled": true,
    "source": "https://inmoclick.com/251109-cuccioli-propiedades/inmuebles/71/ficha/terreno-en-venta-en-de-la-vega-al-200",
    "sourceAlternates": [
      {
        "url": "https://www.zonaprop.com.ar/propiedades/clasificado/vecltrin-terreno-moreno-52616745.html",
        "label": "Ficha paralela del mismo aviso en Zonaprop"
      }
    ],
    "agency": "Cuccioli Propiedades",
    "contact": "Formulario público de Inmoclick; teléfono no visible en la ficha.",
    "price": "USD 160.000",
    "currency": "USD",
    "landSurfaceM2": 970,
    "coveredSurfaceM2": null,
    "surfaceNote": "Dos lotes; 8,66 m de frente × 56 m de fondo cada uno. El portal publica 970 m² totales y también los etiqueta erróneamente como cubiertos; no se describe construcción.",
    "publicationDate": "Publicado hace 7 meses según la ficha directa de Inmoclick; consultado el 27/11/2026.",
    "observations": "El anuncio declara zonificación A.C. “B” y R1A, FOS 0,6, FOT 1,4, densidad 500 hab/ha y altura máxima 15 m. Son datos del anunciante, no certificado municipal. Por la antigüedad relativa y la diferencia entre portales, queda pendiente confirmar precio, disponibilidad, nomenclatura y parámetros urbanísticos. El campo “cubiertos” del portal no se toma como superficie edificada.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "Pendiente de revalidación",
    "geolocationStatus": "Pendiente: ubicación aproximada “al 200” y dos lotes sin identificación parcelaria.",
    "verificationStatus": "Ficha directa de Inmoclick accesible el 27/11/2026; dos lotes, precio y fecha relativa publicados. Por antigüedad, disponibilidad y parámetros urbanísticos requieren confirmación."
  },
  {
    "id": "terreno-leandro-alem-2365-600",
    "recordType": "Terreno para desarrollo urbano-comercial",
    "name": "Leandro N. Alem 2365 · lote de 600 m²",
    "locality": "Moreno Centro",
    "address": "Leandro N. Alem 2365 (título del portal: al 2300), Moreno",
    "geocodeDisabled": true,
    "source": "https://www.argenprop.com/terreno-en-venta-en-moreno--17928669",
    "agency": "Daniel Zunino Propiedades",
    "contact": "Contacto por Argenprop y WhatsApp del anunciante; teléfono completo no expuesto en la ficha consultada.",
    "price": "USD 180.000",
    "currency": "USD",
    "landSurfaceM2": 600,
    "coveredSurfaceM2": null,
    "surfaceNote": "600 m² declarados en la ficha; la descripción informa 11,5 × 56 m, que no coincide con la superficie declarada. No se informa superficie cubierta.",
    "publicationDate": "Fecha original no visible; el resultado de búsqueda estaba indexado aproximadamente 10 meses antes de la revisión.",
    "observations": "El aviso lo ofrece para desarrollo y acepta 100 m² construidos como parte de pago. Declara Centro Urbano Sector 1, FOS 0,6, FOT 3 y altura máxima de 36 m en perímetro libre / 21 m en medianeras. Son afirmaciones del aviso: verificar nomenclatura, medidas reales, certificado urbanístico, afectaciones y vigencia del precio. Por antigüedad y discrepancia de medidas, queda pendiente de revalidación.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "Pendiente de revalidación",
    "geolocationStatus": "Pendiente: el título indica altura 2300 y la descripción 2365; confirmar dirección exacta antes de geocodificar.",
    "verificationStatus": "Ficha directa de Argenprop accesible el 27/11/2026; precio y datos urbanísticos publicados por el anunciante. Antigüedad, superficie y disponibilidad pendientes de confirmación."
  },
  {
    "id": "terreno-marconi-1700-2200",
    "recordType": "Terreno para uso industrial/comercial · subdivisión en trámite",
    "name": "Marconi 1700 · lote de 2.200 m² · próximo a Acceso Oeste",
    "locality": "Moreno",
    "address": "Marconi 1700, Moreno, a aproximadamente 300 m de Acceso Oeste",
    "geocodeQuery": "Marconi 1700, Moreno, Buenos Aires",
    "source": "https://www.zonaprop.com.ar/propiedades/clasificado/vecltrin-lote-en-venta:cercano-acc-oeste:2200-m-sup2-:ideal-43019225.html",
    "sourceAlternates": [
      {
        "url": "https://proppies.app/propiedad/buenos-aires/moreno/terreno-en-venta-en-moreno-45664600",
        "label": "Ficha de Proppies con WhatsApp del anunciante y análisis de precio"
      }
    ],
    "agency": "Bernstein Propiedades",
    "contact": "WhatsApp publicado en Proppies: +54 11 3560-3734; contacto adicional mediante Zonaprop.",
    "phone": "+541135603734",
    "price": "USD 220.000",
    "currency": "USD",
    "landSurfaceM2": 2200,
    "coveredSurfaceM2": null,
    "surfaceNote": "2.200 m²; medidas publicadas 35 × 63 m. No se informa superficie cubierta.",
    "publicationDate": "Proppies indica “Publicado hace 2 meses”; Zonaprop no muestra fecha en la ficha directa.",
    "observations": "El aviso lo describe como lote ideal para galpón, con electricidad y subdivisión en trámite. No se debe asumir que la subdivisión ya esté aprobada ni que exista aptitud industrial definitiva. Solicitar plano, nomenclatura catastral, certificado urbanístico, estado de trámite y confirmación de precio.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: dirección publicada a nivel de altura; se requiere coincidencia inequívoca de Georef antes de colocar marcador.",
    "verificationStatus": "Ficha directa de Zonaprop accesible el 27/11/2026 y ficha de Proppies consultada; precio y superficie publicados. Disponibilidad y subdivisión no confirmadas."
  },
  {
    "id": "terreno-solares-zapiola-lote22-450",
    "recordType": "Terreno individual · barrio cerrado",
    "name": "Solares de Zapiola · lote 22 · 450 m²",
    "locality": "Paso del Rey · Solares de Zapiola · Moreno",
    "address": "Solares de Zapiola, lote 22; referencia de portal: Solares de Zapiola 22 / Solares de Zapiola 100",
    "geocodeDisabled": true,
    "source": "https://www.zonaprop.com.ar/propiedades/clasificado/vecltrin-lote-en-venta:-barrio-cerrado-solaes-de-zapiola-52791685.html",
    "sourceAlternates": [
      {
        "url": "https://www.argenprop.com/terreno-en-venta-en-solares-de-zapiola--14978186",
        "label": "Ficha paralela de Argenprop para lote 22; publica un precio diferente"
      }
    ],
    "agency": "Bernstein Propiedades",
    "contact": "Formulario de Zonaprop / Argenprop; teléfono no visible en las fichas consultadas.",
    "price": "USD 34.000 en Zonaprop; USD 40.000 en Argenprop para el mismo lote 22. Precio contradictorio, requiere revalidación.",
    "currency": "USD",
    "landSurfaceM2": 450,
    "coveredSurfaceM2": null,
    "surfaceNote": "450 m²; lote 22 de un condominio que el anunciante describe con 28 parcelas. No se informa superficie cubierta.",
    "publicationDate": "Fecha original no informada; ambas fichas directas consultadas el 27/11/2026.",
    "observations": "Las dos fichas identifican lote 22 y 450 m², pero publican precios diferentes (USD 34.000 y USD 40.000). No duplicar como dos parcelas. El aviso declara escritura inmediata y servicios; solicitar informe de dominio, reglamento, expensas y confirmación escrita del precio vigente.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "Pendiente de revalidación",
    "geolocationStatus": "Pendiente: lote interno sin coordenada pública individual; no colocar marcador en el centro del barrio como si fuera el lote.",
    "verificationStatus": "Fichas directas de Zonaprop y Argenprop accesibles el 27/11/2026; lote 22 y superficie coinciden, precio no coincide. Disponibilidad y precio final pendientes."
  },
  {
    "id": "casa-piovano-3322-234",
    "recordType": "Casa individual · chalet de 5 ambientes",
    "name": "Av. Francisco Piovano 3322 · chalet de 5 ambientes",
    "locality": "Moreno Centro",
    "address": "Av. Francisco Piovano 3322, Moreno",
    "geocodeQuery": "Avenida Francisco Piovano 3322, Moreno, Buenos Aires",
    "source": "https://www.bozzolainmobiliaria.com.ar/propiedad/160666_casa-tipo-chalet-en-venta-en-moreno-apto-credito/",
    "agency": "Bozzola Inmobiliaria",
    "contact": "Juan Bozzola Inmobiliaria · +54 11 2393-6157 · bozzolainmobiliaria@gmail.com.",
    "phone": "+541123936157",
    "price": "USD 140.000",
    "currency": "USD",
    "landSurfaceM2": null,
    "coveredSurfaceM2": 134,
    "surfaceNote": "El aviso describe lote de 10 × 24 m (aprox. 240 m²), superficie total narrativa de 225 m², 120 m² cubiertos y 36 m² semicubiertos; ficha técnica: 234 m² totales, 134 m² cubiertos y 100 m² descubiertos. Superficies contradictorias; no se asigna superficie de terreno definitiva.",
    "publicationDate": "Actualizado el 11/09/2026 a las 16:58 según ficha de Bozzola.",
    "observations": "Chalet de 5 ambientes, tres dormitorios en la descripción y cuatro en la ficha técnica, cochera, jardines de invierno y jardín libre. La descripción y los datos técnicos no coinciden en superficies ni dormitorios. Apto crédito según anunciante; verificar planos, título, estado parcelario y aptitud bancaria.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: dirección exacta publicada, pero no se obtuvo coincidencia Georef inequívoca en esta revisión.",
    "verificationStatus": "Ficha directa de Bozzola Inmobiliaria accesible; precio y datos publicados. La fecha de actualización indicada es 11/09/2026; disponibilidad y superficies definitivas no confirmadas."
  },
  {
    "id": "casa-damicis-1485-270",
    "recordType": "Casa individual · propiedad con unidades independientes",
    "name": "Damicis 1485 · casa y dos departamentos independientes",
    "locality": "Moreno",
    "address": "Damicis 1485, Moreno",
    "geocodeQuery": "Damicis 1485, Moreno, Buenos Aires",
    "source": "https://www.jorgelinamartinezpropiedades.com.ar/propiedad/195679_casa-en-venta-c-cochera-en-moreno/",
    "sourceAlternates": [
      {
        "url": "https://www.zonaprop.com.ar/propiedades/clasificado/veclcain-casa-en-venta-con-dos-departamentos-independientes%21-58118875.html",
        "label": "Ficha sindicada de Zonaprop para la misma propiedad"
      }
    ],
    "agency": "Jorgelina Martinez Propiedades",
    "contact": "Jorgelina Martinez · +54 11 6732-4994 · Jorgelinamartinezprop@gmail.com.",
    "phone": "+541167324994",
    "price": "USD 95.000 en el campo de precio; la descripción del mismo aviso todavía menciona USD 100.000.",
    "currency": "USD",
    "landSurfaceM2": 270,
    "coveredSurfaceM2": 160,
    "surfaceNote": "270 m² totales y 160 m² cubiertos según ficha técnica de la inmobiliaria.",
    "publicationDate": "Actualizado el 04/09/2026 a las 13:43 según ficha de Jorgelina Martinez Propiedades.",
    "observations": "La propiedad incluye dos departamentos independientes y vivienda principal. El precio del campo estructurado (USD 95.000) difiere del precio mencionado en el texto (USD 100.000). La ficha declara estado “En venta”; confirmar precio, distribución aprobada, servicios independientes, planos y disponibilidad.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: dirección exacta publicada; no se obtuvo coincidencia Georef inequívoca en esta revisión.",
    "verificationStatus": "Ficha directa de la inmobiliaria accesible el 27/11/2026 y marcada “En venta”; precio, superficies y actualización publicados. Disponibilidad y precio vigente no confirmados."
  },
  {
    "id": "casa-ecuador-2300-241-no-vigente",
    "recordType": "Casa multifamiliar · antecedente histórico no vigente",
    "name": "Ecuador 2300 · dos viviendas independientes · Villa Anita",
    "locality": "Villa Anita · Moreno",
    "address": "Ecuador al 2300, entre Tupungato y Manuel de Sarratea, Moreno",
    "geocodeDisabled": true,
    "source": "https://www.zonaprop.com.ar/propiedades/clasificado/veclcain-casa-multifamiliar-en-venta-en-moreno-con-patio-60410754.html",
    "agency": "RE/MAX · contacto publicado: Cintia Galeano; corredor responsable Silvana Inés Palini, CMCPM 2955 / CPI 8862.",
    "contact": "La ficha original ofrecía consultas por Zonaprop; teléfono no visible.",
    "price": "Último precio indexado: USD 53.000.",
    "currency": "USD",
    "landSurfaceM2": 241,
    "coveredSurfaceM2": 109,
    "surfaceNote": "241 m² totales según publicación; 109 m² cubiertos según ficha del portal.",
    "publicationDate": "Fecha original no informada; último precio indexado en septiembre de 2026.",
    "observations": "El aviso describía dos viviendas independientes en un lote de 12,07 × 20 m. El enlace directo de Zonaprop devuelve 410 Gone y la ficha sindicada de Proppies lo muestra como inactivo. Se marca no vigente sin afirmar que haya sido vendido; conservar como antecedente histórico.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No vigente",
    "geolocationStatus": "Pendiente: ubicación textual conservada; no se geocodifica un aviso retirado.",
    "verificationStatus": "Fuente primaria inaccesible (HTTP 410 Gone) el 27/11/2026; agregador Proppies muestra el aviso inactivo. Último precio indexado USD 53.000; no se confirmó causa de retiro."
  },
  {
    "id": "terreno-espana-700-928-casa-galpon",
    "recordType": "Terreno con casa a refaccionar, galpón y pileta",
    "name": "España 700/747 · lote de 928 m² con casa, galpón y pileta",
    "locality": "Moreno",
    "address": "España 700 en cabecera; descripción indica España 747, Moreno",
    "geocodeDisabled": true,
    "source": "https://www.zonaprop.com.ar/propiedades/clasificado/vecltrin-venta-lote-928-m-sup2--con-casa-a-refaccionar-en-60811389.html",
    "sourceAlternates": [{
        "url": "https://proppies.app/propiedad/buenos-aires/moreno/terreno-en-venta-en-moreno-76059131",
        "label": "Ficha de Proppies; la marca como publicada hoy"
      },
      {url:"https://platastar.com/propiedad/terreno-de-928-m2-en-venta-en-moreno-54042798",label:"PlataStar/REMAX Data Work: publicado 27/10/2026, USD 150.000, 928 m²; descripción indica España 747. Misma superficie y precio que la ficha principal, con diferencia de altura 700/747."}],
    "agency": "RE/MAX Data Work / RAU S.R.L. como plataforma",
    "contact": "Contacto publicado: Rosa Susana Gonzalez. Corredor responsable: Leonardo Misuraca, CMCPSM 2568 / CUCICBA 7970. Consultas mediante Zonaprop; teléfono no visible.",
    "price": "USD 150.000",
    "currency": "USD",
    "landSurfaceM2": 928,
    "coveredSurfaceM2": null,
    "surfaceNote": "928 m² en la cabecera; descripción indica aproximadamente 930 m² y medidas 20 × 46 m. Casa a refaccionar y galpón existentes, pero no se informa superficie cubierta.",
    "publicationDate": "Proppies la indexa como publicada hoy; ficha directa de Zonaprop consultada el 27/11/2026, sin fecha original visible.",
    "observations": "Activo mixto: terreno con casa a refaccionar, galpón, pileta y portón para vehículos. La dirección difiere entre cabecera (España 700) y descripción (España 747); no geolocalizar hasta resolver. El aviso declara apto crédito, sujeto a documentación bancaria. El potencial de uso residencial/comercial depende de normativa municipal y habilitaciones. La ficha alternativa de PlataStar confirma USD 150.000 y 928 m², publicada 27/10/2026; también identifica España 747 en la descripción. Se conserva la discrepancia de numeración 700/747 y la geolocalización permanece deshabilitada.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: discrepancia de altura 700/747; conservar ubicación textual y no asignar coordenadas.",
    "verificationStatus": "Ficha directa de Zonaprop accesible el 27/11/2026 y ficha sindicada indexada como publicada hoy. Precio y superficie publicados; disponibilidad, superficies edificadas y numeración exacta no confirmadas."
  },
  {
    "id": "fraccion-monsegur-3100-6150-la-reja",
    "recordType": "Fracción de terreno · residencial extraurbano de baja densidad",
    "name": "Avenida Monsegur 3100 · fracción de 6.150 m² · La Reja",
    "locality": "La Reja · Moreno",
    "address": "Avenida Monsegur 3100, La Reja, Moreno",
    "geocodeQuery": "Avenida Monsegur 3100, La Reja, Moreno, Buenos Aires",
    "source": "https://www.zonaprop.com.ar/propiedades/clasificado/vecltrin-terreno-en-moreno-60805231.html",
    "sourceAlternates": [
      {
        "url": "https://proppies.app/propiedad/buenos-aires/moreno/terreno-en-venta-en-moreno-76055840",
        "label": "Ficha de Proppies; la marca como publicada hoy"
      }
    ],
    "agency": "Luis Esposito Propiedades",
    "contact": "Martillero responsable: Luis Esposito, CMCPDJMGR 298. Consultas mediante Zonaprop; teléfono no visible en la ficha.",
    "price": "USD 60.000",
    "currency": "USD",
    "landSurfaceM2": 6150,
    "coveredSurfaceM2": null,
    "surfaceNote": "6.150 m²; frente 50 m y fondo 123 m. No se informa superficie cubierta.",
    "publicationDate": "Proppies la indexa como publicada hoy; ficha directa de Zonaprop consultada el 27/11/2026, sin fecha original visible.",
    "observations": "El aviso declara zonificación Residencial 5 (R5), FOS 0,4, FOT 0,5, densidad neta 80 hab/ha y parcela mínima de 600 m² con 20 m de frente; también indica electricidad, agua de pozo y gas natural pasando por la puerta. La aptitud de loteo y todos los indicadores son afirmaciones del anunciante, no aprobación municipal. El precio pedido equivale a aproximadamente USD 9,76/m², valor inusualmente bajo que exige verificar título, restricciones, accesos, agua/cloacas, condiciones hidráulicas y certificado urbanístico antes de considerarlo oportunidad.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: dirección publicada a nivel de altura; colocar marcador solo si Georef devuelve coincidencia inequívoca.",
    "verificationStatus": "Ficha directa de Zonaprop accesible el 27/11/2026 y ficha sindicada indexada como publicada hoy. Precio, superficie y parámetros declarados visibles; disponibilidad y aptitud de subdivisión no confirmadas."
  },
  {
    "id": "activo-mixto-bartolome-mitre-1400-4000",
    "recordType": "Activo comercial mixto · terreno con local y rentas anunciadas",
    "name": "Av. Bartolomé Mitre 1400 · 4.000 m² · triple acceso",
    "locality": "Moreno",
    "address": "Av. Bartolomé Mitre al 1400, Moreno",
    "geocodeQuery": "Avenida Bartolome Mitre 1400, Moreno, Buenos Aires",
    "source": "https://www.zonaprop.com.ar/propiedades/clasificado/vecltrin-oportunidad-para-desarrolladores-4.000-m-sup2--60791107.html",
    "sourceAlternates": [
      {
        "url": "https://proppies.app/propiedad/buenos-aires/moreno/terreno-en-venta-en-moreno-76056135",
        "label": "Ficha de Proppies; la marca como publicada hoy"
      }
    ],
    "agency": "Grupo Morada Real Estate · plataforma de comercialización",
    "contact": "Consultas mediante Zonaprop. Profesional matriculado indicado: CMCPSI 6908, folio 175; nombre y teléfono no visibles en la ficha.",
    "price": "USD 420.000",
    "currency": "USD",
    "landSurfaceM2": 4000,
    "coveredSurfaceM2": null,
    "surfaceNote": "Aproximadamente 4.000 m². Incluye un local comercial con salida a la avenida; superficie cubierta de local y demás mejoras no informada.",
    "publicationDate": "Proppies la indexa como publicada hoy; ficha directa de Zonaprop consultada el 27/11/2026, sin fecha original visible.",
    "observations": "El anunciante declara acceso por tres calles, local comercial, antena de telecomunicaciones con renta anual en dólares y una parte del predio alquilada a una empresa logística. No se publican montos, contratos, plazos ni superficies ocupadas. Tratar las rentas como afirmaciones comerciales hasta revisar contratos de antena y logística, habilitaciones, deuda, ocupación y derecho de rescisión. La capacidad constructiva debe verificarse por parcela.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: altura aproximada publicada; se requiere coincidencia Georef inequívoca para colocar marcador.",
    "verificationStatus": "Ficha directa de Zonaprop accesible el 27/11/2026 y ficha sindicada indexada como publicada hoy. Precio, superficie y rentas declaradas publicados; contratos, disponibilidad y factibilidad urbanística no confirmados."
  },
  {
    "id": "inmueble-comercial-libertador-500-368",
    "recordType": "Inmueble comercial mixto · lote con galpón y vivienda",
    "name": "Avenida del Libertador al 500 · galpón y vivienda · 368 m²",
    "locality": "Moreno Centro",
    "address": "Avenida del Libertador al 500, Moreno Centro",
    "geocodeDisabled": true,
    "source": "https://www.zonaprop.com.ar/propiedades/clasificado/vecltrin-venta-inmueble-comercial-en-centro-de-moreno-lote-con-60791844.html",
    "sourceAlternates": [
      {
        "url": "https://proppies.app/propiedad/buenos-aires/moreno/terreno-5-amb-en-venta-en-moreno-76056409",
        "label": "Ficha de Proppies; la marca como publicada hoy"
      }
    ],
    "agency": "Agustín Kirkby Propiedades",
    "contact": "Agustín Kirkby, CSM 2917. Oficina publicada: Av. León Gallardo 389, Muñiz. Consultas mediante Zonaprop; teléfono no visible.",
    "price": "USD 450.000",
    "currency": "USD",
    "landSurfaceM2": 368,
    "coveredSurfaceM2": 180,
    "surfaceNote": "Lote de 10 × 36,80 m (368 m²); 180 m² cubiertos según ficha. La descripción especifica galpón de 10 × 12 m en planta baja y vivienda en planta alta.",
    "publicationDate": "Proppies la indexa como publicada hoy; ficha directa de Zonaprop consultada el 27/11/2026, sin fecha original visible.",
    "observations": "Inmueble comercial con galpón, vivienda de cuatro dormitorios, un baño y toilette. El aviso declara Centro Urbano 2, FOS 0,6, FOT 2,4, plano de obra aprobado, títulos perfectos y posible financiación directa. No tomar esos datos como verificación independiente: solicitar plano aprobado, final de obra, dominio, nomenclatura catastral y certificado urbanístico actualizado. El frente de 10 × 25 m se anuncia libre para desarrollo/estacionamiento.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: dirección aproximada “al 500” sin altura exacta; conservar ubicación textual.",
    "verificationStatus": "Ficha directa de Zonaprop accesible el 27/11/2026 y ficha sindicada indexada como publicada hoy. Precio, superficies y parámetros declarados visibles; documentación, disponibilidad y aprobación de obra no verificadas."
  }
];
publishedProperties.push(...nov27_0855NewEntries);



const nov27_0923NewEntries = [
  {
    "id": "terreno-4-vientos-pitagoras-336",
    "recordType": "Terreno individual",
    "name": "Barrio 4 Vientos · lote sobre Pitágoras · 336 m²",
    "locality": "Moreno",
    "address": "Barrio 4 Vientos, Pitágoras (altura y lote interno no publicados), Moreno",
    "geocodeDisabled": true,
    "source": "https://www.zonaprop.com.ar/propiedades/clasificado/vecltrin-lote-en-venta-en-barrio-4-vientos-moreno-59926174.html",
    "agency": "Mónica Parodi Propiedades",
    "contact": "Mónica Parodi Propiedades, matrícula 350 M-GR. Teléfono no visible en la ficha consultada.",
    "price": "USD 25.000",
    "currency": "USD",
    "landSurfaceM2": 336,
    "coveredSurfaceM2": null,
    "surfaceNote": "336 m² totales; la ficha no publica medidas de frente y fondo.",
    "observations": "El anuncio describe el lote cercado y con perforación de agua, a ocho cuadras de Ruta 23. La dirección figura como “Pitágoras MLA”, sin altura ni lote interno; no asignar coordenadas hasta individualizar la parcela.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "verificationStatus": "Ficha directa de Zonaprop consultada en la revisión del 27/11/2026; precio, superficie y anunciante publicados. Disponibilidad comercial no confirmada.",
    "geolocationStatus": "Pendiente: la dirección publicada no identifica altura ni lote interno."
  },
  {
    "id": "terreno-molina-campos-400-1434",
    "recordType": "Terreno individual / fracción urbana",
    "name": "Florencio Molina Campos 400 · terreno de 1.434 m²",
    "locality": "Moreno Centro",
    "address": "Florencio Molina Campos 400, Moreno",
    "geocodeQuery": "Florencio Molina Campos 400, Moreno, Buenos Aires",
    "geocodeMatch": "FLORENCIO MOLINA CAMPOS 400",
    "source": "https://www.zonaprop.com.ar/propiedades/clasificado/vecltrin-terreno-lote-en-venta-o-permuta-ubicado-en-moreno-56215191.html",
    "agency": "Dambolena",
    "contact": "Martín Dambolena, CMCPDJMGR 205 / CUCICBA 7176. Consultas mediante Zonaprop; teléfono no visible en la ficha.",
    "price": "USD 650.000",
    "currency": "USD",
    "landSurfaceM2": 1434,
    "coveredSurfaceM2": null,
    "surfaceNote": "1.434 m² de terreno; frente publicado de 30 m y fondo de 47,80 m.",
    "observations": "La publicación informa zonificación Residencial 1b, FOS 0,60, FOT 1,20 y altura máxima de 12 m, y acepta permuta y financiación. Son datos del anunciante: solicitar certificado urbanístico y nomenclatura catastral antes de estimar capacidad edificable.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "verificationStatus": "Ficha directa de Zonaprop accesible el 27/11/2026; precio USD 650.000, 1.434 m², dimensiones, corredor y parámetros declarados publicados. La URL asociada en Dambolena devuelve 404; disponibilidad no confirmada.",
    "geolocationStatus": "Pendiente: se consultará Georef para la dirección pública; el punto solo se utilizará si la nomenclatura coincide inequívocamente.",
    "sourceAlternates": [
      {
        "url": "https://dambolena.com.ar/propiedad/terreno-venta-en-molina-campos-400--4627199",
        "label": "Dambolena · ficha institucional asociada; devolvió 404 en esta revisión"
      }
    ]
  },
  {
    "id": "casa-luzuriaga-2698-900",
    "recordType": "Casa individual con departamento adicional",
    "name": "Luzuriaga 2698 · casa a refaccionar sobre 900 m²",
    "locality": "Moreno",
    "address": "Luzuriaga 2698, Moreno",
    "geocodeQuery": "Luzuriaga 2698, Moreno, Buenos Aires",
    "geocodeMatch": "LUZURIAGA 2698",
    "source": "https://www.argenprop.com/casa-en-venta-en-moreno-4-ambientes--19854036",
    "agency": "Melogno Propiedades",
    "contact": "Melogno Propiedades; teléfono parcialmente visible en Argenprop (+54 11 40…). Confirmar número completo por el canal de la inmobiliaria.",
    "price": "USD 110.000",
    "currency": "USD",
    "landSurfaceM2": 900,
    "coveredSurfaceM2": 113,
    "surfaceNote": "900 m² de terreno y 113 m² cubiertos según ficha técnica.",
    "observations": "Dos dormitorios, pileta de 4 × 2 m y departamento adicional de dos ambientes. Inconsistencia importante: la cabecera de Argenprop muestra “A Estrenar”, pero la descripción y el estado técnico indican “A Refaccionar”. Confirmar planos, estado edilicio y si el departamento está regularizado.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "verificationStatus": "Ficha directa de Argenprop accesible el 27/11/2026; precio, superficies, dirección y anunciante publicados. La condición edilicia presenta contradicción interna; disponibilidad no confirmada.",
    "geolocationStatus": "Pendiente: Georef deberá devolver coincidencia inequívoca para Luzuriaga 2698."
  },
  {
    "id": "casa-teniente-camilli-520-279",
    "recordType": "Casa individual",
    "name": "Teniente Camilli al 520 · casa de 4 ambientes",
    "locality": "Moreno",
    "address": "Teniente Camilli al 520 (la descripción indica 500), Moreno",
    "geocodeDisabled": true,
    "source": "https://www.argenprop.com/casa-en-venta-en-moreno-4-ambientes--19950622",
    "agency": "Guillermo Díaz Propiedades",
    "contact": "Corredor Guillermo Díaz, CMCPDJMGR 277. Teléfono visible parcialmente (+54 11 53…).",
    "price": "USD 98.000",
    "currency": "USD",
    "landSurfaceM2": 279,
    "coveredSurfaceM2": 140,
    "surfaceNote": "279 m² de terreno; 140 m² cubiertos; frente 11 m y fondo 22 m.",
    "observations": "Dos dormitorios, un baño, quincho cubierto y dos cocheras. El título y la ubicación de Argenprop indican al 520, mientras que la descripción informa Teniente Camilli 500. La ficha dice que acepta ofertas, permuta y financiación; solicitar condiciones por escrito.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "verificationStatus": "Ficha directa de Argenprop accesible el 27/11/2026; precio, superficies, corredor y descripción publicados. Hay discrepancia de altura; disponibilidad no confirmada.",
    "geolocationStatus": "Pendiente: no geolocalizar hasta resolver la diferencia entre 500 y 520."
  },
  {
    "id": "casa-libertad-200-229",
    "recordType": "Casa individual",
    "name": "Libertad 200 · casa de 4 ambientes · Moreno Centro",
    "locality": "Moreno Centro",
    "address": "Libertad 200, Moreno",
    "geocodeQuery": "Libertad 200, Moreno, Buenos Aires",
    "geocodeMatch": "LIBERTAD 200",
    "source": "https://www.zonaprop.com.ar/propiedades/clasificado/veclcain-casa-en-venta-en-moreno-centro-60408266.html",
    "agency": "No identificada en el texto de la ficha",
    "contact": "Contacto publicado: Marina España. Corredor responsable Diego Mastrangelo, CUCICBA 7615 / CSI 6609. Teléfono no visible.",
    "price": "USD 120.000",
    "currency": "USD",
    "landSurfaceM2": null,
    "coveredSurfaceM2": 224,
    "surfaceNote": "La cabecera informa 229 m² totales y 224 m² cubiertos; no se publica por separado la superficie del lote. Verificar esta relación con plano y título.",
    "observations": "Casa de dos plantas, tres dormitorios según descripción, un baño, quincho techado con parrilla, patio y lavadero. El anunciante menciona financiación. La superficie cubierta resulta muy próxima a la total publicada; no asumir que 229 m² corresponden al terreno.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "verificationStatus": "Ficha directa de Zonaprop accesible el 27/11/2026; precio, dirección, superficies publicadas y responsable profesional identificados. Disponibilidad no confirmada.",
    "geolocationStatus": "Pendiente: se consultará Georef para Libertad 200; aceptar solo coincidencia inequívoca."
  },
  {
    "id": "casa-lucia-rueda-42-660",
    "recordType": "Casa quinta individual",
    "name": "Lucía Rueda 42 · casa quinta en Paso del Rey",
    "locality": "Paso del Rey",
    "address": "Lucía Rueda 42, Paso del Rey, Moreno",
    "geocodeQuery": "Lucía Rueda 42, Paso del Rey, Moreno, Buenos Aires",
    "geocodeMatch": "LUCIA RUEDA 42",
    "source": "https://www.zonaprop.com.ar/propiedades/clasificado/veclqvin-venta-quinta-3-amb.-s-lote-12-x55-m-sup2--en-p.-del-57683173.html",
    "agency": "No identificada en la ficha individual consultada",
    "contact": "Formulario de Zonaprop; no se expone nombre, inmobiliaria ni teléfono del anunciante en la ficha abierta.",
    "price": "USD 100.000",
    "currency": "USD",
    "landSurfaceM2": 660,
    "coveredSurfaceM2": 108,
    "surfaceNote": "Lote de 12 × 55 m (660 m²); 108 m² cubiertos.",
    "observations": "Casa quinta de tres ambientes, dos dormitorios, un baño, cochera, pileta, parrilla y parque. La ficha indica dos cuadras de la estación Paso del Rey y antigüedad de 20 años. Confirmar estado de la pileta, servicios y disponibilidad.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "verificationStatus": "Ficha individual de Zonaprop accesible el 27/11/2026; precio, superficie, dirección y características publicados. Anunciante y disponibilidad no confirmados.",
    "geolocationStatus": "Pendiente: Georef debe confirmar la coincidencia exacta de Lucía Rueda 42."
  },
  {
    "id": "casa-el-resuello-720",
    "recordType": "Casa individual en barrio cerrado",
    "name": "Casa en Barrio Cerrado El Resuello · lote de 720 m²",
    "locality": "Moreno",
    "address": "Barrio Cerrado El Resuello, Moreno; calle y lote interno no publicados",
    "geocodeDisabled": true,
    "source": "https://www.zonaprop.com.ar/propiedades/clasificado/veclcain-casa-en-el-resuello-moreno-60448331.html",
    "agency": "Valeria Guidolin Propiedades",
    "contact": "Valeria Guidolin Propiedades; consultas mediante Zonaprop. Teléfono no visible en la ficha consultada.",
    "price": "USD 280.000",
    "currency": "USD",
    "landSurfaceM2": 720.26,
    "coveredSurfaceM2": 149.97,
    "surfaceNote": "720,26 m² de terreno; 149,97 m² cubiertos y 65,99 m² semicubiertos; total construido publicado 215,96 m².",
    "observations": "Casa de una planta, tres dormitorios, tres baños, pileta, jardín y quincho cerrado. La cabecera redondea la cubierta a 149 m² y la descripción precisa 149,97 m². El anuncio indica apto crédito, financiación y permuta. Calle y lote interno no publicados.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "verificationStatus": "Ficha directa de Zonaprop accesible el 27/11/2026; precio, superficies, barrio y anunciante publicados. Disponibilidad no confirmada.",
    "geolocationStatus": "Pendiente: la ficha solo identifica el barrio cerrado; no asignar coordenadas de una parcela interna."
  },
  {
    "id": "casa-almafuerte-3900-banco-provincia-924",
    "recordType": "Casa individual en country",
    "name": "Almafuerte al 3900 · casa en Country Club Banco Provincia",
    "locality": "Francisco Álvarez",
    "address": "Almafuerte al 3900, Country Club Banco Provincia, Francisco Álvarez, Moreno",
    "geocodeDisabled": true,
    "source": "https://www.zonaprop.com.ar/propiedades/clasificado/veclcain-venta-casa-4-ambientes-lote-de-1.000-m-sup2--pileta-60025051.html",
    "agency": "Inmobiliaria no identificada en la ficha",
    "contact": "Corredores responsables publicados: Raúl Álvarez, CUCICBA 8354, y Ezequiel Marcelo, CSM 2947. Consultas mediante Zonaprop; teléfono no visible.",
    "price": "USD 190.000",
    "currency": "USD",
    "landSurfaceM2": 924,
    "coveredSurfaceM2": 123.33,
    "surfaceNote": "La ficha técnica informa 924 m² totales y 123,33 m² cubiertos; la descripción informa 765,41 m² descubiertos. El título menciona lote de 1.000 m², discrepancia que debe aclararse.",
    "observations": "Casa de cuatro ambientes, tres dormitorios, tres baños, pileta de 7 × 2 m, quincho y cocheras. Expensas publicadas: ARS 400.000. El título anuncia 1.000 m² de lote, mientras que la ficha y descripción informan 924 m² totales; confirmar plano y expensas vigentes.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "verificationStatus": "Ficha directa de Zonaprop accesible el 27/11/2026; precio, superficies, expensas y corredores responsables publicados. Hay discrepancia de superficie; disponibilidad no confirmada.",
    "geolocationStatus": "Pendiente: dirección interna de country sin parcela identificada; no colocar marcador sobre una calle pública por aproximación."
  },
  {
    "id": "casa-mariano-luciano-vega-613-367",
    "recordType": "Casa con depósito y uso comercial",
    "name": "Mariano y Luciano de la Vega 613 · casa con depósito",
    "locality": "Moreno Centro",
    "address": "Mariano y Luciano de la Vega 613 (ficha: al 600), Moreno",
    "geocodeDisabled": true,
    "source": "https://www.melognopropiedades.com.ar/p/7318373-Casa-en-Venta-en-Moreno-Mariano-y-Luciano-de-la-Vega--al-600",
    "agency": "Melogno Propiedades",
    "contact": "WhatsApp +54 9 11 4079-9980 · oficina@melognopropiedades.com.ar · Av. Bartolomé Mitre 2505, Moreno Centro.",
    "price": "USD 100.000",
    "currency": "USD",
    "landSurfaceM2": 367,
    "coveredSurfaceM2": 73,
    "surfaceNote": "367 m² de terreno; 73 m² cubiertos; frente 10 m y fondo 36,70 m.",
    "observations": "Casa de dos dormitorios y un baño, con depósito que el aviso describe equipado con cámaras industriales y actualmente utilizado como casa de comidas. La dirección aparece como 613 en la descripción y “al 600” en el encabezado. Puede interesar como activo mixto, pero verificar habilitación del depósito, instalaciones y destino permitido.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "verificationStatus": "Ficha directa de Melogno Propiedades accesible el 27/11/2026; precio, superficie, contacto y descripción publicados. La inmobiliaria mantiene la ficha accesible; disponibilidad comercial no confirmada.",
    "geolocationStatus": "Pendiente: la ficha difiere entre altura 613 y referencia al 600; no asignar coordenadas hasta confirmar dirección parcelaria."
  },
  {
    "id": "casa-piovano-3700-superficie-conflictiva",
    "recordType": "Casa quinta / activo con potencial de desarrollo",
    "name": "Francisco Piovano al 3700 · casa quinta sobre tres lotes anunciados",
    "locality": "Moreno",
    "address": "Avenida Francisco Piovano al 3700, Moreno; descripción: Ruta 5 km 38,2",
    "geocodeDisabled": true,
    "source": "https://www.zonaprop.com.ar/propiedades/clasificado/veclcain-casa-en-moreno-60761167.html",
    "sourceAlternates": [
      {
        "url": "https://www.argenprop.com/casa-en-venta-en-moreno-7-ambientes--20931658",
        "label": "Argenprop · publicación cruzada, USD 220.000 y 2.960 m² de terreno"
      },
      {
        "url": "https://www.zonaprop.com.ar/propiedades/clasificado/veclcain-casaquinta-en-venta-en-la-mejor-zona-de-moreno-centro-60571481.html",
        "label": "Basso Bienes Raíces · otra ficha del mismo activo, USD 240.000 y cabecera con superficie contradictoria"
      }
    ],
    "agency": "Basso Bienes Raíces",
    "contact": "Consultas mediante Zonaprop; teléfono y contacto personal no visibles en la ficha.",
    "price": "USD 220.000 en Zonaprop y Argenprop; otra ficha de Basso Bienes Raíces publica USD 240.000",
    "currency": "USD",
    "landSurfaceM2": 2960,
    "coveredSurfaceM2": 250,
    "surfaceNote": "2.960 m² de terreno y 250 m² cubiertos en las fichas de Zonaprop 60761167 y Argenprop 20931658. Otra ficha de Basso/Zonaprop para el mismo inmueble indica USD 240.000 y 270 m² totales en cabecera, aunque su descripción habla de casi 3.000 m². Confirmar superficie y precio con título y mensura.",
    "observations": "Casa quinta de cinco/siete ambientes, cuatro/cinco dormitorios según ficha, tres baños, pileta, quincho y departamento independiente. Dos publicaciones cruzadas (Zonaprop 60761167 y Argenprop 20931658) coinciden en USD 220.000, 2.960 m² de terreno y 250 m² cubiertos. Una tercera ficha de Basso Bienes Raíces (Zonaprop 60571481) pide USD 240.000 y presenta una cabecera contradictoria de 270 m² totales, aunque la descripción refiere a casi 3.000 m². Se conserva como un solo activo; no asumir subdivisión ni capacidad constructiva.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "verificationStatus": "Ficha de Zonaprop 60761167 accesible el 27/11/2026 y ficha cruzada de Argenprop indexada 4 días antes: ambas publican USD 220.000, 2.960 m² de terreno y 250 m² cubiertos. Otra ficha de Basso/Zonaprop publica USD 240.000 y datos de superficie contradictorios. Disponibilidad no confirmada.",
    "geolocationStatus": "Pendiente: altura aproximada y referencia Ruta 5 km 38,2; no se asigna coordenada parcelaria."
  },
  {
    "id": "casa-facundo-quiroga-1100-300-pendiente",
    "recordType": "Casa individual · publicación antigua pendiente de revalidación",
    "name": "Facundo Quiroga 1100 · casa de 4 ambientes",
    "locality": "Moreno",
    "address": "Facundo Quiroga 1100, Moreno",
    "geocodeQuery": "Facundo Quiroga 1100, Moreno, Buenos Aires",
    "geocodeMatch": "FACUNDO QUIROGA 1100",
    "source": "https://www.argenprop.com/casa-en-venta-en-moreno-4-ambientes--16097735",
    "agency": "Alicia Monsalvo Negocios Inmobiliarios",
    "contact": "Alicia Monsalvo Negocios Inmobiliarios; teléfono mostrado parcialmente como 1156192, sin número completo verificable.",
    "price": "USD 45.000 en cabecera; descripción: anticipo USD 45.000 + 50 cuotas de USD 700; contado USD 75.000",
    "currency": "USD",
    "landSurfaceM2": 300,
    "coveredSurfaceM2": 80,
    "surfaceNote": "300 m² de terreno (10 × 30 m); 80 m² cubiertos.",
    "observations": "Dos dormitorios, un baño, patio y entrada de vehículo. La ficha directa está accesible en esta revisión. La cabecera indica USD 45.000, mientras que la descripción diferencia anticipo de USD 45.000 más 50 cuotas de USD 700 y precio contado de USD 75.000. Pedir liquidación escrita y confirmar el precio aplicable antes de considerar la operación.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "verificationStatus": "Ficha directa de Argenprop accesible el 27/11/2026; precio de cabecera, superficie y dirección publicados. El plan de pago y el precio contado contradicen el valor de cabecera; disponibilidad no confirmada.",
    "geolocationStatus": "Pendiente: Georef debe confirmar la coincidencia exacta de Facundo Quiroga 1100."
  },
  {
    "id": "casa-pueyrredon-2544-560-pendiente",
    "recordType": "Casa individual · pendiente de revalidación",
    "name": "Pueyrredon al 2544 · chalet de 3 dormitorios",
    "locality": "Moreno",
    "address": "Pueyrredon al 2544, Moreno",
    "geocodeQuery": "Pueyrredon 2544, Moreno, Buenos Aires",
    "geocodeMatch": "PUEYRREDON 2544",
    "source": "https://www.argenprop.com/casa-en-venta-en-moreno--17583184",
    "agency": "SFORZA PROPIEDADES",
    "contact": "SFORZA PROPIEDADES; contacto mediante Argenprop. Teléfono parcialmente visible (+54 0 11 4…), número completo no publicado en la ficha.",
    "price": "USD 180.000 (último precio indexado)",
    "currency": "USD",
    "landSurfaceM2": 560,
    "coveredSurfaceM2": 250,
    "surfaceNote": "560 m² de terreno; 250 m² cubiertos, según resultado indexado de Argenprop.",
    "observations": "Chalet de dos plantas, tres dormitorios, cuatro baños, dos cocheras, parque, pileta, quincho y galpón. La ficha directa de Argenprop está accesible el 27/11/2026. Una ficha anterior de Inmuebles Clarín mencionaba Juan Martín de Pueyrredon 2534 y 500 m², mientras que Argenprop publica al 2544 y 560 m²; Proppies coincide con 560 m². Confirmar nomenclatura y mensura para resolver la diferencia de altura y superficie.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "verificationStatus": "Ficha directa de Argenprop accesible el 27/11/2026; USD 180.000, 560 m² de terreno, 250 m² cubiertos y SFORZA PROPIEDADES identificados. Fuentes anteriores presentan diferencias de altura y superficie; disponibilidad no confirmada.",
    "geolocationStatus": "Pendiente: dirección exacta publicada, pero no se confirmó la ficha directa ni una coincidencia Georef.",
    "sourceAlternates": [
      {
        "url": "https://proppies.app/propiedad/caba/casa-en-venta-en-moreno-45629051",
        "label": "Proppies · ficha sindicada con USD 180.000, 560 m² totales y 250 m² cubiertos"
      },
      {
        "url": "https://www.inmuebles.clarin.com/casa-en-venta-en-moreno-5-ambientes--15366093",
        "label": "Inmuebles Clarín · ficha anterior con dirección 2534 y 500 m²; enlace 410 Gone"
      }
    ]
  },
  {
    "id": "terreno-valparaiso-100-lote10-300",
    "recordType": "Terreno individual · lote 10 · Barrio Güemes",
    "name": "Valparaíso 100 · lote 10 · 300 m² · Barrio Güemes",
    "locality": "Moreno",
    "address": "Valparaíso 100, Barrio Güemes, lote 10, Moreno",
    "geocodeQuery": "Valparaíso 100, Moreno, Buenos Aires",
    "geocodeMatch": "VALPARAISO 100",
    "source": "https://inmoclick.com/72158-re-max-blue/inmuebles/3705/ficha/terreno-en-venta-en-valparaiso-100",
    "agency": "RE/MAX Blue",
    "contact": "RE/MAX Blue; consultas mediante Inmoclick. La ficha no expone un teléfono completo.",
    "price": "USD 10.000",
    "currency": "USD",
    "landSurfaceM2": 300,
    "coveredSurfaceM2": null,
    "surfaceNote": "300 m² (10 × 30 m), lote 10 de la manzana, según Inmoclick.",
    "observations": "La ficha de Inmoclick identifica expresamente lote 10, 10 m de frente por 30 m de fondo y publicación reciente. Otra URL de Zonaprop para el mismo aviso devuelve 410 Gone, pero la ficha de Inmoclick seguía accesible y publicada hace 5 días al 27/11/2026. Disponibilidad comercial no confirmada; no confundir con el lote 11 de la misma dirección.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "verificationStatus": "Ficha directa de Inmoclick accesible el 27/11/2026; publicada hace 5 días, precio USD 10.000, 300 m² y lote 10 identificados. La URL anterior de Zonaprop devuelve 410 Gone; la publicación actual de Inmoclick impide marcar el lote como retirado. Disponibilidad no confirmada.",
    "geolocationStatus": "Pendiente: la dirección pública es común a lotes distintos; no asignar coordenadas de parcela sin plano o nomenclatura.",
    "geocodeDisabled": true,
    "sourceAlternates": [
      {
        "url": "https://www.zonaprop.com.ar/propiedades/clasificado/vecltrin-venta-terreno-10-x-30-buen-acceso-ruta-7-moreno-60060142.html",
        "label": "Zonaprop · enlace anterior; devolvió 410 Gone"
      },
      {
        "url": "https://www.argenprop.com/terreno-en-venta-en-moreno--20628773",
        "label": "Argenprop · publicación cruzada del lote 10, indexada en noviembre de 2026"
      }
    ],
    "publicationDate": "Publicado hace 5 días al 27/11/2026"
  },
  {
    "id": "terreno-valparaiso-100-lote11-300",
    "recordType": "Terreno individual · lote 11 · Barrio Güemes",
    "name": "Valparaíso 100 · lote 11 · 300 m² · Barrio Güemes",
    "locality": "Moreno",
    "address": "Valparaíso 100, Barrio Güemes, lote 11 de la manzana, Moreno",
    "geocodeDisabled": true,
    "source": "https://inmoclick.com/72158-re-max-blue/inmuebles/3842/ficha/terreno-en-venta-en-valparaiso-100",
    "sourceAlternates": [
      {
        "url": "https://www.argenprop.com/terreno-en-venta-en-moreno--20382149",
        "label": "Argenprop · publicación cruzada que identifica lote 11"
      }
    ],
    "agency": "RE/MAX Blue",
    "contact": "RE/MAX Blue; consultas mediante Inmoclick. La ficha no expone un teléfono completo.",
    "price": "USD 10.000",
    "currency": "USD",
    "landSurfaceM2": 300,
    "coveredSurfaceM2": null,
    "surfaceNote": "300 m² (10 × 30 m), lote 11 de la manzana, según Inmoclick.",
    "publicationDate": "Publicado hace 15 días al 27/11/2026",
    "observations": "Inmoclick identifica lote 11, 10 m de frente por 30 m de fondo, y muestra publicación de hace 15 días al 27/11/2026. Es distinto del lote 10, aunque ambas fichas usan la misma dirección Valparaíso 100. Verificar plano de subdivisión, nomenclatura y disponibilidad.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "verificationStatus": "Ficha directa de Inmoclick accesible el 27/11/2026; publicada hace 15 días, precio USD 10.000, 300 m² y lote 11 identificados. Disponibilidad comercial no confirmada.",
    "geolocationStatus": "Pendiente: la dirección pública se repite para lotes distintos; no asignar coordenadas de parcela sin plano o nomenclatura."
  }
];;;;
publishedProperties.push(...nov27_0923NewEntries);


const nov27_1032NewEntries = [
  {
    "id": "terreno-9-de-julio-46-487",
    "recordType": "Terreno con estructura existente · oportunidad de desarrollo",
    "name": "9 de Julio 46 · lote de 487 m² con estructura para cuatro departamentos",
    "locality": "Moreno Centro",
    "address": "9 de Julio 46, Moreno; el encabezado de Argenprop lo etiqueta como Colectora Norte Acceso Oeste km 100",
    "source": "https://www.argenprop.com/terreno-en-venta-en-centro-moreno--8079012",
    "sourceAlternates": [
      {
        "url": "https://www.mercadoprop.net/ar/terrenos/venta-terreno-moreno-29028",
        "label": "Ficha sindicada de MercadoProp para la misma fracción"
      }
    ],
    "agency": "Dambolena",
    "contact": "Martín Dambolena, CMCPDJMGR 205 / CUCICBA 7176; consulta mediante formulario de Argenprop; el teléfono de la ficha aparece incompleto.",
    "price": "USD 130.000",
    "currency": "USD",
    "landSurfaceM2": 487,
    "surfaceNote": "487 m² de terreno. El aviso describe la estructura existente para cuatro departamentos, pero no informa superficie cubierta de esa estructura. Publica CU1, FOS 0,60, FOT 3 sin premios o 2,4 con premios y alturas de 21 m entre medianeras / 36 m perímetro libre, todo sujeto a certificado municipal.",
    "observations": "El anuncio lo ofrece para continuar un complejo de departamentos. Existe una contradicción de ubicación: el encabezado de Argenprop dice Colectora Norte Acceso Oeste km 100, mientras la descripción especifica 9 de Julio 46. No geolocalizar hasta verificar nomenclatura catastral, altura, estado de la estructura y certificado urbanístico. Los parámetros son declarados por el anunciante, no una aprobación de proyecto.",
    "lat": null,
    "lng": null,
    "geocodeDisabled": true,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: discrepancia entre el encabezado del portal y la dirección descriptiva; no colocar marcador parcelario.",
    "verificationStatus": "Ficha directa de Argenprop accesible el 27/11/2026; USD 130.000, 487 m² y estructura para cuatro departamentos publicados. Precio, estado físico, documentación y disponibilidad no confirmados."
  },
  {
    "id": "terreno-jose-marmol-rivadavia-1418",
    "recordType": "Fracción de terreno",
    "name": "José Mármol 100 · esquina Bernardino Rivadavia · 1.418 m²",
    "locality": "Moreno Centro",
    "address": "José Mármol 100, esquina Bernardino Rivadavia, Moreno",
    "geocodeDisabled": true,
    "source": "https://www.argenprop.com/terreno-en-venta-en-centro-moreno--19475734",
    "sourceAlternates": [
      {
        "url": "https://proppies.app/propiedad/buenos-aires/moreno/terreno-en-venta-en-centro-3352921",
        "label": "Ficha sindicada de Proppies para la misma fracción"
      }
    ],
    "agency": "Dambolena",
    "contact": "Martín Dambolena, CMCPDJMGR 205 / CUCICBA 7176; WhatsApp +54 11 2311-0532 según ficha sindicada de Proppies; consulta por formulario de Argenprop.",
    "price": "USD 490.000",
    "currency": "USD",
    "landSurfaceM2": 1418,
    "publicationDate": "Proppies indicaba publicado hace 5 meses / 168 días al 27/11/2026; Argenprop indexado hace aproximadamente 2 meses.",
    "surfaceNote": "1.418 m²; 65,4 m de frente sobre José Mármol y 15,7 m sobre Bernardino Rivadavia. La ficha declara R1b, FOS 0,60, FOT 1,20 y altura máxima 12 m; confirmar en certificado urbanístico.",
    "observations": "La publicación identifica una fracción en esquina y acepta oferta de contado. Detecté otra ficha en José Mármol 100 por 584 m² y USD 190.000, con construcción a demoler; no se incorporó como oportunidad separada porque podría solaparse con esta fracción y no hay nomenclatura catastral para resolverlo. Solicitar plano, partidas y estado parcelario antes de tratar ambos avisos como activos distintos.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "Pendiente de revalidación",
    "geolocationStatus": "Pendiente: dos publicaciones con la misma dirección pública y superficies diferentes; no asignar coordenadas parcelarias hasta verificar parcelas.",
    "verificationStatus": "Ficha directa de Argenprop accesible/indexada en la revisión del 27/11/2026 y copia de Proppies con igual precio y superficie; publicación de varios meses. Disponibilidad comercial no confirmada."
  },
  {
    "id": "terreno-guatemala-2500-valentin-alsina-590",
    "recordType": "Terreno individual",
    "name": "Guatemala 2500 esquina Valentín Alsina · 590 m²",
    "locality": "Moreno",
    "address": "Guatemala 2500, esquina Valentín Alsina, Moreno",
    "geocodeQuery": "Guatemala 2500, Moreno, Buenos Aires",
    "geocodeMatch": "GUATEMALA 2500",
    "source": "https://www.mercadoprop.net/ar/terrenos/venta-terreno-moreno-29232",
    "agency": "Dambolena",
    "contact": "Martín Dambolena, CMCPDJMGR 205 / CUCICBA 7176; consulta por formulario de MercadoProp; teléfono completo no visible.",
    "price": "USD 60.000",
    "currency": "USD",
    "landSurfaceM2": 590,
    "surfaceNote": "590 m²; frente 11,11 m y fondo 53,09 m. El aviso publica zonificación R4, FOS 0,50, FOT 0,80 y altura máxima 7 m; requiere validación municipal.",
    "observations": "La ficha directa de MercadoProp identifica el código del anunciante DAM0332_LP359922 y publica ubicación, dimensiones y parámetros. Las superficies se declaran aproximadas; solicitar estado parcelario, servicios efectivos y certificado urbanístico.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: la dirección es pública, pero el punto solo se utilizará si Georef devuelve una coincidencia inequívoca; no representa el lote catastral.",
    "verificationStatus": "Ficha directa de MercadoProp accesible el 27/11/2026; precio USD 60.000, 590 m², anunciante y dimensiones publicados. Disponibilidad no confirmada."
  },
  {
    "id": "terreno-justo-daract-2751-2163",
    "recordType": "Fracción de terreno · dos parcelas",
    "name": "Justo Daract 2751 · dos parcelas por 2.163 m²",
    "locality": "Moreno Centro",
    "address": "Justo Daract 2751, Moreno; encabezado de Zonaprop indica altura 2700",
    "geocodeDisabled": true,
    "source": "https://www.zonaprop.com.ar/propiedades/clasificado/vecltrin-terreno-lote-en-venta-o-permuta-ubicado-en-moreno-47191082.html",
    "sourceAlternates": [
      {
        "url": "https://proppies.app/propiedad/buenos-aires/moreno/terreno-en-venta-en-centro-14916766",
        "label": "Ficha sindicada de Proppies para la misma fracción"
      }
    ],
    "agency": "Dambolena",
    "contact": "Martín Dambolena, CMCPDJMGR 205 / CUCICBA 7176; WhatsApp +54 11 2311-0532 según la ficha sindicada de Proppies.",
    "price": "USD 230.000",
    "currency": "USD",
    "landSurfaceM2": 2163,
    "publicationDate": "Proppies indicaba publicado hace 4 meses / 137 días al 27/11/2026; ficha directa de Zonaprop accesible el 27/11/2026.",
    "surfaceNote": "Dos parcelas: parcela 7 de 1.233 m² y parcela 8 de 930 m². El aviso publica R4b, FOS 0,60, FOT 1,00 y altura máxima 9 m, sujeto a certificado municipal.",
    "observations": "La ficha ofrece venta conjunta, permuta y posibilidad de financiación. Confirmar si ambas parcelas se venden juntas o por separado, títulos, servicios de agua y cloacas, estado parcelario y vigencia del precio. El encabezado dice 2700 y la descripción 2751; geolocalización deshabilitada hasta resolver la numeración.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "Pendiente de revalidación",
    "geolocationStatus": "Pendiente: discrepancia entre altura del encabezado (2700) y dirección descriptiva (2751); no asignar coordenadas.",
    "verificationStatus": "Ficha directa de Zonaprop accesible el 27/11/2026; precio USD 230.000, 2.163 m² y desglose de dos parcelas publicados. Aviso de varios meses; disponibilidad no confirmada."
  },
  {
    "id": "casa-quinta-samaniego-4900-4200",
    "recordType": "Casa quinta individual · dos fracciones contiguas",
    "name": "Samaniego 4900 · casa quinta sobre 4.200 m²",
    "locality": "Francisco Álvarez · Barrio El Ensueño",
    "address": "Esquina Samaniego y Pedro de Angelis, Barrio El Ensueño, Francisco Álvarez, Moreno (ficha: Samaniego 4900)",
    "geocodeQuery": "Samaniego 4900, Francisco Alvarez, Moreno, Buenos Aires",
    "geocodeMatch": "SAMANIEGO 4900",
    "source": "https://emilianoescola17.kitepropcrm.com/site/properties/592799/casa-quinta-de-4200-m2-parque-vegetacion-pileta",
    "agency": "Emiliano Escola Servicios Inmobiliarios",
    "contact": "Emiliano Escola · +54 11 5126-5160 · emilianoescola@deinmobiliarios.com · leads@eeservicios.com.",
    "price": "USD 89.000",
    "currency": "USD",
    "landSurfaceM2": 4200,
    "coveredSurfaceM2": 130,
    "surfaceNote": "Dos fracciones de 70 × 30 m (2.100 m² cada una), unidas en 4.200 m² de terreno; la ficha directa declara 130 m² cubiertos y 4.100 m² no cubiertos, pero su mismo cuadro técnico también muestra 153 m² totales, dato incompatible. Prevalecen mensura y título.",
    "observations": "Casa quinta en esquina Samaniego y Pedro de Angelis, con vivienda principal, dependencia para casero, galpón, parque arbolado y pileta tipo tanque australiano. El aviso ofrece el conjunto de dos parcelas; no asumir subdivisión o venta separada. La ficha técnica es inconsistente entre superficie total y cubierta/no cubierta. Verificar títulos, agua de pozo, instalaciones, planos y disponibilidad.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: la esquina es pública, pero no se asignó punto parcelario; Georef debe resolver Samaniego 4900 de forma inequívoca.",
    "verificationStatus": "Ficha del corredor accesible/indexada el 27/11/2026; USD 89.000, dos fracciones por 4.200 m² y 130 m² cubiertos publicados. Estado comercial y documentación no confirmados."
  },
  {
    "id": "casa-martinez-melo-300-161",
    "recordType": "Casa individual a refaccionar · potencial de reutilización",
    "name": "Martínez Melo al 300 · casa de 5 ambientes a refaccionar",
    "locality": "Moreno Centro",
    "address": "Martínez Melo al 300, entre Emilio Mitre y Leandro N. Alem, Moreno",
    "geocodeDisabled": true,
    "source": "https://proppies.app/propiedad/buenos-aires/moreno/casa-5-amb-en-venta-en-moreno-41159528",
    "agency": "Mendoza Verón Propiedades",
    "contact": "WhatsApp +54 11 3456-3827 · contacto mediante la ficha pública de Proppies.",
    "phone": "+541134563827",
    "price": "USD 70.000",
    "currency": "USD",
    "coveredSurfaceM2": 161,
    "publicationDate": "Publicado hace aproximadamente 2 meses al 27/11/2026; fecha exacta no visible.",
    "surfaceNote": "161 m² cubiertos según el portal; no se publica superficie del terreno. Cuatro dormitorios, cinco ambientes y un baño según la ficha.",
    "observations": "La descripción indica casa a refaccionar, todos los servicios y uso potencial para inversión. El aviso publica FOS 0,60, FOT 3 y zonificación Centro Urbano 1; son datos del anunciante y requieren certificado municipal. No se puede calcular precio por m² de terreno porque la superficie de lote no está publicada.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: dirección aproximada “al 300”; no asignar coordenadas sin altura exacta y coincidencia inequívoca.",
    "verificationStatus": "Ficha pública de Proppies accesible el 27/11/2026; precio USD 70.000, 161 m² cubiertos, anunciante y WhatsApp publicados. Disponibilidad no confirmada."
  },
  {
    "id": "casa-25-de-mayo-2700-350",
    "recordType": "Casa individual · tipo americana",
    "name": "25 de Mayo 2700 · casa clásica tipo americana · Paso del Rey",
    "locality": "Paso del Rey · Barrio La Quebrada",
    "address": "25 de Mayo 2700, Paso del Rey, Moreno",
    "geocodeQuery": "25 de Mayo 2700, Paso del Rey, Moreno, Buenos Aires",
    "geocodeMatch": "25 DE MAYO 2700",
    "source": "https://www.zonaprop.com.ar/propiedades/clasificado/veclcain-casa-clasica-tipo-americana-apto-credito-50198265.html",
    "sourceAlternates": [
      {
        "url": "https://proppies.app/propiedad/buenos-aires/moreno/casa-3-amb-en-venta-en-moreno-45632288",
        "label": "Ficha sindicada de Proppies para la misma casa"
      }
    ],
    "agency": "Mateo Propiedades S.R.L.",
    "contact": "WhatsApp +54 11 3939-7500 según ficha sindicada de Proppies; matrícula publicada 203 Dpto. M-GR.",
    "phone": "+541139397500",
    "price": "USD 65.000",
    "currency": "USD",
    "landSurfaceM2": 350,
    "publicationDate": "Proppies indicaba publicado hace aproximadamente 3 semanas al 27/11/2026; fecha exacta no visible.",
    "surfaceNote": "Terreno de 10 × 35 m (350 m²). Zonaprop muestra 1 m² cubierto en la tabla técnica, dato manifiestamente inconsistente con la descripción; no se registra superficie cubierta.",
    "observations": "Casa de tres ambientes, dos dormitorios, living-comedor, cocina integrada, baño, lavadero, cuarto de herramientas y cochera pasante. El aviso la declara apta crédito y menciona pavimento y servicios. Confirmar planos, superficie cubierta real, estado de crédito y disponibilidad.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: altura pública disponible; marcador solo si Georef devuelve una coincidencia única para 25 de Mayo 2700, Paso del Rey.",
    "verificationStatus": "Ficha directa de Zonaprop accesible en la revisión del 27/11/2026; precio USD 65.000 y terreno 350 m² publicados. La superficie cubierta del portal es inconsistente y se deja sin completar. Disponibilidad no confirmada."
  },
  {
    "id": "casa-concordia-2545-311",
    "recordType": "Casa individual de dos plantas",
    "name": "Concordia 2545 · casa de cinco ambientes · Moreno",
    "locality": "Moreno",
    "address": "Concordia 2545, Moreno",
    "geocodeQuery": "Concordia 2545, Moreno, Buenos Aires",
    "geocodeMatch": "CONCORDIA 2545",
    "source": "https://www.jorgelinamartinezpropiedades.com.ar/propiedad/183298_casa-de-dos-plantas-en-venta-en-moreno/",
    "sourceAlternates": [
      {
        "url": "https://proppies.app/propiedad/buenos-aires/moreno/casa-5-amb-en-venta-en-moreno-45631482",
        "label": "Ficha sindicada de Proppies para la misma casa; publicada hace 2 meses"
      }
    ],
    "agency": "Jorgelina Martinez Propiedades",
    "contact": "Jorgelina Martínez · +54 11 6732-4994 · Jorgelinamartinezprop@gmail.com.",
    "phone": "+541167324994",
    "price": "USD 130.000",
    "currency": "USD",
    "landSurfaceM2": 311,
    "coveredSurfaceM2": 198,
    "publicationDate": "Ficha de Jorgelina actualizada el 11/07/2026 a las 10:20; copia sindicada de Proppies indicaba publicada hace 2 meses al 27/11/2026. Las fechas de las dos fuentes no coinciden.",
    "surfaceNote": "311 m² totales y 198 m² cubiertos según la ficha de la inmobiliaria; cuatro dormitorios, cinco ambientes y tres baños.",
    "observations": "Casa de dos plantas, pileta de 7 × 3 m, garage y terraza. La planta baja tiene antigüedad declarada de 60 años y la planta alta de 20. La ficha sigue marcada “En venta”, pero su última actualización es de julio: revalidar precio, estado y disponibilidad antes de una visita.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "Pendiente de revalidación",
    "geolocationStatus": "Pendiente: dirección exacta publicada; el marcador se habilitará solo si Georef devuelve una coincidencia inequívoca.",
    "verificationStatus": "Ficha directa de Jorgelina Martinez Propiedades accesible el 27/11/2026 y marcada “En venta”; precio, superficies, contacto y actualización del 11/07/2026 publicados. Por antigüedad de la actualización, disponibilidad pendiente de confirmación."
  },
  {
    "id": "terreno-bartolome-mitre-3200-1260",
    "recordType": "Terreno individual · corredor comercial",
    "name": "Avenida Bartolomé Mitre 3200 · lote comercial de 1.260 m²",
    "locality": "Moreno",
    "address": "Avenida Bartolomé Mitre 3200, Moreno, a metros de Av. Victorica",
    "geocodeQuery": "Avenida Bartolome Mitre 3200, Moreno, Buenos Aires",
    "geocodeMatch": "AVENIDA BARTOLOME MITRE 3200",
    "source": "https://proppies.app/propiedad/buenos-aires/moreno/terreno-en-venta-en-moreno-3352983",
    "agency": "Marisol Espinosa Propiedades",
    "contact": "WhatsApp 011 3399-6622, publicado en Proppies.",
    "phone": "+541133996622",
    "price": "USD 495.000",
    "currency": "USD",
    "landSurfaceM2": 1260,
    "publicationDate": "Proppies indicaba publicado hace 5 meses / 168 días al 27/11/2026; sin cambios de precio registrados en esa ficha.",
    "surfaceNote": "1.260 m² de terreno; no se publica superficie cubierta. El anuncio lo ubica frente a supermercado Día% y cerca de estación YPF, a metros de Av. Victorica.",
    "observations": "La ficha sindicada indica que lleva 168 días publicada y no registra cambios de precio. Su análisis automático de Proppies lo ubica 16% por encima de la mediana de 12 terrenos comparables cercanos; esa estimación no es una tasación. Por antigüedad, se clasifica pendiente de revalidación comercial. Solicitar certificado urbanístico y confirmar el precio.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "Pendiente de revalidación",
    "geolocationStatus": "Pendiente: dirección pública disponible; solo colocar marcador si Georef devuelve coincidencia inequívoca.",
    "verificationStatus": "Ficha de Proppies accesible el 27/11/2026; USD 495.000, 1.260 m², anunciante y WhatsApp publicados. La publicación lleva 168 días; disponibilidad comercial pendiente de revalidación."
  }
];
publishedProperties.push(...nov27_1032NewEntries);

const nov27_1058NewEntries = [
  {
    "id": "casa-doctor-asseff-400-361",
    "recordType": "Casa individual con departamento independiente",
    "name": "Casa con jardín y departamento independiente · Dr. Asseff 400",
    "locality": "Moreno Centro",
    "address": "Doctor Asseff 400, Moreno",
    "geocodeQuery": "Doctor Asseff 400, Moreno",
    "geocodeMatch": "DOCTOR ASSEFF 400",
    "source": "https://www.argenprop.com/casa-en-venta-en-moreno-3-ambientes--20947531",
    "sourceAlternates": [
      {
        "url": "https://plataplace.com/propiedad/casa-de-3-ambientes-en-venta-en-moreno-3023930f",
        "label": "PlataPlace: aviso activo publicado 06/11/2026; coincide en dirección, USD 110.000, lote 361 m² y 114 m² cubiertos."
      }
    ],
    "publicationDate": "06/11/2026 (PlataPlace); la ficha de Argenprop no informa fecha original.",
    "agency": "RE/MAX Caminos (identificación del pie de ficha); corredor responsable Damián Perrone, CUCICBA 2787, y Patricia Alejandra Córdoba, CMCPDJMGR 246",
    "contact": "Marcelo Heguille; formulario de Argenprop. Teléfono parcialmente oculto, no verificable completo.",
    "price": "USD 110.000",
    "currency": "USD",
    "landSurfaceM2": 361,
    "coveredSurfaceM2": 114,
    "surfaceNote": "La ficha técnica informa además 381 m² totales, cifra que no reconcilia con 361 m² de terreno y 114 m² cubiertos. La descripción menciona un departamento independiente de dos ambientes.",
    "observations": "Dos dormitorios, dos baños, toilette y una cochera según ficha; la descripción agrega departamento independiente de dos ambientes. Verificar si los 114 m² cubiertos incluyen ambas construcciones, planos, estado de conservación, título y disponibilidad.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: dirección exacta publicada; marcador sujeto a coincidencia inequívoca de Georef.",
    "verificationStatus": "Argenprop y PlataPlace presentan fichas accesibles el 27/11/2026; PlataPlace registra aviso activo publicado el 06/11/2026. Coinciden en USD 110.000, lote 361 m² y cubierta 114 m². La ficha técnica declara además 381 m² totales, cifra inconsistente; disponibilidad no confirmada."
  },
  {
    "id": "desarrollo-fincas-san-jose-87ha-650",
    "recordType": "Desarrollo inmobiliario privado · barrio cerrado en ejecución por etapas",
    "name": "Fincas San José · 87 ha · 650 lotes de 800 m²",
    "locality": "Francisco Álvarez",
    "address": "Ruta Provincial 24, Francisco Álvarez; acceso principal sobre RP24 y acceso secundario por calle Hornos; a 1 km de RP25",
    "source": "https://www.fincassanjose.com.ar/",
    "sourceAlternates": [
      {
        "url": "https://tremsalgrunewaldprop.ar/como-es-fincas-san-jose/",
        "label": "Informe del comercializador publicado el 02/11/2026 sobre el estado de la etapa 1 y las obras comunes"
      },
      {
        "url": "https://www.argenprop.com/terreno-en-venta-en-san-jose--20674535",
        "label": "Oferta de lote genérico de 800 m² en etapa 3"
      }
    ],
    "agency": "Desarrolladora anunciada en publicaciones comerciales: Grandes Emprendimientos Inmobiliarios II. Comercializador y oficina de ventas: Tremsal Grünewald Propiedades.",
    "contact": "WhatsApp del sitio oficial: +54 9 11 7393-1111. Tremsal Grünewald: +54 9 11 4992-1296; info@tremsalgrunewaldprop.ar.",
    "landSurfaceM2": 870000,
    "surfaceNote": "Sitio oficial y comercializador informan 870.000 m² (87 ha) y 650 lotes de 800 m². Un aviso de portal informa 87.000 m² y 658 lotes; se conserva como discrepancia del material comercial de terceros.",
    "publicationDate": "2026-11-02 (informe de avance del comercializador; fecha de alta del proyecto no informada)",
    "observations": "El sitio oficial ubica el desarrollo sobre RP24, a 1 km de RP25 y 5 km de Acceso Oeste. El informe de Tremsal Grünewald del 02/11/2026 describe la etapa 1 loteada, pilares de luz y gas, cloacas instaladas, conexiones de gas y electricidad casi terminadas, ingreso principal en obra y SUM en obra; también indica que todavía no hay viviendas construidas, que etapa 1 está prácticamente vendida y que la comercialización continúa en etapas 2 y 3. Son datos del desarrollador/comercializador, no una certificación municipal o de inspección independiente. El masterplan y amenities futuros no deben confundirse con obras terminadas.",
    "lat": null,
    "lng": null,
    "geocodeDisabled": true,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: ubicación sobre RP24 sin dirección parcelaria o coordenada de acceso verificada; no se asigna marcador de parcela.",
    "verificationStatus": "Sitio oficial accesible el 27/11/2026 y reporte del comercializador fechado 02/11/2026 accesible; documentan el proyecto y avances reportados. Permisos, aprobación de subdivisión, avance físico y disponibilidad de lotes no verificados de forma independiente."
  },
  {
    "id": "fincas-san-jose-lote-800-etapa3-30600",
    "recordType": "Terreno individual · oferta genérica de etapa 3",
    "name": "Fincas San José · lote publicado de 800 m² · etapa 3",
    "locality": "Francisco Álvarez",
    "address": "Ruta Provincial 24 s/n · Fincas San José, Francisco Álvarez",
    "source": "https://www.argenprop.com/terreno-en-venta-en-san-jose--20674535",
    "sourceAlternates": [
      {
        "url": "https://www.fincassanjose.com.ar/",
        "label": "Sitio oficial del desarrollo"
      },
      {
        "url": "https://tremsalgrunewaldprop.ar/como-es-fincas-san-jose/",
        "label": "Informe de avance del comercializador del 02/11/2026"
      }
    ],
    "agency": "C21 Lamoisse Lorré; comercialización a cargo de Gisela Natalia Lorré y Verónica Lamoisse, CMCPM 3001 / CUCICBA 8846. Desarrollo atribuido comercialmente a Grandes Emprendimientos Inmobiliarios II.",
    "contact": "Gisela Natalia Lorré y Verónica Lamoisse; teléfono parcialmente visible en Argenprop (0113227). Para visita al proyecto: Tremsal Grünewald +54 9 11 4992-1296; info@tremsalgrunewaldprop.ar.",
    "price": "USD 30.600 en la cabecera del aviso; la descripción mezcla condiciones de etapa 2 (USD 43.900 contado o anticipo USD 20.000 + 30 cuotas de USD 1.000). Confirmar etapa, precio y plan del lote concreto.",
    "currency": "USD",
    "landSurfaceM2": 800,
    "surfaceNote": "Lote genérico sin número de manzana o parcela publicado. La ficha lo identifica como etapa 3 y anuncia entrega diciembre de 2029.",
    "observations": "El anuncio directo muestra USD 30.600 y 800 m², pero la descripción contiene precios y condiciones de otra etapa. No hay número de lote que permita individualizar la parcela. El proyecto oficial informa 650 lotes y 870.000 m², mientras el aviso comercial de portal informa 658 lotes y 87.000 m². No tomar el precio ni la entrega como compromiso contractual sin propuesta escrita, plano de etapa y documentación de subdivisión.",
    "lat": null,
    "lng": null,
    "geocodeDisabled": true,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: Ruta 24 s/n y lote sin identificación parcelaria; no se coloca marcador de parcela.",
    "verificationStatus": "Ficha directa de Argenprop accesible el 27/11/2026; superficie 800 m² y precio de cabecera publicados. Condiciones económicas y etapa no reconciliadas; stock y disponibilidad no confirmados."
  },
  {
    "id": "terreno-boulevard-evita-100-111-pendiente",
    "recordType": "Terreno individual · ficha con datos urbanísticos contradictorios",
    "name": "Terreno sobre Boulevard Evita 100 · Moreno Centro · ficha a corregir",
    "locality": "Moreno Centro",
    "address": "Boulevard Evita 100, Moreno",
    "geocodeQuery": "Boulevard Evita 100, Moreno",
    "geocodeMatch": "BOULEVARD EVITA 100",
    "source": "https://www.argenprop.com/terreno-en-venta-en-moreno--14577403",
    "agency": "Calderón Inmobiliaria (identificación del pie de ficha)",
    "contact": "Formulario de Argenprop; teléfono parcialmente visible como 1125935; persona de contacto no identificada.",
    "price": "USD 725.000",
    "currency": "USD",
    "landSurfaceM2": 111,
    "surfaceNote": "Argenprop muestra 111 m² de superficie total; el aviso también declara FOS 715,680 m², FOT 1.669,92 m² y altura máxima 150 m, datos que no se pueden reconciliar con la superficie publicada.",
    "observations": "La ficha está accesible, pero presenta una contradicción crítica entre los 111 m² del terreno y los indicadores/altura declarados. No usar FOS, FOT, altura ni precio unitario para evaluar un desarrollo. Requiere confirmación de parcela, título, mensura y certificado urbanístico municipal antes de considerarlo una oportunidad.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "Pendiente de revalidación",
    "geolocationStatus": "Pendiente: dirección publicada; no asignar marcador parcelario hasta resolver la identidad del lote.",
    "verificationStatus": "Ficha directa de Argenprop accesible el 27/11/2026; precio y 111 m² aparecen en cabecera. Datos urbanísticos incompatibles con la superficie publicada; no se considera una oportunidad validada."
  },
  {
    "id": "casa-emilio-mitre-2300-1100-historico",
    "recordType": "Casa y activo mixto · antecedente no vigente",
    "name": "Block de viviendas y monoambientes · Emilio Mitre 2300",
    "locality": "Moreno",
    "address": "Emilio Mitre 2300, Moreno",
    "source": "https://www.argenprop.com/casa-en-venta-en-moreno-5-ambientes--20855460",
    "sourceAlternates": [
      {
        "url": "https://www.argenprop.com/casa-en-venta-en-moreno-5-ambientes--20693713",
        "label": "Otra ficha de Argenprop para el mismo activo; enlace directo devolvió 410"
      },
      {
        "url": "https://www.zonaprop.com.ar/propiedades/clasificado/veclcain-venta-block-casa-oportunidad-moreno-lote-1100-m-60451554.html",
        "label": "Publicación paralela de Zonaprop; enlace directo devolvió 410"
      },
      {
        "url": "https://www.inmuebles.clarin.com/casa-en-venta-en-moreno-5-ambientes--20592411",
        "label": "Publicación sindicada en Inmuebles Clarín; enlace directo devolvió 410"
      }
    ],
    "agency": "Avisos en Argenprop, Zonaprop e Inmuebles Clarín; corredor responsable publicado: Leonardo Misuraca, CMCPSM 2568 / CUCICBA 7970. Inmobiliaria no identificada en la ficha consultada.",
    "contact": "Gonzalo Ponce Ferro; formulario de contacto del portal. Teléfono no publicado en los resultados consultados.",
    "price": "USD 79.999 (último precio indexado)",
    "currency": "USD",
    "landSurfaceM2": 1100,
    "coveredSurfaceM2": 250,
    "surfaceNote": "El anuncio describe tres monoambientes, una casa tipo alpina y una segunda vivienda en el fondo; 250 m² cubiertos aproximados según cabecera.",
    "observations": "Las dos URLs directas de Argenprop, la de Zonaprop y la de Inmuebles Clarín devolvieron 410 Gone el 27/11/2026. Se conserva como antecedente histórico, sin afirmar que haya sido vendido. La publicación describía un activo mixto con potencial de renta; superficies y estado de las construcciones no pudieron revalidarse.",
    "lat": null,
    "lng": null,
    "geocodeDisabled": true,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No vigente",
    "geolocationStatus": "Pendiente: dirección aproximada; registro histórico sin georreferenciar.",
    "verificationStatus": "Resultados indexados con precio y superficies; enlaces directos consultados de Argenprop, Zonaprop e Inmuebles Clarín devolvieron 410 el 27/11/2026."
  },
  {
    "id": "terreno-colectora-norte-fray-cayetano-1348-historico",
    "recordType": "Fracción de terreno · pendiente de revalidación",
    "name": "Colectora Norte Acceso Oeste km 0 · esquina Fray Cayetano Rodríguez · 1.348 m²",
    "locality": "La Reja",
    "address": "Colectora Norte del Acceso Oeste, esquina Fray Cayetano Rodríguez, La Reja, Moreno; el aviso menciona km 0 pero el encabezado indexado muestra km 100",
    "source": "https://www.argenprop.com/terreno-en-venta-en-la-reja--10357815",
    "sourceAlternates": [
      {
        "url": "https://www.zonaprop.com.ar/propiedades/clasificado/vecltrin-terreno-fraccion-en-venta-sobre-colectora-norte-acceso-53878076.html",
        "label": "Ficha paralela de Zonaprop; enlace directo devolvió 410 el 27/11/2026"
      }
    ],
    "agency": "No identificada en el resultado indexado disponible.",
    "contact": "No se encontró contacto público verificable en la ficha indexada.",
    "price": "USD 320.000 (último precio indexado)",
    "currency": "USD",
    "landSurfaceM2": 1348,
    "surfaceNote": "El resultado indexado identifica lotes 10, 14, 15 y 16, con superficie aproximada de 1.348 m². Publicaba zonificación Residencial 5, FOS 0,40 y FOT 0,50; no verificados municipalmente.",
    "observations": "El resultado de Argenprop, indexado el mes anterior, publica USD 320.000 y 1.348 m²; su acceso directo devuelve 405 Method Not Allowed, que no prueba retiro. La ficha paralela de Zonaprop devuelve 410 Gone. Existe además una contradicción de ubicación: el título/descrición indica km 0 y el encabezado indexado muestra km 100. Se clasifica pendiente de revalidación, no como disponible ni como vendido.",
    "lat": null,
    "lng": null,
    "geocodeDisabled": true,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "Pendiente de revalidación",
    "geolocationStatus": "Pendiente: ubicación de colectora y km contradictorios; sin identificación parcelaria.",
    "verificationStatus": "Resultado indexado de Argenprop con precio y superficie; enlace directo respondió 405 el 27/11/2026. Ficha paralela de Zonaprop respondió 410. Vigencia comercial no verificable."
  },
  {
    "id": "casa-antartida-argentina-600-342-historico",
    "recordType": "Casa y activo mixto · antecedente no vigente",
    "name": "Casa, local y depósito · Antártida Argentina 600",
    "locality": "Moreno Sur",
    "address": "Antártida Argentina 600, Moreno Sur",
    "source": "https://www.argenprop.com/casa-en-venta-en-moreno-5-ambientes--16969027",
    "agency": "Guillermo Díaz Propiedades; corredor responsable Guillermo Díaz, CMCPM 277.",
    "contact": "Formulario de Argenprop; no se recuperó un teléfono completo del anunciante.",
    "price": "USD 120.000 (último precio indexado)",
    "currency": "USD",
    "landSurfaceM2": 342,
    "coveredSurfaceM2": 300,
    "surfaceNote": "El anuncio describía casa, local de 40 m² y depósito/galpón de 100 m²; el desglose de superficie cubierta requiere documentación.",
    "observations": "El enlace directo de Argenprop devolvió 410 Gone el 27/11/2026. Se conserva como antecedente histórico, sin afirmar que se haya vendido. La ficha indexada describía tres dormitorios, cochera para dos vehículos, local comercial en esquina y depósito con losa; las superficies y habilitaciones no pudieron revalidarse.",
    "lat": null,
    "lng": null,
    "geocodeDisabled": true,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No vigente",
    "geolocationStatus": "Pendiente: registro histórico sin georreferenciar.",
    "verificationStatus": "Resultado indexado de Argenprop con precio y superficies; ficha directa devolvió 410 el 27/11/2026."
  }
];
publishedProperties.push(...nov27_1058NewEntries);



// Nuevas altas y antecedentes verificados en la revisión del 27/11/2026.
publishedProperties.push(...[
  {
    "id": "terreno-intendente-corvalan-1500-586",
    "recordType": "Terreno individual · uso mixto sugerido por el anunciante",
    "name": "Intendente Corvalán 1500 · lote de 586,44 m²",
    "locality": "Moreno",
    "address": "Intendente Corvalán 1500, Moreno",
    "geocodeQuery": "Intendente Corvalan 1500, Moreno, Buenos Aires",
    "source": "https://platastar.com/propiedad/terreno-de-586-44-m2-en-venta-en-moreno-da8ea0f2",
    "agency": "RE/MAX Net",
    "contact": "Yanil Bertelegni Reilly · consulta mediante PlataStar; teléfono no visible.",
    "price": "USD 55.000",
    "currency": "USD",
    "landSurfaceM2": 586.44,
    "coveredSurfaceM2": null,
    "publicationDate": "21/10/2026",
    "observations": "El anunciante sugiere locales, vivienda o multifamiliar; no publica indicadores urbanísticos oficiales. La propia plataforma advierte que el uso del suelo no está indicado. Solicitar nomenclatura catastral, mensura y certificado urbanístico.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "verificationStatus": "Ficha de PlataStar accesible el 27/11/2026; publicada el 21/10/2026. Precio y superficie visibles; disponibilidad y aptitud urbanística no confirmadas.",
    "geolocationStatus": "Pendiente: Georef debe devolver una coincidencia inequívoca para la dirección publicada."
  },
  {
    "id": "terreno-alcorta-2400-846",
    "recordType": "Terreno para desarrollo comercial · publicación individual",
    "name": "Alcorta al 2400 · lote comercial de 846 m²",
    "locality": "Moreno Centro",
    "address": "Alcorta al 2400, Moreno",
    "geocodeDisabled": true,
    "source": "https://platastar.com/propiedad/terreno-de-846-m2-en-venta-en-moreno-4dfa6506",
    "agency": "Grupo Vaccaro",
    "contact": "Grupo Vaccaro · formulario de PlataStar; oficina publicada en Av. Sarmiento 3110. Teléfono incompleto en el aviso (+54 9 11 …).",
    "price": "USD 260.000",
    "currency": "USD",
    "landSurfaceM2": 846,
    "coveredSurfaceM2": null,
    "publicationDate": "13/05/2026",
    "observations": "La ficha anuncia uso comercial, FOS 0,60, FOT 3 (FOT 2,4 con premios), 2.538 m² edificables, 2.030 m² vendibles y altura PB+6; son declaraciones comerciales, no certificado municipal. Contradicción de expensas: panel USD 175/mes y descripción ARS 480.000/mes. Publicación de seis meses; solicitar revalidación de precio, stock, expensas y normativa.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "Pendiente de revalidación",
    "verificationStatus": "Ficha de PlataStar accesible y vista el 26/11/2026; publicada el 13/05/2026. Antigüedad aproximada de seis meses y contradicción en expensas; disponibilidad comercial pendiente.",
    "geolocationStatus": "Pendiente: dirección publicada como altura aproximada; sin coordenada parcelaria verificada."
  },
  {
    "id": "terreno-sarmiento-596-750",
    "recordType": "Terreno con construcciones existentes a reciclar",
    "name": "Sarmiento 596 y Guatemala · lote de 750 m²",
    "locality": "Moreno",
    "address": "Sarmiento 596, esquina Guatemala, Moreno",
    "geocodeQuery": "Sarmiento 596, Moreno, Buenos Aires",
    "source": "https://platastar.com/propiedad/terreno-de-750-m2-en-venta-en-moreno-130bac96",
    "agency": "Century 21 Gran Bahía S.A.",
    "contact": "Century 21 Gran Bahía S.A. · formulario de PlataStar; persona y teléfono no visibles.",
    "price": "USD 79.000",
    "currency": "USD",
    "landSurfaceM2": 750,
    "coveredSurfaceM2": null,
    "surfaceNote": "El aviso describe vivienda principal, galería de unos 36 m² y una construcción independiente de unos 40 m², pero no informa una superficie cubierta total.",
    "publicationDate": "13/09/2026",
    "observations": "Esquina Sarmiento y Guatemala. Incluye vivienda principal de tres ambientes a reciclar, galería, segunda construcción independiente, quincho, parrilla y pileta a refaccionar. El anunciante propone reciclar, ampliar o desarrollar unidades funcionales; la capacidad constructiva no está acreditada. Visto en la fuente el 23/11/2026.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "verificationStatus": "Ficha de PlataStar accesible; publicada el 13/09/2026 y vista el 23/11/2026. Precio y lote publicados; disponibilidad no confirmada.",
    "geolocationStatus": "Pendiente: se consultará Georef para la dirección pública; confirmar esquina y parcela."
  },
  {
    "id": "terreno-espana-1100-1255-cu3",
    "recordType": "Terreno con mejoras · potencial de desarrollo mixto anunciado",
    "name": "España al 1100 · parcela CU3 de 1.255 m²",
    "locality": "Moreno Centro",
    "address": "Av. España al 1100, entre Av. del Libertador y centro comercial, Moreno",
    "geocodeQuery": "Avenida España 1100, Moreno, Buenos Aires",
    "source": "https://platastar.com/propiedad/terreno-de-1255-m2-en-venta-en-moreno-0d0d93a9",
    "agency": "Coldwell Banker Argentina",
    "contact": "Susana Casanova · consulta mediante PlataStar; teléfono no visible.",
    "price": "USD 250.000",
    "currency": "USD",
    "landSurfaceM2": 1255,
    "coveredSurfaceM2": null,
    "publicationDate": "16/10/2026",
    "observations": "La ficha anuncia zonificación Centro Urbano 3 (CU3), FOT 2,40, FOS 0,60 y 3.012 m² de construcción potencial, con alturas y usos mixtos descritos por el anunciante. Incluye parque, pileta, quincho, parrilla, baños y bauleras. Los indicadores y la afirmación de que sería la única manzana CU3 deben comprobarse con certificado urbanístico y catastro. Visto el 26/11/2026.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "verificationStatus": "Ficha de PlataStar accesible; publicada el 16/10/2026 y vista el 26/11/2026. Precio y superficie publicados; capacidad constructiva y disponibilidad no verificadas.",
    "geolocationStatus": "Pendiente: la altura es aproximada; georreferenciar solo con coincidencia inequívoca."
  },
  {
    "id": "terreno-joly-1800-1163-tres-lotes",
    "recordType": "Fracción urbana · tres lotes anunciados conjuntamente",
    "name": "Claudio María Joly 1800 y 1° de Mayo · 1.163 m²",
    "locality": "Moreno Sur",
    "address": "Claudio María Joly 1800 y 1° de Mayo, Moreno Sur",
    "geocodeQuery": "Claudio Maria Joly 1800, Moreno, Buenos Aires",
    "source": "https://platastar.com/propiedad/terreno-de-1163-m2-en-venta-en-moreno-026f9cf6",
    "agency": "RE/MAX Caminos",
    "contact": "Andrea Janczuk · consulta mediante PlataStar; teléfono no visible.",
    "price": "USD 200.000",
    "currency": "USD",
    "landSurfaceM2": 1163,
    "coveredSurfaceM2": null,
    "publicationDate": "20/11/2026",
    "observations": "El aviso ofrece tres lotes como una superficie conjunta. Declara Alineamiento Comercial A sobre Joly (FOS 0,60, FOT 1, altura 9 m) y Residencial 1 sobre 1° de Mayo (FOS 0,60, FOT 1,20, altura 12 m), y sugiere usos mixtos. Los indicadores son declaraciones del aviso y deben confirmarse para cada parcela. Medidas aproximadas sujetas a documentación.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "verificationStatus": "Ficha de PlataStar accesible; publicada el 20/11/2026 y vista el 26/11/2026. Precio y superficie visibles; identidad de los tres lotes, normativa y disponibilidad no confirmadas.",
    "geolocationStatus": "Pendiente: ubicación de esquina y conjunto de tres parcelas; no asignar coordenadas parcelarias."
  },
  {
    "id": "terreno-soule-alberdi-200",
    "recordType": "Terreno individual",
    "name": "Soule y Alberdi · lote de 200 m²",
    "locality": "Moreno",
    "address": "Intersección de calles Soule y Alberdi, Moreno",
    "geocodeDisabled": true,
    "source": "https://platastar.com/propiedad/terreno-de-200-m2-en-venta-en-moreno-7ff62b7c",
    "agency": "Arcieri y Sana Inmobiliaria",
    "contact": "Arcieri y Sana Inmobiliaria · formulario de PlataStar; teléfono no visible.",
    "price": "USD 24.000",
    "currency": "USD",
    "landSurfaceM2": 200,
    "coveredSurfaceM2": null,
    "publicationDate": "20/11/2026",
    "observations": "Lote plano según el anunciante. La ficha no informa uso del suelo, medidas ni nomenclatura catastral; la dirección es una intersección sin número. No se asignan coordenadas.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "verificationStatus": "Ficha de PlataStar accesible; publicada el 20/11/2026 y vista el 27/11/2026. Precio y superficie visibles; disponibilidad no confirmada.",
    "geolocationStatus": "Pendiente: intersección sin número ni parcela individual."
  },
  {
    "id": "casa-san-luis-1557-100",
    "recordType": "Casa individual · barrio privado según el aviso",
    "name": "Casa 3 ambientes · San Luis 1557",
    "locality": "Moreno",
    "address": "San Luis 1557, Moreno",
    "geocodeQuery": "San Luis 1557, Moreno, Buenos Aires",
    "source": "https://plataplace.com/propiedad/casa-de-3-ambientes-en-venta-en-moreno-8e25e6fb",
    "sourceAlternates": [
      {"url": "https://www.inmuebles.clarin.com/terreno-en-venta-en-moreno--20840232", "label": "Aviso de dos lotes contiguos de 100 m² cada uno en San Luis 1557, USD 12.000; posible solapamiento."}
    ],
    "agency": "Arcieri y Sana Inmobiliaria",
    "contact": "Arcieri y Sana Inmobiliaria · formulario/botón de llamada de PlataPlace; teléfono no visible.",
    "price": "USD 29.000",
    "currency": "USD",
    "landSurfaceM2": null,
    "coveredSurfaceM2": 100,
    "surfaceNote": "La ficha publica 100 m² totales y 100 m² cubiertos; no informa por separado la superficie del terreno.",
    "publicationDate": "28/09/2026",
    "observations": "Dos dormitorios, un baño, cochera descubierta y jardín. Historial de precio de la plataforma: bajó 31%, de USD 42.000 el 28/09/2026 a USD 29.000 el 19/11/2026. La ficha indica 100 m² totales y 100 m² cubiertos, por lo que debe solicitarse superficie de lote y plano. Revisión adicional: aviso paralelo en la misma dirección ofrece dos lotes contiguos de 100 m² cada uno por USD 12.000, con base y paredes laterales; podría ser el mismo inmueble, una parcela contigua o una oferta distinta. No se incorpora como segundo activo hasta comparar partida y mensura.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "verificationStatus": "PlataPlace registra el aviso activo, publicado el 28/09/2026 y visto el 27/11/2026; precio actualizado a USD 29.000 el 19/11/2026. Disponibilidad no confirmada.",
    "geolocationStatus": "Pendiente: dirección pública exacta; Georef debe devolver coincidencia inequívoca."
  },
  {
    "id": "casa-leandro-alem-2500-305",
    "recordType": "Casa individual",
    "name": "Casa 3 ambientes · Leandro N. Alem 2500",
    "locality": "Moreno",
    "address": "Leandro N. Alem 2500, Moreno",
    "geocodeQuery": "Leandro N Alem 2500, Moreno, Buenos Aires",
    "source": "https://plataplace.com/propiedad/casa-de-3-ambientes-en-venta-en-moreno-ed3ac61e",
    "agency": "RE/MAX Argentina",
    "contact": "Rita Del Roio · consulta por formulario/WhatsApp o llamada desde PlataPlace; número no visible.",
    "price": "USD 140.000",
    "currency": "USD",
    "landSurfaceM2": 305,
    "coveredSurfaceM2": 193,
    "surfaceNote": "305 m² de superficie total y 193 m² cubiertos según la ficha; la parcela no se desglosa separadamente.",
    "publicationDate": "13/11/2026",
    "observations": "Dos dormitorios, dos baños, cuarto adicional usado como vestidor/escritorio, quincho, cochera y patio. Construida en 1970 según el aviso. La cabecera la titula 3 ambientes, mientras la descripción detalla dos dormitorios y un cuarto adicional. Visto en la fuente el 26/11/2026.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "verificationStatus": "PlataPlace registra el aviso activo, publicado el 13/11/2026 y visto el 26/11/2026. Precio y superficies visibles; disponibilidad no confirmada.",
    "geolocationStatus": "Pendiente: Georef debe devolver coincidencia inequívoca para la dirección publicada."
  },
  {
    "id": "casa-ituzaingo-azcuenaga-218",
    "recordType": "Casa individual",
    "name": "Casa 5 ambientes · Ituzaingo y Azcuénaga",
    "locality": "Moreno",
    "address": "Intersección de Ituzaingo y Azcuénaga, Moreno",
    "geocodeDisabled": true,
    "source": "https://plataplace.com/propiedad/casa-de-5-ambientes-en-venta-en-moreno-c088d1e6",
    "agency": "Arcieri y Sana Inmobiliaria",
    "contact": "Arcieri y Sana Inmobiliaria · formulario/botón de llamada de PlataPlace; teléfono no visible.",
    "price": "USD 160.000",
    "currency": "USD",
    "landSurfaceM2": 218,
    "coveredSurfaceM2": 100,
    "surfaceNote": "La descripción informa terreno de 218 m² y 100 m² cubiertos.",
    "publicationDate": "28/09/2026",
    "observations": "Tres dormitorios, dos baños, cochera semicubierta, gas natural y cloacas; el aviso la presenta como apta para crédito. La dirección no incluye altura y la plataforma la marca imprecisa. La ficha fue vista el 27/11/2026.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "verificationStatus": "PlataPlace registra el aviso activo, publicado el 28/09/2026 y visto el 27/11/2026. Precio y superficies visibles; disponibilidad no confirmada.",
    "geolocationStatus": "Pendiente: intersección sin altura ni parcela individual."
  },
  {
    "id": "terreno-sancti-spiritu-1500-816",
    "recordType": "Terreno individual · zona residencial de quintas",
    "name": "Sancti Spiritu 1500 · lote de 816,93 m²",
    "locality": "La Reja",
    "address": "Sancti Spiritu 1500, La Reja, Moreno",
    "geocodeQuery": "Sancti Spiritu 1500, La Reja, Moreno, Buenos Aires",
    "source": "https://platastar.com/propiedad/terreno-de-816-93-m2-en-venta-en-moreno-b9ac5e6c",
    "agency": "RE/MAX Avenida",
    "contact": "Fernanda Ubeda · consulta mediante PlataStar; teléfono no visible.",
    "price": "USD 55.000",
    "currency": "USD",
    "landSurfaceM2": 816.93,
    "coveredSurfaceM2": null,
    "publicationDate": "16/10/2026",
    "observations": "El anunciante lo describe como último lote disponible en una cuadra residencial de quintas, a dos cuadras de Av. Padre Fahy y cerca de Aleph Sport. El uso del suelo no está indicado en la ficha; verificar zonificación, servicios, mensura y precio.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "verificationStatus": "Ficha de PlataStar accesible; publicada el 16/10/2026 y vista el 27/11/2026. Precio y superficie publicados; disponibilidad no confirmada.",
    "geolocationStatus": "Pendiente: Georef debe devolver una coincidencia inequívoca para la dirección publicada."
  },
  {
    "id": "terreno-prados-oeste2-general-hornos-2800-806",
    "recordType": "Terreno individual · barrio cerrado",
    "name": "Prados del Oeste 2 · lote de 806 m² · General Hornos 2800",
    "locality": "Moreno",
    "address": "General Hornos 2800, Prados del Oeste 2, Moreno",
    "geocodeDisabled": true,
    "source": "https://platastar.com/propiedad/terreno-de-806-m2-en-venta-en-moreno-56941072",
    "surfaceNote": "La ficha primaria publica 806 m² y otra ficha de la misma inmobiliaria/ubicación publica 802 m², ambas a USD 55.000; no hay número de lote. Superficie parcelaria pendiente de mensura.",
    "sourceAlternates": [{url:"https://platastar.com/propiedad/terreno-de-802-m2-en-venta-en-moreno-3da7e283",label:"Ficha relacionada de Century 21 Mare: General Hornos 2800, USD 55.000, 802 m², publicada 12/08/2026; posible misma parcela con medición divergente."}],
    "agency": "Century 21 Argentina · oficina Century 21 Mare",
    "contact": "Century 21 Mare · formulario de PlataStar; teléfono no visible.",
    "price": "USD 55.000",
    "currency": "USD",
    "landSurfaceM2": null,
    "coveredSurfaceM2": null,
    "publicationDate": "20/08/2026",
    "observations": "Lote en Prados del Oeste 2; el aviso ofrece financiación y/o permuta y describe servicios, seguridad, SUM, canchas y piscina. No publica número de lote. En el mismo corredor aparecen fichas de 812,65 m² (lote 231) y 821,19 m² (lote 5); pueden ser parcelas distintas, pero no se puede descartar un error de superficie o solapamiento sin plancheta. Se encontró otra ficha de Century 21 Mare para General Hornos 2800 a USD 55.000, pero con 802 m² en vez de 806 m². No se creó un registro separado porque no hay lote interno y podría ser la misma parcela con error de medición; confirmar con plancheta y mensura.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "Pendiente de revalidación",
    "verificationStatus": "Dos fichas accesibles de Century 21 Mare para General Hornos 2800: USD 55.000 por 806 m² y USD 55.000 por 802 m². Sin lote interno, probable duplicación o discrepancia de superficie; disponibilidad e identidad parcelaria pendientes.",
    "geolocationStatus": "Pendiente: lote interno sin número; no geocodificar al acceso general del barrio."
  },
  {
    "id": "terreno-prados-oeste2-lote231-812",
    "recordType": "Terreno individual · lote identificado en desarrollo",
    "name": "Prados del Oeste 2 · lote 231 · 812,65 m²",
    "locality": "Moreno",
    "address": "General Hornos 2800, lote 231, Prados del Oeste 2, Moreno",
    "geocodeDisabled": true,
    "source": "https://platastar.com/propiedad/terreno-de-812-65-m2-en-venta-en-moreno-c27c5a45",
    "agency": "Century 21 Argentina · oficina Century 21 Portela Sabrina",
    "contact": "Century 21 Portela Sabrina · formulario de PlataStar; teléfono no visible.",
    "price": "USD 56.317",
    "currency": "USD",
    "landSurfaceM2": 812.65,
    "coveredSurfaceM2": null,
    "publicationDate": "25/06/2024",
    "observations": "Lote 231 perimetral en cul-de-sac. El aviso publica FOT 0,5 y FOS 0,3, seguridad 24 h, redes y amenities; menciona entrega de lotes en curso y cerca del 40% vendido, afirmaciones antiguas que requieren revalidación. La ficha fue vista el 23/11/2026, pero su fecha original es 2024.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "Pendiente de revalidación",
    "verificationStatus": "Ficha de PlataStar accesible el 27/11/2026; fecha de publicación declarada 25/06/2024. Por antigüedad de más de dos años, no se considera comercialmente vigente hasta confirmación directa.",
    "geolocationStatus": "Pendiente: lote interno identificado por número; sin coordenada parcelaria verificable."
  },
  {
    "id": "terreno-prados-oeste2-lote5-821",
    "recordType": "Terreno individual · lote identificado en desarrollo",
    "name": "Prados del Oeste 2 · lote 5 · 821,19 m²",
    "locality": "Moreno",
    "address": "General Hornos 2800, lote 5, Prados del Oeste 2, Moreno",
    "geocodeDisabled": true,
    "source": "https://platastar.com/propiedad/terreno-de-821-19-m2-en-venta-en-moreno-6e34c365",
    "agency": "Century 21 Argentina · oficina Century 21 Portela Sabrina",
    "contact": "Century 21 Portela Sabrina · formulario de PlataStar; teléfono no visible.",
    "price": "USD 53.592",
    "currency": "USD",
    "landSurfaceM2": 821.19,
    "coveredSurfaceM2": null,
    "publicationDate": "25/06/2024",
    "observations": "Lote 5, cercano a los amenities según el anunciante. La ficha publica FOT 0,5 y FOS 0,3, servicios e infraestructura; las referencias a lotes disponibles y porcentaje vendido son antiguas. Fue visto el 23/11/2026, pero su fecha original es 2024.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "Pendiente de revalidación",
    "verificationStatus": "Ficha de PlataStar accesible el 27/11/2026; fecha de publicación declarada 25/06/2024. Por antigüedad de más de dos años, no se considera comercialmente vigente hasta confirmación directa.",
    "geolocationStatus": "Pendiente: lote interno identificado por número; sin coordenada parcelaria verificable."
  },
  {
    "id": "terreno-parque-la-arboleda-beato-escriva",
    "recordType": "Terreno individual o conjunto de lotes · superficie contradictoria",
    "name": "Barrio Parque La Arboleda · Beato Escrivá de Balaguer",
    "locality": "La Reja",
    "address": "Beato Escrivá de Balaguer, Barrio Parque La Arboleda, La Reja, Moreno",
    "geocodeDisabled": true,
    "source": "https://platastar.com/propiedad/terreno-de-374-m2-en-venta-en-moreno-10fc302c",
    "agency": "Delizia Propiedades",
    "contact": "Delizia Propiedades · formulario de PlataStar; teléfono no visible.",
    "price": "USD 35.000",
    "currency": "USD",
    "landSurfaceM2": null,
    "coveredSurfaceM2": null,
    "surfaceNote": "La cabecera de la ficha individual indica 1.500 m²; su descripción dice 374 m² (17 × 22 m); la categoría de terrenos comerciales muestra 500 m² para Beato Escrivá de Balaguer. Las tres cifras no concilian; superficie y alcance del precio USD 35.000 pendientes de confirmación.",
    "publicationDate": "28/09/2026",
    "observations": "La descripción indica que el lote se ubica sobre Av. Argentinidad y que se vende junto con otros lotes o por separado. La cabecera publica 1.500 m², pero el texto específico dice 374 m². No calcular precio por m² ni asumir que USD 35.000 corresponde a la fracción total hasta aclararlo con Delizia. Una categoría de terrenos comerciales de PlataStar también muestra Beato Escrivá de Balaguer a USD 35.000 por 500 m², publicada hace 29 días. Se conserva una sola ficha y se registran las tres superficies divergentes (1.500/374/500 m²); solicitar identificación parcelaria.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "Pendiente de revalidación",
    "verificationStatus": "Ficha individual de PlataStar accesible el 27/11/2026: USD 35.000, publicada 28/09/2026; cabecera 1.500 m² y descripción 374 m². La categoría comercial de PlataStar muestra otra superficie de 500 m² para la misma ubicación. No se adopta superficie ni se confirma disponibilidad.",
    "geolocationStatus": "Pendiente: dirección sin altura y sin lote interno."
  },
  {
    "id": "terreno-domingo-matheu-2000-236",
    "recordType": "Terreno individual · esquina",
    "name": "Domingo Matheu 2000 y Antártida Argentina · lote de 236 m²",
    "locality": "Moreno",
    "address": "Domingo Matheu 2000, esquina Antártida Argentina, Moreno",
    "geocodeQuery": "Domingo Matheu 2000, Moreno, Buenos Aires",
    "source": "https://platastar.com/propiedad/terreno-de-236-m2-en-venta-en-moreno-759b73cf",
    "agency": "Parola",
    "contact": "Parola · formulario de PlataStar; teléfono no visible.",
    "price": "USD 30.000",
    "currency": "USD",
    "landSurfaceM2": 236,
    "coveredSurfaceM2": null,
    "publicationDate": "07/03/2026",
    "observations": "Lote en esquina con escritura según el anunciante; frente 8,62 m, ochava 4,24 m y fondo 20,67 m. Expensas publicadas: ARS 61 mensuales. Publicación de ocho meses, por lo que requiere revalidación de precio y disponibilidad.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "Pendiente de revalidación",
    "verificationStatus": "Ficha de PlataStar accesible y vista el 26/11/2026; publicada el 07/03/2026. Por antigüedad, confirmar precio, escritura y disponibilidad antes de tratarla como oportunidad activa.",
    "geolocationStatus": "Pendiente: esquina pública; no se asigna coordenada parcelaria sin coincidencia inequívoca."
  },
  {
    "id": "casaquinta-chacras-teofilo-lote-471-historico",
    "recordType": "Terreno individual · antecedente histórico",
    "name": "Chacras de Teófilo · lote anunciado de 471 m²",
    "locality": "Trujui",
    "address": "Galileo Galilei al 7300, Chacras de Teófilo, Trujui, Moreno",
    "geocodeDisabled": true,
    "source": "https://www.argenprop.com/terreno-en-venta-en-trujui--20559576",
    sourceAlternates: [{url:"https://inmoclick.com/17491-re-max-buro-ii/inmuebles/4957/ficha/lote-en-venta-en-galileo-galilei-7300",label:"Ficha sindicada de RE/MAX Buro II; también devuelve 410 Gone."}],
    "agency": "RE/MAX Buro II",
    "contact": "Sebastián García; responsables Micaela Pérez, CSI 6671, y Lucas Federico Delgado, CUCICBA 6339; teléfono parcialmente visible en Argenprop.",
    "price": "USD 36.000",
    "currency": "USD",
    "landSurfaceM2": 471,
    "coveredSurfaceM2": null,
    "publicationDate": "Publicado hace aproximadamente 2 meses; fecha exacta no visible.",
    "observations": "La publicación indexada describía un lote de 471 m² dentro de Chacras de Teófilo. Los enlaces directos de Argenprop e Inmoclick devolvieron 410 Gone el 27/11/2026. Se conserva como antecedente histórico; no hay prueba de que se haya vendido.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No vigente",
    "verificationStatus": "El enlace correcto de Argenprop (aviso 20559576) y la ficha sindicada de Inmoclick devolvieron 410 Gone el 27/11/2026. Se conserva como antecedente; no hay prueba de venta.",
    "geolocationStatus": "Pendiente: lote interno sin identificación parcelaria; registro histórico."
  },
  {
    "id": "propiedad-mixta-irlanda-2100-historico",
    "recordType": "Propiedad mixta · dos viviendas y terreno",
    "name": "Irlanda al 2100 · dos casas y terreno · publicaciones con precio divergente",
    "locality": "La Reja",
    "address": "Irlanda al 2100, La Reja Grande, La Reja, Moreno",
    "geocodeDisabled": true,
    "source": "https://www.argenprop.com/casa-en-venta-en-la-reja-grande-7-ambientes--12518206",
  sourceAlternates: [{url:"https://platastar.com/propiedad/terreno-de-200-m2-en-venta-en-moreno-98dd7e22",label:"Ficha de PlataStar retirada el 19/11/2026; la cabecera decía 200 m² y el detalle completo no estaba visible."}],
    "agency": "VREMONT R. Barral e Hijos",
    "contact": "Paula K. Barral Cabali, matrícula 2990; contacto mediante Argenprop/VREMONT; teléfono parcialmente visible.",
    "price": "USD 70.000 en cabecera; USD 55.000 en descripción",
    "currency": "USD",
    "landSurfaceM2": 600,
    "coveredSurfaceM2": 200,
    "surfaceNote": "La ficha directa de Argenprop informa 600 m² de terreno y 200 m² cubiertos; son tres terrenos y dos viviendas independientes.",
    "publicationDate": "Fecha de publicación no informada en la ficha directa; indexada en noviembre de 2026.",
    "observations": "Venta en block de dos casas independientes y un terreno adicional, sobre tres parcelas que suman 600 m²; 200 m² cubiertos, cinco dormitorios, tres baños y siete ambientes según la cabecera. Una vivienda se describe en buen estado y la otra requiere acondicionamiento; se menciona posible uso de local más vivienda o para dos familias. Contradicción de precio: cabecera USD 70.000 y texto USD 55.000. PlataStar retiró una ficha relacionada el 19/11/2026; Argenprop conserva una ficha directa accesible el 27/11/2026. Solicitar precio único, partidas de los tres lotes, títulos y planos.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "Pendiente de revalidación",
    "verificationStatus": "Ficha directa de Argenprop accesible el 27/11/2026: USD 70.000 en cabecera y USD 55.000 en descripción, 600 m² de terreno y 200 m² cubiertos. Una ficha de PlataStar relacionada fue retirada el 19/11/2026. Precio, identidad de las tres parcelas y disponibilidad requieren confirmación directa.",
    "geolocationStatus": "Pendiente: esquina y conjunto de tres parcelas; no asignar un único punto parcelario sin nomenclaturas catastrales."
  },
  {
    "id": "casa-blas-parera-1100-historica",
    "recordType": "Casa individual · antecedente histórico",
    "name": "Casa 3 ambientes · Blas Parera 1100",
    "locality": "Moreno",
    "address": "Blas Parera 1100, Moreno",
    "geocodeQuery": "Blas Parera 1100, Moreno, Buenos Aires",
    "source": "https://plataplace.com/propiedad/casa-de-3-ambientes-en-venta-en-moreno-3162f1ff",
    "agency": "Anunciante no identificado en la ficha retirada",
    "contact": "No visible en la ficha retirada.",
    "price": "USD 69.000",
    "currency": "USD",
    "landSurfaceM2": null,
    "coveredSurfaceM2": 95,
    "surfaceNote": "114 m² totales y 95 m² cubiertos según el resultado indexado; superficie de terreno no separada.",
    "publicationDate": "Publicado el 31/10/2026; retirado el 26/11/2026.",
    "observations": "La ficha de PlataPlace indica que el aviso ya no está disponible y registra su retiro el 26/11/2026. Se conserva el precio y las superficies indexadas como antecedente; no se presume venta.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No vigente",
    "verificationStatus": "PlataPlace informa retiro del aviso el 26/11/2026. Registro histórico, sin afirmar venta.",
    "geolocationStatus": "Pendiente: registro histórico; no se asigna coordenada nueva."
  },
  {
    "id": "casa-zeballos-1900-historica",
    "recordType": "Casa individual · publicaciones divergentes en la misma altura",
    "name": "Zeballos 1900 · casa en La Reja · dos avisos con datos incompatibles",
    "locality": "La Reja",
    "address": "Zeballos 1900, La Reja, Moreno",
    "geocodeDisabled": true,
    "source": "https://plataplace.com/propiedad/casa-de-5-ambientes-en-venta-en-moreno-1d157764",
  sourceAlternates: [{url:"https://plataplace.com/propiedad/casa-de-3-ambientes-en-venta-en-moreno-e30e0a67",label:"Aviso anterior retirado el 05/11/2026: USD 49.000, 400 m² totales y 120 m² cubiertos; podría ser otra parcela en la misma altura."}],
    "agency": "Sonia Lo Bruno Propiedades (aviso actual en PlataPlace); aviso anterior atribuido a RE/MAX Argentina.",
    "contact": "Sonia Lo Bruno Propiedades · formulario de PlataPlace; teléfono no visible. Aviso anterior: contacto María Belén Giuffrida.",
    "price": "USD 120.000 (aviso activo); antecedente USD 49.000 retirado",
    "currency": "USD",
    "landSurfaceM2": 500,
    "coveredSurfaceM2": 100,
    "surfaceNote": "Aviso activo: 500 m² totales y 100 m² cubiertos. Aviso retirado de la misma altura: 400 m² totales y 120 m² cubiertos; no se sabe si es la misma parcela.",
    "publicationDate": "Aviso actual publicado el 21/10/2026; aviso anterior publicado el 08/10/2026 y retirado el 05/11/2026.",
    "observations": "La publicación actual describe un chalet de dos plantas, tres dormitorios, dos baños, pileta y cochera sobre lote de 500 m², con 100 m² cubiertos; expensas USD 351/mes. Una publicación anterior en la misma altura, retirada el 05/11/2026, ofrecía una casa de tres ambientes por USD 49.000, con 400 m² totales y 120 m² cubiertos. Las superficies, ambientes, precio y corredor son incompatibles; podrían ser dos parcelas distintas o un error de dirección. No se fusiona como misma propiedad hasta cotejar fotos, nomenclatura y títulos.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "Pendiente de revalidación",
    "verificationStatus": "PlataPlace muestra un aviso activo publicado el 21/10/2026 a USD 120.000, con 500 m² totales y 100 m² cubiertos. Otro aviso en Zeballos 1900 fue retirado el 05/11/2026 y publicaba USD 49.000, 400 m² totales y 120 m² cubiertos. Sin identificación parcelaria no se puede confirmar si es la misma propiedad; revalidación necesaria.",
    "geolocationStatus": "Pendiente: la altura 1900 reúne avisos con superficies y características distintas; no asignar coordenada parcelaria hasta identificar la parcela."
  }
]);



// Nuevas altas y antecedentes de la revisión del 27/11/2026.
publishedProperties.push(...[
  {
    "id": "terreno-canada-alsina-1250-industrial",
    "recordType": "Terreno individual · uso industrial anunciado",
    "name": "Canadá y Alsina 0 · lote pasante de 1.250 m²",
    "locality": "La Reja",
    "address": "Intersección de Canadá y Alsina, frente al Parque Industrial de La Reja, Moreno",
    "geocodeDisabled": true,
    "source": "https://platastar.com/propiedad/terreno-de-1250-m2-en-venta-en-moreno-7cb6f3ff",
    "agency": "RE/MAX Estudio",
    "contact": "Elsa Samudio · RE/MAX Estudio; contacto mediante PlataStar.",
    "price": "USD 124.000",
    "currency": "USD",
    "landSurfaceM2": 1250,
    "coveredSurfaceM2": null,
    "publicationDate": "11/11/2026",
    "observations": "Lote pasante con dos frentes extensos, frente al Parque Industrial de La Reja y a tres cuadras de Acceso Oeste. El anunciante lo orienta a galpones, depósitos, logística o emprendimiento comercial; declara financiación y apto crédito. El uso industrial es del aviso y no sustituye zonificación/certificado municipal. La dirección es una intersección sin numeración exacta.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "verificationStatus": "Ficha de PlataStar/RE/MAX Estudio accesible el 27/11/2026; publicada el 11/11/2026 y vista el 26/11/2026. Precio y superficie visibles; disponibilidad, título y zonificación no confirmados.",
    "geolocationStatus": "Pendiente: intersección sin número; no asignar punto parcelario."
  },
  {
    "id": "terreno-intendente-corvalan-1600-390",
    "recordType": "Terreno individual",
    "name": "Intendente Corvalán 1600 · lote de 390 m²",
    "locality": "Moreno",
    "address": "Intendente Corvalán 1600, Moreno",
    "geocodeQuery": "Intendente Corvalan 1600, Moreno, Buenos Aires",
    "source": "https://platastar.com/propiedad/terreno-de-390-m2-en-venta-en-moreno-6c5e909f",
    "agency": "RE/MAX Vita",
    "contact": "Julieta Ninin · RE/MAX Vita; contacto mediante PlataStar.",
    "price": "USD 35.000",
    "currency": "USD",
    "landSurfaceM2": 390,
    "coveredSurfaceM2": null,
    "publicationDate": "03/08/2026",
    "observations": "Lote de 10 m de frente por 39 m de fondo, a siete cuadras de Av. Justo Daract. La plataforma indica que el uso del terreno no está informado. Publicación de casi cuatro meses; revalidar precio y disponibilidad antes de considerarlo activo.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "Pendiente de revalidación",
    "verificationStatus": "Ficha de PlataStar accesible; publicada el 03/08/2026 y vista el 11/11/2026. Precio y medidas visibles; uso urbanístico y disponibilidad requieren confirmación.",
    "geolocationStatus": "Pendiente: Georef debe devolver coincidencia inequívoca para la dirección publicada."
  },
  {
    "id": "terreno-marmol-648-1200",
    "recordType": "Terreno individual · descripción incompleta",
    "name": "Mármol 648 · lote de 1.200 m²",
    "locality": "Moreno",
    "address": "Mármol 648, Moreno",
    "geocodeQuery": "Marmol 648, Moreno, Buenos Aires",
    "source": "https://platastar.com/propiedad/terreno-de-1200-m2-en-venta-en-moreno-c6ae1546",
    "agency": "Century 21 Argentina · Century 21 Build It Up S.R.L.",
    "contact": "Century 21 Build It Up S.R.L. · formulario de PlataStar; persona y teléfono no visibles. La descripción menciona Pablo Javier Stodart Bienes Raíces.",
    "price": "USD 115.000",
    "currency": "USD",
    "landSurfaceM2": 1200,
    "coveredSurfaceM2": null,
    "publicationDate": "09/03/2026",
    "observations": "La ficha publica únicamente dirección, superficie y precio; el texto descriptivo es muy breve y no indica uso, frente, fondo, servicios ni normativa. Visto en la fuente el 23/11/2026. Por antigüedad de ocho meses y falta de información, solicitar revalidación y documentación antes de evaluar.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "Pendiente de revalidación",
    "verificationStatus": "Ficha de PlataStar/Century 21 accesible el 27/11/2026; publicada el 09/03/2026 y vista el 23/11/2026. Precio USD 115.000 y superficie 1.200 m²; uso y características sin informar; disponibilidad no confirmada.",
    "geolocationStatus": "Pendiente: Georef debe confirmar la dirección; no se publica parcela ni frente."
  },
  {
    "id": "terreno-miero-3751-7100-historico",
    "recordType": "Fracción de terreno · antecedente histórico retirado",
    "name": "Miero 3751 · fracción con superficie contradictoria",
    "locality": "La Reja",
    "address": "Miero 3751, La Reja, Moreno",
    "geocodeQuery": "Miero 3751, La Reja, Moreno, Buenos Aires",
    "source": "https://platastar.com/propiedad/terreno-de-200-m2-en-venta-en-moreno-6c7aaca3",
    "agency": "VREMONT R. Barral e Hijos",
    "contact": "Paula K. Barral Cabali · VREMONT; contacto no revalidado tras retiro.",
    "price": "USD 320.000",
    "currency": "USD",
    "landSurfaceM2": null,
    "coveredSurfaceM2": null,
    "surfaceNote": "La cabecera titula 200 m², mientras resultados indexados de la descripción mencionan una fracción de 7.100 m²; no se adopta ninguna superficie como confirmada.",
    "publicationDate": "Publicado el 29/09/2026; retirado el 19/11/2026.",
    "observations": "La ficha fue retirada el 19/11/2026. Antes de su retiro, el aviso mostraba USD 320.000 y una contradicción entre 200 m² en cabecera y 7.100 m² en la descripción. También había discrepancia en expensas: USD 444 en el panel y ARS 700.000 en el texto. Se conserva como antecedente histórico, sin afirmar venta ni superficie.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No vigente",
    "verificationStatus": "PlataStar informa que el aviso se publicó el 29/09/2026 y fue retirado el 19/11/2026. Precio y superficie presentaban contradicciones; no se presume que haya sido vendido.",
    "geolocationStatus": "Pendiente: dirección pública, pero aviso retirado y superficie sin resolver."
  },
  {
    "id": "casa-maipu-1341-el-casco-historica",
    "recordType": "Casa individual en barrio cerrado · publicación reactivada",
    "name": "Maipú 1341 · El Casco de Moreno · casa con pileta",
    "locality": "Moreno Centro",
    "address": "Maipú 1300 (cabecera de PlataPlace) / Maipú 1341 (descripción), lote 45, El Casco de Moreno",
    "geocodeQuery": "Maipu 1341, El Casco de Moreno, Moreno, Buenos Aires",
    "geocodeDisabled": true,
    "source": "https://plataplace.com/propiedad/casa-de-5-ambientes-en-venta-en-moreno-0c28e77c",
    "sourceAlternates": [
      {
        "url": "https://www.inmuebles.clarin.com/casa-en-venta-en-el-casco-de-moreno-6-ambientes--20725083",
        "label": "Publicación anterior de la misma dirección; devolvió 410 Gone el 27/11/2026."
      },
      {
        "url": "https://proppies.app/propiedad/buenos-aires/moreno/casa-6-amb-en-venta-en-el-casco-de-moreno-59300561",
        "label": "Proppies indicaba que el aviso anterior ya no estaba disponible; último precio USD 280.000 el 22/10/2026."
      }
    ],
    "agency": "RE/MAX Vita",
    "contact": "Nicolás Kardahi · responsable Silvana Inés Palini, CPI 8862 / CMCPM 2955; teléfono no visible en las fichas consultadas.",
    "price": "USD 280.000; expensas publicadas USD 497/mes",
    "currency": "USD",
    "landSurfaceM2": 600,
    "coveredSurfaceM2": 220,
    "publicationDate": "20/10/2026 (nueva ficha de PlataPlace); aviso anterior indexado hasta 22/10/2026.",
    "observations": "Nueva ficha de 5 ambientes publicada en PlataPlace para El Casco de Moreno: la cabecera indica Maipú 1300 y la descripción Maipú 1341, lote 45. Coincide con el antecedente en lote de 600 m², 220 m² cubiertos, cuatro dormitorios en suite, cuatro baños, pileta y dos cocheras; se agrupa provisionalmente como probable reactivación del mismo activo, no como identidad parcelaria confirmada. Expensas publicadas: USD 497/mes. La ficha anterior de Inmuebles Clarín y su copia en Proppies dejaron de estar disponibles; el aviso anterior describía seis ambientes y el nuevo cinco.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "verificationStatus": "PlataPlace muestra una nueva ficha activa publicada el 20/10/2026 y consultada el 27/11/2026, con USD 280.000, lote 600 m², 220 m² cubiertos y expensas USD 497/mes. La cabecera indica Maipú 1300 y el cuerpo Maipú 1341, lote 45; la publicación anterior de Inmuebles Clarín devolvió 410 Gone. La coincidencia de superficies y características sugiere reactivación del mismo activo, pero la identidad de parcela y la disponibilidad no están confirmadas.",
    "geolocationStatus": "Pendiente: conflicto de altura Maipú 1300/1341; marcador deshabilitado hasta confirmar dirección y lote con el anunciante o documentación catastral."
  },
  {
    "id": "casa-ituzaingo-1400-723",
    "recordType": "Casa individual + dos terrenos linderos",
    "name": "Ituzaingó 1400 · casa y dos terrenos adicionales",
    "locality": "Moreno",
    "address": "Ituzaingó 1400, Moreno",
    "geocodeQuery": "Ituzaingo 1400, Moreno, Buenos Aires",
    "source": "https://www.argenprop.com/casa-en-venta-en-moreno-5-ambientes--20937156",
    "sourceAlternates": [
      {
        "url": "https://plataplace.com/propiedad/casa-de-5-ambientes-en-venta-en-moreno-77606a04",
        "label": "PlataPlace: aviso activo publicado 21/11/2026; coincide en dirección, USD 150.000, 723 m² de terreno y 100 m² cubiertos."
      }
    ],
    "agency": "RE/MAX Grammar",
    "contact": "Florencia Acosta · responsable Juan Alberto Crescimone, CMCPSM 2821 / CPI 9670; teléfono parcialmente visible.",
    "price": "USD 150.000",
    "currency": "USD",
    "landSurfaceM2": 723,
    "coveredSurfaceM2": 100,
    "publicationDate": "21/11/2026 (PlataPlace); Argenprop mostraba la ficha aproximadamente cinco días antes del 27/11/2026.",
    "observations": "La publicación ofrece conjuntamente tres terrenos en esquina, casa principal de tres dormitorios y dos baños sobre parcela central de 280 m², más quincho con baño y depósito en uno de los lotes laterales. Superficie total de terreno 723 m², 100 m² cubiertos, 110 m² totales de construcción declarados y dos cocheras. Antigüedad 33 años; servicios de agua corriente, electricidad, gas natural e internet según el aviso.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "verificationStatus": "Argenprop y PlataPlace muestran publicaciones accesibles el 27/11/2026; PlataPlace registra aviso activo publicado el 21/11/2026. Ambas fichas coinciden en USD 150.000, 723 m² de terreno y 100 m² cubiertos. Disponibilidad y venta conjunta de las tres parcelas no confirmadas.",
    "geolocationStatus": "Pendiente: Georef debe devolver coincidencia inequívoca para la dirección publicada."
  },
  {
    "id": "casa-antartida-argentina-1000-jurisdiccion-pendiente",
    "recordType": "Casa individual · jurisdicción territorial en conflicto",
    "name": "Antártida Argentina al 1000 · casa con posibilidad de ampliación",
    "locality": "Moreno / Merlo · jurisdicción a confirmar",
    "address": "Antártida Argentina al 1000, entre Urquiza y Larrea; partido a confirmar",
    "geocodeDisabled": true,
    "source": "https://coldwellbankerseniority.com/propiedad/venta-casa-3-ambientes-con-posibilidad-de-ampliacion-jardin-cochera-en-moreno--4705609",
    "sourceAlternates": [
      {
        "url": "https://www.argenprop.com/casa-en-venta-en-moreno-5-ambientes--20470115",
        "label": "Argenprop la clasifica en Moreno: USD 149.000, terreno 200 m², cubierta 134,17 m²."
      },
      {
        "url": "https://www.zonaprop.com.ar/propiedades/clasificado/veclcain-venta-casa-3-ambientes-con-posibilidad-de-ampliacion-60127525.html",
        "label": "Zonaprop publica Antártida Argentina al 1000; el encabezado la sitúa en Merlo y la descripción dice Moreno."
      }
    ],
    "agency": "Coldwell Banker Seniority",
    "contact": "Agustina Lembo · agustina.lembo@coldwellbanker.com.ar · +54 11 5622-3250.",
    "price": "USD 149.000",
    "currency": "USD",
    "landSurfaceM2": 200,
    "coveredSurfaceM2": 134.17,
    "publicationDate": "Publicado hace aproximadamente 2 meses; fecha exacta no visible en la ficha directa.",
    "observations": "Casa de dos plantas sobre lote 10 × 20 m, con 134,17 m² cubiertos y 13,67 m² semicubiertos, dos dormitorios, dos baños, cochera y jardín. La ficha de Coldwell Banker la ubica en Merlo, mientras Argenprop y otras publicaciones la clasifican en Moreno; no la considero definitivamente dentro del Partido de Moreno hasta verificar jurisdicción catastral. El texto menciona agua de pozo con bomba sumergible, aunque otros portales listan servicios de agua/cloaca; verificar conexiones.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "Pendiente de revalidación",
    "verificationStatus": "Ficha de Coldwell Banker Seniority y publicaciones sindicadas accesibles; precio USD 149.000 y superficies coincidentes. Las fuentes discrepan entre Merlo y Moreno para la misma dirección; no se incluye como oportunidad confirmada del Partido de Moreno hasta verificar la jurisdicción.",
    "geolocationStatus": "Pendiente: no geocodificar hasta resolver si la parcela pertenece a Moreno o Merlo."
  },
  {
    "id": "casa-soule-rafael-nunez-300-dos-unidades",
    "recordType": "Propiedad mixta · casa principal y departamento independiente",
    "name": "Soule entre Rafael y Núñez · dos propiedades en un predio",
    "locality": "Moreno",
    "address": "Soule entre Rafael y Núñez, Moreno",
    "geocodeDisabled": true,
    "source": "https://plataplace.com/propiedad/casa-de-5-ambientes-en-venta-en-moreno-81a39bba",
    "surfaceNote": "La ficha publica 300 m² de superficie total y 180 m² cubiertos; no desglosa por separado la superficie del terreno.",
    "agency": "Arcieri y Sana Inmobiliaria",
    "contact": "Arcieri y Sana Inmobiliaria · formulario de PlataPlace; teléfono no visible.",
    "price": "USD 72.000",
    "currency": "USD",
    "landSurfaceM2": null,
    "coveredSurfaceM2": 180,
    "publicationDate": "20/11/2026",
    "observations": "Dos unidades en un mismo predio: casa principal de tres ambientes y departamento de dos ambientes. Cinco ambientes, tres dormitorios, dos baños y una cochera según la ficha. La ficha publica 300 m² de superficie total y 180 m² cubiertos, pero no desglosa superficie del terreno por separado. El anunciante declara títulos perfectos y apta crédito. Dirección sin número; geolocalización pendiente. Nueva publicación en Marcelino Soule al 1200, USD 37.000 y 195 m², podría estar en el mismo corredor, pero superficie y descripción difieren. Se conserva separada con vínculo de posible duplicado hasta cotejar parcela.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "verificationStatus": "PlataPlace registra aviso activo publicado el 20/11/2026 y visto el 27/11/2026. Precio USD 72.000, 300 m² totales y 180 m² cubiertos; disponibilidad no confirmada.",
    "geolocationStatus": "Pendiente: dirección sin altura; no asignar coordenada parcelaria."
  }
]);

publishedProperties.push(...[
  {
    "lastCheckedAt": "2026-11-27",
    "lat": null,
    "lng": null,
    "availabilityStatus": "No confirmada",
    "id": "casa-aristobulo-del-valle-1600-560",
    "recordType": "Casa individual · dos viviendas en un mismo lote",
    "name": "Aristóbulo del Valle al 1600 · casa principal y segunda vivienda",
    "locality": "Moreno",
    "address": "Aristóbulo del Valle al 1600, Moreno",
    "source": "https://www.zonaprop.com.ar/propiedades/clasificado/veclcain-casa-4-ambientes-mas-casa-2-ambientes-sobre-gran-lote-60809400.html",
    "agency": "J. Aguilar Brokers Inmobiliarios",
    "contact": "Julián Aguilar Amat, CMCPSI 6737 / CUCICBA 7839; consultas por Zonaprop; teléfono no visible.",
    "price": "USD 105.000",
    "currency": "USD",
    "landSurfaceM2": null,
    "coveredSurfaceM2": 120,
    "surfaceNote": "560 m² totales y 120 m² cubiertos; no desglosa terreno. Incluye segunda casa de 2 ambientes sin superficie individual.",
    "publicationDate": "Proppies indica publicada hoy al 27/11/2026.",
    "observations": "Casa principal de 4 ambientes, 2 dormitorios, 1 baño y 4 cocheras, más vivienda secundaria de 2 ambientes. Confirmar si los 560 m² incluyen ambas construcciones y superficie parcelaria real.",
    "geocodeQuery": "Aristóbulo del Valle 1600, Moreno, Buenos Aires",
    "geolocationStatus": "Pendiente: dirección publicada, sin coordenadas verificadas.",
    "verificationStatus": "Zonaprop accesible 27/11/2026; Proppies indica publicación del día. Disponibilidad no confirmada."
  },
  {
    "lastCheckedAt": "2026-11-27",
    "lat": null,
    "lng": null,
    "availabilityStatus": "No confirmada",
    "id": "casa-eugenia-ottone-asconape-3300-300",
    "recordType": "Casa individual · a refaccionar",
    "name": "Eugenia Ottone de Asconape al 3300 · casa a refaccionar",
    "locality": "Moreno",
    "address": "Eugenia Ottone de Asconape al 3300, Moreno",
    "source": "https://www.zonaprop.com.ar/propiedades/clasificado/veclcain-venta-casa-4-ambientes-cochera-moreno-60509809.html",
    "sourceAlternates": [
      {
        "url": "https://proppies.app/propiedad/buenos-aires/moreno/casa-4-amb-en-venta-en-moreno-63799353",
        "label": "Ficha sindicada: publicación hace 29 días y contacto público."
      }
    ],
    "agency": "Cultura Inmobiliaria / Paula Chaves",
    "contact": "Paula Noemí Chaves, CMCPM 3076 / CPI 9696; WhatsApp +54 11 6551-0342.",
    "price": "USD 40.000",
    "currency": "USD",
    "landSurfaceM2": 300,
    "coveredSurfaceM2": 200,
    "surfaceNote": "Lote 300 m² (10 × 30 m), 200 m² cubiertos.",
    "publicationDate": "Proppies indica publicada hace 29 días al 27/11/2026.",
    "observations": "2 dormitorios, 1 baño, 1 cochera, parrilla y depósito/galpón; se anuncia a refaccionar. Verificar estado estructural, servicios, planos y título.",
    "geocodeQuery": "Eugenia Ottone de Asconape 3300, Moreno, Buenos Aires",
    "geolocationStatus": "Pendiente: dirección publicada; sin coordenadas verificadas.",
    "verificationStatus": "Zonaprop accesible 27/11/2026; Proppies informa publicación hace 29 días. Disponibilidad no confirmada."
  },
  {
    "lastCheckedAt": "2026-11-27",
    "lat": null,
    "lng": null,
    "availabilityStatus": "No confirmada",
    "id": "casa-leandro-alem-carpintero-pedro-mena-263",
    "recordType": "Casa individual",
    "name": "Leandro N. Alem entre El Carpintero y Pedro de Mena · casa de 3 dormitorios",
    "locality": "Moreno",
    "address": "Leandro N. Alem, entre El Carpintero y Pedro de Mena; sin altura",
    "source": "https://www.zonaprop.com.ar/propiedades/clasificado/veclcain-casa-en-venta-3-dorm.-1-bano-cocheras-263-60595631.html",
    "sourceAlternates": [
      {
        "url": "https://proppies.app/propiedad/buenos-aires/moreno/casa-4-amb-en-venta-en-moreno-65784239",
        "label": "Ficha sindicada: publicada hace 25 días."
      }
    ],
    "agency": "Yacoub",
    "contact": "WhatsApp +54 221 696-3853.",
    "price": "USD 89.000",
    "currency": "USD",
    "landSurfaceM2": 263,
    "coveredSurfaceM2": 105,
    "surfaceNote": "263 m² totales y 105 m² cubiertos.",
    "publicationDate": "Proppies indica publicada hace 25 días al 27/11/2026.",
    "observations": "3 dormitorios, 1 baño y 2 cocheras; antigüedad 27 años. Ubicación entre calles, sin altura ni nomenclatura. Posible solapamiento con antecedente histórico Alem 1700; mantener separado.",
    "potentialDuplicateOf": "casa-leandro-n-alem-1700-historico",
    "geocodeDisabled": true,
    "geolocationStatus": "Pendiente: ubicación por calles transversales.",
    "verificationStatus": "Zonaprop accesible 27/11/2026; Proppies indica publicación hace 25 días. Disponibilidad no confirmada."
  },
  {
    "lastCheckedAt": "2026-11-27",
    "lat": null,
    "lng": null,
    "availabilityStatus": "No confirmada",
    "id": "casa-jose-maria-paz-cabildo-emilio-mitre-400",
    "recordType": "Casa individual",
    "name": "José María Paz entre Cabildo y Emilio Mitre · casa de 4 dormitorios",
    "locality": "Moreno",
    "address": "José María Paz entre Cabildo y Emilio Mitre; sin altura",
    "source": "https://www.zonaprop.com.ar/propiedades/clasificado/veclcain-casa-en-venta-4-dorm.-2-banos-cochera-400-60800250.html",
    "sourceAlternates": [
      {
        "url": "https://proppies.app/propiedad/buenos-aires/moreno/casa-5-amb-en-venta-en-moreno-76025867",
        "label": "Ficha sindicada publicada el 27/11/2026."
      }
    ],
    "agency": "Yacoub",
    "contact": "WhatsApp +54 221 696-3853.",
    "price": "USD 120.000",
    "currency": "USD",
    "landSurfaceM2": 400,
    "coveredSurfaceM2": 200,
    "surfaceNote": "400 m² totales y 200 m² cubiertos; sin mensura.",
    "publicationDate": "Proppies indica publicada hoy al 27/11/2026.",
    "observations": "4 dormitorios, 2 baños, cochera y pileta. Confirmar dirección exacta, superficie parcelaria y servicios.",
    "geocodeDisabled": true,
    "geolocationStatus": "Pendiente: solo se publican calles transversales.",
    "verificationStatus": "Zonaprop accesible 27/11/2026; Proppies indica publicación del día. Disponibilidad no confirmada."
  },
  {
    "lastCheckedAt": "2026-11-27",
    "lat": null,
    "lng": null,
    "availabilityStatus": "No confirmada",
    "id": "casa-general-hornos-axteca-los-olmos-500",
    "recordType": "Casa individual",
    "name": "General Hornos entre Axteca y Los Olmos · casa de 4 dormitorios",
    "locality": "Moreno",
    "address": "General Hornos entre Axteca y Los Olmos; sin altura",
    "source": "https://www.zonaprop.com.ar/propiedades/clasificado/veclcain-casa-en-venta-4-dorm.-3-banos-moreno-60809187.html",
    "sourceAlternates": [
      {
        "url": "https://proppies.app/propiedad/buenos-aires/moreno/casa-5-amb-en-venta-en-moreno-76024994",
        "label": "Ficha sindicada publicada el 27/11/2026."
      }
    ],
    "agency": "Yacoub",
    "contact": "WhatsApp +54 221 696-3853.",
    "price": "USD 165.000",
    "currency": "USD",
    "landSurfaceM2": 500,
    "coveredSurfaceM2": 200,
    "surfaceNote": "500 m² totales y 200 m² cubiertos; superficie parcelaria no cotejada.",
    "publicationDate": "Proppies indica publicada hoy al 27/11/2026.",
    "observations": "4 dormitorios, 3 baños, 1 cochera y antigüedad 15 años. Ubicación por calles transversales; no confundir con lotes de Prados del Oeste al 2800.",
    "geocodeDisabled": true,
    "geolocationStatus": "Pendiente: sin altura ni parcela exacta.",
    "verificationStatus": "Zonaprop accesible 27/11/2026; Proppies indica publicación del día. Disponibilidad no confirmada."
  },
  {
    "lastCheckedAt": "2026-11-27",
    "lat": null,
    "lng": null,
    "availabilityStatus": "No confirmada",
    "id": "casa-don-segundo-sombra-1700-281",
    "recordType": "Casa individual",
    "name": "Don Segundo Sombra 1700 · casa de 3 ambientes",
    "locality": "Moreno",
    "address": "Don Segundo Sombra 1700, Moreno",
    "source": "https://www.zonaprop.com.ar/propiedades/clasificado/veclcain-venta-casa-en-moreno-60746271.html",
    "sourceAlternates": [
      {
        "url": "https://proppies.app/propiedad/buenos-aires/moreno/casa-3-amb-en-venta-en-moreno-76018408",
        "label": "Ficha sindicada publicada el 27/11/2026."
      }
    ],
    "agency": "RE/MAX Naval / RAU S.R.L.",
    "contact": "Azucena Arevalos; responsables María Montserrat Vera, CSI 5971, y Gustavo Alejandro Browarski, CPI 1674; WhatsApp +54 11 3273-2160.",
    "price": "USD 41.900",
    "currency": "USD",
    "landSurfaceM2": 281,
    "coveredSurfaceM2": 164,
    "surfaceNote": "281 m² totales y 164 m² cubiertos.",
    "publicationDate": "Proppies indica publicada hoy al 27/11/2026.",
    "observations": "2 dormitorios, 1 baño, 2 cocheras y 46 años de antigüedad. Verificar título, mantenimiento y superficie cubierta.",
    "geocodeQuery": "Don Segundo Sombra 1700, Moreno, Buenos Aires",
    "geolocationStatus": "Pendiente: dirección publicada; sin coordenadas verificadas.",
    "verificationStatus": "Zonaprop accesible 27/11/2026; Proppies indica publicación del día. Disponibilidad no confirmada."
  },
  {
    "lastCheckedAt": "2026-11-27",
    "lat": null,
    "lng": null,
    "availabilityStatus": "No confirmada",
    "id": "casa-marcelino-soule-1200-195",
    "recordType": "Casa individual · posible solapamiento de dirección",
    "name": "Marcelino Soule al 1200 · casa de 3 ambientes",
    "locality": "Moreno",
    "address": "Marcelino Soule al 1200, Moreno",
    "source": "https://www.zonaprop.com.ar/propiedades/clasificado/veclcain-casa-3-ambientes-en-venta-moreno-60809656.html",
    "agency": "Ramirez Mandatos y Negocios Inmobiliarios",
    "contact": "Hipólito Enrique Ramírez / Carolina Noelia Ramírez, COMARCOMGR 71/183; Hipólito Agustín Alejo Ramírez, CUCICBA 8496; formulario Zonaprop, sin teléfono visible.",
    "price": "USD 37.000",
    "currency": "USD",
    "landSurfaceM2": 195,
    "coveredSurfaceM2": null,
    "surfaceNote": "195 m² totales; medidas irregulares publicadas; superficie cubierta no informada.",
    "publicationDate": "Proppies indica publicada hoy al 27/11/2026.",
    "observations": "2 dormitorios, 1 baño, 1 cochera y 40 años. Posible solapamiento con otra publicación de calle Soule entre Rafael y Núñez (300 m² y dos unidades); superficies y descripción difieren.",
    "potentialDuplicateOf": "casa-soule-rafael-nunez-300-dos-unidades",
    "geocodeQuery": "Marcelino Soule 1200, Moreno, Buenos Aires",
    "geolocationStatus": "Pendiente: posible solapamiento con otra ficha del mismo corredor.",
    "verificationStatus": "Zonaprop accesible 27/11/2026; Proppies indica publicación del día. Cubierta no informada; posible duplicado pendiente."
  },
  {
    "lastCheckedAt": "2026-11-27",
    "lat": null,
    "lng": null,
    "availabilityStatus": "No confirmada",
    "id": "casa-zeballos-900-140",
    "recordType": "Casa / dúplex individual",
    "name": "Zeballos 900 · dúplex de 5 ambientes",
    "locality": "Moreno",
    "address": "Zeballos 900, Moreno",
    "source": "https://www.zonaprop.com.ar/propiedades/clasificado/veclcain-duplex-en-venta-en-moreno-60779323.html",
    "sourceAlternates": [
      {
        "url": "https://proppies.app/propiedad/buenos-aires/moreno/casa-5-amb-en-venta-en-moreno-75093985",
        "label": "Ficha sindicada publicada hace 3 días."
      }
    ],
    "agency": "RE/MAX GO / RAU S.R.L.",
    "contact": "German Torres Caceres; responsables Diego José Muiños, CMCPSI 5352, y Cristian Javier Alonso, CUCICBA 6252; WhatsApp +54 11 6275-2941.",
    "price": "USD 98.000",
    "currency": "USD",
    "landSurfaceM2": null,
    "coveredSurfaceM2": 100,
    "surfaceNote": "140 m² totales y 100 m² cubiertos; no desglosa terreno.",
    "publicationDate": "Proppies indica publicada hace 3 días al 27/11/2026.",
    "observations": "Cabecera 5 ambientes y descripción de 4 dormitorios, 1 baño y 1 toilette; 21 años. Construcción independiente al fondo sin superficie propia informada.",
    "geocodeQuery": "Zeballos 900, Moreno, Buenos Aires",
    "geolocationStatus": "Pendiente: dirección publicada; sin coordenadas verificadas.",
    "verificationStatus": "Zonaprop accesible 27/11/2026; Proppies indica publicación hace 3 días. Disponibilidad no confirmada."
  },
  {
    "lastCheckedAt": "2026-11-27",
    "lat": null,
    "lng": null,
    "availabilityStatus": "No vigente",
    "id": "casa-leandro-n-alem-1700-historico",
    "recordType": "Casa individual · antecedente histórico no vigente",
    "name": "Leandro N. Alem 1700 · casa de 4 ambientes (retirada)",
    "locality": "Moreno",
    "address": "Leandro N. Alem 1700, Moreno",
    "source": "https://proppies.app/propiedad/buenos-aires/moreno/casa-4-amb-en-venta-en-moreno-65794693",
    "agency": "KT Gestión Inmobiliaria",
    "contact": "Karina Trus, CSM 2920; Proppies indica que ya no recibe consultas.",
    "price": "USD 119.900 (último precio 05/11/2026)",
    "currency": "USD",
    "landSurfaceM2": 754.29,
    "coveredSurfaceM2": 144,
    "surfaceNote": "754,29 m² totales; 144 m² cubiertos, 18 m² semicubiertos y 592,29 m² descubiertos.",
    "publicationDate": "Actualizada 25/10/2026; último precio 05/11/2026.",
    "observations": "Casa de 4 ambientes, 3 dormitorios, 2 baños, piscina y galpón. Proppies indica expresamente que ya no está disponible y no recibe consultas. Se conserva como antecedente.",
    "geocodeQuery": "Leandro N. Alem 1700, Moreno, Buenos Aires",
    "geolocationStatus": "Pendiente: dirección publicada, sin coordenadas verificadas.",
    "verificationStatus": "Proppies indica expresamente que ya no está disponible; último precio USD 119.900 al 05/11/2026. Registro histórico."
  },
  {
    "lastCheckedAt": "2026-11-27",
    "lat": null,
    "lng": null,
    "availabilityStatus": "No confirmada",
    "id": "terreno-mariano-moreno-lote1-650",
    "recordType": "Terreno individual · lote 1 de fraccionamiento anunciado",
    "name": "Nuevo loteo Mariano Moreno · lote 1 · 650,38 m²",
    "locality": "La Reja",
    "address": "Calle Mariano Moreno entre Gervasio Posadas y Av. Francisco Miero, La Reja, Moreno",
    "source": "https://inmoclick.com/252859-sabrina-peluso-inmobiliaria/inmuebles/2674/ficha/terreno-en-venta-en-mariano-moreno",
    "agency": "Sabrina Peluso Inmobiliaria, Col. 267 MGR",
    "contact": "Formulario Inmoclick; oficina Intendente Dr. Asseff 92; teléfono no visible.",
    "price": "USD 30.000 contado; anticipo desde USD 10.000 y saldo en cuotas, sin cronograma total.",
    "currency": "USD",
    "landSurfaceM2": 650.38,
    "coveredSurfaceM2": null,
    "surfaceNote": "Lote 1; 20,15 × 32,5 m, con ochava a ceder.",
    "publicationDate": "Inmoclick indica publicado hace 3 días al 27/11/2026.",
    "observations": "Nuevo fraccionamiento; se menciona gestión/factibilidad de electricidad ante Edenor para pilar, no instalación. No se publica aprobación municipal ni plano de subdivisión.",
    "geocodeDisabled": true,
    "geolocationStatus": "Pendiente: lote interno sin nomenclatura catastral.",
    "verificationStatus": "Inmoclick accesible 27/11/2026, publicada hace 3 días. Stock y aprobación no confirmados."
  },
  {
    "lastCheckedAt": "2026-11-27",
    "lat": null,
    "lng": null,
    "availabilityStatus": "No confirmada",
    "id": "terreno-mariano-moreno-lotes-2-3-4-7-8-801",
    "recordType": "Varios lotes individuales ofrecidos en un mismo aviso",
    "name": "Nuevo loteo Mariano Moreno · lotes 2, 3, 4, 7 y 8 · 801,30–805,80 m²",
    "locality": "La Reja",
    "address": "Calle Mariano Moreno entre Gervasio Posadas y Av. Francisco Miero, La Reja, Moreno",
    "source": "https://inmoclick.com/252859-sabrina-peluso-inmobiliaria/inmuebles/2675/ficha/terreno-en-venta-en-mariano-moreno",
    "agency": "Sabrina Peluso Inmobiliaria, Col. 267 MGR",
    "contact": "Formulario Inmoclick; oficina Intendente Dr. Asseff 92; teléfono no visible.",
    "price": "USD 35.000 por lote; anticipo desde USD 10.000 y saldo en cuotas.",
    "currency": "USD",
    "landSurfaceM2": null,
    "coveredSurfaceM2": null,
    "surfaceNote": "Lotes 2,3,7,8: 805,80 m² cada uno; lote 4: 801,30 m². No sumar como una fracción.",
    "publicationDate": "Inmoclick indica publicado hace 21 días al 27/11/2026.",
    "observations": "Un aviso agrupa cinco lotes internos. Confirmar disponibilidad y precio de cada parcela, plano aprobado y nomenclatura catastral.",
    "geocodeDisabled": true,
    "geolocationStatus": "Pendiente: lotes internos sin coordenadas parcelarias.",
    "verificationStatus": "Inmoclick accesible 27/11/2026, publicada hace 21 días. Stock y aprobación no confirmados."
  },
  {
    "lastCheckedAt": "2026-11-27",
    "lat": null,
    "lng": null,
    "availabilityStatus": "No confirmada",
    "id": "desarrollo-loteo-mariano-moreno-la-reja",
    "recordType": "Fraccionamiento residencial anunciado · aprobación no verificada",
    "name": "Nuevo fraccionamiento sobre calle Mariano Moreno · La Reja",
    "locality": "La Reja",
    "address": "Calle Mariano Moreno entre Gervasio Posadas y Av. Francisco Miero, La Reja, Moreno",
    "source": "https://inmoup.com.ar/252859-sabrina-peluso-inmobiliaria/inmuebles/1635/ficha/terreno-en-venta-en-mariano-moreno",
    "agency": "Sabrina Peluso Inmobiliaria, Col. 267 MGR",
    "contact": "Formulario Inmoclick/Inmoup; oficina Intendente Dr. Asseff 92; teléfono no visible.",
    "price": null,
    "currency": null,
    "landSurfaceM2": null,
    "coveredSurfaceM2": null,
    "surfaceNote": "Lotes individuales anunciados de 650,38 m²; 801,30–805,80 m²; y 925 m². No se publica superficie total ni cantidad total de lotes.",
    "observations": "Anuncio comercial de nuevo fraccionamiento; factibilidad/gestión eléctrica mencionada, no instalación. No se encontró plano aprobado, expediente municipal, infraestructura completa ni cronograma de obras. No clasificar como proyecto aprobado o en ejecución.",
    "geocodeDisabled": true,
    "geolocationStatus": "Pendiente: tramo de calle; polígono y lotes internos no identificados.",
    "verificationStatus": "Inmoup accesible 27/11/2026 y tres fichas Inmoclick del mismo fraccionamiento. Anuncio comercial verificado; aprobación y ejecución no."
  },
  {
    "lastCheckedAt": "2026-11-27",
    "lat": null,
    "lng": null,
    "availabilityStatus": "No confirmada",
    "id": "terreno-loteo-la-quebrada-copernico-200-300-financiado",
    "recordType": "Terreno individual en loteo · financiación anunciada",
    "name": "Loteo La Quebrada · Copérnico al 200 · 300 m² · oferta financiada",
    "locality": "Villa Zapiola / Paso del Rey",
    "address": "Copérnico al 200, Villa Zapiola, Paso del Rey, Moreno",
    "source": "https://www.argenprop.com/terreno-en-venta-en-villa-zapiola--18731701",
    "sourceAlternates": [
      {
        "url": "https://www.zonaprop.com.ar/propiedades/clasificado/vecltrin-loteo-la-quebrada-58012634.html",
        "label": "Otra ficha del loteo con anticipo y cuotas; lote interno no identificado."
      }
    ],
    "agency": "Melogno Propiedades",
    "contact": "Teléfono parcial +54 11 40…; formulario/WhatsApp del portal; número no completado.",
    "price": "USD 7.500 de anticipo + 36 cuotas de USD 700; no se publica total contractual.",
    "currency": "USD",
    "landSurfaceM2": 300,
    "coveredSurfaceM2": null,
    "surfaceNote": "300 m²; 12 m de frente por 24 m de fondo según aviso.",
    "observations": "El aviso dice listo para escriturar y posesión inmediata; informa electricidad. No publica lote, desarrollador, cantidad de lotes ni documentación municipal. Otra publicación del mismo loteo por USD 26.000 contado tiene código distinto; posible lote distinto o duplicado.",
    "potentialDuplicateOf": "terreno-loteo-la-quebrada-copernico-200-300-contado",
    "geocodeDisabled": true,
    "geolocationStatus": "Pendiente: calle y lote genérico, sin parcela individual.",
    "verificationStatus": "Argenprop accesible la última semana y consultada 27/11/2026. Anticipo y cuotas publicados; disponibilidad y parcela no confirmadas."
  },
  {
    "lastCheckedAt": "2026-11-27",
    "lat": null,
    "lng": null,
    "availabilityStatus": "No confirmada",
    "id": "terreno-loteo-la-quebrada-copernico-200-300-contado",
    "recordType": "Terreno individual en loteo · precio contado anunciado",
    "name": "Loteo La Quebrada · Copérnico al 200 · 300 m² · oferta contado",
    "locality": "Villa Zapiola / Paso del Rey",
    "address": "Copérnico al 200, Villa Zapiola, Paso del Rey, Moreno",
    "source": "https://www.buscainmueble.com/terreno-en-venta-en-villa-zapiola--18731662",
    "sourceAlternates": [
      {
        "url": "https://www.zonaprop.com.ar/propiedades/clasificado/vecltrin-loteo-la-quebrada-57972754.html",
        "label": "Otra publicación del loteo con precio contado; número de lote no informado."
      }
    ],
    "agency": "Melogno Propiedades",
    "contact": "Melogno Propiedades; teléfono parcial +54 11 40…; no se completa el número.",
    "price": "USD 26.000 contado",
    "currency": "USD",
    "landSurfaceM2": 300,
    "coveredSurfaceM2": null,
    "surfaceNote": "300 m²; medidas sindicadas 24 m de frente por 12 m de fondo.",
    "observations": "Mismo loteo y calle que la oferta financiada, pero código de aviso distinto y sin lote interno. Puede ser otro lote o segunda publicación del mismo; no contar dos parcelas confirmadas.",
    "potentialDuplicateOf": "terreno-loteo-la-quebrada-copernico-200-300-financiado",
    "geocodeDisabled": true,
    "geolocationStatus": "Pendiente: lote individual no identificado.",
    "verificationStatus": "Buscainmueble accesible en la revisión; USD 26.000 y 300 m² publicados. Identidad frente a otra oferta pendiente."
  },
  {
    "lastCheckedAt": "2026-11-27",
    "lat": null,
    "lng": null,
    "availabilityStatus": "Pendiente de revalidación",
    "id": "terreno-diario-la-prensa-general-savio-9200",
    "recordType": "Fracción de terreno · potencial loteo",
    "name": "Diario La Prensa y General Savio · fracción de 9.200 m²",
    "locality": "Moreno",
    "address": "Intersección de Diario La Prensa y General Savio, Moreno; sin numeración parcelaria",
    "source": "https://terreno.mercadolibre.com.ar/MLA-1799156701-terreno-fraccion-en-venta-moreno-_JM",
    "sourceAlternates": [
      {
        "url": "https://dambolena.com.ar/propiedad/terreno-venta-en-diario-la-prensa-y-general-savio--4627178",
        "label": "Ficha Dambolena; enlace 404 en revisión."
      },
      {
        "url": "https://www.argenprop.com/terreno-en-venta-en-centro-moreno--8091779",
        "label": "Ficha sindicada de la misma fracción."
      }
    ],
    "agency": "Dambolena",
    "contact": "Dambolena, identidad verificada en MercadoLibre; consultas por plataforma. Martín Dambolena, CMCPDJMGR 205 / CUCICBA 7176; teléfono oculto.",
    "price": "USD 400.000",
    "currency": "USD",
    "landSurfaceM2": 9200,
    "coveredSurfaceM2": null,
    "surfaceNote": "9.200 m²; frente 92,03 m y fondo 100 m según descripción.",
    "publicationDate": "MercadoLibre indica publicado hace 2 meses al 27/11/2026.",
    "observations": "Anuncio ideal para loteo; declara R4A, FOS 0,5 y FOT 0,8, pero también incluye indicadores R4B. No tratar zonificación como verificada. Acepta contado, permuta y financiación. Página Dambolena devolvió 404; MercadoLibre accesible.",
    "geocodeDisabled": true,
    "geolocationStatus": "Pendiente: intersección sin parcela; MercadoLibre publica altura 0.",
    "verificationStatus": "MercadoLibre accesible 27/11/2026, publicado hace 2 meses; USD 400.000 y 9.200 m². Ficha directa del corredor no disponible; zonificación y stock pendientes."
  },
  {
    "lastCheckedAt": "2026-11-27",
    "lat": null,
    "lng": null,
    "availabilityStatus": "Pendiente de revalidación",
    "id": "terreno-parque-industrial-reconquista-3420",
    "recordType": "Terreno industrial individual · oferta con precio ambiguo",
    "name": "Parque Industrial Reconquista · lote de 3.420 m² · Trujui",
    "locality": "Trujui",
    "address": "Camino del Buen Ayre y Acceso Oeste, Trujui, Moreno; lote interno no identificado",
    "source": "https://www.zonaprop.com.ar/propiedades/clasificado/vecltrin-terreno-en-venta-en-parque-industrial-reconquista-59179490.html",
    "agency": "Trigo Inmuebles Industriales",
    "contact": "Formulario Zonaprop; teléfono no expuesto.",
    "price": "USD 150 (así aparece; unidad no especificada)",
    "currency": "USD",
    "landSurfaceM2": 3420,
    "coveredSurfaceM2": null,
    "surfaceNote": "3.420 m² totales; lote interno no identificado.",
    "observations": "Anuncio describe parque de 80 ha, categorías I/II/III y posibilidad de construir 60%. Municipio informó 28/05/2025 que todos los lotes disponibles ya habían sido adquiridos. Podría ser reventa; confirmar titularidad, lote, unidad de precio y stock.",
    "sourceAlternates": [
      {
        "url": "https://www.moreno.gob.ar/noticia-detalle.php?id=6389",
        "label": "Fuente municipal 28/05/2025: todos los lotes disponibles ya adquiridos."
      }
    ],
    "geocodeDisabled": true,
    "geolocationStatus": "Pendiente: lote industrial interno sin identificación parcelaria.",
    "verificationStatus": "Zonaprop accesible 27/11/2026; precio USD 150 sin unidad. Fuente municipal informa lotes originales adquiridos; no se confirma reventa."
  },
  {
    "lastCheckedAt": "2026-11-27",
    "lat": null,
    "lng": null,
    "availabilityStatus": "No es una oferta de parcela",
    "id": "desarrollo-distrito-ecologico-roggero",
    "recordType": "Proyecto público urbano, ambiental y turístico · por etapas",
    "name": "Distrito Ecológico Roggero · plataforma de desarrollo urbano, ambiental y turístico",
    "locality": "Entorno del Dique Ing. Roggero, Partido de Moreno",
    "address": "Polígono delimitado por Ordenanza 7164/24; Av. de la Argentinidad, ribera del Río Reconquista, Lago San Francisco, Cañada del Bajo Hondo, calles Linares y Mercedes, Av. de las Montoneras y Av. Gral. San Martín.",
    "source": "https://iduar.moreno.gob.ar/distrito-ecologico-roggero/",
    "sourceAlternates": [
      {
        "url": "https://iduar.moreno.gob.ar/2025/08/12/distrito-ecologico-roggero-un-espacio-natural-para-descubrir/",
        "label": "IDUAR: primera etapa inaugurada 12/08/2025; área natural 550 ha."
      },
      {
        "url": "https://sibom.slyt.gba.gob.ar/bulletins/10934/contents/2082238",
        "label": "Ordenanza municipal 7164/24."
      },
      {
        "url": "https://www.gba.gob.ar/comirec/noticias/comirec_particip%C3%B3_de_la_inauguraci%C3%B3n_del_%E2%80%9Cdistrito_ecol%C3%B3gico_roggero%E2%80%9D",
        "label": "COMIREC: primera etapa inaugurada 10/12/2024."
      }
    ],
    "agency": "Municipalidad de Moreno · IDUAR",
    "contact": "administraciong_iduar@moreno.gov.ar",
    "price": null,
    "currency": null,
    "landSurfaceM2": null,
    "coveredSurfaceM2": null,
    "surfaceNote": "Área natural protegida de 550 ha según IDUAR 2025; no equivale a superficie total del distrito ni a parcelas comercializables.",
    "publicationDate": "Ordenanza 7164/24 del 13/06/2024; primera etapa inaugurada 12/08/2025.",
    "observations": "Proyecto público de desarrollo urbano, ambiental y turístico, con inversión compatible con protección natural. IDUAR informa encuentros con desarrolladores, beneficios impositivos y FonDER. Primera etapa inaugurada en 2025. No hay lotes individuales, precios ni inventario privado; no es oferta de parcela.",
    "geocodeDisabled": true,
    "geolocationStatus": "Pendiente: polígono normativo sin coordenadas parcelarias.",
    "verificationStatus": "Fuente oficial IDUAR accesible 27/11/2026; Ordenanza 7164/24 y comunicación oficial sobre primera etapa inaugurada en 2025."
  },
  {
    "lastCheckedAt": "2026-11-27",
    "lat": null,
    "lng": null,
    "availabilityStatus": "No vigente",
    "id": "terreno-prados-oeste2-lote132-800-historico",
    "recordType": "Terreno individual · antecedente histórico en barrio cerrado",
    "name": "Prados del Oeste II · lote interno 132 · 800 m² (aviso retirado)",
    "locality": "La Reja",
    "address": "General Hornos al 2800, Prados del Oeste II, La Reja, Moreno",
    "source": "https://www.zonaprop.com.ar/propiedades/clasificado/vecltrin-terreno-en-prados-del-oeste-2-59955023.html",
    "sourceAlternates": [
      {
        "url": "https://www.zonaprop.com.ar/terrenos-venta-moreno-menos-20000-dolar.html",
        "label": "Resultados indexados: lote 132, 800 m² y condiciones de precio."
      }
    ],
    "agency": "Sabrina Peluso Inmobiliaria, Col. 267 MGR",
    "contact": "Formulario Zonaprop; oficina Intendente Dr. Asseff 92; teléfono no visible.",
    "price": "USD 39.000 contado; financiación USD 20.000 + 12 cuotas, total publicado USD 41.000; encabezado USD 20.000.",
    "currency": "USD",
    "landSurfaceM2": 800,
    "coveredSurfaceM2": null,
    "surfaceNote": "Lote interno 132 de 800 m² según resultado indexado.",
    "observations": "Resultado describía lote 132, posesión inmediata y amenities. Enlace directo Zonaprop devolvió 410 el 27/11/2026; se conserva como antecedente, sin afirmar venta.",
    "geocodeDisabled": true,
    "geolocationStatus": "Pendiente: lote interno sin coordenada parcelaria.",
    "verificationStatus": "Resultado indexado con precio y superficie, pero enlace directo 410 el 27/11/2026. No presentar como oferta actual."
  }
]);


publishedProperties.push(...[
  {
    "id": "terreno-riccheri-638",
    "recordType": "Terreno individual",
    "name": "Lote sobre calle Teniente General Pablo Riccheri · 638 m²",
    "locality": "Moreno",
    "address": "Calle Teniente General Pablo Riccheri, Moreno; sin altura publicada",
    "source": "https://www.inmuebles.clarin.com/terreno-en-venta-en-moreno--20931907",
    "agency": "Leandro Procopio Negocios Inmobiliarios",
    "contact": "Contacto mediante Inmuebles Clarín; teléfono parcialmente visible como +54 11 30…",
    "price": "USD 18.000",
    "currency": "USD",
    "landSurfaceM2": 638,
    "coveredSurfaceM2": null,
    "surfaceNote": "22 m de frente × 29 m de fondo; el aviso declara 638 m² construibles, sin documentación adjunta.",
    "observations": "Lote alambrado con árboles, a cuatro cuadras del pavimento según el anunciante. El aviso afirma que está listo para subdividir y ofrece escritura inmediata; ambas condiciones requieren documentación. Sin altura ni intersección exacta.",
    "geocodeDisabled": true,
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "verificationStatus": "Ficha directa de Inmuebles Clarín accesible el 27/11/2026; precio, medidas y anunciante visibles. Disponibilidad y posibilidad de subdivisión no confirmadas.",
    "geolocationStatus": "Pendiente: falta altura o intersección pública verificable; no asignar coordenadas."
  },
  {
    "id": "terreno-gervasio-mendez-300-umbrales",
    "recordType": "Terreno individual · lote sin parcela individualizada",
    "name": "Gervasio Méndez · lote de 300 m²",
    "locality": "Moreno",
    "address": "Gervasio Méndez, Moreno; sin altura ni lote interno publicados",
    "source": "https://www.inmuebles.clarin.com/terreno-en-venta-en-moreno--20794989",
    "agency": "Mónica Di Sirio · Mat. 308 CMCPGR / Martín Calvete CUCICBA",
    "contact": "Mónica Di Sirio; teléfono parcialmente visible como +54 11 53…",
    "price": "USD 16.000 en cabecera; descripción: USD 20.000 contado o anticipo USD 8.000 + 100 cuotas de ARS 300.000 ajustables por CAC",
    "currency": "USD y ARS",
    "landSurfaceM2": 300,
    "coveredSurfaceM2": null,
    "surfaceNote": "300 m² según cabecera y ficha técnica; no se publica lote ni parcela.",
    "observations": "La ficha directa está accesible, pero el precio de cabecera contradice el precio contado de la descripción. La dirección no permite identificar una parcela específica. No calcular el costo total de la financiación en pesos sin cronograma y fórmula de ajuste.",
    "geocodeDisabled": true,
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "verificationStatus": "Ficha directa de Inmuebles Clarín accesible el 27/11/2026; superficie y anunciante visibles. Precio contradictorio y disponibilidad sin confirmar.",
    "geolocationStatus": "Pendiente: dirección sin altura ni nomenclatura catastral."
  },
  {
    "id": "terreno-ricardo-gutierrez-8900-312",
    "recordType": "Terreno individual · loteo",
    "name": "Malaver · Ricardo Gutiérrez 8900 · lote 4, manzana 32",
    "locality": "Moreno",
    "address": "Ricardo Gutiérrez 8900, Malaver, Moreno",
    "source": "https://www.inmuebles.clarin.com/terreno-en-venta-en-moreno--15198136",
    "agency": "Madero Inmobiliaria",
    "contact": "Formulario de Inmuebles Clarín; teléfono parcialmente visible como 11 44651…",
    "price": "USD 15.000",
    "currency": "USD",
    "landSurfaceM2": 312,
    "coveredSurfaceM2": null,
    "surfaceNote": "Lote 4, manzana 32. La ficha indica 80 m² construibles, dato que no debe confundirse con superficie cubierta ni capacidad aprobada.",
    "observations": "El anuncio ofrece lotes de 312 a 1.500 m² en Malaver, a 100 m de Gral. Pintos y 500 m de Ruta 23. Declara calles a ceder a futuro y lote parquizado/amojonado. Confirmar nomenclatura, cesión de calles y servicios de la parcela.",
    "geocodeQuery": "Ricardo Gutierrez 8900, Moreno, Buenos Aires",
    "geocodeMatch": "RICARDO GUTIERREZ 8900",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "verificationStatus": "Ficha directa de Inmuebles Clarín accesible el 27/11/2026; lote, precio y anunciante visibles. Stock no confirmado.",
    "geolocationStatus": "Pendiente: Georef debe devolver coincidencia inequívoca con la dirección publicada."
  },
  {
    "id": "terreno-los-molinos-lotes-800-850",
    "recordType": "Terreno · publicación con varias parcelas",
    "name": "Barrio Los Molinos · lotes 1, 3 y 10 · El Molino",
    "locality": "Moreno · sector El Molino",
    "address": "Barrio Los Molinos, Moreno; a cinco cuadras de RN24 y aproximadamente 1 km del cruce con RP25 según el aviso",
    "source": "https://www.inmuebles.clarin.com/terreno-en-venta-en-moreno--17786397",
    "agency": "Juan Pablo Sanguinetti, CMCPSI 6449; comercialización asociada a Keller Williams, oficina no individualizada en la ficha",
    "contact": "Formulario de Inmuebles Clarín; teléfono parcialmente visible como +54 11 32…",
    "price": "USD 22.000 (lote 3, 800 m²); USD 23.000 (lote 1, 800 m²); USD 24.000 (lote 10, 850 m²)",
    "currency": "USD",
    "landSurfaceM2": null,
    "coveredSurfaceM2": null,
    "surfaceNote": "Una sola publicación agrupa tres opciones: lotes 1 y 3 de 800 m² y lote 10 de 850 m². El encabezado corresponde al lote 3.",
    "observations": "El aviso declara escritura y financiación con anticipo de USD 9.000 y hasta 12 cuotas fijas en dólares; informa FOS 0,3 y FOT 0,5, a verificar por parcela. Se registra una sola ficha por URL, sin contar los tres lotes como una sola parcela ni inventar sus ubicaciones internas.",
    "geocodeDisabled": true,
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "verificationStatus": "Ficha directa de Inmuebles Clarín accesible el 27/11/2026; tres opciones, precios y superficies declarados. Disponibilidad de cada lote no confirmada.",
    "geolocationStatus": "Pendiente: no se publican calles internas ni números de parcela verificables."
  },
  {
    "id": "terreno-prados-oeste2-lote15-928",
    "recordType": "Terreno individual · barrio cerrado",
    "name": "Prados del Oeste 2 · etapa 1 · lote 15 · 928 m²",
    "locality": "Moreno · Prados del Oeste 2",
    "address": "General Hornos 2800, Prados del Oeste 2 (etapa 1), Moreno; lote 15, cul-de-sac",
    "source": "https://www.inmuebles.clarin.com/terreno-en-venta-en-prados-del-oeste--15689040",
    "agency": "Chinellato Inmobiliaria",
    "contact": "Formulario de Inmuebles Clarín; teléfono parcialmente visible como 011 462…",
    "price": "USD 69.500",
    "currency": "USD",
    "landSurfaceM2": 928,
    "coveredSurfaceM2": null,
    "surfaceNote": "Lote 15, 928 m²; el aviso informa ubicación en cul-de-sac y entrega inmediata.",
    "observations": "El anuncio identifica Prados del Oeste 2, etapa 1, lote 15, con servicios, seguridad y amenities. La dirección vial General Hornos 2800 coincide con otros avisos de Prados del Oeste I, pero este registro identifica otra etapa y otro activo; no fusionar con la casa de General Hornos 2800 en Prados I.",
    "geocodeDisabled": true,
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "verificationStatus": "Ficha directa de Inmuebles Clarín accesible el 27/11/2026; lote 15, superficie, precio y comercializadora visibles. Disponibilidad no confirmada.",
    "geolocationStatus": "Pendiente: parcela interna de barrio cerrado; no usar la dirección de acceso como coordenada de lote."
  },
  {
    "id": "terreno-prados-oeste1b-lote295-745",
    "recordType": "Terreno individual · barrio cerrado",
    "name": "Prados del Oeste 1-B · lote 295",
    "locality": "Moreno · Prados del Oeste 1-B",
    "address": "Prados del Oeste 1-B, lote 295, Moreno",
    "source": "https://www.inmuebles.clarin.com/terreno-en-venta-en-moreno--18969835",
    "agency": "Valencia Viudes Bienes Raíces",
    "contact": "Matías G. Valencia, col. 3034 CMCPM, y Matías F. Viudes, col. 3047 CMCPM; teléfono parcialmente visible como +54 11 7…",
    "price": "USD 49.000",
    "currency": "USD",
    "landSurfaceM2": 745,
    "coveredSurfaceM2": null,
    "surfaceNote": "La cabecera y ficha técnica informan 745 m²; la descripción del anunciante dice 674 m². Frente 22 m y fondo 33 m.",
    "observations": "El aviso describe lote perimetral, orientación noreste, escritura y posesión inmediata. La discrepancia 745/674 m² debe resolverse con título y mensura antes de calcular USD/m².",
    "geocodeDisabled": true,
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "verificationStatus": "Ficha directa de Inmuebles Clarín accesible el 27/11/2026; precio y dos superficies contradictorias visibles. Disponibilidad no confirmada.",
    "geolocationStatus": "Pendiente: lote interno sin coordenada parcelaria pública."
  },
  {
    "id": "terreno-potosi-sin-altura-345-posible-reactivacion",
    "recordType": "Terreno individual · posible reactivación de anuncio anterior",
    "name": "Potosí s/n · lote de 345 m² · posible reaparición de lotes de Barrio Parque Moreno",
    "locality": "Moreno · ubicación barrial pendiente",
    "address": "Potosí s/n, Moreno; el anuncio anterior lo ubicaba en Potosí 3700 / Barrio Parque Moreno, sin parcela identificada",
    "source": "https://www.inmuebles.clarin.com/terreno-en-venta-en-moreno--18741998",
    "sourceAlternates": [
      {
        "url": "https://www.inmuebles.clarin.com/terreno-en-venta-en-trujui--19886186",
        "label": "Anuncio anterior de seis lotes de 345 m² en Potosí 3700, USD 15.000 por lote; enlace directo 410 Gone el 27/11/2026."
      }
    ],
    "agency": "Grupo Triángulo On 2024 SRL",
    "contact": "Corredor Julián Aguilar Amat, CMCPSI 6737 / CUCICBA 7839; teléfono parcialmente visible como +54 11 40…",
    "price": "USD 16.000 (aviso actual); publicación anterior indexada: USD 15.000 por lote",
    "currency": "USD",
    "landSurfaceM2": 345,
    "coveredSurfaceM2": null,
    "surfaceNote": "10 m de frente × 34 m de fondo, 345 m² según aviso actual.",
    "observations": "La ficha actual ofrece un lote Potosí s/n listo para escriturar. Una publicación anterior sobre Potosí 3700 describía seis lotes de 345 m² en Barrio Parque Moreno, pero su URL devolvió 410 Gone. Puede ser uno de esos lotes o una parcela distinta; sin nomenclatura catastral no se cuenta como segunda oportunidad ni se afirma venta de los lotes anteriores.",
    "geocodeDisabled": true,
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "verificationStatus": "Ficha directa actual de Inmuebles Clarín accesible el 27/11/2026 con USD 16.000 y 345 m². Aviso anterior de Potosí 3700 no accesible; identidad parcelaria pendiente.",
    "geolocationStatus": "Pendiente: Potosí s/n sin altura ni parcela verificable."
  },
  {
    "id": "casa-general-hornos-2800-prados-oeste1-819",
    "recordType": "Casa individual · barrio cerrado · a estrenar según el aviso",
    "name": "Casa 4 ambientes · Prados del Oeste I · General Hornos 2800",
    "locality": "Moreno · Prados del Oeste I",
    "address": "General Hornos 2800, Club de Campo Prados del Oeste I, Moreno",
    "source": "https://www.inmuebles.clarin.com/casa-en-venta-en-moreno-4-ambientes--17008926",
    "agency": "Alejandro J. Bruno Estudio Inmobiliario",
    "contact": "Formulario de Inmuebles Clarín; teléfono parcialmente visible como 9 11 44…",
    "price": "USD 315.000",
    "currency": "USD",
    "landSurfaceM2": 819,
    "coveredSurfaceM2": 165,
    "surfaceNote": "La descripción anuncia lote de 819 m² y 165 m² cubiertos; la ficha técnica del portal informa 280 m² totales, dato contradictorio que debe aclararse con plano y título.",
    "observations": "Casa de 4 ambientes, 3 dormitorios, 4 baños, galería, parrilla, piscina y 2 cocheras semicubiertas según el anunciante. La ficha indica entrega inmediata y la identifica como Prados del Oeste I. No fusionar con el lote 15 de Prados del Oeste 2, que comparte la referencia vial General Hornos 2800.",
    "geocodeDisabled": true,
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "verificationStatus": "Ficha directa de Inmuebles Clarín accesible el 27/11/2026; precio, superficie cubierta y descripción de lote visibles. Disponibilidad no confirmada.",
    "geolocationStatus": "Pendiente: barrio cerrado y dirección vial no identifican la parcela interna."
  },
  {
    "id": "casa-prados-oeste1a-lote62-801",
    "recordType": "Casa individual · barrio cerrado",
    "name": "Prados del Oeste 1-A · lote 62 · casa de 6 ambientes",
    "locality": "Moreno · Prados del Oeste 1-A",
    "address": "Prados del Oeste 1-A, lote 62, Moreno",
    "source": "https://www.inmuebles.clarin.com/casa-en-venta-en-moreno-6-ambientes--20224414",
    "agency": "Valencia Viudes Bienes Raíces",
    "contact": "Matías G. Valencia, col. 3034 CMCPM, y Matías F. Viudes, col. 3047 CMCPM; teléfono parcialmente visible como +54 11 7…",
    "price": "USD 540.000 + expensas publicadas ARS 550.000",
    "currency": "USD y ARS",
    "landSurfaceM2": 801,
    "coveredSurfaceM2": 303,
    "surfaceNote": "801 m² de terreno y 303 m² cubiertos según la ficha.",
    "observations": "Casa anunciada a estrenar, 4 dormitorios, 4 baños, 4 cocheras, piscina y galería. La descripción incluye la frase vendimos un proyecto que hoy es un hogar, por lo que conviene confirmar si el inmueble publicado es exactamente la unidad fotografiada y si continúa comercializable. Expensas sujetas a actualización.",
    "geocodeDisabled": true,
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "verificationStatus": "Ficha directa de Inmuebles Clarín accesible el 27/11/2026; precio, lote, cubierta y anunciante visibles. Disponibilidad no confirmada.",
    "geolocationStatus": "Pendiente: lote interno de barrio cerrado sin coordenada parcelaria."
  },
  {
    "id": "casa-prados-oeste1b-lote169-819",
    "recordType": "Casa individual · barrio cerrado · a estrenar según el aviso",
    "name": "Prados del Oeste 1-B · casa lote 169",
    "locality": "La Reja · Prados del Oeste 1-B",
    "address": "Prados del Oeste 1-B, casa lote 169, Moreno",
    "source": "https://www.inmuebles.clarin.com/casa-en-venta-en-moreno-4-ambientes--19925013",
    "agency": "Valencia Viudes Bienes Raíces",
    "contact": "Matías G. Valencia, col. 3034 CMCPM, y Matías F. Viudes, col. 3047 CMCPM; teléfono parcialmente visible como +54 11 7…",
    "price": "USD 315.000 + expensas publicadas ARS 550.000",
    "currency": "USD y ARS",
    "landSurfaceM2": 819,
    "coveredSurfaceM2": 165,
    "surfaceNote": "819 m² de terreno y 165 m² cubiertos según ficha técnica.",
    "observations": "Casa de 4 ambientes, 3 dormitorios, galería con parrilla, piscina y 2 cocheras. La descripción la presenta desarrollada en una planta, mientras que la ficha técnica indica dos plantas; confirmar planos y expensas. No fusionar con otras casas de Prados 1-B: el lote 169 está identificado individualmente.",
    "geocodeDisabled": true,
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "verificationStatus": "Ficha directa de Inmuebles Clarín accesible el 27/11/2026; precio, lote, cubierta y comercializadora visibles. Disponibilidad no confirmada.",
    "geolocationStatus": "Pendiente: parcela interna sin coordenadas públicas verificables."
  },
  {
    "id": "casa-prados-oeste1b-lote275-800",
    "recordType": "Casa individual · barrio cerrado · a estrenar según el aviso",
    "name": "Prados del Oeste 1-B · casa lote 275",
    "locality": "Moreno · Prados del Oeste 1-B",
    "address": "Prados del Oeste 1-B, casa lote 275, Moreno",
    "source": "https://www.inmuebles.clarin.com/casa-en-venta-en-moreno-5-ambientes--20481223",
    "agency": "Valencia Viudes Bienes Raíces",
    "contact": "Matías G. Valencia, col. 3034 CMCPM, y Matías F. Viudes, col. 3047 CMCPM; teléfono parcialmente visible como +54 11 7…",
    "price": "USD 360.000 + expensas publicadas ARS 550.000",
    "currency": "USD y ARS",
    "landSurfaceM2": 800,
    "coveredSurfaceM2": 170,
    "surfaceNote": "800 m² de terreno y 170 m² cubiertos según ficha técnica.",
    "observations": "Casa de 5 ambientes, 4 dormitorios, 4 baños, 4 cocheras, piscina, galería y parrilla. La ficha indica una planta. Expensas sujetas a confirmación.",
    "geocodeDisabled": true,
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "verificationStatus": "Ficha directa de Inmuebles Clarín accesible el 27/11/2026; precio, superficies y lote interno visibles. Disponibilidad no confirmada.",
    "geolocationStatus": "Pendiente: parcela interna sin coordenadas públicas verificables."
  },
  {
    "id": "casa-prados-oeste1b-lote234-810",
    "recordType": "Casa individual · barrio cerrado · en finalización según el aviso",
    "name": "Prados del Oeste 1-B · casa lote 234",
    "locality": "Moreno · Prados del Oeste 1-B",
    "address": "Prados del Oeste 1-B, casa lote 234, Moreno",
    "source": "https://www.inmuebles.clarin.com/casa-en-venta-en-moreno-5-ambientes--19248635",
    "agency": "Valencia Viudes Bienes Raíces",
    "contact": "Matías G. Valencia, col. 3034 CMCPM, y Matías F. Viudes, col. 3047 CMCPM; teléfono parcialmente visible como +54 11 7…",
    "price": "USD 375.000 + expensas publicadas ARS 550.000",
    "currency": "USD y ARS",
    "landSurfaceM2": 810,
    "coveredSurfaceM2": 211,
    "surfaceNote": "810 m² de terreno y 211 m² cubiertos según ficha técnica.",
    "observations": "Casa de 5 ambientes, 4 dormitorios, 3 baños, piscina y galería. El anunciante indica que la construcción está finalizando y que no es apta para crédito hipotecario; la fecha de entrega no se publica. Confirmar avance físico y condiciones de escritura directa.",
    "geocodeDisabled": true,
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "verificationStatus": "Ficha directa de Inmuebles Clarín accesible el 27/11/2026; precio, lote, cubierta y etapa de obra declarada visibles. Disponibilidad no confirmada.",
    "geolocationStatus": "Pendiente: parcela interna sin coordenadas públicas verificables."
  },
  {
    "id": "casa-el-carpintero-100",
    "recordType": "Casa individual",
    "name": "Casa 2 ambientes · El Carpintero 100",
    "locality": "Moreno",
    "address": "El Carpintero 100, entre Alcorta y Joly, Moreno",
    "source": "https://www.inmuebles.clarin.com/casa-en-venta-en-moreno-2-ambientes--19727924",
    "agency": "Mateo Propiedades",
    "contact": "Mateo Propiedades, matrícula 36 Dpto. M-GR; teléfono parcialmente visible como 0237 463…",
    "price": "USD 70.000",
    "currency": "USD",
    "landSurfaceM2": null,
    "coveredSurfaceM2": null,
    "surfaceNote": "El aviso no publica superficie de terreno ni cubierta en los campos técnicos consultados.",
    "observations": "Casa de 2 ambientes, 1 dormitorio, 2 baños y garaje cerrado. El anunciante señala que el garaje podría dividirse para generar un segundo dormitorio en suite. No asumir esa reforma como obra aprobada.",
    "geocodeQuery": "El Carpintero 100, Moreno, Buenos Aires",
    "geocodeMatch": "EL CARPINTERO 100",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "verificationStatus": "Ficha directa de Inmuebles Clarín accesible el 27/11/2026; precio, dirección y anunciante visibles. Superficies no publicadas y disponibilidad no confirmada.",
    "geolocationStatus": "Pendiente: Georef debe devolver coincidencia inequívoca para la dirección."
  },
  {
    "id": "casa-de-la-quintana-moreno",
    "recordType": "Casa individual",
    "name": "Casa de 5 ambientes · De La Quintana",
    "locality": "Moreno",
    "address": "Calle De La Quintana, Moreno; altura no publicada",
    "source": "https://www.inmuebles.clarin.com/casa-en-venta-en-moreno-5-ambientes--19727202",
    "agency": "Mateo Propiedades",
    "contact": "Mateo Propiedades, matrícula 36 Dpto. M-GR; teléfono parcialmente visible como 0237 463…",
    "price": "USD 140.000",
    "currency": "USD",
    "landSurfaceM2": null,
    "coveredSurfaceM2": null,
    "surfaceNote": "No se publican superficies de terreno o cubierta en la ficha consultada.",
    "observations": "Casa de 5 ambientes, 4 dormitorios, 4 baños, dependencia, quincho, galpón, pileta, terraza y garaje. Apta crédito según el anunciante. La altura y las superficies deben solicitarse antes de ubicar o tasar.",
    "geocodeDisabled": true,
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "verificationStatus": "Ficha directa de Inmuebles Clarín accesible el 27/11/2026; precio, tipología e inmobiliaria visibles. Dirección incompleta y disponibilidad no confirmada.",
    "geolocationStatus": "Pendiente: falta altura y parcela verificable."
  },
  {
    "id": "casa-claudio-maria-joly-1900-252",
    "recordType": "Casa individual",
    "name": "Casa 3 ambientes · Claudio María Joly al 1900",
    "locality": "Moreno Centro",
    "address": "Claudio María Joly al 1900, esquina J. M. Paz, Moreno",
    "source": "https://www.inmuebles.clarin.com/casa-en-venta-en-moreno-3-ambientes--20718374",
    "agency": "Mosca Propiedades",
    "contact": "Formulario de Inmuebles Clarín / Mosca Propiedades; teléfono parcialmente visible como +54 011 5…",
    "price": "USD 77.350",
    "currency": "USD",
    "landSurfaceM2": 252,
    "coveredSurfaceM2": 89,
    "surfaceNote": "La ficha técnica indica 252 m² de terreno y 89 m² cubiertos; la descripción dice 69 m² cubiertos. Mantener ambas cifras como discrepancia.",
    "observations": "Casa reciclada, 2 dormitorios y 1 baño, a unos 800 m del centro comercial y estación según el anunciante. El aviso menciona apto crédito y escritura inmediata, sujeto a documentación. No tomar 89 m² como definitivo hasta revisar planos.",
    "geocodeQuery": "Claudio Maria Joly 1900, Moreno, Buenos Aires",
    "geocodeMatch": "CLAUDIO MARIA JOLY 1900",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "verificationStatus": "Ficha directa de Inmuebles Clarín accesible el 27/11/2026; precio y superficies con contradicción interna. Disponibilidad no confirmada.",
    "geolocationStatus": "Pendiente: Georef debe devolver coincidencia inequívoca; verificar esquina y altura."
  },
  {
    "id": "casa-graham-bell-2800-840",
    "recordType": "Casa individual sobre lote con potencial de desarrollo alegado por el anunciante",
    "name": "Alejandro Graham Bell 2800 · casa sobre lote en esquina",
    "locality": "Moreno",
    "address": "Alejandro Graham Bell 2800, esquina España, Moreno",
    "source": "https://www.inmuebles.clarin.com/casa-en-venta-en-moreno-3-ambientes--20380452",
    "agency": "Ziegler Propiedades",
    "contact": "Formulario de Inmuebles Clarín / Ziegler Propiedades; teléfono parcialmente visible como 4667-00…",
    "price": "USD 112.000",
    "currency": "USD",
    "landSurfaceM2": 840,
    "coveredSurfaceM2": 60,
    "surfaceNote": "La ficha técnica indica 840 m² de terreno; la descripción menciona aproximadamente 844 m². Cubierta aproximada de 60 m².",
    "observations": "Casa de 3 ambientes, 2 dormitorios y 1 baño, sobre esquina Graham Bell y España. El anunciante dice que el lote es apto para inversión o desarrollo residencial/comercial, pero no aporta certificado urbanístico ni factibilidad; no asumir capacidad constructiva.",
    "geocodeQuery": "Alejandro Graham Bell 2800 y España, Moreno, Buenos Aires",
    "geocodeMatch": "GRAHAM BELL 2800",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "verificationStatus": "Ficha directa de Inmuebles Clarín accesible el 27/11/2026; precio, superficie aproximada y anunciante visibles. Disponibilidad no confirmada.",
    "geolocationStatus": "Pendiente: confirmar intersección exacta y coincidencia de Georef."
  },
  {
    "id": "casa-rafael-arcos-1800-860",
    "recordType": "Casa quinta individual",
    "name": "Casa quinta · Rafael Arcos 1800",
    "locality": "Moreno",
    "address": "Rafael Arcos 1800, Moreno",
    "source": "https://www.inmuebles.clarin.com/casa-en-venta-en-moreno-3-ambientes--18034097",
    "agency": "Marisol Espinosa Propiedades",
    "contact": "Formulario de Inmuebles Clarín / Marisol Espinosa Propiedades; teléfono parcialmente visible como 11 6966…",
    "price": "USD 110.000",
    "currency": "USD",
    "landSurfaceM2": null,
    "coveredSurfaceM2": 100,
    "surfaceNote": "La ficha publica 860 m² de superficie total y 100 m² cubiertos; no separa expresamente la superficie del terreno.",
    "observations": "Casa quinta de 3 ambientes, 2 dormitorios, 2 baños, galería, pileta y dos cocheras. El aviso declara apto crédito. No convertir automáticamente los 860 m² totales en superficie de terreno sin mensura.",
    "geocodeQuery": "Rafael Arcos 1800, Moreno, Buenos Aires",
    "geocodeMatch": "RAFAEL ARCOS 1800",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "verificationStatus": "Ficha directa de Inmuebles Clarín accesible el 27/11/2026; precio, superficie total y cubierta visibles. Disponibilidad no confirmada.",
    "geolocationStatus": "Pendiente: Georef debe devolver coincidencia inequívoca."
  },
  {
    "id": "casa-esteban-bongiovanni-1200-1000",
    "recordType": "Casa individual sobre tres lotes",
    "name": "Esteban Bongiovanni al 1200 · casa y cabaña a terminar",
    "locality": "Paso del Rey · Moreno",
    "address": "Esteban Bongiovanni al 1200, Moreno",
    "source": "https://www.inmuebles.clarin.com/casa-en-venta-en-moreno-3-ambientes--18429394",
    "agency": "Leandro Martin Britos Propiedades",
    "contact": "Leandro Martin Britos Propiedades, col. 1044 CMCPLM; teléfono parcialmente visible como +54 11 42…",
    "price": "USD 89.999",
    "currency": "USD",
    "landSurfaceM2": 1000,
    "coveredSurfaceM2": 120,
    "surfaceNote": "El aviso declara tres lotes de aproximadamente 10 × 35 m, total cercano a 1.000 m², y 120 m² cubiertos.",
    "observations": "Casa de 3 ambientes, 2 dormitorios, escritorio/tercer dormitorio, 2 cocheras y cabaña de troncos a terminar. La ubicación se describe a metros de la autopista. Confirmar las tres partidas, mensura y estado de la cabaña.",
    "geocodeQuery": "Esteban Bongiovanni 1200, Moreno, Buenos Aires",
    "geocodeMatch": "ESTEBAN BONGIOVANNI 1200",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "verificationStatus": "Ficha directa de Inmuebles Clarín accesible el 27/11/2026; precio y superficies declaradas visibles. Disponibilidad no confirmada.",
    "geolocationStatus": "Pendiente: Georef debe devolver coincidencia inequívoca; tres parcelas requieren verificación catastral."
  },
  {
    "id": "casa-gervasio-mendez-4900-70",
    "recordType": "Dúplex individual · barrio cerrado según el aviso",
    "name": "Umbrales de la Merced · dúplex Gervasio Méndez al 4900",
    "locality": "Moreno",
    "address": "Gervasio Méndez al 4900, Umbrales de la Merced, Moreno",
    "source": "https://www.inmuebles.clarin.com/casa-en-venta-en-moreno-1-ambiente--20934536",
    "agency": "Mónica Parodi Propiedades, matrícula 350 M-GR",
    "contact": "Formulario de Inmuebles Clarín / Mónica Parodi Propiedades; teléfono parcialmente visible como +54 11 71…",
    "price": "USD 53.000 + expensas publicadas ARS 270.000",
    "currency": "USD y ARS",
    "landSurfaceM2": 70,
    "coveredSurfaceM2": 72,
    "surfaceNote": "La ficha técnica indica 70 m² de terreno y 72 m² cubiertos; frente 4 m y fondo 18 m.",
    "observations": "Dúplex de 3 ambientes según descripción, 2 dormitorios, un baño y toilette. La cabecera lo clasifica como monoambiente. Confirmar tipología, unidad, ocupación y expensas vigentes.",
    "geocodeDisabled": true,
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "verificationStatus": "Ficha directa de Inmuebles Clarín accesible el 27/11/2026; precio, superficies y comercializadora visibles. Disponibilidad no confirmada.",
    "geolocationStatus": "Pendiente: barrio cerrado y unidad sin parcela individual identificada."
  },
  {
    "id": "casa-gervasio-mendez-5000-154",
    "recordType": "Dúplex individual · barrio cerrado según el aviso",
    "name": "Umbrales de la Merced II · dúplex Gervasio Méndez al 5000",
    "locality": "Moreno",
    "address": "Gervasio Méndez al 5000, Umbrales de la Merced II, Moreno",
    "source": "https://www.inmuebles.clarin.com/casa-en-venta-en-moreno-3-ambientes--20494171",
    "agency": "Mónica Parodi Propiedades, matrícula 350 M-GR",
    "contact": "Formulario de Inmuebles Clarín / Mónica Parodi Propiedades; teléfono parcialmente visible como +54 11 71…",
    "price": "USD 79.000 + expensas publicadas ARS 300.000",
    "currency": "USD y ARS",
    "landSurfaceM2": 154,
    "coveredSurfaceM2": 72,
    "surfaceNote": "La ficha técnica indica 154 m² de terreno y 72 m² cubiertos; frente 7 m y fondo 22 m.",
    "observations": "Dúplex de 3 ambientes, 2 dormitorios, 1 baño, toilette, parque y espacio para dos vehículos. El perfil de la misma anunciante presenta otras ofertas en Gervasio Méndez 5000 con precios y expensas diferentes; no se asume que sean la misma unidad ni se cuentan como parcelas distintas sin número interno. Confirmar unidad y expensas vigentes.",
    "geocodeDisabled": true,
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "verificationStatus": "Ficha directa de Inmuebles Clarín accesible el 27/11/2026; precio, superficies y anunciante visibles. Disponibilidad no confirmada.",
    "geolocationStatus": "Pendiente: barrio cerrado y unidad sin parcela individual identificada."
  },
  {
    "id": "terreno-fincas-san-jose-etapa2-800",
    "recordType": "Terreno individual · desarrollo privado por etapas",
    "name": "Fincas San José · lote genérico de 800 m² · etapa 2",
    "locality": "Francisco Álvarez",
    "address": "Ruta Provincial 24, Fincas San José, Francisco Álvarez; lote interno no identificado",
    "source": "https://www.argenprop.com/22115396--terreno-en-venta-en-francisco-alvarez--18893121",
    "sourceAlternates": [
      {
        "url": "https://www.inmuebles.clarin.com/22115396--terreno-en-venta-en-francisco-alvarez--18893121",
        "label": "Publicación sindicada del mismo aviso y código 65IV_301368-1"
      },
      {
        "url": "https://www.fincassanjose.com.ar/",
        "label": "Sitio oficial del desarrollo; masterplan y contacto institucional"
      }
    ],
    "agency": "Gisela Natalia Lorré y Verónica Lamoisse, CMCPM 3001 / CUCICBA 8846",
    "contact": "Formulario de Argenprop; teléfono parcialmente visible como 011 3227…",
    "price": "Etapa 2: USD 39.500 contado o anticipo USD 20.000 + 30 cuotas de USD 1.000; cabecera del aviso USD 20.000 y otra condición inicial menciona 28 cuotas",
    "currency": "USD",
    "landSurfaceM2": 800,
    "coveredSurfaceM2": null,
    "surfaceNote": "Lote genérico de 800 m²; no se publica número interno ni nomenclatura catastral.",
    "observations": "La descripción indica entrega etapa 2 en marzo de 2028 y etapa 1 en diciembre de 2026. La cabecera y el texto general mencionan anticipo USD 20.000 + 28 cuotas, mientras que el apartado específico de etapa 2 informa USD 39.500 contado o 30 cuotas de USD 1.000. Publica 87.000 m² y 658 lotes, mientras que el sitio oficial y el comercializador informan 870.000 m² y 650 lotes. Solicitar cotización contractual por etapa y plano aprobado.",
    "geocodeDisabled": true,
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "verificationStatus": "Ficha directa de Argenprop accesible el 27/11/2026; lote genérico, precio por etapa, responsables y fecha de entrega anunciada visibles. Disponibilidad y condiciones contractuales no confirmadas.",
    "geolocationStatus": "Pendiente: lote interno sin coordenada parcelaria; no ubicar en el centro del predio."
  },
  {
    "id": "casa-prados-oeste1b-lote212-813",
    "recordType": "Casa individual · proyecto de vivienda en construcción anunciado",
    "name": "Prados del Oeste 1-B · Casa Uno · lote 212 · obra anunciada",
    "locality": "La Reja · Prados del Oeste 1-B",
    "address": "Prados del Oeste 1-B, casa lote 212, Moreno, La Reja",
    "source": "https://www.inmuebles.clarin.com/casa-en-venta-en-moreno-5-ambientes--20601636",
    "agency": "Valencia Viudes Bienes Raíces",
    "contact": "Matías G. Valencia, col. 3034 CMCPM, y Matías F. Viudes, col. 3047 CMCPM; teléfono parcialmente visible como +54 11 7…",
    "price": "USD 500.000 + expensas publicadas ARS 600.000",
    "currency": "USD y ARS",
    "landSurfaceM2": 813,
    "coveredSurfaceM2": 236,
    "surfaceNote": "La ficha técnica informa 813 m² de terreno y 236 m² cubiertos; la descripción anuncia 336 m² totales de pozo con llave en mano, cifra que no concilia con los demás datos.",
    "observations": "Casa de 5 ambientes, 4 dormitorios, 2 baños y toilette, galería, parrilla, piscina y dos cocheras. El aviso indica anticipo + cuotas a convenir y tiempo estimado de obra de 16 meses; no informa fecha de inicio ni avance físico comprobado. Clasificar como obra individual anunciada, no como desarrollo nuevo independiente.",
    "geocodeDisabled": true,
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "verificationStatus": "Ficha directa de Inmuebles Clarín accesible el 27/11/2026; precio, lote, cubierta y plazo estimado declarados. Inicio, avance y disponibilidad no confirmados.",
    "geolocationStatus": "Pendiente: parcela interna de barrio cerrado sin coordenadas públicas."
  },
  {
    "id": "terreno-coronel-suarez-neuquen-lote31-500",
    "recordType": "Terreno individual · lote interno de desarrollo anunciado",
    "name": "Coronel Suárez y Neuquén · lote N.º 31 · 500 m²",
    "locality": "Francisco Álvarez · Moreno",
    "address": "Coronel Suárez y Neuquén, Francisco Álvarez, Moreno; lote N.º 31",
    "source": "https://www.inmuebles.clarin.com/terreno-en-venta-en-moreno--19085739",
    "agency": "Meraki Real Estate",
    "contact": "Luciana L. Fedele, CPI 7756 / CMCPSI 6712; teléfono parcialmente visible como +54 11 2…",
    "price": "USD 24.000",
    "currency": "USD",
    "landSurfaceM2": 500,
    "coveredSurfaceM2": null,
    "surfaceNote": "Ficha técnica y descripción: 500 m², 10 × 50 m; el título del aviso dice 400 m², discrepancia a verificar.",
    "observations": "El anunciante identifica lote N.º 31 dentro de un desarrollo, con acceso de tierra y posibilidad de permuta por auto. La descripción lo ubica en Francisco Álvarez, aunque la ficha general solo dice Moreno. No se publica nombre del desarrollo ni aprobación de subdivisión; pedir plano y nomenclatura.",
    "geocodeDisabled": true,
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "verificationStatus": "Ficha directa de Inmuebles Clarín accesible el 27/11/2026; precio, lote y superficie publicados, con contradicción entre título 400 m² y ficha/descripción 500 m². Disponibilidad no confirmada.",
    "geolocationStatus": "Pendiente: intersección y lote interno sin coordenadas parcelarias verificadas."
  }
]);



const turn12NewRecords = [
  {
    "id": "desarrollo-parque-central-av-libertador-6400",
    "recordType": "Desarrollo inmobiliario · loteo abierto en ejecución",
    "name": "Parque Central · loteo abierto sobre Av. Libertador al 6400",
    "locality": "Moreno",
    "address": "Av. Libertador al 6400 (Ruta Provincial 23), Moreno",
    "geocodeQuery": "Av. Libertador 6400, Moreno, Buenos Aires",
    "source": "https://www.lotesparatodos.com.ar/loteos/parque-central-moreno",
    "sourceAlternates": [
      {
        "url": "https://www.lotesparatodos.com.ar/noticias/avanzan-las-obras-de-infraestructura-electrica-en-parque-central",
        "label": "Actualización oficial de obra del 12/11/2026: construcción de pilares eléctricos"
      }
    ],
    "agency": "Lotes Para Todos · comercializador/desarrollador según sitio oficial",
    "contact": "WhatsApp público del sitio: +54 9 11 2246-3000.",
    "phone": "+5491122463000",
    "price": "No publica precio individual. Lotes de 300–400 m²; financiación propia hasta 240 cuotas en pesos; reserva anunciada desde ARS 2.400.000.",
    "currency": "ARS",
    "landSurfaceM2": null,
    "coveredSurfaceM2": null,
    "surfaceNote": "Rango de lotes anunciado: 300 a 400 m²; no se publica superficie total del desarrollo ni precio por parcela.",
    "publicationDate": "Última actualización de obra publicada: 12/11/2026; movimientos de suelo 19/09/2026 y preparación de calles 14/09/2026.",
    "observations": "El sitio oficial ubica el barrio sobre Av. Libertador al 6400 (Ruta 23), a unos 6 km de Acceso Oeste. La noticia del 12/11/2026 informa construcción de pilares eléctricos; los avances son declaraciones del comercializador y no una inspección independiente. El sitio describe barrio abierto, sin expensas, financiación de 24 a 240 cuotas y reserva desde ARS 2.400.000. No publica stock ni precio final de cada lote.",
    "geolocationStatus": "Pendiente: la dirección publicada es aproximada (Av. Libertador al 6400); no se obtuvo una coordenada parcelaria inequívoca.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "verificationStatus": "Ficha directa accesible el 27/11/2026; precio y disponibilidad comercial sujetos a confirmación escrita del anunciante."
  },
  {
    "id": "terreno-chile-133-1036",
    "recordType": "Fracción de terreno · tres parcelas unificadas con mejoras",
    "name": "Chile 133 · tres lotes unificados · 1.036,15 m²",
    "locality": "Moreno Norte · Moreno",
    "address": "Chile 133 (cabecera del aviso: Chile 100), Moreno Norte, Moreno",
    "geocodeDisabled": true,
    "source": "https://www.inmuebles.clarin.com/terreno-en-venta-en-2000-norte--20538324",
    "agency": "Guillermo Koenig Bienes Raíces",
    "contact": "Teléfono parcialmente visible en Inmuebles Clarín: +54 11 76…; contacto mediante formulario/WhatsApp del portal.",
    "price": "USD 199.000",
    "currency": "USD",
    "landSurfaceM2": 1036.15,
    "coveredSurfaceM2": 54,
    "surfaceNote": "1.036,15 m² correspondientes a tres lotes unificados; vivienda original declarada de 54 m² y piscina de 90 m² (no cubierta).",
    "publicationDate": "Fecha de publicación/actualización no informada; ficha directa accesible el 27/11/2026.",
    "observations": "El encabezado ubica el aviso en Chile 100, pero la descripción identifica Chile 133. El anuncio declara zonificación R2, FOS 0,60 y FOT 1,20, escritura inmediata y plano conforme a obra; son afirmaciones comerciales pendientes de cotejo con catastro, título y certificado urbanístico municipal. Describe una vivienda de dos ambientes con ampliación iniciada y piscina de 90 m². No asignar marcador hasta resolver la numeración.",
    "geolocationStatus": "Pendiente: contradicción entre Chile 100 (cabecera) y Chile 133 (descripción); tres parcelas unificadas sin nomenclatura publicada.",
    "verificationStatus": "Ficha directa de Inmuebles Clarín accesible el 27/11/2026; precio y superficies publicados, pero la dirección y los indicadores urbanísticos requieren verificación documental.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada"
  },
  {
    "id": "casa-salvador-6300-300",
    "recordType": "Casa individual · vivienda a terminar",
    "name": "Casa de un dormitorio · Salvador al 6300 · Mi Barrio",
    "locality": "Moreno",
    "address": "Salvador al 6300, Mi Barrio, Moreno",
    "geocodeQuery": "Salvador 6300, Moreno, Buenos Aires",
    "source": "https://www.zonaprop.com.ar/propiedades/clasificado/veclcain-casa-en-venta-moreno.-53543197.html",
    "agency": "Pugliese Inmobiliaria",
    "contact": "Corredor responsable Nicolás Di Puglia Pugliese, CMCPDJMGR 225; consultas mediante Zonaprop, teléfono no visible.",
    "price": "USD 39.000",
    "currency": "USD",
    "landSurfaceM2": 300,
    "coveredSurfaceM2": 60,
    "surfaceNote": "300 m² de terreno y 60 m² cubiertos según cabecera del aviso.",
    "publicationDate": "Fecha del aviso no informada; ficha directa accesible el 27/11/2026.",
    "observations": "Casa de un dormitorio, un baño, living-comedor y cocina; cochera semicubierta y parque arbolado. El anunciante indica detalles a terminar y ubicación a unos 600 m de Ruta 23. Las superficies son orientativas y deben cotejarse con escritura y planos.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "Pendiente de revalidación",
    "geolocationStatus": "Pendiente: ubicación textual conservada; no se asignan coordenadas manuales. Georef debe confirmar una coincidencia inequívoca.",
     "verificationStatus": "La ficha directa permanece accesible, pero el índice de la página figura con rastreo antiguo (1,3 años); el aviso no informa fecha de actualización. Mantener como antecedente publicado pendiente de confirmación directa de vigencia."
  },
  {
    "id": "terreno-haras-maria-victoria-lote32-800",
    "recordType": "Terreno individual · lote en barrio privado",
    "name": "Haras María Victoria · lote 32 · Atahualpa 5",
    "locality": "La Reja · Haras María Victoria",
    "address": "Atahualpa 5, lote 32, Haras María Victoria, La Reja, Moreno",
    "geocodeDisabled": true,
    "source": "https://www.zonaprop.com.ar/propiedades/clasificado/vecltrin-terreno-lote-en-venta-en-haras-maria-victoria-moreno-60374333.html",
    "sourceAlternates": [
      {
        "url": "https://www.zonaprop.com.ar/propiedades/clasificado/vecltrin-venta-unico-lote-811-m-haras-maria-victoria-moreno-60562754.html",
        "label": "Publicación alternativa de RE/MAX en Atahualpa 0: 811 m² a USD 105.000; podría corresponder al mismo lote, identidad pendiente"
      }
    ],
    "agency": "Dambolena · ficha Zonaprop; publicación alternativa por RE/MAX",
    "contact": "Fuente principal: corredor Martín Dambolena, CMCPDJMGR 205 / CUCICBA 7176. Fuente alternativa: contacto Florencia Ariño; responsable Silvana Inés Palini, CMCPM 2955. Teléfonos no visibles completos.",
    "price": "USD 115.000 en la ficha del lote 32; publicación alternativa posiblemente del mismo lote: USD 105.000.",
    "currency": "USD",
    "landSurfaceM2": 800,
    "coveredSurfaceM2": null,
    "surfaceNote": "Lote 32: 800 m². La publicación alternativa indica 811 m², sin número interno de lote; posible coincidencia pendiente.",
    "publicationDate": "Expensas informadas para octubre de 2026: ARS 480.000; fecha de publicación no informada.",
    "observations": "La ficha principal identifica lote 32, Atahualpa 5, 800 m² y expensas de octubre 2026 por ARS 480.000. Una segunda ficha de RE/MAX anuncia un lote central en Atahualpa 0 de 811 m² por USD 105.000, sin número interno. Por similitud de ubicación y superficie podría ser el mismo activo; se agrupan como posible duplicación y no se cuentan como dos parcelas hasta cotejar plano y nomenclatura.",
    "geolocationStatus": "Pendiente: lote interno de barrio privado; no ubicar en el centro del emprendimiento.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "verificationStatus": "Ficha directa accesible el 27/11/2026; precio y disponibilidad comercial sujetos a confirmación escrita del anunciante."
  },
  {
    "id": "casa-labarden-2000-800-industrial",
    "recordType": "Propiedad mixta · casa con lote en zona industrial",
    "name": "Labarden al 2000 · fracción industrial con casa y quincho",
    "locality": "La Reja",
    "address": "Labarden al 2000, La Reja, Moreno; a 50 m de Colectora de Acceso Oeste",
    "geocodeQuery": "Labarden 2000, La Reja, Moreno, Buenos Aires",
    "source": "https://www.zonaprop.com.ar/propiedades/clasificado/vecltrin-lote-fraccion-industrial-en-venta-a-50-m.-colectora-56730264.html",
    "agency": "RAMIREZ Mandatos y Negocios Inmobiliarios",
    "contact": "Hipólito Enrique Ramírez / Carolina Noelia Ramírez, COMARCOMGR 71 / 183; Hipólito Agustín Alejo Ramírez, CUCICBA 8496. Teléfono no visible completo; contacto por Zonaprop.",
    "price": "USD 110.000",
    "currency": "USD",
    "landSurfaceM2": 800,
    "coveredSurfaceM2": 120,
    "surfaceNote": "800 m² de terreno y 120 m² cubiertos según cabecera del portal.",
    "publicationDate": "Fecha del aviso no informada; ficha directa accesible el 27/11/2026.",
    "observations": "La publicación la clasifica como fracción industrial y describe casa de tres ambientes, dos dormitorios, quincho completo con baño y parrilla, pileta de fibra y cochera para dos autos. El anunciante la ubica a 50 m de Colectora Acceso Oeste y la describe como zona industrial. Verificar zonificación parcelaria, habilitaciones, título, mejoras y superficie cubierta.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: ubicación textual conservada; no se asignan coordenadas manuales. Georef debe confirmar una coincidencia inequívoca.",
    "verificationStatus": "Ficha directa accesible el 27/11/2026; precio y disponibilidad comercial sujetos a confirmación escrita del anunciante."
  },
  {
    "id": "terreno-santa-teresa-de-jesus-2900-221",
    "recordType": "Terreno con mejoras",
    "name": "Santa Teresa de Jesús al 2900 · terreno con mejoras",
    "locality": "La Reja",
    "address": "Santa Teresa de Jesús al 2900, La Reja, Moreno",
    "geocodeQuery": "Santa Teresa de Jesus 2900, La Reja, Moreno, Buenos Aires",
    "source": "https://www.zonaprop.com.ar/propiedades/clasificado/vecltrin-terreno-en-la-reja-58910048.html",
    "agency": "Melogno Propiedades",
    "contact": "Consultas mediante Zonaprop; no se publica teléfono completo en la ficha consultada.",
    "price": "USD 25.000",
    "currency": "USD",
    "landSurfaceM2": 221,
    "coveredSurfaceM2": 40,
    "surfaceNote": "221 m² de terreno; la cabecera del portal informa 40 m² cubiertos, pero la descripción no detalla el metraje de las mejoras.",
    "publicationDate": "Fecha del aviso no informada; ficha directa accesible el 27/11/2026.",
    "observations": "Lote de 11 × 20 m con mejoras: baño instalado, tanque e instalación de agua, horno de barro, parrilla y estructura de hormigón para garaje/comedor; medidor eléctrico habilitado según el anunciante. La ficha lo etiqueta como terreno y a estrenar, mientras la descripción habla de construcción existente para refaccionar; verificar estado real y planos.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: ubicación textual conservada; no se asignan coordenadas manuales. Georef debe confirmar una coincidencia inequívoca.",
    "verificationStatus": "Ficha directa accesible el 27/11/2026; precio y disponibilidad comercial sujetos a confirmación escrita del anunciante."
  },
  {
    "id": "predio-piovano-4300-18816",
    "recordType": "Predio multi-parcela con mejoras · posible uso recreativo/comercial",
    "name": "Av. Francisco Piovano al 4300 · predio de siete lotes · 18.816 m²",
    "locality": "La Reja",
    "address": "Av. Francisco Piovano al 4300, La Reja, Moreno; sobre Ruta Provincial 7 según aviso",
    "geocodeDisabled": true,
    "source": "https://www.zonaprop.com.ar/propiedades/clasificado/vecltrin-lote-terreno-de-18.816-m-sup2--en-venta-la-reja-60809715.html",
    "agency": "RAMIREZ Mandatos y Negocios Inmobiliarios",
    "contact": "Hipólito Enrique Ramírez / Carolina Noelia Ramírez, COMARCOMGR 71 / 183; Hipólito Agustín Alejo Ramírez, CUCICBA 8496. Teléfono no visible completo.",
    "price": "USD 649.000",
    "currency": "USD",
    "landSurfaceM2": 18816,
    "coveredSurfaceM2": null,
    "surfaceNote": "18.816 m² en siete lotes; la descripción menciona un salón de 200 m², además de casa principal, dependencias, vestuarios y quinchos, sin superficie cubierta total.",
    "publicationDate": "Fecha del aviso no informada; ficha directa accesible el 27/11/2026.",
    "observations": "Activo con mejoras, no terreno baldío: casa principal de dos plantas y siete habitaciones, salón de 200 m², casas de caseros, taller, dos piscinas, vestuarios, cocinas y quinchos. El anunciante lo propone para complejo deportivo. Verificar si los siete lotes se venden en bloque, nomenclaturas, habilitaciones, dominio y superficie construida total.",
    "geolocationStatus": "Pendiente: predio compuesto por siete lotes; no asignar un marcador parcelario único sin plano.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "verificationStatus": "Ficha directa accesible el 27/11/2026; precio y disponibilidad comercial sujetos a confirmación escrita del anunciante."
  },
  {
    "id": "terreno-prados-oeste1-lote137-778",
    "recordType": "Terreno individual · proyecto de vivienda aprobado según aviso",
    "name": "Prados del Oeste 1 · lote 137 · etapa 1 A · proyecto de 234 m²",
    "locality": "La Reja · Prados del Oeste",
    "address": "General Hornos 0, Prados del Oeste 1, lote 137, etapa 1 A, La Reja, Moreno",
    "geocodeDisabled": true,
    "source": "https://www.zonaprop.com.ar/propiedades/clasificado/vecltrin-venta-permuta-lote-prados-del-oeste-1-con-proyecto-60619954.html",
    "agency": "RE/MAX · publicación de oficina asociada",
    "contact": "Contacto: Fabián Paz. Corredora responsable: Silvana Inés Palini, CPI 8862 / CMCPM 2955. Teléfono no visible completo.",
    "price": "USD 55.000",
    "currency": "USD",
    "landSurfaceM2": 778,
    "coveredSurfaceM2": null,
    "surfaceNote": "La cabecera publica 778 m²; el texto describe lote de 770 m². El proyecto de vivienda adjunto anuncia 234 m² cubiertos, no construidos.",
    "publicationDate": "Fecha del aviso no informada; ficha directa accesible el 27/11/2026.",
    "observations": "El aviso identifica lote 137, etapa 1 A, escriturado y con proyecto de vivienda de una planta y 234 m² cubiertos, que el anunciante dice aprobado por administración del barrio y municipio. Solicitar copia del plano aprobado y vigencia del permiso; no contabilizar los 234 m² como superficie construida.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: ubicación textual conservada; no se asignan coordenadas manuales. Georef debe confirmar una coincidencia inequívoca.",
    "verificationStatus": "Ficha directa accesible el 27/11/2026; precio y disponibilidad comercial sujetos a confirmación escrita del anunciante."
  },
  {
    "id": "terreno-prados-oeste2-831",
    "recordType": "Terreno individual · barrio privado",
    "name": "Prados del Oeste II · lote interno de 831 m²",
    "locality": "La Reja · Prados del Oeste",
    "address": "Prados del Oeste II, La Reja, Moreno; lote interno sin número publicado",
    "geocodeDisabled": true,
    "source": "https://www.zonaprop.com.ar/propiedades/clasificado/vecltrin-terreno-en-venta-831-m-sup2--prados-del-oeste-60713973.html",
    "agency": "Yacoub · Construimos Confianza",
    "contact": "Contacto mediante formulario de Zonaprop; persona y teléfono no visibles en la ficha consultada.",
    "price": "USD 58.000",
    "currency": "USD",
    "landSurfaceM2": 831,
    "coveredSurfaceM2": null,
    "surfaceNote": "831 m² de terreno según ficha.",
    "publicationDate": "Expensas informadas con fecha 03/12/2025: ARS 285.000; fecha del aviso no informada.",
    "observations": "Lote interno con orientación norte. La ficha declara electricidad, gas natural y agua disponibles en la zona, club house, quincho, canchas y pileta. El importe de expensas corresponde a diciembre de 2025 y no debe presentarse como valor vigente. Confirmar lote, escritura, expensas actuales y disponibilidad.",
    "geolocationStatus": "Pendiente: lote interno sin número; no ubicar en el centro del barrio.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "verificationStatus": "Ficha directa accesible el 27/11/2026; precio y disponibilidad comercial sujetos a confirmación escrita del anunciante."
  },
  {
    "id": "terreno-casco-alvarez-725",
    "recordType": "Terreno individual · barrio privado",
    "name": "Casco de Álvarez · lote central en esquina",
    "locality": "La Reja · Casco de Álvarez",
    "address": "Barrio privado Casco de Álvarez, La Reja, Moreno; lote central en esquina, calle interna no publicada",
    "geocodeDisabled": true,
    "source": "https://www.zonaprop.com.ar/propiedades/clasificado/vecltrin-nuevo-lote-central-en-casco-de-alvarez!-59080380.html",
    "agency": "Anunciante de Zonaprop; inmobiliaria no identificada en el texto de la ficha consultada.",
    "contact": "Consultas mediante formulario de Zonaprop; teléfono no visible.",
    "price": "USD 86.000",
    "currency": "USD",
    "landSurfaceM2": 725,
    "coveredSurfaceM2": null,
    "surfaceNote": "Cabecera: 725 m²; descripción: 752 m². Diferencia pendiente de mensura.",
    "publicationDate": "Fecha del aviso no informada; ficha directa accesible el 27/11/2026.",
    "observations": "Lote central en esquina; expensas publicadas ARS 650.000. El texto menciona 752 m², mientras la ficha técnica y cabecera indican 725 m². Barrio de 55 lotes, servicios subterráneos y seguridad según anunciante. Confirmar superficie, número de lote, expensas y escritura.",
    "geolocationStatus": "Pendiente: lote interno de barrio privado, sin calle ni número de parcela publicados.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "verificationStatus": "Ficha directa accesible el 27/11/2026; precio y disponibilidad comercial sujetos a confirmación escrita del anunciante."
  },
  {
    "id": "terreno-san-carlos-4500-552",
    "recordType": "Terreno con mejoras · quinta/eventos",
    "name": "San Carlos al 4500 · quincho con pileta",
    "locality": "La Reja",
    "address": "San Carlos al 4500, La Reja, Moreno",
    "geocodeQuery": "San Carlos 4500, La Reja, Moreno, Buenos Aires",
    "source": "https://www.zonaprop.com.ar/propiedades/clasificado/vecltrin-venta-terreno-quincho-con-pileta-o-quinta-eventos-en-60806884.html",
    "sourceAlternates": [
      {
        "url": "https://www.zonaprop.com.ar/propiedades/clasificado/vecltrin-venta-terreno-quincho-con-pileta-o-quinta-eventos-en-59995707.html",
        "label": "Publicación alternativa indexada; el enlace directo devuelve 410 Gone (no vigente)."
      }
    ],
    "agency": "Anuncio en Zonaprop; corredores responsables Cristian Guirin, CPI 6042, y Diego Lo Nigro, CSM 2708 / CPI 7530.",
    "contact": "Consultas mediante formulario de Zonaprop; teléfono no visible.",
    "price": "USD 29.000",
    "currency": "USD",
    "landSurfaceM2": 552,
    "coveredSurfaceM2": null,
    "surfaceNote": "552 m² de terreno. La cabecera indica 6 m² cubiertos; la descripción menciona galería semicubierta de 14 × 4 m, baño, cocina y pileta, sin metraje cubierto verificable.",
    "publicationDate": "Fecha del aviso no informada; ficha directa accesible el 27/11/2026.",
    "observations": "Se ofrece como quincho con pileta/quinta para eventos. La documentación se describe como cesión de derechos con informes al día, no se acredita escritura de dominio en el aviso. Verificar cadena de cesiones, título, planos, habilitación de uso y superficies antes de cualquier seña.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "Pendiente de revalidación",
    "geolocationStatus": "Pendiente: ubicación textual conservada; no se asignan coordenadas manuales. Georef debe confirmar una coincidencia inequívoca.",
     "verificationStatus": "La URL principal 60806884 devolvió error interno el 27/11/2026. Una publicación alternativa del mismo título (59995707) devuelve 410 Gone y queda marcada como no vigente en el historial. La oportunidad se mantiene pendiente de revalidación, sin confirmar disponibilidad."
  },
  {
    "id": "terreno-reverendo-padre-fahy-2300-756",
    "recordType": "Terreno individual · barrio cerrado",
    "name": "El Resuello · lote sobre Reverendo Padre Fahy al 2300",
    "locality": "La Reja · Barrio El Resuello",
    "address": "Reverendo Padre Fahy al 2300, Barrio El Resuello, La Reja, Moreno",
    "geocodeQuery": "Reverendo Padre Fahy 2300, La Reja, Moreno, Buenos Aires",
    "source": "https://www.argenprop.com/terreno-en-venta-en-la-reja--18381525",
    "agency": "Mónica Parodi Propiedades · matrícula 350 M-GR",
    "contact": "Mónica Parodi Propiedades; teléfono parcialmente visible en Argenprop como +54 11 71…",
    "price": "Anticipo USD 20.000 + cuotas accesibles; total financiado no informado. La cabecera del portal muestra USD 20.000.",
    "currency": "USD",
    "landSurfaceM2": 756,
    "coveredSurfaceM2": null,
    "surfaceNote": "756 m²; frente 28 m y fondo 27 m según publicación.",
    "publicationDate": "Fecha del aviso no informada; ficha directa accesible el 27/11/2026.",
    "observations": "Lote en barrio cerrado El Resuello. El anuncio describe seguridad, SUM, restaurante, piscina, canchas y conexión interna con Club Mariano Moreno. El precio parece corresponder al anticipo y no al precio total; solicitar cotización contractual y reglamento.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: ubicación textual conservada; no se asignan coordenadas manuales. Georef debe confirmar una coincidencia inequívoca.",
    "verificationStatus": "Ficha directa accesible el 27/11/2026; precio y disponibilidad comercial sujetos a confirmación escrita del anunciante."
  },
  {
    "id": "quinta-constituyentes-800-1261",
    "recordType": "Quinta individual · vivienda tipo container y lote",
    "name": "Quintas de Álvarez · Constituyentes 800",
    "locality": "Francisco Álvarez · Quintas de Álvarez",
    "address": "Constituyentes 800, Francisco Álvarez, Moreno",
    "geocodeQuery": "Constituyentes 800, Francisco Alvarez, Moreno, Buenos Aires",
    "source": "https://www.argenprop.com/quinta-en-venta-en-francisco-alvarez-2-ambientes--20953202",
    "agency": "Vanessa Panta Arcos Bienes Raíces · CMZC 688",
    "contact": "Vanessa Panta Arcos; teléfono parcialmente visible en Argenprop como 1178882.",
    "price": "Cabecera: USD 49.500. Descripción: USD 58.000 contado o anticipo USD 12.000 + 36 cuotas de USD 1.400 (total de cuotas anunciado: USD 62.400).",
    "currency": "USD",
    "landSurfaceM2": 1261,
    "coveredSurfaceM2": 75,
    "surfaceNote": "Ficha técnica: 1.261 m² de terreno y 75 m² cubiertos. Descripción: 30 m² cubiertos + 40 m² semicubiertos; superficies en contradicción.",
    "publicationDate": "Fecha del aviso no informada; ficha directa accesible el 27/11/2026.",
    "observations": "Quinta estilo container, parrilla y pileta con solárium, en barrio abierto sin expensas. Diferencias relevantes entre precio de cabecera, contado y financiación, y entre superficie cubierta técnica y descripción. El anunciante indica escritura y servicios de perforación de agua, pozo ciego, luz e internet; verificar título, planos y precio final.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: ubicación textual conservada; no se asignan coordenadas manuales. Georef debe confirmar una coincidencia inequívoca.",
    "verificationStatus": "Ficha directa accesible el 27/11/2026; precio y disponibilidad comercial sujetos a confirmación escrita del anunciante."
  },
  {
    "id": "quinta-el-arreo-2900-779",
    "recordType": "Casa quinta individual",
    "name": "El Arreo 2900 · casa quinta con pileta",
    "locality": "Francisco Álvarez · La Providencia",
    "address": "El Arreo 2900, La Providencia, Francisco Álvarez, Moreno",
    "geocodeQuery": "El Arreo 2900, Francisco Alvarez, Moreno, Buenos Aires",
    "source": "https://www.argenprop.com/quinta-en-venta-en-la-providencia--20947271",
    "agency": "RE/MAX Caminos",
    "contact": "Contacto: Mariela Evangelista. Corredores responsables: Damián Perrone, CUCICBA 2787, y Patricia Alejandra Córdoba, CMCPDJMGR 246. Teléfono incompleto en Argenprop.",
    "price": "USD 110.000",
    "currency": "USD",
    "landSurfaceM2": 779,
    "coveredSurfaceM2": 105,
    "surfaceNote": "779 m² de terreno, 105 m² cubiertos y 30 m² semicubiertos según descripción.",
    "publicationDate": "Fecha del aviso no informada; ficha directa accesible el 27/11/2026.",
    "observations": "Casa de tres ambientes, dos dormitorios, dos baños, pileta de 7 × 3 m y parrilla. La construcción se describe como refaccionada, con electricidad y agua de pozo. Las superficies son orientativas y deben cotejarse con documentación.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: ubicación textual conservada; no se asignan coordenadas manuales. Georef debe confirmar una coincidencia inequívoca.",
    "verificationStatus": "Ficha directa accesible el 27/11/2026; precio y disponibilidad comercial sujetos a confirmación escrita del anunciante."
  },
  {
    "id": "quinta-reverendo-padre-fahy-200-1300",
    "recordType": "Casa quinta individual",
    "name": "Reverendo Padre Fahy 200 · quinta con pileta",
    "locality": "La Reja",
    "address": "Reverendo Padre Fahy 200, La Reja, Moreno",
    "geocodeQuery": "Reverendo Padre Fahy 200, La Reja, Moreno, Buenos Aires",
    "source": "https://www.argenprop.com/quinta-en-venta-en-la-reja--18596521",
    "agency": "Javier Morroni Propiedades",
    "contact": "Javier Morroni Propiedades; teléfono parcialmente visible en Argenprop como 1146970.",
    "price": "USD 120.000",
    "currency": "USD",
    "landSurfaceM2": 1300,
    "coveredSurfaceM2": 167,
    "surfaceNote": "1.300 m² de terreno y 167 m² cubiertos según ficha técnica.",
    "publicationDate": "Fecha del aviso no informada; ficha directa accesible el 27/11/2026.",
    "observations": "Quinta con pileta, quincho y dependencia. La cabecera indica tres dormitorios, mientras la descripción menciona dos dormitorios más dependencia; verificar distribución, planos y superficie. Antigüedad publicada: 60 años.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: ubicación textual conservada; no se asignan coordenadas manuales. Georef debe confirmar una coincidencia inequívoca.",
    "verificationStatus": "Ficha directa accesible el 27/11/2026; precio y disponibilidad comercial sujetos a confirmación escrita del anunciante."
  },
  {
    "id": "quinta-leguizamon-1400-1200",
    "recordType": "Casa quinta individual",
    "name": "Leguizamón al 1400 · quinta de cuatro ambientes",
    "locality": "Francisco Álvarez",
    "address": "Leguizamón al 1400, Francisco Álvarez, Moreno",
    "geocodeQuery": "Leguizamon 1400, Francisco Alvarez, Moreno, Buenos Aires",
    "source": "https://www.argenprop.com/quinta-en-venta-en-francisco-alvarez--20755555",
    "agency": "RAMIREZ Mandatos y Negocios Inmobiliarios",
    "contact": "Hipólito Enrique Ramírez / Carolina Noelia Ramírez, COMARCOMGR 71 / 183; Hipólito Agustín Alejo Ramírez, CUCICBA 8496. Teléfono parcialmente visible como 0810-22.",
    "price": "USD 130.000",
    "currency": "USD",
    "landSurfaceM2": 1200,
    "coveredSurfaceM2": 160,
    "surfaceNote": "1.200 m² de terreno y 160 m² cubiertos según ficha.",
    "publicationDate": "Fecha del aviso no informada; ficha directa accesible el 27/11/2026.",
    "observations": "Casa quinta de cuatro ambientes, tres dormitorios, quincho cerrado con cocina y baño, pileta, parque y cocheras. El aviso menciona nuevo precio, sin informar fecha de actualización. Confirmar disponibilidad y planos.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: ubicación textual conservada; no se asignan coordenadas manuales. Georef debe confirmar una coincidencia inequívoca.",
    "verificationStatus": "Ficha directa accesible el 27/11/2026; precio y disponibilidad comercial sujetos a confirmación escrita del anunciante."
  },
  {
    "id": "quinta-los-aromos-400-1308",
    "recordType": "Casa quinta individual · tres lotes unificados",
    "name": "Los Aromos 400 · Barrio La Tradición · tres lotes unificados",
    "locality": "Francisco Álvarez · Barrio La Tradición",
    "address": "Los Aromos 400, Barrio La Tradición, Francisco Álvarez, Moreno",
    "geocodeQuery": "Los Aromos 400, Francisco Alvarez, Moreno, Buenos Aires",
    "source": "https://www.argenprop.com/quinta-en-venta-en-barrio-la-tradicion--20940984",
    "agency": "RE/MAX Advance",
    "contact": "Contacto: Mirtha Zencovich. Corredores responsables: María Eugenia Blanco, CUCICBA 7834, y Juan Ignacio Bottazzini, CMCPSI 6276. Teléfono parcialmente visible.",
    "price": "USD 134.900",
    "currency": "USD",
    "landSurfaceM2": 1307.91,
    "coveredSurfaceM2": null,
    "surfaceNote": "Tres lotes unificados de 438,35 m² + 431,52 m² + 438,04 m² = 1.307,91 m²; no se publica superficie cubierta.",
    "publicationDate": "Fecha del aviso no informada; ficha directa accesible el 27/11/2026.",
    "observations": "Casa quinta de cuatro ambientes, tres dormitorios, quincho y pileta. El aviso indica que el suministro de gas está cortado y que la pileta requiere reparación. No se informa superficie cubierta de la vivienda; verificar mensura, estado de servicios y documentación de las tres parcelas.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: ubicación textual conservada; no se asignan coordenadas manuales. Georef debe confirmar una coincidencia inequívoca.",
    "verificationStatus": "Ficha directa accesible el 27/11/2026; precio y disponibilidad comercial sujetos a confirmación escrita del anunciante."
  },
  {
    "id": "quinta-la-providencia-900-1537",
    "recordType": "Casa quinta individual · dos construcciones",
    "name": "La Providencia 900 · casa quinta de seis ambientes",
    "locality": "Francisco Álvarez",
    "address": "La Providencia 900, Francisco Álvarez, Moreno",
    "geocodeQuery": "La Providencia 900, Francisco Alvarez, Moreno, Buenos Aires",
    "source": "https://www.argenprop.com/quinta-en-venta-en-francisco-alvarez--20779262",
    "agency": "RE/MAX Premium II",
    "contact": "Contacto: Gloria Cordovana. Corredores responsables: Ariel Champanier, CUCICBA 4330, y Andrea Berre, CMCPSI 6763. Teléfono parcialmente visible.",
    "price": "USD 115.000",
    "currency": "USD",
    "landSurfaceM2": 1537,
    "coveredSurfaceM2": 180,
    "surfaceNote": "1.537 m² de terreno; construcción principal de 180 m² cubiertos y segunda construcción de 50 m², según descripción.",
    "publicationDate": "Fecha del aviso no informada; ficha directa accesible el 27/11/2026.",
    "observations": "Casa quinta de seis ambientes a unos 300 m de Acceso Oeste. Tiene segunda construcción de 50 m² con galería y parrilla. El aviso declara expresamente que las construcciones existentes no cuentan con planos aprobados ni registración municipal, aunque la propiedad se encuentra escriturada. Riesgo documental relevante: no valorar ni financiar las mejoras sin regularización y consulta municipal.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: ubicación textual conservada; no se asignan coordenadas manuales. Georef debe confirmar una coincidencia inequívoca.",
    "verificationStatus": "Ficha directa accesible el 27/11/2026; precio y disponibilidad comercial sujetos a confirmación escrita del anunciante."
  },
  {
    "id": "quinta-juana-de-arco-700-600",
    "recordType": "Casa quinta individual",
    "name": "Juana de Arco al 700 · quinta con pileta y quincho",
    "locality": "Francisco Álvarez",
    "address": "Juana de Arco al 700, Francisco Álvarez, Moreno",
    "geocodeQuery": "Juana de Arco 700, Francisco Alvarez, Moreno, Buenos Aires",
    "source": "https://www.argenprop.com/quinta-en-venta-en-francisco-alvarez--18995337",
    "agency": "FERA Propiedades",
    "contact": "FERA Propiedades; teléfono parcialmente visible en Argenprop como 1170902. No se identifica una persona de contacto en el texto consultado.",
    "price": "USD 90.000",
    "currency": "USD",
    "landSurfaceM2": 600,
    "coveredSurfaceM2": 130,
    "surfaceNote": "600 m² de terreno y 130 m² cubiertos; 20 m de frente y 30 m de fondo.",
    "publicationDate": "Fecha del aviso no informada; ficha directa accesible la semana del 27/11/2026.",
    "observations": "Quinta de cuatro ambientes, tres dormitorios, quincho independiente, pileta y espacio para hasta cuatro vehículos. La publicación aclara que las superficies son informativas y deben cotejarse con títulos y planos.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: ubicación textual conservada; no se asignan coordenadas manuales. Georef debe confirmar una coincidencia inequívoca.",
    "verificationStatus": "Ficha directa accesible el 27/11/2026; precio y disponibilidad comercial sujetos a confirmación escrita del anunciante."
  },
  {
    "id": "quinta-zuloaga-1500-1680",
    "recordType": "Casa quinta individual · vivienda y casa de caseros",
    "name": "Zuloaga 1500 · quinta de cinco ambientes",
    "locality": "Francisco Álvarez",
    "address": "Zuloaga 1500, Francisco Álvarez, Moreno",
    "geocodeQuery": "Zuloaga 1500, Francisco Alvarez, Moreno, Buenos Aires",
    "source": "https://www.argenprop.com/quinta-en-venta-en-francisco-alvarez-5-ambientes--19727894",
    "agency": "Mateo Propiedades · matrícula 203 Dpto. M-GR",
    "contact": "Mateo Propiedades; teléfono parcialmente visible en Argenprop como 0237463.",
    "price": "USD 160.000",
    "currency": "USD",
    "landSurfaceM2": 1680,
    "coveredSurfaceM2": 192,
    "surfaceNote": "1.680 m² de terreno y 192 m² cubiertos según ficha técnica.",
    "publicationDate": "Fecha del aviso no informada; ficha directa accesible el 27/11/2026.",
    "observations": "Casa de cinco ambientes, cuatro dormitorios, pileta, quincho cerrado, casa de caseros con dormitorio, cocina y baño, y garaje para dos autos. El anunciante la publica como apta crédito; verificar planos, título y alcance de la aptitud crediticia.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: ubicación textual conservada; no se asignan coordenadas manuales. Georef debe confirmar una coincidencia inequívoca.",
    "verificationStatus": "Ficha directa accesible el 27/11/2026; precio y disponibilidad comercial sujetos a confirmación escrita del anunciante."
  },
  {
    "id": "predio-deportivo-san-luis-2600-10860",
    "recordType": "Predio recreativo/deportivo con mejoras",
    "name": "San Luis al 2600 · predio deportivo de 10.860 m²",
    "locality": "La Reja",
    "address": "San Luis al 2600, La Reja, Moreno",
    "geocodeQuery": "San Luis 2600, La Reja, Moreno, Buenos Aires",
    "source": "https://www.argenprop.com/quinta-en-venta-en-la-reja--19487846",
    "agency": "Mosca Propiedades",
    "contact": "Mosca Propiedades; teléfono parcialmente visible en Argenprop como +54 0115…",
    "price": "USD 320.000",
    "currency": "USD",
    "landSurfaceM2": 10860,
    "coveredSurfaceM2": 300,
    "surfaceNote": "10.860 m² de terreno y 300 m² cubiertos según ficha técnica.",
    "publicationDate": "Fecha del aviso no informada; ficha directa accesible el 27/11/2026.",
    "observations": "Se anuncia como complejo deportivo/predio con salón, playroom, vestuarios, galpón, piscina y cancha de fútbol y beach vóley. El aviso presenta diferencias entre el título de 10.000 m² y la ficha de 10.860 m²; utilizar 10.860 m² como dato técnico publicado, sujeto a mensura. Evaluar habilitaciones, zonificación, mejoras y estado de instalaciones.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: ubicación textual conservada; no se asignan coordenadas manuales. Georef debe confirmar una coincidencia inequívoca.",
    "verificationStatus": "Ficha directa accesible el 27/11/2026; precio y disponibilidad comercial sujetos a confirmación escrita del anunciante."
  },
  {
    "id": "fraccion-rocha-blaquier-2001-10000",
    "recordType": "Fracción con mejoras · potencial de desarrollo anunciado",
    "name": "Rocha Blaquier 2001 · fracción de 10.000 m² con mejoras",
    "locality": "La Reja",
    "address": "Rocha Blaquier 2001, centro de La Reja, Moreno",
    "geocodeQuery": "Rocha Blaquier 2001, La Reja, Moreno, Buenos Aires",
    "source": "https://www.argenprop.com/quinta-en-venta-en-la-reja--20371196",
    "agency": "Mosca Propiedades",
    "contact": "Mosca Propiedades; contacto mediante Argenprop, teléfono no visible completo.",
    "price": "USD 99.999.999 (precio publicado anómalo; requiere revalidación, no usar como valor de mercado)",
    "currency": "USD",
    "landSurfaceM2": 10000,
    "coveredSurfaceM2": 300,
    "surfaceNote": "10.000 m² de terreno (100 × 100 m) y 300 m² cubiertos según ficha.",
    "publicationDate": "Fecha del aviso no informada; ficha directa accesible el 27/11/2026.",
    "observations": "Fracción con casona de cuatro dormitorios, salón independiente de 70 m², piscina, pérgola y parque. El anunciante sugiere subdivisión, barrio cerrado/housing, centro deportivo o turístico, sin acreditar factibilidad. El precio de USD 99.999.999 parece un valor placeholder o error; marcar pendiente de revalidación y no tomarlo como precio real.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: ubicación textual conservada; no se asignan coordenadas manuales. Georef debe confirmar una coincidencia inequívoca.",
    "verificationStatus": "Ficha directa accesible el 27/11/2026; precio y disponibilidad comercial sujetos a confirmación escrita del anunciante."
  },
  {
    "id": "terreno-libano-echeverria-2-lotes-456",
    "recordType": "Dos terrenos individuales publicados en un mismo aviso",
    "name": "Líbano y Echeverría · dos lotes de 456 m² cada uno",
    "locality": "Trujui",
    "address": "Intersección de Líbano y Echeverría, Trujui, Moreno",
    "geocodeQuery": "Libano y Echeverria, Trujui, Moreno, Buenos Aires",
    "source": "https://www.zonaprop.com.ar/propiedades/clasificado/vecltrin-venta-2-lotes-en-trujui-moreno-52222725.html",
    "agency": "Anunciante de Zonaprop; inmobiliaria no identificada en la ficha consultada.",
    "contact": "Contacto mediante formulario de Zonaprop; persona y teléfono no visibles.",
    "price": "USD 13.000 cada lote al contado; financiación anunciada: anticipo USD 5.000 + 18 cuotas de USD 500 (total financiado USD 14.000 por lote).",
    "currency": "USD",
    "landSurfaceM2": 456,
    "coveredSurfaceM2": null,
    "surfaceNote": "Dos lotes independientes de 456 m² cada uno; no es una única parcela de 912 m².",
    "publicationDate": "Fecha del aviso no informada; ficha directa accesible el 27/11/2026.",
    "observations": "La publicación declara escritura y ubicación a unos 700 m de Ruta 23. Precio contado USD 13.000 por lote; el plan de cuotas suma USD 14.000 por lote. Confirmar que ambos lotes continúen disponibles y pedir nomenclaturas catastrales separadas.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: ubicación textual conservada; no se asignan coordenadas manuales. Georef debe confirmar una coincidencia inequívoca.",
    "verificationStatus": "Ficha directa accesible el 27/11/2026; precio y disponibilidad comercial sujetos a confirmación escrita del anunciante."
  },
  {
    "id": "terreno-boulogne-sebastian-el-cano-373",
    "recordType": "Terreno individual",
    "name": "Boulogne Sur Mer y Sebastián El Cano · lote de 373,10 m²",
    "locality": "Trujui",
    "address": "Boulogne Sur Mer y Sebastián El Cano S/N, Trujui, Moreno",
    "geocodeDisabled": true,
    "source": "https://www.zonaprop.com.ar/propiedades/clasificado/vecltrin-venta-lote-373-m-sup2--trujui-moreno-60667366.html",
    "agency": "Publicación RE/MAX en Zonaprop; oficina no identificada en la ficha.",
    "contact": "Contacto: Raquel Mamani. Corredor responsable: Santiago Cruciani, CPI 6814 / CMCPSI 6754. Teléfono no visible.",
    "price": "USD 21.000",
    "currency": "USD",
    "landSurfaceM2": 373.1,
    "coveredSurfaceM2": null,
    "surfaceNote": "373,10 m²; medidas anunciadas 10 × 37,31 m.",
    "publicationDate": "Fecha del aviso no informada; ficha directa accesible el 27/11/2026.",
    "observations": "El anuncio lo describe como lote en zona residencial en crecimiento, con accesos a Camino del Buen Ayre y Ruta 23. La ubicación es una intersección sin numeración; solicitar nomenclatura catastral y confirmar servicios, escritura y disponibilidad.",
    "geolocationStatus": "Pendiente: intersección sin número de parcela ni coordenada individual.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "verificationStatus": "Ficha directa accesible el 27/11/2026; precio y disponibilidad comercial sujetos a confirmación escrita del anunciante."
  }
];
publishedProperties.push(...turn12NewRecords);



const turn12AdditionalRecords = [
  {
    "id": "quinta-nemesio-alvarez-3900-1100",
    "recordType": "Casa quinta individual",
    "name": "Nemesio Álvarez al 3900 · quinta de tres ambientes",
    "locality": "Francisco Álvarez",
    "address": "Nemesio Álvarez al 3900, Francisco Álvarez, Moreno",
    "geocodeQuery": "Nemesio Alvarez 3900, Francisco Alvarez, Moreno, Buenos Aires",
    "source": "https://www.argenprop.com/quinta-en-venta-en-francisco-alvarez--20332024",
    "agency": "Leandro Procopio Negocios Inmobiliarios",
    "contact": "Leandro Procopio Negocios Inmobiliarios; teléfono parcialmente visible en Argenprop como +54 11 30…",
    "price": "USD 63.000",
    "currency": "USD",
    "landSurfaceM2": 1100,
    "coveredSurfaceM2": 110,
    "surfaceNote": "1.100 m² de terreno y 110 m² cubiertos.",
    "publicationDate": "Fecha del aviso no informada; ficha directa accesible el 27/11/2026.",
    "observations": "Casa quinta de tres ambientes, dos dormitorios, un baño completo y otro en construcción, pileta, parrilla y galería/cochera. El aviso indica electricidad como servicio; verificar agua, cloacas, planos, terminación del segundo baño y estado de la pileta.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: ubicación textual conservada; no se asignan coordenadas manuales. Georef debe confirmar una coincidencia inequívoca.",
    "verificationStatus": "Ficha directa accesible el 27/11/2026; precio y disponibilidad comercial sujetos a confirmación escrita del anunciante."
  },
  {
    "id": "quinta-tegucigalpa-4500-300",
    "recordType": "Casa quinta individual",
    "name": "Tegucigalpa al 4500 · quinta con pileta",
    "locality": "Francisco Álvarez",
    "address": "Tegucigalpa al 4500, Francisco Álvarez, Moreno",
    "geocodeQuery": "Tegucigalpa 4500, Francisco Alvarez, Moreno, Buenos Aires",
    "source": "https://www.argenprop.com/quinta-en-venta-en-francisco-alvarez--19740900",
    "agency": "Leandro Procopio Negocios Inmobiliarios",
    "contact": "Leandro Procopio Negocios Inmobiliarios; teléfono parcialmente visible en Argenprop como +54 11 30…",
    "price": "USD 65.000",
    "currency": "USD",
    "landSurfaceM2": 300,
    "coveredSurfaceM2": 75,
    "surfaceNote": "300 m² de terreno y 75 m² cubiertos.",
    "publicationDate": "Fecha del aviso no informada; ficha directa accesible el 27/11/2026.",
    "observations": "Casa de tres ambientes, dos dormitorios, dos baños, pileta, parrilla/quincho y galpón. El aviso declara agua corriente, cloacas y electricidad. El precio no incluye mobiliario ni artefactos, que podrían comprarse aparte. Superficies aproximadas.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: ubicación textual conservada; no se asignan coordenadas manuales. Georef debe confirmar una coincidencia inequívoca.",
    "verificationStatus": "Ficha directa accesible el 27/11/2026; precio y disponibilidad comercial sujetos a confirmación escrita del anunciante."
  },
  {
    "id": "quinta-los-robles-2900-270",
    "recordType": "Casa quinta individual · vivienda tipo loft",
    "name": "Los Robles 2900 · casa quinta tipo loft",
    "locality": "Francisco Álvarez · Fincas de Álvarez",
    "address": "Los Robles 2900, Fincas de Álvarez, Francisco Álvarez, Moreno",
    "geocodeQuery": "Los Robles 2900, Francisco Alvarez, Moreno, Buenos Aires",
    "source": "https://www.argenprop.com/quinta-en-venta-en-francisco-alvarez-1-ambiente--20777722",
    "agency": "Liliana Martelletti Bienes Raíces · matrícula 256 M-GR",
    "contact": "Liliana Martelletti Bienes Raíces; teléfono parcialmente visible en Argenprop como 1136616.",
    "price": "USD 70.000",
    "currency": "USD",
    "landSurfaceM2": 270,
    "coveredSurfaceM2": 80,
    "surfaceNote": "270 m² de terreno y 80 m² cubiertos según ficha.",
    "publicationDate": "Fecha del aviso no informada; ficha directa accesible el 27/11/2026.",
    "observations": "Casa quinta a estrenar según anuncio, estilo loft, un dormitorio, un baño, pileta, parrilla y estacionamiento para un vehículo. La publicación indica sin expensas y evalúa permuta por inmueble en CABA/AMBA. Verificar antigüedad real: la ficha indica cinco años mientras la descripción la denomina a estrenar.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: ubicación textual conservada; no se asignan coordenadas manuales. Georef debe confirmar una coincidencia inequívoca.",
    "verificationStatus": "Ficha directa accesible el 27/11/2026; precio y disponibilidad comercial sujetos a confirmación escrita del anunciante."
  },
  {
    "id": "quinta-mercedes-100-696",
    "recordType": "Casa quinta individual",
    "name": "Mercedes 100 · quinta de tres ambientes",
    "locality": "Francisco Álvarez",
    "address": "Mercedes 100, Francisco Álvarez, Moreno (cabecera de búsqueda: Mercedes 0)",
    "geocodeQuery": "Mercedes 100, Francisco Alvarez, Moreno, Buenos Aires",
    "source": "https://www.argenprop.com/quinta-en-venta-en-francisco-alvarez--20849442",
    "agency": "RE/MAX Life",
    "contact": "Contacto: Cecilia Testi. Corredora responsable: Laura Palini, CSM 2733 / CPI 7752. Teléfono parcialmente visible como +54 (11)…",
    "price": "USD 60.000",
    "currency": "USD",
    "landSurfaceM2": 696,
    "coveredSurfaceM2": 80,
    "surfaceNote": "696 m² de terreno; 80 m² cubiertos y 10 m² semicubiertos según descripción.",
    "publicationDate": "Fecha del aviso no informada; ficha directa accesible el 27/11/2026.",
    "observations": "Quinta de tres ambientes, dos dormitorios, baño remodelado, cocina-comedor, pileta y 80 m² cubiertos más 10 m² semicubiertos. El título de la ficha sindicada aparece como Mercedes 0, pero la descripción y ubicación directa indican Mercedes 100. Confirmar numeración y mensura.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: ubicación textual conservada; no se asignan coordenadas manuales. Georef debe confirmar una coincidencia inequívoca.",
    "verificationStatus": "Ficha directa accesible el 27/11/2026; precio y disponibilidad comercial sujetos a confirmación escrita del anunciante."
  },
  {
    "id": "quinta-mercedes-2200-1260",
    "recordType": "Casa quinta individual · dos viviendas en un lote",
    "name": "Mercedes 2200 · quinta con dos viviendas y pileta",
    "locality": "Francisco Álvarez",
    "address": "Mercedes 2200 / Mercedes 2264, Francisco Álvarez, Moreno",
    "geocodeQuery": "Mercedes 2264, Francisco Alvarez, Moreno, Buenos Aires",
    "source": "https://www.argenprop.com/quinta-en-venta-en-francisco-alvarez--19329127",
    "agency": "Century 21 Gran Bahía S.A.",
    "contact": "Corredores responsables: Gabriela Teresa Crespi y Mariano Canedo, CUCICBA 8503 / CSI 5981. Teléfono parcialmente visible en Argenprop como 11 4314…",
    "price": "USD 69.999",
    "currency": "USD",
    "landSurfaceM2": 1260,
    "coveredSurfaceM2": 137,
    "surfaceNote": "1.260 m² de terreno; casa principal 90 m² cubiertos + segunda vivienda 47 m² cubiertos = 137 m² cubiertos; 67 m² semicubiertos.",
    "publicationDate": "Fecha del aviso no informada; ficha directa accesible el 27/11/2026.",
    "observations": "Propiedad con escritura declarada, casa principal de cuatro ambientes y vivienda secundaria de dos ambientes, pileta y garage cubierto para cuatro autos. El título ubica Mercedes 2200, la descripción indica Mercedes 2264. Parte de la vivienda principal requiere reciclado y el baño tiene mejoras pendientes. Puede analizarse como activo con renta doble, sujeto a planos, habilitación y mensura.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "geolocationStatus": "Pendiente: ubicación textual conservada; no se asignan coordenadas manuales. Georef debe confirmar una coincidencia inequívoca.",
    "verificationStatus": "Ficha directa accesible el 27/11/2026; precio y disponibilidad comercial sujetos a confirmación escrita del anunciante."
  }
];
publishedProperties.push(...turn12AdditionalRecords);

const turn13AdditionalRecords = [
  {
    "id": "casa-bolivia-2100-400",
    "recordType": "Casa individual",
    "name": "Casa 4 ambientes · Bolivia 2100",
    "locality": "Moreno",
    "address": "Bolivia 2100, Moreno",
    "geocodeQuery": "Bolivia 2100, Moreno, Buenos Aires",
    "source": "https://plataplace.com/propiedad/casa-de-4-ambientes-en-venta-en-moreno-b98d0ecf",
    "agency": "RE/MAX Argentina",
    "contact": "María Ester Montenegro · consulta por WhatsApp o llamada desde PlataPlace; número no visible en la ficha.",
    "price": "USD 75.000",
    "currency": "USD",
    "landSurfaceM2": 400,
    "coveredSurfaceM2": 120,
    "publicationDate": "14/11/2026; vista en la fuente 26/11/2026.",
    "observations": "Casa de cuatro ambientes, tres dormitorios, un baño y dos cocheras. El aviso describe construcción sólida, pileta y posibilidad de ampliación. Las superficies son las publicadas y deben cotejarse con mensura y planos.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "verificationStatus": "PlataPlace registra aviso activo publicado el 14/11/2026 y visto el 26/11/2026. La ficha directa fue accesible el 27/11/2026; precio y superficies publicados, disponibilidad comercial no confirmada.",
    "geolocationStatus": "Pendiente: Georef debe devolver coincidencia inequívoca para Bolivia 2100."
  },
  {
    "id": "casa-panama-5300-300",
    "recordType": "Casa individual",
    "name": "Casa 6 ambientes · Panamá 5300",
    "locality": "Moreno",
    "address": "Panamá 5300, Moreno",
    "geocodeQuery": "Panama 5300, Moreno, Buenos Aires",
    "source": "https://plataplace.com/propiedad/casa-de-6-ambientes-en-venta-en-moreno-b60c3edc",
    "agency": "RE/MAX Argentina",
    "contact": "Laura Orleanski · consulta desde PlataPlace; teléfono no visible en la ficha.",
    "price": "USD 110.000",
    "currency": "USD",
    "landSurfaceM2": 300,
    "coveredSurfaceM2": 152,
    "surfaceNote": "La ficha técnica publica 152 m² cubiertos y 300 m² totales; la descripción textual declara 220 m² construidos. Se conserva la discrepancia sin sumar superficies.",
    "publicationDate": "08/10/2026; ficha consultada 27/11/2026.",
    "observations": "Casa de seis ambientes, cuatro dormitorios, tres baños, pileta, quincho y cochera. El aviso afirma que cuenta con planos aprobados y aptitud crediticia; documentación no verificada independientemente.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "verificationStatus": "PlataPlace muestra aviso activo publicado el 08/10/2026; ficha directa accesible el 27/11/2026. Precio USD 110.000; superficies contradictorias entre cabecera y descripción. Disponibilidad no confirmada.",
    "geolocationStatus": "Pendiente: Georef debe devolver coincidencia inequívoca para Panamá 5300."
  },
  {
    "id": "quinta-formosa-3400-3600",
    "recordType": "Casa quinta con dos viviendas",
    "name": "Casa quinta con dos viviendas · Formosa 3400",
    "locality": "La Reja · Moreno",
    "address": "Formosa 3400, La Reja, Moreno",
    "geocodeQuery": "Formosa 3400, La Reja, Moreno, Buenos Aires",
    "source": "https://plataplace.com/propiedad/quinta-en-venta-en-la-reja-6742b1e6",
    "agency": "RE/MAX Argentina",
    "contact": "Debora Andrade · consulta por WhatsApp desde PlataPlace; teléfono no visible en la ficha.",
    "price": "USD 139.900",
    "currency": "USD",
    "landSurfaceM2": 3600,
    "coveredSurfaceM2": 152.18,
    "surfaceNote": "La ficha publica 152,18 m² cubiertos para el conjunto y describe una segunda vivienda independiente de aproximadamente 52 m²; no se suma esa superficie para evitar duplicación.",
    "publicationDate": "16/09/2026; vista en la fuente 26/11/2026.",
    "observations": "Casa quinta de seis ambientes, cuatro dormitorios y cuatro baños, con dos viviendas independientes, pileta, parque arbolado y parrilla. El terreno se publica como aproximado, 30 × 120 m; verificar mensura y superficies construidas.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "verificationStatus": "PlataPlace registra aviso activo publicado el 16/09/2026 y visto el 26/11/2026. Ficha directa accesible el 27/11/2026; superficie cubierta sujeta a verificación documental y disponibilidad no confirmada.",
    "geolocationStatus": "Pendiente: Georef debe devolver coincidencia inequívoca para Formosa 3400."
  },
  {
    "id": "casa-urquiza-2600-299",
    "recordType": "Casa individual",
    "name": "Casa 3 ambientes · Justo José de Urquiza 2600",
    "locality": "Moreno Sur · Moreno",
    "address": "Justo José de Urquiza 2600, Moreno",
    "geocodeQuery": "Justo Jose de Urquiza 2600, Moreno, Buenos Aires",
    "source": "https://plataplace.com/propiedad/casa-de-3-ambientes-en-venta-en-moreno-ad85fd84",
    "agency": "RE/MAX Argentina",
    "contact": "Lucrecia Galland · consulta por WhatsApp o llamada desde PlataPlace; número no visible en la ficha.",
    "price": "USD 86.000",
    "currency": "USD",
    "landSurfaceM2": 299,
    "coveredSurfaceM2": 100,
    "publicationDate": "14/11/2026; vista en la fuente 26/11/2026.",
    "observations": "Casa de tres ambientes, dos dormitorios, un baño y dos cocheras, en una planta, con pileta y patio. La ficha la ubica en Moreno Sur, a diez cuadras de la estación y con acceso al Camino de la Ribera y Acceso Oeste.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "verificationStatus": "PlataPlace registra aviso activo publicado el 14/11/2026 y visto el 26/11/2026; ficha directa accesible el 27/11/2026. Disponibilidad no confirmada.",
    "geolocationStatus": "Pendiente: Georef debe devolver coincidencia inequívoca para Justo José de Urquiza 2600."
  },
  {
    "id": "desarrollo-altos-del-monte-san-juan-bautista-2400",
    "recordType": "Desarrollo residencial terminado · unidades en comercialización",
    "name": "Condominio Altos del Monte · casas terminadas · San Juan Bautista 2400",
    "locality": "Moreno · entorno Rafael Arcos",
    "address": "San Juan Bautista 2400, esquina Rafael Arcos, Moreno",
    "geocodeDisabled": true,
    "source": "https://www.zonaprop.com.ar/propiedades/clasificado/veclcain-venta-casa-4-ambientes-altos-del-monte-moreno-60609936.html",
    "sourceAlternates": [
      {
        "url": "https://www.argenprop.com/casa-en-venta-en-moreno-4-ambientes--20811775",
        "label": "Ficha alternativa de UF7: USD 167.000, lote 267 m² y 131 m² cubiertos."
      },
      {
        "url": "https://plataplace.com/propiedad/casa-de-4-ambientes-en-venta-en-moreno-ae02c7b0",
        "label": "PlataPlace: ficha del condominio y lista de unidades publicadas."
      }
    ],
    "agency": "RE/MAX; oficina no identificada en la ficha. Corredora responsable: Silvana Inés Palini, CPI 8862 / CMCPM 2955.",
    "contact": "Cristina Cardozo · consulta por formulario/WhatsApp desde Zonaprop o Argenprop; teléfono parcialmente visible.",
    "price": "UF1 USD 150.000; UF2 USD 152.000; UF3, UF7 y UF8 USD 167.000 (precios de lista base publicados).",
    "currency": "USD",
    "landSurfaceM2": null,
    "coveredSurfaceM2": null,
    "surfaceNote": "Superficies por unidad según las fichas: UF1 208 m² de lote / 116 m² cubiertos; UF2 231/116; UF3 258/131; UF7 267/131; UF8 215/131. La cabecera de Zonaprop informa 296 m² totales para UF2, mientras el cuerpo de Zonaprop y la ficha de PlataPlace informan lote de 231 m² y 116 m² cubiertos; se conserva la discrepancia de cabecera.",
    "publicationDate": "Fecha original no informada; fichas directas consultadas el 27/11/2026.",
    "observations": "Condominio de casas de cuatro ambientes en dos plantas. El anunciante indica que las unidades están 100% terminadas y listas para escriturar; UF4, UF5 y UF6 figuran vendidas, mientras UF1, UF2, UF3, UF7 y UF8 se publican con precio. No se identificó una desarrolladora con razón social en la ficha; se menciona financiación directa de la constructora. Las expensas difieren entre fuentes: Zonaprop publica $80.000 sin moneda explícita y PlataPlace informa USD 47/mes para UF2; confirmar importe, moneda y UF con el administrador. No se presenta como obra nueva en ejecución: se clasifica como desarrollo terminado con unidades anunciadas.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "verificationStatus": "Zonaprop y Argenprop mantienen fichas accesibles al 27/11/2026. Las publicaciones enumeran unidades y precios de lista base; el stock y los importes deben confirmarse con el corredor. No se verificaron títulos ni estado de escrituración de cada UF.",
    "geolocationStatus": "Pendiente: dirección del condominio publicada; marcador de unidad deshabilitado hasta identificar acceso y UF exacta."
  },
  {
    "id": "casa-concordia-1600-219",
    "recordType": "Casa individual",
    "name": "Casa 2 ambientes · Concordia 1600",
    "locality": "Moreno · cercanías de Paso del Rey",
    "address": "Concordia 1600, Moreno",
    "geocodeQuery": "Concordia 1600, Moreno, Buenos Aires",
    "source": "https://plataplace.com/propiedad/casa-de-2-ambientes-en-venta-en-moreno-2ebcc8ed",
    "agency": "RE/MAX Argentina",
    "contact": "Florencia Ponce · consulta por WhatsApp o llamada desde PlataPlace; número no visible en la ficha.",
    "price": "USD 45.000",
    "currency": "USD",
    "landSurfaceM2": 219,
    "coveredSurfaceM2": 60,
    "surfaceNote": "La descripción publica además 20 m² semicubiertos y 139 m² descubiertos.",
    "publicationDate": "05/11/2026; vista en la fuente 26/11/2026.",
    "observations": "Casa de dos ambientes, un dormitorio, un baño y cochera cubierta. El aviso dice que está lista para escriturar y libre de gastos; también sugiere potencial de ampliación o subdivisión, que no está acreditado por certificado urbanístico.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "verificationStatus": "PlataPlace registra aviso activo publicado el 05/11/2026 y visto el 26/11/2026; ficha directa accesible el 27/11/2026. Disponibilidad no confirmada.",
    "geolocationStatus": "Pendiente: Georef debe devolver coincidencia inequívoca para Concordia 1600."
  },
  {
    "id": "casa-maria-eugenia-residences-coravalan-2300-187",
    "recordType": "Casa individual · unidad en barrio cerrado",
    "name": "Dúplex · María Eugenia Residences & Village · Intendente Coravalan al 2300",
    "locality": "Moreno · María Eugenia Residences & Village",
    "address": "Intendente Coravalan al 2300, María Eugenia Residences & Village, Moreno",
    "geocodeDisabled": true,
    "source": "https://plataplace.com/propiedad/casa-en-venta-en-maria-eugenia-residences-village-81247838",
    "agency": "Grupo Prin (fuente declarada en PlataPlace); comercialización/consulta con Grupo Vaccaro.",
    "contact": "Grupo Vaccaro · botón de llamada desde PlataPlace; teléfono no visible en la ficha individual.",
    "price": "USD 235.000; expensas USD 232/mes según la cabecera del aviso.",
    "currency": "USD",
    "landSurfaceM2": 187,
    "coveredSurfaceM2": 145,
    "surfaceNote": "El encabezado de PlataPlace informa 145 m² totales; la descripción indica un lote de 187 m² y 145 m² cubiertos. Se conserva el lote de 187 m² informado en el cuerpo del aviso, pendiente de mensura.",
    "publicationDate": "13/11/2026; vista en la fuente 26/11/2026.",
    "observations": "Dúplex de cuatro ambientes, tres dormitorios, tres baños y dos cocheras, construido en 2018 según la ficha. La publicación describe seguridad 24 horas, CCTV, pileta, gimnasio, SUM y parrilla. Es una unidad individual dentro de un desarrollo ya registrado; no se contabiliza como nuevo emprendimiento.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "verificationStatus": "PlataPlace muestra aviso activo publicado el 13/11/2026 y visto el 26/11/2026; ficha accesible el 27/11/2026. Precio, expensas y disponibilidad sujetos a confirmación con Grupo Vaccaro.",
    "geolocationStatus": "Pendiente: ubicación dentro del barrio; no asignar coordenadas de unidad sin identificar parcela."
  },
  {
    "id": "terreno-diario-la-prensa-700-960",
    "recordType": "Terreno individual · barrio privado",
    "name": "Lote UF 272 · Campos de Álvarez · Diario La Prensa 700 · 960 m²",
    "locality": "Francisco Álvarez · Campos de Álvarez",
    "address": "Diario La Prensa 700, Unidad Funcional 272, Parcela 823 B, Campos de Álvarez",
    "geocodeQuery": "Diario La Prensa 700, Campos de Alvarez, Francisco Alvarez, Moreno, Buenos Aires",
    "source": "https://www.inmuebles.clarin.com/terreno-en-venta-en-francisco-alvarez--20904467",
    "sourceAlternates": [
      {
        "url": "https://www.inmuebles.clarin.com/terreno-en-venta-en-francisco-alvarez--20479588",
        "label": "Publicación anterior de la misma UF/parcela; devolvió 410 Gone el 27/11/2026."
      }
    ],
    "agency": "RE/MAX RIO",
    "contact": "Mateo Gomez · corredor responsable Andrea Oliveri, CSI 6401 / CUCICBA 7190. Teléfono parcialmente visible en Inmuebles Clarín.",
    "price": "USD 230.000",
    "currency": "USD",
    "landSurfaceM2": 960,
    "coveredSurfaceM2": null,
    "publicationDate": "No informada; ficha actual accesible el 27/11/2026.",
    "observations": "Lote identificado en el aviso como UF 272, Parcela 823 B. Expensas publicadas para agosto de 2026: ARS 612.600. No se informa superficie cubierta. La publicación anterior con URL distinta devolvió 410 Gone y parece referirse a la misma parcela por dirección y nomenclatura; se conserva como fuente histórica, no como otro terreno.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "verificationStatus": "La ficha directa de Inmuebles Clarín con ID 20904467 está accesible el 27/11/2026 y publica USD 230.000, 960 m², UF 272 y Parcela 823 B. Una URL anterior con la misma descripción devolvió 410 Gone. No se confirmó disponibilidad con RE/MAX RIO.",
    "geolocationStatus": "Pendiente: dirección pública y UF identificadas; Georef debe devolver coincidencia inequívoca antes de colocar marcador."
  },
  {
    "id": "quinta-intendente-dastugue-4200-2500",
    "recordType": "Casa quinta / activo residencial mixto",
    "name": "Casa quinta con segunda vivienda a terminar · Intendente Dastugue 4200",
    "locality": "Paso del Rey · Moreno",
    "address": "Intendente Dastugue 4200, Paso del Rey, Moreno",
    "geocodeQuery": "Intendente Dastugue 4200, Paso del Rey, Moreno, Buenos Aires",
    "source": "https://plataplace.com/propiedad/quinta-en-venta-en-paso-del-rey-f691c803",
    "agency": "RE/MAX Argentina",
    "contact": "Esteban Andres Bekerman · consulta por WhatsApp o llamada desde PlataPlace; número no visible en la ficha.",
    "price": "USD 220.000",
    "currency": "USD",
    "landSurfaceM2": 2500,
    "coveredSurfaceM2": null,
    "surfaceNote": "La cabecera publica 450 m² cubiertos; la descripción menciona 420 m² construidos, quincho de 100 m² y otra propiedad a terminar. No se reconcilian ni se suman las superficies.",
    "publicationDate": "08/10/2026; vista en la fuente 26/11/2026.",
    "observations": "Casa quinta en esquina con entradas por dos calles, parque arbolado, pileta, quincho de 100 m², galpón y una segunda propiedad de estilo moderno a terminar, incluida en la venta según el anunciante. Acepta permuta y se consideran propuestas de financiación. No se acredita subdivisión ni potencial de desarrollo.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "verificationStatus": "PlataPlace registra aviso activo publicado el 08/10/2026 y visto el 26/11/2026; ficha directa accesible el 27/11/2026. Superficies construidas presentan diferencias entre cabecera y descripción; disponibilidad no confirmada.",
    "geolocationStatus": "Pendiente: Georef debe devolver coincidencia inequívoca para Intendente Dastugue 4200."
  },
  {
    "id": "quinta-rembrandt-3800-2700",
    "recordType": "Casa quinta",
    "name": "Quinta con pileta · Rembrandt 3800",
    "locality": "Francisco Álvarez · Moreno",
    "address": "Rembrandt 3800, Francisco Álvarez, Moreno",
    "geocodeQuery": "Rembrandt 3800, Francisco Alvarez, Moreno, Buenos Aires",
    "source": "https://plataplace.com/propiedad/quinta-en-venta-en-francisco-alvarez-b8c3e571",
    "agency": "Century 21 Argentina · Century 21 D'Adam (Sucursal Devoto)",
    "contact": "Century 21 D'Adam (Suc. Devoto); no se identifica persona ni teléfono completo en la ficha.",
    "price": "USD 110.000",
    "currency": "USD",
    "landSurfaceM2": 2700,
    "coveredSurfaceM2": 400,
    "publicationDate": "18/08/2026; precio actualizado a USD 110.000 el 10/11/2026; vista 23/11/2026.",
    "observations": "Casa quinta de cuatro ambientes, tres dormitorios, dos baños, pileta, parrilla, depósito y espacio guardacoche. La ficha registra un aumento de 4,8%: USD 105.000 el 06/10/2026 a USD 110.000 el 10/11/2026. La superficie cubierta de 400 m² es la publicada; verificar planos y mensura.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No confirmada",
    "verificationStatus": "PlataPlace muestra aviso activo publicado el 18/08/2026, visto el 23/11/2026 y con último precio registrado USD 110.000 el 10/11/2026. Ficha directa accesible el 27/11/2026; disponibilidad no confirmada.",
    "geolocationStatus": "Pendiente: Georef debe devolver coincidencia inequívoca para Rembrandt 3800."
  },
  {
    "id": "casa-libertad-300-175",
    "recordType": "Casa individual",
    "name": "Casa 3 ambientes · Libertad al 300",
    "locality": "Moreno Centro · Moreno",
    "address": "Libertad al 300, Moreno",
    "geocodeDisabled": true,
    "source": "https://plataplace.com/propiedad/casa-de-3-ambientes-en-venta-en-moreno-f1f89dfe",
    "agency": "Coldwell Banker Grupo Elite",
    "contact": "Ariel Massa · consulta desde PlataPlace; teléfono no visible en la ficha.",
    "price": "USD 95.000",
    "currency": "USD",
    "landSurfaceM2": 175,
    "coveredSurfaceM2": null,
    "surfaceNote": "La cabecera publica 117 m² cubiertos, mientras que la descripción textual declara 70 m². No se elige una cifra hasta verificar planos.",
    "publicationDate": "27/05/2026; vista en la fuente 26/11/2026.",
    "observations": "Casa de tres ambientes, dos dormitorios, dos baños, cochera, patio, parrilla y lavadero. La publicación continúa marcada activa, pero supera los seis meses y contiene una discrepancia importante en la superficie cubierta; requiere revalidación antes de contacto comercial.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "Pendiente de revalidación",
    "verificationStatus": "PlataPlace mantiene la ficha como activa, publicada el 27/05/2026 y vista el 26/11/2026. La superficie cubierta difiere entre cabecera (117 m²) y descripción (70 m²); vigencia comercial pendiente de confirmación.",
    "geolocationStatus": "Pendiente: el aviso solo informa altura aproximada 'al 300'; no asignar coordenadas."
  },
  {
    "id": "casa-puente-marquez-1202-1000",
    "recordType": "Casa individual con parque y pileta",
    "name": "Casa 4 ambientes con parque y pileta · Puente de Márquez 1202",
    "locality": "Moreno",
    "address": "Puente de Márquez 1202, Moreno",
    "geocodeQuery": "Puente de Marquez 1202, Moreno, Buenos Aires",
    "source": "https://plataplace.com/propiedad/casa-de-4-ambientes-en-venta-en-moreno-4cd6c792",
    "agency": "Century 21 Nimahaus S.A. (Vicente López)",
    "contact": "Consulta a través del formulario o teléfono de Century 21 Nimahaus S.A.; no se identifica asesor individual en la ficha.",
    "price": "USD 125.000",
    "currency": "USD",
    "landSurfaceM2": 1000,
    "coveredSurfaceM2": 108,
    "surfaceNote": "La ficha publica además 83 m² semicubiertos. La superficie total de 1.000 m² corresponde al lote.",
    "publicationDate": "16/12/2025; vista en la fuente 23/11/2026.",
    "observations": "Casa de cuatro ambientes, tres dormitorios, un baño, pileta, quincho semicubierto y parque. La ficha continúa marcada activa, pero la publicación es antigua; el año de construcción figura como 2026 y debe cotejarse con planos y documentación. No se presume disponibilidad.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "Pendiente de revalidación",
    "verificationStatus": "PlataPlace muestra aviso activo publicado el 16/12/2025 y visto el 23/11/2026. La ficha directa es accesible el 27/11/2026, pero la antigüedad de la publicación y el año de construcción declarado requieren confirmación comercial y documental.",
    "geolocationStatus": "Pendiente: Georef debe devolver coincidencia inequívoca para Puente de Márquez 1202."
  },
  {
    "id": "terreno-san-diego-1687",
    "recordType": "Terreno individual · barrio cerrado",
    "name": "Terreno · San Diego Club de Campo · 1.687 m²",
    "locality": "Moreno · San Diego Club de Campo",
    "address": "San Diego Club de Campo, Moreno; lote interno sin identificación publicada",
    "geocodeDisabled": true,
    "source": "https://www.zonaprop.com.ar/propiedades/clasificado/vecltrin-terreno-en-venta-1687-m-sup2--moreno-60763208.html",
    "sourceAlternates": [
      {
        "url": "https://www.zonaprop.com.ar/propiedades/clasificado/vecltrin-terreno-en-venta-1687-m-sup2--moreno-60575699.html",
        "label": "Ficha similar de 1.687 m² a USD 330.000; orientación noroeste, acceso por calle de tierra mejorada y expensas publicadas de ARS 800.000. No se confirma si es el mismo lote."
      }
    ],
    "agency": "Yacoub Real Estate",
    "contact": "Yacoub Real Estate · no se identifica asesor ni teléfono completo en las fichas consultadas.",
    "price": "USD 320.000 (otra ficha de 1.687 m² publica USD 330.000)",
    "currency": "USD",
    "landSurfaceM2": 1687,
    "coveredSurfaceM2": null,
    "publicationDate": "Fecha original no informada; ambas fichas consultadas el 27/11/2026.",
    "observations": "Las dos publicaciones describen lotes de 1.687 m² en San Diego Club de Campo, pero difieren en precio, orientación, tipo de acceso y expensas. La ficha principal indica USD 320.000 y expensas de ARS 1.000.000 con fecha 29/04/2025; la alternativa indica USD 330.000 y expensas de ARS 800.000. No se identifica parcela interna, por lo que puede tratarse de un mismo lote republicado o de lotes distintos; no se fusiona como parcela confirmada.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "Pendiente de revalidación",
    "verificationStatus": "Dos fichas directas de Zonaprop permanecen accesibles el 27/11/2026 con superficies idénticas de 1.687 m² y precios diferentes (USD 320.000 / USD 330.000). No hay nomenclatura ni lote interno para determinar si son el mismo activo; expensas publicadas son antiguas.",
    "geolocationStatus": "Pendiente: barrio cerrado sin lote interno; no asignar coordenadas parcelarias."
  },
  {
    "id": "terreno-san-diego-2175-historico",
    "recordType": "Terreno individual · antecedente no vigente",
    "name": "Lote forestado · San Diego Club de Campo · 2.175 m² · antecedente",
    "locality": "Moreno · San Diego Club de Campo",
    "address": "San Diego Club de Campo 100, Moreno; lote interno no identificado",
    "geocodeDisabled": true,
    "source": "https://www.argenprop.com/terreno-en-venta-en-moreno--20654766",
    "agency": "RE/MAX Class",
    "contact": "Silvina Talón · corredor responsable Nicolás Sundblad, CPI 7144 / CSI 5821; teléfono parcialmente visible.",
    "price": "USD 290.000 (último precio indexado)",
    "currency": "USD",
    "landSurfaceM2": 2175,
    "coveredSurfaceM2": null,
    "publicationDate": "Fecha original no informada; último resultado indexado consultado 27/11/2026.",
    "observations": "El aviso indexado describía un lote forestado de aproximadamente 2.175 m² y mencionaba posibilidad de venta conjunta con el lote lindero. La URL directa devolvió 410 Gone el 27/11/2026; se conserva en el historial sin afirmar que haya sido vendido.",
    "lat": null,
    "lng": null,
    "lastCheckedAt": "2026-11-27",
    "availabilityStatus": "No vigente",
    "verificationStatus": "El enlace directo de Argenprop devolvió 410 Gone el 27/11/2026; los datos de precio y superficie provienen de un resultado indexado. No se pudo confirmar disponibilidad ni venta.",
    "geolocationStatus": "Pendiente: lote interno sin identificación; no asignar coordenadas."
  }
];
publishedProperties.push(...turn13AdditionalRecords);

const all = [
  ...localities.map(item => ({ ...item, type: "locality" })),
  ...opportunities.map(item => ({ ...item, type: "opportunity" })),
  ...publishedProperties.map(item => ({ ...item, type: "published" }))
];
const kindLabel = {
  industrial: "Productivo / logístico",
  commercial: "Comercial / servicios",
  tourism: "Turismo / recreación",
  land: "Prospección de suelo",
  infrastructure: "Infraestructura urbana"
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

const MAP_VIEW_QUERY_KEYS = ["q", "tipo", "sector", "localidad", "actividad", "proximo", "evidencia", "vigencia", "diligencia", "ref"];
const MAP_VIEW_CATEGORIES = ["all", "locality", "opportunity", "published"];
const MAP_VIEW_KINDS = ["all", "industrial", "commercial", "tourism", "land", "infrastructure"];
const MAP_VIEW_LOCALITIES = ["all", "moreno", "paso", "lareja", "alvarez", "trujui", "cuartel", "unassigned"];
const MAP_VIEW_ACTIVITIES = ["all", "industrial", "commercial", "tourism", "land", "residential", "infrastructure"];
const MAP_VIEW_NEXT_STEPS = ["all", "cadastral", "planning", "publication", "contact", "fieldwork", "feasibility"];
const MAP_VIEW_EVIDENCE = ["all", "documented", "hypothesis", "published-source"];
const MAP_VIEW_AVAILABILITY = ["all", "no-confirmada", "pendiente-revalidacion", "no-vigente", "no-es-oferta"];
const MAP_VIEW_DILIGENCE = ["all", "complete", "pending"];

function mapScopeFromFilters(category, evidence) {
  const type = MAP_VIEW_CATEGORIES.includes(category) ? category : "all";
  const level = MAP_VIEW_EVIDENCE.includes(evidence) ? evidence : "all";
  if (type === "all" && level === "all") return "all";
  if (type === "locality" && level === "all") return "locality";
  if (type === "opportunity" && level === "all") return "territorial";
  if ((type === "all" || type === "opportunity") && level === "documented") return "documented";
  if ((type === "all" || type === "opportunity") && level === "hypothesis") return "hypothesis";
  if ((type === "all" || type === "published") && level === "published-source") return "published";
  if (type === "published" && level === "all") return "published";
  return "custom";
}

function mapFiltersFromScope(scope) {
  const mappings = {
    all: { category: "all", evidence: "all" },
    locality: { category: "locality", evidence: "all" },
    territorial: { category: "opportunity", evidence: "all" },
    documented: { category: "opportunity", evidence: "documented" },
    hypothesis: { category: "opportunity", evidence: "hypothesis" },
    published: { category: "published", evidence: "published-source" }
  };
  return mappings[scope] ? { ...mappings[scope] } : null;
}


function availabilityFilterKey(value) {
  const normalized = String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("es-AR").trim();
  if (normalized === "no confirmada") return "no-confirmada";
  if (normalized === "pendiente de revalidacion") return "pendiente-revalidacion";
  if (normalized === "no vigente") return "no-vigente";
  if (normalized === "no es una oferta de parcela") return "no-es-oferta";
  return "sin-estado";
}

function formatSourceReviewDate(value) {
  const match = String(value || "").match(/^(\d{4})-(\d{2})-(\d{2})$/);
  return match ? match[3] + "/" + match[2] + "/" + match[1] : "No informada";
}

function normalizedDiligenceText(value) {
  return String(value || "").trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("es-AR");
}

function hasDiligenceText(value) {
  const normalized = normalizedDiligenceText(value);
  return Boolean(normalized) && !/^(?:no informad[oa]|sin datos?|no disponible|no visible(?: en .*)?|no publicad[oa]|a confirmar|pendiente|consultar|a consultar|a convenir)$/i.test(normalized);
}

function hasDiligencePrice(value) {
  const normalized = normalizedDiligenceText(value);
  if (!normalized) return false;
  if (/(?:usd|ars|\$)\s*[\d.,]/i.test(normalized)) return true;
  return hasDiligenceText(value) && !/(?:consultar|a convenir|no publicad|sin precio)/i.test(normalized);
}

function hasDiligenceSurface(item) {
  if (Number(item.landSurfaceM2) > 0 || Number(item.coveredSurfaceM2) > 0) return true;
  const note = String(item.surfaceNote || "").trim();
  return hasDiligenceText(note) && /\d+(?:[.,]\d+)?\s*(?:m(?:²|2)|metros?|[×x])/i.test(note);
}

function hasDiligenceAdvertiser(value) {
  const normalized = normalizedDiligenceText(value);
  return hasDiligenceText(value) && !/(?:no visibles?|no identificad[oa]s?|no informad[oa]s?|sin identificar)/i.test(normalized);
}

function hasDiligenceContact(item) {
  const value = String(item.phone || "").trim() || String(item.contact || "").trim();
  const normalized = normalizedDiligenceText(value);
  if (!hasDiligenceText(value)) return false;
  const hasPublicChannel = /(?:formulario|portal|whatsapp|email|correo|telefono|contacto directo)/i.test(normalized);
  return !/^(?:no visible|no informado|no disponible|no publicado|sin datos?)\b/i.test(normalized) || hasPublicChannel;
}





const PUBLISHED_DILIGENCE_FIELDS = [
  { label: "Fuente original", present: item => /^https:/i.test(String(item.source || "").trim()) },
  { label: "Fecha de revisión", present: item => isValidReviewDate(String(item.lastCheckedAt || "")) },
  { label: "Referencia de precio", present: item => hasDiligencePrice(item.price) },
  { label: "Superficie", present: item => hasDiligenceSurface(item) },
  { label: "Anunciante", present: item => hasDiligenceAdvertiser(item.agency) },
  { label: "Referencia de contacto", present: item => hasDiligenceContact(item) },
  { label: "Ubicación textual", present: item => hasDiligenceText(item.address) && hasDiligenceText(item.locality) }
];

function publishedDiligenceSummary(item) {
  if (!item || typeof item !== "object") return null;
  const missing = PUBLISHED_DILIGENCE_FIELDS.filter(field => !field.present(item)).map(field => field.label);
  return {
    reported: PUBLISHED_DILIGENCE_FIELDS.length - missing.length,
    total: PUBLISHED_DILIGENCE_FIELDS.length,
    missing,
    complete: missing.length === 0
  };
}



function normalizePublishedPhone(value) {
  const text = String(value || "").trim();
  const digits = text.replace(/\D/g, "");
  if (digits.length < 8 || digits.length > 15) return null;
  return {
    value: text.replace(/\s+/g, " "),
    href: "tel:" + (text.startsWith("+") ? "+" : "") + digits
  };
}

function publishedContactChannels(item) {
  if (!item || typeof item !== "object") return { phones: [], emails: [] };
  const phonePattern = /\+54\s*(?:9\s*)?(?:\(?\d{2,4}\)?[\s.-]*){1,2}\d{3,4}|\(?0(?:11|237|2320|2324|810)\)?[\s.-]?\d{3,4}[\s.-]?\d{3,4}/gi;
  const phoneCandidates = [];

  [item.phone, item.contact].forEach((raw, index) => {
    const text = String(raw || "");
    const matches = text.match(phonePattern) || [];
    matches.forEach(candidate => phoneCandidates.push(candidate));
    // The dedicated phone field may contain a complete number in another format.
    if (index === 0 && text && !matches.length) phoneCandidates.push(text);
  });

  const phonesByHref = new Map();
  phoneCandidates.forEach(candidate => {
    const channel = normalizePublishedPhone(candidate);
    if (channel && !phonesByHref.has(channel.href)) phonesByHref.set(channel.href, channel);
  });

  const emailPattern = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi;
  const emailCandidates = [item.email, item.contact].flatMap(raw =>
    String(raw || "").match(emailPattern) || []
  );
  const emailsByAddress = new Map();
  emailCandidates.forEach(candidate => {
    const value = candidate.trim();
    const key = value.toLocaleLowerCase("en-US");
    if (value && !emailsByAddress.has(key)) {
      emailsByAddress.set(key, { value, href: "mailto:" + value });
    }
  });

  return {
    phones: Array.from(phonesByHref.values()),
    emails: Array.from(emailsByAddress.values())
  };
}

function normalizeDuplicateSourceUrl(value) {
  try {
    const url = new URL(String(value || "").trim());
    if (url.protocol !== "https:" && url.protocol !== "http:") return null;
    url.hash = "";
    Array.from(url.searchParams.keys()).forEach(key => {
      if (/^(?:utm_.+|fbclid|gclid|mc_cid|mc_eid)$/i.test(key)) url.searchParams.delete(key);
    });
    url.searchParams.sort();
    url.pathname = url.pathname.replace(/\/{2,}/g, "/").replace(/\/+$/, "") || "/";
    return url.toString();
  } catch (error) {
    return null;
  }
}

function collectPotentialDuplicatePairs(items) {
  const records = (Array.isArray(items) ? items : []).filter(item =>
    item && item.id && (item.type === "published" || (!item.type && item.recordType))
  );
  const byId = new Map(records.map(item => [item.id, item]));
  const pairsByKey = new Map();
  const unresolved = [];
  const unresolvedKeys = new Set();

  function addPair(left, right, reason, sharedUrl) {
    if (!left || !right || left.id === right.id) return;
    const ordered = [left, right].sort((a, b) => String(a.id).localeCompare(String(b.id)));
    const key = ordered[0].id + "::" + ordered[1].id;
    let pair = pairsByKey.get(key);
    if (!pair) {
      pair = {
        id: key,
        left: ordered[0],
        right: ordered[1],
        reasons: new Set(),
        sharedSourceUrls: new Set()
      };
      pairsByKey.set(key, pair);
    }
    if (reason) pair.reasons.add(reason);
    if (sharedUrl) pair.sharedSourceUrls.add(sharedUrl);
  }

  records.forEach(item => {
    const targetId = String(item.potentialDuplicateOf || "").trim();
    if (!targetId) return;
    const target = byId.get(targetId);
    if (target) {
      addPair(item, target, "Una ficha declara a la otra como posible duplicado.");
    } else {
      const unresolvedKey = item.id + "::" + targetId;
      if (!unresolvedKeys.has(unresolvedKey)) {
        unresolvedKeys.add(unresolvedKey);
        unresolved.push({ source: item, targetId });
      }
    }
  });

  const sourceIndex = new Map();
  records.forEach(item => {
    const urls = new Set([
      item.source,
      ...(Array.isArray(item.sourceAlternates) ? item.sourceAlternates.map(entry => entry && entry.url) : [])
    ].map(normalizeDuplicateSourceUrl).filter(Boolean));
    urls.forEach(url => {
      if (!sourceIndex.has(url)) sourceIndex.set(url, []);
      sourceIndex.get(url).push(item);
    });
  });

  sourceIndex.forEach((linkedRecords, url) => {
    if (linkedRecords.length < 2) return;
    for (let leftIndex = 0; leftIndex < linkedRecords.length; leftIndex += 1) {
      for (let rightIndex = leftIndex + 1; rightIndex < linkedRecords.length; rightIndex += 1) {
        addPair(linkedRecords[leftIndex], linkedRecords[rightIndex], "Ambas fichas comparten una URL de origen.", url);
      }
    }
  });

  const pairs = Array.from(pairsByKey.values())
    .map(pair => ({
      id: pair.id,
      left: pair.left,
      right: pair.right,
      reasons: Array.from(pair.reasons),
      sharedSourceUrls: Array.from(pair.sharedSourceUrls)
    }))
    .sort((a, b) => a.left.name.localeCompare(b.left.name, "es"));

  return { pairs, unresolved };
}

const PUBLISHED_CARD_PAGE_SIZE = 24;

function paginatePublishedCards(items, limit, selectedId) {
  const list = Array.isArray(items) ? items : [];
  const pageLimit = Number.isInteger(limit) && limit > 0 ? limit : PUBLISHED_CARD_PAGE_SIZE;
  const pageItems = list.slice(0, pageLimit);
  const selected = list.find(item => item && item.id === selectedId);
  const selectedOutsidePage = Boolean(selected && !pageItems.some(item => item.id === selected.id));
  if (selectedOutsidePage) pageItems.push(selected);
  return {
    items: pageItems,
    shown: Math.min(pageLimit, list.length),
    total: list.length,
    hasMore: pageLimit < list.length,
    nextLimit: Math.min(list.length, pageLimit + PUBLISHED_CARD_PAGE_SIZE),
    selectedOutsidePage
  };
}

function normalizeMapViewState(state, items) {
  const s=state||{},query=String(s.query||"").trim().slice(0,100);
  const category=MAP_VIEW_CATEGORIES.includes(s.category)?s.category:"all",kind=MAP_VIEW_KINDS.includes(s.kind)?s.kind:"all";
  const locality=MAP_VIEW_LOCALITIES.includes(s.locality)?s.locality:"all",activity=MAP_VIEW_ACTIVITIES.includes(s.activity)?s.activity:"all";
  const nextStep=MAP_VIEW_NEXT_STEPS.includes(s.nextStep)?s.nextStep:"all",evidence=MAP_VIEW_EVIDENCE.includes(s.evidence)?s.evidence:"all";
  const availability=MAP_VIEW_AVAILABILITY.includes(s.availability)?s.availability:"all",diligence=MAP_VIEW_DILIGENCE.includes(s.diligence)?s.diligence:"all";
  const candidate=String(s.ref||""),ref=(items||[]).some(item=>item.id===candidate)?candidate:null;
  return {query,category,kind,locality,activity,nextStep,evidence,availability,diligence,ref};
}

function parseMapViewState(search, items) {
  const p=new URLSearchParams(String(search||""));
  return normalizeMapViewState({query:p.get("q")||"",category:p.get("tipo")||"all",kind:p.get("sector")||"all",locality:p.get("localidad")||"all",activity:p.get("actividad")||"all",nextStep:p.get("proximo")||"all",evidence:p.get("evidencia")||"all",availability:p.get("vigencia")||"all",diligence:p.get("diligencia")||"all",ref:p.get("ref")},items);
}

function buildMapViewUrl(baseUrl, state, items) {
  const url=new URL(String(baseUrl)),n=normalizeMapViewState(state,items);
  MAP_VIEW_QUERY_KEYS.forEach(key=>url.searchParams.delete(key));
  if(n.query)url.searchParams.set("q",n.query);
  if(n.category!=="all")url.searchParams.set("tipo",n.category);
  if(n.kind!=="all")url.searchParams.set("sector",n.kind);
  if(n.locality!=="all")url.searchParams.set("localidad",n.locality);
  if(n.activity!=="all")url.searchParams.set("actividad",n.activity);
  if(n.nextStep!=="all")url.searchParams.set("proximo",n.nextStep);
  if(n.evidence!=="all")url.searchParams.set("evidencia",n.evidence);
  if(n.availability!=="all")url.searchParams.set("vigencia",n.availability);
  if(n.diligence!=="all")url.searchParams.set("diligencia",n.diligence);
  if(n.ref)url.searchParams.set("ref",n.ref);
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
  const referenceName = String(item && item.name || "una referencia territorial").slice(0, 180);
  const referenceId = String(item && item.id || "").slice(0, 80);
  const message = "Hola, quiero consultar con MORENO sobre esta referencia del Mapa IA: " +
    referenceName + " (ID " + referenceId + "). ¿Podemos revisar la fuente y el próximo paso?";
  const url = new URL("https://wa.me/5491141671674");
  url.searchParams.set("text", message);
  return url.toString();
}

function referenceContactLabel(item) {
  if (item && item.type === "opportunity") return "Consultar esta referencia con MORENO ↗";
  if (item && item.type === "published") return "Consultar esta ficha con MORENO ↗";
  return "Consultar esta localidad con MORENO ↗";
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

function normalizeSearchText(value) {
  return String(value==null?"":value).replace(/[²]/g,"2").replace(/[³]/g,"3").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLocaleLowerCase("es-AR").replace(/[^a-z0-9]+/g," ").trim().replace(/\s+/g," ");
}
function editDistanceAtMostOne(a,b){if(Math.abs(a.length-b.length)>1)return false;let i=0,j=0,e=0;while(i<a.length&&j<b.length){if(a[i]===b[j]){i++;j++;continue;}if(++e>1)return false;if(a.length===b.length){i++;j++;}else if(a.length>b.length)i++;else j++;}if(i<a.length||j<b.length)e++;return e<=1;}
function searchQueryMatches(query,searchable){const q=normalizeSearchText(query);if(!q)return true;const words=normalizeSearchText(searchable).split(" ").filter(Boolean);return q.split(" ").filter(Boolean).every(token=>words.some(word=>word===token||word.startsWith(token)||(token.length>=5&&word.length>=5&&editDistanceAtMostOne(token,word))));}
const LOCALITY_FILTER_TERMS={moreno:["moreno centro"],paso:["paso del rey"],lareja:["la reja"],alvarez:["francisco alvarez"],trujui:["trujui"],cuartel:["cuartel v"]};
const ACTIVITY_FILTER_TERMS={industrial:["industrial","logistico","logistica","productivo","deposito","pyme","carga","transporte","flota","galpon"],commercial:["comercial","comercio","servicios","gastronomia","oficina","local comercial","estacionamiento"],tourism:["turismo","recreacion","recreativo","naturaleza","quinta","dique","hotel"],land:["terreno","lote","parcela","suelo","fraccion","predio","quinta"],residential:["residencial","vivienda","casa","barrio","loteo","habitacional"],infrastructure:["infraestructura","saneamiento","cloacal","desague","pluvial","vial","parque urbano","equipamiento","urbanizacion","obras"]};
const NEXT_STEP_FILTER_TERMS={cadastral:["catastro","nomenclatura","mensura","dominio","titularidad","plancheta","parcela"],planning:["zonificacion","normativa","indicadores","fos","fot","usos","urbanistica","certificado","restricciones"],publication:["publicacion","aviso","vigencia","revalidacion","disponibilidad","stock","precio","fuente","revisar"],contact:["solicitar","consultar","contactar","pedir","comunicar","llamar","contacto","documentacion","expediente"],fieldwork:["identificar","relevar","recorrer","visita","campo","frente","acceso","poligono"],feasibility:["servicios","factibilidad","hidraul","ambient","drenaje","infraestructura","accesos","cota"]};
function referenceMatchesLocality(item,key){
  if(key==="all")return true;
  const locality=normalizeSearchText(item&&item.locality||"");
  const name=normalizeSearchText(item&&item.name||"");
  const address=normalizeSearchText(item&&item.address||"");
  const searchable=[locality,address,(item&&item.type==="locality")?name:"",(item&&item.type==="opportunity")?name:""].filter(Boolean).join(" ");
  if(key==="moreno")return locality==="moreno"||locality.includes("moreno centro")||(item&&item.type==="locality"&&name.includes("moreno centro"));
  if(key==="unassigned")return !Object.values(LOCALITY_FILTER_TERMS).some(a=>a.some(x=>searchable.includes(x)));
  return (LOCALITY_FILTER_TERMS[key]||[]).some(x=>searchable.includes(x));
}
function referenceMatchesActivity(item,key){if(key==="all")return true;const t=normalizeSearchText([item&&item.activity,item&&item.kind,item&&kindLabel[item.kind],item&&item.name,item&&item.business,item&&item.recordType,item&&item.observations,item&&item.evidence].filter(Boolean).join(" "));return Boolean(item&&item.kind===key)||(ACTIVITY_FILTER_TERMS[key]||[]).some(x=>t.includes(x));}
function referenceMatchesNextStep(item,key){if(key==="all")return true;const pub=item&&item.type==="published"?"confirmar vigencia precio stock documentacion contacto":"";const t=normalizeSearchText([item&&item.next,item&&item.status,item&&item.observations,item&&item.verificationStatus,pub].filter(Boolean).join(" "));return (NEXT_STEP_FILTER_TERMS[key]||[]).some(x=>t.includes(x));}
function evidenceMetadata(item){
  if(!item)return {classification:"Sin clasificar",evidenceType:"No clasificada",confidence:"No asignada",sourceDate:"",consultedAt:""};
  if(item.type==="published")return {classification:"Publicación de tercero; el contenido comercial no acredita disponibilidad ni precio final.",evidenceType:"Aviso inmobiliario de tercero",confidence:"Baja para disponibilidad, dominio y precio final; el registro solo conserva el contenido publicado en la fecha de revisión.",sourceDate:item.publicationDate||"No informada",consultedAt:item.lastCheckedAt||"No informada"};
  if(item.type==="locality")return {classification:"Referencia cartográfica orientativa; no representa una parcela.",evidenceType:"Referencia cartográfica orientativa",confidence:"No aplicable a una parcela ni a una oportunidad inmobiliaria.",sourceDate:"",consultedAt:""};
  return {classification:item.stage==="hypothesis"?"Hipótesis de prospección; no es un hecho comprobado.":"Contexto documentado; los hechos se atribuyen a la fuente citada.",evidenceType:item.evidenceType||"Fuente pública no clasificada",confidence:item.confidence||"No asignada; requiere revisión de la fuente y su alcance.",sourceDate:item.sourceDate||"No informada",consultedAt:item.lastCheckedAt||"No informada"};
}
function filterReferences(items,options){
 const s=options||{},q=String(s.query||"").trim(),category=s.category||"all",kind=s.kind||"all";
 const locality=MAP_VIEW_LOCALITIES.includes(s.locality)?s.locality:"all",activity=MAP_VIEW_ACTIVITIES.includes(s.activity)?s.activity:"all",nextStep=MAP_VIEW_NEXT_STEPS.includes(s.nextStep)?s.nextStep:"all";
 const evidence=MAP_VIEW_EVIDENCE.includes(s.evidence)?s.evidence:"all",availability=MAP_VIEW_AVAILABILITY.includes(s.availability)?s.availability:"all",diligence=MAP_VIEW_DILIGENCE.includes(s.diligence)?s.diligence:"all";
 return items.filter(item=>{
  const categoryMatches=category==="all"||(category==="locality"&&item.type==="locality")||(category==="opportunity"&&item.type==="opportunity")||(category==="published"&&item.type==="published");
  const kindMatches=kind==="all"||(item.type==="opportunity"&&item.kind===kind);
  const localityMatches=referenceMatchesLocality(item,locality),activityMatches=referenceMatchesActivity(item,activity),nextStepMatches=referenceMatchesNextStep(item,nextStep);
  const evidenceMatches=evidence==="all"||(evidence==="published-source"&&item.type==="published")||(item.type==="opportunity"&&evidence===item.stage);
  const availabilityMatches=availability==="all"||(item.type==="published"&&availabilityFilterKey(item.availabilityStatus)===availability);
  const d=item.type==="published"?publishedDiligenceSummary(item):null,diligenceMatches=diligence==="all"||(item.type==="published"&&d&&(d.complete?"complete":"pending")===diligence);
  const alternateSources=Array.isArray(item.sourceAlternates)?item.sourceAlternates.flatMap(source=>[source&&source.label,source&&source.url]):[];
  const surfaceSearch=[item.landSurfaceM2!=null?String(item.landSurfaceM2)+" m2 superficie terreno":"",item.coveredSurfaceM2!=null?String(item.coveredSurfaceM2)+" m2 superficie cubierta":""];
  const searchable=[item.id,item.name,item.info,item.business,item.status,item.evidence,item.next,item.kind,kindLabel[item.kind],item.activity,item.recordType,item.locality,item.address,item.agency,item.contact,item.price,item.currency,item.verificationStatus,item.availabilityStatus,item.lastCheckedAt,item.observations,item.surfaceNote,item.landSurfaceM2,item.coveredSurfaceM2,...surfaceSearch,item.publicationDate,item.geolocationStatus,item.evidenceType,item.confidence,item.sourceDate,item.source,...alternateSources].filter(Boolean).join(" ");
  return categoryMatches&&kindMatches&&localityMatches&&activityMatches&&nextStepMatches&&evidenceMatches&&availabilityMatches&&diligenceMatches&&searchQueryMatches(q,searchable);
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
  const raw = String(value == null ? "" : value);
  const formulaLike = typeof value === "string" &&
    (/^[\t\r\n]/.test(raw) || /^[\s\uFEFF]*[=+\-@]/.test(raw));
  const safe = formulaLike ? "'" + raw : raw;
  return '"' + safe.replace(/"/g, '""') + '"';
}

function hasCoordinates(item) {
  if (!item || typeof item !== "object") return false;
  const source = item.coordinateSource || item.geolocationSource;
  const checkedAt = item.coordinateCheckedAt || item.geolocationCheckedAt;
  const latitude = item.lat == null || String(item.lat).trim() === "" ? NaN : Number(item.lat);
  const longitude = item.lng == null || String(item.lng).trim() === "" ? NaN : Number(item.lng);
  let sourceUrl;
  try {
    sourceUrl = new URL(String(source || ""));
  } catch (error) {
    return false;
  }
  return Boolean(
    sourceUrl.protocol === "https:" &&
    sourceUrl.hostname &&
    !sourceUrl.username &&
    !sourceUrl.password &&
    isValidReviewDate(checkedAt) &&
    Number.isFinite(latitude) &&
    latitude >= -90 &&
    latitude <= 90 &&
    Number.isFinite(longitude) &&
    longitude >= -180 &&
    longitude <= 180
  );
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

const GEOREF_MAX_CONCURRENCY = 3;

async function resolvePublishedGeoreferences(items, fetcher, context, concurrency) {
  const list = Array.isArray(items) ? items : [];
  const resolved = new Map();
  if (typeof fetcher !== "function") return resolved;

  const uniqueQueries = new Map();
  list.forEach(item => {
    if (item && item.geocodeDisabled === true) return;
    const query = String(item && (item.geocodeQuery || item.address) || "").trim();
    if (query && !uniqueQueries.has(query)) uniqueQueries.set(query, item);
  });

  const entries = Array.from(uniqueQueries.entries());
  if (!entries.length) return resolved;
  const requestedLimit = Number(concurrency);
  const limit = Number.isInteger(requestedLimit) && requestedLimit > 0
    ? Math.min(requestedLimit, GEOREF_MAX_CONCURRENCY)
    : GEOREF_MAX_CONCURRENCY;
  let nextIndex = 0;

  async function worker() {
    while (true) {
      const index = nextIndex;
      nextIndex += 1;
      if (index >= entries.length) return;

      const [query, sample] = entries[index];
      const params = new URLSearchParams({
        direccion: query,
        provincia: "Buenos Aires",
        departamento: "Moreno",
        max: "5"
      });
      const url = "https://apis.datos.gob.ar/georef/api/v2.0/direcciones?" + params.toString();

      try {
        const response = await fetcher.call(context || null, url, {
          headers: { Accept: "application/json" }
        });
        if (!response || !response.ok) throw new Error("Georef no disponible");
        const data = await response.json();
        const matches = (Array.isArray(data.direcciones) ? data.direcciones : []).filter(entry =>
          entry && entry.ubicacion && georefAddressMatches(sample, entry)
        );
        if (matches.length !== 1) {
          resolved.set(query, null);
          continue;
        }
        const point = matches[0].ubicacion;
        const lat = Number(point.lat);
        const lng = Number(point.lon);
        resolved.set(query, Number.isFinite(lat) && lat >= -90 && lat <= 90 &&
          Number.isFinite(lng) && lng >= -180 && lng <= 180
          ? { lat, lng, nomenclatura: matches[0].nomenclatura || "" }
          : null);
      } catch (error) {
        resolved.set(query, null);
      }
    }
  }

  const workers = Math.min(limit, entries.length);
  await Promise.all(Array.from({ length: workers }, () => worker()));
  return resolved;
}


const GEOREF_CACHE_KEY = "moreno-georef-cache-v1";
const GEOREF_CACHE_TTL_MS = 30 * 24 * 60 * 60 * 1000;
const GEOREF_CACHE_MAX_ENTRIES = 300;

function readGeorefCache(storage, now) {
  const cache = new Map();
  if (!storage || typeof storage.getItem !== "function") return cache;
  const timestamp = typeof now === "number" && Number.isFinite(now) ? now : Date.now();
  let parsed;
  try {
    const raw = storage.getItem(GEOREF_CACHE_KEY);
    if (!raw) return cache;
    parsed = JSON.parse(raw);
  } catch (error) {
    return cache;
  }
  if (!parsed || parsed.version !== 1 || !parsed.records ||
      typeof parsed.records !== "object" || Array.isArray(parsed.records)) return cache;

  Object.keys(parsed.records).forEach(key => {
    const record = parsed.records[key];
    const checkedAt = Number(record && record.checkedAt);
    const lat = Number(record && record.lat);
    const lng = Number(record && record.lng);
    const nomenclatura = String(record && record.nomenclatura || "");
    const age = timestamp - checkedAt;
    if (!key || key !== normalizeAddressText(key) ||
        !Number.isFinite(checkedAt) || age < 0 || age > GEOREF_CACHE_TTL_MS ||
        !Number.isFinite(lat) || lat < -90 || lat > 90 ||
        !Number.isFinite(lng) || lng < -180 || lng > 180 ||
        !nomenclatura) return;
    cache.set(key, { lat, lng, nomenclatura, checkedAt });
  });
  return cache;
}

function writeGeorefCache(storage, cache, now) {
  if (!storage || typeof storage.setItem !== "function" || !(cache instanceof Map)) return false;
  const timestamp = typeof now === "number" && Number.isFinite(now) ? now : Date.now();
  const records = {};
  const entries = Array.from(cache.entries())
    .filter(([key, record]) => {
      const age = timestamp - Number(record && record.checkedAt);
      return Boolean(key) && key === normalizeAddressText(key) &&
        record && Number.isFinite(Number(record.lat)) &&
        Number(record.lat) >= -90 && Number(record.lat) <= 90 &&
        Number.isFinite(Number(record.lng)) &&
        Number(record.lng) >= -180 && Number(record.lng) <= 180 &&
        typeof record.nomenclatura === "string" && record.nomenclatura &&
        Number.isFinite(Number(record.checkedAt)) && age >= 0 && age <= GEOREF_CACHE_TTL_MS;
    })
    .sort((a, b) => Number(b[1].checkedAt) - Number(a[1].checkedAt))
    .slice(0, GEOREF_CACHE_MAX_ENTRIES);

  entries.forEach(([key, record]) => {
    records[key] = {
      lat: Number(record.lat),
      lng: Number(record.lng),
      nomenclatura: record.nomenclatura,
      checkedAt: Number(record.checkedAt)
    };
  });
  try {
    storage.setItem(GEOREF_CACHE_KEY, JSON.stringify({ version: 1, records }));
    return true;
  } catch (error) {
    return false;
  }
}

async function resolvePublishedGeoreferencesCached(items, fetcher, context, storage, now, concurrency) {
  const list = Array.isArray(items) ? items : [];
  const timestamp = typeof now === "number" && Number.isFinite(now) ? now : Date.now();
  const cache = readGeorefCache(storage, timestamp);
  const resolved = new Map();
  const uniqueQueries = new Map();
  list.forEach(item => {
    if (item && item.geocodeDisabled === true) return;
    const query = String(item && (item.geocodeQuery || item.address) || "").trim();
    if (query && !uniqueQueries.has(query)) uniqueQueries.set(query, item);
  });

  const pending = [];
  let cacheHits = 0;
  uniqueQueries.forEach((sample, query) => {
    const key = normalizeAddressText(query);
    const cached = cache.get(key);
    if (cached && georefAddressMatches(sample, { nomenclatura: cached.nomenclatura })) {
      resolved.set(query, {
        lat: cached.lat,
        lng: cached.lng,
        nomenclatura: cached.nomenclatura,
        checkedAt: cached.checkedAt
      });
      cacheHits += 1;
    } else {
      if (cached) cache.delete(key);
      pending.push({ query, sample, key });
    }
  });

  let requested = 0;
  let cacheChanged = false;
  if (typeof fetcher === "function" && pending.length) {
    requested = pending.length;
    const fetched = await resolvePublishedGeoreferences(
      pending.map(entry => entry.sample),
      fetcher,
      context,
      concurrency
    );
    pending.forEach(entry => {
      const point = fetched.get(entry.query) || null;
      const checkedPoint = point && Number.isFinite(Number(point.lat)) &&
        Number(point.lat) >= -90 && Number(point.lat) <= 90 &&
        Number.isFinite(Number(point.lng)) &&
        Number(point.lng) >= -180 && Number(point.lng) <= 180 && point.nomenclatura
        ? { ...point, checkedAt: timestamp }
        : null;
      resolved.set(entry.query, checkedPoint);
      if (checkedPoint) {
        cache.set(entry.key, {
          lat: Number(checkedPoint.lat),
          lng: Number(checkedPoint.lng),
          nomenclatura: String(checkedPoint.nomenclatura),
          checkedAt: timestamp
        });
        cacheChanged = true;
      }
    });
  }

  if (cacheChanged) writeGeorefCache(storage, cache, timestamp);
  return {
    results: resolved,
    cacheHits,
    requested,
    fetchAvailable: typeof fetcher === "function"
  };
}

function buildCsv(items) {
  const headers = [
    "tipo", "nombre", "latitud_referencia", "longitud_referencia", "categoria", "nivel_evidencia",
    "linea_a_investigar", "evidencia_publica", "estado_de_verificacion", "proximo_paso", "fuente",
    "alcance_de_coordenada", "fuente_de_coordenada", "fecha_de_georreferenciacion", "localidad", "ubicacion_publicada", "direccion_publicada", "anunciante",
    "contacto_publico", "precio_publicado", "moneda", "superficie_terreno_m2", "superficie_cubierta_m2",
    "nota_de_superficie", "fecha_aviso", "fecha_revision", "geolocalizacion", "disponibilidad",
    "actividad", "tipo_de_evidencia", "nivel_de_confianza", "fecha_de_fuente", "fecha_de_consulta"
  ];
  const rows = items.map(item => {
    const isLocality = item.type === "locality";
    const isPublished = item.type === "published";
    const coordinatesAvailable = hasCoordinates(item);
    const coordinateScope = !coordinatesAvailable
      ? (isPublished ? "Geolocalización pendiente; ubicación textual conservada." : "Sin coordenada trazable; la ficha permanece en el índice.")
      : (item.coordinatePrecision || (isPublished ? "Coincidencia inequívoca de dirección por Georef; no parcelaria." : "Punto de referencia con fuente cartográfica identificada; no parcelario."));
    const coordinateSourceUrl = isLocality ? item.coordinateSource : (isPublished ? item.geolocationSource : item.coordinateSource);
    const coordinateCheckedAt = isLocality ? item.coordinateCheckedAt : (isPublished ? item.geolocationCheckedAt : item.coordinateCheckedAt);
    const base = [
      isLocality ? "localidad" : (isPublished ? item.recordType : "tesis"), item.name,
      coordinatesAvailable ? item.lat : "", coordinatesAvailable ? item.lng : "",
      isLocality ? "localidad" : (isPublished ? "Propiedades y desarrollos publicados" : (kindLabel[item.kind] || item.kind)),
      isLocality ? "referencia territorial" : (isPublished ? "publicación comercial" : (item.stage === "hypothesis" ? "hipotesis de prospeccion" : "contexto con fuente publica")),
      isLocality ? item.info : (isPublished ? [item.recordType, item.locality, item.address].filter(Boolean).join(" · ") : item.business),
      isLocality ? "Localidad de referencia; no es una evaluación parcelaria." : (isPublished ? item.observations : item.evidence),
      isLocality ? "Centro aproximado de localidad; no parcelario." : (isPublished ? item.verificationStatus : item.status),
      isLocality ? "Definir zona y recopilar información catastral y normativa." : (isPublished ? "Confirmar vigencia, precio, stock y documentación con el anunciante." : item.next),
      item.source || "", coordinateScope, coordinateSourceUrl || "", coordinateCheckedAt || ""
    ];
    const details = isPublished ? [
      item.locality, item.location || item.address, item.address, item.agency, item.contact,
      item.price, item.currency, item.landSurfaceM2, item.coveredSurfaceM2, item.surfaceNote,
      item.publicationDate, item.lastCheckedAt, item.geolocationStatus, item.availabilityStatus
    ] : ["","","","","","","","","","","","","",""];
    const metadata = evidenceMetadata(item);
    const traceability = [item.activity || (isLocality ? "" : (isPublished ? "Actividad inmobiliaria publicada" : (kindLabel[item.kind] || ""))), metadata.evidenceType, metadata.confidence, metadata.sourceDate, metadata.consultedAt];
    return base.concat(details, traceability);
  });
  return "\uFEFF" + [headers, ...rows].map(row => row.map(csvCell).join(",")).join("\r\n");
}

function buildGeoJson(items) {
  const features = items.map(item => {
    const isLocality = item.type === "locality";
    const isPublished = item.type === "published";
    const evidenceLevel = isLocality ? "referencia territorial" : (isPublished ? "publicación comercial" : (item.stage === "hypothesis" ? "hipotesis de prospeccion" : "contexto con fuente publica"));
    const coordinatesAvailable = hasCoordinates(item);
    const coordinateScope = !coordinatesAvailable
      ? (isPublished ? "Geolocalización pendiente; no se asignó coordenada." : "Sin coordenada trazable; la ficha permanece en el índice.")
      : (item.coordinatePrecision || (isPublished ? "Coincidencia inequívoca de dirección por Georef; no representa parcela." : "Punto de referencia con fuente cartográfica identificada; no parcelario."));
    const coordinateSourceUrl = isLocality ? item.coordinateSource : (isPublished ? item.geolocationSource : item.coordinateSource);
    const coordinateCheckedAt = isLocality ? item.coordinateCheckedAt : (isPublished ? item.geolocationCheckedAt : item.coordinateCheckedAt);
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
        coordinate_source_url: coordinateSourceUrl || null, coordinate_checked_at: coordinateCheckedAt || null,
        coordinate_precision: item.coordinatePrecision || (isPublished ? item.geolocationStatus : null),
        activity: item.activity || (isPublished ? "Actividad inmobiliaria publicada" : (kindLabel[item.kind] || null)),
        evidence_type: evidenceMetadata(item).evidenceType, confidence_level: evidenceMetadata(item).confidence,
        source_date: evidenceMetadata(item).sourceDate || null, source_consulted_at: evidenceMetadata(item).consultedAt || null,
        locality: isPublished ? item.locality : (item.locality || null), published_address: isPublished ? item.address : null,
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
    disclaimer: "Solo se exportan puntos con fuente cartográfica y fecha de verificación registradas. Las referencias sin coordenada trazable y las publicaciones sin coincidencia inequívoca conservan geometry:null y siguen en el índice. Ninguna coordenada identifica una parcela ni acredita titularidad, disponibilidad, zonificación, factibilidad o rentabilidad.",
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
  const coordinatesAvailable = hasCoordinates(item);
  const latitude = coordinatesAvailable ? Number(item.lat) : null;
  const longitude = coordinatesAvailable ? Number(item.lng) : null;
  const timestamp = typeof generatedAt === "string" && Number.isFinite(Date.parse(generatedAt))
    ? new Date(generatedAt).toISOString()
    : new Date().toISOString();
  const localityScope = coordinatesAvailable
    ? (item.coordinatePrecision || "Punto de referencia con fuente cartográfica identificada; no parcelario.")
    : "Sin coordenada trazable; la ficha se conserva para investigación documental y no identifica una parcela.";
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
        scope: localityScope,
        sourceUrl: coordinatesAvailable ? safeTerritorialSource(item.coordinateSource) : null,
        checkedAt: coordinatesAvailable ? item.coordinateCheckedAt : null
      },
      coordinateSourceLabel: item.coordinateSourceLabel || null,
      lineToInvestigate: String(item.business || "").trim().slice(0, 1200),
      evidence: String(item.evidence || "").trim().slice(0, 1600),
      evidenceType: evidenceMetadata(item).evidenceType, confidence: evidenceMetadata(item).confidence,
      sourceDate: evidenceMetadata(item).sourceDate, consultedAt: evidenceMetadata(item).consultedAt,
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
  const safeCoordinateSource = safeTerritorialSource(coordinates.sourceUrl);
  const coordinateSourceMarkup = safeCoordinateSource
    ? '<a href="' + escapeTerritorialHtml(safeCoordinateSource) + '" target="_blank" rel="noopener noreferrer">' +
      escapeTerritorialHtml(reference.coordinateSourceLabel || "Fuente cartográfica") + "</a>"
    : "<span>Sin fuente cartográfica; no se representa un punto.</span>";
  const coordinateCheckedAt = coordinates.checkedAt ? " · Verificada: " + escapeTerritorialHtml(coordinates.checkedAt) : "";
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
    '<section><h2>Calidad y trazabilidad</h2><p><strong>Tipo:</strong> ' + escapeTerritorialHtml(reference.evidenceType || "No clasificada") +
    '</p><p><strong>Nivel de confianza:</strong> ' + escapeTerritorialHtml(reference.confidence || "No asignada") +
    '</p><p><strong>Fecha de la fuente:</strong> ' + escapeTerritorialHtml(reference.sourceDate || "No informada") +
    '</p><p><strong>Última consulta registrada:</strong> ' + escapeTerritorialHtml(reference.consultedAt || "No informada") + "</p></section>" +
    "<section><h2>Estado de verificación</h2><p>" + escapeTerritorialHtml(reference.verificationStatus) +
    '</p><p class="muted">La disponibilidad y la identificación parcelaria no se presuponen.</p></section>' +
    "<section><h2>Próximo paso sugerido</h2><p>" + escapeTerritorialHtml(reference.nextStep) + "</p></section>" +
    '<section><h2>Referencia cartográfica</h2><p class="coordinate">' + escapeTerritorialHtml(coordinateText) +
    "</p><p class=\"muted\">" + escapeTerritorialHtml(coordinates.scope || "Sin coordenada trazable; ficha conservada en el índice.") + "</p>" +
    '<p class="muted"><strong>Fuente de coordenada:</strong> ' + coordinateSourceMarkup + coordinateCheckedAt + "</p></section></div>" +
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
  const evidenceLabels = { all: "Todos los niveles", documented: "Contextos con fuente pública", hypothesis: "Hipótesis de prospección", "published-source": "Avisos de terceros" };
  const filterLabels = [];
  if (state.query) filterLabels.push("Búsqueda: " + state.query);
  if (state.category !== "all") filterLabels.push("Tipo: " + categoryLabels[state.category]);
  if (state.kind !== "all") filterLabels.push("Sector: " + (kindLabel[state.kind] || state.kind));
  if (state.locality !== "all") filterLabels.push("Localidad: " + state.locality);
  if (state.activity !== "all") filterLabels.push("Actividad: " + state.activity);
  if (state.nextStep !== "all") filterLabels.push("Próximo paso: " + state.nextStep);
  if (state.evidence !== "all") filterLabels.push("Evidencia: " + evidenceLabels[state.evidence]);
  if (state.availability !== "all") filterLabels.push("Estado de publicación: " + state.availability);
  if (state.diligence !== "all") filterLabels.push("Integridad de ficha: " + state.diligence);
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
      activity: item.activity || (isPublished ? "Actividad inmobiliaria publicada" : (kindLabel[item.kind] || "")),
      evidenceType: evidenceMetadata(item).evidenceType, confidence: evidenceMetadata(item).confidence,
      sourceDate: evidenceMetadata(item).sourceDate, consultedAt: evidenceMetadata(item).consultedAt,
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
    : (state.category !== "all" || state.evidence !== "all" || state.query || state.locality !== "all" || state.activity !== "all" || state.nextStep !== "all" || state.availability !== "all" || state.diligence !== "all"
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

const MAX_TERRITORIAL_DOSSIER_REFERENCES = 500;

function buildTerritorialDossierHtml(dossier) {
  if (!dossier || dossier.schema !== "moreno.territorial-dossier" ||
      dossier.schemaVersion !== 1 || !Array.isArray(dossier.references) ||
      !dossier.references.length || dossier.references.length > MAX_TERRITORIAL_DOSSIER_REFERENCES) return "";
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



function initMapPage(doc) {
  const mapElement = doc.getElementById("map");
  if (!mapElement) return;

  const zoomInButton = doc.getElementById("map-zoom-in");
  const zoomOutButton = doc.getElementById("map-zoom-out");
  const reframeMapButton = doc.getElementById("map-fit-all");
  const mapTouchControls = doc.getElementById("map-touch-controls");
  const statusElement = doc.getElementById("map-status");
  const boundaryElement = doc.getElementById("boundary-status");
  const searchInput = doc.getElementById("search");
  const searchResultsStatus = doc.getElementById("search-results-status");
  const categoryInput = doc.getElementById("category");
  const scopeInput = doc.getElementById("scope-filter");
  const kindInput = doc.getElementById("kind-filter");
  const localityInput = doc.getElementById("locality-filter");
  const activityInput = doc.getElementById("activity-filter");
  const nextStepInput = doc.getElementById("next-step-filter");
  const evidenceInput = doc.getElementById("evidence-filter");
  const availabilityInput = doc.getElementById("availability-filter");
  const diligenceInput = doc.getElementById("diligence-filter");
  const advancedFiltersButton = doc.getElementById("open-advanced-filters");
  const advancedFiltersDialog = doc.getElementById("map-advanced-filters");
  const advancedFiltersCloseButton = doc.getElementById("close-advanced-filters");
  const advancedFiltersDoneButton = doc.getElementById("apply-advanced-filters");
  const advancedFiltersResetButton = doc.getElementById("reset-advanced-filters");
  const advancedFilterCount = doc.getElementById("advanced-filter-count");
  const emptyState = doc.getElementById("map-empty-state");
  const duplicateReviewDisclosure = doc.getElementById("duplicate-review-disclosure");
  const duplicateReviewSummary = doc.getElementById("duplicate-review-summary");
  const duplicateReviewList = doc.getElementById("duplicate-review-list");
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
  let publishedCardsLimit = PUBLISHED_CARD_PAGE_SIZE;
  let renderedPublishedCardIds = new Set();
  let map = null;
  let municipalBounds = null;
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
  localityInput.value = initialViewState.locality;
  activityInput.value = initialViewState.activity;
  nextStepInput.value = initialViewState.nextStep;
  evidenceInput.value = initialViewState.evidence;
  if (scopeInput) {
    const initialScope = mapScopeFromFilters(categoryInput.value, evidenceInput.value);
    if (initialScope === "custom") {
      const customOption = doc.createElement("option");
      customOption.value = "custom";
      customOption.textContent = "Combinación guardada";
      scopeInput.append(customOption);
    }
    scopeInput.value = initialScope;
  }
  availabilityInput.value = initialViewState.availability;
  diligenceInput.value = initialViewState.diligence;
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
    note.textContent = "Este esquema conserva únicamente referencias con fuente cartográfica y fecha verificables, sin depender de teselas externas; no es cartografía oficial, no tiene escala y no representa calles, límites administrativos ni parcelas. Las oportunidades sin coordenada trazable y las publicaciones sin coincidencia inequívoca en Georef permanecen en el índice con su ubicación textual y sin punto asignado.";
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
    if (mapTouchControls) mapTouchControls.hidden = true;
    const activeMap = map;
    map = null;
    if (activeMap) {
      try { activeMap.remove(); } catch (error) {}
    }
    renderStaticFallback(visibleItems);
    statusElement.textContent = "Esquema territorial alternativo · fichas de investigación activas";
    boundaryElement.textContent = "Límite municipal: no representado en el esquema";
  }

  function reframeMap() {
    if (!map) return false;
    let bounds = municipalBounds;
    if ((!bounds || bounds.isEmpty()) && typeof maplibregl !== "undefined" && maplibregl.LngLatBounds) {
      bounds = new maplibregl.LngLatBounds();
      all.forEach(item => {
        if (hasCoordinates(item)) bounds.extend([Number(item.lng), Number(item.lat)]);
      });
    }
    const view = doc.defaultView;
    if (bounds && !bounds.isEmpty()) {
      map.fitBounds(bounds, {
        padding: view && Number(view.innerWidth) <= 760 ? 24 : 56,
        maxZoom: 12,
        duration: prefersReducedMotion(view) ? 0 : 450
      });
    } else {
      const camera = { center: [-58.7898, -34.6397], zoom: 11 };
      if (prefersReducedMotion(view)) map.jumpTo(camera);
      else map.flyTo({ ...camera, essential: true });
    }
    statusElement.textContent = "Vista general del Partido de Moreno.";
    return true;
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
      addLine("Precisión de ubicación:", item.coordinatePrecision);
      addLine("Fecha de coordenada:", item.coordinateCheckedAt);
      const coordinateLink = coordinateSourceLink(item.coordinateSource, item.coordinateSourceLabel);
      if (coordinateLink) box.append(coordinateLink);
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
      addLine("Fecha de georreferencia:", item.geolocationCheckedAt || "No informada");
      const coordinateLink = coordinateSourceLink(item.geolocationSource, item.geolocationSourceLabel);
      if (coordinateLink) box.append(coordinateLink);
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
    const traceability = evidenceMetadata(item);
    addLine("Clasificación:", traceability.classification);
    addLine("Tipo de evidencia:", traceability.evidenceType);
    addLine("Confianza:", traceability.confidence);
    addLine("Fecha de la fuente:", traceability.sourceDate);
    addLine("Última consulta registrada:", traceability.consultedAt);
    addLine("Precisión de coordenada:", item.coordinatePrecision || "Sin coordenada trazable; la ficha permanece en el índice.");
    addLine("Fecha de coordenada:", item.coordinateCheckedAt || "No informada");
    const coordinateLink = coordinateSourceLink(item.coordinateSource, item.coordinateSourceLabel);
    if (coordinateLink) box.append(coordinateLink);
    const link = doc.createElement("a");
    link.href = item.source;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = "Consultar fuente pública ↗";
    box.append(link);
    const note = doc.createElement("p");
    note.textContent = item.coordinatePrecision || "Punto de referencia con fuente identificada; no representa una parcela ni acredita disponibilidad.";
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

  function coordinateSourceLink(source, label) {
    const href = safeTerritorialSource(source);
    if (!href) return null;
    const link = doc.createElement("a");
    link.className = "map-source-link map-coordinate-source-link";
    link.href = href;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = (label || "Fuente de coordenada") + " ↗";
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
    element.dataset.mapReference = item.id;
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
    resolvePublishedGeoreferencesCached(
      publishedProperties,
      fetcher,
      view,
      reviewStorage,
      Date.now(),
      GEOREF_MAX_CONCURRENCY
    ).then(resolution => {
      const resolved = resolution.results;
      publishedProperties.forEach(item => {
        const point = item.geocodeDisabled ? null : resolved.get(item.geocodeQuery || item.address);
        if (item.geocodeDisabled === true) {
          item.lat = null;
          item.lng = null;
          item.geolocationSource = null;
          item.geolocationCheckedAt = null;
          item.geolocationStatus = item.geolocationStatus || "Pendiente: la publicación no aporta una dirección exacta verificable.";
        } else if (point && point.checkedAt) {
          item.lat = point.lat;
          item.lng = point.lng;
          item.geocodeReference = point.nomenclatura;
          const georefParams = new URLSearchParams({
            direccion: item.geocodeQuery || item.address,
            provincia: "Buenos Aires",
            departamento: "Moreno",
            max: "5"
          });
          item.geolocationSource = "https://apis.datos.gob.ar/georef/api/v2.0/direcciones?" + georefParams.toString();
          item.geolocationSourceLabel = "Georef · respuesta oficial de dirección";
          item.geolocationCheckedAt = new Date(point.checkedAt).toISOString().slice(0, 10);
          item.geolocationStatus = "Coincidencia inequívoca de dirección obtenida mediante Georef; no parcelaria.";
        } else {
          item.lat = null;
          item.lng = null;
          item.geolocationSource = null;
          item.geolocationCheckedAt = null;
          item.geolocationStatus = resolution.fetchAvailable
            ? "Pendiente: Georef no devolvió una coincidencia inequívoca para la dirección publicada."
            : "Pendiente: el navegador no habilitó la consulta de Georef en esta sesión.";
        }
        addMapMarker(item);
      });
      render();
      const selected = all.find(item => item.id === selectedReferenceId);
      if (selected && markers.has(selected.id) && !userHasNavigated) focusItem(selected);
      const located = publishedProperties.filter(hasCoordinates).length;
      const cacheNote = resolution.cacheHits
        ? resolution.cacheHits + " direcciones recuperadas de caché local (vigencia máxima de 30 días); "
        : "";
      const requestNote = resolution.fetchAvailable
        ? (resolution.requested
          ? resolution.requested + " consultas nuevas a Georef."
          : "Sin consultas nuevas a Georef.")
        : "Georef no está disponible en esta sesión.";
      statusElement.textContent = located + " de " + publishedProperties.length +
        " publicaciones georreferenciadas por dirección; " + cacheNote + requestNote;
    }).catch(() => {
      publishedProperties.forEach(item => {
        item.lat = null;
        item.lng = null;
        item.geolocationSource = null;
        item.geolocationCheckedAt = null;
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
      locality: localityInput.value,
      activity: activityInput.value,
      nextStep: nextStepInput.value,
      evidence: evidenceInput.value,
      availability: availabilityInput.value,
      diligence: diligenceInput.value,
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
    if (item.type === "published" && !renderedPublishedCardIds.has(item.id)) {
      makePublishedCards(visibleItems.filter(reference => reference.type === "published"), publishedList);
    }
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

      if (map && hasCoordinates(item)) {
        const focusButton = doc.createElement("button");
        focusButton.type = "button";
        focusButton.className = "map-focus-button";
        focusButton.textContent = "Ubicar en el mapa";
        focusButton.setAttribute("aria-label", "Centrar el mapa en " + item.name);
        focusButton.addEventListener("click", () => focusItem(item));
        actions.append(focusButton);
      } else if (map && item.type === "opportunity") {
        const pendingLocation = doc.createElement("span");
        pendingLocation.className = "map-published-pending";
        pendingLocation.textContent = "Sin marcador · la fuente no identifica un punto preciso";
        actions.append(pendingLocation);
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
      addDetail("Precisión de coordenada", item.coordinatePrecision || (hasCoordinates(item)
        ? "Punto de referencia con fuente cartográfica identificada; no parcelario."
        : "Sin coordenada trazable; la ficha permanece en el índice."));
      if (item.coordinateCheckedAt) addDetail("Fecha de verificación de coordenada", item.coordinateCheckedAt);
      const coordinateLink = coordinateSourceLink(item.coordinateSource, item.coordinateSourceLabel);
      if (coordinateLink) body.append(coordinateLink);

      if (item.type === "locality") {
        addDetail("Lectura territorial", item.info);
      } else {
        addDetail("Línea a investigar", item.business);
        addDetail("Qué sabemos", item.evidence);
        addDetail("Estado de verificación", item.status);
        addDetail("Próximo paso", item.next);
        const traceability = evidenceMetadata(item);
        addDetail("Clasificación de evidencia", traceability.classification);
        addDetail("Tipo de evidencia", traceability.evidenceType);
        addDetail("Nivel de confianza", traceability.confidence);
        addDetail("Fecha de la fuente", traceability.sourceDate);
        addDetail("Última consulta registrada", traceability.consultedAt);
        addDetail("Localidad declarada", item.locality);
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
    const page = paginatePublishedCards(items, publishedCardsLimit, selectedReferenceId);
    target.replaceChildren();
    renderedPublishedCardIds = new Set(page.items.map(item => item.id));

    if (!page.total) {
      const empty = doc.createElement("p");
      empty.className = "map-published-empty";
      empty.textContent = "No hay publicaciones que coincidan con los filtros actuales.";
      target.append(empty);
      return;
    }

    page.items.forEach(item => {
      const card = doc.createElement("details");
      card.className = "map-item map-item-published";
      card.dataset.mapItem = item.id;
      if (selectedReferenceId === item.id) { card.classList.add("is-active"); card.open = true; }
      const summary = doc.createElement("summary");
      summary.addEventListener("click", () => setActiveReference(item));
      const title = doc.createElement("strong");
      title.textContent = item.name;
      const meta = doc.createElement("span");
      meta.className = "map-published-meta";
      meta.textContent = item.recordType + " · " + item.locality;
      const availability = doc.createElement("span");
      availability.className = "map-published-status map-published-status--" + availabilityFilterKey(item.availabilityStatus);
      availability.textContent = item.availabilityStatus || "Estado no informado";
      const reviewDate = doc.createElement("small");
      reviewDate.className = "map-published-review-date";
      reviewDate.textContent = item.lastCheckedAt
        ? "Revisión de fuente: " + formatSourceReviewDate(item.lastCheckedAt)
        : "Revisión de fuente: no informada";
      summary.append(title, meta, availability, reviewDate);
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
      if (Array.isArray(item.sourceAlternates)) {
        item.sourceAlternates.forEach(alternate => {
          if (!alternate || !alternate.url) return;
          const alternateLink = doc.createElement("a");
          alternateLink.className = "map-source-link map-source-alternate";
          alternateLink.href = alternate.url;
          alternateLink.target = "_blank";
          alternateLink.rel = "noopener noreferrer";
          alternateLink.textContent = alternate.label || "Abrir fuente complementaria ↗";
          actions.append(alternateLink);
        });
      }
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
      const publicChannels = publishedContactChannels(item);
      publicChannels.phones.forEach((channel, index) => {
        const phoneLink = doc.createElement("a");
        phoneLink.className = "map-public-contact-link map-public-contact-phone";
        phoneLink.href = channel.href;
        phoneLink.textContent = "Llamar · " + channel.value;
        phoneLink.setAttribute("aria-label", "Llamar al contacto publicado " + (index + 1) + " de " + item.name + ": " + channel.value);
        actions.append(phoneLink);
      });
      publicChannels.emails.forEach((channel, index) => {
        const emailLink = doc.createElement("a");
        emailLink.className = "map-public-contact-link map-public-contact-email";
        emailLink.href = channel.href;
        emailLink.textContent = "Email · " + channel.value;
        emailLink.setAttribute("aria-label", "Enviar email al contacto publicado " + (index + 1) + " de " + item.name + ": " + channel.value);
        actions.append(emailLink);
      });
      body.append(actions);
      const diligence = publishedDiligenceSummary(item);
      if (diligence) {
        const diligencePanel = doc.createElement("section");
        diligencePanel.className = "map-published-diligence";
        diligencePanel.dataset.diligence = diligence.complete ? "complete" : "pending";
        diligencePanel.setAttribute("aria-label", "Control de presencia de datos de prospección");
        const diligenceTitle = doc.createElement("strong");
        diligenceTitle.textContent = "Diligencia inicial · " + diligence.reported + "/" + diligence.total + " datos informados";
        const diligenceNote = doc.createElement("p");
        diligenceNote.textContent = diligence.missing.length
          ? "Datos pendientes de completar en esta ficha: " + diligence.missing.join(" · ") + "."
          : "Los siete campos están informados; contrastá cada dato en la fuente original.";
        diligencePanel.append(diligenceTitle, diligenceNote);
        body.append(diligencePanel);
      }
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
      addDetail("Fecha de georreferencia:", item.geolocationCheckedAt);
      const georefLink = coordinateSourceLink(item.geolocationSource, item.geolocationSourceLabel);
      if (georefLink) body.append(georefLink);
      addDetail("Observaciones:", item.observations);
      const traceability = evidenceMetadata(item);
      addDetail("Clasificación de evidencia:", traceability.classification);
      addDetail("Tipo de evidencia:", traceability.evidenceType);
      addDetail("Confianza:", traceability.confidence);
      addDetail("Fecha de la fuente:", traceability.sourceDate);
      addDetail("Última consulta registrada:", traceability.consultedAt);
      card.append(body);
      target.append(card);
    });

    const pagination = doc.createElement("div");
    pagination.className = "map-published-pagination";
    pagination.setAttribute("aria-label", "Paginación de publicaciones");
    const paginationStatus = doc.createElement("p");
    paginationStatus.className = "map-published-pagination-status";
    paginationStatus.setAttribute("role", "status");
    paginationStatus.setAttribute("aria-live", "polite");
    paginationStatus.textContent = page.selectedOutsidePage
      ? "Mostrando " + page.shown + " de " + page.total + " publicaciones; también se muestra la referencia seleccionada fuera de este tramo."
      : "Mostrando " + page.shown + " de " + page.total + " publicaciones.";
    pagination.append(paginationStatus);
    if (page.hasMore) {
      const remaining = Math.min(PUBLISHED_CARD_PAGE_SIZE, page.total - page.shown);
      const more = doc.createElement("button");
      more.type = "button";
      more.id = "show-more-published";
      more.className = "map-published-more";
      more.textContent = "Mostrar las siguientes " + remaining + " publicaciones";
      more.setAttribute("aria-label", "Mostrar las siguientes " + remaining + " publicaciones de " + page.total);
      more.addEventListener("click", () => {
        publishedCardsLimit = page.nextLimit;
        makePublishedCards(items, target);
      });
      pagination.append(more);
    }
    target.append(pagination);
  }

  function renderPotentialDuplicateReview() {
    if (!duplicateReviewDisclosure || !duplicateReviewSummary || !duplicateReviewList) return;
    const review = collectPotentialDuplicatePairs(all);
    duplicateReviewDisclosure.hidden = review.pairs.length === 0 && review.unresolved.length === 0;
    duplicateReviewSummary.textContent =
      review.pairs.length + " relaciones para revisar · " +
      review.unresolved.length + " referencias sin destino";
    duplicateReviewList.replaceChildren();

    review.pairs.forEach(pair => {
      const article = doc.createElement("article");
      article.className = "map-duplicate-pair";
      article.dataset.duplicatePair = pair.id;

      const heading = doc.createElement("h3");
      heading.textContent = pair.left.name + " ↔ " + pair.right.name;

      const evidence = doc.createElement("p");
      evidence.className = "map-duplicate-evidence";
      evidence.textContent = pair.reasons.join(" ");

      const links = doc.createElement("div");
      links.className = "map-duplicate-pair-links";
      [pair.left, pair.right].forEach((record, index) => {
        const link = doc.createElement("a");
        link.className = "map-duplicate-reference-link";
        link.dataset.duplicateReference = record.id;
        link.href = buildReferenceUrl(doc.defaultView.location.href, record.id);
        link.textContent = "Ficha " + (index === 0 ? "A" : "B") + ": " + record.name + " ↗";
        links.append(link);
      });

      pair.sharedSourceUrls.forEach(url => {
        const sourceLink = doc.createElement("a");
        sourceLink.className = "map-duplicate-source-link";
        sourceLink.href = url;
        sourceLink.target = "_blank";
        sourceLink.rel = "noopener noreferrer";
        sourceLink.textContent = "Abrir fuente compartida ↗";
        links.append(sourceLink);
      });

      article.append(heading, evidence, links);
      duplicateReviewList.append(article);
    });

    review.unresolved.forEach(entry => {
      const warning = doc.createElement("p");
      warning.className = "map-duplicate-unresolved";
      warning.textContent = "Vínculo pendiente: " + entry.source.name +
        " apunta a la referencia inexistente " + entry.targetId + ".";
      duplicateReviewList.append(warning);
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
    if (advancedFilterCount && advancedFiltersButton) {
      const activeAdvancedCount = [availabilityInput.value !== "all", diligenceInput.value !== "all"].filter(Boolean).length;
      advancedFilterCount.textContent = activeAdvancedCount ? activeAdvancedCount + " activos" : "Opcional";
      advancedFiltersButton.setAttribute("aria-label", activeAdvancedCount ? "Más criterios, " + activeAdvancedCount + " activos" : "Más criterios");
      advancedFiltersButton.classList.toggle("has-active-filters", activeAdvancedCount > 0);
    }

    const shown = filterReferences(all, {
      query: searchInput.value,
      category: categoryInput.value,
      kind: kindInput.value,
      locality: localityInput.value,
      activity: activityInput.value,
      nextStep: nextStepInput.value,
      evidence: evidenceInput.value,
      availability: availabilityInput.value,
      diligence: diligenceInput.value
    });
    visibleItems = shown;
    if (searchResultsStatus) {
      const noActiveFilters = !searchInput.value.trim() && categoryInput.value === "all" && kindInput.value === "all" && localityInput.value === "all" && activityInput.value === "all" && nextStepInput.value === "all" && evidenceInput.value === "all" && availabilityInput.value === "all" && diligenceInput.value === "all";
      if (noActiveFilters) {
        searchResultsStatus.textContent = all.length + " referencias cargadas. Buscá localidad, calle, actividad, evidencia, fuente, superficie o próximo paso. Las fichas sin coordenadas siguen en el índice.";
      } else if (shown.length) {
        const publishedCount = shown.filter(item => item.type === "published").length;
        const opportunityCount = shown.filter(item => item.type === "opportunity").length;
        const localityCount = shown.filter(item => item.type === "locality").length;
        const unlocatedCount = shown.filter(item => !hasCoordinates(item)).length;
        const matchLabel = shown.length === 1 ? "coincidencia" : "coincidencias";
        searchResultsStatus.textContent = shown.length + " " + matchLabel + ": " + publishedCount + " publicaciones, " + opportunityCount + " referencias territoriales y " + localityCount + " localidades; " + unlocatedCount + " fichas sin coordenadas verificables siguen en el índice.";
      } else {
        searchResultsStatus.textContent = "0 coincidencias. Probá con menos palabras o restablecé los filtros.";
      }
    }
    if (emptyState) emptyState.hidden = shown.length > 0;
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
        center: [-58.7898, -34.6397],
        zoom: 12,
        maxZoom: 19,
        dragPan: true,
        touchZoomRotate: true,
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
          municipalBounds = bounds;
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
  function resetPublishedPaginationAndRender() {
    publishedCardsLimit = PUBLISHED_CARD_PAGE_SIZE;
    render();
  }

  if (scopeInput) {
    scopeInput.addEventListener("change", () => {
      const mappedFilters = mapFiltersFromScope(scopeInput.value);
      if (mappedFilters) {
        categoryInput.value = mappedFilters.category;
        evidenceInput.value = mappedFilters.evidence;
      }
      resetPublishedPaginationAndRender();
    });
  }
  if (advancedFiltersButton && advancedFiltersDialog) {
    const closeAdvancedFilters = () => {
      if (advancedFiltersDialog.open && typeof advancedFiltersDialog.close === "function") {
        advancedFiltersDialog.close();
      } else {
        advancedFiltersDialog.removeAttribute("open");
      }
      advancedFiltersButton.setAttribute("aria-expanded", "false");
    };
    advancedFiltersButton.addEventListener("click", () => {
      if (!advancedFiltersDialog.open) {
        if (typeof advancedFiltersDialog.showModal === "function") advancedFiltersDialog.showModal();
        else advancedFiltersDialog.setAttribute("open", "");
        advancedFiltersButton.setAttribute("aria-expanded", "true");
      }
    });
    if (advancedFiltersCloseButton) advancedFiltersCloseButton.addEventListener("click", closeAdvancedFilters);
    if (advancedFiltersDoneButton) advancedFiltersDoneButton.addEventListener("click", closeAdvancedFilters);
    if (advancedFiltersResetButton) advancedFiltersResetButton.addEventListener("click", () => {
      availabilityInput.value = "all";
      diligenceInput.value = "all";
      resetPublishedPaginationAndRender();
    });
    advancedFiltersDialog.addEventListener("close", () => advancedFiltersButton.setAttribute("aria-expanded", "false"));
  }

  searchInput.addEventListener("input", resetPublishedPaginationAndRender);
  categoryInput.addEventListener("change", resetPublishedPaginationAndRender);
  kindInput.addEventListener("change", resetPublishedPaginationAndRender);
  localityInput.addEventListener("change", resetPublishedPaginationAndRender);
  activityInput.addEventListener("change", resetPublishedPaginationAndRender);
  nextStepInput.addEventListener("change", resetPublishedPaginationAndRender);
  evidenceInput.addEventListener("change", resetPublishedPaginationAndRender);
  availabilityInput.addEventListener("change", resetPublishedPaginationAndRender);
  diligenceInput.addEventListener("change", resetPublishedPaginationAndRender);
  shareViewButton.addEventListener("click", shareCurrentView);
  if (zoomInButton) zoomInButton.addEventListener("click", () => {
    if (map) map.zoomIn({ duration: prefersReducedMotion(doc.defaultView) ? 0 : 180 });
  });
  if (zoomOutButton) zoomOutButton.addEventListener("click", () => {
    if (map) map.zoomOut({ duration: prefersReducedMotion(doc.defaultView) ? 0 : 180 });
  });
  if (reframeMapButton) reframeMapButton.addEventListener("click", reframeMap);
  dossierExportButton.addEventListener("click", downloadTerritorialDossier);
  const emptyResetButton = doc.getElementById("reset-empty-state");
  if (emptyResetButton) emptyResetButton.addEventListener("click", () => doc.getElementById("reset-map").click());
  doc.getElementById("reset-map").addEventListener("click", () => {
    searchInput.value = "";
    categoryInput.value = "all";
    if (scopeInput) scopeInput.value = "all";
    kindInput.value = "all";
    localityInput.value = "all";
    activityInput.value = "all";
    nextStepInput.value = "all";
    evidenceInput.value = "all";
    availabilityInput.value = "all";
    diligenceInput.value = "all";
    publishedCardsLimit = PUBLISHED_CARD_PAGE_SIZE;
    selectedReferenceId = null;
    updateShareUrl(null);
    render();
    if (map) {
      const home = { center: [-58.7898, -34.6397], zoom: 12 };
      if (prefersReducedMotion(doc.defaultView)) map.jumpTo(home);
      else map.flyTo({ ...home, essential: true });
    }
  });
  renderPotentialDuplicateReview();
  render();
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    localities, opportunities, publishedProperties, all, countInventory, filterReferences, buildCsv, buildGeoJson, hasCoordinates, georefAddressMatches,
    mapScopeFromFilters, mapFiltersFromScope,
    availabilityFilterKey, formatSourceReviewDate, publishedDiligenceSummary, publishedContactChannels, collectPotentialDuplicatePairs,
    paginatePublishedCards, PUBLISHED_CARD_PAGE_SIZE,
    resolvePublishedGeoreferences, resolvePublishedGeoreferencesCached,
    readGeorefCache, writeGeorefCache, GEOREF_MAX_CONCURRENCY,
    GEOREF_CACHE_KEY, GEOREF_CACHE_TTL_MS,
    getSharedReferenceId, normalizeMapViewState, parseMapViewState, buildMapViewUrl,
    buildReferenceUrl, buildOpportunityContactUrl, referenceContactLabel,
    shouldFitMunicipalBounds, prefersReducedMotion, reviewTasks, REVIEW_STORAGE_KEY, LEGACY_REVIEW_STORAGE_KEY,
    isValidReviewDate, normalizeReviewState, readReviewState, writeReviewState, clearReviewState, updateReviewState,
    getReviewSummary, buildReviewExport, parseReviewImport, mergeReviewStates,
    buildTerritorialBrief, buildTerritorialBriefHtml,
    MAX_TERRITORIAL_DOSSIER_REFERENCES, buildTerritorialDossier, buildTerritorialDossierDiagram, buildTerritorialDossierHtml
  };
}
if (typeof document !== "undefined") initMapPage(document);
