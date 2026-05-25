"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, HelpCircle, CheckCircle2 } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import OptimizedAnimatedButton from "@/components/OptimizedAnimatedButton";
import OptimizedAnimatedBackground from "@/components/OptimizedAnimatedBackground";
import PageTransition from "@/components/PageTransition";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: "AI Automation",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    
    try {
      // Send notification to WhatsApp and Gmail
      await fetch("/api/notify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
    } catch (error) {
      console.error("Error sending notification:", error);
    }

    // Reset form after 2.5 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        email: "",
        company: "",
        service: "Website Development",
        message: "",
      });
    }, 2500);
  };

  return (
    <PageTransition variant="contact">
    <div className="relative overflow-hidden w-full pb-20">
      {/* Animated background effects */}
      <OptimizedAnimatedBackground withParticles withGrid intensity="medium" />
      
      {/* Background patterns */}
      <div className="absolute inset-0 bg-futuristic-grid opacity-[0.04] -z-10" />
      <motion.div
        className="absolute top-[15%] left-[-10%] w-[450px] h-[450px] ambient-glow-violet -z-10"
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
      />

      {/* Hero Section */}
      <ScrollReveal variant="fadeUp">
        <section className="mx-auto max-w-7xl px-6 pt-16 pb-12 lg:px-8 text-center max-w-3xl flex flex-col items-center gap-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-100 shadow-sm group hover:border-brand-violet/30 hover:shadow-md transition-all duration-300"
          >
            <span className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">
              Initiate Engagement
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-black tracking-tight text-slate-800"
          >
            Connect with Our{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-violet to-brand-blue">
              Engineering Pod.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-slate-500 leading-relaxed font-medium"
          >
            Start your enterprise integration. Schedule a consultation or send an architecture inquiry.
          </motion.p>
        </section>
      </ScrollReveal>

      {/* Main Content Layout */}
      <ScrollReveal variant="fadeUp" delay={0.2}>
        <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8 grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Left Column: Office Coordinates */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 flex flex-col gap-8 justify-between"
          >
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
                {[
                  {
                    icon: MapPin,
                    label: "HQ Address",
                    lines: ["12 Rue de la Marine, White Town", "Pondicherry, Puducherry 605001, India"],
                  },
                  {
                    icon: Mail,
                    label: "Inquiries",
                    lines: ["info@agzus.com", "careers@agzus.com"],
                    href: ["mailto:info@agzus.com", "mailto:careers@agzus.com"],
                  },
                  {
                    icon: Phone,
                    label: "Voice Call",
                    lines: ["+91 (413) 222 3344", "+91 98765 43210"],
                    href: ["tel:+914132223344", "tel:+919876543210"],
                  },
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(139, 92, 246, 0.15)" }}
                      className="flex gap-4 p-5 glass-card rounded-2xl group transition-all duration-300"
                    >
                      <Icon className="w-5 h-5 text-brand-violet shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-1">{item.label}</span>
                        {item.lines.map((line, i) => (
                          <motion.a
                            key={i}
                            href={item.href?.[i]}
                            whileHover={{ x: 2 }}
                            className="hover:text-brand-violet transition-colors"
                          >
                            {line}
                          </motion.a>
                        ))}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Map Vector placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ boxShadow: "0 20px 40px rgba(139, 92, 246, 0.1)" }}
              className="w-full h-40 bg-slate-50 border border-slate-100 rounded-2xl relative overflow-hidden flex items-center justify-center group transition-all duration-300"
            >
              <div className="absolute inset-0 bg-futuristic-dots opacity-40" />
              <motion.span
                initial={{ opacity: 0.5 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-[10px] font-bold text-slate-400 uppercase tracking-widest relative z-10"
              >
                Puducherry GPS Vector Core
              </motion.span>
            </motion.div>
          </motion.div>

          {/* Right Column: Interactive Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <div className="glass-card p-8 md:p-12 rounded-[32px] w-full">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex flex-col items-center justify-center py-20 gap-4 text-center"
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                    }}
                  >
                    <CheckCircle2 className="w-16 h-16 text-emerald-500" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-slate-800">Inquiry Dispatched</h3>
                  <p className="text-xs text-slate-500 max-w-sm">
                    We have logged your enterprise request. An architect will review your company details and reply within 12 business hours.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-6"
                >
                  <div className="flex flex-col gap-1">
                    <h3 className="text-xl font-extrabold text-slate-800 tracking-tight">Project Specifier</h3>
                    <p className="text-xs text-slate-400">Fill in details to benchmark sizing benchmarks.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {[
                      {
                        label: "Contact Name",
                        placeholder: "e.g. Ramesh Dev",
                        value: formData.name,
                        onChange: (e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, name: e.target.value }),
                        type: "text",
                        required: true,
                      },
                      {
                        label: "Company Name",
                        placeholder: "e.g. Nexus Tech",
                        value: formData.company,
                        onChange: (e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, company: e.target.value }),
                        type: "text",
                        required: true,
                      },
                    ].map((field, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="flex flex-col gap-1.5"
                      >
                        <label className="text-xs font-bold text-slate-600 uppercase">{field.label}</label>
                        <motion.input
                          type={field.type}
                          className="px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-violet focus:ring-1 focus:ring-brand-violet text-slate-800 transition-all duration-300"
                          required={field.required}
                          placeholder={field.placeholder}
                          value={field.value}
                          onChange={field.onChange}
                          suppressHydrationWarning
                          whileFocus={{
                            boxShadow: "0 0 20px rgba(139, 92, 246, 0.2)",
                          }}
                        />
                      </motion.div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="flex flex-col gap-1.5"
                    >
                      <label className="text-xs font-bold text-slate-600 uppercase">Corporate Email</label>
                      <motion.input
                        type="email"
                        className="px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-violet focus:ring-1 focus:ring-brand-violet text-slate-800 transition-all duration-300"
                        required
                        placeholder="ramesh@nexustech.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        suppressHydrationWarning
                        whileFocus={{
                          boxShadow: "0 0 20px rgba(139, 92, 246, 0.2)",
                        }}
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 }}
                      className="flex flex-col gap-1.5"
                    >
                      <label className="text-xs font-bold text-slate-600 uppercase">Target Solution</label>
                      <motion.select
                        className="px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-violet focus:ring-1 focus:ring-brand-violet text-slate-800 transition-all duration-300"
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        suppressHydrationWarning
                        whileFocus={{
                          boxShadow: "0 0 20px rgba(139, 92, 246, 0.2)",
                        }}
                      >
                        <option>AI Automation</option>
                        <option>Cloud Infrastructure</option>
                        <option>Next-Gen Web Platforms</option>
                        <option>Cybersecurity / Compliance</option>
                      </motion.select>
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col gap-1.5"
                  >
                    <label className="text-xs font-bold text-slate-600 uppercase">Message & Spec details</label>
                    <motion.textarea
                      rows={4}
                      className="px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-violet focus:ring-1 focus:ring-brand-violet text-slate-800 transition-all duration-300"
                      required
                      placeholder="Provide details about your tech workloads, user counts, or project milestones."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      suppressHydrationWarning
                      whileFocus={{
                        boxShadow: "0 0 20px rgba(139, 92, 246, 0.2)",
                      }}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                  >
                    <OptimizedAnimatedButton
                      type="submit"
                      variant="primary"
                      size="lg"
                      glowEffect
                      className="w-full"
                    >
                      Send Spec Proposal
                      <Send className="w-3.5 h-3.5" />
                    </OptimizedAnimatedButton>
                  </motion.div>
                </motion.form>
              )}
            </div>
          </motion.div>
        </section>
      </ScrollReveal>
    </div>
    </PageTransition>
  );
}
