import { Category } from '~/schema/category';
import { entitiesRequestQuerySchema } from '~/schema/api';

export default defineEventHandler(async (event) => {
  const method = getMethod(event);

  /**
   * 列表
   */
  if (method === 'GET') {
    // 检查用户身份
    authGuard(event);

    // 检查用户权限
    if (event.context.ability.cannot('read', 'Category')) {
      forbiddenException();
    }

    // 查询参数
    const config = useRuntimeConfig();
    const query = parseQuery(event, entitiesRequestQuerySchema);

    const limit = parseInt(`${config.public.entitiesPerPage}`, 10);
    const start = query.page === 1 ? 0 : (query.page - 1) * limit;

    const [{ result }] = await surreal.query<[Array<Category>]>(
      `
        SELECT 
          *
        FROM 
          category
        ORDER BY brand DESC
     
        FETCH 
          brand;
      `,
      { limit, start },
    );

    // const [countResult] = await surreal.query(`SELECT count() FROM category GROUP all`);
    // const totalCount = countResult.result ? (countResult as any).result[0].count : 0;
    // const totalPages = Math.ceil(totalCount / limit);

    // setHeaders(event, {
    //   'x-total-count': totalCount,
    //   'x-total-pages': totalPages,
    // });

    return result;
  }
});
