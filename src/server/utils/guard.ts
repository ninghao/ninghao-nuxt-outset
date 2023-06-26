import { H3Event } from 'h3';

/**
 * 登录守卫
 */
export const authGuard = (event: H3Event) => {
  if (event.context.user) return;

  throw createError({
    statusCode: 400,
    statusMessage: '请登录',
  });
};
