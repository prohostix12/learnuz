import { Question } from './types';

export const questions: Question[] = [
  {
    id: "working",
    title: "Are you currently working?",
    options: [
      { text: "Yes (Full-time)", icon: "Briefcase" },
      { text: "Yes (Part-time)", icon: "Clock" },
      { text: "No", icon: "Home" }
    ]
  },
  {
    id: "qualification",
    title: "What is your current qualification?",
    options: [
      { text: "10th", icon: "BookOpen" },
      { text: "12th", icon: "BookOpen" },
      { text: "Diploma", icon: "FileText" },
      { text: "Undergraduate", icon: "GraduationCap" },
      { text: "Graduate", icon: "GraduationCap" },
      { text: "Postgraduate", icon: "Award" }
    ]
  },
  {
    id: "goal",
    title: "What is your career goal?",
    options: [
      { text: "Study Abroad", icon: "Globe" },
      { text: "Get a Job", icon: "Briefcase" },
      { text: "Career Change", icon: "RefreshCw" },
      { text: "Higher Studies", icon: "GraduationCap" },
      { text: "Skill Development", icon: "Zap" }
    ]
  },
  {
    id: "field",
    title: "Which field interests you?",
    options: [
      { text: "Technology", icon: "Laptop" },
      { text: "Business", icon: "TrendingUp" },
      { text: "Healthcare", icon: "HeartPulse" },
      { text: "Design", icon: "Palette" },
      { text: "Arts", icon: "Paintbrush" },
      { text: "Engineering", icon: "Settings" }
    ]
  }
];
