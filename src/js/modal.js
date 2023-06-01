class ModalClass extends HTMLElement {
  connectedCallback() {
    let toggle = this.getAttribute("toggle");
    let position = this.getAttribute("position");
    let width = this.getAttribute("width");
    let height = this.getAttribute("height");

    let inner = this.innerHTML;
    this.innerHTML = "";

    const modal = document.createElement("div");
    modal.className = `modal ${toggle}`;

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

    if (width) {
      modal.style.minWidth = width;
    }

    if (height) {
      modal.style.minHeight = height;
    }

    // modal.appendChild(inner);

    const layout = document.createElement("div");
    layout.className = `layout ${toggle}`;
    layout.addEventListener("click", (e) => {
      e.preventDefault();
      this.toggle = "off";
      console.log(this.toggle);
    });

    console.log(this.parentNode.classList.replace("on", ""));
    // document.appendChild(layout);

    this.appendChild(modal);
  }
}

export default ModalClass;
