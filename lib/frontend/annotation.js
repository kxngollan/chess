import getMoves from "./getMove";

const annotation = (
  piece,
  file,
  rank,
  prevFile,
  prevRank,
  prevBoard,
  promotionPiece = null
) => {
  const newFile = String.fromCharCode(97 + file);
  const currentFile = String.fromCharCode(97 + prevFile);
  const newRank = 8 - rank;
  const currentRank = 8 - prevRank;

  if (piece.endsWith("p")) {
    if (rank === 0 || rank === 7) {
      const promotion = promotionPiece
        ? `=${promotionPiece.toUpperCase()}`
        : "";
      if (file !== prevFile) {
        return `${currentFile}x${newFile}${newRank}${promotion}`;
      }
      return `${newFile}${newRank}${promotion}`;
    }
    if (file === prevFile) {
      return `${newFile}${newRank}`;
    }
    if (file !== prevFile) {
      return `${currentFile}x${newFile}${newRank}`;
    }
  }

  if (piece.endsWith("k")) {
    if (prevFile - file === 2) {
      return "O-O-O";
    }
    if (prevFile - file === -2) {
      return "O-O";
    }
  }

  const emptyBoard = Array.from({ length: 8 }, () => Array(8).fill(""));

  const moves = getMoves(emptyBoard, rank, file, piece, []);

  let sameRank = false;
  let sameFile = false;

  moves.forEach((move) => {
    if (
      prevBoard[move[0]][move[1]] === piece &&
      (move[0] !== prevRank || move[1] !== prevFile)
    ) {
      let otherMoves = getMoves(prevBoard, move[0], move[1], piece, []);
      otherMoves.forEach((m) => {
        if (m[0] === rank && m[1] === file) {
          if (move[0] === prevRank) {
            sameRank = true;
          }
          if (move[1] === prevFile) {
            sameFile = true;
          }
        }
      });
    }
  });

  let notation = "";

  if (sameRank && sameFile)
    notation = `${currentFile}${currentRank}${newFile}${newRank}`;
  else if (sameRank) notation = `${currentFile}${newFile}${newRank}`;
  else if (sameFile) notation = `${currentRank}${newFile}${newRank}`;
  else notation = `${newFile}${newRank}`;

  if (prevBoard[rank][file] !== "") notation = "x" + notation;

  notation = piece[1].toUpperCase() + notation;

  return notation;
};

export default annotation;
