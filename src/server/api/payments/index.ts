import { Payments } from '~/schema/payment';

export default defineEventHandler(async (event) => {
  // 请求方法
  const method = getMethod(event);

  // 检查用户身份
  authGuard(event);

  if (method === 'GET') {
    // 声明
    const statement = `
      SELECT * FROM payment
        WHERE isPublished = true
        ORDER BY index ASC
    `;

    // 查询
    const [{ result }] = await surreal.query<[Payments]>(statement);

    // 返回
    return result;
  }
});
