import { db } from "@/db";
import { users } from "@/db/schema/users";
import { eq } from "drizzle-orm";

export async function getUserByEmail(email: string) {
  const result = await db.select().from(users).where(eq(users.email, email));
  return result[0];
}

export async function createUser(data: { email: string; passwordHash: string }) {
  const [newUser] = await db
    .insert(users)
    .values({
      email: data.email,
      passwordHash: data.passwordHash,
    })
    .returning();
  return newUser;
}