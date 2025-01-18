<template>
  <NuxtPage />
</template>

<style>
:root {
  --border-color: #3f4248;
  --primary-color: #303338;
  --secondary-color: #1e1f22;
  --announcement-background-color: #5865f2;
  --tile: calc(730px/8)
}

body {
  margin: 0;
  background-color: rgba(49, 51, 56, 255);
  width: 100vw;
}

main {
  margin-top: 20px;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
}

@media only screen and (max-width: 960px) {
  main {
    display: flex;
    flex-direction: column;
    justify-content: start;
  }
}

@media only screen and (max-width: 1536px) {
  :root {
    --tile: calc(511.2px/8)
  }

  body {
    overflow-x: hidden;
    overflow-y: auto;
  }
}

@media only screen and (max-width: 960px) {
  :root {
    --tile: calc(480px/8)
  }

  body {
    overflow-x: hidden;
    overflow-y: auto;
  }
}

@media only screen and (max-width: 750px) {
  :root {
    --tile: calc(336px/8)
  }
}

@media only screen and (max-width: 380px) {
  :root {
    --tile: calc(272px/8)
  }
}
</style>