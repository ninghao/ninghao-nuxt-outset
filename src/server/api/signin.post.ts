import { z } from 'zod';

const bodySchema = z.object({
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

export default defineEventHandler(async (event) => {
  const { name, password } = await parseBody(event, bodySchema);

  return {
    name,
    password,
  };
});
