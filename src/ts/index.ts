/* 
Copyright (c) 2026 Fluoroid (Syar Star Observatory)
This software is released under the MIT License, see LICENSE.
This website contents (docs, images...) are released under the CC BY-NC-ND 4.0 License, see LICENSE.
*/

import "../css/style.css";

/**
 * メイン関数
 */
const main = () => {
  /**
   * body
   */
  const mainElement = document.body;

  /**
   * オブザーバー
   */
  const observer = new MutationObserver((mutations: MutationRecord[]) => {
    mutations.forEach((mutation: MutationRecord) => {
      if (mutation.target instanceof Element) {
        Array.from(
          mutation.target.querySelectorAll<HTMLDivElement>(
            `div[data-markdown-text-style="assistant-message"]`,
          ),
        ).map((div: HTMLDivElement) => {
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

          // アイコン追加
          div.prepend(iconContainer);

          // アイコン直後のdiv要素の空白を取り除く
          const secondElement = div.children[1];
          if (secondElement instanceof HTMLDivElement) {
            secondElement.classList.remove("my-4");
          }
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
