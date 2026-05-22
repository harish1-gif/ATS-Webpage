"use client";

import { motion } from "framer-motion";
import { 
  Cpu, 
  Layers, 
  ShieldAlert, 
  Globe, 
  Terminal, 
  Database,
  ArrowRight,
  Sparkles
} from "lucide-react";
import Link from "next/link";

const services = [
  {
    title: "Next-Gen Web Platforms",
    id: "web",
    tagline: "React, Next.js, & Hyper-Fast APIs",
    description: "We develop ultra-fast, premium corporate applications using Next.js and Vite. Combined with Golang or Node microservices, we ensure 100% responsiveness and premium SEO indexing.",
    icon: Globe,
    capabilities: [
      "App Router & Server Component optimizations",
      "Microservice APIs (Go, Rust, Node.js)",
      "Dynamic data-visualization consoles",
      "Premium headless CMS integrations"
    ],
  },
  {
    id: "security",
    title: "Cybersecurity & IAM Compliance",
    tagline: "Zero-Trust, OAuth, & Threat Monitoring",
    description: "Secure your operational assets. We enforce zero-trust policies, multi-factor authentication, single-sign-on (SSO), data masking, and real-time security logs ingestion.",
    icon: ShieldAlert,
    capabilities: [
      "Single-Sign-On (SSO / SAML / OAuth 2.0)",
      "Automated vulnerability and compliance scanning",
      "End-to-end data packet encryption",
      "SOC2 / GDPR compliance engineering"
    ],
  },
  {
    id: "cloud",
    title: "Cloud Fabric Modernization",
    tagline: "Kubernetes, Serverless, & Multi-Region DBs",
    description: "Scale on robust multi-region infrastructure. We build containerized architectures with auto-scaling capabilities, zero-downtime rolling deploys, and cold-recovery architectures.",
    icon: Layers,
    capabilities: [
      "Multi-tenant Kubernetes (EKS, GKE, AKS) clusters",
      "Serverless functions & edge-compute networks",
      "High-availability PostgreSQL & Supabase migrations",
      "Infrastructure-as-Code (Terraform, Pulumi)"
    ],
  },
  {
    id: "ai",
    title: "Cognitive AI Engineering",
    tagline: "LLMs, Custom Agents, & ML Pipelines",
    description: "We deploy custom generative AI solutions, training pipelines, retrieval-augmented generation (RAG) datasets, and low-latency API models optimized for secure workloads.",
    icon: Cpu,
    capabilities: [
      "Custom Large Language Model (LLM) fine-tuning",
      "Retrieval-Augmented Generation (RAG) vector embeddings",
      "Cognitive process automation & agentic workflows",
      "Edge device neural network deployment"
    ],
  },
];

export default function Services() {
  return (
    <div className="relative overflow-hidden w-full pb-20">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-futuristic-grid opacity-[0.04] -z-10" />
      <div className="absolute top-[30%] left-[-10%] w-[500px] h-[500px] ambient-glow-blue -z-10 animate-pulse-glow" />

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-6 pt-16 pb-12 lg:px-8 text-center max-w-3xl flex flex-col items-center gap-6">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-100 shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-brand-violet" />
          <span className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">
            Solutions Matrix
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl font-black tracking-tight text-slate-800"
        >
          Engineered to Drive{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-violet to-brand-blue">
            Uncapped Growth.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-base sm:text-lg text-slate-500 leading-relaxed font-medium"
        >
          We construct the structural backbones for next-generation platforms, deploying battle-tested enterprise-grade configurations.
        </motion.p>
      </section>

      {/* Services detailed catalog */}
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8 flex flex-col gap-16">
        {services.map((service, index) => {
          const Icon = service.icon;
          const isEven = index % 2 === 0;
          return (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              id={service.id}
              key={service.id}
              className={`flex flex-col lg:flex-row gap-12 items-center p-8 md:p-12 glass-card rounded-[32px] ${
                isEven ? "" : "lg:flex-row-reverse"
              }`}
            >
              {/* Service details */}
              <div className="flex-1 flex flex-col gap-6 items-start">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm flex items-center justify-center">
                  <Icon className="w-6 h-6 text-brand-violet" />
                </div>
                
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-bold text-brand-blue uppercase tracking-wider">
                    {service.tagline}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
                    {service.title}
                  </h3>
                </div>
                
                <p className="text-sm text-slate-500 leading-relaxed font-medium">
                  {service.description}
                </p>

                {/* Capabilities grid */}
                <div className="w-full">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
                    Core Capabilities
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {service.capabilities.map((cap) => (
                      <li key={cap} className="flex items-center gap-2.5 text-xs font-medium text-slate-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-violet shrink-0" />
                        <span>{cap}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Service visual representation */}
              <div className="flex-1 w-full relative h-[300px] lg:h-[350px] rounded-2xl bg-slate-50/50 border border-slate-200/50 overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-futuristic-dots opacity-40" />
                <div className="w-32 h-32 rounded-full bg-white border border-slate-100 shadow-xl flex items-center justify-center animate-float">
                  <Icon className="w-12 h-12 text-brand-violet/80" />
                </div>
                {/* Floating tags */}
                <div className="absolute top-[20%] left-[10%] px-3 py-1.5 glass-panel bg-white/90 rounded-xl text-[10px] font-bold text-slate-600 shadow-md">
                  Performance Optimize
                </div>
                <div className="absolute bottom-[20%] right-[10%] px-3 py-1.5 glass-panel bg-white/90 rounded-xl text-[10px] font-bold text-slate-600 shadow-md">
                  99.99% Uptime SLA
                </div>
              </div>
            </motion.div>
          );
        })}
      </section>

      {/* Consult block */}
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="rounded-[32px] border border-slate-100 bg-slate-50/40 p-12 text-center flex flex-col items-center gap-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-futuristic-dots opacity-30 -z-10" />
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
            Need a Customized Solution?
          </h2>
          <p className="text-sm text-slate-500 max-w-md font-medium">
            Contact us for custom architecture design, pricing proposals, and engineering resources.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-slate-900 text-white rounded-2xl text-xs font-bold uppercase tracking-wider hover:bg-brand-violet transition-colors shadow-lg"
          >
            Consult Our Architects
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
