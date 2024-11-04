<template>
    <div class="tile" :class="color">
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: ["color"]
}
</script>
<style scoped>
.tile {
    width: 12.5%;
    aspect-ratio: 1/1;
    display: flex;
    justify-content: center;
    align-items: center;

}

.white {
    background-color: antiquewhite;
}

.black {
    background-color: gray;
}
</style>