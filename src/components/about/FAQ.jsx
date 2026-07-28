import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Sparkles } from 'lucide-react';

function FAQItem({ question, answer, isOpen, toggleOpen }) {
  return (
    <div className="border-b border-slate-200 last:border-0 py-4.5">
      <button
        onClick={toggleOpen}
        className="w-full flex items-center justify-between py-4 text-left font-bold text-slate-900 text-base sm:text-lg hover:text-indigo-500 transition-colors focus:outline-none cursor-pointer"
        aria-expanded={isOpen}
      >
        <span>{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          className="ml-4 shrink-0 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500"
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="pb-6 pr-4 sm:pr-8 text-slate-600 text-sm sm:text-base font-normal leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const faqs = [
    {
      question: 'How does Learnuz help students?',
      answer: 'Learnuz connects students with accredited universities globally. We provide end-to-end support, including initial career counselling, course selection advice, document review, application preparation, scholarship applications, and visa guidance.'
    },
    {
      question: 'How do I apply?',
      answer: 'You can start by booking a free session with a Learnuz counsellor. We will evaluate your qualifications, recommend courses matching your goals, gather the required documents (transcripts, certificates, SOP), and submit the applications to partner universities on your behalf.'
    },
    {
      question: 'Can I get scholarships?',
      answer: 'Yes! We actively guide students to find and apply for both government scholarships and specific university tuition-waiver scholarships. Our team helps you structure your profile and application statements to maximize your funding chances.'
    },
    {
      question: 'Do you help with visas?',
      answer: 'Absolutely. We provide dedicated student visa support. Our consultants help you compile financial files, check requirements, file the visa application, and conduct mock visa interviews to ensure high success rates.'
    },
    {
      question: 'How do I contact an advisor?',
      answer: 'You can easily click the "Contact Advisor" or "Book Free Consultation" buttons on our website. This will open our registration modal where you can fill in your contact details. An advisor will get in touch with you within 24 hours.'
    }
  ];

  const [openIndex, setOpenIndex] = useState(0);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="py-24 sm:py-32 bg-slate-50/40 backdrop-blur-md relative overflow-hidden">
      
      {/* Background decoration */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 font-bold text-xs uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight">
            Frequently Asked{' '}
            <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-slate-600 font-normal leading-relaxed">
            Quick answers to common questions about admissions, visas, and counselling services.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white border border-slate-200/50 rounded-[2rem] p-6 sm:p-10 shadow-xl"
        >
          {faqs.map((faq, idx) => (
            <FAQItem
              key={idx}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === idx}
              toggleOpen={() => handleToggle(idx)}
            />
          ))}
        </motion.div>

      </div>
    </section>
  );
}
