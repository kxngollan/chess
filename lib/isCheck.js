import getMoves from "./getMove";

const isCheck = (board, turn) => {
  const oppKing = turn === "w" ? "bk" : "wk";

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (board[i][j].startsWith(turn)) {
        let moves = getMoves(board, i, j, board[i][j], []);
        moves.forEach((move) => {
          if (board[move[0][move[1]]] === oppKing) {
            return true;
          }
        });
      }
    }
  }

  return false;
};

export default isCheck;
