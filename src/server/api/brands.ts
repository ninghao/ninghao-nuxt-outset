import { CreateBrandBody, CreateBrandBodySchema } from '../schema/brand';

const createBrand = async (brand: CreateBrandBody) => {
  return surreal.create(`brand:${brand.name}`, brand);
};

export default defineEventHandler(async (event) => {
  const method = getMethod(event);

  if (method === 'POST') {
    // 检查用户身份
    authGuard(event);

    // 检查用户权限
    if (event.context.ability.cannot('create', 'Brand')) {
      forbiddenException();
    }

    const body = await parseBody(event, CreateBrandBodySchema);
    const result = await createBrand(body);

    return result;
  }

  return 'brands';
});
