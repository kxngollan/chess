import getMoves from "./getMove";

const isDraw = (board, turn, positions) => {
  let pieces = [];
  let noMoves = true;

  board.forEach((row, rank) => {
    row.forEach((p, file) => {
      if (p !== "") {
        pieces.push(p);
        if (p.startsWith(turn)) {
          const moves = getMoves(board, rank, file, p, []);
          if (moves.length > 0) {
            noMoves = false;
          }
        }
      }
    });
  });

  //If player can't move, draw by stalemate
  if (noMoves) {
    return { draw: true, type: "Stalemate" };
  }

  // If only 2 kings, draw
  if (pieces.length === 2) {
    return { draw: true, type: "Insufficient material" };
  }

  // If only other piece is knight or bishop
  if (pieces.length === 3) {
    if (pieces.includes("bn" || "wn" || "bb" || "wb")) {
      return { draw: true, type: "Insufficient material" };
    }
  }

  // Draw by repition
  for (let i = 0; i < positions.length; i++) {
    let currentPosition = positions[i]["position"];
    let repeated = 0;

    for (let j = i + 1; j < positions.length; j++) {
      let newPosition = positions[j]["position"];

      // as arrays last time currentPosition === newPosition always returned false
      if (JSON.stringify(currentPosition) === JSON.stringify(newPosition)) {
        repeated++;
      }
      if (repeated > 1) {
        return { draw: true, type: "Reptition" };
      }
    }
  }

  return { draw: false };
};

export default isDraw;
