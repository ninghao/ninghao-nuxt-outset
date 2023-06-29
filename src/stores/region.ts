import { _region, Region, Regions, createRegionDtoSchema } from '~/schema/region';

/**
 * RegionStore
 */
type RetrieveOptions = {
  id?: string;
};

export const useRegionStore = defineStore('region', () => {
  /**
   * State 🌴
   */

  // 单个实体
  const entity = ref<Partial<Region>>({ ..._region });

  // 实体列表
  const entities = ref<Regions>([]);

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
    entity.value = { ..._region };
  };

  /**
   * 创建实体
   */
  const create = async () => {
    // 主体数据
    const body = createRegionDtoSchema.parse(entity.value);

    // 请求接口
    const { data, error } = await useFetch('/api/regions', {
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
      const { data, error } = await useFetch(`/api/regions/${id}`, {
        ...useApiInterceptor(),
        transform: (data) => regionSchema.parse(data),
      });

      console.log(data);

      if (error.value) return;

      if (data.value) {
        entity.value = data.value;
      }

      return data;
    }

    // 获取实体列表
    const { data, error } = await useFetch(`/api/regions`, {
      ...useApiInterceptor(),
      transform: (data) => regionsSchema.parse(data),
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
    const body = updateRegionDtoSchema.parse(entity.value);

    // 实体 ID
    const id = body?.id;

    // 请求接口
    const { data, error } = await useFetch(`/api/regions/${id}`, {
      method: 'PUT',
      body,
      ...useApiInterceptor(),
    });

    // 处理错误
    if (error.value) return;

    // 显示通知
    useToast().add({ title: '成功更新了区域' });

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
    const { data, error } = await useFetch(`/api/regions/${id}`, {
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
