import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import resourcesToBackend from "i18next-resources-to-backend";

const languages = ["en", "es", "fr", "de", "pt", "it"] as const;
export type Language = (typeof languages)[number];

export const defaultLanguage: Language = "en";
export const supportedLanguages = languages;

// Configuración de i18next
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .use(
    resourcesToBackend(
      (language: string, namespace: string) =>
        import(`./locales/${language}/${namespace}.json`)
    )
  )
  .init({
    lng: undefined, // Let language detector handle this
    fallbackLng: defaultLanguage,
    debug: process.env.NODE_ENV === "development",

    interpolation: {
      escapeValue: false, // React already escapes values
    },

    detection: {
      order: ["localStorage", "navigator", "htmlTag"],
      lookupLocalStorage: "i18nextLng",
      caches: ["localStorage"],
    },

    react: {
      useSuspense: false,
    },

    // Namespaces
    defaultNS: "common",
    ns: ["common", "dashboard", "auth", "settings", "templates", "validation"],
  });

export default i18n;
