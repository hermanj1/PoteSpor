// src/app/services/authService.ts
import { db } from "@/db";
import { users } from "@/db/schema/users";
import { eq } from "drizzle-orm";
import { hashPass, verifyPass } from "@/app/lib/auth";
import type { z } from "zod";
import { LoginSchema, RegisterSchema } from "@/app/lib/auth";

export type LoginInput = z.infer<typeof LoginSchema>;
export type RegisterInput = z.infer<typeof RegisterSchema>;

// Registrer ny bruker
export async function registerService(data: RegisterInput) {
  const { email, password, name ,} = data;

  // Sjekk om bruker med samme e-post allerede finnes
  const existing = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (existing.length > 0) {
    throw new Error("Bruker med denne e-posten finnes allerede");
  }

  const passwordHash = await hashPass(password);

  const inserted = await db
    .insert(users)
    .values({
      email,
      passwordHash,
      name,
    })
    .returning();

  const user = inserted[0];

  if (!user) {
    throw new Error("Kunne ikke opprette bruker");
  }

  return user;
}

// Logg inn eksisterende bruker
export async function loginService(data: LoginInput) {
  const { email, password } = data;

  const result = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  const user = result[0];

  if (!user) {
    throw new Error("Feil e-post eller passord");
  }

  const isValid = await verifyPass(user.passwordHash, password);

  if (!isValid) {
    throw new Error("Feil e-post eller passord");
  }

  return user;
}
