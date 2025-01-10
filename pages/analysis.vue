<template>
    <main>
        <GameForm class="form" @fetchGames="fetchGames" :month="month" :year="year" v-if="searching" />
        <div>
            <p>
                {{ black ? black : "Black player" }} {{ blackRating ? `(${blackRating})` : "( ???? )" }}
            </p>
            <Board :board="board" />
            <p>
                {{ white ? white : "White player" }} {{ whiteRating ? `(${whiteRating})` : "( ???? )" }}
            </p>
        </div>
        <Notation2 :notation="notation" />
        <button @click="getAnalys">
            Analysis
        </button>
        <GamesList v-if="showingGames" :games="games" :loading="loading" :month="month" :year="year"
            @previous="previousMonth" @next="nextMonth" @close="close" @selectGame="selectGame" />
    </main>
</template>

<script>
import { Icon } from "@iconify/vue";
import GameForm from "@/components/GameForm.vue";
import GamesList from "@/components/GamesList.vue";
import Board from "@/components/Board.vue";
import Notation2 from "@/components/Notation2.vue";

import makePosition from "~/lib/frontend/makePosition";
import createBoard from "~/lib/frontend/createBoard";
import playSound from "~/lib/frontend/playSound";

export default {
    components: { Icon, GamesList, GameForm, Board, Notation2 },
    data() {
        const currentYear = new Date().getFullYear();
        return {
            month: new Date().getMonth() + 1,
            year: currentYear,
            username: "",
            loading: false,
            games: [],
            showingGames: false,
            searching: true,
            selectedGame: null,
            white: null,
            black: null,
            whiteRating: null,
            blackRating: null,
            positions: [],
            notation: [],
            positionIndex: null,
            board: []
        };
    },
    methods: {
        close() {
            this.showingGames = false;
        },
        async fetchGames(username, month, year) {
            if (!username) {
                alert("Please enter a username.");
                return;
            }
            this.username = username;
            this.showingGames = true;
            this.loading = true;
            try {
                const res = await $fetch("/api/fetchGames", {
                    method: "POST",
                    body: {
                        site: this.site,
                        username: username,
                        month: String(month).padStart(2, "0"),
                        year: year,
                    },
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!res.success) {
                    throw new Error(res.error || "Failed to fetch games.");
                }
                this.games = res.games;
            } catch (err) {
                console.error(err);
            } finally {
                this.loading = false;
            }
        },
        selectGame(game) {
            this.selectedGame = game;
            this.showingGames = false;
            this.searching = false;
            this.white = game.white.username;
            this.black = game.black.username;
            this.whiteRating = game.white.rating;
            this.blackRating = game.black.rating;
            this.positionIndex = 0;
            this.getPositions();
        }
        ,
        async getPositions() {
            try {
                const res = await $fetch("/api/fetchPositions", {
                    method: "POST",
                    body: {
                        pgn: this.selectedGame.pgn,
                    },
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (res.status !== 200) {
                    throw new Error(res.error || "Failed to fetch positions.");
                }

                this.positions = res.positions;
                this.notation = res.notation;

                if (res.status !== 200) {
                    throw new Error(res.error || "Failed to fetch positions.");
                }
            } catch (err) {
                console.error(err);
            }
        },
        previousMonth() {
            if (this.month === 1) {
                this.month = 12;
                this.year -= 1;
            } else {
                this.month -= 1;
            }
            this.fetchGames(this.username, this.month, this.year);
        },
        nextMonth() {
            if (this.month === 12) {
                this.month = 1;
                this.year += 1;
            } else {
                this.month += 1;
            }
            this.fetchGames(this.username, this.month, this.year);
        },
        handleKeyDown(e) {
            if (this.positionIndex === null) {
                return;
            }
            if (e.key === "ArrowRight") {
                if (this.positionIndex >= this.positions.length - 1) {
                    this.positionIndex = this.positions.length - 1;
                } else {
                    this.positionIndex += 1;
                }
            } else if (e.key === "ArrowLeft") {
                if (this.positionIndex <= 0) {
                    this.positionIndex = 0;
                } else {
                    this.positionIndex -= 1;
                }
            } else if (e.key === "ArrowUp") {
                if (this.positionIndex !== 0) {
                    this.positionIndex = 0;
                }
                this.positionIndex = 0;
                this.board = this.positions[this.positionIndex];
            } else if (e.key === "ArrowDown") {
                if (this.positionIndex !== this.positions.length - 1) {
                    this.positionIndex = this.positions.length - 1;
                }
            } else {
                return;
            }

            this.board = makePosition(this.positions[this.positionIndex]);

            if (this.positionIndex < this.positions.length - 1 && this.positionIndex > -1) {
                playSound(this.notation[this.positionIndex - 1]);
            } else {
                new Audio("/sounds/checkmate.mp3").play();
            }

        },
    },
    head() {
        return {
            title: "Analysis - Chess",
        };
    },
    mounted() {
        window.addEventListener('keydown', this.handleKeyDown);
        this.board = createBoard();
    },
    beforeDestroy() {
        window.removeEventListener('keydown', this.handleKeyDown);
    },
};
</script>

<style scoped>
main {
    margin-top: 20px;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.board {
    position: relative;
    z-index: 0;
}

.form {
    position: absolute;
    z-index: 1;
}
</style>
