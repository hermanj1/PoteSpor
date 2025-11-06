import { db } from "@/db";
import { users } from "@/db/schema/users";
import { eq } from "drizzle-orm";

export async function getUserByEmail(email: string) {
  const result = await db.select().from(users).where(eq(users.email, email));
  return result[0];
}

export async function createUser(data: { email: string; password_hash: string }) {
  const [newUser] = await db
    .insert(users)
    .values({
      email: data.email,
      password_hash: data.password_hash,
    })
    .returning();
  return newUser;
}