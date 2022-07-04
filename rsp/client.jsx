import React from "react";
import { createRoot } from "react-dom/client";
import Rsp_class from "./rsp_class";
import Rsp_hooks from "./rep_hooks";

const container = document.querySelector("#root");
const root = createRoot(container);
root.render(
  <>
    <Rsp_class />
  </>
);
