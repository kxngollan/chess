<template>
    <div class="module">
        <div class="overflow"></div>
        <div class="result">
            <h2>Result :</h2>
            <br>
            <h1> Draw by {{ drawType }}</h1>
        </div>
    </div>
</template>

<script>
export default {
    props: ["drawType"],
}
</script>

<style>
.module {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    aspect-ratio: 1/1;
    z-index: 10;
}

.overflow {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 1;
}

.result {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 720px;
    border-radius: 5px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    background-color: rgba(255, 255, 255, 0.313);
    padding: 20px;
    z-index: 20;
}

h2 {
    margin-right: 5px;
}
</style>