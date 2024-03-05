// Función para cargar y mostrar la tabla de actividades
function cargarTabla() {
    // Limpiar la tabla de actividades
    var tablaActividades = document.getElementById('tabla-actividades');
    tablaActividades.innerHTML = ""; // Limpiar el contenido de la tabla

    // Obtener el historial de actividades del localStorage
    var historialActividades = JSON.parse(localStorage.getItem('historialActividades')) || [];

    // Si hay actividades en el historial, llenar la tabla
    if (historialActividades.length > 0) {
        // Agregar la fila de títulos a la tabla
        var titleRow = tablaActividades.insertRow();
        titleRow.insertCell().textContent = "Inst";
        titleRow.insertCell().textContent = "Fecha";
        titleRow.insertCell().textContent = "Grado";
        titleRow.insertCell().textContent = "Actividad";
        titleRow.insertCell().textContent = "Herram";


 
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
editarBtn.addEventListener('click', function() {
    editarActividad(index); // Llamar a la función para editar la actividad correspondiente al índice
});
accionesCell.appendChild(editarBtn);

var eliminarBtn = document.createElement('button');
eliminarBtn.textContent = 'X';
eliminarBtn.className = 'eliminar-btn'; // Asignar la clase CSS 'eliminar-btn' al botón de eliminar
eliminarBtn.addEventListener('click', function() {
    eliminarActividad(index); // Llamar a la función para eliminar la actividad correspondiente al índice
});
accionesCell.appendChild(eliminarBtn);
   
});



    }
}

// Llamar a la función para cargar y mostrar la tabla cuando la página se cargue
document.addEventListener("DOMContentLoaded", function() {
    cargarTabla(); // Cargar y mostrar la tabla al cargar la página
});

// Agregar el evento de click al botón "Guardar"
document.getElementById('guardar').addEventListener('click', function () {
    var instituto = document.getElementById('institucion').value;
    var grado = document.getElementById('grado').value;
    var fecha = document.getElementById('fecha').value;
    var actividad = document.getElementById('actividad').value;
    var herramienta = document.getElementById('herramienta').value;

    // Aquí puedes agregar la lógica para guardar las imágenes si es necesario

    // Crear un objeto con los datos de la actividad
    var actividadData = {
        instituto: instituto,
        grado: grado,
        fecha: fecha,
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
if(mes < 10) {
    mes = '0' + mes; // Agregar un 0 al principio si el mes es menor que 10
}
if(dia < 10) {
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
if(mes < 10) {
    mes = '0' + mes; // Agregar un 0 al principio si el mes es menor que 10
}
if(dia < 10) {
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
    window.onload = function() {
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
btn.onclick = function() {
  modal.style.display = "block";
}

// Cerrar modal cuando se haga clic en la "x"
span.onclick = function() {
  modal.style.display = "none";
}

// Cerrar modal cuando se haga clic fuera de él
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function refrescarPagina() {
    location.reload();
}
