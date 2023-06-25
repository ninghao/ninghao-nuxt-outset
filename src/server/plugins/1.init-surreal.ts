export default defineNitroPlugin(async (nitroApp) => {
  // 配置
  const config = useRuntimeConfig();

  // 登录
  await surreal.signin({
    user: config.surreal.rootUser,
    pass: config.surreal.rootPass,
  });

  // 使用
  await surreal.use({
    ns: config.surreal.namespace,
    db: config.surreal.database,
  });

  /**
   * 角色
   */
  await surreal.update('role:administrator', {
    name: 'administrator',
    title: '管理员',
  });

  await surreal.update('role:authenticated', {
    name: 'authenticated',
    title: '注册用户',
  });

  /**
   * 用户
   */
  const name = config.surreal.administratorName;

  const password = createHash(
    config.surreal.administratorPassword,
  );

  await surreal.update(`user:${name}`, {
    name,
    password,
    roles: ['role:administrator', 'role:authenticated'],
  });

  /**
   * Scope
   */
  await surreal.query(
    `
      DEFINE SCOPE ${config.surreal.scope} SESSION 7d
        SIGNUP (
          CREATE user
          SET
          name = $name,
          password = crypto::argon2::generate($password)
        )
        SIGNIN (
          SELECT * FROM user
          WHERE
          name = $name
          AND crypto::argon2::compare(password, $password)
        );
      `,
  );

  const publicKey = decodeBase64(config.jwt.publicKey);

  /**
   * Token
   */
  await surreal.query(
    `
      DEFINE TOKEN ${config.surreal.tokenName}
        ON SCOPE ${config.surreal.scope}
        TYPE RS256
        VALUE '${publicKey}';
      `,
  );
});
