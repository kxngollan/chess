const playSound = (notation) => {
  if (notation === undefined) return;

  const capture = notation.includes("x");
  const check = notation.includes("+");
  const checkmate = notation.includes("#");
  const promotion = notation.includes("=");
  const kingsideCastle = notation.includes("O-O");
  const queensideCastle = notation.includes("O-O-O");

  if (checkmate) {
    new Audio("/sounds/checkmate.mp3").play();
  } else if (check) {
    new Audio("/sounds/check.mp3").play();
  } else if (capture) {
    new Audio("/sounds/capture.mp3").play();
  } else if (promotion) {
    new Audio("/sounds/promotion.mp3").play();
  } else if (kingsideCastle || queensideCastle) {
    new Audio("/sounds/castle.mp3").play();
  } else {
    new Audio("/sounds/move.mp3").play();
  }
};

export default playSound;
