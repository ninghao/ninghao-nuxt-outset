import { CreateBrandDto, createBrandDtoSchema } from '../../schema/brand';

/**
 * BrandCreateStore
 */
export const useBrandCreateStore = defineStore('brandCreate', () => {
  /**
   * State
   */

  const _brand = {
    name: '',
    title: '',
    alias: '',
    logo: '',
  };

  const brand = ref<CreateBrandDto>({ ..._brand });

  /**
   * Getters
   */

  /**
   * Actions
   */

  const $reset = () => {
    brand.value = { ..._brand };
  };

  const createBrand = async () => {
    // 验证数据
    createBrandDtoSchema.parse(brand.value);

    // 主体数据
    const body = {
      ...brand.value,
    };

    // 请求接口
    const { data, error } = await useFetch('/api/brands', {
      method: 'POST',
      body,
      ...useApiInterceptor(),
    });

    // 处理错误
    if (error.value) return;

    // 重置状态
    $reset();

    // 显示通知
    useToast().add({ title: '成功创建了品牌' });

    // 更新列表
    const store = useBrandIndexStore();
    store.getBrands();

    // 返回数据
    return data;
  };

  /**
   * 返回值
   */
  return {
    brand,
    createBrand,
    $reset,
  };
});
