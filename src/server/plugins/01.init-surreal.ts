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
  // 管理员
  const administratorName = config.surreal.administratorName;
  const administratorPassword = await createHash(config.surreal.administratorPassword);

  await surreal.update(`user:${administratorName}`, {
    name: administratorName,
    password: administratorPassword,
    roles: ['role:administrator', 'role:authenticated'],
  });

  // 普通用户
  const authenticatedName = config.surreal.authenticatedName;
  const authenticatedPassword = await createHash(config.surreal.authenticatedPassword);

  await surreal.update(`user:${authenticatedName}`, {
    name: authenticatedName,
    password: authenticatedPassword,
    roles: ['role:authenticated'],
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

  /**
   * 品牌 Brand
   */
  await surreal.update('brand:hermes', {
    alias: '爱马仕',
    id: 'brand:hermes',
    logo: '/images/brands/hermes.svg',
    name: 'hermes',
    title: 'Hermès',
  });

  await surreal.update('brand:louisvuitton', {
    alias: '路易威登',
    id: 'brand:louisvuitton',
    logo: '/images/brands/louis-vuitton.svg',
    name: 'louisvuitton',
    title: 'LOUIS VUITTON',
  });

  /**
   * 区域 Region
   */
  await surreal.update('region:louisvuitton_cn', {
    alias: 'Mainland China',
    area: 'Asia',
    brand: 'brand:louisvuitton',
    code: 'cn',
    id: 'region:louisvuitton_cn',
    name: 'louisvuitton_cn',
    title: '中国内地',
    website: 'https://www.louisvuitton.cn/zhs-cn/homepage',
  });

  /**
   * 来源 Origin
   */
  await surreal.update('origin:n79c1rw3ijc4tzshz3li', {
    region: 'region:louisvuitton_cn',
    type: 'RESTful',
    url: 'https://api-www.louisvuitton.cn/eco-eu/search-merch-eapi/v1/zhs-cn/plp/products/t1rrahxp',
  });

  /**
   * Schema
   */
  await surreal.query(`
    DEFINE FIELD created ON product VALUE $before OR time::now();
    DEFINE FIELD updated ON product VALUE time::now();
    
    DEFINE FIELD created ON origin VALUE $before OR time::now();
    DEFINE FIELD updated ON origin VALUE time::now();

    DEFINE FIELD created ON user VALUE $before OR time::now();
    DEFINE FIELD updated ON user VALUE time::now();

    DEFINE FIELD created ON follow VALUE $before OR time::now();
    DEFINE FIELD updated ON follow VALUE time::now();

    DEFINE FIELD created ON subscription VALUE $before OR time::now();
    DEFINE FIELD updated ON subscription VALUE time::now();

    DEFINE FIELD created ON event VALUE $before OR time::now();

    DEFINE FIELD created ON order VALUE $before OR time::now();
  `);

  await surreal.query(`
    DEFINE INDEX productSkuIndex ON TABLE product COLUMNS sku UNIQUE;
    DEFINE INDEX productOriginIndex ON TABLE available COLUMNS in, out UNIQUE;
    DEFINE INDEX userAvailableIndex ON TABLE follow COLUMNS in, out UNIQUE;
    DEFINE INDEX userSubjectIndex ON TABLE subscription COLUMNS user, subject UNIQUE;
  `);

  /**
   * 事件
   */
  await surreal.query(`
    DEFINE event subscriptionCreated ON TABLE subscription 
      WHEN 
        $before == NONE 
      THEN {
        CREATE event CONTENT {
          name: 'subscriptionCreated',
          entity: $after.id,
          data: $after
        }
      };

    DEFINE event subscriptionActivated ON TABLE subscription 
      WHEN 
        $before.status != 'valid' AND $after.status == 'valid'
      THEN {
        CREATE event CONTENT {
          name: 'subscriptionActivated',
          entity: $after.id,
          data: {
            status: $after.status,
            expired: $after.expired
          }
        }
      };
    
    DEFINE event orderCreated ON TABLE order 
      WHEN 
        $before == NONE 
      THEN {
        CREATE event CONTENT {
          name: 'orderCreated',
          entity: $after.id,
          data: $after
        }
      };

    DEFINE event orderPaymentRecived ON TABLE order 
      WHEN 
        $before.status != 'paymentRecived' AND $after.status == 'paymentRecived'
      THEN {
        CREATE event CONTENT {
          name: 'orderPaymentRecived',
          entity: $after.id,
          data: {
            status: 'paymentRecived',
            payload: $after.payload
          }
        }
      };

    DEFINE event orderCompleted ON TABLE order 
      WHEN 
        $before.status != 'completed' AND $after.status == 'completed'
      THEN {
        CREATE event CONTENT {
          name: 'orderCompleted',
          entity: $after.id,
          data: {
            status: 'completed',
          }
        }
      };  
  `);
});
