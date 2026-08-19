import { createContext, useContext, useState, type ReactNode } from "react";

type Lang = "EN" | "TH";

interface LangContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (en: string, th: string) => string;
}

const LanguageContext = createContext<LangContextType>({
  lang: "EN",
  setLang: () => {},
  t: (en) => en,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("EN");
  const t = (en: string, th: string) => lang === "EN" ? en : th;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
