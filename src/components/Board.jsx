import Cell from "./Cell";

const Board = ({ board, game, revealCell, flagCell }) => (
  <>
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
  </>
);

export default Board;
