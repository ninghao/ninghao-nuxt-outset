import { useStorage } from '@vueuse/core';

export type CurrentUser = {
  id: string;
  name: string;
  token: string;
};

export const useCurrentUser = (user?: CurrentUser | null) => {
  // 当前用户数据名称
  const key = 'currentUser';

  // 默认当前用户
  const defaultCurrentUser = {
    id: '',
    name: '',
    token: '',
  };

  // 本地存储里的当前用户
  const currentUserFromStorage = useStorage<CurrentUser>(
    key,
    defaultCurrentUser,
  );

  // 当前用户
  const currentUser = useState<CurrentUser | null>(key);

  // 恢复当前用户
  if (currentUserFromStorage.value.token) {
    currentUser.value = currentUserFromStorage.value;
  }

  // 设置当前用户
  if (user) {
    currentUser.value = user;
    currentUserFromStorage.value = user;
  }

  // 删除当前用户
  if (user === null) {
    currentUser.value = null;
    currentUserFromStorage.value = null;
  }

  // 是否登录
  const isLoggedIn = () => {
    return currentUser.value ? true : false;
  };

  // 返回数据
  return { currentUser, isLoggedIn };
};
