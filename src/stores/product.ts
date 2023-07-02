import { Products } from '~/schema/product';

/**
 * RegionStore
 */
type RetrieveOptions = {
  id?: string;
};

export const useProductStore = defineStore('product', () => {
  /**
   * State 🌴
   */

  // 单个实体
  // const entity = ref<Partial<Product>>({ ..._product });

  // 实体列表
  const entities = ref<Products>([]);

  /**
   * Getters 🌵
   */

  /**
   * Actions 🚀
   */

  /**
   * 重置状态
   */
  // const $reset = () => {
  //   entity.value = { ..._region };
  // };

  /**
   * 读取实体
   */
  const retrieve = async (options?: RetrieveOptions) => {
    const { id } = options || {};

    // 获取实体列表
    const { data, error } = await useFetch(`/api/products`, {
      ...useApiInterceptor(),
      transform: (data) => productsSchema.parse(data),
    });

    // console.log(data.value);

    if (error.value) return;

    if (data.value) {
      entities.value = data.value;
    }

    return data;
  };

  /**
   * 返回值
   */
  return { retrieve, entities };
});
