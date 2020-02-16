import React, { Component } from "react";
import { Layout } from "../components/Layout/Layout";
import { InstallPopup } from "../components/InstallPopup/InstallPopup";

export class App extends Component {
  render() {
    return (
      <>
        <Layout />
        <InstallPopup />
      </>
    );
  }
}
