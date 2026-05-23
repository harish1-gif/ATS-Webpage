"use client";

import { useState, useEffect } from "react";
import { 
  Trophy, 
  Clock, 
  FileDown, 
  MessageSquare, 
  Plus, 
  CheckCircle2, 
  Circle, 
  Send, 
  Sparkles,
  LifeBuoy,
  Loader
} from "lucide-react";
import { createClient } from "@supabase/supabase-js";
import PageTransition from "@/components/PageTransition";

interface Ticket {
  id: string;
  topic: string;
  priority: string;
  message: string;
  status: string;
  date: string;
}

interface Asset {
  id: string;
  file_name: string;
  file_size: string;
  created_at: string;
  file_url: string;
}

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

export default function ClientDashboard() {
  const [activeTab, setActiveTab] = useState("milestones");
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [assetsLoading, setAssetsLoading] = useState(true);
  const [newTicket, setNewTicket] = useState({ topic: "", priority: "Medium", message: "" });
  const [submitted, setSubmitted] = useState(false);

  // Initial milestones list
  const milestones = [
    { name: "Discovery & Architecture Benchmark", status: "completed", date: "May 02, 2026" },
    { name: "Framer Design Mockup & Core Assets", status: "completed", date: "May 10, 2026" },
    { name: "API Pipeline & Vector DB Connection", status: "in-progress", date: "Target: May 28, 2026" },
    { name: "Kubernetes Scaling & Security Audit", status: "pending", date: "Target: Jun 10, 2026" },
  ];

  // Fetch assets from database
  useEffect(() => {
    const fetchAssets = async () => {
      try {
        setAssetsLoading(true);
        const { data, error } = await supabase
          .from("shared_assets")
          .select("id, file_name, file_size, created_at, file_url")
          .eq("is_public", true)
          .order("created_at", { ascending: false });

        if (error) throw error;

        setAssets(
          data?.map((asset: any) => ({
            id: asset.id,
            file_name: asset.file_name,
            file_size: asset.file_size || "Unknown",
            created_at: new Date(asset.created_at).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            }),
            file_url: asset.file_url,
          })) || []
        );
      } catch (error) {
        console.error("Error fetching assets:", error);
      } finally {
        setAssetsLoading(false);
      }
    };

    fetchAssets();
  }, []);

  useEffect(() => {
    const cachedTickets = localStorage.getItem("ats_tickets");
    if (cachedTickets) {
      setTickets(JSON.parse(cachedTickets));
    } else {
      const initialTickets = [
        {
          id: "ticket-1",
          topic: "Supabase auth session duration",
          priority: "Low",
          message: "Requesting to increase token expiry time limits from 3600 to 7200 seconds.",
          status: "Resolved",
          date: "May 14, 2026"
        }
      ];
      localStorage.setItem("ats_tickets", JSON.stringify(initialTickets));
      setTickets(initialTickets);
    }
  }, []);

  const createTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTicket.topic || !newTicket.message) return;
    const ticket: Ticket = {
      id: `ticket-${Date.now()}`,
      ...newTicket,
      status: "Open",
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    };
    const updated = [ticket, ...tickets];
    setTickets(updated);
    localStorage.setItem("ats_tickets", JSON.stringify(updated));
    setNewTicket({ topic: "", priority: "Medium", message: "" });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2000);
  };

  return (
    <PageTransition variant="client">
    <div className="relative overflow-hidden w-full min-h-screen pb-20">
      <div className="absolute inset-0 bg-futuristic-grid opacity-[0.03] -z-10" />

      <div className="mx-auto max-w-7xl px-6 pt-10 lg:px-8">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold text-brand-violet uppercase tracking-widest">Client Collaboration Hub</span>
            <h1 className="text-3xl font-black text-slate-800 tracking-tight">Project Portal</h1>
          </div>
          
          {/* Welcome User info */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-violet/10 to-brand-blue/10 flex items-center justify-center font-bold text-brand-violet">
              NT
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-bold text-slate-800 leading-none">Nexus Tech Team</span>
              <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 mt-1">Acct: #8892-ATS</span>
            </div>
          </div>
        </div>

        {/* Workspace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
          {/* Dashboard Tabs Sidebar */}
          <div className="flex flex-col gap-2">
            {[
              { id: "milestones", label: "Milestones Tracker", icon: Trophy },
              { id: "tickets", label: "Support Tickets", icon: LifeBuoy, badge: tickets.filter(t=>t.status === "Open").length },
              { id: "assets", label: "Shared Assets", icon: FileDown, badge: assets.length },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-between transition-all ${
                    activeTab === tab.id
                      ? "bg-slate-900 text-white shadow-lg"
                      : "bg-slate-50 hover:bg-slate-100 text-slate-500"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </div>
                  {tab.badge !== undefined && (
                    <span className={`px-2 py-0.5 rounded-md text-[10px] ${
                      activeTab === tab.id ? "bg-white/20 text-white" : "bg-slate-200 text-slate-700"
                    }`}>
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Main workspace container */}
          <div className="lg:col-span-3">
            
            {/* Milestones Panel */}
            {activeTab === "milestones" && (
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-slate-800 tracking-tight">Project Milestones</h3>
                  <span className="text-xs font-bold text-brand-violet uppercase tracking-wider">
                    Overall Progress: 50%
                  </span>
                </div>
                
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden mb-2">
                  <div className="bg-gradient-to-r from-brand-violet to-brand-blue h-full w-1/2" />
                </div>

                <div className="flex flex-col gap-4 mt-2">
                  {milestones.map((milestone) => (
                    <div 
                      key={milestone.name} 
                      className={`glass-card p-6 rounded-2xl flex items-center justify-between gap-4 border ${
                        milestone.status === "completed" 
                          ? "border-emerald-500/10 bg-emerald-500/5" 
                          : milestone.status === "in-progress" 
                          ? "border-brand-violet/20 bg-brand-violet/5" 
                          : "border-slate-100"
                      }`}
                    >
                      <div className="flex items-center gap-4 text-left">
                        {milestone.status === "completed" ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                        ) : milestone.status === "in-progress" ? (
                          <Clock className="w-5 h-5 text-brand-violet shrink-0 animate-spin-slow" />
                        ) : (
                          <Circle className="w-5 h-5 text-slate-300 shrink-0" />
                        )}
                        
                        <div className="flex flex-col">
                          <span className={`text-xs font-bold ${
                            milestone.status === "completed" 
                              ? "text-slate-800 line-through opacity-60" 
                              : "text-slate-800"
                          }`}>
                            {milestone.name}
                          </span>
                          <span className="text-[10px] text-slate-400 font-semibold mt-1">
                            {milestone.date}
                          </span>
                        </div>
                      </div>

                      <span className={`px-2.5 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider ${
                        milestone.status === "completed" 
                          ? "bg-emerald-100 text-emerald-800" 
                          : milestone.status === "in-progress" 
                          ? "bg-brand-violet/10 text-brand-violet" 
                          : "bg-slate-100 text-slate-500"
                      }`}>
                        {milestone.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Support Tickets Panel */}
            {activeTab === "tickets" && (
              <div className="flex flex-col gap-8">
                {/* File new ticket form */}
                <form onSubmit={createTicket} className="glass-card p-6 rounded-2xl flex flex-col gap-4 text-left">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500">File Support Ticket</h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-slate-600 uppercase">Topic / Issue Title</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Sandbox API rate-limiting limits"
                        className="px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-brand-violet text-slate-800"
                        value={newTicket.topic}
                        onChange={(e) => setNewTicket({ ...newTicket, topic: e.target.value })}
                      />
                    </div>
                    
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-slate-600 uppercase">Urgency Priority</label>
                      <select
                        className="px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-brand-violet text-slate-800"
                        value={newTicket.priority}
                        onChange={(e) => setNewTicket({ ...newTicket, priority: e.target.value })}
                      >
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                        <option>Critical</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-slate-600 uppercase">Message details</label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Describe the issue you're encountering. Our infrastructure team will investigate."
                      className="px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-brand-violet text-slate-800"
                      value={newTicket.message}
                      onChange={(e) => setNewTicket({ ...newTicket, message: e.target.value })}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 py-2 bg-slate-900 hover:bg-brand-violet text-white text-xs font-bold uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 transition-all shadow-md"
                  >
                    Submit Ticket
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>

                {/* Ticket history logs */}
                <div className="flex flex-col gap-4">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500">Ticket Logs ({tickets.length})</h4>
                  {tickets.map((t) => (
                    <div key={t.id} className="glass-card p-6 rounded-2xl flex flex-col gap-3 text-left">
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Date: {t.date}</span>
                        <span className={`px-2.5 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider ${
                          t.status === "Resolved" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                        }`}>
                          {t.status}
                        </span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <h4 className="text-xs font-bold text-slate-800">{t.topic}</h4>
                        <span className="text-[10px] text-brand-violet font-semibold">Priority: {t.priority}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-relaxed font-medium bg-slate-50/50 p-3 rounded-lg border border-slate-100">
                        {t.message}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Shared Assets Panel */}
            {activeTab === "assets" && (
              <div className="flex flex-col gap-6">
                <h3 className="text-lg font-bold text-slate-800 tracking-tight">Project Blueprints & Specs</h3>
                
                {assetsLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader className="w-6 h-6 text-brand-violet animate-spin" />
                    <span className="ml-3 text-sm text-slate-500 font-medium">Loading assets...</span>
                  </div>
                ) : assets.length === 0 ? (
                  <div className="glass-card p-12 rounded-2xl text-center">
                    <FileDown className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                    <p className="text-sm text-slate-500 font-medium">No shared assets available yet</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {assets.map((asset) => (
                      <div key={asset.id} className="glass-card p-6 rounded-2xl flex items-center justify-between gap-4">
                        <div className="flex flex-col text-left">
                          <span className="text-xs font-bold text-slate-800 leading-tight truncate max-w-[200px]">
                            {asset.file_name}
                          </span>
                          <span className="text-[9px] text-slate-400 font-semibold mt-1">
                            {asset.file_size} • Uploaded {asset.created_at}
                          </span>
                        </div>
                        
                        <a
                          href={asset.file_url}
                          download
                          className="p-2.5 bg-slate-50 border border-slate-100 hover:bg-brand-violet hover:text-white rounded-xl text-slate-500 transition-colors cursor-pointer"
                        >
                          <FileDown className="w-4 h-4" />
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
    </PageTransition>
  );
}
