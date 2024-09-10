import { i18n } from "@/config/i18n";

const initialLangOptions = [
  { name: "En", value: "en" },
  { name: "Ru", value: "ru" },
];

export default {
  langOptions: initialLangOptions,
  selectedLang: initialLangOptions[0],
  setLang(val) {
    this.selectedLang = val;
    i18n.global.locale = val.value;
  }
}
