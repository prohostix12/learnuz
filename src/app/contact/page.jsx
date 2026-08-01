"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle, 
  ArrowRight, 
  MessageSquare, 
  Sparkles, 
  ShieldCheck, 
  Globe, 
  Users
} from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import RegisterModal from '../../components/RegisterModal';

export default function ContactPage() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  
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

  const handleOpenRegister = (course = null) => {
    setSelectedCourse(course);
    setIsRegisterOpen(true);
  };

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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFF]/30 backdrop-blur-md text-[#0f172a] relative universities-page-wrap flex flex-col overflow-x-hidden">
      
      {/* Navbar */}
      <Navbar onOpenRegister={() => handleOpenRegister()} />

      {/* Main Section */}
      <main className="flex-grow z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24 relative">
        
        {/* Background Glowing Auras */}
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Hero Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100/80 text-blue-600 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Connect With Us</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
            How Can We Help <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">You?</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Have questions about UGC-DEB approved degrees, programs, or admission processes? Reach out to our dedicated student advisors today.
          </p>
        </div>

        {/* Layout Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10"
        >
          
          {/* Left Column: Contact Cards & Info (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Intro text */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h2 className="text-2xl font-extrabold text-slate-900">
                Contact Information
              </h2>
              <p className="text-sm text-slate-500 leading-relaxed">
                Learnuz is committed to helping students find the ideal university fit. You can reach out directly via these channels or send a message using the form.
              </p>
            </motion.div>

            {/* Info Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              
              {/* Call Card */}
              <motion.a 
                variants={itemVariants}
                href="tel:+919876543210"
                className="flex items-start gap-4 p-5 rounded-2xl glass-card-blue hover:scale-[1.02] hover:-translate-y-0.5 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all shrink-0 shadow-sm">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Call Us</span>
                  <h4 className="text-base font-bold text-slate-800 mt-0.5">+91 98765 43210</h4>
                  <p className="text-xs text-slate-500 mt-1">Direct connect to student support team</p>
                </div>
              </motion.a>

              {/* Email Card */}
              <motion.a 
                variants={itemVariants}
                href="mailto:support@learnuz.com"
                className="flex items-start gap-4 p-5 rounded-2xl glass-card-blue hover:scale-[1.02] hover:-translate-y-0.5 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all shrink-0 shadow-sm">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email Us</span>
                  <h4 className="text-base font-bold text-slate-800 mt-0.5">support@learnuz.com</h4>
                  <p className="text-xs text-slate-500 mt-1">2-4 hour response time for active tickets</p>
                </div>
              </motion.a>

              {/* Location Card */}
              <motion.div 
                variants={itemVariants}
                className="flex items-start gap-4 p-5 rounded-2xl glass-card-blue transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0 shadow-sm">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Headquarters</span>
                  <h4 className="text-base font-bold text-slate-800 mt-0.5">Kochi, Kerala</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Learnuz Hub, Ground Floor, Infopark Phase 1, Kakkanad, Kochi, Kerala, India - 682030
                  </p>
                </div>
              </motion.div>

              {/* Hours Card */}
              <motion.div 
                variants={itemVariants}
                className="flex items-start gap-4 p-5 rounded-2xl glass-card-blue transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0 shadow-sm">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Working Hours</span>
                  <h4 className="text-base font-bold text-slate-800 mt-0.5">Mon - Sat: 9AM - 6PM IST</h4>
                  <p className="text-xs text-slate-500 mt-1">Emergency support desk available on Sunday</p>
                </div>
              </motion.div>
             

            </div>

            {/* Extra Trust Badging
            <motion.div 
              variants={itemVariants}
              className="p-6 rounded-3xl bg-slate-900 text-white space-y-4 shadow-xl border border-slate-800"
            >
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-blue-400" />
                <h4 className="font-bold text-sm">UGC-DEB Advisory Experts</h4>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                All universities represented through Learnuz are officially approved by the University Grants Commission - Distance Education Bureau (UGC-DEB). Our counseling is 100% compliance checked and free of cost.
              </p>
              <div className="flex items-center gap-4 text-[11px] text-slate-400 pt-2 border-t border-slate-800">
                <span className="flex items-center gap-1"><Users className="w-3 h-3 text-blue-400" /> 10k+ Counseling Sessions</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Globe className="w-3 h-3 text-blue-400" /> Pan-India Support</span>
              </div>
            </motion.div>
            */}

          </div>

          {/* Right Column: Contact Form (7 Cols) */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {submitted ? (
                // Success screen inside card block
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-100 shadow-xl text-center space-y-6 min-h-[580px] flex flex-col justify-center items-center"
                >
                  <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-2 shadow-inner animate-bounce">
                    <CheckCircle className="w-12 h-12" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                      Message Sent!
                    </h3>
                    <p className="text-sm text-slate-500 max-w-md leading-relaxed">
                      Thank you, <span className="font-semibold text-slate-900">{formData.fullName}</span>! We have received your query regarding <span className="font-semibold text-slate-900">"{formData.interestCategory}"</span>.
                    </p>
                  </div>

                  {/* Checklist of what to expect */}
                  <div className="bg-slate-50 rounded-2xl p-6 text-left max-w-md w-full border border-slate-100 space-y-3.5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">What Happens Next?</h4>
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">1</div>
                      <p className="text-xs text-slate-600 leading-relaxed">An advisor receives your message in our ticketing system.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">2</div>
                      <p className="text-xs text-slate-600 leading-relaxed">We will verify UGC-DEB parameters and information matching your category.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">3</div>
                      <p className="text-xs text-slate-600 leading-relaxed">You will get a phone call or custom email review in less than 4 hours.</p>
                    </div>
                  </div>

                  <button
                    onClick={handleResetForm}
                    className="w-full max-w-xs py-3.5 rounded-2xl bg-slate-950 text-white text-sm font-bold shadow-lg hover:bg-slate-800 active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    <span>Send Another Message</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.div>
              ) : (
                // Contact Form
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white/80 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xl relative overflow-hidden"
                >
                  <div className="mb-8">
                    <h3 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
                      <MessageSquare className="w-6 h-6 text-blue-600" />
                      Send a Message
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">
                      Fill out the form below and an admissions counselor will get in touch with you shortly.
                    </p>
                  </div>

                  {errorMsg && (
                    <div className="p-4 mb-6 rounded-xl bg-red-50 text-red-700 text-xs font-semibold border border-red-100 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                      {errorMsg}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-5">
                    
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rahul Nair"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all bg-white/50"
                      />
                    </div>

                    {/* Email & Phone Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="rahul@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all bg-white/50"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                          Phone Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+91 98765 00000"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all bg-white/50"
                        />
                      </div>
                    </div>

                    {/* Subject & Category Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                          Query Category <span className="text-red-500">*</span>
                        </label>
                        <select
                          value={formData.interestCategory}
                          onChange={(e) => setFormData({ ...formData, interestCategory: e.target.value })}
                          className="w-full px-3 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500 transition-all bg-white"
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
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                          Subject <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Online MBA details"
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all bg-white/50"
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Message Details <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        required
                        rows="5"
                        placeholder="Write your query in detail here..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all bg-white/50 resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-sm shadow-lg shadow-blue-500/25 hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2 ${
                          isSubmitting ? 'opacity-80 cursor-not-allowed' : ''
                        }`}
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span>Sending Message...</span>
                          </>
                        ) : (
                          <>
                            <span>Send Message</span>
                            <Send className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </div>

                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </motion.div>

      </main>

      {/* Footer */}
      <Footer onOpenRegister={() => handleOpenRegister()} />

      {/* Registration Modal */}
      <RegisterModal 
        isOpen={isRegisterOpen} 
        onClose={() => setIsRegisterOpen(false)} 
        selectedCourse={selectedCourse}
      />

    </div>
  );
}
