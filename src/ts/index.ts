/* 
Copyright (c) 2025 Fluoroid (Syar Star Observatory)
This software is released under the MIT License, see LICENSE.
This website contents (docs, images...) are released under the CC BY-NC-ND 4.0 License, see LICENSE.
*/

import "../css/style.css";

/**
 * メイン関数
 */
const main = () => {
  /**
   * mainタグ
   */
  const mainElement = document.querySelector("main");

  /**
   * オブザーバー
   */
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.target instanceof Element) {
        Array.from(
          mutation.target.querySelectorAll<HTMLDivElement>(
            "div[data-message-author-role='assistant']"
          )
        ).map((div) => {
          for (let i = 0; i < div.children.length; i++) {
            if (div.children[i].classList.contains("shel-icon")) {
              return;
            }
          }

          /**
           * アイコンのラッパー
           */
          const iconContainer = document.createElement("div");
          iconContainer.classList.add("shel-icon");

          /**
           * アイコン画像
           */
          const iconImg = document.createElement("img");
          const imgUrl =
            chrome.runtime?.getURL("/img/shel.png") || "./img/shel.png";
          iconImg.src = imgUrl;
          iconImg.classList.add("shel-icon-img");
          iconContainer.appendChild(iconImg);

          div.style.marginLeft = "24px";

          div.appendChild(iconContainer);
        });
      }
    });
  });

  // オブザーバー
  if (mainElement) {
    observer.observe(mainElement, { childList: true, subtree: true });
  }
};

addEventListener("load", () => {
  main();
});
