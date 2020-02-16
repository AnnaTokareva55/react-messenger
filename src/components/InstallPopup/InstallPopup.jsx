import React, { Component } from "react";
import Close from "material-ui/svg-icons/navigation/close";
import "./InstallPopup.css";

export class InstallPopup extends Component {
  state = {
    popupShow: false
  };

  handleShow = () => {
    this.setState({ popupShow: true });
  };

  handleNotShow = () => {
    this.setState({ popupShow: false });
  };

  componentDidMount() {
    const isIos = () => {
      const userAgent = window.navigator.userAgent.toLowerCase();
      return /iphone/.test(userAgent);
    };

    const isInStandaloneMode = () => {
      return "standalone" in window.navigator && window.navigator.standalone;
    };

    if (isIos() && !isInStandaloneMode()) {
      this.handleShow();
    }
  }

  render() {
    console.log(this.state);
    return (
      <div
        style={{ display: this.state.popupShow ? "block" : "none" }}
        className="Popup"
      >
        <div>
          <Close className="CloseIcon" onClick={this.handleNotShow} />
        </div>
        <div className="PopupText">
          Установи приложение на свой iPhone: нажми «Поделиться» и затем на
          экран «Домой».
        </div>
      </div>
    );
  }
}
