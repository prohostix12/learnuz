import React from 'react';
import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  Globe, 
  FileCheck, 
  Coins, 
  PlaneTakeoff, 
  Briefcase,
  Sparkles
} from 'lucide-react';

export default function WhyChoose() {
  const features = [
    {
      icon: GraduationCap,
      title: 'Expert Career Counselling',
      description: 'Find your true path with guidance from academic mentors who map your interests to international careers.',
      color: 'text-blue-500',
      bg: 'bg-blue-500/10'
    },
    {
      icon: Globe,
      title: 'Global University Network',
      description: 'Gain access to 250+ partner universities across UK, USA, Canada, Germany, Australia, and New Zealand.',
      color: 'text-indigo-500',
      bg: 'bg-indigo-500/10'
    },
    {
      icon: FileCheck,
      title: 'Admission Assistance',
      description: 'Get step-by-step help compiling documents, editing personal statements, and submitting error-free applications.',
      color: 'text-purple-500',
      bg: 'bg-purple-500/10'
    },
    {
      icon: Coins,
      title: 'Scholarship Guidance',
      description: 'Maximize your chances of landing government or university scholarships to offset tuition and living costs.',
      color: 'text-pink-500',
      bg: 'bg-pink-500/10'
    },
    {
      icon: PlaneTakeoff,
      title: 'Visa Support',
      description: 'Submit your visa application with confidence through mock interviews and rigorous checklist evaluation.',
      color: 'text-teal-500',
      bg: 'bg-teal-500/10'
    },
    {
      icon: Briefcase,
      title: 'Career Development',
      description: 'Prepare for post-graduate career growth with resume workshops, internship options, and job placement assistance.',
      color: 'text-sky-500',
      bg: 'bg-sky-500/10'
    }
  ];

  return (
    <section className="py-24 sm:py-32 bg-white/30 backdrop-blur-md dark:bg-slate-950/30 relative overflow-hidden">
      
      {/* Background Decorative Blur Blobs */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Image Collage */}
          <div className="lg:col-span-5 relative order-last lg:order-first">
            
            <div className="relative w-full h-[350px] sm:h-[450px] md:h-[500px] lg:h-[550px] max-w-[500px] mx-auto">
              
              {/* Image 1: Main base */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                whileHover={{ scale: 1.02, zIndex: 10 }}
                className="absolute w-[70%] aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 top-0 left-0"
              >
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=500"
                  alt="Student Counselling"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </motion.div>

              {/* Image 2: Stacked overlapping */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 40 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{ scale: 1.02, zIndex: 10 }}
                className="absolute w-[65%] aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 bottom-0 right-0"
              >
                <img
                  src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=500"
                  alt="Classroom Discussion"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </motion.div>

              {/* Image 3: Small floating overlapping */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: -20 }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                whileHover={{ scale: 1.05, zIndex: 10 }}
                className="absolute w-[45%] aspect-square rounded-3xl overflow-hidden shadow-xl border-4 border-white dark:border-slate-800 bottom-4 left-4"
              >
                <img
                  src="https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=500"
                  alt="Study Abroad guidance"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </motion.div>
              
            </div>

          </div>

          {/* Right Column: Why Choose content */}
          <div className="lg:col-span-7 space-y-8">
            
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-widest"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Why Choose Us</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight"
              >
                Why Thousands of Students{' '}
                <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
                  Choose Learnuz
                </span>
              </motion.h2>
            </div>

            {/* Feature Cards Grid (2 cols on md, 1 col on mobile) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              {features.map((feat, idx) => {
                const Icon = feat.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.5, delay: idx * 0.08 }}
                    whileHover={{ 
                      y: -4, 
                      boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.05), 0 8px 10px -6px rgb(0 0 0 / 0.05)',
                      transition: { duration: 0.2 } 
                    }}
                    className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-800/80 flex gap-4 group"
                  >
                    {/* Feature Icon container */}
                    <div className={`w-12 h-12 rounded-2xl ${feat.bg} flex items-center justify-center shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-110`}>
                      <Icon className={`w-6 h-6 ${feat.color}`} />
                    </div>

                    {/* Text content */}
                    <div className="space-y-1.5">
                      <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                        {feat.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-normal leading-relaxed">
                        {feat.description}
                      </p>
                    </div>
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
