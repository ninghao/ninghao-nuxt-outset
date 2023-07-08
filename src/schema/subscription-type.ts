import { z } from 'zod';

/**
 * 实体
 */
export const subscriptionTypeSchema = z.object({
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
export const subscriptionTypesSchema = z.array(subscriptionTypeSchema);

/**
 * 类型
 */
export type SubscriptionType = z.infer<typeof subscriptionTypeSchema>;
export type SubscriptionTypes = z.infer<typeof subscriptionTypesSchema>;
