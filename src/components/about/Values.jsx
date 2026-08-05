import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Trophy, Handshake } from 'lucide-react';

export default function Values() {
  const values = [
    {
      icon: Trophy,
      title: 'Student First',
      description: 'Your goals, preferences, and long-term careers direct our consultations. Every decision starts with your success in mind.',
    },
    {
      icon: Handshake,
      title: 'Honest Guidance',
      description: 'Zero hidden clauses. We provide transparent advice on university status, total fees, scholarship conditions, and visa chances.',
    },
    {
      icon: Sparkles,
      title: 'Global Opportunities',
      description: 'We connect local ambitions with global resources, breaking regional borders to offer access to world-class learning structures.',
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-transparent">
      
      {/* Session Wrapper with Curved Borders & Gradient Background */}
      <div className="max-w-7xl mx-auto rounded-[2.5rem] sm:rounded-[3rem] hero-wrapper-bg relative overflow-hidden p-8 sm:p-12 md:p-16 shadow-2xl border border-white/10 text-white">
        
        {/* Background soft glowing elements */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-300 border border-white/20 font-bold text-xs uppercase tracking-widest backdrop-blur-sm">
              <span>Core Beliefs</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
              Our Academic{' '}
              <span className="bg-gradient-to-r from-emerald-300 to-sky-300 bg-clip-text text-transparent">
                Values & Vision
              </span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-emerald-50/80 font-normal max-w-xl mx-auto leading-relaxed">
              These values govern our counseling methodology, university relations, and commitment to student progress.
            </p>
          </div>

          {/* 3 Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((val, idx) => {
              const Icon = val.icon;
              const isMiddle = idx === 1;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  whileHover={{ y: -6, scale: 1.01, transition: { duration: 0.2 } }}
                  className={`relative p-8 sm:p-10 rounded-[2rem] shadow-xl flex flex-col justify-between overflow-hidden group transition-all duration-300 ${
                    isMiddle 
                      ? 'bg-[#12182d] text-white border border-white/5 shadow-2xl' 
                      : 'bg-white text-slate-800 border border-slate-100 shadow-md'
                  }`}
                >
                  {/* Background soft blur card aura */}
                  {isMiddle && (
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-400/5 rounded-full blur-2xl group-hover:bg-emerald-400/10 transition-colors duration-300" />
                  )}

                  <div className="space-y-6">
                    {/* Icon Header Row */}
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-105 ${
                      isMiddle ? 'bg-white text-[#12182d]' : 'bg-[#12182d] text-white'
                    }`}>
                      <Icon className="w-6 h-6" />
                    </div>

                    <div className="space-y-3">
                      <h3 className={`text-xl font-bold tracking-tight ${
                        isMiddle ? 'text-white' : 'text-slate-900'
                      }`}>
                        {val.title}
                      </h3>
                      <p className={`text-sm leading-relaxed font-normal ${
                        isMiddle ? 'text-slate-300' : 'text-slate-600'
                      }`}>
                        {val.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
