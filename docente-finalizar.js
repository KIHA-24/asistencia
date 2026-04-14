/**
 * docente-finalizar.js
 * Modal de confirmación para finalizar una clase activa
 * Reemplaza los diálogos nativos del navegador (confirm/alert) por modales propios
 */

/**
 * Muestra el modal de confirmación para finalizar la clase
 */
function mostrarModalFinalizar() {
    document.getElementById('modal-finalizar').style.display = 'flex';
}

/**
 * Cierra el modal de confirmación sin realizar ninguna acción
 */
function cerrarModal() {
    document.getElementById('modal-finalizar').style.display = 'none';
}

/**
 * Confirma la finalización de la clase:
 * - Cierra el modal de confirmación
 * - Muestra el modal de éxito con opción de volver al dashboard
 */
function confirmarFinalizar() {
    document.getElementById('modal-finalizar').style.display = 'none';
    document.getElementById('modal-exito').style.display     = 'flex';
}

// Cerrar modal al hacer clic fuera del cuadro (en el fondo oscuro)
document.getElementById('modal-finalizar').addEventListener('click', function(e) {
    if (e.target === this) cerrarModal();
});
