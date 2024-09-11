import { createI18n } from 'vue-i18n'
import { getFromLS } from '@/helpers/ls';
import en from '../i18n/en';
import ru from '../i18n/ru';

const localeFromLS = JSON.parse(getFromLS('pomo-timer-ls-lang'));

export const i18n = createI18n({
  locale: localeFromLS?.value || 'en',
  messages: {
    en,
    ru,
  }
})
