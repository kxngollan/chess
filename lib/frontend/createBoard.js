const createBoard = () => {
  return [
    ["br", "bn", "bb", "bq", "bk", "bb", "bn", "br"],
    Array(8).fill("bp"),
    Array(8).fill(""),
    Array(8).fill(""),
    Array(8).fill(""),
    Array(8).fill(""),
    Array(8).fill("wp"),
    ["wr", "wn", "wb", "wq", "wk", "wb", "wn", "wr"],
  ];
};

export default createBoard;
