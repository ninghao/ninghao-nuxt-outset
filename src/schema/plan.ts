import { z } from 'zod';

/**
 * 实体
 */
export const planSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  title: z.string(),
  description: z.string(),
  price: z.number(),
  salePrice: z.number(),
  followLimit: z.number(),
  index: z.number(),
});

/**
 * 列表
 */
export const plansSchema = z.array(planSchema);

/**
 * 类型
 */
export type Plan = z.infer<typeof planSchema>;
export type Plans = z.infer<typeof plansSchema>;

/**
 * 空白
 */
export const _plan = {
  id: '',
  name: '',
  title: '',
  description: '',
  price: 0,
  salePrice: 0,
  followLimit: 0,
  index: 0,
};
