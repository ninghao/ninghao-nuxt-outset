import { Order, createOrderDtoSchema } from '~/schema/order';
import { Subscription, Subscriptions } from '~/schema/subscription';
import { Plan } from '~/schema/plan';

export default defineEventHandler(async (event) => {
  // 请求方法
  const method = getMethod(event);

  // 检查用户身份
  authGuard(event);

  // 当前用户
  const user = event.context.user?.id;

  // 创建
  if (method === 'POST') {
    const { items, payment, extra } = await parseBody(event, createOrderDtoSchema);

    // 金额
    let amount: number = 0;

    // 动作
    let actions: Array<string> = [];

    // 状态
    const status = 'pending';

    for (const item of items) {
      const isSubscription = item.includes('subscription:');

      // 订阅
      if (isSubscription) {
        // 找出要购买的订阅
        const [subscription] = await surreal.select<Subscription>(item);
        if (!subscription) return;

        // 找出相关的计划
        const planId = extra?.find((item) => item.includes('plan:'));
        const [plan] = await surreal.select<Plan>(planId ?? '');

        // 设置订单金额
        amount = plan.salePrice;

        if (subscription?.expired === null || subscription?.expired === undefined) {
          actions = ['createSubscription'];
        }

        if (subscription.plan === plan.id && subscription?.expired) {
          actions = ['renewSubscription'];
        }

        if (subscription.plan !== plan.id && subscription?.expired) {
          actions = ['changeSubscriptionPlan'];
        }
      }
    }

    const result = surreal.create<Order>(`order`, {
      user,
      status,
      payment,
      amount,
      items,
      actions,
    });

    return result;
  }
});
