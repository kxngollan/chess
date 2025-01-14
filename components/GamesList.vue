<template>
    <div id="menu-container">
        <div id="game-select-menu">
            <h1>Select a game</h1>
            <b id="game-select-period">{{ months[month - 1] }} / {{ year }}</b>
            <div id="games-list">
                <Loader v-if="loading" />
                <h1 v-if="games.length === 0 && !loading">No Games Found</h1>
                <div v-if="!loading" v-for="(game, i) in games" :key="i" class="game-listing" @click="selectGame(game)">
                    <TimeControl :time-class="game.timeClass" /><span>{{ game.white.username }} ({{ game.white.rating
                        }}) vs. {{
                            game.black.username }} ({{ game.black.rating }})</span>
                </div>
            </div>
            <div id="game-select-page-buttons">
                <button id="last-page-button" class="move-btn" @click="previous">
                    <Icon name="material-symbols:arrow-circle-left-rounded" />
                </button>
                <button id="next-page-button" class="move-btn" @click="next">
                    <Icon name="material-symbols:arrow-circle-right-rounded" />
                </button>
            </div>

            <button id="game-select-cancel-button" @click="close">
                <b>Cancel</b>
            </button>
        </div>
    </div>
</template>

<script>
import { Icon } from "@iconify/vue";
import TimeControl from './TimeControl.vue';
import Loader from "./Loader.vue";

export default {
    props: ["year", "month", "games", "loading"],
    components: { Icon, TimeControl, Loader },
    data() {
        return {
            months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        }
    },
    methods: {
        close() {
            document.body.style.overflow = "auto";
            this.$emit("close");
        },
        next() {
            this.$emit("next");
        },
        previous() {
            this.$emit("previous");
        },
        selectGame(game) {
            this.$emit("selectGame", game);
        },
    },
    mounted() {
        document.body.style.overflow = "hidden"
    },
    beforeDestroy() {
        document.body.style.overflow = "auto";
    },
}
</script>


<style>
#menu-container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    z-index: 5;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.7);
}

#game-select-menu {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px;
    min-width: 400px;
    width: 50vw;
    border-radius: 10px;
    background-color: var(--primary-color);
    color: white;
}


#game-select-menu h1 {
    margin: 0 0 10px 0;
}

#game-select-period {
    margin-bottom: 10px;
    font-size: 24px;
}

#games-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 5px 20px;
    width: 90%;
    max-height: 420px;
    overflow-x: hidden;
    overflow-y: auto;
    background-color: #232323;
}

#games-list::-webkit-scrollbar {
    background-color: #0e0e0e;
}

#games-list::-webkit-scrollbar-thumb {
    background-color: #f5f5f5;
}

.game-listing {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    margin: 5px;
    padding: 5px;
    border-radius: 10px;
    width: 100%;
    background-color: var(--secondary-color);
    cursor: pointer;
}

#games-list {
    border-radius: 10px;
    background-color: #0e0e0e !important;
}

#game-select-page-buttons {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: none;
    margin-top: 10px;
    gap: 10px;
}

#game-select-cancel-button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin-top: 20px;

    padding: 10px 50px;
    border-radius: 10px;
    font-size: 20px;
    background-color: var(--primary-color);
    color: white;

    text-shadow: 0px 1px 2px black;
    width: 90%;
    border: 2px solid black;
    cursor: pointer;
    outline: none;
    user-select: none;
    box-shadow: 0px 5px 0px rgb(0, 0, 0.6);
}

#game-select-cancel-button:active {
    box-shadow: 0px 0px 0px;
    transform: translateY(5px);
}

.move-btn {
    margin: 0px 0px 0px 0px;
    flex-wrap: wrap;
    width: 90%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: none;
    background: none;
    border: none;
}

.move-btn span {
    font-size: 25px;
    background-color: black;
    border-radius: 10px;
    padding: 10px 15px 10px 15px;
    cursor: pointer;
}

.move-btn span:hover {
    background-color: antiquewhite;
}
</style>