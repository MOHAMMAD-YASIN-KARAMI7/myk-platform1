import React, { createContext, useContext, useState, useEffect } from 'react';
import { en, Translations } from '../locales/en';
import { fa } from '../locales/fa';

export type Locale = 'fa' | 'en';

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  dir: 'rtl' | 'ltr';
  t: Translations;
  toggleLocale: () => void;
}

const translationsMap: Record<Locale, Translations> = {
  en,
  fa,
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('myk_locale');
      if (saved === 'fa' || saved === 'en') return saved;
    }
    return 'fa'; // Default to Persian (fa) as requested for initial dual-lang priority
  });

  const dir = locale === 'fa' ? 'rtl' : 'ltr';

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.dir = dir;
      document.documentElement.lang = locale;
      localStorage.setItem('myk_locale', locale);
    }
  }, [locale, dir]);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
  };

  const toggleLocale = () => {
    setLocaleState((prev) => (prev === 'fa' ? 'en' : 'fa'));
  };

  const t = translationsMap[locale] || translationsMap.fa;

  return (
    <I18nContext.Provider value={{ locale, setLocale, dir, t, toggleLocale }}>
      <div className={`app-wrapper ${dir === 'rtl' ? 'font-vazir' : 'font-sans'}`} dir={dir}>
        {children}
      </div>
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};
