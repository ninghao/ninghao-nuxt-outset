import { z } from 'zod';

/**
 * 创建
 */
export const createPaymentDtoSchema = z.object({});

/**
 * 更新
 */
export const updatePaymentDtoSchema = z.optional(createPaymentDtoSchema);

/**
 * 实体
 */
export const paymentSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  title: z.string(),
  description: z.string(),
  isPublished: z.boolean(),
  index: z.number().optional(),
});

/**
 * 列表
 */
export const paymentsSchema = z.array(paymentSchema);

/**
 * 类型
 */
export type Payment = z.infer<typeof paymentSchema>;
export type Payments = z.infer<typeof paymentsSchema>;
export type CreatePaymentDto = z.infer<typeof createPaymentDtoSchema>;
export type UpdatePaymentDto = z.infer<typeof updatePaymentDtoSchema>;

/**
 * 空白
 */
export const _payment: Payment = {
  id: '',
  name: '',
  title: '',
  description: '',
  isPublished: false,
  index: 0,
};
