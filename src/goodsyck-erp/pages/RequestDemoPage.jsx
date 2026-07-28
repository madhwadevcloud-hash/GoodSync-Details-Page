import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Phone, Send, CalendarCheck, CheckCircle2, X, Loader2 } from 'lucide-react';
import AmbientBackground from '../components/AmbientBackground';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Base URL of the GOODSYNK ERP backend API — override via VITE_API_BASE_URL.
// Defaults to the same local backend port used across the rest of the app (5050).
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5050/api';

const RequestDemoPage = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Please enter your phone number';
    } else if (!/^[+]?[\d\s-]{7,15}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');

    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_BASE_URL}/demo-requests`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data?.message || 'Something went wrong. Please try again.');
      }

      setShowSuccess(true);
      setFormData({ name: '', phone: '', email: '' });
    } catch (err) {
      setSubmitError(err.message || 'Unable to submit your request right now. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-inter text-slate-900 selection:bg-indigo-600/30 selection:text-indigo-600 flex flex-col">
      <Navbar />

      <main className="flex-1 relative pt-24 md:pt-32 pb-16 md:pb-20">
        <AmbientBackground showIcons={false} />

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16 space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 font-bold text-sm"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Book Your Demo</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-black font-outfit tracking-tight text-slate-900"
            >
              See It In <span className="text-indigo-600">Action</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto"
            >
              Share your details and our team will set up a personalized walkthrough of GOODSYCK ERP for your school.
            </motion.p>
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="max-w-2xl mx-auto"
          >
            <form
              onSubmit={handleSubmit}
              className="bg-white/80 backdrop-blur-3xl border border-white border-t-white/80 border-l-white/80 p-6 md:p-10 rounded-[2.5rem] shadow-2xl shadow-indigo-100/50 space-y-6"
            >
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Full Name</label>
                <div className="relative">
                  <User className="w-5 h-5 text-slate-400 absolute left-5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className={`w-full bg-slate-50 border ${errors.name ? 'border-red-400 focus:ring-red-500/10 focus:border-red-500' : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/10'} focus:ring-4 rounded-2xl pl-12 pr-5 py-4 outline-none transition-all font-medium text-slate-800 placeholder:text-slate-400`}
                  />
                </div>
                {errors.name && <p className="text-sm font-medium text-red-500 ml-1">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Phone Number</label>
                <div className="relative">
                  <Phone className="w-5 h-5 text-slate-400 absolute left-5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className={`w-full bg-slate-50 border ${errors.phone ? 'border-red-400 focus:ring-red-500/10 focus:border-red-500' : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/10'} focus:ring-4 rounded-2xl pl-12 pr-5 py-4 outline-none transition-all font-medium text-slate-800 placeholder:text-slate-400`}
                  />
                </div>
                {errors.phone && <p className="text-sm font-medium text-red-500 ml-1">{errors.phone}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Work Email</label>
                <div className="relative">
                  <Mail className="w-5 h-5 text-slate-400 absolute left-5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@school.edu"
                    className={`w-full bg-slate-50 border ${errors.email ? 'border-red-400 focus:ring-red-500/10 focus:border-red-500' : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/10'} focus:ring-4 rounded-2xl pl-12 pr-5 py-4 outline-none transition-all font-medium text-slate-800 placeholder:text-slate-400`}
                  />
                </div>
                {errors.email && <p className="text-sm font-medium text-red-500 ml-1">{errors.email}</p>}
              </div>

              {submitError && (
                <p className="text-sm font-bold text-red-500 bg-red-50 border border-red-100 rounded-2xl px-5 py-3">
                  {submitError}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full group bg-slate-900 hover:bg-indigo-600 disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-2xl px-6 py-4 font-black text-lg flex items-center justify-center gap-3 transition-all duration-300 shadow-xl hover:shadow-indigo-500/30"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Request</span>
                    <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </main>

      <Footer />

      {/* Success Popup */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm px-4"
            onClick={() => setShowSuccess(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 22, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white rounded-[2.5rem] shadow-2xl max-w-md w-full p-8 md:p-10 text-center"
            >
              <button
                onClick={() => setShowSuccess(false)}
                className="absolute top-5 right-5 p-2 rounded-full bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <h3 className="text-2xl font-black font-outfit text-slate-900 mb-3">Request Received!</h3>
              <p className="text-slate-500 font-medium leading-relaxed mb-8">
                Thank you for your interest in GOODSYCK ERP. Our team will reach out to you within 24 hours to schedule your personalized demo.
              </p>

              <button
                onClick={() => setShowSuccess(false)}
                className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-2xl px-6 py-4 font-black text-base shadow-xl shadow-indigo-200 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                Got It
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RequestDemoPage;
