import { setColorThemeToBody } from "@/helpers/setColorThemeToBody";

const initialColorThemes = [
  "green",
  "coral",
  "purple",
  "brown",
  "blue",
  "light",
  "dark",
];

export default {
  colorThemes: initialColorThemes,
  selectedColorTheme: initialColorThemes[0],
  setColorTheme(val) {
    this.selectedColorTheme = val;
    setColorThemeToBody(val);
  }
}
