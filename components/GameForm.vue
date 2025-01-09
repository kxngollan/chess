<template>
    <div class="game-form">
        <div class="overlay"></div>
        <form @submit.prevent="fetchGames">
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
            <button type="submit" @click="fetchGames">Submit</button>
        </form>

    </div>
</template>

<script>
export default {
    data() {
        const currentYear = new Date().getFullYear();
        return {
            username: "",
            month: new Date().getMonth() + 1,
            year: currentYear,
            years: Array.from({ length: 10 }, (_, i) => currentYear - i),
        }
    },
    methods: {
        fetchGames() {
            this.username = this.username.trim();
            this.$emit("fetchGames", this.username, this.month, this.year);
        }
    }

}
</script>

<style scoped>
select {
    appearance: none;
    -webkit-appearance: none;
}

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
    box-sizing: border-box;
    transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}

input:focus,
select:focus {
    border-color: #1a1f25;
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
</style>