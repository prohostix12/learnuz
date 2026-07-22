import React, { useState } from 'react';
import { Search, GraduationCap } from 'lucide-react';
import AnimatedHeading from './AnimatedHeading';

export default function Hero({ onSearch, onOpenRegister }) {
  const [emailQuery, setEmailQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(emailQuery);
    }
  };

  return (
    <section id="home" className="px-4 sm:px-6 lg:px-8 pt-2 pb-8 relative z-10">
      
      {/* Main Hero Container with Enhanced Sky Blue to Purple Gradient Theme */}
      <div className="max-w-7xl mx-auto rounded-[2.5rem] sm:rounded-[3rem] hero-wrapper-bg relative overflow-hidden p-6 sm:p-10 lg:p-14 shadow-2xl shadow-purple-600/25 border border-white/70">
        
        {/* Vibrant Sky Blue (Top Left) & Electric Purple (Top Right) Radial Glow Underlays */}
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-sky-400/45 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-600/45 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-[450px] h-[450px] bg-indigo-500/35 rounded-full blur-3xl pointer-events-none"></div>

        {/* Soft Diagonal Curved Light Shape Overlay */}
        <div className="absolute -bottom-24 right-0 w-[55%] h-[120%] bg-gradient-to-tl from-white/40 via-white/20 to-transparent rounded-l-full pointer-events-none transform rotate-[-12deg]"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
          
          {/* Left Column Content */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6 pt-2">
            
            {/* Glass Badge Tag */}
            <div className="inline-flex items-center gap-2 glass-tag-pill px-4 py-2 rounded-full text-slate-900 shadow-sm">
              <GraduationCap className="w-4 h-4 text-slate-900" />
              <span className="text-xs sm:text-sm font-semibold tracking-wide text-slate-900">
                Transforming Skills Into Success
              </span>
            </div>

            {/* Main Headline with Letter-by-Letter Mount & Unmount Animation */}
            <AnimatedHeading />

            {/* Subtext */}
            <p className="text-sm sm:text-base lg:text-lg text-slate-900 font-medium max-w-xl leading-relaxed">
              Join a new era of education where innovation meets knowledge. Discover expert-led courses, practical skills, and limitless opportunities to achieve your goals.
            </p>

            {/* Glass Search Input Box */}
            <form 
              onSubmit={handleSubmit}
              className="w-full max-w-lg glass-search-box p-1.5 sm:p-2 rounded-full flex items-center gap-2 transition-all focus-within:ring-2 focus-within:ring-white"
            >
              <input
                type="text"
                value={emailQuery}
                onChange={(e) => setEmailQuery(e.target.value)}
                placeholder="Type your email here...."
                className="w-full bg-transparent px-4 sm:px-6 py-2.5 text-sm sm:text-base text-slate-900 placeholder-slate-800 font-medium focus:outline-none"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 sm:px-8 py-3 rounded-full shadow-lg shadow-purple-600/30 transition-all duration-200 active:scale-95 shrink-0"
              >
                Search
              </button>
            </form>

            {/* Social Proof Footer */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 pt-2">
              <div className="flex items-center -space-x-2.5">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                  alt="User avatar"
                  className="w-9 h-9 rounded-full border-2 border-white object-cover shadow-sm"
                />
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
                  alt="User avatar"
                  className="w-9 h-9 rounded-full border-2 border-white object-cover shadow-sm"
                />
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80"
                  alt="User avatar"
                  className="w-9 h-9 rounded-full border-2 border-white object-cover shadow-sm"
                />
                <div className="w-9 h-9 rounded-full bg-blue-600 text-white border-2 border-white flex items-center justify-center font-bold text-xs shadow-sm">
                  +12
                </div>
              </div>

              <div className="text-xs text-slate-900 font-semibold">
                10,000+ people already joined the platform. <br className="hidden sm:inline" />
                <button 
                  onClick={onOpenRegister}
                  className="text-blue-950 font-bold hover:underline"
                >
                  Get started today!
                </button>
              </div>
            </div>

          </div>

          {/* Right Column Student Visual */}
          <div className="lg:col-span-5 flex items-end justify-center relative mt-6 lg:mt-0 self-end -mb-6 sm:-mb-10 lg:-mb-14">
            <div className="relative w-full max-w-md flex items-end justify-center">
              
              {/* Soft Radial Backlight */}
              <div className="absolute inset-0 student-glow-aura rounded-full blur-2xl"></div>

              {/* Student Image */}
              <img
                src="/hero-student.png"
                alt="Student with blue backpack and notebook"
                className="w-full max-w-xs sm:max-w-sm lg:max-w-md h-auto object-contain relative z-10 drop-shadow-2xl"
              />

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
