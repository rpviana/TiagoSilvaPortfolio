import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Contact form message schema
export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertMessageSchema = createInsertSchema(messages).pick({
  name: true,
  email: true,
  subject: true,
  message: true,
});

// Events schema
export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  date: timestamp("date").notNull(),
  time: text("time").notNull(),
  venue: text("venue").notNull(),
  description: text("description").notNull(),
  isPast: boolean("is_past").default(false),
  bookingLink: text("booking_link"),
  programLink: text("program_link"),
});

export const insertEventSchema = createInsertSchema(events).pick({
  title: true,
  date: true,
  time: true,
  venue: true,
  description: true,
  isPast: true,
  bookingLink: true,
  programLink: true,
});

// Repertoire schema
export const repertoire = pgTable("repertoire", {
  id: serial("id").primaryKey(),
  composer: text("composer").notNull(),
  title: text("title").notNull(),
  category: text("category").notNull(),
});

export const insertRepertoireSchema = createInsertSchema(repertoire).pick({
  composer: true,
  title: true,
  category: true,
});

// Define export types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type Message = typeof messages.$inferSelect;

export type InsertEvent = z.infer<typeof insertEventSchema>;
export type Event = typeof events.$inferSelect;

export type InsertRepertoire = z.infer<typeof insertRepertoireSchema>;
export type Repertoire = typeof repertoire.$inferSelect;
