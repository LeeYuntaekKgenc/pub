class BoardDetailClass extends HTMLElement {
  connectedCallback() {
    let datas = JSON.parse(this.getAttribute("data"));

    if (!datas) {
      const wrapper = document.createElement("div");
      wrapper.className = "board-detail-wrapper";
      this.appendChild(wrapper);
      return;
    }

    /// JSON 형식일 경우 parse
    if (typeof datas === "string") {
      datas = JSON.parse(datas);
    }

    /// heading 이 될 제목과 작성자를 묶은 div를 생성
    const wrapper = document.createElement("div");
    wrapper.className = "board-detail-wrapper";

    /// 글제목
    const title = document.createElement("h1");
    title.className = "board-detail-title";
    title.textContent = datas.title ? datas.title : "";

    /// 작성자
    const author = document.createElement("div");
    author.className = "board-detail-author";
    author.textContent = `${datas.dept} | ${datas.author}`;

    ///글내용
    const content = document.createElement("div");
    content.className = "board-detail-content";
    content.textContent = datas.content ? datas.content : "";

    wrapper.appendChild(title);
    wrapper.appendChild(author);
    wrapper.appendChild(content);

    this.appendChild(wrapper);
  }

  static get observedAttributes() {
    return ["data"];
    // name 이라는 attribute 바뀌는지 감지
  }

  attributeChangedCallback() {
    //바뀌면 실행
    console.log("값이 변경되었습니다.");
  }
}

export default BoardDetailClass;
