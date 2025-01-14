<template>
    <div id="review-panel">
        <div id="review-panel-main">
            <div id="review-panel-wrapper">
                <h1 class="logo white" id="review-panel-title">
                    Look at games
                </h1>
                <UsernameInput :locUsername="locUsername" :locTimeControl="locTimeControl"
                    @update:locUsername="locUsername = $event" @update:locTimeControl="locTimeControl = $event"
                    @fetchGames="fetchGames" />

                <button id="review-button" :class="'review-button-disabled'" class="analyse">
                    <Icon name="rivet-icons:magnifying-glass" />
                    <b>Analyse</b>
                </button>
                <Notation :positions="notation" :positionIndex="positionIndex" @change-index="changeIndex" />
            </div>
            <!-- <Depth /> -->
        </div>
        <Control @nextMove="nextMove" @previousMove="previousMove" @resetBoard="resetBoard" @flipBoard="flipBoard"
            @lastMove="lastMove" />
    </div>
</template>

<script>
import UsernameInput from "./UsernameInput.vue";
import Control from "./Control.vue";
import Depth from "./Depth.vue";
import Notation from "./Notation.vue";

export default {
    components: { UsernameInput, Control, Depth },
    props: {
        username: String,
        timeControl: String,
        notation: Array,
        positionIndex: Number
    },
    emits: ["fetchGames", "update:username", "update:timeControl", "flipBoard", "resetBoard", "nextMove", "previousMove", "lastMove", "changeIndex"],
    data() {
        return {
            locUsername: this.username,
            locTimeControl: this.timeControl,
        };
    },
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
        },
        fetchGames() {
            this.$emit("fetchGames");
        },
        changeIndex(index) {
            this.$emit("changeIndex", index)
        }
    },
    watch: {
        locUsername(newValue) {
            this.$emit("update:username", newValue);
        },
        locTimeControl(newValue) {
            this.$emit("update:timeControl", newValue);
        },
    }
};
</script>



<style scoped>
.white {
    color: white;
}


* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

#review-panel {
    display: grid;
    grid-template-columns: 100%;
    background-color: var(--secondary-color);
    border: 2px solid var(--border-color);
    border-radius: 10px;
    padding: 1% 0px 0px 0px;
    height: calc(var(--tile)*8 + (23.125*2+40));
    width: 450px;
}

@media only screen and (min-width: 1264px) {
    #review-panel {
        grid-template-rows: 88% 12%;
    }
}


@media only screen and (max-width: 999px) {
    #review-panel {
        grid-template-rows: 82% 18%;
    }
}

@media only screen and (max-width:960px) {
    #review-panel {
        width: calc(var(--tile) *8) !important;
    }
}


@media (max-height: 860px) {
    #review-panel {
        grid-template-rows: 82% 18%;
    }
}

#review-panel-main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    position: relative;
    height: 100%;
    width: 100%;
    background-color: var(--secondary-color);
}

#review-panel-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    width: 100%;
    height: calc(100% - 69px);
}


#review-panel-title {
    margin: 0px !important;
    text-align: center;
    user-select: none;
    width: 90%;
    border-radius: 10px;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #4caf50;
}

@media (max-width: 1264px) {
    -title {
        font-size: 27px;
    }
}



#review-button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin-top: 15px;
    padding: 10px 50px;
    border-radius: 10px;
    font-size: 20px;
    background-color: var(--primary-color);
    color: white;
    text-shadow: 0px 1px 2px var(--border-color);
    width: 90%;
    border: 2px solid #4caf50;
    cursor: pointer;
    outline: none;
    user-select: none;
    box-shadow: 0px 5px 0px rgb(76, 175, 80, 0.6);
}

.review-button-disabled {
    border: 2px solid gray !important;
    box-shadow: 0px 5px 0px rgb(128, 128, 128, 0.6) !important;
}

#review-button:active {
    box-shadow: 0px 0px 0px;
    transform: translateY(5px);
}
</style>