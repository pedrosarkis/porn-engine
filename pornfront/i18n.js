import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources: {
      en: {
        translation: {
          title: 'Porn Search Engine',
          searchPlaceholder: 'Search videos...',
          favorites: 'Favorites',
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
          },
          // Existing login modal translations
          logIn: 'Log In',
          createAccount: 'Create Account',
          email: 'Email',
          username: 'Username',
          password: 'Password',
          agreeToTerms: 'I agree to the Terms of Service and Privacy Policy',
          orContinueWith: 'or continue with',
          noAccount: "Don't have an account? ",
          alreadyHaveAccount: 'Already have an account? ',
          signUp: 'Sign up',
          // New login modal translations
          pleaseAgreeToTerms: 'Please agree to the Terms of Service and Privacy Policy',
          invalidCredentials: 'Invalid email or password',
          registrationFailed: 'Registration failed. Please try again.',
          googleLoginFailed: 'Google login failed. Please try again.',
          loginWithGoogle: 'Log in with Google',
          signUpWithGoogle: 'Sign up with Google',
          termsOfService: 'Terms of Service',
          and: 'and',
          privacyPolicy: 'Privacy Policy'
        }
      },
      pt: {
        translation: {
          title: 'Motor de Busca Pornô',
          favorites: 'Favoritos',
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
          },
          // Existing login modal translations
          logIn: 'Entrar',
          createAccount: 'Criar Conta',
          email: 'Email',
          username: 'Nome de usuário',
          password: 'Senha',
          agreeToTerms: 'Eu concordo com os Termos de Serviço e Política de Privacidade',
          orContinueWith: 'ou continue com',
          noAccount: 'Não tem uma conta? ',
          alreadyHaveAccount: 'Já tem uma conta? ',
          signUp: 'Inscrever-se',
          // New login modal translations
          pleaseAgreeToTerms: 'Por favor, concorde com os Termos de Serviço e Política de Privacidade',
          invalidCredentials: 'Email ou senha inválidos',
          registrationFailed: 'Falha no registro. Por favor, tente novamente.',
          googleLoginFailed: 'Falha no login do Google. Por favor, tente novamente.',
          loginWithGoogle: 'Entrar com o Google',
          signUpWithGoogle: 'Inscrever-se com o Google',
          termsOfService: 'Termos de Serviço',
          and: 'e',
          privacyPolicy: 'Política de Privacidade'
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
          },
          // Existing login modal translations
          logIn: 'Iniciar sesión',
          createAccount: 'Crear Cuenta',
          email: 'Correo electrónico',
          username: 'Nombre de usuario',
          password: 'Contraseña',
          agreeToTerms: 'Acepto los Términos de Servicio y la Política de Privacidad',
          orContinueWith: 'o continuar con',
          noAccount: '¿No tienes una cuenta? ',
          alreadyHaveAccount: '¿Ya tienes una cuenta? ',
          signUp: 'Regístrate',
          // New login modal translations
          pleaseAgreeToTerms: 'Por favor, acepta los Términos de Servicio y la Política de Privacidad',
          invalidCredentials: 'Correo electrónico o contraseña inválidos',
          registrationFailed: 'Fallo en el registro. Por favor, inténtalo de nuevo.',
          googleLoginFailed: 'Fallo en el inicio de sesión con Google. Por favor, inténtalo de nuevo.',
          loginWithGoogle: 'Iniciar sesión con Google',
          signUpWithGoogle: 'Registrarse con Google',
          termsOfService: 'Términos de Servicio',
          and: 'y',
          privacyPolicy: 'Política de Privacidad'
        }
      }
    },
    fallbackLng: 'en',
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
      caches: ['localStorage']
    },
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;