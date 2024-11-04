// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  app: {
    head: {
      title: "Chess",
    },
  },
  devtools: { enabled: true },
  modules: ["@nuxt/image"],
});
