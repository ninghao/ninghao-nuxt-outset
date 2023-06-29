import { z } from 'zod';

export const schema = z.object({
  id: z.string().trim().optional(),

  name: z
    .string({
      required_error: '请提供名称',
    })
    .trim()
    .min(1, { message: '名称不能为空白' })
    .regex(/^[A-Za-z]+$/, { message: '名称必须由字母组成' }),

  title: z
    .string({
      required_error: '请提供标题',
    })
    .trim()
    .min(1, { message: '标题不能为空白' }),

  alias: z
    .string({
      required_error: '请提供别名',
    })
    .trim()
    .min(1, { message: '别名不能为空白' }),
});
