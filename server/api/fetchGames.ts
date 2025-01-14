export default defineEventHandler(async (event) => {
  try {
    const { timeControl, username, year, month } = await readBody(event);

    if (!timeControl || !username || !year || !month) {
    }
    const res = await fetch(
      `https://api.chess.com/pub/player/${username}/games/${year}/${month}`,
      { method: "GET" }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch games for ${username}`);
    }
    let data = await res.json();

    let games = data.games.reverse();

    let gameList = [];

    for (let game of games) {
      if (timeControl === game["time_class"]) {
        gameList.push({
          white: {
            username: game.white.username,
            rating: game.white.rating.toString(),
          },
          black: {
            username: game.black.username,
            rating: game.black.rating.toString(),
          },
          timeClass: game["time_class"],
          pgn: game.pgn,
          result: game["result"],
        });
      }
    }

    return { success: true, games: gameList };
  } catch (e: any) {
    return new Response(e.message, { status: 500 });
  }
});
