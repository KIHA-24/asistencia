/**
 * docente-historial.js
 * Filtro de tarjetas del historial de clases por asignatura
 * Usa el atributo data-asignatura de cada card para comparar con el filtro
 */

/**
 * Filtra las tarjetas del historial según la asignatura seleccionada
 * Cada tarjeta tiene un atributo data-asignatura que se compara con el valor del select
 * Muestra un mensaje si no hay clases que coincidan con el filtro
 */
function filtrarHistorial() {
    const filtro  = document.getElementById('filtro-asignatura').value.toLowerCase();
    const cards   = document.querySelectorAll('.historial-card');
    let visibles  = 0;

    cards.forEach(card => {
        const asignatura = card.dataset.asignatura.toLowerCase();
        const coincide   = !filtro || asignatura.includes(filtro);
        card.style.display = coincide ? 'block' : 'none';
        if (coincide) visibles++;
    });

    // Mostrar u ocultar el mensaje de sin resultados
    document.getElementById('sin-resultados').style.display = visibles === 0 ? 'block' : 'none';
}
 