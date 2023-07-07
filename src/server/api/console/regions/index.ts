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

    // 准备查询
    const { where } = getEntitiesApiParams(event);

    // 查询声明
    const statement = `
      SELECT * 
      FROM region
      ${where}
      FETCH brand;
    `;

    // 执行查询
    const [{ result }] = await surreal.query<[Array<Region>]>(statement);

    // 返回结果
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
