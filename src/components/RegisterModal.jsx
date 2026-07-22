import React, { useState } from 'react';
import { X, CheckCircle, GraduationCap, ArrowRight, Shield } from 'lucide-react';
import LearnuzLogo from './LearnuzLogo';

export default function RegisterModal({ isOpen, onClose, selectedCourse }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    program: selectedCourse ? selectedCourse.title : 'Full-Stack Software Engineering',
    degreeLevel: 'Bachelor Degree'
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-100 overflow-hidden relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-2 animate-bounce">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">Application Received!</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Thank you, <span className="font-semibold text-slate-900">{formData.fullName || 'Learner'}</span>! Our academic advisors will reach out to <span className="font-semibold text-slate-900">{formData.email}</span> within 24 hours with your enrollment details and university portal access.
            </p>
            <button
              onClick={handleReset}
              className="mt-6 w-full py-3 rounded-2xl bg-blue-600 text-white font-bold text-sm shadow-lg shadow-blue-500/25 hover:bg-blue-700 transition-all"
            >
              Done
            </button>
          </div>
        ) : (
          <div className="p-6 sm:p-8">
            
            {/* Header */}
            <div className="mb-6">
              <LearnuzLogo size="small" />
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-3">
                Register for University Programs
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Start your accredited learning journey with top global faculty today.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Johnson"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="alex@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Degree Level
                  </label>
                  <select
                    value={formData.degreeLevel}
                    onChange={(e) => setFormData({ ...formData, degreeLevel: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500 bg-white"
                  >
                    <option>Bachelor Degree</option>
                    <option>Master Degree</option>
                    <option>Professional Cert</option>
                    <option>Executive Diploma</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Selected Program
                </label>
                <div className="flex items-center gap-2 p-3 rounded-xl bg-blue-50/70 border border-blue-100 text-xs font-bold text-blue-800">
                  <GraduationCap className="w-4 h-4 text-blue-600 shrink-0" />
                  <span className="truncate">{formData.program}</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-sm shadow-lg shadow-blue-500/30 hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <span>Submit Application</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 pt-1">
                <Shield className="w-3.5 h-3.5 text-blue-500" />
                <span>Your information is encrypted & 100% confidential</span>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
