import i18next from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector/cjs'
import Backend from 'i18next-chained-backend'
import HttpApi from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'

import locales from '@/config/locale'

i18next
  .use(HttpApi)
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: locales,
    fallbackLng: 'en',
    react: {
      useSuspense: true,
    },
    detection: {
      order: [
        'path',
        'querystring',
        'cookie',
        'localStorage',
        'navigator',
        'htmlTag',
        'path',
        'subdomain',
      ],
      lookupFromPathIndex: 0,
      caches: ['localStorage', 'cookie'],
    },
  })

export default i18next
