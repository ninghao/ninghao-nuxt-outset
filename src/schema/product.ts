import { z } from 'zod';
import { _category, categorySchema } from './category';
import { _brand, brandSchema } from './brand';

// {
//   "id": "product:02aftiywa7obkzg23fl6",
//   "title": "COUSSIN 小号手袋",
//   "color": "Taupe",
//   "material": "LAMB",
//   "price": "¥32,500",
//   "productId": "nvprod2750001v",
//   "sku": "M21263",
//   "description": "Coussin 小号手袋于 2021 春夏秀场大放异彩。Monogram 压纹蓬松羊皮革打造靠枕构型，为简约设计注入前卫风范。可利用肩带斜挎或作为链条法棍包，亦可舒适携于腋下。",
//   "url": "https://www.louisvuitton.cn/zhs-cn/products/coussin-pm-h27-nvprod2750001v/M21263"
//   "image": {
//     "remote": {
//       "url": "https://www.louisvuitton.cn/images/is/image/lv/1/PP_VP_L/louis-vuitton-coussin-小号手袋--M21263_PM2_Front view.jpg?wid={IMG_WIDTH}&hei={IMG_HEIGHT}"
//     }
//   },
//   "category": "category:9yjmmtz2bxazz3tnhdp3",

//   "created": "2023-07-01T08:32:33.792618Z",
//   "updated": "2023-07-02T02:43:43.284618Z",

// },

/**
 * 创建
 */
export const createProductDtoSchema = z.object({
  id: z.string().optional(),
  title: z.string(),
  color: z.string(),
  material: z.string(),
  price: z.string(),
  productId: z.string(),
  sku: z.string(),
  description: z.string(),
  url: z.string(),
  category: z.union([categorySchema.transform((data) => data.id), z.string()]),
  brand: z.union([brandSchema.transform((data) => data.id), z.string()]),
  image: z
    .object({
      local: z
        .object({
          url: z.string(),
        })
        .optional(),
      remote: z
        .object({
          url: z.string(),
        })
        .optional(),
    })
    .optional(),
});

/**
 * 修改
 */
export const updateProductDtoSchema = z.optional(createProductDtoSchema.partial());

/**
 * 实体
 */
export const productSchema = z.object({
  id: z.string().optional(),
  title: z.string(),
  color: z.string().optional(),
  material: z.string().optional(),
  price: z.string().optional(),
  productId: z.string().optional(),
  sku: z.string(),
  description: z.string().optional(),
  url: z.string().optional(),
  category: categorySchema.optional(),
  brand: brandSchema.optional(),
  image: z
    .object({
      local: z
        .object({
          url: z.string(),
        })
        .optional(),
      remote: z
        .object({
          url: z.string(),
        })
        .optional(),
    })
    .optional(),
});

/**
 * 列表
 */
export const productsSchema = z.array(productSchema);

/**
 * 类型
 */
export type Product = z.infer<typeof productSchema>;
export type Products = z.infer<typeof productsSchema>;
export type CreateProductDto = z.infer<typeof createProductDtoSchema>;
export type UpdateProductDto = z.infer<typeof updateProductDtoSchema>;

/**
 * 空白
 */
export const _product: Product = {
  title: '',
  color: '',
  material: '',
  price: '',
  productId: '',
  sku: '',
  description: '',
  url: '',
  category: _category,
  brand: _brand,
  image: {
    remote: {
      url: '',
    },
    local: {
      url: '',
    },
  },
};
