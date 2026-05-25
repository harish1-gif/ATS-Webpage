"use client";

import Link from "next/link";
import Image from "next/image";
import { Cpu, Mail, Phone, MapPin, Send, ArrowUpRight } from "lucide-react";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setLoading(true);
    setError("");

    try {
      // Send confirmation email to subscriber
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email: email,
          type: "newsletter_subscription"
        }),
      });

      if (!response.ok) throw new Error("Failed to subscribe");

      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    } catch (err) {
      setError("Subscription failed. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="relative border-t border-zinc-200 bg-white overflow-hidden">
      {/* Background grids and glowing blobs */}
      <div className="absolute inset-0 -z-10" />

      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-0">
              <Image
                src="/ATS_LOGO.png"
                alt="AGZUS Technology Solutions"
                width={300}
                height={240}
                className="h-72 w-auto object-contain"
                priority
              />
            </Link>
            
            <p className="text-sm text-zinc-500 max-w-sm leading-relaxed font-semibold">
              Empowering global enterprises with futuristic AI automation, hyper-scalable cloud architectures, and next-generation custom software solutions.
            </p>
            
            {/* Contact details */}
            <div className="flex flex-col gap-3 text-sm text-zinc-500">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-black shrink-0" />
                <span>Pondicherry, Puducherry 605001, India</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-black shrink-0" />
                <a href="mailto:info@agzus.com" className="hover:text-black transition-colors">
                  info@agzus.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-black shrink-0" />
                <a href="tel:+914132223344" className="hover:text-black transition-colors">
                  +91 (413) 222 3344
                </a>
              </div>
            </div>
          </div>

          {/* Quick links: Services */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-black mb-6">
              Solutions
            </h3>
            <ul className="flex flex-col gap-4 text-sm">
              <li>
                <Link href="/services#ai" className="text-zinc-500 hover:text-black flex items-center gap-1 group">
                  AI & Automation
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/services#cloud" className="text-zinc-500 hover:text-black flex items-center gap-1 group">
                  Cloud Engineering
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/services#devops" className="text-zinc-500 hover:text-black flex items-center gap-1 group">
                  DevOps Automation
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/services#custom" className="text-zinc-500 hover:text-black flex items-center gap-1 group">
                  Custom Software
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick links: Company */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-black mb-6">
              Enterprise
            </h3>
            <ul className="flex flex-col gap-4 text-sm">
              <li>
                <Link href="/about" className="text-zinc-500 hover:text-black">
                  About ATS
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-zinc-500 hover:text-black">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link href="/technologies" className="text-zinc-500 hover:text-black">
                  Tech Catalog
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-zinc-500 hover:text-black">
                  Careers at ATS
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscribe */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-black mb-6">
              Services Discussion
            </h3>
            <p className="text-sm text-zinc-500 mb-4 leading-relaxed">
              If you want our service and discuss with us, send your Gmail.
            </p>
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="email"
                placeholder="your-email@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="w-full px-3 py-2 text-sm bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:border-black transition-colors disabled:opacity-50"
                required
                suppressHydrationWarning
              />
              <button
                type="submit"
                disabled={loading}
                suppressHydrationWarning
                className="px-3.5 py-2 bg-black text-white rounded-xl hover:bg-zinc-800 transition-colors flex items-center justify-center shrink-0 disabled:opacity-50"
              >
                {subscribed ? "Done" : loading ? "..." : <Send className="w-4 h-4" />}
              </button>
            </form>
            {subscribed && (
              <p className="text-xs text-emerald-600 mt-2 font-semibold">
                ✓ We received your email! We'll contact you soon.
              </p>
            )}
            {error && (
              <p className="text-xs text-red-600 mt-2 font-semibold">
                {error}
              </p>
            )}
          </div>

        </div>

        {/* Footer bottom bar */}
        <div className="mt-16 pt-8 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <p>© {new Date().getFullYear()} AGZUS Technology Solutions. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-zinc-600 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-zinc-600 transition-colors">
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
