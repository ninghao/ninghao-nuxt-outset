import { Region, createRegionDtoSchema } from '~/schema/region';

export default defineEventHandler(async (event) => {
  const method = getMethod(event);

  /**
   * 区域列表
   */
  if (method === 'GET') {
    // 检查用户身份
    authGuard(event);

    // 检查用户权限
    if (event.context.ability.cannot('read', 'Region')) {
      forbiddenException();
    }

    const [{ result }] = await surreal.query<[Array<Region>]>(`
      SELECT * 
      FROM region 
      FETCH brand;
    `);

    return result;
  }

  /**
   * 创建区域
   */
  if (method === 'POST') {
    // 检查用户身份
    authGuard(event);

    // 检查用户权限
    if (event.context.ability.cannot('create', 'Region')) {
      forbiddenException();
    }

    const body = await parseBody(event, createRegionDtoSchema);
    const [result] = await surreal.create(`region:${body.name}`, body);

    return result;
  }
});
