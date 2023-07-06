import { z } from 'zod';
import { schema } from './base';
import { brandSchema, _brand } from '~/schema/brand';

/**
 * 创建
 */
export const createRegionDtoSchema = schema.merge(
  z.object({
    area: z
      .string({ required_error: '请提供地区' })
      .trim()
      .min(1, { message: '地区不能为空' }),

    code: z
      .string({ required_error: '请提供区域代码' })
      .trim()
      .min(2, { message: '区域代码至少有两个字符' }),

    website: z
      .string({ required_error: '请提供网址' })
      .trim()
      .url({ message: '地址格式不对' })
      .nullish(),

    brand: z.union([
      brandSchema.transform((data) => data.id),
      z
        .string()
        .trim()
        .min(3)
        .regex(/^[a-z]+:[a-z_]+$/, { message: '格式不对' }),
    ]),
  }),
);

/**
 * 修改
 */
export const updateRegionDtoSchema = z.optional(createRegionDtoSchema.partial());

/**
 * 实体
 */
export const regionSchema = z.object({
  id: z.string(),
  name: z.string(),
  title: z.string(),
  alias: z.string(),
  area: z.string(),
  code: z.string(),
  website: z.string(),
  brand: z.union([brandSchema, z.string()]),
});

/**
 * 列表
 */
export const regionsSchema = z.array(regionSchema);

/**
 * 类型
 */
export type CreateRegionDto = z.infer<typeof createRegionDtoSchema>;
export type UpdateRegionDto = z.infer<typeof updateRegionDtoSchema>;
export type Region = z.infer<typeof regionSchema>;
export type Regions = z.infer<typeof regionsSchema>;

/**
 * 空白
 */
export const _region = {
  name: '',
  title: '',
  alias: '',
  area: '',
  code: '',
  website: '',
  brand: _brand,
};
