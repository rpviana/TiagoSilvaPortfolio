-- Migration: Add Projects Page Customization Fields to site_content
-- Created: 2026-04-05
-- Description: Adds editable fields for Projects page (title, description, colors, collaborative work, etc.)

-- Insert Projects page customization fields
INSERT INTO public.site_content (key, value_pt, value_en, type) VALUES
  -- Page title and description
  ('projects_title', 'Projetos e Conjuntos', 'Projects and Ensembles', 'text'),
  ('projects_description', 'Descubra os vários projetos artísticos e conjuntos nos quais Tiago está envolvido, desde grupos de câmara até colaborações interdisciplinares.', 'Discover the various artistic projects and ensembles in which Tiago is involved, from chamber groups to interdisciplinary collaborations.', 'text'),
  
  -- Colors
  ('projects_bg_color', '#ffffff', '#ffffff', 'color'),
  ('projects_title_color', '#6B2D3A', '#6B2D3A', 'color'),
  ('projects_card_bg_color', '#ffffff', '#ffffff', 'color'),
  ('projects_button_color', '#6B2D3A', '#6B2D3A', 'color'),
  
  -- Collaborative Work section
  ('projects_collaborative_title', 'Trabalho Colaborativo', 'Collaborative Work', 'text'),
  ('projects_collaborative_text1', 'Tiago Silva está sempre aberto a novas colaborações e projetos musicais. Com experiência em conjuntos de câmara, orquestras e projetos interdisciplinares, ele valoriza o trabalho em equipa e a troca de ideias criativas.', 'Tiago Silva is always open to new collaborations and musical projects. With experience in chamber ensembles, orchestras and interdisciplinary projects, he values teamwork and the exchange of creative ideas.', 'textarea'),
  ('projects_collaborative_text2', 'Se está interessado em trabalhar com o Tiago, não hesite em contactá-lo através da página de contacto.', 'If you are interested in working with Tiago, please do not hesitate to contact him through the contact page.', 'textarea'),
  
  -- Past Collaborations section
  ('projects_past_collaborations_title', 'Colaborações Passadas', 'Past Collaborations', 'text'),
  ('projects_collaboration1', 'Orquestra Sinfónica do Porto Casa da Música', 'Porto Symphony Orchestra Casa da Música', 'text'),
  ('projects_collaboration2', 'Orquestra Clássica do Centro', 'Classical Orchestra of the Centre', 'text'),
  ('projects_collaboration3', 'Ensemble de Câmara da ESMAE', 'ESMAE Chamber Ensemble', 'text'),
  ('projects_collaboration4', 'Projetos interdisciplinares com dança contemporânea', 'Interdisciplinary projects with contemporary dance', 'text'),
  
  -- Repertoire section
  ('projects_repertoire_title', 'Repertório', 'Repertoire', 'text'),
  ('projects_repertoire_button', 'Baixar Repertório (PDF)', 'Download Repertoire (PDF)', 'text'),
  ('projects_repertoire_file_pt', '/RepertoireList_pt.pdf', '/RepertoireList_pt.pdf', 'text'),
  ('projects_repertoire_file_en', '/RepertoireList_en.pdf', '/RepertoireList_en.pdf', 'text')
ON CONFLICT (key) DO UPDATE SET
  value_pt = EXCLUDED.value_pt,
  value_en = EXCLUDED.value_en,
  type = EXCLUDED.type;
