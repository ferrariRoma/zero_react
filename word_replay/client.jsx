import React from "react";
import ReactDOM, { createRoot } from "react-dom/client";
import WordReplay from "./wordReplay";

// ReactDOM.render(<WordReplay />, document.querySelector("#root"));

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <>
    <WordReplay />
  </>
);
