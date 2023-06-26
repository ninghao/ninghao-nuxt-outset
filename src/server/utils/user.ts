import { H3Event } from 'h3';
import { User, Role } from '~/app.type';
import { SigninBody } from '../schema/signin';

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
    user.password!,
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

/**
 * 获得当前用户
 */
export const getUserById = async (userId: string) => {
  const [{ result }] = await surreal.query<[Array<User>]>(
    `
    SELECT 
      id, name, roles
    FROM 
      user
    WHERE 
      id = $userId
    FETCH
      roles; 
  `,
    { userId },
  );

  const [user] = result ?? [];

  return user ? user : undefined;
};

/**
 * 获得请求用户
 */
export const getRequestUser = async (event: H3Event) => {
  let user;
  const token = getTokenFromAuthHeader(event);

  if (token) {
    const tokenPayload = verifyToken(token);
    user = await getUserById(tokenPayload.ID);
  }

  return user;
};

/**
 * 角色
 */
export const hasRole = (
  user: User | undefined,
  roleName: string,
) => {
  let result = false;

  if (user) {
    const roles = (user.roles as Array<Role>) ?? [];
    result = roles.some((role) => role.name === roleName);
  }

  return result;
};
