var regexNombreBD = /^[a-zA-Z0-9_]+$/;
var mensajeNombre = document.getElementsByClassName("errorNombre")[0];
var xmarkErrorNombre = document.getElementsByClassName("xmarkErrorNombre")[0];
var checkMarkNombre = document.getElementsByClassName("checkMarkNombre")[0];

var formularioBD = document.getElementById("formularioBD");
var nombreBD = document.getElementById("nombreBD");

nombreBD.addEventListener("blur", () => {
    if (!regexNombreBD.test(nombreBD.value)) {
        mensajeNombre.classList.remove("ocultar");
        nombreBD.classList.add("errorInput");
        nombreBD.classList.remove("correctoInput");
        xmarkErrorNombre.classList.remove("ocultar");
        checkMarkNombre.classList.add("ocultar");
    } else {
        mensajeNombre.classList.add("ocultar");
        nombreBD.classList.remove("errorInput");
        nombreBD.classList.add("correctoInput");
        xmarkErrorNombre.classList.add("ocultar");
        checkMarkNombre.classList.remove("ocultar");
    }
});

formularioBD.addEventListener("submit", function (e) {
    e.preventDefault();
    var nombreBDVal = nombreBD.value;
    var enviarDatos = 0;

    if (!regexNombreBD.test(nombreBDVal)) {
        mensajeNombre.classList.remove("ocultar");
        nombreBD.classList.add("errorInput");
        xmarkErrorNombre.classList.remove("ocultar");
        checkMarkNombre.classList.add("ocultar");
    } else {
        mensajeNombre.classList.add("ocultar");
        nombreBD.classList.remove("errorInput");
        nombreBD.classList.add("correctoInput");
        xmarkErrorNombre.classList.add("ocultar");
        checkMarkNombre.classList.remove("ocultar");
        enviarDatos++;
    }

    if (enviarDatos === 1) {
        formularioBD.submit();
    }
});
function recibirDatos(e) {
    e.preventDefault();
    var nombre = document.getElementById("nombre").value;
    if (!regexNombre.test(nombre)) {
        mensajeNombre.classList.remove("ocultar");
        var nombre = document.getElementById("nombre").classList.add("errorInput");
        xmarkErrorNombre.classList.remove("ocultar");
        checkMarkNombre.classList.add("ocultar");
    } else {
        mensajeNombre.classList.add("ocultar");
        var nombre = document.getElementById("nombre").classList.add("correctoInput");
        xmarkErrorNombre.classList.add("ocultar");
        checkMarkNombre.classList.remove("ocultar");
        enviarDatos++;
    }
    
    if (enviarDatos == 1) {
        formulario.submit();
    } else {
        enviarDatos = 0;
    }
}