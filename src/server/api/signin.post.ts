import { SigninDtoSchema } from '~/schema/signin';

/**
 * 用户登录接口处理器
 */
export default defineEventHandler(async (event) => {
  // 请求主体
  const body = await parseBody(event, SigninDtoSchema);

  // 验证用户
  const user = await validateUserSignin(body);

  // 签发令牌
  const token = signToken(user);

  // 设置 Cookie
  setCookie(event, 'token', token, { httpOnly: true });

  // 响应数据
  return {
    id: user.id,
    name: user.name,
    token,
  };
});
