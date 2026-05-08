import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { useLanguage } from '@/components/LanguageContext';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';

const About = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const isPt = language === 'pt';

  // Fetch dynamic content
  const { data: content } = useQuery({
    queryKey: ['/api/site-content'],
    queryFn: async () => {
      const res = await fetch('/api/site-content');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      const map: Record<string, any> = {};
      data.forEach((item: any) => { map[item.key] = item });
      return map;
    },
    staleTime: 0,
    refetchOnMount: "always"
  });

  const getText = (key: string, fallback: string) => {
    if (!content || !content[key]) return fallback;
    return isPt ? content[key].valuePt : content[key].valueEn;
  };

  const getColor = (key: string, fallback: string) => {
    if (!content || !content[key]) return fallback;
    return content[key].valuePt || fallback;
  };

  const getFile = (key: string, fallback: string) => {
    if (!content || !content[key]) return fallback;
    return content[key].valuePt || fallback;
  };

  // Get the right document based on language
  const cvFile = isPt 
    ? getFile("about_cv_pt", "/cv-pt.pdf") 
    : getFile("about_cv_en", "/cv-en.pdf");
  const smallBioFile = isPt 
    ? getFile("about_small_bio_pt", "/Tiago_PequenaBiografia_pt.pdf") 
    : getFile("about_small_bio_en", "/Tiago_SmallBiography_en.pdf");
  const fullBioFile = isPt 
    ? getFile("about_full_bio_pt", "/Tiago_BiografiaCompleta_pt.pdf") 
    : getFile("about_full_bio_en", "/Tiago_FullBiography_en.pdf");

  const bgColor = getColor("about_bg_color", "#ffffff");
  const titleColor = getColor("about_title_color", "#6B2D3A");
  const textColor = getColor("about_text_color", "#374151");
  const buttonColor = getColor("about_button_color", "#6B2D3A");

  return (
    <div className="pt-24">
      <section className="py-16 md:py-24" style={{ backgroundColor: bgColor }}>
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.h1 
              className="text-4xl md:text-5xl font-playfair font-bold mb-12 text-center"
              style={{ color: titleColor }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {getText("about_title", t('about.title'))}
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
                    src={getFile("about_image", "/attached_assets/Tiago-Violino-52.JPG")} 
                    alt="Tiago Soares Silva" 
                    className="w-full h-auto rounded-lg shadow-lg mb-6"
                  />
                  
                  <a 
                    href={cvFile}
                    download
                    className="inline-flex items-center justify-center w-full border px-4 py-3 rounded-lg transition-colors hover:opacity-90"
                    style={{ 
                      borderColor: buttonColor,
                      color: buttonColor,
                      backgroundColor: 'transparent'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = buttonColor;
                      e.currentTarget.style.color = '#ffffff';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = buttonColor;
                    }}
                  >
                    <Download size={18} className="mr-2" />
                    {getText("about_cv_label", t('about.downloadCV'))}
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
                  {/* Short Bio - 4 parágrafos */}
                  <div className="mb-10">
                    <h2 className="font-playfair mb-2" style={{ color: titleColor }}>
                      {getText("about_short_title", t('about.shortBio.title'))}
                    </h2>
                    <p style={{ color: textColor }}>{getText("about_short_p1", t('about.shortBio.paragraph1'))}</p>
                    <p style={{ color: textColor }}>{getText("about_short_p2", t('about.shortBio.paragraph2'))}</p>
                    <p style={{ color: textColor }}>{getText("about_short_p3", t('about.shortBio.paragraph3'))}</p>
                    <p style={{ color: textColor }}>{getText("about_short_p4", t('about.shortBio.paragraph4'))}</p>
                    <a
                      href={smallBioFile}
                      download
                      className="inline-flex items-center justify-center border px-3 py-1.5 rounded-lg transition-colors mt-4 no-underline text-sm"
                      style={{ 
                        borderColor: buttonColor,
                        color: buttonColor,
                        textDecoration: 'none'
                      }}
                    >
                      <Download size={16} className="mr-2" />
                      {getText("about_bio_label", t('about.downloadBio'))}
                    </a>
                  </div>
                  {/* Full Bio - 7 parágrafos */}
                  <div>
                    <h2 className="font-playfair mb-2" style={{ color: titleColor }}>
                      {getText("about_full_title", t('about.fullBio.title'))}
                    </h2>
                    <p style={{ color: textColor }}>{getText("about_full_p1", t('about.fullBio.paragraph1'))}</p>
                    <p style={{ color: textColor }}>{getText("about_full_p2", t('about.fullBio.paragraph2'))}</p>
                    <p style={{ color: textColor }}>{getText("about_full_p3", t('about.fullBio.paragraph3'))}</p>
                    <p style={{ color: textColor }}>{getText("about_full_p4", t('about.fullBio.paragraph4'))}</p>
                    <p style={{ color: textColor }}>{getText("about_full_p5", t('about.fullBio.paragraph5'))}</p>
                    <p style={{ color: textColor }}>{getText("about_full_p6", t('about.fullBio.paragraph6'))}</p>
                    <p style={{ color: textColor }}>{getText("about_full_p7", t('about.fullBio.paragraph7'))}</p>
                    <a
                      href={fullBioFile}
                      download
                      className="inline-flex items-center justify-center border px-3 py-1.5 rounded-lg transition-colors mt-4 no-underline text-sm"
                      style={{ 
                        borderColor: buttonColor,
                        color: buttonColor,
                        textDecoration: 'none'
                      }}
                    >
                      <Download size={16} className="mr-2" />
                      {getText("about_bio_label", t('about.downloadBio'))}
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
