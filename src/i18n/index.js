import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import en from './en.json'
// import hi from './hi.json'
// import mr from './mr.json'
// import ta from './ta.json'
// import te from './te.json'
// import bn from './bn.json'
// import gu from './gu.json'
// import pa from './pa.json'

const resources = {
  en:{translation:en},
  // hi:{translation:hi},
  // mr:{translation:mr},
  // ta:{translation:ta},
  // te:{translation:te},
  // bn:{translation:bn},
  // gu:{translation:gu},
  // pa:{translation:pa}
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage','navigator','htmlTag'],
      caches: ['localStorage']
    }
  })

export default i18n