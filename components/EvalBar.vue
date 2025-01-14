<template>
    <svg id="evaluation-bar" width="40" height="730" xmlns="http://www.w3.org/2000/svg" fill="#fff">
        <rect id="black-rect" x="0" y="0" width="40" height="365" fill="#000000"></rect>

        <rect id="white-rect" x="0" y="365" width="40" height="365" fill="#ffffff"></rect>
        <text id="white-eval-text" x="20" y="720" fill="#000" font-size="16" text-anchor="middle"
            visibility="visible">0.0</text>
        <text id="black-eval-text" x="20" y="20" fill="#fff" font-size="16" text-anchor="middle"
            visibility="hidden">0.0</text>
    </svg>
</template>