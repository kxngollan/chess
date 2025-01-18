<template>
    <main>
        <Board :board="board" :blackplayer="blackplayer" :whiteplayer="whiteplayer" :flipped="flipped" />
        <Panel :username="username" :timeControl="timeControl" @fetchGames="fetchGames" @reset-board="resetMove"
            @previous-move="previousMove" @next-move="nextMove" @last-move="lastMove" @flip-board="flipBoard"
            @update:username="username = $event" @update:time-control="timeControl = $event" :notation="notation"
            :positionIndex="positionIndex" @change-index="changeIndex" />
        <GamesList v-if="showingGames" :games="games" :loading="loading" :month="month" :year="year"
            @previous="previousMonth" @next="nextMonth" @close="close" @selectGame="selectGame" />
    </main>
</template>

<script>
import GamesList from "@/components/modals/GamesList.vue";
import Board from "@/components/board/Board.vue";
import Panel from "@/components/panel/Panel.vue"

import makePosition from "~/lib/frontend/makePosition";
import createBoard from "~/lib/frontend/createBoard";
import playSound from "~/lib/frontend/playSound";

export default {
    components: { GamesList, Board, Panel },
    data() {
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth() + 1;
        return {
            month: currentMonth,
            year: currentYear,
            username: "",
            timeControl: "bullet",
            loading: false,
            games: [],
            showingGames: false,
            selectedGame: null,
            whiteplayer: { username: "White Player", rating: "???" },
            blackplayer: { username: "Black Player", rating: "???" },
            positions: [],
            notation: [],
            positionIndex: null,
            board: [],
            flipped: false
        };
    },
    methods: {
        close() {
            this.showingGames = false;
        },
        async fetchGames() {
            if (!this.username) {
                alert("Please enter a username.");
                return;
            }
            this.showingGames = true;
            this.loading = true;
            this.games = []
            try {
                const res = await $fetch("/api/fetchGames", {
                    method: "POST",
                    body: {
                        timeControl: this.timeControl,
                        username: this.username,
                        month: String(this.month).padStart(2, "0"),
                        year: this.year,
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
            this.whiteplayer = game.white
            this.blackplayer = game.black
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
        nextMove() {
            if (this.positionIndex === null || this.positions.length < 0) return;
            if (this.positionIndex >= this.positions.length - 1) {
                this.positionIndex = this.positions.length - 1;
            } else {
                this.positionIndex += 1;
            }
            this.changeBoard()
        },
        previousMove() {
            if (this.positionIndex === null || this.positions.length < 0) return;
            if (this.positionIndex <= 0) {
                this.positionIndex = 0;
            } else {
                this.positionIndex -= 1;
            }
            this.changeBoard()
        },
        lastMove() {
            if (this.positionIndex === null || this.positions.length < 0) return;
            if (this.positionIndex !== this.positions.length - 1) {
                this.positionIndex = this.positions.length - 1;
            }
            this.changeBoard()
        },
        resetMove() {
            if (this.positionIndex === null || this.positions.length < 0) return;
            if (this.positionIndex !== 0) {
                this.positionIndex = 0;
            }
            this.changeBoard()
        },
        flipBoard() {
            this.flipped = !this.flipped
        },
        handleKeyDown(e) {
            if (e.key === "ArrowRight") {
                this.nextMove()
            } else if (e.key === "ArrowLeft") {
                this.previousMove()
            } else if (e.key === "ArrowUp") {
                this.resetMove()
            } else if (e.key === "ArrowDown") {
                this.lastMove()
            } else if (e.key === "Escape"
            ) {
                return this.close()
            }
        },
        changeBoard() {
            this.board = makePosition(this.positions[this.positionIndex]);
            if (this.positionIndex < this.positions.length - 1 && this.positionIndex > -1) {
                playSound(this.notation[this.positionIndex - 1]);
            }
        },
        changeIndex(index) {
            this.positionIndex = index
            return this.changeBoard()
        }
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

<style scoped></style>
