// interface IMenu {
//   name: string;
//   class: string;
// }

class NavClass extends HTMLElement {
  connectedCallback() {
    let menu_list = this.getAttribute("menu_list")
      ? eval(this.getAttribute("menu_list"))
      : [];
    console.log(menu_list);
    let color = this.getAttribute("color");

    if (!color) {
      color = "blk";
    }

    const menu_wrapper = document.createElement("div");
    menu_wrapper.className = "menu-wrapper";

    const logo = document.createElement("div");
    logo.className = "logo";
    const logo_img = document.createElement("img");
    logo_img.src = "";
    logo_img.alt = "logo";
    logo.appendChild(logo_img);
    menu_wrapper.appendChild(logo);

    const fixed_menu = [
      { name: "자료실", class: "reference" },
      { name: "Q&A", class: "qna" },
    ];
    // as IMenu[]
    [...fixed_menu, ...menu_list].forEach((menu) => {
      const menu_el = document.createElement("div");
      menu_el.className = `menu ${menu.class} ${color}`;

      const menu_title = document.createElement("a");
      if (location.pathname === menu.name) menu_title.style.fontWeight = "600";
      menu_title.href = `/${menu.name}`;
      menu_title.innerHTML = menu.name;

      if (menu.class !== "reference" && menu.class !== "qna") {
        const edit_btn_wrapper = document.createElement("div");
        edit_btn_wrapper.className = "edit-btn-wrapper icon";
        const edit_btn_icon = document.createElement("img");
        edit_btn_icon.src = "";
        edit_btn_icon.alt = "edit";
        edit_btn_wrapper.appendChild(edit_btn_icon);

        menu_el.appendChild(edit_btn_wrapper);
      }

      menu_el.appendChild(menu_title);
      menu_wrapper.appendChild(menu_el);
    });

    const menu_add_btn_wrapper = document.createElement("div");
    menu_add_btn_wrapper.className = "menu-add-btn-wrapper icon";
    const menu_add_btn = document.createElement("img");
    menu_add_btn.className = "menu-add-btn";
    menu_add_btn.src = "";
    menu_add_btn.alt = "add";
    menu_add_btn_wrapper.appendChild(menu_add_btn);
    menu_wrapper.appendChild(menu_add_btn_wrapper);

    const func_wrapper = document.createElement("div");
    func_wrapper.className = "func-wrapper";

    if (location.pathname !== "/") {
      const menu_search_wrapper = document.createElement("div");
      menu_search_wrapper.className = "menu-search-wrapper";
      const menu_search_icon = document.createElement("img");
      menu_search_icon.src = "";
      menu_search_icon.alt = "search";
      menu_search_wrapper.appendChild(menu_search_icon);

      func_wrapper.appendChild(menu_search_icon);
    }

    const login_wrapper = document.createElement("div");
    login_wrapper.className = "login-wrapper";
    const login_btn = document.createElement("button");
    login_btn.className = `login-btn ${color}`;
    login_btn.textContent = "로그인";
    login_wrapper.appendChild(login_btn);
    func_wrapper.appendChild(login_wrapper);

    this.appendChild(menu_wrapper);
    this.appendChild(func_wrapper);
  }
}

export default NavClass;
