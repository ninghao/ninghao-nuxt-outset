import { z } from 'zod';

/**
 * 用户登录请求主体数据
 */
const SigninBodySchema = z.object({
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
      message: '密码至少要8位',
    }),
});

export type SigninBody = z.infer<typeof SigninBodySchema>;

/**
 * 用户登录接口处理器
 */
export default defineEventHandler(async (event) => {
  const body = await parseBody(event, SigninBodySchema);
  const user = await validateUserSignin(body);
  const token = signToken(user);

  return {
    id: user.id,
    name: user.name,
    token,
  };
});
