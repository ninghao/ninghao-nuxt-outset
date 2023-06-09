import { Category, _category, Categories, categoriesSchema } from '~/schema/category';

/**
 * RegionStore
 */
type RetrieveOptions = {
  id?: string;
};

export const useConsoleCategoryStore = defineStore('consoleCategory', () => {
  /**
   * State 🌴
   */

  // 单个实体
  const entity = ref<Partial<Category>>({ ..._category });

  // 实体列表
  const entities = ref<Categories>([]);

  const totalCount = ref(0);

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

  /**
   * 重置状态
   */
  // const $reset = () => {
  //   entity.value = { ..._region };
  // };

  const setTotalCount = (data: number | string | null) => {
    if (data) {
      totalCount.value = parseInt(`${data}`, 10);
    }
  };

  /**
   * 读取实体
   */
  const retrieve = async (options?: RetrieveOptions) => {
    const { id } = options || {};

    // 获取实体列表
    const { data, error } = await useFetch(
      `/api/console/categories?${entitiesQueryString.value}`,
      {
        ...useApiInterceptor(),
        onResponse(context) {
          setTotalCount(context.response.headers.get('x-total-count'));
        },
        transform: (data) => categoriesSchema.parse(data),
      },
    );

    if (error.value) return;

    if (data.value) {
      entities.value = data.value;
    }

    return data;
  };

  /**
   * 返回值
   */
  return { retrieve, entity, entities, totalCount, entitiesQuery };
});
