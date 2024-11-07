<template>
    <NuxtImg v-if="pieceImage" :src="pieceImage" :alt="piece"></NuxtImg>
</template>

<script>
export default {
    props: ["piece"],
    computed: {
        pieceImage() {
            if (this.piece.startsWith("w") || this.piece.startsWith("b")) {
                const path = `/img/${this.piece}.png`
                return path;
            }
        }
    }
}
</script>

<style scoped>
img:hover {
    cursor: pointer;
}
</style>
