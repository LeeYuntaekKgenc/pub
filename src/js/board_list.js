class BoardListClass extends HTMLElement {
  datas = [];
  heads = [];

  cur_page = 1;
  checked_el = [];
  selected_el;

  ratio = [];
  align = [];

  per = 5;

  board;
  pagination;

  connectedCallback() {
    this.innerHTML = "";

    this.store();
    this.layout();
    this.appendChild(this.board);
    this.appendChild(this.pagination);
  }

  static get observedAttributes() {
    return ["data", "curPage"];
  }

  attributeChangedCallback(name, old, w) {
    //바뀌면 실행
    if (this.board) {
      this.innerHTML = "";

      this.store();
      this.layout();
      this.appendChild(this.board);
      this.appendChild(this.pagination);
    }
  }

  store() {
    this.datas = this.getAttribute("data")
      ? JSON.parse(this.getAttribute("data"))
      : [];
    this.heads = this.getAttribute("head")
      ? JSON.parse(this.getAttribute("head"))
      : [];

    this.ratio = this.getAttribute("ratio")
      ? JSON.parse(this.getAttribute("ratio"))
      : [];
    this.align = this.getAttribute("align")
      ? JSON.parse(this.getAttribute("align"))
      : [];

    if (!this.heads || this.heads.length === 0) {
      let temp = Object.keys(this.datas[0]);

      this.heads = temp.map((v) => {
        return { key: v, name: v };
      });
    }

    if (this.ratio.length === 0 || this.ratio.length !== this.heads.length) {
      this.ratio = Array.from(
        { length: this.heads.length },
        () => `${100 / this.heads.length}%`
      );
    }

    if (this.align.length === 0) {
      this.align = Array.from({ length: this.heads.length }, () => "center");
    } else if (this.align.length < this.heads.length) {
      for (let i = 0; i < this.heads.length - this.align.length; i++) {
        this.align.push("center");
      }
    }

    if (this.getAttribute("per")) {
      this.per = Number(this.getAttribute("per"));
    }
    /// 현재 페이지 번호
    this.cur_page = Number(this.getAttribute("curPage"));
    if (!this.cur_page) {
      this.cur_page = 1;
    }
  }

  layout() {
    this.board = document.createElement("ul");
    this.board.className = "board";

    const board_head = document.createElement("li");
    board_head.className = "board-head";

    this.pagination = document.createElement("div");
    this.pagination.className = "board-pagination";

    const arrow_bck = document.createElement("div");
    arrow_bck.className = "board-pagination-arrow-bck";
    const arrow_bck_icon = document.createElement("img");
    arrow_bck_icon.src = "./src/public/icon/arrow_back_icon.svg";
    arrow_bck_icon.style.width = "100%";
    arrow_bck.appendChild(arrow_bck_icon);

    const arrow_nxt = document.createElement("div");
    arrow_nxt.className = "board-pagination-arrow-nxt";
    const arrow_nxt_icon = document.createElement("img");
    arrow_nxt_icon.src = "./src/public/icon/arrow_forward_icon.svg";
    arrow_nxt_icon.style.width = "100%";
    arrow_nxt.appendChild(arrow_nxt_icon);

    const pages = document.createElement("div");
    pages.className = "board-pagination-pages";

    const page = document.createElement("div");

    /// 값이 존재하지 않을 경우
    if (
      (!this.heads && !this.datas) ||
      (this.heads.length === 0 && this.datas.length === 0)
    ) {
      const board_list = document.createElement("li");
      board_list.className = "board-list empty";
      board_list.textContent = "게시된 글이 존재하지 않습니다.";
      this.board.appendChild(board_list);
      page.textContent = "1";
      pages.appendChild(page);

      this.pagination.appendChild(arrow_bck);
      this.pagination.appendChild(pages);
      this.pagination.appendChild(arrow_nxt);

      this.board.appendChild(board_head);

      return;
    }

    /// 행의 크기

    this.heads.forEach((head, i) => {
      if (head.key === "checkbox") {
        const checkbox_head = document.createElement("div");
        checkbox_head.className = "board-select";
        checkbox_head.textContent = "선택";
        checkbox_head.style.width = this.ratio[i];

        board_head.appendChild(checkbox_head);
      } else {
        const el = document.createElement("div");
        el.className = `board-head-${head.key}`;
        el.textContent = head.name;
        el.style.width = this.ratio[i];

        board_head.appendChild(el);
      }
    });

    this.board.appendChild(board_head);

    this.binding();

    const total_page = Math.ceil(this.datas.length / this.per);
    const cur_start = 1 + 5 * Math.floor(this.cur_page / 5);
    const cur_end = 5 * (Math.floor(this.cur_page / 5) + 1);

    for (let i = cur_start; i <= cur_end; i++) {
      if (i > total_page) break;
      const page = document.createElement("div");
      page.textContent = `${i}`;
      if (i === this.cur_page) {
        page.style.fontWeight = "700";
      }

      page.addEventListener("click", (e) => {
        e.preventDefault();
        this.setAttribute("curPage", i);
      });
      pages.appendChild(page);
    }

    this.pagination.appendChild(arrow_bck);
    this.pagination.appendChild(pages);
    this.pagination.appendChild(arrow_nxt);
  }

  binding() {
    for (
      let i = this.cur_page * this.per - this.per;
      i < this.cur_page * this.per;
      i++
    ) {
      if (!this.datas[i]) break;
      const board_list = document.createElement("li");
      board_list.className = "board-list";

      this.heads.forEach((head, j) => {
        if (head.key === "checkbox") {
          const checkbox_container = document.createElement("div");
          checkbox_container.className = "board-select";
          checkbox_container.style.width = this.ratio[j];
          checkbox_container.style.textAlign = this.align[j];
          const checkbox = document.createElement("input");
          checkbox.type = "checkbox";

          //// checkobox event
          checkbox.addEventListener("change", (e) => {
            e.stopPropagation();
            let temp_checked = [...this.checked_el];
            if (e.target.checked) {
              temp_checked.push(this.datas[i].key);
            } else {
              const index = temp_checked.findIndex(
                (v) => v === this.datas[i].key
              );
              temp_checked.splice(index, 1);
            }
            this.checked_el = temp_checked;
            this.setAttribute("checkedEl", this.checked_el);
          });

          checkbox_container.appendChild(checkbox);
          board_list.appendChild(checkbox_container);
        } else if (head.key === "title") {
          const wrapper = document.createElement("div");
          wrapper.className = `board-list-${head.key}-wrapper board-list-el`;
          wrapper.style.width = this.ratio[j];
          wrapper.style.textAlign = "left";

          const title = document.createElement("div");
          title.textContent = this.datas[i][head.key]
            ? this.datas[i][head.key]
            : "";
          title.style.fontSize = "1.17em";
          title.style.fontWeight = "500";

          const user = document.createElement("div");

          user.textContent = `${
            this.datas[i]["dept"] ? this.datas[i]["dept"] : "무소속"
          } | ${this.datas[i]["author"] ? this.datas[i]["author"] : "익명"}`;

          wrapper.appendChild(title);
          wrapper.appendChild(user);
          board_list.appendChild(wrapper);
        } else if (head.key === "download") {
          ///download event
        } else {
          const el = document.createElement("div");
          el.className = `board-list-${head.key}`;
          el.textContent = this.datas[i][head.key]
            ? this.datas[i][head.key]
            : "";
          el.style.width = this.ratio[j];
          el.style.textAlign = this.align[j];

          board_list.appendChild(el);
        }
      });

      ///event
      console.log("test");
      board_list.addEventListener("click", (e) => {
        e.preventDefault();
        this.selected_el = this.datas[i].key;
        this.setAttribute("selectedEl", this.selected_el);
      });

      this.board.appendChild(board_list);
    }
  }
}

export default BoardListClass;
