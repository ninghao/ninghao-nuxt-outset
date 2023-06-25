import * as argon2 from 'argon2';

export const createHash = async (text: string) => {
  return await argon2.hash(`${text}`);
};
