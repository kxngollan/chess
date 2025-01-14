import pgnParser from "pgn-parser";

const getGames = async () => {
  try {
    let res = await fetch(
      "https://api.chess.com/pub/player/kxngollan/games/2024/01",
      {
        method: "GET",
      }
    );

    let data = await res.json();
    let games = data.games.reverse();

    let gamesResults = [];

    for (let game of games) {
      let [pgn] = pgnParser.parse(game.pgn);
      console.log(pgn.result);
    }
  } catch (e) {
    console.log(e.message);
  }
};

getGames();
