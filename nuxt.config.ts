// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  /**
   * 开发者工具
   */
  devtools: { enabled: false },

  /**
   * 模块
   */
  modules: ['@vueuse/nuxt', '@nuxthq/ui', '@vueuse/nuxt', '@pinia/nuxt'],

  /**
   * 配置
   */
  runtimeConfig: {
    // 公开配置
    public: {
      appName: '',
      apiBaseUrl: '/api',
      apiToken: '',
      entitiesPerPage: 25,
    },

    // Surreal 数据库
    surreal: {
      url: 'http://127.0.0.1:8000/rpc',
      rootUser: 'yoyo',
      rootPass: 'password',
      namespace: 'yoyo',
      database: 'app',
      scope: 'authenticated',
      tokenName: 'yoyo_token',
      administratorName: 'wanghao',
      administratorPassword: '258369',
      authenticatedName: 'xiaoxue',
      authenticatedPassword: '258369',
    },

    // JWT
    jwt: {
      publicKey: '',
      privateKey: '',
      expiresIn: '7d',
    },

    // API
    api: {
      entitiesPerPage: '25',
    },

    // 微信支付
    wechatPay: {
      appId: '',
      mchId: '',
      key: '',
      apiBase: '',
      authType: '',
      serial: '',
      apiKeyPath: '',
    },
  },

  // 源文件目录
  srcDir: 'src',

  /**
   * 导入
   */
  imports: {
    dirs: ['composables/**', 'stores', 'stores/**'],
  },

  /**
   * Pinia
   */
  pinia: {
    autoImports: ['defineStore', 'storeToRefs'],
  },
});
