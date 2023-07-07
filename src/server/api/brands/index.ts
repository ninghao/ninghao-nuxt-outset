import { Brand, createBrandDtoSchema } from '~/schema/brand';

export default defineEventHandler(async (event) => {
  const method = getMethod(event);

  if (method === 'GET') {
    // 检查用户身份
    authGuard(event);

    // 检查用户权限
    if (event.context.ability.cannot('read', 'Brand')) {
      forbiddenException();
    }

    const [{ result }] = await surreal.query<[Array<Brand>]>(`
      SELECT * FROM brand;
    `);

    return result;
  }

  if (method === 'POST') {
    // 检查用户身份
    authGuard(event);

    // 检查用户权限
    if (event.context.ability.cannot('create', 'Brand')) {
      forbiddenException();
    }

    const body = await parseBody(event, createBrandDtoSchema);
    const [result] = await surreal.create(`brand:${body.name}`, body);

    return result;
  }

  return 'brands';
});
