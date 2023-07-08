import { createFollowDtoSchema, updateFollowDtoSchema } from '~/schema/follow';

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

    // 查询声明
    const statement = `
       SELECT 
         *,
         ->(available WHERE isPublished = true)->region AS available
       FROM 
         product
      ${conditions ? 'WHERE ' + conditions : ''}
       ORDER BY 
         created DESC
       LIMIT 
         $limit
       START 
         $start
       FETCH 
         category, brand, available;
     `;
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
