import React from 'react';
import { motion } from 'framer-motion';
import { Compass, PhoneCall } from 'lucide-react';

export default function CTA({ onOpenCourseFinder, onOpenRegister }) {
  const floatVariants = (duration, delay) => ({
    animate: {
      y: [0, -12, 0],
      x: [0, 8, 0],
      transition: {
        duration: duration,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
        delay: delay
      }
    }
  });

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-transparent">
      
      {/* Container with rounded-3xl, gradient background, shadow-xl */}
      <div className="max-w-7xl mx-auto rounded-[2.5rem] sm:rounded-[3rem] bg-gradient-to-br from-[#091535] via-[#0d1e4c] to-indigo-950 relative overflow-hidden p-8 sm:p-12 md:p-16 lg:p-20 shadow-2xl border border-white/10 text-center text-white">
        
        {/* Floating gradient circles and blur */}
        <motion.div
          variants={floatVariants(6, 0)}
          animate="animate"
          className="absolute -top-12 -left-12 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"
        />
        <motion.div
          variants={floatVariants(8, 2)}
          animate="animate"
          className="absolute -bottom-16 -right-16 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"
        />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 hero-grid-pattern opacity-10 pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 max-w-2xl mx-auto space-y-6 sm:space-y-8">
          
          <span className="bg-white/10 text-blue-200 text-xs sm:text-sm font-extrabold px-4 py-1.5 rounded-full uppercase tracking-wider border border-white/15">
            Take The Next Step
          </span>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            Your Future Starts With{' '}
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
              One Decision
            </span>
          </h2>
          
          <p className="text-sm sm:text-base md:text-lg text-slate-300 font-light leading-relaxed max-w-lg mx-auto">
            Find the perfect university and course with expert guidance from Learnuz. Our counselors are ready to map out your dream degree today.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 w-full sm:w-auto">
            {/* Find Your Course CTA */}
            <motion.button
              onClick={onOpenCourseFinder}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-3xl bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold text-base shadow-xl shadow-purple-500/20 transition-all duration-300 cursor-pointer"
            >
              <Compass className="w-5 h-5 text-white" />
              <span>Find Your Course</span>
            </motion.button>

            {/* Book Free Consultation CTA */}
            <motion.button
              onClick={onOpenRegister}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-3xl backdrop-blur-md bg-white/10 hover:bg-white/20 text-white font-bold text-base border border-white/20 shadow-xl transition-all duration-300 cursor-pointer"
            >
              <PhoneCall className="w-5 h-5 text-blue-400" />
              <span>Book Free Consultation</span>
            </motion.button>
          </div>

        </div>

      </div>
    </section>
  );
}
