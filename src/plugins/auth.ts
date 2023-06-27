export default defineNuxtPlugin(() => {
  const store = useAuthStore();
  store.restoreCurrentUser();
});
