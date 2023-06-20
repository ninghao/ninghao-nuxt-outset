import type { Config } from 'tailwindcss';

export default <Partial<Config>>{
  // 安全列表
  safelist: [],

  // 内容
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './node_modules/flowbite.{js,ts}',
  ],

  // 主题
  theme: {
    extend: {
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'in-out-expo': 'cubic-bezier(0.87, 0, 0.13, 1)',
      },
      aspectRatio: {
        '4/3': '4 / 3',
        '1/1': '1 / 1',
        '3/4': '3 / 3.3',
        '1.106/1': '1.106 / 1',
      },
    },
  },
};
