// server/index.ts
import "dotenv/config";
import express3 from "express";

// server/routes.ts
import { createServer } from "http";

// shared/schema.ts
import { pgTable, text, serial, integer, boolean, timestamp, varchar, unique } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";
var languages = pgTable("languages", {
  code: varchar("code", { length: 2 }).primaryKey(),
  name: text("name").notNull(),
  isDefault: boolean("is_default").default(false)
});
var insertLanguageSchema = createInsertSchema(languages);
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email"),
  firstName: text("first_name"),
  lastName: text("last_name"),
  isAdmin: boolean("is_admin").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  firstName: true,
  lastName: true,
  isAdmin: true
});
var loginSchema = z.object({
  username: z.string().min(1, "Username \xE9 obrigat\xF3rio"),
  password: z.string().min(1, "Password \xE9 obrigat\xF3ria")
});
var messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow()
});
var insertMessageSchema = createInsertSchema(messages).pick({
  name: true,
  email: true,
  subject: true,
  message: true
});
var events = pgTable("events", {
  id: serial("id").primaryKey(),
  date: timestamp("date").notNull(),
  time: text("time").notNull(),
  venue: text("venue").notNull(),
  isPast: boolean("is_past").default(false),
  bookingLink: text("booking_link"),
  programLink: text("program_link")
});
var insertEventSchema = createInsertSchema(events).pick({
  date: true,
  time: true,
  venue: true,
  isPast: true,
  bookingLink: true,
  programLink: true
});
var eventsRelations = relations(events, ({ many }) => ({
  translations: many(eventTranslations)
}));
var eventTranslations = pgTable("event_translations", {
  id: serial("id").primaryKey(),
  eventId: integer("event_id").notNull().references(() => events.id, { onDelete: "cascade" }),
  languageCode: varchar("language_code", { length: 2 }).notNull().references(() => languages.code),
  title: text("title").notNull(),
  description: text("description").notNull()
}, (table) => {
  return {
    uniqueLangPerEvent: unique().on(table.eventId, table.languageCode)
  };
});
var insertEventTranslationSchema = createInsertSchema(eventTranslations).pick({
  eventId: true,
  languageCode: true,
  title: true,
  description: true
});
var eventTranslationsRelations = relations(eventTranslations, ({ one }) => ({
  event: one(events, {
    fields: [eventTranslations.eventId],
    references: [events.id]
  }),
  language: one(languages, {
    fields: [eventTranslations.languageCode],
    references: [languages.code]
  })
}));
var repertoireCategories = pgTable("repertoire_categories", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique()
});
var insertRepertoireCategorySchema = createInsertSchema(repertoireCategories).pick({
  slug: true
});
var repertoireCategoriesRelations = relations(repertoireCategories, ({ many }) => ({
  translations: many(repertoireCategoryTranslations),
  repertoireItems: many(repertoire)
}));
var repertoireCategoryTranslations = pgTable("repertoire_category_translations", {
  id: serial("id").primaryKey(),
  categoryId: integer("category_id").notNull().references(() => repertoireCategories.id, { onDelete: "cascade" }),
  languageCode: varchar("language_code", { length: 2 }).notNull().references(() => languages.code),
  name: text("name").notNull()
}, (table) => {
  return {
    uniqueLangPerCategory: unique().on(table.categoryId, table.languageCode)
  };
});
var insertRepertoireCategoryTranslationSchema = createInsertSchema(repertoireCategoryTranslations).pick({
  categoryId: true,
  languageCode: true,
  name: true
});
var repertoireCategoryTranslationsRelations = relations(repertoireCategoryTranslations, ({ one }) => ({
  category: one(repertoireCategories, {
    fields: [repertoireCategoryTranslations.categoryId],
    references: [repertoireCategories.id]
  }),
  language: one(languages, {
    fields: [repertoireCategoryTranslations.languageCode],
    references: [languages.code]
  })
}));
var repertoire = pgTable("repertoire", {
  id: serial("id").primaryKey(),
  composer: text("composer").notNull(),
  categoryId: integer("category_id").notNull().references(() => repertoireCategories.id)
});
var insertRepertoireSchema = createInsertSchema(repertoire).pick({
  composer: true,
  categoryId: true
});
var repertoireRelations = relations(repertoire, ({ one, many }) => ({
  category: one(repertoireCategories, {
    fields: [repertoire.categoryId],
    references: [repertoireCategories.id]
  }),
  translations: many(repertoireTranslations)
}));
var repertoireTranslations = pgTable("repertoire_translations", {
  id: serial("id").primaryKey(),
  repertoireId: integer("repertoire_id").notNull().references(() => repertoire.id, { onDelete: "cascade" }),
  languageCode: varchar("language_code", { length: 2 }).notNull().references(() => languages.code),
  title: text("title").notNull()
}, (table) => {
  return {
    uniqueLangPerRepertoire: unique().on(table.repertoireId, table.languageCode)
  };
});
var insertRepertoireTranslationSchema = createInsertSchema(repertoireTranslations).pick({
  repertoireId: true,
  languageCode: true,
  title: true
});
var repertoireTranslationsRelations = relations(repertoireTranslations, ({ one }) => ({
  repertoireItem: one(repertoire, {
    fields: [repertoireTranslations.repertoireId],
    references: [repertoire.id]
  }),
  language: one(languages, {
    fields: [repertoireTranslations.languageCode],
    references: [languages.code]
  })
}));
var discography = pgTable("discography", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  year: integer("year").notNull(),
  label: text("label"),
  coverImage: text("cover_image"),
  spotifyUrl: text("spotify_url"),
  appleMusicUrl: text("apple_music_url"),
  amazonUrl: text("amazon_url")
});
var insertDiscographySchema = createInsertSchema(discography).pick({
  title: true,
  year: true,
  label: true,
  coverImage: true,
  spotifyUrl: true,
  appleMusicUrl: true,
  amazonUrl: true
});
var discographyReviews = pgTable("discography_reviews", {
  id: serial("id").primaryKey(),
  discographyId: integer("discography_id").notNull().references(() => discography.id, { onDelete: "cascade" }),
  reviewerNif: text("reviewer_nif").notNull(),
  // NIF para evitar múltiplas críticas da mesma pessoa
  rating: integer("rating"),
  // opcional, de 1 a 5 estrelas
  createdAt: timestamp("created_at").defaultNow()
}, (table) => {
  return {
    uniqueNifPerDiscography: unique().on(table.discographyId, table.reviewerNif)
  };
});
var insertDiscographyReviewSchema = createInsertSchema(discographyReviews).pick({
  discographyId: true,
  reviewerNif: true,
  rating: true
});
var discographyReviewTranslations = pgTable("discography_review_translations", {
  id: serial("id").primaryKey(),
  reviewId: integer("review_id").notNull().references(() => discographyReviews.id, { onDelete: "cascade" }),
  languageCode: varchar("language_code", { length: 2 }).notNull().references(() => languages.code),
  reviewerName: text("reviewer_name").notNull(),
  reviewText: text("review_text").notNull()
}, (table) => {
  return {
    uniqueLangPerReview: unique().on(table.reviewId, table.languageCode)
  };
});
var insertDiscographyReviewTranslationSchema = createInsertSchema(discographyReviewTranslations).pick({
  reviewId: true,
  languageCode: true,
  reviewerName: true,
  reviewText: true
});
var discographyRelations = relations(discography, ({ many }) => ({
  reviews: many(discographyReviews)
}));
var discographyReviewsRelations = relations(discographyReviews, ({ one, many }) => ({
  discography: one(discography, {
    fields: [discographyReviews.discographyId],
    references: [discography.id]
  }),
  translations: many(discographyReviewTranslations)
}));
var discographyReviewTranslationsRelations = relations(discographyReviewTranslations, ({ one }) => ({
  review: one(discographyReviews, {
    fields: [discographyReviewTranslations.reviewId],
    references: [discographyReviews.id]
  }),
  language: one(languages, {
    fields: [discographyReviewTranslations.languageCode],
    references: [languages.code]
  })
}));

// server/db.ts
var db = void 0;

// server/storage.ts
import { eq, and, desc } from "drizzle-orm";
var DatabaseStorage = class {
  // User methods
  async getUser(id) {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || void 0;
  }
  async getUserByUsername(username) {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || void 0;
  }
  async createUser(insertUser) {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }
  async updateUser(id, userData) {
    const [user] = await db.update(users).set({ ...userData, updatedAt: /* @__PURE__ */ new Date() }).where(eq(users.id, id)).returning();
    return user;
  }
  // Language methods
  async getLanguages() {
    return await db.select().from(languages);
  }
  async getLanguage(code) {
    const [language] = await db.select().from(languages).where(eq(languages.code, code));
    return language || void 0;
  }
  async createLanguage(language) {
    const [newLanguage] = await db.insert(languages).values(language).returning();
    return newLanguage;
  }
  // Message methods
  async createMessage(message) {
    const [newMessage] = await db.insert(messages).values(message).returning();
    return newMessage;
  }
  async getMessages() {
    return await db.select().from(messages);
  }
  // Event methods
  async getEvents(isPast, languageCode) {
    const eventsData = await db.select().from(events);
    if (isPast !== void 0) {
      const filteredEvents = eventsData.filter((event) => event.isPast === isPast);
      return await this.addTranslationsToEvents(filteredEvents, languageCode);
    }
    return await this.addTranslationsToEvents(eventsData, languageCode);
  }
  async getEvent(id, languageCode) {
    const [event] = await db.select().from(events).where(eq(events.id, id));
    if (!event) {
      return void 0;
    }
    const eventsWithTranslations = await this.addTranslationsToEvents([event], languageCode);
    return eventsWithTranslations[0];
  }
  async addTranslationsToEvents(events2, languageCode) {
    if (events2.length === 0) {
      return [];
    }
    let translations;
    if (languageCode) {
      translations = await Promise.all(
        events2.map(
          (event) => db.select().from(eventTranslations).where(and(
            eq(eventTranslations.eventId, event.id),
            eq(eventTranslations.languageCode, languageCode)
          ))
        )
      ).then((results) => results.flat());
    } else {
      translations = await Promise.all(
        events2.map(
          (event) => db.select().from(eventTranslations).where(eq(eventTranslations.eventId, event.id))
        )
      ).then((results) => results.flat());
    }
    const translationsByEventId = translations.reduce((acc, translation) => {
      if (!acc[translation.eventId]) {
        acc[translation.eventId] = [];
      }
      acc[translation.eventId].push(translation);
      return acc;
    }, {});
    return events2.map((event) => {
      return {
        ...event,
        translations: translationsByEventId[event.id] || []
      };
    });
  }
  async createEvent(event, translations) {
    const [newEvent] = await db.insert(events).values(event).returning();
    const eventTranslationsToInsert = translations.map((translation) => ({
      ...translation,
      eventId: newEvent.id
    }));
    const insertedTranslations = await db.insert(eventTranslations).values(eventTranslationsToInsert).returning();
    return {
      ...newEvent,
      translations: insertedTranslations
    };
  }
  // Repertoire category methods
  async getRepertoireCategories(languageCode) {
    const categoriesData = await db.select().from(repertoireCategories);
    return await this.addTranslationsToCategories(categoriesData, languageCode);
  }
  async getRepertoireCategory(id, languageCode) {
    const [category] = await db.select().from(repertoireCategories).where(eq(repertoireCategories.id, id));
    if (!category) {
      return void 0;
    }
    const categoriesWithTranslations = await this.addTranslationsToCategories([category], languageCode);
    return categoriesWithTranslations[0];
  }
  async addTranslationsToCategories(categories, languageCode) {
    if (categories.length === 0) {
      return [];
    }
    let translations;
    if (languageCode) {
      translations = await Promise.all(
        categories.map(
          (category) => db.select().from(repertoireCategoryTranslations).where(and(
            eq(repertoireCategoryTranslations.categoryId, category.id),
            eq(repertoireCategoryTranslations.languageCode, languageCode)
          ))
        )
      ).then((results) => results.flat());
    } else {
      translations = await Promise.all(
        categories.map(
          (category) => db.select().from(repertoireCategoryTranslations).where(eq(repertoireCategoryTranslations.categoryId, category.id))
        )
      ).then((results) => results.flat());
    }
    const translationsByCategoryId = translations.reduce((acc, translation) => {
      if (!acc[translation.categoryId]) {
        acc[translation.categoryId] = [];
      }
      acc[translation.categoryId].push(translation);
      return acc;
    }, {});
    return categories.map((category) => {
      return {
        ...category,
        translations: translationsByCategoryId[category.id] || []
      };
    });
  }
  async createRepertoireCategory(category, translations) {
    const [newCategory] = await db.insert(repertoireCategories).values(category).returning();
    const categoryTranslationsToInsert = translations.map((translation) => ({
      ...translation,
      categoryId: newCategory.id
    }));
    const insertedTranslations = await db.insert(repertoireCategoryTranslations).values(categoryTranslationsToInsert).returning();
    return {
      ...newCategory,
      translations: insertedTranslations
    };
  }
  // Repertoire methods
  async getRepertoire(categoryId, languageCode) {
    let repertoireData;
    if (categoryId) {
      repertoireData = await db.select().from(repertoire).where(eq(repertoire.categoryId, categoryId));
    } else {
      repertoireData = await db.select().from(repertoire);
    }
    const repertoireWithTranslations = await this.addTranslationsToRepertoire(repertoireData, languageCode);
    if (repertoireWithTranslations.length > 0) {
      const uniqueCategoryIds = [];
      const categoryIdsSet = /* @__PURE__ */ new Set();
      repertoireWithTranslations.forEach((item) => {
        if (!categoryIdsSet.has(item.categoryId)) {
          categoryIdsSet.add(item.categoryId);
          uniqueCategoryIds.push(item.categoryId);
        }
      });
      const categories = await Promise.all(
        uniqueCategoryIds.map((catId) => this.getRepertoireCategory(catId, languageCode))
      );
      const categoriesById = categories.reduce((acc, category) => {
        if (category) {
          acc[category.id] = category;
        }
        return acc;
      }, {});
      return repertoireWithTranslations.map((item) => ({
        ...item,
        category: categoriesById[item.categoryId]
      }));
    }
    return repertoireWithTranslations;
  }
  async getRepertoireItem(id, languageCode) {
    const [item] = await db.select().from(repertoire).where(eq(repertoire.id, id));
    if (!item) {
      return void 0;
    }
    const itemsWithTranslations = await this.addTranslationsToRepertoire([item], languageCode);
    const itemWithTranslations = itemsWithTranslations[0];
    const category = await this.getRepertoireCategory(item.categoryId, languageCode);
    return {
      ...itemWithTranslations,
      category
    };
  }
  async addTranslationsToRepertoire(items, languageCode) {
    if (items.length === 0) {
      return [];
    }
    let translations;
    if (languageCode) {
      translations = await Promise.all(
        items.map(
          (item) => db.select().from(repertoireTranslations).where(and(
            eq(repertoireTranslations.repertoireId, item.id),
            eq(repertoireTranslations.languageCode, languageCode)
          ))
        )
      ).then((results) => results.flat());
    } else {
      translations = await Promise.all(
        items.map(
          (item) => db.select().from(repertoireTranslations).where(eq(repertoireTranslations.repertoireId, item.id))
        )
      ).then((results) => results.flat());
    }
    const translationsByItemId = translations.reduce((acc, translation) => {
      if (!acc[translation.repertoireId]) {
        acc[translation.repertoireId] = [];
      }
      acc[translation.repertoireId].push(translation);
      return acc;
    }, {});
    return items.map((item) => {
      return {
        ...item,
        translations: translationsByItemId[item.id] || []
      };
    });
  }
  async createRepertoire(item, translations) {
    const [newItem] = await db.insert(repertoire).values(item).returning();
    const itemTranslationsToInsert = translations.map((translation) => ({
      ...translation,
      repertoireId: newItem.id
    }));
    const insertedTranslations = await db.insert(repertoireTranslations).values(itemTranslationsToInsert).returning();
    const category = await this.getRepertoireCategory(newItem.categoryId);
    return {
      ...newItem,
      translations: insertedTranslations,
      category
    };
  }
  // Discography methods
  async getDiscographyItems() {
    const items = await db.select().from(discography);
    return items;
  }
  async getDiscographyReviews(discographyId, language = "pt") {
    const reviews = await db.select({
      id: discographyReviews.id,
      reviewerName: discographyReviewTranslations.reviewerName,
      reviewText: discographyReviewTranslations.reviewText,
      rating: discographyReviews.rating,
      createdAt: discographyReviews.createdAt
    }).from(discographyReviews).leftJoin(
      discographyReviewTranslations,
      and(
        eq(discographyReviewTranslations.reviewId, discographyReviews.id),
        eq(discographyReviewTranslations.languageCode, language)
      )
    ).where(eq(discographyReviews.discographyId, discographyId)).orderBy(desc(discographyReviews.createdAt));
    return reviews.filter((review) => review.reviewerName && review.reviewText);
  }
  async createDiscographyReview(reviewData) {
    const [newReview] = await db.insert(discographyReviews).values(reviewData).returning();
    return newReview;
  }
};
var storage = new DatabaseStorage();

// server/auth.ts
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
var JWT_SECRET = process.env.JWT_SECRET || "portfolio-secret-key-2025";
var verifyPassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};
var generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      isAdmin: user.isAdmin
    },
    JWT_SECRET,
    { expiresIn: "24h" }
  );
};
var verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};
var authenticateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Token de acesso requerido" });
  }
  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(403).json({ error: "Token inv\xE1lido ou expirado" });
  }
  const user = await storage.getUser(decoded.id);
  if (!user) {
    return res.status(403).json({ error: "Usu\xE1rio n\xE3o encontrado" });
  }
  req.user = {
    id: user.id,
    username: user.username,
    isAdmin: user.isAdmin || false
  };
  next();
};
var loginUser = async (username, password) => {
  const user = await storage.getUserByUsername(username);
  if (!user) {
    throw new Error("Credenciais inv\xE1lidas");
  }
  const isPasswordValid = await verifyPassword(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Credenciais inv\xE1lidas");
  }
  const token = generateToken({
    id: user.id,
    username: user.username,
    isAdmin: user.isAdmin || false
  });
  return {
    token,
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      isAdmin: user.isAdmin || false
    }
  };
};

// server/routes.ts
import nodemailer from "nodemailer";
import path from "path";
import express from "express";
async function registerRoutes(app2) {
  app2.use("/attached_assets", express.static(path.resolve(import.meta.dirname, "..", "attached_assets")));
  app2.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = loginSchema.parse(req.body);
      const result = await loginUser(username, password);
      res.json(result);
    } catch (error) {
      console.error("Login error:", error);
      res.status(401).json({ error: error.message });
    }
  });
  app2.get("/api/auth/me", authenticateToken, async (req, res) => {
    try {
      const user = await storage.getUser(req.user.id);
      if (!user) {
        return res.status(404).json({ error: "Usu\xE1rio n\xE3o encontrado" });
      }
      res.json({
        id: user.id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        isAdmin: user.isAdmin
      });
    } catch (error) {
      console.error("Get user error:", error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  });
  app2.get("/api/languages", async (req, res) => {
    try {
      const languages2 = await storage.getLanguages();
      res.json(languages2);
    } catch (error) {
      console.error("Error fetching languages:", error);
      res.status(500).json({ message: "Failed to fetch languages" });
    }
  });
  app2.post("/api/languages", async (req, res) => {
    try {
      const languageData = insertLanguageSchema.parse(req.body);
      const language = await storage.createLanguage(languageData);
      res.status(201).json(language);
    } catch (error) {
      console.error("Error creating language:", error);
      res.status(400).json({
        message: "Invalid language data",
        error: error.message
      });
    }
  });
  app2.get("/api/events", async (req, res) => {
    try {
      const isPastStr = req.query.isPast;
      const languageCode = req.query.lang;
      let isPast = void 0;
      if (isPastStr !== void 0) {
        isPast = isPastStr === "true";
      }
      const events2 = await storage.getEvents(isPast, languageCode);
      if (isPast === false) {
        events2.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      } else if (isPast === true) {
        events2.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      }
      res.json(events2);
    } catch (error) {
      console.error("Error fetching events:", error);
      res.status(500).json({ message: "Failed to fetch events" });
    }
  });
  app2.get("/api/events/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const languageCode = req.query.lang;
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid event ID" });
      }
      const event = await storage.getEvent(id, languageCode);
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }
      res.json(event);
    } catch (error) {
      console.error("Error fetching event:", error);
      res.status(500).json({ message: "Failed to fetch event" });
    }
  });
  app2.get("/api/repertoire/categories", async (req, res) => {
    try {
      const languageCode = req.query.lang;
      const categories = await storage.getRepertoireCategories(languageCode);
      res.json(categories);
    } catch (error) {
      console.error("Error fetching repertoire categories:", error);
      res.status(500).json({ message: "Failed to fetch repertoire categories" });
    }
  });
  app2.get("/api/repertoire", async (req, res) => {
    try {
      const categoryId = req.query.categoryId ? parseInt(req.query.categoryId) : void 0;
      const languageCode = req.query.lang;
      const repertoire2 = await storage.getRepertoire(categoryId, languageCode);
      res.json(repertoire2);
    } catch (error) {
      console.error("Error fetching repertoire:", error);
      res.status(500).json({ message: "Failed to fetch repertoire" });
    }
  });
  app2.get("/api/repertoire/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const languageCode = req.query.lang;
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid repertoire ID" });
      }
      const item = await storage.getRepertoireItem(id, languageCode);
      if (!item) {
        return res.status(404).json({ message: "Repertoire item not found" });
      }
      res.json(item);
    } catch (error) {
      console.error("Error fetching repertoire item:", error);
      res.status(500).json({ message: "Failed to fetch repertoire item" });
    }
  });
  app2.post("/api/contact", async (req, res) => {
    try {
      const messageData = insertMessageSchema.parse(req.body);
      const message = await storage.createMessage(messageData);
      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST || "smtp.example.com",
        port: parseInt(process.env.EMAIL_PORT || "587"),
        secure: process.env.EMAIL_SECURE === "true",
        auth: {
          user: process.env.EMAIL_USER || "user@example.com",
          pass: process.env.EMAIL_PASSWORD || "password"
        }
      });
      await transporter.sendMail({
        from: process.env.EMAIL_FROM || "portfolio@example.com",
        to: process.env.EMAIL_TO || "tiagosilva.05.2000@gmail.com",
        subject: `New Contact Form: ${messageData.subject}`,
        text: `
          Name: ${messageData.name}
          Email: ${messageData.email}
          Subject: ${messageData.subject}
          
          Message:
          ${messageData.message}
        `,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${messageData.name}</p>
          <p><strong>Email:</strong> ${messageData.email}</p>
          <p><strong>Subject:</strong> ${messageData.subject}</p>
          <p><strong>Message:</strong></p>
          <p>${messageData.message.replace(/\n/g, "<br>")}</p>
        `
      }).catch((err) => {
        console.log("Email sending failed:", err);
      });
      res.status(201).json({
        message: "Message sent successfully",
        id: message.id
      });
    } catch (error) {
      console.error("Error processing contact form:", error);
      res.status(400).json({
        message: "Invalid form data",
        error: error.message
      });
    }
  });
  app2.get("/api/discography", async (req, res) => {
    try {
      const discographyItems = await storage.getDiscographyItems();
      res.json(discographyItems);
    } catch (error) {
      console.error("Error fetching discography:", error);
      res.status(500).json({ error: "Failed to fetch discography" });
    }
  });
  app2.get("/api/discography/:id/reviews", async (req, res) => {
    try {
      const discographyId = parseInt(req.params.id);
      if (isNaN(discographyId)) {
        return res.status(400).json({ error: "Invalid discography ID" });
      }
      const language = req.query.lang || "pt";
      const reviews = await storage.getDiscographyReviews(discographyId, language);
      res.json(reviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      res.status(500).json({ error: "Failed to fetch reviews" });
    }
  });
  app2.post("/api/discography/reviews", async (req, res) => {
    try {
      const reviewData = insertDiscographyReviewSchema.parse(req.body);
      const review = await storage.createDiscographyReview(reviewData);
      res.status(201).json(review);
    } catch (error) {
      console.error("Error creating review:", error);
      if (error.message?.includes("duplicate") || error.code === "23505") {
        res.status(409).json({ error: "J\xE1 existe uma cr\xEDtica sua para este \xE1lbum" });
      } else {
        res.status(400).json({ error: "Invalid review data" });
      }
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express2 from "express";
import fs from "fs";
import path3 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path2 from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path2.resolve(import.meta.dirname, "client", "src"),
      "@shared": path2.resolve(import.meta.dirname, "shared"),
      "@assets": path2.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path2.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path2.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path3.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path3.resolve(import.meta.dirname, "..", "client", "dist");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express2.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path3.resolve(distPath, "index.html"));
  });
}


// server/index.ts
var app = express3();
app.use(express3.json());
app.use(express3.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path4 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path4.startsWith("/api")) {
      let logLine = `${req.method} ${path4} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5e3;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
