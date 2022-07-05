import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import Ball from "./Ball_class";

function getWinNumbers() {
  console.log("getWinNumbers");
  const candidate = Array(45)
    .fill()
    .map((v, i) => i + 1);
  const shuffle = [];
  while (candidate.length > 0) {
    shuffle.push(
      candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]
    );
  }
  const bonusNumber = shuffle[shuffle.length - 1];
  const getWinNumbers = shuffle.slice(0, 6).sort((a, b) => a - b);
  return [...getWinNumbers, bonusNumber];
}

// useEffect, useMemo, useCallback은 모두 인자 구성이 같다. 두 번째인자가 있고, 그 인자가 바뀌지 않는한 다시 실행되지 않는다는 특성이 있다.
// 엄밀히 말하면 useMemo와 useCallback은 두 번째 인자에 들어가는 state만이 바뀌었을 때 최신화를 해주고,
// 적지 않은 state는 예전 값을 계속 기억하고 있는다. 즉 이 두 훅스의 두 번째 인자 배열에는 까먹어야 하는, 까먹어서 계속 state를 최신화 해야 하는 state를 적어주면 된다.
// 전체적으로는 똑같다. 두 번째 인자 값이 바뀌기 전 까지 값을 기억하고 있는다. 즉 실행되지 않는다.
// useEffect처럼!

// useMemo는 첫 번째 인자로 들어가는 함수의 리턴 값을 기억하고 있는다.

// 원래 아래와 같은 코드를,
// const [winNumbers, setWinNumbers] = useState(getWinNumbers);
// 아래처럼 해주면 useMemo를 쓸 수 있다. ()=>getWinNumbers()에 대한 값을 lottoNumbers가 기억을 하고 있고
// 이 친구는 함수 컴포넌트가 재실행될 때마다 함께 실행되지 않는다. 함수 컴포넌트의 단점이 매번 함수 전체가 재실행된다는 점인데 이런 부분에서 보완하기 위해서 이런 훅스들이 생겼다.
// const lottoNumbers = useMemo(() => getWinNumbers(), []);
// const [winNumbers, setWinNumbers] = useState(lottoNumbers);

// 근데 일단 getWinNumbers를 호출하지 않으면 반복해서 실행되지는 않는데,,, 굳이 useMemo를 실행해주어야 할까?

// useCallback은 useMemo와는 다르게 함수의 반환값이 아니라 함수 자체를 기억하고 있는 훅스이다.
// 그런데 useCallback은 기억력이 너무 좋아서 state가 최신화 되어도 계속 옛날 값을 가지고 있다. 그래서 항상 useCallback에서 쓸 때는 두 번째 인자로 사용된 state를 넣어줘야 한다.
// 그래야지 최신화를 해줌.

// useEffect, useMemo, useCallback 셋 다 두 번째 인자가 굉장히 중요하다.

// useCallback이 반드시 쓰이는 경우가 있다. 바로 자식 컴포넌트에 props로 함수를 넘겨 줄 때에는 항상 useCallback을 써줘야 한다.
// 이걸 안하면 매번 새로운 함수가 생성이 되는데, 자식 컴포넌트에 매번 새로운 함수를 프롭스로 전달을 하면 자식 컴포넌트는 부모로부터 받은 프롭스가 바꼈다고 생각해서
// 항상 리렌더링을 한다. 같은 함수가 전달되는데도 말이다.

// + 훅스는 서로 간의 순서가 굉장히 중요하다. 약간 변수 호이스팅 관련해서 순서 잘 맞춰야 하는 그런 느낌.

// 이와는 별개로도 순서가 굉장히 중요하다.  훅스에서 조건문을 걸어서 특정 조건에 이런 훅이, 특정 조건에 이런 훅이 작동되게 코드를 짜면 안된다.
// 훅스는 순서대로 실행이 되는데, 조건문에 따라 훅스의 순서들이 바뀌기 때문이다. 그래서 조건문 안에는 절대 넣지 말고,
// 반복문이나 함수 안에도 되도록 넣지 말자.
// 다른 Effect 안에도 useState도 넣으면 안된다. 실행 순서가 확정적이지 않기 때문이다.
// useCallback, useMemo 모두 마찬가지다.
// 그래서 훅스들은 최상위에 작성해서 실행 순서가 항상 동일하게끔 하는 것이 좋다.

/* 
만약 useEffect에서 나는 DidMount빼고 DidUpdate만 코드가 작동되게 하고 싶다고 하면, 아래와 같은 꼼수를 쓸 수 있다.
const mounted = useRef(false)
useEffect(()=>{
    if(mounted.current){
        mounted.current = true;
    } else {
        code something
    }
}, [바뀌는 state])
*/

const Lotto_hooks = () => {
  const lottoNumbers = useMemo(() => getWinNumbers(), []);
  const [winNumbers, setWinNumbers] = useState(lottoNumbers);
  const [winBalls, setWinBalls] = useState([]);
  const [bonus, setBonus] = useState(null);
  const [redo, setRedo] = useState(false);
  const timeoutsRef = useRef([]);

  useEffect(() => {
    for (let i = 0; i < winNumbers.length - 1; i++) {
      // 이거는 timeoutsRef.current가 바뀌는게 아니라, [i]번째 요소가 바뀐다.
      timeoutsRef.current[i] = setTimeout(() => {
        setWinBalls((prevWinballs) => [...prevWinballs, winNumbers[i]]);
      }, (1 + i) * 1000);
    }
    timeoutsRef.current[6] = setTimeout(() => {
      setBonus(winNumbers[6]);
      setRedo(true);
    }, 7000);
    return () => {
      timeoutsRef.current.forEach((el) => {
        clearTimeout(el);
      });
    };
  }, [timeoutsRef.current]);

  const onClickRedo = useCallback(() => {
    console.log("onClickRedo");
    console.log(winNumbers);
    setWinNumbers(getWinNumbers());
    setWinBalls([]);
    setBonus(null);
    setRedo(false);
    // 이거는 timeoutsRef.current가 바뀌는 거다. [i]번째 요소가 바뀌는 게 아니라 timeoutsRef.current가 바뀌는 것이다.
    timeoutsRef.current = [];
  }, [winNumbers]);

  return (
    <>
      <div>당첨 숫자</div>
      <div id="결과창">
        {winBalls.map((el) => (
          <Ball key={el} number={el} />
        ))}
      </div>
      <div>보너스!</div>
      {bonus && <Ball number={bonus} />}
      {redo && <button onClick={onClickRedo}>한 번 더!</button>}
    </>
  );
};

export default Lotto_hooks;
