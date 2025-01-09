<template>
    <div class="notation">
        <p v-for="(n, index) in notation" :key="index" v-if="notation.length > 0">
            <span v-if="index % 2 === 0">
                {{ Math.ceil((index + 1) / 2) }}.
            </span>
            <span>
                {{ n }}
            </span>
        </p>
    </div>
</template>


<script>
export default {
    props: ["notation"],
};
</script>


<style scoped>
.notation {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-auto-rows: min-content;
    gap: 10px;
    height: 400px;
    width: 200px;
    padding: 10px;
    overflow-y: auto;
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

.moved {
    background-color: #75b1e5;
    font-weight: bold;
    border-left: 4px solid #007bff;
    padding-left: 8px;
}
</style>
