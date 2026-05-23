"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { Briefcase, MapPin, DollarSign, Send, FileText, CheckCircle2, X } from "lucide-react";
import PageTransition from "@/components/PageTransition";

const openPositions = [
  {
    id: "ai-engineer",
    title: "Lead AI Engineer",
    department: "R&D Intelligence",
    location: "Pondicherry HQ (Hybrid)",
    salary: "₹18L - ₹24L per annum",
    description: "Lead our NLP fine-tuning operations, managing model embeddings, agent chains, and production deployment pipeline security.",
  },
  {
    id: "cloud-ops",
    title: "Senior Kubernetes Infrastructure Specialist",
    department: "Cloud Architect Pod",
    location: "Pondicherry HQ (On-site)",
    salary: "₹16L - ₹22L per annum",
    description: "Manage core serverless deployments, multi-region database failover meshes, and automate security scanning operations.",
  },
  {
    id: "nextjs-dev",
    title: "Senior Full-Stack Next.js Architect",
    department: "Product Engineering",
    location: "Pondicherry HQ (Hybrid)",
    salary: "₹14L - ₹20L per annum",
    description: "Develop enterprise console dashboards, design beautiful user interface flow graphs, and optimize web performance values.",
  },
];

export default function Careers() {
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [showUpcoming, setShowUpcoming] = useState(true);
  const positionsRef = useRef<HTMLDivElement>(null);
  const modalCardRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    portfolio: "",
    coverLetter: "",
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (showUpcoming && modalCardRef.current) {
      gsap.fromTo(
        modalCardRef.current,
        { opacity: 0, y: 30, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power2.out" }
      );

      gsap.to(modalCardRef.current, {
        y: -8,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.6,
      });
    }
  }, [showUpcoming]);

  const activeJobDetails = openPositions.find((job) => job.id === selectedJob);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setSelectedJob(null);
      setFormData({ name: "", email: "", portfolio: "", coverLetter: "" });
    }, 2500);
  };

  return (
    <PageTransition variant="careers">
    <div className="relative overflow-hidden w-full pb-20">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-futuristic-grid opacity-[0.04] -z-10" />
      <div className="absolute top-[20%] left-[-10%] w-[450px] h-[450px] ambient-glow-blue -z-10 animate-pulse-glow" />

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-6 pt-16 pb-12 lg:px-8 text-center max-w-3xl flex flex-col items-center gap-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-100 shadow-sm">
          <span className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">
            Careers at ATS
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-800">
          Build the Cognitive Era.{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-violet to-brand-blue">
            Apply Today.
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-500 leading-relaxed font-medium">
          We are recruiting senior engineers to expand our Pondicherry technology hub. Collaborate on global products.
        </p>
      </section>

      {/* Culture Perks */}
      <section className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8 md:p-12 glass-card rounded-[32px] bg-slate-50/50">
          <div className="flex flex-col gap-3">
            <span className="text-xs font-bold text-brand-violet uppercase tracking-wider">01. Autonomy</span>
            <h3 className="text-lg font-bold text-slate-800 tracking-tight">Flexible Hybrid Formats</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              We focus on deliverables and software benchmarks, not timestamps. Work from our Pondicherry beach office or your desk.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-xs font-bold text-brand-blue uppercase tracking-wider">02. Growth</span>
            <h3 className="text-lg font-bold text-slate-800 tracking-tight">R&D Innovation Time</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              10% of engineering bandwidth is allocated for building standalone experimental tools, publishing papers, or open source.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">03. Culture</span>
            <h3 className="text-lg font-bold text-slate-800 tracking-tight">Comprehensive Benefits</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Top-tier health insurance, high-end workstations, and relocation allowances for moving to coastal Pondicherry.
            </p>
          </div>
        </div>
      </section>

      {/* Open Positions List */}
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8 flex flex-col gap-8" ref={positionsRef}>
        <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight text-center sm:text-left">
          Available Positions ({openPositions.length})
        </h2>

        <div className="flex flex-col gap-6">
          {openPositions.map((job) => (
            <div
              key={job.id}
              className="glass-card p-6 md:p-8 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="flex flex-col gap-3 max-w-2xl">
                <span className="text-[10px] font-bold text-brand-violet uppercase tracking-widest">
                  {job.department}
                </span>
                <h3 className="text-xl font-bold text-slate-800 tracking-tight">
                  {job.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {job.description}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-400 mt-2">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-300" /> {job.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <DollarSign className="w-3.5 h-3.5 text-slate-300" /> {job.salary}
                  </span>
                </div>
              </div>
              
              <button
                onClick={() => setSelectedJob(job.id)}
                className="px-5 py-3 bg-slate-900 text-white rounded-2xl text-xs font-bold uppercase tracking-wider hover:bg-brand-violet transition-all shadow-md shrink-0 align-self-start md:align-self-center"
              >
                Apply for Role
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Upcoming Opportunities Modal */}
      <AnimatePresence>
        {showUpcoming && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-start justify-center pt-28 px-4" onClick={() => setShowUpcoming(false)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-card bg-white p-8 rounded-3xl max-w-lg w-full relative shadow-2xl flex flex-col gap-6"
              ref={modalCardRef}
              onClick={(e) => e.stopPropagation()}
            >

              <div className="flex flex-col gap-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-violet/10 border border-brand-violet/20 w-fit">
                  <span className="text-[10px] font-bold tracking-widest text-brand-violet uppercase">
                    Exciting Updates
                  </span>
                </div>
                <h3 className="text-2xl font-black text-slate-800 tracking-tight">
                  More Opportunities<span className="text-brand-blue"> Coming Soon</span>
                </h3>
              </div>

              <div className="flex flex-col gap-4">
                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                  We're actively expanding our engineering team across AI/ML, DevOps, and full-stack development. Whether you're an expert in transformers and production LLMs, cloud infrastructure maestro, or visionary product engineer—keep an eye out for fresh openings. The cognitive era is growing, and we're building a world-class team to lead it.
                </p>

                <p className="text-xs text-slate-500 font-semibold flex items-start gap-2">
                  <span className="text-lg">💡</span>
                  <span>In the meantime, we welcome unsolicited applications and referrals from talented engineers in your network.</span>
                </p>
              </div>


            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Application Form Modal */}
      <AnimatePresence>
        {selectedJob && activeJobDetails && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-card bg-white p-8 rounded-3xl max-w-lg w-full relative shadow-2xl flex flex-col gap-6"
            >
              <button
                onClick={() => setSelectedJob(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 font-bold text-sm"
              >
                ✕
              </button>

              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold text-brand-violet uppercase tracking-widest">
                  Apply for Job
                </span>
                <h3 className="text-xl font-bold text-slate-800 tracking-tight">
                  {activeJobDetails.title}
                </h3>
                <p className="text-xs text-slate-400">{activeJobDetails.department} • {activeJobDetails.location}</p>
              </div>

              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 gap-4 text-center">
                  <CheckCircle2 className="w-16 h-16 text-emerald-500 animate-bounce" />
                  <h4 className="text-lg font-bold text-slate-800">Application Submitted</h4>
                  <p className="text-xs text-slate-500">
                    Thank you! Our HR team will reach out to you within 48 hours to schedule your technical screen.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5 text-left">
                    <label className="text-xs font-bold text-slate-600 uppercase">Full Name</label>
                    <input
                      type="text"
                      className="px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-violet text-slate-800"
                      required
                      placeholder="e.g. Anand Kumar"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  
                  <div className="flex flex-col gap-1.5 text-left">
                    <label className="text-xs font-bold text-slate-600 uppercase">Email Address</label>
                    <input
                      type="email"
                      className="px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-violet text-slate-800"
                      required
                      placeholder="anand@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5 text-left">
                    <label className="text-xs font-bold text-slate-600 uppercase">GitHub / Portfolio URL</label>
                    <input
                      type="url"
                      className="px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-violet text-slate-800"
                      required
                      placeholder="https://github.com/profile"
                      value={formData.portfolio}
                      onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5 text-left">
                    <label className="text-xs font-bold text-slate-600 uppercase">Brief Cover Letter</label>
                    <textarea
                      rows={3}
                      className="px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-violet text-slate-800"
                      required
                      placeholder="Describe your background and why you want to join ATS."
                      value={formData.coverLetter}
                      onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 py-3 bg-slate-900 hover:bg-brand-violet text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md"
                  >
                    Submit Application
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
    </PageTransition>
  );
}
