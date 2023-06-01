class SearchClass extends HTMLElement {
  connectedCallback() {}

  static get observedAttributes() {
    return ["name"];
    // name 이라는 attribute 바뀌는지 감지
  }

  attributeChangedCallback() {
    //바뀌면 실행
    console.log("바귄다");
    this.innerHTML = `<label>바뀐다!!!</label><input>`;
  }
}

export default SearchClass;
