export default defineEventHandler((event) => {
  const request = getRequestHeaders(event);

  console.log(request);

  return { message: 'greet' };
});
