import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: text("name").primaryKey(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
});
