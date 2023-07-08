import { createFollowDtoSchema, updateFollowDtoSchema } from '~/schema/follow';
import { Products, productsSchema } from '~/schema/product';

/**
 * FollowStore
 */
export const useFollowStore = defineStore('follow', () => {
  /**
   * State 🌴
   */

  // 实体列表
  const entities = ref<Products>([]);

  // 实体总数
  const totalCount = ref(0);

  // 地址查询符
  const entitiesQuery = ref({
    page: 1,
    sort: '',
  });

  /**
   * Getters 🌵
   */

  const entitiesQueryString = computed(() => {
    return useEntitiesQueryString(entitiesQuery.value);
  });

  /**
   * Actions 🚀
   */

  const setTotalCount = (data: number | string | null) => {
    if (data) {
      totalCount.value = parseInt(`${data}`, 10);
    }
  };

  /**
   * 读取
   */
  const retrieve = async () => {
    // 获取实体列表
    const { data, error } = await useFetch(`/api/follows?${entitiesQueryString.value}`, {
      ...useApiInterceptor(),
      onResponse(context) {
        setTotalCount(context.response.headers.get('x-total-count'));
      },
      transform: (data) => productsSchema.parse(data),
    });

    if (error.value) return;

    if (data.value) {
      entities.value = data.value;
    }

    return data;
  };

  /**
   * 创建
   */
  const create = async (dto: { product: string; region: string }) => {
    // 主体数据
    const body = createFollowDtoSchema.parse(dto);

    // 请求接口
    const { data, error } = await useFetch('/api/follows', {
      method: 'POST',
      body,
      ...useApiInterceptor(),
    });

    // 处理错误
    if (error.value) return;

    // 返回数据
    return data;
  };

  /**
   * 更新
   */
  const update = async (dto: { product: string; region: string }) => {
    // 请求主体
    const body = updateFollowDtoSchema.parse(dto);

    // 请求接口
    const { data, error } = await useFetch(`/api/follows`, {
      method: 'PUT',
      body,
      ...useApiInterceptor(),
    });

    // 处理错误
    if (error.value) return;

    // 返回数据
    return data;
  };

  /**
   * 返回
   */
  return { create, retrieve, update, entities };
});
