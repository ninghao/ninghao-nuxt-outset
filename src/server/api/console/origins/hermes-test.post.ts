// https://bck.hermes.cn/products?locale=cn_zh&category=WOMENBAGSSMALLLEATHERGOODS&sort=relevance&offset=200&pagesize=40

import { hermesCnRestfulHeaders } from '~/server/utils/origin';

export default defineEventHandler(async (event) => {
  const method = getMethod(event);
  // 检查用户身份
  authGuard(event);
  const url =
    'https://bck.hermes.cn/products?locale=cn_zh&category=WOMENBAGSSMALLLEATHERGOODS&sort=relevance&offset=200&pagesize=40';

  let count = 0;

  setInterval(async () => {
    try {
      const result: any = await $fetch(url, {
        headers: hermesCnRestfulHeaders,
      });

      count++;

      console.log(count, '请求成功', (result as any).total);
    } catch (error) {
      console.log('出错了');
    }
  }, 5000);

  return 'ok';
});
