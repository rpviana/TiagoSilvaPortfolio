import { useLanguage } from '@/components/LanguageContext';

export type Language = 'en' | 'pt';

export const useLanguageManager = () => {
  const { language, setLanguage } = useLanguage();
  
  const isPt = language === 'pt';

  return { language, setLanguage, isPt };
};