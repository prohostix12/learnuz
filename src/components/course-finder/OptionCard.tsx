"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Briefcase, 
  Clock, 
  Home, 
  BookOpen, 
  FileText, 
  GraduationCap, 
  Award, 
  Globe, 
  RefreshCw, 
  Zap, 
  Laptop, 
  TrendingUp, 
  HeartPulse, 
  Palette, 
  Paintbrush, 
  Settings, 
  Check 
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<any>> = {
  Briefcase,
  Clock,
  Home,
  BookOpen,
  FileText,
  GraduationCap,
  Award,
  Globe,
  RefreshCw,
  Zap,
  Laptop,
  TrendingUp,
  HeartPulse,
  Palette,
  Paintbrush,
  Settings
};

interface OptionCardProps {
  text: string;
  iconName: string;
  isSelected: boolean;
  onClick: () => void;
}

export default function OptionCard({ text, iconName, isSelected, onClick }: OptionCardProps) {
  const IconComponent = iconMap[iconName] || GraduationCap;

  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`w-full text-left rounded-2xl p-[2px] transition-all duration-300 ${
        isSelected
          ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 shadow-lg shadow-indigo-500/15'
          : 'bg-slate-100 hover:bg-slate-200/50'
      }`}
    >
      <div className={`w-full bg-white rounded-[14px] p-4.5 flex items-center justify-between transition-all duration-300 ${
        isSelected ? 'bg-slate-50/80' : ''
      }`}>
        <div className="flex items-center gap-4">
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 ${
            isSelected 
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-indigo-500/20' 
              : 'bg-slate-100 text-slate-600'
          }`}>
            <IconComponent className="w-5 h-5" />
          </div>
          <span className="font-bold text-slate-800 text-sm sm:text-base">{text}</span>
        </div>
        
        {/* Check Circle */}
        <div className={`w-5.5 h-5.5 rounded-full flex items-center justify-center transition-all duration-300 border ${
          isSelected
            ? 'bg-indigo-600 border-indigo-600 text-white scale-110 shadow-sm shadow-indigo-500/30'
            : 'border-slate-350 bg-white text-transparent'
        }`}>
          <Check className="w-3 h-3 stroke-[3]" />
        </div>
      </div>
    </motion.button>
  );
}
