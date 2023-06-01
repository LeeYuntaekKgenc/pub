class ButtonClass extends HTMLElement {
  connectedCallback() {
    /// ui 생성

    let id = this.getAttribute("id");
    let name = this.innerText;
    let variant = this.getAttribute("variant");
    let type = this.getAttribute("type");
    let width = this.getAttribute("width");
    let color = this.getAttribute("color");

    const button = document.createElement("button");

    button.id = id ? id : "";
    button.innerText = name;
    this.innerText = "";

    if (type) {
      button.type = type;
    }

    if (!width) {
      width = "6.357em";
    }

    if (!variant) {
      variant = "basic";
    }
    if (!color) {
      color = "#000";
    }

    button.style.width = width;

    switch (variant) {
      case "basic":
        button.className = "kg-btn basic-btn";
        break;
      case "middle":
        button.className = "kg-btn middle-btn";
        break;
      default:
        break;
    }

    switch (color) {
      case "#000":
        button.style.color = color;
        button.style.backgroundColor = "#fff";
        button.style.borderColor = color;
        break;
      default:
        button.style.color = "#fff";
        button.style.backgroundColor = color;
        button.style.borderColor = color;
        break;
    }

    /// event
    let onClick = this.getAttribute("onClick");
    if (onClick) {
      if (typeof onClick !== "function") {
        onClick = (e) => {
          e.preventDefault();
        };
      }
      button.addEventListener("click", onClick);
    }

    this.appendChild(button);
  }

  static get observedAttributes() {
    return ["name"];
  }

  attributeChangedCallback() {
    //바뀌면 실행
    console.log("바귄다");
  }
}

export default ButtonClass;
