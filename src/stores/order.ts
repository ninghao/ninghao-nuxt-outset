import { Order, _order, createOrderDtoSchema } from '~/schema/order';

/**
 * OrderStore
 */
export const useOrderStore = defineStore('order', () => {
  /**
   * State 🌴
   */

  // 单个实体
  const entity = ref<Partial<Order>>({ ..._order });

  /**
   * Getters 🌵
   */

  /**
   * Actions 🚀
   */

  /**
   * 创建
   */
  const create = async () => {
    // 主体数据
    const body = createOrderDtoSchema.parse(entity.value);

    // 请求接口
    const { data, error } = await useFetch('/api/orders', {
      method: 'POST',
      body,
      ...useApiInterceptor(),
    });

    // 处理错误
    if (error.value) return;

    // 重置状态
    // $reset();

    // 显示通知
    // useToast().add({ title: '成功创建了区域' });

    // 更新列表
    // retrieve();

    // 返回数据
    return data;
  };

  /**
   * 支付
   */
  const pay = async () => {
    // 1.准备订阅
    const subscriptionStore = useSubscriptionStore();
    subscriptionStore.setSubjectFilter(subscriptionStore.region?.id ?? '');
    await subscriptionStore.retrieve();

    // 支付方法
    const payment = subscriptionStore.payment?.id;

    // 订阅计划
    const plan = subscriptionStore.plan?.id;

    // 订阅
    let subscription = subscriptionStore.entities[0]?.id;

    if (!subscription) {
      // 创建订阅
      subscriptionStore.entity = {
        subject: subscriptionStore.region?.id,
        plan: subscriptionStore.plan,
      };

      const result = await subscriptionStore.create();
      subscription = result?.value?.id ?? '';
    }

    // 2.准备订单
    entity.value = {
      payment,
      items: [subscription],
      extra: [plan],
    };

    await create();

    // console.log('subscription', subscription);

    // console.log(result);

    // console.log(subscriptionStore);

    // 2.创建订单

    // 3.发起支付

    // console.log('pay');
  };

  /**
   * 返回值
   */
  return { pay, create };
});
