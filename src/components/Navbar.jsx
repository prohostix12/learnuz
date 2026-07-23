import React, { useState } from 'react';
import LearnuzLogo from './LearnuzLogo';
import { ArrowUpRight, Menu, X } from 'lucide-react';

export default function Navbar({ onOpenRegister }) {
  const [activeTab, setActiveTab] = useState('Home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Programs', href: '#courses' },
    { name: 'Universities', href: '#universities' },
    { name: 'About', href: '#about' },
    { name: 'Contacts', href: '#footer' }
  ];

  const handleNavClick = (e, item) => {
    e.preventDefault();
    setActiveTab(item.name);
    setMobileMenuOpen(false);
    const element = document.querySelector(item.href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="w-full pt-4 pb-2 px-4 sm:px-6 lg:px-8 z-30 relative">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-2">
        
        {/* Brand Logo */}
        <a href="#home" className="flex items-center">
          <LearnuzLogo size="medium" />
        </a>

        {/* Center Pill Capsule Navigation Bar (Desktop) */}
        <nav className="hidden md:flex items-center glass-pill-nav rounded-full px-2 py-1.5 shadow-sm">
          {navItems.map((item) => {
            const isActive = activeTab === item.name;
            return (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? 'glass-pill-active font-semibold shadow-md'
                    : 'text-slate-800 hover:text-blue-700 hover:bg-white/30'
                }`}
              >
                {item.name}
              </a>
            );
          })}
        </nav>

        {/* Right Register Now Button */}
        <div className="hidden md:flex items-center">
          <button
            onClick={onOpenRegister}
            className="group flex items-center gap-2 glass-pill-nav text-blue-900 font-semibold pl-6 pr-2 py-2 rounded-full hover:bg-white/40 transition-all duration-300 shadow-sm"
          >
            <span>Register Now</span>
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white group-hover:scale-105 group-hover:rotate-45 transition-all duration-300 shadow-md">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl text-slate-800 bg-white/40 border border-white/60 backdrop-blur-md"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden max-w-7xl mx-auto mt-2 bg-white/90 backdrop-blur-xl border border-white rounded-2xl p-6 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-3">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item)}
                className={`px-4 py-3 rounded-xl font-semibold text-base transition-colors ${
                  activeTab === item.name
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-700 hover:bg-blue-50'
                }`}
              >
                {item.name}
              </a>
            ))}
            <hr className="my-2 border-slate-200" />
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRegister();
              }}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white font-semibold py-3 rounded-xl shadow-md"
            >
              <span>Register Now</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
