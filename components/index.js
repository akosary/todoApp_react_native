import React from "react";
import App from "../App";
import Store from "./store";
import Provider from "react-redux";
import ReactDom from "react-dom";
import Home from "./Home";

ReactDom.render(
  <Provider store={Store}>
    <Home />
  </Provider>,
  document.getElementById("root")
);
