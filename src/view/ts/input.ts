// 사용될 수 있는 속성값 (setAttribute 메서드로 할당)
// id : id 할당시 kg-input 내부의 input tag에 id 할당 / 외부 참조 가능
// type : input에 대한 타입 설정 (기본값 text)
// default_value : input 내의 defaultValue 값 설정
// placeholder : input 내의 placeholder 값 설정
// label : input 앞에 붙을 수 라벨 설정 / 유효한 값 할당 시 생성
// icon : input 뒤에 search icon 생성 (기본값 : visible)
// on_click : input 클릭시 발생 이벤트 설정
// on_change : input 값 변경시 발생 이벤트 설정

class InputClass extends HTMLElement {
  private initFlag = false;

  id = "";
  private type = "text";
  private defaultValue = "";
  private placeholder = "내용을 입력하세요.";

  private label = "";
  private icon = "visible";

  private variant = "basic";

  private onChange: string = "";
  private onClick: string = "";

  connectedCallback() {
    this.store();
    this.render();
  }

  static get observedAttributes() {
    return ["btn", "label", "onClick", "onChange"];
  }

  attributeChangedCallback() {
    if (!this.initFlag) return;
    this.store();
    this.render();
  }

  store() {
    if (this.getAttribute("id")) this.id = this.getAttribute("id")!;
    if (this.getAttribute("type")) this.type = this.getAttribute("type")!;
    if (this.getAttribute("default_value"))
      this.defaultValue = this.getAttribute("default_value")!;

    if (this.getAttribute("icon")) this.icon = this.getAttribute("icon")!;
    if (this.getAttribute("label")) this.label = this.getAttribute("label")!;
    if (this.getAttribute("placeholder"))
      this.placeholder = this.getAttribute("placeholder")!;

    if (this.getAttribute("variant"))
      this.variant = this.getAttribute("variant")!;

    if (this.getAttribute("on_change"))
      this.onChange = this.checkArrowFunc(this.getAttribute("on_change")!);
    if (this.getAttribute("on_click"))
      this.onClick = this.checkArrowFunc(this.getAttribute("on_click")!);
  }

  render() {
    this.createInput();
    if (this.icon === "true") {
      this.createIcon();
    }
  }

  createInput() {
    if (this.label) {
      const inputLabel = document.createElement("label");
      inputLabel.className = "kg-input-label";
      inputLabel.textContent = this.label;
      this.appendChild(inputLabel);
    }
    const input = document.createElement("input");
    input.autocomplete = "off";
    input.placeholder = this.placeholder;

    if (this.id) {
      input.id = this.id;
      this.id = "";
    }

    if (this.type) {
      input.type = this.type;
    }

    if (this.defaultValue) {
      input.defaultValue = this.defaultValue;
    }

    switch (this.variant) {
      case "basic":
        input.className = "kg-input basic-input";
        break;
      case "middle":
        input.className = "kg-input middle-input";
        break;
      default:
        break;
    }

    if (this.icon === "visible") {
      input.style.paddingRight = "2em";
    }

    if (this.onChange !== "") {
      input.addEventListener("change", (e) => {
        e.preventDefault();
        new Function("e", "return " + this.onChange + "(e)")(e);
      });
    }

    this.appendChild(input);
  }

  createIcon() {
    const inputBtnWrapper = document.createElement("div");
    inputBtnWrapper.className = "kg-input-btn-wrapper kg-icon";
    const inputBtn = document.createElement("img");
    inputBtn.src = "@/view/public/icon/search_icon.svg";
    inputBtn.alt = "search";
    inputBtnWrapper.appendChild(inputBtn);

    if (this.onClick) {
      inputBtn.addEventListener("click", (e) => {
        e.preventDefault();
        new Function("e", "return " + this.onClick + "(e)")(e);
      });
    }

    this.appendChild(inputBtnWrapper);
  }

  // utils
  checkArrowFunc(func: string) {
    if (func.includes("=>")) func = `"function "${func}`.replace("=>", " ");
    return func;
  }
}

export default InputClass;
