import React from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  MessageSquare, 
  School, 
  FileText, 
  MailCheck, 
  FileCheck2, 
  Plane,
  Sparkles
} from 'lucide-react';

export default function StudentJourney() {
  const steps = [
    {
      number: '01',
      title: 'Discover Courses',
      description: 'Explore programs based on your career interests and eligibility criteria.',
      icon: Search,
      color: 'from-blue-500 to-indigo-500',
    },
    {
      number: '02',
      title: 'Talk with Counsellor',
      description: 'Discuss options with an expert to narrow down locations, universities, and budgets.',
      icon: MessageSquare,
      color: 'from-indigo-500 to-purple-500',
    },
    {
      number: '03',
      title: 'Choose University',
      description: 'Select your preferred schools and plan admissions applications.',
      icon: School,
      color: 'from-purple-500 to-pink-500',
    },
    {
      number: '04',
      title: 'Apply',
      description: 'File applications through our structured, rapid-response admissions portal.',
      icon: FileText,
      color: 'from-pink-500 to-teal-500',
    },
    {
      number: '05',
      title: 'Receive Offer',
      description: 'Get your offer letters and academic admissions acceptance packages.',
      icon: MailCheck,
      color: 'from-teal-500 to-emerald-500',
    },
    {
      number: '06',
      title: 'Get Visa Support',
      description: 'Obtain step-by-step guidance on visa documentation and mock interviews.',
      icon: FileCheck2,
      color: 'from-emerald-500 to-blue-500',
    },
    {
      number: '07',
      title: 'Start Your Journey',
      description: 'Fly to your campus location and start your global learning experience.',
      icon: Plane,
      color: 'from-blue-500 to-purple-600',
    },
  ];

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: { duration: 1.5, ease: 'easeInOut' },
    },
  };

  const lineMobileVariants = {
    hidden: { scaleY: 0 },
    visible: {
      scaleY: 1,
      transition: { duration: 1.5, ease: 'easeInOut' },
    },
  };

  return (
    <section className="py-24 sm:py-32 bg-slate-50/40 backdrop-blur-md dark:bg-slate-900/30 relative overflow-hidden">
      
      {/* Decorative blobs */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Process Pathway</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight">
            How We Help{' '}
            <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
              Students Succeed
            </span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-slate-800 dark:text-slate-200 font-normal max-w-xl mx-auto leading-relaxed">
            From discovering the first course to step-by-step visa support, our pathway makes university admissions easy and stress-free.
          </p>
        </div>

        {/* Timeline container */}
        <div className="relative mt-8">
          
          {/* Horizontal Line for Desktop (hidden on mobile) */}
          <div className="absolute top-[48px] left-[5%] right-[5%] h-0.5 bg-slate-200 dark:bg-slate-800 hidden lg:block -z-10">
            <motion.div
              variants={lineVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 origin-left"
            />
          </div>

          {/* Vertical Line for Mobile (hidden on desktop) */}
          <div className="absolute top-[48px] bottom-[48px] left-[44px] sm:left-[56px] w-0.5 bg-slate-200 dark:bg-slate-800 block lg:hidden -z-10">
            <motion.div
              variants={lineMobileVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="w-full h-full bg-gradient-to-b from-blue-500 via-indigo-500 to-purple-600 origin-top"
            />
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-7 gap-10 lg:gap-6 relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="flex flex-row lg:flex-col items-start lg:items-center text-left lg:text-center gap-6 lg:gap-4 group"
                >
                  
                  {/* Step Bubble Circle */}
                  <div className="relative shrink-0">
                    {/* Glowing outer shadow ring */}
                    <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-40 blur transition-all duration-300" />
                    
                    {/* Circle itself */}
                    <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-800 dark:text-white transition-all duration-300 group-hover:border-indigo-500 group-hover:scale-105 shadow-md">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-500 dark:text-indigo-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors" />
                    </div>
                    
                    {/* Step number badge */}
                    <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold text-[10px] flex items-center justify-center shadow-md">
                      {step.number}
                    </div>
                  </div>

                  {/* Step Text Details */}
                  <div className="space-y-1.5 pt-2 lg:pt-0">
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-normal leading-relaxed max-w-[280px]">
                      {step.description}
                    </p>
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
