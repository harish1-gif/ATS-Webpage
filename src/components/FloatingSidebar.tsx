"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Home,
  Briefcase,
  Code,
  X,
  Info,
  Settings,
  BookOpen,
  Users,
  Mail,
  Cpu,
  User,
} from "lucide-react";

const tabs = [
  { name: "Home", icon: Home, href: "/" },
  { name: "About", icon: Info, href: "/about" },
  { name: "Portfolio", icon: Briefcase, href: "/portfolio" },
  { name: "Services", icon: Code, href: "/services" },
  { name: "Technologies", icon: Cpu, href: "/technologies" },
  { name: "Blog", icon: BookOpen, href: "/blog" },
  { name: "Careers", icon: Users, href: "/careers" },
  { name: "Contact", icon: Mail, href: "/contact" },
  { name: "Client", icon: User, href: "/client" },
  { name: "Admin", icon: Settings, href: "/admin" },
];

export default function FloatingSidebar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [hoveredTab, setHoveredTab] = useState<number | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 200;
      setIsScrolled(scrolled);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const tabIndex = tabs.findIndex(tab => pathname === tab.href || pathname.startsWith(tab.href));
    if (tabIndex !== -1) setActiveTab(tabIndex);
  }, [pathname]);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const sidebar = document.getElementById("floating-sidebar");
      
      if (sidebar && !sidebar.contains(target) && isExpanded) {
        setIsExpanded(false);
      }
    };

    if (isExpanded) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isExpanded]);

  return (
    <AnimatePresence>
      {isScrolled && (
        <motion.div
          id="floating-sidebar"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed left-8 top-1/2 -translate-y-1/2 z-40"
        >
          {/* Futuristic container with floating animation */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            {/* Ambient glow background - only visible when expanded */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                    scale: [1, 1.1, 1],
                  }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -inset-12 bg-gradient-to-r from-gray-200/20 via-gray-300/20 to-gray-200/20 rounded-full blur-3xl"
                />
              )}
            </AnimatePresence>

            {/* Central circular node - CLICKABLE */}
            <motion.button
              onClick={() => setIsExpanded(!isExpanded)}
              className="relative w-16 h-16 mx-auto cursor-pointer focus:outline-none"
              animate={{
                rotate: isExpanded ? 180 : 0,
              }}
              transition={{
                duration: isExpanded ? 0.3 : 20,
                repeat: isExpanded ? 0 : Infinity,
                ease: isExpanded ? "easeInOut" : "linear",
              }}
            >
              {/* Rotating outer ring */}
              <motion.div
                className="absolute inset-0 rounded-full border border-gray-300/50 bg-gradient-to-br from-gray-100/20 via-gray-200/15 to-gray-300/20 backdrop-blur-xl"
              />

              {/* Inner pulsing circle */}
              <motion.div
                className="absolute inset-2 rounded-full bg-gradient-to-br from-gray-100/60 to-gray-200/50 shadow-lg shadow-gray-400/30"
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(156, 163, 175, 0.4)",
                    "0 0 40px rgba(156, 163, 175, 0.7)",
                    "0 0 20px rgba(156, 163, 175, 0.4)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />

              {/* Center dot */}
              <motion.div
                className="absolute top-1/2 left-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-400 shadow-lg shadow-gray-500/60"
                animate={{
                  scale: [1, 1.5, 1],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />

              {/* X icon when expanded */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <X className="w-6 h-6 text-gray-600" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Navigation tabs - EXPANDABLE/COLLAPSIBLE */}
            <AnimatePresence>
              {isExpanded && (
                <div className="absolute top-1/2 left-32 -translate-y-1/2 max-h-96 overflow-y-auto flex flex-col gap-3">
                  {tabs.map((tab, idx) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === idx;
                    const isHovered = hoveredTab === idx;

                    return (
                      <motion.div
                        key={tab.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ delay: idx * 0.05 }}
                        className="relative"
                      >
                        {/* Connector line from center to tab */}
                        <motion.div
                          className="absolute -left-8 top-1/2 h-0.5 -translate-y-1/2 bg-gradient-to-r from-gray-400/60 to-transparent"
                          animate={{
                            width: isHovered || isActive ? 32 : 24,
                            opacity: isHovered || isActive ? 1 : 0.6,
                          }}
                          transition={{ duration: 0.3 }}
                        />

                        {/* Tab panel - aerodynamic design */}
                        <Link href={tab.href}>
                          <motion.div
                            onHoverStart={() => setHoveredTab(idx)}
                            onHoverEnd={() => setHoveredTab(null)}
                            className={`relative px-4 py-2 rounded-r-2xl backdrop-blur-xl border overflow-hidden group cursor-pointer transition-all ${
                              isActive
                                ? "border-gray-300 bg-gradient-to-r from-gray-100/60 to-gray-200/40 shadow-lg shadow-gray-400/60"
                                : "border-gray-300/50 bg-gradient-to-r from-gray-50/40 to-gray-100/30 shadow-lg shadow-gray-300/20"
                            }`}
                            animate={{
                              x: isHovered ? 12 : 0,
                              boxShadow: isHovered
                                ? "0 0 30px rgba(156, 163, 175, 0.7)"
                                : isActive
                                ? "0 0 20px rgba(156, 163, 175, 0.5)"
                                : "0 0 10px rgba(107, 114, 128, 0.2)",
                            }}
                            transition={{ duration: 0.3 }}
                          >
                            {/* Animated background gradient */}
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-gray-200/0 via-gray-200/40 to-gray-300/0 opacity-0 group-hover:opacity-100"
                              animate={{
                                x: isHovered ? ["100%", "-100%"] : "100%",
                              }}
                              transition={{
                                duration: 2,
                                repeat: isHovered ? Infinity : 0,
                                ease: "linear",
                              }}
                            />

                            {/* Content */}
                            <div className="relative z-10 flex items-center gap-2">
                              <Icon className="w-3.5 h-3.5 text-gray-700 flex-shrink-0" />
                              <span className="text-xs font-bold uppercase tracking-wide text-gray-800 whitespace-nowrap">
                                {tab.name}
                              </span>

                              {/* Active indicator dot */}
                              {isActive && (
                                <motion.div
                                  layoutId="active-dot"
                                  className="w-1.5 h-1.5 rounded-full bg-gray-600 ml-2"
                                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                />
                              )}
                            </div>

                            {/* Futuristic edge accent */}
                            <div className="absolute top-0 right-0 w-0.5 h-full bg-gradient-to-b from-gray-400/60 to-transparent" />
                          </motion.div>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </AnimatePresence>

            {/* Floating particles effect - only when expanded */}
            <AnimatePresence>
              {isExpanded && (
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{
                        y: [0, -100, 0],
                        x: [0, Math.cos(i) * 50, 0],
                        opacity: [0, 1, 0],
                      }}
                      exit={{ opacity: 0 }}
                      transition={{
                        duration: 3 + i,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.3,
                      }}
                      className="absolute w-1 h-1 rounded-full bg-gray-400/70"
                      style={{
                        left: `${20 + i * 15}px`,
                        top: "50%",
                      }}
                    />
                  ))}
                </div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
