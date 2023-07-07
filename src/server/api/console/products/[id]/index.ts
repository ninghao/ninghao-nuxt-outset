import { Product, updateProductDtoSchema } from '~/schema/product';

export default defineEventHandler(async (event) => {
  // ID 参数
  const id = getRouterParam(event, 'id');

  // 请求方法
  const method = getMethod(event);

  /**
   * 单个实体
   */
  if (method === 'GET') {
    // 检查用户身份
    authGuard(event);

    // 检查用户权限
    if (event.context.ability.cannot('read', 'Product')) {
      forbiddenException();
    }

    // 查询声明
    const statement = `
      SELECT 
        *,
        ->(available WHERE isPublished = true)->region AS available
      FROM 
        product
      WHERE 
        id = $id
      FETCH 
        brand, category, available;
    `;

    // 查询参数
    const statementParams = { id };

    // 执行查询
    const [{ result }] = await surreal.query<[Array<Product>]>(
      statement,
      statementParams,
    );

    // 返回结果
    return result![0];
  }

  /**
   * 修改实体
   */
  if (method === 'PUT') {
    // 检查用户身份
    authGuard(event);

    // 检查用户权限
    if (event.context.ability.cannot('update', 'Product')) {
      forbiddenException();
    }

    const body = await parseBody(event, updateProductDtoSchema);

    const [result] = await surreal.merge(id!, body);

    return result;
  }

  /**
   * 删除实体
   */
  if (method === 'DELETE') {
    // 检查用户身份
    authGuard(event);

    // 检查用户权限
    if (event.context.ability.cannot('delete', 'Product')) {
      forbiddenException();
    }

    const [result] = await surreal.delete(id!);

    return result;
  }
});
