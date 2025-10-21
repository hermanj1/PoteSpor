import { hashPassword, verifyPassword } from "./authRepository";
import { getUserByEmail, createUser } from "./userRepository";

export async function registerUser(email: string, password: string) {
  const existing = await getUserByEmail(email);
  if (existing) throw new Error("Bruker finnes allerede");

  const hash = await hashPassword(password);
  return await createUser({ email, password: hash });
}

export async function loginUser(email: string, password: string) {
  
  const user = await getUserByEmail(email);
  if (!user) throw new Error("Feil e-post eller passord");

  const valid = await verifyPassword(user.password, password);
  if (!valid) throw new Error("Feil e-post eller passord");

  return user;
}

export async function logoutUser() {
  return { success: true };
}

export async function getUserInfo(email: string) {
  const user = await getUserByEmail(email);
  if (!user) throw new Error("Fant ikke bruker");
  return user;
}
