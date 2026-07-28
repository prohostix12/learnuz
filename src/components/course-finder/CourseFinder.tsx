"use client";

import React from 'react';
import { CourseFinderProvider } from './context';
import CourseFinderModal from './CourseFinderModal';

interface CourseFinderProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CourseFinder({ isOpen, onClose }: CourseFinderProps) {
  return (
    <CourseFinderProvider>
      <CourseFinderModal isOpen={isOpen} onClose={onClose} />
    </CourseFinderProvider>
  );
}
