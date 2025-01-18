<template>
    <form class="input-container" @submit.prevent="fetchGames">
        <div id="gameInputContainer" class="gameInputContainer">
            <input id="username-input" class="white" autocomplete="off" spellcheck="false" maxlength="48"
                placeholder="Username..." v-model="localUsername" />
            <button type="submit" id="fetch-account-games-button" class="usernameVerifyBtn">
                <Icon name="material-symbols:arrow-forward-ios"
                    class="usernameVerifyBtnIcon fa-solid fa-arrow-right contol-icons" style="color: #ffffff" />
            </button>
        </div>
        <div id="load-type-dropdown-container" class="white">
            <select id="load-type-dropdown" v-model="localTimeControl">
                <option value="bullet">Bullet</option>
                <option value="blitz">Blitz</option>
                <option value="rapid">Rapid</option>
                <option value="classic">Classic</option>
                <option value="daily">Daily</option>
            </select>
        </div>
    </form>
</template>

<script>
import { Icon } from "@iconify/vue";

export default {
    components: { Icon },
    props: {
        locUsername: String,
        locTimeControl: String,
    },
    data() {
        return {
            localUsername: this.locUsername,
            localTimeControl: this.locTimeControl,
        };
    },
    watch: {
        localUsername(newValue) {
            this.$emit("update:locUsername", newValue);
        },
        localTimeControl(newValue) {
            this.$emit("update:locTimeControl", newValue);

        },
    },
    methods: {
        fetchGames() {
            this.$emit("fetchGames");
        },
    },
};
</script>

<style scoped>
.input-container {
    width: 90%;
    display: flex;
    height: 50px;
    justify-content: center;
    align-items: center;
    margin-top: 8px;
    border-radius: 10px;
    overflow: hidden;
}

#gameInputContainer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 70%;
    min-height: 36.875px !important;
}

#username-input {
    font-size: 16px;
    width: 80%;
    height: 100%;
    padding: 15px;
    outline: none;
    border: none;
    background-color: var(--border-color);
    resize: none;
    overflow: hidden;
    color: white;
}

#fetch-account-games-button {
    transform: translateY(-2px);
    margin-top: 4px;
    height: 50px;
    width: 20%;
}

.usernameVerifyBtn {
    font-size: 20px;
    background-color: var(--primary-color);
    border: none;
    cursor: pointer;
}

#load-type-dropdown-container {
    width: 30%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
}

#load-type-dropdown {
    border-radius: 10px;
    background-color: var(--border-color);
    color: white;
    font-weight: 100;
    border: none;
    outline: none;
    width: 100%;
    height: 100%;
    text-align: center;
    font-size: 16px;
    border-left: 5px solid var(--secondary-color);
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
    cursor: pointer;
}

@media screen and (min-width:960px) {

    input,
    button,
    select {
        height: 36.875px !important;
    }
}
</style>