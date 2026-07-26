import React from 'react';
import { useI18n } from '../lib/i18nContext';
import { ProjectCard } from '../types';
import { 
  X, 
  Sparkles, 
  Bot, 
  BookOpen, 
  GraduationCap, 
  Calendar, 
  Cpu, 
  Layout, 
  Code2, 
  FileText,
  CheckCircle2,
  Clock
} from 'lucide-react';

interface ProjectsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContactClick: () => void;
}

export const ProjectsModal: React.FC<ProjectsModalProps> = ({ isOpen, onClose, onContactClick }) => {
  const { t } = useI18n();

  if (!isOpen) return null;

  const ecosystemModules: ProjectCard[] = [
    {
      id: 'myk-core',
      title: 'MYK Platform v1.0 Core',
      subtitle: 'Digital Home & High-Performance Hub',
      description: 'The primary production gateway featuring glassmorphism UI, SQLite/Prisma abstraction, and RTL/LTR internationalization.',
      tags: ['Next.js / React', 'TypeScript', 'SQLite', 'Tailwind CSS'],
      status: 'Production v1.0',
      category: 'Core System',
    },
    {
      id: 'ai-agentic-core',
      title: 'MYK AI Agentic Core',
      subtitle: 'Autonomous AI Services & Orchestration',
      description: 'Distributed multi-agent execution pipeline in Python for automated research, code synthesis, and intelligent decisioning.',
      tags: ['Python', 'PyTorch', 'FastAPI', 'LLM Agents'],
      status: 'Roadmap v2.0',
      category: 'AI Services',
    },
    {
      id: 'myk-articles-cms',
      title: 'MYK Monographs & Technical Articles',
      subtitle: 'Engineering Insights & AI Research',
      description: 'An integrated headless CMS for technical essays, machine learning breakdowns, and algorithmic whitepapers.',
      tags: ['Headless CMS', 'Markdown', 'SEO', 'KaTeX'],
      status: 'Roadmap v2.0',
      category: 'Articles',
    },
    {
      id: 'myk-courses',
      title: 'MYK AI Academy & Masterclasses',
      subtitle: 'Interactive Courses & Code Labs',
      description: 'Structured learning curricula covering advanced Python development, neural network design, and AI system architecture.',
      tags: ['Video Streaming', 'Interactive Labs', 'Certificates'],
      status: 'Roadmap v2.0',
      category: 'Courses',
    },
    {
      id: 'myk-books',
      title: 'Architecting Tomorrow (Book Series)',
      subtitle: 'Published Literature & Monographs',
      description: 'Comprehensive guides written by Mohammad Yasin Karami on building resilient tech ventures and AI products.',
      tags: ['E-pub', 'PDF', 'Technical Literature'],
      status: 'Research',
      category: 'Books',
    },
    {
      id: 'myk-apis',
      title: 'MYK Open Developer APIs',
      subtitle: 'RESTful & GraphQL Developer Endpoints',
      description: 'Public and enterprise API gateways providing specialized access to MYK AI model predictions and data pipelines.',
      tags: ['REST API', 'GraphQL', 'Rate Limiting', 'OAuth2'],
      status: 'Roadmap v2.0',
      category: 'APIs',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-900/80 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">MYK Ecosystem & Projects</h3>
              <p className="text-xs text-slate-400">
                Foundational Architecture & Release Roadmap
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          <div className="bg-gradient-to-r from-indigo-900/30 via-purple-900/20 to-slate-900 border border-indigo-500/20 rounded-xl p-4 text-sm text-slate-300">
            <div className="flex items-start gap-3">
              <Bot className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-white">Architecture Guarantee:</span> MYK Platform is built with modular Clean Architecture principles. Every module in this roadmap is designed to plug directly into the current SQLite/Prisma backend without breaking existing systems.
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ecosystemModules.map((item) => (
              <div
                key={item.id}
                className="glass-card p-5 rounded-2xl border border-slate-800/80 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-800 text-indigo-300 border border-slate-700">
                      {item.category}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs font-medium">
                      {item.status === 'Production v1.0' ? (
                        <span className="flex items-center gap-1 text-emerald-400 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                          <CheckCircle2 className="w-3 h-3" />
                          {item.status}
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-amber-400 px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20">
                          <Clock className="w-3 h-3" />
                          {item.status}
                        </span>
                      )}
                    </div>
                  </div>

                  <h4 className="text-base font-bold text-white mb-1">{item.title}</h4>
                  <p className="text-xs text-indigo-400 font-medium mb-2">{item.subtitle}</p>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">{item.description}</p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-800/60">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-slate-900 text-slate-300 border border-slate-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>Mohammad Yasin Karami • MYK Platform</span>
          <button
            onClick={() => {
              onClose();
              onContactClick();
            }}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium shadow-md shadow-indigo-600/20 transition-all"
          >
            {t.home.ctaButton}
          </button>
        </div>

      </div>
    </div>
  );
};
