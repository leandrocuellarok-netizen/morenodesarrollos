# Moreno Desarrollos

Repositorio de trabajo para análisis territorial, normativo, fiscal y de oportunidades de desarrollo inmobiliario en el Partido de Moreno, Provincia de Buenos Aires.

## Referencia territorial y cartográfica

- **Mapa de Poblaciones:** https://mapa.poblaciones.org/map/96301/#/@-34.669891,-58.772049,12z&r15275/l=280001!v1!w0,0,0,0,0
- **Centro inicial:** latitud -34.669891, longitud -58.772049
- **Zoom inicial:** 12

Esta referencia es un punto de partida. No reemplaza la verificación oficial de zonificación, indicadores parcelarios, usos permitidos, titularidad, restricciones, mensura ni factibilidades.

## Los cinco pilares del desarrollo inmobiliario

1. **Originar el negocio:** analizar mercado y demanda, detectar oportunidades, seleccionar terrenos o inmuebles y evaluar su potencial constructivo.
2. **Estructuración legal y financiera:** definir el vehículo jurídico, estimar costos y flujo de fondos, y estructurar el capital.
3. **Diseño y aprobaciones:** desarrollar el proyecto ejecutivo y tramitar permisos y factibilidades.
4. **Ejecución de obra:** contratar y supervisar la construcción, controlando plazos, calidad y presupuesto.
5. **Comercialización y entrega:** vender o alquilar las unidades, formalizar la escrituración y organizar la puesta en marcha del consorcio.

## Fuentes normativas y código

- [Índice documental de Moreno](docs/INDICE_DOCUMENTAL_MORENO.md)
- [Captura de código del portal Turismo de Moreno](web/turismo-moreno/README.md)

## Estrategia de originación — Pilar 1

- [Módulo Pilar 1](strategy/pillar-1/README.md)
- [Prompt maestro](strategy/pillar-1/MASTER_PROMPT_PILAR_1.md)
- [Código Python de evaluación y scoring](strategy/pillar-1/pillar1_origination.py)
- [Investigación territorial inicial de Moreno](research/pilar-1/README.md)

La investigación inicial identifica cinco tesis territoriales preliminares: corredor productivo-logístico RP25/Darwin Passaponti/Av. San Fernando; nodo RP24/RP25 y servicios complementarios de Ecoparque; comercio y servicios en Paso del Rey/Camino de la Ribera; turismo de cercanía en Distrito Ecológico Roggero; y prospección de parcelas grandes en Cuartel V, Trujui y La Reja.

**Estado:** son tesis para investigación. No se presentan todavía veinte parcelas verificadas ni un ROI demostrado. Cada operación requiere comprobación dominial, catastral, urbanística, ambiental, hidráulica, de servicios y financiera.


## Mapa interactivo de originación

- [Abrir mapa interactivo de Moreno](web/mapa-moreno/index.html)
- Incluye localidades y cinco tesis territoriales del Pilar 1, con búsqueda por contenido, filtros por tipo y nivel de evidencia, fichas emergentes, leyenda y enlaces a fuentes públicas.
- Distingue el contexto respaldado por una fuente pública de las hipótesis de prospección; esa distinción no equivale a verificar parcelas ni disponibilidad.
- Superpone el límite administrativo municipal mediante GeoJSON de Georef / IGN (WGS84), con ajuste automático del encuadre.
- Los marcadores de oportunidades son referencias aproximadas de áreas/corredores, no parcelas ni límites oficiales.


## Sitio de marca personal — Erica M. Acosta

Sitio personal de Erica M. Acosta en evolución, con cuatro destinos principales:

- / — Inicio: presentación del proyecto, desarrollo inmobiliario, inteligencia territorial e IA aplicada.
- /mapa-ia/ — Mapa IA: mapa interactivo del Partido de Moreno, localidades y cinco tesis preliminares de oportunidad.
- /erica-acosta/ — Sobre Erica: perfil personal y enfoque de trabajo, con énfasis en residencia local, iniciativa emprendedora y alianzas.
- /oportunidades/ — Captación inicial: formulario opcional para propietarios, inversores y aliados, con ubicación y nomenclatura catastral cuando estén disponibles.

### Identidad visual y contenido

- Paleta: marfil, grafito, piedra, ocre y naranja quemado.
- Lenguaje gráfico: ilustración arquitectónica editorial dibujada en SVG, retícula sutil, líneas de plano y cartografía monocromática.
- Diseño responsive y navegación común entre las cuatro páginas.
- Metadatos SEO en español argentino con términos locales: desarrollos inmobiliarios en Moreno, oportunidades de inversión, inteligencia territorial e inteligencia artificial aplicada.
- Copy de marca personal conversacional, claro y persuasivo; no se imita literalmente la voz de otra profesional.

### Indexación y enlaces canónicos

- `robots.txt` permite el rastreo público y declara el sitemap.
- `sitemap.xml` enumera únicamente las cuatro páginas públicas: Inicio, Mapa IA, Sobre Erica y Oportunidades.
- Las cuatro páginas incluyen canonical y metadatos Open Graph/Twitter en español argentino.
- La URL base actual es la de GitHub Pages (`https://leandrocuellarok-netizen.github.io/morenodesarrollos/`). Si se configura un dominio propio o cambia el nombre del repositorio, actualizar `PUBLIC_BASE` en `scripts/validate_site.py`, los canonical, `robots.txt` y `sitemap.xml` en el mismo cambio.
- El workflow valida que canonical, metadatos sociales, robots y sitemap coincidan antes de publicar.

### Pendientes antes de publicar

1. Definir si se usará la URL de GitHub Pages o un dominio propio; el workflow de publicación ya está versionado en `.github/workflows/pages.yml`.
2. La fotografía de Erica ya está incorporada. Revisar con ella la biografía, el teléfono de contacto y las alianzas mencionadas antes de publicar; no se inventaron email ni perfiles sociales.
3. Revisar el contenido biográfico y las alianzas mencionadas antes de publicación.
4. Confirmar que GitHub Pages esté configurado con la opción de HTML estático mediante GitHub Actions y validar el último despliegue en navegador.
5. Validar en navegador el servicio GeoJSON del límite municipal y sumar capas parcelarias/zonificación solo con fuentes oficiales y permisos adecuados.
6. Continuar el trabajo de oportunidades con identificación parcelaria y verificación documental; los marcadores actuales son áreas/corredores indicativos, no ofertas verificadas.


### Motor cartográfico: MapLibre GL JS + OpenStreetMap

- La página usa MapLibre GL JS para renderizar la cartografía sin una clave de API.
- La capa base inicial utiliza teselas raster de OpenStreetMap y mantiene visible la atribución a sus colaboradores incluso en móvil, junto con un enlace para reportar errores cartográficos.
- La selección está sincronizada: al tocar un marcador se abre y revela su ficha en el inventario; al seleccionar una ficha se resalta el marcador correspondiente. El desplazamiento respeta la preferencia del sistema por movimiento reducido.
- El lienzo cartográfico se presenta en escala monocromática; los marcadores conservan acentos distintos para localidades, contexto documentado e hipótesis.
- El límite administrativo se solicita por separado a Georef Argentina y se dibuja como GeoJSON cuando el servicio responde.
- El servidor estándar de teselas de OpenStreetMap tiene una política de uso propia y no debe tratarse como infraestructura ilimitada. Antes de aumentar tráfico o incorporar funciones intensivas, evaluar un proveedor de teselas OSM o alojamiento propio, respetando sus condiciones.
- Si MapLibre, las teselas o Georef no responden, las fichas, filtros y fuentes del inventario permanecen disponibles.

### Resiliencia y accesibilidad del Mapa IA

- Las fichas de localidades y tesis se renderizan aunque MapLibre GL JS o la cartografía base no estén disponibles.
- Los filtros de texto, tipo y nivel de evidencia funcionan también en modo de consulta sin mapa.
- Se incluye una alternativa HTML mediante `noscript` para lectores sin JavaScript, con enlaces directos a las fuentes.
- Los controles de las fichas muestran foco visible para navegación por teclado.
- El inventario de localidades y tesis usa fichas desplegables con línea a investigar, evidencia, estado, próximo paso y enlace directo a cada referencia externa; cuando la cartografía está disponible, cada ficha también permite centrar su marcador.
- Si falla el proveedor de teselas, se conserva el inventario de referencias y se informa el estado sin ocultar la investigación.


### Exportación del Mapa IA

- El botón **Descargar CSV visible** exporta las referencias que quedan luego de aplicar los filtros y la búsqueda, para revisión en hojas de cálculo.
- El botón **Descargar GeoJSON visible** exporta exactamente el mismo subconjunto filtrado como una colección GeoJSON de puntos, compatible con QGIS y otros sistemas GIS.
- Ambos archivos incluyen tipo de referencia, nombre, coordenadas de referencia, línea a investigar, nivel de evidencia, estado, próximo paso y fuente pública cuando existe.
- GeoJSON usa el orden de coordenadas longitud/latitud de RFC 7946 y conserva en cada elemento el alcance de la coordenada, el estado de evidencia y los indicadores explícitos parcel_identified=false y availability_verified=false.
- Cada fila o punto identifica expresamente el alcance de sus coordenadas: localidad o corredor aproximado, nunca parcela verificada. La colección también incluye una advertencia general.
- En móvil, el mapa se muestra antes del inventario para que la herramienta cartográfica quede accesible sin recorrer primero todas las fichas.
- La exportación es una herramienta de trabajo y no convierte hipótesis en oportunidades verificadas ni acredita disponibilidad, titularidad, zonificación o rentabilidad.


### Control automático antes de publicar

- El workflow de GitHub Pages ejecuta `scripts/validate_site.py` antes de subir el sitio.
- El control comprueba que existan las cuatro páginas públicas, que tengan idioma, título y descripción, y que no haya IDs duplicados ni imágenes sin texto alternativo.
- Comprueba referencias internas, archivos locales, fragmentos de navegación y JSON-LD.
- Si Node.js está disponible en el runner, valida la sintaxis de los módulos JavaScript y de los bloques inline, y ejecuta `scripts/test_opportunity_tools.js`, `scripts/test_site_navigation.js` y `scripts/test_mapa_ia.js`. Las pruebas del Mapa IA cubren datos, filtros, evidencias, CSV y GeoJSON (orden longitud/latitud y advertencias de no parcelario).
- Si una comprobación falla, el despliegue se detiene para evitar publicar una versión rota.


## Captación de oportunidades y primer contacto

- [Presentar un terreno, proyecto o interés de inversión](https://leandrocuellarok-netizen.github.io/morenodesarrollos/oportunidades/)
- La página separa el recorrido de propietarios del de inversores y profesionales, y solicita únicamente información inicial: nombre, perfil, interés, zona y datos opcionales.
- El formulario muestra primero una vista previa de solo lectura del borrador de WhatsApp. La persona puede copiarlo o abrir WhatsApp desde un botón explícito; para corregir datos, vuelve al formulario y genera una nueva vista previa. No hay backend, envío automático ni almacenamiento de datos en el sitio.
- No se solicitan escrituras, DNI, datos bancarios ni documentación confidencial en el primer contacto.
- Las consultas no constituyen tasaciones, ofertas, compromisos de inversión ni confirmaciones de disponibilidad.


## Calculadora preliminar FOS/FOT

La página `oportunidades/` incluye una herramienta opcional que calcula referencias matemáticas a partir de datos ingresados por el visitante:

- **FOS:** superficie del lote × FOS ingresado = referencia teórica de ocupación en planta.
- **FOT:** superficie del lote × FOT ingresado = referencia teórica de superficie total computable.

No se precargan coeficientes ni se infieren indicadores por ubicación. El visitante debe consultar los valores correspondientes a su parcela en documentación o fuentes oficiales. El resultado es orientativo y no contempla retiros, alturas, usos, servidumbres, restricciones, geometría ni otras condiciones de la normativa aplicable.

Si la persona decide continuar, el resumen de los datos y el cálculo se incorpora a una vista previa de WhatsApp. La herramienta funciona en el navegador y no almacena los datos en el sitio. El visitante puede copiar el mensaje; si el portapapeles del navegador no está disponible, el texto queda seleccionado para copia manual. La lógica de cálculo está separada en `assets/js/opportunity-tools.js` y cuenta con pruebas unitarias en `scripts/test_opportunity_tools.js`. Si el visitante aporta solo la superficie, una referencia o indicadores incompletos, el formulario permite continuar: los transcribe como datos pendientes de verificación y no inventa ni calcula resultados.


## Ficha inicial de oportunidad inmobiliaria

La página pública `/oportunidades/` permite iniciar un contacto mediante un borrador editable de WhatsApp. Para mejorar la identificación preliminar de un inmueble, el formulario admite de manera opcional una ubicación más precisa y la partida o nomenclatura catastral. No requiere adjuntar escrituras ni documentación sensible. Los datos se preparan en el navegador y no se almacenan en el sitio. La identificación parcelaria, la titularidad y la normativa deben verificarse por separado antes de evaluar una operación.


## Clasificación inicial de documentación y consultas

El formulario de `/oportunidades/` permite marcar varias referencias disponibles (ubicación, nomenclatura, plano/mensura, certificado urbanístico, antecedentes dominiales e información de servicios) y varias consultas que el contacto declara haber realizado (catastro, zonificación, dominio, servicios, restricciones y consultas municipales). Las selecciones se incorporan al borrador de WhatsApp como declaraciones del contacto, no como hechos verificados. No se solicitan adjuntos ni documentación sensible y el sitio no almacena los datos.

## Esquema cartográfico editorial en Inicio

La vista de Inicio muestra un esquema SVG de referencias espaciales construido a partir de las coordenadas de las seis localidades y las cinco tesis publicadas en `mapa-ia/index.html`. Los círculos identifican localidades; los cuadrados, tesis con contexto respaldado por fuente pública; y el rombo discontinuo, una hipótesis de prospección. Las posiciones son orientativas. El esquema no dibuja límites municipales, calles ni parcelas y no acredita disponibilidad. Si cambian las coordenadas o la clasificación de las fichas del Mapa IA, actualizar también el esquema de Inicio.


## Navegación móvil accesible

Las cuatro páginas públicas comparten un menú móvil desplegable, controlable por teclado y compatible con lectores de pantalla:

- El botón informa su estado mediante `aria-expanded` y controla la navegación mediante `aria-controls`.
- La tecla Escape cierra el menú y devuelve el foco al botón.
- Elegir un enlace cierra el menú; al volver a escritorio también se restablece.
- Si JavaScript no está disponible, los enlaces permanecen visibles como navegación vertical.
- `scripts/test_site_navigation.js` comprueba los estados, el cierre por teclado, la selección de enlaces y el cambio a escritorio.
