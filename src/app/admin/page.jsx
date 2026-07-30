"use client";

export const dynamic = 'force-dynamic';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import UniversityLogo from '../../components/UniversityLogo';
import { 
  Building2, 
  BookOpen, 
  MessageSquare, 
  GraduationCap, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  Eye, 
  X, 
  Award, 
  Calendar, 
  Search, 
  TrendingUp, 
  Mail, 
  Phone, 
  User, 
  FileText,
  HelpCircle,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

const safeNumber = (val) => {
  if (val === undefined || val === null || isNaN(val) || val === '') return '';
  return val;
};

const parseNum = (val) => {
  const p = parseInt(val, 10);
  return isNaN(p) ? '' : p;
};

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecking, setAuthChecking] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [universities, setUniversities] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  
  // Loading states
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  
  // Search & Filter
  const [uniSearch, setUniSearch] = useState('');
  const [progSearch, setProgSearch] = useState('');
  
  // Modals state
  const [uniModalOpen, setUniModalOpen] = useState(false);
  const [progModalOpen, setProgModalOpen] = useState(false);
  const [viewContactModal, setViewContactModal] = useState(null);
  
  // Edit mode targets
  const [editUniTarget, setEditUniTarget] = useState(null);
  const [editProgTarget, setEditProgTarget] = useState(null);

  // Forms state
  const [uniForm, setUniForm] = useState({
    name: '',
    shortName: '',
    location: '',
    established: 2000,
    naacGrade: 'NAAC A+',
    nirfRank: 'N/A',
    programsCount: 0,
    studentsCount: '10K+',
    feeRange: '₹40K - ₹1.5L',
    minFee: 40000,
    maxFee: 150000,
    type: 'Private',
    featured: false,
    coverImage: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=800&auto=format&fit=crop',
    logo: '',
    description: ''
  });

  const [progForm, setProgForm] = useState({
    code: '',
    level: 'Undergraduate',
    title: '',
    university: '',
    accreditation: 'NAAC A+',
    duration: '3 Years',
    semesters: '6 Semesters',
    fee: '₹25,000',
    emi: '₹4,166/mo',
    featured: false,
    category: 'Computer Science',
    syllabus: '',
    careers: '',
    description: ''
  });

  // Fetch all dashboard data
  const fetchData = async () => {
    try {
      setLoading(true);
      const [uniRes, progRes, contactRes, regRes] = await Promise.all([
        fetch('/api/universities'),
        fetch('/api/programs'),
        fetch('/api/contacts'),
        fetch('/api/registrations')
      ]);

      if (uniRes.ok) setUniversities(await uniRes.json());
      if (progRes.ok) setPrograms(await progRes.json());
      if (contactRes.ok) setContacts(await contactRes.json());
      if (regRes.ok) setRegistrations(await regRes.json());
    } catch (err) {
      console.error("Error loading dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('learnuz_admin_logged_in') === 'true';
    if (!isLoggedIn) {
      router.push('/admin/login');
    } else {
      setIsAuthenticated(true);
      setAuthChecking(false);
      fetchData();
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('learnuz_admin_logged_in');
    router.push('/admin/login');
  };

  // Set default university for program form when universities load
  useEffect(() => {
    if (universities.length > 0 && !progForm.university) {
      setProgForm(prev => ({ ...prev, university: universities[0].name }));
    }
  }, [universities]);

  // Handle University Form Submission
  const handleUniSubmit = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      const isEdit = !!editUniTarget;
      const url = isEdit 
        ? `/api/universities/${editUniTarget}` 
        : '/api/universities';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(uniForm)
      });

      if (res.ok) {
        setUniModalOpen(false);
        setEditUniTarget(null);
        resetUniForm();
        fetchData();
      } else {
        const err = await res.json();
        alert(err.error || "Failed to save university");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred");
    } finally {
      setActionLoading(false);
    }
  };

  // Handle Program Form Submission
  const handleProgSubmit = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      const isEdit = !!editProgTarget;
      const url = isEdit 
        ? `/api/programs/${editProgTarget}` 
        : '/api/programs';
      const method = isEdit ? 'PUT' : 'POST';

      // Parse syllabus and careers comma-separated values to array
      const syllabusArray = typeof progForm.syllabus === 'string'
        ? progForm.syllabus.split(',').map(s => s.trim()).filter(Boolean)
        : progForm.syllabus;

      const careersArray = typeof progForm.careers === 'string'
        ? progForm.careers.split(',').map(c => c.trim()).filter(Boolean)
        : progForm.careers;

      const payload = {
        ...progForm,
        syllabus: syllabusArray,
        careers: careersArray
      };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setProgModalOpen(false);
        setEditProgTarget(null);
        resetProgForm();
        fetchData();
      } else {
        const err = await res.json();
        alert(err.error || "Failed to save program");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred");
    } finally {
      setActionLoading(false);
    }
  };

  // Delete University
  const handleUniDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this university? All linked programs will remain but lose their link.")) return;
    try {
      const res = await fetch(`/api/universities/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchData();
      } else {
        alert("Failed to delete university");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Delete Program
  const handleProgDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this program?")) return;
    try {
      const res = await fetch(`/api/programs/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchData();
      } else {
        alert("Failed to delete program");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Update Contact Status (mark as read)
  const handleContactStatusUpdate = async (id, currentStatus) => {
    const newStatus = currentStatus === 'new' ? 'read' : 'new';
    try {
      const res = await fetch(`/api/contacts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        fetchData();
        if (viewContactModal && viewContactModal._id === id) {
          setViewContactModal(prev => ({ ...prev, status: newStatus }));
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Delete Contact Entry
  const handleContactDelete = async (id) => {
    if (!confirm("Delete this inquiry?")) return;
    try {
      const res = await fetch(`/api/contacts/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setViewContactModal(null);
        fetchData();
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Open Edit University Modal
  const openEditUni = (uni) => {
    setEditUniTarget(uni.id);
    setUniForm({
      name: uni.name,
      shortName: uni.shortName,
      location: uni.location,
      established: uni.established,
      naacGrade: uni.naacGrade,
      nirfRank: uni.nirfRank || 'N/A',
      programsCount: uni.programsCount,
      studentsCount: uni.studentsCount,
      feeRange: uni.feeRange,
      minFee: uni.minFee,
      maxFee: uni.maxFee,
      type: uni.type,
      featured: uni.featured,
      coverImage: uni.coverImage,
      logo: uni.logo || '',
      description: uni.description || ''
    });
    setUniModalOpen(true);
  };

  // Open Edit Program Modal
  const openEditProg = (prog) => {
    setEditProgTarget(prog._id);
    setProgForm({
      code: prog.code,
      level: prog.level,
      title: prog.title,
      university: prog.university,
      accreditation: prog.accreditation,
      duration: prog.duration,
      semesters: prog.semesters,
      fee: prog.fee,
      emi: prog.emi || 'N/A',
      featured: prog.featured,
      category: prog.category,
      syllabus: prog.syllabus ? prog.syllabus.join(', ') : '',
      careers: prog.careers ? prog.careers.join(', ') : '',
      description: prog.description || ''
    });
    setProgModalOpen(true);
  };

  const resetUniForm = () => {
    setUniForm({
      name: '',
      shortName: '',
      location: '',
      established: 2000,
      naacGrade: 'NAAC A+',
      nirfRank: 'N/A',
      programsCount: 0,
      studentsCount: '10K+',
      feeRange: '₹40K - ₹1.5L',
      minFee: 40000,
      maxFee: 150000,
      type: 'Private',
      featured: false,
      coverImage: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=800&auto=format&fit=crop',
      logo: '',
      description: ''
    });
  };

  const resetProgForm = () => {
    setProgForm({
      code: '',
      level: 'Undergraduate',
      title: '',
      university: universities[0]?.name || '',
      accreditation: 'NAAC A+',
      duration: '3 Years',
      semesters: '6 Semesters',
      fee: '₹25,000',
      emi: '₹4,166/mo',
      featured: false,
      category: 'Computer Science',
      syllabus: '',
      careers: '',
      description: ''
    });
  };

  // Filter lists
  const filteredUnis = universities.filter(uni => 
    uni.name.toLowerCase().includes(uniSearch.toLowerCase()) ||
    uni.shortName.toLowerCase().includes(uniSearch.toLowerCase()) ||
    uni.location.toLowerCase().includes(uniSearch.toLowerCase())
  );

  const filteredProgs = programs.filter(prog => 
    prog.title.toLowerCase().includes(progSearch.toLowerCase()) ||
    prog.university.toLowerCase().includes(progSearch.toLowerCase()) ||
    prog.code.toLowerCase().includes(progSearch.toLowerCase())
  );

  const newContactsCount = contacts.filter(c => c.status === 'new').length;
  
  if (authChecking || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-slate-100 font-sans">
        <div className="w-8 h-8 rounded-full border-4 border-slate-700 border-t-blue-500 animate-spin mb-4"></div>
        <p className="text-sm font-semibold text-slate-400">Verifying administrator credentials...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-[#0f172a] flex flex-col font-sans">
      
      {/* Top Header */}
      <Navbar onOpenRegister={() => {}} />

      {/* Main Admin Section */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Title Block */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Administrator Portal</span>
            </div>
            <h1 className="text-3xl font-black text-slate-900 mt-1">Management Dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={fetchData} 
              className="px-5 py-2.5 rounded-xl border border-slate-200 hover:border-blue-500 hover:text-blue-600 text-slate-600 text-xs font-bold bg-white transition-all shadow-sm"
            >
              Refresh Database
            </button>
            <button 
              onClick={handleLogout} 
              className="px-5 py-2.5 rounded-xl border border-rose-250 hover:border-rose-500 hover:text-rose-600 text-rose-600 text-xs font-bold bg-white transition-all shadow-sm"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Statistics Widgets Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          
          <div className="bg-white p-5 rounded-3xl border border-slate-200/50 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Universities</span>
              <span className="text-2xl font-black text-slate-800 leading-tight">{universities.length}</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-200/50 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Active Programs</span>
              <span className="text-2xl font-black text-slate-800 leading-tight">{programs.length}</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-200/50 shadow-sm flex items-center gap-4 relative overflow-hidden">
            <div className="w-12 h-12 rounded-2xl bg-pink-50 text-pink-600 flex items-center justify-center">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Inquiries</span>
              <span className="text-2xl font-black text-slate-800 leading-tight">
                {contacts.length}
                {newContactsCount > 0 && (
                  <span className="ml-2 text-xs bg-pink-500 text-white font-extrabold px-2 py-0.5 rounded-full">
                    {newContactsCount} new
                  </span>
                )}
              </span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-200/50 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Applications</span>
              <span className="text-2xl font-black text-slate-800 leading-tight">{registrations.length}</span>
            </div>
          </div>

        </div>

        {/* Tab switcher navigation */}
        <div className="flex border-b border-slate-200 mb-8 bg-white p-1.5 rounded-2xl shadow-sm border">
          {['overview', 'universities', 'programs', 'leads'].map((tab) => {
            const labelMap = {
              overview: 'Overview',
              universities: 'Universities',
              programs: 'Programs',
              leads: 'Leads & Inquiries'
            };
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-grow md:flex-initial text-center px-6 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 ${
                  isActive 
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                }`}
              >
                {labelMap[tab]}
              </button>
            );
          })}
        </div>

        {/* Database loading indicator */}
        {loading ? (
          <div className="text-center py-20 bg-white border border-slate-200/60 rounded-3xl shadow-sm">
            <div className="w-8 h-8 rounded-full border-4 border-slate-200 border-t-blue-600 animate-spin mx-auto mb-4"></div>
            <p className="text-sm font-semibold text-slate-500">Connecting to MongoDB & seeding database...</p>
          </div>
        ) : (
          <div className="space-y-6">
            
            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Recent Inquiries List */}
                <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/60 shadow-sm p-6 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <h3 className="font-extrabold text-lg text-slate-900 flex items-center gap-2">
                      <Mail className="w-5 h-5 text-indigo-500" />
                      <span>Recent Contact Inquiries</span>
                    </h3>
                    <span className="text-[11px] font-bold px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-full border border-indigo-100">
                      Sync Status: OK
                    </span>
                  </div>

                  {contacts.length === 0 ? (
                    <div className="text-center py-10">
                      <p className="text-sm text-slate-400">No contact requests received yet.</p>
                    </div>
                  ) : (
                    <div className="divide-y divide-slate-100 overflow-y-auto max-h-[450px] pr-1 space-y-3">
                      {contacts.slice(0, 5).map((contact) => (
                        <div key={contact._id} className="pt-3 first:pt-0 flex items-start justify-between gap-3 group">
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-slate-800 text-sm">{contact.fullName}</span>
                              <span className="text-[10px] text-slate-400 font-medium">
                                {new Date(contact.createdAt).toLocaleDateString()}
                              </span>
                              {contact.status === 'new' && (
                                <span className="h-1.5 w-1.5 rounded-full bg-pink-500 animate-ping"></span>
                              )}
                            </div>
                            <p className="text-xs font-semibold text-indigo-600 mt-0.5">{contact.interestCategory} - {contact.subject}</p>
                            <p className="text-xs text-slate-500 mt-1 truncate max-w-lg italic">"{contact.message}"</p>
                          </div>
                          
                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              onClick={() => setViewContactModal(contact)}
                              className="p-1.5 rounded-lg border border-slate-100 hover:border-blue-200 text-slate-500 hover:text-blue-600 bg-slate-50 hover:bg-white transition-all"
                              title="View message"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleContactStatusUpdate(contact._id, contact.status)}
                              className={`p-1.5 rounded-lg border transition-all ${
                                contact.status === 'read'
                                  ? 'border-green-100 bg-green-50 text-green-600'
                                  : 'border-slate-100 bg-slate-50 text-slate-400 hover:text-slate-700'
                              }`}
                              title={contact.status === 'read' ? "Mark unread" : "Mark read"}
                            >
                              <Check className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {contacts.length > 5 && (
                    <button 
                      onClick={() => setActiveTab('leads')}
                      className="w-full text-center text-xs font-extrabold text-blue-600 hover:text-blue-800 pt-3 border-t border-slate-100 flex items-center justify-center gap-1.5"
                    >
                      <span>View all inquiries ({contacts.length})</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Latest Admission Applications */}
                <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/60 shadow-sm p-6 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <h3 className="font-extrabold text-lg text-slate-900 flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-emerald-500" />
                      <span>Registration Applications</span>
                    </h3>
                  </div>

                  {registrations.length === 0 ? (
                    <div className="text-center py-10">
                      <p className="text-sm text-slate-400">No applications received yet.</p>
                    </div>
                  ) : (
                    <div className="divide-y divide-slate-100 overflow-y-auto max-h-[450px] pr-1 space-y-3">
                      {registrations.slice(0, 5).map((reg) => (
                        <div key={reg._id} className="pt-3 first:pt-0">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-800 text-sm">{reg.fullName}</span>
                            <span className="text-[10px] text-slate-400 font-semibold">{new Date(reg.createdAt).toLocaleDateString()}</span>
                          </div>
                          <p className="text-[11px] font-bold text-slate-500 mt-0.5">{reg.degreeLevel} in {reg.program}</p>
                          <div className="flex items-center gap-3 text-[10px] text-slate-400 mt-1 font-semibold">
                            <span>Phone: {reg.phone || 'N/A'}</span>
                            <span>•</span>
                            <span className="truncate max-w-[150px]" title={reg.email}>{reg.email}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {registrations.length > 5 && (
                    <button 
                      onClick={() => setActiveTab('leads')}
                      className="w-full text-center text-xs font-extrabold text-blue-600 hover:text-blue-800 pt-3 border-t border-slate-100 flex items-center justify-center gap-1.5"
                    >
                      <span>View all applications ({registrations.length})</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

              </div>
            )}

            {/* UNIVERSITIES TAB */}
            {activeTab === 'universities' && (
              <div className="bg-white rounded-3xl border border-slate-200/60 shadow-sm p-6 space-y-6">
                
                {/* Actions & Search */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  <div className="relative w-full sm:max-w-xs">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input 
                      type="text"
                      placeholder="Search universities..."
                      value={uniSearch}
                      onChange={(e) => setUniSearch(e.target.value)}
                      className="w-full text-xs pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <button
                    onClick={() => {
                      setEditUniTarget(null);
                      resetUniForm();
                      setUniModalOpen(true);
                    }}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-md shadow-slate-900/10 active:scale-95 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add University</span>
                  </button>
                </div>

                {/* Universities Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-100 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                        <th className="pb-3 pl-2">University Name</th>
                        <th className="pb-3">Location</th>
                        <th className="pb-3">Accreditation</th>
                        <th className="pb-3">Rank/Grade</th>
                        <th className="pb-3">Type</th>
                        <th className="pb-3">Est. Year</th>
                        <th className="pb-3">Programs</th>
                        <th className="pb-3 text-right pr-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm">
                      {filteredUnis.length === 0 ? (
                        <tr>
                          <td colSpan="8" className="text-center py-10 text-slate-400">No universities found.</td>
                        </tr>
                      ) : (
                        filteredUnis.map((uni) => (
                          <tr key={uni.id} className="hover:bg-slate-50/50 transition-colors">
                            <td className="py-4 pl-2 font-semibold text-slate-900 flex items-center gap-3">
                              <UniversityLogo universityName={uni.name} />
                              <div>
                                <span className="block">{uni.name}</span>
                                <span className="text-[10px] text-slate-400 font-bold">({uni.shortName})</span>
                                {uni.featured && (
                                  <span className="ml-2 inline-block px-2 py-0.5 bg-blue-50 text-blue-600 border border-blue-100 rounded text-[9px] font-extrabold uppercase">Featured</span>
                                )}
                              </div>
                            </td>
                            <td className="py-4 text-slate-600 font-semibold">{uni.location}</td>
                            <td className="py-4">
                              <span className="px-2 py-0.5 bg-amber-50 text-[#b45309] font-extrabold text-[10px] rounded-md border border-amber-100 uppercase">
                                {uni.naacGrade}
                              </span>
                            </td>
                            <td className="py-4 text-slate-500 font-semibold">{uni.nirfRank}</td>
                            <td className="py-4 text-slate-600 font-bold">{uni.type}</td>
                            <td className="py-4 text-slate-500 font-semibold">{uni.established}</td>
                            <td className="py-4 text-slate-600 font-bold">{uni.programsCount}</td>
                            <td className="py-4 text-right pr-2">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => openEditUni(uni)}
                                  className="p-2 rounded-xl text-slate-500 hover:text-blue-600 hover:bg-blue-50/50 transition-colors"
                                  title="Edit University"
                                >
                                  <Edit3 className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleUniDelete(uni.id)}
                                  className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50/50 transition-colors"
                                  title="Delete University"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

              </div>
            )}

            {/* PROGRAMS TAB */}
            {activeTab === 'programs' && (
              <div className="bg-white rounded-3xl border border-slate-200/60 shadow-sm p-6 space-y-6">
                
                {/* Actions & Search */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  <div className="relative w-full sm:max-w-xs">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input 
                      type="text"
                      placeholder="Search programs..."
                      value={progSearch}
                      onChange={(e) => setProgSearch(e.target.value)}
                      className="w-full text-xs pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <button
                    onClick={() => {
                      if (universities.length === 0) {
                        alert("You must add at least one university before adding programs.");
                        return;
                      }
                      setEditProgTarget(null);
                      resetProgForm();
                      setProgModalOpen(true);
                    }}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-md shadow-slate-900/10 active:scale-95 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Program</span>
                  </button>
                </div>

                {/* Programs Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-100 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                        <th className="pb-3 pl-2">Degree Title</th>
                        <th className="pb-3">Code / Level</th>
                        <th className="pb-3">Accredited Institution</th>
                        <th className="pb-3">Category</th>
                        <th className="pb-3">Duration</th>
                        <th className="pb-3">Fee / Semester</th>
                        <th className="pb-3">EMI Plan</th>
                        <th className="pb-3 text-right pr-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm">
                      {filteredProgs.length === 0 ? (
                        <tr>
                          <td colSpan="8" className="text-center py-10 text-slate-400">No programs found.</td>
                        </tr>
                      ) : (
                        filteredProgs.map((prog) => (
                          <tr key={prog._id} className="hover:bg-slate-50/50 transition-colors">
                            <td className="py-4 pl-2 font-bold text-slate-950">
                              <div>
                                <span>{prog.title}</span>
                                {prog.featured && (
                                  <span className="ml-2 inline-block px-2 py-0.5 bg-purple-50 text-purple-600 border border-purple-100 rounded text-[9px] font-extrabold uppercase">Featured</span>
                                )}
                              </div>
                            </td>
                            <td className="py-4">
                              <span className="inline-block px-2 py-0.5 bg-[#fcf2f2] text-[#9b1c1c] text-[10px] font-extrabold rounded-md uppercase tracking-wider">
                                {prog.code}
                              </span>
                              <span className="block text-[11px] text-slate-400 font-semibold mt-0.5">{prog.level}</span>
                            </td>
                            <td className="py-4 text-slate-700 font-bold flex items-center gap-2">
                              <UniversityLogo universityName={prog.university} />
                              <div className="min-w-0">
                                <span className="truncate block font-semibold text-xs">{prog.university}</span>
                                <span className="text-[10px] text-amber-600 font-bold block">{prog.acreditation || prog.accreditation || 'NAAC A+'}</span>
                              </div>
                            </td>
                            <td className="py-4 text-slate-500 font-semibold">{prog.category}</td>
                            <td className="py-4 text-slate-600 font-bold">{prog.duration} <span className="block text-[11px] text-slate-400 font-medium mt-0.5">{prog.semesters}</span></td>
                            <td className="py-4 text-rose-800 font-black text-xs">{prog.fee}</td>
                            <td className="py-4 text-blue-700 font-bold text-xs">{prog.emi}</td>
                            <td className="py-4 text-right pr-2">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => openEditProg(prog)}
                                  className="p-2 rounded-xl text-slate-500 hover:text-blue-600 hover:bg-blue-50/50 transition-colors"
                                  title="Edit Program"
                                >
                                  <Edit3 className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleProgDelete(prog._id)}
                                  className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50/50 transition-colors"
                                  title="Delete Program"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

              </div>
            )}

            {/* LEADS TAB */}
            {activeTab === 'leads' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Contact Submissions list */}
                <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/60 shadow-sm p-6 space-y-4">
                  <div className="pb-3 border-b border-slate-100">
                    <h3 className="font-extrabold text-lg text-slate-900 flex items-center gap-2">
                      <Mail className="w-5 h-5 text-indigo-500" />
                      <span>All Contact Form Inquiries ({contacts.length})</span>
                    </h3>
                  </div>

                  {contacts.length === 0 ? (
                    <div className="text-center py-10">
                      <p className="text-sm text-slate-400">No contact requests received.</p>
                    </div>
                  ) : (
                    <div className="divide-y divide-slate-100 space-y-3">
                      {contacts.map((contact) => (
                        <div key={contact._id} className="pt-3 first:pt-0 flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-bold text-slate-800 text-sm">{contact.fullName}</span>
                              <span className="text-[10px] text-slate-400 font-semibold">{new Date(contact.createdAt).toLocaleString()}</span>
                              {contact.status === 'new' && (
                                <span className="bg-pink-500/10 text-pink-600 border border-pink-100 text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded">New Inquiry</span>
                              )}
                            </div>
                            <p className="text-xs font-semibold text-indigo-600 mt-1">{contact.interestCategory} - {contact.subject}</p>
                            <div className="flex gap-4 text-[10px] text-slate-400 mt-1.5 font-bold">
                              <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {contact.email}</span>
                              <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {contact.phone}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              onClick={() => setViewContactModal(contact)}
                              className="p-1.5 rounded-lg border border-slate-100 hover:border-blue-200 text-slate-500 hover:text-blue-600 bg-slate-50 hover:bg-white transition-all"
                              title="View details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleContactStatusUpdate(contact._id, contact.status)}
                              className={`p-1.5 rounded-lg border transition-all ${
                                contact.status === 'read'
                                  ? 'border-green-100 bg-green-50 text-green-600'
                                  : 'border-slate-100 bg-slate-50 text-slate-400 hover:text-slate-700'
                              }`}
                              title={contact.status === 'read' ? "Mark unread" : "Mark read"}
                            >
                              <Check className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Admission Applications list */}
                <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/60 shadow-sm p-6 space-y-4">
                  <div className="pb-3 border-b border-slate-100">
                    <h3 className="font-extrabold text-lg text-slate-900 flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-emerald-500" />
                      <span>All Enrollment Leads ({registrations.length})</span>
                    </h3>
                  </div>

                  {registrations.length === 0 ? (
                    <div className="text-center py-10">
                      <p className="text-sm text-slate-400">No enrollment requests received yet.</p>
                    </div>
                  ) : (
                    <div className="divide-y divide-slate-100 space-y-3">
                      {registrations.map((reg) => (
                        <div key={reg._id} className="pt-3 first:pt-0">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-800 text-sm">{reg.fullName}</span>
                            <span className="text-[10px] text-slate-400 font-semibold">{new Date(reg.createdAt).toLocaleDateString()}</span>
                          </div>
                          <p className="text-xs font-bold text-slate-700 mt-1 bg-slate-50 border border-slate-100 p-2 rounded-xl">
                            <span className="text-indigo-600">{reg.degreeLevel}</span>: {reg.program}
                          </p>
                          <div className="flex flex-col gap-1 text-[11px] text-slate-400 mt-2 font-semibold">
                            <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-slate-300" /> {reg.email}</span>
                            <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-slate-300" /> {reg.phone || 'N/A'}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            )}

          </div>
        )}

      </main>

      {/* FOOTER */}
      <Footer onOpenRegister={() => {}} />

      {/* UNIVERSITIES CRUD MODAL */}
      {uniModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-100 overflow-hidden relative max-h-[90vh] flex flex-col">
            <button
              onClick={() => { setUniModalOpen(false); setEditUniTarget(null); }}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6 sm:p-8 border-b border-slate-100">
              <h3 className="text-2xl font-black text-slate-900">
                {editUniTarget ? "Edit University" : "Add New Partner University"}
              </h3>
              <p className="text-xs text-slate-400 mt-1">Configure NAAC accreditation, NIRF ranking, type, and listing details.</p>
            </div>

            <form onSubmit={handleUniSubmit} className="flex-grow overflow-y-auto p-6 sm:p-8 space-y-4">
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">University Name</label>
                  <input
                    type="text" required
                    value={uniForm.name}
                    onChange={(e) => setUniForm({ ...uniForm, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500"
                    placeholder="e.g. Aligarh Muslim University"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">Short Name / Initials</label>
                  <input
                    type="text" required
                    value={uniForm.shortName}
                    onChange={(e) => setUniForm({ ...uniForm, shortName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500"
                    placeholder="e.g. AMU"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">Location (City)</label>
                  <input
                    type="text" required
                    value={uniForm.location}
                    onChange={(e) => setUniForm({ ...uniForm, location: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500"
                    placeholder="e.g. Aligarh"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">Established Year</label>
                  <input
                    type="number" required
                    value={safeNumber(uniForm.established)}
                    onChange={(e) => setUniForm({ ...uniForm, established: parseNum(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500"
                    placeholder="1980"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">University Type</label>
                  <select
                    value={uniForm.type}
                    onChange={(e) => setUniForm({ ...uniForm, type: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500 bg-white"
                  >
                    <option>Central</option>
                    <option>State</option>
                    <option>Private</option>
                    <option>Deemed</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">NAAC Grade</label>
                  <input
                    type="text" required
                    value={uniForm.naacGrade}
                    onChange={(e) => setUniForm({ ...uniForm, naacGrade: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500"
                    placeholder="e.g. NAAC A+"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">NIRF Ranking</label>
                  <input
                    type="text" required
                    value={uniForm.nirfRank}
                    onChange={(e) => setUniForm({ ...uniForm, nirfRank: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500"
                    placeholder="e.g. NIRF #12"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">Min Semester Fee (₹)</label>
                  <input
                    type="number" required
                    value={safeNumber(uniForm.minFee)}
                    onChange={(e) => setUniForm({ ...uniForm, minFee: parseNum(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">Max Semester Fee (₹)</label>
                  <input
                    type="number" required
                    value={safeNumber(uniForm.maxFee)}
                    onChange={(e) => setUniForm({ ...uniForm, maxFee: parseNum(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">Fee Range Tag</label>
                  <input
                    type="text" required
                    value={uniForm.feeRange}
                    onChange={(e) => setUniForm({ ...uniForm, feeRange: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500"
                    placeholder="e.g. ₹30K - ₹1.5L"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">Syllabus Programs Count</label>
                  <input
                    type="number" required
                    value={safeNumber(uniForm.programsCount)}
                    onChange={(e) => setUniForm({ ...uniForm, programsCount: parseNum(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">Students Count Tag</label>
                  <input
                    type="text" required
                    value={uniForm.studentsCount}
                    onChange={(e) => setUniForm({ ...uniForm, studentsCount: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500"
                    placeholder="e.g. 20K+"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">Cover Image URL</label>
                <input
                  type="text" required
                  value={uniForm.coverImage}
                  onChange={(e) => setUniForm({ ...uniForm, coverImage: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">University Description</label>
                <textarea
                  value={uniForm.description || ''}
                  onChange={(e) => setUniForm({ ...uniForm, description: e.target.value })}
                  rows="3"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500"
                  placeholder="Describe the university, its campus, and major offerings..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">Logo URL (Optional)</label>
                <input
                  type="text"
                  value={uniForm.logo || ''}
                  onChange={(e) => setUniForm({ ...uniForm, logo: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500"
                  placeholder="e.g. https://domain.com/logo.png"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={uniForm.featured}
                  onChange={(e) => setUniForm({ ...uniForm, featured: e.target.checked })}
                  className="w-4.5 h-4.5 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="featured" className="text-xs font-bold text-slate-700 uppercase tracking-wider">Highlight as Featured University</label>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => { setUniModalOpen(false); setEditUniTarget(null); }}
                  className="px-5 py-3 rounded-xl border border-slate-200 text-slate-500 font-bold text-xs uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase flex items-center gap-2"
                >
                  {actionLoading && <span className="w-3.5 h-3.5 rounded-full border-2 border-slate-500 border-t-white animate-spin"></span>}
                  <span>Save University</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* PROGRAMS CRUD MODAL */}
      {progModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-100 overflow-hidden relative max-h-[90vh] flex flex-col">
            <button
              onClick={() => { setProgModalOpen(false); setEditProgTarget(null); }}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6 sm:p-8 border-b border-slate-100">
              <h3 className="text-2xl font-black text-slate-900">
                {editProgTarget ? "Edit Program" : "Add Educational Program"}
              </h3>
              <p className="text-xs text-slate-400 mt-1">Add courses, durations, fees, careers, and map them to partner universities.</p>
            </div>

            <form onSubmit={handleProgSubmit} className="flex-grow overflow-y-auto p-6 sm:p-8 space-y-4">
              
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">Program/Course Title</label>
                  <input
                    type="text" required
                    value={progForm.title}
                    onChange={(e) => setProgForm({ ...progForm, title: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500"
                    placeholder="e.g. BCA in Cloud Computing"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">Degree Code</label>
                  <input
                    type="text" required
                    value={progForm.code}
                    onChange={(e) => setProgForm({ ...progForm, code: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500"
                    placeholder="e.g. BCA"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">Offering University</label>
                  <select
                    value={progForm.university}
                    onChange={(e) => setProgForm({ ...progForm, university: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500 bg-white"
                  >
                    {universities.map((uni) => (
                      <option key={uni.id} value={uni.name}>{uni.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">Course Level</label>
                  <select
                    value={progForm.level}
                    onChange={(e) => setProgForm({ ...progForm, level: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500 bg-white"
                  >
                    <option>Undergraduate</option>
                    <option>Postgraduate</option>
                    <option>Diploma</option>
                    <option>Certificate</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">Category</label>
                  <select
                    value={progForm.category}
                    onChange={(e) => setProgForm({ ...progForm, category: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500 bg-white"
                  >
                    <option>Computer Science</option>
                    <option>Commerce</option>
                    <option>Management</option>
                    <option>Design</option>
                    <option>Engineering</option>
                    <option>Arts & Humanities</option>
                    <option>Science</option>
                    <option>Law</option>
                    <option>Medicine</option>
                    <option>Education</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">Duration</label>
                  <input
                    type="text" required
                    value={progForm.duration}
                    onChange={(e) => setProgForm({ ...progForm, duration: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500"
                    placeholder="3 Years"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">Semesters</label>
                  <input
                    type="text" required
                    value={progForm.semesters}
                    onChange={(e) => setProgForm({ ...progForm, semesters: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500"
                    placeholder="6 Semesters"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">Fee per Semester</label>
                  <input
                    type="text" required
                    value={progForm.fee}
                    onChange={(e) => setProgForm({ ...progForm, fee: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500"
                    placeholder="₹25,000"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">EMI Option (Monthly)</label>
                  <input
                    type="text" required
                    value={progForm.emi}
                    onChange={(e) => setProgForm({ ...progForm, emi: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500"
                    placeholder="₹4,166/mo"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">Accreditation Info</label>
                  <input
                    type="text" required
                    value={progForm.accreditation}
                    onChange={(e) => setProgForm({ ...progForm, accreditation: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500"
                    placeholder="UGC-DEB, NAAC A+"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">Program Description</label>
                <textarea
                  value={progForm.description || ''}
                  onChange={(e) => setProgForm({ ...progForm, description: e.target.value })}
                  rows="3"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500"
                  placeholder="Provide a detailed description of the program, target audience, and key learning outcomes..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">Syllabus Subjects (Comma-separated)</label>
                <textarea
                  value={progForm.syllabus}
                  onChange={(e) => setProgForm({ ...progForm, syllabus: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-blue-500 h-20"
                  placeholder="AWS Platforms, Containerization, Database Management, SQL Systems"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">Career Options (Comma-separated)</label>
                <textarea
                  value={progForm.careers}
                  onChange={(e) => setProgForm({ ...progForm, careers: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-blue-500 h-20"
                  placeholder="Cloud Architect, DevOps Associate, Cloud Security Engineer"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="progFeatured"
                  checked={progForm.featured}
                  onChange={(e) => setProgForm({ ...progForm, featured: e.target.checked })}
                  className="w-4.5 h-4.5 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="progFeatured" className="text-xs font-bold text-slate-700 uppercase tracking-wider">Show in Featured Courses banner</label>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => { setProgModalOpen(false); setEditProgTarget(null); }}
                  className="px-5 py-3 rounded-xl border border-slate-200 text-slate-500 font-bold text-xs uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase flex items-center gap-2"
                >
                  {actionLoading && <span className="w-3.5 h-3.5 rounded-full border-2 border-slate-500 border-t-white animate-spin"></span>}
                  <span>Save Program</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* VIEW CONTACT INQUIRY MODAL */}
      {viewContactModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-100 overflow-hidden relative">
            <button
              onClick={() => setViewContactModal(null)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6 sm:p-8 space-y-6">
              
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-sm">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Contact Submission Details</span>
                  <h3 className="text-xl font-extrabold text-slate-900 mt-0.5">{viewContactModal.fullName}</h3>
                </div>
              </div>

              <div className="bg-slate-50 p-4.5 rounded-2xl border border-slate-100 space-y-3">
                <div className="flex items-center gap-2 text-xs text-slate-600 font-semibold">
                  <Mail className="w-4 h-4 text-slate-400" />
                  <span>Email:</span>
                  <a href={`mailto:${viewContactModal.email}`} className="text-blue-600 hover:underline font-bold">{viewContactModal.email}</a>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600 font-semibold">
                  <Phone className="w-4 h-4 text-slate-400" />
                  <span>Phone:</span>
                  <a href={`tel:${viewContactModal.phone}`} className="text-slate-950 font-bold">{viewContactModal.phone}</a>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600 font-semibold">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span>Submitted:</span>
                  <span className="text-slate-900 font-bold">{new Date(viewContactModal.createdAt).toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600 font-semibold">
                  <Award className="w-4 h-4 text-slate-400" />
                  <span>Topic:</span>
                  <span className="text-indigo-700 bg-indigo-50 border border-indigo-100 rounded px-2 py-0.5 font-bold">{viewContactModal.interestCategory}</span>
                </div>
              </div>

              <div className="space-y-2">
                <span className="block text-xs font-bold uppercase tracking-wider text-slate-400">Subject</span>
                <p className="text-sm font-extrabold text-slate-900">{viewContactModal.subject}</p>
              </div>

              <div className="space-y-2">
                <span className="block text-xs font-bold uppercase tracking-wider text-slate-400">Message</span>
                <p className="text-xs text-slate-700 leading-relaxed font-semibold bg-slate-50 p-4 border rounded-2xl italic">
                  "{viewContactModal.message}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => handleContactStatusUpdate(viewContactModal._id, viewContactModal.status)}
                  className={`flex-grow py-3.5 rounded-2xl font-bold text-xs sm:text-sm border transition-all flex items-center justify-center gap-2 ${
                    viewContactModal.status === 'read'
                      ? 'border-green-200 bg-green-50 hover:bg-green-100 text-green-700'
                      : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <Check className="w-4 h-4" />
                  <span>{viewContactModal.status === 'read' ? 'Mark Inquiry Unread' : 'Mark Inquiry Read'}</span>
                </button>
                
                <button
                  onClick={() => handleContactDelete(viewContactModal._id)}
                  className="w-12 h-12 bg-red-50 text-red-600 border border-red-100 hover:bg-red-100 hover:text-red-700 rounded-2xl flex items-center justify-center transition-all"
                  title="Delete inquiry"
                >
                  <Trash2 className="w-4.5 h-4.5" />
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
