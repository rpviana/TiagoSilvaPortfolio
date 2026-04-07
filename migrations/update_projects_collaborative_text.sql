-- Migration: Update Projects Collaborative Work Content
-- Created: 2026-04-05
-- Description: Updates collaborative work section with correct Portuguese and English text

-- Update Portuguese content
UPDATE public.site_content 
SET value_pt = 'Tiago participa ativamente em projetos interdisciplinares que ultrapassam os limites dos formatos tradicionais de concerto. Através de colaborações com artistas de diversas origens, ele explora novos contextos para experimentar música clássica e contemporânea.'
WHERE key = 'projects_collaborative_text1';

UPDATE public.site_content 
SET value_pt = 'Essas parcerias levaram a performances inovadoras que combinam música com dança, artes visuais, tecnologia e elementos específicos do local, criando experiências imersivas para o público.'
WHERE key = 'projects_collaborative_text2';

-- Update Portuguese collaborations
UPDATE public.site_content SET value_pt = 'Festival de Música Contemporânea - Ljubljana, Eslovênia (2022)' WHERE key = 'projects_collaboration1';
UPDATE public.site_content SET value_pt = 'Projeto de Artes Interdisciplinares com Artistas Visuais e Dançarinos - Barcelona, Espanha (2021)' WHERE key = 'projects_collaboration2';
UPDATE public.site_content SET value_pt = 'Workshop de Música Antiga com Especialistas em Performance Histórica - Antuérpia, Bélgica (2019)' WHERE key = 'projects_collaboration3';
UPDATE public.site_content SET value_pt = 'Programas Educacionais em Comunidades Rurais - Portugal (2018-Presente)' WHERE key = 'projects_collaboration4';

-- Update English content
UPDATE public.site_content 
SET value_en = 'Tiago actively participates in interdisciplinary projects that transcend the boundaries of traditional concert formats. Through collaborations with artists from diverse backgrounds, he explores new contexts for experiencing classical and contemporary music.'
WHERE key = 'projects_collaborative_text1';

UPDATE public.site_content 
SET value_en = 'These partnerships have led to innovative performances that combine music with dance, visual arts, technology and site-specific elements, creating immersive experiences for audiences.'
WHERE key = 'projects_collaborative_text2';

-- Update English collaborations
UPDATE public.site_content SET value_en = 'Contemporary Music Festival - Ljubljana, Slovenia (2022)' WHERE key = 'projects_collaboration1';
UPDATE public.site_content SET value_en = 'Interdisciplinary Arts Project with Visual Artists and Dancers - Barcelona, Spain (2021)' WHERE key = 'projects_collaboration2';
UPDATE public.site_content SET value_en = 'Early Music Workshop with Historical Performance Specialists - Antwerp, Belgium (2019)' WHERE key = 'projects_collaboration3';
UPDATE public.site_content SET value_en = 'Educational Programs in Rural Communities - Portugal (2018-Present)' WHERE key = 'projects_collaboration4';
