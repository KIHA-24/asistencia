/**
 * login.js
 * Validación del formulario de acceso al sistema ASISTE-UNILIBRE
 * Verifica usuario, contraseña y rol antes de redirigir al dashboard
 */

/**
 * Limpia el mensaje de error de un campo específico
 * @param {string} campoId - ID del campo a limpiar
 */
function limpiarError(campoId) {
    const campo = document.getElementById(campoId);
    const error = document.getElementById('error-' + campoId);
    if (campo) campo.classList.remove('input-error');
    if (error) error.textContent = '';
}

/**
 * Muestra un mensaje de error en un campo específico
 * @param {string} campoId - ID del campo con error
 * @param {string} mensaje - Texto del error a mostrar
 */
function mostrarError(campoId, mensaje) {
    const campo = document.getElementById(campoId);
    const error = document.getElementById('error-' + campoId);
    if (campo) campo.classList.add('input-error');
    if (error) error.textContent = mensaje;
}

/**
 * Valida el formulario de login antes de redirigir
 * Verifica que todos los campos estén completos y con formato correcto
 * @returns {boolean} false para prevenir el envío nativo del formulario
 */
function validarLogin() {
    // Limpiar errores previos
    ['usuario', 'password', 'rol'].forEach(limpiarError);
    document.getElementById('form-error').style.display = 'none';

    const usuario  = document.getElementById('usuario').value.trim();
    const password = document.getElementById('password').value;
    const rol      = document.getElementById('rol').value;
    let valido     = true;

    // Validar campo usuario
    if (!usuario) {
        mostrarError('usuario', 'El usuario es obligatorio.');
        valido = false;
    } else if (usuario.length < 4) {
        mostrarError('usuario', 'El usuario debe tener al menos 4 caracteres.');
        valido = false;
    }

    // Validar campo contraseña
    if (!password) {
        mostrarError('password', 'La contraseña es obligatoria.');
        valido = false;
    } else if (password.length < 6) {
        mostrarError('password', 'La contraseña debe tener al menos 6 caracteres.');
        valido = false;
    }

    // Validar selección de rol
    if (!rol) {
        mostrarError('rol', 'Debe seleccionar un tipo de usuario.');
        valido = false;
    }

    // Si hay errores, no continuar
    if (!valido) return false;

    // Redirigir según el rol seleccionado
    if (rol === 'administrador') {
        window.location.href = 'administrador.html';
    } else if (rol === 'docente') {
        window.location.href = 'docente.html';
    } else if (rol === 'estudiante') {
        window.location.href = 'estudiante.html';
    }

    return false;
}

// Limpiar errores en tiempo real cuando el usuario empieza a escribir
document.getElementById('usuario').addEventListener('input', () => limpiarError('usuario'));
document.getElementById('password').addEventListener('input', () => limpiarError('password'));
document.getElementById('rol').addEventListener('change', () => limpiarError('rol'));
