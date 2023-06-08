class ButtonClass extends HTMLElement {
  private initFlag = false;

  id = "";
  private type = "button";
  private name = "제출";

  private variant = "basic";
  private width = "100%";
  private color = "#000";

  private onClick = "function () {return true}";

  connectedCallback() {
    this.storeData();
    this.render();
    this.initFlag = true;
  }

  static get observedAttributes() {
    return ["name"];
  }

  attributeChangedCallback() {
    if (!this.initFlag) return;
    this.storeData();
    this.render();
  }

  storeData() {
    if (this.getAttribute("id")) this.id = this.getAttribute("id")!;
    if (this.getAttribute("type")) this.type = this.getAttribute("type")!;
    this.name = this.innerText ? this.innerText : this.name;

    if (this.getAttribute("variant")) this.variant = this.getAttribute("variant")!;
    if (this.getAttribute("width")) this.width = this.getAttribute("width")!;
    if (this.getAttribute("color")) this.color = this.getAttribute("color")!;

    if (this.getAttribute("on_click")) this.onClick = this.checkArrowFunc(this.getAttribute("on_click")!);
  }

  render() {
    this.innerText = "";

    const button = document.createElement("button");
    if (this.id !== "") button.id = this.id;
    if (this.type) button.type = this.type;
    if (this.width) button.style.width = this.width;
    button.innerText = this.name;

    switch (this.variant) {
      case "basic":
        button.className = "kg-btn basic-btn";
        break;
      case "middle":
        button.className = "kg-btn middle-btn";
        break;
      case "login":
        button.className = "kg-btn login-btn";
        break;
      default:
        break;
    }

    switch (this.color) {
      case "#000":
        if (this.variant === "login") {
          button.classList.add("blk");
          break;
        }
        button.style.color = this.color;
        button.style.backgroundColor = "#fff";
        button.style.borderColor = this.color;

        break;
      default:
        if (this.variant === "login") {
          button.classList.add("wht");
          break;
        }
        button.style.color = "#fff";
        button.style.backgroundColor = this.color;
        button.style.borderColor = this.color;
        break;
    }

    /// event
    button.addEventListener("click", (e) => {
      e.preventDefault();
      new Function("e", "return " + this.onClick + "(e)")(e);
    });

    this.appendChild(button);
  }

  // utils
  checkArrowFunc(func: string) {
    if (func.includes("=>")) func = `"function "${func}`.replace("=>", " ");
    return func;
  }
}

export default ButtonClass;
