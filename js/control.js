function cargarTabla() {
    // Limpiar la tabla de actividades
    var tablaActividades = document.getElementById('tabla-actividades');
    // Guardar la primera fila para no eliminarla
    var primeraFila = tablaActividades.rows[0];
    tablaActividades.innerHTML = ''; // Limpiar la tabla antes de cargar nuevas filas
    // Insertar la primera fila de nuevo
    tablaActividades.appendChild(primeraFila);

    // Obtener el historial de actividades del localStorage
    var historialActividades = JSON.parse(localStorage.getItem('historialActividades')) || [];

    // Llenar la tabla con los datos del historial de actividades
    // Llenar la tabla con los datos del historial de actividades
historialActividades.forEach(function (actividad, index) {
    var fila = tablaActividades.insertRow();
    fila.setAttribute('data-id', index); // Asignar el índice real como identificador único

    fila.insertCell().textContent = actividad.instituto;
    fila.insertCell().textContent = actividad.fecha;
    fila.insertCell().textContent = actividad.grado;
    var actividadCell = fila.insertCell();
    actividadCell.innerHTML = actividad.actividad.replace(/\n/g, "<br>"); // Reemplazar saltos de línea con etiquetas <br>
    fila.insertCell().textContent = actividad.herramienta;

    // Agregar botón "Editar" y "Eliminar" en la misma celda
    var accionesCell = fila.insertCell();
    var editarBtn = document.createElement('button');
    editarBtn.textContent = 'E';
    editarBtn.className = 'editar-btn'; // Asignar la clase CSS 'editar-btn' al botón de editar
    editarBtn.addEventListener('click', function () {
        var rowId = parseInt(fila.getAttribute('data-id')); // Obtener el identificador único de la fila
        editarActividad(rowId);
    });
    accionesCell.appendChild(editarBtn);

    var eliminarBtn = document.createElement('button');
    eliminarBtn.textContent = 'X';
    eliminarBtn.className = 'eliminar-btn'; // Asignar la clase CSS 'eliminar-btn' al botón de eliminar
    eliminarBtn.addEventListener('click', function () {
        var rowId = parseInt(fila.getAttribute('data-id')); // Obtener el identificador único de la fila
        eliminarActividad(rowId);
    });
    accionesCell.appendChild(eliminarBtn);
});
}
// Función para editar una actividad por su identificador único
function editarActividad(rowId) {
    // Obtener el historial de actividades del localStorage
    var historialActividades = JSON.parse(localStorage.getItem('historialActividades')) || [];

    // Obtener la actividad correspondiente al identificador único
    var actividad = historialActividades[rowId];

    if (actividad) {
        // Llenar el formulario de entrada con los datos de la actividad
        document.getElementById('institucion').value = actividad.instituto;
        document.getElementById('grado').value = actividad.grado;
        document.getElementById('fecha').value = actividad.fecha;
        document.getElementById('actividad').value = actividad.actividad;
        document.getElementById('herramienta').value = actividad.herramienta;
    } else {
        console.log("Actividad no encontrada");
    }
}

// Función para eliminar una actividad por su identificador único
function eliminarActividad(rowId) {
    // Obtener el historial de actividades del localStorage
    var historialActividades = JSON.parse(localStorage.getItem('historialActividades')) || [];

    // Eliminar la actividad del historial utilizando el identificador único
    historialActividades.splice(rowId, 1);

    // Actualizar el historial en el localStorage
    localStorage.setItem('historialActividades', JSON.stringify(historialActividades));

    // Volver a cargar y mostrar la tabla
    cargarTabla();
}

// Llamar a la función para cargar y mostrar la tabla cuando la página se cargue
document.addEventListener("DOMContentLoaded", function () {
    cargarTabla(); // Cargar y mostrar la tabla al cargar la página
});

// Agregar el evento de click al botón "Guardar"
document.getElementById('guardar').addEventListener('click', function () {
    var instituto = document.getElementById('institucion').value;
    var grado = document.getElementById('grado').value;
    var fecha = document.getElementById('fecha').value;
    var actividad = document.getElementById('actividad').value;
    var herramienta = document.getElementById('herramienta').value;

    var partesFecha = fecha.split('-');
    var dia = partesFecha[2];
    var mes = partesFecha[1];
    var año = partesFecha[0];

    // Formatear la fecha en el formato dd-mm-aaaa
    var fechaFormateada = dia + '-' + mes + '-' + año;

    // Crear un objeto con los datos de la actividad
    var actividadData = {
        instituto: instituto,
        grado: grado,
        fecha: fechaFormateada,
        actividad: actividad,
        herramienta: herramienta
    };

    // Obtener el historial de actividades del localStorage
    var historialActividades = JSON.parse(localStorage.getItem('historialActividades')) || [];

    // Agregar la nueva actividad al historial
    historialActividades.push(actividadData);

    // Ordenar las actividades por fecha en orden inverso (de la más reciente a la más antigua)
    historialActividades.sort(function (a, b) {
        var fechaA = new Date(a.fecha);
        var fechaB = new Date(b.fecha);
        return fechaB - fechaA; // Cambio de fechaA - fechaB a fechaB - fechaA
    });

    // Guardar el historial actualizado en el localStorage
    localStorage.setItem('historialActividades', JSON.stringify(historialActividades));

    // Volver a cargar y mostrar la tabla
    cargarTabla();
});



// Función para vaciar el historial de actividades
function vaciarHistorial() {
    localStorage.removeItem('historialActividades'); // Eliminar el historial del localStorage
    refrescarPagina();
}





//fecha inicio//
var fechaActual = new Date();

// Formatear la fecha actual como YYYY-MM-DD (formato requerido para el input type="date")
var mes = fechaActual.getMonth() + 1; // Sumar 1 porque los meses comienzan desde 0
var dia = fechaActual.getDate();
if (mes < 10) {
    mes = '0' + mes; // Agregar un 0 al principio si el mes es menor que 10
}
if (dia < 10) {
    dia = '0' + dia; // Agregar un 0 al principio si el día es menor que 10
}
var fechaFormateada = fechaActual.getFullYear() + '-' + mes + '-' + dia;

// Establecer la fecha formateada como el valor del campo de entrada
document.getElementById("fecha").value = fechaFormateada;
//fecha fin// 


//fecha inicio//
var fechaActual = new Date();

// Formatear la fecha actual como YYYY-MM-DD (formato requerido para el input type="date")
var mes = fechaActual.getMonth() + 1; // Sumar 1 porque los meses comienzan desde 0
var dia = fechaActual.getDate();
if (mes < 10) {
    mes = '0' + mes; // Agregar un 0 al principio si el mes es menor que 10
}
if (dia < 10) {
    dia = '0' + dia; // Agregar un 0 al principio si el día es menor que 10
}
var fechaFormateada = fechaActual.getFullYear() + '-' + mes + '-' + dia;

// Establecer la fecha formateada como el valor del campo de entrada
document.getElementById("fecha").value = fechaFormateada;
//fecha fin//









// Función para agregar un nuevo grado al localStorage
function agregarGrado() {
    var nuevoGrado = document.getElementById("nuevoGrado").value;
    if (nuevoGrado) {
        var selectGrado = document.getElementById("grado");
        var option1 = document.createElement("option");
        option1.text = nuevoGrado;
        selectGrado.add(option1);


        var selectFiltroGrado = document.getElementById("filtro-grado");
        var option2 = document.createElement("option");
        option2.text = nuevoGrado;
        selectFiltroGrado.add(option2);

        // Guardar el nuevo grado en localStorage
        var gradosGuardados = JSON.parse(localStorage.getItem("grados")) || [];
        gradosGuardados.push(nuevoGrado);
        localStorage.setItem("grados", JSON.stringify(gradosGuardados));

        // Limpiar el campo de entrada después de agregar
        document.getElementById("nuevoGrado").value = "";
    } else {
        alert("Por favor ingrese un grado válido.");
    }
}

// Función para agregar una nueva institución al localStorage
function agregarInstitucion() {
    var nuevaInstitucion = document.getElementById("nuevaInstitucion").value;
    if (nuevaInstitucion) {
        var selectInstitucion = document.getElementById("institucion");
        var option1 = document.createElement("option");
        option1.text = nuevaInstitucion;
        selectInstitucion.add(option1);

        var selectFiltroColegio = document.getElementById("filtro-colegio");
        var option2 = document.createElement("option");
        option2.text = nuevaInstitucion;
        selectFiltroColegio.add(option2);

        // Guardar la nueva institución en localStorage
        var institucionesGuardadas = JSON.parse(localStorage.getItem("instituciones")) || [];
        institucionesGuardadas.push(nuevaInstitucion);
        localStorage.setItem("instituciones", JSON.stringify(institucionesGuardadas));

        // Limpiar el campo de entrada después de agregar
        document.getElementById("nuevaInstitucion").value = "";
    } else {
        alert("Por favor ingrese una institución válida.");
    }
}

// Función para cargar los grados e instituciones guardados en el localStorage al cargar la página
window.onload = function () {
    // Cargar grados
    var gradosGuardados = JSON.parse(localStorage.getItem("grados")) || [];
    var selectGrado1 = document.getElementById("grado");
    var selectGrado2 = document.getElementById("filtro-grado");
    for (var i = 0; i < gradosGuardados.length; i++) {
        var option1 = document.createElement("option");
        var option2 = document.createElement("option");
        option1.text = gradosGuardados[i];
        option2.text = gradosGuardados[i];
        selectGrado1.add(option1);
        selectGrado2.add(option2);
    }

    // Cargar instituciones
    var institucionesGuardadas = JSON.parse(localStorage.getItem("instituciones")) || [];
    var selectInstitucion1 = document.getElementById("institucion");
    var selectInstitucion2 = document.getElementById("filtro-colegio");
    for (var i = 0; i < institucionesGuardadas.length; i++) {
        var option1 = document.createElement("option");
        var option2 = document.createElement("option");
        option1.text = institucionesGuardadas[i];
        option2.text = institucionesGuardadas[i];
        selectInstitucion1.add(option1);
        selectInstitucion2.add(option2);
    }
};




function vaciarGrados() {
    localStorage.removeItem("grados");
    document.getElementById("grado").innerHTML = "";
    document.getElementById("filtro-grado").innerHTML = ""; // Vaciar el filtro de grado adicional
}

function vaciarInstituciones() {
    localStorage.removeItem("instituciones");
    document.getElementById("institucion").innerHTML = "";
    document.getElementById("filtro-colegio").innerHTML = ""; // Vaciar el filtro de institución adicional
}



function exportarAWord() {
    // Obtener la tabla actual después de aplicar los filtros
    var tablaOriginal = document.getElementById('tabla-actividades');
    var filasOriginal = tablaOriginal.querySelectorAll('tr');

    // Crear una nueva tabla para almacenar las filas filtradas
    var tablaFiltrada = document.createElement('table');
    tablaFiltrada.innerHTML = "<thead>" + filasOriginal[0].innerHTML + "</thead><tbody></tbody>";

    // Obtener las filas que cumplen con los filtros de fecha
    var filasFiltradas = tablaFiltrada.querySelector('tbody');
    for (var i = 1; i < filasOriginal.length; i++) {
        var fecha = filasOriginal[i].querySelector('td:nth-child(2)').textContent;
        // Convertir la fecha en un objeto Date para compararla con los filtros de fecha
        var fechaActividad = new Date(fecha);
        var fechaDesde = document.getElementById('filtro-fecha-desde').value;
        var fechaHasta = document.getElementById('filtro-fecha-hasta').value;
        if ((fechaDesde && fechaActividad < new Date(fechaDesde)) || (fechaHasta && fechaActividad > new Date(fechaHasta))) {
            // La fila no cumple con los filtros, no la agregamos a la tabla filtrada
            continue;
        }
        // La fila cumple con los filtros, la agregamos a la tabla filtrada
        tablaFiltrada.querySelector('tbody').appendChild(filasOriginal[i].cloneNode(true));
    }

    // Convertir la tabla filtrada a HTML
    var tablaFiltradaHtml = tablaFiltrada.outerHTML;

    // Crear el blob con la tabla filtrada
    var blob = new Blob(['<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Documento Word</title></head><body>' + tablaFiltradaHtml + '</body></html>'], {
        type: 'application/msword'
    });

    // Crear un enlace para descargar el archivo
    var link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "documento_word.doc";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Función para editar una actividad
function editarActividad(index) {
    // Obtener el historial de actividades del localStorage
    var historialActividades = JSON.parse(localStorage.getItem('historialActividades')) || [];

    // Obtener la actividad correspondiente al índice
    var actividad = historialActividades[index];

    // Llenar el formulario de entrada con los datos de la actividad
    document.getElementById('institucion').value = actividad.instituto;
    document.getElementById('grado').value = actividad.grado;
    document.getElementById('fecha').value = actividad.fecha;
    document.getElementById('actividad').value = actividad.actividad;
    document.getElementById('herramienta').value = actividad.herramienta;

    // Eliminar la actividad del historial utilizando el índice
    historialActividades.splice(index, 1);

    // Actualizar el historial en el localStorage
    localStorage.setItem('historialActividades', JSON.stringify(historialActividades));

    // Volver a cargar y mostrar la tabla
    cargarTabla();
}
// Función para eliminar una actividad
function eliminarActividad(index) {
    // Obtener el historial de actividades del localStorage
    var historialActividades = JSON.parse(localStorage.getItem('historialActividades')) || [];

    // Eliminar la actividad del historial utilizando el índice
    historialActividades.splice(index, 1);

    // Actualizar el historial en el localStorage
    localStorage.setItem('historialActividades', JSON.stringify(historialActividades));

    // Volver a cargar y mostrar la tabla
    cargarTabla();
}






































// Obtener elementos del DOM
var modal = document.getElementById("myModal");
var btn = document.getElementById("openModalBtn");
var span = document.getElementsByClassName("close")[0];

// Abrir modal cuando se haga clic en el botón
btn.onclick = function () {
    modal.style.display = "block";
}

// Cerrar modal cuando se haga clic en la "x"
span.onclick = function () {
    modal.style.display = "none";
}

// Cerrar modal cuando se haga clic fuera de él
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function refrescarPagina() {
    location.reload();
}





// Función para mostrar todas las actividades
function verTodos() {
    document.getElementById("filtro-colegio").value = "";
    document.getElementById("filtro-grado").value = "";
    document.getElementById("filtro-fecha-desde").value = "";
    document.getElementById("filtro-fecha-hasta").value = "";
    cargarTabla(); // Cargar y mostrar todas las actividades
}

// Función para filtrar las actividades
function filtrar() {
    var filtroInstituto = document.getElementById("filtro-colegio").value;
    var filtroGrado = document.getElementById("filtro-grado").value;
    var fechaD = document.getElementById("filtro-fecha-desde").value;
    var fechaH = document.getElementById("filtro-fecha-hasta").value;

    var actividadesFiltradas = []; // Arreglo para almacenar las actividades filtradas

    // Obtener todas las actividades del localStorage
    var historialActividades = JSON.parse(localStorage.getItem('historialActividades')) || [];

    // Filtrar actividades según los criterios
    actividadesFiltradas = historialActividades.filter(function (actividad) {
        var cumpleFiltroInstituto = filtroInstituto === "" || actividad.instituto === filtroInstituto;
        var cumpleFiltroGrado = filtroGrado === "" || actividad.grado === filtroGrado;
        
        // Convertir fechas de formato dd-mm-aaaa a objetos de fecha para comparación
        var fechaActividad = new Date(actividad.fecha.split("-").reverse().join("-"));
        var fechaDesde = fechaD ? new Date(fechaD.split("-").reverse().join("-")) : null;
        var fechaHasta = fechaH ? new Date(fechaH.split("-").reverse().join("-")) : null;

        var cumpleFiltroFechaDesde = !fechaDesde || fechaActividad >= fechaDesde;
        var cumpleFiltroFechaHasta = !fechaHasta || fechaActividad <= fechaHasta;

        return cumpleFiltroInstituto && cumpleFiltroGrado && cumpleFiltroFechaDesde && cumpleFiltroFechaHasta;
    });

    // Mostrar las actividades filtradas en la tabla
    mostrarActividades(actividadesFiltradas);
}

function mostrarActividades(actividades) {
    var tabla = document.getElementById("tabla-actividades");
    var primeraFila = tabla.rows[0]; // Guardar la primera fila

    // Limpiar la tabla, excepto la primera fila
    while (tabla.rows.length > 1) {
        tabla.deleteRow(1);
    }

    actividades.forEach(function (actividad, index) {
        var fila = document.createElement("tr");
        fila.innerHTML = "<td>" + actividad.instituto + "</td>" +
            "<td>" + actividad.fecha + "</td>" +
            "<td>" + actividad.grado + "</td>" +
            "<td>" + actividad.actividad + "</td>" +
            "<td>" + actividad.herramienta + "</td>";
        tabla.appendChild(fila); // Insertar la fila al final de la tabla
    });

    // Insertar la primera fila de nuevo al principio
    tabla.insertBefore(primeraFila, tabla.firstChild);
}
