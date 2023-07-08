import { createFollowDtoSchema, updateFollowDtoSchema } from '~/schema/follow';
import { Product } from '~/schema/product';

export default defineEventHandler(async (event) => {
  // 请求方法
  const method = getMethod(event);

  // 检查用户身份
  authGuard(event);

  // 当前用户
  const user = event.context.user?.id;

  /**
   * 列表
   */
  if (method === 'GET') {
    // 参数
    const { limit, start, conditions } = getEntitiesApiParams(event);

    // 条件
    const _conditions = `
      ->(available WHERE isPublished == true)<-follow<-(user WHERE id == $user)
      ${conditions ? 'AND ' + conditions : ''}    
    `;

    // 声明
    const statement = `
       SELECT
         *,
         ->(available WHERE isPublished = true)->region AS available,
         count(->available<-(follow WHERE in == $user)) > 0 AS isFollowed
       FROM
         product
       WHERE
         ${_conditions}
       ORDER BY
         created DESC
       LIMIT
         $limit
       START
         $start
       FETCH
         category, brand, available;
     `;

    // 参数
    const statementParams = { user, limit, start };

    // 执行
    const [{ result }] = await surreal.query<[Array<Product>]>(
      statement,
      statementParams,
    );

    /**
     * 统计
     */
    const countStatement = `
      SELECT 
        count() 
      FROM 
        product 
      WHERE
        ${_conditions}
      GROUP ALL
    `;

    const countStatementParams = { user };

    const [{ result: countResult }] = await surreal.query<[Array<{ count: number }>]>(
      countStatement,
      countStatementParams,
    );

    if (countResult?.length) {
      const totalCount = countResult[0].count;
      const totalPages = Math.ceil(totalCount / limit);

      setHeaders(event, {
        'x-total-count': totalCount,
        'x-total-pages': totalPages,
      });
    }

    // 返回结果
    return result;
  }

  /**
   * 创建
   */
  if (method === 'POST') {
    // 检查用户权限
    // if (event.context.ability.cannot('create', 'Product')) {
    //   forbiddenException();
    // }

    const body = await parseBody(event, createFollowDtoSchema);

    /**
     * 确认可用区
     */
    const availableStatement = `
      SELECT id, isPublished 
      FROM available 
      WHERE in == $product AND out == $region    
    `;

    const availableStatementParams = body;

    type AvailableResult = [Array<{ id: string; isPublished: boolean }>];

    const [{ result: availableResult }] = await surreal.query<AvailableResult>(
      availableStatement,
      availableStatementParams,
    );

    const available =
      availableResult?.length && availableResult[0].isPublished
        ? availableResult[0].id
        : undefined;

    if (!available) {
      throw createError({ message: '不能完成操作', statusCode: 400 });
    }

    /**
     * 确认是否已关注
     */

    const followStatement = `
      SELECT * 
      FROM follow 
      WHERE in = $user AND out = $available
    `;

    const followStatementParams = { user, available };

    type FollowResult = [Array<{ id: string }>];

    const [{ result: followResult }] = await surreal.query<FollowResult>(
      followStatement,
      followStatementParams,
    );

    if (followResult?.length) {
      throw createError({ message: '已关注', statusCode: 400 });
    }

    /**
     * 确定关注
     */

    const createFollowStatement = `
      RELATE $user->follow->$available;
    `;

    const createFollowStatementParams = { user, available };

    const [{ result }] = await surreal.query<FollowResult>(
      createFollowStatement,
      createFollowStatementParams,
    );

    return result;
  }

  /**
   * 修改
   */
  if (method === 'PUT') {
    const body = await parseBody(event, updateFollowDtoSchema);

    /**
     * 确认可用区
     */
    const availableStatement = `
      SELECT id, isPublished 
      FROM available 
      WHERE in == $product AND out == $region;
    `;

    const availableStatementParams = body;

    type AvailableResult = [Array<{ id: string; isPublished: boolean }>];

    const [{ result: availableResult }] = await surreal.query<AvailableResult>(
      availableStatement,
      availableStatementParams,
    );

    const available = availableResult?.length ? availableResult[0].id : undefined;

    if (!available) {
      throw createError({ message: '不能完成操作', statusCode: 400 });
    }

    /**
     * 取消关注
     */
    const updateFollowStatement = `
      DELETE follow WHERE in = $user AND out = $available;
    `;

    const updateFollowStatementParams = {
      user,
      available,
    };

    const [{ result }] = await surreal.query<AvailableResult>(
      updateFollowStatement,
      updateFollowStatementParams,
    );

    return result;
  }
});
