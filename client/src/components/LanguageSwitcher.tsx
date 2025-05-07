import { useTranslation } from 'react-i18next';

type LanguageSwitcherProps = {
  className?: string;
};

const LanguageSwitcher = ({ className = '' }: LanguageSwitcherProps) => {
  const { i18n } = useTranslation();
  
  const currentLang = i18n.language;
  
  const switchLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };
  
  return (
    <div className={`${className}`}>
      <div className="flex items-center space-x-4">
        <button 
          onClick={() => switchLanguage('en')}
          className={`${currentLang === 'en' ? 'text-primary font-medium' : 'text-gray-400 hover:text-primary'} transition-colors`}
        >
          EN
        </button>
        <span className="text-gray-400">|</span>
        <button 
          onClick={() => switchLanguage('pt')}
          className={`${currentLang === 'pt' ? 'text-primary font-medium' : 'text-gray-400 hover:text-primary'} transition-colors`}
        >
          PT
        </button>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
