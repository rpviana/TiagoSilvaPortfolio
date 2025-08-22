import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import ProjectCard from '../components/ProjectCard';

const Projects = () => {
  const { t, i18n } = useTranslation();

  // Project data
  const projects = [
    {
      title: "9007 Ensemble",
      description: t('projects.97ensemble.description'),
      imageUrl: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      links: [
        { type: "website" as const, url: "https://97ensemble.com/" },
        { type: "instagram" as const, url: "https://www.instagram.com/97ensemble/" }
      ]
    },
    {
      title: "Constelação 15",
      description: t('projects.constelacao15.description'),
      imageUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      links: [
        { type: "website" as const, url: "https://www.constellation15.co.uk/" }
      ]
    },
    {
      title: "FAMART",
      description: t('projects.famart.description'),
      imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80",
      links: [
        { type: "instagram" as const, url: "https://www.instagram.com/famart.plataforma/" },
        { type: "facebook" as const, url: "https://www.facebook.com/share/19B77iPAWk/" }
      ]
    }
  ];

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
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                >
                  <ProjectCard 
                    title={project.title}
                    description={project.description}
                    imageUrl={project.imageUrl}
                    links={project.links}
                  />
                </motion.div>
              ))}
            </div>
            
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

