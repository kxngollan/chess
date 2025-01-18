<template>
    <NuxtImg v-if="pieceImage" :src="pieceImage" :alt="piece" draggable="false"></NuxtImg>
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
img {
    max-width: 90%;
    object-fit: contain;
}

img:hover {
    cursor: pointer;
}
</style>
