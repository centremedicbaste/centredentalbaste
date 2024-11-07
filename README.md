# The boilerplate

Bienvenido a The boilerplate, la base ideal para crear sitios web dinámicos y eficientes. Este proyecto, desarrollado con la colaboración de Manuel, Dani y José, integra las poderosas funcionalidades de Nunjucks y Eleventy para ofrecer una experiencia de desarrollo web ágil y flexible.

## Características

- **Integración de Nunjucks**: Plantillas poderosas y fáciles de usar para una personalización sin esfuerzo.
- **Basado en Eleventy**: Rápido, sencillo y extensible, Eleventy te ayuda a construir proyectos de manera eficiente.
- **Estructura Modular**: Diseñado para ser adaptable y escalable según las necesidades de tu proyecto.
- **Documentación Completa**: Guías y ejemplos para facilitar tu proceso de desarrollo.


## Estructura del Proyecto



Para organizar la estructura de carpetas y archivos de tu proyecto de Eleventy con Nunjucks, puedes seguir el siguiente árbol de directorios. Este esquema refleja la organización de los archivos y carpetas que has listado, proporcionando una visión clara de la estructura del proyecto:



   ```bash
boilerplate/
   ├── .eleventy.js # Configuración de Eleventy para personalizar el comportamiento del generador de sitios.
   ├── .eslintrc.js # Configuración de ESLint para mantener el estilo y calidad del código JavaScript.
   ├── .gitignore # Especifica archivos intencionalmente no rastreados para ignorar por Git.
   ├── .htmlnanorc # Configuración para htmlnano, utilizado para minificar archivos HTML.
   ├── ejemplos.txt # Archivo de texto que contiene ejemplos o documentación relevante.
   ├── img-exporter.js # Script para exportar o procesar imágenes dentro del proyecto.
   ├── LICENSE # El archivo de licencia que especifica los términos bajo los cuales se distribuye el proyecto.
   ├── nunjucks.config.js # Configuración de Nunjucks para definir filtros y variables globales para las plantillas.
   ├── package-lock.json # Autogenerado para cualquier operación donde npm modifica el árbol de node_modules o package.json.
   ├── package.json # Define propiedades y dependencias del proyecto, scripts y metadatos relevantes.
   ├── README.md # Documentación inicial del proyecto, proporcionando una visión general y guía de uso.
   └── src/ # Directorio que contiene el código fuente del proyecto.
      ├── _data/ # Datos globales que pueden ser utilizados en las plantillas.
      ├── _includes/ # Componentes, layouts y fragmentos reutilizables de Nunjucks.
      ├── assets/ # Recursos estáticos como CSS, JavaScript, imágenes.
      ├── pages/ # Las páginas del sitio, cada una correspondiente a una ruta URL.
      ├── google5f3d2fed92020926.html # Verificación de propiedad de Google Site.
      ├── humans.njk # Plantilla Nunjucks para generar el archivo humans.txt, promoviendo el reconocimiento humano.
      ├── robots.njk # Plantilla Nunjucks para generar el archivo robots.txt, para controlar el acceso de los motores de búsqueda.
      ├── site.webmanifest.njk # Plantilla para generar el manifiesto del sitio web, utilizado por los navegadores.
      └── sitemap.njk # Plantilla para generar el sitemap del sitio, importante para SEO.
   ```

A continuación, se detallan los archivos y directorios principales del proyecto:

## /src
Este directorio contiene los archivos fuente del proyecto. Aquí es donde se almacenan las plantillas, los archivos de estilo y los scripts que serán procesados por Eleventy para generar el sitio estático. La configuración de Nunjucks permite utilizar un sistema de plantillas potente y flexible para este propósito.

## .eleventy.js
Este archivo de configuración es esencial para definir cómo Eleventy procesará tu proyecto. Aquí puedes especificar opciones como directorios de entrada y salida, plugins a utilizar, transformaciones de datos y cualquier otra configuración específica de Eleventy que necesites para personalizar el comportamiento del generador de sitios estáticos.

## .eslintrc.js
Este archivo contiene la configuración de ESLint, una herramienta de linting para JavaScript. Ayuda a mantener el código limpio y consistente siguiendo un conjunto de reglas predefinidas o personalizadas. Es especialmente útil en proyectos colaborativos para asegurar que todos los desarrolladores sigan las mismas prácticas de codificación.

## .gitignore
Este archivo le dice a Git qué archivos o directorios ignorar en el control de versiones. Esto es útil para excluir archivos de configuración local, dependencias instaladas o cualquier otro archivo que no deba ser compartido con el repositorio remoto.

## .htmlnanorc
Este archivo de configuración pertenece a htmlnano, un minificador de HTML. Aquí puedes definir las opciones para optimizar y reducir el tamaño de tus archivos HTML finales, lo cual es crucial para mejorar los tiempos de carga de la página.

## ejemplos.txt
Un archivo de texto que probablemente contiene ejemplos de código o notas relacionadas con el proyecto. Este tipo de archivo es útil para documentar snippets de código comunes o patrones de diseño específicos del proyecto.

img-exporter.js
Estos scripts de JavaScript están diseñados para automatizar la exportación de imágenes. Pueden ser utilizados para procesar imágenes antes de su inclusión en el sitio, optimizándolas para la web. La presencia de una copia sugiere versiones de prueba o diferentes configuraciones de exportación. (no usado en este proyecto)

## LICENSE
Este archivo contiene la licencia bajo la cual se distribuye el proyecto. Es crucial para informar a los usuarios y contribuyentes sobre cómo pueden usar y distribuir el proyecto y su código fuente.

## nunjucks.config.js
Configuración específica para Nunjucks, este archivo permite personalizar el comportamiento del motor de plantillas, como definir filtros personalizados, globales y configurar directorios para plantillas.



## Empezando

Para comenzar a usar The boilerplate, sigue estos sencillos pasos:

1. Clona el repositorio:
   ```bash
   git clone https://github.com/developerstrategy/boilerplate.git

2. Instala las dependencias:
  ```bash
   npm install

3. Inicia el servidor de desarrollo:

  ```bash
Copy code
npm start



## Contribuir
Nos encantaría que contribuyas a The boilerplate. Antes de enviar tu contribución, por favor lee nuestras directrices de contribución.

Autores
Manuel - Ux old school
Dani - Criptovrox
José - Paintballpro
Licencia
Este proyecto está bajo la Licencia MIT - ver el archivo LICENSE.md para detalles.

Agradecimientos
Agradecemos a todos quienes han contribuido con su tiempo, código y feedback.
Inspiración, créditos, etc.


Herramientas

{% call insert.splitenpalabras(herodesc , '',10,10  ) %} {% endcall %}

{% call insert.splitenpalabras2("frase 1", "frase 2" ) %} {% endcall %}


Espaciado
   {% br3 %}
       introducir imagenes con su tamaño


Se edita en eleventy
  {% image  "foto.jpg","alt","title","class" %}


 ## Rollover cursor
 data-text="Ver más" class="swiper-wrapper  hoverable_link"



En hexadecimal

Color primario de botones. 
Colores de backgrounds que se usarán. 
color de acento de texto (bold), si lo tiene. 

logos de empresas si hemos trabajado. 
En formato png. todas en mismo tamaño contenedor. 

tipografía y grosores usados. 
regular, bold, light.

iconos usados en svg 

tamaños tipograficos usados. separados en ...

h1,h2,h3 etc....

Si hay fuentes flexibles, que crecen , hay que decir

fluid_1   va desde 12px hasta 200px p.ej



 # Filtro Nunjucks: mdbr
 
 Este filtro personalizado de Nunjucks procesa texto con formato markdown simplificado.
 
 ## Funcionalidad:
 
 1. Convierte texto entre guiones (-) en texto en negrita usando <span>.
 2. Reemplaza *** y ** por saltos de línea <br>.
 3. Convierte secuencias de ^ en múltiples saltos de línea.
 
 ## Uso:
 
 ```nunjucks
 {{ "Texto -en negrita- con ***saltos de línea** y ^^^múltiples saltos" | mdbr }}
 ```
 
 ## Resultado:
 
 ```html
 Texto <span class="bold">en negrita</span> con <br><br><br>múltiples saltos
 ```
 
 @param {string} value - El texto a procesar
 @returns {string} El texto procesado con HTML
