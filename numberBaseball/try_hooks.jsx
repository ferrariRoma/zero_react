import React, { memo, useState } from "react";

const Try_hooks = memo(({ el }) => {
  // 자식이 부모로부터 받은 props를 바꿀 수 없다. 부모가 바꿔줘야 한다.
  // 하지만 실무에서는 바꿔줘야 할 때가 있다.
  // 그럴 떄는 아래와 같이 props를 state에 넣어주면 된다. 하지만 분명히 좋은 구조라고는 할 수 없다.
  const [result, setResult] = useState(el.result);
  /* 
  state = {
    result: this.props.result,
    try: this.props.try,
  }
  */
  /*
  // constructor도 안쓰이는게 아니다. 함수setState, 함수Ref 처럼 constructor도 정밀한 컨트롤이 필요할 땐 여전히 쓰인다.
 constructor(props){
  super(props),
  this.state = {
    result: this.props.result,
    try: this.props.try,
  }
 }
 */

  // 자식에서 직접적으로 props를 바꾸면 안되는데 그래서 부모로부터 받은 걸 State로 만들어서 바꿔줘야 한다.
  // props를 바꾸면 안되는게 부모의 props도 바뀌기 떄문이다. 그렇게 되면 부모도 의도치 않게 바껴버린다.
  // 이런게 문제가 되기 떄문에 진짜 Props를 바꿔야 되면 state로 바꿔서 바꾼다.

  const onClickB = () => {
    setResult("1");
  };
  return (
    <>
      <li>
        <b onClick={onClickB}>{el.try}</b> {result}
      </li>
    </>
  );
});
Try_hooks.displayName = "Try";
export default Try_hooks;
