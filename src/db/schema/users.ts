import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";


export const users = pgTable("users", {
  id: serial("id").primaryKey(), 
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  name: text("name"),
  createdAt: timestamp("created_at")
    .notNull()
    .defaultNow(),
});


export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;
