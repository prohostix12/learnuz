export interface Option {
  text: string;
  icon: string; // The Lucide icon name mapping
}

export interface Question {
  id: 'working' | 'qualification' | 'goal' | 'field';
  title: string;
  options: Option[];
}

export interface WizardState {
  working: string;
  qualification: string;
  goal: string;
  field: string;
  fullName: string;
  email: string;
  phone: string;
}
