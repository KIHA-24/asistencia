/**
 * docente-registro.js
 * Contador regresivo y activación de asistencia en tiempo real
 * El docente activa la sesión y los estudiantes tienen un tiempo límite para confirmar
 */

/* Variable global que almacena el intervalo del contador */
let intervaloContador = null;

/**
 * Formatea segundos en formato MM:SS para mostrar en pantalla
 * @param {number} segundos - Total de segundos restantes
 * @returns {string} Tiempo formateado como "MM:SS"
 */
function formatearTiempo(segundos) {
    const minutos = Math.floor(segundos / 60);
    const segs    = segundos % 60;
    return `${String(minutos).padStart(2, '0')}:${String(segs).padStart(2, '0')}`;
}

/**
 * Inicia el contador regresivo en pantalla
 * Actualiza el elemento .tiempo-restante cada segundo
 * Cuando llega a 0, detiene el contador y muestra mensaje de tiempo agotado
 * @param {number} minutos - Minutos seleccionados por el docente
 */
function iniciarContador(minutos) {
    let segundosRestantes = minutos * 60;
    const elementoTiempo  = document.querySelector('.tiempo-restante');

    // Limpiar cualquier contador previo que esté corriendo
    if (intervaloContador) clearInterval(intervaloContador);

    // Actualizar el tiempo en pantalla cada segundo
    intervaloContador = setInterval(() => {
        segundosRestantes--;
        elementoTiempo.innerHTML = `<i class="fas fa-hourglass-half"></i> Tiempo restante: <strong>${formatearTiempo(segundosRestantes)}</strong>`;

        // Cambiar color a rojo cuando queden menos de 60 segundos
        if (segundosRestantes <= 60) {
            elementoTiempo.style.color = '#dc3545';
        }

        // Detener el contador cuando llegue a cero
        if (segundosRestantes <= 0) {
            clearInterval(intervaloContador);
            elementoTiempo.innerHTML = '<i class="fas fa-times-circle"></i> <strong>Tiempo agotado</strong>';
            elementoTiempo.style.color = '#dc3545';
        }
    }, 1000);
}

/**
 * Activa la sesión de asistencia:
 * - Oculta el panel de activación
 * - Muestra el panel de estado en tiempo real
 * - Inicia el contador regresivo con el tiempo seleccionado
 */
function activarAsistencia() {
    // Obtener el tiempo seleccionado por el docente
    const selectTiempo = document.querySelector('.asistencia-activar-card .form-control');
    const minutos      = parseInt(selectTiempo.value);

    // Ocultar el panel de activación y mostrar el de estado
    document.querySelector('.asistencia-activar-card').style.display = 'none';
    document.querySelector('.asistencia-estado-card').style.display  = 'block';

    // Actualizar el texto del tiempo en el panel de estado
    const elementoTiempo = document.querySelector('.tiempo-restante');
    elementoTiempo.innerHTML = `<i class="fas fa-hourglass-half"></i> Tiempo restante: <strong>${formatearTiempo(minutos * 60)}</strong>`;

    // Iniciar el contador regresivo
    iniciarContador(minutos);
}
