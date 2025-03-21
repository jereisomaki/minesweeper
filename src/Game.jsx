import { useGame } from "./context/GameContext";
import { useBoard } from "./hooks/useBoard";
import { findFreeCell, markNeighbors } from "./utils";

import Board from "./components/Board";

const Game = () => {
  const game = useGame();

  const { board, setBoard, revealedCells, columnCount, rowCount, bombCount } = useBoard(game.difficulty);

  const revealCell = (x, y) => {
    setBoard((prevBoard) => {
      let newBoard = prevBoard.map((row) => row.map((cell) => ({ ...cell })));

      const cell = newBoard[y][x];
      if (cell.isRevealed) return prevBoard;

      if (cell.isMine) {
        if (revealedCells === 0) {
          const { x: x2, y: y2 } = findFreeCell(newBoard, rowCount, columnCount);
          newBoard[y][x] = { ...newBoard[y][x], isMine: false, value: null };
          newBoard[y2][x2] = { ...newBoard[y2][x2], isMine: true };
        } else {
          handleGameOver();
          return prevBoard;
        }
      }

      if (cell.value === null) newBoard = markNeighbors(newBoard, x, y);

      newBoard[y][x] = { ...newBoard[y][x], isRevealed: true };
      game.incrementClicks();

      checkForWin(newBoard);
      return newBoard;
    });
  };

  const flagCell = (x, y, value) => {
    setBoard((prevBoard) => {
      const newBoard = prevBoard.map((row) => row.map((cell) => ({ ...cell })));
      newBoard[y][x] = { ...newBoard[y][x], isFlagged: value };
      return newBoard;
    });
  };

  const checkForWin = (b) => {
    const revealedNonBombCells = b.reduce((acc, row) => acc + row.filter((c) => !c.isMine && c.isRevealed).length, 0);
    if (revealedNonBombCells === rowCount * columnCount - bombCount) game.setIsGameWon(true);
  };

  const handleGameOver = () => game.setIsGameLost(true);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columnCount}, 1fr)`,
        gridTemplateRows: `repeat(${rowCount}, 1fr)`,
      }}
    >
      <Board board={board} game={game} revealCell={revealCell} flagCell={flagCell} />
    </div>
  );
};

export default Game;
