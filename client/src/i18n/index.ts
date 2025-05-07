import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './en';
import ptTranslation from './pt';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslation
      },
      pt: {
        translation: ptTranslation
      }
    },
    lng: 'en', // Default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // React already escapes values
    }
  });

export default i18n;
