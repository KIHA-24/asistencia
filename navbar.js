/**
 * navbar.js
 * Menú hamburguesa para navegación en dispositivos móviles
 * Se incluye en todas las páginas del sistema
 */

/**
 * Inicializa el comportamiento del menú hamburguesa:
 * - Alterna la clase 'nav-open' en el menú al hacer clic en el botón
 * - Cambia el ícono entre barras (fa-bars) y X (fa-times)
 * - Cierra el menú al hacer clic en cualquier enlace
 * - Cierra el menú al hacer clic fuera del navbar
 */
document.addEventListener('DOMContentLoaded', () => {
    const toggle   = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    if (!toggle || !navLinks) return;

    // Abrir / cerrar menú al hacer clic en el botón hamburguesa
    toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const abierto = navLinks.classList.toggle('nav-open');
        // Cambiar ícono según el estado del menú
        toggle.querySelector('i').className = abierto ? 'fas fa-times' : 'fas fa-bars';
    });

    // Cerrar menú al hacer clic en un enlace
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('nav-open');
            toggle.querySelector('i').className = 'fas fa-bars';
        });
    });

    // Cerrar menú al hacer clic fuera del navbar
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar')) {
            navLinks.classList.remove('nav-open');
            toggle.querySelector('i').className = 'fas fa-bars';
        }
    });
});
