import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./assets/Korolev/Korolev-Bold.otf";

import { Provider } from "react-redux";
import store from "./store";

import Components from "./components";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <Components />
    </React.StrictMode>
  </Provider>
);
