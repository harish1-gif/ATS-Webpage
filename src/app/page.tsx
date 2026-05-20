"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Cpu, 
  Globe, 
  Zap, 
  ShieldCheck, 
  Users, 
  Layers, 
  Activity,
  Award,
  Sparkles
} from "lucide-react";
import ScrollTravelLogo from "@/components/ScrollTravelLogo";
import { AGZUSHeroLogo, AGZUSStickyBackground } from "@/components/AGZUSLogoGSAP";

const stats = [
  { id: 1, label: "AI Model Deployments", value: "250+", icon: Cpu },
  { id: 2, label: "Enterprise Success Rate", value: "99.9%", icon: Award },
  { id: 3, label: "Data Pipeline Volume", value: "5.2B+", icon: Activity },
  { id: 4, label: "Global Clients Powered", value: "60+", icon: Users },
];

const featuredServices = [
  {
    title: "Artificial Intelligence",
    description: "Deploy large language models, custom neural networks, and automated workflows optimized for corporate workloads.",
    icon: Cpu,
    color: "from-violet-500/10 to-indigo-500/10",
    borderColor: "hover:border-violet-500/30",
    glowColor: "group-hover:bg-violet-500/10",
  },
  {
    title: "Cloud modernization",
    description: "Scale on serverless architectures, multi-region Kubernetes topologies, and automated self-healing clusters.",
    icon: Layers,
    color: "from-blue-500/10 to-cyan-500/10",
    borderColor: "hover:border-blue-500/30",
    glowColor: "group-hover:bg-blue-500/10",
  },
  {
    title: "Cybersecurity & IAM",
    description: "Enforce zero-trust architectures, real-time threat intelligence ingestion, and enterprise-wide single sign-on access.",
    icon: ShieldCheck,
    color: "from-emerald-500/10 to-teal-500/10",
    borderColor: "hover:border-emerald-500/30",
    glowColor: "group-hover:bg-emerald-500/10",
  },
];

export default function Home() {
  return (
    <div className="relative overflow-hidden w-full">
      <AGZUSStickyBackground />
      <ScrollTravelLogo />
      {/* Background patterns */}
      <div className="absolute inset-0 bg-futuristic-grid opacity-[0.18] -z-10" />
      <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] ambient-glow-violet -z-10 animate-pulse-glow" />
      <div className="absolute top-[40%] right-[-10%] w-[600px] h-[600px] ambient-glow-blue -z-10 animate-pulse-glow" />

      {/* Hero Section */}
      <section className="relative mx-auto max-w-7xl px-6 pt-10 pb-20 md:py-28 lg:px-8 flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1 text-left flex flex-col items-start gap-6 max-w-2xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-100/80 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-violet animate-pulse" />
            <span className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">
              Next-Gen Cognitive IT Systems
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-800 leading-[1.05]"
          >
            Powering Global Enterprises with{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-violet via-purple-500 to-brand-blue">
              Autonomous Intelligence.
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-slate-500 leading-relaxed font-medium"
          >
            AGZUS Technology Solutions (ATS) engineers high-performance AI engines, cloud fabrics, and cognitive software. Tailored in Pondicherry, engineered for the global frontier.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mt-2"
          >
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-900 text-white text-sm font-bold uppercase tracking-wider rounded-2xl shadow-xl shadow-slate-900/10 hover:shadow-brand-violet/25 hover:bg-brand-violet transition-all duration-300 hover:scale-[1.02]"
            >
              Get Consultation
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center px-6 py-3.5 border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-bold uppercase tracking-wider rounded-2xl transition-all"
            >
              Explore Solutions
            </Link>
          </motion.div>
        </div>

        {/* GSAP AGZUS Hero Logo - letters slide in from sides */}
        <div className="flex-1 w-full relative">
          <AGZUSHeroLogo />
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative border-y border-slate-100 bg-slate-50/40 backdrop-blur-sm py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  key={stat.id}
                  className="flex flex-col items-center lg:items-start text-center lg:text-left gap-2"
                >
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 shadow-sm flex items-center justify-center mb-1">
                    <Icon className="w-5 h-5 text-brand-violet" />
                  </div>
                  <span className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">
                    {stat.value}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    {stat.label}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Highlighted Services Section */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:py-28 lg:px-8 flex flex-col items-center gap-12">
        <div className="text-center max-w-2xl flex flex-col items-center gap-4">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-brand-violet">
            Enterprise Solutions
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">
            Our Cognitive Engineering Stack
          </h2>
          <p className="text-sm text-slate-500 font-medium">
            We operate at the convergence of raw computing infrastructure, custom logic engines, and distributed intelligence models.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {featuredServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                key={service.title}
                className={`group glass-card p-8 rounded-3xl relative overflow-hidden flex flex-col gap-6`}
              >
                {/* Glow Backdrop */}
                <div className={`absolute top-0 right-0 w-24 h-24 rounded-full filter blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 ${service.glowColor}`} />

                <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  <Icon className="w-6 h-6 text-brand-violet" />
                </div>
                
                <div className="flex flex-col gap-2.5">
                  <h3 className="text-lg font-bold text-slate-800 tracking-tight group-hover:text-brand-violet transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {service.description}
                  </p>
                </div>
                
                <Link
                  href="/services"
                  className="mt-auto inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-slate-800 group/link"
                >
                  Learn Detail
                  <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CTA Conversion Block */}
      <section className="mx-auto max-w-7xl px-6 pb-20 lg:pb-32 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-[32px] overflow-hidden border border-slate-100 bg-slate-50/40 p-12 md:p-16 flex flex-col items-center text-center gap-6"
        >
          {/* Subtle decoration dots */}
          <div className="absolute inset-0 bg-futuristic-dots opacity-40 -z-10" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] ambient-glow-violet -z-10" />

          <span className="text-xs font-bold uppercase tracking-[0.25em] text-brand-violet">
            Collaborate With Us
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight max-w-xl">
            Let's Engineer Your Cognitive Future
          </h2>
          <p className="text-sm text-slate-500 max-w-md font-medium">
            Contact our engineering pod in Puducherry to review architecture benchmarks, SLAs, and dedicated developer teams.
          </p>
          <Link
            href="/contact"
            className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-900 text-white text-sm font-bold uppercase tracking-wider rounded-2xl shadow-xl shadow-slate-900/10 hover:shadow-brand-violet/25 hover:bg-brand-violet transition-all duration-300 hover:scale-[1.02] mt-4"
          >
            Initiate Conversation
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
