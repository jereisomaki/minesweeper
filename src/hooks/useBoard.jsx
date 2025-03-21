import { useState, useEffect } from "react";
import { gameSettings } from "../utils";
import { useGame } from "../context/GameContext";

export const createBoard = (grid, difficulty) => {
  const { ROW_COUNT, COLUMN_COUNT, BOMB_COUNT } = gameSettings(difficulty);
  for (let i = 0; i < ROW_COUNT; i++) {
    const c = [];
    for (let j = 0; j < COLUMN_COUNT; j++) {
      c.push({ x: j, y: i, value: null, isMine: false, isRevealed: false, isFlagged: false });
    }
    grid.push(c);
  }

  const availablePositions = [];
  for (let y = 0; y < ROW_COUNT; y++) {
    for (let x = 0; x < COLUMN_COUNT; x++) {
      availablePositions.push({ x, y });
    }
  }

  for (let i = availablePositions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [availablePositions[i], availablePositions[j]] = [availablePositions[j], availablePositions[i]];
  }

  for (let i = 0; i < BOMB_COUNT; i++) {
    const { x, y } = availablePositions[i];
    grid[y][x].isMine = true;
  }

  return grid;
};

export const useBoard = () => {
  const { difficulty, restart } = useGame();

  const { ROW_COUNT, COLUMN_COUNT, BOMB_COUNT } = gameSettings(difficulty);
  const [board, setBoard] = useState(createBoard([], difficulty));

  const revealedCells = board.reduce((acc, row) => acc + row.filter((cell) => cell.isRevealed).length, 0);

  const resetBoard = () => {
    setBoard(createBoard([], difficulty));
  };

  useEffect(() => resetBoard(), [restart]);

  return {
    board,
    setBoard,
    revealedCells,
    resetBoard,
    rowCount: ROW_COUNT,
    columnCount: COLUMN_COUNT,
    bombCount: BOMB_COUNT,
  };
};
