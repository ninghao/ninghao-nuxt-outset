import jwt from 'jsonwebtoken';
import { User } from '~/app.type';

/**
 * 配置
 */
const config = useRuntimeConfig();

/**
 * 公钥
 */
export const publicKey = Buffer.from(
  config.jwt.publicKey,
  'base64',
).toString();

/**
 * 密钥
 */
export const privateKey = Buffer.from(
  config.jwt.privateKey,
  'base64',
).toString();

/**
 * 签发令牌
 */
export const signToken = (user: User) => {
  // 令牌主体
  const payload = {
    NS: config.surreal.namespace,
    DB: config.surreal.database,
    SC: config.surreal.scope,
    TK: config.surreal.tokenName,
    ID: user.id,
    name: user.name,
    iss: config.surreal.namespace,
  };

  // 签发令牌
  const token = jwt.sign(payload, privateKey, {
    algorithm: 'RS256',
    expiresIn: config.jwt.expiresIn,
  });

  // 返回
  return token;
};
