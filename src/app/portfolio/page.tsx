"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ChevronRight, ChevronLeft, Sparkles, Zap, Code, BarChart3, Users, Clock } from "lucide-react";

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
    index: "001",
    title: "Aura",
    sub: "Cognitive Agent",
    cat: "AI Solutions",
    client: "Nexon Logistics",
    year: "2024",
    metric: "−74%",
    metricSub: "routing delay",
    desc: "Custom domain LLM fine-tuned on logistics ontologies with vector retrieval at 40k+ queries per day.",
    img: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&q=90",
    tech: ["LLM", "Vector DB", "Python", "FastAPI"],
    challenge: "Optimize logistics routing with AI",
    solution: "Built custom LLM trained on domain-specific ontologies",
    results: ["74% reduction in routing delay", "40k+ queries/day capacity", "99.2% accuracy"],
  },
  {
    id: 2,
    index: "002",
    title: "Sentinel",
    sub: "Computer Vision",
    cat: "AI Solutions",
    client: "Nexon Logistics",
    year: "2024",
    metric: "+340%",
    metricSub: "anomaly detection",
    desc: "Real-time edge ML pipeline for 1000+ autonomous logistics robots with <150ms inference.",
    img: "https://images.unsplash.com/photo-1677442135107-dd01e6db1ffa?w=1200&q=90",
    tech: ["Computer Vision", "TensorFlow", "Edge ML", "CUDA"],
    challenge: "Real-time anomaly detection on edge devices",
    solution: "Optimized CNN model for sub-150ms inference",
    results: ["340% improvement in detection", "1000+ robots monitored", "<150ms latency"],
  },
  {
    id: 3,
    index: "003",
    title: "Helius",
    sub: "Intelligent OCR",
    cat: "AI Solutions",
    client: "Vectra Insurance",
    year: "2023",
    metric: "99.2%",
    metricSub: "accuracy",
    desc: "Specialized CNNs for batch-scanning complex PDF tables and insurance claim files at enterprise scale.",
    img: "https://images.unsplash.com/photo-1633265486064-086b219458ec?w=1200&q=90",
    tech: ["OCR", "CNN", "Document Processing", "AWS"],
    challenge: "Extract data from complex PDF documents",
    solution: "Specialized CNN trained on insurance documents",
    results: ["99.2% extraction accuracy", "Enterprise-scale processing", "50% faster claims"],
  },
  {
    id: 4,
    index: "004",
    title: "Strata",
    sub: "Cloud Infrastructure",
    cat: "Cloud Infrastructure",
    client: "Zen Retail Group",
    year: "2023",
    metric: "−43%",
    metricSub: "infra cost",
    desc: "Global commerce re-engineered onto serverless micro-endpoints distributed across 12 edge regions.",
    img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=90",
    tech: ["Kubernetes", "Serverless", "AWS Lambda", "CloudFlare"],
    challenge: "Reduce infrastructure costs for global platform",
    solution: "Migrated to serverless architecture across 12 regions",
    results: ["43% cost reduction", "12 edge regions", "99.99% uptime"],
  },
  {
    id: 5,
    index: "005",
    title: "Synergy",
    sub: "Enterprise Portal",
    cat: "Web Applications",
    client: "Global Logistics Ltd",
    year: "2022",
    metric: "+115%",
    metricSub: "user growth",
    desc: "Enterprise management panel with real-time messaging, calendars, file uploads, and granular RBAC.",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=90",
    tech: ["React", "Next.js", "WebSocket", "PostgreSQL"],
    challenge: "Build scalable enterprise portal",
    solution: "Modern React with real-time WebSocket updates",
    results: ["115% user growth", "Sub-100ms latency", "10k+ daily active users"],
  },
  {
    id: 6,
    index: "006",
    title: "Aurora",
    sub: "Data Analytics",
    cat: "Cloud Infrastructure",
    client: "Analytics Corp",
    year: "2022",
    metric: "+285%",
    metricSub: "query speed",
    desc: "Petabyte-scale analytics platform with real-time streaming pipelines and ML-powered insights.",
    img: "https://images.unsplash.com/photo-1623282033815-40b05d1c5c15?w=1200&q=90",
    tech: ["Apache Spark", "Kafka", "BigQuery", "Tableau"],
    challenge: "Process petabyte-scale data in real-time",
    solution: "Built streaming pipeline with Spark + Kafka",
    results: ["285% query speed improvement", "Petabyte-scale processing", "Real-time insights"],
  },
];

const CATS = ["All", "AI Solutions", "Cloud Infrastructure", "Web Applications"];

export default function Portfolio() {
  const [filter, setFilter] = useState("All");
  const [featured, setFeatured] = useState(0);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.3]);

  const filtered = filter === "All" ? PROJECTS : PROJECTS.filter(p => p.cat === filter);
  const featuredProject = PROJECTS[featured];

  const nextFeatured = () => setFeatured((prev) => (prev + 1) % PROJECTS.length);
  const prevFeatured = () => setFeatured((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length);

  return (
    <>
      <style>{`
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(0, 0, 0, 0.1); }
          50% { box-shadow: 0 0 40px rgba(0, 0, 0, 0.2); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .glow-effect {
          animation: glow 3s ease-in-out infinite;
        }
      `}</style>

      {/* ============ FEATURED PROJECT SHOWCASE ============ */}
      <motion.section
        ref={containerRef}
        className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white pt-24 pb-20"
      >
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-40 -right-40 w-96 h-96 bg-gray-100 rounded-full blur-3xl opacity-30"
            animate={{ y: [0, 40, 0], x: [0, 20, 0] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-40 -left-40 w-96 h-96 bg-gray-100 rounded-full blur-3xl opacity-30"
            animate={{ y: [0, -40, 0], x: [0, -20, 0] }}
            transition={{ duration: 12, repeat: Infinity, delay: 1 }}
          />
        </div>

        {/* Content Container */}
        <motion.div className="relative z-10 w-full max-w-7xl px-8 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Featured Project Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full"
            >
              <Sparkles className="w-4 h-4 text-gray-700" />
              <span className="text-sm font-medium text-gray-700">Featured Project</span>
            </motion.div>

            {/* Project Index & Category */}
            <div className="space-y-2">
              <motion.p
                key={`index-${featured}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm font-bold uppercase tracking-widest text-gray-500"
              >
                {featuredProject.index} • {featuredProject.cat}
              </motion.p>
              <motion.h1
                key={`title-${featured}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-6xl md:text-7xl font-bold tracking-tight text-black leading-tight"
              >
                {featuredProject.title}
              </motion.h1>
              <motion.p
                key={`sub-${featured}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-2xl text-gray-600 font-light"
              >
                {featuredProject.sub}
              </motion.p>
            </div>

            {/* Description */}
            <motion.p
              key={`desc-${featured}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-lg text-gray-600 leading-relaxed max-w-lg"
            >
              {featuredProject.desc}
            </motion.p>

            {/* Key Metrics */}
            <motion.div
              key={`metrics-${featured}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-2 gap-6 pt-4"
            >
              <div className="border-l-2 border-gray-300 pl-6">
                <p className="text-4xl font-bold text-black mb-1">{featuredProject.metric}</p>
                <p className="text-sm text-gray-600 uppercase tracking-wider">{featuredProject.metricSub}</p>
              </div>
              <div className="border-l-2 border-gray-300 pl-6">
                <p className="text-2xl font-bold text-black mb-1">{featuredProject.year}</p>
                <p className="text-sm text-gray-600 uppercase tracking-wider">Year Completed</p>
              </div>
            </motion.div>

            {/* Tech Stack */}
            {featuredProject.tech && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap gap-2 pt-4"
              >
                {featuredProject.tech.map((tech, idx) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + idx * 0.05 }}
                    className="px-3 py-1 bg-black text-white text-xs font-semibold rounded-full"
                  >
                    {tech}
                  </motion.span>
                ))}
              </motion.div>
            )}

            {/* Navigation Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex gap-4 pt-6"
            >
              <motion.button
                onClick={prevFeatured}
                whileHover={{ scale: 1.08, backgroundColor: "#000" }}
                whileTap={{ scale: 0.95 }}
                className="p-4 rounded-full bg-gray-100 hover:bg-black text-black hover:text-white transition-all duration-300"
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>
              <motion.button
                onClick={nextFeatured}
                whileHover={{ scale: 1.08, backgroundColor: "#000" }}
                whileTap={{ scale: 0.95 }}
                className="p-4 rounded-full bg-gray-100 hover:bg-black text-black hover:text-white transition-all duration-300"
              >
                <ChevronRight className="w-5 h-5" />
              </motion.button>
              <Link href="/contact" className="ml-auto">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  suppressHydrationWarning
                  className="px-8 py-4 bg-black text-white rounded-full font-bold text-sm uppercase tracking-wider hover:shadow-2xl transition-all duration-300"
                >
                  Learn More
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right: Featured Image Carousel */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative h-96 lg:h-[500px]"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={featured}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 rounded-3xl overflow-hidden"
              >
                <img
                  src={featuredProject.img}
                  alt={featuredProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </motion.div>
            </AnimatePresence>

            {/* Project Counter */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute bottom-6 left-6 z-20 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-sm font-semibold text-black"
            >
              {featured + 1} / {PROJECTS.length}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center text-gray-500"
        >
          <svg className="w-5 h-5 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
          <span className="text-xs uppercase tracking-wider">Scroll to explore</span>
        </motion.div>
      </motion.section>

      {/* ============ STATS SECTION ============ */}
      <motion.section className="relative py-24 px-8 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
          {[
            { icon: BarChart3, label: "Projects Completed", value: "50+" },
            { icon: Users, label: "Satisfied Clients", value: "30+" },
            { icon: Zap, label: "Performance Gain", value: "285%" },
            { icon: Clock, label: "Years Experience", value: "5+" },
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: idx * 0.1 }}
                className="text-center group"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="inline-block p-4 bg-gray-50 rounded-2xl mb-4 group-hover:bg-black transition-colors duration-300"
                >
                  <Icon className="w-8 h-8 text-black group-hover:text-white transition-colors duration-300" />
                </motion.div>
                <h3 className="text-4xl font-bold text-black mb-2">{stat.value}</h3>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* ============ FILTER & GRID ============ */}
      <motion.section className="relative py-24 px-8 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          {/* Filter Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-3 mb-20"
          >
            {CATS.map((cat, idx) => (
              <motion.button
                key={cat}
                onClick={() => setFilter(cat)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className={`px-6 py-3 rounded-full font-semibold text-sm uppercase tracking-wider transition-all duration-300 ${
                  filter === cat
                    ? "bg-black text-white shadow-xl"
                    : "bg-white text-gray-700 border border-gray-300 hover:border-gray-500"
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, idx) => (
                <motion.div
                  key={`${filter}-${project.id}`}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  onClick={() => setExpandedId(expandedId === project.id ? null : project.id)}
                  className="group cursor-pointer"
                >
                  <motion.div
                    whileHover={{ y: -8 }}
                    className="relative h-96 rounded-2xl overflow-hidden bg-gray-100 border border-gray-200 hover:border-gray-400 transition-all duration-300 glow-effect"
                  >
                    {/* Image */}
                    <motion.img
                      src={project.img}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />

                    {/* Gradient Overlays */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"
                      animate={{
                        opacity: expandedId === project.id ? 1 : 0.6,
                      }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Content */}
                    <motion.div
                      className="absolute inset-0 flex flex-col justify-between p-6 text-white"
                      initial={false}
                    >
                      {/* Top Info */}
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-between items-start"
                      >
                        <div>
                          <p className="text-xs font-bold uppercase tracking-widest opacity-70">
                            {project.index} • {project.cat}
                          </p>
                          <p className="text-xs opacity-60 mt-1">{project.year}</p>
                        </div>
                        <motion.div
                          animate={{ rotate: expandedId === project.id ? 90 : 0, scale: expandedId === project.id ? 1.2 : 1 }}
                          className="opacity-70"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </motion.div>
                      </motion.div>

                      {/* Bottom Info */}
                      <motion.div>
                        <h3 className="text-3xl font-bold mb-1 leading-tight">{project.title}</h3>
                        <p className="text-sm opacity-90 font-medium mb-4">{project.sub}</p>

                        {/* Expanded Details */}
                        <AnimatePresence>
                          {expandedId === project.id && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="mb-6 space-y-4"
                            >
                              <p className="text-sm leading-relaxed opacity-90">{project.desc}</p>
                              {project.tech && (
                                <div className="flex flex-wrap gap-2">
                                  {project.tech.slice(0, 3).map((t) => (
                                    <span key={t} className="text-xs px-2 py-1 bg-white/20 rounded-full">
                                      {t}
                                    </span>
                                  ))}
                                </div>
                              )}
                              <div className="grid grid-cols-2 gap-3 text-xs opacity-80 pt-2">
                                <div>
                                  <p className="opacity-60 uppercase mb-1">Client</p>
                                  <p className="font-semibold">{project.client}</p>
                                </div>
                                <div>
                                  <p className="opacity-60 uppercase mb-1">Result</p>
                                  <p className="font-semibold">{project.metric}</p>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Metric Badge */}
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-bold">{project.metric}</span>
                          <span className="text-xs opacity-70">{project.metricSub}</span>
                        </div>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </motion.section>

      {/* ============ CTA SECTION ============ */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative py-40 px-8 bg-black overflow-hidden text-white text-center"
      >
        {/* Background Animation */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-white/5 to-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-6xl md:text-7xl font-bold mb-6 leading-tight"
          >
            Ready to Transform
            <br />
            <span className="text-transparent bg-gradient-to-r from-white via-gray-400 to-white bg-clip-text">
              Your Vision?
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-400 mb-12 max-w-xl mx-auto leading-relaxed"
          >
            Join 30+ enterprises that trust us to deliver exceptional solutions. Let's build something extraordinary together.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "#fff", color: "#000" }}
                whileTap={{ scale: 0.95 }}
                suppressHydrationWarning
                className="px-10 py-4 bg-white text-black rounded-full font-bold uppercase tracking-wider transition-all duration-300 shadow-2xl"
              >
                Start Your Project
              </motion.button>
            </Link>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                whileTap={{ scale: 0.95 }}
                suppressHydrationWarning
                className="px-10 py-4 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-full font-bold uppercase tracking-wider transition-all duration-300"
              >
                Schedule Call
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </>
  );
}
