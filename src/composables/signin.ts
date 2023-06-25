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
    });

    // 处理数据
    if (error.value) {
      return useApiResponseError(error);
    }

    return data;
  };

  return { name, password, signin };
};
