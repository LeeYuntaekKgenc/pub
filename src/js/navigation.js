class NavClass extends HTMLElement {
  connectedCallback() {
    let color = this.getAttribute("color");
    if (!color) {
      color = "blk";
    }

    const menu_wrapper = document.createElement("div");
    menu_wrapper.className = "menu-wrapper";

    const logo = document.createElement("div");
    logo.className = "logo";

    const logo_img = document.createElement("img");

    logo.appendChild(logo_img);
    menu_wrapper.appendChild(logo);

    let menu_list = this.getAttribute("menu_list") || [];
    if (typeof menu_list === "string") {
      menu_list = JSON.parse(menu_list);
    }

    menu_list.forEach((menu) => {
      const menu_el = document.createElement("div");
      menu_el.className = `menu ${menu.class} ${color}`;
      const menu_title = document.createElement("a");
      if (location.pathname === menu.name) {
        menu_title.style.fontWeight = 600;
      }
      menu_title.href = `/${menu.name}`;
      menu_title.innerHTML = menu.name;

      const menu_function = menu.onClick || function () {};
      menu_el.addEventListener("click", menu_function);

      menu_el.appendChild(menu_title);
      menu_wrapper.appendChild(menu_el);
    });

    let menu_add_btn_wrapper = document.createElement("div");
    menu_add_btn_wrapper.className = "menu-add-btn-wrapper";
    let menu_add_btn = document.createElement("img");
    menu_add_btn.className = "menu-add-btn icon";
    menu_add_btn_wrapper.appendChild(menu_add_btn);

    const login_container = document.createElement("div");
    login_container.className = "login-container";
    const login_btn = document.createElement("button");
    login_btn.className = `login-btn ${color}`;
    login_btn.textContent = "로그인";
    login_container.appendChild(login_btn);

    this.appendChild(menu_wrapper);
    this.appendChild(login_container);
  }

  static get observedAttributes() {
    return ["name"];
    // name 이라는 attribute 바뀌는지 감지
  }

  attributeChangedCallback() {
    //바뀌면 실행
    console.log("바귄다");
  }
}

export default NavClass;
