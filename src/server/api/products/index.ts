import { Product } from '~/schema/product';
import { createProductDtoSchema } from '~/schema/product';
import qs from 'qs';

export default defineEventHandler(async (event) => {
  const method = getMethod(event);

  /**
   * 列表
   */
  if (method === 'GET') {
    // 检查用户身份
    authGuard(event);

    // 检查用户权限
    if (event.context.ability.cannot('read', 'Product')) {
      forbiddenException();
    }

    // 参数
    const { limit, start, where } = getEntitiesApiParams(event);

    // 查询声明
    const statement = `
      SELECT *
      FROM product ${where}
      ORDER BY created DESC
      LIMIT $limit
      START $start
      FETCH category, brand;
    `;

    // 查询
    const [{ result }] = await surreal.query<[Array<Product>]>(statement, {
      limit,
      start,
    });

    // 统计
    const [countResult] = await surreal.query<[Array<{ count: number }>]>(
      `select count() from product ${where} group all`,
    );

    // 分页

    const totalCount =
      countResult.result && countResult.result.length ? countResult.result[0].count : 0;
    const totalPages = Math.ceil(totalCount / limit);

    setHeaders(event, {
      'x-total-count': totalCount,
      'x-total-pages': totalPages,
    });

    return result;
  }

  /**
   * 创建
   */
  if (method === 'POST') {
    // 检查用户身份
    authGuard(event);

    // 检查用户权限
    if (event.context.ability.cannot('create', 'Product')) {
      forbiddenException();
    }

    const body = await parseBody(event, createProductDtoSchema);

    const [result] = await surreal.create(`product`, body);

    return result;
  }
});
