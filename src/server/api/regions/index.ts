import { createRegionDtoSchema } from '~/schema/region';

export default defineEventHandler(async (event) => {
  const method = getMethod(event);

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
