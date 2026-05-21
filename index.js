/**
 * index.js
 * Animaciones e interactividad de la página de inicio
 * Usa IntersectionObserver para animar las feature-cards al hacer scroll
 */

/**
 * Anima las feature-cards cuando entran en el viewport del usuario
 * Usa IntersectionObserver para detectar cuándo cada card es visible
 * y aplica una clase CSS que dispara la animación de entrada
 */
function iniciarAnimacionCards() {
    const cards = document.querySelectorAll('.feature-card');

    const observador = new IntersectionObserver((entradas) => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                // Agregar clase que activa la animación CSS
                entrada.target.classList.add('card-visible');
                // Dejar de observar la card una vez animada
                observador.unobserve(entrada.target);
            }
        });
    }, {
        threshold: 0.15 // La card debe ser 15% visible para activarse
    });

    // Observar cada card y aplicar estado inicial invisible
    cards.forEach((card, index) => {
        card.classList.add('card-oculta');
        // Retraso escalonado para que las cards aparezcan una tras otra
        card.style.transitionDelay = `${index * 0.1}s`;
        observador.observe(card);
    });
}

/**
 * Activa el scroll suave al hacer clic en los botones del hero
 * que apuntan a secciones internas de la misma página
 */
function iniciarScrollSuave() {
    document.querySelectorAll('a[href^="#"]').forEach(enlace => {
        enlace.addEventListener('click', (e) => {
            const destino = document.querySelector(enlace.getAttribute('href'));
            if (destino) {
                e.preventDefault();
                destino.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    iniciarAnimacionCards();
    iniciarScrollSuave();
});
