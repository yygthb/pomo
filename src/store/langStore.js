import { i18n } from "@/config/i18n";
import { getFromLS, setToLS } from "@/helpers/ls";

const LANG_LS_KEY = 'pomo-timer-ls-lang';

const initialLangOptions = [
  { name: "En", value: "en" },
  { name: "Ru", value: "ru" },
];

const initialSelectedLang = JSON.parse(getFromLS(LANG_LS_KEY)) || initialLangOptions[0];

export default {
  langOptions: initialLangOptions,
  selectedLang: initialSelectedLang,
  setLang(val) {
    setToLS(LANG_LS_KEY, val);
    this.selectedLang = val;
    i18n.global.locale = val.value;
  }
}
