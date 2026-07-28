"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface SuccessScreenProps {
  onComplete: () => void;
}

const circleVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: 'spring', stiffness: 260, damping: 20, delay: 0.1 }
  }
};

const checkVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { type: 'spring', stiffness: 120, damping: 12, delay: 0.4 }
  }
};

export default function SuccessScreen({ onComplete }: SuccessScreenProps) {
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const timeout = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-8 text-center space-y-6 flex flex-col justify-center items-center min-h-[300px]"
    >
      {/* Animated Success Checkmark */}
      <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-150">
        <svg className="w-12 h-12" viewBox="0 0 52 52">
          <motion.circle
            cx="26"
            cy="26"
            r="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            variants={circleVariants}
            initial="hidden"
            animate="visible"
          />
          <motion.path
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14 27l7.5 7.5 16.5-16.5"
            variants={checkVariants}
            initial="hidden"
            animate="visible"
          />
        </svg>
      </div>

      <div className="space-y-2">
        <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Recommendations Ready!
        </h3>
        <p className="text-slate-500 text-sm max-w-sm mx-auto leading-relaxed">
          We have customized the perfect university programs based on your career interests and profile.
        </p>
      </div>

      {/* Redirect countdown bar */}
      <div className="w-full max-w-[240px] space-y-2">
        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden relative">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 3, ease: 'linear' }}
            className="h-full bg-green-500 rounded-full"
          />
        </div>
        <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">
          Redirecting to courses in {countdown}...
        </p>
      </div>
    </motion.div>
  );
}
