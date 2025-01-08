<template>
    <div class="board">
        <div class="row" v-for="(row, rankIndex) in board" :key="rankIndex">
            <Tile v-for="(tile, fileIndex) in row" :key="fileIndex"
                :color="(rankIndex + fileIndex) % 2 === 0 ? 'white' : 'black'" :tile="tile" :file="fileIndex"
                :rank="rankIndex">
                <Piece v-if="tile" :piece="tile" />
            </Tile>
        </div>
    </div>
</template>

<script>
import Tile from "./Tile.vue";
import Piece from "./Piece.vue";

export default {
    components: { Tile, Piece, },
    data() {
        return {
            board: [],
        }
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
        }
    },
    mounted() {
        this.createBoard();
    }
}
</script>