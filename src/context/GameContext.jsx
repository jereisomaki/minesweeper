import { createContext, useState, useEffect, useContext } from "react";

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [isGameWon, setIsGameWon] = useState(false);
  const [isGameLost, setIsGameLost] = useState(false);
  const [totalClicks, setTotalClicks] = useState(0);
  const [lastClick, setLastClick] = useState({ x: -1, y: -1 });
  const [difficulty, setDifficulty] = useState("easy");

  const [restart, setRestart] = useState(0);

  const resetGame = () => {
    setIsGameLost(false);
    setIsGameWon(false);
    setLastClick({ x: -1, y: -1 });
    setTotalClicks(0);
  };

  const newGame = () => {
    setRestart((prev) => prev + 1);
    resetGame();
  };

  useEffect(() => resetGame(), [difficulty, restart]);

  const incrementClicks = () => setTotalClicks((prev) => prev + 1);

  const values = {
    resetGame,
    isGameWon,
    setIsGameWon,
    isGameLost,
    setIsGameLost,
    lastClick,
    setLastClick,
    totalClicks,
    incrementClicks,
    difficulty,
    setDifficulty,
    newGame,
    restart,
  };

  return <GameContext.Provider value={values}>{children}</GameContext.Provider>;
};

export const useGame = () => useContext(GameContext);
