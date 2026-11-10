"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import { LinkedinIcon } from "@/components/icons";
import { portfolioContent } from "@/data/content";
import { Magnetic } from "@/components/magnetic";

/** Staggered hero entrance animation variants */
const fadeUpVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.15 + i * 0.12,
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
};

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Parallax transforms on scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const nameParallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const nameLetterSpacing = useTransform(scrollYProgress, [0, 1], ["-0.02em", "0.01em"]);
  const nameScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.97]);

  const nameLetters = portfolioContent.personal.name.toUpperCase().split("");

  return (
    <section
      ref={containerRef}
      className="relative min-h-[85vh] max-h-[920px] pt-24 pb-6 flex flex-col justify-between overflow-hidden border-b border-black/5 dark:border-white/5 bg-white dark:bg-[#0a0a0a] w-full"
    >
      {/* Top container: Left-aligned editorial statement headline + Right-aligned meta row */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-8">
        {/* Subtle pill tag */}
        <motion.div
          initial="hidden"
          animate={mounted ? "visible" : "hidden"}
          custom={0}
          variants={fadeUpVariant}
          className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full text-xs font-mono text-[#666] dark:text-[#999] border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02]"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>PORTFOLIO / 2026</span>
        </motion.div>

        {/* 4-Line Left-Aligned Statement Headline — staggered fade-up per line */}
        <div className="max-w-4xl">
          <h1 className="font-grotesk text-3xl sm:text-4xl md:text-5xl lg:text-[3.35rem] font-medium tracking-[-0.035em] text-[#0a0a0a] dark:text-[#f5f5f5] leading-[1.08]">
            {portfolioContent.hero.headline.map((line, lineIdx) => (
              <motion.span
                key={lineIdx}
                initial="hidden"
                animate={mounted ? "visible" : "hidden"}
                custom={lineIdx + 1}
                variants={fadeUpVariant}
                className="block hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
              >
                {line}
              </motion.span>
            ))}
          </h1>
        </div>

        {/* Below it: Right-aligned meta row with dot separators */}
        <motion.div
          initial="hidden"
          animate={mounted ? "visible" : "hidden"}
          custom={5}
          variants={fadeUpVariant}
          className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-black/10 dark:border-white/10 pt-3 w-full min-w-0"
        >
          <div className="flex items-center gap-4 text-xs font-mono text-[#737373] dark:text-[#999999] shrink-0">
            <a
              href="#about"
              className="hover:text-[#0a0a0a] dark:hover:text-white transition-colors flex items-center gap-1 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0a0a0a] dark:focus-visible:ring-white rounded-sm"
            >
              <span>EXPLORE PROFILE</span>
              <ArrowDownRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
            </a>
          </div>

          <p className="text-left sm:text-right font-mono text-[10px] sm:text-xs tracking-normal sm:tracking-[0.14em] text-[#525252] dark:text-[#a3a3a3] uppercase font-medium leading-relaxed max-w-full">
            <span className="block sm:inline">CS & AI ENGINEERING STUDENT • 3RD YEAR</span>
            <span className="hidden sm:inline"> • </span>
            <span className="block sm:inline">KERALA, INDIA • OPEN TO INTERNSHIPS</span>
          </p>
        </motion.div>
      </div>

      {/* Giant Full-Width Display Name: Pixel / Monospace Font spanning full viewport */}
      <div className="w-full relative mt-6 sm:mt-8 select-none px-2 sm:px-6 overflow-hidden">
        <motion.div
          style={{
            y: nameParallaxY,
            letterSpacing: nameLetterSpacing,
            scale: nameScale,
          }}
          className="w-full relative flex items-baseline justify-center"
        >
          <h2
            className="font-pixel text-[5.8vw] xs:text-[6.2vw] sm:text-[7.8vw] md:text-[8.4vw] lg:text-[8.8vw] leading-none uppercase font-bold text-[#0a0a0a] dark:text-[#f5f5f5] tracking-tight whitespace-nowrap overflow-visible flex justify-center text-center w-full"
            aria-label={portfolioContent.personal.name}
          >
            {nameLetters.map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={
                  mounted
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.7 }
                }
                transition={{
                  delay: 0.8 + index * 0.04,
                  duration: 0.4,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`inline-block ${
                  char === " " ? "w-[2vw]" : "hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                }`}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </h2>

          {/* Small LinkedIn icon at the bottom-right corner of the giant display name */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={mounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            className="absolute right-1 sm:right-6 bottom-0 sm:bottom-1 z-10"
          >
            <Magnetic strength={0.4}>
              <a
                href={portfolioContent.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-1.5 p-1.5 sm:px-3 sm:py-2 rounded-full bg-[#0a0a0a] text-white dark:bg-white dark:text-[#0a0a0a] hover:bg-emerald-600 dark:hover:bg-emerald-400 dark:hover:text-black transition-all shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                aria-label="Visit Angel Mariya's LinkedIn Profile"
              >
                <LinkedinIcon className="w-3 h-3 sm:w-4 sm:h-4 fill-current" />
                <span className="hidden sm:inline-block font-mono text-[10px] tracking-wider uppercase font-semibold">
                  Connect
                </span>
              </a>
            </Magnetic>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
