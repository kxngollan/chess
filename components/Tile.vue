<template>
    <div :class="['tile', color]">
        <span v-if="possibleMove" class="highlight" @click="console.log('clicked')"></span>
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: ["color", "tile", "possibleMove"],
    watch: {


    }
}
</script>
<style scoped>
.tile {
    width: 12.5%;
    aspect-ratio: 1/1;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
}



.highlight {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 10;
}

.highlight::after {
    content: '';
    position: absolute;
    top: 40%;
    left: 40%;
    width: 20%;
    height: 20%;
    background-color: rgba(0, 200, 0, 0.6);
    box-sizing: border-box;
    border-radius: 100%;
    pointer-events: none;
}

.white {
    background-color: antiquewhite;
}

.black {
    background-color: gray;
}
</style>