import React, { useState } from 'react';
import LearnuzLogo from './LearnuzLogo';
import { Globe, Shield, Heart, ArrowUpRight } from 'lucide-react';
import ContactModal from './ContactModal';

export default function Footer({ onOpenRegister }) {
  const [isContactOpen, setIsContactOpen] = useState(false);
  return (
    <footer id="footer" className="bg-[#091535] text-slate-300 pt-16 pb-12 relative overflow-hidden border-t border-slate-800">
      
      {/* Background Radial Lights */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Pre-Footer Callout Box */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-8 sm:p-12 mb-16 shadow-2xl text-center text-white">
          <div className="max-w-2xl mx-auto py-2">
            <span className="bg-white/20 text-white text-xs font-extrabold px-3.5 py-1 rounded-full uppercase tracking-wider">
              Start Learning Today
            </span>
            <h3 className="text-2xl sm:text-4xl font-extrabold mt-3 tracking-tight">
              Ready to Advance Your University Degree?
            </h3>
            <p className="text-blue-100 text-sm sm:text-base mt-3 leading-relaxed">
              Join over 100,000 students enrolled in world-class university courses and accredited degree pathways through Learnuz.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <a
                href="/universities"
                className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-white text-indigo-700 hover:bg-slate-100 font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-98 cursor-pointer"
              >
                <span>Explore Universities</span>
                <ArrowUpRight className="w-4 h-4 text-indigo-600" />
              </a>
              <a
                href="/programs"
                className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-transparent border border-white/30 hover:border-white text-white hover:bg-white/10 font-bold text-sm transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-98 cursor-pointer"
              >
                <span>Explore Programs</span>
                <ArrowUpRight className="w-4 h-4 text-white/80" />
              </a>
            </div>
          </div>
        </div>

        {/* 4-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Col 1 & 2: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="brightness-200">
              <LearnuzLogo size="medium" isFooter={true} />
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
              <li><a href="/#home" className="hover:text-blue-400 transition-colors">Home</a></li>
              <li><a href="/programs" className="hover:text-blue-400 transition-colors">Programs</a></li>
              <li><a href="/#universities" className="hover:text-blue-400 transition-colors">Universities</a></li>
              <li><a href="/about" className="hover:text-blue-400 transition-colors">About</a></li>
              <li><a href="/contact" className="hover:text-blue-400 transition-colors">Contacts</a></li>
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

          {/* Col 5: Contact Us */}
          <div className="flex flex-col items-start lg:items-end lg:text-right">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 w-full">
              Get in Touch
            </h4>
            <p className="text-xs text-slate-400 mb-5 leading-relaxed max-w-xs text-left lg:text-right">
              Have questions about university degrees, program details, or admission processes? Talk to our student advisors.
            </p>
            <button
              onClick={() => setIsContactOpen(true)}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-650 text-white font-extrabold text-xs shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/35 transition-all flex items-center justify-center gap-1.5 hover:scale-[1.02] active:scale-95 cursor-pointer border border-white/20 uppercase tracking-wider"
            >
              <span>Contact Us</span>
              <ArrowUpRight className="w-4 h-4 text-white" />
            </button>
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
            <a href="/admin/login" className="hover:text-blue-400 font-semibold text-blue-400/80 transition-colors">Admin Login</a>
          </div>
        </div>

      </div>
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </footer>
  );
}
