import {
  _brand,
  Brand,
  Brands,
  brandSchema,
  brandsSchema,
  updateBrandDtoSchema,
  createBrandDtoSchema,
} from '~/schema/brand';

/**
 * BrandStore
 */
type RetrieveOptions = {
  id?: string;
};

export const useBrandStore = defineStore('brand', () => {
  /**
   * State 🌴
   */

  // 单个实体
  const entity = ref<Partial<Brand>>({ ..._brand });

  // 实体列表
  const entities = ref<Brands>([]);

  /**
   * Getters 🌵
   */

  /**
   * Actions 🚀
   */

  /**
   * 重置状态
   */
  const $reset = () => {
    entity.value = { ..._brand };
  };

  /**
   * 创建实体
   */
  const create = async () => {
    // 主体数据
    const body = createBrandDtoSchema.parse(entity.value);

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
    useToast().add({ title: '成功创建了区域' });

    // 更新列表
    retrieve();

    // 返回数据
    return data;
  };

  // 读取实体
  const retrieve = async (options?: RetrieveOptions) => {
    const { id } = options || {};

    // 获取单个实体
    if (id) {
      const { data, error } = await useFetch(`/api/brands/${id}`, {
        ...useApiInterceptor(),
        transform: (data) => brandSchema.parse(data),
      });

      if (error.value) return;

      if (data.value) {
        entity.value = data.value;
      }

      return data;
    }

    // 获取实体列表
    const { data, error } = await useFetch(`/api/brands`, {
      ...useApiInterceptor(),
      transform: (data) => brandsSchema.parse(data),
    });

    if (error.value) return;

    if (data.value) {
      entities.value = data.value;
    }

    return data;
  };

  // 更新实体
  const update = async () => {
    // 请求主体
    const body = updateBrandDtoSchema.parse(entity.value);

    // 实体 ID
    const id = body?.id;

    // 请求接口
    const { data, error } = await useFetch(`/api/brands/${id}`, {
      method: 'PUT',
      body,
      ...useApiInterceptor(),
    });

    // 处理错误
    if (error.value) return;

    // 显示通知
    useToast().add({ title: '成功更新了品牌' });

    // 更新列表
    retrieve();

    // 返回数据
    return data;
  };

  // 删除实体
  const destroy = async (entityId?: string) => {
    // 实体 ID
    const id = entityId ?? entity.value.id;

    // 请求接口
    const { data, error } = await useFetch(`/api/brands/${id}`, {
      method: 'DELETE',
      ...useApiInterceptor(),
    });

    // 处理错误
    if (error.value) return;

    // 显示通知
    useToast().add({ title: '成功删除了品牌' });

    // 更新列表
    retrieve();

    // 返回数据
    return data;
  };

  /**
   * 返回值
   */
  return { create, retrieve, update, destroy, entity, entities };
});
