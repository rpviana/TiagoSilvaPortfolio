-- Passo 1: Verificar se os dados estão na base de dados
SELECT key, 
       LEFT(value_pt, 80) as preview_pt,
       LEFT(value_en, 80) as preview_en
FROM site_content 
WHERE key LIKE 'projects_collaborative%'
   OR key LIKE 'projects_collaboration%'
ORDER BY key;

-- Se não houver resultados acima (ou estiverem vazios), executar este INSERT:
-- (Descomenta estas linhas abaixo)

/*
INSERT INTO site_content (key, value_pt, value_en, type) VALUES
  ('projects_collaborative_title', 'Trabalho Colaborativo', 'Collaborative Work', 'text'),
  ('projects_collaborative_text1', 'Tiago Silva está sempre aberto a novas colaborações e projetos musicais. Com experiência em conjuntos de câmara, orquestras e projetos interdisciplinares, ele valoriza o trabalho em equipa e a troca de ideias criativas.', 'Tiago Silva is always open to new collaborations and musical projects. With experience in chamber ensembles, orchestras and interdisciplinary projects, he values teamwork and the exchange of creative ideas.', 'textarea'),
  ('projects_collaborative_text2', 'Se está interessado em trabalhar com o Tiago, não hesite em contactá-lo através da página de contacto.', 'If you are interested in working with Tiago, please do not hesitate to contact him through the contact page.', 'textarea'),
  ('projects_past_collaborations_title', 'Colaborações Passadas', 'Past Collaborations', 'text'),
  ('projects_collaboration1', 'Orquestra Sinfónica do Porto Casa da Música', 'Porto Symphony Orchestra Casa da Música', 'text'),
  ('projects_collaboration2', 'Orquestra Clássica do Centro', 'Classical Orchestra of the Centre', 'text'),
  ('projects_collaboration3', 'Ensemble de Câmara da ESMAE', 'ESMAE Chamber Ensemble', 'text'),
  ('projects_collaboration4', 'Projetos interdisciplinares com dança contemporânea', 'Interdisciplinary projects with contemporary dance', 'text')
ON CONFLICT (key) DO UPDATE SET 
  value_pt = EXCLUDED.value_pt, 
  value_en = EXCLUDED.value_en, 
  type = EXCLUDED.type;
*/

-- Passo 2: Depois de inserir, verificar novamente
-- SELECT key, value_pt FROM site_content WHERE key LIKE 'projects_collaborative%' ORDER BY key;
