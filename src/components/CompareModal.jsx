"use client";

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Building2, MapPin, Award, Calendar, Star, GraduationCap, ArrowRight, Shield, RefreshCw } from 'lucide-react';
import UniversityLogo from './UniversityLogo';
import { universities as staticUniversities } from '../data/universities';
import { initialPrograms } from '../data/programs';

export default function CompareModal({ isOpen, onClose, onApplyCourse }) {
  const [mounted, setMounted] = useState(false);
  const [universities, setUniversities] = useState(staticUniversities);
  const [programs, setPrograms] = useState(initialPrograms);

  // Slot States (Defaulting to the top 3 featured universities)
  const [uniId1, setUniId1] = useState('amu');
  const [uniId2, setUniId2] = useState('gla');
  const [uniId3, setUniId3] = useState('jain');

  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch from APIs when open
  useEffect(() => {
    if (isOpen) {
      const fetchData = async () => {
        try {
          const [uniRes, progRes] = await Promise.all([
            fetch('/api/universities'),
            fetch('/api/programs')
          ]);
          if (uniRes.ok) {
            const uniData = await uniRes.json();
            setUniversities(uniData);
          }
          if (progRes.ok) {
            const progData = await progRes.json();
            setPrograms(progData);
          }
        } catch (error) {
          console.error('Error fetching compare data:', error);
        }
      };
      fetchData();
    }
  }, [isOpen]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  // Retrieve selected university objects
  const getUni = (id) => universities.find(u => u.id === id);
  const uni1 = getUni(uniId1);
  const uni2 = getUni(uniId2);
  const uni3 = getUni(uniId3);

  // Helper to get programs for a university
  const getUniPrograms = (uni) => {
    if (!uni) return [];
    return programs.filter(p => 
      p.university.toLowerCase().trim() === uni.name.toLowerCase().trim() ||
      p.university.toLowerCase().trim().includes(uni.shortName.toLowerCase().trim()) ||
      uni.name.toLowerCase().trim().includes(p.university.toLowerCase().trim())
    );
  };

  const programs1 = getUniPrograms(uni1);
  const programs2 = getUniPrograms(uni2);
  const programs3 = getUniPrograms(uni3);

  // Handle Apply Now click from comparison modal
  const handleApply = (program, uniName) => {
    if (onApplyCourse) {
      onApplyCourse({
        title: program.title,
        level: program.level,
        university: uniName
      });
    }
    onClose();
  };

  // Helper to render University selector dropdown
  const renderSelector = (selectedId, setSelectedId, slotName, disableNone = false) => {
    return (
      <div className="flex flex-col gap-1 w-full">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">{slotName}</label>
        <select
          value={selectedId || ''}
          onChange={(e) => setSelectedId(e.target.value || null)}
          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-500 bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer"
        >
          {!disableNone && <option value="">None (Select University)</option>}
          {universities.map((uni) => (
            <option key={uni.id} value={uni.id} disabled={uni.id === uniId1 || uni.id === uniId2 || uni.id === uniId3}>
              {uni.name} ({uni.shortName})
            </option>
          ))}
        </select>
      </div>
    );
  };

  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-6xl rounded-[32px] shadow-2xl border border-slate-100 overflow-hidden relative max-h-[90vh] flex flex-col" data-lenis-prevent>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors z-20 cursor-pointer shadow-sm border border-slate-100"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="p-6 md:p-8 border-b border-slate-100 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-600/10 text-blue-600 rounded-2xl border border-blue-500/15">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                Compare Partner Universities
              </h2>
              <p className="text-xs md:text-sm text-slate-500 font-medium mt-0.5">
                Analyze and compare course structure, rankings, grades, and apply directly.
              </p>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-grow overflow-y-auto p-6 md:p-8 space-y-8">
          
          {/* selectors row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
            <div className="flex items-center gap-2 pb-1 text-slate-500">
              <Building2 className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-bold uppercase tracking-wider">Choose Universities</span>
            </div>
            <div>{renderSelector(uniId1, setUniId1, "University Slot 1", true)}</div>
            <div>{renderSelector(uniId2, setUniId2, "University Slot 2")}</div>
            <div>{renderSelector(uniId3, setUniId3, "University Slot 3")}</div>
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="w-1/4 pb-6 text-left text-xs font-black uppercase tracking-wider text-slate-400">Features</th>
                  <th className="w-1/4 pb-6 px-4">
                    {uni1 && (
                      <div className="space-y-3">
                        <div className="h-24 w-full rounded-xl overflow-hidden relative border border-slate-100">
                          <img src={uni1.coverImage} className="w-full h-full object-cover" alt="" />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                        </div>
                        <div className="flex items-center gap-2.5">
                          <UniversityLogo universityName={uni1.name} />
                          <div className="text-left min-w-0">
                            <span className="text-xs font-black text-slate-900 block truncate">{uni1.name}</span>
                            <span className="text-[10px] font-bold text-slate-400">({uni1.shortName})</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </th>
                  <th className="w-1/4 pb-6 px-4">
                    {uni2 ? (
                      <div className="space-y-3">
                        <div className="h-24 w-full rounded-xl overflow-hidden relative border border-slate-100">
                          <img src={uni2.coverImage} className="w-full h-full object-cover" alt="" />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                        </div>
                        <div className="flex items-center gap-2.5">
                          <UniversityLogo universityName={uni2.name} />
                          <div className="text-left min-w-0">
                            <span className="text-xs font-black text-slate-900 block truncate">{uni2.name}</span>
                            <span className="text-[10px] font-bold text-slate-400">({uni2.shortName})</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="h-36 rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400">
                        <Building2 className="w-6 h-6 stroke-1 mb-1.5" />
                        <span className="text-[10px] font-bold">Select University</span>
                      </div>
                    )}
                  </th>
                  <th className="w-1/4 pb-6 px-4">
                    {uni3 ? (
                      <div className="space-y-3">
                        <div className="h-24 w-full rounded-xl overflow-hidden relative border border-slate-100">
                          <img src={uni3.coverImage} className="w-full h-full object-cover" alt="" />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                        </div>
                        <div className="flex items-center gap-2.5">
                          <UniversityLogo universityName={uni3.name} />
                          <div className="text-left min-w-0">
                            <span className="text-xs font-black text-slate-900 block truncate">{uni3.name}</span>
                            <span className="text-[10px] font-bold text-slate-400">({uni3.shortName})</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="h-36 rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400">
                        <Building2 className="w-6 h-6 stroke-1 mb-1.5" />
                        <span className="text-[10px] font-bold">Select University</span>
                      </div>
                    )}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {/* Location */}
                <tr>
                  <td className="py-4 text-xs font-bold text-slate-500">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-blue-500" />
                      <span>Location</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-xs font-semibold text-slate-800">{uni1?.location || '-'}</td>
                  <td className="py-4 px-4 text-xs font-semibold text-slate-800">{uni2?.location || '-'}</td>
                  <td className="py-4 px-4 text-xs font-semibold text-slate-800">{uni3?.location || '-'}</td>
                </tr>

                {/* NAAC Accreditation */}
                <tr>
                  <td className="py-4 text-xs font-bold text-slate-500">
                    <div className="flex items-center gap-2">
                      <Award className="w-3.5 h-3.5 text-blue-500" />
                      <span>NAAC Grade</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    {uni1 && (
                      <span className="px-2.5 py-0.5 bg-amber-400 text-slate-950 text-[10px] font-black rounded uppercase tracking-wider">
                        {uni1.naacGrade}
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-4">
                    {uni2 && (
                      <span className="px-2.5 py-0.5 bg-amber-400 text-slate-950 text-[10px] font-black rounded uppercase tracking-wider">
                        {uni2.naacGrade}
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-4">
                    {uni3 && (
                      <span className="px-2.5 py-0.5 bg-amber-400 text-slate-950 text-[10px] font-black rounded uppercase tracking-wider">
                        {uni3.naacGrade}
                      </span>
                    )}
                  </td>
                </tr>

                {/* NIRF Ranking */}
                <tr>
                  <td className="py-4 text-xs font-bold text-slate-500">
                    <div className="flex items-center gap-2">
                      <Award className="w-3.5 h-3.5 text-blue-500" />
                      <span>NIRF Rank</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-xs font-bold text-slate-700">{uni1?.nirfRank || '-'}</td>
                  <td className="py-4 px-4 text-xs font-bold text-slate-700">{uni2?.nirfRank || '-'}</td>
                  <td className="py-4 px-4 text-xs font-bold text-slate-700">{uni3?.nirfRank || '-'}</td>
                </tr>

                {/* Established Year */}
                <tr>
                  <td className="py-4 text-xs font-bold text-slate-500">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-blue-500" />
                      <span>Established Year</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-xs font-semibold text-slate-800">{uni1?.established || '-'}</td>
                  <td className="py-4 px-4 text-xs font-semibold text-slate-800">{uni2?.established || '-'}</td>
                  <td className="py-4 px-4 text-xs font-semibold text-slate-800">{uni3?.established || '-'}</td>
                </tr>

                {/* Rating */}
                <tr>
                  <td className="py-4 text-xs font-bold text-slate-500">
                    <div className="flex items-center gap-2">
                      <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                      <span>Rating</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    {uni1 && (
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-slate-800">{uni1.rating}</span>
                        <span className="text-[10px] text-slate-400">({uni1.reviewsCount})</span>
                      </div>
                    )}
                  </td>
                  <td className="py-4 px-4">
                    {uni2 && (
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-slate-800">{uni2.rating}</span>
                        <span className="text-[10px] text-slate-400">({uni2.reviewsCount})</span>
                      </div>
                    )}
                  </td>
                  <td className="py-4 px-4">
                    {uni3 && (
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-slate-800">{uni3.rating}</span>
                        <span className="text-[10px] text-slate-400">({uni3.reviewsCount})</span>
                      </div>
                    )}
                  </td>
                </tr>

                {/* Fee Range */}
                <tr>
                  <td className="py-4 text-xs font-bold text-slate-500">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-blue-500">₹</span>
                      <span>Fee Range</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-xs font-extrabold text-slate-900">{uni1?.feeRange || '-'}</td>
                  <td className="py-4 px-4 text-xs font-extrabold text-slate-900">{uni2?.feeRange || '-'}</td>
                  <td className="py-4 px-4 text-xs font-extrabold text-slate-900">{uni3?.feeRange || '-'}</td>
                </tr>

                {/* Offered Programs & Direct Apply */}
                <tr>
                  <td className="py-6 text-xs font-bold text-slate-500 align-top">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-3.5 h-3.5 text-blue-500" />
                      <span>Programs & Apply</span>
                    </div>
                  </td>
                  <td className="py-6 px-4 align-top">
                    {uni1 ? (
                      <div className="max-h-[300px] overflow-y-auto space-y-2 pr-2" data-lenis-prevent>
                        {programs1.length > 0 ? (
                          programs1.map((p, idx) => (
                            <div key={p._id || idx} className="bg-slate-50 border border-slate-100 hover:border-blue-100 rounded-xl p-3 flex flex-col justify-between gap-2.5 transition-all">
                              <div>
                                <span className="text-[9px] font-black px-1.5 py-0.5 bg-blue-100 text-blue-800 rounded uppercase tracking-wider inline-block mb-1">{p.code}</span>
                                <h4 className="text-[11px] font-bold text-slate-900 leading-tight">{p.title}</h4>
                                <div className="flex items-center gap-2 mt-1.5 text-[9px] text-slate-500 font-semibold">
                                  <span>{p.duration}</span>
                                  <span>•</span>
                                  <span className="text-slate-700 font-bold">{p.fee || 'Free'}</span>
                                </div>
                              </div>
                              <button
                                onClick={() => handleApply(p, uni1.name)}
                                className="w-full py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1 transition-all cursor-pointer"
                              >
                                <span>Apply Course</span>
                                <ArrowRight className="w-3 h-3" />
                              </button>
                            </div>
                          ))
                        ) : (
                          <span className="text-[10px] text-slate-400 italic">No programs found</span>
                        )}
                      </div>
                    ) : '-'}
                  </td>
                  <td className="py-6 px-4 align-top">
                    {uni2 ? (
                      <div className="max-h-[300px] overflow-y-auto space-y-2 pr-2" data-lenis-prevent>
                        {programs2.length > 0 ? (
                          programs2.map((p, idx) => (
                            <div key={p._id || idx} className="bg-slate-50 border border-slate-100 hover:border-blue-100 rounded-xl p-3 flex flex-col justify-between gap-2.5 transition-all">
                              <div>
                                <span className="text-[9px] font-black px-1.5 py-0.5 bg-blue-100 text-blue-800 rounded uppercase tracking-wider inline-block mb-1">{p.code}</span>
                                <h4 className="text-[11px] font-bold text-slate-900 leading-tight">{p.title}</h4>
                                <div className="flex items-center gap-2 mt-1.5 text-[9px] text-slate-500 font-semibold">
                                  <span>{p.duration}</span>
                                  <span>•</span>
                                  <span className="text-slate-700 font-bold">{p.fee || 'Free'}</span>
                                </div>
                              </div>
                              <button
                                onClick={() => handleApply(p, uni2.name)}
                                className="w-full py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1 transition-all cursor-pointer"
                              >
                                <span>Apply Course</span>
                                <ArrowRight className="w-3 h-3" />
                              </button>
                            </div>
                          ))
                        ) : (
                          <span className="text-[10px] text-slate-400 italic">No programs found</span>
                        )}
                      </div>
                    ) : '-'}
                  </td>
                  <td className="py-6 px-4 align-top">
                    {uni3 ? (
                      <div className="max-h-[300px] overflow-y-auto space-y-2 pr-2" data-lenis-prevent>
                        {programs3.length > 0 ? (
                          programs3.map((p, idx) => (
                            <div key={p._id || idx} className="bg-slate-50 border border-slate-100 hover:border-blue-100 rounded-xl p-3 flex flex-col justify-between gap-2.5 transition-all">
                              <div>
                                <span className="text-[9px] font-black px-1.5 py-0.5 bg-blue-100 text-blue-800 rounded uppercase tracking-wider inline-block mb-1">{p.code}</span>
                                <h4 className="text-[11px] font-bold text-slate-900 leading-tight">{p.title}</h4>
                                <div className="flex items-center gap-2 mt-1.5 text-[9px] text-slate-500 font-semibold">
                                  <span>{p.duration}</span>
                                  <span>•</span>
                                  <span className="text-slate-700 font-bold">{p.fee || 'Free'}</span>
                                </div>
                              </div>
                              <button
                                onClick={() => handleApply(p, uni3.name)}
                                className="w-full py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1 transition-all cursor-pointer"
                              >
                                <span>Apply Course</span>
                                <ArrowRight className="w-3 h-3" />
                              </button>
                            </div>
                          ))
                        ) : (
                          <span className="text-[10px] text-slate-400 italic">No programs found</span>
                        )}
                      </div>
                    ) : '-'}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Mobile Side-by-Side Horizontal Scroll View */}
          <div className="block md:hidden overflow-x-auto flex gap-4 pb-4 snap-x snap-mandatory" data-lenis-prevent>
            {[uni1, uni2, uni3].map((uni, idx) => {
              if (!uni) return (
                <div key={`empty-${idx}`} className="w-[80vw] shrink-0 border-2 border-dashed border-slate-200 rounded-3xl p-6 flex flex-col items-center justify-center text-slate-400 h-[380px] snap-center">
                  <Building2 className="w-8 h-8 stroke-1 mb-2" />
                  <span className="text-xs font-bold">Slot {idx + 1} Empty</span>
                  <span className="text-[10px] text-center text-slate-400 mt-1 max-w-[150px]">Choose a university from the dropdown above.</span>
                </div>
              );

              const uniProgs = idx === 0 ? programs1 : idx === 1 ? programs2 : programs3;

              return (
                <div key={uni.id} className="w-[85vw] sm:w-[60vw] shrink-0 border border-slate-100 rounded-3xl p-5 bg-slate-50/30 flex flex-col gap-4 shadow-sm snap-center">
                  {/* Image & Logo */}
                  <div className="space-y-3">
                    <div className="h-28 w-full rounded-2xl overflow-hidden relative border border-slate-100">
                      <img src={uni.coverImage} className="w-full h-full object-cover" alt="" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                    </div>
                    <div className="flex items-center gap-3">
                      <UniversityLogo universityName={uni.name} />
                      <div className="min-w-0">
                        <h3 className="text-sm font-black text-slate-900 truncate leading-tight">{uni.name}</h3>
                        <span className="text-[10px] font-bold text-slate-400">({uni.shortName})</span>
                      </div>
                    </div>
                  </div>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-2 gap-2 text-[10px]">
                    <div className="bg-white border border-slate-100 p-2.5 rounded-xl flex flex-col">
                      <span className="text-slate-400 font-bold uppercase tracking-wide">Location</span>
                      <span className="text-slate-800 font-extrabold mt-0.5 truncate">{uni.location}</span>
                    </div>
                    <div className="bg-white border border-slate-100 p-2.5 rounded-xl flex flex-col">
                      <span className="text-slate-400 font-bold uppercase tracking-wide">Accreditation</span>
                      <span className="text-amber-500 font-black mt-0.5">{uni.naacGrade}</span>
                    </div>
                    <div className="bg-white border border-slate-100 p-2.5 rounded-xl flex flex-col">
                      <span className="text-slate-400 font-bold uppercase tracking-wide">NIRF Rank</span>
                      <span className="text-slate-800 font-extrabold mt-0.5">{uni.nirfRank}</span>
                    </div>
                    <div className="bg-white border border-slate-100 p-2.5 rounded-xl flex flex-col">
                      <span className="text-slate-400 font-bold uppercase tracking-wide">Est. Year</span>
                      <span className="text-slate-800 font-extrabold mt-0.5">{uni.established}</span>
                    </div>
                    <div className="bg-white border border-slate-100 p-2.5 rounded-xl flex flex-col col-span-2">
                      <span className="text-slate-400 font-bold uppercase tracking-wide">Estimated Fee Range</span>
                      <span className="text-slate-900 font-black mt-0.5">{uni.feeRange}</span>
                    </div>
                  </div>

                  {/* Programs scroll area */}
                  <div className="space-y-2 flex-grow">
                    <span className="text-[9px] uppercase font-black text-slate-400 tracking-wider block">Offered Programs</span>
                    <div className="max-h-[220px] overflow-y-auto space-y-2 pr-1" data-lenis-prevent>
                      {uniProgs.length > 0 ? (
                        uniProgs.map((p, idx) => (
                          <div key={p._id || idx} className="bg-white border border-slate-100 hover:border-blue-100 rounded-xl p-3 flex flex-col justify-between gap-2 transition-all">
                            <div>
                              <span className="text-[8px] font-black px-1.5 py-0.5 bg-blue-100 text-blue-800 rounded uppercase tracking-wider inline-block mb-1">{p.code}</span>
                              <h4 className="text-[10px] font-black text-slate-900 leading-tight">{p.title}</h4>
                              <div className="flex items-center gap-1.5 mt-1 text-[8px] text-slate-400 font-semibold">
                                <span>{p.duration}</span>
                                <span>•</span>
                                <span className="text-slate-700 font-bold">{p.fee || 'Free'}</span>
                              </div>
                            </div>
                            <button
                              onClick={() => handleApply(p, uni.name)}
                              className="w-full py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[9px] font-bold uppercase tracking-wider flex items-center justify-center gap-1 transition-all cursor-pointer"
                            >
                              <span>Apply Course</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          </div>
                        ))
                      ) : (
                        <span className="text-[10px] text-slate-400 italic">No programs found</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 md:p-6 border-t border-slate-100 bg-slate-50 flex items-center justify-center gap-2 text-[10px] text-slate-400 shrink-0">
          <Shield className="w-3.5 h-3.5 text-blue-500" />
          <span>Apply directly from the comparison page to get 100% scholarship match counseling.</span>
        </div>

      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
