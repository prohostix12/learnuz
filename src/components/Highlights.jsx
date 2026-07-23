import React from 'react';
import { Compass, BookOpen, Users, ArrowRight } from 'lucide-react';

export default function Highlights() {
  const highlights = [
    {
      id: 1,
      icon: Compass,
      title: '50+ Universities',
      description: 'Gain practical knowledge through curated university courses that lead to real-world career impact.',
      gradient: 'from-blue-500/10 to-indigo-500/10',
      iconBg: 'bg-blue-600 text-white',
      badge: 'Accredited'
    },
    {
      id: 2,
      icon: BookOpen,
      title: 'Empowered Learning',
      description: 'Personalized, interactive, and self-paced growth tailored to fit your schedule and university degree timeline.',
      gradient: 'from-indigo-500/10 to-purple-500/10',
      iconBg: 'bg-indigo-600 text-white',
      badge: 'Flexible'
    },
    {
      id: 3,
      icon: Users,
      title: 'Thriving Community',
      description: 'A global space where university learners, alumni, and professors support, motivate, and excel together.',
      gradient: 'from-purple-500/10 to-blue-500/10',
      iconBg: 'bg-purple-600 text-white',
      badge: 'Global Network'
    }
  ];

  return (
    <section className="py-10 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {highlights.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="group relative glass-card-blue p-8 rounded-3xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-blue-500/15 border border-blue-200/80 overflow-hidden"
              >
                {/* Subtle Card Glow */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${item.gradient} rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500`}></div>

                {/* Top Icon Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-14 h-14 rounded-2xl ${item.iconBg} flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-100/80 text-blue-700 border border-blue-200">
                    {item.badge}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  {item.description}
                </p>

                {/* Bottom Arrow indicator */}
                <div className="mt-6 flex items-center text-xs font-bold text-blue-600 opacity-0 group-hover:opacity-100 transition-all duration-300 gap-1 transform translate-x-[-10px] group-hover:translate-x-0">
                  <span>Explore Pathways</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
