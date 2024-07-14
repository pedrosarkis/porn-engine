import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          title: 'Porn Search Engine',
          searchPlaceholder: 'Search videos...',
          viewCount: '{{count}} view',
          viewCount_plural: '{{count}} views',
          pagination: 'Page {{current}} of {{total}}',
        }
      },
      pt: {
        translation: {
          title: 'Motor de Busca Pornô',
          searchPlaceholder: 'Pesquisar vídeos...',
          viewCount: '{{count}} visualização',
          viewCount_plural: '{{count}} visualizações',
          pagination: 'Página {{current}} de {{total}}',
        }
      },
      es: {
        translation: {
          title: 'Buscador de Porno',
          searchPlaceholder: 'Buscar videos...',
          viewCount: '{{count}} vista',
          viewCount_plural: '{{count}} vistas',
          pagination: 'Página {{current}} de {{total}}',
        }
      }
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;