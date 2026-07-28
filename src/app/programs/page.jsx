"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import RegisterModal from '../../components/RegisterModal';
import UniversityLogo from '../../components/UniversityLogo';
import { 
  Search, 
  Clock, 
  CalendarDays, 
  Star, 
  ArrowRight, 
  Send, 
  CheckCircle,
  X, 
  BookOpen, 
  Sparkles,
  ChevronRight,
  TrendingUp,
  Award
} from 'lucide-react';

export default function ProgramsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#f8fafc]/30 backdrop-blur-md flex items-center justify-center">
        <div className="text-slate-500 font-semibold animate-pulse">Loading programs...</div>
      </div>
    }>
      <ProgramsContent />
    </Suspense>
  );
}

function ProgramsContent() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [activeDetailProgram, setActiveDetailProgram] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [programsData, setProgramsData] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();

  useEffect(() => {
    const categoryParam = searchParams.get('category');
    const searchParam = searchParams.get('search');
    if (categoryParam) {
      setActiveCategory(categoryParam);
    }
    if (searchParam) {
      setSearchQuery(searchParam);
    }
  }, [searchParams]);

  useEffect(() => {
    async function loadData() {
      try {
        const [progRes, uniRes] = await Promise.all([
          fetch('/api/programs'),
          fetch('/api/universities')
        ]);
        if (progRes.ok) {
          const progData = await progRes.json();
          setProgramsData(progData);
        }
        if (uniRes.ok) {
          const uniData = await uniRes.json();
          setUniversities(uniData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const getUniLogo = (uniName) => {
    const uni = universities.find(u => u.name.toLowerCase().trim() === uniName.toLowerCase().trim());
    return uni ? uni.logo : '';
  };

  // Filtering Logic
  const filteredPrograms = programsData.filter((program) => {
    const matchesCategory = 
      activeCategory === 'All' || 
      program.level === activeCategory || 
      program.category === activeCategory;
    const matchesSearch = 
      program.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      program.university.toLowerCase().includes(searchQuery.toLowerCase()) ||
      program.code.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleOpenRegister = (course) => {
    setSelectedCourse(course);
    setIsRegisterOpen(true);
  };

  const handleOpenDetails = (program) => {
    setActiveDetailProgram(program);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]/30 backdrop-blur-md text-[#0f172a] relative">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 text-sm animate-bounce">
          <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping"></span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation Header */}
      <Navbar onOpenRegister={() => handleOpenRegister(null)} />

      {/* Hero Banner Section */}
      <div className="relative py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mt-4">
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-indigo-700 border border-indigo-200/50 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Discover your career path</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Accredited University <br/>
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">Programs & Degrees</span>
          </h1>
          <p className="text-slate-600 text-base sm:text-lg max-w-xl mx-auto">
            Choose from premium UGC-DEB approved undergraduate and postgraduate courses. Upgrade your future with flexible learning.
          </p>
        </div>

        {/* Search and Category Filter Controls */}
        <div className="mt-10 max-w-3xl mx-auto space-y-6">
          
          {/* Glass Search Box */}
          <div className="relative flex items-center w-full glass-search-box rounded-2xl px-4 py-3 shadow-md">
            <Search className="w-5 h-5 text-slate-400 shrink-0 mr-3" />
            <input
              type="text"
              placeholder="Search by degree title, university, or subject..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-sm focus:outline-none bg-transparent placeholder-slate-400"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="p-1 rounded-full hover:bg-slate-200/60 text-slate-500 text-xs"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filter Pills Capsule */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {['All', 'Undergraduate', 'Postgraduate', 'Computer Science', 'Commerce', 'Management'].map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25 scale-105'
                      : 'bg-white text-slate-600 border border-slate-200 hover:border-indigo-300 hover:text-indigo-600'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

        </div>
      </div>

      {/* Main Programs Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-24">
        {filteredPrograms.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-800">No programs found</h3>
            <p className="text-sm text-slate-500 mt-1">Try refining your search terms or choosing a different category filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPrograms.map((program) => (
              <div
                key={program._id}
                className="bg-white rounded-[2.2rem] border border-slate-100/70 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  
                  {/* Top Badges */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex gap-2">
                      <span className="bg-[#fcf2f2] text-[#9b1c1c] text-xs font-extrabold px-3 py-1.5 rounded-xl uppercase tracking-wider">
                        {program.code}
                      </span>
                      <span className="bg-[#ebf5ff] text-[#1e429f] text-xs font-bold px-3 py-1.5 rounded-xl">
                        {program.level}
                      </span>
                    </div>
                    {program.featured && (
                      <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white text-[11px] font-black px-3 py-1.5 rounded-xl flex items-center gap-1 shadow-md shadow-indigo-100">
                        <Star className="w-3 h-3 fill-current animate-pulse" />
                        <span>Featured</span>
                      </span>
                    )}
                  </div>

                  {/* Course Title */}
                  <h3 className="text-2xl font-bold text-[#091535] leading-snug tracking-tight mb-5 group-hover:text-indigo-600 transition-colors">
                    {program.title}
                  </h3>

                  {/* University Box */}
                  <div className="bg-slate-50/70 border border-slate-100/80 rounded-2xl p-3.5 flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <UniversityLogo universityName={program.university} logoUrl={getUniLogo(program.university)} />
                      <div>
                        <h4 className="text-sm font-bold text-slate-800 leading-tight">
                          {program.university}
                        </h4>
                        <div className="flex items-center gap-1 text-[11px] font-extrabold text-[#b45309] mt-1 bg-amber-50/90 px-2 py-0.5 rounded-md w-max border border-amber-100">
                          <Award className="w-3.5 h-3.5 text-amber-500 fill-current" />
                          <span>{program.accreditation}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Duration and Semesters */}
                  <div className="flex items-center gap-6 text-sm text-slate-600 font-semibold mb-6 pl-1">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4.5 h-4.5 text-slate-400" />
                      <span>{program.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CalendarDays className="w-4.5 h-4.5 text-slate-400" />
                      <span>{program.semesters}</span>
                    </div>
                  </div>

                  {/* Fee Box Container */}
                  <div className="bg-[#f8fafc] border border-slate-100 rounded-2xl p-4.5 flex items-center justify-between mb-6 shadow-inner">
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block">
                        Fee per Semester
                      </span>
                      <span className="text-xl font-black text-[#9b1c1c] tracking-tight">
                        {program.fee}
                      </span>
                    </div>
                    <div className="text-right space-y-1">
                      <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block">
                        EMI from
                      </span>
                      <span className="text-base font-extrabold text-[#1d4ed8]">
                        {program.emi}
                      </span>
                    </div>
                  </div>

                </div>

                {/* Actions Button Row */}
                <div className="flex items-center gap-3 w-full">
                  <button
                    onClick={() => handleOpenDetails(program)}
                    className="w-[40%] py-3.5 rounded-2xl text-xs sm:text-sm font-bold bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-all text-center"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => handleOpenRegister(program)}
                    className="w-[60%] py-3.5 rounded-2xl text-xs sm:text-sm font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-black border border-black hover:border-black shadow-lg shadow-purple-600/30 transition-all duration-200 active:scale-95 flex items-center justify-center gap-2"
                  >
                    <span>Enroll Now</span>
                    <Send className="w-3.5 h-3.5 text-black" />
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer onOpenRegister={() => handleOpenRegister(null)} />

      {/* Detailed Syllabus/Structure Modal/Drawer */}
      {activeDetailProgram && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-slate-100 overflow-hidden relative animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setActiveDetailProgram(null)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6 sm:p-8 space-y-6">
              
              {/* Program Detail Header */}
              <div className="flex items-start gap-4">
                <UniversityLogo universityName={activeDetailProgram.university} logoUrl={getUniLogo(activeDetailProgram.university)} />
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
                  <p className="text-xs text-slate-500 mt-1">{activeDetailProgram.university} • UGC-DEB Accredited</p>
                </div>
              </div>

              {/* Syllabus Breakdown */}
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

              {/* Career Opportunities */}
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

              {/* Actions */}
              <div className="pt-2 flex items-center gap-4">
                <button
                  onClick={() => {
                    const program = activeDetailProgram;
                    setActiveDetailProgram(null);
                    handleOpenRegister(program);
                  }}
                  className="w-full py-3.5 rounded-2xl text-sm font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-black border border-black hover:border-black shadow-lg shadow-purple-600/30 transition-all duration-200 active:scale-95 flex items-center justify-center gap-2"
                >
                  <span>Quick Enrollment</span>
                  <Send className="w-4 h-4 text-black" />
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Registration & Application Modal */}
      <RegisterModal 
        key={selectedCourse ? selectedCourse._id : 'default'}
        isOpen={isRegisterOpen} 
        onClose={() => setIsRegisterOpen(false)} 
        selectedCourse={selectedCourse}
      />
      
    </div>
  );
}
