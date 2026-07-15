"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Navigation Links array
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/#about" },
    { name: "Projects", href: "/#projects" },
    { name: "Blogs", href: "/blogs" },
    { name: "Contact", href: "/#contact" },
  ];

  // 1. Auto-close mobile navbar on page change / scroll
  useEffect(() => {
    const handleScroll = () => {
      if (open) setOpen(false);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [open]);

  // 2. Auto-close menu on path route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-4 py-3 sm:px-8">
      <nav className="max-w-6xl mx-auto backdrop-blur-xl bg-black/60 border border-zinc-800/80 rounded-2xl shadow-2xl shadow-black/50 transition-all duration-300">
        <div className="flex justify-between items-center px-6 py-3.5">
          {/* Brand Logo */}
          <Link
            href="/"
            className="text-white text-xl font-bold tracking-tight flex items-center gap-1 group"
          >
            <span>Nitesh</span>
            <span className="text-blue-500 group-hover:translate-x-0.5 transition-transform">
              .dev
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1 bg-zinc-900/50 p-1.5 rounded-xl border border-zinc-800/60">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Mobile Animated Hamburger Button */}
          <button
            aria-label="Toggle Navigation Menu"
            className="md:hidden text-zinc-300 hover:text-white p-2 rounded-xl bg-zinc-900/80 border border-zinc-800 focus:outline-none"
            onClick={() => setOpen(!open)}
          >
            <motion.div
              animate={{ rotate: open ? 90 : 0 }}
              transition={{ duration: 0.2 }}
              className="w-6 h-6 flex items-center justify-center text-xl font-bold"
            >
              {open ? "✕" : "☰"}
            </motion.div>
          </button>
        </div>

        {/* Mobile Animated Menu Dropdown */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden overflow-hidden border-t border-zinc-800/80 bg-zinc-950/90 rounded-b-2xl"
            >
              <div className="flex flex-col p-4 space-y-2">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={`px-4 py-3 rounded-xl text-base font-medium transition-all ${
                        isActive
                          ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
                          : "text-zinc-300 hover:text-white hover:bg-zinc-900"
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}