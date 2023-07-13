import fs from 'fs';
import crypto from 'crypto';
import { customAlphabet } from 'nanoid';

/**
 * 随机字符
 */
export const randomId = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz');

/**
 * 生成微信支付 Authorization
 */
type CreateWechatAuthorizationOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  url: string;
  body?: string | Record<string, any>;
};

export const createWechatAuthorization = (options: CreateWechatAuthorizationOptions) => {
  const config = useRuntimeConfig();

  // 1.请求方法
  const method = options.method ?? 'GET';

  // 2.请求地址
  const url = options.url;

  // 3.时间戳
  const timestamp = Math.floor(new Date().getTime() / 1000);

  // 4.随机字符
  const nonce_str = randomId(32);

  // 5.请求主体
  const body = options.body ? JSON.stringify(options.body) : '';

  // 准备签名数据
  const data = [method, url, timestamp, nonce_str, body].join('\n') + '\n';

  // 接口密钥
  const privateKey = fs.readFileSync(config.wechatPay.apiKeyPath, 'utf8');

  // 生成签名
  const signature = crypto
    .createSign('RSA-SHA256')
    .update(data)
    .sign(privateKey, 'base64');

  // 认证类型
  const authType = config.wechatPay.authType;

  // 证书序列号
  const serial_no = config.wechatPay.serial;

  // 商店 ID
  const mchid = config.wechatPay.mchId;

  // 签名信息
  const signatureInfo = Object.entries({
    mchid,
    nonce_str,
    signature,
    timestamp,
    serial_no,
  })
    .map(([key, value]) => `${key}="${value}"`)
    .join(',');

  // 返回 Authorization
  return `${authType} ${signatureInfo}`;
};
