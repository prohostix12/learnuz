"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { WizardState } from './types';

interface CourseFinderContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  answers: Partial<WizardState>;
  setAnswer: (key: keyof WizardState, value: string) => void;
  resetWizard: () => void;
}

const CourseFinderContext = createContext<CourseFinderContextType | undefined>(undefined);

export const CourseFinderProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<Partial<WizardState>>({});

  const setAnswer = (key: keyof WizardState, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const resetWizard = () => {
    setCurrentStep(1);
    setAnswers({});
  };

  return (
    <CourseFinderContext.Provider
      value={{
        isOpen,
        setIsOpen,
        currentStep,
        setCurrentStep,
        answers,
        setAnswer,
        resetWizard,
      }}
    >
      {children}
    </CourseFinderContext.Provider>
  );
};

export const useCourseFinder = () => {
  const context = useContext(CourseFinderContext);
  if (!context) {
    throw new Error('useCourseFinder must be used within a CourseFinderProvider');
  }
  return context;
};
