import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import detector from "i18next-browser-languagedetector";

import resources from "./resources";

i18n
  .use(detector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en-US",
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
