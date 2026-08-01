(function () {
  "use strict";

  /**
   * ボタン類を作成する
   */
  function createFloatingButtons() {
    if (document.querySelector(".travel-floating-buttons")) {
      return;
    }

    const buttonArea = document.createElement("div");
    buttonArea.className = "travel-floating-buttons";

    const backToTopButton = document.createElement("button");
    backToTopButton.type = "button";
    backToTopButton.className =
      "travel-floating-button back-to-top";
    backToTopButton.setAttribute(
      "aria-label",
      "ページ上部へ戻る"
    );
    backToTopButton.textContent = "↑ 上へ";

    const menuButton = document.createElement("button");
    menuButton.type = "button";
    menuButton.className =
      "travel-floating-button menu-button";
    menuButton.setAttribute(
      "aria-label",
      "目次を開く"
    );
    menuButton.textContent = "☰ 目次";

    buttonArea.appendChild(backToTopButton);
    buttonArea.appendChild(menuButton);
    document.body.appendChild(buttonArea);

    backToTopButton.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });

    menuButton.addEventListener("click", function () {
      const standardMenuButton = document.querySelector(
        ".book-header .toggle-summary"
      );

      if (standardMenuButton) {
        standardMenuButton.click();
      }
    });

    window.addEventListener(
      "scroll",
      function () {
        if (window.scrollY > 350) {
          backToTopButton.classList.add("is-visible");
        } else {
          backToTopButton.classList.remove("is-visible");
        }
      },
      {
        passive: true
      }
    );
  }

  /**
   * 初期処理
   */
  function initializeTravelUi() {
    createFloatingButtons();
  }

  document.addEventListener(
    "DOMContentLoaded",
    initializeTravelUi
  );

  /*
   * HonKitはページ移動時にページ全体を
   *再読み込みしない場合があるため、
   * page.changeでも再度確認する。
   */
  if (
    window.gitbook &&
    window.gitbook.events
  ) {
    window.gitbook.events.bind(
      "page.change",
      initializeTravelUi
    );
  }
})();