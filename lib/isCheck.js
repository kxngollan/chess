import getMoves from "./getMove";

const isCheck = (board, turn) => {
  const oppKing = turn === "w" ? "bk" : "wk";

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (board[i][j].startsWith(turn)) {
        const moves = getMoves(board, i, j, board[i][j], []);
        for (const move of moves) {
          const [moveRow, moveCol] = move;
          if (board[moveRow][moveCol] === oppKing) {
            return true;
          }
        }
      }
    }
  }

  return false;
};

export default isCheck;
