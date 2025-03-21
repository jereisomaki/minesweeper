import { useState, useEffect } from "react";
import { useGame } from "../context/GameContext";

export const useTimer = () => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  const { restart, difficulty, isGameLost, isGameWon } = useGame();

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    if (isGameLost || isGameWon) setIsRunning(false);
  }, [isGameLost, isGameWon]);

  useEffect(() => {
    reset();
  }, [restart, difficulty]);

  const reset = () => {
    setSeconds(0);
    setIsRunning(true);
  };

  return { seconds, setIsRunning };
};
