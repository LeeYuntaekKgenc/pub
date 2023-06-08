class SubNavClass extends HTMLElement {
  datas = [];
  connectedCallback() {
    let datas = this.getAttribute("data");
    if (typeof datas === "string") {
      datas = JSON.parse(datas);
    }

    datas;
  }

  static get observedAttributes() {
    return ["name"];
    // name 이라는 attribute 바뀌는지 감지
  }

  attributeChangedCallback() {
    //바뀌면 실행
    console.log("바귄다");
  }

  render() {
    const subnavWrapper = document.createElement("div");
    subnavWrapper.className = "kg-subnav-wrapper";

    const subnav = document.createElement("ul");
    subnav.className = "kg-subnav";

    this.datas.forEach((data) => {
      const subnavFirstLi = document.createElement("li");
      subnavFirstLi.className = "kg-subnav-first-depth";
      if (data.children) {
        const subnavSecondUl = document.createElement("ul");
        subnavSecondUl.className = "kg-subnav-second-depth-wrapper";
      }
    });

    // <div class="subnav-container">
    //         <ul class="subnav">

    //           <li class="subnav-first-depth">
    //             <div class="subnav-el-container">
    //               <div class="subnav-toggle-container">
    //                 <div class="subnav-toggle-arrow">
    //                   <img
    //                     src="./src/public/icon/arrow_open_icon.svg"
    //                     alt="opened"
    //                   />
    //                 </div>
    //                 <div class="subnav-toggle-folder closed">
    //                   <img
    //                     src="./src/public/icon/file_closed_icon.svg"
    //                     alt="opened"
    //                   />
    //                 </div>
    //                 <span class="subnav-title">새 폴더 2</span>
    //               </div>

    //               <div class="subnav-btn-container">
    //                 <div class="subnav-add-folder">
    //                   <img src="./src/public/icon/add_icon.svg" alt="closed" />
    //                 </div>
    //                 <div class="subnav-edit-folder">
    //                   <img
    //                     src="./src/public/icon/write_icon.svg"
    //                     alt="closed"
    //                   />
    //                 </div>
    //               </div>
    //             </div>
    //           </li>
    //         </ul>
    //       </div>
  }
}

export default SubNavClass;
