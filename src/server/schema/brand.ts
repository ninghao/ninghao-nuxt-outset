import { z } from 'zod';

/**
 * 品牌请求主体数据
 */
export const CreateBrandBodySchema = z.object({
  name: z
    .string({
      required_error: '请提供品牌名称',
    })
    .trim()
    .min(1, { message: '品牌名称不能为空白' })
    .regex(/^[A-Za-z]+$/, { message: '品牌名称必须由字母组成' }),

  title: z
    .string({
      required_error: '请提供品牌标题',
    })
    .trim()
    .min(1, { message: '品牌标题不能为空白' }),

  alias: z
    .string({
      required_error: '请提供品牌中文名',
    })
    .trim()
    .min(1, { message: '品牌中文名不能为空白' }),

  logo: z
    .string({
      required_error: '请提供品牌标志文件名',
    })
    .trim()
    .min(1, { message: '品牌标志文件名不能为空白' }),
});

export type CreateBrandBody = z.infer<
  typeof CreateBrandBodySchema
>;
