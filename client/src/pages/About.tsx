import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';

const DownloadBioButton = ({ bioFile, label }: { bioFile: string; label: string }) => ( 
  <a
    href={bioFile}
    download
    className="inline-flex items-center gap-2 px-5 py-2 rounded-full font-semibold bg-gradient-to-r from-primary to-blue-500 text-white shadow-lg hover:from-blue-500 hover:to-primary hover:scale-105 transition-all duration-200 mb-4"
    title={label}
  >
    <Download size={20} />
    {label}
  </a>
);

const About = () => {
  const { t, i18n } = useTranslation();

  const cvFile = i18n.language === 'en' ? '/cv-en.pdf' : '/cv-pt.pdf';
  const smallBioFile = i18n.language === 'en' ? '/Tiago_SmallBiography_en.pdf' : '/Tiago_PequenaBiografia_pt.pdf';
  const fullBioFile = i18n.language === 'en' ? '/Tiago_FullBiography_en.pdf' : '/Tiago_BiografiaCompleta_pt.pdf';

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
                    href={cvFile}
                    download
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
                  {/* Short Bio */}
                  <div className="mb-10">
                    <h2 className="font-playfair text-primary mb-2">{t('about.shortBio.title')}</h2>
                    <p>{t('about.shortBio.paragraph1')}</p>
                    <p>{t('about.shortBio.paragraph2')}</p>
                    <a
                      href={smallBioFile}
                      download
                      className="inline-flex items-center justify-center bg-white border border-primary text-primary hover:bg-primary hover:text-white px-3 py-1.5 rounded-lg transition-colors mt-4 no-underline text-sm"
                      style={{ textDecoration: 'none' }}
                    >
                      <Download size={16} className="mr-2" />
                      {t('about.downloadBio')}
                    </a>
                  </div>
                  {/* Full Bio */}
                  <div>
                    <h2 className="font-playfair text-primary mb-2">{t('about.fullBio.title')}</h2>
                    <p>{t('about.fullBio.paragraph1')}</p>
                    <p>{t('about.fullBio.paragraph2')}</p>
                    <p>{t('about.fullBio.paragraph3')}</p>
                    <p>{t('about.fullBio.paragraph4')}</p>
                    <a
                      href={fullBioFile}
                      download
                      className="inline-flex items-center justify-center bg-white border border-primary text-primary hover:bg-primary hover:text-white px-3 py-1.5 rounded-lg transition-colors mt-4 no-underline text-sm"
                      style={{ textDecoration: 'none' }}
                    >
                      <Download size={16} className="mr-2" />
                      {t('about.downloadBio')}
                    </a>
                  </div>
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
