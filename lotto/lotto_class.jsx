import React, { Component } from "react";
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

class Lotto_class extends Component {
  state = {
    winNumbers: getWinNumbers(),
    winBalls: [],
    bonus: null,
    redo: false,
  };

  timeouts = [];

  runTimeouts = () => {
    const { winNumbers } = this.state;
    // ES6 오면서 비동기에서는 원래 밖의 변수를 가져다 쓰면 클로저 문제가 생기는데,
    // 반복문의 let i처럼 Let을 쓰면 클로저 문제가 안생긴다.
    for (let i = 0; i < winNumbers.length - 1; i++) {
      this.timeouts[i] = setTimeout(() => {
        this.setState((prevState) => {
          // 배열에 push는 리액트에서 금지!
          return { winBalls: [...prevState.winBalls, winNumbers[i]] };
        });
      }, (i + 1) * 1000);
    }
    setTimeout(() => {
      this.timeouts[6] = this.setState({
        bonus: winNumbers[6],
        redo: true,
      });
    }, 7000);
  };

  componentDidMount() {
    this.runTimeouts();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.winBalls.length === 0) {
      this.runTimeouts();
    }
  }

  componentWillUnmount() {
    this.timeouts.forEach((el) => {
      clearTimeout(el);
    });
  }

  onClickRedo = () => {
    this.setState({
      winNumbers: getWinNumbers(),
      winBalls: [],
      bonus: null,
      redo: false,
    });
    this.timeouts = [];
  };

  render() {
    const { winBalls, bonus, redo } = this.state;
    return (
      <>
        <div>당첨 숫자</div>
        <div id="결과창">
          {/* 이전에도 반복문을 기점으로 Component를 나눈다고 설명을 한 적이 있었다. 반복문을 기점으로 자식 컴포넌트로 분리하고 props로 전달하는 좋은 기점이기 때문이다. */}
          {winBalls.map((el) => (
            <Ball key={el} number={el} />
          ))}
        </div>
        <div>보너스!</div>
        {bonus && <Ball number={bonus} />}
        {redo && <button onClick={this.onClickRedo}>한 번 더!</button>}
      </>
    );
  }
}

export default Lotto_class;
