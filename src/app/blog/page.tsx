"use client";

import { useState } from "react";
import { Search, Calendar, User, ArrowRight, Cpu, Layers, Globe, X } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";

const blogPosts = [
  {
    title: "Fine-Tuning LLMs on Proprietary Data: The RAG Architectures",
    description: "Reviewing the vector databases, token chunking rules, and retrieval mechanisms required to feed context windows safely without security leakage.",
    category: "AI & ML",
    date: "May 18, 2026",
    author: "Dr. Anbarasan Sundaram",
    readTime: "8 min read",
    icon: Cpu,
  },
  {
    title: "Migrating to Multi-Region PostgreSQL Fabrics: Lessons from Scale",
    description: "Evaluating database replication delays, read-replicas configuration, connection pooling with pgBouncer, and how Supabase manages cloud failovers.",
    category: "Cloud Ops",
    date: "April 29, 2026",
    author: "Karthik Raja",
    readTime: "12 min read",
    icon: Layers,
  },
  {
    title: "Securing Kubernetes Service Meshes with Zero-Trust Policies",
    description: "Configuring mutual TLS (mTLS), SPIFFE identities, network policies, and verifying container images before scheduled pod deployments.",
    category: "Security",
    date: "March 15, 2026",
    author: "Karthik Raja",
    readTime: "9 min read",
    icon: Layers,
  },
  {
    title: "Next.js 16/React Server Components: Dynamic Cache Optimization",
    description: "A complete guide to configuring revalidation tokens, edge computing caching, and pre-rendering server panels while maintaining user sessions.",
    category: "Web Engineering",
    date: "Feb 22, 2026",
    author: "Deepika Ramakrishnan",
    readTime: "6 min read",
    icon: Globe,
  },
];

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPost, setSelectedPost] = useState<typeof blogPosts[0] | null>(null);

  const categories = ["All", "AI & ML", "Cloud Ops", "Security", "Web Engineering"];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      post.description.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesCategory = 
      selectedCategory === "All" || post.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <PageTransition variant="blog">
    <div className="relative overflow-hidden w-full pb-20">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-futuristic-grid opacity-[0.04] -z-10" />
      <div className="absolute top-[20%] right-[-10%] w-[450px] h-[450px] ambient-glow-violet -z-10 animate-pulse-glow" />

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-6 pt-16 pb-8 lg:px-8 text-center max-w-3xl flex flex-col items-center gap-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-100 shadow-sm">
          <span className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">
            Engineering Logs
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-800">
          Intellectual Assets &{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-violet to-brand-blue">
            Tech Insights.
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-500 leading-relaxed font-medium">
          Deep-dive technical reviews, systems analysis, and architectural tutorials published by the ATS engineering pod.
        </p>
      </section>

      {/* Search & Filter Bar */}
      <section className="mx-auto max-w-7xl px-6 py-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Category filters */}
        <div className="flex flex-wrap items-center gap-2.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${
                selectedCategory === cat
                  ? "bg-slate-900 text-white border-slate-900 shadow-md"
                  : "bg-white hover:bg-slate-50 text-slate-500 border-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search publications..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-xs focus:outline-none focus:border-brand-violet text-slate-800 shadow-sm"
          />
        </div>
      </section>

      {/* Publications Grid */}
      <section className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-20 glass-card rounded-3xl">
            <p className="text-slate-400 text-sm font-medium">No publications match your filter query.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredPosts.map((post) => {
              const Icon = post.icon;
              return (
                <div
                  key={post.title}
                  className="group glass-card p-8 rounded-[32px] flex flex-col gap-6"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="px-3 py-1 rounded-full bg-slate-50 border border-slate-100/80 text-[10px] font-bold text-brand-violet uppercase tracking-wider">
                      {post.category}
                    </span>
                    <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                      {post.readTime}
                    </span>
                  </div>

                  <div className="flex flex-col gap-3">
                    <h3 className="text-xl font-bold text-slate-800 tracking-tight group-hover:text-brand-violet transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed font-medium line-clamp-3">
                      {post.description}
                    </p>
                  </div>

                  {/* Metadata */}
                  <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs font-semibold text-slate-500">
                      <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-700">
                        {post.author.split(' ').map(n=>n[0]).join('')}
                      </div>
                      <div className="flex flex-col">
                        <span>{post.author}</span>
                        <span className="text-[9px] text-slate-400 font-semibold">{post.date}</span>
                      </div>
                    </div>

                    <Link
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setSelectedPost(post);
                      }}
                      className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-slate-800"
                    >
                      Read full
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Blog Post Modal */}
      <AnimatePresence>
        {selectedPost && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPost(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-40"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              transition={{ type: "spring", damping: 30, stiffness: 200 }}
              className="fixed left-1/2 top-24 sm:top-28 md:top-32 -translate-x-1/2 w-[95%] sm:w-[90%] md:w-[85%] lg:w-[80%] xl:w-[75%] max-w-6xl h-[75vh] z-50 bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 sm:p-6 md:p-8 border-b border-slate-200 flex-shrink-0">
                <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-[10px] font-bold text-slate-700 uppercase tracking-wider">
                  {selectedPost.category}
                </span>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  <X className="w-5 h-5 text-slate-600" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
                <div className="max-w-4xl mx-auto flex flex-col gap-6 sm:gap-8">
                  {/* Title */}
                  <div className="flex flex-col gap-3 sm:gap-4">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
                      {selectedPost.title}
                    </h1>
                    <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-slate-600 flex-wrap">
                      <span className="font-semibold">{selectedPost.author}</span>
                      <span className="text-slate-400">•</span>
                      <span>{selectedPost.date}</span>
                      <span className="text-slate-400">•</span>
                      <span>{selectedPost.readTime}</span>
                    </div>
                  </div>

                  {/* Icon */}
                  <div className="flex items-center gap-3 p-3 sm:p-4 bg-slate-50 rounded-xl sm:rounded-2xl">
                    {selectedPost.icon && (
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-slate-200 flex items-center justify-center flex-shrink-0">
                        <selectedPost.icon className="w-5 h-5 sm:w-6 sm:h-6 text-slate-700" />
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <div className="prose prose-sm sm:prose-base max-w-none text-slate-700 leading-relaxed">
                    <p className="text-base sm:text-lg font-medium text-slate-800 mb-4 sm:mb-6">
                      {selectedPost.description}
                    </p>

                    {/* Full Content */}
                    <div className="space-y-4 sm:space-y-6 text-slate-700 text-sm sm:text-base">
                      <p>
                        This technical deep-dive explores the key architectural patterns and implementation strategies for building production-grade systems in this domain. Our engineering team has synthesized lessons from enterprise deployments to provide practical insights.
                      </p>

                      <h2 className="text-lg sm:text-xl font-bold text-slate-900 mt-6 sm:mt-8 mb-3 sm:mb-4">Key Takeaways</h2>
                      <ul className="space-y-2 sm:space-y-3 list-disc list-inside text-sm sm:text-base">
                        <li>Design decisions that prioritize scalability and maintainability</li>
                        <li>Performance optimization strategies in real-world scenarios</li>
                        <li>Security considerations and compliance frameworks</li>
                        <li>Deployment patterns and operational best practices</li>
                        <li>Monitoring, logging, and observability approaches</li>
                      </ul>

                      <h2 className="text-lg sm:text-xl font-bold text-slate-900 mt-6 sm:mt-8 mb-3 sm:mb-4">Implementation Strategy</h2>
                      <p>
                        The foundation of a robust solution lies in understanding the underlying infrastructure patterns. Our approach focuses on modular architecture, clear separation of concerns, and automated testing across all layers.
                      </p>

                      <h2 className="text-lg sm:text-xl font-bold text-slate-900 mt-6 sm:mt-8 mb-3 sm:mb-4">Production Considerations</h2>
                      <p>
                        When moving from development to production, several critical factors emerge. Load testing, canary deployments, and graceful degradation become essential components of the operational strategy.
                      </p>

                      <h2 className="text-lg sm:text-xl font-bold text-slate-900 mt-6 sm:mt-8 mb-3 sm:mb-4">Lessons Learned</h2>
                      <p>
                        Throughout our engagements with enterprise clients, we've observed recurring patterns in successful deployments. These insights form the basis of our architectural recommendations and engineering practices.
                      </p>

                      <p className="text-xs sm:text-sm text-slate-500 italic mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-slate-200">
                        For detailed technical specifications and code examples, please reach out to our engineering team for a consultation.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 sm:p-6 md:p-8 border-t border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-4 flex-shrink-0">
                <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-slate-300 flex items-center justify-center text-xs sm:text-sm font-bold text-slate-700 flex-shrink-0">
                    {selectedPost.author.split(' ').map(n=>n[0]).join('')}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs sm:text-sm font-semibold text-slate-900 truncate">{selectedPost.author}</span>
                    <span className="text-[10px] sm:text-xs text-slate-500">{selectedPost.date}</span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="w-full sm:w-auto px-3 sm:px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg sm:rounded-xl text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
    </PageTransition>
  );
}
