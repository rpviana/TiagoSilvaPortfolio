import { 
  User, InsertUser, 
  Message, InsertMessage, 
  Event, InsertEvent, 
  Repertoire, InsertRepertoire,
  users, messages, events, repertoire
} from "@shared/schema";

import { db } from "./db";
import { eq } from "drizzle-orm";

// Storage interface
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Message methods
  createMessage(message: InsertMessage): Promise<Message>;
  getMessages(): Promise<Message[]>;
  
  // Event methods
  getEvents(isPast?: boolean): Promise<Event[]>;
  createEvent(event: InsertEvent): Promise<Event>;
  
  // Repertoire methods
  getRepertoire(category?: string): Promise<Repertoire[]>;
  createRepertoire(repertoire: InsertRepertoire): Promise<Repertoire>;
}

// Classe de armazenamento em memória (mantida como referência)
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private messages: Map<number, Message>;
  private events: Map<number, Event>;
  private repertoireItems: Map<number, Repertoire>;
  
  private userId: number;
  private messageId: number;
  private eventId: number;
  private repertoireId: number;
  
  constructor() {
    this.users = new Map<number, User>();
    this.messages = new Map<number, Message>();
    this.events = new Map<number, Event>();
    this.repertoireItems = new Map<number, Repertoire>();
    
    this.userId = 1;
    this.messageId = 1;
    this.eventId = 1;
    this.repertoireId = 1;
    
    // Initialize with sample data
    this.initializeData();
  }
  
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }
  
  async getUserByUsername(username: string): Promise<User | undefined> {
    for (const user of this.users.values()) {
      if (user.username === username) {
        return user;
      }
    }
    
    return undefined;
  }
  
  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  async createMessage(message: InsertMessage): Promise<Message> {
    const id = this.messageId++;
    const createdAt = new Date();
    
    const newMessage: Message = {
      ...message,
      id,
      createdAt
    };
    
    this.messages.set(id, newMessage);
    return newMessage;
  }
  
  async getMessages(): Promise<Message[]> {
    return Array.from(this.messages.values());
  }
  
  async getEvents(isPast?: boolean): Promise<Event[]> {
    const events = Array.from(this.events.values());
    
    if (isPast !== undefined) {
      return events.filter(event => event.isPast === isPast);
    }
    
    return events;
  }
  
  async createEvent(event: InsertEvent): Promise<Event> {
    const id = this.eventId++;
    // Ensure properties have default values if undefined
    const newEvent: Event = { 
      ...event, 
      id, 
      isPast: event.isPast === undefined ? false : event.isPast,
      bookingLink: event.bookingLink === undefined ? null : event.bookingLink,
      programLink: event.programLink === undefined ? null : event.programLink
    };
    this.events.set(id, newEvent);
    return newEvent;
  }
  
  // Repertoire methods
  async getRepertoire(category?: string): Promise<Repertoire[]> {
    const repertoire = Array.from(this.repertoireItems.values());
    
    if (category) {
      return repertoire.filter(item => item.category === category);
    }
    
    return repertoire;
  }
  
  async createRepertoire(repertoire: InsertRepertoire): Promise<Repertoire> {
    const id = this.repertoireId++;
    const newRepertoire: Repertoire = { ...repertoire, id };
    this.repertoireItems.set(id, newRepertoire);
    return newRepertoire;
  }
  
  // Initialize with sample data
  private initializeData() {
    // Create upcoming events
    this.createEvent({
      title: "Bach & Contemporary Reflections",
      date: new Date("2023-10-15T19:30:00"),
      time: "7:30 PM",
      venue: "Wigmore Hall, London, UK",
      description: "A solo recital exploring J.S. Bach's Partita No. 2 alongside contemporary works inspired by Bach's musical language, featuring compositions by Sofia Gubaidulina and Thomas Adès.",
      isPast: false,
      bookingLink: "#",
      programLink: "#"
    });
    
    this.createEvent({
      title: "Brett Dean's \"Eclipse\" with 97 Ensemble",
      date: new Date("2023-11-03T20:00:00"),
      time: "8:00 PM",
      venue: "Kings Place, London, UK",
      description: "Performing Brett Dean's String Quartet No. 1 \"Eclipse\" alongside works by Beethoven and Shostakovich in a program exploring musical dialogues across centuries.",
      isPast: false,
      bookingLink: "#",
      programLink: "#"
    });
    
    this.createEvent({
      title: "Winter Solstice: Music and Light",
      date: new Date("2023-12-22T19:00:00"),
      time: "7:00 PM",
      venue: "St. Martin-in-the-Fields, London, UK",
      description: "A special collaborative performance with Constelação 15, combining violin music with visual projections and lighting design to create an immersive solstice celebration.",
      isPast: false,
      bookingLink: "#",
      programLink: "#"
    });
    
    // Create past events
    this.createEvent({
      title: "Tiago Soares Silva: Solo Recital",
      date: new Date("2023-06-10T19:00:00"),
      time: "7:00 PM",
      venue: "Royal Academy of Music, London, UK",
      description: "A solo program featuring works by Bach, Ysaÿe, and contemporary composers.",
      isPast: true,
      bookingLink: "#",
      programLink: "#"
    });
    
    this.createEvent({
      title: "Chamber Music Festival",
      date: new Date("2023-04-22T18:30:00"),
      time: "6:30 PM",
      venue: "Barbican Centre, London, UK",
      description: "Performing in various chamber ensembles, including works by Beethoven, Brahms, and Debussy.",
      isPast: true,
      bookingLink: "#",
      programLink: "#"
    });
    
    // Add repertoire items
    
    // Solo Performances
    this.createRepertoire({
      composer: "J.S. Bach",
      title: "Sonatas and Partitas for Solo Violin",
      category: "Solo Performances"
    });
    
    this.createRepertoire({
      composer: "Niccolò Paganini",
      title: "24 Caprices, Op. 1",
      category: "Solo Performances"
    });
    
    this.createRepertoire({
      composer: "Eugene Ysaÿe",
      title: "Six Sonatas for Solo Violin, Op. 27",
      category: "Solo Performances"
    });
    
    this.createRepertoire({
      composer: "Heinrich Ignaz Franz Biber",
      title: "Mystery (Rosary) Sonatas",
      category: "Solo Performances"
    });
    
    this.createRepertoire({
      composer: "Béla Bartók",
      title: "Sonata for Solo Violin, Sz. 117",
      category: "Solo Performances"
    });
    
    // Violin Concertos
    this.createRepertoire({
      composer: "Ludwig van Beethoven",
      title: "Violin Concerto in D major, Op. 61",
      category: "Violin Concertos"
    });
    
    this.createRepertoire({
      composer: "Johannes Brahms",
      title: "Violin Concerto in D major, Op. 77",
      category: "Violin Concertos"
    });
    
    this.createRepertoire({
      composer: "Felix Mendelssohn",
      title: "Violin Concerto in E minor, Op. 64",
      category: "Violin Concertos"
    });
    
    this.createRepertoire({
      composer: "Sergei Prokofiev",
      title: "Violin Concertos No. 1 & 2",
      category: "Violin Concertos"
    });
    
    this.createRepertoire({
      composer: "Philip Glass",
      title: "Violin Concerto No. 1",
      category: "Violin Concertos"
    });
    
    // Chamber Music
    this.createRepertoire({
      composer: "Ludwig van Beethoven",
      title: "Complete String Quartets",
      category: "Chamber Music"
    });
    
    this.createRepertoire({
      composer: "Maurice Ravel",
      title: "String Quartet in F major",
      category: "Chamber Music"
    });
    
    this.createRepertoire({
      composer: "Brett Dean",
      title: "Eclipse (String Quartet No. 1)",
      category: "Chamber Music"
    });
    
    this.createRepertoire({
      composer: "Dmitri Shostakovich",
      title: "String Quartets No. 8 & 15",
      category: "Chamber Music"
    });
    
    this.createRepertoire({
      composer: "Justin Connolly",
      title: "Music for Strings",
      category: "Chamber Music"
    });
    
    // Contemporary Works
    this.createRepertoire({
      composer: "Kaija Saariaho",
      title: "Nocturne for Solo Violin",
      category: "Contemporary Works"
    });
    
    this.createRepertoire({
      composer: "John Adams",
      title: "Road Movies for Violin and Piano",
      category: "Contemporary Works"
    });
    
    this.createRepertoire({
      composer: "Thomas Adès",
      title: "Arcadiana (String Quartet)",
      category: "Contemporary Works"
    });
    
    this.createRepertoire({
      composer: "Sofia Gubaidulina",
      title: "Offertorium (Violin Concerto)",
      category: "Contemporary Works"
    });
    
    this.createRepertoire({
      composer: "Luciano Berio",
      title: "Sequenza VIII for Violin",
      category: "Contemporary Works"
    });
  }
}

// Implementação do armazenamento usando banco de dados
export class DatabaseStorage implements IStorage {
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
  
  async getEvents(isPast?: boolean): Promise<Event[]> {
    const query = db.select().from(events);
    
    if (isPast !== undefined) {
      return await query.where(eq(events.isPast, isPast));
    }
    
    return await query;
  }
  
  async createEvent(event: InsertEvent): Promise<Event> {
    // Ensure properties have default values if undefined
    const insertData = { 
      ...event, 
      isPast: event.isPast === undefined ? false : event.isPast,
      bookingLink: event.bookingLink === undefined ? null : event.bookingLink,
      programLink: event.programLink === undefined ? null : event.programLink
    };
    
    const [newEvent] = await db
      .insert(events)
      .values(insertData)
      .returning();
    return newEvent;
  }
  
  async getRepertoire(category?: string): Promise<Repertoire[]> {
    const query = db.select().from(repertoire);
    
    if (category) {
      return await query.where(eq(repertoire.category, category));
    }
    
    return await query;
  }
  
  async createRepertoire(repertoireItem: InsertRepertoire): Promise<Repertoire> {
    const [newRepertoire] = await db
      .insert(repertoire)
      .values(repertoireItem)
      .returning();
    return newRepertoire;
  }
}

// Exportando a implementação de armazenamento usando banco de dados
export const storage = new DatabaseStorage();