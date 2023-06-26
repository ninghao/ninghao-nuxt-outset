export default defineEventHandler(async (event) => {
  // 检查是否为服务端接口
  if (!isServerApi(event)) return;

  // 测试用户
  // const user = {
  //   id: 'user:wanghao',
  //   name: 'wanghao',
  //   roles: [{ id: '', name: 'administrator', title: '' }],
  // };

  // 设置用户能力
  const ability = defineAbilityFor(event.context.user);

  // 扩展 context
  event.context.ability = ability;
});
