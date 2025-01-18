<template>
    <div class="big-depth-container">
        <div class="spacer">
            <span class="depthTitle white">
                <Icon name="material-symbols:settings" />
                <p>Depth</p>
            </span>
            <div class="badboystiff">
                <span>Arrows|</span>
                <label class="toggle" for="suggestion-arrows-setting">
                    <input id="suggestion-arrows-setting" type="checkbox" />
                    <div class="toggle__fill"></div>
                </label>
            </div>
        </div>
        <div id="depth-slider-container">
            <input id="depth-slider" type="range" min="14" max="20" v-model="depth" :style="sliderBackground" />
            <span id="depth-counter" class="white">{{ depth }}|</span>
        </div>
    </div>
</template>

<script>
import { Icon } from "@iconify/vue";

export default {
    components: { Icon },
    data() {
        return {
            depth: 16
        }
    },
    computed: {
        sliderBackground() {
            const min = 14;
            const max = 20;
            const percentage = ((this.depth - min) / (max - min)) * 100;
            return {
                background: `linear-gradient(to right, #4caf50 0%, #4caf50 ${percentage}%, var(--secondary-color) ${percentage}%, var(--secondary-color) 100%)`,
            };
        },
    }
}
</script>

<style>
.spacer {
    height: 40px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

#suggestion-arrows-setting {
    display: none;
}

.white {
    color: white
}

.big-depth-container {
    width: 90%;
    padding: 10px;
    color: white;
    display: flex;
    bottom: 0px;
    border-radius: 10px;
    position: relative;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    background-color: var(--primary-color);
    margin-bottom: 5px;
}

.depthTitle {
    display: flex;
    align-items: center;
    justify-content: space-between;

}

.depthTitle p {
    margin-left: 4px;
}

.badboystiff {
    display: flex;
}

.toggle {
    --width: 40px;
    --height: 20px;
    --border-radius: 5px;
    display: inline-block;
    cursor: pointer;
}

.toggle__fill {
    position: relative;
    width: var(--width);
    height: var(--height);
    border-radius: var(--border-radius);
    background: var(--secondary-color);
    transition: background-color 0.2s;
}

#suggestion-arrows-setting:checked~.toggle__fill {
    background: #4caf50;
}

#suggestion-arrows-setting:checked~.toggle__fill::after {
    transform: translateX(var(--height));
}

#depth-slider-container {
    display: flex;
    margin-top: 7px;
    justify-content: flex-start;
    align-content: center;
    width: 100%;
    background-color: var(--primary-color);
    position: relative;
}

#depth-counter {
    width: 20%;
    background-color: var(--primary-color);
    display: flex;
    justify-content: center;
    align-items: center;
}

#depth-slider {
    width: 80%;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    outline: none;
    height: 20px;
    border-radius: 5px;
    background: linear-gradient(to right,
            #4caf50 0%,
            #4caf50 35%,
            var(--secondary-color) 30%,
            var(--secondary-color) 100%);
}

#depth-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    background: rgb(255, 255, 255);
    width: 20px;
    height: 20px;
    border-radius: 5px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.6);
}

#depth-slider::-webkit-slider-thumb::before {
    content: "";
    display: block;
    width: 10px;
    height: 10px;
    background: none;
    border-radius: 50%;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

#depth-slider::-moz-range-thumb {
    background: rgb(255, 255, 255);
    width: 20px;
    height: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 1);
}

#depth-slider::-moz-range-thumb::before {
    content: "";
    display: block;
    width: 10px;
    height: 10px;
    background: none;
    border-radius: 50%;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

#depth-slider::-ms-thumb {
    background: rgb(255, 255, 255);
    width: 20px;
    height: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 1);
}

#depth-slider::-ms-thumb::before {
    content: "";
    display: block;
    width: 10px;
    height: 10px;
    background: none;
    border-radius: 50%;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>