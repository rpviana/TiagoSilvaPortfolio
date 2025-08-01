import { pgTable, text, serial, integer, boolean, timestamp, varchar, unique } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Tabela de idiomas
export const languages = pgTable("languages", {
  code: varchar("code", { length: 2 }).primaryKey(),
  name: text("name").notNull(),
  isDefault: boolean("is_default").default(false),
});

export const insertLanguageSchema = createInsertSchema(languages);

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
  date: timestamp("date").notNull(),
  time: text("time").notNull(),
  venue: text("venue").notNull(),
  isPast: boolean("is_past").default(false),
  bookingLink: text("booking_link"),
  programLink: text("program_link"),
});

export const insertEventSchema = createInsertSchema(events).pick({
  date: true,
  time: true,
  venue: true,
  isPast: true,
  bookingLink: true,
  programLink: true,
});

// Relações para eventos
export const eventsRelations = relations(events, ({ many }) => ({
  translations: many(eventTranslations),
}));

// Traduções para eventos
export const eventTranslations = pgTable("event_translations", {
  id: serial("id").primaryKey(),
  eventId: integer("event_id").notNull().references(() => events.id, { onDelete: "cascade" }),
  languageCode: varchar("language_code", { length: 2 }).notNull().references(() => languages.code),
  title: text("title").notNull(),
  description: text("description").notNull(),
}, (table) => {
  return {
    uniqueLangPerEvent: unique().on(table.eventId, table.languageCode),
  }
});

export const insertEventTranslationSchema = createInsertSchema(eventTranslations).pick({
  eventId: true,
  languageCode: true,
  title: true,
  description: true,
});

// Relações para traduções de eventos
export const eventTranslationsRelations = relations(eventTranslations, ({ one }) => ({
  event: one(events, {
    fields: [eventTranslations.eventId],
    references: [events.id]
  }),
  language: one(languages, {
    fields: [eventTranslations.languageCode],
    references: [languages.code]
  })
}));

// Categorias de repertório
export const repertoireCategories = pgTable("repertoire_categories", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
});

export const insertRepertoireCategorySchema = createInsertSchema(repertoireCategories).pick({
  slug: true,
});

// Relações para categorias de repertório
export const repertoireCategoriesRelations = relations(repertoireCategories, ({ many }) => ({
  translations: many(repertoireCategoryTranslations),
  repertoireItems: many(repertoire),
}));

// Traduções para categorias de repertório
export const repertoireCategoryTranslations = pgTable("repertoire_category_translations", {
  id: serial("id").primaryKey(),
  categoryId: integer("category_id").notNull().references(() => repertoireCategories.id, { onDelete: "cascade" }),
  languageCode: varchar("language_code", { length: 2 }).notNull().references(() => languages.code),
  name: text("name").notNull(),
}, (table) => {
  return {
    uniqueLangPerCategory: unique().on(table.categoryId, table.languageCode),
  }
});

export const insertRepertoireCategoryTranslationSchema = createInsertSchema(repertoireCategoryTranslations).pick({
  categoryId: true,
  languageCode: true,
  name: true,
});

// Relações para traduções de categorias
export const repertoireCategoryTranslationsRelations = relations(repertoireCategoryTranslations, ({ one }) => ({
  category: one(repertoireCategories, {
    fields: [repertoireCategoryTranslations.categoryId],
    references: [repertoireCategories.id]
  }),
  language: one(languages, {
    fields: [repertoireCategoryTranslations.languageCode],
    references: [languages.code]
  })
}));

// Repertoire schema
export const repertoire = pgTable("repertoire", {
  id: serial("id").primaryKey(),
  composer: text("composer").notNull(),
  categoryId: integer("category_id").notNull().references(() => repertoireCategories.id),
});

export const insertRepertoireSchema = createInsertSchema(repertoire).pick({
  composer: true,
  categoryId: true,
});

// Relações para repertório
export const repertoireRelations = relations(repertoire, ({ one, many }) => ({
  category: one(repertoireCategories, {
    fields: [repertoire.categoryId],
    references: [repertoireCategories.id]
  }),
  translations: many(repertoireTranslations),
}));

// Traduções para repertório
export const repertoireTranslations = pgTable("repertoire_translations", {
  id: serial("id").primaryKey(),
  repertoireId: integer("repertoire_id").notNull().references(() => repertoire.id, { onDelete: "cascade" }),
  languageCode: varchar("language_code", { length: 2 }).notNull().references(() => languages.code),
  title: text("title").notNull(),
}, (table) => {
  return {
    uniqueLangPerRepertoire: unique().on(table.repertoireId, table.languageCode),
  }
});

export const insertRepertoireTranslationSchema = createInsertSchema(repertoireTranslations).pick({
  repertoireId: true,
  languageCode: true,
  title: true,
});

// Relações para traduções de repertório
export const repertoireTranslationsRelations = relations(repertoireTranslations, ({ one }) => ({
  repertoireItem: one(repertoire, {
    fields: [repertoireTranslations.repertoireId],
    references: [repertoire.id]
  }),
  language: one(languages, {
    fields: [repertoireTranslations.languageCode],
    references: [languages.code]
  })
}));

// Define export types
export type Language = typeof languages.$inferSelect;
export type InsertLanguage = z.infer<typeof insertLanguageSchema>;

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type Message = typeof messages.$inferSelect;

export type InsertEvent = z.infer<typeof insertEventSchema>;
export type Event = typeof events.$inferSelect;

export type InsertEventTranslation = z.infer<typeof insertEventTranslationSchema>;
export type EventTranslation = typeof eventTranslations.$inferSelect;

export type InsertRepertoireCategory = z.infer<typeof insertRepertoireCategorySchema>;
export type RepertoireCategory = typeof repertoireCategories.$inferSelect;

export type InsertRepertoireCategoryTranslation = z.infer<typeof insertRepertoireCategoryTranslationSchema>;
export type RepertoireCategoryTranslation = typeof repertoireCategoryTranslations.$inferSelect;

export type InsertRepertoire = z.infer<typeof insertRepertoireSchema>;
export type Repertoire = typeof repertoire.$inferSelect;

export type InsertRepertoireTranslation = z.infer<typeof insertRepertoireTranslationSchema>;
export type RepertoireTranslation = typeof repertoireTranslations.$inferSelect;

// Discography schema
export const discography = pgTable("discography", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  year: integer("year").notNull(),
  label: text("label"),
  coverImage: text("cover_image"),
  spotifyUrl: text("spotify_url"),
  appleMusicUrl: text("apple_music_url"),
  amazonUrl: text("amazon_url"),
});

export const insertDiscographySchema = createInsertSchema(discography).pick({
  title: true,
  year: true,
  label: true,
  coverImage: true,
  spotifyUrl: true,
  appleMusicUrl: true,
  amazonUrl: true,
});

// Reviews/Critics schema for discography
export const discographyReviews = pgTable("discography_reviews", {
  id: serial("id").primaryKey(),
  discographyId: integer("discography_id").notNull().references(() => discography.id, { onDelete: "cascade" }),
  reviewerNif: text("reviewer_nif").notNull(), // NIF para evitar múltiplas críticas da mesma pessoa
  rating: integer("rating"), // opcional, de 1 a 5 estrelas
  createdAt: timestamp("created_at").defaultNow(),
}, (table) => {
  return {
    uniqueNifPerDiscography: unique().on(table.discographyId, table.reviewerNif),
  }
});

export const insertDiscographyReviewSchema = createInsertSchema(discographyReviews).pick({
  discographyId: true,
  reviewerNif: true,
  rating: true,
});

// Translations for discography reviews
export const discographyReviewTranslations = pgTable("discography_review_translations", {
  id: serial("id").primaryKey(),
  reviewId: integer("review_id").notNull().references(() => discographyReviews.id, { onDelete: "cascade" }),
  languageCode: varchar("language_code", { length: 2 }).notNull().references(() => languages.code),
  reviewerName: text("reviewer_name").notNull(),
  reviewText: text("review_text").notNull(),
}, (table) => {
  return {
    uniqueLangPerReview: unique().on(table.reviewId, table.languageCode),
  }
});

export const insertDiscographyReviewTranslationSchema = createInsertSchema(discographyReviewTranslations).pick({
  reviewId: true,
  languageCode: true,
  reviewerName: true,
  reviewText: true,
});

// Relações para discografia
export const discographyRelations = relations(discography, ({ many }) => ({
  reviews: many(discographyReviews),
}));

// Relações para críticas
export const discographyReviewsRelations = relations(discographyReviews, ({ one, many }) => ({
  discography: one(discography, {
    fields: [discographyReviews.discographyId],
    references: [discography.id]
  }),
  translations: many(discographyReviewTranslations),
}));

// Relações para traduções de críticas
export const discographyReviewTranslationsRelations = relations(discographyReviewTranslations, ({ one }) => ({
  review: one(discographyReviews, {
    fields: [discographyReviewTranslations.reviewId],
    references: [discographyReviews.id]
  }),
  language: one(languages, {
    fields: [discographyReviewTranslations.languageCode],
    references: [languages.code]
  })
}));

export type InsertDiscography = z.infer<typeof insertDiscographySchema>;
export type Discography = typeof discography.$inferSelect;

export type InsertDiscographyReview = z.infer<typeof insertDiscographyReviewSchema>;
export type DiscographyReview = typeof discographyReviews.$inferSelect;

export type InsertDiscographyReviewTranslation = z.infer<typeof insertDiscographyReviewTranslationSchema>;
export type DiscographyReviewTranslation = typeof discographyReviewTranslations.$inferSelect;