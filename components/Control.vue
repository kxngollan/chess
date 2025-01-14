<template>
    <div id="review-panel-toolbar">
        <div id="review-panel-toolbar-buttons" class="center">
            <Icon name="material-symbols:repeat-on-rounded" @click="flipBoard" />
            <Icon name="material-symbols:skip-previous" @click="resetBoard" />
            <Icon name="material-symbols:arrow-circle-left" @click="previousMove" />
            <Icon name="material-symbols:arrow-circle-right" @click="nextMove" />
            <Icon name="material-symbols:skip-next" @click="lastMove" />
        </div>
    </div>
</template>

<script>
import { Icon } from "@iconify/vue";

export default {
    components: { Icon },
    emits: ["flipBoard", "resetBoard", "nextMove", "previousMove", "lastMove"],
    methods: {
        flipBoard() {
            this.$emit("flipBoard")
        },
        resetBoard() {
            this.$emit("resetBoard")
        },
        previousMove() {
            this.$emit("previousMove")
        },
        nextMove() {
            this.$emit("nextMove")
        },
        lastMove() {
            this.$emit("lastMove")
        }
    }
}
</script>

<style scoped>
#review-panel-toolbar {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    --dot-bg: var(--secondary-color);
    --dot-color: var(--primary-color);
    --dot-size: 2px;
    --dot-space: 10px;
    background: linear-gradient(90deg,
            var(--dot-bg) calc(var(--dot-space) - var(--dot-size)),
            transparent 1%) center / var(--dot-space) var(--dot-space),
        linear-gradient(var(--dot-bg) calc(var(--dot-space) - var(--dot-size)),
            transparent 1%) center / var(--dot-space) var(--dot-space),
        var(--dot-color);
    border-radius: 10px;
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
    grid-row: 2 / 3;
    border-top: 2px solid var(--border-color);
}


#review-panel-toolbar-buttons {
    margin: 0px 0px 0px 0px;
    flex-wrap: wrap;
    gap: 0px;
    width: 90%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    background-color: var(--primary-color);
    border-radius: 10px;
    color: white;
}

#review-panel-toolbar-buttons span {
    border-radius: 5px;
    font-size: 25px;
    padding: 10px 5% 10px 5%;
    cursor: pointer;
}

#review-panel-toolbar-buttons span:hover {
    color: #4caf50 !important;
}

@media screen and (max-width:960px) {
    #review-panel-toolbar {
        position: fixed;
        bottom: 0%;
        left: 0;
        width: 100vw;

    }
}
</style>