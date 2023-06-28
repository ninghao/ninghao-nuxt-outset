import { Brand, updateBrandDtoSchema } from '../../schema/brand';

/**
 * BrandUpdateStore
 */
export const useBrandUpdateStore = defineStore('brandUpdate', () => {
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
  const updateBrand = async () => {
    const body = updateBrandDtoSchema.parse(brand.value);

    console.log(body);

    // 请求接口
    const { data, error } = await useFetch(`/api/brands/${body?.id}`, {
      method: 'PUT',
      body,
      ...useApiInterceptor(),
    });

    // 处理错误
    if (error.value) return;

    // 显示通知
    useToast().add({ title: '成功更新了品牌' });

    // 更新列表
    const store = useBrandIndexStore();
    store.getBrands();

    // 返回数据
    return data;
  };

  /**
   * 返回值
   */
  return { brand, updateBrand };
});
