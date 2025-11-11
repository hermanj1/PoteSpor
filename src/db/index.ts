// src/db/index.ts
import { drizzle } from "drizzle-orm/d1";

export interface Env {
  potespor: D1Database;
}

export function getDb(env: Env) {
  return drizzle(env.potespor);
}
