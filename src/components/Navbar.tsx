"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Technologies", href: "/technologies" },
  { name: "Careers", href: "/careers" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [popupClosed, setPopupClosed] = useState(false);
  const [forceShowNav, setForceShowNav] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 20;
      setIsScrolled(scrolled);
      // Reset popup closed state when scrolling back to top
      if (!scrolled) {
        setPopupClosed(false);
        setForceShowNav(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Top Navbar - Hidden when scrolled on HOME only, always visible on other pages */}
      <motion.header
        initial={{ opacity: 1, y: 0 }}
        animate={isScrolled && !forceShowNav && pathname === "/" ? { opacity: 0, y: -100 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
          isScrolled && !forceShowNav && pathname === "/" ? "pointer-events-none" : ""
        } ${
          !isScrolled && !forceShowNav && pathname === "/"
            ? "py-6 px-4 md:px-12"
            : "py-3 px-4 md:px-8"
        }`}
      >
        <nav
          className={`mx-auto max-w-7xl w-full rounded-2xl transition-all duration-500 ${
            !isScrolled || pathname === "/"
              ? "bg-transparent border-transparent px-2 py-2"
              : "glass-panel bg-white/85 border-zinc-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.03)] px-6 py-3.5"
          } flex items-center justify-between`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/ATS_LOGO.png"
              alt="AGZUS Technology Solutions"
              width={120}
              height={90}
              className="h-12 w-auto object-contain md:h-14"
              priority
            />
            {/* Company Name - Hidden on mobile, visible on md+ */}
            <div className="hidden sm:flex flex-col gap-0.5">
              <span className="leading-none uppercase" style={{
                fontFamily: "'Arial', 'Helvetica', sans-serif",
                fontWeight: 900,
                fontSize: 'clamp(0.45rem, 1vw, 0.65rem)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: '#000000',
                lineHeight: '1',
                fontStyle: 'normal',
                textShadow: '0 2px 0 rgba(0, 0, 0, 0.15), 0 4px 0 rgba(0, 0, 0, 0.08)',
                WebkitFontSmoothing: 'antialiased',
                MozOsxFontSmoothing: 'grayscale',
                paintOrder: 'stroke fill',
                opacity: 0.7,
                transition: 'opacity 0.3s ease'
              }}>
                AGZUS
              </span>
              <span className="font-extrabold tracking-[0.18em] text-zinc-600 uppercase leading-none" style={{
                fontFamily: "'Arial', 'Helvetica', sans-serif",
                fontSize: 'clamp(0.45rem, 1vw, 0.65rem)',
                letterSpacing: '0.18em',
                fontWeight: 700,
                textTransform: 'uppercase',
                opacity: 0.7,
                transition: 'opacity 0.3s ease'
              }}>
                TECHNOLOGY SOLUTIONS
              </span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-1.5">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className="relative px-3.5 py-2 text-xs font-semibold uppercase tracking-wider text-zinc-600 hover:text-black transition-colors duration-200"
                >
                  {isActive && (
                    <motion.span
                      layoutId="active-nav-indicator"
                      className="absolute inset-0 bg-zinc-100/80 border border-zinc-200 rounded-lg -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Action Portals */}
          <div className="hidden lg:flex items-center gap-3">
          </div>

          {/* Mobile Toggle */}
          <div className="flex lg:hidden items-center gap-3">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-zinc-50 border border-zinc-200 text-black hover:bg-zinc-100 transition-colors"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu Panel */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-4 right-4 mt-2 p-6 glass-panel bg-white/95 rounded-2xl border-zinc-200 shadow-xl flex flex-col gap-5 lg:hidden z-50"
            >
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`px-4 py-3 rounded-xl text-sm font-semibold uppercase tracking-wider transition-all ${
                        isActive
                          ? "bg-zinc-100 border border-zinc-200 text-black"
                          : "text-zinc-600 hover:bg-zinc-50 border border-transparent"
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </div>
              
              <div className="w-full h-px bg-zinc-200" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Floating Moon-shaped Popup - Appears when scrolled (HOME PAGE ONLY) */}
      <AnimatePresence>
        {isScrolled && !popupClosed && pathname === "/" && (
          <>
            {/* UI-1: Moon Popup Container (Mobile Responsive) */}
            <motion.div
            initial={{ 
              scale: 0,
              opacity: 0,
              clipPath: "circle(0% at 100% 50%)"
            }}
            animate={{ 
              scale: 1,
              opacity: 1,
              clipPath: "circle(150% at 100% 50%)"
            }}
            exit={{ 
              scale: 0,
              opacity: 0,
              clipPath: "circle(0% at 100% 50%)"
            }}
            transition={{ 
              type: "spring", 
              stiffness: 200, 
              damping: 25,
              duration: 0.6
            }}
            className="fixed bottom-4 left-4 sm:bottom-8 sm:left-8 w-[calc(100vw-2rem)] sm:w-72 max-h-[85vh] z-50 glass-panel bg-white/95 border border-zinc-200 shadow-[-20px_20px_60px_rgba(0,0,0,0.15)] flex flex-col overflow-hidden"
            style={{
              borderRadius: "0 200px 200px 0"
            }}
          >
            {/* UI-2: Popup Header with Responsive Padding & Logo Size */}
            <div className="relative flex items-center justify-between p-3 sm:p-6 border-b border-zinc-200/50 bg-gradient-to-r from-zinc-50 to-white gap-2">
              <Link href="/" className="flex items-center gap-2 group flex-shrink-0 min-w-0">
                <Image
                  src="/ATS_LOGO.png"
                  alt="AGZUS"
                  width={80}
                  height={60}
                  className="h-8 sm:h-10 w-auto object-contain"
                />
              </Link>
              
              {/* UI-3: Header Close Button (Responsive Size - Larger on Mobile) */}
              <motion.button
                whileHover={{ scale: 1.15, backgroundColor: "#dc2626" }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  setPopupClosed(true);
                  setForceShowNav(true);
                }}
                className="flex-shrink-0 w-10 h-10 sm:w-9 sm:h-9 flex items-center justify-center rounded-full bg-red-500 hover:bg-red-600 transition-all shadow-lg hover:shadow-xl border-2 border-red-600"
                title="Close menu"
              >
                <X className="w-5 h-5 sm:w-5 sm:h-5 text-white font-bold" strokeWidth={3} />
              </motion.button>
            </div>

            {/* UI-4: Navigation Items (Responsive Padding & Font Size) */}
            <nav className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-1 sm:space-y-2">
              {navLinks.map((link, idx) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.08 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setPopupClosed(true)}
                      className={`block px-3 sm:px-4 py-2 sm:py-3 rounded-lg font-semibold uppercase tracking-wider text-xs sm:text-sm transition-all ${
                        isActive
                          ? "bg-black text-white shadow-md"
                          : "text-zinc-600 hover:bg-zinc-100"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* UI-5: Popup Footer Actions (Responsive Text Size & Padding) */}
            <div className="p-3 sm:p-4 border-t border-zinc-200/50 bg-gradient-to-r from-white to-zinc-50 space-y-2 sm:space-y-3">
              <Link
                href="/client"
                className="block w-full py-2 sm:py-3 text-center border border-zinc-200 hover:bg-zinc-50 rounded-lg text-[10px] sm:text-xs font-bold uppercase tracking-wider text-black transition-all"
              >
                Client Portal
              </Link>
              <Link
                href="/admin"
                className="block w-full py-2 sm:py-3 text-center bg-black text-white rounded-lg text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow-md hover:bg-zinc-900 transition-all"
              >
                Admin Console
              </Link>
            </div>
            </motion.div>

            {/* UI-6: External Close Button (Responsive Size & Position) */}
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              whileHover={{ scale: 1.15, backgroundColor: "#1f2937" }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                setPopupClosed(true);
                setForceShowNav(true);
              }}
              className="fixed bottom-4 left-4 sm:bottom-8 sm:left-[18rem] w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full bg-black hover:bg-zinc-800 transition-all shadow-lg z-50 border border-zinc-700"
              title="Close"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5 text-white font-bold" strokeWidth={3} />
            </motion.button>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
