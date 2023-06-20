// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  /**
   * 模块
   */
  modules: ['@vueuse/nuxt', '@nuxthq/ui'],

  /**
   * 配置
   */
  runtimeConfig: {
    public: {
      appName: '',
      apiBaseUrl: '',
      apiToken: '',
    },
  },

  // 源文件目录
  srcDir: 'src',
});
