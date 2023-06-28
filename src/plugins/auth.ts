export default defineNuxtPlugin((app) => {
  const store = useAuthStore();
  store.restoreCurrentUser();
});
