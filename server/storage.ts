import { 
  User, InsertUser, 
  Message, InsertMessage, 
  Event, InsertEvent, 
  Repertoire, InsertRepertoire,
  Language, InsertLanguage,
  EventTranslation, InsertEventTranslation,
  RepertoireCategory, InsertRepertoireCategory,
  RepertoireCategoryTranslation, InsertRepertoireCategoryTranslation,
  RepertoireTranslation, InsertRepertoireTranslation,
  users, messages, events, repertoire,
  languages, eventTranslations, 
  repertoireCategories, repertoireCategoryTranslations, 
  repertoireTranslations, discography, discographyReviews
} from "@shared/schema";

import { db } from "./db";
import { eq, and, or, desc, sql, asc, isNull } from "drizzle-orm";

// Tipos estendidos com traduções
export interface EventWithTranslations extends Event {
  translations: EventTranslation[];
}

export interface RepertoireCategoryWithTranslations extends RepertoireCategory {
  translations: RepertoireCategoryTranslation[];
}

export interface RepertoireWithTranslations extends Repertoire {
  translations: RepertoireTranslation[];
  category?: RepertoireCategoryWithTranslations;
}

// Storage interface
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Language methods
  getLanguages(): Promise<Language[]>;
  getLanguage(code: string): Promise<Language | undefined>;
  createLanguage(language: InsertLanguage): Promise<Language>;
  
  // Message methods
  createMessage(message: InsertMessage): Promise<Message>;
  getMessages(): Promise<Message[]>;
  
  // Event methods
  getEvents(isPast?: boolean, languageCode?: string): Promise<EventWithTranslations[]>;
  getEvent(id: number, languageCode?: string): Promise<EventWithTranslations | undefined>;
  createEvent(event: InsertEvent, translations: InsertEventTranslation[]): Promise<EventWithTranslations>;
  
  // Repertoire category methods
  getRepertoireCategories(languageCode?: string): Promise<RepertoireCategoryWithTranslations[]>;
  getRepertoireCategory(id: number, languageCode?: string): Promise<RepertoireCategoryWithTranslations | undefined>;
  createRepertoireCategory(category: InsertRepertoireCategory, translations: InsertRepertoireCategoryTranslation[]): Promise<RepertoireCategoryWithTranslations>;
  
  // Repertoire methods
  getRepertoire(categoryId?: number, languageCode?: string): Promise<RepertoireWithTranslations[]>;
  getRepertoireItem(id: number, languageCode?: string): Promise<RepertoireWithTranslations | undefined>;
  createRepertoire(item: InsertRepertoire, translations: InsertRepertoireTranslation[]): Promise<RepertoireWithTranslations>;
}

// Implementação do armazenamento usando banco de dados
export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }
  
  // Language methods
  async getLanguages(): Promise<Language[]> {
    return await db.select().from(languages);
  }
  
  async getLanguage(code: string): Promise<Language | undefined> {
    const [language] = await db.select().from(languages).where(eq(languages.code, code));
    return language || undefined;
  }
  
  async createLanguage(language: InsertLanguage): Promise<Language> {
    const [newLanguage] = await db
      .insert(languages)
      .values(language)
      .returning();
    return newLanguage;
  }
  
  // Message methods
  async createMessage(message: InsertMessage): Promise<Message> {
    const [newMessage] = await db
      .insert(messages)
      .values(message)
      .returning();
    return newMessage;
  }
  
  async getMessages(): Promise<Message[]> {
    return await db.select().from(messages);
  }
  
  // Event methods
  async getEvents(isPast?: boolean, languageCode?: string): Promise<EventWithTranslations[]> {
    const eventsData = await db.select().from(events);
    
    if (isPast !== undefined) {
      const filteredEvents = eventsData.filter(event => event.isPast === isPast);
      return await this.addTranslationsToEvents(filteredEvents, languageCode);
    }
    
    return await this.addTranslationsToEvents(eventsData, languageCode);
  }
  
  async getEvent(id: number, languageCode?: string): Promise<EventWithTranslations | undefined> {
    const [event] = await db.select().from(events).where(eq(events.id, id));
    
    if (!event) {
      return undefined;
    }
    
    const eventsWithTranslations = await this.addTranslationsToEvents([event], languageCode);
    return eventsWithTranslations[0];
  }
  
  private async addTranslationsToEvents(events: Event[], languageCode?: string): Promise<EventWithTranslations[]> {
    if (events.length === 0) {
      return [];
    }
    
    let translations;
    
    if (languageCode) {
      // Consulta por eventos com filtro de idioma
      translations = await Promise.all(
        events.map(event => 
          db.select()
            .from(eventTranslations)
            .where(and(
              eq(eventTranslations.eventId, event.id),
              eq(eventTranslations.languageCode, languageCode)
            ))
        )
      ).then(results => results.flat());
    } else {
      // Consulta por todas as traduções para todos os eventos
      translations = await Promise.all(
        events.map(event => 
          db.select()
            .from(eventTranslations)
            .where(eq(eventTranslations.eventId, event.id))
        )
      ).then(results => results.flat());
    }
    
    // Agrupar traduções por eventId
    const translationsByEventId = translations.reduce((acc, translation) => {
      if (!acc[translation.eventId]) {
        acc[translation.eventId] = [];
      }
      acc[translation.eventId].push(translation);
      return acc;
    }, {} as Record<number, EventTranslation[]>);
    
    // Adicionar traduções a cada evento
    return events.map(event => {
      return {
        ...event,
        translations: translationsByEventId[event.id] || []
      };
    });
  }
  
  async createEvent(event: InsertEvent, translations: InsertEventTranslation[]): Promise<EventWithTranslations> {
    // Insere o evento
    const [newEvent] = await db
      .insert(events)
      .values(event)
      .returning();
    
    // Insere as traduções
    const eventTranslationsToInsert = translations.map(translation => ({
      ...translation,
      eventId: newEvent.id
    }));
    
    const insertedTranslations = await db
      .insert(eventTranslations)
      .values(eventTranslationsToInsert)
      .returning();
    
    // Retorna o evento com suas traduções
    return {
      ...newEvent,
      translations: insertedTranslations
    };
  }
  
  // Repertoire category methods
  async getRepertoireCategories(languageCode?: string): Promise<RepertoireCategoryWithTranslations[]> {
    const categoriesData = await db.select().from(repertoireCategories);
    return await this.addTranslationsToCategories(categoriesData, languageCode);
  }
  
  async getRepertoireCategory(id: number, languageCode?: string): Promise<RepertoireCategoryWithTranslations | undefined> {
    const [category] = await db.select().from(repertoireCategories).where(eq(repertoireCategories.id, id));
    
    if (!category) {
      return undefined;
    }
    
    const categoriesWithTranslations = await this.addTranslationsToCategories([category], languageCode);
    return categoriesWithTranslations[0];
  }
  
  private async addTranslationsToCategories(categories: RepertoireCategory[], languageCode?: string): Promise<RepertoireCategoryWithTranslations[]> {
    if (categories.length === 0) {
      return [];
    }
    
    let translations;
    
    if (languageCode) {
      // Consulta por categorias com filtro de idioma
      translations = await Promise.all(
        categories.map(category => 
          db.select()
            .from(repertoireCategoryTranslations)
            .where(and(
              eq(repertoireCategoryTranslations.categoryId, category.id),
              eq(repertoireCategoryTranslations.languageCode, languageCode)
            ))
        )
      ).then(results => results.flat());
    } else {
      // Consulta por todas as traduções para todas as categorias
      translations = await Promise.all(
        categories.map(category => 
          db.select()
            .from(repertoireCategoryTranslations)
            .where(eq(repertoireCategoryTranslations.categoryId, category.id))
        )
      ).then(results => results.flat());
    }
    
    // Agrupar traduções por categoryId
    const translationsByCategoryId = translations.reduce((acc, translation) => {
      if (!acc[translation.categoryId]) {
        acc[translation.categoryId] = [];
      }
      acc[translation.categoryId].push(translation);
      return acc;
    }, {} as Record<number, RepertoireCategoryTranslation[]>);
    
    // Adicionar traduções a cada categoria
    return categories.map(category => {
      return {
        ...category,
        translations: translationsByCategoryId[category.id] || []
      };
    });
  }
  
  async createRepertoireCategory(category: InsertRepertoireCategory, translations: InsertRepertoireCategoryTranslation[]): Promise<RepertoireCategoryWithTranslations> {
    // Insere a categoria
    const [newCategory] = await db
      .insert(repertoireCategories)
      .values(category)
      .returning();
    
    // Insere as traduções
    const categoryTranslationsToInsert = translations.map(translation => ({
      ...translation,
      categoryId: newCategory.id
    }));
    
    const insertedTranslations = await db
      .insert(repertoireCategoryTranslations)
      .values(categoryTranslationsToInsert)
      .returning();
    
    // Retorna a categoria com suas traduções
    return {
      ...newCategory,
      translations: insertedTranslations
    };
  }
  
  // Repertoire methods
  async getRepertoire(categoryId?: number, languageCode?: string): Promise<RepertoireWithTranslations[]> {
    let repertoireData;
    
    if (categoryId) {
      repertoireData = await db.select().from(repertoire).where(eq(repertoire.categoryId, categoryId));
    } else {
      repertoireData = await db.select().from(repertoire);
    }
    
    const repertoireWithTranslations = await this.addTranslationsToRepertoire(repertoireData, languageCode);
    
    // Adiciona as informações de categoria com suas traduções
    if (repertoireWithTranslations.length > 0) {
      // Obter IDs de categorias únicos
      const uniqueCategoryIds: number[] = [];
      const categoryIdsSet = new Set<number>();
      
      repertoireWithTranslations.forEach(item => {
        if (!categoryIdsSet.has(item.categoryId)) {
          categoryIdsSet.add(item.categoryId);
          uniqueCategoryIds.push(item.categoryId);
        }
      });
      
      const categories = await Promise.all(
        uniqueCategoryIds.map(catId => this.getRepertoireCategory(catId, languageCode))
      );
      
      // Mapeia categorias por id
      const categoriesById = categories.reduce((acc, category) => {
        if (category) {
          acc[category.id] = category;
        }
        return acc;
      }, {} as Record<number, RepertoireCategoryWithTranslations>);
      
      // Adiciona categoria a cada item do repertório
      return repertoireWithTranslations.map(item => ({
        ...item,
        category: categoriesById[item.categoryId]
      }));
    }
    
    return repertoireWithTranslations;
  }
  
  async getRepertoireItem(id: number, languageCode?: string): Promise<RepertoireWithTranslations | undefined> {
    const [item] = await db.select().from(repertoire).where(eq(repertoire.id, id));
    
    if (!item) {
      return undefined;
    }
    
    const itemsWithTranslations = await this.addTranslationsToRepertoire([item], languageCode);
    const itemWithTranslations = itemsWithTranslations[0];
    
    // Adiciona a categoria com suas traduções
    const category = await this.getRepertoireCategory(item.categoryId, languageCode);
    
    return {
      ...itemWithTranslations,
      category
    };
  }
  
  private async addTranslationsToRepertoire(items: Repertoire[], languageCode?: string): Promise<RepertoireWithTranslations[]> {
    if (items.length === 0) {
      return [];
    }
    
    let translations;
    
    if (languageCode) {
      // Consulta por itens com filtro de idioma
      translations = await Promise.all(
        items.map(item => 
          db.select()
            .from(repertoireTranslations)
            .where(and(
              eq(repertoireTranslations.repertoireId, item.id),
              eq(repertoireTranslations.languageCode, languageCode)
            ))
        )
      ).then(results => results.flat());
    } else {
      // Consulta por todas as traduções para todos os itens
      translations = await Promise.all(
        items.map(item => 
          db.select()
            .from(repertoireTranslations)
            .where(eq(repertoireTranslations.repertoireId, item.id))
        )
      ).then(results => results.flat());
    }
    
    // Agrupar traduções por repertoireId
    const translationsByItemId = translations.reduce((acc, translation) => {
      if (!acc[translation.repertoireId]) {
        acc[translation.repertoireId] = [];
      }
      acc[translation.repertoireId].push(translation);
      return acc;
    }, {} as Record<number, RepertoireTranslation[]>);
    
    // Adicionar traduções a cada item
    return items.map(item => {
      return {
        ...item,
        translations: translationsByItemId[item.id] || []
      };
    });
  }
  
  async createRepertoire(item: InsertRepertoire, translations: InsertRepertoireTranslation[]): Promise<RepertoireWithTranslations> {
    // Insere o item
    const [newItem] = await db
      .insert(repertoire)
      .values(item)
      .returning();
    
    // Insere as traduções
    const itemTranslationsToInsert = translations.map(translation => ({
      ...translation,
      repertoireId: newItem.id
    }));
    
    const insertedTranslations = await db
      .insert(repertoireTranslations)
      .values(itemTranslationsToInsert)
      .returning();
    
    // Busca a categoria com traduções
    const category = await this.getRepertoireCategory(newItem.categoryId);
    
    // Retorna o item com suas traduções e categoria
    return {
      ...newItem,
      translations: insertedTranslations,
      category
    };
  }

  // Discography methods
  async getDiscographyItems(): Promise<any[]> {
    const items = await db.select().from(discography);
    return items;
  }

  async getDiscographyReviews(discographyId: number): Promise<any[]> {
    const reviews = await db
      .select({
        id: discographyReviews.id,
        reviewerName: discographyReviews.reviewerName,
        reviewText: discographyReviews.reviewText,
        rating: discographyReviews.rating,
        createdAt: discographyReviews.createdAt
      })
      .from(discographyReviews)
      .where(eq(discographyReviews.discographyId, discographyId))
      .orderBy(desc(discographyReviews.createdAt));
    
    return reviews;
  }

  async createDiscographyReview(reviewData: any): Promise<any> {
    const [newReview] = await db
      .insert(discographyReviews)
      .values(reviewData)
      .returning();
    return newReview;
  }
}

// Exportando a implementação de armazenamento usando banco de dados
export const storage = new DatabaseStorage();