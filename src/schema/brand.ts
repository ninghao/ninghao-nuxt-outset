import { z } from 'zod';

/**
 * 创建品牌
 */
export const createBrandDtoSchema = z.object({
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
      required_error: '请提供中文名',
    })
    .trim()
    .min(1, { message: '中文名不能为空白' }),

  logo: z
    .string({
      required_error: '请提供标志文件名',
    })
    .trim()
    .min(1, { message: '标志文件名不能为空白' }),
});

export type CreateBrandDto = z.infer<typeof createBrandDtoSchema>;

/**
 * 修改品牌
 */
export const updateBrandDtoSchema = createBrandDtoSchema;

/**
 * 品牌
 */
export const brandSchema = z.object({
  id: z.string(),
  name: z.string(),
  title: z.string(),
  alias: z.string(),
  logo: z.string(),
});

export type Brand = z.infer<typeof brandSchema>;

export const brandsSchema = z.array(brandSchema);
