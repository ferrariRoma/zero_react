import React, { Component } from "react";

const Try_hooks = ({ el }) => {
  return (
    <>
      <li>
        <b>{el.try}</b> {el.result}
      </li>
    </>
  );
};
export default Try_hooks;
