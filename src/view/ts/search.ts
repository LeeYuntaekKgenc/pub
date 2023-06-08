class SearchClass extends HTMLElement {
  private initFlag = false;

  private datas = [{ content: "" }];

  private word = "";

  connectedCallback() {
    this.initFlag = true;
    this.render();
  }

  static get observedAttributes() {
    return ["name"];
  }

  attributeChangedCallback() {
    if (!this.initFlag) return;
  }

  storeData() {
    if (this.getAttribute("data")) this.datas = JSON.parse(this.getAttribute("data")!);
  }

  render() {
    const mainSearchInputWrapper = document.createElement("form");
    mainSearchInputWrapper.className = "kg-main-search-input-wrapper";
    const mainSearchInput = document.createElement("input");
    mainSearchInput.className = "kg-main-search-input";
    mainSearchInput.placeholder = "검색어를 입력하세요.";
    const mainSearchInputIcon = document.createElement("img");
    mainSearchInputIcon.src = "./public/icon/search_icon.svg";
    mainSearchInputIcon.alt = "search";

    mainSearchInputWrapper.appendChild(mainSearchInput);
    this.appendChild(mainSearchInputWrapper);

    const mainSearchResultWrapper = document.createElement("div");
    mainSearchResultWrapper.className = "kg-main-search-result-wrapper";
    const mainSearchResultUl = document.createElement("ul");

    this.datas.forEach((data) => {
      const mainSearchResultLi = document.createElement("li");
      const mainSearchResultTitleWrapper = document.createElement("div");
      mainSearchResultTitleWrapper.className = "kg-main-search-result-title-wrapper";
      const title = document.createElement("div");
      title.className = "kg-title";
      title.textContent = `${1}에서 '${2}' 검색결과`;
      const result = document.createElement("div");
      result.className = "kg-result";
      result.textContent = `총 ${2}건 검색`;

      mainSearchResultTitleWrapper.appendChild(title);
      mainSearchResultTitleWrapper.appendChild(result);

      const mainSearchResultContentWrapper = document.createElement("div");
      mainSearchResultContentWrapper.className = "kg-main-search-result-content-wrapper";
      if (!data.content) {
        mainSearchResultContentWrapper.textContent = "검색 결과가 존재하지 않습니다.";
      }

      mainSearchResultLi.appendChild(mainSearchResultTitleWrapper);
      mainSearchResultLi.appendChild(mainSearchResultContentWrapper);

      mainSearchResultUl.appendChild(mainSearchResultLi);
    });

    mainSearchResultWrapper.appendChild(mainSearchResultUl);
    this.appendChild(mainSearchResultWrapper);

    const layout = document.createElement("div");
    layout.className = "kg-layout";
    layout.addEventListener("click", (e) => {
      e.preventDefault();
      const search = document.querySelector("kg-search");
      search?.classList.replace("on", "off");
      const hide = setTimeout(() => search?.classList.remove("off"), 200);
      clearTimeout(hide);
    });

    this.appendChild(layout);
  }
}

export default SearchClass;
