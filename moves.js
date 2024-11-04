export const pawnMoves = (position, rank, file, piece) => {
  const moves = [];
  const opp = piece.startsWith("w") ? "b" : "w";
  const direction = piece.startsWith("w") ? -1 : 1;
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

export const knightMoves = (position, rank, file, piece) => {
  const moves = [];
  const opp = piece.startsWith("w") ? "b" : "w";
  const offsets = [
    [-2, -1],
    [-2, 1],
    [-1, -2],
    [-1, 2],
    [1, -2],
    [1, 2],
    [2, -1],
    [2, 1],
  ];

  for (const [dr, df] of offsets) {
    const newRank = rank + dr;
    const newFile = file + df;

    if (newRank >= 0 && newRank < 8 && newFile >= 0 && newFile < 8) {
      if (
        position[newRank][newFile] === "" ||
        position[newRank][newFile].startsWith(opp)
      ) {
        moves.push([newRank, newFile]);
      }
    }
  }

  return moves;
};

export const bishopMoves = (position, rank, file, piece) => {
  const moves = [];
  const opp = piece.startsWith("w") ? "b" : "w";
  const directions = [
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1],
  ];

  for (const [dr, df] of directions) {
    let newRank = rank + dr;
    let newFile = file + df;

    while (newRank >= 0 && newRank < 8 && newFile >= 0 && newFile < 8) {
      if (position[newRank][newFile] === "") {
        moves.push([newRank, newFile]);
      } else if (position[newRank][newFile].startsWith(opp)) {
        moves.push([newRank, newFile]);
        break;
      } else {
        break;
      }

      newRank += dr;
      newFile += df;
    }
  }

  return moves;
};

export const rookMoves = (position, rank, file, piece) => {
  const moves = [];
  const opp = piece.startsWith("w") ? "b" : "w";
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  for (const [dr, df] of directions) {
    let newRank = rank + dr;
    let newFile = file + df;

    while (newRank >= 0 && newRank < 8 && newFile >= 0 && newFile < 8) {
      if (position[newRank][newFile] === "") {
        moves.push([newRank, newFile]);
      } else if (position[newRank][newFile].startsWith(opp)) {
        moves.push([newRank, newFile]);
        break;
      } else {
        break;
      }

      newRank += dr;
      newFile += df;
    }
  }

  return moves;
};

export const queenMoves = (position, rank, file, piece) => {
  const moves = [
    ...bishopMoves(position, rank, file, piece),
    ...rookMoves(position, rank, file, piece),
  ];

  return moves;
};
