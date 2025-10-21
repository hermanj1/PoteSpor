// src/db/schema/user-schema.ts

import { sqliteTable, text, int } from "drizzle-orm/sqlite-core";


export const users = sqliteTable('users', {
  id: int('id').primaryKey({ autoIncrement: true }),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  role: text('role', { enum: ['admin', 'user'] }).notNull().default('user'),
});

export type User = typeof users.$inferSelect;