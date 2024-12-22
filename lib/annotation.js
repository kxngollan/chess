const annotation = (
  board,
  piece,
  file,
  rank,
  prevFile,
  prevRank,
  prevBoard
) => {
  const newFile = String.fromCharCode(65 + file).toLowerCase();

  const currentFile = String.fromCharCode(65 + prevFile).toLowerCase();

  const newRank = 8 - rank;
  if (piece.endsWith("p")) {
    if (rank === 8) {
    }
    if (file === prevFile) {
      return currentFile + newRank;
    }
    if (file !== prevFile) {
      return currentFile + "x" + newFile + newRank;
    }
  }

  if (piece.endsWith("r")) {
    if (prevBoard[rank][file] === "") {
      console.log("new file ", newFile, "\n new rank ", newRank);
      return "r" + newFile + newRank;
    }
  }

  if (piece.endsWith("n")) {
    if (prevBoard[rank][file] !== "") {
      return "Nx" + newFile + newRank;
    }

    return "N" + newFile + newRank;
  }

  if (piece.endsWith("b")) {
    if (prevBoard[rank][file] !== "") {
      return "Bx" + newFile + newRank;
    }

    return "B" + newFile + newRank;
  }

  if (piece.endsWith("k")) {
    if (prevFile - file === 2) {
      return "O-O-O";
    }

    if (prevFile - file === -2) {
      return "O-O";
    }

    if (prevBoard[rank][file] !== "") {
      return "Kx" + newFile + newRank;
    }

    return "K" + newFile + newRank;
  }
};

export default annotation;
