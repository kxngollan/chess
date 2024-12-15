import getMoves from "./getMove";

const inCheck = (move, board, rank, file, piece, positions) => {
  const king = piece.startsWith("w") ? "wk" : "bk";
  const opp = piece.startsWith("w") ? "b" : "w";

  const newBoard = JSON.parse(JSON.stringify(board));

  newBoard[move[0]][move[1]] = piece;
  newBoard[rank][file] = "";

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (newBoard[i][j].startsWith(opp)) {
        // Get the possible moves for the opponent's piece at (i, j)
        const moves = getMoves(newBoard, i, j, newBoard[i][j], positions);

        for (let k = 0; k < moves.length; k++) {
          if (newBoard[moves[k][0]][moves[k][1]] === king) {
            return true;
          }
        }
      }
    }
  }

  return false;
};

export default inCheck;
