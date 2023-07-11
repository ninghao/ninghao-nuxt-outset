import { Payments, paymentsSchema } from '~/schema/payment';

/**
 * PaymentStore
 */
export const usePaymentStore = defineStore('payment', () => {
  /**
   * State 🌴
   */

  // 列表
  const entities = ref<Payments>([]);

  /**
   * Getters 🌵
   */

  /**
   * Actions 🚀
   */

  /**
   * 读取
   */
  const retrieve = async () => {
    // 获取列表
    const { data, error } = await useFetch(`/api/payments`, {
      ...useApiInterceptor(),
      transform: (data) => paymentsSchema.parse(data),
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
  return { retrieve, entities };
});
