import { db } from "../../db";
import { users } from "../../db/schema";
import { eq } from "drizzle-orm";

export async function getUserByEmail(email: string) {
  const result = await db.select().from(users).where(eq(users.email, email));
  return result[0];
}

export async function createUser(data: { email: string; password: string }) {
  const id = crypto.randomUUID();
  await db.insert(users).values({ id, email: data.email, password: data.password });
  const result = await db.select().from(users).where(eq(users.id, id));
  return result[0];
}
