<template>
  <main>
    <div class="play">
      <Ranks class="rank" :ranks="ranks" />
      <div class="board">
        <Promotion v-if="promotion" :player="turn" :file="promotionFile" :rank="promotionRank"
          @makePromotion="makePromotion" />
        <div class="row" v-for="(row, rankIndex) in board" :key="rankIndex">
          <Tile v-for="(tile, fileIndex) in row" :key="fileIndex"
            :color="(rankIndex + fileIndex) % 2 === 0 ? 'white' : 'black'" @clearMoves="clear" :tile="tile"
            :file="fileIndex" :rank="rankIndex"
            :possibleMove="moves.some(move => move[0] === rankIndex && move[1] === fileIndex)" @makeMove="makeMove">
            <Piece v-if="tile" :piece="tile" @click="getMoves(board, rankIndex, fileIndex, tile)" />
          </Tile>
        </div>
      </div>
      <Files class="file" :files="files" />
    </div>
    <button @click="takeBack">Take back</button>
    <button @click="newGame">New Game</button>
    <div v-if="checkmate">Game over</div>
  </main>
</template>

<script>
import Promotion from "@/components/Promotion.vue";
import Tile from "@/components/Tile.vue";
import Piece from "@/components/Piece.vue";
import Files from "@/components/Files.vue";
import Ranks from "@/components/Ranks.vue";
import getMoves from "@/lib/getMove";
import makeMove from "@/lib/makeMove";
import inCheck from "@/lib/inCheck";
import isMate from "@/lib/isMate";
import annotation from "@/lib/annotation";

export default {
  components: { Tile, Piece, Files, Ranks, Promotion },
  data() {
    return {
      board: [],
      ranks: [8, 7, 6, 5, 4, 3, 2, 1],
      files: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
      turn: "w",
      moves: [],
      positions: [],
      piece: null,
      rank: null,
      file: null,
      promotionFile: null,
      promotionRank: null,
      promotion: false,
      checkmate: false
    };
  },
  methods: {
    createBoard() {
      this.board = [
        ["br", "bn", "bb", "bq", "bk", "bb", "bn", "br"],
        Array(8).fill("bp"),
        Array(8).fill(""),
        Array(8).fill(""),
        Array(8).fill(""),
        Array(8).fill(""),
        Array(8).fill("wp"),
        ["wr", "wn", "wb", "wq", "wk", "wb", "wn", "wr"],
      ];
      this.positions = [{ turn: 0, position: this.board }];
    },
    newGame() {
      this.turn = "w"
      this.positions = []
      this.checkmate = false
      this.createBoard()
      this.clear()
    }
    ,
    getMoves(board, rank, file, piece) {
      if (piece.startsWith(this.turn)) {
        let moves = getMoves(board, rank, file, piece, this.positions);

        let possibleMove = []

        for (let i = 0; i < moves.length; i++) {
          if (!inCheck(moves[i], board, rank, file, piece, this.positions)) { possibleMove.push(moves[i]) }
        }

        this.moves = possibleMove
        this.piece = piece;
        this.rank = rank;
        this.file = file;
      }
    },
    makeMove(file, rank) {
      if (!this.piece || this.file === null || this.rank === null) return;

      if (this.moves.length > 0) {
        const moveData = makeMove(this.piece, this.file, this.rank, file, rank, this.positions, this.board);

        this.board = moveData.board;

        if (this.piece.endsWith("p")) {
          if ((rank === 0 && this.piece.startsWith("w")) || (rank === 7 && this.piece.startsWith("b"))) {

            this.promotionFile = file
            this.promotionRank = rank
            return this.promotion = true
          }
        }

        this.positions = moveData.positions;

        if (isMate(this.turn, this.board)) {
          this.checkmate = true
        }

        this.turn = this.turn === "w" ? "b" : "w";
      }

      console.log(annotation(this.board, this.piece, file, rank, this.file, this.rank, this.positions[this.positions.length - 2]["position"]))
      this.clear();
    },
    makePromotion(piece, file, rank) {
      this.board[rank][file] = piece;
      this.positions.push({ turn: this.turn, position: JSON.parse(JSON.stringify(this.board)) });


      if (isMate(this.turn, this.board)) {
        this.checkmate = true
      }

      this.turn = this.turn === "w" ? "b" : "w";

      this.clear()
    },
    clear() {
      this.moves = [];
      this.piece = null;
      this.file = null;
      this.rank = null;
      this.promotion = false;
    },
    takeBack() {
      if (this.positions.length > 1) {
        this.positions.pop();
        const lastPosition = this.positions[this.positions.length - 1];
        this.board = lastPosition.position;
        this.turn = lastPosition.turn % 2 === 0 ? "w" : "b";
      }
      this.clear();

      if (this.checkmate === true) {
        this.checkmate = false
      }
    }
  },
  mounted() {
    this.createBoard();
    console.log(String.fromCharCode(91))
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
  position: relative;
  aspect-ratio: 1 / 1;
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  overflow: hidden;
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
