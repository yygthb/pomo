import { getFromLS, setToLS } from "@/helpers/ls";
import { setColorThemeToBody } from "@/helpers/setColorThemeToBody";

const COLOR_THEME_LS_KEY = 'pomo-timer-ls-color-theme';

const initialColorThemes = [
  "green",
  "coral",
  "purple",
  "brown",
  "blue",
  "light",
  "dark",
];

const initialColorTheme = JSON.parse(getFromLS(COLOR_THEME_LS_KEY)) || initialColorThemes[0];

export default {
  colorThemes: initialColorThemes,
  selectedColorTheme: initialColorTheme,
  setColorTheme(val) {
    this.selectedColorTheme = val;
    setToLS(COLOR_THEME_LS_KEY, val);
    setColorThemeToBody(val);
  }
}
