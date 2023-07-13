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
 * 资金账户类型
 */
const account_type = z
  .string()
  .min(1)
  .max(32)
  .optional()
  .describe(
    '资金账户类型，不填则默认是BASIC。BASIC：基本账户，OPERATION：运营账户，FEES：手续费账户。示例值：BASIC',
  );

/**
 * 加密算法
 */
const algorithm = z
  .string()
  .min(1)
  .max(31)
  .describe(
    '加密算法，AEAD_AES_256_GCM，SM4_GCM，密钥长度128bit。示例值：AEAD_AES_256_GCM',
  );

/**
 * 下载信息总数
 */
const download_bill_count = z.number().describe('下载信息总数。示例值：1');

/**
 * 加密密钥
 */
const encrypt_key = z
  .string()
  .describe(
    '加密密钥，加密账单文件使用的加密密钥。密钥用商户证书的公钥进行加密，然后进行Base64编码示例值：a0YK7p+9XaKzE9N4qtFfG/9za1oqKlLXXJWBkH+kX84onAs2Ol/E1fk+6S+FuBXczGDRU8I8D+6PfbwKYBGm0wANUTqHOSezzfbieIo2t51UIId7sP9SoN38W2+IcYDviIsu59KSdyiL3TY2xqZNT8UDcnMWzTNZdSv+CLsSgblB6OKGN9JONTadOFGfv1OKkTp86Li+X7S9bG62wsa572/5Rm4MmDCiKwY4bX2EynWQHBEOExD5URxT6/MX3F1D3BNYrE4fUu1F03k25xVlXnZDjksy6Rf3SCgadR+Cepc6mdfF9b2gTxNsJFMEdYXbqL0W1WQZ3UqSPQCguK6uLA==',
  );

/**
 * 账单文件序号
 */
const bill_sequence = z
  .number()
  .describe(
    '账单文件序号，商户将多个文件按账单文件序号的顺序合并为完整的资金账单文件，起始值为1。示例值：1',
  );

/**
 * 随机字符串
 */
const nonce = z
  .string()
  .min(1)
  .max(16)
  .describe('随机字符串，加密账单文件使用的随机字符串。示例值：a8607ef79034c49c');

/**
 * 下载信息明细：项目
 */
const download_bill_list_item = z.object({
  bill_sequence,
  download_url,
  encrypt_key,
  hash_type,
  hash_value,
  nonce,
});

/**
 * 下载信息明细
 */
const download_bill_list = z.array(download_bill_list_item).describe('下载信息明细');

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
export const wechatPayTradeBillSchema = z.object({
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
export const wechatPayTradeBillResultSchema = z.object({
  hash_type,
  hash_value,
  download_url,
});

/**
 * 资金账单
 *
 * 微信支付按天提供微信支付账户的资金流水账单文件，服务商可以通过该接口获取账单文件的下载地址。
 * 文件内包含该账户资金操作相关的业务单号、收支金额、记账时间等信息，供商户进行核对。
 *
 * GET https://api.mch.weixin.qq.com/v3/bill/fundflowbill
 *
 * 示例值：
 * https://api.mch.weixin.qq.com/v3/bill/fundflowbill?bill_date=2019-06-11
 *
 */
export const wechatPayFundflowBillSchema = z.object({
  bill_date,
  tar_type,
  account_type,
});

/**
 * 资金账单：结果
 */
export const wechatPayFundflowBillResultSchema = wechatPayTradeBillResultSchema;

/**
 * 单个子商户资金账单
 *
 * 微信支付按天提供微信支付账户的资金流水账单文件，服务商可以通过该接口获取子商户账单文件的下载地址。
 * 文件内包含子商户资金操作相关的业务单号、收支金额、记账时间等信息，供商户进行核对。
 *
 * GET https://api.mch.weixin.qq.com/v3/bill/sub-merchant-fundflowbill
 *
 * 示例值：
 * https://api.mch.weixin.qq.com/v3/bill/sub-merchant-fundflowbill?sub_mchid=19000000001&bill_date=2019-06-11&account_type=BASIC&algorithm=AEAD_AES_256_GCM&tar_type=GZIP
 *
 */
export const wechatPaySubMerchantFundflowBillSchema = z.object({
  sub_mchid,
  bill_date,
  tar_type,
  account_type,
  algorithm,
});

/**
 * 单个子商户资金账单：结果
 * 
 * 示例值
    {
      "download_bill_count": 1,
      "download_bill_list": [
        {
          "bill_sequence": 1,
          "download_url": "https://api.mch.weixin.qq.com/v3/bill/downloadurl?token=xxx",
          "encrypt_key": "a0YK7p+9XaKzE9N4qtFfG/9za1oqKlLXXJWBkH+kX84onAs2Ol/E1fk+6S+FuBXczGDRU8I8D+6PfbwKYBGm0wANUTqHOSezzfbieIo2t51UIId7sP9SoN38W2+IcYDviIsu59KSdyiL3TY2xqZNT8UDcnMWzTNZdSv+CLsSgblB6OKGN9JONTadOFGfv1OKkTp86Li+X7S9bG62wsa572/5Rm4MmDCiKwY4bX2EynWQHBEOExD5URxT6/MX3F1D3BNYrE4fUu1F03k25xVlXnZDjksy6Rf3SCgadR+Cepc6mdfF9b2gTxNsJFMEdYXbqL0W1WQZ3UqSPQCguK6uLA==",
          "hash_type": "SHA1",
          "hash_value": "79bb0f45fc4c42234a918000b2668d689e2bde04",
          "nonce": "a8607ef79034c49c"
        }
      ]
    }
 */
export const wechatPaySubMerchantFundflowBillResultSchema = z.object({
  download_bill_count,
  download_bill_list,
});

/**
 * 类型
 */
export type WechatPayTradeBill = z.infer<typeof wechatPayTradeBillSchema>;
export type WechatPayTradeBillResult = z.infer<typeof wechatPayTradeBillResultSchema>;
export type WechatPayFundflowBill = z.infer<typeof wechatPayFundflowBillSchema>;
export type WechatPayFundflowBillResult = z.infer<
  typeof wechatPayFundflowBillResultSchema
>;
