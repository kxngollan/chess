<template>
    <div class="container">
        <div class="loader"></div>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
    width: 100%;
}

.loader {
    width: 40px;
    aspect-ratio: 1;
    background: #554236;
    display: grid;
    animation: l4-0 1s infinite linear;
}

.loader::before,
.loader::after {
    content: "";
    grid-area: 1/1;
    background: #000000;
    animation: inherit;
    animation-name: l4-1;
}

.loader::after {
    background: antiquewhite;
    --s: 60deg;
}

@keyframes l4-0 {

    0%,
    20% {
        transform: rotate(0)
    }

    100% {
        transform: rotate(90deg)
    }
}

@keyframes l4-1 {
    50% {
        transform: rotate(var(--s, 30deg))
    }

    100% {
        transform: rotate(0)
    }
}
</style>