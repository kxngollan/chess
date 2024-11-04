// moves.js
const pawnMoves = (position, rank, file, piece) => {
  const moves = [];
  const opp = piece.startsWith("w") ? "b" : "w";
  const direction = piece.startsWith("w") ? -1 : 1; // White pawns move up (-1), Black down (+1)
  const startingRank = piece.startsWith("w") ? 6 : 1;

  // Move forward one square
  if (position[rank + direction]?.[file] === "") {
    moves.push([rank + direction, file]);

    // Move forward two squares from the starting position
    if (
      rank === startingRank &&
      position[rank + direction * 2]?.[file] === ""
    ) {
      moves.push([rank + direction * 2, file]);
    }
  }

  // Capture to the left
  if (file > 0 && position[rank + direction]?.[file - 1]?.startsWith(opp)) {
    moves.push([rank + direction, file - 1]);
  }

  // Capture to the right
  if (file < 7 && position[rank + direction]?.[file + 1]?.startsWith(opp)) {
    moves.push([rank + direction, file + 1]);
  }

  return moves;
};

export default pawnMoves;
