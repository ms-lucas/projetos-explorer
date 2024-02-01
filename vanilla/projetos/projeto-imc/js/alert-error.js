export const AlertError = {
  element: document.querySelector(".alert-error"),

  open() {
    AlertError.element.classList.add("open");
  },

  close() {
    AlertError.element.classList.remove("open");
  },

  showError(message) {
    AlertError.element.innerText = message;
    AlertError.open();
    setTimeout(() => {
      AlertError.close();
    }, 1500);
  },
};
