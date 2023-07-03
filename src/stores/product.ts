import {
  Product,
  Products,
  _product,
  createProductDtoSchema,
  productSchema,
  productsSchema,
  updateProductDtoSchema,
} from '~/schema/product';

/**
 * RegionStore
 */
type RetrieveOptions = {
  id?: string;
};

export const useProductStore = defineStore('product', () => {
  /**
   * State 🌴
   */

  // 单个实体
  const entity = ref<Partial<Product>>({ ..._product });

  // 实体列表
  const entities = ref<Products>([]);

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
  const $reset = () => {
    entity.value = { ..._product };
  };

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

    console.log(id);

    // 获取单个实体
    if (id) {
      const { data, error } = await useFetch(`/api/products/${id}`, {
        ...useApiInterceptor(),
        transform: (data) => productSchema.parse(data),
      });

      console.log(data);

      if (error.value) return;

      if (data.value) {
        entity.value = data.value;
      }

      return data;
    }

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
   * 创建实体
   */
  const create = async () => {
    // 主体数据
    const body = createProductDtoSchema.parse(entity.value);

    // 请求接口
    const { data, error } = await useFetch('/api/products', {
      method: 'POST',
      body,
      ...useApiInterceptor(),
    });

    // 处理错误
    if (error.value) return;

    // 重置状态
    $reset();

    // 显示通知
    useToast().add({ title: '成功创建了商品' });

    // 更新列表
    retrieve();

    // 返回数据
    return data;
  };

  /**
   * 更新实体
   */
  const update = async () => {
    // 请求主体
    const body = updateProductDtoSchema.parse(entity.value);

    // 实体 ID
    const id = body?.id;

    // 请求接口
    const { data, error } = await useFetch(`/api/products/${id}`, {
      method: 'PUT',
      body,
      ...useApiInterceptor(),
    });

    // 处理错误
    if (error.value) return;

    // 显示通知
    useToast().add({ title: '成功更新了产品' });

    // 更新列表
    retrieve();

    // 返回数据
    return data;
  };

  /**
   * 删除实体
   */
  const destroy = async (entityId?: string) => {
    // 实体 ID
    const id = entityId ?? entity.value.id;

    // 请求接口
    const { data, error } = await useFetch(`/api/products/${id}`, {
      method: 'DELETE',
      ...useApiInterceptor(),
    });

    // 处理错误
    if (error.value) return;

    // 显示通知
    useToast().add({ title: '成功删除了产品' });

    // 更新列表
    retrieve();

    // 返回数据
    return data;
  };

  /**
   * 返回值
   */
  return {
    create,
    retrieve,
    update,
    destroy,
    entity,
    entities,
    totalCount,
    entitiesQuery,
  };
});
