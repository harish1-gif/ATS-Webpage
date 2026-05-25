"use client";

import { motion } from "framer-motion";
import { Compass, Users, Milestone, Target, Heart } from "lucide-react";
import Image from "next/image";
<<<<<<< HEAD
import PageTransition from "@/components/PageTransition";
import AnimatedTextConverge from "@/components/AnimatedTextConverge";
=======
import TextRoll from "@/components/TextRollEffect";
>>>>>>> aa9dd88 (scroll animations)

const values = [
  {
    name: "Autonomous Innovation",
    description: "We don't react to tech shifts; we engineer them. Our R&D division focuses entirely on custom AI and serverless pipelines.",
    icon: Compass,
  },
  {
    name: "Client Integration",
    description: "We act as an extension of your technical team, offering full transparency through our secure Client Dashboard.",
    icon: Users,
  },
  {
    name: "Zero-Trust Engineering",
    description: "Every product we ship is designed with enterprise-level security, role-based authentication, and encryption at rest.",
    icon: Target,
  },
];

const leaders = [
  {
    name: "Dr. Anbarasan Sundaram",
    role: "Chief Executive Officer & Founder",
    bio: "Ex-Silicon Valley AI Architect. Leading the technological vision from Pondicherry.",
    initials: "AS",
  },
  {
    name: "Deepika Ramakrishnan",
    role: "Chief Operating Officer",
    bio: "Operations specialist with 12+ years optimizing scale, client integrations, and SLAs.",
    initials: "DR",
  },
  {
    name: "Karthik Raja",
    role: "VP of Enterprise Cloud Infrastructure",
    bio: "Certified AWS/Kubernetes veteran. Architecting highly resilient system backbones.",
    initials: "KR",
  },
];

export default function About() {
  return (
    <div className="relative overflow-hidden w-full pb-20">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-futuristic-grid opacity-[0.04] -z-10" />
      <div className="absolute top-[20%] right-[-10%] w-[450px] h-[450px] ambient-glow-violet -z-10 animate-pulse-glow" />

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-6 pt-16 pb-12 lg:px-8 text-center max-w-3xl flex flex-col items-center gap-6">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-100 shadow-sm"
        >
          <span className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">
            <AnimatedTextConverge duration={0.6} delay={0}>
              Our Enterprise Identity
            </AnimatedTextConverge>
          </span>
        </motion.div>

<<<<<<< HEAD
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-800">
          <AnimatedTextConverge 
            duration={0.8} 
            delay={0.1}
            highlightWords={["Pondicherry"]}
          >
            Pioneering AI & Cloud Innovations from Pondicherry
          </AnimatedTextConverge>
        </h1>
=======
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl font-black tracking-tight text-slate-800"
        >
          <TextRoll center className="text-4xl sm:text-5xl font-black tracking-tight text-slate-800">
            Pioneering
          </TextRoll>
          {" "}
          <TextRoll center className="text-4xl sm:text-5xl font-black tracking-tight text-slate-800">
            AI & Cloud
          </TextRoll>
          {" "}
          <TextRoll center className="text-4xl sm:text-5xl font-black tracking-tight text-slate-800">
            Innovations
          </TextRoll>
          {" "}from{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-violet to-brand-blue">
            <TextRoll center className="text-4xl sm:text-5xl font-black tracking-tight">
              Pondicherry
            </TextRoll>
          </span>
        </motion.h1>
>>>>>>> aa9dd88 (scroll animations)

        <div className="text-base sm:text-lg text-slate-500 leading-relaxed font-medium">
          <AnimatedTextConverge duration={0.8} delay={0.3}>
            AGZUS Technology Solutions (ATS) was established to build premium digital products, bridging Silicon Valley standards with India's premier technical talent pool.
          </AnimatedTextConverge>
        </div>
      </section>

      {/* Pondicherry Office Spotlight */}
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="relative rounded-[32px] overflow-hidden border border-slate-100 bg-slate-50/50 p-8 md:p-12 lg:p-16 flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 flex flex-col gap-6 items-start">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-brand-violet">
              <AnimatedTextConverge duration={0.6} delay={0.4}>
                Regional Center of Excellence
              </AnimatedTextConverge>
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
              <AnimatedTextConverge duration={0.7} delay={0.5} highlightWords={["Pondicherry"]}>
                Located in Pondicherry, Puducherry
              </AnimatedTextConverge>
            </h2>
            <div className="text-sm text-slate-500 leading-relaxed font-medium">
              <AnimatedTextConverge duration={0.8} delay={0.6}>
                Nestled along the beautiful coastline of southern India, our Pondicherry headquarters houses our core engineering divisions. We draw on talent from premier institutions nearby to engineer global software.
              </AnimatedTextConverge>
            </div>
            <div className="flex gap-8 text-slate-800">
              <div>
                <h4 className="text-2xl font-black text-brand-violet">50+</h4>
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mt-1">
                  Engineers on site
                </p>
              </div>
              <div className="w-px bg-slate-200" />
              <div>
                <h4 className="text-2xl font-black text-brand-blue">24/7</h4>
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mt-1">
                  Global Monitoring
                </p>
              </div>
            </div>
          </div>
          <div className="flex-1 w-full relative h-[300px] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 flex items-center justify-center">
            {/* Visual placeholder representing modern architectural lab */}
            <div className="absolute inset-0 bg-futuristic-dots opacity-40" />
            <div className="w-48 h-48 rounded-full bg-brand-violet/5 animate-pulse flex items-center justify-center">
              <div className="w-32 h-32 rounded-full bg-brand-blue/5 flex items-center justify-center">
                <Milestone className="w-10 h-10 text-brand-violet" />
              </div>
            </div>
            <div className="absolute bottom-4 left-4 right-4 py-3 px-4 glass-panel bg-white/95 rounded-xl text-center text-xs font-bold text-slate-700 shadow-md">
              ATS Puducherry HQ • Rue de la Marine
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8 flex flex-col gap-12">
        <div className="text-center max-w-xl mx-auto flex flex-col gap-3">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
            <AnimatedTextConverge duration={0.7} delay={0.7}>
              Our Core Principles
            </AnimatedTextConverge>
          </h2>
          <p className="text-sm text-slate-500 font-medium">
            <AnimatedTextConverge duration={0.8} delay={0.8}>
              How we write code, handle infrastructure, and communicate with partners.
            </AnimatedTextConverge>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((val) => {
            const Icon = val.icon;
            return (
              <div key={val.name} className="glass-card p-8 rounded-3xl flex flex-col gap-5">
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-brand-violet" />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg font-bold text-slate-800 tracking-tight">
                    <AnimatedTextConverge duration={0.6} delay={0.9}>
                      {val.name}
                    </AnimatedTextConverge>
                  </h3>
                  <div className="text-sm text-slate-500 leading-relaxed">
                    <AnimatedTextConverge duration={0.7} delay={1.0}>
                      {val.description}
                    </AnimatedTextConverge>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Leadership Section */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8 flex flex-col gap-12">
        <div className="text-center max-w-xl mx-auto flex flex-col gap-3">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
            <AnimatedTextConverge duration={0.7} delay={1.1}>
              Executive Council
            </AnimatedTextConverge>
          </h2>
          <p className="text-sm text-slate-500 font-medium">
            <AnimatedTextConverge duration={0.8} delay={1.2}>
              Meet the engineers and directors shaping ATS.
            </AnimatedTextConverge>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {leaders.map((leader) => (
            <div key={leader.name} className="group glass-card p-8 rounded-3xl flex flex-col gap-6 text-left">
              {/* Profile icon circle placeholder */}
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-violet/10 to-brand-blue/10 flex items-center justify-center text-xl font-extrabold text-brand-violet group-hover:scale-105 transition-transform duration-300">
                {leader.initials}
              </div>
              <div className="flex flex-col gap-1.5">
                <h3 className="text-lg font-bold text-slate-800 tracking-tight group-hover:text-brand-violet transition-colors">
                  <AnimatedTextConverge duration={0.6} delay={1.3}>
                    {leader.name}
                  </AnimatedTextConverge>
                </h3>
                <div className="text-xs uppercase font-bold text-brand-blue tracking-wider">
                  <AnimatedTextConverge duration={0.6} delay={1.4}>
                    {leader.role}
                  </AnimatedTextConverge>
                </div>
                <div className="text-sm text-slate-500 leading-relaxed mt-2">
                  <AnimatedTextConverge duration={0.7} delay={1.5}>
                    {leader.bio}
                  </AnimatedTextConverge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
