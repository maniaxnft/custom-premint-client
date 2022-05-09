import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./assets/Korolev/Korolev-Bold.otf";

import { Provider } from "react-redux";
import store from "./store";

import Components from "./components";

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <Components />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);
