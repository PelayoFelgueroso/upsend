"use client";

import { useTranslation } from "react-i18next";
import { useCallback } from "react";
import { Language } from "../config";

export function useI18n(namespace?: string) {
  const { t, i18n } = useTranslation(namespace);

  const changeLanguage = useCallback(
    async (language: Language) => {
      await i18n.changeLanguage(language);
    },
    [i18n]
  );

  const currentLanguage = i18n.language as Language;

  return {
    t,
    changeLanguage,
    currentLanguage,
    isLoading: !i18n.isInitialized,
  };
}

// Hook específico para cada namespace
export const useCommonTranslation = () => useI18n("common");
export const useDashboardTranslation = () => useI18n("dashboard");
export const useAuthTranslation = () => useI18n("auth");
export const useSettingsTranslation = () => useI18n("settings");
export const useTemplatesTranslation = () => useI18n("templates");
