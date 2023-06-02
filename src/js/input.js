class InputClass extends HTMLElement {
  connectedCallback() {
    let type = this.getAttribute("type");
    let id = this.getAttribute("id");

    let label = this.getAttribute("label");
    let placeholder = this.getAttribute("placeholder");

    let variant = this.getAttribute("variant");
    let width = this.getAttribute("width");
    let color = this.getAttribute("color");

    if (label) {
      const input_label = document.createElement("label");
      input_label.className = "input-label";
      input_label.textContent = label;
      this.appendChild(input_label);
    }

    const input = document.createElement("input");

    this.id = "";
    input.id = id ? id : "";
    input.placeholder = placeholder ? placeholder : "검색어를 입력하세요.";

    if (type) {
      input.type = type;
    }

    if (width) {
      input.style.width = width;
    }

    if (!color) {
      color = "transparent";
    }
    input.style.borderColor = color;

    if (!variant) {
      variant = "basic";
    }
    switch (variant) {
      case "basic":
        input.className = "kg-input basic-input";
        break;
      case "middle":
        input.className = "kg-input middle-input";
        break;
      default:
        break;
    }

    ///event

    let onChange = eval(this.getAttribute("onChange"));
    if (onChange) {
      input.addEventListener("change", onChange);
    }

    this.appendChild(input);
  }
}

export default InputClass;
