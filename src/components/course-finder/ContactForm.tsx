"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { User, Mail, Phone, ArrowRight, Loader2 } from 'lucide-react';

const contactSchema = z.object({
  fullName: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().regex(/^[0-9+\(\)#\.\s\-]{10,15}$/, { 
    message: 'Please enter a valid 10-15 digit phone number.' 
  })
});

type ContactFormValues = z.infer<typeof contactSchema>;

interface ContactFormProps {
  onSubmit: (data: ContactFormValues) => Promise<void>;
  onBack: () => void;
  isSubmitting: boolean;
  defaultValues: Partial<ContactFormValues>;
}

export default function ContactForm({ onSubmit, onBack, isSubmitting, defaultValues }: ContactFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: defaultValues.fullName || '',
      email: defaultValues.email || '',
      phone: defaultValues.phone || ''
    }
  });

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-snug">
          Almost Done!
        </h2>
        <p className="text-slate-500 text-sm mt-1">
          Enter your details to receive your recommended courses.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Full Name Field */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
            Full Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
              <User className="w-5 h-5" />
            </div>
            <input
              type="text"
              placeholder="John Doe"
              {...register('fullName')}
              className={`w-full text-sm pl-11 pr-4 py-3 bg-slate-50 border rounded-2xl focus:outline-none focus:ring-2 focus:bg-white transition-all duration-300 ${
                errors.fullName 
                  ? 'border-red-300 focus:ring-red-100 focus:border-red-500' 
                  : 'border-slate-200 focus:ring-indigo-100 focus:border-indigo-500'
              }`}
            />
          </div>
          {errors.fullName && (
            <motion.p 
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs font-bold text-red-500 pl-1"
            >
              {errors.fullName.message}
            </motion.p>
          )}
        </div>

        {/* Email Address Field */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
              <Mail className="w-5 h-5" />
            </div>
            <input
              type="email"
              placeholder="john@example.com"
              {...register('email')}
              className={`w-full text-sm pl-11 pr-4 py-3 bg-slate-50 border rounded-2xl focus:outline-none focus:ring-2 focus:bg-white transition-all duration-300 ${
                errors.email 
                  ? 'border-red-300 focus:ring-red-100 focus:border-red-500' 
                  : 'border-slate-200 focus:ring-indigo-100 focus:border-indigo-500'
              }`}
            />
          </div>
          {errors.email && (
            <motion.p 
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs font-bold text-red-500 pl-1"
            >
              {errors.email.message}
            </motion.p>
          )}
        </div>

        {/* Phone Number Field */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
            Phone Number
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
              <Phone className="w-5 h-5" />
            </div>
            <input
              type="tel"
              placeholder="+91 98765 43210"
              {...register('phone')}
              className={`w-full text-sm pl-11 pr-4 py-3 bg-slate-50 border rounded-2xl focus:outline-none focus:ring-2 focus:bg-white transition-all duration-300 ${
                errors.phone 
                  ? 'border-red-300 focus:ring-red-100 focus:border-red-500' 
                  : 'border-slate-200 focus:ring-indigo-100 focus:border-indigo-500'
              }`}
            />
          </div>
          {errors.phone && (
            <motion.p 
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs font-bold text-red-500 pl-1"
            >
              {errors.phone.message}
            </motion.p>
          )}
        </div>

        {/* Form Action Buttons */}
        <div className="flex items-center gap-3 pt-4">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 py-3 border border-slate-250 hover:bg-slate-50 text-slate-700 font-bold text-sm rounded-2xl transition-all cursor-pointer text-center"
          >
            Back
          </button>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 group py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-70 text-white font-bold text-sm shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/35 transition-all cursor-pointer flex items-center justify-center gap-1.5"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Sending...</span>
              </>
            ) : (
              <>
                <span>Get Recommendations</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
}
