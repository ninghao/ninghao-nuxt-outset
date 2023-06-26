export default defineEventHandler(async (event) => {
  // 检查是否为服务端接口
  if (!isServerApi(event)) return;

  // 请求用户
  const user = {
    id: 'user:wanghao',
    name: 'wanghao',
    roles: [{ id: '', name: 'administrator', title: '' }],
  };

  // 设置用户能力
  const ability = defineAbilityFor(user);
  event.context.ability = ability;
});
