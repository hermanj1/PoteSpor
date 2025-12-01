import { z } from "zod";
import * as bcrypt from "bcryptjs";
import { sessions } from "@/db/schema/sessions";
import { users } from "@/db/schema/users";
import { eq, and, gt } from "drizzle-orm";
import type { DbClient } from "@/db";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const LoginSchema = z.object({
  email: z.string().regex(emailRegex, "Ugyldig e-postadresse"),
  password: z.string().min(1, "Passord kan ikke være tomt"),
});

export const RegisterSchema = z.object({
  email: z.string().regex(emailRegex, "Ugyldig e-postadresse"),
  password: z.string().min(8, "Passord må være minst 8 tegn"),
  name: z.string().min(1, "Navn kan ikke være tomt"),
});

export type LoginInput = z.infer<typeof LoginSchema>;
export type RegisterInput = z.infer<typeof RegisterSchema>;

export const SESSION_COOKIE_NAME = "potespor_session";
const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000;

export async function hashPass(password: string) {
  return await bcrypt.hash(password, 10);
}

export async function verifyPass(hash: string, password: string) {
  return await bcrypt.compare(password, hash);
}

export async function createSession(db: DbClient, userId: number) {
  const sessionId = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);

  await db.insert(sessions).values({
    id: sessionId,
    userId: userId,
    expiresAt: expiresAt,
  });

  return sessionId;
}

export async function clearSession(db: DbClient, sessionId: string) {
  await db.delete(sessions).where(eq(sessions.id, sessionId));
}

export async function getSessionUser(db: DbClient, request: Request) {
  const cookieHeader = request.headers.get("Cookie");
  if (!cookieHeader) return null;

  const cookies = Object.fromEntries(
    cookieHeader.split("; ").map((c) => c.split("="))
  );
  
  const sessionId = cookies[SESSION_COOKIE_NAME];
  if (!sessionId) return null;

  const result = await db
    .select({
      user: users,
    })
    .from(sessions)
    .innerJoin(users, eq(sessions.userId, users.id))
    .where(
      and(
        eq(sessions.id, sessionId),
        gt(sessions.expiresAt, new Date())
      )
    );

  if (result.length === 0) return null;

  return result[0].user;
}