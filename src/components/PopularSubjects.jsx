import React, { useState } from 'react';
import { 
  Video, 
  Layers, 
  PlayCircle, 
  Zap, 
  Code, 
  BrainCircuit, 
  TrendingUp, 
  Palette, 
  Star, 
  Clock, 
  GraduationCap, 
  ArrowRight 
} from 'lucide-react';

export default function PopularSubjects({ onSelectCourse }) {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = [
    'All',
    'Computer Science',
    'Data & AI',
    'Digital Marketing',
    '3D & Animation',
    'Business & Finance'
  ];

  const courses = [
    {
      id: 1,
      category: '3D & Animation',
      title: '3D Character Animation & Rigging',
      university: 'Oxford Institute',
      icon: PlayCircle,
      iconBg: 'bg-blue-600 text-white',
      students: '12.4k Students',
      duration: '8 Weeks',
      rating: '4.9',
      highlight: true
    },
    {
      id: 2,
      category: '3D & Animation',
      title: 'Rotoscope & VFX Production',
      university: 'Cambridge Ed',
      icon: Layers,
      iconBg: 'bg-indigo-600 text-white',
      students: '8.2k Students',
      duration: '6 Weeks',
      rating: '4.8',
      highlight: false
    },
    {
      id: 3,
      category: 'Computer Science',
      title: 'Full-Stack Software Engineering',
      university: 'MIT Online',
      icon: Code,
      iconBg: 'bg-purple-600 text-white',
      students: '24.1k Students',
      duration: '12 Weeks',
      rating: '5.0',
      highlight: false
    },
    {
      id: 4,
      category: 'Data & AI',
      title: 'Applied Machine Learning & AI Systems',
      university: 'Stanford Online',
      icon: BrainCircuit,
      iconBg: 'bg-blue-600 text-white',
      students: '18.9k Students',
      duration: '10 Weeks',
      rating: '4.9',
      highlight: false
    },
    {
      id: 5,
      category: '3D & Animation',
      title: 'Motion Capture Tech & Unreal Engine 5',
      university: 'Harvard Extension',
      icon: Zap,
      iconBg: 'bg-amber-600 text-white',
      students: '6.7k Students',
      duration: '7 Weeks',
      rating: '4.9',
      highlight: false
    },
    {
      id: 6,
      category: 'Digital Marketing',
      title: 'Growth Marketing & AI Analytics',
      university: 'ETH Zurich',
      icon: TrendingUp,
      iconBg: 'bg-emerald-600 text-white',
      students: '15.3k Students',
      duration: '6 Weeks',
      rating: '4.8',
      highlight: false
    }
  ];

  const filteredCourses = activeCategory === 'All' 
    ? courses 
    : courses.filter(c => c.category === activeCategory);

  return (
    <section id="courses" className="py-16 sm:py-24 bg-slate-50/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#091535] tracking-tight">
            POPULAR SUBJECTS & COURSES
          </h2>
          <p className="text-slate-600 text-base mt-2">
            Explore accredited university modules taught by top global faculty.
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
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25 scale-105'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-300 hover:text-blue-600'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredCourses.map((course) => {
            const Icon = course.icon;
            return (
              <div
                key={course.id}
                className={`glass-panel p-6 rounded-3xl border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl flex flex-col justify-between group ${
                  course.highlight 
                    ? 'border-blue-500 ring-2 ring-blue-500/20 bg-gradient-to-b from-blue-50/80 to-white' 
                    : 'border-slate-200/80 hover:border-blue-300'
                }`}
              >
                <div>
                  {/* Top Badge & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-14 h-14 rounded-2xl ${course.iconBg} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 text-amber-700 px-2.5 py-1 rounded-full text-xs font-bold">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{course.rating}</span>
                    </div>
                  </div>

                  {/* University Tag */}
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 mb-2">
                    <GraduationCap className="w-4 h-4 text-blue-500" />
                    <span>{course.university}</span>
                  </div>

                  {/* Course Title */}
                  <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors leading-snug">
                    {course.title}
                  </h3>
                </div>

                {/* Course Metadata */}
                <div className="pt-4 border-t border-slate-100 mt-4">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-medium mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{course.duration}</span>
                    </div>
                    <span>{course.students}</span>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => onSelectCourse && onSelectCourse(course)}
                    className="w-full py-2.5 rounded-xl font-semibold text-xs sm:text-sm bg-slate-100 text-slate-800 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <span>View Program Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
