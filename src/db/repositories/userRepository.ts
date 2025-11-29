import { users } from "@/db/schema/users";
import { eq } from "drizzle-orm";
import type { DbClient } from "@/db"; 

export async function getUserByEmail(db: DbClient, email: string) {
  const result = await db.select().from(users).where(eq(users.email, email));
  return result[0];
}

export async function createUser(db: DbClient, data: { email: string; passwordHash: string }) {
  const [newUser] = await db
    .insert(users)
    .values({
      email: data.email,
      passwordHash: data.passwordHash,
    })
    .returning();
  return newUser;
}