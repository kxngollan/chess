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
    // Pawn moves
    if (rank === 0 || rank === 7) {
      // Handle promotion
      const promotion = promotionPiece
        ? `=${promotionPiece.toUpperCase()}`
        : "";
      if (file !== prevFile) {
        return `${currentFile}x${newFile}${newRank}${promotion}`;
      }
      return `${newFile}${newRank}${promotion}`;
    }
    if (file === prevFile) {
      // Normal pawn move
      return `${newFile}${newRank}`;
    }
    if (file !== prevFile) {
      // Capture by pawn
      return `${currentFile}x${newFile}${newRank}`;
    }
  }

  // Rook moves
  if (piece.endsWith("r")) {
    if (prevBoard[rank][file] === "") {
      return `R${newFile}${newRank}`;
    }
    return `Rx${newFile}${newRank}`;
  }

  // Knight moves
  if (piece.endsWith("n")) {
    if (prevBoard[rank][file] !== "") {
      return `Nx${newFile}${newRank}`;
    }
    return `N${newFile}${newRank}`;
  }

  // Bishop moves
  if (piece.endsWith("b")) {
    if (prevBoard[rank][file] !== "") {
      return `Bx${newFile}${newRank}`;
    }
    return `B${newFile}${newRank}`;
  }

  // Queen moves
  if (piece.endsWith("q")) {
    if (prevBoard[rank][file] !== "") {
      return `Qx${newFile}${newRank}`;
    }
    return `Q${newFile}${newRank}`;
  }

  // King moves (including castling)
  if (piece.endsWith("k")) {
    if (prevFile - file === 2) {
      return "O-O-O"; // Queenside castling
    }
    if (prevFile - file === -2) {
      return "O-O"; // Kingside castling
    }
    if (prevBoard[rank][file] !== "") {
      return `Kx${newFile}${newRank}`;
    }
    return `K${newFile}${newRank}`;
  }

  return ""; // Return empty string if no valid move is found
};

export default annotation;
