<template>
  <main>
    <div class="board">
      <div class="row" v-for="(row, rowIndex) in board" :key="rowIndex">
        <Tile v-for="(tile, tileIndex) in row" :key="tileIndex"
          :color="(rowIndex + tileIndex) % 2 === 0 ? 'white' : 'black'" :class="tile ? 'occupied' : ''">
          <Piece v-if="tile" :piece="tile" />
        </Tile>
      </div>
    </div>
  </main>
</template>

<script>
import Tile from "@/components/Tile.vue";
import Piece from "@/components/Piece.vue"

export default {
  components: { Tile, Piece },
  data() {
    return {
      board: [],
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
      this.board[0] = ["br", "bn", "bb", "bq", "bk", "bb", "bn", "br"];
      this.board[7] = ["wr", "wn", "wb", "wq", "wk", "wb", "wn", "wr"];
    }
  },
  mounted() {
    this.createBoard();
  },
};
</script>

<style>
main {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.board {
  width: 720px;
  aspect-ratio: 1 / 1;
  display: flex;
  flex-direction: column;
}

.row {
  display: flex;
  flex: 1;
}

.occupied {
  cursor: pointer;
}
</style>
