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
});
