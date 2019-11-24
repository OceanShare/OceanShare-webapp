import i18n from 'i18next';
import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import translationFR from '../assets/locales/fr/translations.json';
import translationEN from '../assets/locales/en/translations.json';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      fr: {
        translations: translationFR,
      },
      en: {
        translations: translationEN,
      },
    },
    fallbackLng: ['fr', 'en'],
    ns: ['translations'],
    defaultNS: 'translations',
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
  });
export default i18n;
