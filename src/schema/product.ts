import { z } from 'zod';
import { categorySchema } from './category';
import { brandSchema } from './brand';

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
 * 实体
 */
export const productSchema = z.object({
  id: z.string(),
  title: z.string(),
  color: z.string().optional(),
  material: z.string().optional(),
  price: z.string().optional(),
  productId: z.string().optional(),
  sku: z.string(),
  description: z.string(),
  url: z.string(),
  category: categorySchema,
  brand: brandSchema,
  image: z.object({
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
  }),
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
