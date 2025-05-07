import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';

const About = () => {
  const { t } = useTranslation();
  
  return (
    <div className="pt-24">
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.h1 
              className="text-4xl md:text-5xl font-playfair font-bold mb-12 text-primary text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {t('about.title')}
            </motion.h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {/* Left column - Photo */}
              <motion.div 
                className="md:col-span-1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="sticky top-24">
                  <img 
                    src="/attached_assets/Tiago-Violino-52.JPG" 
                    alt="Tiago Soares Silva" 
                    className="w-full h-auto rounded-lg shadow-lg mb-6"
                  />
                  
                  <a 
                    href="#" 
                    className="inline-flex items-center justify-center w-full bg-white border border-primary text-primary hover:bg-primary hover:text-white px-4 py-3 rounded-lg transition-colors"
                  >
                    <Download size={18} className="mr-2" />
                    {t('about.downloadCV')}
                  </a>
                </div>
              </motion.div>
              
              {/* Right column - Biography */}
              <motion.div 
                className="md:col-span-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="prose prose-lg max-w-none">
                  <h2 className="font-playfair text-primary">{t('about.shortBio.title')}</h2>
                  <p>{t('about.shortBio.paragraph1')}</p>
                  <p>{t('about.shortBio.paragraph2')}</p>
                  
                  <h2 className="font-playfair text-primary mt-10">{t('about.fullBio.title')}</h2>
                  <p>{t('about.fullBio.paragraph1')}</p>
                  <p>{t('about.fullBio.paragraph2')}</p>
                  <p>{t('about.fullBio.paragraph3')}</p>
                  <p>{t('about.fullBio.paragraph4')}</p>
                  
                  <h2 className="font-playfair text-primary mt-10">{t('about.education.title')}</h2>
                  <ul>
                    <li>{t('about.education.item1')}</li>
                    <li>{t('about.education.item2')}</li>
                    <li>{t('about.education.item3')}</li>
                  </ul>
                  
                  <h2 className="font-playfair text-primary mt-10">{t('about.awards.title')}</h2>
                  <ul>
                    <li>{t('about.awards.item1')}</li>
                    <li>{t('about.awards.item2')}</li>
                    <li>{t('about.awards.item3')}</li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
