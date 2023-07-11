import { Product } from '~/schema/product';

export default defineEventHandler(async (event) => {
  // 请求方法
  const method = getMethod(event);

  if (method === 'GET') {
    // 检查用户身份
    authGuard(event);

    // 参数
    const { limit, start, conditions } = getEntitiesApiParams(event);

    const user = event.context.user?.id;

    // 查询声明
    const statement = `
       SELECT 
         id, sku, color, title, brand, image,
         ->(available WHERE isPublished = true)->region AS available,
         count(->available<-(follow WHERE in == $user)) > 0 AS isFollowed
       FROM 
         product
      ${conditions ? 'WHERE ' + conditions : ''}
       LIMIT 
         $limit
       START 
         $start
       FETCH 
         category, brand, available;
     `;

    // 查询参数
    const statementParams = {
      limit,
      start,
      user,
    };

    // 查询
    const [{ result }] = await surreal.query<[Array<Product>]>(
      statement,
      statementParams,
    );

    // 统计
    const [countResult] = await surreal.query<[Array<{ count: number }>]>(
      `select count() from product ${conditions ? 'WHERE ' + conditions : ''} group all`,
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
});
