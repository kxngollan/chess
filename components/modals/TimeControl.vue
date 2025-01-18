<template>
    <b v-if="timeClass === 'bullet'">
        Bullet
        <Icon name="fa6-solid:gun" />
    </b>
    <b v-else-if="timeClass === 'blitz'">
        Blitz
        <Icon name="mdi:lightning-bolt" />
    </b>
    <b v-else-if="timeClass === 'rapid'">
        Rapid
        <Icon name="mdi:timer-sand" />
    </b>
    <b v-else-if="timeClass === 'classical'">
        Classical
        <Icon name="mdi:chess-queen" />
    </b>
    <b v-else-if="timeClass === 'daily'">
        Daily
        <Icon name="material-symbols:sunny" />
    </b>
</template>

<script>
export default {
    props: ["timeClass"]
}
</script>