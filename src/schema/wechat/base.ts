import { z } from 'zod';

/**
 * 商品信息
 */
export const merchant_goods_id = z
  .string()
  .min(1)
  .max(32)
  .describe(
    '商户侧商品编码，由半角的大小写字母、数字、中划线、下划线中的一种或几种组成。示例值：1246464644',
  );
export const wechatpay_goods_id = z
  .string()
  .min(1)
  .max(32)
  .optional()
  .describe('微信支付商品编码，微信支付定义的统一商品编号（没有可不传）示例值：1001');

export const goods_name = z
  .string()
  .min(1)
  .max(25)
  .optional()
  .describe('商品名称，商品的实际名称。示例值：iPhoneX 256G');

export const quantity = z.number().describe('商品数量，用户购买的数量，示例值：1');

export const unit_price = z
  .number()
  .describe(
    '商品单价，单位为：分。如果商户有优惠，需传输商户优惠后的单价(例如：用户对一笔100元的订单使用了商场发的纸质优惠券100-50，则活动商品的单价应为原单价-50)，示例值：528800',
  );

export const goods_detail_item = z.object({
  merchant_goods_id,
  wechatpay_goods_id,
  goods_name,
  quantity,
  unit_price,
});

/**
 * 单品列表信息
 */
export const goods_deatil = z
  .array(goods_detail_item)
  .describe('单品列表信息，条目个数限制：[1, 6000]');

/**
 * 服务商应用 ID
 */
export const sp_appid = z
  .string()
  .min(1)
  .max(32)
  .describe('服务商应用ID，服务商申请的公众号appid。示例值：wx1234567822345678');

/**
 * 服务商户号
 */
export const sp_mchid = z
  .string()
  .min(1)
  .max(32)
  .describe('服务商户号，由微信支付生成并下发。示例值：1230000109');

/**
 * 子商户应用ID
 */
export const sub_appid = z
  .string()
  .min(1)
  .max(32)
  .optional()
  .describe('子商户应用ID，子商户申请的公众号appid。示例值：wxd678efh567hg6999');

/**
 * 子商户的商户号
 */
export const sub_mchid = z
  .string()
  .min(1)
  .max(32)
  .describe('子商户的商户号，由微信支付生成并下发。示例值：1900000109');

/**
 * 商品描述
 */
export const description = z.string().min(1).max(127).describe('商品描述');

/**
 * 商户订单号
 */
export const out_trade_no = z
  .string()
  .min(6)
  .max(32)
  .describe(
    '商户系统内部订单号，只能是数字、大小写字母_-*且在同一个商户号下唯一。示例值：1217752501201407033233368018',
  );

/**
 * 订单失效时间
 */
export const time_expire = z
  .string()
  .min(1)
  .max(64)
  .optional()
  .describe(
    '订单失效时间，遵循rfc3339标准格式，格式为yyyy-MM-DDTHH:mm:ss+TIMEZONE，yyyy-MM-DD表示年月日，T出现在字符串中，表示time元素的开头，HH:mm:ss表示时分秒，TIMEZONE表示时区（+08:00表示东八区时间，领先UTC8小时，即北京时间）。例如：2015-05-20T13:29:35+08:00表示，北京时间2015年5月20日 13点29分35秒。示例值：2018-06-08T10:34:56+08:00',
  );

/**
 * 附加数据
 */
export const attach = z
  .string()
  .min(1)
  .max(128)
  .optional()
  .describe(
    '附加数据，在查询API和支付通知中原样返回，可作为自定义参数使用，实际情况下只有支付完成状态才会返回该字段。',
  );

/**
 * 通知地址
 */
export const notify_url = z
  .string()
  .min(1)
  .max(256)
  .describe(
    '通知地址，通知URL必须为直接可访问的URL，不允许携带查询串，要求必须为https地址。示例值：https://www.weixin.qq.com/wxpay/pay.php',
  );

/**
 * 订单优惠标记
 */
export const goods_tag = z
  .string()
  .min(1)
  .max(32)
  .optional()
  .describe('订单优惠标记，示例值：WXG');

/**
 * 电子发票入口开放标识
 */
export const support_fapiao = z
  .boolean()
  .optional()
  .describe(
    '传入true时，支付成功消息和支付详情页将出现开票入口。需要在微信支付商户平台或微信公众平台开通电子发票功能，传此字段才可生效。',
  );

/**
 * 结算信息
 */
export const settle_info = z
  .object({
    profit_sharing: z.boolean().describe('是否指定分账'),
  })
  .optional()
  .describe('结算信息');

/**
 * 订单金额
 */
export const total = z.number().describe('订单总金额，单位为分。示例值：100');

export const currency = z
  .string()
  .min(1)
  .max(16)
  .optional()
  .describe('货币类型，CNY：人民币，境内商户号仅支持人民币。示例值：CNY');

export const amount = z
  .object({
    total,
    currency,
  })
  .describe('订单金额信息');

/**
 * 优惠功能
 */
export const detail = z
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

/**
 * 微信支付订单号
 */
export const transaction_id = z
  .string()
  .min(1)
  .max(32)
  .describe(
    '微信支付订单号，微信支付系统生成的订单号，示例值：1217752501201407033233368018',
  );

/**
 * 结果参数
 */

/**
 * 二维码链接
 */
export const code_url = z
  .string()
  .min(1)
  .max(512)
  .describe(
    '二维码链接，此URL用于生成支付二维码，然后提供给用户扫码支付。注意：code_url并非固定值，使用时按照URL格式转成二维码即可。示例值：weixin://wxpay/bizpayurl/up?pr=NwY5Mz9&groupid=00',
  );

/**
 * 交易类型
 */
export const trade_type = z
  .string()
  .min(1)
  .max(16)
  .optional()
  .describe(
    '交易类型，交易类型，枚举值：JSAPI：公众号支付，NATIVE：扫码支付，APP：APP支付，MICROPAY：付款码支付，MWEB：H5支付，FACEPAY：刷脸支付。示例值：MICROPAY',
  );

/**
 * 交易状态
 */
export const trade_state = z
  .string()
  .min(1)
  .max(32)
  .describe(
    '交易状态，交易状态，SUCCESS：支付成功，REFUND：转入退款，NOTPAY：未支付，CLOSED：已关闭，REVOKED：已撤销（仅付款码支付会返回），USERPAYING：用户支付中（仅付款码支付会返回），PAYERROR：支付失败（仅付款码支付会返回）。示例值：SUCCESS',
  );

/**
 * 交易状态描述
 */
export const trade_state_desc = z
  .string()
  .min(1)
  .max(256)
  .describe('交易状态描述。示例值：支付成功');

/**
 * 付款银行
 */
export const bank_type = z
  .string()
  .min(1)
  .max(32)
  .optional()
  .describe(
    '银行类型，采用字符串类型的银行标识。 银行标识请参考《银行类型对照表》 。示例值：CMC',
  );

/**
 * 支付完成时间
 */
export const success_time = z
  .string()
  .min(1)
  .max(64)
  .optional()
  .describe(
    '支付完成时间，支付完成时间，遵循rfc3339标准格式，格式为yyyy-MM-DDTHH:mm:ss+TIMEZONE，yyyy-MM-DD表示年月日，T出现在字符串中，表示time元素的开头，HH:mm:ss表示时分秒，TIMEZONE表示时区（+08:00表示东八区时间，领先UTC 8小时，即北京时间）。例如：2015-05-20T13:29:35+08:00表示，北京时间2015年5月20日 13点29分35秒。 示例值：2018-06-08T10:34:56+08:00',
  );

/**
 * 用户服务标识
 */
export const sp_openid = z
  .string()
  .min(1)
  .max(128)
  .describe(
    '用户服务标识，用户在服务商appid下的唯一标识。示例值：oUpF8uMuAJO_M2pxb1Q9zNjWeS6o',
  );

/**
 * 用户子标识
 */
export const sub_openid = z
  .string()
  .min(1)
  .max(128)
  .optional()
  .describe(
    '用户子标识，用户在子商户appid下的唯一标识。如果返回sub_appid，那么sub_openid一定会返回。示例值：oUpF8uMuAJO_M2pxb1Q9zNjWeS6o',
  );

/**
 * 支付者
 */
export const payer = z
  .object({
    sp_openid,
    sub_openid,
  })
  .describe('支付者信息');

/**
 * 用户支付币种
 */
export const payer_currency = z
  .string()
  .min(1)
  .max(16)
  .optional()
  .describe('用户支付币种，示例值：CNY');

export const payer_total = z
  .number()
  .describe(
    '用户支付金额，单位为分。（指使用优惠券的情况下，这里等于总金额-优惠券金额）示例值：100',
  );

/**
 * 商户端设备号
 */
export const device_id = z
  .string()
  .min(1)
  .max(32)
  .optional()
  .describe(
    '商户端设备号，商户端设备号（发起扣款请求的商户服务器设备号）。示例值：013467007045764',
  );

/**
 * 用户终端 IP
 */
export const payer_client_ip = z
  .string()
  .min(1)
  .max(45)
  .describe(
    '用户终端IP，用户的客户端IP，支持IPv4和IPv6两种格式的IP地址。示例值：14.23.150.211',
  );

/**
 * 商店门店信息
 */
export const store_info = z
  .object({
    id: z.string().describe('门店编号，商户侧门店编号。示例值：0001'),
    name: z
      .string()
      .min(1)
      .max(256)
      .optional()
      .describe('门店名称，商户侧门店名称。示例值：腾讯大厦分店'),
    area_code: z
      .string()
      .min(1)
      .max(32)
      .optional()
      .describe('地区编码，详细请见省市区编号对照表。示例值：440305'),
    address: z
      .string()
      .min(1)
      .max(512)
      .describe(
        '详细地址，详细的商户门店地址。示例值：广东省深圳市南山区科技中一道10000号',
      ),
  })
  .describe('商户门店信息');

/**
 * H5 场景信息
 */
export const h5_info = z
  .object({
    type: z.string().min(1).max(32).describe('场景类型。示例值：iOS, Android, Wap'),
    app_name: z.string().min(1).max(64).optional().describe('应用名称，示例值：王者荣耀'),
    app_url: z
      .string()
      .min(1)
      .max(128)
      .optional()
      .describe('网站URL。示例值：https://pay.qq.com'),
    bundle_id: z
      .string()
      .min(1)
      .max(128)
      .optional()
      .describe('iOS平台BundleID，示例值：com.tencent.wzryiOS'),
    package_name: z
      .string()
      .min(1)
      .max(128)
      .optional()
      .describe('Android平台PackageName。示例值：com.tencent.tmgp.sgame'),
  })
  .describe('H5场景信息');

/**
 * 场景信息
 */
export const scene_info = z
  .object({
    payer_client_ip,
    device_id,
    store_info,
  })
  .describe('场景信息，支付场景描述。');

/**
 * 优惠功能项目
 */
export const promotion_detail_item = z.object({
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

/**
 * 优惠功能
 */
export const promotion_detail = z
  .array(promotion_detail_item)
  .optional()
  .describe('优惠功能，享受优惠时返回该字段。');

/**
 * 预支付交易会话标识
 */
export const prepay_id = z
  .string()
  .min(1)
  .max(64)
  .describe(
    '预支付交易会话标识，预支付交易会话标识。用于后续接口调用中使用，该值有效期为2小时。示例值：wx201410272009395522657a690389285100',
  );

/**
 * 创建订单
 */
export const wechatCreateTransactionSchema = z.object({
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
