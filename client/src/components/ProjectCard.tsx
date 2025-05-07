import { useTranslation } from 'react-i18next';

interface SocialLink {
  type: 'website' | 'instagram' | 'facebook';
  url: string;
}

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
  links: SocialLink[];
}

const ProjectCard = ({ title, description, imageUrl, links }: ProjectCardProps) => {
  const { t } = useTranslation();
  
  return (
    <div className="bg-gray-50 rounded-lg shadow-md overflow-hidden h-full flex flex-col">
      <div className="aspect-w-16 aspect-h-9 h-48">
        <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-playfair font-bold mb-3 text-primary">{title}</h3>
        <p className="text-gray-700 text-sm mb-4 flex-grow">
          {description}
        </p>
        
        <div className="flex items-center gap-3 mb-4">
          {links.map((link, index) => (
            <a 
              key={index}
              href={link.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:text-primary-dark transition-colors"
              aria-label={`${title} ${link.type}`}
            >
              <i className={`fas fa-${link.type === 'website' ? 'globe' : `fab fa-${link.type}`}`}></i>
            </a>
          ))}
        </div>
        
        {links.some(link => link.type === 'website') && (
          <a 
            href={links.find(link => link.type === 'website')?.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block bg-white border border-primary text-primary hover:bg-primary hover:text-white px-4 py-2 rounded-lg text-sm transition-colors"
          >
            {t('projects.visitWebsite')}
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
