"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, HelpCircle, CheckCircle2 } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: "AI Automation",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Simulate database write
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        email: "",
        company: "",
        service: "AI Automation",
        message: "",
      });
    }, 2500);
  };

  return (
    <div className="relative overflow-hidden w-full pb-20">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-futuristic-grid opacity-[0.04] -z-10" />
      <div className="absolute top-[15%] left-[-10%] w-[450px] h-[450px] ambient-glow-violet -z-10 animate-pulse-glow" />

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-6 pt-16 pb-12 lg:px-8 text-center max-w-3xl flex flex-col items-center gap-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-100 shadow-sm">
          <span className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">
            Initiate Engagement
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-800">
          Connect with Our{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-violet to-brand-blue">
            Engineering Pod.
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-500 leading-relaxed font-medium">
          Start your enterprise integration. Schedule a consultation or send an architecture inquiry.
        </p>
      </section>

      {/* Main Content Layout */}
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8 grid grid-cols-1 lg:grid-cols-5 gap-12">
        {/* Left Column: Office Coordinates */}
        <div className="lg:col-span-2 flex flex-col gap-8 justify-between">
          <div className="flex flex-col gap-6">
            <span className="text-xs font-bold text-brand-violet uppercase tracking-widest">
              Office Coordinates
            </span>
            <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">
              AGZUS Puducherry HQ
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed font-medium">
              We operate from Pondicherry, India, coordinating client deliverables globally. Visit us or reach out via our direct endpoints.
            </p>

            <div className="flex flex-col gap-5 text-sm text-slate-600 mt-4">
              <div className="flex gap-4 p-5 glass-card rounded-2xl">
                <MapPin className="w-5 h-5 text-brand-violet shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-1">HQ Address</span>
                  <span>12 Rue de la Marine, White Town</span>
                  <span>Pondicherry, Puducherry 605001, India</span>
                </div>
              </div>

              <div className="flex gap-4 p-5 glass-card rounded-2xl">
                <Mail className="w-5 h-5 text-brand-violet shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-1">Inquiries</span>
                  <a href="mailto:info@agzus.com" className="hover:text-brand-violet transition-colors">
                    info@agzus.com
                  </a>
                  <a href="mailto:careers@agzus.com" className="hover:text-brand-violet transition-colors">
                    careers@agzus.com
                  </a>
                </div>
              </div>

              <div className="flex gap-4 p-5 glass-card rounded-2xl">
                <Phone className="w-5 h-5 text-brand-violet shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-1">Voice Call</span>
                  <a href="tel:+914132223344" className="hover:text-brand-violet transition-colors">
                    +91 (413) 222 3344
                  </a>
                  <a href="tel:+919876543210" className="hover:text-brand-violet transition-colors">
                    +91 98765 43210
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Map Vector placeholder */}
          <div className="w-full h-40 bg-slate-50 border border-slate-100 rounded-2xl relative overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 bg-futuristic-dots opacity-40" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Puducherry GPS Vector Core
            </span>
          </div>
        </div>

        {/* Right Column: Interactive Form */}
        <div className="lg:col-span-3">
          <div className="glass-card p-8 md:p-12 rounded-[32px] w-full">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
                <CheckCircle2 className="w-16 h-16 text-emerald-500 animate-bounce" />
                <h3 className="text-xl font-bold text-slate-800">Inquiry Dispatched</h3>
                <p className="text-xs text-slate-500 max-w-sm">
                  We have logged your enterprise request. An architect will review your company details and reply within 12 business hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="flex flex-col gap-1">
                  <h3 className="text-xl font-extrabold text-slate-800 tracking-tight">Project Specifier</h3>
                  <p className="text-xs text-slate-400">Fill in details to benchmark sizing benchmarks.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-600 uppercase">Contact Name</label>
                    <input
                      type="text"
                      className="px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-violet text-slate-800"
                      required
                      placeholder="e.g. Ramesh Dev"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      suppressHydrationWarning
                    />
                  </div>
                  
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-600 uppercase">Company Name</label>
                    <input
                      type="text"
                      className="px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-violet text-slate-800"
                      required
                      placeholder="e.g. Nexus Tech"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      suppressHydrationWarning
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-600 uppercase">Corporate Email</label>
                    <input
                      type="email"
                      className="px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-violet text-slate-800"
                      required
                      placeholder="ramesh@nexustech.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      suppressHydrationWarning
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-600 uppercase">Target Solution</label>
                    <select
                      className="px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-violet text-slate-800"
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      suppressHydrationWarning
                    >
                      <option>AI Automation</option>
                      <option>Cloud Infrastructure</option>
                      <option>Next-Gen Web Platforms</option>
                      <option>Cybersecurity / Compliance</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-600 uppercase">Message & Spec details</label>
                  <textarea
                    rows={4}
                    className="px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-violet text-slate-800"
                    required
                    placeholder="Provide details about your tech workloads, user counts, or project milestones."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}                      suppressHydrationWarning                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 mt-2 bg-slate-900 hover:bg-brand-violet text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md"
                  suppressHydrationWarning
                >
                  Send Spec Proposal
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
