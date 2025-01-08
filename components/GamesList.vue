<template>
    <div class="games">
        <div class="overlay" @click="close"></div>
        <div class="modal">
            <button @click="close">
                <Icon name="basil:cross-outline" />
            </button>
            <div v-if="loading" class="loading-text">Loading...</div>
            <div v-else>
                <div v-if="games.length === 0" class="no-games">No games found.</div>
                <div v-for="game in games" :key="game.id" class="game-list">
                    <p>
                        {{ game.white?.username }} ({{ game.white?.rating }})
                        <img src=" /public/img/wp.png" alt="White Player Icon" draggable="false">
                        vs
                        {{ game.black?.username }} ({{ game.black?.rating }})
                        <img src="/public/img/bp.png" alt="Black Player Icon" draggable="false">
                    </p>
                    <span class="game-time" v-if="game.timeClass === 'bullet'">
                        <p>Bullet</p>
                        <Icon name="fa6-solid:gun" />
                    </span>
                    <span class="game-time" v-else-if="game.timeClass === 'blitz'">
                        <p>Blitz</p>
                        <Icon name="mdi:lightning-bolt" />
                    </span>
                    <span class="game-time" v-else-if="game.timeClass === 'rapid'">
                        <p>Rapid</p>
                        <Icon name="mdi:timer-sand" />
                    </span>
                    <span class="game-time" v-else-if="game.timeClass === 'classical'">
                        <p>Classical</p>
                        <Icon name="mdi:chess-queen" />
                    </span>
                    <span class="game-time" v-else-if="game.timeClass === 'daily'">
                        <p>Daily</p>
                        <Icon name="material-symbols:sunny" />
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ["games", "loading"],
    data() {
        return {

        };
    },
    methods: {
        close() {
            console.log("close")
            this.$emit("close");
        },
        analysis(index) {
            console.log(index)
        }
    },
};
</script>

<style scoped>
body {
    position: relative;
    margin: 0;
    font-family: Arial, sans-serif;
}

img {
    width: 16px;
    margin: 0;
}

p {
    font-size: 16px;
}

.games {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
}

button {
    display: flex;
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: transparent;
    border: none;
    height: 2rem;
    width: 2rem;
    font-size: 2rem;
    cursor: pointer;
    justify-content: center;
    align-items: center;
    border-radius: 100%;

}

button:hover {
    background-color: salmon;
    color: #555;
}

.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: -1;
}

.modal {
    display: flex;
    position: relative;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 20px;
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    max-width: 400px;
    min-width: 300px;
    width: 90%;
    height: 90vh;
    overflow-y: auto;
    padding: 20px;
    z-index: 1;
}

.loading-text,
.no-games {
    font-size: 18px;
    font-weight: bold;
    color: #555;
}

.game-list {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 280px;
    gap: 8px;
    padding: 15px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.game-list:hover {
    background-color: #cfcccc;
    cursor: pointer;
}

.game-time {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    font-size: 14px;
}
</style>
