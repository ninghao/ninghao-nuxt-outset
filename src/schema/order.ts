import { z } from 'zod';
import { planSchema } from '~/schema/plan';

/**
 * 创建
 */
export const createOrderDtoSchema = z.object({
  payment: z.string(),
  items: z.array(z.string()),
  extra: z.array(z.string()).optional(),
});

/**
 * 更新
 */
export const updateOrderDtoSchema = z.optional(createOrderDtoSchema);

/**
 * 实体
 */
export const orderSchema = z.object({
  id: z.string(),
  amount: z.number(),
  payment: z.string(),
  status: z.string(),
  user: z.string(),
  items: z.array(z.string()),
  actions: z.array(z.string()),
  created: z.date(),
});

/**
 * 列表
 */
export const ordersSchema = z.array(orderSchema);

/**
 * 类型
 */
export type Order = z.infer<typeof orderSchema>;
export type Orders = z.infer<typeof ordersSchema>;
export type CreateOrderDto = z.infer<typeof createOrderDtoSchema>;
export type UpdateOrderDto = z.infer<typeof updateOrderDtoSchema>;

/**
 * 空白
 */
// export const _order: Order = {
//   payment: '',
//   amount: 0,
//   status: '',
//   user: '',
//   items: [],
// };

export const _dto = {
  payment: '',
  extra: [],
  items: [],
};
