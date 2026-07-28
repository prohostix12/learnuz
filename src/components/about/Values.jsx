import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Trophy, Handshake, TrendingUp } from 'lucide-react';

export default function Values() {
  const values = [
    {
      icon: Trophy,
      emoji: '🎯',
      title: 'Student First',
      description: 'Your goals, preferences, and long-term careers direct our consultations. Every decision starts with your success in mind.',
      color: 'from-blue-500 to-indigo-500',
      bg: 'bg-blue-500/10'
    },
    {
      icon: Sparkles,
      emoji: '🌍',
      title: 'Global Opportunities',
      description: 'We connect local ambitions with global resources, breaking regional borders to offer access to world-class learning structures.',
      color: 'from-indigo-500 to-purple-500',
      bg: 'bg-indigo-500/10'
    },
    {
      icon: Handshake,
      emoji: '🤝',
      title: 'Honest Guidance',
      description: 'Zero hidden clauses. We provide transparent advice on university status, total fees, scholarship conditions, and visa chances.',
      color: 'from-purple-500 to-pink-500',
      bg: 'bg-purple-500/10'
    },
    {
      icon: TrendingUp,
      emoji: '🚀',
      title: 'Continuous Growth',
      description: 'We constantly innovate our counseling software and partnerships to bring you the fastest, most effective enrollment path possible.',
      color: 'from-pink-500 to-blue-500',
      bg: 'bg-pink-500/10'
    }
  ];

  return (
    <section className="py-24 sm:py-32 bg-slate-50/40 backdrop-blur-md dark:bg-slate-900/40 relative overflow-hidden">
      
      {/* Background elements */}
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-widest">
            <span>Core Beliefs</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight">
            Our Academic{' '}
            <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
              Values & Vision
            </span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-slate-800 dark:text-slate-200 font-normal max-w-xl mx-auto leading-relaxed">
            These values govern our counseling methodology, university relations, and commitment to student progress.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((val, idx) => {
            const Icon = val.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ y: -6, scale: 1.01, transition: { duration: 0.2 } }}
                className="relative p-8 rounded-3xl bg-white/40 dark:bg-slate-800/30 backdrop-blur-xl border border-white/60 dark:border-slate-800 shadow-xl shadow-slate-100/50 dark:shadow-none flex flex-col justify-between overflow-hidden group"
              >
                {/* Background soft blur card aura */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl group-hover:bg-indigo-500/10 transition-colors duration-300" />

                <div className="space-y-6">
                  {/* Emoji and Icon Header Row */}
                  <div className="flex items-center justify-between">
                    <span className="text-3xl" role="img" aria-label={val.title}>
                      {val.emoji}
                    </span>
                    <div className={`w-10 h-10 rounded-xl ${val.bg} flex items-center justify-center`}>
                      <Icon className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                      {val.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-normal leading-relaxed">
                      {val.description}
                    </p>
                  </div>
                </div>

                {/* Bottom line gradient accent on hover */}
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
