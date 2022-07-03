import React from "react";
import { createRoot } from "react-dom/client";
import NumberBaseball from "./numberBaseball_class";

const container = document.querySelector("#root");
const root = createRoot(container);
root.render(
  <>
    <NumberBaseball />
  </>
);
