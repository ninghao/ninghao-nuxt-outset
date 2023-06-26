export default defineNuxtRouteMiddleware((to, from) => {
  // 跳过服务端
  if (process.server) return;

  const { isLoggedIn } = useCurrentUser();

  // 用户未登录
  if (
    !isLoggedIn.value &&
    to.path !== '/signin' &&
    to.meta.layout === 'control'
  ) {
    return navigateTo('/signin');
  }

  // 用户已登录
  if (isLoggedIn.value && to.path === '/signin') {
    return navigateTo('/');
  }
});
