  import { hashPassword as hash, verifyPassword as verify, } from 'better-auth/crypto';
  import { db } from '@/db';
  import { sessions } from '@/db/schema/sessions';
  import { eq } from 'drizzle-orm';
  
  export const SESSION_COOKIE_NAME = 'potespor_session';
  const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000;
  
  export async function hashPass(password: string) {
    return await hash(password);
  }
  
  export async function verifyPass(hash: string, password: string) {
    return await verify({ password, hash });
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