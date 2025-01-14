<template>
    <div id="board-outer-container" class="center">
        <div id="board-inner-container" class="center">
            <div class="profile">
                {{ flipped ? whiteplayer.username : blackplayer.username }}
                ({{ flipped ? whiteplayer.rating : blackplayer.rating }})
            </div>
            <div id="board">
                <div class="row" v-for="(row, rankIndex) in visualBoard" :key="rankIndex">
                    <Tile v-for="(tile, fileIndex) in row" :key="fileIndex"
                        :color="(rankIndex + fileIndex) % 2 === 0 ? 'white' : 'black'" :tile="tile" :file="fileIndex"
                        :rank="rankIndex" @click="f(rankIndex, fileIndex)">
                        <Piece v-if="tile" :piece="tile" />
                    </Tile>
                </div>
            </div>
            <div class="profile">
                {{ !flipped ? whiteplayer.username : blackplayer.username }}
                ({{ !flipped ? whiteplayer.rating : blackplayer.rating }})
            </div>
        </div>
    </div>
</template>


<script>
import Tile from './Tile.vue';
import Piece from './Piece.vue';

export default {
    components: { Tile, Piece },
    props: ["board", "blackplayer", "whiteplayer", "flipped"],
    computed: {
        visualBoard() {
            if (this.flipped) {
                return this.board.slice().reverse().map(row => row.slice().reverse());
            }
            return this.board;
        }
    },
    methods: {
        f(i, j) {

        }
    }
};
</script>

<style>
.row {
    display: flex;
}

#board {
    display: flex;
    flex-direction: column;
    width: calc(var(--tile) * 8);
    aspect-ratio: 1/1;
}

#board-outer-container {
    gap: 10px;
    grid-template-columns: repeat(2, 1fr);
}

#board-inner-container {
    display: grid;
}

.center {
    display: flex;
    justify-content: center;
    align-items: center;
}

.profile {
    color: white;
    font-size: 20px;
    background-color: var(--border-color);
    border-radius: 10px;
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
    padding: 10px;
}

.profile:nth-child(1) {
    border-radius: 10px;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
}

@media only screen and (max-width: 1536px) {
    #board-outer-container {
        height: 625px !important;
        gap: 0 !important;
    }
}



@media only screen and (max-width: 960px) {
    #board-outer-container {
        height: 591px !important;
    }


}

@media only screen and (max-width: 750px) {
    #board-outer-container {
        height: 430px !important;
    }


}

@media only screen and (max-width: 380px) {
    #board-outer-container {
        height: 380px !important;
    }

}
</style>