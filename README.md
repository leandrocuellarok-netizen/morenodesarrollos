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

Sitio personal de Erica M. Acosta en evolución, con tres destinos principales:

- / — Inicio: presentación del proyecto, desarrollo inmobiliario, inteligencia territorial e IA aplicada.
- /mapa-ia/ — Mapa IA: mapa interactivo del Partido de Moreno, localidades y cinco tesis preliminares de oportunidad.
- /erica-acosta/ — Sobre Erica: perfil personal y enfoque de trabajo, con énfasis en residencia local, iniciativa emprendedora y alianzas.

### Identidad visual y contenido

- Paleta: marfil, grafito, piedra, ocre y naranja quemado.
- Lenguaje gráfico: ilustración arquitectónica editorial dibujada en SVG, retícula sutil, líneas de plano y cartografía monocromática.
- Diseño responsive y navegación común entre las tres páginas.
- Metadatos SEO en español argentino con términos locales: desarrollos inmobiliarios en Moreno, oportunidades de inversión, inteligencia territorial e inteligencia artificial aplicada.
- Copy de marca personal conversacional, claro y persuasivo; no se imita literalmente la voz de otra profesional.

### Pendientes antes de publicar

1. Definir si se usará la URL de GitHub Pages o un dominio propio; el workflow de publicación ya está versionado en `.github/workflows/pages.yml`.
2. Incorporar fotografía y datos de contacto reales de Erica (no se inventaron email, teléfono ni perfiles sociales).
3. Revisar el contenido biográfico y las alianzas mencionadas antes de publicación.
4. Confirmar que GitHub Pages esté configurado con la opción de HTML estático mediante GitHub Actions y validar el último despliegue en navegador.
5. Validar en navegador el servicio GeoJSON del límite municipal y sumar capas parcelarias/zonificación solo con fuentes oficiales y permisos adecuados.
6. Continuar el trabajo de oportunidades con identificación parcelaria y verificación documental; los marcadores actuales son áreas/corredores indicativos, no ofertas verificadas.


### Resiliencia y accesibilidad del Mapa IA

- Las fichas de localidades y tesis se renderizan aunque Leaflet o la cartografía base no estén disponibles.
- Los filtros de texto, tipo y nivel de evidencia funcionan también en modo de consulta sin mapa.
- Se incluye una alternativa HTML mediante `noscript` para lectores sin JavaScript, con enlaces directos a las fuentes.
- Los controles de las fichas muestran foco visible para navegación por teclado.
- Si falla el proveedor de teselas, se conserva el inventario de referencias y se informa el estado sin ocultar la investigación.


### Exportación del Mapa IA

- El botón **Descargar CSV visible** exporta las referencias que quedan luego de aplicar los filtros y la búsqueda.
- El archivo incluye tipo de referencia, nombre, coordenadas de referencia, línea a investigar, nivel de evidencia, estado, próximo paso y fuente pública.
- Cada fila identifica expresamente el alcance de sus coordenadas: localidad o corredor aproximado, nunca parcela verificada.
- En móvil, el mapa se muestra antes del inventario para que la herramienta cartográfica quede accesible sin recorrer primero todas las fichas.
- La exportación es una herramienta de trabajo y no convierte hipótesis en oportunidades verificadas ni acredita disponibilidad, titularidad, zonificación o rentabilidad.
