import "@/view/main.css";
import "@/view/index.ts";
import "@/view/test1.css";

document.querySelector<HTMLDivElement>(".root")!.innerHTML = `
<nav class="nav">
  <kg-nav
    menu_list='[{ "name": "자료실", "class": "reference" },{ "name": "Q&A", "class": "qna" }]'
  >
    <div class="kg-menu-search-wrapper kg-icon">
      <img
        src="./public/icon/search_icon.svg"
        alt="search"
        onclick="document.querySelector('kg-search').classList.add('on')"
      />
    </div>
    <div class="nav-login-wrapper">
      <kg-button variant="login">로그인</kg-button>
    </div>
  </kg-nav>
</nav>
<main>
  <section class="subnav-section">
    <div class="subnav-input-container">
      <kg-button type="middle" color="#0063c1" width="100%"
        >새 상위 폴더 생성</kg-button
      >
      <kg-input color="#CCCCCC"></kg-input>
    </div>

    <!-- <div class="subnav-container">
      <ul class="subnav">
        <li class="subnav-first-depth">
          <div class="subnav-el-container">
            <div class="subnav-toggle-container">
              <div class="subnav-toggle-arrow">
                <img
                  src="./src/public/icon/arrow_open_icon.svg"
                  alt="opened"
                />
              </div>
              <div class="subnav-toggle-folder closed">
                <img
                  src="./src/public/icon/file_closed_icon.svg"
                  alt="opened"
                />
              </div>
              <span class="subnav-title">새 폴더 2</span>
            </div>

            <div class="subnav-btn-container">
              <div class="subnav-add-folder">
                <img src="./src/public/icon/add_icon.svg" alt="closed" />
              </div>
              <div class="subnav-edit-folder">
                <img
                  src="./src/public/icon/write_icon.svg"
                  alt="closed"
                />
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div> -->
  </section>

  <section class="board-section">
    <div class="board-heading">
      <h1>자료실</h1>
    </div>
    <div class="board-container">
      <div class="board-input-container">
        <div class="board-search-container">
          <kg-input color="#CCCCCC" btn="true"></kg-input>
        </div>
        <div class="board-btn-container">
          <kg-button
            color="#00c1b5"
            on_click="function test(e){console.log(document.querySelector('kg-board-list').checkedPost)}"
            >다운로드</kg-button
          >
          <kg-button color="#f24c38">삭제</kg-button>
          <kg-button color="#0063c1">글쓰기</kg-button>
        </div>
      </div>

      <div class="board-wrapper">
        <div class="board-list-container">
          <kg-board-list
            data='[{"title": "hello", "dept": "1층", "author":"이윤택", "date": "2023-06-11"}, {"title": "hello", "dept": "1층", "author":"이윤택", "date": "2023-06-11"}, {"title": "hello", "dept": "1층", "author":"이윤택", "date": "2023-06-11"}]'
            ratio='["50%", "10%", "10%", "20%"]'
          ></kg-board-list>
        </div>
        <div class="board-content-container">
          <kg-board-detail></kg-board-detail>
        </div>
      </div>
    </div>
  </section>
</main>
<kg-search></kg-search>
`;
