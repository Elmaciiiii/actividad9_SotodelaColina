# 📅 Calendario Interactivo con Eventos y Feriados - EEST N°1

Este proyecto consiste en el desarrollo de una pagina web que permite **ver un calendario simple**, **agregar eventos personales a cada día** y **mostrar automáticamente los feriados nacionales de Argentina** según el mes y el año seleccionado.

---

## 🚀 Tecnologías Utilizadas

- **HTML**: Estructura principal de la página y del calendario.
- **CSS**: Estilos visuales, colores, y modo claro/oscuro.
- **JavaScript**: Lógica del calendario, detección de feriados, eventos, modales, etc.
- **[Font Awesome](https://fontawesome.com/)**: Librería de íconos para mejorar la experiencia visual.

---

## ⚙️ Funcionalidades

- 📅 Mostrar el calendario del mes actual con los días organizados.
- 🔄 Cambiar de mes usando las flechitas (adelante o atrás).
- 🎉 Ver los feriados nacionales argentinos automáticamente según el mes y año.
- 📝 Agregar eventos personales con título y descripción en cualquier día.
- 👀 Ver todos los eventos guardados de un día y eliminarlos si es necesario.
- 🌗 Cambiar entre modo claro y modo oscuro tocando el ícono del sol o la luna.
- 🔔 Notificaciones visuales para confirmar cuando se guarda o borra un evento.

---

## 🧪 Instrucciones para Probar el Calendario Interactivo

Para probar esta mini aplicación del calendario, seguí estos pasos:

---

1. **Descargar el proyecto desde GitHub:**
   * Ingresá a la página del repositorio.
   * Hacé clic en el botón verde que dice **"Code"**.
   * Elegí la opción **"Download ZIP"** y guardá el archivo en tu computadora.

---

2. **Extraer el archivo ZIP:**
   * Buscá el archivo ZIP que descargaste y hacé clic derecho para **extraer el contenido**.
   * Se creará una carpeta con el nombre del proyecto.

---

3. **Abrir la carpeta del proyecto en Visual Studio Code:**
   * Abrí **Visual Studio Code**.
   * En el menú superior, andá a **"Archivo" > "Abrir Carpeta"**.
   * Seleccioná la carpeta extraída y hacé clic en **"Abrir"**.

---

4. **Abrir `index.html` con Live Server (opcional):**
   * 📦 Asegurate de tener instalada la extensión **"Live Server"** en Visual Studio Code.
     - Podés buscarla en la sección de extensiones (ícono de cuadrados) y hacer clic en **"Instalar"**.
   * Buscá y abrí el archivo `index.html`.
   * Hacé clic derecho dentro del archivo y seleccioná **"Open with Live Server"**.
   * La página del calendario se abrirá automáticamente en tu navegador.

---

5. **Interactuar con el calendario:**
   * Navegá entre meses tocando las flechas izquierda o derecha.
   * Hacé clic en un día:
     - Si ya tiene un evento o es feriado, vas a ver un resumen.
     - Si no tiene nada, podés agregar un nuevo evento.
   * Probá cambiar el tema tocando el ícono de la luna o el sol.
   * Usá el teclado si preferís navegar sin mouse (Enter, Tab, Escape).

---

El calendario permite:

- Ver qué días son feriados (resaltados con un ícono 🎉).
- Agregar eventos personales por día.
- Eliminar eventos que ya no necesites.
- Cambiar el aspecto visual entre claro y oscuro.

---

## 🗂️ Estructura del Proyecto

```plaintext
.                   // Carpeta principal del proyecto
├── index.html      // Página principal con el calendario y estructura general
├── style.css       // Estilos visuales, colores y temas
└── script.js       // Lógica del calendario, eventos, feriados y tema oscuro
