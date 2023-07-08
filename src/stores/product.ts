import { Products, productsSchema } from '~/schema/product';

/**
 * ProductStore
 */
export const useProductStore = defineStore('product', () => {
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
    filters: {
      available: {
        $edge: {
          isPublished: 'true',
          out: 'region:louisvuitton_cn',
        },
      },
    },
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
   * 读取实体
   */
  const retrieve = async () => {
    // 获取实体列表
    const { data, error } = await useFetch(`/api/products?${entitiesQueryString.value}`, {
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
   * 返回值
   */
  return { entities, retrieve };
});
