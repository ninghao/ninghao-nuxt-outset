import { createAvailableDtoSchema } from '~/schema/available';

export default defineEventHandler(async (event) => {
  /**
   * 请求方法
   */
  const method = getMethod(event);

  /**
   * 创建来源
   */
  if (method === 'POST') {
    // 检查用户身份
    authGuard(event);

    // 检查用户权限
    if (event.context.ability.cannot('create', 'Available')) {
      forbiddenException();
    }

    // 请求主体
    const body = await parseBody(event, createAvailableDtoSchema);

    // 查询声明
    const statement = `
      RELATE $product->available->$region
    `;

    // 查询变量
    const statementParams = { product: body.product, region: body.region };

    // 执行查询
    const [result] = await surreal.query(statement, statementParams);

    // 返回结果
    return result;
  }
});
