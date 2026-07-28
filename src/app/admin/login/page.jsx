"use client";

export const dynamic = 'force-dynamic';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import LearnuzLogo from '../../../components/LearnuzLogo';
import { KeyRound, User, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export default function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    // Mock authentication
    setTimeout(() => {
      if (username === 'admin' && password === 'admin123') {
        localStorage.setItem('learnuz_admin_logged_in', 'true');
        router.push('/admin');
      } else {
        setErrorMsg('Invalid username or password.');
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-between relative overflow-hidden font-sans">
      
      {/* Background blobs */}
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-blue-500/10 blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-purple-500/10 blur-[150px] pointer-events-none"></div>

      {/* Header / Brand */}
      <header className="p-6 max-w-7xl mx-auto w-full flex items-center justify-between z-10">
        <div className="brightness-200 cursor-pointer" onClick={() => router.push('/')}>
          <LearnuzLogo size="medium" />
        </div>
        <button 
          onClick={() => router.push('/')} 
          className="text-xs font-bold text-slate-400 hover:text-white transition-colors bg-white/5 border border-white/10 px-4 py-2 rounded-xl"
        >
          Back to Portal
        </button>
      </header>

      {/* Main Login Card Wrapper */}
      <main className="flex-grow flex items-center justify-center p-4 z-10">
        <div className="w-full max-w-md bg-white/5 backdrop-blur-xl rounded-[2rem] border border-white/10 p-8 sm:p-10 shadow-2xl flex flex-col space-y-6">
          
          {/* Header text */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Access Gate</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">Welcome Back</h2>
            <p className="text-slate-400 text-xs sm:text-sm">Verify authorization parameters to access management dashboard.</p>
          </div>

          {errorMsg && (
            <div className="p-4 rounded-2xl bg-rose-500/10 text-rose-400 text-xs font-semibold border border-rose-500/20 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            
            {/* Username */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Username</label>
              <div className="relative">
                <User className="w-4.5 h-4.5 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="admin"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Password</label>
              <div className="relative">
                <KeyRound className="w-4.5 h-4.5 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"></span>
                ) : (
                  <>
                    <span>Authenticate</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

          </form>

        </div>
      </main>

      {/* Footer */}
      <footer className="p-6 text-center text-xs text-slate-600 z-10 border-t border-white/5 bg-slate-950/40">
        © {new Date().getFullYear()} Learnuz Inc. Secured Administrative Portal. Unauthorized access is prohibited.
      </footer>

    </div>
  );
}
