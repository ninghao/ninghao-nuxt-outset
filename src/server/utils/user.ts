import { z } from 'zod';

import { User } from '~/app.type';
import { SigninBody } from '../api/signin.post';

/**
 * 验证用户登录
 */
export const validateUserSignin = async ({
  name,
  password,
}: SigninBody) => {
  const [{ result }] = await surreal.query<[Array<User>]>(
    `
      SELECT * FROM user 
        WHERE name = $name
    `,
    { name },
  );

  const [user] = result ?? [];

  if (!user) {
    throw createError({
      statusCode: 400,
      statusMessage: '用户不存在',
    });
  }

  const isPasswordMatch = await compareHash(
    user.password,
    password,
  );

  if (!isPasswordMatch) {
    throw createError({
      statusCode: 400,
      statusMessage: '密码不匹配',
    });
  }

  return user;
};
