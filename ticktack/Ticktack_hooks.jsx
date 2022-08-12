import React, {
  useState,
  useRef,
  useReducer,
  useCallback,
  useEffect,
} from "react";
import Table from "./Table";

/* 
useReducer와 contextAPI를 쓰면 규모가 작은 프로젝트에서는 리덕스를 대체할 수 있지만,
결국엔 큰 규모의 프로젝트를 하기 위해서는 리덕스를 써야 한다. 이 둘만 가지고는 비동기적인 작업을 하기엔 부족함이 있다.
*/

/* 
state는 가장 위 부모인 여기서 관리를 하게 되는데 실질적으로 사용자가 클릭을 하는 것은 td컴포넌트이다.
4단 컴포넌트. 전달해줘야 할 건 아래 6가지 데이터이다.
이걸 해결하기 위해서 contextAPI를 쓰는데, 일단 그건 다음 시간에 해보고, 오늘은 일단 state의 개수를 줄이는 useReducer를 배워보자.
state가 점점 늘어나면 state를 바꿔주는 setState 쌍들이 점점 늘어나는데, 이렇게 되면 관리도 힘들어지고 자식 컴포넌트에 프롭스로 전달할게 너무 많아진다.
이걸 useReducer를 쓰면 하나의 state와 하나의 setState로 통일을 할 수 있다. 그래서 이걸 쓰는 것이다.

const [state, dispatch] = useReducer(reducer, initialState, lazyInitialize);
인자는 다음과 같이 구성이 된다. 마지막 인자는 복잡해질 때 쓰고 평소에는 잘 안쓴다.
reducer는 함수이다. 여기에 state가 어떻게 변할지 적어준다.

dispatch에는 action객체가 들어간다.(리덕스에서 따온 용어임)
action객체 안에 type이라고 해서 아래와 같이 적어준다.

  const onClickTable = useCallback(() => {
    dispatch({ type: "SET_WINNER", winner: "O" });
  }, []);

dispatch하면 action을 실행한다는 뜻이다.
action은 어떤 역할을 할까? action만 있다고 자동으로 state가 바뀌는 건 아니다.
이 dispatch를 통해 일어나는 action을 해석해서 state를 직접 바꿔주는 역할을 하는게 필요하다.
그게 reducer이다.

우리가 action을 실행할 때 마다, action을 dispatch할 때마다 reducer가 실행돼서 state를 바꾼다.

state가 있고, onClickEvent 이후 state를 바꾸고 싶으면 action을 dispatch 해주는데, 어떻게 바꿀지는 reducer에 적는다.

action이름("SET_WINNER" 이런거)은 const 변수로 선언해두는 것이 좋음. 그리고 액션의 이름은 보통 대문자로 하는 것이 관례이다.

리덕스에서는 dispatch가 동기적으로 바뀌는데, 리액트에서는 dispatch가 비동기이다. 리액트에서 state가 비동기적으로 작동되는 것 처럼!
비동기 State에서 무언갈 처리하려면 우리는 항상 useEffect를 써줘야 한다.

*/

const initialState = {
  winner: "",
  turn: "O",
  tableData: [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ],
  recentCell: [-1, -1],
};

export const SET_WINNER = "SET_WINNER";
export const CLICK_CELL = "CLICK_CELL";
export const CHANGE_TURN = "CHANGE_TURN";
export const RESET_DATA = "RESET_DATA";

// 다시 보니 깡리덕스처럼 switch문을 통해서 action.type을 구분해서 처리
const reducer = (state, action) => {
  switch (action.type) {
    case SET_WINNER:
      return {
        ...state,
        winner: action.winner,
      }; // 불변성. 기존 state를 직접 바꾸는 게 아니라 새로운 state를 만들어서 바뀌는 부분만 바꿔준다.

    // 이렇게 자식 컴포넌트에서 state에 변화가 있다면 action을 만들어서 dispatch해주면 부모 컴포넌트에서 reducer를 통해서
    // 받은 action을 이렇게 처리해준다.
    // 아래처럼 해준 것은 객체의 불변성을 지키면서 특정 데이터만 변경하기 위해서 데이터를 Spread연산자를 통해 행만 얕게 복사한 다음에,
    // 열에 해당 부분에 state.turn의 값을 할당해줌.
    case CLICK_CELL: {
      // immer라는 라이브러리로 가독성을 해결한다.
      const tableData = [...state.tableData]; // 기존의 state를 spread연산자를 통해서 가지고 와서
      tableData[action.row] = [...tableData[action.row]]; // 가지고 온 table data에서 action.row에 해당하는 부분을 spread연산자를 통해서 가져온다.
      tableData[action.row][action.cell] = state.turn; // 가지고 온 action.row에서 action.cell에 해당하는 부분을 가지고 와서 현재의 state.turn을 입력해준다.
      return {
        ...state,
        tableData,
        recentCell: [action.row, action.cell],
      };
    }
    case CHANGE_TURN: {
      return {
        ...state, // 기존의 state data를 spread로 쭉 편 다음에
        turn: state.turn === "O" ? "X" : "O", // state data의 turn부분을 바꿔준다.
      };
    }
    case RESET_DATA: {
      return {
        ...state,
        turn: "O",
        tableData: [
          ["", "", ""],
          ["", "", ""],
          ["", "", ""],
        ],
        recentCell: [-1, -1],
      };
    }
    default:
      return state;
  }
};

const Ticktack_hooks = () => {
  /* const [winner, setWinner] = useState("");
  const [turn, setTurn] = useState("");
  const [tableData, setTableDate] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]); */
  const [state, dispatch] = useReducer(reducer, initialState);
  const { tableData, turn, winner, recentCell } = state;

  const onClickTable = useCallback(() => {
    dispatch({ type: SET_WINNER, winner: "O" });
  }, []);

  // 승자를 체크하는 과정에서 dispatch를 이용해서 state를 바꾸는데 이때가 비동기적으로 작동이 되기 때문에 useEffect에서 실행되게 한다.
  // 그래서 recentCell이 비동기적인 작업 끝에 바뀌면 그때서야 useEffect가 작동이 되도록 아래와 같이 만들었다.
  useEffect(() => {
    // recentCell을 state에 추가해서 가장 최근에 눌려진 cell을 감지한다.
    // 가장 처음 mount가 될 때는 그냥 return을 해준다.
    const [row, cell] = recentCell;
    if (row < 0) {
      return;
    }
    let win = false; // 처음에는 승자가 없다.
    // 세로로 세 개의 값이 모두 같은 값이라면!
    if (
      tableData[row][0] === turn &&
      tableData[row][1] === turn &&
      tableData[row][2] === turn
    ) {
      win = true;
    }
    // 가로로 세 개의 값이 모두 같은 값이라면!
    else if (
      tableData[0][cell] === turn &&
      tableData[1][cell] === turn &&
      tableData[2][cell] === turn
    ) {
      win = true;
    }
    // 우하향으로 대각선이 모두 같은 값이라면!
    else if (
      tableData[0][0] === turn &&
      tableData[1][1] === turn &&
      tableData[2][2] === turn
    ) {
      win = true;
    }
    // 좌하향으로 대각선이 모두 같은 값이라면!
    else if (
      tableData[0][2] === turn &&
      tableData[1][1] === turn &&
      tableData[2][0] === turn
    ) {
      win = true;
    }
    console.log(row, cell, win, tableData, turn);
    // 어떠한 경우라도 win이 발생한다면!
    if (win) {
      dispatch({ type: SET_WINNER, winner: turn });
      dispatch({ type: RESET_DATA });
    }
    // 무승부라면!
    else {
      // 기본적으로 칸이 다 찼다고 가정을 하고,
      let all = true;
      tableData.forEach((el) =>
        el.forEach((e) => {
          if (!e) {
            // 칸이 다 차지 않으면 false를 할당
            return (all = false);
          }
        })
      );

      // 무승부가 아니라면 바로 turn을 dispatch해주자.
      // 비동기 문제가 있어서 원래 이 CHANGE_TURN를 td에서 onClick을 달아서 했었다. 하지만 그렇게 하니까 이 useEffect 전에 dispatch가 실행이 되어서
      // 위에 있는 ===turn 부분에서 모두 false가 되었다. 그래서 승리 조건 검사를 모두 다 하고 else까지 와서, 여기서 turn을 dispatch해주면 된다.
      if (all) {
        dispatch({ type: RESET_DATA });
      } else {
        dispatch({ type: CHANGE_TURN });
      }
    }
  }, [tableData]);

  return (
    <>
      <Table
        onClickTable={onClickTable}
        tableData={tableData}
        dispatch={dispatch}
      />
      {winner && <div>{winner}님의 승리</div>}
    </>
  );
};

export default Ticktack_hooks;
