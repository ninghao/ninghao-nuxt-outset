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

    const [{ result }] = await surreal.query<[Array<Product>]>(
      `
        SELECT * 
        FROM product
        WHERE id = $id;
      `,
      { id },
    );

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
