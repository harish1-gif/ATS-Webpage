"use client";

import { useState } from "react";
import { Search, Calendar, User, ArrowRight, Cpu, Layers, Globe } from "lucide-react";
import Link from "next/link";

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
                      href="/blog"
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
    </div>
  );
}
