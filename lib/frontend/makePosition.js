import { Chess } from "chess.js";

const makePosition = (position) => {
  let board = new Chess(position.fen).board().map((row) =>
    row.map((cell) => {
      if (cell === "" || cell === null || cell === undefined) {
        return "";
      }
      let piece = cell.color + cell.type;
      return piece;
    })
  );

  return board;
};

export default makePosition;
