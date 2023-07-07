// https://bck.hermes.cn/products?locale=cn_zh&category=WOMENBAGSSMALLLEATHERGOODS&sort=relevance&offset=200&pagesize=40

import { allHermesBags } from '~/server/utils/mock';

export default defineEventHandler(async (event) => {
  const method = getMethod(event);
  // 检查用户身份
  authGuard(event);
  const data = allHermesBags;

  // const category = {
  //   title: '箱包小皮具',
  //   url: 'https://www.hermes.cn/cn/zh/category/女士/箱包小皮具/',
  //   brand: 'brand:hermes',
  //   alias: 'Bags and small leather goods',
  //   categoryId: 'bags-and-small-leather-goods',
  // };

  for (const item of data) {
    const brand = 'brand:hermes';
    const category = 'category:ull6h2lcruysduz6cm05';
    const color = item.avgColor;
    const description = `${item.title}，${item.avgColor}。`;
    const image = {
      remote: {
        url: item.assets[0].url,
      },
    };
    const material = '';
    const price = `¥${item.price.toLocaleString()}`;
    const productId = '';
    const sku = item.sku;
    const title = item.title;
    const url = `https://www.hermes.cn/cn/zh${item.url}`;

    const meta = {
      productCode: item.productCode,
      size: item.size,
      familyCode: item.familyCode,
      divisionCode: item.divisionCode,
      stock: item.stock,
    };

    const _item = {
      brand,
      category,
      color,
      description,
      image,
      material,
      price,
      productId,
      sku,
      title,
      url,
      meta,
    };

    await surreal.create('product', _item);

    console.log(_item);
  }

  return 'ok';
});

// <url>
// <loc>https://www.hermes.cn/cn/zh/category/女士/箱包小皮具/小皮具/</loc>
// <changefreq>daily</changefreq>
// <priority>1.0</priority>
// </url>
// <url>
// <loc>https://www.hermes.cn/cn/zh/category/女士/箱包小皮具/旅行箱包/</loc>
// <changefreq>daily</changefreq>
// <priority>1.0</priority>
// </url>
// <url>
// <loc>https://www.hermes.cn/cn/zh/category/女士/箱包小皮具/皮质配饰/</loc>
// <changefreq>daily</changefreq>
// <priority>1.0</priority>
// </url>
// <url>
// <loc>https://www.hermes.cn/cn/zh/category/女士/箱包小皮具/箱包晚宴包/</loc>
// <changefreq>daily</changefreq>
// <priority>1.0</priority>
// </url>
