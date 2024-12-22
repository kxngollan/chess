<template>
    <div class="rank">
        <span v-for="rank in ranks" :key="rank">{{ rank }}</span>
    </div>
</template>

<script>
export default {
    props: ["ranks"],
    computed: {

    }
}
</script>

<style scoped>
.rank {
    height: 720px;
    width: 16px;
    display: flex;
    flex-direction: column;
    position: absolute;
    right: -16;
}

span {
    display: flex;
    height: 12.5%;
    align-items: center;
    justify-content: center;
    margin: 0;
}
</style>