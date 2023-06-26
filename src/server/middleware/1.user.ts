export default defineEventHandler(async (event) => {
  // 检查是否为服务端接口
  if (!isServerApi(event)) return;

  // 请求用户
  const user = await getRequestUser(event);

  // 设置请求当前用户
  event.context.user = user;
});
