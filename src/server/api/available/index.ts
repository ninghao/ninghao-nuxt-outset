import { createAvailableDtoSchema, updateAvailableDtoSchema } from '~/schema/available';

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
      RELATE $product->available->$region CONTENT {
        isPublished: true
      }
    `;

    // 查询变量
    const statementParams = { product: body.product, region: body.region };

    // 执行查询
    const [result] = await surreal.query(statement, statementParams);

    // 返回结果
    return result;
  }

  /**
   * 修改来源
   */
  if (method === 'PUT') {
    // 检查用户身份
    authGuard(event);

    // 检查用户权限
    if (event.context.ability.cannot('update', 'Available')) {
      forbiddenException();
    }

    // 请求主体
    const body = await parseBody(event, updateAvailableDtoSchema);

    // 查询声明
    const statement = `
      UPDATE
        available 
      SET
        isPublished = $isPublished
      WHERE 
        in = $product AND out = $region
    `;

    // 查询变量
    const statementParams = {
      product: body.product,
      region: body.region,
      isPublished: body.isPublished,
    };

    // 执行查询
    const [{ result }] = await surreal.query(statement, statementParams);

    // 返回结果
    return result;
  }
});
