import React, { useState, useEffect } from 'react';
import { ArrowUpRight, MessageSquare, Quote, Star } from 'lucide-react';

const staticTestimonials = [
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

export default function Testimonials({ onOpenRegister }) {
  const [testimonials, setTestimonials] = useState(staticTestimonials);
  const containerRef = React.useRef(null);

  useEffect(() => {
    async function loadTestimonials() {
      try {
        const res = await fetch('/api/testimonials');
        if (res.ok) {
          const data = await res.json();
          // Limit to first 6 testimonials for display neatness
          setTestimonials(data.slice(0, 6));
        }
      } catch (err) {
        console.error("Error loading testimonials:", err);
      }
    }
    loadTestimonials();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || testimonials.length <= 1) return;

    let intervalId;

    const startAutoScroll = () => {
      intervalId = setInterval(() => {
        const cardWidth = 380 + 24; // Card width (380px) + gap (24px)
        container.scrollTo({ left: container.scrollLeft + cardWidth, behavior: 'smooth' });
      }, 4000);
    };

    startAutoScroll();

    // Scroll listener for seamless looping
    const handleScroll = () => {
      const cardWidth = 380 + 24;
      const resetThreshold = testimonials.length * cardWidth;
      
      // Once we scroll to the duplicate first card, silently reset scroll position to the original first card.
      if (container.scrollLeft >= resetThreshold) {
        container.scrollLeft = container.scrollLeft - resetThreshold;
      }
    };

    const handleMouseEnter = () => clearInterval(intervalId);
    const handleMouseLeave = () => startAutoScroll();

    container.addEventListener('scroll', handleScroll);
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('touchstart', handleMouseEnter);
    container.addEventListener('touchend', handleMouseLeave);

    return () => {
      clearInterval(intervalId);
      if (container) {
        container.removeEventListener('scroll', handleScroll);
        container.removeEventListener('mouseenter', handleMouseEnter);
        container.removeEventListener('mouseleave', handleMouseLeave);
        container.removeEventListener('touchstart', handleMouseEnter);
        container.removeEventListener('touchend', handleMouseLeave);
      }
    };
  }, [testimonials]);

  return (
    <section className="py-20 bg-white/30 backdrop-blur-md relative overflow-hidden">
      
      {/* Background Soft Glow */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-blue-100/60 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <style>{`
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
        
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

          {/* 
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
          */}
        </div>

        {/* Testimonials Cards Row */}
        <div 
          ref={containerRef}
          className="flex flex-row overflow-x-auto gap-6 mb-16 pb-6 snap-x snap-mandatory no-scrollbar" 
          data-lenis-prevent
        >
          {[...testimonials, ...testimonials].map((item, idx) => (
            <div
              key={`${item._id || item.id}-${idx}`}
              className="w-[85vw] sm:w-[380px] shrink-0 snap-center glass-panel p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Rating & Quote Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(item.rating || 5)].map((_, i) => (
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
                  src={item.avatar || item.image || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'}
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


      </div>
    </section>
  );
}
