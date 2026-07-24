"use client";

import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Highlights from '../components/Highlights';
import Features from '../components/Features';
import Universities from '../components/Universities';
import PopularSubjects from '../components/PopularSubjects';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';
import RegisterModal from '../components/RegisterModal';

export default function Home() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  const handleOpenRegister = (course = null) => {
    setSelectedCourse(course);
    setIsRegisterOpen(true);
  };

  const handleSearch = (query) => {
    if (!query.trim()) return;
    setToastMessage(`Searching university courses matching "${query}"...`);
    setTimeout(() => setToastMessage(''), 4000);
    const coursesElement = document.querySelector('#courses');
    if (coursesElement) {
      coursesElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0f172a] relative">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 text-sm animate-bounce">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping"></span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation Header */}
      <Navbar onOpenRegister={() => handleOpenRegister()} />

      {/* Main Content Sections */}
      <main>
        {/* Hero Section */}
        <Hero 
          onSearch={handleSearch} 
          onOpenRegister={() => handleOpenRegister()} 
        />

        {/* 3 Metric Highlight Glass Cards */}
        <Highlights />

        {/* Features & Student Highlight Grid */}
        <Features />

        {/* Accredited Partner Universities */}
        <Universities />

        {/* Popular Subjects & Courses Grid with Filters */}
        <PopularSubjects 
          onSelectCourse={(course) => handleOpenRegister(course)} 
        />

        {/* 100k+ Happy Learners Testimonials */}
        <Testimonials 
          onOpenRegister={() => handleOpenRegister()} 
        />
      </main>

      {/* Footer */}
      <Footer 
        onOpenRegister={() => handleOpenRegister()} 
      />

      {/* Registration & Application Modal */}
      <RegisterModal 
        isOpen={isRegisterOpen} 
        onClose={() => setIsRegisterOpen(false)} 
        selectedCourse={selectedCourse}
      />
    </div>
  );
}
