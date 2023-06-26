export default defineEventHandler(async (event) => {
  // 检查是否为服务端接口
  if (!isServerApi(event)) return;

  // 设置请求当前用户
  event.context.user = await getRequestUser(event);
});
