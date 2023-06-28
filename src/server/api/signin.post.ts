import { SigninBodySchema } from '../schema/signin';

/**
 * 用户登录接口处理器
 */
export default defineEventHandler(async (event) => {
  const body = await parseBody(event, SigninBodySchema);
  const user = await validateUserSignin(body);
  const token = signToken(user);

  setCookie(event, 'token', token, { httpOnly: true });

  return {
    id: user.id,
    name: user.name,
    token,
  };
});
