import { z } from 'zod';

/**
 * 创建
 */
export const createAvailableDtoSchema = z.object({
  product: z.string(),
  region: z.string(),
});

/**
 * 类型
 */
export type CreateAvailableDto = z.infer<typeof createAvailableDtoSchema>;
