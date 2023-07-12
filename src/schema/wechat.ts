import { z } from 'zod';

// 商品信息
const goods_detail_item = z.object({
  merchant_goods_id: z
    .string()
    .min(1)
    .max(32)
    .describe(
      '商户侧商品编码，由半角的大小写字母、数字、中划线、下划线中的一种或几种组成。示例值：1246464644',
    ),
  wechatpay_goods_id: z
    .string()
    .min(1)
    .max(32)
    .optional()
    .describe('微信支付商品编码，微信支付定义的统一商品编号（没有可不传）示例值：1001'),
  goods_name: z
    .string()
    .min(1)
    .max(25)
    .optional()
    .describe('商品名称，商品的实际名称。示例值：iPhoneX 256G'),
  quantity: z.number().describe('商品数量，用户购买的数量，示例值：1'),
  unit_price: z
    .number()
    .describe(
      '商品单价，单位为：分。如果商户有优惠，需传输商户优惠后的单价(例如：用户对一笔100元的订单使用了商场发的纸质优惠券100-50，则活动商品的单价应为原单价-50)，示例值：528800',
    ),
});

// 单品列表信息
const goods_deatil = z
  .array(goods_detail_item)
  .describe('单品列表信息，条目个数限制：[1, 6000]');

// 服务商应用 ID
const sp_appid = z
  .string()
  .min(1)
  .max(32)
  .describe('服务商应用ID，服务商申请的公众号appid。示例值：wx1234567822345678');

// 服务商户号
const sp_mchid = z
  .string()
  .min(1)
  .max(32)
  .describe('服务商户号，由微信支付生成并下发。示例值：1230000109');

// 子商户应用ID
const sub_appid = z
  .string()
  .min(1)
  .max(32)
  .optional()
  .describe('子商户应用ID，子商户申请的公众号appid。示例值：wxd678efh567hg6999');

// 子商户的商户号
const sub_mchid = z
  .string()
  .min(1)
  .max(32)
  .describe('子商户的商户号，由微信支付生成并下发。示例值：1900000109');

// 商品描述
const description = z.string().min(1).max(127).describe('商品描述');

// 商户订单号
const out_trade_no = z
  .string()
  .min(6)
  .max(32)
  .describe(
    '商户系统内部订单号，只能是数字、大小写字母_-*且在同一个商户号下唯一。示例值：1217752501201407033233368018',
  );

// 订单失效时间
const time_expire = z
  .string()
  .min(1)
  .max(64)
  .optional()
  .describe(
    '订单失效时间，遵循rfc3339标准格式，格式为yyyy-MM-DDTHH:mm:ss+TIMEZONE，yyyy-MM-DD表示年月日，T出现在字符串中，表示time元素的开头，HH:mm:ss表示时分秒，TIMEZONE表示时区（+08:00表示东八区时间，领先UTC8小时，即北京时间）。例如：2015-05-20T13:29:35+08:00表示，北京时间2015年5月20日 13点29分35秒。示例值：2018-06-08T10:34:56+08:00',
  );

// 附加数据
const attach = z
  .string()
  .min(1)
  .max(128)
  .optional()
  .describe(
    '附加数据，在查询API和支付通知中原样返回，可作为自定义参数使用，实际情况下只有支付完成状态才会返回该字段。',
  );

// 通知地址
const notify_url = z
  .string()
  .min(1)
  .max(256)
  .describe(
    '通知地址，通知URL必须为直接可访问的URL，不允许携带查询串，要求必须为https地址。示例值：https://www.weixin.qq.com/wxpay/pay.php',
  );

// 订单优惠标记
const goods_tag = z
  .string()
  .min(1)
  .max(32)
  .optional()
  .describe('订单优惠标记，示例值：WXG');

// 电子发票入口开放标识
const support_fapiao = z
  .boolean()
  .optional()
  .describe(
    '传入true时，支付成功消息和支付详情页将出现开票入口。需要在微信支付商户平台或微信公众平台开通电子发票功能，传此字段才可生效。',
  );

// 结算信息
const settle_info = z
  .object({
    profit_sharing: z.boolean().describe('是否指定分账'),
  })
  .optional()
  .describe('结算信息');

// 订单金额
const total = z.number().describe('订单总金额，单位为分。示例值：100');

const currency = z
  .string()
  .min(1)
  .max(16)
  .optional()
  .describe('货币类型，CNY：人民币，境内商户号仅支持人民币。示例值：CNY');

const amount = z
  .object({
    total,
    currency,
  })
  .describe('订单金额信息');

// 优惠功能
const detail = z
  .object({
    cost_price: z
      .number()
      .describe(
        '订单原价，1、商户侧一张小票订单可能被分多次支付，订单原价用于记录整张小票的交易金额。2、当订单原价与支付金额不相等，则不享受优惠。3、该字段主要用于防止同一张小票分多次支付，以享受多次优惠的情况，正常支付订单不必上传此参数。示例值：608800',
      ),
    invoice_id: z.string().describe('商家小票ID，示例值：微信123'),
    goods_deatil,
  })
  .optional()
  .describe('优惠功能');

// 微信支付订单号
const transaction_id = z
  .string()
  .min(1)
  .max(32)
  .describe(
    '微信支付订单号，微信支付系统生成的订单号，示例值：1217752501201407033233368018',
  );

/**
 * 结果参数
 */

// 二维码链接
const code_url = z
  .string()
  .min(1)
  .max(512)
  .describe(
    '二维码链接，此URL用于生成支付二维码，然后提供给用户扫码支付。注意：code_url并非固定值，使用时按照URL格式转成二维码即可。示例值：weixin://wxpay/bizpayurl/up?pr=NwY5Mz9&groupid=00',
  );

// 交易类型
const trade_type = z
  .string()
  .min(1)
  .max(16)
  .optional()
  .describe(
    '交易类型，交易类型，枚举值：JSAPI：公众号支付，NATIVE：扫码支付，APP：APP支付，MICROPAY：付款码支付，MWEB：H5支付，FACEPAY：刷脸支付。示例值：MICROPAY',
  );

// 交易状态
const trade_state = z
  .string()
  .min(1)
  .max(32)
  .describe(
    '交易状态，交易状态，SUCCESS：支付成功，REFUND：转入退款，NOTPAY：未支付，CLOSED：已关闭，REVOKED：已撤销（仅付款码支付会返回），USERPAYING：用户支付中（仅付款码支付会返回），PAYERROR：支付失败（仅付款码支付会返回）。示例值：SUCCESS',
  );

// 交易状态描述
const trade_state_desc = z
  .string()
  .min(1)
  .max(256)
  .describe('交易状态描述。示例值：支付成功');

// 付款银行
const bank_type = z
  .string()
  .min(1)
  .max(32)
  .optional()
  .describe(
    '银行类型，采用字符串类型的银行标识。 银行标识请参考《银行类型对照表》 。示例值：CMC',
  );

// 支付完成时间
const success_time = z
  .string()
  .min(1)
  .max(64)
  .optional()
  .describe(
    '支付完成时间，支付完成时间，遵循rfc3339标准格式，格式为yyyy-MM-DDTHH:mm:ss+TIMEZONE，yyyy-MM-DD表示年月日，T出现在字符串中，表示time元素的开头，HH:mm:ss表示时分秒，TIMEZONE表示时区（+08:00表示东八区时间，领先UTC 8小时，即北京时间）。例如：2015-05-20T13:29:35+08:00表示，北京时间2015年5月20日 13点29分35秒。 示例值：2018-06-08T10:34:56+08:00',
  );

// 用户服务标识
const sp_openid = z
  .string()
  .min(1)
  .max(128)
  .describe(
    '用户服务标识，用户在服务商appid下的唯一标识。示例值：oUpF8uMuAJO_M2pxb1Q9zNjWeS6o',
  );

// 用户子标识
const sub_openid = z
  .string()
  .min(1)
  .max(128)
  .optional()
  .describe(
    '用户子标识，用户在子商户appid下的唯一标识。如果返回sub_appid，那么sub_openid一定会返回。示例值：oUpF8uMuAJO_M2pxb1Q9zNjWeS6o',
  );

// 支付者
const payer = z
  .object({
    sp_openid,
    sub_openid,
  })
  .describe('支付者信息');

// 用户支付币种
const payer_currency = z
  .string()
  .min(1)
  .max(16)
  .optional()
  .describe('用户支付币种，示例值：CNY');

const payer_total = z
  .number()
  .describe(
    '用户支付金额，单位为分。（指使用优惠券的情况下，这里等于总金额-优惠券金额）示例值：100',
  );

// 场景信息
const device_id = z
  .string()
  .min(1)
  .max(32)
  .optional()
  .describe(
    '商户端设备号，商户端设备号（发起扣款请求的商户服务器设备号）。示例值：013467007045764',
  );

// 场景信息
const scene_info = z
  .object({
    device_id,
  })
  .optional()
  .describe('场景信息，支付场景描述');

// 优惠功能项目
const promotion_detail_item = z.object({
  coupon_id: z.string().min(1).max(32).describe('券ID，示例值：109519'),
  name: z.string().min(1).max(64).optional().describe('优惠名称。示例值：单品惠-6'),
  scope: z
    .string()
    .min(1)
    .max(32)
    .optional()
    .describe('优惠范围，GLOBAL：全场代金券SINGLE：单品优惠。示例值：GLOBAL'),
  type: z
    .string()
    .min(1)
    .max(32)
    .optional()
    .describe('优惠类型，CASH：充值型代金券NOCASH：免充值型代金券。示例值：CASH'),
  amount: z.number().describe('优惠券面额，示例值：100'),
  stock_id: z.string().min(1).max(32).optional().describe('活动ID。示例值：931386'),
  wechatpay_contribute: z.number().optional().describe('微信出资，单位为分。示例值：0'),
  merchant_contribute: z.number().optional().describe('商户出资，单位为分。示例值：0'),
  other_contribute: z.number().optional().describe('其他出资，单位为分。示例值：0'),
  currency,
  goods_detail: z.array(goods_detail_item),
});

// 优惠功能
const promotion_detail = z
  .array(promotion_detail_item)
  .optional()
  .describe('优惠功能，享受优惠时返回该字段。');

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

export const wechatPayNativeCreateSchema = z.object({
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
 * Native：查询订单
 * 1. 微信支付订单号查询
 * GET https://api.mch.weixin.qq.com/v3/pay/partner/transactions/id/{transaction_id}
 *
 * 示例值：
 * https://api.mch.weixin.qq.com/v3/pay/partner/transactions/id/4200000985202103031441826014?sp_mchid=1900007XXX&sub_mchid=1900008XXX
 */
export const wechatPayNativeRetriveIdSchema = z.object({
  sp_appid,
  sp_mchid,
});

/**
 * Native：查询订单
 * 2. 商户订单号查询
 * GET https://api.mch.weixin.qq.com/v3/pay/partner/transactions/out-trade-no/{out_trade_no}
 *
 * 示例值：
 * https://api.mch.weixin.qq.com/v3/pay/partner/transactions/out-trade-no/1217752501201407033233368XXX?sp_mchid=1230000109&sub_mchid=1900008XXX
 */
export const wechatPayNativeRetriveOutTradeNoSchema = z.object({
  sp_appid,
  sp_mchid,
});

/**
 * Native：查询订单结果
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

export const wechatPayNativeRetriveResultSchema = z.object({
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
 * Native：关闭订单
 * POST  https://api.mch.weixin.qq.com/v3/pay/partner/transactions/out-trade-no/{out_trade_no}/close
 * 返回无数据（HTTP状态码为204）
 * 示例值：
    {
      "sp_mchid": "1900007XXX",
      "sub_mchid": "1900008XXX"
    }
 */

export const wechatPayNativeCloseSchema = z.object({
  sp_mchid,
  sub_mchid,
});

/**
 * 类型
 */
export type WechatPayNativeCreate = z.infer<typeof wechatPayNativeCreateSchema>;

export type WechatPayNativeCreateResult = z.infer<
  typeof wechatPayNativeCreateResultSchema
>;

export type WechatPayNativeRetriveId = z.infer<typeof wechatPayNativeRetriveIdSchema>;

export type WechatPayNativeRetriveOutTradeNo = z.infer<
  typeof wechatPayNativeRetriveOutTradeNoSchema
>;

export type WechatPayNativeRetriveResult = z.infer<
  typeof wechatPayNativeRetriveResultSchema
>;

export type WechatPayNativeClose = z.infer<typeof wechatPayNativeCloseSchema>;
