import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ size = 'md', showSubtitle = true }) => {
  const boxDimensions = {
    sm: 'w-8 h-8 rounded-lg text-xs',
    md: 'w-10 h-10 rounded-xl text-sm',
    lg: 'w-14 h-14 rounded-2xl text-lg',
  }[size];

  const titleSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-2xl',
  }[size];

  return (
    <div className="group flex items-center gap-3">
      <div className={`relative flex items-center justify-center ${boxDimensions} bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 p-[1.5px] shadow-lg shadow-indigo-500/25 group-hover:shadow-indigo-500/45 transition-all duration-300`}>
        <div className="w-full h-full bg-slate-950 dark:bg-slate-950 rounded-[inherit] flex items-center justify-center font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 tracking-wider">
          MYK
        </div>
      </div>
      <div>
        <div className="flex items-center gap-2">
          <span className={`font-black tracking-tight text-slate-100 dark:text-white ${titleSizes} group-hover:text-indigo-400 transition-colors`}>
            MYK
          </span>
          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-bold font-mono">
            v1.0
          </span>
        </div>
        {showSubtitle && (
          <p className="text-[11px] text-slate-400 dark:text-slate-400 font-medium leading-none mt-0.5">
            Mohammad Yasin Karami
          </p>
        )}
      </div>
    </div>
  );
};
