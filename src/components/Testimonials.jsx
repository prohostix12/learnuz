import React from 'react';
import { ArrowUpRight, MessageSquare, Quote, Star, CheckCircle } from 'lucide-react';

export default function Testimonials({ onOpenRegister }) {
  const testimonials = [
    {
      id: 1,
      name: 'Alexander Wright',
      role: 'Computer Science Graduate',
      university: 'Oxford Partner Program',
      quote: 'Learnuz allowed me to complete accredited university modules while working full-time. The professors and labs were world-class!',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      rating: 5
    },
    {
      id: 2,
      name: 'Sophia Martinez',
      role: 'Data Science Specialist',
      university: 'Stanford Online',
      quote: 'The interactive tools and mentorship gave me the practical edge needed to land a top tech role right after graduation.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      rating: 5
    },
    {
      id: 3,
      name: 'Marcus Chen',
      role: 'AI Systems Architect',
      university: 'MIT Extension',
      quote: 'Seamless mobile access and structured credit tracking made my learning journey clear, engaging, and highly rewarding.',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
      rating: 5
    }
  ];

  const photoGrid = [
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=400&q=80'
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      
      {/* Background Soft Glow */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-blue-100/60 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Header Badge & Text */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 font-bold text-xs uppercase tracking-wider mb-4 border border-blue-100">
            <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
            <span>Testimonial</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-extrabold text-[#091535] tracking-tight">
            100k+ HAPPY LEARNERS!
          </h2>

          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed mt-4">
            Over 100K Learners Worldwide Trust Learnuz To Achieve Their Goals. Join A Growing Community Where Education Meets Innovation, And Success Becomes A Shared Journey.
          </p>

          <div className="mt-8 flex justify-center">
            <button
              onClick={onOpenRegister}
              className="group flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold px-8 py-3.5 rounded-full shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105 transition-all duration-300"
            >
              <span>Read Success Stories</span>
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:rotate-45 transition-transform">
                <ArrowUpRight className="w-4 h-4 text-white" />
              </div>
            </button>
          </div>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="glass-panel p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Rating & Quote Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-blue-200" />
                </div>

                <p className="text-slate-600 text-sm italic leading-relaxed mb-6">
                  "{item.quote}"
                </p>
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-blue-500 shadow-sm"
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{item.name}</h4>
                  <div className="text-xs text-blue-600 font-semibold">{item.university}</div>
                  <div className="text-[11px] text-slate-500">{item.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Happy Student Photo Mosaic */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          {photoGrid.map((url, index) => (
            <div
              key={index}
              className="h-44 rounded-2xl overflow-hidden group shadow-md relative"
            >
              <img
                src={url}
                alt="Happy Student"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                <div className="text-white text-xs font-bold flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5 text-blue-400" />
                  <span>Verified Alumni</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
