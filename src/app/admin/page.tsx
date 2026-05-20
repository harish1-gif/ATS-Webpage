"use client";

import { useState, useEffect } from "react";
import { 
  Server, 
  Plus, 
  Trash, 
  FileText, 
  Users, 
  MessageSquare, 
  LineChart, 
  Activity, 
  HardDrive, 
  AlertCircle,
  Briefcase
} from "lucide-react";

interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  service: string;
  message: string;
}

interface BlogPost {
  id: string;
  title: string;
  author: string;
  category: string;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [newBlog, setNewBlog] = useState({ title: "", author: "", category: "AI & ML" });
  
  // Stats definitions
  const [systemStats, setSystemStats] = useState({
    cpu: 18,
    memory: 42,
    disk: 55,
    uptime: "99.98%"
  });

  // Hydrate lists with mock data on load
  useEffect(() => {
    // Populate leads
    const cachedLeads = localStorage.getItem("ats_leads");
    if (cachedLeads) {
      setLeads(JSON.parse(cachedLeads));
    } else {
      const initialLeads = [
        {
          id: "lead-1",
          name: "Raju Krishnan",
          company: "Pondicherry Ports",
          email: "raju@pondiports.in",
          service: "AI Automation",
          message: "Looking to deploy a voice-to-text log parsing agent at our main shipping depot."
        },
        {
          id: "lead-2",
          name: "Sarah Jenkins",
          company: "Velo Commerce",
          email: "sarah@velocart.com",
          service: "Cloud Infrastructure",
          message: "Requesting help with our multi-node Kubernetes container scaling strategy."
        }
      ];
      localStorage.setItem("ats_leads", JSON.stringify(initialLeads));
      setLeads(initialLeads);
    }

    // Populate blogs
    const cachedBlogs = localStorage.getItem("ats_blogs");
    if (cachedBlogs) {
      setBlogs(JSON.parse(cachedBlogs));
    } else {
      const initialBlogs = [
        { id: "blog-1", title: "Fine-Tuning LLMs on Proprietary Data", author: "Dr. Anbarasan Sundaram", category: "AI & ML" },
        { id: "blog-2", title: "Migrating to Multi-Region PostgreSQL Fabrics", author: "Karthik Raja", category: "Cloud Ops" }
      ];
      localStorage.setItem("ats_blogs", JSON.stringify(initialBlogs));
      setBlogs(initialBlogs);
    }

    // Simulate system fluctuations
    const statsTimer = setInterval(() => {
      setSystemStats((prev) => ({
        ...prev,
        cpu: Math.max(10, Math.min(95, prev.cpu + Math.round((Math.random() - 0.5) * 8))),
        memory: Math.max(35, Math.min(80, prev.memory + Math.round((Math.random() - 0.5) * 2))),
      }));
    }, 3000);

    return () => clearInterval(statsTimer);
  }, []);

  const addBlogPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBlog.title || !newBlog.author) return;
    const post: BlogPost = {
      id: `blog-${Date.now()}`,
      ...newBlog
    };
    const updated = [post, ...blogs];
    setBlogs(updated);
    localStorage.setItem("ats_blogs", JSON.stringify(updated));
    setNewBlog({ title: "", author: "", category: "AI & ML" });
  };

  const deleteBlogPost = (id: string) => {
    const updated = blogs.filter((b) => b.id !== id);
    setBlogs(updated);
    localStorage.setItem("ats_blogs", JSON.stringify(updated));
  };

  const deleteLead = (id: string) => {
    const updated = leads.filter((l) => l.id !== id);
    setLeads(updated);
    localStorage.setItem("ats_leads", JSON.stringify(updated));
  };

  return (
    <div className="relative overflow-hidden w-full min-h-screen pb-20">
      <div className="absolute inset-0 bg-futuristic-grid opacity-[0.03] -z-10" />
      
      <div className="mx-auto max-w-7xl px-6 pt-10 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold text-brand-violet uppercase tracking-widest">Enterprise Administration</span>
            <h1 className="text-3xl font-black text-slate-800 tracking-tight">Admin Console</h1>
          </div>
          
          {/* Uptime indicator */}
          <div className="px-4 py-2 glass-panel bg-emerald-500/5 text-emerald-600 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-emerald-500/10">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            Core Nodes: Online ({systemStats.uptime})
          </div>
        </div>

        {/* Sidebar Nav & Main Panel Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
          {/* Tab Navigation */}
          <div className="flex flex-col gap-2">
            {[
              { id: "overview", label: "System Monitor", icon: Server },
              { id: "leads", label: "Client Leads", icon: MessageSquare, badge: leads.length },
              { id: "blogs", label: "Blog Publisher", icon: FileText, badge: blogs.length },
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

          {/* Main Dashboard Workspace */}
          <div className="lg:col-span-3">
            {/* Overview Monitor */}
            {activeTab === "overview" && (
              <div className="flex flex-col gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {/* CPU Widget */}
                  <div className="glass-card p-6 rounded-2xl flex flex-col gap-4">
                    <div className="flex justify-between items-center text-slate-400">
                      <span className="text-xs font-bold uppercase tracking-wider">CPU Ingestion</span>
                      <Activity className="w-4 h-4 text-brand-violet" />
                    </div>
                    <div className="text-3xl font-extrabold text-slate-800 tracking-tight">{systemStats.cpu}%</div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-brand-violet h-full transition-all duration-1000" 
                        style={{ width: `${systemStats.cpu}%` }}
                      />
                    </div>
                  </div>

                  {/* Memory Widget */}
                  <div className="glass-card p-6 rounded-2xl flex flex-col gap-4">
                    <div className="flex justify-between items-center text-slate-400">
                      <span className="text-xs font-bold uppercase tracking-wider">RAM Allocation</span>
                      <HardDrive className="w-4 h-4 text-brand-blue" />
                    </div>
                    <div className="text-3xl font-extrabold text-slate-800 tracking-tight">{systemStats.memory}%</div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-brand-blue h-full transition-all duration-1000" 
                        style={{ width: `${systemStats.memory}%` }}
                      />
                    </div>
                  </div>

                  {/* Virtual Storage Widget */}
                  <div className="glass-card p-6 rounded-2xl flex flex-col gap-4">
                    <div className="flex justify-between items-center text-slate-400">
                      <span className="text-xs font-bold uppercase tracking-wider">Disk Capacity</span>
                      <Server className="w-4 h-4 text-slate-400" />
                    </div>
                    <div className="text-3xl font-extrabold text-slate-800 tracking-tight">{systemStats.disk}%</div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-slate-400 h-full" 
                        style={{ width: `${systemStats.disk}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* SVG Performance Line Graph */}
                <div className="glass-card p-6 rounded-2xl flex flex-col gap-6">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Cognitive Node Traffic (24h)
                    </span>
                    <span className="text-[10px] text-brand-violet font-bold uppercase tracking-widest">
                      Live Ingesting
                    </span>
                  </div>
                  
                  <div className="w-full h-48 bg-slate-50/50 rounded-xl relative overflow-hidden flex items-center justify-center p-2">
                    {/* Simulated SVG Graph */}
                    <svg className="w-full h-full text-slate-200" viewBox="0 0 100 30" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="gradient-chart" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="rgba(124, 58, 237, 0.15)" />
                          <stop offset="100%" stopColor="rgba(124, 58, 237, 0)" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M 0,25 Q 15,10 30,18 T 60,8 T 90,15 T 100,5 L 100,30 L 0,30 Z"
                        fill="url(#gradient-chart)"
                      />
                      <path
                        d="M 0,25 Q 15,10 30,18 T 60,8 T 90,15 T 100,5"
                        fill="none"
                        stroke="#7c3aed"
                        strokeWidth="0.75"
                        strokeLinecap="round"
                      />
                    </svg>
                    
                    <div className="absolute top-4 left-4 text-xs font-bold text-slate-700">
                      Peak workload: 1.8M API requests/sec
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Client Leads Manager */}
            {activeTab === "leads" && (
              <div className="flex flex-col gap-6">
                <h3 className="text-lg font-bold text-slate-800 tracking-tight">Active Client Leads</h3>
                {leads.length === 0 ? (
                  <div className="text-center py-16 glass-card rounded-2xl">
                    <p className="text-slate-400 text-xs">No client requests received yet.</p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    {leads.map((lead) => (
                      <div key={lead.id} className="glass-card p-6 rounded-2xl flex flex-col gap-4 relative">
                        <button
                          onClick={() => deleteLead(lead.id)}
                          className="absolute top-4 right-4 text-slate-400 hover:text-rose-500 transition-colors"
                        >
                          <Trash className="w-4 h-4" />
                        </button>
                        
                        <div className="flex flex-col gap-1 text-xs">
                          <span className="font-bold text-brand-violet uppercase tracking-wider">{lead.service}</span>
                          <h4 className="text-sm font-bold text-slate-800">{lead.name} • <span className="text-slate-500 font-semibold">{lead.company}</span></h4>
                          <a href={`mailto:${lead.email}`} className="text-brand-blue font-semibold mt-0.5">{lead.email}</a>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed font-medium bg-slate-50 p-4 rounded-xl border border-slate-100">
                          {lead.message}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Blog Publisher */}
            {activeTab === "blogs" && (
              <div className="flex flex-col gap-8">
                {/* Add new article form */}
                <form onSubmit={addBlogPost} className="glass-card p-6 rounded-2xl flex flex-col gap-4 text-left">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500">Draft New Publication</h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-slate-600 uppercase">Article Title</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Scaling Multi-Tenant APIs"
                        className="px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-brand-violet text-slate-800"
                        value={newBlog.title}
                        onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                      />
                    </div>
                    
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-slate-600 uppercase">Author Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Dr. Anbarasan Sundaram"
                        className="px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-brand-violet text-slate-800"
                        value={newBlog.author}
                        onChange={(e) => setNewBlog({ ...newBlog, author: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-slate-600 uppercase">Topic Category</label>
                    <select
                      className="px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-brand-violet text-slate-800"
                      value={newBlog.category}
                      onChange={(e) => setNewBlog({ ...newBlog, category: e.target.value })}
                    >
                      <option>AI & ML</option>
                      <option>Cloud Ops</option>
                      <option>Security</option>
                      <option>Web Engineering</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 py-2 bg-slate-900 hover:bg-brand-violet text-white text-xs font-bold uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 transition-all shadow-md"
                  >
                    Publish to Feed
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </form>

                {/* Published articles list */}
                <div className="flex flex-col gap-4">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500">Live Articles ({blogs.length})</h4>
                  {blogs.map((blog) => (
                    <div key={blog.id} className="glass-card p-4 rounded-xl flex items-center justify-between gap-4">
                      <div className="flex flex-col gap-1 text-left">
                        <span className="text-[9px] font-bold text-brand-violet uppercase tracking-wider">{blog.category}</span>
                        <h4 className="text-xs font-bold text-slate-800">{blog.title}</h4>
                        <span className="text-[10px] text-slate-400 font-semibold">{blog.author}</span>
                      </div>
                      <button
                        onClick={() => deleteBlogPost(blog.id)}
                        className="text-slate-400 hover:text-rose-500 transition-colors"
                      >
                        <Trash className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
