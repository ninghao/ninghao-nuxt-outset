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
 * 查询订单
 *
 * 1. 微信支付订单号查询
 * GET https://api.mch.weixin.qq.com/v3/pay/partner/transactions/id/{transaction_id}
 *
 * 示例值：
 * https://api.mch.weixin.qq.com/v3/pay/partner/transactions/id/4200000985202103031441826014?sp_mchid=1900007XXX&sub_mchid=1900008XXX
 */
export const wechatPayRetrieveIdSchema = z.object({
  sp_appid,
  sp_mchid,
});

/**
 * 查询订单
 *
 * 2. 商户订单号查询
 * GET https://api.mch.weixin.qq.com/v3/pay/partner/transactions/out-trade-no/{out_trade_no}
 *
 * 示例值：
 * https://api.mch.weixin.qq.com/v3/pay/partner/transactions/out-trade-no/1217752501201407033233368XXX?sp_mchid=1230000109&sub_mchid=1900008XXX
 */
export const wechatPayRetrieveOutTradeNoSchema = z.object({
  sp_appid,
  sp_mchid,
});

/**
 * 查询订单：结果
 * 
 * 示例值：
   {
    "amount": {
      "currency": "CNY",
      "payer_currency": "CNY",
      "payer_total": 2,
      "total": 2
    },
    "attach": "",
    "bank_type": "CMB_DEBIT",
    "out_trade_no": "b3682ea011c547a49e8d7cc93107b71c",
    "payer": {
      "sp_openid": "o4GgauMQHaUO8ujCGIXNKATQlXXX",
      "sub_openid": "o4GgauMQHaUO8ujCGIXNKATQlXXX"
    },
    "promotion_detail": [],
    "sp_appid": "wxdace645e0bc2cXXX",
    "sp_mchid": "1900007XXX",
    "sub_appid": "wxdace645e0bc2cXXX",
    "sub_mchid": "1900008XXX",
    "success_time": "2021-03-03T15:27:14+08:00",
    "trade_state": "SUCCESS",
    "trade_state_desc": "支付成功",
    "trade_type": "JSAPI",
    "transaction_id": "4200000985202103031441826014"
  }
 */

export const wechatPayRetrieveResultSchema = z.object({
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
 * 类型
 */
export type WechatPayRetrieveId = z.infer<typeof wechatPayRetrieveIdSchema>;

export type WechatPayRetrieveOutTradeNo = z.infer<
  typeof wechatPayRetrieveOutTradeNoSchema
>;

export type WechatPayRetrieveResult = z.infer<typeof wechatPayRetrieveResultSchema>;
