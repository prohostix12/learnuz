import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, PhoneCall, Compass, Home } from 'lucide-react';

export default function Hero({ onOpenCourseFinder, onOpenRegister }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const floatVariants = (duration, delay) => ({
    animate: {
      y: [0, -15, 0],
      x: [0, 10, 0],
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
    <section className="relative min-h-[85vh] lg:h-[90vh] w-full flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 py-20">
      
      {/* Background Image of beautiful campus */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1600"
          alt="University Campus Background"
          className="w-full h-full object-cover object-center"
        />
        {/* Blue to Purple gradient overlay with high backdrop blur / transparency */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/80 via-blue-950/85 to-purple-950/90 backdrop-blur-[2px]"></div>
      </div>

      {/* Grid Pattern overlay for depth */}
      <div className="absolute inset-0 hero-grid-pattern opacity-15 pointer-events-none z-0"></div>

      {/* Floating Gradient Blobs */}
      <motion.div
        variants={floatVariants(6, 0)}
        animate="animate"
        className="absolute top-1/4 left-10 sm:left-20 w-48 sm:w-72 h-48 sm:h-72 bg-blue-500/25 rounded-full blur-3xl pointer-events-none z-0"
      />
      <motion.div
        variants={floatVariants(8, 2)}
        animate="animate"
        className="absolute bottom-1/4 right-10 sm:right-20 w-64 sm:w-96 h-64 sm:h-96 bg-purple-500/25 rounded-full blur-3xl pointer-events-none z-0"
      />
      <motion.div
        variants={floatVariants(7, 1)}
        animate="animate"
        className="absolute top-10 right-1/3 w-32 sm:w-48 h-32 sm:h-48 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none z-0"
      />

      {/* Subtle Particles Effect using floating circles */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(12)].map((_, i) => {
          // Deterministic values based on index to avoid hydration mismatch
          const top = `${(i * 7 + 13) % 100}%`;
          const left = `${(i * 13 + 7) % 100}%`;
          const duration = 3 + ((i * 3) % 4);
          const delay = (i * 0.5) % 2;

          return (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full bg-white/40"
              style={{ top, left }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration,
                repeat: Infinity,
                ease: 'easeInOut',
                delay,
              }}
            />
          );
        })}
      </div>

      {/* Centered Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6 sm:space-y-8 flex flex-col items-center"
        >
          {/* Breadcrumb Navigation */}
          {/* <motion.div 
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm text-slate-200 shadow-sm"
          >
            <a href="/" className="hover:text-blue-400 transition-colors flex items-center gap-1">
              <Home className="w-3.5 h-3.5" /> Home
            </a>
            <span className="text-white/40">/</span>
            <span className="text-white font-medium">About</span>
          </motion.div> */}

          {/* Small Badge Tag */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4.5 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-600/20 border border-blue-400/30 text-blue-300 font-bold text-xs uppercase tracking-widest shadow-md backdrop-blur-sm"
          >
            <GraduationCap className="w-4 h-4 text-blue-400" />
            <span>About Learnuz</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] max-w-3xl"
          >
            Empowering Students to Build Their{' '}
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
              Global Future
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg md:text-xl text-slate-200 max-w-2xl font-light leading-relaxed px-2"
          >
            Learnuz connects students with the best universities, career guidance, scholarships, and admission support across the world.
          </motion.p>

          {/* Action CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 w-full sm:w-auto"
          >
            {/* Find Your Course Button */}
            <motion.button
              onClick={onOpenCourseFinder}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 rounded-3xl bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold text-base shadow-xl shadow-purple-500/20 transition-all duration-300 cursor-pointer"
            >
              <Compass className="w-5 h-5" />
              <span>Find Your Course</span>
            </motion.button>

            {/* Contact Advisor Button */}
            <motion.button
              onClick={onOpenRegister}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 rounded-3xl backdrop-blur-md bg-white/10 hover:bg-white/20 text-white font-bold text-base border border-white/30 shadow-xl transition-all duration-300 cursor-pointer"
            >
              <PhoneCall className="w-5 h-5 text-blue-400" />
              <span>Contact Advisor</span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Curved Bottom Shape */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none z-0"></div>
    </section>
  );
}
