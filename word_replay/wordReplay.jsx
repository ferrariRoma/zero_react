import React from "react";
import { useState, useRef } from "react";
import { render } from "react-dom";

const WordReplay = () => {
  const [word, setWord] = useState("제로초");
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");
  const onRefInput = useRef(null);

  const onChangeInput = (e) => {
    return setValue(e.target.value);
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    if (word[word.length - 1] === value[0]) {
      setWord(value);
      setValue("");
      setResult(`${word}에서 ${value}로 성공!`);
      onRefInput.current.focus();
    } else {
      setValue("");
      setResult(`${word}에서 ${value}? 땡!!`);
      onRefInput.current.focus();
    }
  };

  return (
    <>
      <div>{word}</div>
      <form onSubmit={onSubmitForm}>
        <input
          type="text"
          onChange={onChangeInput}
          ref={onRefInput}
          value={value}
        />
        <button type="submit">제출</button>
      </form>
      <div>{result}</div>
    </>
  );
};

export default WordReplay;
/* 
컨트롤드 인풋, 언컨트롤드 인풋
onSubmit에서만 input을 쓰는 경우에는 value나 onChange을 안해줘도 됨
e.target.children.word

근데 그냥 컨트롤드 인풋만 써도 된다.
*/
