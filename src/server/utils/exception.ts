export const forbiddenException = (message?: string) => {
  throw createError({
    statusCode: 403,
    statusMessage: message ? message : '没有权限执行此操作',
  });
};
