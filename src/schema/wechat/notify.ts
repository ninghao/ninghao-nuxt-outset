import { z } from 'zod';
import {
  sp_appid,
  sp_mchid,
  sub_appid,
  sub_mchid,
  out_trade_no,
  transaction_id,
  trade_type,
  trade_state,
  trade_state_desc,
  bank_type,
  attach,
  success_time,
  payer,
  total,
  currency,
  payer_total,
  payer_currency,
  scene_info,
  promotion_detail,
} from './base';

/**
 * 通知ID
 */
const id = z
  .string()
  .min(1)
  .max(36)
  .describe('通知ID，通知的唯一ID示例值：EV-2018022511223320873');

/**
 * 通知创建时间
 */
const create_time = z
  .string()
  .min(1)
  .max(16)
  .describe(
    '通知创建时间，遵循rfc3339标准格式，格式为yyyy-MM-DDTHH:mm:ss+TIMEZONE，yyyy-MM-DD表示年月日，T出现在字符串中，表示time元素的开头，HH:mm:ss.表示时分秒，TIMEZONE表示时区（+08:00表示东八区时间，领先UTC 8小时，即北京时间）。例如：2015-05-20T13:29:35+08:00表示北京时间2015年05月20日13点29分35秒。 示例值：2015-05-20T13:29:35+08:00',
  );

/**
 * 通知类型
 */
const event_type = z
  .string()
  .min(1)
  .max(32)
  .describe(
    '通知类型，支付成功通知的类型为TRANSACTION.SUCCESS。示例值：TRANSACTION.SUCCESS',
  );

/**
 * 通知数据类型
 */
const resource_type = z
  .string()
  .min(1)
  .max(32)
  .describe(
    '通知数据类型，通知的资源数据类型，支付成功通知为encrypt-resource。示例值：encrypt-resource',
  );

/**
 * 通知资源数据
 */
const resource = z
  .object({
    algorithm: z
      .string()
      .min(1)
      .max(32)
      .describe(
        '加密算法类型，对开启结果数据进行加密的加密算法，目前只支持AEAD_AES_256_GCM。示例值：AEAD_AES_256_GCM',
      ),
    ciphertext: z
      .string()
      .min(1)
      .max(1048576)
      .describe('数据密文，Base64编码后的开启/停用结果数据密文。示例值：sadsadsadsad'),
    associated_data: z.string().min(1).max(16).optional().describe('附加数据'),
    original_type: z
      .string()
      .min(1)
      .max(16)
      .describe('原始类型，原始回调类型，为transaction。示例值：transaction'),
    nonce: z.string().min(1).max(16).describe('随机串，加密使用的随机串。'),
  })
  .describe('通知资源数据');

/**
 * 回调摘要
 */
const summary = z.string().min(1).max(64).describe('回调摘要。示例值：支付成功');

/**
 * 支付通知
 *
 * 通知频率为 15s/15s/30s/3m/10m/20m/30m/30m/30m/60m/3h/3h/3h/6h/6h - 总计 24h4m
 */
export const wechatPayNotifyResultSchema = z.object({
  id,
  create_time,
  event_type,
  resource_type,
  resource,
  summary,
});

/**
 * 支付通知参数
 */
export const wechatPayNotifyResultDataSchema = z.object({
  sp_appid,
  sp_mchid,
  sub_appid,
  sub_mchid,
  out_trade_no,
  transaction_id,
  trade_type,
  trade_state,
  trade_state_desc,
  bank_type,
  attach,
  success_time,
  payer,
  amount: z.object({
    total,
    currency,
    payer_total,
    payer_currency,
  }),
  scene_info,
  promotion_detail,
});

/**
 * 支付通知回应
 */
export const wechatPayNotifyResponseSchema = z.object({
  code: z
    .string()
    .min(1)
    .max(32)
    .describe(
      '返回状态码，错误码，SUCCESS 为清算机构接收成功，其他错误码为失败。示例值：FAIL',
    ),
  message: z
    .string()
    .min(1)
    .max(64)
    .describe('返回信息，如非空，为错误原因。示例值：失败'),
});

/**
 * 类型
 */
export type WechatPayNotifyResult = z.infer<typeof wechatPayNotifyResultSchema>;
export type WechatPayNotifyResultData = z.infer<typeof wechatPayNotifyResultDataSchema>;
export type WechatPayNotifyResponse = z.infer<typeof wechatPayNotifyResponseSchema>;
