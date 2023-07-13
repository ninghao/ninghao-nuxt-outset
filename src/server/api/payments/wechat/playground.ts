export default defineEventHandler(async (event) => {
  const authorization = createWechatAuthorization({ url: '/v3/certificates' });

  const result = await $fetch('https://api.mch.weixin.qq.com/v3/certificates', {
    headers: {
      Authorization: authorization,
      'Accept-Language': 'zh-CN',
    },
  });

  return result;
});
