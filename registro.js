/**
 * registro.js
 * Validación del formulario de registro de nuevos usuarios en ASISTE-UNILIBRE
 * Verifica nombre, email, usuario, contraseñas y rol
 */

/**
 * Limpia el error visual de un campo del formulario
 * @param {string} campoId - ID del campo a limpiar
 */
function limpiarError(campoId) {
    const campo = document.getElementById(campoId);
    const error = document.getElementById('error-' + campoId);
    if (campo) campo.classList.remove('input-error');
    if (error) error.textContent = '';
}

/**
 * Muestra un error visual en un campo del formulario
 * @param {string} campoId - ID del campo con error
 * @param {string} mensaje - Mensaje de error a mostrar
 */
function mostrarError(campoId, mensaje) {
    const campo = document.getElementById(campoId);
    const error = document.getElementById('error-' + campoId);
    if (campo) campo.classList.add('input-error');
    if (error) error.textContent = mensaje;
}

/**
 * Valida que el email tenga un formato correcto
 * @param {string} email - Email a validar
 * @returns {boolean} true si el formato es válido
 */
function esEmailValido(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

/**
 * Valida todos los campos del formulario de registro
 * Verifica nombre, email, usuario, contraseñas y rol
 * @returns {boolean} false para prevenir el envío nativo
 */
function validarRegistro() {
    // Limpiar todos los errores previos
    ['nombre', 'email', 'usuario', 'password', 'confirm-password', 'rol'].forEach(limpiarError);

    const nombre    = document.getElementById('nombre').value.trim();
    const email     = document.getElementById('email').value.trim();
    const usuario   = document.getElementById('usuario').value.trim();
    const password  = document.getElementById('password').value;
    const confirmar = document.getElementById('confirm-password').value;
    const rol       = document.getElementById('rol').value;
    let valido      = true;

    // Validar nombre completo
    if (!nombre) {
        mostrarError('nombre', 'El nombre completo es obligatorio.');
        valido = false;
    } else if (nombre.length < 5) {
        mostrarError('nombre', 'Ingrese su nombre completo.');
        valido = false;
    }

    // Validar email con formato correcto
    if (!email) {
        mostrarError('email', 'El correo institucional es obligatorio.');
        valido = false;
    } else if (!esEmailValido(email)) {
        mostrarError('email', 'Ingrese un correo electrónico válido.');
        valido = false;
    }

    // Validar usuario
    if (!usuario) {
        mostrarError('usuario', 'El usuario es obligatorio.');
        valido = false;
    } else if (usuario.length < 4) {
        mostrarError('usuario', 'El usuario debe tener al menos 4 caracteres.');
        valido = false;
    }

    // Validar contraseña
    if (!password) {
        mostrarError('password', 'La contraseña es obligatoria.');
        valido = false;
    } else if (password.length < 6) {
        mostrarError('password', 'La contraseña debe tener al menos 6 caracteres.');
        valido = false;
    }

    // Validar que las contraseñas coincidan
    if (!confirmar) {
        mostrarError('confirm-password', 'Debe confirmar su contraseña.');
        valido = false;
    } else if (password !== confirmar) {
        mostrarError('confirm-password', 'Las contraseñas no coinciden.');
        valido = false;
    }

    // Validar selección de rol
    if (!rol) {
        mostrarError('rol', 'Debe seleccionar un tipo de usuario.');
        valido = false;
    }

    // Si todo es válido, simular registro exitoso
    if (valido) {
        alert('Registro exitoso. Ahora puede iniciar sesión.');
        window.location.href = 'login.html';
    }

    return false;
}

// Limpiar errores en tiempo real mientras el usuario escribe
['nombre', 'email', 'usuario', 'password'].forEach(id => {
    document.getElementById(id).addEventListener('input', () => limpiarError(id));
});
document.getElementById('confirm-password').addEventListener('input', () => limpiarError('confirm-password'));
document.getElementById('rol').addEventListener('change', () => limpiarError('rol'));
