export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  // Переменные окружения
  runtimeConfig: {
    // Переменные, доступные только на сервере
    apiDomain: process.env.NUXT_API_DOMAIN || "simprint",
    apiKey: process.env.NUXT_API_KEY || "81d3c7e1-3552-4012-8102-9e35657559c5",
    apiBaseUrl:
      process.env.NUXT_API_BASE_URL || "https://api.simprint.ddns.net/v1/",

    // Переменные, доступные на клиенте
    public: {
      apiDomain: process.env.NUXT_API_DOMAIN || "simprint",
      apiBaseUrl:
        process.env.NUXT_API_BASE_URL || "https://api.simprint.ddns.net/v1/",
    },
  },

  modules: [
    "@nuxt/image",
    "@nuxt/scripts",
    "@nuxtjs/tailwindcss",
    "nuxt-swiper",
    [
      "@pinia/nuxt",
      {
        storesDirs: ["./app/store/**"],
      },
    ],
    [
      "@nuxtjs/google-fonts",
      {
        families: {
          Manrope: [400, 500, 600, 700, 800],
          Onest: [400, 500, 600, 700, 800],
        },
        display: "swap",
      },
    ],
  ],
});
