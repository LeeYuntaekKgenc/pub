// 사용될 수 있는 속성값 (setAttribute 메서드로 할당)
// center : id 할당시 kg-input 내부의 input tag에 id 할당 / 외부 참조 가능
// type : input에 대한 타입 설정 (기본값 text)
// default_value : input 내의 defaultValue 값 설정

class ModalClass extends HTMLElement {
  private position = "center";
  private width = "31.25em";
  private height = "35em";

  connectedCallback() {
    this.store();
    this.render();
  }

  store() {
    if (this.getAttribute("position"))
      this.position = this.getAttribute("position")!;
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
