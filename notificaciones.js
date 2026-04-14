/**
 * notificaciones.js
 * Gestión interactiva del centro de notificaciones
 * Permite cerrar, marcar como leídas y filtrar notificaciones
 */

/**
 * Actualiza el contador de notificaciones no leídas en pantalla
 */
function actualizarContador() {
    const noLeidas = document.querySelectorAll('.notification-item.unread').length;
    const contador = document.getElementById('contador-no-leidas');
    contador.textContent   = noLeidas > 0 ? `${noLeidas} sin leer` : '';
    contador.style.display = noLeidas > 0 ? 'inline-block' : 'none';
}

/**
 * Cierra (elimina del DOM) una notificación con animación de desvanecimiento
 * @param {HTMLElement} boton - El botón X que fue presionado
 */
function cerrarNotificacion(boton) {
    const item = boton.closest('.notification-item');
    // Animación de salida antes de eliminar del DOM
    item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    item.style.opacity    = '0';
    item.style.transform  = 'translateX(20px)';
    setTimeout(() => {
        item.remove();
        actualizarContador();
    }, 300);
}

/**
 * Marca una notificación individual como leída al hacer clic en ella
 * @param {HTMLElement} item - El elemento de notificación
 */
function marcarLeida(item) {
    item.classList.remove('unread');
    actualizarContador();
}

/**
 * Marca todas las notificaciones visibles como leídas
 */
function marcarTodasLeidas() {
    document.querySelectorAll('.notification-item.unread').forEach(item => {
        item.classList.remove('unread');
    });
    actualizarContador();
}

/**
 * Filtra las notificaciones según la opción seleccionada en el select
 * Muestra u oculta items según su estado de lectura
 */
function filtrarNotificaciones() {
    const filtro = document.getElementById('filtro-notif').value;
    document.querySelectorAll('.notification-item').forEach(item => {
        const esNoLeida = item.classList.contains('unread');
        if (filtro === 'todas') {
            item.style.display = 'flex';
        } else if (filtro === 'no-leidas') {
            item.style.display = esNoLeida ? 'flex' : 'none';
        } else if (filtro === 'leidas') {
            item.style.display = !esNoLeida ? 'flex' : 'none';
        }
    });
}

// Asignar evento de cierre a cada botón X
document.querySelectorAll('.btn-close').forEach(boton => {
    boton.addEventListener('click', () => cerrarNotificacion(boton));
});

// Marcar como leída al hacer clic en el contenido de la notificación
document.querySelectorAll('.notification-item').forEach(item => {
    item.addEventListener('click', (e) => {
        // No marcar si se hizo clic en el botón cerrar
        if (!e.target.closest('.btn-close')) marcarLeida(item);
    });
});

// Inicializar contador al cargar la página
actualizarContador();
