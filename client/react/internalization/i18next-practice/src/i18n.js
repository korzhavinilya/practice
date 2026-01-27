import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

const languageDetectorOptions = {
  order: ['navigator'],
  lookupQuerystring: 'lng',
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // lng: 'en' // turn off for detection to work
    fallbackLng: 'en',
    detection: languageDetectorOptions,
    ns: ['translation', 'greeting'],
    // backend: {
    //   loadPath: `http://localhost:3001/locales/{{lng}}/{{ns}}.json`, // to server locales providing
    // },
  });

export default i18n;
