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
  const create = async (data: CreateAvailableDto) => {
    // 主体数据
    const body = createAvailableDtoSchema.parse(data);

    console.log('create available', body);
  };

  /**
   * 返回值
   */
  return { create };
});
