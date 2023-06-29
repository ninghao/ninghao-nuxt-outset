import { updateRegionDtoSchema, Region } from '~/schema/region';

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  const method = getMethod(event);

  /**
   * 获取区域
   */
  if (method === 'GET') {
    // 检查用户身份
    authGuard(event);

    // 检查用户权限
    if (event.context.ability.cannot('read', 'Region')) {
      forbiddenException();
    }

    const [{ result }] = await surreal.query<[Array<Region>]>(
      `
        SELECT * 
        FROM region
        WHERE id = $id
        FETCH brand;
      `,
      { id },
    );

    return result![0];
  }

  /**
   * 更新区域
   */
  if (method === 'PUT') {
    // 检查用户身份
    authGuard(event);

    // 检查用户权限
    if (event.context.ability.cannot('update', 'Region')) {
      forbiddenException();
    }

    const body = await parseBody(event, updateRegionDtoSchema);
    const [result] = await surreal.merge(id!, body);

    return result;
  }
});
