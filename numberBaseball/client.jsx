import React from "react";
import { createRoot } from "react-dom/client";
import NumberBaseball_hooks from "./numberBaseball_hooks";
import Test from "./renderTest";

const container = document.querySelector("#root");
const root = createRoot(container);
root.render(
  <>
    <NumberBaseball_hooks />
  </>
);
