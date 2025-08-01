import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertMessageSchema, insertLanguageSchema, insertEventTranslationSchema, insertDiscographyReviewSchema } from "@shared/schema";
import nodemailer from 'nodemailer';
import path from 'path';
import express from 'express';

export async function registerRoutes(app: Express): Promise<Server> {
  // Serve static assets from attached_assets directory
  app.use('/attached_assets', express.static(path.resolve(import.meta.dirname, '..', 'attached_assets')));
  
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
      
      const reviews = await storage.getDiscographyReviews(discographyId);
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
