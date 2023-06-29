import { _region, Region, Regions } from '~/schema/region';

/**
 * RegionStore
 */
type RetrieveOptions = {
  id?: string;
};

export const useRegionStore = defineStore('region', () => {
  /**
   * State
   */

  // 实体：用于显示或编辑
  const entity = ref<Partial<Region>>({ ..._region });

  // 实体列表：用于显示
  const entities = ref<Regions>([]);

  /**
   * Getters
   */

  /**
   * Actions
   */

  // 创建实体
  const create = async () => {};

  // 读取实体
  const retrieve = async (options?: RetrieveOptions) => {
    const { id } = options || {};

    // 单个实体
    if (id) {
      return;
    }

    // 实体列表
    const { data, error } = await useFetch('/api/regions', {
      ...useApiInterceptor(),
      transform: (data) => regionsSchema.parse(data),
    });

    // 处理错误
    if (error.value) return;

    if (data.value) {
      entities.value = data.value;
    }

    return data;
  };

  // 更新实体
  const update = async () => {};

  // 删除实体
  const destroy = async (id?: string) => {};

  /**
   * 返回值
   */
  return { create, retrieve, update, destroy, entity, entities };
});
