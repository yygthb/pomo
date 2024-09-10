import { createI18n } from 'vue-i18n'
import en from '../i18n/en';
import ru from '../i18n/ru';

export const i18n = createI18n({
  locale: 'ru',
  messages: {
    en,
    ru,
  }
})
