<template>
    <div class="games">
        <div class="overlay" @click="close"></div>
        <div class="modal" :class="{ loading: loading }">
            <button class="close" @click="close">
                <Icon name="basil:cross-outline" />
            </button>
            <Loader v-if="loading" />
            <div class="container" v-else>
                <div v-if="games.length === 0" class="no-games">
                    <p>
                        No games found.
                    </p>
                </div>
                <div v-for="game in games" :key="game.id" class="game-list">
                    <p>
                        {{ game.white?.username }} ({{ game.white?.rating }})
                        <NuxtImg src="/img/wp.png" alt="White Player Icon" draggable="false" />
                        vs
                        {{ game.black?.username }} ({{ game.black?.rating }})
                        <NuxtImg src="/img/bp.png" alt="Black Player Icon" draggable="false" />
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
            <div class="controls">
                <button @click="previous">
                    <Icon name="fa-solid:chevron-left" />
                </button>
                <span>{{ months[month - 1] }} {{ year }}</span>
                <span>{{ !loading ? games.length : "" }} Games</span>
                <button @click="next">
                    <Icon name="fa-solid:chevron-right" />
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import Loader from "@/components/Loader.vue";
export default {
    components: { Loader },
    props: ["games", "loading", "month", "year"],
    data() {
        return {
            months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        };
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
    },
    mounted() {
        document.body.style.overflow = "hidden"
    },
    beforeDestroy() {
        document.body.style.overflow = "auto";
    },
};
</script>

<style scoped>
html,
body {
    margin: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.container {
    height: calc(100% - 30px);
    height: 100%;
}

img {
    width: 20px;
    height: 20px;
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

.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
}

.loading {
    justify-content: center !important;
    align-items: center !important;

}

.no-games {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}

.modal {
    display: flex;
    flex-direction: column;
    position: relative;
    bottom: 0;
    justify-content: space-between;
    align-items: center;
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    max-width: 400px;
    width: 90%;
    height: 90vh;
    overflow-y: auto;
    padding: 0px 25px 0;
}

.close {
    position: absolute;
    font-size: x-large;
    top: 5px;
    right: 5px;
}

button {
    background-color: transparent;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100%;
    width: 30px;
    height: 30px;
}

.close:hover {
    color: #555;
    background-color: salmon;
}

.controls {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    padding: 10px 0;
    position: sticky;
    bottom: 0;
    background-color: #ffffff;
    height: 30px;
    margin: auto;
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
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 100%;
    cursor: pointer;
}

.game-list:first-child {
    margin-top: 10px;
}

.game-list:hover {
    background-color: #f1f1f1;
}

.game-time {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 14px;
}
</style>
