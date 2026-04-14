/**
 * estudiante-notificaciones.js
 * Interacción con notificaciones del estudiante
 * Permite confirmar asistencia con feedback visual y cerrar notificaciones
 */

/**
 * Confirma la asistencia del estudiante desde la notificación urgente:
 * - Reemplaza el botón por un mensaje de éxito en la misma página
 * - Cambia el estilo de la notificación a "confirmada"
 * - No recarga la página ni usa alert()
 */
function confirmarAsistencia() {
    const notifUrgente = document.querySelector('.notification-warning.unread');
    const btnConfirmar = notifUrgente.querySelector('.btn-primary');

    // Reemplazar el botón por un mensaje de confirmación visual
    btnConfirmar.parentElement.innerHTML =
        '<p style="color:#28a745; font-weight:600; margin-top:0.8rem;">' +
        '<i class="fas fa-check-circle"></i> Asistencia confirmada exitosamente</p>';

    // Cambiar el estilo de la notificación a éxito
    notifUrgente.classList.remove('unread', 'notification-warning');
    notifUrgente.classList.add('notification-success');
    notifUrgente.querySelector('.notification-icon').innerHTML = '<i class="fas fa-check-circle"></i>';
}

/**
 * Cierra una notificación con animación de salida
 * @param {HTMLElement} boton - Botón X presionado
 */
function cerrarNotificacion(boton) {
    const item = boton.closest('.notification-item');
    item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    item.style.opacity    = '0';
    item.style.transform  = 'translateX(20px)';
    setTimeout(() => item.remove(), 300);
}

// Asignar cierre a los botones X que existan en la página
document.querySelectorAll('.btn-close').forEach(boton => {
    boton.addEventListener('click', () => cerrarNotificacion(boton));
});
