class ModalClass extends HTMLElement {
  connectedCallback() {
    let inner = this.innerHTML;
    this.innerHTML = "";

    let position = this.getAttribute("position");
    let width = this.getAttribute("width");
    let height = this.getAttribute("height");

    const modal_container = document.createElement("div");
    modal_container.className = "modal-container";

    const modal = document.createElement("div");
    modal.className = "modal";
    modal.innerHTML = inner;

    if (!position) position = "center";

    switch (position) {
      case "left":
        break;
      case "top":
        break;
      case "bottom":
        break;
      default:
        break;
    }

    if (!width) width = "31.25em";
    modal.style.width = width;

    if (!height) height = "35em";
    modal.style.height = height;

    const layout = document.createElement("div");
    layout.className = `modal-layout`;
    layout.addEventListener("click", (e) => {
      e.preventDefault();
      this.classList.replace("on", "off");
      setTimeout(() => {
        this.classList.remove("off");
      }, 200);
    });

    modal_container.appendChild(modal);
    modal_container.appendChild(layout);

    this.appendChild(modal_container);
  }
}

export default ModalClass;
