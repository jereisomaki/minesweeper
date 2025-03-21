import { useGame } from "../context/GameContext";

import Timer from "./Timer";
import Select from "./Select";
import Button from "./Button";

const difficulties = [
  { label: "Easy", value: "easy" },
  { label: "Medium", value: "medium" },
  { label: "Hard", value: "hard" },
];

const Header = () => {
  const { setDifficulty, newGame } = useGame();

  return (
    <div className="flex flex-row justify-between items-center bg-neutral-400 border-2 border-neutral-600 p-2">
      <Timer />
      <div className="flex items-center gap-2">
        <Select title="Difficulty" items={difficulties} onChange={(value) => setDifficulty(value)} />
        <Button onClick={newGame}>New Game</Button>
      </div>
    </div>
  );
};

export default Header;
