<template>
    <NuxtImg :src="pieceImage" :alt="piece"></NuxtImg>
</template>

<script>
export default {
    props: ["piece"],

    computed: {
        pieceImage() {
            const path = `/img/${this.piece}.png`
            return path;
        }
    }

}
</script>

<style scoped>
img:active {
    cursor: grab;
}
</style>
