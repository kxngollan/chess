<template>
    <div class="notation">
        <p v-if="positions.length > 0" v-for="(position, index) in positions" :key="index">
            <span v-if="!(index === 0) && index % 2 === 1">
                {{ Math.ceil(position.turn / 2) }}.
            </span>
            <span v-if="!(index === 0)">
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
    height: 400px;
    width: 200px;
    padding: 0 10px;
    overflow-y: auto;
    font-size: 1.2em;
    border: 1px solid black;
    border-radius: 10px;
    margin-left: 20px;
}
</style>