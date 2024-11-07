<template>
  <main>
    <div class="play">
      <Ranks class="rank" :ranks="ranks" />
      <div class="board">
        <div class="row" v-for="(row, rankIndex) in board" :key="rankIndex">
          <Tile v-for="(tile, fileIndex) in row" :key="fileIndex"
            :color="(rankIndex + fileIndex) % 2 === 0 ? 'white' : 'black'" @clearMoves="clear" :tile="tile"
            :possibleMove="moves.some(move => move[0] === rankIndex && move[1] === fileIndex) ? true : false"
            @makeMove="makeMove">
            <Piece v-if="tile" :piece="tile" @click="getMoves(board, rankIndex, fileIndex, tile)" />
          </Tile>
        </div>
      </div>
      <Files class="file" :files="files" />
    </div>
  </main>
</template>

<script>
import Tile from "@/components/Tile.vue";
import Piece from "@/components/Piece.vue";
import Files from "@/components/Files.vue";
import Ranks from "@/components/Ranks.vue";
import { getMoves } from "./getMove";

export default {
  components: { Tile, Piece, Files, Ranks },
  data() {
    return {
      board: [],
      ranks: [8, 7, 6, 5, 4, 3, 2, 1],
      files: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
      turn: "w",
      moves: []
    };
  },
  methods: {
    createBoard() {
      for (let i = 0; i < 8; i++) {
        let row = [];
        for (let j = 0; j < 8; j++) {
          if (i === 1) {
            row.push("bp");
          } else if (i === 6) {
            row.push("wp");
          } else {
            row.push("");
          }
        }
        this.board.push(row);
      }
      this.board[0] = ["wr", "bn", "bb", "bq", "bk", "bb", "bn", "br"];
      this.board[7] = ["wr", "wn", "wb", "wq", "wk", "wb", "wn", "wr"];
    },
    getMoves(board, rank, file, piece) {
      this.moves = getMoves(board, rank, file, piece);

    },
    makeMove() {
      console.log("Making Move")
    },
    clear() {
      this.moves = []
    }
  },
  watch: {
  },
  mounted() {
    this.createBoard();
  }
};
</script>


<style>
body {
  margin: 0;
  padding: 0;
}

main {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.play {
  position: relative;
}

.board {
  width: 720px;
  aspect-ratio: 1 / 1;
  display: flex;
  flex-direction: column;
}

.file {
  position: absolute;
  bottom: -20px;
}

.rank {
  position: absolute;
  left: -20px;
}

.row {
  display: flex;
  flex: 1;
}
</style>
