import { BrandEntity, brandsEntitySchema } from '../../schema/brand';

/**
 * BrandIndexStore
 */
export const useBrandIndexStore = defineStore('brandIndex', () => {
  /**
   * State
   */
  const brands = ref<Array<BrandEntity>>([]);

  /**
   * Getters
   */

  /**
   * Actions
   */
  const getBrands = async () => {
    // 请求接口
    const { data, error } = await useFetch('/api/brands', {
      ...useApiInterceptor(),
      transform: (data) => brandsEntitySchema.parse(data),
    });

    // 处理错误
    if (error.value) return;

    if (data.value) {
      brands.value = data.value;
    }

    return data;
  };

  /**
   * 返回值
   */
  return { getBrands, brands };
});
