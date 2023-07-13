import { z } from 'zod';

import {
  goods_name,
  merchant_goods_id,
  out_trade_no,
  sub_mchid,
  transaction_id,
  unit_price,
  wechatpay_goods_id,
} from './base';

/**
 * 商户退款单号
 */
const out_refund_no = z
  .string()
  .min(1)
  .max(64)
  .describe(
    '商户退款单号，商户系统内部的退款单号，商户系统内部唯一，只能是数字、大小写字母_-|*@ ，同一退款单号多次请求只退一笔。 示例值：1217752501201407033233368018',
  );

/**
 * 退款原因
 */
const reason = z
  .string()
  .min(1)
  .max(8)
  .optional()
  .describe(
    '退款原因，若商户传入，会在下发给用户的退款消息中体现退款原因。示例值：商品已售完',
  );

/**
 * 退款结果回调 URL
 */
const notify_url = z
  .string()
  .min(8)
  .max(256)
  .optional()
  .describe(
    '退款结果回调URL，异步接收微信支付退款结果通知的回调地址，通知URL必须为外网可访问的URL，不能携带参数。 如果参数中传了notify_url，则商户平台上配置的回调地址将不会生效，优先回调当前传的这个地址。 示例值：https://weixin.qq.com',
  );

/**
 * 退款资金来源
 */
const funds_account = z
  .string()
  .min(1)
  .max(32)
  .optional()
  .describe(
    '退款资金来源，若传递此参数则使用对应的资金账户退款，否则默认使用未结算资金退款（仅对老资金流商户适用）枚举值：AVAILABLE：可用余额账户示例值：AVAILABLE',
  );

/**
 * 金额信息
 */
const from = z
  .array(
    z.object({
      account: z
        .string()
        .min(1)
        .max(32)
        .describe(
          '出资账户类型，下面枚举值多选一。AVAILABLE: 可用余额，UNAVAILABLE: 不可用余额 示例值：AVAILABLE',
        ),
      amount: z.number().describe('出资金额，对应账户出资金额。示例值：444'),
    }),
  )
  .optional()
  .describe(
    '退款出资账户及金额，退款需要从指定账户出资时，传递此参数指定出资金额（币种的最小单位，只能为整数）。同时指定多个账户出资退款的使用场景需要满足以下条件：1、未开通退款支出分离产品功能；2、订单属于分账订单，且分账处于待分账或分账中状态。参数传递需要满足条件：1、基本账户可用余额出资金额与基本账户不可用余额出资金额之和等于退款金额；2、账户类型不能重复。上述任一条件不满足将返回错误',
  );

const refund = z
  .number()
  .describe('退款金额，币种的最小单位，只能为整数，不能超过原订单支付金额。示例值：888');

const total = z
  .number()
  .describe(
    '原订单金额，原支付交易的订单总金额，币种的最小单位，只能为整数。示例值：888',
  );

const currency = z
  .string()
  .describe(
    '退款币种，符合ISO 4217标准的三位字母代码，目前只支持人民币：CNY。 示例值：CNY',
  );

const payer_total = z
  .number()
  .describe('用户支付金额，现金支付金额，单位为分，只能为整数。示例值：90');

const payer_refund = z
  .number()
  .describe('用户退款金额，退款给用户的金额，不包含所有优惠券金额。示例值：90');

const settlement_refund = z
  .number()
  .describe(
    '应结退款金额，去掉非充值代金券退款金额后的退款金额，单位为分，退款金额=申请退款金额-非充值代金券退款金额，退款金额<=申请退款金额。示例值：100',
  );

const settlement_total = z
  .number()
  .describe(
    '应结订单金额，应结订单金额=订单金额-免充值代金券金额，应结订单金额<=订单金额，单位为分。示例值：100',
  );

const discount_refund = z
  .number()
  .describe(
    '优惠退款金额，优惠退款金额<=退款金额，退款金额-代金券或立减优惠退款金额为现金，说明详见代金券或立减优惠，单位为分。示例值：10',
  );

const refund_fee = z
  .number()
  .describe('手续费退款金额，手续费退款金额，单位为分。示例值：10');

const amount = z
  .object({
    total,
    refund,
    from,
    currency,
  })
  .describe('订单金额信息');

/**
 * 退款商品
 */
const refund_amount = z.number().describe('商品退款金额');
const refund_quantity = z.number().describe('商品退货数量');

const goods_detail_item = z.object({
  merchant_goods_id,
  wechatpay_goods_id,
  goods_name,
  unit_price,
  refund_amount,
  refund_quantity,
});

const goods_detail = z
  .array(goods_detail_item)
  .optional()
  .describe('退款商品，指定商品退款需要传此参数，其他场景无需传递');

/**
 * 微信支付退款单号
 */
const refund_id = z
  .string()
  .min(1)
  .max(32)
  .describe('微信支付退款单号。示例值：50000000382019052709732678859');

/**
 * 退款渠道
 */
const channel = z
  .string()
  .min(1)
  .max(16)
  .describe(
    '退款渠道，ORIGINAL：原路退款，BALANCE：退回到余额，OTHER_BALANCE：原账户异常退到其他余额账户，OTHER_BANKCARD：原银行卡异常退到其他银行卡。示例值：ORIGINAL',
  );

/**
 * 退款入账账户
 */
const user_received_account = z
  .string()
  .min(1)
  .max(64)
  .describe(
    '退款入账账户，取当前退款单的退款入账方，有以下几种情况：1）退回银行卡：{银行名称}{卡类型}{卡尾号}2）退回支付用户零钱:支付用户零钱3）退还商户:商户基本账户商户结算银行账户4）退回支付用户零钱通:支付用户零钱通。示例值：招商银行信用卡0403',
  );

/**
 * 退款成功时间
 */
const success_time = z
  .string()
  .min(1)
  .max(64)
  .optional()
  .describe(
    '退款成功时间，当退款状态为退款成功时有返回。示例值：2020-12-01T16:18:12+08:00',
  );

/**
 * 退款创建时间
 */
const create_time = z
  .string()
  .min(1)
  .max(64)
  .describe('退款创建时间，示例值：2020-12-01T16:18:12+08:00');

/**
 * 退款状态
 */
const status = z
  .string()
  .min(1)
  .max(32)
  .describe(
    '退款状态，退款到银行发现用户的卡作废或者冻结了，导致原路退款银行卡失败，可前往服务商平台-交易中心，手动处理此笔退款。枚举值：SUCCESS：退款成功CLOSED：退款关闭PROCESSING：退款处理中ABNORMAL：退款异常示例值：SUCCESS',
  );

const promotion_detail_item = z.object({
  promotion_id: z
    .string()
    .min(1)
    .max(32)
    .describe('券ID，券或者立减优惠id。示例值：109519'),
  scope: z
    .string()
    .min(1)
    .max(32)
    .describe('优惠范围，GLOBAL：全场代金券，SINGLE：单品优惠，示例值：SINGLE。'),
  type: z
    .string()
    .min(1)
    .max(32)
    .describe(
      '优惠类型，COUPON：代金券，需要走结算资金的充值型代金券，DISCOUNT：优惠券，不走结算资金的免充值型优惠券。示例值：DISCOUNT',
    ),
  amount: z
    .number()
    .describe(
      '优惠券面额，用户享受优惠的金额（优惠券面额=微信出资金额+商家出资金额+其他出资方金额 ），单位为分。示例值：5',
    ),
  refund_amount: z
    .number()
    .describe(
      '优惠退款金额，优惠退款金额<=退款金额，退款金额-代金券或立减优惠退款金额为用户支付的现金，说明详见代金券或立减优惠，单位为分示例值：100',
    ),
  goods_detail: z
    .array(
      z.object({
        merchant_goods_id,
        wechatpay_goods_id,
        goods_name,
        unit_price,
        refund_amount,
        refund_quantity,
      }),
    )
    .optional()
    .describe('商品列表，优惠商品发生退款时返回商品信息'),
});

const promotion_detail = z.array(promotion_detail_item).describe('优惠退款信息');

/**
 * 申请退款
 *
 * 当交易发生之后一年内，由于买家或者卖家的原因需要退款时，卖家可以通过退款接口将支付金额退还给买家，
 * 微信支付将在收到退款请求并且验证成功之后，将支付款按原路退还至买家账号上。
 * 
 * POST https://api.mch.weixin.qq.com/v3/refund/domestic/refunds
 * 
 * 示例值：
 * {
      "sub_mchid": "1900000109",
      "transaction_id": "1217752501201407033233368018",
      "out_refund_no": "1217752501201407033233368018",
      "reason": "商品已售完",
      "notify_url": "https://weixin.qq.com",
      "funds_account": "AVAILABLE",
      "amount": {
        "refund": 888,
        "from": [
          {
            "account": "AVAILABLE",
            "amount": 444
          }
        ],
        "total": 888,
        "currency": "CNY"
      },
      "goods_detail": [
        {
          "merchant_goods_id": "1217752501201407033233368018",
          "wechatpay_goods_id": "1001",
          "goods_name": "iPhone6s 16G",
          "unit_price": 528800,
          "refund_amount": 528800,
          "refund_quantity": 1
        }
      ]
    }
 * 
 * ⚠️ 注意
 * 1.交易时间超过一年的订单无法提交退款
   2.微信支付退款支持单笔交易分多次退款（不超50次），多次退款需要提交原支付订单的商户订单号和设置不同的退款单号。
     申请退款总金额不能超过订单金额。 一笔退款失败后重新提交，请不要更换退款单号，请使用原商户退款单号
   3.错误或无效请求频率限制：6qps，即每秒钟异常或错误的退款申请请求不超过6次
   4.每个支付订单的部分退款次数不能超过50次
   5.如果同一个用户有多笔退款，建议分不同批次进行退款，避免并发退款导致退款失败
   6.申请退款接口的返回仅代表业务的受理情况，具体退款是否成功，需要通过退款查询接口获取结果
   7.一个月之前的订单申请退款频率限制为：5000/min
   8.同一笔订单多次退款的请求需相隔1分钟
 */
export const wechatPayRefundSchema = z.object({
  sub_mchid,
  transaction_id,
  out_trade_no,
  out_refund_no,
  reason,
  notify_url,
  funds_account,
  amount,
  goods_detail,
});

/**
 * 申请退款结果
 */
export const wechatPayRefundResultSchema = z.object({
  refund_id,
  out_refund_no,
  transaction_id,
  out_trade_no,
  channel,
  user_received_account,
  success_time,
  create_time,
  status,
  funds_account: z
    .string()
    .min(1)
    .max(32)
    .describe(
      '资金账户，退款所使用资金对应的资金账户类型。UNSETTLED: 未结算资金，AVAILABLE: 可用余额，UNAVAILABLE: 不可用余额，OPERATION: 运营户，BASIC: 基本账户（含可用余额和不可用余额）。 示例值：UNSETTLED',
    ),
  amount: amount.extend({
    payer_total,
    payer_refund,
    settlement_refund,
    settlement_total,
    discount_refund,
    refund_fee,
  }),
  promotion_detail,
});

/**
 * 查询退款
 *
 * 提交退款申请后，通过调用该接口查询退款状态。退款有一定延时，建议在提交退款申请后1分钟发起查询退款状态，
 * 一般来说零钱支付的退款5分钟内到账，银行卡支付的退款1-3个工作日到账。
 *
 * GET https://api.mch.weixin.qq.com/v3/refund/domestic/refunds/{out_refund_no}
 *
 * 示例值：
 * https://api.mch.weixin.qq.com/v3/refund/domestic/refunds/1217752501201407033233368018?sub_mchid=1900000109
 */
export const wechatPayRetrieveRefundSchema = z.object({
  out_refund_no,
  sub_mchid,
});

/**
 * 查询退款：结果
 *
 */

export const wechatPayRetrieveRefundResultSchema = z.object({
  refund_id,
  out_refund_no,
  transaction_id,
  out_trade_no,
  channel,
  user_received_account,
  success_time,
  create_time,
  status,
  funds_account,
  amount: amount.extend({
    payer_total,
    payer_refund,
    settlement_refund,
    settlement_total,
    discount_refund,
    refund_fee,
  }),
  promotion_detail,
});

/**
 * 类型
 */
export type WechatPayRefund = z.infer<typeof wechatPayRefundSchema>;
export type WechatPayRefundResult = z.infer<typeof wechatPayRefundResultSchema>;
export type WechatPayRetrieveRefund = z.infer<typeof wechatPayRetrieveRefundSchema>;
export type WechatPayRetrieveRefundResult = z.infer<
  typeof wechatPayRetrieveRefundResultSchema
>;
