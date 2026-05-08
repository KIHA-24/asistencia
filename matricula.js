/**
 * matricula.js
 * Lógica de matrícula para estudiantes y docentes
 * Se conecta con la API PHP en api/ para consultar y registrar matrículas
 * Usa la base de datos: asitencia_libre_cucuta
 */

/* ============================================================
   VARIABLES GLOBALES
   ============================================================ */

/** ID del horario seleccionado para matricular */
let horarioSeleccionado = null;

/** Datos del horario seleccionado (para mostrar en modal) */
let datosHorarioSeleccionado = null;

/** ID del estudiante seleccionado (usado en vista docente) */
let estudianteSeleccionado = null;

/** Datos del estudiante seleccionado (para mostrar en modal) */
let datosEstudianteSeleccionado = null;

/* ============================================================
   VISTA ESTUDIANTE — Buscar asignaturas disponibles
   ============================================================ */

/**
 * Busca horarios disponibles por nombre de asignatura
 * Llama a api/buscar_horarios.php con el término de búsqueda
 */
function buscarAsignaturas() {
    const termino = document.getElementById('buscar-asignatura').value.trim();
    const contenedor = document.getElementById('resultados-asignaturas');
    const sinResultados = document.getElementById('sin-resultados-asig');

    // Limpiar resultados anteriores
    contenedor.innerHTML = '';
    sinResultados.style.display = 'none';

    if (termino.length < 2) return;

    // Mostrar indicador de carga
    contenedor.innerHTML = '<p style="text-align:center; color:#888; padding:1rem;"><i class="fas fa-spinner fa-spin"></i> Buscando...</p>';

    // Llamar a la API PHP
    fetch(`api/buscar_horarios.php?nombre=${encodeURIComponent(termino)}`)
        .then(res => res.json())
        .then(data => {
            contenedor.innerHTML = '';

            if (!data.success || data.horarios.length === 0) {
                sinResultados.style.display = 'block';
                return;
            }

            // Renderizar cada horario encontrado
            data.horarios.forEach(horario => {
                contenedor.innerHTML += crearTarjetaHorario(horario, 'estudiante');
            });
        })
        .catch(() => {
            contenedor.innerHTML = '<p style="text-align:center; color:#dc3545; padding:1rem;"><i class="fas fa-exclamation-circle"></i> Error al conectar con el servidor.</p>';
        });
}

/**
 * Genera el HTML de una tarjeta de horario disponible
 * @param {Object} horario - Datos del horario desde la BD
 * @param {string} vista - 'estudiante' o 'docente'
 * @returns {string} HTML de la tarjeta
 */
function crearTarjetaHorario(horario, vista) {
    const botonId = vista === 'estudiante' ? `onclick="seleccionarHorario(${horario.id_horario}, '${horario.nombre_asignatura}', '${horario.dia_semana}', '${horario.hora_inicio}', '${horario.hora_fin}', '${horario.aula}')"` : `onclick="seleccionarHorarioDocente(${horario.id_horario}, '${horario.nombre_asignatura}', '${horario.dia_semana}', '${horario.hora_inicio}', '${horario.hora_fin}', '${horario.aula}')"`;

    return `
        <div class="historial-card" style="margin-bottom:1rem;">
            <div class="historial-header">
                <h3><i class="fas fa-book"></i> ${horario.nombre_asignatura}</h3>
                <span class="fecha-badge">${horario.codigo_asignatura}</span>
            </div>
            <div class="historial-body">
                <div class="stats-inline">
                    <span class="stat-item"><i class="fas fa-calendar-day"></i> ${horario.dia_semana}</span>
                    <span class="stat-item"><i class="fas fa-clock"></i> ${horario.hora_inicio} - ${horario.hora_fin}</span>
                    <span class="stat-item"><i class="fas fa-map-marker-alt"></i> Salón ${horario.aula}</span>
                    <span class="stat-item"><i class="fas fa-chalkboard-teacher"></i> ${horario.nombre_docente}</span>
                </div>
            </div>
            <div class="historial-footer">
                <button class="btn-primary" ${botonId}>
                    <i class="fas fa-plus-circle"></i> Matricularme
                </button>
            </div>
        </div>
    `;
}

/**
 * Guarda el horario seleccionado y muestra el modal de confirmación (vista estudiante)
 * @param {number} idHorario - ID del horario
 * @param {string} asignatura - Nombre de la asignatura
 * @param {string} dia - Día de la semana
 * @param {string} horaInicio - Hora de inicio
 * @param {string} horaFin - Hora de fin
 * @param {string} aula - Salón
 */
function seleccionarHorario(idHorario, asignatura, dia, horaInicio, horaFin, aula) {
    horarioSeleccionado = idHorario;
    datosHorarioSeleccionado = { asignatura, dia, horaInicio, horaFin, aula };

    document.getElementById('modal-matricula-texto').innerHTML =
        `¿Deseas matricularte en <strong>${asignatura}</strong>?<br>
         <small style="color:#666;">${dia} · ${horaInicio} - ${horaFin} · Salón ${aula}</small>`;

    document.getElementById('modal-matricula').style.display = 'flex';
}

/** Cierra el modal de confirmación de matrícula (estudiante) */
function cerrarModalMatricula() {
    document.getElementById('modal-matricula').style.display = 'none';
    horarioSeleccionado = null;
}

/**
 * Confirma y registra la matrícula del estudiante
 * Llama a api/matricular.php con el id_horario
 * Por ahora usa id_estudiante = 1 (simulado hasta tener sesión real)
 */
function confirmarMatricula() {
    cerrarModalMatricula();

    // TODO: reemplazar id_estudiante con el ID real de la sesión
    const idEstudiante = 1;

    fetch('api/matricular.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id_estudiante: idEstudiante,
            id_horario: horarioSeleccionado
        })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            document.getElementById('modal-exito-texto').textContent =
                `Te has matriculado en ${datosHorarioSeleccionado.asignatura} correctamente.`;
            document.getElementById('modal-exito-matricula').style.display = 'flex';
            cargarMisMatriculas();
        } else {
            alert('Error: ' + (data.mensaje || 'No se pudo completar la matrícula.'));
        }
    })
    .catch(() => {
        alert('Error al conectar con el servidor.');
    });
}

/** Cierra el modal de éxito y limpia la búsqueda (estudiante) */
function cerrarModalExito() {
    document.getElementById('modal-exito-matricula').style.display = 'none';
    document.getElementById('buscar-asignatura').value = '';
    document.getElementById('resultados-asignaturas').innerHTML = '';
    horarioSeleccionado = null;
}

/**
 * Carga y muestra las matrículas activas del estudiante
 * Llama a api/mis_matriculas.php
 */
function cargarMisMatriculas() {
    const contenedor = document.getElementById('lista-matriculas');
    if (!contenedor) return;

    // TODO: reemplazar id_estudiante con el ID real de la sesión
    const idEstudiante = 1;

    fetch(`api/mis_matriculas.php?id_estudiante=${idEstudiante}`)
        .then(res => res.json())
        .then(data => {
            if (!data.success || data.matriculas.length === 0) {
                contenedor.innerHTML = '<p style="color:#888; text-align:center; padding:1rem;"><i class="fas fa-info-circle"></i> No tienes asignaturas matriculadas aún.</p>';
                return;
            }

            // Construir tabla de matrículas
            let html = '<div class="table-container"><table class="data-table"><thead><tr><th>Asignatura</th><th>Código</th><th>Día</th><th>Horario</th><th>Salón</th><th>Docente</th></tr></thead><tbody>';

            data.matriculas.forEach(m => {
                html += `<tr>
                    <td>${m.nombre_asignatura}</td>
                    <td>${m.codigo_asignatura}</td>
                    <td>${m.dia_semana}</td>
                    <td>${m.hora_inicio} - ${m.hora_fin}</td>
                    <td>${m.aula}</td>
                    <td>${m.nombre_docente}</td>
                </tr>`;
            });

            html += '</tbody></table></div>';
            contenedor.innerHTML = html;
        })
        .catch(() => {
            contenedor.innerHTML = '<p style="color:#dc3545; text-align:center; padding:1rem;"><i class="fas fa-exclamation-circle"></i> Error al cargar matrículas.</p>';
        });
}

/* ============================================================
   VISTA DOCENTE — Buscar estudiante y matricularlo
   ============================================================ */

/**
 * Busca estudiantes por nombre, correo o código
 * Llama a api/buscar_estudiante.php
 */
function buscarEstudiante() {
    const termino = document.getElementById('buscar-estudiante').value.trim();
    const contenedor = document.getElementById('resultados-estudiantes');
    const sinResultados = document.getElementById('sin-resultados-est');

    contenedor.innerHTML = '';
    sinResultados.style.display = 'none';

    if (termino.length < 2) return;

    contenedor.innerHTML = '<p style="text-align:center; color:#888; padding:1rem;"><i class="fas fa-spinner fa-spin"></i> Buscando...</p>';

    fetch(`api/buscar_estudiante.php?termino=${encodeURIComponent(termino)}`)
        .then(res => res.json())
        .then(data => {
            contenedor.innerHTML = '';

            if (!data.success || data.estudiantes.length === 0) {
                sinResultados.style.display = 'block';
                return;
            }

            // Renderizar resultados en tabla
            let html = '<div class="table-container"><table class="data-table"><thead><tr><th>ID</th><th>Nombre</th><th>Correo</th><th>Acción</th></tr></thead><tbody>';

            data.estudiantes.forEach(est => {
                html += `<tr>
                    <td>${est.id}</td>
                    <td>${est.nombre}</td>
                    <td>${est.correo}</td>
                    <td>
                        <button class="btn-small" onclick="elegirEstudiante(${est.id}, '${est.nombre}', '${est.correo}')">
                            <i class="fas fa-user-check"></i> Seleccionar
                        </button>
                    </td>
                </tr>`;
            });

            html += '</tbody></table></div>';
            contenedor.innerHTML = html;
        })
        .catch(() => {
            contenedor.innerHTML = '<p style="color:#dc3545; text-align:center; padding:1rem;"><i class="fas fa-exclamation-circle"></i> Error al conectar con el servidor.</p>';
        });
}

/**
 * Guarda el estudiante seleccionado y muestra el paso 2
 * @param {number} id - ID del estudiante
 * @param {string} nombre - Nombre del estudiante
 * @param {string} correo - Correo del estudiante
 */
function elegirEstudiante(id, nombre, correo) {
    estudianteSeleccionado = id;
    datosEstudianteSeleccionado = { id, nombre, correo };

    // Mostrar info del estudiante seleccionado
    document.getElementById('info-estudiante-seleccionado').innerHTML =
        `<p><i class="fas fa-user"></i> <strong>${nombre}</strong></p>
         <p><i class="fas fa-envelope"></i> ${correo}</p>
         <p><i class="fas fa-id-badge"></i> ID: ${id}</p>`;

    document.getElementById('estudiante-seleccionado').style.display = 'block';
    document.getElementById('resultados-estudiantes').innerHTML = '';

    // Mostrar paso 2 y matrículas del estudiante
    document.getElementById('paso2').style.display = 'block';
    document.getElementById('matriculas-estudiante').style.display = 'block';
    cargarMatriculasEstudiante(id);
}

/** Limpia la selección del estudiante y oculta el paso 2 */
function limpiarEstudiante() {
    estudianteSeleccionado = null;
    datosEstudianteSeleccionado = null;
    document.getElementById('estudiante-seleccionado').style.display = 'none';
    document.getElementById('paso2').style.display = 'none';
    document.getElementById('matriculas-estudiante').style.display = 'none';
    document.getElementById('buscar-estudiante').value = '';
    document.getElementById('resultados-estudiantes').innerHTML = '';
    document.getElementById('buscar-asignatura-docente').value = '';
    document.getElementById('resultados-asignaturas-docente').innerHTML = '';
}

/**
 * Busca asignaturas disponibles (vista docente)
 */
function buscarAsignaturasDocente() {
    const termino = document.getElementById('buscar-asignatura-docente').value.trim();
    const contenedor = document.getElementById('resultados-asignaturas-docente');
    const sinResultados = document.getElementById('sin-resultados-asig-doc');

    contenedor.innerHTML = '';
    sinResultados.style.display = 'none';

    if (termino.length < 2) return;

    contenedor.innerHTML = '<p style="text-align:center; color:#888; padding:1rem;"><i class="fas fa-spinner fa-spin"></i> Buscando...</p>';

    fetch(`api/buscar_horarios.php?nombre=${encodeURIComponent(termino)}`)
        .then(res => res.json())
        .then(data => {
            contenedor.innerHTML = '';

            if (!data.success || data.horarios.length === 0) {
                sinResultados.style.display = 'block';
                return;
            }

            data.horarios.forEach(horario => {
                contenedor.innerHTML += crearTarjetaHorario(horario, 'docente');
            });
        })
        .catch(() => {
            contenedor.innerHTML = '<p style="color:#dc3545; text-align:center; padding:1rem;"><i class="fas fa-exclamation-circle"></i> Error al conectar con el servidor.</p>';
        });
}

/**
 * Guarda el horario seleccionado y muestra el modal de confirmación (vista docente)
 */
function seleccionarHorarioDocente(idHorario, asignatura, dia, horaInicio, horaFin, aula) {
    horarioSeleccionado = idHorario;
    datosHorarioSeleccionado = { asignatura, dia, horaInicio, horaFin, aula };

    document.getElementById('modal-matricula-doc-texto').innerHTML =
        `¿Deseas matricular a <strong>${datosEstudianteSeleccionado.nombre}</strong> en <strong>${asignatura}</strong>?<br>
         <small style="color:#666;">${dia} · ${horaInicio} - ${horaFin} · Salón ${aula}</small>`;

    document.getElementById('modal-matricula-doc').style.display = 'flex';
}

/** Cierra el modal de confirmación (docente) */
function cerrarModalDocente() {
    document.getElementById('modal-matricula-doc').style.display = 'none';
    horarioSeleccionado = null;
}

/**
 * Confirma y registra la matrícula del estudiante (vista docente)
 * Llama a api/matricular.php con id_estudiante e id_horario
 */
function confirmarMatriculaDocente() {
    cerrarModalDocente();

    fetch('api/matricular.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id_estudiante: estudianteSeleccionado,
            id_horario: horarioSeleccionado
        })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            document.getElementById('modal-exito-doc-texto').textContent =
                `${datosEstudianteSeleccionado.nombre} ha sido matriculado en ${datosHorarioSeleccionado.asignatura} correctamente.`;
            document.getElementById('modal-exito-doc').style.display = 'flex';
            cargarMatriculasEstudiante(estudianteSeleccionado);
        } else {
            alert('Error: ' + (data.mensaje || 'No se pudo completar la matrícula.'));
        }
    })
    .catch(() => {
        alert('Error al conectar con el servidor.');
    });
}

/** Cierra el modal de éxito (docente) */
function cerrarModalExitoDocente() {
    document.getElementById('modal-exito-doc').style.display = 'none';
    document.getElementById('buscar-asignatura-docente').value = '';
    document.getElementById('resultados-asignaturas-docente').innerHTML = '';
    horarioSeleccionado = null;
}

/**
 * Carga las matrículas de un estudiante específico (vista docente)
 * @param {number} idEstudiante - ID del estudiante
 */
function cargarMatriculasEstudiante(idEstudiante) {
    const contenedor = document.getElementById('lista-matriculas-estudiante');

    contenedor.innerHTML = '<p style="color:#888; text-align:center; padding:1rem;"><i class="fas fa-spinner fa-spin"></i> Cargando...</p>';

    fetch(`api/mis_matriculas.php?id_estudiante=${idEstudiante}`)
        .then(res => res.json())
        .then(data => {
            if (!data.success || data.matriculas.length === 0) {
                contenedor.innerHTML = '<p style="color:#888; text-align:center; padding:1rem;"><i class="fas fa-info-circle"></i> Este estudiante no tiene asignaturas matriculadas.</p>';
                return;
            }

            let html = '<div class="table-container"><table class="data-table"><thead><tr><th>Asignatura</th><th>Código</th><th>Día</th><th>Horario</th><th>Salón</th></tr></thead><tbody>';

            data.matriculas.forEach(m => {
                html += `<tr>
                    <td>${m.nombre_asignatura}</td>
                    <td>${m.codigo_asignatura}</td>
                    <td>${m.dia_semana}</td>
                    <td>${m.hora_inicio} - ${m.hora_fin}</td>
                    <td>${m.aula}</td>
                </tr>`;
            });

            html += '</tbody></table></div>';
            contenedor.innerHTML = html;
        })
        .catch(() => {
            contenedor.innerHTML = '<p style="color:#dc3545; text-align:center; padding:1rem;"><i class="fas fa-exclamation-circle"></i> Error al cargar matrículas.</p>';
        });
}

/* ============================================================
   INICIALIZACIÓN
   ============================================================ */

// Al cargar la página de matrícula del estudiante, cargar sus matrículas actuales
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('lista-matriculas')) {
        cargarMisMatriculas();
    }
});
