"use client";

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, CheckCircle, MessageSquare, Send, ArrowRight, Shield } from 'lucide-react';

export default function ContactModal({ isOpen, onClose }) {
  const [mounted, setMounted] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    interestCategory: 'Admission Guidance',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Set mounted state on client
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

  if (!mounted || !isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    
    // Quick validation
    if (!formData.fullName || !formData.email || !formData.phone || !formData.message || !formData.subject) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to send message.');
      }

      setIsSubmitting(false);
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setErrorMsg(error.message || 'Something went wrong. Please try again.');
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      subject: '',
      interestCategory: 'Admission Guidance',
      message: ''
    });
    setSubmitted(false);
  };

  const modalContent = (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 sm:p-8 z-10 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          // Success Screen
          <div className="text-center space-y-6 py-6 flex flex-col justify-center items-center">
            <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-2 shadow-inner animate-bounce">
              <CheckCircle className="w-10 h-10" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                Message Sent!
              </h3>
              <p className="text-sm text-slate-500 max-w-md leading-relaxed">
                Thank you, <span className="font-semibold text-slate-900">{formData.fullName}</span>! We have received your query regarding <span className="font-semibold text-slate-900">"{formData.interestCategory}"</span>.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-5 text-left w-full border border-slate-100 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">What Happens Next?</h4>
              <div className="flex items-start gap-2.5">
                <div className="w-4 h-4 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[9px] font-bold shrink-0 mt-0.5">1</div>
                <p className="text-xs text-slate-600 leading-relaxed">An advisor receives your message in our ticketing system.</p>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="w-4 h-4 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[9px] font-bold shrink-0 mt-0.5">2</div>
                <p className="text-xs text-slate-600 leading-relaxed">We will verify UGC-DEB parameters and details matching your query.</p>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="w-4 h-4 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[9px] font-bold shrink-0 mt-0.5">3</div>
                <p className="text-xs text-slate-600 leading-relaxed">You will get a call or email from us in less than 4 hours.</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full pt-2">
              <button
                onClick={handleResetForm}
                className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Send Another Message</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={onClose}
                className="w-full py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold border border-slate-200 transition-all active:scale-95 cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          // Form Screen
          <div>
            <div className="mb-6 pr-6">
              <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                <MessageSquare className="w-5.5 h-5.5 text-blue-600" />
                Send a Message
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Fill out the form below and an admissions counselor will get in touch with you shortly.
              </p>
            </div>

            {errorMsg && (
              <div className="p-3 mb-5 rounded-xl bg-red-50 text-red-700 text-xs font-semibold border border-red-100 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Nair"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all bg-white/50"
                />
              </div>

              {/* Email & Phone Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="rahul@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all bg-white/50"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 00000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all bg-white/50"
                  />
                </div>
              </div>

              {/* Subject & Category Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Query Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.interestCategory}
                    onChange={(e) => setFormData({ ...formData, interestCategory: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-blue-500 transition-all bg-white"
                  >
                    <option>Admission Guidance</option>
                    <option>Program Fee Details</option>
                    <option>UGC DEB Approval Inquiry</option>
                    <option>Scholarships & Offers</option>
                    <option>Technical Support</option>
                    <option>Corporate Tie-ups</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Online MBA details"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all bg-white/50"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Message Details <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows="4"
                  placeholder="Write your query in detail here..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all bg-white/50 resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs shadow-md shadow-blue-500/25 hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    isSubmitting ? 'opacity-80 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400 pt-1">
                <Shield className="w-3.5 h-3.5 text-blue-500" />
                <span>Your query is secure and handled by expert advisors</span>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
