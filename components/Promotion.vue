<template>
    <div class="promotion">
        <div class="overflow"></div>
        <div class="model">
            <Tile v-for="(piece, index) in pieces" :key="index" :file="index" :rank="index + 1"
                :color="index % 2 === 0 ? 'white' : 'black'">
                <Piece :piece="player + piece" @click="makePromotions(player + piece)" />
            </Tile>
        </div>
    </div>
</template>

<script>
import Tile from "@/components/Tile.vue";
import Piece from "./Piece.vue";

export default {
    components: { Tile, Piece },
    props: ["player", "file", "rank"],
    data() {
        return {
            pieces: ["q", "r", "b", "n"],
        };
    },
    methods: {
        makePromotions(piece) {
            this.$emit("makePromotion", piece, this.file, this.rank);
        },
    },
};
</script>

<style scoped>
.promotion {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    aspect-ratio: 1/1;
    z-index: 10;
}

.overflow {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 1;
}

.model {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 720px;
    border-radius: 5px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    background-color: rgba(255, 255, 255, 0.313);
    padding: 20px;
    z-index: 20;
}
</style>
