<template>
    <div class="not-found">
        <h1>Page Not Found</h1>
        <p>Sorry, the page you are looking for does not exist.</p>
        <nuxt-link to="/">Go back to Home</nuxt-link>
    </div>
</template>

<script>
export default {
    head() {
        return {
            title: 'Page Not Found - My Website'
        }
    }
}
</script>

<style scoped>
.not-found {
    text-align: center;
    padding: 50px;
}

h1 {
    font-size: 2.5em;
    color: #ff4d4d;
}

p {
    font-size: 1.2em;
}
</style>
