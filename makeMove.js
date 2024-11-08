const makeMove = (
  piece,
  oldFile,
  oldRank,
  newFile,
  newRank,
  positions,
  board
) => {
  //NO IDEA Why this works
  const newBoard = board.map((row) => [...row]);
  newBoard[oldRank][oldFile] = "";
  newBoard[newRank][newFile] = piece;

  const newPositions = [
    ...positions,
    { turn: positions.length, position: newBoard },
  ];

  return { board: newBoard, positions: newPositions };
};

export default makeMove;
