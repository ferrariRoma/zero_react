import React, { Component } from "react";
import Try from "./try";

// 숫자 네 개를 겹치지 않게 랜덤하게 뽑는 함수
function getNumbers() {}

class NumberBaseball extends Component {
  state = {
    result: "",
    value: "",
    answer: getNumbers(),
    tries: [],
  };

  onChangeInput() {}

  onSubmitForm() {}

  alpha = [
    { eng: "a", kor: "에이" },
    { eng: "b", kor: "비" },
    { eng: "e", kor: "이" },
    { eng: "d", kor: "디" },
  ];

  render() {
    return (
      <>
        <h1>{this.state.result}</h1>
        <form onSubmit={this.onSubmitForm}>
          <input
            maxLength={4}
            value={this.state.value}
            onChange={this.onChangeInput}
          />
        </form>
        <div>시도: {this.state.tries.length}</div>
        <ul>
          {this.alpha.map((el) => {
            return <Try key={el.eng} value={el} />;
          })}
        </ul>
      </>
    );
  }
}

export default NumberBaseball;
