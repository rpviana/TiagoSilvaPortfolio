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

const Projects = () => {
  const { t, i18n } = useTranslation();
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

  // Lógica para o ficheiro de repertório
  const isPt = i18n.language === 'pt' || i18n.language?.toLowerCase().startsWith('pt');
  const repertoireFile = isPt
    ? '/RepertoireList_pt.pdf'
    : '/RepertoireList_en.pdf';
  const repertoireTitle = t('projects.repertoire') || (isPt ? "Repertório" : "Repertoire");
  const repertoireLabel = isPt
    ? "Baixar Repertório (PDF)"
    : "Download Repertoire (PDF)";

  return (
    <div className="pt-24">
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-4 text-primary">
                {t('projects.title')}
              </h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {t('projects.description')}
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
            <motion.div 
              className="mt-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <h2 className="text-3xl font-playfair font-bold mb-8 text-primary">
                {t('projects.collaborativeWork')}
              </h2>
              
              <div className="bg-gray-50 p-8 rounded-lg shadow-md">
                <div className="prose prose-lg max-w-none">
                  <p>{t('projects.collaborativeWorkText1')}</p>
                  <p>{t('projects.collaborativeWorkText2')}</p>
                  
                  <h3 className="font-playfair text-primary mt-8 mb-4">
                    {t('projects.pastCollaborations')}
                  </h3>
                  
                  <ul className="list-disc pl-5 space-y-2">
                    <li>{t('projects.collaboration1')}</li>
                    <li>{t('projects.collaboration2')}</li>
                    <li>{t('projects.collaboration3')}</li>
                    <li>{t('projects.collaboration4')}</li>
                  </ul>
                </div>
              </div>
            </motion.div>
            
            {/* Repertório Download - agora no fundo */}
            <div className="flex flex-col items-center mt-20">
              <h2 className="text-2xl font-playfair font-semibold text-purple mb-4">
                {repertoireTitle}
              </h2>
              <a
                href={repertoireFile}
                download
                className="inline-flex items-center justify-center w-full bg-white border border-primary text-primary hover:bg-primary hover:text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg transition-colors duration-200"
              >
                <i className="fas fa-download mr-2"></i>
                {repertoireLabel}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;

