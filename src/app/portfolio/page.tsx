"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
<<<<<<< HEAD
import {
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Zap,
  Cpu,
  Check,
  X,
  ArrowRight,
  Clock,
  ExternalLink,
  Layers,
  ShieldCheck
} from "lucide-react";
import PageTransition from "@/components/PageTransition";
import OptimizedAnimatedButton from "@/components/OptimizedAnimatedButton";
=======
import { ArrowUpRight, Cpu, Layers, Globe, Filter } from "lucide-react";
import TextRoll from "@/components/TextRollEffect";
import { ScrollEffectWrapper, ScrollEffectSection } from "@/components/ScrollEffect";
>>>>>>> aa9dd88 (scroll animations)

type Project = {
  id: number;
  index: string;
  title: string;
  sub: string;
  cat: string;
  client: string;
  year: string;
  metric: string;
  metricSub: string;
  desc: string;
  img: string;
  tech?: string[];
  challenge?: string;
  solution?: string;
  results?: string[];
};

const PROJECTS: Project[] = [
  {
    id: 1,
    index: "01",
    title: "Aura",
    sub: "Cognitive Agent",
    cat: "AI Solutions",
    client: "Nexon Logistics",
    year: "2024",
    metric: "−74%",
    metricSub: "routing delay",
    desc: "Custom domain LLM fine-tuned on logistics ontologies with vector retrieval at 40k+ queries per day.",
    img: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1600&q=90",
    tech: ["LLM", "Vector DB", "Python", "FastAPI"],
    challenge: "Optimize complex logistics routing and query handling with low latency and domain precision.",
    solution: "Trained an enterprise LLM specifically on transport network ontologies, integrated with a custom high-performance vector DB running at 40k+ requests per day.",
    results: ["74% reduction in overall routing delay", "Successfully scales over 40k+ daily queries", "Maintains 99.2% inference precision"],
  },
  {
    id: 2,
    index: "02",
    title: "Sentinel",
    sub: "Computer Vision",
    cat: "AI Solutions",
    client: "Nexon Logistics",
    year: "2024",
    metric: "+340%",
    metricSub: "anomaly detection",
    desc: "Real-time edge ML pipeline for 1000+ autonomous logistics robots with <150ms inference.",
    img: "https://images.unsplash.com/photo-1677442135107-dd01e6db1ffa?w=1600&q=90",
    tech: ["Computer Vision", "TensorFlow", "Edge ML", "CUDA"],
    challenge: "Inference delay and high compute demands for automated logistics vehicles operating concurrently on high-throughput docks.",
    solution: "Engineered a low-latency edge ML network running local CNN architectures optimized with CUDA streams, syncing metrics periodically with a central cloud hub.",
    results: ["340% increase in real-time defect / hazard detection", "Deploys on 1000+ active automated guide vehicles", "Guarantees sub-150ms latency"],
  },
  {
    id: 3,
    index: "03",
    title: "Helius",
    sub: "Intelligent OCR",
    cat: "AI Solutions",
    client: "Vectra Insurance",
    year: "2023",
    metric: "99.2%",
    metricSub: "accuracy",
    desc: "Specialized CNNs for batch-scanning complex PDF tables and insurance claim files at enterprise scale.",
    img: "https://images.unsplash.com/photo-1633265486064-086b219458ec?w=1600&q=90",
    tech: ["OCR", "CNN", "Document Processing", "AWS"],
    challenge: "High error rates and document structure drift when parsing complex multi-page financial charts and claims manually.",
    solution: "Created an intelligent optical recognition pipeline featuring advanced custom CNNs trained specifically on regional financial and insurance templates.",
    results: ["Secured 99.2% character extraction accuracy", "Processes complex nested multi-column layouts at scale", "Boosts overall claims validation velocity by 50%"],
  },
  {
    id: 4,
    index: "04",
    title: "Strata",
    sub: "Cloud Infrastructure",
    cat: "Cloud Infrastructure",
    client: "Zen Retail Group",
    year: "2023",
    metric: "−43%",
    metricSub: "infra cost",
    desc: "Global commerce re-engineered onto serverless micro-endpoints distributed across 12 edge regions.",
    img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&q=90",
    tech: ["Kubernetes", "Serverless", "AWS Lambda", "CloudFlare"],
    challenge: "Huge computing bills and network delays on database-heavy ecommerce APIs during peak global shopping seasons.",
    solution: "Deconstructed the server infrastructure into distributed micro-endpoints operating on regional serverless fabrics, leveraging global caching strategies.",
    results: ["Reduces cloud billing footprints by 43%", "Edge execution speeds lowered latency globally", "Secures a certified 99.99% active runtime uptime"],
  },
  {
    id: 5,
    index: "05",
    title: "Synergy",
    sub: "Enterprise Portal",
    cat: "Web Applications",
    client: "Global Logistics Ltd",
    year: "2022",
    metric: "+115%",
    metricSub: "user growth",
    desc: "Enterprise management panel with real-time messaging, calendars, file uploads, and granular RBAC.",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&q=90",
    tech: ["React", "Next.js", "WebSocket", "PostgreSQL"],
    challenge: "Fragmented systems for scheduling, cargo dispatch, and security logs leading to poor team performance.",
    solution: "Designed a centralized enterprise operations web panel supported by real-time WebSockets and strict role-based access configurations.",
    results: ["Achieved 115% platform engagement surge in 6 months", "Sub-100ms dashboard updates under high concurrency", "Manages 10k+ daily operational active profiles"],
  },
  {
    id: 6,
    index: "06",
    title: "Aurora",
    sub: "Data Analytics",
    cat: "Cloud Infrastructure",
    client: "Analytics Corp",
    year: "2022",
    metric: "+285%",
    metricSub: "query speed",
    desc: "Petabyte-scale analytics platform with real-time streaming pipelines and ML-powered insights.",
    img: "https://images.unsplash.com/photo-1623282033815-40b05d1c5c15?w=1600&q=90",
    tech: ["Apache Spark", "Kafka", "BigQuery", "Tableau"],
    challenge: "Processing delays and memory bottlenecks during streaming calculations over petabytes of analytical logs.",
    solution: "Designed an optimized data lake architecture utilising Kafka clusters and streaming pipelines, allowing lightning-fast query calculations.",
    results: ["Elevates analytics query processing speeds by 285%", "Processes petabytes of raw streaming datasets flawlessly", "Delivers continuous real-time system performance logs"],
  },
];

// Numeric ticker hook
function DynamicCountUp({ value }: { value: string }) {
  const [count, setCount] = useState(0);
  const isPercent = value.includes("%");
  const isPlus = value.startsWith("+");
  const isMinus = value.startsWith("−") || value.startsWith("-");
  const cleanNumber = parseFloat(value.replace(/[^0-9.]/g, "")) || 0;

  useEffect(() => {
    let start = 0;
    const duration = 1200; 
    const frames = 40;
    const stepTime = duration / frames;
    const increment = cleanNumber / frames;

    const timer = setInterval(() => {
      start += increment;
      if (start >= cleanNumber) {
        setCount(cleanNumber);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [cleanNumber]);

  const formattedCount = Number.isInteger(cleanNumber) 
    ? count.toFixed(0) 
    : count.toFixed(1);

  return (
    <span>
      {isMinus && "−"}
      {isPlus && "+"}
      {formattedCount}
      {isPercent && "%"}
    </span>
  );
}

// Fullscreen circular performance dial
function CinematicRadialDial({ value, label }: { value: string; label: string }) {
  const [offset, setOffset] = useState(251); // 2 * PI * 40 = 251.3
  const cleanNumber = Math.min(Math.max(parseFloat(value.replace(/[^0-9.]/g, "")) || 0, 0), 100);
  const radius = 40;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    const pct = cleanNumber > 100 ? 100 : cleanNumber;
    const targetOffset = circumference - (pct / 100) * circumference;
    const timer = setTimeout(() => {
      setOffset(targetOffset);
    }, 200);
    return () => clearTimeout(timer);
  }, [cleanNumber, circumference]);

  return (
    <div className="flex flex-col items-center justify-center relative w-28 h-28 shrink-0">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r={radius}
          className="stroke-white/10 fill-none"
          strokeWidth="4"
        />
        <motion.circle
          cx="50"
          cy="50"
          r={radius}
          className="stroke-white fill-none drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={circumference}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{ strokeDashoffset: offset }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-lg font-black text-white leading-none">
          {value}
        </span>
        <span className="text-[7.5px] uppercase font-bold tracking-widest text-white/50 max-w-[65px] leading-tight mt-1">
          {label}
        </span>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedProject, setExpandedProject] = useState<Project | null>(null);
  const [activeStoryTab, setActiveStoryTab] = useState<"overview" | "challenge" | "specs">("overview");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const activeProject = PROJECTS[activeIndex];

  // Mouse-reactive parallax movement for background depth
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 12, 
        y: (e.clientY / window.innerHeight - 0.5) * 12,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const nextProject = () => setActiveIndex((prev) => (prev + 1) % PROJECTS.length);
  const prevProject = () => setActiveIndex((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length);

  return (
<<<<<<< HEAD
    <PageTransition variant="portfolio">
      <div className="relative w-full h-[calc(100vh-6rem)] min-h-[600px] overflow-hidden bg-slate-950 text-white select-none">
        
        {/* ============ PARALLAX BACKGROUND STAGE ============ */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ scale: 1.05, opacity: 0 }}
              animate={{ scale: 1.02, opacity: 0.35 }}
              exit={{ scale: 1, opacity: 0 }}
              transition={{ duration: 0.9, ease: "easeInOut" }}
              style={{
                x: mousePos.x,
                y: mousePos.y,
              }}
              className="absolute inset-0 w-full h-full"
            >
              <img
                src={activeProject.img}
                alt={activeProject.title}
                className="w-full h-full object-cover filter blur-[2px] saturate-75"
              />
            </motion.div>
          </AnimatePresence>
          {/* Dense, moody corporate dark vignette overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/50" />
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-slate-950/50 to-slate-950" />
          <div className="absolute inset-0 bg-futuristic-grid opacity-10" />
        </div>

        {/* ============ OVERLAY CONTROL INTERFACE ============ */}
        <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-6 sm:px-8 flex flex-col justify-between py-12">
          
          {/* Top Board: Header Metadata */}
          <div className="flex justify-between items-start pt-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 border border-white/10 rounded-full text-[9px] font-extrabold uppercase tracking-widest text-white">
                <Sparkles className="w-3 h-3 text-amber-300" />
                <span>Operational Showcase</span>
              </div>
              <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest pl-1 mt-1">
                engineered for global frontier
              </p>
            </div>
            
            {/* Project Index indicator */}
            <div className="text-right">
              <span className="text-4xl font-black text-white/20 tracking-tight leading-none">
                {activeProject.index}
              </span>
              <span className="text-xs font-bold text-white/50 block leading-none">
                / {PROJECTS.length}
              </span>
            </div>
          </div>
=======
    <ScrollEffectWrapper>
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
          <TextRoll center className="text-4xl sm:text-5xl font-black tracking-tight text-slate-800">
            Our Architectural
          </TextRoll>
          {" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-violet to-brand-blue">
            <TextRoll center className="text-4xl sm:text-5xl font-black tracking-tight">
              Deployments.
            </TextRoll>
          </span>
        </h1>
>>>>>>> aa9dd88 (scroll animations)

          {/* Middle Board: Story Info Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center my-auto">
            {/* Left Column: Project Identity */}
            <div className="lg:col-span-2 space-y-6">
              <div className="space-y-2">
                <motion.p
                  key={`cat-${activeIndex}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs uppercase font-extrabold tracking-[0.3em] text-white/60"
                >
                  SYSTEM CATEGORY &bull; {activeProject.cat}
                </motion.p>
                
                <AnimatePresence mode="wait">
                  <motion.h1
                    key={`title-${activeIndex}`}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 30 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="text-6xl sm:text-7xl font-black uppercase tracking-tighter leading-none"
                  >
                    {activeProject.title}
                  </motion.h1>
                </AnimatePresence>
                
                <motion.p
                  key={`sub-${activeIndex}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xl text-white/70 font-light"
                >
                  {activeProject.sub}
                </motion.p>
              </div>

              <AnimatePresence mode="wait">
                <motion.p
                  key={`desc-${activeIndex}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-white/60 text-sm sm:text-base leading-relaxed max-w-xl font-medium"
                >
                  {activeProject.desc}
                </motion.p>
              </AnimatePresence>

              {/* Specs & modules */}
              <div className="flex flex-wrap gap-2 pt-2">
                {activeProject.tech?.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 bg-white/5 border border-white/10 hover:bg-white/10 text-white/80 text-[10px] font-extrabold uppercase tracking-widest rounded-lg shadow-sm"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Column: Performance Badge metrics */}
            <div className="flex flex-col items-start lg:items-end justify-center">
              <motion.div
                key={`metric-card-${activeIndex}`}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4 max-w-xs w-full shadow-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full filter blur-2xl pointer-events-none" />
                
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
                      <DynamicCountUp value={activeProject.metric} />
                    </h3>
                    <p className="text-[10px] uppercase font-black tracking-widest text-white/50 mt-1">
                      {activeProject.metricSub}
                    </p>
                  </div>
                  <Zap className="w-5 h-5 text-white animate-pulse" />
                </div>
                
                <p className="text-[10px] text-white/40 leading-relaxed font-semibold">
                  Guaranteed operational enhancements recorded across production streams.
                </p>

                <div className="border-t border-white/10 pt-4 flex justify-between items-center text-[10px] font-bold text-white/60 uppercase">
                  <span>STAMP YEAR</span>
                  <span>{activeProject.year}</span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Bottom Board: Deck Paginator timeline & controls */}
          <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6">
            
            {/* Typographic Timeline pagination */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 max-w-3xl items-center">
              {PROJECTS.map((proj, i) => (
                <button
                  key={proj.id}
                  id={`paginator-timeline-btn-${proj.id}`}
                  onClick={() => setActiveIndex(i)}
                  className={`relative text-xs font-black uppercase tracking-widest py-1 transition-all cursor-none ${
                    activeIndex === i ? "text-white" : "text-white/35 hover:text-white/60"
                  }`}
                >
                  <span className="mr-1.5 text-[9px] opacity-50">{proj.index}</span>
                  <span>{proj.title}</span>
                  {activeIndex === i && (
                    <motion.div
                      layoutId="activeTimelineUnderline"
                      className="absolute bottom-0 inset-x-0 h-0.5 bg-white rounded-full"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Slider magnetic arrows & discover triggers */}
            <div className="flex items-center justify-between md:justify-end gap-6">
              <div className="flex gap-2">
                <motion.button
                  id="cine-prev"
                  onClick={prevProject}
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)" }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 bg-white/5 border border-white/10 hover:border-white/20 text-white rounded-full shadow-lg cursor-none"
                >
                  <ChevronLeft className="w-4 h-4" />
                </motion.button>
                <motion.button
                  id="cine-next"
                  onClick={nextProject}
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)" }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 bg-white/5 border border-white/10 hover:border-white/20 text-white rounded-full shadow-lg cursor-none"
                >
                  <ChevronRight className="w-4 h-4" />
                </motion.button>
              </div>

              <motion.button
                id={`discover-story-btn-${activeProject.id}`}
                onClick={() => {
                  setExpandedProject(activeProject);
                  setActiveStoryTab("overview");
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-6 py-3.5 bg-white hover:bg-slate-100 text-slate-900 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg hover:shadow-2xl transition-all cursor-none flex items-center gap-2"
              >
                DISCOVER STORY
                <ArrowRight className="w-4 h-4 text-slate-900" />
              </motion.button>
            </div>

          </div>

        </div>

        {/* ============ FULLSCREEN STORYTELLER DETAILED OVERLAY ============ */}
        <AnimatePresence>
          {expandedProject && (
            <motion.div
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 180 }}
              className="fixed inset-0 z-50 overflow-y-auto bg-slate-950 flex items-center justify-center p-4 sm:p-6 text-white"
            >
              <div className="absolute inset-0 bg-premium-base opacity-5 pointer-events-none" />
              <div className="absolute inset-0 bg-radial-gradient from-transparent via-slate-950 to-slate-950 pointer-events-none" />

              {/* Close trigger button */}
              <motion.button
                id="cine-close-modal"
                onClick={() => setExpandedProject(null)}
                whileHover={{ rotate: 90, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-6 right-6 z-30 p-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-full shadow-lg cursor-none"
              >
                <X className="w-4 h-4" />
              </motion.button>

              {/* Content Panel Frame */}
              <div className="relative max-w-5xl w-full flex flex-col md:flex-row bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-[36px] overflow-hidden shadow-2xl z-10 max-h-[90vh] md:max-h-none">
                
                {/* Left Panel: High Res Graphic */}
                <div className="w-full md:w-[42%] h-[200px] md:h-auto relative min-h-[250px] md:min-h-none overflow-hidden border-b md:border-b-0 md:border-r border-white/10 rounded-t-[36px] md:rounded-t-none md:rounded-l-[36px]">
                  <img
                    src={expandedProject.img}
                    alt={expandedProject.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-slate-950 via-slate-950/40 to-transparent pointer-events-none" />

                  {/* Telemetry data info stamp */}
                  <div className="absolute bottom-8 left-8 text-white space-y-1.5">
                    <p className="text-[9px] font-black uppercase tracking-[0.25em] text-white/70">
                      SYSTEM PROTOCOL: {expandedProject.index}
                    </p>
                    <h2 className="text-4xl font-black uppercase tracking-tight">
                      {expandedProject.title}
                    </h2>
                    <p className="text-xs font-semibold text-white/80">
                      {expandedProject.sub}
                    </p>
                  </div>
<<<<<<< HEAD
                </div>

                {/* Right Panel: Project Narratives */}
                <div className="flex-1 p-6 sm:p-10 flex flex-col justify-between overflow-y-auto max-h-[55vh] md:max-h-[80vh]">
                  <div>
                    {/* Immersive Tabs selectors */}
                    <div className="flex border-b border-white/10 pb-3 mb-6 gap-6">
                      {[
                        { id: "overview", label: "OVERVIEW" },
                        { id: "challenge", label: "CHALLENGE" },
                        { id: "specs", label: "DEPLOYED SPECS" },
                      ].map((tab) => (
                        <button
                          key={tab.id}
                          id={`cine-tab-${tab.id}`}
                          onClick={() => setActiveStoryTab(tab.id as any)}
                          className={`relative text-xs font-black uppercase tracking-widest pb-1 transition-all cursor-none ${
                            activeStoryTab === tab.id ? "text-white" : "text-white/40 hover:text-white/60"
                          }`}
                        >
                          {activeStoryTab === tab.id && (
                            <motion.div
                              layoutId="activeStoryTabLine"
                              className="absolute bottom-0 inset-x-0 h-0.5 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.4)]"
                            />
                          )}
                          <span>{tab.label}</span>
                        </button>
                      ))}
                    </div>

                    {/* Tab contents render */}
                    <AnimatePresence mode="wait">
                      {activeStoryTab === "overview" && (
                        <motion.div
                          key="cine-overview"
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="space-y-6"
                        >
                          <div className="space-y-2">
                            <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-white/50">
                              SYSTEM OVERVIEW
                            </h4>
                            <p className="text-white/70 text-sm leading-relaxed font-medium">
                              {expandedProject.desc}
                            </p>
                          </div>

                          <div className="space-y-3">
                            <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-white/50">
                              DEPLOYED ACHIEVEMENTS
                            </h4>
                            <ul className="space-y-2.5">
                              {expandedProject.results?.map((res, i) => (
                                <li key={i} className="flex gap-3 text-xs text-white/70 font-semibold items-start">
                                  <div className="p-1 bg-white/5 border border-white/10 rounded-lg text-white mt-0.5 shrink-0">
                                    <Check className="w-3 h-3 stroke-[3]" />
                                  </div>
                                  <span>{res}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}

                      {activeStoryTab === "challenge" && (
                        <motion.div
                          key="cine-challenge"
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="space-y-6"
                        >
                          <div className="space-y-2">
                            <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-rose-400">
                              THE CORE CHALLENGE
                            </h4>
                            <p className="text-white/70 text-sm leading-relaxed font-medium">
                              {expandedProject.challenge || "Optimizing legacy system bottlenecks and scaling real-time throughput safely across multi-region configurations."}
                            </p>
                          </div>

                          <div className="space-y-2">
                            <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400">
                              ENGINEERED SOLUTION
                            </h4>
                            <p className="text-white/70 text-sm leading-relaxed font-medium">
                              {expandedProject.solution || "Decompiled architectural structures and implemented high-frequency serverless endpoints leveraging custom machine logic models."}
                            </p>
                          </div>
                        </motion.div>
                      )}

                      {activeStoryTab === "specs" && (
                        <motion.div
                          key="cine-specs"
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="space-y-6"
                        >
                          <div className="grid grid-cols-2 gap-4">
                            {[
                              { label: "CONTRACTED CLIENT", value: expandedProject.client },
                              { label: "DEPLOYED FISCAL YEAR", value: expandedProject.year },
                              { label: "SYSTEM DOMAIN", value: expandedProject.cat },
                              { label: "CORE TELEMETRY", value: expandedProject.metricSub },
                            ].map((spec, i) => (
                              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-3.5 shadow-sm">
                                <p className="text-[9.5px] uppercase font-bold text-white/40 tracking-wider">
                                  {spec.label}
                                </p>
                                <p className="text-white font-extrabold text-xs mt-1">
                                  {spec.value}
                                </p>
                              </div>
                            ))}
                          </div>

                          <div className="space-y-3">
                            <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-white/50">
                              CORE INFRASTRUCTURE MODULES
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {expandedProject.tech?.map((t) => (
                                <span
                                  key={t}
                                  className="px-3 py-1 bg-white/5 border border-white/10 text-white/90 text-xs font-bold rounded-xl shadow-sm cursor-default"
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Modal action CTA deck footer */}
                  <div className="flex flex-wrap items-center justify-between border-t border-white/10 pt-6 mt-8 gap-4">
                    <div className="flex items-center gap-4">
                      <CinematicRadialDial value={expandedProject.metric} label={expandedProject.metricSub} />
                    </div>

                    <Link href="/contact" className="cursor-none" onClick={() => setExpandedProject(null)}>
                      <OptimizedAnimatedButton variant="ghost" size="md" glowEffect className="cursor-none text-xs font-bold bg-white text-slate-900 border border-white">
                        INITIATE DEPLOYMENT AUDIT
                        <ArrowRight className="w-3.5 h-3.5 ml-1.5 text-slate-900" />
                      </OptimizedAnimatedButton>
                    </Link>
                  </div>
                </div>

              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </PageTransition>
=======
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Scroll Effect Section - Impact Showcase */}
      <ScrollEffectSection
        content={["Transforming", "Industries", "Globally"]}
        variant="v1"
        title="Our Collective Impact"
        subtitle="250+ successful deployments across sectors"
        height="h-[120vh]"
        backgroundColor="bg-white"
        textColor="text-slate-700"
        textClassName="text-4xl font-bold uppercase tracking-tighter"
        containerClassName="-mt-12"
      />
    </div>
    </ScrollEffectWrapper>
>>>>>>> aa9dd88 (scroll animations)
  );
}
