import {
  CreateBrandBody,
  CreateBrandBodySchema,
} from '../schema/brand';

const createBrand = async (brand: CreateBrandBody) => {
  return surreal.create(`brand:${brand.name}`, brand);
};

export default defineEventHandler(async (event) => {
  const method = getMethod(event);

  if (method === 'POST') {
    authGuard(event);

    const body = await parseBody(event, CreateBrandBodySchema);
    const result = await createBrand(body);
    return result;
  }

  return 'brands';
});
