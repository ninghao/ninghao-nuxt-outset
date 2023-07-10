import { z } from 'zod';

/**
 * 创建
 */
export const createSubscriptionDtoSchema = z.object({
  id: z.string().optional(),
  plan: z.string(),
  subject: z.string(),
});

/**
 * 实体
 */
export const subscriptionSchema = z.object({
  id: z.string(),
  plan: z.string(),
  status: z.string(),
  subject: z.string(),
  user: z.string(),
  expired: z.string().optional(),
  created: z.string(),
  updated: z.string(),
});

export const subscriptionsSchema = z.array(subscriptionSchema);

/**
 * 类型
 */
export type CreateSubscriptionDto = z.infer<typeof createSubscriptionDtoSchema>;
export type Subscription = z.infer<typeof subscriptionSchema>;
export type Subscriptions = z.infer<typeof subscriptionsSchema>;
