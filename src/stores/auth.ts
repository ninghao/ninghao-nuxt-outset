/**
 * 身份验证 Store
 */
export const useAuthStore = defineStore('auth', () => {
  /**
   * 状态
   */

  // 名字
  const name = ref<string>();

  // 密码
  const password = ref<string>();

  /**
   * 动作
   */

  // 重置登录状态
  const resetSigninState = () => {
    name.value = '';
    password.value = '';
  };

  // 用户登录
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
    if (error.value) {
      return useApiError(error);
    }

    // 重置
    resetSigninState();

    // 当前用户
    useCurrentUser(data.value);

    // 重定向
    navigateTo('/control');

    // 返回数据
    return data;
  };

  /**
   * 提供对象
   */
  return { name, password, signin };
});
