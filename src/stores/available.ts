import { CreateAvailableDto, createAvailableDtoSchema } from '~/schema/available';

/**
 * AvailableStore
 */
export const useAvailableStore = defineStore('available', () => {
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
   * 创建实体
   */
  const create = async (dto: CreateAvailableDto) => {
    // 主体数据
    const body = createAvailableDtoSchema.parse(dto);

    // 请求接口
    const { data, error } = await useFetch('/api/available', {
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
   * 返回值
   */
  return { create };
});
