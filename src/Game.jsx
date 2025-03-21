import { useEffect } from "react";
import { useGame } from "./context/GameContext";
import { findFreeCell, markNeighbors } from "./utils";
import { useBoard } from "./hooks/useBoard";

import Cell from "./components/Cell";

const Game = () => {
  const game = useGame();

  const { board, setBoard, resetBoard, revealedCells, columnCount, rowCount, bombCount } = useBoard(game.difficulty);

  useEffect(() => {
    resetBoard();
  }, [game.difficulty]);

  const handleGameOver = () => {
    game.setIsGameLost(true);
  };

  const checkForWin = (b) => {
    const revealedNonBombCells = b.reduce((acc, row) => acc + row.filter((c) => !c.isMine && c.isRevealed).length, 0);
    if (revealedNonBombCells === rowCount * columnCount - bombCount) game.setIsGameWon(true);
  };

  const revealCell = (x, y) => {
    let newBoard = board.map((row) => [...row]);

    const cell = newBoard[y][x];
    if (cell.isRevealed) return;

    if (cell.isMine) {
      if (revealedCells === 0) {
        const { x: x2, y: y2 } = findFreeCell(newBoard, rowCount, columnCount);
        newBoard[y][x].isMine = false;
        newBoard[y][x].value = null;
        newBoard[y2][x2].isMine = true;
      } else {
        handleGameOver();
        return;
      }
    }

    if (cell.value === null) newBoard = markNeighbors(newBoard, x, y);

    newBoard[y][x].isRevealed = true;
    game.incrementClicks();

    setBoard(newBoard);
    checkForWin(newBoard);
  };

  const flagCell = (x, y, value) => {
    const newBoard = board.map((row) => [...row]);
    newBoard[y][x].isFlagged = value;
    setBoard(newBoard);
  };

  return (
    <div
      className="grid justify-self-start gap-0 border-2 border-neutral-600"
      style={{
        gridTemplateColumns: `repeat(${columnCount}, 1fr)`,
        gridTemplateRows: `repeat(${rowCount}, 1fr)`, // Set the number of rows explicitly
      }}
    >
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <Cell
            key={`${rowIndex}-${colIndex}`}
            cell={cell}
            game={game}
            onClick={(x, y) => revealCell(x, y)}
            onRightClick={(x, y, value) => flagCell(x, y, value)}
          />
        ))
      )}
    </div>
  );
};

export default Game;
