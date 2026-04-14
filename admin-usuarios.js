/**
 * admin-usuarios.js
 * Búsqueda en tiempo real y filtro por rol en la tabla de usuarios
 * Permite al administrador encontrar usuarios rápidamente
 */

/**
 * Filtra las filas de la tabla de usuarios según:
 * - Texto escrito en el buscador (busca en nombre y email)
 * - Rol seleccionado en el select de filtro
 * Muestra un mensaje si no hay resultados que coincidan
 */
function filtrarUsuarios() {
    const textoBusqueda = document.getElementById('buscar-usuario').value.toLowerCase().trim();
    const rolFiltro     = document.getElementById('filtro-rol').value.toLowerCase();
    const filas         = document.querySelectorAll('.data-table tbody tr');
    let visibles        = 0;

    filas.forEach(fila => {
        const nombre = fila.cells[1].textContent.toLowerCase();
        const email  = fila.cells[2].textContent.toLowerCase();
        const rol    = fila.cells[3].textContent.toLowerCase();

        // Verificar si coincide con el texto de búsqueda (nombre o email)
        const coincideTexto = !textoBusqueda || nombre.includes(textoBusqueda) || email.includes(textoBusqueda);
        // Verificar si coincide con el rol seleccionado
        const coincideRol   = !rolFiltro || rol.includes(rolFiltro);

        if (coincideTexto && coincideRol) {
            fila.style.display = '';
            visibles++;
        } else {
            fila.style.display = 'none';
        }
    });

    // Mostrar u ocultar el mensaje de sin resultados
    document.getElementById('sin-resultados').style.display = visibles === 0 ? 'block' : 'none';
}
