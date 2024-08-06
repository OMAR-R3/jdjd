
var regexNombreTabla =  /^[A-Za-zÁÉÍÓÚÑáéíóúñ'0-9]+(?:[ ][A-Za-zÁÉÍÓÚÑáéíóúñ'0-9]+)*$/;

function validarNombreColumna(input) {
    var mensajeNombreColumna = input.parentElement.querySelector(".errorNombreColumna");
    var xmarkErrorNombreColumna = input.parentElement.querySelector(".xmarkErrorNombreColumna");
    var checkMarkNombreColumna = input.parentElement.querySelector(".checkMarkNombreColumna");

    if (!regexNombreTabla.test(input.value)) {
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

function agregarValidacionNombreColumna(input) {
    input.addEventListener("blur", function () {
        validarNombreColumna(input);
    });
}

var formularioTabla = document.getElementById("formularioTabla");
var nombreTabla = document.getElementById("ntabla");
var mensajeNombreTabla = document.getElementsByClassName("errorNombreTabla")[0];
var xmarkErrorNombreTabla = document.getElementsByClassName("xmarkErrorNombreTabla")[0];
var checkMarkNombreTabla = document.getElementsByClassName("checkMarkNombreTabla")[0];

if (nombreTabla) {
    nombreTabla.addEventListener("blur", () => {
        if (!regexNombreTabla.test(nombreTabla.value)) {
            mensajeNombreTabla.classList.remove("ocultar");
            nombreTabla.classList.add("errorInput");
            nombreTabla.classList.remove("correctoInput");
            xmarkErrorNombreTabla.classList.remove("ocultar");
            checkMarkNombreTabla.classList.add("ocultar");
        } else {
            mensajeNombreTabla.classList.add("ocultar");
            nombreTabla.classList.remove("errorInput");
            nombreTabla.classList.add("correctoInput");
            xmarkErrorNombreTabla.classList.add("ocultar");
            checkMarkNombreTabla.classList.remove("ocultar");
        }
    });
}

formularioTabla.addEventListener("submit", function (e) {
    e.preventDefault();
    var nombreTablaVal = nombreTabla ? nombreTabla.value : '';
    var enviarDatos = 1;

    if (nombreTabla && !regexNombreTabla.test(nombreTablaVal)) {
        mensajeNombreTabla.classList.remove("ocultar");
        nombreTabla.classList.add("errorInput");
        xmarkErrorNombreTabla.classList.remove("ocultar");
        checkMarkNombreTabla.classList.add("ocultar");
        enviarDatos = 0;
    } else {
        if (nombreTabla) {
            mensajeNombreTabla.classList.add("ocultar");
            nombreTabla.classList.remove("errorInput");
            nombreTabla.classList.add("correctoInput");
            xmarkErrorNombreTabla.classList.add("ocultar");
            checkMarkNombreTabla.classList.remove("ocultar");
        }
    }

    var columnas = document.querySelectorAll("input[name^='columns'][name$='[name]']");
    columnas.forEach(function (input) {
        validarNombreColumna(input);
        if (!regexNombreTabla.test(input.value)) {
            enviarDatos = 0;
        }
    });

    if (enviarDatos === 1) {
        formularioTabla.submit();
    }
});

document.querySelectorAll("input[name^='columns'][name$='[name]']").forEach(function (input) {
    agregarValidacionNombreColumna(input);
});