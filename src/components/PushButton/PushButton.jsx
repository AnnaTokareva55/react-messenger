import React, { Component } from "react";
import "./PushButton.css";

// Компонент кнопки подписки на push-уведомления.
export class PushButton extends Component {
  render() {
    return (
      <div className="push">
        <img
          className="push-img"
          src="src/components/PushButton/img/push-off.png"
          alt="Push-уведомления"
        ></img>
      </div>
    );
  }
}
