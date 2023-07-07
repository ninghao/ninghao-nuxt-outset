/**
 * BrandDestroyStore
 */
export const useBrandDestroyStore = defineStore('brandDestroy', () => {
  /**
   * State
   */

  /**
   * Getters
   */

  /**
   * Actions
   */

  const deleteBrandById = async (id: string) => {
    // 请求接口
    const { data, error } = await useFetch(`/api/console/brands/${id}`, {
      method: 'DELETE',
      ...useApiInterceptor(),
    });

    // 处理错误
    if (error.value) return;

    // 显示通知
    useToast().add({ title: '成功删除了品牌' });

    // 更新列表
    const store = useBrandIndexStore();
    store.getBrands();

    // 返回数据
    return data;
  };

  /**
   * 返回值
   */
  return { deleteBrandById };
});
