"use client";

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, GraduationCap, ArrowLeft, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCourseFinder } from './context';
import { questions } from './questions';
import ProgressBar from './ProgressBar';
import QuestionCard from './QuestionCard';
import ContactForm from './ContactForm';
import SuccessScreen from './SuccessScreen';

interface CourseFinderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CourseFinderModal({ isOpen, onClose }: CourseFinderModalProps) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    currentStep,
    setCurrentStep,
    answers,
    setAnswer,
    resetWizard
  } = useCourseFinder();

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

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !mounted) return null;

  const currentQuestion = currentStep <= 4 ? questions[currentStep - 1] : null;

  // Handle choice selection with 300ms delay auto-proceed
  const handleSelectOption = (optionText: string) => {
    if (!currentQuestion) return;
    setAnswer(currentQuestion.id, optionText);
    
    setTimeout(() => {
      setCurrentStep(currentStep + 1);
    }, 300);
  };

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Submit contact info and survey responses to database
  const handleFormSubmit = async (formData: { fullName: string; email: string; phone: string }) => {
    setIsSubmitting(true);
    try {
      // Save form details in context state
      setAnswer('fullName', formData.fullName);
      setAnswer('email', formData.email);
      setAnswer('phone', formData.phone);

      const message = `Course Finder wizard recommendations request:
- Working Status: ${answers.working || 'N/A'}
- Qualification: ${answers.qualification || 'N/A'}
- Career Goal: ${answers.goal || 'N/A'}
- Field of Interest: ${answers.field || 'N/A'}`;

      const res = await fetch('/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          subject: 'Course Finder Inquiry',
          interestCategory: 'Admission Guidance',
          message: message,
        }),
      });

      if (res.ok) {
        setCurrentStep(6); // Go to Success Screen
      } else {
        const errorData = await res.json();
        console.error('Failed to submit course inquiry:', errorData.error);
        alert(errorData.error || 'Failed to submit details. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      alert('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Redirect to filtered program recommendations page
  const handleSuccessComplete = () => {
    let targetCategory = 'All';
    let searchQuery = '';

    // Qualification-based program level mapping
    if (['Undergraduate', 'Graduate', 'Postgraduate'].includes(answers.qualification || '')) {
      targetCategory = 'Postgraduate';
    } else if (['10th', '12th', 'Diploma'].includes(answers.qualification || '')) {
      targetCategory = 'Undergraduate';
    }

    // Field-based course category mapping
    if (answers.field === 'Technology') {
      targetCategory = 'Computer Science';
    } else if (answers.field === 'Business') {
      targetCategory = 'Management';
    } else if (answers.field) {
      searchQuery = answers.field;
    }

    const params = new URLSearchParams();
    if (targetCategory !== 'All') {
      params.set('category', targetCategory);
    }
    if (searchQuery) {
      params.set('search', searchQuery);
    }

    onClose();
    resetWizard();
    router.push(`/programs?${params.toString()}`);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Get dynamic header copy based on step
  const getHeader = () => {
    if (currentStep <= 4) {
      return {
        title: "Find Your Perfect Course",
        subtitle: "Answer a few questions to receive personalised recommendations."
      };
    }
    if (currentStep === 5) {
      return {
        title: "Almost Done!",
        subtitle: "Enter your details to receive your recommended courses."
      };
    }
    return null;
  };

  const headerInfo = getHeader();

  const modalContent = (
    <div 
      onClick={handleBackdropClick}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: "spring", duration: 0.4 }}
        className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-slate-100 overflow-hidden relative flex flex-col max-h-[90vh]"
      >
        {/* Top Header Section */}
        {headerInfo && (
          <div className="p-6 sm:p-8 pb-4 flex items-start justify-between border-b border-slate-100 shrink-0">
            <div className="space-y-1.5 pr-6">
              {currentStep <= 4 && (
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-500/10 mb-3">
                  <GraduationCap className="w-5 h-5" />
                </div>
              )}
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-none">
                {headerInfo.title}
              </h3>
              <p className="text-slate-550 text-xs sm:text-sm font-medium leading-relaxed">
                {headerInfo.subtitle}
              </p>
            </div>
            
            {/* Close Button */}
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors shrink-0 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Scrollable Body Content */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          {currentStep <= 5 && (
            <div className="mb-6 shrink-0">
              <ProgressBar currentStep={currentStep} totalSteps={5} />
            </div>
          )}

          <AnimatePresence mode="wait">
            {currentStep <= 4 && currentQuestion && (
              <QuestionCard
                key={currentQuestion.id}
                question={currentQuestion}
                selectedOption={answers[currentQuestion.id]}
                onSelect={handleSelectOption}
              />
            )}

            {currentStep === 5 && (
              <ContactForm
                key="contact-form"
                onSubmit={handleFormSubmit}
                onBack={handleBack}
                isSubmitting={isSubmitting}
                defaultValues={{
                  fullName: answers.fullName,
                  email: answers.email,
                  phone: answers.phone
                }}
              />
            )}

            {currentStep === 6 && (
              <SuccessScreen
                key="success-screen"
                onComplete={handleSuccessComplete}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Modal Bottom Action Controls (Only for Steps 1-4) */}
        {currentStep <= 4 && (
          <div className="p-6 sm:px-8 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between shrink-0">
            <button
              onClick={handleBack}
              disabled={currentStep === 1}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-bold text-sm border transition-all cursor-pointer ${
                currentStep === 1
                  ? 'border-slate-200 text-slate-350 cursor-not-allowed bg-transparent'
                  : 'border-slate-250 bg-white text-slate-700 hover:bg-slate-100'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              onClick={handleNext}
              disabled={!currentQuestion || !answers[currentQuestion.id]}
              className={`flex items-center gap-1.5 px-5 py-2.5 rounded-xl font-bold text-sm text-white transition-all cursor-pointer shadow-md ${
                !currentQuestion || !answers[currentQuestion.id]
                  ? 'bg-slate-300 text-slate-100 shadow-none cursor-not-allowed'
                  : 'bg-indigo-650 hover:bg-indigo-700 shadow-indigo-500/10'
              }`}
            >
              <span>Next</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
