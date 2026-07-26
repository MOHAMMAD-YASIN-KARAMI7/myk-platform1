import React, { useState } from 'react';
import { useI18n } from '../lib/i18nContext';
import { PageRoute } from '../types';
import { 
  Sparkles, 
  ArrowRight, 
  Code2, 
  Cpu, 
  Terminal, 
  Globe, 
  ShieldCheck, 
  Zap, 
  Layers, 
  Bot, 
  Rocket, 
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageRoute) => void;
  onOpenProjects: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenProjects }) => {
  const { t, dir } = useI18n();
  const [activeSkillTab, setActiveSkillTab] = useState<'ai' | 'backend' | 'frontend' | 'architecture'>('ai');

  const skillsData = {
    ai: [
      { name: 'Prompt Engineering & System Prompt Optimization', level: '99%', tags: ['System Prompts', 'Few-Shot Prompting', 'Chain-of-Thought', 'Context Window Management'] },
      { name: 'Python LLM Agent Orchestration', level: '98%', tags: ['LangChain', 'LlamaIndex', 'Function Calling'] },
      { name: 'PyTorch & Deep Learning Pipelines', level: '95%', tags: ['Neural Nets', 'Transformers', 'Computer Vision'] },
      { name: 'Generative AI & Gemini API', level: '96%', tags: ['Multimodal AI', 'RAG', 'Structured Outputs'] },
      { name: 'Model Fine-tuning & Optimization', level: '90%', tags: ['Quantization', 'ONNX', 'LoRA'] },
    ],
    backend: [
      { name: 'Python Systems & FastAPI / AsyncIO', level: '98%', tags: ['High-Concurrency', 'Microservices', 'Pydantic'] },
      { name: 'Node.js & Express / TypeScript', level: '95%', tags: ['Clean Architecture', 'REST APIs', 'GraphQL'] },
      { name: 'Database Architecture (SQLite, Postgres, Redis)', level: '92%', tags: ['Prisma ORM', 'Relational Schemas', 'Caching'] },
      { name: 'Security, XSS & Auth Protocols', level: '94%', tags: ['JWT', 'OAuth2', 'Input Sanitization'] },
    ],
    frontend: [
      { name: 'Next.js & React 19', level: '96%', tags: ['Server Components', 'Hooks', 'State Engines'] },
      { name: 'Tailwind CSS & Glassmorphic UI Design', level: '98%', tags: ['Responsive Layouts', 'Apple-grade UX'] },
      { name: 'RTL/LTR Multi-Language Frameworks', level: '95%', tags: ['i18n Architecture', 'Unicode', 'Vazirmatn'] },
      { name: 'Framer Motion & Micro-Interactions', level: '92%', tags: ['Smooth Animations', 'Layout Transitions'] },
    ],
    architecture: [
      { name: 'Clean Architecture & SOLID Design', level: '97%', tags: ['Dependency Injection', 'Repository Pattern'] },
      { name: 'Multi-Cloud Infrastructure & Docker', level: '90%', tags: ['Cloud Run', 'Containers', 'Vercel'] },
      { name: 'CI/CD Pipelines & Automated Testing', level: '91%', tags: ['GitHub Actions', 'Jest', 'Playwright'] },
      { name: 'Scalable SaaS & Entrepreneurial Tech', level: '94%', tags: ['System Scaling', 'Product Strategy'] },
    ],
  };

  return (
    <div className="space-y-24 pb-16">
      
      {/* HERO SECTION */}
      <section className="relative pt-12 md:pt-20 pb-16 overflow-hidden">
        
        {/* Animated Background Mesh & Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[800px] h-[400px] bg-gradient-to-tr from-indigo-600/20 via-purple-600/15 to-pink-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />
        <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none -z-10" />

        <div className="max-w-5xl mx-auto text-center px-4 space-y-8">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-indigo-500/30 text-indigo-300 text-xs sm:text-sm font-medium shadow-xl shadow-indigo-500/10 animate-in fade-in slide-in-from-bottom-3 duration-500">
            <Sparkles className="w-4 h-4 text-indigo-400 animate-spin-slow" />
            <span>{t.hero.badge}</span>
          </div>

          {/* MYK Brand Presentation */}
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-none">
              <span className="block text-slate-100 mb-2">{t.hero.name}</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400">
                {t.hero.slogan}
              </span>
            </h1>

            <p className="text-lg sm:text-xl font-medium text-indigo-300/90 tracking-wide max-w-2xl mx-auto">
              {t.hero.title}
            </p>

            <p className="text-sm sm:text-base text-slate-400 max-w-3xl mx-auto leading-relaxed font-normal">
              {t.hero.description}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 animate-in fade-in slide-in-from-bottom-5 duration-1000">
            <button
              onClick={onOpenProjects}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 group"
            >
              <span>{t.hero.viewProjects}</span>
              <ArrowRight className={`w-4 h-4 group-hover:translate-x-1 transition-transform ${dir === 'rtl' ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
            </button>

            <button
              onClick={() => onNavigate('contact')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl glass-panel text-slate-200 hover:text-white font-semibold text-sm border border-slate-700/80 hover:border-indigo-500/50 hover:bg-slate-800/80 transition-all flex items-center justify-center gap-2"
            >
              <span>{t.hero.contactMe}</span>
            </button>
          </div>

        </div>
      </section>

      {/* SHORT INTRODUCTION & STATS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card p-8 sm:p-12 rounded-3xl border border-slate-800 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-indigo-500/10 text-indigo-400 text-xs font-semibold">
                <Code2 className="w-3.5 h-3.5" />
                <span>{t.home.introTitle}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-snug">
                {t.home.introSubtitle}
              </h2>
              <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                {t.home.introBody}
              </p>
            </div>

            {/* Metric Highlights */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 text-center space-y-1">
                <div className="text-2xl sm:text-3xl font-black text-indigo-400">99.9%</div>
                <div className="text-xs text-slate-400 font-medium">{t.home.stats.uptime}</div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 text-center space-y-1">
                <div className="text-2xl sm:text-3xl font-black text-purple-400">AI / ML</div>
                <div className="text-xs text-slate-400 font-medium">{t.home.stats.aiModels}</div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 text-center space-y-1">
                <div className="text-2xl sm:text-3xl font-black text-pink-400">SOLID</div>
                <div className="text-xs text-slate-400 font-medium">{t.home.stats.architecture}</div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 text-center space-y-1">
                <div className="text-2xl sm:text-3xl font-black text-emerald-400">RTL/LTR</div>
                <div className="text-xs text-slate-400 font-medium">{t.home.stats.vision}</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SKILLS PREVIEW SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-4xl font-black text-white">
            {t.home.skillsTitle}
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            {t.home.skillsSubtitle}
          </p>
        </div>

        {/* Skill Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 p-1.5 rounded-2xl bg-slate-900/80 border border-slate-800 max-w-3xl mx-auto">
          {(['ai', 'backend', 'frontend', 'architecture'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveSkillTab(cat)}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeSkillTab === cat
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              {t.home.skillsCategories[cat]}
            </button>
          ))}
        </div>

        {/* Skill Cards Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skillsData[activeSkillTab].map((skill, idx) => (
            <div
              key={idx}
              className="glass-card p-6 rounded-2xl border border-slate-800/90 space-y-3"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white text-base">{skill.name}</h3>
                <span className="text-xs font-mono font-bold text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/20">
                  {skill.level}
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden p-0.5 border border-slate-800">
                <div
                  className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-full rounded-full transition-all duration-500"
                  style={{ width: skill.level }}
                />
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {skill.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] px-2.5 py-0.5 rounded-md bg-slate-900/80 text-slate-300 border border-slate-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* VISION SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-slate-900/90 border border-slate-800 p-8 sm:p-14 overflow-hidden">
          <div className="absolute top-1/2 left-0 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-8 max-w-4xl mx-auto">
            <div className="space-y-3 text-center">
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">
                MYK Ecosystem Roadmap
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white">
                {t.home.visionTitle}
              </h2>
            </div>

            <blockquote className="text-base sm:text-lg italic text-indigo-200/90 text-center border-y border-slate-800/80 py-6 px-4">
              "{t.home.visionQuote}"
            </blockquote>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300">
              <div className="p-6 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
                <Bot className="w-6 h-6 text-indigo-400" />
                <h3 className="font-bold text-white text-base">Multi-Agent System & AI Services</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{t.home.visionP1}</p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
                <Layers className="w-6 h-6 text-purple-400" />
                <h3 className="font-bold text-white text-base">Clean Architecture & Expansion</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{t.home.visionP2}</p>
              </div>
            </div>

            <div className="text-center pt-2">
              <button
                onClick={onOpenProjects}
                className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition-all inline-flex items-center gap-2"
              >
                <span>Explore Full Ecosystem Architecture</span>
                <ChevronRight className={`w-4 h-4 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="max-w-5xl mx-auto px-4 text-center">
        <div className="glass-panel p-10 sm:p-16 rounded-3xl border border-indigo-500/30 space-y-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 pointer-events-none" />

          <h2 className="text-3xl sm:text-5xl font-black text-white">
            {t.home.ctaTitle}
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            {t.home.ctaSubtitle}
          </p>

          <div>
            <button
              onClick={() => onNavigate('contact')}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 hover:scale-105 transition-all inline-flex items-center gap-2"
            >
              <Rocket className="w-4 h-4" />
              <span>{t.home.ctaButton}</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
