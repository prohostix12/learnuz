import React from 'react';
import { Award, Wrench, BarChart3, Smartphone, CheckCircle, Sparkles } from 'lucide-react';

export default function Features() {
  const featureList = [
    {
      id: 1,
      icon: Award,
      title: 'Guided by Specialists',
      description: 'Our university professors and industry specialists guide learners with practical knowledge, research, and 1-on-1 mentorship.',
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      id: 2,
      icon: Wrench,
      title: 'Interactive Tools',
      description: 'Engage with hands-on virtual labs, interactive simulations, and real-world projects that make learning effective.',
      color: 'text-indigo-600',
      bg: 'bg-indigo-50'
    },
    {
      id: 3,
      icon: BarChart3,
      title: 'Progress Tracking',
      description: 'Track your university credits, course milestones, and skill achievements with real-time analytics and personal feedback.',
      color: 'text-purple-600',
      bg: 'bg-purple-50'
    },
    {
      id: 4,
      icon: Smartphone,
      title: 'Mobile-Friendly',
      description: 'Enjoy a seamless, responsive learning experience across desktop, tablet, and mobile devices anytime, anywhere.',
      color: 'text-emerald-600',
      bg: 'bg-emerald-50'
    }
  ];

  return (
    <section id="about" className="py-16 sm:py-24 bg-white relative overflow-hidden">
      
      {/* Background Decorative Circles */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl -translate-y-1/2 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 font-bold text-xs uppercase tracking-wider mb-4 border border-blue-100">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Smarter Education</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#091535] leading-tight">
              SHAPING THE FUTURE OF LEARNING WITH LEARNUZ
            </h2>
          </div>
          <div className="lg:col-span-6">
            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
              At Learnuz, We Combine University Innovation, Technology, And Personalized Pathways 
              To Create A Smarter Learning Experience — Empowering Learners To Achieve More, Faster, 
              And With Greater Real-World Impact.
            </p>
          </div>
        </div>

        {/* Content Layout: Student Portrait + Feature Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Student Image Card */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-gradient-to-b from-blue-50 to-indigo-50 border border-blue-100 p-6 sm:p-8 rounded-3xl relative overflow-hidden group shadow-lg">
            <div className="relative z-10 mb-6">
              <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Learnuz Experience
              </span>
              <h3 className="text-2xl font-extrabold text-slate-900 mt-4">
                World-Class University Standard
              </h3>
              <p className="text-sm text-slate-600 mt-2">
                Empowering over 100,000 students across 45+ countries with accredited university credentials.
              </p>
            </div>

            {/* Student Visual */}
            <div className="relative z-10 mt-auto flex justify-center">
              <img
                src="/feature-student.png"
                alt="University Student"
                className="w-full max-w-xs h-auto object-contain rounded-2xl drop-shadow-lg group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Subtle Gradient Accent */}
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-blue-400/20 rounded-full blur-2xl"></div>
          </div>

          {/* Right Column: 2x2 Feature Cards Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {featureList.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.id}
                  className="glass-panel p-6 rounded-3xl border border-slate-100 hover:border-blue-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className={`w-12 h-12 rounded-2xl ${feature.bg} ${feature.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h4 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-blue-600">
                    <CheckCircle className="w-4 h-4 text-blue-500" />
                    <span>Included in all programs</span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
