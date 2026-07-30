"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, 
  Star, 
  Calendar, 
  Users, 
  ArrowLeft, 
  Award, 
  BookOpen, 
  CheckCircle, 
  TrendingUp, 
  X, 
  Clock, 
  CalendarDays, 
  Send,
  Building,
  GraduationCap,
  ShieldCheck,
  Search,
  BadgeAlert
} from 'lucide-react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import RegisterModal from '../../../components/RegisterModal';
import UniversityLogo from '../../../components/UniversityLogo';

export default function UniversityDetailPage({ params }) {
  const router = useRouter();
  const { id } = React.use(params);

  // States
  const [university, setUniversity] = useState(null);
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Registration and modal states
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [activeDetailProgram, setActiveDetailProgram] = useState(null);
  
  // Program filtering states
  const [programSearch, setProgramSearch] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('All');

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        // Fetch university details
        const uniRes = await fetch(`/api/universities/${id}`);
        if (!uniRes.ok) {
          if (uniRes.status === 404) {
            throw new Error('University not found');
          }
          throw new Error('Failed to load university details');
        }
        const uniData = await uniRes.json();
        setUniversity(uniData);

        // Fetch all programs
        const progRes = await fetch('/api/programs');
        if (progRes.ok) {
          const progData = await progRes.json();
          // Filter programs that belong to this university
          const filteredProgs = progData.filter(p => 
            p.university.toLowerCase().trim() === uniData.name.toLowerCase().trim() ||
            p.university.toLowerCase().trim().includes(uniData.shortName.toLowerCase().trim()) ||
            uniData.name.toLowerCase().trim().includes(p.university.toLowerCase().trim())
          );
          setPrograms(filteredProgs);
        }
      } catch (err) {
        console.error('Error loading university detailed page:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [id]);

  const handleOpenRegister = (course = null) => {
    if (course) {
      setSelectedCourse({ title: `${course.code} - ${course.title} at ${university?.name}` });
    } else {
      setSelectedCourse({ title: `Admission to ${university?.name}` });
    }
    setIsRegisterOpen(true);
  };

  // Filtered Programs for search/level selection
  const filteredPrograms = programs.filter(prog => {
    const matchesSearch = 
      prog.title.toLowerCase().includes(programSearch.toLowerCase()) || 
      prog.code.toLowerCase().includes(programSearch.toLowerCase()) || 
      prog.category.toLowerCase().includes(programSearch.toLowerCase());
    
    const matchesLevel = 
      selectedLevel === 'All' || 
      prog.level === selectedLevel;

    return matchesSearch && matchesLevel;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50/50 backdrop-blur-md flex flex-col">
        <Navbar onOpenRegister={() => handleOpenRegister()} />
        <div className="flex-grow flex flex-col items-center justify-center py-20">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-slate-500 font-bold tracking-wide animate-pulse">Loading University details...</p>
        </div>
        <Footer onOpenRegister={() => handleOpenRegister()} />
      </div>
    );
  }

  if (error || !university) {
    return (
      <div className="min-h-screen bg-slate-50/50 backdrop-blur-md flex flex-col">
        <Navbar onOpenRegister={() => handleOpenRegister()} />
        <div className="flex-grow flex flex-col items-center justify-center py-24 px-4 text-center">
          <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-6 border border-red-100">
            <BadgeAlert className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-black text-slate-900">Oops! Something went wrong</h1>
          <p className="text-slate-500 mt-2 max-w-md">{error || 'The university detailed page could not be loaded.'}</p>
          <button
            onClick={() => router.push('/universities')}
            className="mt-8 px-6 py-3 bg-[#032B69] hover:bg-[#002f6c] text-white rounded-xl font-bold text-sm flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-blue-900/10 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Universities</span>
          </button>
        </div>
        <Footer onOpenRegister={() => handleOpenRegister()} />
      </div>
    );
  }

  const {
    name,
    shortName,
    location,
    rating,
    reviewsCount,
    naacGrade,
    nirfRank,
    ugcApproved,
    established,
    programsCount,
    studentsCount,
    feeRange,
    type,
    coverImage,
    logo,
    description
  } = university;

  return (
    <div className="universities-page-wrap min-h-screen bg-[#F8FAFF]/30 backdrop-blur-md text-[#0F172A] relative flex flex-col overflow-x-hidden">
      
      {/* Decorative Orbs */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-radial from-blue-600/5 to-transparent rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-radial from-purple-600/5 to-transparent rounded-full blur-3xl pointer-events-none z-0" />

      {/* Header / Navbar */}
      <Navbar onOpenRegister={() => handleOpenRegister()} />

      <main className="flex-grow z-10">
        
        {/* Navigation Breadcrumb & Back Button */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <button 
            onClick={() => router.push('/universities')}
            className="inline-flex items-center gap-2 text-slate-500 hover:text-[#032B69] font-bold text-sm transition-colors group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>All Universities</span>
          </button>
        </div>

        {/* 1. Top Cover Banner (Showcase University Image) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 relative">
          <div className="h-[280px] sm:h-[380px] md:h-[450px] w-full rounded-[32px] overflow-hidden relative shadow-xl border border-slate-100">
            {/* Background Campus Image */}
            <img 
              src={coverImage || 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200&auto=format&fit=crop'} 
              alt={name} 
              className="w-full h-full object-cover" 
            />
            {/* Dark & Themed Color Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent z-10" />
            
            {/* Floating Top Badge */}
            {ugcApproved && (
              <div className="absolute top-6 right-6 z-20 bg-emerald-500 text-white text-[10px] sm:text-xs font-black uppercase tracking-wider px-4 py-2 rounded-full border border-emerald-400/30 flex items-center gap-1.5 shadow-md">
                <ShieldCheck className="w-4 h-4" />
                <span>UGC-DEB Approved</span>
              </div>
            )}
            
            {/* Overlay Info Block */}
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 z-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-4 max-w-3xl">
                {/* Accreditation & Rank pills */}
                <div className="flex flex-wrap gap-2.5">
                  <span className="px-3 py-1 bg-amber-400 text-slate-950 text-[10px] sm:text-xs font-black rounded-lg uppercase tracking-wide">
                    {naacGrade}
                  </span>
                  {nirfRank && nirfRank !== 'N/A' && (
                    <span className="px-3 py-1 bg-blue-600 text-white text-[10px] sm:text-xs font-black rounded-lg uppercase tracking-wide">
                      {nirfRank}
                    </span>
                  )}
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-[10px] sm:text-xs font-black rounded-lg uppercase tracking-wide border border-white/10">
                    {type} University
                  </span>
                </div>
                
                {/* Title */}
                <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight tracking-tight drop-shadow-sm">
                  {name}
                </h1>
                
                {/* Location */}
                <div className="flex items-center gap-2 text-slate-200 text-xs sm:text-sm font-semibold">
                  <MapPin className="w-4 h-4 text-slate-300" />
                  <span>{location}, India</span>
                </div>
              </div>

              {/* Floating Action Header Logo & Application Button */}
              <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-3xl border border-white/25 shrink-0 self-start md:self-end">
                <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center overflow-hidden shadow-inner border border-slate-100 shrink-0">
                  <UniversityLogo universityName={name} logoUrl={logo} />
                </div>
                <div className="text-white pr-2">
                  <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Apply Online</p>
                  <p className="text-sm font-black text-white mt-0.5">{shortName}</p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 2. Glassmorphism Stats Grid Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 bg-white/30 backdrop-blur-md border border-slate-100 rounded-3xl p-5 sm:p-6 shadow-sm">
            
            {/* Stat 1: Programs */}
            <div className="flex items-center gap-4 p-3 rounded-2xl bg-slate-50/50 border border-slate-100">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Programs</span>
                <span className="text-lg sm:text-xl font-extrabold text-[#091535]">{programs.length > 0 ? `${programs.length}+` : programsCount} Courses</span>
              </div>
            </div>

            {/* Stat 2: Students */}
            <div className="flex items-center gap-4 p-3 rounded-2xl bg-slate-50/50 border border-slate-100">
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 border border-purple-100">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Learners</span>
                <span className="text-lg sm:text-xl font-extrabold text-[#091535]">{studentsCount} enrolled</span>
              </div>
            </div>

            {/* Stat 3: Established */}
            <div className="flex items-center gap-4 p-3 rounded-2xl bg-slate-50/50 border border-slate-100">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Established</span>
                <span className="text-lg sm:text-xl font-extrabold text-[#091535]">Est. {established}</span>
              </div>
            </div>

            {/* Stat 4: Rating */}
            <div className="flex items-center gap-4 p-3 rounded-2xl bg-slate-50/50 border border-slate-100">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100">
                <Star className="w-6 h-6 fill-current text-amber-500" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Rating</span>
                <span className="text-lg sm:text-xl font-extrabold text-[#091535]">{rating} ({reviewsCount || '100+'} reviews)</span>
              </div>
            </div>

          </div>
        </section>

        {/* 3. Main Content Split Layout */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Programs Catalog */}
            <div className="lg:col-span-8 space-y-8">

              {description && (
                <div className="bg-white/40 backdrop-blur-md border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm space-y-3">
                  <h2 className="text-xl font-black text-[#091535]">About {name}</h2>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {description}
                  </p>
                </div>
              )}
              
              <div className="bg-white/40 backdrop-blur-md border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
                
                {/* Header with Search and Tabs */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  <div>
                    <h2 className="text-2xl font-black text-[#091535]">Offered Programs</h2>
                    <p className="text-slate-500 text-xs sm:text-sm font-semibold mt-1">Explore and filter accredited programs available at {shortName}.</p>
                  </div>
                  
                  {/* Search Bar */}
                  <div className="relative flex items-center glass-search-box rounded-xl px-3.5 py-2 w-full md:max-w-xs shadow-inner">
                    <Search className="w-4 h-4 text-slate-400 shrink-0 mr-2" />
                    <input 
                      type="text" 
                      placeholder="Search courses..."
                      value={programSearch}
                      onChange={(e) => setProgramSearch(e.target.value)}
                      className="w-full text-xs bg-transparent focus:outline-none placeholder-slate-400"
                    />
                    {programSearch && (
                      <button onClick={() => setProgramSearch('')} className="p-0.5 rounded-full hover:bg-slate-200/50 text-slate-500">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Level Pills Filtering */}
                <div className="flex flex-wrap gap-2">
                  {['All', 'Undergraduate', 'Postgraduate', 'Diploma', 'Certificate'].map((lvl) => {
                    const isActive = selectedLevel === lvl;
                    return (
                      <button
                        key={lvl}
                        onClick={() => setSelectedLevel(lvl)}
                        className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                          isActive
                            ? 'bg-[#032B69] text-white shadow-md'
                            : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {lvl}
                      </button>
                    );
                  })}
                </div>

                {/* Programs List */}
                {filteredPrograms.length > 0 ? (
                  <div className="grid grid-cols-1 gap-6">
                    {filteredPrograms.map((prog) => (
                      <div 
                        key={prog._id}
                        className="bg-white rounded-[24px] border border-slate-100 p-5 sm:p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between gap-5 relative group overflow-hidden"
                      >
                        {/* Course Info */}
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="bg-red-50 text-[#9b1c1c] text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wider border border-red-100">
                              {prog.code}
                            </span>
                            <span className="bg-blue-50 text-[#1e429f] text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wide border border-blue-100">
                              {prog.level}
                            </span>
                            {prog.category && (
                              <span className="bg-slate-50 text-slate-500 text-[10px] font-semibold px-2.5 py-1 rounded-lg border border-slate-100">
                                {prog.category}
                              </span>
                            )}
                          </div>

                          <h3 className="text-xl font-extrabold text-[#091535] group-hover:text-blue-600 transition-colors">
                            {prog.title}
                          </h3>

                          {/* Stats Row */}
                          <div className="flex flex-wrap items-center gap-5 text-slate-500 text-xs font-semibold pt-1">
                            <div className="flex items-center gap-1.5">
                              <Clock className="w-4 h-4 text-slate-400" />
                              <span>{prog.duration}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <CalendarDays className="w-4 h-4 text-slate-400" />
                              <span>{prog.semesters}</span>
                            </div>
                          </div>
                        </div>

                        {/* Fee and Action Rows */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-100">
                          
                          {/* Fees Info */}
                          <div className="flex items-center gap-6">
                            <div>
                              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Semester Fee</span>
                              <span className="text-base font-black text-[#9b1c1c]">{prog.fee}</span>
                            </div>
                            {prog.emi && prog.emi !== 'N/A' && (
                              <div>
                                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">EMI option</span>
                                <span className="text-sm font-extrabold text-[#1d4ed8]">{prog.emi}</span>
                              </div>
                            )}
                          </div>

                          {/* Buttons */}
                          <div className="flex items-center gap-2.5 sm:self-end">
                            <button
                              onClick={() => setActiveDetailProgram(prog)}
                              className="px-4 py-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 rounded-xl text-xs font-bold transition-all cursor-pointer"
                            >
                              Syllabus & Info
                            </button>
                            <button
                              onClick={() => handleOpenRegister(prog)}
                              className="px-4 py-2.5 bg-[#032B69] hover:bg-[#002f6c] text-white rounded-xl text-xs font-black transition-all flex items-center gap-1.5 active:scale-95 shadow-md shadow-blue-900/5 cursor-pointer"
                            >
                              <span>Enroll Now</span>
                              <Send className="w-3 h-3" />
                            </button>
                          </div>

                        </div>

                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 bg-slate-50/50 rounded-2xl border border-slate-100 p-8">
                    <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-base font-bold text-slate-800">No programs match your search</h3>
                    <p className="text-xs text-slate-500 mt-1">Try resetting the level filter or checking for typos.</p>
                  </div>
                )}

              </div>

            </div>

            {/* Right Column: Sidebar Facts & Inquiry Form */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Fact Card */}
              <div className="bg-white/40 backdrop-blur-md border border-slate-100 rounded-3xl p-6 shadow-sm space-y-5">
                <h3 className="text-lg font-black text-[#091535] flex items-center gap-2 pb-3 border-b border-slate-100">
                  <Building className="w-5 h-5 text-blue-600" />
                  <span>University Overview</span>
                </h3>
                
                <ul className="space-y-4 text-xs sm:text-sm">
                  {/* Row 1: Established */}
                  <li className="flex justify-between items-center py-1.5 border-b border-slate-100/50">
                    <span className="font-semibold text-slate-400 uppercase tracking-wider text-[10px]">Established</span>
                    <span className="font-bold text-[#091535]">{established}</span>
                  </li>
                  
                  {/* Row 2: Type */}
                  <li className="flex justify-between items-center py-1.5 border-b border-slate-100/50">
                    <span className="font-semibold text-slate-400 uppercase tracking-wider text-[10px]">Type</span>
                    <span className="font-bold text-[#091535]">{type}</span>
                  </li>

                  {/* Row 3: Accreditations */}
                  <li className="flex justify-between items-center py-1.5 border-b border-slate-100/50">
                    <span className="font-semibold text-slate-400 uppercase tracking-wider text-[10px]">Accreditations</span>
                    <span className="font-bold text-[#091535]">{naacGrade}</span>
                  </li>

                  {/* Row 4: NIRF Rating */}
                  <li className="flex justify-between items-center py-1.5 border-b border-slate-100/50">
                    <span className="font-semibold text-slate-400 uppercase tracking-wider text-[10px]">NIRF Ranking</span>
                    <span className="font-bold text-[#091535]">{nirfRank !== 'N/A' ? nirfRank : 'Approved'}</span>
                  </li>

                  {/* Row 5: Fee Range */}
                  <li className="flex justify-between items-center py-1.5 border-b border-slate-100/50">
                    <span className="font-semibold text-slate-400 uppercase tracking-wider text-[10px]">Fee Range</span>
                    <span className="font-bold text-[#9b1c1c]">{feeRange}</span>
                  </li>

                  {/* Row 6: Approval */}
                  <li className="flex justify-between items-center py-1.5">
                    <span className="font-semibold text-slate-400 uppercase tracking-wider text-[10px]">UGC Status</span>
                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-md font-bold text-xs border border-emerald-100">UGC-DEB Approved</span>
                  </li>
                </ul>
              </div>

              {/* Inquiry Sidebar Callout Card */}
              <div className="bg-gradient-to-br from-[#091535] via-slate-950 to-[#0c1c46] border border-slate-800 rounded-3xl p-6 text-white text-center space-y-6 shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
                
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-400 mx-auto">
                  <GraduationCap className="w-6 h-6" />
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-lg font-black tracking-tight leading-tight">Need Free Counseling?</h4>
                  <p className="text-xs text-slate-400 leading-relaxed max-w-[210px] mx-auto">Speak with our expert admission guides to choose the best career stream at {shortName}.</p>
                </div>
                
                <button
                  onClick={() => handleOpenRegister()}
                  className="w-full py-3.5 bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                >
                  Request Call Back
                </button>
              </div>

            </div>

          </div>
        </section>

        {/* 4. Bottom CTA banner */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-[32px] p-8 md:p-12 text-white flex flex-col md:flex-row md:items-center justify-between gap-8 shadow-xl shadow-indigo-600/10 relative overflow-hidden">
            <div className="absolute -top-24 -left-24 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="space-y-3 max-w-2xl z-10">
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
                Admissions open for {established ? `Academic Year ${new Date().getFullYear()}` : 'Enrollment'}
              </h2>
              <p className="text-slate-100 text-sm sm:text-base font-semibold leading-relaxed">
                Take the next step in your professional development. Get accredited online degrees from top tier institutions with flexible schedules and payment options.
              </p>
            </div>
            
            <button
              onClick={() => handleOpenRegister()}
              className="px-6 py-4 bg-black text-white hover:bg-slate-950 rounded-2xl text-xs uppercase font-black tracking-wider transition-all duration-200 active:scale-95 shrink-0 self-start md:self-center border border-black hover:border-black/80 shadow-lg cursor-pointer"
            >
              Apply For Admission
            </button>
          </div>
        </section>

      </main>

      {/* Footer */}
      <Footer onOpenRegister={() => handleOpenRegister()} />

      {/* Program Details Modal/Drawer */}
      <AnimatePresence>
        {activeDetailProgram && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-slate-100 overflow-hidden relative"
            >
              <button
                onClick={() => setActiveDetailProgram(null)}
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors z-10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-6 sm:p-8 space-y-6">
                
                {/* Program Header */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl border border-slate-100 flex items-center justify-center overflow-hidden bg-white shrink-0 shadow-sm">
                    <UniversityLogo universityName={name} logoUrl={logo} />
                  </div>
                  <div>
                    <div className="flex gap-2 mb-1.5">
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-[#fdf2f2] text-[#9b1c1c]">
                        {activeDetailProgram.code}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                        {activeDetailProgram.level}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight">
                      {activeDetailProgram.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">{name} • UGC-DEB Accredited</p>
                  </div>
                </div>

                {/* Syllabus Highlights */}
                {activeDetailProgram.syllabus && activeDetailProgram.syllabus.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-xs uppercase font-black text-slate-400 tracking-wider flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-indigo-500" />
                      <span>Syllabus Highlights</span>
                    </h4>
                    <ul className="grid grid-cols-1 gap-2.5">
                      {activeDetailProgram.syllabus.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs font-semibold text-slate-700">
                          <CheckCircle className="w-4.5 h-4.5 text-indigo-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Career Opportunities */}
                {activeDetailProgram.careers && activeDetailProgram.careers.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-xs uppercase font-black text-slate-400 tracking-wider flex items-center gap-1.5">
                      <TrendingUp className="w-4 h-4 text-emerald-500" />
                      <span>Career Pathways</span>
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {activeDetailProgram.careers.map((career, idx) => (
                        <span key={idx} className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-700 bg-white shadow-sm">
                          {career}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="pt-2 flex items-center gap-4">
                  <button
                    onClick={() => {
                      const prog = activeDetailProgram;
                      setActiveDetailProgram(null);
                      handleOpenRegister(prog);
                    }}
                    className="w-full py-3.5 rounded-2xl text-sm font-bold bg-[#032B69] hover:bg-[#002f6c] text-white transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-blue-900/10"
                  >
                    <span>Quick Enrollment</span>
                    <Send className="w-4 h-4 text-white" />
                  </button>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Register Modal */}
      <RegisterModal 
        key={selectedCourse ? selectedCourse.title : 'detail-page-register'}
        isOpen={isRegisterOpen} 
        onClose={() => setIsRegisterOpen(false)} 
        selectedCourse={selectedCourse}
      />

    </div>
  );
}
