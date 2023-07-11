import { createSubscriptionDtoSchema, Subscription } from '~/schema/subscription';

export default defineEventHandler(async (event) => {
  // 请求方法
  const method = getMethod(event);

  // 身份验证
  authGuard(event);

  if (method === 'GET') {
    // 参数
    const { limit, start, conditions } = getEntitiesApiParams(event);

    // 用户
    const user = event.context.user?.id;

    // 声明
    const statement = `
      SELECT * FROM subscription
        WHERE user == $user ${conditions ? 'AND ' + conditions : ''}
        FETCH plan;
    `;

    // 参数
    const statementParams = { limit, start, user };

    // 查询
    const [{ result }] = await surreal.query<[Array<Subscription>]>(
      statement,
      statementParams,
    );

    // 返回
    return result;
  }

  // 创建实体
  if (method === 'POST') {
    // 主体
    const body = await parseBody(event, createSubscriptionDtoSchema);

    // 用户
    const user = event.context.user?.id;

    // 状态
    const status = 'pending';

    // 创建订阅
    const [result] = await surreal.create('subscription', { ...body, user, status });

    // 返回
    return result;
  }

  return 'subscriptions';
});
