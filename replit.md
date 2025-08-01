# Overview

This is a multilingual artist portfolio website for Tiago Soares Silva, a professional violinist. The application showcases his performances, recordings, projects, and upcoming events through a modern, responsive web interface. The site supports both English and Portuguese languages and features a contact form, event management system, and media galleries.

# User Preferences

Preferred communication style: Simple, everyday language.

# Recent Changes

## Authentication System (January 2025)
- Implemented simple prompt-based login system with hardcoded credentials
- Username: TiagoSilva, Password: portfolio
- Authentication state saved in localStorage for persistence
- Admin panel accessible at /admin with comprehensive content management interface
- User requested functional admin panel for complete content control without coding

## Admin Panel Features
- Biography & About section management
- Events & Concerts management
- Photo gallery management
- Discography & Audio management
- Reviews & Testimonials management
- Contact messages viewing
- General site settings
- Translation management (Portuguese/English)
- Site statistics and reporting

# System Architecture

## Frontend Architecture

The frontend uses a **React Single Page Application (SPA)** with TypeScript:

- **Framework**: React 18 with TypeScript for type safety
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with custom design system using Playfair Display and Raleway fonts
- **UI Components**: Radix UI primitives with shadcn/ui component library for consistent, accessible components
- **Animations**: Framer Motion for smooth page transitions and interactive elements
- **State Management**: TanStack Query for server state management and caching
- **Internationalization**: React i18next for multilingual support (English/Portuguese)

The application follows a **component-based architecture** with:
- Page components for main routes (Home, About, Gallery, etc.)
- Reusable UI components (EventCard, ProjectCard, ContactForm)
- Custom hooks for language management and mobile detection
- Centralized styling with CSS custom properties for theming

## Backend Architecture

The backend implements a **RESTful API** using Express.js:

- **Framework**: Express.js with TypeScript
- **Database ORM**: Drizzle ORM for type-safe database operations
- **API Design**: RESTful endpoints with proper HTTP status codes
- **File Structure**: Modular routing with separate storage layer abstraction
- **Development Tools**: Vite for development server and hot module replacement

Key backend features:
- Contact form submission with email integration (Nodemailer)
- Event management with multilingual support
- Language switching functionality
- Session management for potential admin features

## Database Schema

The application uses a **PostgreSQL database** with the following core entities:

- **Languages**: Supports multiple languages with default language settings
- **Events**: Concert and performance data with date, venue, and booking information
- **Event Translations**: Localized event titles and descriptions
- **Repertoire**: Musical pieces organized by categories
- **Repertoire Categories**: Classification system for musical works
- **Messages**: Contact form submissions
- **Users**: Basic user management for potential admin functionality

The schema supports **full internationalization** through translation tables that link to base entities.

## Authentication & Authorization

Currently implements basic user schema for future admin functionality. The contact form is publicly accessible without authentication requirements.

## Content Management

- **Multilingual Content**: Translation system allows content in multiple languages
- **Media Assets**: Static file serving for images and audio files
- **Event Management**: CRUD operations for concert listings and event details
- **Repertoire Management**: Categorized musical repertoire with translations

## Performance Optimizations

- **Query Optimization**: TanStack Query for efficient data fetching and caching
- **Image Optimization**: Responsive image loading in gallery components
- **Code Splitting**: React lazy loading for optimal bundle sizes
- **SEO**: Meta tags and semantic HTML for search engine optimization

# External Dependencies

## Database Services
- **Neon Database**: PostgreSQL hosting service using `@neondatabase/serverless` for connection pooling and serverless compatibility

## UI & Styling
- **Radix UI**: Accessible component primitives for complex UI elements (modals, dropdowns, forms)
- **Tailwind CSS**: Utility-first CSS framework with custom configuration
- **shadcn/ui**: Pre-built component library built on Radix UI primitives
- **Framer Motion**: Animation library for smooth transitions and interactions

## Development & Build Tools
- **Vite**: Fast development server and build tool with TypeScript support
- **Drizzle Kit**: Database migration and schema management tools
- **ESBuild**: Fast JavaScript bundler for production builds

## Communication Services
- **Nodemailer**: Email sending functionality for contact form submissions

## Content & Media
- **Font Awesome**: Icon library for social media and UI icons
- **Google Fonts**: Custom typography (Playfair Display, Raleway)

## Data Management
- **TanStack Query**: Server state management with caching and synchronization
- **React Hook Form**: Form management with Zod validation
- **date-fns**: Date manipulation and formatting utilities

## Internationalization
- **React i18next**: Complete internationalization framework supporting multiple languages with translation files and language switching