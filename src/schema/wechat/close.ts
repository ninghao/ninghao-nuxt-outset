import { z } from 'zod';
import { sp_mchid, sub_mchid } from './base';

/**
 * 关闭订单
 * 
 * POST  https://api.mch.weixin.qq.com/v3/pay/partner/transactions/out-trade-no/{out_trade_no}/close
 * 返回无数据（HTTP状态码为204）
 * 
 * 示例值：
    {
      "sp_mchid": "1900007XXX",
      "sub_mchid": "1900008XXX"
    }
 */
export const wechatPayCloseSchema = z.object({
  sp_mchid,
  sub_mchid,
});

/**
 * 类型
 */
export type WechatPayClose = z.infer<typeof wechatPayCloseSchema>;
