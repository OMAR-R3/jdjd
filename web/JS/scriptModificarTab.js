
var regexNombreColumna =  /^[A-Za-zÁÉÍÓÚÑáéíóúñ'0-9]+(?:[ ][A-Za-zÁÉÍÓÚÑáéíóúñ'0-9]+)*$/;

function validarDatoColumna(input) {
    var mensajeNombreColumna = input.parentElement.querySelector(".errorNombre");
    var xmarkErrorNombreColumna = input.parentElement.querySelector(".xmarkErrorNombre");
    var checkMarkNombreColumna = input.parentElement.querySelector(".checkMarkNombre");

    if (!regexNombreColumna.test(input.value)) {
        mensajeNombreColumna.classList.remove("ocultar");
        input.classList.add("errorInput");
        input.classList.remove("correctoInput");
        xmarkErrorNombreColumna.classList.remove("ocultar");
        checkMarkNombreColumna.classList.add("ocultar");
    } else {
        mensajeNombreColumna.classList.add("ocultar");
        input.classList.remove("errorInput");
        input.classList.add("correctoInput");
        xmarkErrorNombreColumna.classList.add("ocultar");
        checkMarkNombreColumna.classList.remove("ocultar");
    }
}

function agregarValidacionDatoColumna(input) {
    input.addEventListener("blur", function () {
        validarDatoColumna(input);
    });
}

function validarFormulario(formulario) {
    var enviarDatos = true;
    var columnas = formulario.querySelectorAll("input[name^='columns']");

    columnas.forEach(function (input) {
        validarDatoColumna(input);
        if (!regexNombreColumna.test(input.value)) {
            enviarDatos = false;
        }
    });

    return enviarDatos;
}

var formularioModificar = document.querySelector("form[action='/modificarFila']");

if (formularioModificar) {
    formularioModificar.addEventListener("submit", function (e) {
        if (!validarFormulario(formularioModificar)) {
            e.preventDefault();
        }
    });

    formularioModificar.querySelectorAll("input[name^='columns']").forEach(function (input) {
        agregarValidacionDatoColumna(input);
    });
}