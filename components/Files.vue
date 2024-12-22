<template>
    <div class="file">
        <span v-for="file in files" :key="file">{{ file }}</span>
    </div>
</template>

<script>
export default {
    props: ["files"]
}
</script>

<style scoped>
.file {
    display: flex;
    justify-content: space-between;
    width: 720px;
}

span {
    display: flex;
    width: 12.5%;
    align-items: center;
    justify-content: center;
    margin: 0;
}
</style>
