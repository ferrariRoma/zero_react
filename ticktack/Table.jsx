import React, { memo } from "react";
import Tr from "./Tr";

const Table = memo(({ tableData, dispatch }) => {
  return (
    <>
      <table>
        {Array(tableData.length)
          .fill()
          .map((tr, i) => (
            <Tr
              key={Date.now() + Math.random() * 1000}
              rowIndex={i}
              rowData={tableData[i]}
              dispatch={dispatch}
            />
          ))}
      </table>
    </>
  );
});

export default Table;
