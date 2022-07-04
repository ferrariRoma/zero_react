import React, { useState, useRef } from "react";

const ResponseCheck_hooks = () => {
  const [state, setState] = useState("waiting");
  const [message, setMessage] = useState("클릭해서 시작하세요!");
  const [result, setResult] = useState([]);
  // hooks에서는 ref가 추가적인 기능을 하나 더 가지는데, 바로 this의 속성들을 ref로 표현하는 것이다.
  // 대신에 Ref는 안에 current가 들어있기 때문에 timeout.current로 호출해야 한다.
  // 그럼 DOM에 접근한다는 거 빼고 state와 ref의 차이는 뭘까? setState는 return부분이 다시 실행되지만
  // useRef값을 바꿀 때는 return부분이 실행되지 않는다. 불필요한 렌더링을 막는 것이 리액트에서는 중요한데,
  // 값이 바뀌어도 다시 렌더링을 하지 않아도 되는 부분, 화면에 영향을 미치고 싶지 않은 부분은 ref를 써주면 된다.
  const timeout = useRef(null);
  const startTime = useRef(0);
  const endTime = useRef(0);
  // state안에 넣으면 렌더링이 되는데 그게 싫은 친구들은 여기 this에 선언해주면 된다.

  const onClickScreen = () => {
    // 앞으로는 클래스를 쓰더라도 메소드 안에서 구조분해를 미리 다 해두자. 그러면 훨씬 깔끔하다.
    if (state === "waiting") {
      setState("ready");
      setMessage("초록색이 되면 클릭하세요.");
      timeout.current = setTimeout(() => {
        setState("now");
        setMessage("지금 클릭 하세요");
        startTime.current = new Date();
      }, Math.floor(Math.random() * 1000) + 2000);
    } else if (state === "ready") {
      // 성급하게 클릭
      setState("waiting");
      setMessage(
        "이런 성급하시군요! 초록색이 된 후에 클릭하세요! 다시 눌러주세요."
      );
      // 빈 값인 timeout변수를 this에 선언을 한 이후에 그곳에 setTimeout객체를 넣고
      // 중간에 취소할 떈 clearTimeout을 해주면 된다.
      clearTimeout(timeout.current);
    } else if (state === "now") {
      // 반응속도 체크
      endTime.current = new Date();

      setState("waiting");
      setMessage("클릭해서 시작하세요");
      setResult((prevResult) => [
        ...prevResult,
        endTime.current - startTime.current,
      ]);
    }
  };

  const onClickBtn = () => {
    setResult([]);
  };

  const renderAverage = () => {
    return result.length === 0 ? null : (
      <>
        <div>평균시간 : {result.reduce((a, el) => a + el) / result.length}</div>
        <button onClick={onClickBtn}>Reset</button>
      </>
    );
  };

  // render의 return 안에서는 for이나 if를 못 쓴다. 쓰면 상당히 지저분해진다. {여기에는} js를 쓸 수 있는데, 그렇게 해서도 함수 안에 if나 for을 쓰는데,
  // 이후에도 그 함수를 즉시 실행 함수로 만들어 줘야 된다. 함수 안에 if, for을 쓸 수 있는 것을 활용하는 방법인데, 상당히 복잡하다.
  // 그래서 조건부 연산자로 표현해주고, map메소드를 사용한다. false, undefined, null은 jsx에서 태그없음을 의미한다.
  return (
    <>
      <div id="screen" className={state} onClick={onClickScreen}>
        {message}
      </div>
      {renderAverage()}
    </>
  );
};

export default ResponseCheck_hooks;
