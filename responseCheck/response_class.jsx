import React, { Component } from "react";

class ResponseCheck_class extends Component {
  state = {
    state: "waiting",
    message: "클릭해서 시작하세요!",
    result: [],
  };

  // state안에 넣으면 렌더링이 되는데 그게 싫은 친구들은 여기 this에 선언해주면 된다.
  timeout;
  startTime;
  endTime;

  onClickScreen = () => {
    // 앞으로는 클래스를 쓰더라도 메소드 안에서 구조분해를 미리 다 해두자. 그러면 훨씬 깔끔하다.
    const { state, message, result } = this.state;
    if (state === "waiting") {
      this.setState({
        state: "ready",
        message: "초록색이 되면 클릭하세요.",
      });
      this.timeout = setTimeout(() => {
        this.setState({
          state: "now",
          message: "지금 클릭 하세요",
        });
        this.startTime = new Date();
      }, Math.floor(Math.random() * 1000) + 2000);
    } else if (state === "ready") {
      // 성급하게 클릭
      this.setState({
        state: "waiting",
        message:
          "이런 성급하시군요! 초록색이 된 후에 클릭하세요! 다시 눌러주세요.",
      });
      // 빈 값인 timeout변수를 this에 선언을 한 이후에 그곳에 setTimeout객체를 넣고
      // 중간에 취소할 떈 clearTimeout을 해주면 된다.
      clearTimeout(this.timeout);
    } else if (state === "now") {
      // 반응속도 체크
      this.endTime = new Date();
      this.setState((prevState) => {
        return {
          state: "waiting",
          message: "클릭해서 시작하세요",
          result: [...prevState.result, this.endTime - this.startTime],
        };
      });
    }
  };

  renderAverage = () => {
    const { result } = this.state;
    return result.length === 0 ? null : (
      <div>
        평균시간 : {result.reduce((a, el) => a + el) / this.state.result.length}
      </div>
    );
  };

  render() {
    // render의 return 안에서는 for이나 if를 못 쓴다. 그래서 조건부 연산자로 표현해준다.
    // false, undefined, null은 jsx에서 태그없음을 의미한다.
    return (
      <>
        <div
          id="screen"
          className={this.state.state}
          onClick={this.onClickScreen}
        >
          {this.state.message}
        </div>
        {this.renderAverage()}
      </>
    );
  }
}

export default ResponseCheck_class;
