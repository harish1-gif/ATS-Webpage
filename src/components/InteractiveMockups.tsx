"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Laptop, 
  Smartphone, 
  Play, 
  ShieldCheck, 
  RefreshCw, 
  Database, 
  Cpu, 
  CheckCircle2, 
  Terminal,
  Activity,
  Server
} from "lucide-react";

// 1. BrowserMockup (Website Development)
export function BrowserMockup() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [counter, setCounter] = useState(128);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((c) => c + Math.floor(Math.random() * 5) + 1);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full bg-white border border-zinc-200 rounded-xl shadow-md overflow-hidden flex flex-col font-sans select-none">
      {/* Browser Bar */}
      <div className="bg-zinc-100 px-4 py-2 border-b border-zinc-200 flex items-center gap-3">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-zinc-300 block" />
          <span className="w-3 h-3 rounded-full bg-zinc-300 block" />
          <span className="w-3 h-3 rounded-full bg-zinc-300 block" />
        </div>
        <div className="flex-1 bg-white border border-zinc-200/80 rounded-md text-[10px] text-zinc-400 py-0.5 px-3 flex items-center justify-between">
          <span>https://ats-portfolio.dev/nextgen-saas</span>
          <RefreshCw className="w-2.5 h-2.5 text-zinc-300" />
        </div>
      </div>
      {/* Web Body */}
      <div className="flex-grow p-4 bg-zinc-50 flex flex-col gap-4 overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-200">
          <span className="text-xs font-bold text-black tracking-tight">Enterprise Console</span>
          <div className="flex gap-1.5">
            <button 
              onClick={() => setActiveTab("dashboard")} 
              className={`text-[9px] font-bold px-2 py-1 rounded-md transition-colors ${activeTab === "dashboard" ? "bg-black text-white" : "text-zinc-500 hover:bg-zinc-200"}`}
            >
              Dashboard
            </button>
            <button 
              onClick={() => setActiveTab("analytics")} 
              className={`text-[9px] font-bold px-2 py-1 rounded-md transition-colors ${activeTab === "analytics" ? "bg-black text-white" : "text-zinc-500 hover:bg-zinc-200"}`}
            >
              Analytics
            </button>
          </div>
        </div>

        {activeTab === "dashboard" ? (
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-white border border-zinc-200 p-2.5 rounded-lg flex flex-col">
                <span className="text-[8px] font-semibold text-zinc-400 uppercase tracking-wider">Active Inst</span>
                <span className="text-sm font-extrabold text-black mt-1">42</span>
              </div>
              <div className="bg-white border border-zinc-200 p-2.5 rounded-lg flex flex-col">
                <span className="text-[8px] font-semibold text-zinc-400 uppercase tracking-wider">Req / Sec</span>
                <span className="text-sm font-extrabold text-black mt-1">{counter}</span>
              </div>
              <div className="bg-white border border-zinc-200 p-2.5 rounded-lg flex flex-col">
                <span className="text-[8px] font-semibold text-zinc-400 uppercase tracking-wider">Health</span>
                <span className="text-sm font-extrabold text-emerald-600 mt-1">99.9%</span>
              </div>
            </div>
            {/* Visual Simulated Chart */}
            <div className="bg-white border border-zinc-200 rounded-lg p-3 flex flex-col gap-2">
              <span className="text-[9px] font-bold text-black">Traffic Load</span>
              <div className="h-16 flex items-end gap-1.5 pt-2 border-b border-zinc-100">
                {[45, 60, 32, 55, 75, 48, 90, 65, 80, 52, 60, 78].map((h, i) => (
                  <motion.div 
                    key={i} 
                    className="bg-black/85 w-full rounded-t-sm" 
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ delay: i * 0.05, duration: 0.5 }}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white border border-zinc-200 rounded-lg p-4 flex flex-col gap-3">
            <span className="text-[10px] font-bold text-black">System Performance</span>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-[9px]">
                <span className="text-zinc-500">Core Engine Load</span>
                <span className="font-semibold text-black">24%</span>
              </div>
              <div className="w-full bg-zinc-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-zinc-800 h-full rounded-full" style={{ width: "24%" }} />
              </div>
              <div className="flex justify-between items-center text-[9px] mt-1">
                <span className="text-zinc-500">Memory Allocation</span>
                <span className="font-semibold text-black">68%</span>
              </div>
              <div className="w-full bg-zinc-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-black h-full rounded-full" style={{ width: "68%" }} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// 2. PhoneMockup (Mobile App Development)
export function PhoneMockup() {
  const [balance, setBalance] = useState(14850);
  const [activeScreen, setActiveScreen] = useState("wallet");

  return (
    <div className="w-56 h-[330px] bg-zinc-950 border-[5px] border-zinc-900 rounded-[32px] shadow-lg overflow-hidden flex flex-col font-sans select-none relative mx-auto">
      {/* iOS notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-4 bg-zinc-900 rounded-b-xl z-20 flex items-center justify-center">
        <span className="w-1.5 h-1.5 rounded-full bg-black block mr-6" />
        <span className="w-4 h-0.5 rounded-full bg-zinc-800 block" />
      </div>

      {/* Screen Inner */}
      <div className="flex-grow pt-5 pb-3 px-3 bg-white flex flex-col gap-3.5 z-10 text-black">
        {/* Status Bar */}
        <div className="flex justify-between items-center text-[8px] font-bold text-zinc-400">
          <span>09:14 AM</span>
          <div className="flex gap-1 items-center">
            <span>5G</span>
            <div className="w-3 h-1.5 border border-zinc-300 rounded-sm bg-zinc-500" />
          </div>
        </div>

        {activeScreen === "wallet" ? (
          <div className="flex-grow flex flex-col gap-3">
            {/* Wallet header */}
            <div className="flex flex-col gap-0.5 mt-1">
              <span className="text-[9px] font-semibold text-zinc-400">Available Balance</span>
              <span className="text-base font-black tracking-tight">${balance.toLocaleString()}</span>
            </div>
            
            {/* Card Graphic */}
            <motion.div 
              className="bg-black text-white p-3 rounded-xl flex flex-col justify-between h-20 shadow-sm"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex justify-between items-start">
                <span className="text-[7px] font-bold tracking-widest text-zinc-400">ATS PAY</span>
                <span className="w-4 h-3 bg-zinc-700 rounded-sm" />
              </div>
              <div className="flex flex-col">
                <span className="text-[8px] font-mono">•••• •••• •••• 4022</span>
                <div className="flex justify-between items-center mt-1 text-[7px] text-zinc-400">
                  <span>ATS SUITE CORP</span>
                  <span>08/29</span>
                </div>
              </div>
            </motion.div>

            {/* Quick action buttons */}
            <div className="grid grid-cols-2 gap-1.5">
              <button 
                onClick={() => setBalance(b => b + 500)}
                className="bg-zinc-100 hover:bg-zinc-200 border border-zinc-200/50 py-1.5 rounded-lg text-[8px] font-bold text-center transition-colors"
              >
                + Add Cash
              </button>
              <button 
                onClick={() => setBalance(b => Math.max(0, b - 200))}
                className="bg-black text-white py-1.5 rounded-lg text-[8px] font-bold text-center hover:bg-zinc-800 transition-colors"
              >
                Send Money
              </button>
            </div>

            {/* Transaction Logs */}
            <div className="flex flex-col gap-1.5 mt-1">
              <span className="text-[8px] font-bold text-zinc-400 uppercase tracking-widest">Transactions</span>
              <div className="flex justify-between items-center text-[9px] border-b border-zinc-100 pb-1">
                <span className="font-semibold">Nexon Logistics</span>
                <span className="text-zinc-600">-$240.00</span>
              </div>
              <div className="flex justify-between items-center text-[9px] border-b border-zinc-100 pb-1">
                <span className="font-semibold">AWS Dev Services</span>
                <span className="text-zinc-600">-$150.00</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-grow flex flex-col gap-3">
            <span className="text-[10px] font-bold">Account profile</span>
            <div className="flex items-center gap-2 bg-zinc-50 border border-zinc-200 rounded-xl p-2">
              <div className="w-6 h-6 rounded-full bg-zinc-200 flex items-center justify-center text-[9px] font-extrabold">AS</div>
              <div className="flex flex-col">
                <span className="text-[9px] font-bold">Anbarasan S.</span>
                <span className="text-[7px] text-zinc-500">CEO, Founder</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab Bar */}
        <div className="border-t border-zinc-200 pt-2 flex justify-around mt-auto">
          <button 
            onClick={() => setActiveScreen("wallet")} 
            className={`text-[8px] font-bold ${activeScreen === "wallet" ? "text-black" : "text-zinc-400"}`}
          >
            Wallet
          </button>
          <button 
            onClick={() => setActiveScreen("profile")} 
            className={`text-[8px] font-bold ${activeScreen === "profile" ? "text-black" : "text-zinc-400"}`}
          >
            Profile
          </button>
        </div>
      </div>
    </div>
  );
}

// 3. AIConsoleMockup (Cognitive AI Agents)
export function AIConsoleMockup() {
  const [logLines, setLogLines] = useState<string[]>([]);
  const allLogs = [
    "> INITIATING COGNITIVE RUNTIME...",
    "> AGENT WORKSPACE DETECTED: [ats-saas-repo]",
    "> CONNECTING PGVECTOR DATABASE... OK",
    "> LOADING NEURAL ATTENTION PIPELINE...",
    "> USER_REQ: 'Generate edge cloud deployment'",
    "> THINKING: query database vector index...",
    "> GENERATING CODE: main.tf (AWS Lambda)",
    "> [DEPLOYING] Cloud node running (node_03)",
    "> [SUCCESS] 99.98% operational efficiency."
  ];

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < allLogs.length) {
        setLogLines((prev) => [...prev, allLogs[i]]);
        i++;
      } else {
        setLogLines([]);
        i = 0;
      }
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full bg-zinc-950 border border-zinc-800 rounded-xl shadow-md p-4 overflow-hidden flex flex-col font-mono text-[9px] select-none text-zinc-300">
      <div className="flex items-center gap-1.5 pb-2.5 border-b border-zinc-800/80 mb-2">
        <span className="w-2 h-2 rounded-full bg-zinc-700" />
        <span className="w-2 h-2 rounded-full bg-zinc-700" />
        <span className="w-2 h-2 rounded-full bg-zinc-700" />
        <span className="text-[8px] text-zinc-500 ml-1.5">cognitive-engine.bash</span>
      </div>
      <div className="flex-1 flex flex-col gap-1.5 overflow-y-auto leading-relaxed">
        {logLines.map((line, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            className={line.includes("SUCCESS") ? "text-emerald-500 font-bold" : line.includes("USER_REQ") ? "text-white font-semibold" : "text-zinc-400"}
          >
            {line}
          </motion.div>
        ))}
        <motion.span 
          animate={{ opacity: [1, 0, 1] }} 
          transition={{ repeat: Infinity, duration: 1 }}
          className="w-1.5 h-3 bg-zinc-300 inline-block mt-0.5"
        />
      </div>
    </div>
  );
}

// 4. CloudTopologyMockup (Cloud Infrastructure)
export function CloudTopologyMockup() {
  const [activeNode, setActiveNode] = useState<string>("lb");

  return (
    <div className="w-full h-full bg-white border border-zinc-200 rounded-xl shadow-md p-4 flex flex-col select-none font-sans">
      <span className="text-[10px] font-bold text-black mb-3 pb-1 border-b border-zinc-100 flex items-center justify-between">
        <span>Cloud Topology Mesh</span>
        <span className="text-[8px] font-mono text-zinc-400 uppercase">Interactive Map</span>
      </span>

      {/* SVG Canvas for Server topology */}
      <div className="flex-grow relative flex items-center justify-center h-28 bg-zinc-50 border border-zinc-100 rounded-lg overflow-hidden">
        {/* Connection paths */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          {/* Paths connecting nodes */}
          <line x1="50%" y1="18%" x2="25%" y2="55%" stroke="#d4d4d8" strokeWidth="1" strokeDasharray="3,3" />
          <line x1="50%" y1="18%" x2="50%" y2="55%" stroke="#d4d4d8" strokeWidth="1" strokeDasharray="3,3" />
          <line x1="50%" y1="18%" x2="75%" y2="55%" stroke="#d4d4d8" strokeWidth="1" strokeDasharray="3,3" />
          
          <line x1="25%" y1="55%" x2="50%" y2="85%" stroke="#d4d4d8" strokeWidth="1" />
          <line x1="50%" y1="55%" x2="50%" y2="85%" stroke="#d4d4d8" strokeWidth="1" />
          <line x1="75%" y1="55%" x2="50%" y2="85%" stroke="#d4d4d8" strokeWidth="1" />
        </svg>

        {/* Load Balancer */}
        <button 
          onClick={() => setActiveNode("lb")}
          className={`absolute top-[10%] left-[50%] -translate-x-1/2 w-8 h-8 rounded-full border flex items-center justify-center transition-all ${activeNode === "lb" ? "bg-black border-black text-white scale-105 shadow-sm" : "bg-white border-zinc-300 text-zinc-500"}`}
        >
          <Server className="w-3.5 h-3.5" />
        </button>

        {/* Worker Nodes */}
        <button 
          onClick={() => setActiveNode("node1")}
          className={`absolute top-[48%] left-[15%] w-8 h-8 rounded-full border flex items-center justify-center transition-all ${activeNode === "node1" ? "bg-black border-black text-white scale-105 shadow-sm" : "bg-white border-zinc-300 text-zinc-500"}`}
        >
          <span className="text-[8px] font-bold">W-1</span>
        </button>

        <button 
          onClick={() => setActiveNode("node2")}
          className={`absolute top-[48%] left-[43%] w-8 h-8 rounded-full border flex items-center justify-center transition-all ${activeNode === "node2" ? "bg-black border-black text-white scale-105 shadow-sm" : "bg-white border-zinc-300 text-zinc-500"}`}
        >
          <span className="text-[8px] font-bold">W-2</span>
        </button>

        <button 
          onClick={() => setActiveNode("node3")}
          className={`absolute top-[48%] left-[71%] w-8 h-8 rounded-full border flex items-center justify-center transition-all ${activeNode === "node3" ? "bg-black border-black text-white scale-105 shadow-sm" : "bg-white border-zinc-300 text-zinc-500"}`}
        >
          <span className="text-[8px] font-bold">W-3</span>
        </button>

        {/* DB cluster */}
        <button 
          onClick={() => setActiveNode("db")}
          className={`absolute bottom-[8%] left-[50%] -translate-x-1/2 w-8 h-8 rounded-full border flex items-center justify-center transition-all ${activeNode === "db" ? "bg-black border-black text-white scale-105 shadow-sm" : "bg-white border-zinc-300 text-zinc-500"}`}
        >
          <Database className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Info panel */}
      <div className="bg-zinc-50 border border-zinc-150 rounded-lg p-2.5 mt-3 flex justify-between items-center text-[9px]">
        {activeNode === "lb" && (
          <>
            <span className="font-bold text-black">Load Balancer (Ingress)</span>
            <span className="text-zinc-500">Latency: 2ms • Health: 100%</span>
          </>
        )}
        {activeNode === "node1" && (
          <>
            <span className="font-bold text-black">Worker Node #1</span>
            <span className="text-zinc-500">CPU Load: 34% • Pods: 6 active</span>
          </>
        )}
        {activeNode === "node2" && (
          <>
            <span className="font-bold text-black">Worker Node #2</span>
            <span className="text-zinc-500">CPU Load: 78% • Scaling up...</span>
          </>
        )}
        {activeNode === "node3" && (
          <>
            <span className="font-bold text-black">Worker Node #3</span>
            <span className="text-zinc-500">CPU Load: 12% • Idle standby</span>
          </>
        )}
        {activeNode === "db" && (
          <>
            <span className="font-bold text-black">Postgres Cluster</span>
            <span className="text-zinc-500">IOPS: 12,500 • pgvector cache: OK</span>
          </>
        )}
      </div>
    </div>
  );
}

// 5. SecurityAuthMockup (Cybersecurity & Identity)
export function SecurityAuthMockup() {
  const [authStatus, setAuthStatus] = useState<"scanning" | "granted">("scanning");

  useEffect(() => {
    const timer = setInterval(() => {
      setAuthStatus((s) => (s === "scanning" ? "granted" : "scanning"));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-full bg-zinc-950 border border-zinc-800 rounded-xl shadow-md p-4 flex flex-col justify-between select-none font-mono text-[9px] text-zinc-300">
      <div className="flex justify-between items-center pb-2.5 border-b border-zinc-800/80 mb-2">
        <span>SECURITY AUTH SYSTEM</span>
        <span className="text-[8px] text-zinc-500 uppercase">IAM Portal</span>
      </div>

      <div className="flex-grow flex flex-col items-center justify-center py-2 gap-3">
        {authStatus === "scanning" ? (
          <>
            {/* Holographic scanning circle */}
            <div className="relative w-16 h-16 rounded-full border border-zinc-800 flex items-center justify-center overflow-hidden">
              <motion.div 
                className="absolute w-full h-[1.5px] bg-white opacity-85"
                animate={{ top: ["0%", "100%", "0%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
              <Cpu className="w-5 h-5 text-zinc-500" />
            </div>
            <span className="text-[8px] text-zinc-500 uppercase tracking-widest animate-pulse">Scanning identity...</span>
          </>
        ) : (
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-8 h-8 text-emerald-500" />
            <span className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest">Access Granted</span>
            <div className="bg-zinc-900 border border-zinc-800 rounded p-2 text-[7px] text-zinc-400 text-center w-full max-w-[160px] leading-relaxed">
              ID: <b>USER_94220</b><br />
              ROLES: <b>["infra-admin", "iam"]</b>
            </div>
          </motion.div>
        )}
      </div>

      <div className="text-[7.5px] text-zinc-600 text-center mt-2 border-t border-zinc-800/80 pt-2">
        ENCRYPTED SESSION (AES-256-GCM)
      </div>
    </div>
  );
}

// 6. DataPipelineMockup (Data & Analytics Engines)
export function DataPipelineMockup() {
  const [logRows, setLogRows] = useState<{ time: string; msg: string }[]>([]);
  const messages = [
    "PostgreSQL vacuum completed.",
    "Calculated pgvector cosine indices.",
    "Synced cache store with Redis (0.3ms).",
    "Ingested 1,500 new user profiles.",
    "Generated operational telemetry log.",
    "DB connection count healthy: 180"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      const timeStr = date.toTimeString().split(" ")[0];
      const randMsg = messages[Math.floor(Math.random() * messages.length)];
      setLogRows((prev) => [{ time: timeStr, msg: randMsg }, ...prev].slice(0, 4));
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full bg-white border border-zinc-200 rounded-xl shadow-md p-4 flex flex-col justify-between select-none font-mono text-[9px]">
      <div>
        <span className="text-[10px] font-bold text-black flex items-center justify-between pb-1 border-b border-zinc-100">
          <span>Data Ingestion Sync</span>
          <span className="text-[8px] text-zinc-400">pgvector clusters</span>
        </span>

        {/* Live log streaming */}
        <div className="flex flex-col gap-1.5 mt-3 min-h-[72px]">
          {logRows.length === 0 ? (
            <span className="text-zinc-400 italic">Listening for cluster event packets...</span>
          ) : (
            logRows.map((row, idx) => (
              <motion.div 
                key={idx} 
                className="flex items-start gap-1.5 leading-tight"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <span className="text-zinc-400 shrink-0">[{row.time}]</span>
                <span className="text-black font-medium">{row.msg}</span>
              </motion.div>
            ))
          )}
        </div>
      </div>

      <div className="mt-3 pt-2.5 border-t border-zinc-100 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Activity className="w-3 h-3 text-black animate-pulse" />
          <span className="text-[8px] font-bold uppercase text-black tracking-wider">Cluster status</span>
        </div>
        <span className="text-[8px] px-2 py-0.5 bg-zinc-100 border border-zinc-200 rounded-full font-bold text-zinc-600">CONNECTED</span>
      </div>
    </div>
  );
}

// Main Selector Component
export default function InteractiveMockups({ type }: { type: string }) {
  switch (type) {
    case "website":
      return <BrowserMockup />;
    case "mobile":
      return <PhoneMockup />;
    case "ai":
      return <AIConsoleMockup />;
    case "cloud":
      return <CloudTopologyMockup />;
    case "security":
      return <SecurityAuthMockup />;
    case "data":
      return <DataPipelineMockup />;
    default:
      return <BrowserMockup />;
  }
}
