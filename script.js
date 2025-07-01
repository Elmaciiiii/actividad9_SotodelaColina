 // Constantes y variables globales
 const meses = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

// Variables de estado en memoria (sin localStorage)
let fechaActual = new Date();
let mesActual = fechaActual.getMonth();
let añoActual = fechaActual.getFullYear();
let fechaSeleccionada = null;
let eventos = {};
let temaOscuro = false;

// Función para calcular los feriados de Argentina para un año dado
function calcularFeriados(año) {
    const feriados = {};
    // Feriados fijos
    feriados[`${año}-01-01`] = { nombre: 'Año Nuevo', tipo: 'inamovible' };
    feriados[`${año}-03-24`] = { nombre: 'Día Nacional de la Memoria', tipo: 'inamovible' };
    feriados[`${año}-04-02`] = { nombre: 'Día del Veterano y de los Caídos', tipo: 'inamovible' };
    feriados[`${año}-05-01`] = { nombre: 'Día del Trabajador', tipo: 'inamovible' };
    feriados[`${año}-05-25`] = { nombre: 'Día de la Revolución de Mayo', tipo: 'inamovible' };
    feriados[`${año}-06-17`] = { nombre: 'Paso a la Inmortalidad del Gral. Martín Miguel de Güemes', tipo: 'trasladable' };
    feriados[`${año}-06-20`] = { nombre: 'Día de la Bandera', tipo: 'inamovible' };
    feriados[`${año}-07-09`] = { nombre: 'Día de la Independencia', tipo: 'inamovible' };
    feriados[`${año}-12-08`] = { nombre: 'Inmaculada Concepción de María', tipo: 'inamovible' };
    feriados[`${año}-12-25`] = { nombre: 'Navidad', tipo: 'inamovible' };

    // Feriados trasladables
    const pascua = calcularPascua(año);
    
    // Carnaval: 47 y 48 días antes de Pascua
    const carnaval1 = new Date(pascua);
    carnaval1.setDate(pascua.getDate() - 48);
    feriados[carnaval1.toISOString().split('T')[0]] = { nombre: 'Carnaval', tipo: 'trasladable' };
    
    const carnaval2 = new Date(pascua);
    carnaval2.setDate(pascua.getDate() - 47);
    feriados[carnaval2.toISOString().split('T')[0]] = { nombre: 'Carnaval', tipo: 'trasladable' };

    // Viernes Santo: 2 días antes de Pascua
    const viernesSanto = new Date(pascua);
    viernesSanto.setDate(pascua.getDate() - 2);
    feriados[viernesSanto.toISOString().split('T')[0]] = { nombre: 'Viernes Santo', tipo: 'religioso' };

    // San Martín: 3er lunes de agosto
    const sanMartin = obtenerLunesDelMes(año, 7, 3);
    feriados[sanMartin.toISOString().split('T')[0]] = { nombre: 'Paso a la Inmortalidad del Gral. San Martín', tipo: 'trasladable' };

    // Día del Respeto a la Diversidad Cultural: 2do lunes de octubre
    const diversidadCultural = obtenerLunesDelMes(año, 9, 2);
    feriados[diversidadCultural.toISOString().split('T')[0]] = { nombre: 'Día del Respeto a la Diversidad Cultural', tipo: 'trasladable' };

    // Día de la Soberanía Nacional: 4to lunes de noviembre
    const soberaniaNacional = obtenerLunesDelMes(año, 10, 4);
    feriados[soberaniaNacional.toISOString().split('T')[0]] = { nombre: 'Día de la Soberanía Nacional', tipo: 'trasladable' };

    return feriados;
}

// Función auxiliar para obtener el n-ésimo lunes de un mes
function obtenerLunesDelMes(año, mes, numeroLunes) {
    const fecha = new Date(año, mes, 1);
    // Encontrar el primer lunes
    while (fecha.getDay() !== 1) {
        fecha.setDate(fecha.getDate() + 1);
    }
    // Agregar las semanas necesarias
    fecha.setDate(fecha.getDate() + (numeroLunes - 1) * 7);
    return fecha;
}

// Función para calcular la fecha de Pascua
function calcularPascua(año) {
    const a = año % 19;
    const b = Math.floor(año / 100);
    const c = año % 100;
    const d = Math.floor(b / 4);
    const e = b % 4;
    const f = Math.floor((b + 8) / 25);
    const g = Math.floor((b - f + 1) / 3);
    const h = (19 * a + b - d - g + 15) % 30;
    const i = Math.floor(c / 4);
    const k = c % 4;
    const l = (32 + 2 * e + 2 * i - h - k) % 7;
    const m = Math.floor((a + 11 * h + 22 * l) / 451);
    const mes = Math.floor((h + l - 7 * m + 114) / 31);
    const dia = ((h + l - 7 * m + 114) % 31) + 1;
    return new Date(año, mes - 1, dia);
}

// Funciones auxiliares
function esBisiesto(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

function obtenerDiasEnMes(mes, año) {
    const diasPorMes = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (mes === 1 && esBisiesto(año)) {
        return 29;
    }
    return diasPorMes[mes];
}

function obtenerPrimerDiaMes(mes, año) {
    return new Date(año, mes, 1).getDay();
}

// Funciones de manejo de eventos
function abrirModal(fecha) {
    fechaSeleccionada = fecha;
    const modal = document.getElementById('eventModal');
    modal.style.display = 'block';
    document.getElementById('eventTitle').focus();
}

function cerrarModal() {
    const modal = document.getElementById('eventModal');
    modal.style.display = 'none';
    document.getElementById('eventForm').reset();
    fechaSeleccionada = null;
}

function guardarEvento(evento) {
    evento.preventDefault();
    const titulo = document.getElementById('eventTitle').value.trim();
    const descripcion = document.getElementById('eventDescription').value.trim();
    const color = '#f093fb';

    if (!titulo) {
        mostrarNotificacion('Por favor ingresa un título para el evento');
        return;
    }

    if (!eventos[fechaSeleccionada]) {
        eventos[fechaSeleccionada] = [];
    }

    eventos[fechaSeleccionada].push({
        titulo,
        descripcion,
        color
    });

    cerrarModal();
    actualizarCalendario();
    mostrarNotificacion('Evento guardado exitosamente');
}

// Variable global para mantener referencia al modal de eventos
let modalEventosActual = null;

function mostrarEventos(fecha) {
    const eventosDelDia = eventos[fecha] || [];
    const feriados = calcularFeriados(añoActual);
    const esFeriado = feriados[fecha];
    
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'block';
    modalEventosActual = modal; // Guardar referencia global

    const contenido = document.createElement('div');
    contenido.className = 'modal-content';
    
    actualizarContenidoModalEventos(contenido, fecha, eventosDelDia, esFeriado);
    modal.appendChild(contenido);
    document.body.appendChild(modal);

    // Event listeners
    const closeBtn = contenido.querySelector('.close');
    const addEventBtn = contenido.querySelector('#addEventBtnModal');

    closeBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
        modalEventosActual = null;
    });

    addEventBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
        modalEventosActual = null;
        abrirModal(fecha);
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
            modalEventosActual = null;
        }
    });
}

// Nueva función para actualizar solo el contenido del modal
function actualizarContenidoModalEventos(contenido, fecha, eventosDelDia, esFeriado) {
    let contenidoHTML = `
        <span class="close">&times;</span>
        <h2>${formatearFecha(fecha)}</h2>
    `;

    if (esFeriado) {
        contenidoHTML += `
            <div class="feriado-info">
                <h3>${esFeriado.nombre}</h3>
                <span class="feriado-tipo">${esFeriado.tipo}</span>
            </div>
        `;
    }

    if (eventosDelDia.length > 0) {
        contenidoHTML += `
            <div class="eventos-lista">
                ${eventosDelDia.map((evento, index) => `
                    <div class="evento-item" style="border-left: 4px solid ${evento.color}">
                        <div class="evento-header">
                            <h3>${evento.titulo}</h3>
                            <button class="delete-btn" onclick="confirmarEliminarEvento('${fecha}', ${index})">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                        ${evento.descripcion ? `<p>${evento.descripcion}</p>` : ''}
                    </div>
                `).join('')}
            </div>
        `;
    }

    contenidoHTML += `
        <button class="add-event-btn" id="addEventBtnModal">
            <i class="fas fa-plus"></i> Agregar Evento
        </button>
    `;

    contenido.innerHTML = contenidoHTML;
}

function confirmarEliminarEvento(fecha, index) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'block';

    const contenido = document.createElement('div');
    contenido.className = 'modal-content confirm-modal';
    
    contenido.innerHTML = `
        <span class="close">&times;</span>
        <h2>Confirmar Eliminación</h2>
        <p>¿Estás seguro de que quieres eliminar este evento?</p>
        <div class="confirm-buttons">
            <button class="cancel-btn">Cancelar</button>
            <button class="confirm-btn">Eliminar</button>
        </div>
    `;

    modal.appendChild(contenido);
    document.body.appendChild(modal);

    const closeBtn = contenido.querySelector('.close');
    const cancelBtn = contenido.querySelector('.cancel-btn');
    const confirmBtn = contenido.querySelector('.confirm-btn');

    const cerrarConfirmacion = () => {
        document.body.removeChild(modal);
    };

    closeBtn.addEventListener('click', cerrarConfirmacion);
    cancelBtn.addEventListener('click', cerrarConfirmacion);
    
    confirmBtn.addEventListener('click', () => {
        eliminarEvento(fecha, index);
        cerrarConfirmacion();
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            cerrarConfirmacion();
        }
    });
}

function eliminarEvento(fecha, index) {
    if (eventos[fecha]) {
        eventos[fecha].splice(index, 1);
        if (eventos[fecha].length === 0) {
            delete eventos[fecha];
        }
        
        // Actualizar calendario
        actualizarCalendario();
        
        // Actualizar modal de eventos si está abierto
        if (modalEventosActual && modalEventosActual.parentNode) {
            const eventosDelDia = eventos[fecha] || [];
            const feriados = calcularFeriados(añoActual);
            const esFeriado = feriados[fecha];
            const contenido = modalEventosActual.querySelector('.modal-content');
            
            // Actualizar contenido del modal
            actualizarContenidoModalEventos(contenido, fecha, eventosDelDia, esFeriado);
            
            // Re-asignar event listeners para los nuevos elementos
            const closeBtn = contenido.querySelector('.close');
            const addEventBtn = contenido.querySelector('#addEventBtnModal');

            closeBtn.addEventListener('click', () => {
                document.body.removeChild(modalEventosActual);
                modalEventosActual = null;
            });

            addEventBtn.addEventListener('click', () => {
                document.body.removeChild(modalEventosActual);
                modalEventosActual = null;
                abrirModal(fecha);
            });
        }
        
        mostrarNotificacion('Evento eliminado exitosamente');
    }
}

function formatearFecha(fecha) {
    const [año, mes, dia] = fecha.split('-');
    const nombreMes = meses[parseInt(mes) - 1];
    return `${parseInt(dia)} de ${nombreMes} de ${año}`;
}

function mostrarNotificacion(mensaje) {
    // Remover notificación existente si la hay
    const notificacionExistente = document.querySelector('.notificacion-modal');
    if (notificacionExistente) {
        notificacionExistente.remove();
    }

    const notificacion = document.createElement('div');
    notificacion.className = 'notificacion-modal';
    notificacion.innerHTML = `
        ${mensaje}
        <button class="notificacion-close">&times;</button>
    `;

    document.body.appendChild(notificacion);

    const closeBtn = notificacion.querySelector('.notificacion-close');
    closeBtn.addEventListener('click', () => {
        notificacion.remove();
    });

    // Auto-eliminar después de 5 segundos
    setTimeout(() => {
        if (notificacion.parentNode) {
            notificacion.remove();
        }
    }, 5000);
}

// Función principal para actualizar el calendario
function actualizarCalendario() {
    const calendarDays = document.querySelector('.calendar-days');
    const monthElement = document.getElementById('month');
    const yearElement = document.getElementById('year');
    
    monthElement.textContent = meses[mesActual];
    yearElement.textContent = añoActual;

    // Limpiar días anteriores
    calendarDays.innerHTML = '';

    const diasEnMes = obtenerDiasEnMes(mesActual, añoActual);
    const primerDia = obtenerPrimerDiaMes(mesActual, añoActual);
    const feriados = calcularFeriados(añoActual);
    const hoy = new Date();

    // Días del mes anterior
    const mesAnterior = mesActual === 0 ? 11 : mesActual - 1;
    const añoAnterior = mesActual === 0 ? añoActual - 1 : añoActual;
    const diasEnMesAnterior = obtenerDiasEnMes(mesAnterior, añoAnterior);

    for (let i = primerDia - 1; i >= 0; i--) {
        const dia = diasEnMesAnterior - i;
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar__item calendar__day--other-month';
        dayElement.textContent = dia;
        calendarDays.appendChild(dayElement);
    }

    // Días del mes actual
    for (let dia = 1; dia <= diasEnMes; dia++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar__item';
        dayElement.textContent = dia;
        dayElement.setAttribute('role', 'gridcell');
        dayElement.setAttribute('tabindex', '0');

        const fechaString = `${añoActual}-${String(mesActual + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
        
        // Verificar si es hoy
        if (hoy.getDate() === dia && hoy.getMonth() === mesActual && hoy.getFullYear() === añoActual) {
            dayElement.classList.add('calendar__day--today');
        }

        // Verificar si es feriado
        if (feriados[fechaString]) {
            dayElement.classList.add('calendar__day--holiday');
        }

        // Verificar si tiene eventos
        if (eventos[fechaString] && eventos[fechaString].length > 0) {
            const eventDot = document.createElement('div');
            eventDot.className = 'event-dot';
            dayElement.appendChild(eventDot);
        }

        // Event listeners
        dayElement.addEventListener('click', () => {
            if (eventos[fechaString] && eventos[fechaString].length > 0 || feriados[fechaString]) {
                mostrarEventos(fechaString);
            } else {
                abrirModal(fechaString);
            }
        });

        dayElement.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                if (eventos[fechaString] && eventos[fechaString].length > 0 || feriados[fechaString]) {
                    mostrarEventos(fechaString);
                } else {
                    abrirModal(fechaString);
                }
            }
        });

        calendarDays.appendChild(dayElement);
    }

    // Días del mes siguiente
    const totalCeldas = calendarDays.children.length;
    const celdasRestantes = 42 - totalCeldas; // 6 filas × 7 días

    for (let dia = 1; dia <= celdasRestantes; dia++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar__item calendar__day--other-month';
        dayElement.textContent = dia;
        calendarDays.appendChild(dayElement);
    }
}

// Función para cambiar tema
function cambiarTema() {
    temaOscuro = !temaOscuro;
    const body = document.body;
    const themeIcon = document.querySelector('.theme-toggle i');
    
    if (temaOscuro) {
        body.setAttribute('data-theme', 'dark');
        themeIcon.className = 'fas fa-sun';
    } else {
        body.removeAttribute('data-theme');
        themeIcon.className = 'fas fa-moon';
    }
}

// Event listeners principales
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar calendario
    actualizarCalendario();

    // Navegación del calendario
    document.getElementById('prev-month').addEventListener('click', () => {
        if (mesActual === 0) {
            mesActual = 11;
            añoActual--;
        } else {
            mesActual--;
        }
        actualizarCalendario();
    });

    document.getElementById('next-month').addEventListener('click', () => {
        if (mesActual === 11) {
            mesActual = 0;
            añoActual++;
        } else {
            mesActual++;
        }
        actualizarCalendario();
    });

    // Cambio de tema
    document.querySelector('.theme-toggle').addEventListener('click', cambiarTema);
    document.querySelector('.theme-toggle').addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            cambiarTema();
        }
    });

    // Modal de eventos
    document.getElementById('eventForm').addEventListener('submit', guardarEvento);
    
    document.querySelector('.close').addEventListener('click', cerrarModal);
    
    document.getElementById('eventModal').addEventListener('click', (e) => {
        if (e.target.id === 'eventModal') {
            cerrarModal();
        }
    });

    // Navegación con teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            cerrarModal();
            // Cerrar cualquier modal abierto
            const modalesAbiertos = document.querySelectorAll('.modal[style*="block"]');
            modalesAbiertos.forEach(modal => {
                if (modal.parentNode) {
                    modal.parentNode.removeChild(modal);
                }
            });
        }
    });
});