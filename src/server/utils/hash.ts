import * as argon2 from 'argon2';

/**
 * 创建 Hash
 */
export const createHash = async (text: string) => {
  return await argon2.hash(`${text}`);
};

/**
 * 验证 Hash
 */
export const compareHash = async (hash: string, text: string) => {
  return await argon2.verify(hash, text);
};
