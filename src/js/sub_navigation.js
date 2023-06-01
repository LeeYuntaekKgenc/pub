class SubNavClass extends HTMLElement {
  connectedCallback() {
    let datas = this.getAttribute("data");
    if (typeof datas === "string") {
      datas = JSON.parse(datas);
    }

    datas;
  }

  static get observedAttributes() {
    return ["name"];
    // name 이라는 attribute 바뀌는지 감지
  }

  attributeChangedCallback() {
    //바뀌면 실행
    console.log("바귄다");
  }
}

export default SubNavClass;
