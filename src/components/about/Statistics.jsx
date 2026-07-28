import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Users, GraduationCap, Globe, Trophy } from 'lucide-react';

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

export default function Statistics() {
  const items = [
    {
      value: '10,000+',
      label: 'Students Enrolled',
      icon: Users,
      color: 'from-blue-400 to-indigo-400',
      description: 'Connected to world-class learning networks'
    },
    {
      value: '250+',
      label: 'Partner Universities',
      icon: GraduationCap,
      color: 'from-indigo-400 to-purple-400',
      description: 'Top ranked global institution networks'
    },
    {
      value: '35+',
      label: 'Countries Guided',
      icon: Globe,
      color: 'from-purple-400 to-pink-400',
      description: 'Global campuses in UK, USA, Canada & more'
    },
    {
      value: '98%',
      label: 'Success Rate',
      icon: Trophy,
      color: 'from-pink-400 to-blue-400',
      description: 'Admission & visa processing accuracy rate'
    }
  ];

  return (
    <section className="relative py-20 bg-gradient-to-br from-[#091535] via-[#0b1b46] to-[#050e26] text-white overflow-hidden">
      
      {/* Decorative blurred backgrounds */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 lg:gap-8 divide-y md:divide-y-0 md:divide-x-0 lg:divide-x lg:divide-slate-800">
          
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="flex flex-col items-center text-center p-6 lg:px-8 group"
              >
                {/* Glowing Circle Icon Container */}
                <div className="w-16 h-16 rounded-full bg-slate-900/60 border border-slate-700/50 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-indigo-500/50 transition-all duration-300 shadow-inner shadow-white/5">
                  <Icon className="w-7 h-7 text-indigo-400 group-hover:text-indigo-300 transition-colors" />
                </div>

                {/* Counter Value */}
                <h3 className={`text-4xl sm:text-5xl lg:text-6xl font-black bg-gradient-to-r ${item.color} bg-clip-text text-transparent tracking-tight`}>
                  <AnimatedCounter value={item.value} />
                </h3>

                {/* Counter Label */}
                <p className="text-base sm:text-lg font-bold mt-2 text-slate-100 tracking-wide">
                  {item.label}
                </p>

                {/* Subtext description */}
                <p className="text-xs text-slate-400 mt-2 font-light max-w-[200px] leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}

        </div>
      </div>
    </section>
  );
}
