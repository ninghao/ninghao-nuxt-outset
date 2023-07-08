import z from 'zod';

/**
 * 创建
 */
export const createFollowDtoSchema = z.object({
  product: z.string(),
  region: z.string(),
});

/**
 * 修改
 */
export const updateFollowDtoSchema = z.object({
  product: z.string(),
  region: z.string(),
});

/**
 * 类型
 */
export type CreateFollowDto = z.infer<typeof createFollowDtoSchema>;
export type UpdateFollowDto = z.infer<typeof updateFollowDtoSchema>;
