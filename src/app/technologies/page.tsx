"use client";

import { motion } from "framer-motion";
import { 
  Code, 
  Cpu, 
  Layers, 
  Database, 
  Terminal, 
  Workflow, 
  HardDrive,
  Compass
} from "lucide-react";

const techCategories = [
  {
    title: "Programming Languages",
    icon: Code,
    items: [
      { name: "TypeScript", role: "Frontend UI logic and serverless Next.js API endpoints." },
      { name: "Go / Golang", role: "High-performance microservices and heavy data pipeline ingest." },
      { name: "Python", role: "Machine learning workflows, PyTorch scripts, and data intelligence." },
      { name: "Rust", role: "Low-level system controls, fast compilers, and web-assembly modules." },
    ]
  },
  {
    title: "Storage & Databases",
    icon: Database,
    items: [
      { name: "PostgreSQL", role: "Relational database backbone with strict data consistency rules." },
      { name: "Supabase", role: "BaaS platform for authentication, real-time sync, and database access." },
      { name: "Redis", role: "Low-latency memory cache and publish/subscribe message broker." },
      { name: "Pinecone / pgvector", role: "Vector databases storing embeddings for semantic cognitive search." },
    ]
  },
  {
    title: "Infrastructures & Devops",
    icon: Layers,
    items: [
      { name: "Kubernetes (K8s)", role: "Container scheduling, service mesh management, and auto-scaling." },
      { name: "AWS Cloud Fabric", role: "Highly-resilient multi-region virtual cloud deployment." },
      { name: "Terraform", role: "Declarative Infrastructure-as-Code for tracking network layouts." },
      { name: "Docker", role: "Lightweight isolated container packaging for consistent pipelines." },
    ]
  },
  {
    title: "Cognitive & ML Tooling",
    icon: Cpu,
    items: [
      { name: "PyTorch", role: "Deep learning framework used to fine-tune custom vision/language models." },
      { name: "Hugging Face Hub", role: "Pre-trained weights sourcing for quick model prototypes." },
      { name: "LangChain", role: "Framework for chaining multi-agent logic prompts and tool setups." },
      { name: "OpenAI / Anthropic APIs", role: "Cognitive API foundation for baseline model prompts." },
    ]
  }
];

export default function Technologies() {
  return (
    <div className="relative overflow-hidden w-full pb-20">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-futuristic-grid opacity-[0.04] -z-10" />
      <div className="absolute top-[30%] right-[-10%] w-[500px] h-[500px] ambient-glow-violet -z-10 animate-pulse-glow" />

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-6 pt-16 pb-12 lg:px-8 text-center max-w-3xl flex flex-col items-center gap-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-100 shadow-sm">
          <span className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">
            Architectural Stack
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-800">
          Our Operational{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-violet to-brand-blue">
            Tech Catalog.
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-500 leading-relaxed font-medium">
          We maintain absolute control over our tooling ecosystem, picking only enterprise-grade platforms to power your workloads.
        </p>
      </section>

      {/* Tech Stacks Grid */}
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8 flex flex-col gap-16">
        {techCategories.map((category) => {
          const CategoryIcon = category.icon;
          return (
            <div key={category.title} className="flex flex-col gap-8">
              {/* Category Header */}
              <div className="flex items-center gap-3.5 pb-4 border-b border-slate-100">
                <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                  <CategoryIcon className="w-5 h-5 text-brand-violet" />
                </div>
                <h2 className="text-xl font-bold text-slate-800 tracking-tight">
                  {category.title}
                </h2>
              </div>

              {/* Items grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {category.items.map((item) => (
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    key={item.name}
                    className="glass-card p-6 rounded-2xl flex flex-col gap-3 relative overflow-hidden"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-slate-800 tracking-tight">
                        {item.name}
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-violet animate-pulse" />
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed font-medium">
                      {item.role}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
