"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export default function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  // Normalize current step for progress bar (capped at totalSteps)
  const displayStep = Math.min(currentStep, totalSteps);
  const percentage = (displayStep / totalSteps) * 100;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-slate-500">
        <span className="text-indigo-600 font-bold">Step {displayStep} of {totalSteps}</span>
        <span>{Math.round(percentage)}% Complete</span>
      </div>
      
      {/* Progress Track */}
      <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
        {/* Progress Fill */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-full"
        />
      </div>
    </div>
  );
}
