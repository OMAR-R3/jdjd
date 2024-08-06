
var regexNombreColumna =  /^[A-Za-zÁÉÍÓÚÑáéíóúñ'0-9]+(?:[ ][A-Za-zÁÉÍÓÚÑáéíóúñ'0-9]+)*$/;

function validarDatoColumna(input) {
    var mensajeNombreColumna = input.parentElement.querySelector(".errorNombre");
    var xmarkErrorNombreColumna = input.parentElement.querySelector(".xmarkErrorNombreColumna");
    var checkMarkNombreColumna = input.parentElement.querySelector(".checkMarkNombreColumna");

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

var formularioInsertar = document.getElementById("formularioBD");

if (formularioInsertar) {
    formularioInsertar.addEventListener("submit", function (e) {
        if (!validarFormulario(formularioInsertar)) {
            e.preventDefault();
        }
    });

    document.querySelectorAll("input[name^='columns']").forEach(function (input) {
        agregarValidacionDatoColumna(input);
    });
}

var formularioModificar = document.querySelector("form[action='/modificarFila']");

if (formularioModificar) {
    formularioModificar.addEventListener("submit", function (e) {
        if (!validarFormulario(formularioModificar)) {
            e.preventDefault();
        }
    });

    document.querySelectorAll("form[action='/modificarFila'] input[name^='columns']").forEach(function (input) {
        agregarValidacionDatoColumna(input);
    });
}

document.getElementById('returnButton').addEventListener('click', function(event) {
    event.preventDefault(); 
    document.getElementById('returnForm').submit(); 
  });