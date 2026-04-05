-- Migration: Add Projects Tables
-- Created: 2026-04-05
-- Description: Adds projects, project_translations, and project_links tables

-- Create projects table
CREATE TABLE IF NOT EXISTS public.projects (
    id SERIAL PRIMARY KEY,
    image_url TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Create project_translations table
CREATE TABLE IF NOT EXISTS public.project_translations (
    id SERIAL PRIMARY KEY,
    project_id INTEGER NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    language_code VARCHAR(2) NOT NULL REFERENCES public.languages(code),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    UNIQUE(project_id, language_code)
);

-- Create project_links table
CREATE TABLE IF NOT EXISTS public.project_links (
    id SERIAL PRIMARY KEY,
    project_id INTEGER NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    type VARCHAR(20) NOT NULL,
    url TEXT NOT NULL
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_project_translations_project_id ON public.project_translations(project_id);
CREATE INDEX IF NOT EXISTS idx_project_translations_language ON public.project_translations(language_code);
CREATE INDEX IF NOT EXISTS idx_project_links_project_id ON public.project_links(project_id);
CREATE INDEX IF NOT EXISTS idx_projects_order ON public.projects("order");

-- Grant permissions (adjust if needed)
ALTER TABLE public.projects OWNER TO postgres;
ALTER TABLE public.project_translations OWNER TO postgres;
ALTER TABLE public.project_links OWNER TO postgres;
