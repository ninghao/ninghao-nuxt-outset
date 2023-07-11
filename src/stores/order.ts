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

    let subscription = subscriptionStore.entities[0]?.id;

    if (!subscription) {
      // 创建订阅
      subscriptionStore.entity = {
        subject: subscriptionStore.region?.id,
        plan: subscriptionStore.plan?.id,
      };

      const result = await subscriptionStore.create();
      subscription = result?.value?.id ?? '';
    }

    console.log('subscription', subscription);

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
