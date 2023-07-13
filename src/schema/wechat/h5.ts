import { z } from 'zod';
import { h5_info, scene_info, wechatCreateTransactionSchema } from './base';

/**
 * H5：创建订单
 * 
 * 商户系统先调用该接口在微信支付服务后台生成预支付交易单，返回正确的预支付交易会话标识，
 * 再按Native、JSAPI、APP等不同场景生成交易串调起支付。
 * 
 * POST https://api.mch.weixin.qq.com/v3/pay/partner/transactions/h5
 * 
 * 示例值：
    {
      "sp_mchid": "1900006XXX",
      "out_trade_no": "H51217752501201407033233368018",
      "sp_appid": "wxdace645e0bc2cXXX",
      "sub_mchid": "1900006XXX",
      "description": "Image形象店-深圳腾大-QQ公仔",
      "notify_url": "https://weixin.qq.com/",
      "amount": {
        "total": 1,
        "currency": "CNY"
      },
      "scene_info": {
        "payer_client_ip": "127.0.0.1",
        "h5_info": {
          "type": "Wap"
        }
      }
    }
 */
export const wechatPayH5CreateSchema = wechatCreateTransactionSchema.extend({
  scene_info: scene_info.extend({ h5_info }),
});

/**
 * H5：创建订单结果
 * 
 * 示例值：
    {	
      "h5_url": "https://wx.tenpay.com/cgi-bin/mmpayweb-bin/checkmweb?prepay_id=wx2016121516420242444321ca0631331346&package=1405458241"
    }
 */
export const wechatPayH5CreateResultSchema = z.object({
  h5_url: z
    .string()
    .min(1)
    .max(512)
    .describe(
      '支付跳转链接，h5_url为拉起微信支付收银台的中间页面，可通过访问该url来拉起微信客户端，完成支付，h5_url的有效期为5分钟。示例值：https://wx.tenpay.com/cgi-bin/mmpayweb-bin/checkmweb?prepay_id=wx2016121516420242444321ca0631331346&package=1405458241',
    ),
});

/**
 * 类型
 */
export type WechatPayH5Create = z.infer<typeof wechatPayH5CreateSchema>;
export type WechatPayH5CreateResult = z.infer<typeof wechatPayH5CreateResultSchema>;
