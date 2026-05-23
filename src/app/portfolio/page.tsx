"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Cpu, Layers, Globe, Filter } from "lucide-react";
import PageTransition from "@/components/PageTransition";

const categories = ["All", "AI Solutions", "Cloud Infrastructures", "Web Applications"];

const projects = [
  {
    title: "Aura Cognitive Agent",
    category: "AI Solutions",
    client: "Nexon Logistics",
    metrics: "Reduced customer ticketing delay by 74%",
    description: "Built and fine-tuned a custom domain LLM using vector databases to handle real-time logistical shipping routing queries.",
    icon: Cpu,
  },
  {
    title: "Veritas Hybrid Mesh",
    category: "Cloud Infrastructures",
    client: "Core Bank Corp",
    metrics: "99.999% availability achieved",
    description: "Migrated a legacy multi-site banking ledger to a secure, private Kubernetes service mesh with zero-trust networking configurations.",
    icon: Layers,
  },
  {
    title: "Apex Trading Engine",
    category: "Web Applications",
    client: "Equities International",
    metrics: "25ms real-time chart refresh lag",
    description: "Developed a Next.js broker trade console using WebSocket connections, micro-caching layers, and reactive dashboard controls.",
    icon: Globe,
  },
  {
    title: "Helius Intelligent OCR",
    category: "AI Solutions",
    client: "Vectra Insurance",
    metrics: "99.2% extraction accuracy",
    description: "Deployed specialized convolutional neural networks for batch-scanning complex multiline PDF tables and claiming files.",
    icon: Cpu,
  },
  {
    title: "Strata Cloud Infrastructure",
    category: "Cloud Infrastructures",
    client: "Zen Retail Group",
    metrics: "Reduced hosting expenditure by 43%",
    description: "Re-engineered a global commerce system onto serverless micro-endpoints across edge cache nodes.",
    icon: Layers,
  },
  {
    title: "Synergy Enterprise Portal",
    category: "Web Applications",
    client: "Global Logistics Ltd",
    metrics: "Active users increased by 115%",
    description: "Developed an enterprise management panel incorporating real-time messaging, calendars, and file uploads.",
    icon: Globe,
  },
];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = projects.filter(
    (p) => activeCategory === "All" || p.category === activeCategory
  );

  return (
    <PageTransition variant="portfolio">
    <div className="relative overflow-hidden w-full pb-20">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-futuristic-grid opacity-[0.04] -z-10" />
      <div className="absolute top-[20%] left-[-10%] w-[400px] h-[400px] ambient-glow-violet -z-10 animate-pulse-glow" />

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-6 pt-16 pb-12 lg:px-8 text-center max-w-3xl flex flex-col items-center gap-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-100 shadow-sm">
          <span className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">
            Case Studies
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-800">
          Our Architectural{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-violet to-brand-blue">
            Deployments.
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-500 leading-relaxed font-medium">
          Explore how ATS delivers production grade, high reliability software across various sectors.
        </p>
      </section>

      {/* Filtering Category Bar */}
      <section className="mx-auto max-w-7xl px-6 py-6 lg:px-8 flex flex-wrap items-center justify-center gap-3">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 border ${
              activeCategory === cat
                ? "bg-slate-900 text-white border-slate-900 shadow-lg shadow-slate-900/10"
                : "bg-white hover:bg-slate-50 text-slate-500 border-slate-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </section>

      {/* Projects Grid */}
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => {
              const Icon = project.icon;
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  key={project.title}
                  className="group glass-card p-8 rounded-3xl flex flex-col gap-6"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-brand-violet" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      {project.client}
                    </span>
                  </div>

                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-blue">
                      {project.category}
                    </span>
                    <h3 className="text-lg font-bold text-slate-800 tracking-tight group-hover:text-brand-violet transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed mt-1">
                      {project.description}
                    </p>
                  </div>

                  {/* Impact Metric tag */}
                  <div className="mt-auto pt-6 border-t border-slate-100 flex flex-col gap-1">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">
                      Key Result
                    </span>
                    <div className="text-xs font-bold text-emerald-600 flex items-center justify-between">
                      {project.metrics}
                      <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-brand-violet group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </section>
    </div>
    </PageTransition>
  );
}
