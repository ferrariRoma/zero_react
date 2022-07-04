import { useRef, useEffect } from "react";

/* 
const [isRunning, setIsRunning] = useState(true);
useInterval(()=>{
    console.log("hello");
}, isRunning ? 1000 : null);
이렇게 해주면 더 우아하게 쓸 수 있다.
*/

function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);

  return savedCallback.current;
}

export default useInterval;
