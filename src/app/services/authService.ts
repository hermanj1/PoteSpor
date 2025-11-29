import { users } from "@/db/schema/users";
import { eq } from "drizzle-orm";
import { hashPass, verifyPass } from "@/app/lib/auth";
import type { LoginInput, RegisterInput } from "@/app/lib/auth"; 
import type { DbClient } from "../../../src/db";

export async function registerService(db: DbClient, data: RegisterInput) {
  const { email, password, name } = data;

  const existing = await db.query.users.findFirst({
    where: eq(users.email, email)
  });

  if (existing) {
    throw new Error("Bruker med denne e-posten finnes allerede");
  }

  const passwordHash = await hashPass(password);

  const result = await db
    .insert(users)
    .values({
      email,
      passwordHash,
      name,
    })
    .returning();

  const user = result[0];

  if (!user) {
    throw new Error("Kunne ikke opprette bruker");
  }

  return user;
}

export async function loginService(db: DbClient, data: LoginInput) {
  const { email, password } = data;

  const user = await db.query.users.findFirst({
    where: eq(users.email, email)
  });

  if (!user) {
    throw new Error("Feil e-post eller passord");
  }

  const isValid = await verifyPass(user.passwordHash, password);

  if (!isValid) {
    throw new Error("Feil e-post eller passord");
  }

  return user;
}
