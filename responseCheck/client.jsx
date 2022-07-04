import React from "react";
import { createRoot } from "react-dom/client";
import ResponseCheck_class from "./response_class";

const container = document.querySelector("#root");
const root = createRoot(container);
root.render(
  <>
    <ResponseCheck_class />
  </>
);
