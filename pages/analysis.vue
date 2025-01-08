<template>
    <form @submit.prevent="getAnalysis">
        <input type="text" id="username" v-model="username" placeholder="Enter username" />
        <select v-model="month">
            <option v-for="m in 12" :key="m" :value="m">
                {{ String(m).padStart(2, "0") }}
            </option>
        </select>
        <select v-model="year">
            <option v-for="y in years" :key="y" :value="y">
                {{ y }}
            </option>
        </select>
        <button @click="getAnalysis">Submit</button>
    </form>
    <GamesList v-if="showingGames" :games="games" :loading="loading" @close="close" />
</template>

<script>
import { Icon } from "@iconify/vue";
import GamesList from "@/components/GamesList.vue";

export default {
    components: { Icon, GamesList },
    data() {
        const currentYear = new Date().getFullYear();
        return {
            site: "chess.com",
            username: "",
            loading: false,
            month: new Date().getMonth() + 1,
            year: currentYear,
            years: Array.from({ length: 10 }, (_, i) => currentYear - i),
            games: [],
            showingGames: false,
        };
    },
    methods: {
        close() {
            this.showingGames = false;
        },
        async getAnalysis() {
            if (!this.username) {
                alert("Please enter a username.");
                return;
            }
            this.showingGames = true;
            this.loading = true;
            try {
                const res = await $fetch("/api/fetchGames", {
                    method: "POST",
                    body: {
                        site: this.site,
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
                alert(err.message || "An error occurred while fetching games.");
            } finally {
                this.loading = false;
            }
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
