import { z } from 'zod';
import {
  sp_appid,
  sp_mchid,
  sub_appid,
  sub_mchid,
  description,
  out_trade_no,
  time_expire,
  attach,
  notify_url,
  goods_tag,
  support_fapiao,
  settle_info,
  amount,
  payer,
  detail,
  payer_client_ip,
  device_id,
  store_info,
  prepay_id,
} from './base';

/**
 * JSAPI：创建订单
 * POST https://api.mch.weixin.qq.com/v3/pay/partner/transactions/jsapi
 * 示例值：
    {
      "sp_mchid": "1900007XXX",
      "sub_mchid": "1900008XXX",
      "out_trade_no": "1217752501201407033233368318",
      "sp_appid": "wxdace645e0bc2cXXX",
      "sub_appid": "wxdace645e0bc2cXXX",
      "description": "Image形象店-深圳腾大-QQ公仔",
      "notify_url": "https://weixin.qq.com/",
      "amount": {
        "total": 1,
        "currency": "CNY"
      },
      "payer": {
        "sp_openid": "o4GgauInH_RCEdvrrNGrntXDuXXX"
      }
    }
 */
export const wechatPayJsApiCreateSchema = z.object({
  sp_appid,
  sp_mchid,
  sub_appid,
  sub_mchid,
  description,
  out_trade_no,
  time_expire,
  attach,
  notify_url,
  goods_tag,
  support_fapiao,
  settle_info,
  amount,
  payer,
  detail,
  scene_info: z
    .object({
      payer_client_ip,
      device_id,
      store_info,
    })
    .describe('场景信息，支付场景描述。'),
});

/**
     * JSAPI：创建订单结果
     * 
     * 示例：
       {
          "prepay_id": "wx2611215250487459928b659bd466620000"
        }
     */
export const wechatPayJsApiCreateResultSchema = z.object({
  prepay_id,
});

/**
 * JSAPI：发起支付
 * 通过JSAPI下单接口获取到发起支付的必要参数prepay_id，然后使用微信支付提供的前端JS方法调起公众号支付。
 *
 * ⚠️ 注意
 * 1. 请确保实际支付时的请求目录与后台配置的目录一致（5分钟后生效），配置：https://pay.weixin.qq.com/wiki/doc/apiv3_partner/open/pay/chapter2_1.shtml
 * 2. WeixinJSBridge内置对象在其他浏览器中无效
 */

export const wechatPayJsApiPayPreSchema = z.object({
  appId: z
    .string()
    .min(1)
    .max(32)
    .describe(
      '应用ID，商户申请的公众号对应的appid，由微信支付生成，可在公众号后台查看。若下单时传了sub_appid，可为sub_appid的值。示例值：wx8888888888888888',
    ),
  timeStamp: z
    .string()
    .min(1)
    .max(32)
    .describe(
      '时间戳，标准北京时间，时区为东八区，自1970年1月1日 0点0分0秒以来的秒数。注意：部分系统取到的值为毫秒级，需要转换成秒(10位数字)。 示例值：1414561699',
    ),
  nonceStr: z
    .string()
    .min(1)
    .max(32)
    .describe('随机字符串，不长于32位。示例值：5K8264ILTKCH16CQ2502SI8ZNMTM67VS'),
  package: z
    .string()
    .min(1)
    .max(128)
    .describe(
      '订单详情扩展字符串，JSAPI下单接口返回的prepay_id参数值，提交格式如：prepay_id=***示例值：prepay_id=wx21201855730335ac86f8c43d1889123400',
    ),
});

export const wechatPayJsApiPaySchema = z.object({
  signType: z
    .string()
    .min(1)
    .max(32)
    .describe('签名方式，签名类型，默认为RSA，仅支持RSA。示例值：RSA'),
  paySign: z
    .string()
    .min(1)
    .max(256)
    .describe(
      '签名，使用字段appId、timeStamp、nonceStr、package计算得出的签名值示例值：oR9d8PuhnIc+YZ8cBHFCwfgpaK9gd7vaRvkYD7r...',
    ),
});

/**
 * 类型
 */
export type WechatPayJsApiCreate = z.infer<typeof wechatPayJsApiCreateSchema>;
export type WechatPayJsApiCreateResult = z.infer<typeof wechatPayJsApiCreateResultSchema>;
