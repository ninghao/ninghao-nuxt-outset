import { Brand } from '~/schema/brand';

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  const method = getMethod(event);

  if (method === 'GET') {
    // 检查用户身份
    authGuard(event);

    // 检查用户权限
    if (event.context.ability.cannot('create', 'Brand')) {
      forbiddenException();
    }

    const [{ result }] = await surreal.query<[Array<Brand>]>(
      `
        SELECT * 
        FROM brand
        WHERE id = $id;
      `,
      { id },
    );

    return result![0];
  }
});
