import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Sneha Nair',
      role: 'Student',
      country: 'United Kingdom',
      university: 'Oxford Online / Leeds Beckett University',
      course: 'MSc Computer Science',
      rating: 5,
      quote: 'Learnuz changed my academic career pathway completely! The 1-on-1 career counselling helped me select the right universities and credits, and their team was there for my application submissions and visa checklists.',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400',
    },
    {
      name: 'Rohan Patel',
      role: 'Alumnus',
      country: 'United States',
      university: 'Stanford Extension / University of Illinois',
      course: 'MSc Data Science',
      rating: 5,
      quote: 'Excellent counselors! They answered every query about overseas banking, scholarship criteria, and academic eligibility transparently. I successfully received my offer letter and F-1 student visa without issues.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400',
    },
    {
      name: 'Ananya Rao',
      role: 'Student',
      country: 'Germany',
      university: 'Technical University Munich',
      course: 'MBA Innovation & Management',
      rating: 5,
      quote: 'Learnuz streamlined my admissions file. Their support team was highly responsive, helping me prepare a compelling Statement of Purpose (SOP) and obtaining a fully-funded DAAD scholarship.',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400',
    },
    {
      name: 'Michael Brown',
      role: 'Alumnus',
      country: 'Canada',
      university: 'University of Toronto',
      course: 'BSc Business Analytics',
      rating: 5,
      quote: 'Exceptional end-to-end guidance! The team is highly experienced in student visa processing. They conducted mock interviews with me which built my confidence. Strongly recommend Learnuz to anyone studying abroad.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400',
    },
    {
      name: 'Jessica Lim',
      role: 'Student',
      country: 'Australia',
      university: 'University of Sydney',
      course: 'Master of Information Technology',
      rating: 5,
      quote: 'I got a 50% tuition fee waiver scholarship through Learnuz! Their team evaluated my GPA, suggested targeted universities, and filed my admissions files efficiently. Their service is truly premium.',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400',
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (dir) => ({
      x: dir < 0 ? 100 : -100,
      opacity: 0
    })
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-24 sm:py-32 bg-white/30 backdrop-blur-md dark:bg-slate-950/30 relative overflow-hidden">
      
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 font-bold text-xs uppercase tracking-widest">
            <span>Success Stories</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight">
            Hear From Our{' '}
            <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
              Global Learners
            </span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-slate-800 dark:text-slate-200 font-normal leading-relaxed">
            See how Learnuz helps students secure admission packages and global careers.
          </p>
        </div>

        {/* Carousel Area */}
        <div className="relative min-h-[420px] flex items-center justify-center">
          
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="w-full max-w-4xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-800/80 rounded-[2.5rem] p-8 sm:p-12 md:p-16 shadow-2xl flex flex-col md:flex-row gap-8 sm:gap-12 items-center"
            >
              {/* Left Column: Student Image */}
              <div className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-56 md:h-56 shrink-0 rounded-3xl overflow-hidden border-4 border-white dark:border-slate-800 shadow-xl">
                <img
                  src={currentTestimonial.image}
                  alt={currentTestimonial.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold text-[9px] px-2 py-0.5 rounded-full uppercase">
                  {currentTestimonial.country}
                </div>
              </div>

              {/* Right Column: Quote details */}
              <div className="flex-1 space-y-6 text-left relative">
                
                {/* Large background Quote Icon */}
                <Quote className="absolute -top-6 -left-6 w-16 h-16 text-indigo-500/10 pointer-events-none" />

                {/* Stars Rating */}
                <div className="flex items-center gap-1">
                  {[...Array(currentTestimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Quote Text */}
                <blockquote className="text-base sm:text-lg md:text-xl font-normal text-slate-950 dark:text-slate-100 leading-relaxed italic">
                  "{currentTestimonial.quote}"
                </blockquote>

                {/* Sign-off Details */}
                <div className="pt-2">
                  <h4 className="text-lg font-extrabold text-slate-900 dark:text-white">
                    {currentTestimonial.name}
                  </h4>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {currentTestimonial.course}
                  </p>
                  <p className="text-xs font-semibold text-indigo-500 dark:text-indigo-400 uppercase tracking-wider mt-1">
                    {currentTestimonial.university}
                  </p>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>

        </div>

        {/* Carousel controls */}
        <div className="flex items-center justify-center gap-6 mt-8">
          <button
            onClick={handlePrev}
            className="w-12 h-12 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors shadow-sm cursor-pointer"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6 text-slate-700 dark:text-slate-300" />
          </button>
          
          {/* Dot Indicators */}
          <div className="flex items-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > currentIndex ? 1 : -1);
                  setCurrentIndex(i);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === currentIndex ? 'w-6 bg-indigo-500' : 'w-2 bg-slate-300 dark:bg-slate-700'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="w-12 h-12 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors shadow-sm cursor-pointer"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6 text-slate-700 dark:text-slate-300" />
          </button>
        </div>

      </div>
    </section>
  );
}
