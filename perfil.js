/**
 * perfil.js
 * Validación del formulario de cambio de contraseña en el perfil de usuario
 * Verifica contraseña actual, nueva contraseña y confirmación
 */

/**
 * Muestra un error visual en un campo del formulario de contraseña
 * @param {string} id - ID del campo con error
 * @param {string} msg - Mensaje de error a mostrar
 */
function errorPass(id, msg) {
    document.getElementById(id).classList.add('input-error');
    document.getElementById('error-' + id).textContent = msg;
}

/**
 * Limpia el error visual de un campo del formulario de contraseña
 * @param {string} id - ID del campo a limpiar
 */
function limpiarPass(id) {
    document.getElementById(id).classList.remove('input-error');
    document.getElementById('error-' + id).textContent = '';
}

/**
 * Valida el formulario de cambio de contraseña:
 * - Verifica que la contraseña actual no esté vacía
 * - Verifica que la nueva contraseña tenga al menos 6 caracteres
 * - Verifica que la confirmación coincida con la nueva contraseña
 * Si todo es válido, muestra un mensaje de éxito y limpia los campos
 * @returns {boolean} false para prevenir el envío nativo del formulario
 */
function validarPassword() {
    ['pass-actual', 'pass-nueva', 'pass-confirmar'].forEach(limpiarPass);
    document.getElementById('msg-password').style.display = 'none';

    const actual    = document.getElementById('pass-actual').value;
    const nueva     = document.getElementById('pass-nueva').value;
    const confirmar = document.getElementById('pass-confirmar').value;
    let valido      = true;

    if (!actual) {
        errorPass('pass-actual', 'Ingrese su contraseña actual.');
        valido = false;
    }

    if (!nueva) {
        errorPass('pass-nueva', 'Ingrese la nueva contraseña.');
        valido = false;
    } else if (nueva.length < 6) {
        errorPass('pass-nueva', 'La contraseña debe tener al menos 6 caracteres.');
        valido = false;
    }

    if (!confirmar) {
        errorPass('pass-confirmar', 'Confirme la nueva contraseña.');
        valido = false;
    } else if (nueva !== confirmar) {
        errorPass('pass-confirmar', 'Las contraseñas no coinciden.');
        valido = false;
    }

    // Mostrar mensaje de éxito si todo es válido
    if (valido) {
        const msg          = document.getElementById('msg-password');
        msg.textContent    = '✓ Contraseña actualizada correctamente.';
        msg.style.display  = 'block';
        msg.style.background = '#d4edda';
        msg.style.color      = '#155724';
        msg.style.border     = '1px solid #c3e6cb';
        // Limpiar los campos del formulario
        ['pass-actual', 'pass-nueva', 'pass-confirmar'].forEach(id => {
            document.getElementById(id).value = '';
        });
    }

    return false;
}

// Limpiar errores en tiempo real mientras el usuario escribe
['pass-actual', 'pass-nueva', 'pass-confirmar'].forEach(id => {
    document.getElementById(id).addEventListener('input', () => limpiarPass(id));
});
   