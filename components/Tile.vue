<template>
    <div :class="['tile', color]" @click="clear">
        <span v-if="possibleMove" :class="[tile ? 'capture' : 'highlight']" @click.stop="makeMove"></span>
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: ["color", "tile", "possibleMove", "file", "rank"],
    methods: {
        clear() {
            if (!this.possibleMove && !this.tile) {
                this.$emit("clearMoves")
            }
        },
        makeMove() {
            this.$emit("makeMove", this.file, this.rank)
        }
    }

}
</script>
<style scoped>
.tile {
    width: var(--tile);
    aspect-ratio: 1/1;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
}



.highlight,
.capture {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 10;
    cursor: pointer;
}

.capture::after,
.highlight::after {
    content: '';
    position: absolute;
    box-sizing: border-box;
    border-radius: 100%;
    pointer-events: none;
}

.highlight::after {
    top: 40%;
    left: 40%;
    width: 20%;
    height: 20%;
    background-color: rgba(0, 200, 0, 0.6);

}


.capture::after {
    top: 10%;
    left: 10%;
    width: 80%;
    height: 80%;
    border: 10px solid rgba(0, 200, 0, 0.6);
}

.white {
    background-color: antiquewhite;
}

.black {
    background-color: gray;
}
</style>