const screen1 = document.querySelector(".screen1");
const screen2 = document.querySelector(".screen2");
const textAttempts = document.querySelector(".screen2 h2");
const inputNumber = document.getElementById("inputNumber");
const guessButton = document.querySelector("#guessButton");
const playAgainButton = document.querySelector("#playAgainButton");

const randomNumber = Math.round(Math.random() * 10);

let attempts = 1;

guessButton.addEventListener("click", handleGuess);
playAgainButton.addEventListener("click", handlePlayAgain);

function toggleScreen() {
  screen1.classList.toggle("hide");
  screen2.classList.toggle("hide");
}

function handleGuess(event) {
  event.preventDefault();
  if (!inputNumber.value) {
    alert("Digite um palpite!");
    return;
  }

  if (Number(inputNumber.value) === randomNumber) {
    toggleScreen();
    textAttempts.innerText =
      attempts === 1
        ? `Acertou em ${attempts} tentativa.`
        : `Acertou em ${attempts} tentativas.`;
  } else {
    alert("Erro, tente novamente!");
  }

  inputNumber.value = "";
  attempts++;
}

function handlePlayAgain() {
  toggleScreen();

  attempts = 1;
}
