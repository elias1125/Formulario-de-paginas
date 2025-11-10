// VARIABLES GLOBALES

let datosPersonales = {};
let familiares = [];
let condiciones = [];
let internamientos = [];


// CAMBIO DE PÁGINAS

function mostrarPagina(n) {
    document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
    document.getElementById("page" + n).classList.add("active");
}


// VALIDAR CAMPOS OBLIGATORIOS EN UNA PÁGINA

function validarPagina(pageId) {
    let inputs = document.querySelectorAll(`#${pageId} input`);

    for (let input of inputs) {
        if (input.hasAttribute("required") && input.value.trim() === "") {
            alert("Todos los campos obligatorios deben ser completados.");
            input.focus();
            return false;
        }
    }
    return true;
}


// GUARDAR DATOS PERSONALES

function guardarDatosPersonales() {
    if (!validarPagina("page1")) return;

    datosPersonales = {
        nombre: document.getElementById("nombre").value,
        apellido: document.getElementById("apellido").value,
        edad: document.getElementById("edad").value
    };

    mostrarPagina(2);
}


// AGREGAR FAMILIAR

function agregarFamiliar() {
    let nombre = document.getElementById("fam_nombre").value;
    let parentesco = document.getElementById("fam_parentesco").value;
    let edad = document.getElementById("fam_edad").value;

    if (nombre === "" || parentesco === "" || edad === "") {
        alert("Todos los campos del familiar son obligatorios.");
        return;
    }

    familiares.push({ nombre, parentesco, edad });

    document.getElementById("listaFamiliares").innerHTML += `
        <p>${nombre} / ${parentesco} / ${edad}</p>
    `;

    document.getElementById("fam_nombre").value = "";
    document.getElementById("fam_parentesco").value = "";
    document.getElementById("fam_edad").value = "";
}

// SIGUIENTE DESDE FAMILIARES

function siguienteFamiliares() {
    if (familiares.length === 0) {
        alert("Debe registrar al menos un familiar.");
        return;
    }
    mostrarPagina(3);
}


// AGREGAR CONDICIÓN

function agregarCondicion() {
    let enfermedad = document.getElementById("cond_enfermedad").value;
    let tiempo = document.getElementById("cond_tiempo").value;

    if (enfermedad === "" || tiempo === "") {
        alert("Debe completar ambos campos.");
        return;
    }

    condiciones.push({ enfermedad, tiempo });

    document.getElementById("listaCondiciones").innerHTML += `
        <p>${enfermedad} — ${tiempo} años</p>
    `;

    document.getElementById("cond_enfermedad").value = "";
    document.getElementById("cond_tiempo").value = "";
}


// SIGUIENTE DESDE CONDICIONES

function siguienteCondiciones() {
    if (condiciones.length === 0) {
        alert("Debe agregar al menos una condición preexistente.");
        return;
    }
    mostrarPagina(4);
}


// AGREGAR INTERNAMIENTO

function agregarInternamiento() {
    let fecha = document.getElementById("int_fecha").value;
    let centro = document.getElementById("int_centro").value;
    let dx = document.getElementById("int_dx").value;

    if (fecha === "" || centro === "" || dx === "") {
        alert("Debe completar todos los campos.");
        return;
    }

    internamientos.push({ fecha, centro, dx });

    document.getElementById("listaInternamientos").innerHTML += `
        <p>${fecha} — ${centro} — ${dx}</p>
    `;

    document.getElementById("int_fecha").value = "";
    document.getElementById("int_centro").value = "";
    document.getElementById("int_dx").value = "";
}


// PASAR A PÁGINA FINAL

function finalizarFormulario() {
    // No obligamos a tener internamientos. Puede estar vacío.
    mostrarResumen();
    mostrarPagina(5);
}


// MOSTRAR DATOS EN LA PÁGINA FINAL

function mostrarResumen() {
    // DATOS PERSONALES
    document.getElementById("res_personales").innerHTML = `
        <p><strong>Nombre:</strong> ${datosPersonales.nombre}</p>
        <p><strong>Apellido:</strong> ${datosPersonales.apellido}</p>
        <p><strong>Edad:</strong> ${datosPersonales.edad}</p>
    `;

    // FAMILIARES
    let famHTML = familiares.map(f => `<li>${f.nombre} / ${f.parentesco} / ${f.edad}</li>`).join("");
    document.getElementById("res_familiares").innerHTML =
        famHTML || "<p>No se registraron familiares.</p>";

    // CONDICIONES
    let condHTML = condiciones
        .map(c => `<li>${c.enfermedad} — ${c.tiempo} años</li>`)
        .join("");
    document.getElementById("res_condiciones").innerHTML =
        condHTML || "<p>No se registraron condiciones.</p>";

    // INTERNAMIENTOS
    let intHTML = internamientos
        .map(i => `<li>${i.fecha} — ${i.centro} — ${i.dx}</li>`)
        .join("");
    document.getElementById("res_internamientos").innerHTML =
        intHTML || "<p>No se registraron internamientos.</p>";
}

// 
// REINICIAR TODO EL FORMULARIO
// 
function reiniciarFormulario() {
    datosPersonales = {};
    familiares = [];
    condiciones = [];
    internamientos = [];

    document.querySelectorAll("input").forEach(i => i.value = "");

    document.getElementById("listaFamiliares").innerHTML = "";
    document.getElementById("listaCondiciones").innerHTML = "";
    document.getElementById("listaInternamientos").innerHTML = "";

    mostrarPagina(1);
    alert("Formulario reiniciado.");
}
