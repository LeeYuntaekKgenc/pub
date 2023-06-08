class ModalClass extends HTMLElement {
  private position = "center";
  private width = "31.25em";
  private height = "35em";

  connectedCallback() {
    this.store();
    this.render();
  }

  store() {
    if (this.getAttribute("position")) this.position = this.getAttribute("position")!;
    if (this.getAttribute("width")) this.width = this.getAttribute("width")!;
    if (this.getAttribute("height")) this.height = this.getAttribute("height")!;
  }

  render() {
    let innerHTML = this.innerHTML;
    this.innerHTML = "";

    const modal_container = document.createElement("div");
    modal_container.className = "modal-container";

    const modal = document.createElement("div");
    modal.className = "modal";
    modal.innerHTML = innerHTML;
    modal.style.width = this.width;
    modal.style.height = this.height;

    switch (this.position) {
      case "left":
        break;
      case "top":
        break;
      case "bottom":
        break;
      default:
        break;
    }

    const layout = document.createElement("div");
    layout.className = `modal-layout`;
    layout.addEventListener("click", (e) => {
      e.preventDefault();
      this.classList.replace("on", "off");
      const rmClass = setTimeout(() => this.classList.remove("off"), 200);
      clearTimeout(rmClass);
    });

    modal_container.appendChild(modal);
    modal_container.appendChild(layout);

    this.appendChild(modal_container);
  }
}

export default ModalClass;
