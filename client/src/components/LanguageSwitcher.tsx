import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'framer-motion';

type LanguageSwitcherProps = {
  className?: string;
};

const LanguageSwitcher = ({ className = '' }: LanguageSwitcherProps) => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  
  const currentLang = i18n.language;
  
  const switchLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setIsOpen(false);
  };
  
  return (
    <div className={`relative ${className}`}>
      <div className="flex items-center space-x-4 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <button className={`${currentLang === 'en' ? 'text-primary font-medium' : 'text-gray-400 hover:text-primary'} transition-colors`}>
          EN
        </button>
        <span className="text-gray-400">|</span>
        <button className={`${currentLang === 'pt' ? 'text-primary font-medium' : 'text-gray-400 hover:text-primary'} transition-colors`}>
          PT
        </button>
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-0 mt-2 w-24 bg-white shadow-md rounded z-50"
          >
            <div className="py-1">
              <button 
                onClick={() => switchLanguage('en')}
                className={`block w-full text-left px-4 py-2 ${currentLang === 'en' ? 'text-primary' : 'text-gray-700'} hover:bg-gray-100`}
              >
                English
              </button>
              <button 
                onClick={() => switchLanguage('pt')}
                className={`block w-full text-left px-4 py-2 ${currentLang === 'pt' ? 'text-primary' : 'text-gray-700'} hover:bg-gray-100`}
              >
                Português
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSwitcher;
