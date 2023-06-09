import { z } from 'zod';

/**
 * 用户登录请求主体数据
 */
export const SigninDtoSchema = z.object({
  name: z
    .string({
      required_error: '请提供用户名',
    })
    .min(1, { message: '请提供用户名' }),

  password: z
    .string({
      required_error: '请提供密码',
    })
    .min(6, {
      message: '密码至少要6位',
    }),
});

export type SigninBody = z.infer<typeof SigninDtoSchema>;
