import { drizzle } from 'drizzle-orm/d1';
import { env } from 'cloudflare:workers';
import * as usersSchema from "./users";
import * as sessionsSchema from "./sessions";

export const schema = {
  ...usersSchema,
  ...sessionsSchema,
};

export const db = drizzle(env.DB, { schema });

export * from './users';
export * from './sessions';