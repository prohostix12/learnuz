"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Question } from './types';
import OptionCard from './OptionCard';

interface QuestionCardProps {
  question: Question;
  selectedOption?: string;
  onSelect: (optionText: string) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      type: 'spring', 
      stiffness: 300, 
      damping: 24 
    } 
  }
};

export default function QuestionCard({ question, selectedOption, onSelect }: QuestionCardProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug">
        {question.title}
      </h2>
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 gap-3.5"
      >
        {question.options.map((option) => (
          <motion.div 
            key={option.text} 
            variants={itemVariants}
          >
            <OptionCard
              text={option.text}
              iconName={option.icon}
              isSelected={selectedOption === option.text}
              onClick={() => onSelect(option.text)}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
