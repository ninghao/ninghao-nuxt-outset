import { paramsSchema } from '~/schema/api';
import { Order } from '~/schema/order';

export default defineEventHandler(async (event) => {
  // 请求方法
  const method = getMethod(event);

  // 检查用户身份
  authGuard(event);

  // 当前用户
  const user = event.context.user?.id ?? '';

  // 创建
  if (method === 'POST') {
    const { id } = parseParams(event, paramsSchema);

    const [order] = await surreal.select<Order>(id);

    return order;
  }
});
