// 사용될 수 있는 속성값 (setAttribute 메서드로 할당)
// data : 게시물에 대한 정보를 담은 데이터 (JSON)

interface IData {
  id: number;
  title: string;
  writer: string;
  content: string;

  modified: string;
  created: string;

  files?: number;
  hidden?: boolean;
}

class BoardDetailClass extends HTMLElement {
  private initFlag = false;
  private datas: IData = {
    title: "",
    writer: "",
    content: "",
    id: -1,
    modified: `${new Date()}`,
    created: `${new Date()}`,
    hidden: true,
  };

  connectedCallback() {
    this.store();

    if (!this.datas) {
      const wrapper = document.createElement("div");
      wrapper.className = "kg-board-detail-wrapper";
      this.appendChild(wrapper);
      return;
    }
    this.render();

    this.initFlag = true;
  }

  static get observedAttributes() {
    return ["data"];
  }

  attributeChangedCallback() {
    if (!this.initFlag) return;
    this.innerHTML = "";
    this.store();
    this.render();
  }

  store() {
    if (this.getAttribute("data"))
      this.datas = JSON.parse(this.getAttribute("data")!);
  }

  render() {
    /// heading 이 될 제목과 작성자를 묶은 div를 생성
    const wrapper = document.createElement("div");
    wrapper.className = "kg-board-detail-wrapper";

    /// 글제목
    const title = document.createElement("h1");
    title.className = "kg-board-detail-title";
    title.textContent = this.datas.title;

    /// 작성자
    const author = document.createElement("div");
    author.className = "kg-board-detail-author";
    author.textContent = this.datas.writer;

    ///글내용
    const content = document.createElement("div");
    content.className = "kg-board-detail-content";
    content.textContent = this.datas.content;

    wrapper.appendChild(title);
    wrapper.appendChild(author);
    wrapper.appendChild(content);

    this.appendChild(wrapper);
  }
}

export default BoardDetailClass;
