import React from 'react';
import { useI18n } from '../lib/i18nContext';
import { PageRoute } from '../types';
import { ShieldCheck, Cpu, Database, Github, Instagram, Mail, Send } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageRoute) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { t } = useI18n();

  return (
    <footer className="mt-20 border-t border-slate-800/80 bg-slate-950/80 text-slate-400 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand Info */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 p-[1px]">
              <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center font-bold text-white text-xs">
                MYK
              </div>
            </div>
            <div>
              <span className="font-extrabold text-lg text-white">MYK Platform</span>
              <p className="text-xs text-indigo-400 font-medium">{t.hero.slogan}</p>
            </div>
          </div>
          <p className="text-sm text-slate-400 max-w-md leading-relaxed">
            The digital home of Mohammad Yasin Karami. Engineered with Clean Architecture, SQLite/Prisma persistent database, and RTL/LTR internationalization.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <a
              href="https://github.com/mohammad-yasin-karami"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-indigo-500/50 transition-all flex items-center gap-2 text-xs font-medium"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
            <a
              href="https://t.me/mykcontactbot"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sky-400 hover:text-sky-300 hover:border-sky-500/50 transition-all flex items-center gap-2 text-xs font-medium"
              aria-label="Telegram"
            >
              <Send className="w-4 h-4" />
              <span>Telegram</span>
            </a>
            <a
              href="https://instagram.com/officiallmyk"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-pink-400 hover:text-pink-300 hover:border-pink-500/50 transition-all flex items-center gap-2 text-xs font-medium"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
              <span>Instagram</span>
            </a>
            <a
              href="mailto:officiallcapitanyasin@gmail.com"
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-indigo-400 hover:text-indigo-300 hover:border-indigo-500/50 transition-all flex items-center gap-2 text-xs font-medium"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
              <span>Email</span>
            </a>
          </div>
        </div>

        {/* Navigation Quick Links */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
            Navigation
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <button
                onClick={() => onNavigate('home')}
                className="hover:text-indigo-400 transition-colors"
              >
                {t.nav.home}
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('about')}
                className="hover:text-indigo-400 transition-colors"
              >
                {t.nav.about}
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('contact')}
                className="hover:text-indigo-400 transition-colors"
              >
                {t.nav.contact}
              </button>
            </li>
          </ul>
        </div>

        {/* Architecture & Specs Badge */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
            System Status
          </h4>
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2 text-emerald-400 bg-emerald-500/10 p-2.5 rounded-xl border border-emerald-500/20">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Version 1.0 Production Ready</span>
            </div>
            <div className="flex items-center gap-2 text-indigo-300 bg-slate-900 p-2.5 rounded-xl border border-slate-800">
              <Database className="w-4 h-4 shrink-0 text-indigo-400" />
              <span>SQLite Abstracted DB Ready</span>
            </div>
            <div className="flex items-center gap-2 text-purple-300 bg-slate-900 p-2.5 rounded-xl border border-slate-800">
              <Cpu className="w-4 h-4 shrink-0 text-purple-400" />
              <span>Multi-Agent AI Ready</span>
            </div>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <p>{t.footer.copyright}</p>
        <p className="font-mono text-indigo-400/80">{t.footer.version}</p>
      </div>
    </footer>
  );
};
