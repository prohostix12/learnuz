"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Building2, Search, SlidersHorizontal } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import RegisterModal from '../../components/RegisterModal';
import UniversityCard from '../../components/UniversityCard';
import UniversitySearch from '../../components/UniversitySearch';

export default function UniversitiesPage() {
  const router = useRouter();
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);

  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    async function loadData() {
      try {
        const [uniRes, progRes] = await Promise.all([
          fetch('/api/universities'),
          fetch('/api/programs')
        ]);
        if (uniRes.ok) {
          const uniData = await uniRes.json();
          setUniversities(uniData);
        }
        if (progRes.ok) {
          const progData = await progRes.json();
          setPrograms(progData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Search parameters from UniversitySearch
  const [searchParams, setSearchParams] = useState({ name: '', location: '', course: '' });

  // Dropdown filter parameters from UniversityFilters
  const [filters, setFilters] = useState({
    location: 'All Locations',
    naac: 'All Grades',
    type: 'All Types',
    programs: 'All Programs',
    fee: 'All Fees',
    sort: 'featured',
  });

  const handleOpenRegister = (uni = null) => {
    setSelectedCourse(uni ? { university: uni.name } : null);
    setIsRegisterOpen(true);
  };

  const handleSearchChange = (params) => {
    setSearchParams(params);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  // Filter & Sort Logic
  const filteredUniversities = universities.filter((uni) => {
    // 1. Search Name (matches name or shortName)
    if (
      searchParams.name &&
      !uni.name.toLowerCase().includes(searchParams.name.toLowerCase()) &&
      !uni.shortName.toLowerCase().includes(searchParams.name.toLowerCase())
    ) {
      return false;
    }

    // 2. Search Location
    if (
      searchParams.location &&
      !uni.location.toLowerCase().includes(searchParams.location.toLowerCase())
    ) {
      return false;
    }

    // 3. Search Course (mock search checking name or generic matching)
    if (searchParams.course) {
      const courseQuery = searchParams.course.toLowerCase();
      const commonCourses = ['mba', 'bca', 'mca', 'bba', 'btech', 'mtech', 'bcom'];
      
      // If they search a common course type, let's assume they match if the university is approved/established
      if (!commonCourses.includes(courseQuery) && 
          !uni.name.toLowerCase().includes(courseQuery) && 
          !uni.shortName.toLowerCase().includes(courseQuery)) {
        return false;
      }
    }

    // 4. Filter Dropdown: Location
    if (filters.location !== 'All Locations' && uni.location !== filters.location) {
      return false;
    }

    // 5. Filter Dropdown: NAAC Grade
    if (filters.naac !== 'All Grades' && uni.naacGrade !== filters.naac) {
      return false;
    }

    // 6. Filter Dropdown: University Type
    if (filters.type !== 'All Types' && uni.type !== filters.type) {
      return false;
    }

    // 7. Filter Dropdown: Programs Count
    if (filters.programs !== 'All Programs') {
      if (filters.programs === 'Under 40' && uni.programsCount >= 40) return false;
      if (filters.programs === '40 - 60' && (uni.programsCount < 40 || uni.programsCount > 60)) return false;
      if (filters.programs === 'Over 60' && uni.programsCount <= 60) return false;
    }

    // 8. Filter Dropdown: Fee Range
    if (filters.fee !== 'All Fees') {
      if (filters.fee === 'Under ₹50K' && uni.minFee >= 50000) return false;
      if (filters.fee === '₹50K – ₹1.5L' && (uni.minFee < 50000 || uni.minFee > 150000)) return false;
      if (filters.fee === 'Over ₹1.5L' && uni.maxFee <= 150000) return false;
    }

    return true;
  });

  const sortedUniversities = [...filteredUniversities].sort((a, b) => {
    if (filters.sort === 'featured') {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return b.rating - a.rating; // Secondary sort by rating
    }
    if (filters.sort === 'rating') {
      return b.rating - a.rating;
    }
    if (filters.sort === 'nirf') {
      const getRank = (str) => {
        const match = str.match(/#(\d+)/);
        return match ? parseInt(match[1], 10) : 9999;
      };
      return getRank(a.nirfRank) - getRank(b.nirfRank);
    }
    if (filters.sort === 'fee_asc') {
      return a.minFee - b.minFee;
    }
    if (filters.sort === 'fee_desc') {
      return b.minFee - a.minFee;
    }
    return 0;
  });

  // Stagger entry animations
  const gridContainerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="universities-page-wrap min-h-screen bg-[#F8FAFF]/30 backdrop-blur-md text-[#0F172A] relative flex flex-col overflow-x-hidden">
      
      {/* Background Gradients and Blurred Orbs */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-radial from-blue-600/10 to-transparent rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-radial from-purple-600/10 to-transparent rounded-full blur-3xl pointer-events-none z-0" />
      
      {/* Floating blurred purple circles */}
      <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-purple-500/8 rounded-full blur-3xl animate-pulse pointer-events-none z-0" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-500/8 rounded-full blur-3xl animate-pulse pointer-events-none z-0" />

      {/* Header / Navbar */}
      <Navbar onOpenRegister={() => handleOpenRegister()} />

      <main className="flex-grow z-10">
        
        {/* Hero Section */}
        <section className="pt-16 pb-12 text-center max-w-4xl mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-600/10 text-blue-700 border border-blue-500/15 text-xs font-bold uppercase tracking-wider mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-spin-slow" />
            <span>Discover Opportunities</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-black tracking-tight text-[#0F172A] leading-none mb-6"
          >
            Find Your Dream University
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto font-medium"
          >
            Explore thousands of universities with detailed information, rankings and programs.
          </motion.p>
        </section>

        {/* Sticky Search bar section */}
        <section className="sticky top-6 z-25 mb-8">
          <UniversitySearch onSearch={handleSearchChange} />
        </section>

        {/* University Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-extrabold text-[#0F172A] flex items-center gap-2">
              <Building2 className="w-5 h-5 text-blue-600" />
              <span>Available Universities ({sortedUniversities.length})</span>
            </h2>
          </div>

          <AnimatePresence mode="wait">
            {sortedUniversities.length > 0 ? (
              <motion.div
                key="grid"
                variants={gridContainerVariants}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {sortedUniversities.map((uni) => {
                  const uniPrograms = programs.filter(p => 
                    p.university.toLowerCase().trim() === uni.name.toLowerCase().trim() ||
                    p.university.toLowerCase().trim().includes(uni.shortName.toLowerCase().trim()) ||
                    uni.name.toLowerCase().trim().includes(p.university.toLowerCase().trim())
                  );
                  return (
                    <UniversityCard 
                      key={uni.id} 
                      university={uni} 
                      programs={uniPrograms}
                      onSelect={(uni) => router.push(`/universities/${uni.id}`)}
                    />
                  );
                })}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="w-full text-center py-20 bg-white/40 backdrop-blur-md border border-slate-100 rounded-[32px] p-8 shadow-sm max-w-2xl mx-auto"
              >
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-100">
                  <SlidersHorizontal className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[#0F172A]">No Universities Found</h3>
                <p className="text-slate-400 mt-2 text-sm max-w-sm mx-auto">
                  We couldn't find any universities matching your filters. Try adjusting your search queries or resetting filters.
                </p>
                <button
                  onClick={() => {
                    setSearchParams({ name: '', location: '', course: '' });
                    setFilters({
                      location: 'All Locations',
                      naac: 'All Grades',
                      type: 'All Types',
                      programs: 'All Programs',
                      fee: 'All Fees',
                      sort: 'featured'
                    });
                  }}
                  className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-semibold text-sm rounded-xl shadow-md hover:bg-blue-700 active:scale-95 transition-all cursor-pointer"
                >
                  Reset All Search & Filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

      </main>

      {/* Footer */}
      <Footer onOpenRegister={() => handleOpenRegister()} />

      {/* Registration / Inquiry Modal */}
      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        selectedCourse={selectedCourse}
      />

    </div>
  );
}
