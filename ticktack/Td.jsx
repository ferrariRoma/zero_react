import React, { useCallback, memo } from "react";
import { CLICK_CELL } from "./Ticktack_hooks";

const Td = memo(({ rowIndex, cellIndex, dispatch, cellData }) => {
  const onClickTd = useCallback(() => {
    console.log(rowIndex, cellIndex);
    // 이미 셀 데이터가 있는 칸은 return해버리기
    if (cellData) {
      return;
    }
    // redux에서는 state가 동기적으로 바뀌는데, useReducer와 기존의 react의 state는 비동기적으로 state가 바뀐다.
    // 그리고 비동기인 state를 안정적으로 처리해주기 위해서는 useEffect를 쓴다.
    dispatch({ type: CLICK_CELL, row: rowIndex, cell: cellIndex });
  }, [cellData]);
  return (
    <>
      <td onClick={onClickTd}>{cellData}</td>
    </>
  );
});

export default Td;
