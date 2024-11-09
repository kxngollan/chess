const makeMove = (
  piece,
  oldFile,
  oldRank,
  newFile,
  newRank,
  positions,
  board
) => {
  const newBoard = board.map((row) => [...row]);

  if (piece.endsWith("p") && positions.length > 1) {
    const isEnpassant = enpassantCheck(
      piece,
      oldFile,
      oldRank,
      newFile,
      newRank,
      positions[positions.length - 1].position,
      board
    );

    if (isEnpassant) {
      newBoard[oldRank][oldFile] = "";
      newBoard[newRank][newFile] = piece;
      newBoard[oldRank][newFile] = "";

      const newPositions = [
        ...positions,
        { turn: positions.length, position: newBoard },
      ];
      return { board: newBoard, positions: newPositions };
    }
  }

  newBoard[oldRank][oldFile] = "";
  newBoard[newRank][newFile] = piece;

  const newPositions = [
    ...positions,
    { turn: positions.length, position: newBoard },
  ];

  return { board: newBoard, positions: newPositions };
};

const enpassantCheck = (
  piece,
  oldFile,
  oldRank,
  newFile,
  newRank,
  prevPosition,
  board
) => {
  const direction = newRank - oldRank;
  const opp = piece.startsWith("w") ? "bp" : "wp";

  if (Math.abs(newFile - oldFile) === 1) {
    if (newRank - oldRank === direction) {
      if (
        board?.[oldRank]?.[newFile] === opp &&
        board?.[oldRank + direction + direction]?.[newFile] === ""
      ) {
        if (
          prevPosition?.[oldRank]?.[newFile] === opp &&
          prevPosition?.[oldRank + direction + direction]?.[newFile] === ""
        ) {
          return true;
        }
      }
    }
  }
  return false;
};

export default makeMove;
