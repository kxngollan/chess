<template>
    <div class="notation">
        <p v-for="(n, index) in positions" :key="index" v-if="positions.length > 0" @click="changeIndex(index)"
            autofocus>
            <span>
                {{ Math.ceil((index + 1) / 2) }}.
            </span>
            <span :class="index === positionIndex - 1 ? 'moved' : ''">
                {{ n }}
            </span>
        </p>
    </div>
</template>


<script>
export default {
    props: {
        positions: {
            type: Array,
            default: () => []
        },
        notation: Array,
        positionIndex: Number
    },
    emits: ["changeIndex"],
    methods: {
        changeIndex(index) {
            this.$emit("changeIndex", index + 1)
        }
    }
};
</script>


<style scoped>
.notation {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    padding: 3px 20px;
    width: 90%;
    height: 420px;
    max-height: 420px;
    overflow-y: auto;
    background-color: var(--primary-color);
    color: white;
    border-radius: 10px;
}

.notation p {
    margin: 0;
    padding: 5px;
    font-family: 'Arial', sans-serif;
    display: flex;
    align-items: center;
    justify-content: start;
    font-size: large;
    gap: 2px;
    word-wrap: normal;
    white-space: normal;
    width: calc(48%-5px);
    height: 20px;
    padding: 2px;
    border: 3px solid var(--primary-color);
    margin-bottom: 3px;
    border-radius: 3px;
}

p:hover {
    cursor: pointer;
    border: 3px solid #4caf50;
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
