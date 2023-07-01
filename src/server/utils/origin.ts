export const louisvuittonCnRestfulHeaders = {
  Referer: 'https://www.louisvuitton.cn/zhs-cn/bags/for-women/all-handbags/_/N-t1rrahxp',
  Origin: 'https://www.louisvuitton.cn',
  // Host: 'https://www.louisvuitton.cn',
  Pragma: 'no-cache',
  'Sec-Ch-Ua-Platform': `"macOS"`,
  'Sec-Fetch-Mode': 'cors',
  'Sec-Fetch-Site': 'same-site',
  'Sec-Ch-Ua-Mobile': '?0',
  'Sec-Ch-Ua': `"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"`,
  'User-Agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
  Client_secret: '60bbcdcD722D411B88cBb72C8246a22F',
  Client_id: '607e3016889f431fb8020693311016c9',
};

export const createProductFromOrigin = async (
  items: Array<Record<string, any>>,
  origin: any,
) => {
  for (const item of items) {
    // const brand = 'brand:louisvuitton';
    const brand = origin.brand;
    // const region = ['region:louisvuitton_cn'];
    const region = origin.region;

    const title = item.name;
    const productId = item.productId;
    const price = item.offers.priceSpecification[0].price;
    const _category = item.category[0][item.category[0].length - 1];
    let categoryId = ``;

    const category = {
      categoryId: _category.identifier,
      title: _category.name,
      alias: _category.alternateName,
      url: _category.url,
      brand,
    };

    const description = item.disambiguatingDescription;
    const material = item.material;

    /**
     * 处理分类
     */
    try {
      const [{ result: categoryResult }] = await surreal.query(
        `
          SELECT id FROM category
          WHERE 
            categoryId = $categoryId
        `,
        { categoryId: `${_category.identifier}` },
      );

      if (categoryResult && (categoryResult as any).length) {
        // 设置分类 ID
        categoryId = (categoryResult as any)[0].id;
      } else {
        // 创建分类
        const [result] = await surreal.create('category', category);
        categoryId = result.id;
      }
    } catch (error) {
      console.log(error);
    }

    /**
     * 第一级产品
     */
    const _item = {
      sku: item.identifier,
      productId,
      title,
      color: item.color,
      material,
      price,
      category: categoryId,
      url: item.url,
      image: {
        remote: {
          url: item.image[0].contentUrl,
        },
      },
      description,
      brand,
      region,
    };

    try {
      await surreal.create(`product`, _item);
    } catch (error) {
      console.log(error);
    }

    /**
     * 第二级产品
     */
    const subItems = item.isSimilarTo.filter(
      (subItem: any) => subItem.identifier !== item.identifier,
    );

    if (subItems.length) {
      for (const subItem of subItems) {
        const _subItem = {
          sku: subItem.identifier,
          productId,
          title,
          color: subItem.name,
          material,
          price,
          category: categoryId,
          url: subItem.url,
          image: {
            remote: {
              url: subItem.image[0].contentUrl,
            },
          },
          description,
          brand,
          region,
        };

        try {
          await surreal.create(`product`, _subItem);
        } catch (error) {
          console.log(error);
        }

        // console.log(subItem.identifier);
      }
    }

    // if(subItems.length)

    // for (const subItem of subItems) {
    //   const
    // }
  }
};
