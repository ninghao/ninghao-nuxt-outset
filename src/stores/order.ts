/**
 * OrderStore
 */
export const useOrderStore = defineStore('order', () => {
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
  const create = async () => {};

  /**
   * 支付
   */
  const pay = async () => {
    // 1.准备订阅
    const subscriptionStore = useSubscriptionStore();
    subscriptionStore.setSubjectFilter(subscriptionStore.region?.id ?? '');
    await subscriptionStore.retrieve();

    if (!subscriptionStore.entities.length) {
      subscriptionStore.entity = {
        subject: subscriptionStore.region?.id,
        plan: subscriptionStore.plan?.id,
      };

      await subscriptionStore.create();
    }
    // console.log(result);

    // console.log(subscriptionStore);

    // 2.创建订单

    // 3.发起支付

    console.log('pay');
  };

  /**
   * 返回值
   */
  return { pay };
});
