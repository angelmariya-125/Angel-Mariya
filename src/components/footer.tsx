"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { portfolioContent } from "@/data/content";
import { Magnetic } from "./magnetic";

export function Footer() {
  const [keralaTime, setKeralaTime] = useState("");
  const [currentYear, setCurrentYear] = useState("2026");

  useEffect(() => {
    setCurrentYear(new Date().getFullYear().toString());
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setKeralaTime(new Intl.DateTimeFormat("en-US", options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-12 border-t border-[#0a0a0a]/10 dark:border-white/10 bg-white dark:bg-[#0a0a0a] text-xs font-mono text-[#737373] dark:text-[#888888]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Left: Copyright & College */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
          <span className="text-[#0a0a0a] dark:text-white font-medium">
            © {currentYear} {portfolioContent.personal.name}
          </span>
          <span className="hidden sm:inline-block text-[#ccc] dark:text-[#444]">•</span>
          <span>Thejus Engineering College, Kerala</span>
        </div>

        {/* Center: Live Local Kerala Time Clock */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-black/5 dark:border-white/10 bg-[#fafafa] dark:bg-[#141414]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>KERALA, IN: {keralaTime || "10:55 AM IST"}</span>
        </div>

        {/* Right: Back to Top Button */}
        <div>
          <Magnetic strength={0.25}>
            <button
              onClick={scrollToTop}
              className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#0a0a0a]/10 dark:border-white/15 hover:border-[#0a0a0a] dark:hover:border-white text-[#0a0a0a] dark:text-white transition-all"
              aria-label="Back to top"
            >
              <span className="uppercase tracking-wider text-[11px]">Back to top</span>
              <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </Magnetic>
        </div>
      </div>
    </footer>
  );
}
