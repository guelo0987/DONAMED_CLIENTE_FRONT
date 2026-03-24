import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { DEFAULT_LANGUAGE } from "./i18n";
import { SUPPORTED_LANGUAGES, type LanguageCode } from "./config";

interface I18nApi {
    language: LanguageCode;
    setLanguage: (language: LanguageCode) => void;
    t: (key: string, fallback?: string) => string;
}

function isSupportedLanguage(value: string): value is LanguageCode {
    return SUPPORTED_LANGUAGES.includes(value as LanguageCode);
}

function getResolvedLanguage(rawLanguage?: string): LanguageCode {
    if (!rawLanguage) return DEFAULT_LANGUAGE;
    const baseLanguage = rawLanguage.toLowerCase().split("-")[0];
    return isSupportedLanguage(baseLanguage) ? baseLanguage : DEFAULT_LANGUAGE;
}

export const useI18n = (): I18nApi => {
    const { t: i18nT, i18n: i18nInstance } = useTranslation();
    const language = getResolvedLanguage(i18nInstance.resolvedLanguage || i18nInstance.language);

    const setLanguage = useCallback((nextLanguage: LanguageCode) => {
        void i18nInstance.changeLanguage(nextLanguage);
    }, [i18nInstance]);

    const t = useCallback(
        (key: string, fallback?: string) => {
            const translatedValue = i18nT(key, { defaultValue: fallback ?? key });
            return typeof translatedValue === "string" ? translatedValue : (fallback ?? key);
        },
        [i18nT]
    );

    return { language, setLanguage, t };
};
