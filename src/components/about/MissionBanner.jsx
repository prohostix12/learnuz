import React from 'react';
import { motion } from 'framer-motion';
import { Compass } from 'lucide-react';

export default function MissionBanner({ onOpenCourseFinder }) {
  return (
    <section 
      className="relative h-[60vh] sm:h-[70vh] flex items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1600')`,
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Dark violet-purple overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950/85 via-[#091535]/90 to-purple-950/80 z-0"></div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 hero-grid-pattern opacity-10 pointer-events-none z-0"></div>

      {/* Floating Blobs */}
      <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Centered Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="space-y-6 sm:space-y-8"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white border border-white/20 font-bold text-xs uppercase tracking-widest backdrop-blur-sm">
            💡 Our Philosophy
          </span>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white leading-tight max-w-2xl mx-auto tracking-tight">
            Education Changes Lives.{' '}
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
              We Help You Reach It.
            </span>
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-lg mx-auto font-light leading-relaxed">
            By simplifying university admissions and offering direct counsel, we guide you to study abroad and earn your dream degree.
          </p>

          <div className="pt-2">
            <motion.button
              onClick={onOpenCourseFinder}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="group flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-3xl bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold text-base shadow-2xl shadow-indigo-500/20 border border-white/10 transition-all duration-300 mx-auto cursor-pointer"
            >
              <Compass className="w-5 h-5" />
              <span>Explore Courses</span>
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Decorative Bottom Shadow Accent */}
      <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white to-transparent pointer-events-none z-0"></div>
    </section>
  );
}
