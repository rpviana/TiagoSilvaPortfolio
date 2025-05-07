import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export type Language = 'en' | 'pt';

export const useLanguageManager = () => {
  const { i18n } = useTranslation();
  
  const [language, setLanguageState] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    return savedLanguage || 'en';
  });

  // Initialize i18n with the current language
  useEffect(() => {
    i18n.changeLanguage(language);
  }, [i18n, language]);

  const setLanguage = (lang: Language) => {
    localStorage.setItem('language', lang);
    setLanguageState(lang);
    i18n.changeLanguage(lang);
  };

  return { language, setLanguage };
};