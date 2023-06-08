interface IHead {
  key: string;
  name: string;
}

interface IData {
  id: string;
  [index: string]: string;
}

class BoardListClass extends HTMLElement {
  private initFlag = false;

  private datas: IData[] = [];
  private heads: IHead[] = [];

  private ratio: string[] = [];
  private align: string[] = [];
  private checkbox = "visible";

  private curPage = 1;
  private per = 2;

  checkedPost: IData[] = [];
  selectedPost = 1;

  /// event
  private onPostClick = "function () {return true}";

  connectedCallback() {
    this.store();
    this.render();

    this.initFlag = true;
  }

  static get observedAttributes() {
    return ["data", "cur_page", "selected_post"];
  }

  attributeChangedCallback(name: string) {
    if (!this.initFlag) return;

    this.innerHTML = "";
    if (name === "data") {
      this.store();
      this.render();
    } else if (name === "cur_page") {
      this.curPage = Number(this.getAttribute("cur_page"));
      this.render();
    }
  }

  store() {
    this.innerHTML = "";

    if (this.getAttribute("data")) this.datas = JSON.parse(this.getAttribute("data")!);

    if (this.getAttribute("head")) this.heads = JSON.parse(this.getAttribute("head")!);

    if (this.datas.length !== 0 && this.heads.length === 0) {
      let keys = Object.keys(this.datas[0]);
      this.heads = keys.map((key) => {
        return { key, name: key };
      });
    }

    if (this.getAttribute("ratio")) this.ratio = JSON.parse(this.getAttribute("ratio")!);

    if (this.ratio.length === 0) {
      this.ratio = Array.from({ length: this.heads.length }, () => `${100 / this.heads.length}%`);
    } else if (this.ratio.length < this.heads.length) {
      const sum = this.ratio.reduce((a, b) => a + Number(b), 0);
      const length = this.heads.length - this.ratio.length;
      this.ratio = Array.from({ length: length }, () => `${(100 - sum) / length}%`);
    }

    if (this.getAttribute("align")) this.align = JSON.parse(this.getAttribute("align")!);

    if (this.align.length === 0) {
      this.align = Array.from({ length: this.heads.length }, () => "center");
    } else if (this.align.length < this.heads.length) {
      for (let i = 0; i < this.heads.length - this.align.length; i++) {
        this.align.push("center");
      }
    }

    if (this.getAttribute("checkbox")) this.checkbox = this.getAttribute("checkbox")!;
    if (this.getAttribute("per")) this.per = Number(this.getAttribute("per"));
    if (this.getAttribute("cur_page")) this.curPage = Number(this.getAttribute("cur_page"));
    if (this.getAttribute("selected_post")) this.selectedPost = Number(this.getAttribute("selected_post"));

    if (this.getAttribute("on_post_click")) this.onPostClick = this.checkArrowFunc(this.getAttribute("on_post_click")!);
  }

  render() {
    const board = document.createElement("ul");
    board.className = "kg-board";
    this.appendChild(board);

    if (this.heads.length === 0 && this.datas.length === 0) {
      const boardHead = document.createElement("li");
      boardHead.className = "kg-board-head";

      const board_list = document.createElement("li");
      board_list.className = "kg-board-list empty";
      board_list.textContent = "게시된 글이 존재하지 않습니다.";

      board.appendChild(boardHead);
      board.appendChild(board_list);

      this.appendChild(board);
      return;
    }

    this.createBoardHead();
    for (let i = this.curPage * this.per - this.per; i < this.curPage * this.per; i++) {
      if (!this.datas[i]) break;
      this.createBoardList(this.datas[i]);
    }

    this.createPagination();
  }

  createBoardHead() {
    const boardHead = document.createElement("li");
    boardHead.className = "kg-board-head";

    /// 값이 존재하지 않을 경우
    if (this.checkbox === "visible") {
      const checkboxHead = document.createElement("div");
      checkboxHead.className = "kg-board-select";
      checkboxHead.textContent = "선택";
      checkboxHead.style.width = "10%";

      boardHead.appendChild(checkboxHead);
    }

    this.heads.forEach((head, i) => {
      const headRow = document.createElement("div");
      headRow.className = `kg-board-head-${head.key}`;
      headRow.textContent = head.name;
      headRow.style.width = this.ratio[i];

      boardHead.appendChild(headRow);
    });

    this.querySelector(".kg-board")?.appendChild(boardHead);
  }

  createBoardList(data: IData) {
    const boardList = document.createElement("li");
    boardList.className = "kg-board-list";
    boardList.id = data.id;

    if (this.checkbox === "visible") {
      const checkboxContainer = document.createElement("div");
      checkboxContainer.className = "kg-board-select";
      checkboxContainer.style.width = "10%";
      checkboxContainer.style.textAlign = "center";
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.id = `${data.id}-checkbox`;

      const label = document.createElement("label");
      label.htmlFor = `${data.id}-checkbox`;

      //// event
      checkbox.addEventListener("change", (e) => {
        if ((e.target as HTMLInputElement).checked) {
          this.checkedPost.push(data);
        } else {
          if (this.checkedPost.length !== 0) {
            const index = this.checkedPost.findIndex(() => true);
            if (index) this.checkedPost.slice(index, 1);
          }
        }
      });

      checkboxContainer.appendChild(checkbox);
      boardList.appendChild(checkboxContainer);
    }

    this.heads.forEach((head, j) => {
      if (head.key === "title") {
        const wrapper = document.createElement("div");
        wrapper.className = `kg-board-list-${head.key}-wrapper kg-board-list-el`;
        wrapper.style.width = this.ratio[j];
        wrapper.style.textAlign = "left";

        const title = document.createElement("div");
        title.textContent = data[head.key] ? data[head.key] : "";
        title.style.fontSize = "1.17em";
        title.style.fontWeight = "500";

        const user = document.createElement("div");
        user.textContent = data.writer ? data.writer : "무소속 | 익명";

        /// event
        wrapper.addEventListener("click", (e) => {
          e.preventDefault();

          this.querySelector(".on")?.classList.remove("on");
          this.querySelector(`#${data.id}`)?.classList.add("on");

          new Function("e", "post", "return " + this.onPostClick + "(e, post)")(e, data);
        });

        wrapper.appendChild(title);
        wrapper.appendChild(user);
        boardList.appendChild(wrapper);
      } else if (head.key === "files") {
        ///download event
      } else {
        const el = document.createElement("div");
        el.className = `kg-board-list-${head.key}`;
        el.textContent = data[head.key] ? data[head.key] : "";
        el.style.width = this.ratio[j];
        el.style.textAlign = this.align[j];

        boardList.appendChild(el);
      }
    });

    this.querySelector(".kg-board")?.appendChild(boardList);
  }

  createPagination() {
    const totalPage = Math.ceil(this.datas.length / this.per);
    const curStart = 5 * Math.floor(this.curPage / 5) + 1;
    const curEnd = 5 * Math.ceil(this.curPage / 5);

    const pagination = document.createElement("div");
    pagination.className = "kg-board-pagination";

    const arrowBck = document.createElement("div");
    arrowBck.className = "kg-board-pagination-arrow-bck kg-icon";
    const arrowBckIcon = document.createElement("img");
    arrowBckIcon.src = "./public/icon/arrow_back_icon.svg";
    arrowBckIcon.style.width = "100%";
    arrowBck.appendChild(arrowBckIcon);

    if (this.curPage > 5) {
      arrowBck.classList.add("on");
      arrowBck.addEventListener("click", (e) => {
        e.preventDefault();
        this.setAttribute("cur_page", `${Math.floor((this.curPage + 5) / 5)}`);
      });
    }

    const arrowNxt = document.createElement("div");
    arrowNxt.className = "kg-board-pagination-arrow-nxt kg-icon";
    const arrowNxtIcon = document.createElement("img");
    arrowNxtIcon.src = "./public/icon/arrow_forward_icon.svg";
    arrowNxtIcon.style.width = "100%";
    arrowNxt.appendChild(arrowNxtIcon);

    if (curEnd < totalPage) {
      arrowNxt.classList.add("on");
      arrowNxt.addEventListener("click", () => {
        this.setAttribute("cur_page", `${Math.floor((this.curPage + 5) / 5)}`);
      });
    }

    const pages = document.createElement("div");
    pages.className = "kg-board-pagination-pages";

    if (this.heads.length === 0 && this.datas.length === 0) {
      const page = document.createElement("div");
      page.textContent = "1";
      pages.appendChild(page);
    } else {
      for (let i = curStart; i <= curEnd; i++) {
        if (i > totalPage) break;
        const page = document.createElement("div");
        page.textContent = `${i}`;
        if (i === this.curPage) {
          page.style.fontWeight = "700";
        }

        page.addEventListener("click", (e) => {
          e.preventDefault();
          this.setAttribute("cur_page", `${i}`);
        });

        pages.appendChild(page);
      }
    }

    pagination.appendChild(arrowBck);
    pagination.appendChild(pages);
    pagination.appendChild(arrowNxt);

    this.querySelector(".kg-board")?.appendChild(pagination);
  }

  checkArrowFunc = (func: string) => {
    if (func.includes("=>")) func = `"function "${func}`.replace("=>", " ");
    return func;
  };
}

export default BoardListClass;
