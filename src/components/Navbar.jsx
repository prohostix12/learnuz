"use client";

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import LearnuzLogo from './LearnuzLogo';
import { ArrowUpRight, Menu, X, LayoutDashboard, LogOut, GraduationCap } from 'lucide-react';

export default function Navbar({ onOpenRegister, onOpenCourseFinder }) {
  const pathname = usePathname();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  const isAdminDashboard = pathname === '/admin';

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsAdminLoggedIn(localStorage.getItem('learnuz_admin_logged_in') === 'true');
    }
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem('learnuz_admin_logged_in');
    setIsAdminLoggedIn(false);
    router.push('/admin/login');
  };

  const navItems = [
    { name: 'Home', href: '/#home' },
    { name: 'Programs', href: '/programs' },
    { name: 'Universities', href: '/universities' },
    { name: 'About', href: '/about' },
    { name: 'Contacts', href: '/contact' }
  ];

  useEffect(() => {
    if (pathname === '/programs') {
      setActiveTab('Programs');
    } else if (pathname === '/universities') {
      setActiveTab('Universities');
    } else if (pathname === '/contact') {
      setActiveTab('Contacts');
    } else if (pathname === '/about') {
      setActiveTab('About');
    } else if (pathname === '/admin') {
      setActiveTab('Admin');
    } else {
      setActiveTab('Home');
    }
  }, [pathname]);

  const handleNavClick = (e, item) => {
    e.preventDefault();
    setActiveTab(item.name);
    setMobileMenuOpen(false);

    if (item.name === 'Programs') {
      if (pathname === '/programs') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        router.push('/programs');
      }
      return;
    }

    if (item.name === 'Universities') {
      if (pathname === '/universities') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        router.push('/universities');
      }
      return;
    }

    if (item.name === 'About') {
      if (pathname === '/about') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        router.push('/about');
      }
      return;
    }

    if (item.name === 'Contacts') {
      if (pathname === '/contact') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        router.push('/contact');
      }
      return;
    }

    if (item.name === 'Admin') {
      if (pathname === '/admin') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        router.push('/admin');
      }
      return;
    }

    if (pathname === '/programs' || pathname === '/universities' || pathname === '/contact' || pathname === '/admin' || pathname === '/about') {
      router.push(item.href);
    } else {
      const targetId = item.href.replace(/^\//, ''); // e.g. '#home', '#about'
      const element = document.querySelector(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        router.push(item.href);
      }
    }
  };

  return (
    <header className="w-full pt-4 pb-2 px-4 sm:px-6 lg:px-8 z-30 relative">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-2">
        
        {/* Brand Logo */}
        <div
          onClick={() => {
            if (pathname === '/') {
              const element = document.querySelector('#home');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            } else {
              router.push('/');
            }
          }}
          className="flex items-center"
        >
          <LearnuzLogo size="medium" />
        </div>

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

        {/* Right Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {isAdminLoggedIn && !isAdminDashboard && (
            <a
              href="/admin"
              className="flex items-center gap-1.5 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100/80 border border-blue-200/50 px-4 py-2 rounded-full transition-all duration-300 shadow-sm"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Admin Panel</span>
            </a>
          )}

          {isAdminDashboard ? (
            <button
              onClick={handleLogout}
              className="group flex items-center gap-2 glass-pill-nav text-rose-950 font-bold pl-6 pr-2 py-2 rounded-full hover:bg-white/40 transition-all duration-300 shadow-sm border border-rose-200"
            >
              <span>Logout</span>
              <div className="w-8 h-8 rounded-full bg-rose-600 flex items-center justify-center text-white group-hover:scale-105 transition-all duration-300 shadow-md">
                <LogOut className="w-4 h-4" />
              </div>
            </button>
          ) : (
            <>
              <button
                onClick={onOpenCourseFinder}
                className="group flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 hover:from-blue-700 hover:to-purple-700 hover:border hover:border-2 hover:border-black text-white font-bold text-sm shadow-md shadow-indigo-500/10 hover:shadow-indigo-500/25 transition-all duration-300 active:scale-95 cursor-pointer shrink-0"
              >
                <span>Find Your Course</span>
                <GraduationCap className="w-4 h-4 text-white" />
              </button>

              <button
                onClick={onOpenRegister}
                className="group flex items-center gap-2 glass-pill-nav text-blue-900 font-semibold pl-6 pr-2 py-2 rounded-full hover:bg-white/40 transition-all duration-300 shadow-sm"
              >
                <span>Register Now</span>
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white group-hover:scale-105 group-hover:rotate-45 transition-all duration-300 shadow-md">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </button>
            </>
          )}
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
            {isAdminLoggedIn && !isAdminDashboard && (
              <a
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 bg-blue-50 text-blue-700 font-bold py-3 rounded-xl border border-blue-200 mb-2"
              >
                <LayoutDashboard className="w-4.5 h-4.5" />
                <span>Admin Panel</span>
              </a>
            )}

            {isAdminDashboard ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogout();
                }}
                className="w-full flex items-center justify-center gap-2 bg-rose-600 text-white font-semibold py-3 rounded-xl shadow-md"
              >
                <span>Logout</span>
                <LogOut className="w-4.5 h-4.5" />
              </button>
            ) : (
              <>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenCourseFinder();
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-3 rounded-xl shadow-md cursor-pointer mb-2"
                >
                  <GraduationCap className="w-4.5 h-4.5" />
                  <span>Find Your Course</span>
                </button>
                
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenRegister();
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3 rounded-xl border border-slate-200 shadow-sm"
                >
                  <span>Register Now</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
