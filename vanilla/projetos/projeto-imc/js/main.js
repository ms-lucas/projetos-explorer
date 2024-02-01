import { Modal } from "./modal.js";
import { AlertError } from "./alert-error.js";
import { validateInputValues, calculateIMC } from "./utils.js";

const form = document.querySelector("form");
const inputWeight = document.querySelector("#weight");
const inputHeight = document.querySelector("#height");

form.onsubmit = (event) => {
  event.preventDefault();

  const weight = Number(inputWeight.value);
  const height = Number(inputHeight.value);

  inputWeight.value = "";
  inputHeight.value = "";

  const isValid = validateInputValues([weight, height]);

  if (!isValid) {
    AlertError.showError("Dados inválidos.");
    return;
  }

  const result = calculateIMC(weight, height);

  Modal.imcResultMessage.innerText = `Seu IMC é de ${result}`;

  Modal.open();
};
