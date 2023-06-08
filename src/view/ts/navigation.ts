// 사용될 수 있는 속성값 (setAttribute 메서드로 할당)
//

interface IMenuList {
  name: string;
  class: string;
}

class NavClass extends HTMLElement {
  private initFlag = false;

  /// data
  private baseMenuList = [
    { name: "자료실", class: "reference" },
    { name: "Q&A", class: "qna" },
  ];
  private menuList: IMenuList[] = [];

  /// style
  private color = "blk";

  private onDeleteSubmit = "";
  private onAddSubmit = "";
  private onEditSubmit = "";

  connectedCallback() {
    this.store();
    this.renderMenu();

    this.initFlag = true;
  }

  static get observedAttributes() {
    return ["menu_list"];
  }

  attributeChangedCallback(name: string) {
    if (!this.initFlag) return;
    if (name === "menu_list") {
      this.querySelector(".kg-menu-wrapper.custom")?.remove();
      this.store();
      this._createCustomMenu();
    }
  }

  store() {
    /// data
    if (this.getAttribute("menu_list"))
      this.menuList = JSON.parse(this.getAttribute("menu_list")!);

    /// style
    if (this.getAttribute("color")) this.color = this.getAttribute("color")!;

    /// event
    if (this.getAttribute("on_add_submit"))
      this.onAddSubmit = this.checkArrowFunc(
        this.getAttribute("on_add_submit")!
      );
    if (this.getAttribute("on_edit_submit"))
      this.onEditSubmit = this.checkArrowFunc(
        this.getAttribute("on_edit_submit")!
      );
    if (this.getAttribute("on_delete_submit"))
      this.onDeleteSubmit = this.checkArrowFunc(
        this.getAttribute("on_delete_submit")!
      );
  }

  //// rendering
  renderMenu() {
    const innerHTML = this.innerHTML;
    this.innerHTML = "";
    this._createMenu();
    this._createCustomMenu();
    this._appendInnerHTML(innerHTML);
    this._createModal();
  }

  private _createMenu() {
    const menuContainer = document.createElement("div");
    menuContainer.className = "kg-menu-container";

    const logo = document.createElement("div");
    logo.className = "kg-logo-wrapper kg-icon";
    const logoImg = document.createElement("img");
    logoImg.src = "./public/icon/logo.svg";
    logoImg.alt = "logo";
    logo.appendChild(logoImg);
    menuContainer.appendChild(logo);

    const baseMenuWrapper = document.createElement("div");
    baseMenuWrapper.className = "kg-menu-wrapper base";

    this.baseMenuList.forEach((menu) => {
      const menuEl = document.createElement("div");
      menuEl.className = `kg-menu ${menu.class} ${this.color}`;

      const menuTitle = document.createElement("a");
      if (location.pathname === menu.name) menuTitle.style.fontWeight = "600";
      menuTitle.href = `/${menu.name}`;
      menuTitle.innerHTML = menu.name;

      menuEl.appendChild(menuTitle);
      baseMenuWrapper.appendChild(menuEl);
    });

    menuContainer.appendChild(baseMenuWrapper);
    this.appendChild(menuContainer);
  }

  private _createCustomMenu() {
    const customMenuWrapper = document.createElement("div");
    customMenuWrapper.className = "kg-menu-wrapper custom";

    this.menuList.forEach((menu) => {
      const menuEl = document.createElement("div");
      menuEl.className = `kg-menu ${menu.class} ${this.color}`;

      const menuTitle = document.createElement("a");
      if (location.pathname === menu.name) menuTitle.style.fontWeight = "600";
      menuTitle.href = `/${menu.name}`;
      menuTitle.innerHTML = menu.name;

      const editBtnWrapper = document.createElement("div");
      editBtnWrapper.className = "kg-menu-edit-btn-wrapper kg-icon";
      const editBtnIcon = document.createElement("img");
      editBtnIcon.src = "./public/icon/write_icon.svg";
      editBtnIcon.alt = "edit";
      editBtnIcon.addEventListener("click", (e) => {
        e.preventDefault();
        this._modalOpen();
        this._editMenu(menu);
      });
      editBtnWrapper.appendChild(editBtnIcon);

      menuEl.appendChild(menuTitle);
      menuEl.appendChild(editBtnWrapper);
      customMenuWrapper.appendChild(menuEl);
    });

    const menuAddBtnWrapper = document.createElement("div");
    menuAddBtnWrapper.className = "kg-menu-add-btn-wrapper kg-icon";
    const menuAddBtn = document.createElement("img");
    menuAddBtn.src = "./public/icon/add_icon.svg";
    menuAddBtn.alt = "add";
    menuAddBtnWrapper.appendChild(menuAddBtn);

    menuAddBtnWrapper.addEventListener("click", () => {
      this._addMenu();
      this._modalOpen();
    });
    this.querySelector(".kg-menu-container")
      ?.appendChild(customMenuWrapper)
      .appendChild(menuAddBtnWrapper);
  }

  private _createModal() {
    const menuFuncModalContainer = document.createElement("div");
    menuFuncModalContainer.className = "kg-menu-func-modal-container";
    const menuFuncModalLayout = document.createElement("div");
    menuFuncModalLayout.className = "kg-menu-func-modal-layout";
    menuFuncModalLayout.addEventListener("click", (e) => {
      e.preventDefault();
      this._modalClose();
    });
    const menuFuncModal = document.createElement("div");
    menuFuncModal.className = "kg-menu-func-modal";

    menuFuncModalContainer.appendChild(menuFuncModalLayout);
    menuFuncModalContainer.appendChild(menuFuncModal);

    this.appendChild(menuFuncModalContainer);
  }

  _appendInnerHTML(innerHTML: string) {
    const funcWrapper = document.createElement("div");
    funcWrapper.className = "kg-nav-func-wrapper";
    funcWrapper.innerHTML = innerHTML;

    this.appendChild(funcWrapper);
  }

  private _addMenu() {
    const modal = document.querySelector(".kg-menu-func-modal");
    if (modal) modal.innerHTML = "";

    const addMenuForm = document.createElement("form");
    addMenuForm.className = "kg-menu-add-form";
    const addMenuTitle = document.createElement("div");
    addMenuTitle.className = "subtitle";
    addMenuTitle.innerText = "메뉴 추가";
    const addLine = document.createElement("hr");
    const addMenuInput = document.createElement("kg-input");
    addMenuInput.setAttribute("color", "#cccccc");
    addMenuInput.setAttribute("width", "100%");
    addMenuInput.setAttribute(
      "placeholder",
      "추가할 메뉴의 이름을 입력하세요."
    );
    const addMenuBtn = document.createElement("kg-button");
    addMenuBtn.setAttribute("color", "#0063c1");
    addMenuBtn.setAttribute("type", "submit");
    addMenuBtn.setAttribute("width", "100%");
    addMenuBtn.innerText = "추가";

    addMenuForm.appendChild(addMenuTitle);
    addMenuForm.appendChild(addLine);
    addMenuForm.appendChild(addMenuInput);
    addMenuForm.appendChild(addMenuBtn);

    addMenuForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const value = addMenuForm.querySelector("kg-input>input")?.nodeValue;
      if (this.menuList.length > 4) return;
      if (this.menuList.findIndex((m) => m.name === value)) return;
      if (new Function("e", "return " + this.onAddSubmit + "(e)")(e)) {
        this.menuList.push({
          name: value as string,
          class: value as string,
        });

        this._modalClose();
      }
    });

    modal?.appendChild(addMenuForm);
  }

  private _editMenu(menu: IMenuList) {
    const modal = document.querySelector(".kg-menu-func-modal");
    if (modal) modal.innerHTML = "";

    const editNameForm = document.createElement("form");
    editNameForm.className = "kg-menu-edit-name-form";
    const editNameTitle = document.createElement("div");
    editNameTitle.className = "subtitle";
    editNameTitle.innerText = "메뉴 이름 수정";
    const editLine = document.createElement("hr");
    const editNameInput = document.createElement("kg-input");
    editNameInput.setAttribute("color", "#cccccc");
    editNameInput.setAttribute("width", "100%");
    editNameInput.setAttribute("placeholder", "수정될 이름을 입력하세요.");
    editNameInput.setAttribute("default_value", menu.name);
    const editNameBtn = document.createElement("kg-button");
    editNameBtn.setAttribute("color", "#0063c1");
    editNameBtn.setAttribute("type", "submit");
    editNameBtn.setAttribute("width", "100%");
    editNameBtn.innerText = "수정";

    editNameForm.appendChild(editNameTitle);
    editNameForm.appendChild(editLine);
    editNameForm.appendChild(editNameInput);
    editNameForm.appendChild(editNameBtn);

    // edit submit event
    editNameForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const value = editNameForm.querySelector("kg-input>input")?.nodeValue;
      if (value === menu.name) return;
      if (
        new Function("e", "menu", "return" + this.onEditSubmit + "(e,menu)")(
          e,
          menu
        )
      ) {
        this.menuList = this.menuList.map((v) =>
          v.name === menu.name
            ? { name: value as string, class: value as string }
            : v
        );

        this._modalClose();
      }
    });

    modal?.appendChild(editNameForm);

    const deleteMenuForm = document.createElement("form");
    deleteMenuForm.className = "kg-menu-delete-form";
    const deleteMenuTitle = document.createElement("div");
    deleteMenuTitle.className = "subtitle";
    deleteMenuTitle.innerText = "메뉴 삭제";
    const deleteLine = document.createElement("hr");
    const deleteMenuInput = document.createElement("kg-input");
    deleteMenuInput.setAttribute("type", "password");
    deleteMenuInput.setAttribute("width", "100%");
    deleteMenuInput.setAttribute("color", "#cccccc");
    deleteMenuInput.setAttribute("placeholder", "비밀번호를 입력하세요.");
    const deleteMenuBtn = document.createElement("kg-button");
    deleteMenuBtn.setAttribute("color", "#f24c38");
    deleteMenuBtn.setAttribute("type", "submit");
    deleteMenuBtn.setAttribute("width", "100%");
    deleteMenuBtn.innerText = "삭제";

    deleteMenuForm.appendChild(deleteMenuTitle);
    deleteMenuForm.appendChild(deleteLine);
    deleteMenuForm.appendChild(deleteMenuInput);
    deleteMenuForm.appendChild(deleteMenuBtn);

    // delete event
    deleteMenuForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const value = deleteMenuForm.querySelector("kg-input > input")?.nodeValue;
      if (
        new Function(
          "e",
          "menu",
          "value",
          "return " + this.onDeleteSubmit + "(e,menu, value)"
        )(e, menu, value)
      ) {
        this._modalClose();
      }
    });

    modal?.appendChild(deleteMenuForm);
  }

  private _modalOpen() {
    const modal = document.querySelector(".kg-menu-func-modal-container");
    modal?.classList.add("on");
  }

  private _modalClose() {
    const modal = document.querySelector(".kg-menu-func-modal-container.on");
    modal?.classList.replace("on", "off");

    const rmClass = setTimeout(() => {
      modal?.classList.remove("off");
    }, 200);

    clearTimeout(rmClass);
  }

  // utils
  checkArrowFunc(func: string) {
    if (func.includes("=>")) func = "function " + `${func.replace("=>", " ")}`;
    return func;
  }
}

export default NavClass;
