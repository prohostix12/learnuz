import React from 'react';

// Custom inline SVGs for University Logos to look highly professional
export const ManipalLogo = () => (
  <svg width="36" height="36" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
    <circle cx="50" cy="50" r="45" fill="#FFF5F2" stroke="#E05A36" strokeWidth="2" />
    <path d="M50 20C45 25 40 28 32 30V50C32 62 42 74 50 78C58 74 68 62 68 50V30C60 28 55 25 50 20Z" fill="#E05A36" />
    <path d="M50 25C47 29 43 31 37 33V47C37 56 45 66 50 70C55 66 63 56 63 47V33C57 31 53 29 50 25Z" fill="#FFF" />
    <circle cx="50" cy="46" r="8" fill="#E05A36" />
    <path d="M50 12V18" stroke="#E05A36" strokeWidth="3" strokeLinecap="round" />
    <path d="M43 14L46.5 19" stroke="#E05A36" strokeWidth="3" strokeLinecap="round" />
    <path d="M57 14L53.5 19" stroke="#E05A36" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

export const JainLogo = () => (
  <div className="w-9 h-9 rounded-lg bg-[#0F3A85] flex items-center justify-center shrink-0 shadow-sm border border-[#0F3A85]/20">
    <span className="text-[10px] font-black text-white tracking-widest pl-0.5">JAIN</span>
  </div>
);

export const AMULogo = () => (
  <div className="w-9 h-9 rounded-lg bg-[#0A5C36] flex items-center justify-center shrink-0 shadow-sm border border-[#0A5C36]/20">
    <span className="text-[10px] font-black text-white tracking-widest pl-0.5">AMU</span>
  </div>
);

export default function UniversityLogo({ universityName = '', logoUrl = '' }) {
  if (logoUrl) {
    return (
      <div className="w-9 h-9 flex items-center justify-center overflow-hidden bg-white rounded-lg border border-slate-100/80 shrink-0 shadow-sm">
        <img 
          src={logoUrl} 
          alt={universityName} 
          className="w-full h-full object-contain p-0.5" 
        />
      </div>
    );
  }

  const name = universityName.toLowerCase();
  
  if (name.includes('manipal')) {
    return <ManipalLogo />;
  }
  if (name.includes('jain')) {
    return <JainLogo />;
  }
  if (name.includes('aligarh') || name.includes('amu')) {
    return <AMULogo />;
  }
  
  // Custom generated logo with initials for any newly added universities
  const initials = universityName
    .split(' ')
    .filter(word => word.length > 0)
    .map(word => word[0])
    .join('')
    .slice(0, 3)
    .toUpperCase();

  // Pick a professional gradient based on initials hash
  const gradients = [
    'from-blue-600 to-indigo-600',
    'from-purple-600 to-pink-600',
    'from-emerald-600 to-teal-600',
    'from-orange-600 to-red-600',
    'from-cyan-600 to-blue-600'
  ];
  
  let hash = 0;
  for (let i = 0; i < initials.length; i++) {
    hash += initials.charCodeAt(i);
  }
  const gradient = gradients[hash % gradients.length];
    
  return (
    <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center shrink-0 shadow-sm border border-slate-200/20 text-white font-bold text-xs tracking-wider`}>
      {initials || 'UNI'}
    </div>
  );
}
