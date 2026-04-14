/**
 * estudiante-asistencias.js
 * Filtro interactivo de la tabla de asistencias del estudiante
 * Permite filtrar por asignatura y por estado de asistencia
 */

/**
 * Filtra las filas de la tabla de asistencias según:
 * - Asignatura seleccionada en el primer select
 * - Estado de asistencia (Presente, Ausente, Tardanza) en el segundo select
 * Muestra un mensaje si no hay registros que coincidan con el filtro
 */
function filtrarAsistencias() {
    const asignatura = document.getElementById('filtro-asignatura').value.toLowerCase();
    const estado     = document.getElementById('filtro-estado').value.toLowerCase();
    const filas      = document.querySelectorAll('.data-table tbody tr');
    let visibles     = 0;

    filas.forEach(fila => {
        const asignaturaFila = fila.cells[1].textContent.toLowerCase();
        const estadoFila     = fila.cells[3].textContent.toLowerCase();

        const coincideAsignatura = !asignatura || asignaturaFila.includes(asignatura);
        const coincideEstado     = !estado     || estadoFila.includes(estado);

        if (coincideAsignatura && coincideEstado) {
            fila.style.display = '';
            visibles++;
        } else {
            fila.style.display = 'none';
        }
    });

    // Mostrar u ocultar el mensaje de sin resultados
    document.getElementById('sin-resultados').style.display = visibles === 0 ? 'block' : 'none';
}
