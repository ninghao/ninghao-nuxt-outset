import { Plan } from '~/schema/plan';

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

    // 声明
    const statement = `
      SELECT
        *
      FROM
        plan;
    `;

    // 查询
    const [{ result }] = await surreal.query<[Array<Plan>]>(statement);

    return result;
  }
});
