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
};

export const SET_WINNER = "SET_WINNER";
export const CLICK_CELL = "CLICK_CELL";
export const CHANGE_TURN = "CHANGE_TURN";

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
      const tableData = [...state.tableData];
      tableData[action.row] = [...tableData[action.row]]; // immer라는 라이브러리로 가독성을 해결한다.
      tableData[action.row][action.cell] = state.turn;
      return {
        ...state,
        tableData,
      };
    }
    case CHANGE_TURN: {
      return {
        ...state,
        turn: state.turn === "O" ? "X" : "O",
      };
    }
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

  const onClickTable = useCallback(() => {
    dispatch({ type: SET_WINNER, winner: "O" });
  }, []);

  return (
    <>
      <Table
        onClick={onClickTable}
        tableData={state.tableData}
        dispatch={dispatch}
      />
      {state.winner && <div>{state.winner}님의 승리</div>}
    </>
  );
};

export default Ticktack_hooks;
