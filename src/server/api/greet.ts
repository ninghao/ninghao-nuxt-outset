export default defineEventHandler(async (event) => {
  authGuard(event);
  return '您好 ~';
});
