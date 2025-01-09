import pgnParser from "pgn-parser";
import { Chess } from "chess.js";

export default defineEventHandler(async (event) => {
  try {
    const { pgn } = await readBody(event);

    if (!pgn) {
      throw new Error("PGN is required");
    }

    const board = new Chess();
    let positions = [];
    let notation = [];

    let [parsedPGN] = pgnParser.parse(pgn);

    if (!parsedPGN) {
      throw new Error("Invalid PGN");
    }

    positions.push(board.fen());

    for (let pgnMove of parsedPGN.moves) {
      let moveSAN = pgnMove.move;

      let virtualBoardMove;
      try {
        virtualBoardMove = board.move(moveSAN);
      } catch (err) {
        throw new Error("Invalid move: " + moveSAN);
      }

      notation.push(moveSAN);

      let moveUCI = virtualBoardMove.from + virtualBoardMove.to;

      positions.push({
        fen: board.fen(),
        move: {
          san: moveSAN,
          uci: moveUCI,
        },
      });
    }

    return {
      status: 200,
      positions: positions,
      notation: notation,
    };
  } catch (error) {
    return {
      status: 400,
      error: error.message,
    };
  }
});
