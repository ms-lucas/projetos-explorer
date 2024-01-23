const screen1 = document.querySelector(".screen1");
const closeCookieImage = document.querySelector(".screen1 img");
const screen2 = document.querySelector(".screen2");
const fraseParagraph = document.querySelector(".screen2 p");
const openAnotherCookieButton = document.querySelector(".screen2 button");

const frases = [
  "A vida trará coisas boas se tiver paciência.",
  "Siga os bons e aprenda com eles.",
  "São os nossos amigos que nos ensinam as mais valiosas lições.",
  "Aquele que se importa com o sentimento dos outros, não é um tolo.",
  "A adversidade é um espelho que reflete o verdadeiro eu.",
  "Faça pequenas coisas hoje e coisas maiores lhe serão confiadas amanhã.",
  "A paciência na adversidade é sinal de um coração sensível.",
  "A sorte favorece a mente bem preparada.",
  "A sua visão se tornará mais clara apenas quando conseguir olhar para dentro do seu coração.",
  "A sorte favorece a mente bem preparada.",
  "Acredite em milagres, mas não dependa deles.",
];

closeCookieImage.addEventListener("click", () => {
  const randomIndex = Math.round(Math.random() * 10);

  fraseParagraph.innerHTML = frases[randomIndex];
 
  toggleScreen();
});

closeCookieImage.addEventListener("mouseover", () => {
  closeCookieImage.style.cursor = "pointer";
});

openAnotherCookieButton.addEventListener("click", () => {
  toggleScreen();
});

function toggleScreen() {
  screen1.classList.toggle("hide");
  screen2.classList.toggle("hide");
}
