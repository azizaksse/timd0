import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";
import { fr } from "@/i18n/fr";
import { ar } from "@/i18n/ar";
import type { Translations } from "@/i18n/types";

export type Language = "fr" | "ar";

interface LanguageContextType {
  lang: Language;
  t: Translations;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  dir: "ltr" | "rtl";
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Translations> = { fr, ar };

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem("timd-lang");
    return (saved === "ar" || saved === "fr") ? saved : "fr";
  });

  const setLang = useCallback((l: Language) => {
    setLangState(l);
    localStorage.setItem("timd-lang", l);
  }, []);

  const toggleLang = useCallback(() => {
    setLang(lang === "fr" ? "ar" : "fr");
  }, [lang, setLang]);

  const dir = lang === "ar" ? "rtl" : "ltr";
  const t = translations[lang];

  useEffect(() => {
    document.documentElement.setAttribute("dir", dir);
    document.documentElement.setAttribute("lang", lang);
  }, [dir, lang]);

  return (
    <LanguageContext.Provider value={{ lang, t, setLang, toggleLang, dir }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};
