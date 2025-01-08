<template>
    <main>
        <GameForm class="form" @fetchGames="fetchGames" :month="month" :year="year" v-if="searching" />
        <Board />
        <GamesList v-if="showingGames" :games="games" :loading="loading" :month="month" :year="year"
            @previous="previous" @next="next" @close="close" @selectGame="selectGame" />
    </main>
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
            loading: false,
            games: [],
            showingGames: false,
            searching: true,
            selectedGame: null,
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
        selectGame(game) {
            this.selectedGame = game;
            this.showingGames = false;
            this.searching = false;
            console.log(game);
        }
        ,
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

<style scoped>
main {
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

.game-form {
width: 100%;
height: 100%;
position: absolute;
top: 0;
left: 0;
display: flex;
justify-content: center;
align-items: center;
}

.overlay {
width: 100%;
height: 100%;
position: fixed;
top: 0;
left: 0;
background-color: rgba(0, 0, 0, 0.5);
}

form {
z-index: 1;
background-color: white;
padding: 2rem;
border-radius: 0.75rem;
box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
display: flex;
flex-direction: column;
gap: 1rem;
max-width: 400px;
width: 90%;
}

input,
select {
width: 100%;
padding: 0.75rem;
border: 1px solid #ccc;
border-radius: 0.5rem;
font-size: 1rem;
outline: none;
transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}

input:focus,
select:focus {
border-color: #007bff;
box-shadow: 0 0 4px rgba(0, 123, 255, 0.5);
}

button {
width: 100%;
padding: 0.75rem;
font-size: 1rem;
font-weight: bold;
color: white;
background-color: #007bff;
border: none;
border-radius: 0.5rem;
cursor: pointer;
transition: background-color 0.2s ease-in-out, transform 0.1s ease-in-out;
}

button:hover {
background-color: #0056b3;
}

button:active {
transform: scale(0.95);
}

@media (max-width: 480px) {
form {
padding: 1.5rem;
}
button {
font-size: 0.9rem;
}
}
