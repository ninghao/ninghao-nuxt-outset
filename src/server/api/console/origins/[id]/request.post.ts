export default defineEventHandler(async (event) => {
  // ID 参数
  const id = getRouterParam(event, 'id');

  // 来源数据
  const [origin] = await surreal.select(id ?? '');

  //
  if (origin.region === 'region:louisvuitton_cn' && origin.type === 'RESTful') {
    console.log('request region:louisvuitton_cn api');
    // https://api-www.louisvuitton.cn/eco-eu/search-merch-eapi/v1/zhs-cn/plp/products/t1rrahxp

    try {
      // const result: any = await $fetch(origin.url as string, {
      //   headers: louisvuittonCnRestfulHeaders,
      // });

      const result = multiPageRestFulRawData;
      const totalPages = result.nbPages;

      const actions = Array.from({ length: totalPages + 1 }, (_, index) => {
        return async () => {
          const url = `${origin.url}?page=${index}`;

          console.log(`request url`, url);

          const result: any = await $fetch(url, {
            headers: louisvuittonCnRestfulHeaders,
          });

          if (result && result.hits.length) {
            createProductFromOrigin(result.hits, origin);
          }

          return new Promise((resolve) => {
            setTimeout(resolve, 10000);
          });
        };
      });

      // 递归执行动作
      const executeActions = async (index: number) => {
        if (index >= actions.length) {
          console.log('所有动作执行完成');
          return;
        }

        const action = actions[index];

        try {
          await action();
          executeActions(index + 1);
        } catch (error) {
          console.error('动作执行出错:', error);
        }
      };

      executeActions(0);
    } catch (error) {
      console.log(error);
    }
  }

  return {
    result: 'ok',
  };

  // 初始数据
  const data = multiPageRestFulRawData;

  // 需要 page 查询符
  const totalPages = data.nbPages;
  const firstPageNumber = 0;
  const totalItems = data.nbHits;
  const items = data.hits;

  // const products: Array<Record<string, any>> = [];

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
      (subItem) => subItem.identifier !== item.identifier,
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

  const actions = Array.from({ length: 22 }, (_, index) => {
    return () => {
      console.log(`request ${index}`);

      return new Promise((resolve) => {
        setTimeout(resolve, 3000);
      });
    };
  });

  // // 执行动作
  // executeActions(0);

  return {
    result: 'ok',
  };
});
