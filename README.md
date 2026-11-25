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
- El límite administrativo se solicita por separado a Georef Argentina y se dibuja como GeoJSON cuando el servicio responde. Su encuadre automático solo se aplica si la persona no abrió una referencia compartida ni movió/zoomeó manualmente el mapa; así, la respuesta asíncrona de Georef no pisa la vista elegida.
- Los movimientos de cámara al abrir una ficha o restablecer el mapa respetan `prefers-reduced-motion`: usan un salto sin animación cuando el dispositivo lo solicita.
- El servidor estándar de teselas de OpenStreetMap tiene una política de uso propia y no debe tratarse como infraestructura ilimitada. Antes de aumentar tráfico o incorporar funciones intensivas, evaluar un proveedor de teselas OSM o alojamiento propio, respetando sus condiciones.
- Si MapLibre, las teselas o Georef no responden, las fichas, filtros y fuentes del inventario permanecen disponibles.

### Resiliencia y accesibilidad del Mapa IA

- Las fichas de localidades y tesis se renderizan aunque MapLibre GL JS o la cartografía base no estén disponibles.
- Los filtros de texto, tipo y nivel de evidencia funcionan también en modo de consulta sin mapa.
- Se incluye una alternativa HTML mediante `noscript` para lectores sin JavaScript, con enlaces directos a las fuentes.
- Los controles de las fichas muestran foco visible para navegación por teclado.
- El inventario de localidades y tesis usa fichas desplegables con línea a investigar, evidencia, estado, próximo paso y enlace directo a cada referencia externa; cuando la cartografía está disponible, cada ficha también permite centrar su marcador.
- Si falla el proveedor de teselas, se conserva el inventario de referencias y se informa el estado sin ocultar la investigación.


### Bitácora local de verificación del Mapa IA

- Cada una de las cinco tareas por tesis conserva una fuente, documento o folio (hasta 240 caracteres), fecha de consulta y observación breve opcional (hasta 500 caracteres).
- Una tarea solo cuenta como **revisión documentada** cuando se completa una fuente/documento de al menos cuatro caracteres y una fecha ISO válida. La casilla permanece deshabilitada mientras falte alguno de esos dos datos.
- La versión anterior guardaba casillas sin procedencia. Al actualizar, esas marcas se migran como pendientes de documentar; no se presentan como verificaciones completas ni se descartan silenciosamente.
- El estado se conserva en `localStorage` del navegador actual. No se transmite al sitio, no sincroniza entre dispositivos y no debe utilizarse para guardar nombres de personas, datos personales, información dominial sensible ni documentación confidencial.
- La descarga JSON v2 incluye, para cada tarea visible, su estado, fuente/documento, fecha y observación. Es un registro operativo: no verifica autenticidad, vigencia ni cumplimiento, y no constituye una certificación técnica, dominial o urbanística.
- Si el navegador bloquea el almacenamiento local, la bitácora sigue disponible durante la sesión y la exportación permite conservar el estado antes de cerrar.

### Enlaces directos a referencias del Mapa IA

- Cada ficha y ventana emergente ofrece un enlace directo con el identificador de la referencia en el parámetro `?ref=`.
- Al abrir ese enlace, el mapa selecciona la ficha, centra el marcador y abre su información; la selección también actualiza la URL sin recargar la página.
- Los enlaces solo identifican una de las referencias ya publicadas. No agregan datos de parcelas, titularidad, disponibilidad ni zonificación.

## Integridad de referencias en consultas comerciales

- Los enlaces desde el Mapa IA transfieren únicamente el identificador estable de la referencia (map_ref).
- El formulario resuelve el nombre desde un catálogo canónico local; ignora cualquier etiqueta map_name agregada o modificada en la URL.
- Los identificadores desconocidos se descartan. Esto evita que un enlace alterado presente una referencia inventada como si perteneciera al inventario público.
- La referencia sigue siendo territorial y aproximada: no acredita parcela, titularidad, disponibilidad, zonificación ni factibilidad.

## Exportación del Mapa IA

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

## Conversión comercial desde el Mapa IA

Cada localidad o tesis territorial puede abrir el formulario de oportunidades con su identificador y nombre como contexto de origen. El formulario muestra esa referencia, incorpora una nota explícita sobre su alcance aproximado y la incluye en el borrador de WhatsApp para que la persona lo revise. La referencia no se transforma en identificación parcelaria ni acredita titularidad, disponibilidad, zonificación o factibilidad. El sitio no envía ni almacena el contacto automáticamente.


## Mesa de verificación parcelaria y urbanística

El Mapa IA incorpora un directorio operativo de fuentes oficiales para pasar de una referencia aproximada a una parcela individualizada:

- **IDE Moreno**: visor cartográfico municipal. La fecha y el alcance deben revisarse capa por capa: https://mapas.moreno.gob.ar/
- **GeoARBA**: portal provincial de geoservicios WMS/WFS y descargas vectoriales de objetos catastrales por partido. Revisar metadatos, fecha de actualización y condiciones de uso: https://arba.gov.ar/geoarba/inicio.asp
- **Dirección de Catastro de Moreno**: información de trámites y contacto institucional: https://www.moreno.gob.ar/catastro.php
- **Plano de zonificación municipal, anexo junio de 2015**: antecedente histórico disponible en el portal municipal. No confirma normativa vigente ni indicadores actuales; toda evaluación requiere consulta municipal actualizada: https://moreno2.moreno.gob.ar/docs/catastro/mapa_zonificacion.pdf

La secuencia de control exige nomenclatura catastral y plano de mensura, certificado o constancia urbanística vigente, revisión dominial y de restricciones, factibilidad de servicios/accesos y trazabilidad de fuente, documento y fecha de consulta. Estas fuentes no se descargan ni interpretan automáticamente en MORENO: no se presentan parcelas ni zonificaciones como verificadas hasta incorporar geometría, metadatos y validación profesional.


### Importación y combinación segura de bitácoras MORENO

- El Mapa IA permite importar una exportación JSON de bitácora con `schema_version: 2`; se rechazan archivos mal formados, versiones no compatibles y archivos mayores a 1 MB.
- La importación se procesa íntegramente en el navegador. No sube el archivo ni transmite los registros a un servidor.
- Solo se admiten identificadores de las cinco tesis y de las cinco tareas conocidas. Las referencias o tareas desconocidas se omiten y se informan.
- Los registros importados completan datos locales faltantes cuando no hay contradicciones.
- Si fuente, fecha u observación contienen valores no vacíos diferentes en ambos dispositivos, el sistema detecta el conflicto y conserva íntegramente el registro local. No sobrescribe ni combina silenciosamente datos contradictorios.
- El resumen de importación informa registros nuevos, combinados, conflictos y elementos ignorados. Para resolver un conflicto, revisar ambos archivos exportados y actualizar manualmente la ficha correspondiente.
- La bitácora continúa siendo un registro interno de trabajo: importar o combinar datos no acredita autenticidad, vigencia, titularidad, disponibilidad ni cumplimiento urbanístico.


### Ficha preliminar imprimible de oportunidades

- Desde la vista previa del formulario de `/oportunidades/`, la persona puede generar una ficha para imprimir o guardar como PDF desde el navegador.
- La ficha reúne únicamente los campos aportados, las listas declaradas y, cuando corresponde, el resultado aritmético preliminar de FOS/FOT.
- Incluye un estado visible de **borrador / datos no verificados** y una lista general de aspectos que requieren revisión independiente.
- La salida se construye en el navegador mediante nodos de texto; no se inserta contenido del formulario como HTML, no se transmite información al sitio y no se crea un expediente en el servidor.
- Además de imprimir o guardar como PDF, se puede descargar un JSON con esquema `moreno.opportunity-dossier`, versión 2, fecha de exportación ISO 8601 y estado explícito `preliminary-unverified`.
- El JSON incluye la ficha construida, no una certificación ni una base sincronizada. Quien lo descarga decide dónde conservarlo y con quién compartirlo.
- La ficha no acredita identificación parcelaria, titularidad, disponibilidad, vigencia normativa, capacidad edificable, tasación ni factibilidad. Tanto la impresión como la exportación se ejecutan localmente en el navegador.

### Importación local y combinación de expedientes de oportunidades

- La página `/oportunidades/` permite seleccionar un expediente JSON descargado previamente y validarlo antes de modificar el formulario.
- Se admiten los esquemas `moreno.opportunity-dossier` versión 2 y versión 1. La versión 2 conserva los campos estructurados originales en `sourceData`; la versión 1 se recupera desde las filas legibles de la ficha y muestra una advertencia porque algunas listas antiguas podían haberse exportado como texto.
- El archivo está limitado a 1 MB. Se validan esquema, versión, estado preliminar, estructura de la ficha, tipos de datos y longitudes. Los valores de listas y selectores se contrastan con las opciones conocidas del formulario; los valores desconocidos se omiten con advertencia.
- **Completar campos vacíos** conserva todos los valores actuales y solo incorpora los datos que faltan. Si dos valores no vacíos difieren, el sistema registra el conflicto y mantiene el dato local.
- **Reemplazar formulario con el archivo** es una acción separada y explícita; sustituye los campos actuales por los datos estructurados del expediente importado.
- La importación no certifica datos, no combina documentación dominial ni verifica fuentes. La persona debe revisar el formulario antes de generar un nuevo borrador.
- Lectura, validación y combinación se ejecutan en el navegador. El archivo no se transmite ni se almacena en el servidor de MORENO.
- `scripts/test_opportunity_tools.js` comprueba exportación v2, lectura heredada v1, rechazo de archivos incompatibles y combinación con conflictos.


## Seguimiento comercial de oportunidades

La página pública de Oportunidades ofrece una [plantilla CSV vacía](docs/plantilla-seguimiento-comercial.csv) para organizar el seguimiento fuera del sitio. Contiene una fila de encabezados y no incorpora contactos, inmuebles, precios ni operaciones ficticias.

- Una fila representa una oportunidad u operación; el identificador interno no reemplaza la nomenclatura catastral ni el ID de una referencia del mapa.
- Las etapas comerciales se registran separadas del estado documental. Una negociación o un cierre no prueban titularidad, disponibilidad ni factibilidad.
- Los honorarios propuestos, acordados, facturados y cobrados tienen columnas distintas. Una operación ganada no implica que el dinero haya sido cobrado.
- Las fechas usan formato ISO `AAAA-MM-DD`; los importes se registran como números y la moneda se indica en su propia columna. No mezclar monedas en una misma fila.
- La plantilla omite nombres, teléfonos y correos. No incluir datos personales, bancarios, dominiales sensibles ni direcciones confidenciales en las observaciones. Usar un sistema con acceso controlado para los datos de contacto.
- Las celdas vacías significan que no hay dato registrado; no deben interpretarse como cero. No hay fórmulas ni valuaciones precargadas.


### Tablero local de seguimiento comercial

La sección desplegable de /oportunidades/ permite importar la plantilla CSV completada y revisar el estado de la cartera en el navegador.

- Solo admite los 20 encabezados de docs/plantilla-seguimiento-comercial.csv; rechaza columnas faltantes, duplicadas o adicionales. Así evita importar accidentalmente campos de contacto u otras columnas no previstas.
- El archivo está limitado a 2 MB y 10.000 oportunidades. Cada registro requiere un ID interno único; las fechas deben ser fechas reales AAAA-MM-DD, y los honorarios deben ser números sin separador de miles, con hasta dos decimales.
- Los importes requieren una moneda de tres letras. Los totales se agrupan por moneda y nunca se convierten entre ARS, USD u otras divisas.
- Las celdas monetarias vacías no se consideran cero: el tablero muestra “Sin dato” cuando no hay importes registrados para una columna.
- El resumen distingue oportunidades activas, seguimientos vencidos, fechas próximas y registros sin próxima acción. Las etapas ganada, no concretada y pausada no se cuentan como activas.
- El detalle permite filtrar por etapa y buscar por ID, localidad, tipo de activo, estado documental o próxima acción. No muestra ni necesita datos de contacto.
- La lectura y los cálculos se ejecutan en memoria en la pestaña actual. No hay almacenamiento local, sincronización, solicitudes de red ni almacenamiento en el servidor; al recargar se debe importar otra vez el CSV.
- No ingresar nombres, teléfonos, correos, datos bancarios, direcciones confidenciales ni documentación dominial sensible en la plantilla. Para datos de contacto, utilizar un sistema con acceso controlado.
- scripts/test_pipeline_dashboard.js cubre delimitadores y comillas, fechas, importes, duplicados, columnas no admitidas, límites y sumas separadas por moneda.

- El tablero permite descargar un resumen agregado CSV con fecha de corte, recuentos por etapa y honorarios por moneda. El reporte no incluye IDs de oportunidades, localidades ni datos de contacto; las divisas permanecen separadas y las celdas sin importe quedan vacías.


### Agenda operativa de seguimiento

El tablero local de `/oportunidades/` permite descargar una agenda CSV separada del resumen financiero:

- Incluye oportunidades activas con seguimiento vencido, fecha dentro de los próximos siete días, fecha pendiente o próxima acción sin definir.
- Excluye etapas cerradas o pausadas y no limita la exportación a las veinte tarjetas visibles.
- Ordena vencidas, próximas, registros sin fecha y acciones todavía no definidas.
- Incluye ID interno, localidad, tipo de activo, etapa, estado documental, próxima acción y fecha; no incorpora datos de contacto, observaciones ni datos bancarios.
- Se genera en el navegador con protección frente a fórmulas. No se transmite ni se almacena en el servidor.

- La agenda marca por separado los seguimientos vencidos, los próximos, los registros sin fecha y las oportunidades sin próxima acción; no asigna probabilidades de cierre ni importes estimados.


## Perfil editorial de Erica y recorridos de contacto

La página `erica-acosta/` presenta el perfil de Erica M. Acosta con una jerarquía editorial, el retrato existente y una lámina SVG monocromática de cinco etapas del desarrollo inmobiliario. La lámina es conceptual: no representa un inmueble, parcela, obra, factibilidad ni oportunidad identificada.

Los accesos para propietarios e inversores enlazan a `/oportunidades/?perfil=propietario` y `/oportunidades/?perfil=inversor`. El formulario reconoce esos parámetros y preselecciona el perfil correspondiente; la persona revisa sus datos y decide si abre WhatsApp. No se envía información automáticamente.

El validador del sitio comprueba la presencia de la lámina accesible, las cinco etapas, los estilos del perfil y los dos recorridos de contacto.


## Recorridos comerciales desde la portada

La portada prioriza dos entradas para iniciar una conversación:
- **Propietarios:** `/oportunidades/?perfil=propietario`, con el perfil correspondiente preseleccionado.
- **Inversores y desarrolladores:** `/oportunidades/?perfil=inversor`, con el perfil correspondiente preseleccionado.

El acceso al Mapa IA queda como recorrido de investigación complementario. El primer contacto es exploratorio: no constituye tasación, oferta, confirmación de disponibilidad ni compromiso de inversión. El contenido no afirma operaciones cerradas ni resultados comerciales que no estén documentados.
