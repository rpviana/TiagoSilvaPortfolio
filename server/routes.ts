import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertMessageSchema } from "@shared/schema";
import nodemailer from 'nodemailer';
import path from 'path';

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  app.get('/api/events', async (req: Request, res: Response) => {
    try {
      const isPastStr = req.query.isPast as string | undefined;
      let isPast: boolean | undefined = undefined;
      
      if (isPastStr !== undefined) {
        isPast = isPastStr === 'true';
      }
      
      const events = await storage.getEvents(isPast);
      
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
  
  app.get('/api/repertoire', async (req: Request, res: Response) => {
    try {
      const category = req.query.category as string | undefined;
      const repertoire = await storage.getRepertoire(category);
      res.json(repertoire);
    } catch (error) {
      console.error('Error fetching repertoire:', error);
      res.status(500).json({ message: 'Failed to fetch repertoire' });
    }
  });
  
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

  const httpServer = createServer(app);
  return httpServer;
}
