export const gameSettings = (difficulty) => {
  switch (difficulty) {
    case "easy":
      return { ROW_COUNT: 10, COLUMN_COUNT: 10, BOMB_COUNT: 10 };
    case "medium":
      return { ROW_COUNT: 12, COLUMN_COUNT: 12, BOMB_COUNT: 30 };
    case "hard":
      return { ROW_COUNT: 18, COLUMN_COUNT: 18, BOMB_COUNT: 60 };
    default:
      break;
  }
};

export const formatTime = (time) => {
  const minutes = Math.floor(time / 60)
    .toString()
    .padStart(2, "0");
  const secs = (time % 60).toString().padStart(2, "0");
  return `${minutes}:${secs}`;
};

export const findFreeCell = (board, rowCount, colCount) => {
  for (let i = 0; i < rowCount; i++) {
    for (let j = 0; j < colCount; j++) {
      if (!board[i][j].isMine) {
        return { x: j, y: i };
      }
    }
  }
};

export const markNeighbors = (board, x, y) => {
  let newBoard = board.map((row) => row.map((cell) => ({ ...cell })));

  const revealEmptyCells = (bx, by) => {
    if (!newBoard[by]?.[bx] || newBoard[by]?.[bx].isRevealed) return;

    let mineCount = 0;

    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (newBoard[by + i]?.[bx + j]?.isMine) {
          mineCount++;
        }
      }
    }

    newBoard[by][bx].isRevealed = true;
    newBoard[by][bx].value = mineCount === 0 ? null : mineCount;

    if (mineCount === 0) {
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (i !== 0 || j !== 0) {
            revealEmptyCells(bx + j, by + i);
          }
        }
      }
    }
  };

  if (!newBoard[y][x].isRevealed) {
    revealEmptyCells(x, y);
  }

  return newBoard;
};
