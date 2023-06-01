class BoardListClass extends HTMLElement {
  checkedArray = [];
  init() {
    this.innerHTML = "";
  }
  connectedCallback() {
    this.init();

    /// value
    let datas = this.getAttribute("data");
    if (typeof datas === "string") {
      datas = JSON.parse(datas);
    }
    ///key
    let heads = this.getAttribute("head");
    if (typeof heads === "string") {
      heads = JSON.parse(heads);
    }

    /// 레이아웃 생성
    const board = document.createElement("ul");
    board.className = "board";

    const board_head = document.createElement("li");
    board_head.className = "board-head";

    const pagination = document.createElement("div");
    pagination.className = "board-pagination";

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
    if (!heads && !datas) {
      const board_list = document.createElement("li");
      board_list.className = "board-list";
      board.appendChild(board_list);

      page.textContent = "1";
      pages.appendChild(page);

      pagination.appendChild(arrow_bck);
      pagination.appendChild(pages);
      pagination.appendChild(arrow_nxt);

      board.appendChild(board_head);

      this.appendChild(board);
      this.appendChild(pagination);
      return;
    }

    if (!heads) {
      let temp = Object.keys(datas[0]);

      heads = temp.map((v) => {
        return { key: v, name: v };
      });
    }

    /// 행의 크기
    let ratio = this.getAttribute("ratio");
    if (typeof ratio === "string") {
      ratio = JSON.parse(ratio);
    }
    /// 정렬
    let align = this.getAttribute("align");
    if (typeof align === "string") {
      align = JSON.parse(align);
    }

    if (!ratio || ratio.length !== heads.length) {
      ratio = Array.from(
        { length: heads.length },
        () => `${100 / heads.length}%`
      );
    }

    if (!align) {
      align = Array.from({ length: heads.length }, () => "center");
    } else if (align.length < heads.length) {
      for (let i = 0; i < heads.length - align.length; i++) {
        align.push("center");
      }
    }

    /// 한페이지당 보여지는 게시물 수
    let per = this.getAttribute("per");
    if (!per) {
      per = 10;
    }
    /// 현재 페이지 번호
    let cur_page = this.getAttribute("curPage");
    if (!cur_page) {
      cur_page = 1;
    }

    heads.forEach((head, i) => {
      if (head.key === "checkbox") {
        const checkbox_head = document.createElement("div");
        checkbox_head.className = "board-select";
        checkbox_head.textContent = "선택";
        checkbox_head.style.width = ratio[i];

        board_head.appendChild(checkbox_head);
      } else {
        const el = document.createElement("div");
        el.className = `board-head-${head.key}`;
        el.textContent = head.name;
        el.style.width = ratio[i];

        board_head.appendChild(el);
      }
    });

    board.appendChild(board_head);

    /// 게시판의 값 렌더링
    for (let i = cur_page * per - per; i < cur_page * per; i++) {
      if (!datas[i]) break;
      const board_list = document.createElement("li");
      board_list.className = "board-list";

      heads.forEach((head, j) => {
        if (head.key === "checkbox") {
          const checkbox_container = document.createElement("div");
          checkbox_container.className = "board-select";
          checkbox_container.style.width = ratio[j];
          checkbox_container.style.textAlign = align[j];
          const checkbox = document.createElement("input");
          checkbox.type = "checkbox";

          //// event
          let onCheckBoxChange = this.getAttribute("onCheckBoxChange");

          if (onCheckBoxChange) {
            if (typeof onCheckBoxChange !== "function") {
              onCheckBoxChange = () => e.preventDefault();
            }
            checkbox.addEventListener("change", (e) => {
              onCheckBoxChange(e, datas[i]);
            });
          }

          checkbox_container.appendChild(checkbox);
          board_list.appendChild(checkbox_container);
        } else if (head.key === "title") {
          const wrapper = document.createElement("div");
          wrapper.className = `board-list-${head.key}-wrapper board-list-el`;
          wrapper.style.width = ratio[j];
          wrapper.style.textAlign = "left";

          const title = document.createElement("div");
          title.textContent = datas[i][head.key] ? datas[i][head.key] : "";
          title.style.fontSize = "1.17em";
          title.style.fontWeight = 500;

          const user = document.createElement("div");

          user.textContent = `${
            datas[i]["dept"] ? datas[i]["dept"] : "무소속"
          } | ${datas[i]["author"] ? datas[i]["author"] : "익명"}`;

          wrapper.appendChild(title);
          wrapper.appendChild(user);
          board_list.appendChild(wrapper);
        } else if (head.key === "download") {
          ///event
          let onDownloadClick = this.getAttribute("onDownloadClick");
          if (onDownloadClick) {
            if (typeof onDownloadClick !== "function") {
              onDownloadClick = () => e.preventDefault();
            }
            board_list.addEventListener("click", (e) => {
              onDownloadClick(e, datas[i]);
            });
          }
        } else {
          const el = document.createElement("div");
          el.className = `board-list-${head.key}`;
          el.textContent = datas[i][head.key] ? datas[i][head.key] : "";
          el.style.width = ratio[j];
          el.style.textAlign = align[j];

          board_list.appendChild(el);
        }
      });

      ///event
      let onPostClick = this.getAttribute("onPostClick");

      if (onPostClick) {
        if (typeof onPostClick !== "function") {
          onPostClick = () => e.preventDefault();
        }
        board_list.addEventListener("click", (e) => {
          onPostClick(e, datas[i]);
        });
      }

      board.appendChild(board_list);
    }

    const total_page = Math.ceil(datas.length / per);
    const cur_start = 1 + 5 * Math.floor(cur_page / 5);
    const cur_end = 5 * (Math.floor(cur_page / 5) + 1);

    for (let i = cur_start; i <= cur_end; i++) {
      if (i > total_page) break;
      const page = document.createElement("div");
      page.textContent = i;
      if (i === cur_page) {
        page.style.fontWeight = 700;
      }
      pages.appendChild(page);
    }

    pagination.appendChild(arrow_bck);
    pagination.appendChild(pages);
    pagination.appendChild(arrow_nxt);

    /// event

    this.appendChild(board);
    this.appendChild(pagination);
  }

  static get observedAttributes() {
    return ["data", "page"];
  }

  attributeChangedCallback() {
    //바뀌면 실행
    console.log("바귄다");
  }
}

export default BoardListClass;
