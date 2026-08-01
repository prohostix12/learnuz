"use client";

import React, { useState } from 'react';
import { Search, MapPin, BookOpen, School, X } from 'lucide-react';
import { motion } from 'framer-motion';

export default function UniversitySearch({ onSearch }) {
  const [nameQuery, setNameQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [courseQuery, setCourseQuery] = useState('');

  const handleClear = (type) => {
    if (type === 'name') {
      setNameQuery('');
      onSearch({ name: '', location: locationQuery, course: courseQuery });
    }
    if (type === 'location') {
      setLocationQuery('');
      onSearch({ name: nameQuery, location: '', course: courseQuery });
    }
    if (type === 'course') {
      setCourseQuery('');
      onSearch({ name: nameQuery, location: locationQuery, course: '' });
    }
  };

  const handleInputChange = (value, type) => {
    let newName = nameQuery;
    let newLocation = locationQuery;
    let newCourse = courseQuery;

    if (type === 'name') {
      setNameQuery(value);
      newName = value;
    } else if (type === 'location') {
      setLocationQuery(value);
      newLocation = value;
    } else if (type === 'course') {
      setCourseQuery(value);
      newCourse = value;
    }

    onSearch({ name: newName, location: newLocation, course: newCourse });
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 relative z-25">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="w-full bg-white/80 backdrop-blur-xl border border-white/60 rounded-none md:rounded-full shadow-lg hover:shadow-2xl focus-within:shadow-2xl focus-within:scale-[1.015] focus-within:border-blue-500/40 p-2 pl-4 flex flex-col md:flex-row items-center gap-2 md:gap-0 transition-all duration-300 relative"
      >
        {/* Search Icon (Blue) */}
        <div className="flex items-center justify-center text-blue-600 pl-2 shrink-0 hidden md:flex">
          <Search className="w-5 h-5" />
        </div>

        {/* Name Search Section */}
        <div className="w-full md:flex-1 relative px-3 py-1.5 md:py-2">
          <label className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">
            University Name
          </label>
          <div className="relative flex items-center">
            <School className="w-4 h-4 text-slate-400 mr-2 shrink-0 md:hidden" />
            <input
              type="text"
              value={nameQuery}
              onChange={(e) => handleInputChange(e.target.value, 'name')}
              placeholder="Search e.g. AMU, Jain..."
              className="w-full bg-transparent border-none text-[#0F172A] font-semibold text-sm outline-none placeholder:text-slate-400 placeholder:font-normal"
            />
            {nameQuery && (
              <button 
                onClick={() => handleClear('name')}
                className="absolute right-0 text-slate-400 hover:text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* Divider 1 */}
        <div className="h-8 w-px bg-slate-200 hidden md:block" />

        {/* Location Search Section */}
        <div className="w-full md:flex-1 relative px-3 py-1.5 md:py-2">
          <label className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">
            Location
          </label>
          <div className="relative flex items-center">
            <MapPin className="w-4 h-4 text-slate-400 mr-2 shrink-0 md:hidden" />
            <input
              type="text"
              value={locationQuery}
              onChange={(e) => handleInputChange(e.target.value, 'location')}
              placeholder="Search e.g. Aligarh, Bengaluru..."
              className="w-full bg-transparent border-none text-[#0F172A] font-semibold text-sm outline-none placeholder:text-slate-400 placeholder:font-normal"
            />
            {locationQuery && (
              <button 
                onClick={() => handleClear('location')}
                className="absolute right-0 text-slate-400 hover:text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* Divider 2 */}
        <div className="h-8 w-px bg-slate-200 hidden md:block" />

        {/* Course Search Section */}
        <div className="w-full md:flex-1 relative px-3 py-1.5 md:py-2">
          <label className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">
            Course / Program
          </label>
          <div className="relative flex items-center">
            <BookOpen className="w-4 h-4 text-slate-400 mr-2 shrink-0 md:hidden" />
            <input
              type="text"
              value={courseQuery}
              onChange={(e) => handleInputChange(e.target.value, 'course')}
              placeholder="Search e.g. MBA, B.Tech..."
              className="w-full bg-transparent border-none text-[#0F172A] font-semibold text-sm outline-none placeholder:text-slate-400 placeholder:font-normal"
            />
            {courseQuery && (
              <button 
                onClick={() => handleClear('course')}
                className="absolute right-0 text-slate-400 hover:text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* Search Button (Right-aligned, circular) */}
        <button
          className="w-full md:w-12 h-12 rounded-none md:rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white flex items-center justify-center shadow-md hover:shadow-lg active:scale-95 transition-all shrink-0 hover:rotate-12 cursor-pointer"
          aria-label="Submit Search"
        >
          <Search className="w-5 h-5" />
        </button>
      </motion.div>
    </div>
  );
}
