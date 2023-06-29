import { updateRegionDtoSchema } from '~/schema/region';

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  const method = getMethod(event);

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
