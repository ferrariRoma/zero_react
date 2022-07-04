import React, { useState, useRef } from "react";
import Try_hooks from "./try_hooks";

// 숫자 네 개를 겹치지 않게 랜덤하게 뽑는 함수
function getNumbers() {
  const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];
  for (let i = 0; i < 4; i++) {
    const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }
  return array;
}

const NumberBaseball_hooks = () => {
  const [result, setResult] = useState("");
  const [value, setValue] = useState("");
  const [answer, setAnswer] = useState(getNumbers); // lazy init
  const [tries, setTries] = useState([]);

  const onChangeInput = (e) => {
    setValue(e.target.value);
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    // 맞췄을 때
    if (value === answer.join("")) {
      // 옛날 state로 현재 state를 만들 때는 함수형 setState를 써야 문제가 안생긴다.
      setResult({
        result: "홈런!",
      });
      setTries((prevTries) => {
        return [...prevTries, { try: value, result: "홈런!" }];
      });
      setValue("");
      setAnswer(getNumbers());
      setTries([]);
      alert("게임을 다시 시작합니다.");
    } else {
      const answerArray = value.split("").map((el) => parseInt(el));
      let strike = 0;
      let ball = 0;
      // 9번 이상 도전했을 때 끝
      if (tries.length >= 9) {
        setResult(`10번 넘게 돌려서 실패! 답은 ${answer.join(",")}`);
        alert("게임을 다시 시작합니다.");
        setValue("");
        setAnswer(getNumbers());
        setTries([]);
      } else {
        // 9번 시도 전에는 숫자가 맞으면 스트라이크, 숫자는 맞췄지만 자릿수는 틀리면 볼
        for (let i = 0; i < 4; i++) {
          if (answerArray[i] === answer[i]) {
            strike += 1;
          } else if (answer.includes(answerArray[i])) {
            ball += 1;
          }
        }
        setTries((prevTries) => {
          return [
            ...prevTries,
            {
              try: value,
              result: `${strike} 스트라이크, ${ball} 볼입니다`,
            },
          ];
        });
        setValue("");
      }
    }
  };

  return (
    <>
      <h1>{result}</h1>
      <form onSubmit={onSubmitForm}>
        <input maxLength={4} value={value} onChange={onChangeInput} />
      </form>
      <div>시도: {tries.length}</div>
      <ul>
        {tries.map((el, i) => {
          return (
            <>
              <Try_hooks key={el.try + el.result} el={el} />
            </>
          );
        })}
      </ul>
    </>
  );
};

export default NumberBaseball_hooks;
