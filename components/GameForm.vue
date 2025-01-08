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
            console.log(this.username, this.month, this.year);
            this.$emit("fetchGames", this.username, this.month, this.year);
        }
    }

}
</script>

<style></style>