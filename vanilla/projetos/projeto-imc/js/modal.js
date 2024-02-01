export const Modal = {
  wrapper: document.querySelector(".modal-wrapper"),
  imcResultMessage: document.querySelector(".modal h2"),
  closeButton: document.querySelector(".modal .close"),

  open() {
    Modal.wrapper.classList.add("open");
  },

  close() {
    Modal.wrapper.classList.remove("open");
  },
};

Modal.closeButton.onclick = () => Modal.close();

window.addEventListener("keydown", (event) => {
  if (event.keyCode === 27) {
    Modal.close();
  }
});
