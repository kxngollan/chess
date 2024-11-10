import {
  pawnMoves,
  knightMoves,
  kingMoves,
  rookMoves,
  queenMoves,
  bishopMoves,
} from "@/moves";

export const getMoves = (board, rank, file, piece, positions) => {
  if (piece.endsWith("p")) {
    return pawnMoves(board, rank, file, piece, positions);
  }
  if (piece.endsWith("n")) {
    return knightMoves(board, rank, file, piece);
  }
  if (piece.endsWith("b")) {
    return bishopMoves(board, rank, file, piece);
  }
  if (piece.endsWith("r")) {
    return rookMoves(board, rank, file, piece);
  }
  if (piece.endsWith("q")) {
    return queenMoves(board, rank, file, piece);
  }
  if (piece.endsWith("k")) {
    return kingMoves(board, rank, file, piece, positions);
  }
};
