import React from 'react';
import { Building2, Award, ShieldCheck, Globe2 } from 'lucide-react';

export default function Universities() {
  const universities = [
    { name: 'University of Oxford', location: 'United Kingdom', courses: '120+ Courses', icon: '🏛️' },
    { name: 'Stanford Online', location: 'California, USA', courses: '95+ Courses', icon: '🎓' },
    { name: 'Harvard Extension', location: 'Massachusetts, USA', courses: '150+ Courses', icon: '📜' },
    { name: 'MIT Open Courseware', location: 'Cambridge, USA', courses: '110+ Courses', icon: '🔬' },
    { name: 'Cambridge Education', location: 'United Kingdom', courses: '85+ Courses', icon: '📖' },
    { name: 'ETH Zurich Institute', location: 'Switzerland', courses: '70+ Courses', icon: '🌐' },
  ];

  return (
    <section id="universities" className="py-16 bg-slate-900 text-white relative overflow-hidden">
      
      {/* Radial Blue Glow Background */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-bold uppercase tracking-wider mb-4">
            <Building2 className="w-4 h-4 text-blue-400" />
            <span>Accredited Academic Network</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Partnered With Top Global Universities
          </h2>
          <p className="text-slate-400 text-base sm:text-lg mt-3">
            Learnuz collaborates with world-renowned higher education institutions to bring you official degrees, certified credits, and expert lectures.
          </p>
        </div>

        {/* University Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {universities.map((uni, index) => (
            <div
              key={index}
              className="bg-slate-800/80 backdrop-blur-md border border-slate-700/80 hover:border-blue-500/50 p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/10 group flex items-start gap-4"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-500/30 flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-transform">
                {uni.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                  {uni.name}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
                  <Globe2 className="w-3.5 h-3.5 text-slate-500" />
                  <span>{uni.location}</span>
                </div>
                <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-300 border border-blue-500/20">
                  <Award className="w-3 h-3 text-blue-400" />
                  <span>{uni.courses}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Verification Footer Banner */}
        <div className="mt-12 p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-blue-900/40 via-indigo-900/40 to-slate-800 border border-blue-500/20 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-blue-400 shrink-0" />
            <span className="text-sm font-medium text-slate-300">
              All degree certificates earned through Learnuz are fully accredited and recognized worldwide.
            </span>
          </div>
          <button className="text-xs sm:text-sm font-bold text-blue-400 hover:text-white underline underline-offset-4 transition-colors">
            View Academic Credentials & Policy →
          </button>
        </div>

      </div>
    </section>
  );
}
