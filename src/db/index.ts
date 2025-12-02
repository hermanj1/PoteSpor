import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

export interface Env {
  DATABASE_URL: string;
}

export function getDb(env: Env) {
 
  const url = env?.DATABASE_URL || (typeof process !== "undefined" ? process.env?.DATABASE_URL : null);
  
  if (!url) throw new Error("Fant ikke database URL");

  const client = postgres(url, { prepare: false });
  return drizzle(client, { schema });
}

export type DbClient = ReturnType<typeof getDb>;