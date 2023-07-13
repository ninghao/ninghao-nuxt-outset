import { z } from 'zod';
import { code_url, wechatCreateTransactionSchema, scene_info } from './base';

/**
 * Native：创建订单
 * POST https://api.mch.weixin.qq.com/v3/pay/partner/transactions/native
 * 示例值：
    {
      "sp_mchid": "1900007XXX",
      "sub_mchid": "1900008XXX",
      "out_trade_no": "native12177525012014070332333",
      "sp_appid": "wxdace645e0bc2cXXX",
      "sub_appid": "wxdace645e0bc2cXXX",
      "description": "Image形象店-深圳腾大-QQ公仔",
      "notify_url": "https://weixin.qq.com/",
      "amount": {
        "total": 1,
        "currency": "CNY"
      }
    }
 */
export const wechatPayNativeCreateSchema = wechatCreateTransactionSchema.extend({
  scene_info,
});

/**
 * Native：创建订单返回结果
 * 示例值：
    {
      "code_url": "weixin://wxpay/bizpayurl?pr=qnu8GBtzz"
    }
  */
export const wechatPayNativeCreateResultSchema = z.object({
  code_url,
});

/**
 * 类型
 */
export type WechatPayNativeCreate = z.infer<typeof wechatPayNativeCreateSchema>;

export type WechatPayNativeCreateResult = z.infer<
  typeof wechatPayNativeCreateResultSchema
>;
