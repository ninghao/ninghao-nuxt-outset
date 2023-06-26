import { CreateBrandBody } from '../server/schema/brand';

export const useCreateBrand = () => {
  const _brand = {
    name: '',
    title: '',
    alias: '',
    logo: '',
  };

  const brand = ref<CreateBrandBody>({ ..._brand });

  const createBrand = async () => {
    // 主体数据
    const body = { ...brand.value };

    // 请求接口
    const { data, error } = await useFetch('/api/brands', {
      method: 'POST',
      body,
      ...useApiInterceptor(),
    });

    // 处理错误
    if (error.value) {
      return useApiError(error);
    }

    brand.value = {
      ..._brand,
    };

    useAppToast(`成功创建了品牌`);

    // 返回数据
    return data;
  };

  return { brand, createBrand };
};
