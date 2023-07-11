import { z } from 'zod';
import { _plan, planSchema } from '~/schema/plan';

/**
 * 创建
 */
export const createSubscriptionDtoSchema = z.object({
  id: z.string().optional(),
  plan: z.union([z.string(), planSchema.transform((data) => data.id)]),
  subject: z.string(),
});

/**
 * 实体
 */
export const subscriptionSchema = z.object({
  id: z.string(),
  plan: planSchema,
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

export const _subscription = {
  plan: _plan,
  subject: '',
};
