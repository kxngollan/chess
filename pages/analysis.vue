<template>
    <GameForm @fetchGames="fetchGames" :month="month" :year="year" />
    <Board class="">
    </Board>
    <Notation />
    <GamesList v-if="showingGames" :games="games" :loading="loading" :month="month" :year="year" @previous="previous"
        @next="next" @close="close" />
</template>

<script>
import { Icon } from "@iconify/vue";
import GameForm from "@/components/GameForm.vue";
import GamesList from "@/components/GamesList.vue";
import Board from "@/components/Board.vue";
import Notation from "@/components/Notation.vue";

export default {
    components: { Icon, GamesList, GameForm, Board, Notation },
    data() {
        const currentYear = new Date().getFullYear();
        return {
            month: new Date().getMonth() + 1,
            year: currentYear,
            username: "",
            loading: true,
            games: [],
            showingGames: true,
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
                alert(err.message || "An error occurred while fetching games.");
            } finally {
                this.loading = false;
            }
        },
        previous() {
            if (this.month === 1) {
                this.month = 12;
                this.year -= 1;
            } else {
                this.month -= 1;
            }
            this.fetchGames(this.username, this.month, this.year);
        },
        next() {
            if (this.month === 12) {
                this.month = 1;
                this.year += 1;
            } else {
                this.month += 1;
            }
            this.fetchGames(this.username, this.month, this.year);
        },
    },
    head() {
        return {
            title: "Analysis - Chess",
        };
    },
};
</script>

<style></style>
