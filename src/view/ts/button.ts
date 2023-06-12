// 사용될 수 있는 속성값 (setAttribute 메서드로 할당)
// id : id 할당시 kg-button 내부의 button tag에 id 할당 / 외부 참조 가능
// type : button에 대한 타입 설정 (기본값 button) ("button" | "submit" | "reset")
// name : button 내의 innerText 값 설정 (기본값 "제출") (string)
// variant : 클래스로 설정된 버튼의 종류 (기본값 "basic") ("basic" | "middle" | "login")
// width : 버튼의 너비 (기본값 : 100%) (string)
// color : 버튼의 색상 (기본값 : #000 == black) (string)
// on_click : 버튼 클릭시 발생 이벤트 설정 (function as string)

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

    if (this.getAttribute("variant"))
      this.variant = this.getAttribute("variant")!;
    if (this.getAttribute("width")) this.width = this.getAttribute("width")!;
    if (this.getAttribute("color")) this.color = this.getAttribute("color")!;

    if (this.getAttribute("on_click"))
      this.onClick = this.checkArrowFunc(this.getAttribute("on_click")!);
  }

  render() {
    this.innerText = "";

    const button = document.createElement("button");
    if (this.id !== "") {
      button.id = this.id;
      this.id = "";
    }
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
        button.className = "kg-btn basic-btn";
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
