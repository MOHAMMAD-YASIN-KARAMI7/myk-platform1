import React, { useState } from 'react';
import { useI18n } from '../lib/i18nContext';
import { 
  Mail, 
  Send, 
  User, 
  MessageSquare, 
  Tag, 
  CheckCircle2, 
  AlertCircle, 
  Database, 
  Globe, 
  MapPin, 
  ShieldCheck,
  Loader2
} from 'lucide-react';

interface ContactPageProps {
  onOpenAdmin: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onOpenAdmin }) => {
  const { t } = useI18n();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setStatus('error');
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    setStatus('submitting');
    setErrorMessage(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
        setErrorMessage(result.error || t.contact.errorDesc);
      }
    } catch (err) {
      setStatus('error');
      setErrorMessage('Network error. Unable to reach SQLite database endpoint.');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 py-8">
      
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
          <Mail className="w-4 h-4" />
          <span>{t.contact.title}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Mohammad Yasin Karami
        </h1>
        <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
          {t.contact.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Contact Form */}
        <div className="lg:col-span-7 glass-card p-6 sm:p-10 rounded-3xl border border-slate-800 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-indigo-400" />
              <span>{t.contact.formTitle}</span>
            </h2>
            <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
              SQLite Ready
            </span>
          </div>

          {status === 'success' ? (
            <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 space-y-3 animate-in fade-in">
              <div className="flex items-center gap-2 text-base font-bold text-emerald-400">
                <CheckCircle2 className="w-6 h-6" />
                <span>{t.contact.successTitle}</span>
              </div>
              <p className="text-xs sm:text-sm text-emerald-200/90 leading-relaxed">
                {t.contact.successDesc}
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {status === 'error' && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage || t.contact.errorDesc}</span>
                </div>
              )}

              {/* Name Field */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{t.contact.nameLabel}</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={t.contact.namePlaceholder}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>

              {/* Email Field */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{t.contact.emailLabel}</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder={t.contact.emailPlaceholder}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>

              {/* Subject Field */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{t.contact.subjectLabel}</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder={t.contact.subjectPlaceholder}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>

              {/* Message Field */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{t.contact.messageLabel}</span>
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={t.contact.messagePlaceholder}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-bold text-sm shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/40 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
              >
                {status === 'submitting' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{t.contact.submitting}</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>{t.contact.submitButton}</span>
                  </>
                )}
              </button>

            </form>
          )}

        </div>

        {/* Info & SQLite Database Link Sidebar */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
            <h3 className="text-base font-bold text-white border-b border-slate-800/80 pb-3">
              {t.contact.infoTitle}
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-slate-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block font-bold text-white">Location</span>
                  <span className="text-slate-400">{t.contact.infoLocation}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block font-bold text-white">Email</span>
                  <a href={`mailto:${t.contact.infoEmail}`} className="text-indigo-400 hover:underline">
                    {t.contact.infoEmail}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Globe className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="block font-bold text-white">Social & Channels</span>
                  <div className="flex flex-wrap gap-2 pt-1">
                    <a
                      href="https://github.com/mohammad-yasin-karami"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 hover:text-white hover:border-indigo-500/50 transition-all"
                    >
                      GitHub
                    </a>
                    <a
                      href="https://t.me/mykcontactbot"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs text-sky-400 hover:text-sky-300 hover:border-sky-500/50 transition-all"
                    >
                      Telegram Bot
                    </a>
                    <a
                      href="https://instagram.com/officiallmyk"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs text-pink-400 hover:text-pink-300 hover:border-pink-500/50 transition-all"
                    >
                      Instagram
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block font-bold text-white">Role</span>
                  <span className="text-slate-400">{t.contact.infoRole}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Direct SQLite DB Management Box */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-emerald-500/20 space-y-4">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <Database className="w-5 h-5 animate-pulse" />
              <span>ContactMessage Database Repository</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every submitted message is sanitized against XSS and saved to SQLite using Prisma-compatible repositories. Click below to view live stored records.
            </p>
            <button
              onClick={onOpenAdmin}
              className="w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-emerald-500/30 text-xs font-semibold transition-all flex items-center justify-center gap-2"
            >
              <Database className="w-4 h-4" />
              <span>{t.contact.messagesHistoryTitle}</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
