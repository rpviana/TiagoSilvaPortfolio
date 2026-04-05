import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import ProjectCard from '../components/ProjectCard';
import { Loader2 } from 'lucide-react';

interface ProjectTranslation {
  languageCode: string;
  title: string;
  description: string;
}

interface ProjectLink {
  type: string;
  url: string;
}

interface Project {
  id: number;
  imageUrl: string;
  order: number;
  translations: ProjectTranslation[];
  links: ProjectLink[];
}

interface SiteContent {
  key: string;
  valuePt: string;
  valueEn: string;
}

const Projects = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language === 'pt' || i18n.language?.toLowerCase().startsWith('pt') ? 'pt' : 'en';

  // Fetch projects from API
  const { data: projects = [], isLoading } = useQuery<Project[]>({
    queryKey: ['/api/projects', currentLang],
    queryFn: async () => {
      const response = await fetch(`/api/projects?lang=${currentLang}`);
      if (!response.ok) throw new Error('Failed to fetch projects');
      return response.json();
    },
  });

  // Fetch site content for customization
  const { data: siteContent = [] } = useQuery<SiteContent[]>({
    queryKey: ['/api/site-content'],
  });

  const getContent = (key: string, fallback: string = '') => {
    const content = siteContent.find(item => item.key === key);
    return currentLang === 'pt' ? (content?.valuePt || fallback) : (content?.valueEn || fallback);
  };

  const pageTitle = getContent('projects_title', 'Projetos e Conjuntos');
  const pageDescription = getContent('projects_description', 'Descubra os vários projetos artísticos e conjuntos nos quais Tiago está envolvido.');
  const bgColor = getContent('projects_bg_color', '#ffffff');
  const titleColor = getContent('projects_title_color', '#6B2D3A');
  
  const collaborativeTitle = getContent('projects_collaborative_title', 'Trabalho Colaborativo');
  const collaborativeText1 = getContent('projects_collaborative_text1');
  const collaborativeText2 = getContent('projects_collaborative_text2');
  const pastCollabTitle = getContent('projects_past_collaborations_title', 'Colaborações Passadas');
  const collaboration1 = getContent('projects_collaboration1');
  const collaboration2 = getContent('projects_collaboration2');
  const collaboration3 = getContent('projects_collaboration3');
  const collaboration4 = getContent('projects_collaboration4');
  
  const repertoireTitle = getContent('projects_repertoire_title', 'Repertório');
  const repertoireButton = getContent('projects_repertoire_button', 'Baixar Repertório (PDF)');
  const repertoireFile = currentLang === 'pt' 
    ? getContent('projects_repertoire_file_pt', '/RepertoireList_pt.pdf')
    : getContent('projects_repertoire_file_en', '/RepertoireList_en.pdf');

  return (
    <div className="pt-24">
      <section className="py-16 md:py-24" style={{ backgroundColor: bgColor }}>
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-4" style={{ color: titleColor }}>
                {pageTitle}
              </h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {pageDescription}
              </p>
            </motion.div>
            
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {projects.map((project, index) => {
                  const translation = project.translations.find(t => t.languageCode === currentLang) 
                    || project.translations[0];
                  
                  if (!translation) return null;

                  return (
                    <motion.div 
                      key={project.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                    >
                      <ProjectCard 
                        title={translation.title}
                        description={translation.description}
                        imageUrl={project.imageUrl}
                        links={project.links.map(link => ({ type: link.type as any, url: link.url }))}
                      />
                    </motion.div>
                  );
                })}
              </div>
            )}
            
            {/* Collaborative Work */}
            {collaborativeText1 && (
              <motion.div 
                className="mt-20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <h2 className="text-3xl font-playfair font-bold mb-8" style={{ color: titleColor }}>
                  {collaborativeTitle}
                </h2>
                
                <div className="bg-gray-50 p-8 rounded-lg shadow-md">
                  <div className="prose prose-lg max-w-none">
                    {collaborativeText1 && <p>{collaborativeText1}</p>}
                    {collaborativeText2 && <p>{collaborativeText2}</p>}
                    
                    {(collaboration1 || collaboration2 || collaboration3 || collaboration4) && (
                      <>
                        <h3 className="font-playfair mt-8 mb-4" style={{ color: titleColor }}>
                          {pastCollabTitle}
                        </h3>
                        
                        <ul className="list-disc pl-5 space-y-2">
                          {collaboration1 && <li>{collaboration1}</li>}
                          {collaboration2 && <li>{collaboration2}</li>}
                          {collaboration3 && <li>{collaboration3}</li>}
                          {collaboration4 && <li>{collaboration4}</li>}
                        </ul>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* Repertório Download */}
            <div className="flex flex-col items-center mt-20">
              <h2 className="text-2xl font-playfair font-semibold mb-4" style={{ color: titleColor }}>
                {repertoireTitle}
              </h2>
              <a
                href={repertoireFile}
                download
                className="inline-flex items-center justify-center w-full bg-white border px-8 py-4 rounded-full font-semibold text-lg shadow-lg transition-colors duration-200"
                style={{ 
                  borderColor: titleColor, 
                  color: titleColor 
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = titleColor;
                  e.currentTarget.style.color = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#ffffff';
                  e.currentTarget.style.color = titleColor;
                }}
              >
                <i className="fas fa-download mr-2"></i>
                {repertoireButton}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;

