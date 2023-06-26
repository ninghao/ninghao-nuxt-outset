import { H3Event } from 'h3';
import jwt from 'jsonwebtoken';
import { User } from '~/app.type';

export type TokenPayload = {
  NS: string;
  DB: string;
  SC: string;
  TK: string;
  ID: string;
  name: string;
  iss: string;
  iat?: 1687753001;
  exp?: 1688357801;
};

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
  const payload: TokenPayload = {
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

/**
 * 获取请求 Auth头部
 */
export const getTokenFromAuthHeader = (event: H3Event) => {
  const authHeader = getRequestHeader(event, 'Authorization');
  let token;

  if (authHeader) {
    token = authHeader.replace('Bearer ', '');
  }

  return token;
};

/**
 * 解码验证令牌
 */
export const verifyToken = (token: string) => {
  return jwt.verify(token, privateKey, {
    algorithms: ['RS256'],
  }) as TokenPayload;
};
