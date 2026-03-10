# 📚 DOCUMENTACIÓN DEL PROYECTO ASISTE-UNILIBRE

## 📋 Descripción General
Sistema de control de asistencia digital para la Universidad Libre que permite gestionar la asistencia de docentes y estudiantes de manera digital y organizada.

---

## 🗂️ ESTRUCTURA DE ARCHIVOS

### 📄 PÁGINAS PRINCIPALES

#### **index.html**
- **Función:** Página de inicio del sistema
- **Contenido:** 
  - Presentación del sistema ASISTE-UNILIBRE
  - Funcionalidades principales (6 tarjetas)
  - Tipos de usuarios (Administrador, Docente, Estudiante)
  - Botones de acceso directo a cada dashboard
  - Footer con información de contacto

#### **login.html**
- **Función:** Página de inicio de sesión
- **Contenido:**
  - Formulario de login con usuario, contraseña y tipo de usuario
  - Redirección automática según el rol seleccionado
  - Enlace a página de registro
  - JavaScript para redirigir a: administrador.html, docente.html o estudiante.html

#### **registro.html**
- **Función:** Página de registro de nuevos usuarios
- **Contenido:**
  - Formulario con datos personales
  - Selección de tipo de usuario (Docente o Estudiante)
  - Validación de contraseñas

#### **ubicanos.html**
- **Función:** Muestra la ubicación física de la universidad
- **Contenido:**
  - Mapa de Google Maps integrado
  - Dirección completa
  - Información de cómo llegar

---

### 👨‍💼 PÁGINAS DEL ADMINISTRADOR

#### **administrador.html**
- **Función:** Dashboard principal del administrador
- **Contenido:**
  - 6 tarjetas con funciones principales
  - Estadísticas del sistema (estudiantes, docentes, asignaturas)
  - Enlaces a: gestión de usuarios, periodos, reportes, configuración

#### **admin-usuarios.html**
- **Función:** Gestionar usuarios del sistema
- **Contenido:**
  - Tabla con lista de usuarios
  - Botón para crear nuevo usuario
  - Filtros por rol (Administrador, Docente, Estudiante)
  - Opciones de editar y eliminar usuarios
  - Paginación

#### **admin-periodos.html**
- **Función:** Administrar periodos académicos
- **Contenido:**
  - Tarjetas de periodos (activo y finalizados)
  - Información de cada periodo (fechas, asignaturas, estudiantes)
  - Tabla de asignaturas del periodo actual
  - Botón para crear nuevo periodo

#### **admin-reportes.html**
- **Función:** Generar reportes generales del sistema
- **Contenido:**
  - Estadísticas globales (asistencia, estudiantes, docentes)
  - 6 tipos de reportes disponibles
  - Lista de reportes generados recientemente
  - Botones para descargar reportes en PDF

---

### 👨‍🏫 PÁGINAS DEL DOCENTE

#### **docente.html**
- **Función:** Dashboard principal del docente
- **Contenido:**
  - 6 tarjetas con funciones principales
  - Clases del día con botón para tomar asistencia
  - Enlaces a: registro, historial, reportes, horarios

#### **docente-registro.html**
- **Función:** Registrar asistencia de una clase
- **Contenido:**
  - Información de la clase (asignatura, fecha, hora, salón)
  - Tabla con lista de estudiantes
  - Opciones: Presente, Ausente, Tardanza
  - Campo de observaciones por estudiante
  - Botones para guardar o cancelar

#### **docente-historial.html**
- **Función:** Ver historial de clases registradas
- **Contenido:**
  - Filtros por asignatura y fecha
  - Tarjetas de clases con estadísticas
  - Información: presentes, ausentes, tardanzas
  - Botones para ver detalles y editar

#### **docente-reportes.html**
- **Función:** Generar reportes de asignaturas
- **Contenido:**
  - Formulario para configurar reporte
  - Filtros: tipo, asignatura, periodo, fechas
  - Lista de reportes recientes
  - Botón para descargar PDF

---

### 👨‍🎓 PÁGINAS DEL ESTUDIANTE

#### **estudiante.html**
- **Función:** Dashboard principal del estudiante
- **Contenido:**
  - 6 tarjetas con opciones disponibles
  - Resumen de asistencias (porcentaje, faltas, alertas)
  - Próximas clases del día
  - Enlaces a: asistencias, historial, horario, notificaciones

#### **estudiante-asistencias.html**
- **Función:** Ver registro de asistencias personales
- **Contenido:**
  - Filtros por asignatura y periodo
  - Tabla con historial de asistencias
  - Estados: Presente, Ausente, Tardanza
  - Resumen: total clases, asistencias, faltas, tardanzas

#### **estudiante-historial.html**
- **Función:** Ver historial académico completo
- **Contenido:**
  - Asignaturas del periodo actual
  - Porcentaje de asistencia por materia
  - Barra de progreso visual
  - Información del docente
  - Selector de periodos anteriores

#### **estudiante-notificaciones.html**
- **Función:** Ver notificaciones personales
- **Contenido:**
  - Lista de notificaciones (clases, asistencias, alertas)
  - Tipos: Info, Éxito, Advertencia
  - Fecha de cada notificación

---

### 🔄 PÁGINAS COMPARTIDAS

#### **perfil.html**
- **Función:** Ver y editar perfil de usuario
- **Contenido:**
  - Avatar del usuario
  - Información personal (nombre, email, teléfono, dirección)
  - Formulario para cambiar contraseña
  - Botón para guardar cambios

#### **notificaciones.html**
- **Función:** Centro de notificaciones del sistema
- **Contenido:**
  - Lista completa de notificaciones
  - Filtros: Todas, No leídas, Leídas
  - Botón para marcar todas como leídas
  - Tipos: Info, Éxito, Advertencia, Peligro

#### **funcionalidades.html**
- **Función:** Página informativa de funcionalidades
- **Contenido:**
  - 6 funcionalidades principales del sistema
  - 3 características técnicas
  - Información detallada de cada función

#### **usuarios.html**
- **Función:** Página informativa de tipos de usuarios
- **Contenido:**
  - 3 tarjetas de roles (Administrador, Docente, Estudiante)
  - Funciones detalladas de cada rol
  - Beneficios por tipo de usuario

---

## 🎨 ARCHIVOS DE ESTILOS

#### **styles.css**
- **Función:** Hoja de estilos principal del sistema
- **Contenido:**
  - Variables CSS para colores institucionales
  - Estilos para navbar y navegación
  - Estilos para dashboards y tarjetas
  - Estilos para tablas y formularios
  - Estilos para notificaciones
  - Estilos para botones y badges
  - Diseño responsive para móviles
  - Más de 1000 líneas de código CSS organizado

**Secciones principales del CSS:**
1. Reset y configuración global
2. Variables de color
3. Barra de navegación
4. Sección Hero
5. Funcionalidades
6. Tipos de usuarios
7. Login y registro
8. Dashboards
9. Estadísticas
10. Tablas de datos
11. Notificaciones
12. Formularios
13. Perfil de usuario
14. Botón de volver
15. Diseño responsive

---

## 🔗 FLUJO DE NAVEGACIÓN

### Flujo Principal:
```
index.html → login.html → [Según rol seleccionado]
                          ├─→ administrador.html
                          ├─→ docente.html
                          └─→ estudiante.html
```

### Navegación del Administrador:
```
administrador.html
├─→ admin-usuarios.html (Gestionar usuarios)
├─→ admin-periodos.html (Periodos académicos)
├─→ admin-reportes.html (Reportes generales)
├─→ perfil.html (Mi perfil)
└─→ notificaciones.html (Notificaciones)
```

### Navegación del Docente:
```
docente.html
├─→ docente-registro.html (Registrar asistencia)
├─→ docente-historial.html (Historial de clases)
├─→ docente-reportes.html (Mis reportes)
├─→ perfil.html (Mi perfil)
└─→ notificaciones.html (Notificaciones)
```

### Navegación del Estudiante:
```
estudiante.html
├─→ estudiante-asistencias.html (Mis asistencias)
├─→ estudiante-historial.html (Historial académico)
├─→ estudiante-notificaciones.html (Mis notificaciones)
└─→ perfil.html (Mi perfil)
```

---

## 🎯 CARACTERÍSTICAS TÉCNICAS

### Clean Code:
- ✅ Código comentado y documentado
- ✅ Nombres de variables descriptivos
- ✅ Estructura organizada por secciones
- ✅ Separación de responsabilidades
- ✅ Uso de variables CSS reutilizables
- ✅ Código DRY (Don't Repeat Yourself)

### Responsive Design:
- ✅ Diseño adaptable a móviles y tablets
- ✅ Media queries para diferentes tamaños
- ✅ Grid y Flexbox para layouts flexibles
- ✅ Botones y formularios optimizados para touch

### Accesibilidad:
- ✅ Etiquetas semánticas HTML5
- ✅ Labels en formularios
- ✅ Contraste de colores adecuado
- ✅ Navegación por teclado

---

## 👥 ROLES Y PERMISOS

### Administrador:
- ✅ Acceso total al sistema
- ✅ Gestionar usuarios
- ✅ Administrar periodos académicos
- ✅ Ver reportes generales
- ✅ Configurar sistema

### Docente:
- ✅ Registrar asistencia de sus clases
- ✅ Ver historial de sus clases
- ✅ Generar reportes de sus asignaturas
- ✅ Ver lista de estudiantes
- ❌ No puede gestionar usuarios
- ❌ No puede ver reportes de otros docentes

### Estudiante:
- ✅ Ver sus asistencias personales
- ✅ Ver historial académico
- ✅ Recibir notificaciones
- ✅ Ver horario de clases
- ❌ No puede registrar asistencia de otros
- ❌ No puede ver datos de otros estudiantes

---

## 📊 ESTADÍSTICAS DEL PROYECTO

- **Total de archivos HTML:** 14 páginas
- **Total de líneas CSS:** ~1500 líneas
- **Páginas por rol:**
  - Administrador: 3 páginas específicas
  - Docente: 3 páginas específicas
  - Estudiante: 3 páginas específicas
  - Compartidas: 5 páginas
- **Componentes principales:**
  - Dashboards: 3
  - Formularios: 5
  - Tablas: 4
  - Sistemas de notificaciones: 2

---

## 🚀 CÓMO USAR EL SISTEMA

1. **Abrir el proyecto:**
   - Abre `index.html` en tu navegador

2. **Iniciar sesión:**
   - Ve a la página de login
   - Selecciona tu tipo de usuario
   - Ingresa credenciales (cualquier usuario/contraseña para demo)

3. **Navegar:**
   - Usa el menú superior para navegar entre secciones
   - Usa el botón "← Volver" para regresar
   - Haz clic en las tarjetas para acceder a funciones

4. **Acceso directo:**
   - Desde index.html, haz clic en "Acceso Directo" de cada rol
   - O abre directamente: estudiante.html, docente.html, administrador.html

---

## 👨‍💻 INTEGRANTES DEL PROYECTO

- Kevin
- Miguel
- Andrés

---

## 📅 INFORMACIÓN DEL PROYECTO

- **Nombre:** ASISTE-UNILIBRE
- **Institución:** Universidad Libre Seccional Cúcuta
- **Ubicación:** Avenida 4ta No. 12N-81, Urbanización El Bosque, Cúcuta, Colombia
- **Año:** 2024
- **Tipo:** Sistema de Control de Asistencia Digital

---

## 📝 NOTAS ADICIONALES

- El sistema es una demostración (frontend only)
- No tiene backend ni base de datos real
- Los datos mostrados son ejemplos
- Las funciones de guardar/editar son simuladas
- Ideal para presentaciones y prototipos

---

**Última actualización:** Marzo 2026
