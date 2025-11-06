import { getUserByEmail, createUser as createUserRepo } from "@/db/repositories/userRepository";
import { hashPass, verifyPass, type LoginSchema, type RegisterSchema } from "@/app/lib/auth";
import type { z } from "zod";
  
  export async function registerService(
    data: z.infer<typeof RegisterSchema>
  ) {
    const existingUser = await getUserByEmail(data.email);
    if (existingUser) {
      throw new Error("En bruker med denne e-posten finnes allerede");
    }
  
    const password_hash = await hashPass(data.password);
  
    const newUser = await createUserRepo({
      email: data.email,
      password_hash: password_hash,
    });
  
    return newUser;
  }
  
  export async function loginService(data: z.infer<typeof LoginSchema>) {
    const user = await getUserByEmail(data.email);
    if (!user) {
      throw new Error("Ugyldig e-post eller passord");
    }
  
  
    const isPasswordValid = await verifyPass(user.password_hash, data.password);
    if (!isPasswordValid) {
      throw new Error("Ugyldig e-post eller passord");
    }
  
    return user;
  }