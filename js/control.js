function cargarTabla() {
    // Limpiar la tabla de actividades
    var tablaActividades = document.getElementById('tabla-actividades');

    // Obtener el historial de actividades del localStorage
    var historialActividades = JSON.parse(localStorage.getItem('historialActividades')) || [];

    // Llenar la tabla con los datos del historial de actividades
    historialActividades.forEach(function (actividad, index) {
        var fila = tablaActividades.insertRow();
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
            editarActividad(index); // Llamar a la función para editar la actividad correspondiente al índice
        });
        accionesCell.appendChild(editarBtn);

        var eliminarBtn = document.createElement('button');
        eliminarBtn.textContent = 'X';
        eliminarBtn.className = 'eliminar-btn'; // Asignar la clase CSS 'eliminar-btn' al botón de eliminar
        eliminarBtn.addEventListener('click', function () {
            eliminarActividad(index); // Llamar a la función para eliminar la actividad correspondiente al índice
        });
        accionesCell.appendChild(eliminarBtn);
    });
}

// Llamamos a la función cargarTabla para llenar la tabla al cargar la página
cargarTabla();


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

    // Aquí puedes agregar la lógica para guardar las imágenes si es necesario

    // Crear un objeto con los datos de la actividad
    var actividadData = {
        instituto: instituto,
        grado: grado,
        fecha: fechaFormateada,
        actividad: actividad,
        herramienta: herramienta,

        // Puedes agregar aquí las imágenes si es necesario
    };

    // Obtener el historial de actividades del localStorage
    var historialActividades = JSON.parse(localStorage.getItem('historialActividades')) || [];

    // Agregar la nueva actividad al historial
    historialActividades.push(actividadData);

    // Guardar el historial actualizado en el localStorage
    localStorage.setItem('historialActividades', JSON.stringify(historialActividades));

    // Volver a cargar y mostrar la tabla
    cargarTabla();
});



// Función para vaciar el historial de actividades
function vaciarHistorial() {
    localStorage.removeItem('historialActividades'); // Eliminar el historial del localStorage
    cargarTabla(); // Volver a cargar y mostrar la tabla (que ahora estará vacía)
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
    var tablaHtml = document.getElementById('tabla-actividades').outerHTML;
    var blob = new Blob(['<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Documento Word</title></head><body>' + tablaHtml + '</body></html>'], {
        type: 'application/msword'
    });
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



// Función para ordenar las actividades
function ordenar() {
    var tablaActividades = document.getElementById("tabla-actividades");
    var tbody = tablaActividades.querySelector("tbody");
    var rows = Array.from(tbody.querySelectorAll("tr"));

    // Ordenar las filas de la tabla
    rows.sort(function (a, b) {
        var fechaA = new Date(a.cells[1].textContent);
        var fechaB = new Date(b.cells[1].textContent);
        return fechaA - fechaB;
    });

    // Eliminar las filas de la tabla
    rows.forEach(function (row) {
        tbody.removeChild(row);
    });

    // Agregar las filas ordenadas de nuevo a la tabla
    rows.forEach(function (row) {
        tbody.appendChild(row);
    });
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
    var filtroFechaDesde = document.getElementById("filtro-fecha-desde").value;
    var filtroFechaHasta = document.getElementById("filtro-fecha-hasta").value;

    var actividadesFiltradas = []; // Arreglo para almacenar las actividades filtradas

    // Obtener todas las actividades del localStorage
    var historialActividades = JSON.parse(localStorage.getItem('historialActividades')) || [];

    // Filtrar actividades según los criterios
    actividadesFiltradas = historialActividades.filter(function (actividad) {
        var cumpleFiltroInstituto = filtroInstituto === "" || actividad.instituto === filtroInstituto;
        var cumpleFiltroGrado = filtroGrado === "" || actividad.grado === filtroGrado;
        var cumpleFiltroFechaDesde = filtroFechaDesde === "" || actividad.fecha >= filtroFechaDesde;
        var cumpleFiltroFechaHasta = filtroFechaHasta === "" || actividad.fecha <= filtroFechaHasta;

        return cumpleFiltroInstituto && cumpleFiltroGrado && cumpleFiltroFechaDesde && cumpleFiltroFechaHasta;
    });

    // Mostrar las actividades filtradas en la tabla
    mostrarActividades(actividadesFiltradas);
}

// Función para mostrar actividades en la tabla
function mostrarActividades(actividades) {
    var tabla = document.getElementById("tabla-actividades");
    var tbody = tabla.querySelector("tbody");
    tbody.innerHTML = ""; // Limpiar el contenido existente de la tabla

    actividades.forEach(function (actividad) {
        var fila = document.createElement("tr");
        fila.innerHTML = "<td>" + actividad.instituto + "</td>" +
            "<td>" + actividad.fecha + "</td>" +
            "<td>" + actividad.grado + "</td>" +
            "<td>" + actividad.actividad + "</td>" +
            "<td>" + actividad.herramienta + "</td>";
        tbody.appendChild(fila);
    });
}
