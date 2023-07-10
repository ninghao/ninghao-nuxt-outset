import { H3Event } from 'h3';
import { User, Role } from '~/app.type';
import { SigninBody } from '~/schema/signin';

/**
 * 验证用户登录
 */
export const validateUserSignin = async ({ name, password }: SigninBody) => {
  // 声明
  const statement = `
    SELECT 
      * 
    FROM 
      user 
    WHERE 
      name = $name
  `;

  // 参数
  const statementParams = { name };

  // 查询
  const [{ result }] = await surreal.query<[Array<User>]>(statement, statementParams);

  const [user] = result ?? [];

  if (!user) {
    throw createError({
      statusCode: 400,
      statusMessage: '用户不存在',
    });
  }

  const isPasswordMatch = await compareHash(user.password!, password);

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
  // 声明
  const statement = `
    SELECT 
      id, name, roles
    FROM 
      user
    WHERE 
      id = $userId
    FETCH
      roles; 
  `;

  // 参数
  const statementParams = { userId };

  // 查询
  const [{ result }] = await surreal.query<[Array<User>]>(statement, statementParams);

  const [user] = result ?? [];

  // 返回
  return user ? user : undefined;
};

/**
 * 获得请求用户
 */
export const getRequestUser = async (event: H3Event) => {
  let user;
  const token = getTokenFromRequest(event);

  if (token) {
    const tokenPayload = verifyToken(token);
    user = await getUserById(tokenPayload.ID);
  }

  return user;
};

/**
 * 角色
 */
export const hasRole = (roleName: string) => (user: User | undefined) => {
  let result = false;

  if (user) {
    const roles = (user.roles as Array<Role>) ?? [];
    result = roles.some((role) => role.name === roleName);
  }

  return result;
};

export const isAdministrator = hasRole('administrator');
