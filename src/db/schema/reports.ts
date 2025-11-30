import { pgTable, text, serial, timestamp, integer, boolean } from "drizzle-orm/pg-core";
import { users } from "./users";

export const reports = pgTable("reports", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  
  status: text("status").notNull(),
  species: text("species").notNull(),
  
  petName: text("pet_name"),
  breed: text("breed"),
  sex: text("sex"),
  colors: text("colors"),   
  features: text("features"), 
  
  isChipped: text("is_chipped"), 
  isSterilized: text("is_sterilized"),
  dateMissing: text("date_missing"),
  description: text("description"),
  locationDescription: text("location_description"), 
  imageUrl: text("image_url"), 
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});