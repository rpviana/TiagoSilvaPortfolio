import { useLanguageManager, Language } from '../hooks/useLanguageManager';

type LanguageSwitcherProps = {
  className?: string;
};

const LanguageSwitcher = ({ className = '' }: LanguageSwitcherProps) => {
  const { language, setLanguage } = useLanguageManager();
  
  const switchLanguage = (lang: Language) => {
    setLanguage(lang);
  };
  
  return (
    <div className={`${className}`}>
      <div className="flex items-center space-x-4">
        <button 
          onClick={() => switchLanguage('en')}
          className={`${language === 'en' ? 'text-black font-medium' : 'text-black/70 hover:text-black'} transition-colors`}
          aria-label="Switch to English"
        >
          EN
        </button>
        <span className="text-black/70">|</span>
        <button 
          onClick={() => switchLanguage('pt')}
          className={`${language === 'pt' ? 'text-black font-medium' : 'text-black/70 hover:text-black'} transition-colors`}
          aria-label="Mudar para Português"
        >
          PT
        </button>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
