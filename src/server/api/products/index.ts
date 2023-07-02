import { Product } from '~/schema/product';

export default defineEventHandler(async (event) => {
  const method = getMethod(event);

  /**
   * 列表
   */
  if (method === 'GET') {
    // 检查用户身份
    authGuard(event);

    // 检查用户权限
    if (event.context.ability.cannot('read', 'Origin')) {
      forbiddenException();
    }

    const [{ result }] = await surreal.query<[Array<Product>]>(`
      SELECT * 
      FROM product
      LIMIT 25
      FETCH category, brand;
    `);

    const [countResult] = await surreal.query(`select count() from product group all`);

    const totalCount = countResult.result ? (countResult as any).result[0].count : 0;
    const totalPages = Math.ceil(totalCount / 25);

    setHeaders(event, {
      'x-total-count': totalCount,
      'x-total-pages': totalPages,
    });

    return result;
  }
});
