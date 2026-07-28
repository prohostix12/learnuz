"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Building2 } from 'lucide-react';
import { universities as staticUniversities } from '../data/universities';

// Subcomponent: Large Featured Card (Column 1)
function FeaturedCard({ university, onClick, programs = [] }) {
  if (!university) return null;
  const { name, shortName, location, naacGrade, established, programsCount, studentsCount, feeRange, coverImage } = university;
  
  return (
    <div 
      onClick={onClick}
      className="relative h-[500px] lg:h-full min-h-[480px] rounded-[32px] overflow-hidden border border-slate-100 shadow-xl group flex flex-col justify-between p-6 sm:p-8 cursor-pointer hover:shadow-2xl transition-all duration-300"
    >
      {/* Background Cover Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 z-0" 
        style={{ backgroundImage: `url(${coverImage})` }} 
      />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/85 to-slate-950/20 z-10" />

      {/* Top Section */}
      <div className="relative z-20 flex justify-between items-start">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-bold border border-white/20 uppercase tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
          Featured
        </span>
      </div>

      {/* Middle & Bottom Sections */}
      <div className="relative z-20 mt-auto flex flex-col h-full justify-between pt-16">
        
        {/* Title, Location & NAAC */}
        <div className="mt-auto">
          <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight tracking-tight">
            {name}
          </h3>
          <span className="text-slate-300 text-xs font-semibold tracking-wider block mt-1">({shortName})</span>
          
          <div className="flex flex-wrap items-center gap-3 mt-3">
            <span className="flex items-center gap-1 text-slate-300 text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
              {location}, UP
            </span>
            <span className="px-2.5 py-0.5 bg-amber-400 text-slate-950 text-[10px] font-black rounded-md uppercase tracking-wider">
              {naacGrade}
            </span>
          </div>

          {/* Offered Programs */}
          <div className="mt-5">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-2">Offered Programs</span>
            {programs.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {programs.map((prog, idx) => (
                  <span key={prog._id || idx} className="px-2.5 py-1 bg-white/10 hover:bg-white/20 border border-white/10 text-white rounded-lg text-[10px] font-bold tracking-wide transition-colors" title={prog.title}>
                    {prog.code} - {prog.title}
                  </span>
                ))}
              </div>
            ) : (
              <span className="text-[10px] font-semibold text-slate-400 italic">Explore programs in detail</span>
            )}
          </div>
        </div>

        {/* Horizontal stats block */}
        <div className="grid grid-cols-3 gap-2.5 my-6">
          <div className="bg-white/10 backdrop-blur-md border border-white/15 text-white rounded-2xl p-2.5 flex flex-col justify-center items-center text-center">
            <span className="text-sm font-extrabold">{programsCount}</span>
            <span className="text-[8px] uppercase tracking-wider opacity-85 mt-0.5">Programs</span>
          </div>
          <div className="bg-white/10 backdrop-blur-md border border-white/15 text-white rounded-2xl p-2.5 flex flex-col justify-center items-center text-center">
            <span className="text-sm font-extrabold">{studentsCount}</span>
            <span className="text-[8px] uppercase tracking-wider opacity-85 mt-0.5">Students</span>
          </div>
          <div className="bg-white/10 backdrop-blur-md border border-white/15 text-white rounded-2xl p-2.5 flex flex-col justify-center items-center text-center">
            <span className="text-sm font-extrabold">Est. {established}</span>
            <span className="text-[8px] uppercase tracking-wider opacity-85 mt-0.5">Year</span>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-2">
          <div className="flex flex-col">
            <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">Fee Range</span>
            <span className="text-base sm:text-lg font-black text-white mt-0.5">
              {feeRange}
            </span>
          </div>
          <div className="w-11 h-11 rounded-full bg-white text-slate-950 flex items-center justify-center transition-all group-hover:bg-blue-600 group-hover:text-white hover:scale-105 active:scale-95 shadow-lg shrink-0">
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>

      </div>
    </div>
  );
}

// Subcomponent: Wide Card (Column 2 Stack)
function WideUniversityCard({ university, onClick, programs = [] }) {
  if (!university) return null;
  const { name, shortName, location, naacGrade, programsCount, feeRange, coverImage } = university;
  
  // Format state suffix for locations
  const displayLocation = location === 'Bengaluru' ? 'Bengaluru, KA' : `${location}, UP`;

  return (
    <div 
      onClick={onClick}
      className="flex flex-col justify-between h-[210px] sm:h-[195px] rounded-[28px] border border-white/10 shadow-xl group relative overflow-hidden p-5 flex-grow cursor-pointer hover:shadow-2xl transition-all duration-300"
    >
      {/* Background Cover Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 z-0" 
        style={{ backgroundImage: `url(${coverImage})` }} 
      />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-slate-950/20 z-10" />
      
      {/* Top Info Block (relative z-10 for overlay overlap) */}
      <div className="relative z-10 flex-grow min-w-0">
        <div className="flex justify-between items-start">
          <div className="min-w-0 pr-3">
            <h3 className="text-lg font-black text-white tracking-tight leading-tight truncate">
              {name}
            </h3>
            <span className="text-slate-300 text-xs font-semibold mt-0.5 block">({shortName})</span>
          </div>
          <span className="px-2 py-0.5 bg-amber-400 text-slate-950 text-[9px] font-black rounded uppercase tracking-wider shrink-0 mt-0.5">
            {naacGrade}
          </span>
        </div>

        <div className="flex items-center gap-3 mt-2 flex-wrap text-slate-300">
          <span className="text-[11px] font-bold flex items-center gap-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
            {displayLocation}
          </span>
          <span className="text-[11px] font-bold">•</span>
          <span className="text-[11px] font-bold">{programsCount}+ Programs</span>
        </div>

        {programs.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2.5">
            {programs.map((prog, idx) => (
              <span key={prog._id || idx} className="px-2 py-0.5 bg-white/10 hover:bg-white/20 border border-white/10 text-white rounded-md text-[9px] font-bold transition-colors" title={prog.title}>
                {prog.code}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Row: Fee & Button */}
      <div className="relative z-10 flex items-end justify-between pt-3 border-t border-white/10 mt-4">
        <div className="flex flex-col">
          <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">Fee Range</span>
          <span className="text-sm font-extrabold text-white mt-0.5">{feeRange}</span>
        </div>
        <div className="w-10 h-10 rounded-full bg-white text-slate-950 flex items-center justify-center shadow-md group-hover:bg-blue-600 group-hover:text-white transition-all hover:scale-105 active:scale-95 shrink-0">
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>

    </div>
  );
}

// Subcomponent: Vertical Banner (Column 3)
function ComparisonBanner({ title, subtitle, buttonText, onClick }) {
  return (
    <div className="h-full min-h-[480px] bg-gradient-to-br from-[#091535] via-slate-950 to-[#0d1e4e] border border-slate-800 rounded-[32px] p-8 flex flex-col justify-between items-center text-center shadow-xl relative overflow-hidden group">
      
      {/* Background Decor */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none z-0" />
      
      {/* Cap Icon */}
      <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-indigo-400 mb-6 mx-auto shadow-inner group-hover:scale-105 transition-transform z-10 mt-4">
        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
        </svg>
      </div>

      <div className="z-10 flex flex-col justify-center flex-grow">
        <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mt-4 max-w-[210px] mx-auto">
          {subtitle}
        </p>
      </div>

      <button
        onClick={onClick}
        className="w-full py-4 rounded-2xl bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg transition-all active:scale-98 mt-8 z-10 cursor-pointer"
      >
        {buttonText}
      </button>

    </div>
  );
}

export default function Universities() {
  const router = useRouter();
  const [universitiesList, setUniversitiesList] = React.useState(staticUniversities);
  const [programsData, setProgramsData] = React.useState([]);

  React.useEffect(() => {
    async function loadData() {
      try {
        const [uniRes, progRes] = await Promise.all([
          fetch('/api/universities'),
          fetch('/api/programs')
        ]);
        if (uniRes.ok) {
          const uniData = await uniRes.json();
          setUniversitiesList(uniData);
        }
        if (progRes.ok) {
          const progData = await progRes.json();
          setProgramsData(progData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    loadData();
  }, []);

  const getUniPrograms = (uni) => {
    if (!uni) return [];
    return programsData.filter(p => 
      p.university.toLowerCase().trim() === uni.name.toLowerCase().trim() ||
      p.university.toLowerCase().trim().includes(uni.shortName.toLowerCase().trim()) ||
      uni.name.toLowerCase().trim().includes(p.university.toLowerCase().trim())
    );
  };

  // Retrieve featured universities dynamically by ID for Set 1
  const uniAmu = universitiesList.find(u => u.id === 'amu') || universitiesList[0];
  const uniGla = universitiesList.find(u => u.id === 'gla') || universitiesList[1];
  const uniJain = universitiesList.find(u => u.id === 'jain') || universitiesList[2];

  const uniAmuPrograms = getUniPrograms(uniAmu);
  const uniGlaPrograms = getUniPrograms(uniGla);
  const uniJainPrograms = getUniPrograms(uniJain);

  const handleNavigate = () => {
    router.push('/universities');
  };

  return (
    <section id="universities" className="py-24 bg-gradient-to-b from-[#F8FAFF]/30 to-white/30 backdrop-blur-md relative overflow-hidden border-t border-[#E5E7EB]">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-600/10 text-blue-700 border border-blue-500/15 text-xs font-bold uppercase tracking-wider mb-4">
              <Building2 className="w-3.5 h-3.5" />
              <span>Partner Universities</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-[#0F172A] tracking-tight">
              Find India's Best Universities
            </h2>
            <p className="text-slate-500 text-lg mt-3 font-medium">
              Explore accredited degrees and certifications from top tier UGC-DEB approved institutions.
            </p>
          </div>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Column 1: Featured (5 cols) */}
          <div className="lg:col-span-5">
            <FeaturedCard university={uniAmu} programs={uniAmuPrograms} onClick={() => uniAmu && router.push(`/universities/${uniAmu.id}`)} />
          </div>
 
          {/* Column 2: Stacked Wide Cards (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6 justify-between">
            <WideUniversityCard university={uniGla} programs={uniGlaPrograms} onClick={() => uniGla && router.push(`/universities/${uniGla.id}`)} />
            <WideUniversityCard university={uniJain} programs={uniJainPrograms} onClick={() => uniJain && router.push(`/universities/${uniJain.id}`)} />
          </div>

          {/* Column 3: Custom Vertical Banner (3 cols) */}
          <div className="lg:col-span-3">
            <ComparisonBanner 
              title="Find Your Perfect University" 
              subtitle="Compare, Explore and Choose the Best for You." 
              buttonText="Compare Now"
              onClick={handleNavigate}
            />
          </div>
        </div>

      </div>
    </section>
  );
}
