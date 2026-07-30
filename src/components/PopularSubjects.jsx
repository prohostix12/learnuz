import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  CalendarDays, 
  Star, 
  Send, 
  CheckCircle,
  X, 
  BookOpen, 
  TrendingUp,
  Award
} from 'lucide-react';
import UniversityLogo from './UniversityLogo';

export default function PopularSubjects({ onSelectCourse }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [programsData, setProgramsData] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeDetailProgram, setActiveDetailProgram] = useState(null);

  const categories = [
    'All',
    'Undergraduate',
    'Postgraduate',
    'Computer Science',
    'Commerce',
    'Management',
    'Engineering',
    'Arts & Humanities',
    'Science',
    'Law',
    'Medicine',
    'Education'
  ];

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

  const filteredPrograms = programsData.filter((program) => {
    const matchesCategory = 
      activeCategory === 'All' || 
      program.level === activeCategory || 
      program.category === activeCategory;
    return matchesCategory;
  });

  const handleOpenDetails = (program) => {
    setActiveDetailProgram(program);
  };

  return (
    <section id="courses" className="py-16 sm:py-24 bg-slate-50/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#091535] tracking-tight">
            POPULAR UNIVERSITY PROGRAMS & COURSES
          </h2>
          <p className="text-slate-600 text-base mt-2">
            Explore accredited undergraduate & postgraduate programs from top-tier universities.
          </p>
        </div>

        {/* Filter Bar Capsule Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {categories.map((cat) => {
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

        {/* Course Cards Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : filteredPrograms.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-800">No programs found</h3>
            <p className="text-sm text-slate-500 mt-1">Try refining your category filter.</p>
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
                    className="w-[40%] py-3.5 rounded-2xl text-xs sm:text-sm font-bold bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-all text-center cursor-pointer"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => onSelectCourse && onSelectCourse(program)}
                    className="w-[60%] py-3.5 rounded-2xl text-xs sm:text-sm font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-black border border-black hover:border-black shadow-lg shadow-purple-600/30 transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Enroll Now</span>
                    <Send className="w-3.5 h-3.5 text-black" />
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>

      {/* Detailed Syllabus/Structure Modal/Drawer */}
      {activeDetailProgram && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-slate-100 overflow-hidden relative animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setActiveDetailProgram(null)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors z-10 cursor-pointer"
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
                    onSelectCourse(program);
                  }}
                  className="w-full py-3.5 rounded-2xl text-sm font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-black border border-black hover:border-black shadow-lg shadow-purple-600/30 transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Quick Enrollment</span>
                  <Send className="w-4 h-4 text-black" />
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </section>
  );
}
