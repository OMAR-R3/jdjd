var i = 0;

function addColumn() {
  i++;
  const columnsDiv = document.getElementById('columns');
  const newColumnDiv = document.createElement('div');
  newColumnDiv.className = 'column';
  newColumnDiv.innerHTML = `
      <div>
          <label>Nombre de la Columna:</label>
          <span class="ocultar errorNombreColumna">Nombre no válido</span>
          <i class="ocultar xmarkErrorNombreColumna fa-regular fa-circle-xmark"></i>
          <i class="ocultar checkMarkNombreColumna fa-regular fa-circle-check"></i>
          <input type="text" name="columns[${i}][name]" id="columns[${i}][name]" placeholder="Ingresa nombre de la columna" required>
      </div>
      <div>
          <label>Tipo de Dato:</label>
          <select name="columns[${i}][type]" required>
              <option value="INT">INT</option>
              <option value="VARCHAR(255)">VARCHAR(255)</option>
              <option value="FLOAT">FLOAT</option>
          </select>
      </div>
      <div>
          <label>Primaria:</label>
          <input type="checkbox" name="columns[${i}][isPrimary]">
      </div>
      <button type="button" class="remove-button" onclick="removeColumn(this)">Eliminar Columna</button>
  `;
  columnsDiv.appendChild(newColumnDiv);

  agregarValidacionNombreColumna(newColumnDiv.querySelector("input"));
}

function removeColumn(button) {
  const columnDiv = button.parentNode;
  columnDiv.parentNode.removeChild(columnDiv);
}

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

document.querySelectorAll("[id^='columns'][id$='[name]']").forEach(function (input) {
  agregarValidacionNombreColumna(input);
});