import { Plans, plansSchema } from '~/schema/plan';

/**
 * PlanStore
 */
export const usePlanStore = defineStore('plan', () => {
  /**
   * State 🌴
   */

  // 实体列表
  const entities = ref<Plans>([]);

  // 地址查询符
  const entitiesQuery = ref({
    page: 1,
    sort: '',
    filters: {},
  });

  // 实体总数
  const totalCount = ref(0);

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
    const { data, error } = await useFetch(`/api/plans?${entitiesQueryString.value}`, {
      ...useApiInterceptor(),
      onResponse(context) {
        setTotalCount(context.response.headers.get('x-total-count'));
      },
      transform: (data) => plansSchema.parse(data),
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
