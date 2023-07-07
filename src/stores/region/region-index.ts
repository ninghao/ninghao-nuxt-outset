import { Regions, regionsSchema } from '~/schema/region';

/**
 * RegionIndexStore
 */
export const useRegionIndexStore = defineStore('regionIndex', () => {
  /**
   * State
   */

  const regions = ref<Regions>([]);

  /**
   * Getters
   */

  /**
   * Actions
   */

  const getRegions = async () => {
    // 请求接口
    const { data, error } = await useFetch('/api/console/regions', {
      ...useApiInterceptor(),
      transform: (data) => regionsSchema.parse(data),
    });

    // 处理错误
    if (error.value) return;

    if (data.value) {
      regions.value = data.value;
    }

    return data;
  };

  /**
   * 返回值
   */
  return { regions, getRegions };
});
