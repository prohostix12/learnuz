"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, SlidersHorizontal, MapPin, Award, BookOpen, IndianRupee, ShieldCheck, ArrowUpDown } from 'lucide-react';

const locationsList = ['All Locations', 'Aligarh', 'Mathura', 'Bengaluru', 'Noida', 'New Delhi', 'Gangtok', 'Mohali', 'Manipal'];
const naacGradesList = ['All Grades', 'NAAC A++', 'NAAC A+', 'NAAC A'];
const typeList = ['All Types', 'Central', 'Private', 'Deemed'];
const programsList = ['All Programs', 'Under 40', '40 - 60', 'Over 60'];
const feeRangesList = ['All Fees', 'Under ₹50K', '₹50K – ₹1.5L', 'Over ₹1.5L'];
const sortList = [
  { label: 'Featured First', value: 'featured' },
  { label: 'Rating (High to Low)', value: 'rating' },
  { label: 'NIRF Rank (Top First)', value: 'nirf' },
  { label: 'Fee: Low to High', value: 'fee_asc' },
  { label: 'Fee: High to Low', value: 'fee_desc' }
];

function DropdownFilter({ label, icon: Icon, options, value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isSelected = value && value !== 'All Locations' && value !== 'All Grades' && value !== 'All Types' && value !== 'All Programs' && value !== 'All Fees' && value !== 'featured';

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between gap-2.5 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-300 backdrop-blur-md cursor-pointer border ${
          isSelected
            ? 'bg-blue-600/10 border-blue-500/30 text-blue-700 shadow-[0_0_15px_rgba(37,99,235,0.12)]'
            : 'bg-white/40 border-white/60 text-slate-700 hover:bg-white/60 shadow-sm'
        }`}
      >
        <div className="flex items-center gap-2">
          {Icon && <Icon className={`w-4 h-4 ${isSelected ? 'text-blue-600' : 'text-slate-400'}`} />}
          <span className="truncate">{value && value.label ? value.label : value}</span>
        </div>
        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180 text-blue-500' : 'text-slate-400'}`} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 right-0 mt-2 z-20 bg-white/95 backdrop-blur-xl border border-slate-100 rounded-2xl shadow-xl overflow-hidden py-1 max-h-60 overflow-y-auto"
          >
            {options.map((opt, i) => {
              const optionValue = opt.value !== undefined ? opt.value : opt;
              const optionLabel = opt.label !== undefined ? opt.label : opt;
              const isOptionActive = value && value.value ? value.value === optionValue : value === optionValue;

              return (
                <button
                  key={i}
                  onClick={() => {
                    onChange(opt);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-sm transition-colors cursor-pointer ${
                    isOptionActive
                      ? 'bg-blue-600/10 text-blue-700 font-semibold'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {optionLabel}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function UniversityFilters({ activeFilters, onFilterChange }) {
  const handleFilterUpdate = (key, value) => {
    onFilterChange({
      ...activeFilters,
      [key]: value
    });
  };

  const hasActiveFilters = 
    activeFilters.location !== 'All Locations' ||
    activeFilters.naac !== 'All Grades' ||
    activeFilters.type !== 'All Types' ||
    activeFilters.programs !== 'All Programs' ||
    activeFilters.fee !== 'All Fees' ||
    activeFilters.sort !== 'featured';

  const resetFilters = () => {
    onFilterChange({
      location: 'All Locations',
      naac: 'All Grades',
      type: 'All Types',
      programs: 'All Programs',
      fee: 'All Fees',
      sort: 'featured'
    });
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 mt-6">
      <div className="bg-slate-50/50 border border-slate-100 rounded-3xl p-5 md:p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-bold text-slate-800 uppercase tracking-wider">Refine & Sort</span>
          </div>
          {hasActiveFilters && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={resetFilters}
              className="text-xs font-semibold text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100/50 px-3 py-1.5 rounded-full transition-colors cursor-pointer"
            >
              Reset All Filters
            </motion.button>
          )}
        </div>

        {/* Filters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
          {/* Location */}
          <DropdownFilter
            label="Location"
            icon={MapPin}
            options={locationsList}
            value={activeFilters.location}
            onChange={(val) => handleFilterUpdate('location', val)}
          />

          {/* NAAC */}
          <DropdownFilter
            label="NAAC"
            icon={Award}
            options={naacGradesList}
            value={activeFilters.naac}
            onChange={(val) => handleFilterUpdate('naac', val)}
          />

          {/* Programs */}
          <DropdownFilter
            label="Programs"
            icon={BookOpen}
            options={programsList}
            value={activeFilters.programs}
            onChange={(val) => handleFilterUpdate('programs', val)}
          />

          {/* Fee */}
          <DropdownFilter
            label="Fee Range"
            icon={IndianRupee}
            options={feeRangesList}
            value={activeFilters.fee}
            onChange={(val) => handleFilterUpdate('fee', val)}
          />

          {/* University Type */}
          <DropdownFilter
            label="Type"
            icon={ShieldCheck}
            options={typeList}
            value={activeFilters.type}
            onChange={(val) => handleFilterUpdate('type', val)}
          />

          {/* Sort */}
          <DropdownFilter
            label="Sort By"
            icon={ArrowUpDown}
            options={sortList}
            value={sortList.find(s => s.value === activeFilters.sort) || sortList[0]}
            onChange={(val) => handleFilterUpdate('sort', val.value)}
          />
        </div>
      </div>
    </div>
  );
}
