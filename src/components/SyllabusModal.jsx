import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, BookOpen, CheckCircle, TrendingUp, Send } from 'lucide-react';
import UniversityLogo from './UniversityLogo';

export default function SyllabusModal({ 
  isOpen, 
  onClose, 
  program, 
  logoUrl, 
  onEnroll,
  buttonClass,
  iconColorClass
}) {
  const [mounted, setMounted] = useState(false);

  // Set mounted state on client for portals
  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen || !mounted || !program) return null;

  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-slate-100 overflow-hidden relative animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors z-10 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto flex-1" data-lenis-prevent>
          
          {/* Program Detail Header */}
          <div className="flex items-start gap-4 pr-8">
            <div className="w-12 h-12 rounded-xl border border-slate-100 flex items-center justify-center overflow-hidden bg-white shrink-0 shadow-sm">
              <UniversityLogo universityName={program.university} logoUrl={logoUrl} />
            </div>
            <div>
              <div className="flex gap-2 mb-1.5">
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-[#fdf2f2] text-[#9b1c1c]">
                  {program.code}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                  {program.level}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight">
                {program.title}
              </h3>
              <p className="text-xs text-slate-500 mt-1">{program.university} • UGC-DEB Accredited</p>
            </div>
          </div>

          {program.description && (
            <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 border border-slate-100 p-3.5 rounded-2xl">
              {program.description}
            </p>
          )}

          {/* Syllabus Breakdown */}
          {program.syllabus && program.syllabus.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-xs uppercase font-black text-slate-400 tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-indigo-500" />
                <span>Syllabus Highlights</span>
              </h4>
              <ul className="grid grid-cols-1 gap-2.5">
                {program.syllabus.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs font-semibold text-slate-700">
                    <CheckCircle className="w-4.5 h-4.5 text-indigo-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Career Opportunities */}
          {program.careers && program.careers.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-xs uppercase font-black text-slate-400 tracking-wider flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-emerald-500" />
                <span>Career Pathways</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {program.careers.map((career, idx) => (
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
              onClick={() => onEnroll(program)}
              className={buttonClass || "w-full py-3.5 rounded-2xl text-sm font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-black border border-black hover:border-black shadow-lg shadow-purple-600/30 transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"}
            >
              <span>Quick Enrollment</span>
              <Send className={`w-4 h-4 ${iconColorClass || 'text-black'}`} />
            </button>
          </div>

        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
