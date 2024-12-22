import getMoves from "./getMove";
import inCheck from "./inCheck";

const isMate = (turn, board) => {
  const opp = turn === "w" ? "b" : "w";

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (board[i][j].startsWith(opp)) {
        const moves = getMoves(board, i, j, board[i][j], []);

        for (let k = 0; k < moves.length; k++) {
          if (!inCheck(moves[k], board, i, j, board[i][j], [])) {
            return false;
          }
        }
      }
    }
  }

  return true;
};

export default isMate;
