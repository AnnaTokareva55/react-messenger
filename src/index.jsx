import React from "react";
import ReactDom from "react-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { App } from "./containers/App";

ReactDom.render(
  <MuiThemeProvider>
    <App />
  </MuiThemeProvider>,
  document.getElementById("root")
);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then(registration =>
        console.log(
          `Успешно зерегистрирован ServiceWorker с областью действия ${registration.scope}.`
        )
      )
      .catch(error =>
        console.log(`Ну удалось зеристрировать ServiceWorker. ${error}.`)
      );
  });
} else console.log(`ServiceWorker не поддерживается.`);

window.addEventListener("appinstalled", event => {
  fetch("/api/app.json", {
    method: "GET",
    credentials: "include"
  });
});

window.addEventListener("load", event => notifications(window));

function notifications(window) {
  const pushElement = document.querySelector(".push");
  const pushImgElement = document.querySelector(".push-img");

  function isPushSupported() {
    if (Notification.permission === "denied") {
      alert("Вы заблокировали push-уведомления.");
      return;
    }

    if (!("PushManager" in window)) {
      alert("1111Push-уведомления не поддерживаются браузером.");
      return;
    }

    navigator.serviceWorker.ready.then(registration => {
      registration.pushManager
        .getSubscription()
        .then(subscription => {
          if (subscription) {
            changePushStatus(true);
          } else {
            changePushStatus(false);
          }
        })
        .catch(error => console.error(`Ошибка: ${error}`));
    });
  }

  function subscribePush() {
    navigator.serviceWorker.ready.then(registration => {
      if (!registration.pushManager) {
        alert("222Push-уведомления не поддерживаются браузером.");
        return false;
      }

      registration.pushManager
        .subscribe({ userVisibleOnly: true })
        .then(subscription => {
          alert("Подписка успешно оформлена.");
          console.log(subscription);
          changePushStatus(true);
        })
        .catch(error => {
          console.log(`При подписке возникла ошибка: ${error}`);
          changePushStatus(false);
        });
    });
  }

  function unSubscribePush() {
    navigator.serviceWorker.ready.then(registration => {
      registration.pushManager.getSubscription().then(subscription => {
        if (!subscription) {
          alert("Невозможно отписаться от push-уведомлений");
          return;
        }
        subscription
          .unsubscribe()
          .then(() => {
            alert("Подписка успешно отменена.");
            console.log(subscription);
            changePushStatus(false);
          })
          .catch(error =>
            console.error(
              `Невозможно отписаться от push-уведомлений. Ошибка: ${error}`
            )
          );
      });
    });
  }

  function changePushStatus(status) {
    pushElement.dataset.checked = status;
    pushElement.checked = status;
    if (status) {
      pushElement.classList.add("active");
      pushImgElement.src = "src/components/PushButton/img/push-on.png";
    } else {
      pushElement.classList.remove("active");
      pushImgElement.src = "src/components/PushButton/img/push-off.png";
    }
  }

  pushElement.addEventListener("click", event => {
    let isSubscribeId = pushElement.dataset.checked === "true";
    if (isSubscribeId) {
      unSubscribePush();
    } else {
      subscribePush();
    }

    isPushSupported();
  });
}
