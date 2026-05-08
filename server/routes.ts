import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { authenticateToken, requireAdmin, loginUser, AuthRequest } from "./auth";
import { insertMessageSchema, insertLanguageSchema, insertEventTranslationSchema, insertDiscographyReviewSchema, loginSchema, insertSiteContentSchema } from "@shared/schema";
import nodemailer from 'nodemailer';
import path from 'path';
import fs from 'fs';
import express from 'express';
import multer from 'multer';

// Multer config: save to attached_assets/, preserve extension
const uploadStorage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    const dir = path.resolve(import.meta.dirname, '..', 'attached_assets');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `upload_${Date.now()}${ext}`);
  },
});
const upload = multer({
  storage: uploadStorage,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('Only image files are allowed'));
  },
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Serve static assets from attached_assets directory
  app.use('/attached_assets', express.static(path.resolve(import.meta.dirname, '..', 'attached_assets')));

  // Image Upload Route
  app.post('/api/upload', authenticateToken, requireAdmin, upload.single('image'), (req: Request, res: Response) => {
    const multerReq = req as Request & { file?: Express.Multer.File };
    if (!multerReq.file) return res.status(400).json({ error: 'No file uploaded' });
    const url = `/attached_assets/${multerReq.file.filename}`;
    res.json({ url });
  });
  
  // Authentication routes
  app.post('/api/auth/login', async (req: Request, res: Response) => {
    try {
      const { email, password } = loginSchema.parse(req.body);
      const result = await loginUser(email, password);
      res.json(result);
    } catch (error: any) {
      console.error('Login error:', error);
      res.status(401).json({ error: error.message });
    }
  });

  app.get('/api/auth/me', authenticateToken, async (req: AuthRequest, res: Response) => {
    try {
      const user = await storage.getUser(req.user!.id);
      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }
      res.json({
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        isAdmin: user.isAdmin
      });
    } catch (error) {
      console.error('Get user error:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  });
  
  // API routes

  // Language routes
  app.get('/api/languages', async (req: Request, res: Response) => {
    try {
      const languages = await storage.getLanguages();
      res.json(languages);
    } catch (error) {
      console.error('Error fetching languages:', error);
      res.status(500).json({ message: 'Failed to fetch languages' });
    }
  });

  // Site Content Routes
  app.get('/api/site-content', async (req: Request, res: Response) => {
    try {
      const content = await storage.getAllSiteContent();
      res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
      res.json(content);
    } catch (error) {
      console.error('Error fetching site content:', error);
      res.status(500).json({ message: 'Failed to fetch site content' });
    }
  });

  app.post('/api/site-content', authenticateToken, requireAdmin, async (req: AuthRequest, res: Response) => {
    try {
      if (Array.isArray(req.body)) {
        const results = await Promise.all(
          req.body.map((item: any) => {
            const contentData = insertSiteContentSchema.parse(item);
            return storage.upsertSiteContent(contentData);
          })
        );
        return res.json(results);
      }
      
      const contentData = insertSiteContentSchema.parse(req.body);
      const result = await storage.upsertSiteContent(contentData);
      res.json(result);
    } catch (error: any) {
      console.log('Error updating site content data:', JSON.stringify(error));
      res.status(400).json({ message: 'Invalid site content data', error: error?.message || 'Unknown error' });
    }
  });

  app.post('/api/languages', async (req: Request, res: Response) => {
    try {
      const languageData = insertLanguageSchema.parse(req.body);
      const language = await storage.createLanguage(languageData);
      res.status(201).json(language);
    } catch (error: any) {
      console.error('Error creating language:', error);
      res.status(400).json({ 
        message: 'Invalid language data', 
        error: error.message 
      });
    }
  });

  // Event routes
  app.get('/api/events', async (req: Request, res: Response) => {
    try {
      const isPastStr = req.query.isPast as string | undefined;
      const languageCode = req.query.lang as string | undefined;
      let isPast: boolean | undefined = undefined;
      
      if (isPastStr !== undefined) {
        isPast = isPastStr === 'true';
      }
      
      const events = await storage.getEvents(isPast, languageCode);
      
      // Sort upcoming events by date (ascending)
      if (isPast === false) {
        events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      } 
      // Sort past events by date (descending)
      else if (isPast === true) {
        events.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      }
      
      res.json(events);
    } catch (error) {
      console.error('Error fetching events:', error);
      res.status(500).json({ message: 'Failed to fetch events' });
    }
  });
  
  app.get('/api/events/:id', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const languageCode = req.query.lang as string | undefined;
      
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid event ID' });
      }
      
      const event = await storage.getEvent(id, languageCode);
      
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }
      
      res.json(event);
    } catch (error) {
      console.error('Error fetching event:', error);
      res.status(500).json({ message: 'Failed to fetch event' });
    }
  });
  
  // Admin: Create event
  app.post('/api/events', authenticateToken, requireAdmin, async (req: AuthRequest, res: Response) => {
    try {
      const { event, translations } = req.body;
      
      if (!event || !translations || !Array.isArray(translations)) {
        return res.status(400).json({ message: 'Event and translations are required' });
      }
      
      // Converter a string ISO para objeto Date
      const eventWithDate = {
        ...event,
        date: new Date(event.date)
      };
      
      const newEvent = await storage.createEvent(eventWithDate, translations);
      res.status(201).json(newEvent);
    } catch (error: any) {
      console.error('Error creating event:', error);
      res.status(400).json({ message: 'Failed to create event', error: error?.message });
    }
  });
  
  // Admin: Update event
  app.put('/api/events/:id', authenticateToken, requireAdmin, async (req: AuthRequest, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid event ID' });
      }
      
      const { event, translations } = req.body;
      
      // Converter a string ISO para objeto Date se existir
      const eventWithDate = event && event.date ? {
        ...event,
        date: new Date(event.date)
      } : event;
      
      const updatedEvent = await storage.updateEvent(id, eventWithDate, translations);
      
      if (!updatedEvent) {
        return res.status(404).json({ message: 'Event not found' });
      }
      
      res.json(updatedEvent);
    } catch (error: any) {
      console.error('Error updating event:', error);
      res.status(400).json({ message: 'Failed to update event', error: error?.message });
    }
  });
  
  // Admin: Delete event
  app.delete('/api/events/:id', authenticateToken, requireAdmin, async (req: AuthRequest, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid event ID' });
      }
      
      const deleted = await storage.deleteEvent(id);
      
      if (!deleted) {
        return res.status(404).json({ message: 'Event not found' });
      }
      
      res.json({ message: 'Event deleted successfully' });
    } catch (error: any) {
      console.error('Error deleting event:', error);
      res.status(500).json({ message: 'Failed to delete event', error: error?.message });
    }
  });
  
  // Project routes
  app.get('/api/projects', async (req: Request, res: Response) => {
    try {
      const languageCode = req.query.lang as string | undefined;
      const projects = await storage.getProjects(languageCode);
      res.json(projects);
    } catch (error) {
      console.error('Error fetching projects:', error);
      res.status(500).json({ message: 'Failed to fetch projects' });
    }
  });
  
  app.get('/api/projects/:id', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const languageCode = req.query.lang as string | undefined;
      
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid project ID' });
      }
      
      const project = await storage.getProject(id, languageCode);
      
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }
      
      res.json(project);
    } catch (error) {
      console.error('Error fetching project:', error);
      res.status(500).json({ message: 'Failed to fetch project' });
    }
  });
  
  // Admin: Create project
  app.post('/api/projects', authenticateToken, requireAdmin, async (req: AuthRequest, res: Response) => {
    try {
      const { project, translations, links } = req.body;
      
      if (!project || !translations || !Array.isArray(translations)) {
        return res.status(400).json({ message: 'Project and translations are required' });
      }
      
      const linksArray = Array.isArray(links) ? links : [];
      const newProject = await storage.createProject(project, translations, linksArray);
      res.status(201).json(newProject);
    } catch (error: any) {
      console.error('Error creating project:', error);
      res.status(400).json({ message: 'Failed to create project', error: error?.message });
    }
  });
  
  // Admin: Update project
  app.put('/api/projects/:id', authenticateToken, requireAdmin, async (req: AuthRequest, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid project ID' });
      }
      
      const { project, translations, links } = req.body;
      const updatedProject = await storage.updateProject(id, project, translations, links);
      
      if (!updatedProject) {
        return res.status(404).json({ message: 'Project not found' });
      }
      
      res.json(updatedProject);
    } catch (error: any) {
      console.error('Error updating project:', error);
      res.status(400).json({ message: 'Failed to update project', error: error?.message });
    }
  });
  
  // Admin: Delete project
  app.delete('/api/projects/:id', authenticateToken, requireAdmin, async (req: AuthRequest, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid project ID' });
      }
      
      const deleted = await storage.deleteProject(id);
      
      if (!deleted) {
        return res.status(404).json({ message: 'Project not found' });
      }
      
      res.json({ message: 'Project deleted successfully' });
    } catch (error: any) {
      console.error('Error deleting project:', error);
      res.status(500).json({ message: 'Failed to delete project', error: error?.message });
    }
  });
  
  // Repertoire category routes
  app.get('/api/repertoire/categories', async (req: Request, res: Response) => {
    try {
      const languageCode = req.query.lang as string | undefined;
      const categories = await storage.getRepertoireCategories(languageCode);
      res.json(categories);
    } catch (error) {
      console.error('Error fetching repertoire categories:', error);
      res.status(500).json({ message: 'Failed to fetch repertoire categories' });
    }
  });
  
  // Repertoire routes
  app.get('/api/repertoire', async (req: Request, res: Response) => {
    try {
      const categoryId = req.query.categoryId ? parseInt(req.query.categoryId as string) : undefined;
      const languageCode = req.query.lang as string | undefined;
      
      const repertoire = await storage.getRepertoire(categoryId, languageCode);
      res.json(repertoire);
    } catch (error) {
      console.error('Error fetching repertoire:', error);
      res.status(500).json({ message: 'Failed to fetch repertoire' });
    }
  });
  
  app.get('/api/repertoire/:id', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const languageCode = req.query.lang as string | undefined;
      
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid repertoire ID' });
      }
      
      const item = await storage.getRepertoireItem(id, languageCode);
      
      if (!item) {
        return res.status(404).json({ message: 'Repertoire item not found' });
      }
      
      res.json(item);
    } catch (error) {
      console.error('Error fetching repertoire item:', error);
      res.status(500).json({ message: 'Failed to fetch repertoire item' });
    }
  });
  
  // Contact form route
  app.post('/api/contact', async (req: Request, res: Response) => {
    try {
      const messageData = insertMessageSchema.parse(req.body);
      
      // Store the message
      const message = await storage.createMessage(messageData);
      
      // Send email notification - this is configured to use a mock service for development
      // In production, you would use a real email provider
      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST || 'smtp.example.com',
        port: parseInt(process.env.EMAIL_PORT || '587'),
        secure: process.env.EMAIL_SECURE === 'true',
        auth: {
          user: process.env.EMAIL_USER || 'user@example.com',
          pass: process.env.EMAIL_PASSWORD || 'password',
        },
      });
      
      // Build email content
      await transporter.sendMail({
        from: process.env.EMAIL_FROM || 'portfolio@example.com',
        to: process.env.EMAIL_TO || 'tiagosilva.05.2000@gmail.com',
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
          <p>${messageData.message.replace(/\n/g, '<br>')}</p>
        `,
      }).catch(err => {
        console.log('Email sending failed:', err);
        // Continue execution even if email fails
      });
      
      res.status(201).json({ 
        message: 'Message sent successfully',
        id: message.id 
      });
    } catch (error: any) {
      console.error('Error processing contact form:', error);
      res.status(400).json({ 
        message: 'Invalid form data', 
        error: error.message 
      });
    }
  });

  // Discography routes
  app.get('/api/discography', async (req: Request, res: Response) => {
    try {
      const discographyItems = await storage.getDiscographyItems();
      res.json(discographyItems);
    } catch (error) {
      console.error('Error fetching discography:', error);
      res.status(500).json({ error: 'Failed to fetch discography' });
    }
  });

  app.get('/api/discography/:id/reviews', async (req: Request, res: Response) => {
    try {
      const discographyId = parseInt(req.params.id);
      if (isNaN(discographyId)) {
        return res.status(400).json({ error: 'Invalid discography ID' });
      }
      
      const language = req.query.lang as string || 'pt';
      const reviews = await storage.getDiscographyReviews(discographyId, language);
      res.json(reviews);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      res.status(500).json({ error: 'Failed to fetch reviews' });
    }
  });

  app.post('/api/discography/reviews', async (req: Request, res: Response) => {
    try {
      const reviewData = insertDiscographyReviewSchema.parse(req.body);
      const review = await storage.createDiscographyReview(reviewData);
      res.status(201).json(review);
    } catch (error: any) {
      console.error('Error creating review:', error);
      if (error.message?.includes('duplicate') || error.code === '23505') {
        res.status(409).json({ error: 'Já existe uma crítica sua para este álbum' });
      } else {
        res.status(400).json({ error: 'Invalid review data' });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
