export default defineEventHandler(async (event) => {
  // ID 参数
  const id = getRouterParam(event, 'id');

  // 来源数据
  const [result] = await surreal.select(id ?? '');

  // 初始数据
  const data = multiPageRestFulRawData;

  // 需要 page 查询符
  const totalPages = data.nbPages;
  const firstPageNumber = 0;
  const totalItems = data.nbHits;
  const items = data.hits;

  const products: Array<Record<string, any>> = [];

  for (const item of items) {
    const title = item.name;
    const productId = item.productId;
    const price = item.offers.priceSpecification[0].price;
    const category = item.category[0][item.category[0].length - 1];
    const description = item.disambiguatingDescription;
    const material = item.material;

    const brand = 'brand:louisvuitton';
    const region = ['region:louisvuitton_cn'];

    const _item = {
      sku: item.identifier,
      productId,
      title,
      color: item.color,
      material,
      price,
      category,
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
      await surreal.create(`product:${_item.sku}`, _item);
    } catch (error) {
      console.log(error);
    }

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
          category,
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
          await surreal.create(`product:${_subItem.sku}`, _subItem);
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

  // // 递归执行动作
  // const executeActions = async (index) => {
  //   if (index >= actions.length) {
  //     console.log('所有动作执行完成');
  //     return;
  //   }

  //   const action = actions[index];

  //   try {
  //     await action();
  //     executeActions(index + 1);
  //   } catch (error) {
  //     console.error('动作执行出错:', error);
  //   }
  // };

  // // 执行动作
  // executeActions(0);

  return {
    meta: {
      totalItems: products.length,
    },
    data: products,
  };
});
