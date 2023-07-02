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
      FETCH category, brand;
    `);

    return result;
  }
});
