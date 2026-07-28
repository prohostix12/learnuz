"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MapPin, Star, Heart, Calendar, Users, ArrowRight, Package } from 'lucide-react';
import DynUniversityLogo from './UniversityLogo';

const getLocationWithState = (loc) => {
  const map = {
    'Aligarh': 'Aligarh, UP',
    'Mathura': 'Mathura, UP',
    'Bengaluru': 'Bengaluru, KA',
    'Noida': 'Noida, UP',
    'New Delhi': 'New Delhi, DL',
    'Gangtok': 'Gangtok, SK',
    'Mohali': 'Mohali, PB',
    'Manipal': 'Manipal, KA'
  };
  return map[loc] || `${loc}, India`;
};

export default function UniversityCard({ university, onSelect, programs = [] }) {
  const [isLiked, setIsLiked] = useState(false);

  const {
    id,
    name,
    shortName,
    location,
    rating,
    naacGrade,
    established,
    programsCount,
    studentsCount,
    feeRange,
    coverImage,
    logo,
  } = university;

  // For Aligarh, we do not append shortName to match the mockup
  const displayName = id === 'amu' ? name : `${name} (${shortName})`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ 
        y: -6,
        boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.08)",
        borderColor: "rgba(9, 30, 66, 0.15)"
      }}
      className="group relative flex flex-col h-full bg-white/30 backdrop-blur-md rounded-[24px] border border-[#F4F5F7] shadow-[0_8px_30px_rgb(0,0,0,0.02)] p-5 transition-all duration-300"
    >
      {/* Top half: Horizontal Layout */}
      <div className="flex flex-row gap-4 items-start">
        {/* Left column: Square campus thumbnail */}
        <div className="relative w-[110px] h-[110px] sm:w-[130px] sm:h-[130px] rounded-[20px] overflow-hidden shrink-0 bg-slate-50">
          <Image
            src={coverImage}
            alt={name}
            fill
            sizes="(max-width: 640px) 110px, 130px"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
          />
        </div>

        {/* Right column: Logo, Heart, Name, Location, NAAC badge */}
        <div className="flex-grow min-w-0 flex flex-col h-[110px] sm:h-[130px] justify-between">
          <div className="flex justify-between items-start">
            {/* Logo */}
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] flex items-center justify-center overflow-hidden bg-white shrink-0">
              <DynUniversityLogo universityName={name} logoUrl={logo} />
            </div>
            {/* Heart wishlist button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsLiked(!isLiked);
              }}
              className="text-[#DFE1E6] hover:text-red-500 transition-colors p-1"
              aria-label="Add to Wishlist"
            >
              <Heart className={`w-5 h-5 transition-colors ${isLiked ? 'fill-red-500 text-red-500' : 'text-[#DFE1E6]'}`} />
            </button>
          </div>

          <div>
            {/* University Name */}
            <h3 className="text-sm sm:text-base font-extrabold text-[#091E42] tracking-tight leading-tight line-clamp-2">
              {displayName}
            </h3>

            {/* Location with Pin */}
            <div className="flex items-center gap-1 mt-1 text-[#5E6C84] text-[11px] sm:text-xs">
              <MapPin className="w-3.5 h-3.5 text-[#5E6C84]/80 shrink-0" />
              <span className="truncate">{getLocationWithState(location)}</span>
            </div>
          </div>

          {/* NAAC badge */}
          <div className="mt-1.5">
            <span className="inline-block px-3 py-1 bg-[#FEF3C7]/60 text-[#B45309] text-[9px] sm:text-[10px] font-extrabold rounded-full border border-[#FDE68A]/40 uppercase tracking-wide">
              {naacGrade}
            </span>
          </div>
        </div>
      </div>

      {/* Middle section: Statistics Grid with Vertical Dividers */}
      <div className="grid grid-cols-4 divide-x divide-slate-100 py-3.5 my-4 border-y border-slate-100">
        {/* Programs */}
        <div className="flex flex-col items-center justify-center text-center px-1">
          <Package className="w-4 h-4 text-[#091E42]/70 mb-1" />
          <span className="text-xs sm:text-sm font-extrabold text-[#091E42] leading-none">
            {programsCount === 35 ? '35+' : programsCount}
          </span>
          <span className="text-[9px] sm:text-[10px] text-[#5E6C84] mt-1 font-semibold">Programs</span>
        </div>

        {/* Students */}
        <div className="flex flex-col items-center justify-center text-center px-1">
          <Users className="w-4 h-4 text-[#091E42]/70 mb-1" />
          <span className="text-xs sm:text-sm font-extrabold text-[#091E42] leading-none">
            {studentsCount}
          </span>
          <span className="text-[9px] sm:text-[10px] text-[#5E6C84] mt-1 font-semibold">Students</span>
        </div>

        {/* Year */}
        <div className="flex flex-col items-center justify-center text-center px-1">
          <Calendar className="w-4 h-4 text-[#091E42]/70 mb-1" />
          <span className="text-xs sm:text-sm font-extrabold text-[#091E42] leading-none truncate max-w-full">
            Est. {established}
          </span>
          <span className="text-[9px] sm:text-[10px] text-[#5E6C84] mt-1 font-semibold">Year</span>
        </div>

        {/* Rating */}
        <div className="flex flex-col items-center justify-center text-center px-1">
          <Star className="w-4 h-4 text-[#091E42]/70 mb-1" />
          <span className="text-xs sm:text-sm font-extrabold text-[#091E42] leading-none">
            {rating}
          </span>
          <span className="text-[9px] sm:text-[10px] text-[#5E6C84] mt-1 font-semibold">Rating</span>
        </div>
      </div>

      {/* Offered Programs */}
      <div className="mb-4">
        <span className="text-[10px] uppercase font-bold text-[#5E6C84] tracking-wider block mb-1.5">Offered Programs</span>
        {programs.length > 0 ? (
          <div className="flex flex-wrap gap-1.5">
            {programs.map((prog, idx) => (
              <span key={prog._id || idx} className="px-2.5 py-1 bg-slate-50 border border-slate-200/60 text-slate-700 hover:bg-slate-100 rounded-lg text-[10px] font-bold tracking-wide transition-colors" title={prog.title}>
                {prog.code} - {prog.title}
              </span>
            ))}
          </div>
        ) : (
          <span className="text-[10px] font-semibold text-slate-400 italic">Explore programs in detail</span>
        )}
      </div>

      {/* Bottom section: Fee Range & View Details Button */}
      <div className="flex items-center justify-between mt-auto pt-2.5">
        <div className="flex flex-col min-w-0">
          <span className="text-[10px] sm:text-xs font-bold text-[#5E6C84]">Fee Range</span>
          <span className="text-sm sm:text-base font-extrabold text-[#091E42] mt-0.5 truncate">
            {feeRange.replace('–', '-')}
          </span>
        </div>
        <button
          onClick={() => onSelect && onSelect(university)}
          className="bg-[#032B69] hover:bg-[#002f6c] text-[#ffffff] px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer shadow-md shadow-blue-900/5 group/btn"
        >
          <span>View Details</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
        </button>
      </div>
    </motion.div>
  );
}
