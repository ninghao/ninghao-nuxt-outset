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
  detail,
  payer_client_ip,
  device_id,
  store_info,
  h5_info,
} from './base';

export const wechatPayH5CreateSchema = z.object({
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
  detail,
  scene_info: z
    .object({
      payer_client_ip,
      device_id,
      store_info,
      h5_info,
    })
    .describe('场景信息，支付场景描述。'),
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
