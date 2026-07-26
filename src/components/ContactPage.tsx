import React, { useState } from 'react';
import { useI18n } from '../lib/i18nContext';
import { BrandLogo } from './BrandLogo';
import { 
  Mail, 
  Send, 
  Instagram, 
  Github, 
  Linkedin, 
  Copy, 
  Check, 
  ExternalLink, 
  MapPin, 
  ShieldCheck, 
  Sparkles,
  MessageCircle,
  Globe
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { t, locale } = useI18n();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const socialChannels = [
    {
      id: 'telegram',
      title: 'تلگرام / Telegram',
      handle: '@mykcontactbot',
      fullAddress: 'https://t.me/mykcontactbot',
      copyValue: '@mykcontactbot',
      description: locale === 'fa' ? 'ارتباط مستقیم و پیام‌رسان سریع تلگرام' : 'Direct Telegram channel & instant messenger',
      icon: Send,
      color: 'from-sky-500 to-blue-600',
      textColor: 'text-sky-400',
      bgColor: 'bg-sky-500/10',
      borderColor: 'border-sky-500/20',
      hoverBorder: 'hover:border-sky-500/50',
      btnBg: 'bg-sky-600 hover:bg-sky-500',
    },
    {
      id: 'instagram',
      title: 'اینستاگرام / Instagram',
      handle: '@officiallmyk',
      fullAddress: 'https://instagram.com/officiallmyk',
      copyValue: '@officiallmyk',
      description: locale === 'fa' ? 'صفحه رسمی، استوری‌ها و به‌روزرسانی‌های روزانه' : 'Official Instagram page & daily updates',
      icon: Instagram,
      color: 'from-pink-500 via-rose-500 to-amber-500',
      textColor: 'text-pink-400',
      bgColor: 'bg-pink-500/10',
      borderColor: 'border-pink-500/20',
      hoverBorder: 'hover:border-pink-500/50',
      btnBg: 'bg-pink-600 hover:bg-pink-500',
    },
    {
      id: 'github',
      title: 'گیت‌هاب / GitHub',
      handle: 'mohammad-yasin-karami',
      fullAddress: 'https://github.com/mohammad-yasin-karami',
      copyValue: 'https://github.com/mohammad-yasin-karami',
      description: locale === 'fa' ? 'سورس‌کد پروژه‌ها، مخازن و سیستم‌های متن‌باز' : 'Open-source code, repositories & architecture',
      icon: Github,
      color: 'from-slate-700 to-slate-900',
      textColor: 'text-slate-200',
      bgColor: 'bg-slate-800/60',
      borderColor: 'border-slate-700',
      hoverBorder: 'hover:border-indigo-500/50',
      btnBg: 'bg-slate-800 hover:bg-slate-700',
    },
    {
      id: 'email',
      title: 'پست الکترونیکی / Official Email',
      handle: 'officiallcapitanyasin@gmail.com',
      fullAddress: 'mailto:officiallcapitanyasin@gmail.com',
      copyValue: 'officiallcapitanyasin@gmail.com',
      description: locale === 'fa' ? 'مکاتبات رسمی، پیشنهادهای کاری و پروژه‌ها' : 'Official inquiries, project requests & contracts',
      icon: Mail,
      color: 'from-indigo-500 to-purple-600',
      textColor: 'text-indigo-400',
      bgColor: 'bg-indigo-500/10',
      borderColor: 'border-indigo-500/20',
      hoverBorder: 'hover:border-indigo-500/50',
      btnBg: 'bg-indigo-600 hover:bg-indigo-500',
    },
    {
      id: 'linkedin',
      title: 'لینکدین / LinkedIn',
      handle: 'Mohammad Yasin Karami',
      fullAddress: 'https://linkedin.com/in/mohammad-yasin-karami',
      copyValue: 'https://linkedin.com/in/mohammad-yasin-karami',
      description: locale === 'fa' ? 'ارتباط حرفه‌ای، سوابق کاری و شبکه‌سازی' : 'Professional network & career trajectory',
      icon: Linkedin,
      color: 'from-blue-600 to-indigo-700',
      textColor: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20',
      hoverBorder: 'hover:border-blue-500/50',
      btnBg: 'bg-blue-600 hover:bg-blue-500',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 py-10">
      
      {/* Header & Logo Display */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold">
          <Sparkles className="w-4 h-4" />
          <span>{t.contact.title}</span>
        </div>

        <div className="flex justify-center pt-2">
          <BrandLogo size="lg" showSubtitle={true} />
        </div>

        <p className="text-sm sm:text-base text-slate-400 leading-relaxed pt-2">
          {t.contact.subtitle}
        </p>
      </div>

      {/* Social Channels Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {socialChannels.map((channel) => {
          const Icon = channel.icon;
          const isCopied = copiedKey === channel.id;

          return (
            <div
              key={channel.id}
              className={`group glass-card p-6 rounded-3xl border ${channel.borderColor} ${channel.hoverBorder} transition-all duration-300 flex flex-col justify-between hover:shadow-xl space-y-6`}
            >
              <div className="space-y-4">
                {/* Header Icon + Title */}
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-2xl ${channel.bgColor} ${channel.textColor} border ${channel.borderColor}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <button
                    onClick={() => handleCopy(channel.copyValue, channel.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 text-xs transition-all"
                    title="Copy handle"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-bold">{locale === 'fa' ? 'کپی شد' : 'Copied'}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>{locale === 'fa' ? 'کپی' : 'Copy'}</span>
                      </>
                    )}
                  </button>
                </div>

                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                    {channel.title}
                  </h3>
                  <p className="text-xs font-mono text-indigo-400 font-bold mt-0.5 dir-ltr text-right">
                    {channel.handle}
                  </p>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {channel.description}
                </p>
              </div>

              {/* Action Button */}
              <a
                href={channel.fullAddress}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full py-3 px-4 rounded-xl ${channel.btnBg} text-white font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-2 group-hover:scale-[1.01]`}
              >
                <span>{locale === 'fa' ? 'مشاهده و ارتباط مستقیم' : 'Open Direct Link'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          );
        })}
      </div>

      {/* Info Banner */}
      <div className="glass-panel p-8 rounded-3xl border border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
        <div className="flex items-center gap-4 justify-center md:justify-start">
          <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <MapPin className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 block">{locale === 'fa' ? 'موقعیت مکانی' : 'Location'}</span>
            <span className="text-sm font-bold text-white">{t.contact.infoLocation}</span>
          </div>
        </div>

        <div className="flex items-center gap-4 justify-center md:justify-start">
          <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 block">{locale === 'fa' ? 'عنوان و مسئولیت' : 'Role'}</span>
            <span className="text-sm font-bold text-white">{t.contact.infoRole}</span>
          </div>
        </div>

        <div className="flex items-center gap-4 justify-center md:justify-start">
          <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <Globe className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 block">{locale === 'fa' ? 'پاسخگویی' : 'Response'}</span>
            <span className="text-sm font-bold text-emerald-400">
              {locale === 'fa' ? 'پاسخگویی سریع در تلگرام و ایمیل' : 'Fast response via Telegram & Email'}
            </span>
          </div>
        </div>
      </div>

    </div>
  );
};
