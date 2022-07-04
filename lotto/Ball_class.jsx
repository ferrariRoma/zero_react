import React, { PureComponent, memo } from "react";

// 이 컴포넌트는 데이터를 나타내기 보다는 화면만 구성해주기 때문에 PureComponent로 만들어 불필요한 렌더링을 막아주자.
/* class Ball extends PureComponent {
  render() {
    const { number } = this.props;
    let background;
    if (number <= 10) {
      background = "red";
    } else if (number <= 20) {
      background = "orange";
    } else if (number <= 30) {
      background = "yellow";
    } else if (number <= 40) {
      background = "blue";
    } else {
      background = "green";
    }

    return (
      <>
        <div className="ball" style={{ background }}>
          {number}
        </div>
      </>
    );
  }
} */

// 이런 건 이렇게 데이터도 없는 컴포넌트는 Pure컴포넌트나 함수 컴포넌트로 해주는 게 간편하다. 이정도는 훅스도 필요 없으니까 함수 컴포넌트 선에서 컷
// 그리고 함수 컴포넌트에 PureComponent적용하고 싶을 땐 memo! 이렇게 컴포넌트를 다른 컴포넌트로 감싸는 것을 High order component(HOC)라고 한다.
const Ball = memo(({ number }) => {
  let background;
  if (number <= 10) {
    background = "red";
  } else if (number <= 20) {
    background = "orange";
  } else if (number <= 30) {
    background = "yellow";
  } else if (number <= 40) {
    background = "blue";
  } else {
    background = "green";
  }

  return (
    <div className="ball" style={{ background }}>
      {number}
    </div>
  );
});

export default Ball;
