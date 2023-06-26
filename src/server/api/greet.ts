export default defineEventHandler(async (event) => {
  console.log(event.context.user);
  return '您好 ~';
});
