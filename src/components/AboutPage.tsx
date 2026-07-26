import React from 'react';
import { useI18n } from '../lib/i18nContext';
import { PageRoute } from '../types';
import { 
  User, 
  BookOpen, 
  Compass, 
  Sparkles, 
  Code2, 
  Terminal, 
  Award, 
  CheckCircle2, 
  Layers,
  ArrowUpRight
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: PageRoute) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const { t, dir } = useI18n();

  const journeySteps = [
    {
      title: t.about.journey1Title,
      description: t.about.journey1Desc,
      tag: 'Phase I',
      icon: Code2,
    },
    {
      title: t.about.journey2Title,
      description: t.about.journey2Desc,
      tag: 'Phase II',
      icon: Terminal,
    },
    {
      title: t.about.journey3Title,
      description: t.about.journey3Desc,
      tag: 'Phase III',
      icon: Layers,
    },
    {
      title: t.about.journey4Title,
      description: t.about.journey4Desc,
      tag: 'Phase IV',
      icon: Sparkles,
    },
  ];

  const currentInterests = [
    t.about.interest1,
    t.about.interest2,
    t.about.interest3,
    t.about.interest4,
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 py-8">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
          <User className="w-4 h-4" />
          <span>{t.about.title}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          {t.about.subtitle}
        </h1>
        <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
          Mohammad Yasin Karami • AI Engineer, Python Developer & Entrepreneur
        </p>
      </div>

      {/* BIOGRAPHY & STORY */}
      <div className="glass-card p-8 sm:p-12 rounded-3xl border border-slate-800 space-y-6 relative overflow-hidden">
        <div className="flex items-center gap-3 text-indigo-400 border-b border-slate-800 pb-4">
          <BookOpen className="w-5 h-5" />
          <h2 className="text-xl font-bold text-white">{t.about.storyTitle}</h2>
        </div>

        <div className="space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
          <p>{t.about.storyP1}</p>
          <p>{t.about.storyP2}</p>
          <p>{t.about.storyP3}</p>
        </div>
      </div>

      {/* LEARNING & EVOLUTIONARY PATH */}
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            {t.about.journeyTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            A milestone journey of continuous engineering excellence and technical growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {journeySteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="glass-card p-6 rounded-2xl border border-slate-800 space-y-3 relative group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    {step.tag}
                  </span>
                  <Icon className="w-5 h-5 text-indigo-400 group-hover:scale-110 transition-transform" />
                </div>

                <h3 className="text-base font-bold text-white">{step.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* CURRENT INTERESTS & FUTURE HORIZON */}
      <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-purple-500/20 space-y-6">
        <div className="flex items-center gap-3 text-purple-400 border-b border-slate-800 pb-4">
          <Compass className="w-5 h-5" />
          <h2 className="text-xl font-bold text-white">{t.about.interestsTitle}</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {currentInterests.map((interest, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80 flex items-start gap-3"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
              <span className="text-xs sm:text-sm text-slate-200 font-medium leading-normal">
                {interest}
              </span>
            </div>
          ))}
        </div>

        <div className="pt-4 flex justify-end">
          <button
            onClick={() => onNavigate('contact')}
            className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-lg shadow-indigo-600/20 transition-all inline-flex items-center gap-2"
          >
            <span>{t.home.ctaButton}</span>
            <ArrowUpRight className={`w-4 h-4 ${dir === 'rtl' ? 'rotate-90' : ''}`} />
          </button>
        </div>
      </div>

    </div>
  );
};
