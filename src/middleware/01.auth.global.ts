export default defineNuxtRouteMiddleware((to, from) => {
  // 跳过服务端
  if (process.server) return;

  const store = useAuthStore();

  console.log(store.isLoggedIn);

  // 用户未登录
  if (
    !store.isLoggedIn &&
    to.path !== '/signin' &&
    to.meta.layout === 'control'
  ) {
    return navigateTo('/signin');
  }

  // 用户已登录
  if (store.isLoggedIn && to.path === '/signin') {
    return navigateTo('/');
  }
});
