import { createFollowDtoSchema, updateFollowDtoSchema } from '~/schema/follow';

/**
 * FollowStore
 */
export const useFollowStore = defineStore('follow', () => {
  /**
   * State 🌴
   */

  /**
   * Getters 🌵
   */

  /**
   * Actions 🚀
   */

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
  return { create, update };
});
