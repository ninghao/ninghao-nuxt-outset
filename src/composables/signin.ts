/**
 * 用户登录
 */
export const useSignin = () => {
  // 用户名
  const name = ref<string>();

  // 密码
  const password = ref<string>();

  // 登录
  const signin = async () => {
    // 主体数据
    const body = {
      name: name.value,
      password: password.value,
    };

    // 请求接口
    const { data, error } = await useFetch('/api/signin', {
      method: 'POST',
      body,
      ...useApiInterceptor(),
    });

    // 处理错误
    if (error.value) return;

    // 当前用户
    useCurrentUser(data.value);

    // 重定向
    navigateTo('/control');

    // 返回数据
    return data;
  };

  // 提供数据
  return { name, password, signin };
};
