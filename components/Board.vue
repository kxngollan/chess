<template>
    <div class="play">
        <Ranks class="rank" :ranks="ranks" />
        <div class="board">
            <div class="row" v-for="(row, rankIndex) in board" :key="rankIndex">
                <Tile v-for="(tile, fileIndex) in row" :key="fileIndex"
                    :color="(rankIndex + fileIndex) % 2 === 0 ? 'white' : 'black'" :tile="tile" :file="fileIndex"
                    :rank="rankIndex">
                    <Piece v-if="tile" :piece="tile" />
                </Tile>
            </div>
        </div>
        <Files class="file" :files="files" />
    </div>
</template>

<script>
import Tile from "./Tile.vue";
import Piece from "./Piece.vue";
import Files from "./Files.vue";
import Ranks from "./Ranks.vue";

export default {
    components: { Tile, Piece, },
    props: ["board"],
    data() {
        return {
            ranks: [8, 7, 6, 5, 4, 3, 2, 1],
            files: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
        }
    },
}
</script>

<style scoped>
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