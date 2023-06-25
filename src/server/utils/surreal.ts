import { Surreal } from 'surrealdb.js';

const config = useRuntimeConfig();

export const surreal = new Surreal(config.surreal.url);
