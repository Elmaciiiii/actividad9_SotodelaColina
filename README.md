# 📅 Calendario Interactivo con Eventos y Feriados 

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
   * Ve a esta página: [https://github.com/Elmaciiiii/actividad9_SotodelaColina.git](https://github.com/Elmaciiiii/actividad9_SotodelaColina.git)
   * Haz clic en el botón verde que dice **"Code"**.
   * Elige la opción **"Download ZIP"** y guardá el archivo en tu computadora.

---

2. **Extraer el archivo ZIP:**
   * Buscá el archivo ZIP que descargaste y hacé clic derecho para **extraer su contenido**.
   * Se creará una carpeta llamada `actividad9_SotodelaColina-main` o similar.

---

3. **Abrir la carpeta del proyecto en Visual Studio Code:**
   * Abrí **Visual Studio Code**.
   * En la barra de menú, andá a **"Archivo" (File)** y seleccioná **"Abrir Carpeta" (Open Folder)**.
   * Navegá hasta la carpeta que se creó al extraer el ZIP (`actividad9_SotodelaColina-main`) y seleccionala.
   * Hacé clic en **"Seleccionar carpeta"** o **"Abrir"**.

---

4. **Abrir `index.html` con Live Server:**
   * 📦 **Asegurate de tener instalada la extensión "Live Server" en Visual Studio Code.**
     - Podés buscarla en la sección de extensiones (ícono con cuatro cuadrados) y hacer clic en **"Instalar"**.
   * En el panel de archivos de Visual Studio Code (a la izquierda), **buscá y abrí el archivo `index.html`**.
   * Hacé clic derecho dentro del archivo abierto y seleccioná **"Open with Live Server"**.
   * La página del calendario se abrirá automáticamente en tu navegador.
   * Cada vez que hagas un cambio en el código, Live Server actualizará la página.

---

5. **Interactuar con el calendario:**
   * Usá las flechitas arriba del calendario para cambiar de mes.
   * Hacé clic en cualquier día:
     - Si es feriado o tiene eventos, verás los detalles.
     - Si no tiene nada, podrás **agregar un evento** con título y descripción.
   * Cambiá entre modo claro y oscuro tocando el ícono de la luna o el sol.
   * Eliminá eventos desde el mismo calendario si ya no los necesitás.
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
