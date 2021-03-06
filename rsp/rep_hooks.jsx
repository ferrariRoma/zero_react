import React, { useState, useRef, useEffect, memo } from "react";

const rspCoords = {
  바위: "0",
  가위: "-142px",
  보: "-284px",
};

const scores = {
  가위: 1,
  바위: 0,
  보: -1,
};

const computerChoice = (imgCoord) => {
  return Object.entries(rspCoords).find(function (v) {
    return v[1] === imgCoord;
  })[0];
};

const Rsp_hooks = memo(() => {
  const [result, setResult] = useState("");
  const [imgCoord, setImgCoord] = useState(rspCoords.바위);
  const [score, setScore] = useState(0);
  const interval = useRef(null);

  // 이거 두 개는 어떻게 해야 할까? Hooks는 라이프 사이클이 없다. 그래도 라이프 사이클인 척은 할 수 있다.
  // useEffect를 사용하면 가능하다.
  /*   componentDidMount = () => {
    console.log("마운트 완료");
    interval.current = setInterval(changeHand, 100);
  };

  componentWillUnmount = () => {
    clearInterval(interval.current);
  }; */

  useEffect(
    () => {
      // componentDidMount, componentDidUpdate 역할(1대1 대응은 아니다.)
      interval.current = setInterval(changeHand, 100); // -> componentDidMount에 있던 코드임
      return () => {
        // componentWillUnmount역할 -> 즉 useEffect가 3개의 역할을 해준다. 그래서 헷갈리는 친구임.
        clearInterval(interval.current);
      };
    }, // 2번째 인자인 배열에 넣은 값들이 바뀔 때, useEffect가 실행된다.
    // []이걸 작성하지 않으면 처음 한 번만 렌더링 해주고 이후에는 뭐가 바뀌어도 신경 쓰지 않겠다는 뜻과 같다.(어쩌면 이게 진정한 componentDidMountㅋㅋ있으면 componentDidUpdate역할!ㅋㅋ)
    // 2번째 배열에는 꼭 useEffect를 다시 실행할 값만 넣자.
    [imgCoord]
  );

  // 재밌는 건 함수 컴포넌트는 매번 다시 실행돼야 하기 때문에, 그 특성 때문에 interval.current에 setInterval을 해주는 부분부터 Unmount역할을 한다는 return 부분까지 계속 실행된다.
  // 즉 끊임없이 인터벌이 설정됐다가 사라졌다가를 하는 것이다. 100초 간의 인터벌이 설정됐다 해제됐다를 반복하면서 인터벌 효과를 주는 셈이다.
  // imgCoord가 바뀜. useEffect감지. 렌더링 하면서 계속 새로 함수 실행. 을 무한 반복

  // class의 경우 componentDidMount나 componentDidUpdate에서 모든 state를 조건문으로 분기 처리한다.
  // 근데 useEffect는 여러번 쓸 수 있다. state마다 다른 효과를 내고 싶을 수도 있기 때문이다.

  const changeHand = () => {
    if (imgCoord === rspCoords.바위) {
      setImgCoord(rspCoords.가위);
    } else if (imgCoord === rspCoords.가위) {
      setImgCoord(rspCoords.보);
    } else if (imgCoord === rspCoords.보) {
      setImgCoord(rspCoords.바위);
    }
  };

  const onClickBtn = (choice) => () => {
    clearInterval(interval.current);
    const myScore = scores[choice];
    const cpuScore = scores[computerChoice(imgCoord)];
    const diff = myScore - cpuScore;
    if (diff === 0) {
      setResult("비겼습니다!");
    } else if ([-1, 2].includes(diff)) {
      setResult("이겼습니다");
      setScore((prevScore) => prevScore + 1);
    } else {
      setResult("졌습니다!");
      setScore((prevScore) => prevScore - 1);
    }
    setTimeout(() => {
      interval.current = setInterval(changeHand, 100);
    }, 2000);
  };

  return (
    <>
      <div
        id="computer"
        style={{
          background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`,
        }}
      ></div>
      <div>
        <button id="rock" className="btn" onClick={onClickBtn("바위")}>
          바위
        </button>
        <button id="scissor" className="btn" onClick={onClickBtn("가위")}>
          가위
        </button>
        <button id="paper" className="btn" onClick={onClickBtn("보")}>
          보
        </button>
      </div>
      <div>{result}</div>
      <div>현재 {score} 점</div>
    </>
  );
});

export default Rsp_hooks;
