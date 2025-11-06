import { defineScript } from "rwsdk/worker";
import { drizzle } from "drizzle-orm/d1";
import { schema } from "./schema";
import { hashPass } from "../app/lib/auth";

export default defineScript(async ({ env }) => {
  try {
    const db = drizzle(env.DB, { schema });

    await db.delete(schema.users);

    const hashedPassword = await hashPass("password123");

    await db.insert(schema.users).values({
      id: 1,
      email: "test@bruker.no",
      password_hash: hashedPassword,
    });

    const result = await db.select().from(schema.users).all();

    console.log("Finished seeding");

    return Response.json(result);
  } catch (error) {
    console.error("Error seeding database:", error);
    return Response.json({
      success: false,
      error: "Failed to seed database",
    });
  }
});
