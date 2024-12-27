<template>
    <div class="notation">
        <p v-for="(position, index) in positions.filter((_, idx) => idx > 0)" :key="index" v-if="positions.length > 0"
            ref="positionRefs">
            <span v-if="index % 2 === 0">
                {{ Math.ceil(position.turn / 2) }}.
            </span>
            <span :class="index === positions.length - 2 ? 'moved' : ''">
                {{ position.notation }}
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
        }
    },
    updated() {
        const positionRefs = this.$refs.positionRefs;
        if (positionRefs && positionRefs.length > 0) {
            const lastElement = positionRefs[positionRefs.length - 1];
            lastElement.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }
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
