import { useTranslation } from 'react-i18next';
import ContactForm from '../components/ContactForm';
import { motion } from 'framer-motion';

const Contact = () => {
  const { t } = useTranslation();
  
  const socialLinks = [
    { 
      icon: "facebook-f", 
      url: "https://www.facebook.com/tiago.soaressilva.arts",
      label: "Facebook" 
    },
    { 
      icon: "instagram", 
      url: "https://www.instagram.com/tiagosilva_violin/",
      label: "Instagram" 
    },
    { 
      icon: "linkedin-in", 
      url: "https://www.linkedin.com/in/tiago-soares-silva-violin",
      label: "LinkedIn" 
    },
    { 
      icon: "youtube", 
      url: "https://www.youtube.com/@tiagosoaressilva7056",
      label: "YouTube" 
    },
  ];
  
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
              {t('contact.title')}
            </motion.h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h3 className="text-xl font-playfair font-bold mb-6 text-primary">{t('contact.getInTouch')}</h3>
                
                <p className="text-gray-700 mb-8">
                  {t('contact.introText')}
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="text-primary mr-4">
                      <i className="fas fa-envelope"></i>
                    </div>
                    <div>
                      <div className="font-medium">{t('contact.email')}</div>
                      <a 
                        href="mailto:tiagosilva.05.2000@gmail.com" 
                        className="text-gray-600 hover:text-primary transition-colors break-all"
                      >
                        tiagosilva.05.2000@gmail.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="text-primary mr-4">
                      <i className="fab fa-whatsapp"></i>
                    </div>
                    <div>
                      <div className="font-medium">{t('contact.whatsapp')}</div>
                      <a 
                        href="https://wa.me/447784730680" 
                        className="text-gray-600 hover:text-primary transition-colors"
                      >
                        +44 (0) 778 473 0680
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="text-primary mr-4">
                      <i className="fas fa-share-alt"></i>
                    </div>
                    <div>
                      <div className="font-medium">{t('contact.socialMedia')}</div>
                      <div className="flex space-x-4 mt-2">
                        {socialLinks.map(link => (
                          <a 
                            key={link.label}
                            href={link.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-primary hover:text-primary-dark transition-colors"
                            aria-label={link.label}
                          >
                            <i className={`fab fa-${link.icon}`}></i>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <ContactForm />
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
