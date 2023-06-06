// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  /**
   * 模块
   */
  modules: ["@nuxtjs/tailwindcss", "@vueuse/nuxt"],

  /**
   * 配置
   */
  runtimeConfig: {
    public: {
      appName: "",
      apiBaseUrl: "",
      apiToken: "",
    },
  },
});
