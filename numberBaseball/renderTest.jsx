import React, { Component, PureComponent } from "react";

class Test extends PureComponent {
  state = {
    counter: 0,
  };

  // react가 렌더링과 관련 돼서는 멍청한 부분이 있다.
  // 그래서 아래와 같이 개발자가 직접 렌더링 조건을 적어주면 불필요한 렌더링을 막을 수 있다.
  // shouldComponentUpdate를 대신해서는 PureComponent가 있다. 이건 shouldComponentUpdate를 알아서 구현한 컴포넌트라고 할 수 있다.
  // PureComponent는 state들이 바뀌었는지 아닌지를 확인하고 판단을 한다.(shouldComponentUpdate는 커스터마이징을 할 수 있다는 점이 좋다.)
  // 이것의 단점은 객체나 배열, 즉 참조관계가 있는 구조가 생기면 PureComponent도 어려워 한다.
  // 그래서 앞전에 배열이나 객체를 할 때는 [...prevState, newState]를 해서 새로운 참조관계를 만들라고 했던 것이다.
  // 그래야 PureComponent가 알아차린다.
  // state에 객체 구조를 안 쓰는게 좋다고 한다. 배열 안에 객체 안에 배열.. 이런 복잡한 자료구조 역시 PureComponent가 알아차리기 힘들어 하니까 최대한 간단한 것만 쓰는 것이 좋다.
  // 그리고 state, props 가 바뀌는 것 뿐만 아니라 부모 컴포넌트가 바뀌면 자식 컴포넌트는 리렌더링 된다.
  // Try는 바뀐 것도 없는데도 리렌더링 되야 된다. 역시 여기도 PureComponent를 써도 된다.
  // state가 달라졌을 때 뿐만 아니라 props가 달라졌을 때 리렌더링 될 수 있게 해준다.
  // 근데 PureComponent는 class컴포넌트에서 사용되는건데, 우리는 이미 함수컴포넌트로 다 바꿨다.
  // 이런 경우에서는 어떻게 할까? React에 memo라는 컴포넌트가 있다. 이걸로 감싸주면 된다.
  // memo는 state,porps가 바뀌었을 때, 부모컴포넌트가 리렌더링 됐을 때 리렌더링이 되는데
  // Memo는 부모 컴포넌트가 리렌더링 됐을 때 같이 리렌더링 되는 것을 막아준다.
  // 근데 이렇게 하면 c_ try 등으로 이름이 이상하게 데브툴에 찍히는 걸 볼 수 있는데,
  // 이걸 위해서 다시 Try.displayName ="Try"; 라고 해주면 다시 잘 나온다.
  //   shouldComponentUpdate(nextProps, nextState, nextContext) {
  //     if (this.state.counter !== nextState.counter) {
  //       return true;
  //     }
  //     return false;
  //   }

  onClick = () => {
    // counter가 바뀌지도 않았지만 setState가 호출이 되면 렌더링이 다시 된다.
    this.setState({});
  };

  render() {
    console.log("렌더링", this.state);
    return (
      <div>
        <button onClick={this.onClick}>클릭</button>
      </div>
    );
  }
}

export default Test;
