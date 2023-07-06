import { z } from 'zod';

/**
 * 创建
 */
export const createAvailableDtoSchema = z.object({
  product: z.string(),
  region: z.string(),
});

/**
 * 修改
 */
export const updateAvailableDtoSchema = z.object({
  product: z.string(),
  region: z.string(),
  isPublished: z.boolean(),
});

/**
 * 类型
 */
export type CreateAvailableDto = z.infer<typeof createAvailableDtoSchema>;
export type UpdateAvailableDto = z.infer<typeof updateAvailableDtoSchema>;
