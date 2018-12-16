import "./index.css";

import App from "./App";
import React from "react";
import ReactDOM from "react-dom";

const REACT_ROOT = document.getElementById("root");

ReactDOM.render(<App />, REACT_ROOT);

if (module["hot"]) {
  module["hot"].accept("./App", () => {
    const NextApp: typeof App = require("./App").default;
    ReactDOM.render(<NextApp />, REACT_ROOT);
  });
}
