"use client";

import React, { useState } from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import RegisterModal from '../RegisterModal';
import CourseFinder from '../course-finder/CourseFinder';

import Hero from './Hero';
import AboutSection from './AboutSection';
import Statistics from './Statistics';
import MissionBanner from './MissionBanner';
import WhyChoose from './WhyChoose';
import StudentJourney from './StudentJourney';
import GlobalUniversities from './GlobalUniversities';
import Values from './Values';
import Testimonials from './Testimonials';
import FAQ from './FAQ';
import CTA from './CTA';

export default function AboutClientPage() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isCourseFinderOpen, setIsCourseFinderOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const handleOpenRegister = (course = null) => {
    setSelectedCourse(course);
    setIsRegisterOpen(true);
  };

  return (
    <div className="universities-page-wrap min-h-screen bg-[#F8FAFF]/30 backdrop-blur-md text-[#0F172A] relative flex flex-col overflow-x-hidden">
      
      {/* Navigation Header */}
      <Navbar 
        onOpenRegister={() => handleOpenRegister()} 
        onOpenCourseFinder={() => setIsCourseFinderOpen(true)}
      />

      {/* Main Content Sections */}
      <main>
        {/* 1. Hero Section */}
        <Hero 
          onOpenCourseFinder={() => setIsCourseFinderOpen(true)}
          onOpenRegister={() => handleOpenRegister()}
        />

        {/* 2. About Learnuz Section (Left text, Right Collage, counting stats) */}
        <AboutSection />

        {/* 3. Numbers Section / Statistics (Dark Gradient) */}
        <Statistics />

        {/* 4. Full Width Parallax Mission Banner */}
        <MissionBanner 
          onOpenCourseFinder={() => setIsCourseFinderOpen(true)}
        />

        {/* 5. Why Choose Learnuz Section */}
        <WhyChoose />

        {/* 6. How We Help / Student Journey Timeline */}
        <StudentJourney />

        {/* 7. Global Universities Section (Map connection illustration) */}
        <GlobalUniversities />

        {/* 8. Core Values Section */}
        <Values />

        {/* 9. Testimonials Carousel */}
        <Testimonials />

        {/* 10. FAQ Accordions */}
        <FAQ />

        {/* 11. Final Call-to-action Section */}
        <CTA 
          onOpenCourseFinder={() => setIsCourseFinderOpen(true)}
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

      {/* Course Finder Recommendation Wizard Modal */}
      <CourseFinder 
        isOpen={isCourseFinderOpen} 
        onClose={() => setIsCourseFinderOpen(false)} 
      />
    </div>
  );
}
