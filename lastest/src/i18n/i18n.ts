import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import { SUPPORTED_LANGUAGES, type LanguageCode } from "./config";
import es from "./locales/es";
import en from "./locales/en";
import fr from "./locales/fr";
import pt from "./locales/pt";

const DEFAULT_LANGUAGE: LanguageCode = "es";
const FALLBACK_LANGUAGES: LanguageCode[] = ["en", "es"];
const STORAGE_KEY = "donamed.language";
const translations = { es, en, fr, pt };

const resources: Record<LanguageCode, { translation: Record<string, string> }> = {
    es: { translation: translations.es },
    en: { translation: translations.en },
    fr: { translation: translations.fr },
    pt: { translation: translations.pt },
};

void i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: FALLBACK_LANGUAGES,
        supportedLngs: [...SUPPORTED_LANGUAGES],
        nonExplicitSupportedLngs: true,
        defaultNS: "translation",
        ns: ["translation"],
        interpolation: { escapeValue: false },
        keySeparator: false,
        returnEmptyString: false,
        detection: {
            order: ["localStorage", "navigator"],
            lookupLocalStorage: STORAGE_KEY,
            caches: ["localStorage"],
        },
    });

export default i18n;
export { DEFAULT_LANGUAGE };
