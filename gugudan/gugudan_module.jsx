import React from "react";
import { useState, useRef } from "react";

const GuGuDan = () => {
  const [first, setFirst] = useState(Math.ceil(Math.random() * 9));
  const [second, setSecond] = useState(Math.ceil(Math.random() * 9));
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");
  const inputRef = useRef(null);

  const onChangeInput = (e) => {
    setValue(e.target.value);
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    if (first * second === Number(value)) {
      setResult((prevResult) => {
        return `${first} 곱하기 ${second} = ${value} 정답!`;
      });
      setFirst(Math.ceil(Math.random() * 9));
      setSecond(Math.ceil(Math.random() * 9));
      setValue("");
      inputRef.current.focus();
    } else {
      setResult(`땡!`);
      setValue("");
    }
  };

  return (
    <React.Fragment>
      <div>
        {first} 곱하기 {second} ?
      </div>
      <form onSubmit={onSubmitForm}>
        <input
          type="nubmer"
          onChange={onChangeInput}
          value={value}
          ref={inputRef}
        />
        <button type="submit">입력</button>
      </form>
      <div>{result}</div>
    </React.Fragment>
  );
};

export default GuGuDan;
// export const ㅇㅇㅇ
// module.exports = GuGuDan;
