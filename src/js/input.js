class InputClass extends HTMLElement {
  connectedCallback() {
    /// ui 생성
    let variant = this.getAttribute("variant");
    let width = this.getAttribute("width");
    let color = this.getAttribute("color");
    let placeholder = this.getAttribute("placeholder");

    let label = this.getAttribute("label");
    let type = this.getAttribute("type");

    if (label) {
      const input_label = document.createElement("label");
      input_label.className = "input-label";
      this.appendChild(input_label);
    }

    let id = this.getAttribute("id");

    this.innerText = "";

    const input = document.createElement("input");

    if (type) {
      input.type = type;
    }

    if (width) {
      input.style.width = width;
    }

    if (!variant) {
      variant = "basic";
    }
    if (!color) {
      color = "transparent";
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

    input.id = id ? id : "";
    input.style.borderColor = color;

    input.placeholder = placeholder ? placeholder : "검색어를 입력하세요.";

    ///event

    let onChange = this.getAttribute("onChange");
    if (onChange) {
      if (typeof onChange !== "function") {
        onChange = (e) => e.preventDefault();
      }
      input.addEventListener("change", onChange);
    }
    this.appendChild(input);
  }

  static get observedAttributes() {
    return ["name"];
  }

  attributeChangedCallback() {
    //바뀌면 실행
    console.log("바귄다");
  }
}

export default InputClass;
