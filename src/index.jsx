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
      .then(reg =>
        console.log(
          `Успешно зерегистрирован ServiceWorker с областью действия ${reg.scope}.`
        )
      )
      .catch(err =>
        console.log(`Ну удалось зеристрировать ServiceWorker. ${err}.`)
      );
  });
} else console.log(`ServiceWorker не поддерживается.`);

window.addEventListener("appinstalled", event => {
  fetch("/api/app.json", {
    method: "GET",
    credentials: "include"
  });
});
