import { z } from "zod";
import * as bcrypt from "bcryptjs";
import { db } from "@/db";
import { sessions } from "@/db/schema/sessions";
import { eq } from "drizzle-orm";

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

export const SESSION_COOKIE_NAME = "potespor_session";
const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000;

export async function hashPass(password: string) {
  return await bcrypt.hash(password, 10);
}

export async function verifyPass(hash: string, password: string) {
  return await bcrypt.compare(password, hash);
}

export async function createSession(userId: number) {
  const sessionId = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);

  await db.insert(sessions).values({
    id: sessionId,
    userId: userId,
    expiresAt: expiresAt,
  });

  return sessionId;
}

export async function clearSession(sessionId: string) {
  await db.delete(sessions).where(eq(sessions.id, sessionId));
}