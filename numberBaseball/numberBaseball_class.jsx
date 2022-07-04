import React, { Component, createRef } from "react";
import Try from "./try_class";

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

class NumberBaseball extends Component {
  state = {
    result: "",
    value: "",
    answer: getNumbers(),
    tries: [],
  };

  onChangeInput = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  onSubmitForm = (e) => {
    e.preventDefault();
    // 맞췄을 때
    if (this.state.value === this.state.answer.join("")) {
      this.setState({
        result: "홈런!",
        tries: [
          ...this.state.tries,
          { try: this.state.value, result: "홈런!" },
        ],
      });
      alert("게임을 다시 시작합니다.");
      this.setState({
        value: "",
        answer: getNumbers(),
        tries: [],
      });
    } else {
      const answerArray = this.state.value.split("").map((el) => parseInt(el));
      let strike = 0;
      let ball = 0;
      // 9번 이상 도전했을 때 끝
      if (this.state.tries.length >= 9) {
        this.setState({
          result: `10번 넘게 돌려서 실패! 답은 ${this.state.answer.join(
            ","
          )}} 였습니다!`,
        });
        alert("게임을 다시 시작합니다.");
        this.setState({
          value: "",
          answer: getNumbers(),
          tries: [],
        });
      } else {
        // 9번 시도 전에는 숫자가 맞으면 스트라이크, 숫자는 맞췄지만 자릿수는 틀리면 볼
        for (let i = 0; i < 4; i++) {
          if (answerArray[i] === this.state.answer[i]) {
            strike += 1;
          } else if (this.state.answer.includes(answerArray[i])) {
            ball += 1;
          }
        }
        this.setState({
          tries: [
            ...this.state.tries,
            {
              try: this.state.value,
              result: `${strike} 스트라이크, ${ball} 볼입니다`,
            },
          ],
          value: "",
        });
        this.inputRef.current.focus();
      }
    }
  };

  inputRef = createRef();
  // inputRef; // 원래는 이렇게 변수를 선언해주고 해당 태그에 가서 (e)=>this.inputRef = e; 이렇게 해줘야 되는데,
  // createRef쓰면 그냥 이렇게 해서 ref = {this.createRef}를 하면 끝이다.
  // 대신 createRef를 쓰면 훅스처럼 this.inputRef.current.focus()로 써줘야 해서 current를 하나 더 써줘야 한다.

  render() {
    return (
      <>
        <h1>{this.state.result}</h1>
        <form onSubmit={this.onSubmitForm}>
          <input
            ref={this.inputRef}
            maxLength={4}
            value={this.state.value}
            onChange={this.onChangeInput}
          />
        </form>
        <div>시도: {this.state.tries.length}</div>
        <ul>
          {this.state.tries.map((el, i) => {
            return (
              <>
                <Try key={el.try} el={el} />
              </>
            );
          })}
        </ul>
      </>
    );
  }
}

export default NumberBaseball;
