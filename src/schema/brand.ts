import { z } from 'zod';
import { schema } from './base';

/**
 * 创建
 */
export const createBrandDtoSchema = schema.merge(
  z.object({
    logo: z
      .string({
        required_error: '请提供标志文件名',
      })
      .trim()
      .min(1, { message: '标志文件名不能为空白' }),
  }),
);

/**
 * 修改
 */
export const updateBrandDtoSchema = z.optional(createBrandDtoSchema.partial());

/**
 * 实体
 */
export const brandSchema = z.object({
  id: z.string(),
  name: z.string(),
  title: z.string(),
  alias: z.string(),
  logo: z.string(),
});

/**
 * 列表
 */
export const brandsSchema = z.array(brandSchema);

/**
 * 类型
 */
export type Brand = z.infer<typeof brandSchema>;
export type Brands = z.infer<typeof brandsSchema>;
export type CreateBrandDto = z.infer<typeof createBrandDtoSchema>;
export type UpdateBrandDto = z.infer<typeof updateBrandDtoSchema>;

/**
 * 空白
 */
export const _brand = {
  name: '',
  title: '',
  alias: '',
  area: '',
  code: '',
  website: '',
  brand: '',
};
