"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Moon, Sun, Menu, X } from "lucide-react";
import { Magnetic } from "./magnetic";
import { portfolioContent } from "@/data/content";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Scroll Progress Bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDarkMode = () => {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  };

  const navLinks = [
    { name: "About Me", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      {/* 2px Animated Scroll Progress Bar at the top */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-[#0a0a0a] dark:bg-[#f5f5f5] z-[100] origin-left"
        style={{ scaleX }}
      />

      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "py-3 bg-[#ffffff]/85 dark:bg-[#0a0a0a]/85 backdrop-blur-md border-b border-[#0a0a0a]/5 dark:border-white/10 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.04)]"
            : "py-5 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
          {/* Left: Handwritten-style signature logo "Angel" */}
          <Magnetic strength={0.3}>
            <a
              href="#"
              className="group flex items-center gap-2 select-none"
              aria-label="Angel Mariya - Back to top"
            >
              <span className="font-signature text-3xl sm:text-4xl tracking-tight text-[#0a0a0a] dark:text-[#f5f5f5] transition-transform duration-300 group-hover:scale-105 inline-block">
                {portfolioContent.personal.signatureLogo}
              </span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#0a0a0a] dark:bg-[#f5f5f5] opacity-70 group-hover:bg-emerald-500 transition-colors" />
            </a>
          </Magnetic>

          {/* Center: Tiny Centered Nav (Desktop & Tablet) */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center gap-1 px-4 py-1.5 rounded-full border border-[#0a0a0a]/10 dark:border-white/15 bg-white/70 dark:bg-black/70 backdrop-blur-sm shadow-[0_2px_10px_rgba(0,0,0,0.02)]"
          >
            {navLinks.map((link) => (
              <Magnetic key={link.name} strength={0.25}>
                <a
                  href={link.href}
                  className="px-3.5 py-1.5 text-xs uppercase tracking-wider font-medium text-[#444444] dark:text-[#a0a0a0] hover:text-[#0a0a0a] dark:hover:text-[#ffffff] transition-colors rounded-full hover:bg-black/5 dark:hover:bg-white/10 flex items-center gap-1.5"
                >
                  {link.name}
                </a>
              </Magnetic>
            ))}
          </nav>

          {/* Right: Quick actions (Available status pill + Dark Mode Toggle + Mobile toggle) */}
          <div className="flex items-center gap-3">
            {/* Status indicator pill */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full border border-[#0a0a0a]/10 dark:border-white/10 bg-white/60 dark:bg-black/60 text-[11px] font-mono tracking-tight text-[#555] dark:text-[#aaa]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>OPEN FOR ROLES</span>
            </div>

            {/* Dark mode toggle */}
            <Magnetic strength={0.2}>
              <button
                onClick={toggleDarkMode}
                aria-label="Toggle theme"
                className="p-2 rounded-full border border-[#0a0a0a]/10 dark:border-white/15 hover:bg-black/5 dark:hover:bg-white/10 text-[#0a0a0a] dark:text-[#f5f5f5] transition-colors"
              >
                {isDark ? (
                  <Sun className="w-4 h-4 text-amber-400" />
                ) : (
                  <Moon className="w-4 h-4 text-[#0a0a0a]" />
                )}
              </button>
            </Magnetic>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full border border-[#0a0a0a]/10 dark:border-white/15 text-[#0a0a0a] dark:text-[#f5f5f5]"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden border-b border-[#0a0a0a]/10 dark:border-white/10 bg-white/95 dark:bg-black/95 backdrop-blur-md px-6 py-4 flex flex-col gap-3 mt-2"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm uppercase tracking-wider py-2 font-medium text-[#0a0a0a] dark:text-[#f5f5f5] flex items-center gap-2 border-b border-[#0a0a0a]/5 dark:border-white/5"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2 flex items-center justify-between text-xs text-[#666] dark:text-[#aaa]">
              <span>KERALA, INDIA</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-mono text-[10px]">● OPEN TO INTERNSHIPS</span>
            </div>
          </motion.div>
        )}
      </header>
    </>
  );
}

