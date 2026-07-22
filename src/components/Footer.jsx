import React from 'react';
import LearnuzLogo from './LearnuzLogo';
import { Send, Globe, Shield, Heart, ArrowUpRight } from 'lucide-react';

export default function Footer({ onOpenRegister }) {
  return (
    <footer className="bg-[#091535] text-slate-300 pt-16 pb-12 relative overflow-hidden border-t border-slate-800">
      
      {/* Background Radial Lights */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Pre-Footer Callout Box */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-8 sm:p-12 mb-16 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8 text-white">
          <div>
            <span className="bg-white/20 text-white text-xs font-extrabold px-3.5 py-1 rounded-full uppercase tracking-wider">
              Start Learning Today
            </span>
            <h3 className="text-2xl sm:text-4xl font-extrabold mt-3 tracking-tight">
              Ready to Advance Your University Degree?
            </h3>
            <p className="text-blue-100 text-sm sm:text-base mt-2 max-w-xl">
              Join over 100,000 students enrolled in world-class university courses and accredited degree pathways through Learnuz.
            </p>
          </div>
          <button
            onClick={onOpenRegister}
            className="shrink-0 bg-white text-blue-700 font-extrabold px-8 py-4 rounded-full shadow-xl hover:bg-blue-50 transition-all hover:scale-105 flex items-center gap-2"
          >
            <span>Get Started Now</span>
            <ArrowUpRight className="w-5 h-5 text-blue-700" />
          </button>
        </div>

        {/* 4-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Col 1 & 2: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="brightness-200">
              <LearnuzLogo size="medium" />
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Learnuz is a premier educational platform connecting ambitious learners worldwide with accredited degree programs and courses from top partner universities.
            </p>
            <div className="flex items-center gap-3 pt-2 text-slate-400 text-xs">
              <span className="flex items-center gap-1">
                <Globe className="w-4 h-4 text-blue-400" /> Global Campus
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Shield className="w-4 h-4 text-blue-400" /> Accredited Degrees
              </span>
            </div>
          </div>

          {/* Col 3: Navigation Links */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><a href="#home" className="hover:text-blue-400 transition-colors">Home</a></li>
              <li><a href="#universities" className="hover:text-blue-400 transition-colors">Universities</a></li>
              <li><a href="#courses" className="hover:text-blue-400 transition-colors">Courses</a></li>
              <li><a href="#about" className="hover:text-blue-400 transition-colors">About</a></li>
            </ul>
          </div>

          {/* Col 4: Top University Partners */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Academic Partners
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><a href="#universities" className="hover:text-blue-400 transition-colors">Oxford Online</a></li>
              <li><a href="#universities" className="hover:text-blue-400 transition-colors">Stanford Extension</a></li>
              <li><a href="#universities" className="hover:text-blue-400 transition-colors">Harvard Courses</a></li>
              <li><a href="#universities" className="hover:text-blue-400 transition-colors">MIT Open Learning</a></li>
            </ul>
          </div>

          {/* Col 5: Newsletter */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Newsletter
            </h4>
            <p className="text-xs text-slate-400 mb-3">
              Subscribe for university updates, scholarship alerts, and new course releases.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1.5 p-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            © {new Date().getFullYear()} Learnuz Inc. All rights reserved. Providing quality university education globally.
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-400">Privacy Policy</a>
            <a href="#" className="hover:text-slate-400">Terms of Service</a>
            <a href="#" className="hover:text-slate-400">Academic Code</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
