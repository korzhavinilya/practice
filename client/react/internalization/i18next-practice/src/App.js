import { useTranslation } from 'react-i18next';
import i18n from './i18n';

function Switch() {
  const languages = {
    en: { nativeName: 'English' },
    ja: { nativeName: 'Japanese' },
  };

  return (
    <div>
      {' '}
      {Object.keys(languages).map((language) => {
        return (
          <button
            onClick={() => i18n.changeLanguage(language)}
            disabled={i18n.resolvedLanguage === language}
          >
            {languages[language].nativeName}
          </button>
        );
      })}
    </div>
  );
}

function App() {
  const { t, i18n } = useTranslation();
  const lng = navigator.language;

  return (
    <div>
      <h1>{t('translation:app-name')}</h1>
      <h2>
        Browser language: {lng} i18next language: {i18n.resolvedLanguage}
      </h2>
      <h3>{t('greeting:hello')}</h3>

      <Switch />
    </div>
  );
}

export default App;
