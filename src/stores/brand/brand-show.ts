import { Brand, brandSchema } from '../../schema/brand';

/**
 * BrandShowStore
 */
export const useBrandShowStore = defineStore('brandShow', () => {
  /**
   * State
   */

  const _brand = {
    id: '',
    name: '',
    title: '',
    alias: '',
    logo: '',
  };

  const brand = ref<Brand>({ ..._brand });

  /**
   * Getters
   */

  /**
   * Actions
   */

  const getBrandById = async (id?: string) => {
    const _id = id;

    // 请求接口
    const { data, error } = await useFetch(`/api/brands/${_id}`, {
      ...useApiInterceptor(),
      transform: (data) => brandSchema.parse(data),
    });

    // 处理错误
    if (error.value) return;

    if (data.value) {
      brand.value = data.value;
    }

    return data;
  };

  /**
   * 返回值
   */
  return {
    brand,
    getBrandById,
  };
});
