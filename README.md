# Proyecto <font color="#3f3f3f">Frontend</font> <font color="#ff0000">Paciente Z</font>

# Descripción
PacienteZ es un proyecto de código abierto diseñado para desarrollar una aplicación de teleasistencia integral para pacientes, especialmente aquellos que requieren atención domiciliaria. El objetivo principal es mejorar la calidad de vida de los usuarios mediante una interacción sencilla y accesible.

# Tabla de Contenidos
1. [Tecnologías utilizadas](#built-with)
2. [Puesta en marcha](#puesta-en-marcha)
3. [Entornos](#entornos)
4. [Documentacion de desarrollo](#documentacion)
5. [Guía de Contribución](#guía-de-contribución)
6. [Lista de Contribuidores](#lista-de-contribuidores)
7. [Inspiración](#inspiración)
8. [Licencia](#licencia)
## Tecnologías utilizadas

Este proyecto utiliza las siguientes tecnologías:

### Frontend
1. **Vue 3**: Framework progresivo de JavaScript para construir interfaces de usuario.
   - Paquete: `vue@^3.5.13`

2. **Vue Router**: Librería para la gestión de rutas en una aplicación Vue.
   - Paquete: `vue-router@^4.5.0`

3. **Pinia**: Almacén de estado para Vue 3, utilizado para la gestión de estados de la aplicación.
   - Paquete: `pinia@^2.3.1`

4. **Bootstrap 5**: Framework CSS para crear interfaces responsivas y atractivas.
   - Paquete: `bootstrap@^5.3.3`

5. **FullCalendar**: Librería para crear calendarios interactivos.
   - Paquetes:
     - `@fullcalendar/bootstrap5@^6.1.15`
     - `@fullcalendar/core@^6.1.15`
     - `@fullcalendar/daygrid@^6.1.15`
     - `@fullcalendar/interaction@^6.1.15`
     - `@fullcalendar/rrule@^6.1.15`
     - `@fullcalendar/timegrid@^6.1.15`
     - `@fullcalendar/vue3@^6.1.15`

6. **Axios**: Librería para hacer peticiones HTTP.
   - Paquete: `axios@^1.7.9`

7. **VeeValidate**: Sistema de validación de formularios para Vue.
   - Paquete: `vee-validate@^4.15.0`

8. **Yup**: Librería de validación para JavaScript.
   - Paquete: `yup@^1.6.1`

### Herramientas de Desarrollo
1. **Vite**: Bundler de nueva generación para aplicaciones web, optimizado para proyectos de Vue.
   - Paquete: `vite@^6.0.11`

2. **@vitejs/plugin-vue**: Plugin para Vite que habilita soporte completo para Vue.
   - Paquete: `@vitejs/plugin-vue@^5.2.1`

3. **Vitest**: Framework de pruebas para proyectos de Vue y JavaScript.
   - Paquete: `vitest@^3.0.2`

4. **@vue/test-utils**: Utilidad para pruebas de componentes Vue.
   - Paquete: `@vue/test-utils@^2.4.6`

5. **jsdom**: Implementación de los estándares web en Node.js para pruebas.
   - Paquete: `jsdom@^26.0.0`

6. **vite-plugin-vue-devtools**: Plugin para integrar herramientas de desarrollo de Vue en Vite.
   - Paquete: `vite-plugin-vue-devtools@^7.7.0`

### Otros
1. **json-server**: Servidor RESTful falso para pruebas y desarrollo.
   - Paquete: `json-server@^1.0.0-beta.3`

---

## Puesta en Marcha

A continuación se describen los pasos para poner en marcha el proyecto, incluyendo los requisitos y los comandos necesarios para la instalación y el despliegue.

### <font color="#2DC26B">Requisitos</font>

Antes de comenzar, asegúrate de tener los siguientes requisitos:

- **Node.js**: Asegúrate de tener instalada la versión de Node.js necesaria para el proyecto.
- **npm**: Node Package Manager (npm) debe estar disponible para instalar dependencias.

### <font color="#2DC26B">Puesta en marcha (comandos)</font>

1. **Instalar dependencias**

   Ejecuta el siguiente comando para instalar todas las dependencias del proyecto:

   ```bash
   npm install

2. **Entorno de desarrollo**

   Si estás trabajando en el entorno de desarrollo, utiliza el siguiente comando para iniciar el servidor de desarrollo:

   ```bash
   npm run dev

3. **Entorno de despliegue**

   Si estás listo para desplegar la aplicación en producción, utiliza el siguiente comando para generar los archivos optimizados::

   ```bash
   npm run build
Después, puedes usar los archivos generados en la carpeta dist para realizar el despliegue en tu servidor de producción.

## Entornos

El proyecto está diseñado para trabajar en diferentes entornos, cada uno con su configuración específica. A continuación se describen los entornos utilizados en este proyecto:

### **Entorno de Desarrollo (Local)**

- **Propósito**: Este entorno está destinado para el desarrollo de nuevas características, pruebas locales y depuración.
- **Configuración**: 
  - Usa el servidor de desarrollo de Vite.
  - Depende de un entorno de Node.js local, configurado con los paquetes del archivo `package.json`.
  - Se debe ejecutar el siguiente comando para iniciar el entorno de desarrollo:
    ```bash
    npm run dev
    ```
  - Los cambios realizados en el código fuente se reflejarán en tiempo real a medida que se guardan.

### **Entorno de Producción (Deploy Automático)**

- **Propósito**: Este entorno está destinado para la ejecución de la aplicación en producción.
- **Configuración**: 
  - El despliegue a producción se realiza automáticamente al hacer un *push* a la rama `main`.
  - El pipeline CI/CD solo ejecuta el comando `npm run build` al hacer el *push*.
  - Este comando construye los archivos optimizados para producción en la carpeta `dist`.
  - Los archivos generados por `npm run build` son los que se suben al servidor de producción.
  - **Proceso de despliegue**:
    1. Se hace un *push* a la rama `main`.
    2. El pipeline CI/CD se activa y ejecuta automáticamente el siguiente comando:
       ```bash
       npm run build
       ```
    3. Los archivos construidos se suben al servidor de producción y son servidos a los usuarios finales.

### **Entorno de Pruebas**

- **Propósito**: Este entorno está destinado a ejecutar pruebas automatizadas y validaciones.
- **Configuración**: 
  - Se utiliza **Vitest** para ejecutar pruebas unitarias y de integración.
  - Para ejecutar las pruebas, se usa el siguiente comando:
    ```bash
    npm run test
    ```

## Guía de Contribución 
Cualquier contribución al proyecto deberá seguir las siguientes [normas de contribución](CONTRIBUTING.md).
## Documentación de desarrollo
Enlace a la wiki / páginas con la documentación del proyecto
Ejemplos https://github.com/pedroporo/Backend_DAW_ProyectoFinal/wiki

## Lista de Contribuidores
Listado de usuarios que ha contribuido en la realización.

<a href="https://github.com/pedroporo/Frontend_DAW_ProyectoFinal/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=pedroporo/Frontend_DAW_ProyectoFinal" />
</a>
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/pedroporo"><img src="https://avatars.githubusercontent.com/u/64787177?v=4?s=100" width="100px;" alt="pedroporo1000"/><br /><sub><b>pedroporo1000</b></sub></a><br /></td>
    <td align="center" valign="top" width="14.28%"><a href="https://github.com/Kokon4"><img src="https://avatars.githubusercontent.com/u/91149924?v=4?s=100" width="100px;" alt="Kokon4"/><br /><sub><b>Kokon4</b></sub></a><br /></td>
    <td align="center" valign="top" width="14.28%"><a href="https://github.com/FerriAchede"><img src="https://avatars.githubusercontent.com/u/152427942?v=4?s=100" width="100px;" alt="FerriAchede"/><br /><sub><b>Ferran</b></sub></a><br /></td>
    <td align="center" valign="top" width="14.28%"><a href="https://github.com/AaronFlores12"><img src="https://avatars.githubusercontent.com/u/150167366?v=4?s=100" width="100px;" alt="AaronFlores12"/><br /><sub><b>AaronFlores12</b></sub>
    <td align="center" valign="top" width="14.28%"><a href="https://github.com/IvanaPlamenovaMikinska"><img src="https://avatars.githubusercontent.com/u/118548766?v=4?s=100" width="100px;" alt="IvanaPlamenovaMikinska"/><br /><sub><b>Ivana</b></sub></a><br /></td>
    </tr>

  </tbody>
</table>

## Inspiración
La inspiración para un proyecto de teleasistencia como el que estás desarrollando puede provenir de varias fuentes y necesidades sociales actuales:

1. **Demanda de Atención a Personas Mayores y Vulnerables**: La creciente población de personas mayores y la necesidad de mantener su autonomía en el hogar son factores clave. Proyectos como el de Cruz Roja con su tecnología humanitaria y el proyecto 'Activage' han demostrado el impacto positivo de la teleasistencia en la vida diaria de las personas mayores.
2. **Innovación Tecnológica**: La integración de tecnologías como la inteligencia artificial, realidad aumentada, y dispositivos IoT ha permitido desarrollar soluciones más eficaces y personalizadas para la teleasistencia. Ejemplos como el proyecto 'EntamAR' de Cruz Roja Juventud y el servicio 'Serena' de ILUNION Sociosanitario muestran cómo estas tecnologías pueden mejorar la calidad de vida de los usuarios.
3. **Necesidad de Prevención y Predicción**: Proyectos como el de ADINBERRI, que busca identificar situaciones de riesgo en personas mayores, destacan la importancia de la teleasistencia predictiva y preventiva para mejorar la atención y reducir la carga sobre el sistema sanitario.
4. **Expectativas de los Consumidores de Servicios Sanitarios**: La demanda de opciones más personalizadas y accesibles en el cuidado de la salud está impulsando la innovación en teleasistencia, permitiendo a los pacientes tener más control sobre su atención médica.

En resumen, la inspiración para un proyecto de teleasistencia proviene de la combinación de necesidades sociales, avances tecnológicos y la búsqueda de soluciones innovadoras para mejorar la calidad de vida de las personas vulnerables.


## Licencia
Este proyecto se desarrolla y distribuye de acuerdo a los términos de la [Licencia Mit](LICENSE) incluida.
