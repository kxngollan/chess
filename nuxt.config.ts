// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  app: {
    head: {
      title: "Chess",
      link: [{ rel: "icon", type: "image/x-icon", href: "/img/wp.png" }],
    },
  },
  devtools: { enabled: true },
  modules: ["@nuxt/image", "@nuxt/icon"],
  icon: {
    serverBundle: {
      collections: ["mdi", "fa"],
    },
  },
});
