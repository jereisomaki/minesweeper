import { useTimer } from "../hooks/useTimer";
import { formatTime } from "../utils";

const Timer = () => {
  const { seconds } = useTimer();

  return (
    <div className=" px-1 font-mono text-black text-xl">
      <span>Time: {formatTime(seconds)}</span>
    </div>
  );
};

export default Timer;
