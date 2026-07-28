import React from 'react';
import { motion } from 'framer-motion';
import { Award, Gift, FileSpreadsheet, Headset, Sparkles } from 'lucide-react';

export default function GlobalUniversities() {
  const countries = [
    { name: 'United Kingdom', code: 'UK', x: '45%', y: '25%' },
    { name: 'United States', code: 'USA', x: '20%', y: '35%' },
    { name: 'Canada', code: 'CAN', x: '18%', y: '20%' },
    { name: 'Australia', code: 'AUS', x: '82%', y: '75%' },
    { name: 'Germany', code: 'GER', x: '50%', y: '28%' },
    { name: 'Ireland', code: 'IRE', x: '42%', y: '24%' },
    { name: 'New Zealand', code: 'NZL', x: '88%', y: '82%' },
  ];

  const cards = [
    {
      icon: Award,
      title: 'Top Ranked Universities',
      description: 'Partnerships with Ivy League, Russell Group, and globally top-tier accredited institutions.',
      color: 'text-blue-500',
      bg: 'bg-blue-500/10'
    },
    {
      icon: Gift,
      title: 'Scholarship Assistance',
      description: 'Get direct updates and guidance on applying for academic grants and fully-funded fellowships.',
      color: 'text-indigo-500',
      bg: 'bg-indigo-500/10'
    },
    {
      icon: FileSpreadsheet,
      title: 'Application Support',
      description: 'Streamlined application processing, credit transfer evaluation, and fast-track admissions.',
      color: 'text-purple-500',
      bg: 'bg-purple-500/10'
    },
    {
      icon: Headset,
      title: 'Expert Guidance',
      description: 'Dedicated country specialists to guide you through visas, banking, accommodation, and flights.',
      color: 'text-pink-500',
      bg: 'bg-pink-500/10'
    }
  ];

  return (
    <section className="py-24 sm:py-32 bg-white/30 backdrop-blur-md relative overflow-hidden">
      
      {/* Light blue and purple background glows */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: World Connection Map Card */}
          <div className="lg:col-span-6 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8 }}
              className="w-full aspect-[4/3] rounded-[2.5rem] bg-[#091535] relative border border-slate-800 shadow-2xl p-6 overflow-hidden flex items-center justify-center group"
            >
              {/* Connection Grid Lines */}
              <div className="absolute inset-0 hero-grid-pattern opacity-10" />

              {/* Central glowing hub (Learnuz Logo representation) */}
              <div className="absolute w-24 h-24 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center animate-pulse z-20">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 shadow-lg shadow-blue-600/30 flex items-center justify-center text-white font-extrabold text-[10px] uppercase tracking-wider">
                  Learnuz
                </div>
              </div>

              {/* Pulsing connections overlay */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-70">
                <defs>
                  <linearGradient id="grad-line" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1f3f7a" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#03ae92" stopOpacity="0.2" />
                  </linearGradient>
                </defs>
                {/* Connecting lines from center (approx x: 50%, y: 50%) to countries */}
                {countries.map((c, i) => (
                  <motion.line
                    key={i}
                    x1="50%"
                    y1="50%"
                    x2={c.x}
                    y2={c.y}
                    stroke="url(#grad-line)"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                    animate={{
                      strokeDashoffset: [-20, 0],
                    }}
                    transition={{
                      duration: 4 + i,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  />
                ))}
              </svg>

              {/* Glowing Country Dots */}
              {countries.map((c, i) => (
                <div
                  key={i}
                  className="absolute z-20 flex flex-col items-center group/dot"
                  style={{ top: c.y, left: c.x }}
                >
                  <div className="relative">
                    {/* Ring ping */}
                    <div className="absolute -inset-1.5 rounded-full bg-indigo-500 animate-ping opacity-60" />
                    {/* Core Dot */}
                    <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 shadow-md border-2 border-white" />
                  </div>
                  {/* Floating tooltip */}
                  <div className="absolute bottom-6 bg-slate-900 border border-slate-700/80 px-2 py-0.5 rounded-lg shadow-xl text-[10px] font-bold text-white whitespace-nowrap opacity-80 group-hover/dot:opacity-100 scale-90 group-hover/dot:scale-100 transition-all duration-200 pointer-events-none">
                    {c.code}
                  </div>
                </div>
              ))}

              {/* Background gradient lights */}
              <div className="absolute bottom-0 right-0 w-48 h-48 bg-purple-500/10 rounded-full blur-2xl" />
              <div className="absolute top-0 left-0 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl" />
            </motion.div>
          </div>

          {/* Right Column: Content and feature cards */}
          <div className="lg:col-span-6 space-y-8">
            
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 font-bold text-xs uppercase tracking-widest"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Global Networks</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight"
              >
                Connected With Leading{' '}
                <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
                  Universities Worldwide
                </span>
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-600 text-base sm:text-lg font-normal leading-relaxed"
            >
              We partner directly with leading universities and academic authorities in{' '}
              <strong className="text-indigo-600 font-bold">
                UK, USA, Canada, Australia, Germany, Ireland, and New Zealand
              </strong>{' '}
              to secure quick acceptances and visa credentials for Indian students.
            </motion.p>

            {/* Feature Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {cards.map((card, idx) => {
                const Icon = card.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    className="p-5 rounded-3xl bg-slate-50 border border-slate-200/50 space-y-3"
                  >
                    <div className={`w-10 h-10 rounded-xl ${card.bg} flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${card.color}`} />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">
                      {card.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                      {card.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
