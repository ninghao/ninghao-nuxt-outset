import { CurrentUser } from '../schema/auth';
import { useStorage } from '@vueuse/core';

/**
 * 身份验证 Store
 */
export const useAuthStore = defineStore('auth', () => {
  /**
   * State
   */

  const name = ref<string>();
  const password = ref<string>();

  const defaultCurrentUser = {
    id: '',
    name: '',
    token: '',
  };

  const currentUser = ref<CurrentUser>(defaultCurrentUser);

  const currentUserFromStorage = useStorage<CurrentUser>(
    'currentUser',
    defaultCurrentUser,
  );

  /**
   * Getters
   */

  const isLoggedIn = computed(() => {
    return currentUser.value && currentUser.value.token
      ? true
      : false;
  });

  /**
   * Actions
   */

  const resetSigninState = () => {
    name.value = '';
    password.value = '';
  };

  const setCurrentUser = (data: CurrentUser) => {
    currentUser.value = data;
    currentUserFromStorage.value = data;
  };

  const resetCurrentUser = () => {
    currentUser.value = defaultCurrentUser;
    currentUserFromStorage.value = defaultCurrentUser;
  };

  const restoreCurrentUser = () => {
    if (currentUserFromStorage.value.token) {
      currentUser.value = currentUserFromStorage.value;
    }
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
    if (error.value) return;

    // 当前用户
    if (data.value) setCurrentUser(data?.value);

    // 重置
    resetSigninState();

    // 重定向
    navigateTo('/');

    // 返回数据
    return data;
  };

  // 退出登录
  const signout = () => {
    resetCurrentUser();
    navigateTo('/');
  };

  /**
   * 对象
   */
  return {
    name,
    password,
    signin,
    signout,
    currentUser,
    restoreCurrentUser,
    isLoggedIn,
  };
});
