import React, { Component } from "react";

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

class Rsp_class extends Component {
  state = {
    result: "",
    imgCoord: rspCoords.바위,
    score: 0,
  };

  // 지난 시간에 배운 shouldComponentUpdate와 비슷한 componentDidMount()가 있다.
  // componentDidMount는 렌더가 처음 실행되고 그게 성공적이라면 componentDidMount가 실행된다.
  // 하지만 최초 렌더링 때만 되고 그 다음 setState로 인한 렌더링 때는 실행되지 않는다.
  // 반대로 컴포넌트가 제거되기 직전에는 componentWillUnmount()를 사용한다.
  // setState를 쓰고 싶은데 어디서 써야 할지 모르겠다 할 때 여기로 오면 된다고 하심 ㅋㅋ

  // 또 하나가 있는데 componentDidUpdate()이다. 앞에 두 메소드가 컴포넌트가 첫 번째 렌더링에서 작동을 했다면,
  // 이건 리렌더링된 후 실행되는 메소드이다.
  // 마지막으로 부모 컴포넌트가 자식 컴포넌트를 삭제할 수 있는데, 그때는 WillUnmount가 실행되는 것이다.

  // 이렇게 메소들 세 개를 소개했는데 이것이 바로 컴포넌트 라이프 사이클이다. 정리하면 아래와 같다.

  // class의 경우 -> constructor부분이 실행(state나 메소드 부분이 class에 바인딩) -> 첫 render() -> 혹시 ref있으면 ref설정 -> 이후 componentDidMount실행
  // setState/props 바뀔 때 -> shouldComponentUpdate(true면 이후까지, false면 여기서 끝) -> render -> componentDidUpdate
  // 부모가 나를 없앴을 때 -> componentWillUnmount -> "소멸"

  // componentDidMount에 비동기 요청을 많이 한다.
  // componentWillUnmount에 비동기 요청 정리를 많이 한다.

  // 몇 초 마다 setInterval이 반복작업을 해주는데 컴포넌트가 사라진다면 setInterval을 아무도 취소시켜주지 못한다.
  // 사라지지 않은 상태에서 만약 Rsp가 한 번 더 실행되면 setInterval 2개가 돌아가는 것이다.
  // 그래서 componentWillUnmount에서는 비동기 요청을 반드시 정리해주어야 한다.
  // 이런 라이프 사이클과 interval의 특수성 때문에 componentWillMount와 componentWillUnmount는 짝을 이루어 사용한다고 생각하면 까먹지 않는다.

  interval;

  changeHand = () => {
    const { imgCoord } = this.state; // 이걸 밖에 두면 망한다. 비동기에서 외부 변수를 참조하면 클로저 문제가 발생!!!
    if (imgCoord === rspCoords.바위) {
      this.setState({
        imgCoord: rspCoords.가위,
      });
    } else if (imgCoord === rspCoords.가위) {
      this.setState({
        imgCoord: rspCoords.보,
      });
    } else if (imgCoord === rspCoords.보) {
      this.setState({
        imgCoord: rspCoords.바위,
      });
    }
  };

  componentDidMount = () => {
    console.log("마운트 완료");
    this.interval = setInterval(this.changeHand, 100);
  };

  componentWillUnmount = () => {
    clearInterval(this.interval);
  };

  // ()=>()=>{} 이렇게 되는 것은 리액트에서 자주 있는 형태이다.
  //   <button id="rock" className="btn" onClick={()=>this.onClickBtn("바위")}>
  //      바위
  //   </button>
  // 이렇게 해줘야 버튼이 자동으로 눌리지 않는데, onClick에 있는 저 ()=> 화살표 함수 하나를 메소드 쪽에 대신 붙여준 형태이다.
  // 이런게 고차 함수라고 하는 것이다.
  onClickBtn = (choice) => () => {
    const { imgCoord } = this.state;
    clearInterval(this.interval);

    const myScore = scores[choice];
    const cpuScore = scores[computerChoice(imgCoord)];
    const diff = myScore - cpuScore;
    if (diff === 0) {
      this.setState({
        result: "비겼습니다!",
      });
    } else if ([-1, 2].includes(diff)) {
      this.setState((prevState) => {
        return {
          result: "이겼습니다.",
          score: prevState.score + 1,
        };
      });
    } else {
      this.setState((prevState) => {
        return {
          result: "졌습니다!",
          score: prevState.score - 1,
        };
      });
    }
    setTimeout(() => {
      this.interval = setInterval(this.changeHand, 100);
    }, 2000);
  };

  // render함수가 실행되면 리액트가 jsx를 DOM에 붙여주는데, 그 순간에 특정한 동작을 하게 할 수 있다.
  render() {
    const { result, score, imgCoord } = this.state;
    return (
      <>
        <div
          id="computer"
          style={{
            background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`,
          }}
        ></div>
        <div>
          <button id="rock" className="btn" onClick={this.onClickBtn("바위")}>
            바위
          </button>
          <button
            id="scissor"
            className="btn"
            onClick={this.onClickBtn("가위")}
          >
            가위
          </button>
          <button id="paper" className="btn" onClick={this.onClickBtn("보")}>
            보
          </button>
        </div>
        <div>{result}</div>
        <div>현재 {score} 점</div>
      </>
    );
  }
}

export default Rsp_class;
