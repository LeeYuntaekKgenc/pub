import {
  BoardDetailClass,
  BoardListClass,
  ButtonClass,
  InputClass,
  ModalClass,
  NavClass,
  SubNavClass,
} from "./js/index.js";

// const MENU_LIST = [
//   { name: "자료실", class: "reference", click: function () {} },
//   { name: "Q&A", class: "qna" },
// ];

customElements.define("kg-sub-nav", SubNavClass);
customElements.define("kg-board-detail", BoardDetailClass);
customElements.define("kg-board-list", BoardListClass);
customElements.define("kg-button", ButtonClass);
customElements.define("kg-modal", ModalClass);
customElements.define("kg-nav", NavClass);
customElements.define("kg-input", InputClass);
