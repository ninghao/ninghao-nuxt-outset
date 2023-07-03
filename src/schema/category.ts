import { z } from 'zod';
import { _brand, brandSchema } from '~/schema/brand';

/**
 * 实体
 */
export const categorySchema = z.object({
  id: z.string(),
  title: z.string(),
  alias: z.string(),
  categoryId: z.string(),
  url: z.string(),
  brand: z.union([brandSchema, z.string()]),
});

/**
 * 列表
 */
export const categoriesSchema = z.array(categorySchema);

/**
 * 类型
 */
export type Category = z.infer<typeof categorySchema>;
export type Categories = z.infer<typeof categoriesSchema>;

/**
 * 空白
 */
export const _category = {
  id: '',
  title: '',
  alias: '',
  categoryId: '',
  url: '',
  brand: _brand,
};
