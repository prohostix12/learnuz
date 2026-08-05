import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import ImageCollage from './ImageCollage';

function AnimatedCounter({ value, duration = 1.5 }) {
  const [count, setCount] = useState('');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;

    const numericStr = value.replace(/[^0-9]/g, '');
    const target = parseInt(numericStr, 10);
    
    if (isNaN(target)) {
      setCount(value);
      return;
    }

    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      const currentVal = Math.floor(progress * target);
      
      // format current value based on value patterns
      if (value.includes(',')) {
        setCount(currentVal.toLocaleString() + (value.includes('+') ? '+' : ''));
      } else if (value.includes('%')) {
        setCount(currentVal + '%');
      } else {
        setCount(currentVal + (value.includes('+') ? '+' : ''));
      }

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(value);
      }
    };

    window.requestAnimationFrame(step);
  }, [isInView, value, duration]);

  return <span ref={ref}>{count || '0'}</span>;
}

export default function AboutSection() {
  const stats = [
    { value: '10,000+', label: 'Students Guided', color: 'from-blue-500 to-indigo-500' },
    { value: '250+', label: 'Partner Universities', color: 'from-indigo-500 to-purple-500' },
    { value: '35+', label: 'Countries Served', color: 'from-purple-500 to-pink-500' },
    { value: '98%', label: 'Student Satisfaction', color: 'from-pink-500 to-blue-500' },
  ];

  const highlights = [
    'Personalized study abroad guidance and career roadmaps.',
    '1-on-1 mentorship with industry and academic consultants.',
    'Streamlined university application and credit evaluation.',
    'Scholarship and financial assistance support.',
    'Visa counseling and post-arrival guidance.',
  ];

  return (
    <section className="py-24 sm:py-32 bg-white/30 backdrop-blur-md relative overflow-hidden">
      
      {/* Decorative Blur Spheres */}
      <div className="absolute top-10 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column - Content & Stats */}
          <div className="lg:col-span-6 space-y-8">
            
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 font-bold text-xs uppercase tracking-widest"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Our Story</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight"
              >
                Your Trusted Partner for{' '}
                <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
                  Higher Education
                </span>
              </motion.h2>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6 text-slate-600 text-base sm:text-lg leading-relaxed font-normal"
            >
              <p>
                At Learnuz, we believe quality higher education has the power to transform lives. 
                Our mission is to bridge the gap between ambitious students and top-tier global universities, 
                democratizing access to world-class learning and international degrees.
              </p>
              <p>
                With a student-first approach, we provide comprehensive counseling and end-to-end guidance. 
                Whether you need advice on program selection, application filing, securing scholarships, or visa clearance, 
                our specialists walk with you at every step of your international academic journey.
              </p>
            </motion.div>

            {/* Checklist Highlights */}
            <motion.ul
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.1 }
                }
              }}
              className="space-y-3.5 pt-2"
            >
              {highlights.map((item, idx) => (
                <motion.li
                  key={idx}
                  variants={{
                    hidden: { opacity: 0, x: -10 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } }
                  }}
                  className="flex items-start gap-3 text-slate-700 font-semibold text-sm sm:text-base"
                >
                  <CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </motion.li>
              ))}
            </motion.ul>

            {/* Statistics Cards Grid */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6 pt-6">
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="p-5 rounded-3xl bg-white border border-slate-200/60 shadow-lg shadow-slate-100/50 flex flex-col justify-center"
                >
                  <h3 className={`text-2xl sm:text-3xl font-extrabold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                    <AnimatedCounter value={stat.value} />
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 font-semibold mt-1">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>

          </div>

          {/* Right Column - Image Collage */}
          <div className="lg:col-span-6 relative">
            <ImageCollage />
          </div>

        </div>
      </div>
    </section>
  );
}
