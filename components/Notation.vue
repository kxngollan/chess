<template>
    <div class="notation">
        <p v-for="(position, index) in positions.filter((_, idx) => idx > 0)" :key="index"
            v-if="(positions.length > 0)">
            <span v-if="index % 2 === 0">
                {{ Math.ceil(position.turn / 2) }}.
            </span>
            <span>
                {{ position.notation }}
            </span>
        </p>
    </div>
</template>

<script>
export default {
    props: ["positions"],
}
</script>

<style>
.notation {
    display: grid;
    grid-template-columns: 1fr 1fr;
    /* Two columns */
    grid-auto-rows: min-content;
    /* Automatically adjusts row height to fit content */
    gap: 10px;
    /* Consistent spacing between grid items */
    height: 400px;
    width: 200px;
    padding: 10px;
    overflow-y: auto;
    /* Enables scrolling for overflow */
    font-size: 1.2em;
    color: #333;
    border: 1px solid #ccc;
    border-radius: 10px;
    background-color: #fff;
}

.notation p {
    margin: 0;
    padding: 5px;
    font-family: 'Arial', sans-serif;
    display: flex;
    gap: 5px;
}

.notation span {
    margin-right: 0;
}
</style>
