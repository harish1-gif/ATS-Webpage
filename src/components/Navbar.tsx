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
      {/* Top Navbar - Hidden when scrolled, only sidebar shows */}
      <motion.header
        initial={{ opacity: 1, y: 0 }}
        animate={isScrolled ? { opacity: 0, y: -100 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 py-3 px-4 md:px-8 ${
          isScrolled ? "pointer-events-none" : ""
        }`}
        suppressHydrationWarning
      >
        <nav
          className={`mx-auto max-w-7xl w-full rounded-2xl transition-all duration-500 glass-panel bg-white/85 border-zinc-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.03)] px-6 py-3.5 flex items-center justify-between`}
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
              suppressHydrationWarning
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
        {isScrolled && !popupClosed && pathname === "/" && null}
      </AnimatePresence>
    </>
  );
}
