import React from "react";
import ReactDOM, { createRoot } from "react-dom/client";
import Lotto_class from "./lotto_class";
import Lotto_hooks from "./lotto_hooks";

createRoot(document.querySelector("#root")).render(
  <>
    <Lotto_hooks />
  </>
);
