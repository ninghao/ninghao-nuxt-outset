import { z } from 'zod';
import { sub_mchid } from './base';

/**
 * 账单日期
 */
const bill_date = z
  .string()
  .min(1)
  .max(10)
  .describe('账单日期，格式yyyy-MM-dd仅支持三个月内的账单下载申请。示例值：2019-06-11');

/**
 * 账单类型
 */
const bill_type = z
  .string()
  .min(1)
  .max(32)
  .optional()
  .describe(
    '账单类型，不填则默认是ALL枚举值：ALL：返回当日所有订单信息（不含充值退款订单）SUCCESS：返回当日成功支付的订单（不含充值退款订单）REFUND：返回当日退款订单（不含充值退款订单）。示例值：ALL',
  );

/**
 * 压缩类型
 */
const tar_type = z
  .string()
  .min(1)
  .max(32)
  .optional()
  .describe(
    '压缩类型，不填则默认是数据流。GZIP：返回格式为.gzip的压缩包账单。示例值：GZIP',
  );

/**
 * 哈希类型
 */
const hash_type = z
  .string()
  .min(1)
  .max(32)
  .describe('哈希类型，SHA1：SHA1值。示例值：SHA1');

/**
 * 哈希值
 */
const hash_value = z
  .string()
  .min(1)
  .max(1024)
  .describe(
    '哈希值，原始账单（gzip需要解压缩）的摘要值，用于校验文件的完整性。示例值：79bb0f45fc4c42234a918000b2668d689e2bde04',
  );

/**
 * 账单下载地址
 */
const download_url = z
  .string()
  .min(1)
  .max(2048)
  .describe(
    '账单下载地址，供下一步请求账单文件的下载地址，该地址30s内有效。示例值：https://api.mch.weixin.qq.com/v3/billdownload/file?token=xxx',
  );

/**
 * 交易账单
 *
 * 微信支付按天提供交易账单文件，服务商可以通过该接口获取账单文件的下载地址。
 * 文件内包含交易相关的金额、时间、营销等信息，供商户核对订单、退款、银行到账等情况。
 *
 * GET https://api.mch.weixin.qq.com/v3/bill/tradebill
 *
 * 示例值：
 * https://api.mch.weixin.qq.com/v3/bill/tradebill?bill_date=2019-06-11&sub_mchid=1900000001&bill_type=ALL
 */
export const wechatPayTradebillSchema = z.object({
  bill_date,
  sub_mchid,
  bill_type,
  tar_type,
});

/**
 * 交易账单：结果
 *
 * 示例值：
    {
      "download_url": "https://api.mch.weixin.qq.com/v3/billdownload/file?token=E-bFy6HgY_ffEOQutOpiFXX-SHI3EWhUQtPKAUd1iDGBGUA6Bfbzmcc-CWdJE23-",
      "hash_type": "SHA1",
      "hash_value": "8257296d67cd621531ddb3f6d3ed10d3ea45dd09"
    }
 */
export const wechatPayTradebillResultSchema = z.object({
  hash_type,
  hash_value,
  download_url,
});

/**
 * 类型
 */
export type WechatPayTradebill = z.infer<typeof wechatPayTradebillSchema>;
export type WechatPayTradebillResult = z.infer<typeof wechatPayTradebillResultSchema>;
