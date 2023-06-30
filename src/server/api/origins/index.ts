import { Region, createRegionDtoSchema } from '~/schema/region';

export default defineEventHandler(async (event) => {
  const method = getMethod(event);

  /**
   * 来源列表
   */
  if (method === 'GET') {
    // 检查用户身份
    authGuard(event);

    // 检查用户权限
    if (event.context.ability.cannot('read', 'Origin')) {
      forbiddenException();
    }

    const [{ result }] = await surreal.query<[Array<Region>]>(`
      SELECT * 
      FROM origin 
      FETCH region;
    `);

    return result;
  }

  /**
   * 创建来源
   */
  if (method === 'POST') {
    // 检查用户身份
    authGuard(event);

    // 检查用户权限
    if (event.context.ability.cannot('create', 'Origin')) {
      forbiddenException();
    }

    // const body = await parseBody(event, createRegionDtoSchema);
    const body = await readBody(event);
    const [result] = await surreal.create(`origin`, body);

    return result;
  }
});
