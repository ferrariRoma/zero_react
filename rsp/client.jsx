import React from "react";
import ReactDOM, { createRoot } from "react-dom/client";
import Rsp_class from "./rsp_class";
import Rsp_hooks from "./rep_hooks";
import Rsp_custom from "./rsp_custom";

// const container = document.querySelector("#root");
// const root = createRoot(container);
// root.render(
//   <>
//     <Rsp_custom />
//   </>
// );

createRoot(document.querySelector("#root")).render(<Rsp_custom />);
