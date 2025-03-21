const CellContent = ({ cell, isGameLost, isGameWon }) => {
  const { isFlagged, isRevealed, isMine, value } = cell;

  const valueColors = { 1: "#0a0dc9", 2: "#1dc90a", 3: "#c90a0a" };
  const textColor = typeof value === "number" ? valueColors[value] || "#000000" : null;

  const getCellContent = () => {
    if (isFlagged) return "🚩";
    if (isRevealed) return value;
    if (isGameWon && isMine) return "🚩";
    if (isGameLost && isMine) return "💣";
    return null;
  };

  return (
    <span
      className="text-xl font-bold pointer-events-none select-none [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]"
      style={{ color: textColor }}
    >
      {getCellContent()}
    </span>
  );
};

const Cell = ({ cell, game, onClick, onRightClick }) => {
  const { x, y, isMine, isRevealed, isFlagged } = cell;
  const { isGameWon, isGameLost, lastClick, setLastClick } = game;

  const isCurrent = x === lastClick.x && y === lastClick.y;

  const handleClick = () => {
    if (isGameWon || isGameLost || isFlagged) return;
    if (isMine) setLastClick({ x, y });
    onClick(x, y);
  };

  const handleRightClick = (e) => {
    e.preventDefault();
    if (isGameWon || isGameLost) return;
    if (isRevealed) return;
    onRightClick(x, y, !isFlagged);
  };

  return (
    <div
      className={`w-10 h-10 flex items-center justify-center  ${
        isGameLost && isCurrent && isMine ? "bg-red-500" : "bg-neutral-400"
      } ${
        (isGameLost && isMine) || isRevealed
          ? ""
          : "border-t-3 border-t-neutral-200 border-l-3 border-l-neutral-200 border-r-3 border-r-neutral-600 border-b-3 border-b-neutral-600"
      } ${
        !isRevealed && !isFlagged && !isGameLost && !isGameWon
          ? "hover:bg-neutral-500 active:border-none bg-400"
          : "border-2 border-neutral-500"
      } transition-all duration-100`}
      onClick={handleClick}
      onContextMenu={handleRightClick}
    >
      <CellContent cell={cell} isGameLost={isGameLost} isGameWon={isGameWon} />
    </div>
  );
};

export default Cell;
