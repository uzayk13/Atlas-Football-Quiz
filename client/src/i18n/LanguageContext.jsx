import { createContext, useContext, useState } from "react";
import { translations } from "./translations";

const STORAGE_KEY = "atlas-lang";
const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem(STORAGE_KEY) || "en");

  function toggleLang() {
    setLang((prev) => {
      const next = prev === "en" ? "tr" : "en";
      localStorage.setItem(STORAGE_KEY, next);
      return next;
    });
  }

  const value = { lang, toggleLang, t: translations[lang] };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
