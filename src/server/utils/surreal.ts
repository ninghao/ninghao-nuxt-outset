import { Surreal } from 'surrealdb.js';

/**
 * 配置
 */
const config = useRuntimeConfig();

/**
 * SurrealDB 客户端
 */
export const surreal = new Surreal(config.surreal.url);
