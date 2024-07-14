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
          results: 'results',
          sortBy: 'Sort by',
          filterBy: 'Filter by',
          popularity: 'Popularity',
          date: 'Date',
          duration: 'Duration',
          rating: 'Rating',
          dateAdded: {
            all: 'All',
            past24hours: 'Past 24 hours',
            past2days: 'Past 2 days',
            pastWeek: 'Past week',
            pastMonth: 'Past month',
            past3months: 'Past 3 months',
            pastYear: 'Past year'
          },
          durationFilter: {
            all: 'All',
            '1plusMinutes': '1+ minutes',
            '5plusMinutes': '5+ minutes',
            '10plusMinutes': '10+ minutes',
            '20plusMinutes': '20+ minutes',
            '30plusMinutes': '30+ minutes',
            '60plusMinutes': '60+ minutes',
            '0to10minutes': '0-10 minutes',
            '0to20minutes': '0-20 minutes'
          }
        }
      },
      pt: {
        translation: {
          title: 'Motor de Busca Pornô',
          searchPlaceholder: 'Pesquisar vídeos...',
          viewCount: '{{count}} visualização',
          viewCount_plural: '{{count}} visualizações',
          pagination: 'Página {{current}} de {{total}}',
          results: 'resultados',
          sortBy: 'Ordenar por',
          filterBy: 'Filtrar por',
          popularity: 'Popularidade',
          date: 'Data',
          duration: 'Duração',
          rating: 'Avaliação',
          dateAdded: {
            all: 'Todos',
            past24hours: 'Últimas 24 horas',
            past2days: 'Últimos 2 dias',
            pastWeek: 'Última semana',
            pastMonth: 'Último mês',
            past3months: 'Últimos 3 meses',
            pastYear: 'Último ano'
          },
          durationFilter: {
            all: 'Todos',
            '1plusMinutes': '1+ minutos',
            '5plusMinutes': '5+ minutos',
            '10plusMinutes': '10+ minutos',
            '20plusMinutes': '20+ minutos',
            '30plusMinutes': '30+ minutos',
            '60plusMinutes': '60+ minutos',
            '0to10minutes': '0-10 minutos',
            '0to20minutes': '0-20 minutos'
          }
        }
      },
      es: {
        translation: {
          title: 'Buscador de Porno',
          searchPlaceholder: 'Buscar videos...',
          viewCount: '{{count}} vista',
          viewCount_plural: '{{count}} vistas',
          pagination: 'Página {{current}} de {{total}}',
          results: 'resultados',
          sortBy: 'Ordenar por',
          filterBy: 'Filtrar por',
          popularity: 'Popularidad',
          date: 'Fecha',
          duration: 'Duración',
          rating: 'Calificación',
          dateAdded: {
            all: 'Todos',
            past24hours: 'Últimas 24 horas',
            past2days: 'Últimos 2 días',
            pastWeek: 'Última semana',
            pastMonth: 'Último mes',
            past3months: 'Últimos 3 meses',
            pastYear: 'Último año'
          },
          durationFilter: {
            all: 'Todos',
            '1plusMinutes': '1+ minutos',
            '5plusMinutes': '5+ minutos',
            '10plusMinutes': '10+ minutos',
            '20plusMinutes': '20+ minutos',
            '30plusMinutes': '30+ minutos',
            '60plusMinutes': '60+ minutos',
            '0to10minutes': '0-10 minutos',
            '0to20minutes': '0-20 minutos'
          }
        }
      }
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;