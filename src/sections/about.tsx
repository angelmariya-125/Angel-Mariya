"use client";

import React from "react";
import Image from "next/image";
import { GraduationCap, MapPin, CheckCircle2 } from "lucide-react";
import { portfolioContent } from "@/data/content";
import { useScrollReveal, useTextHighlight } from "@/lib/use-scroll-reveal";

export function About() {
  const sectionRef = useScrollReveal("#about");
  const bioHighlightRef = useTextHighlight();

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 sm:py-28 border-b border-black/5 dark:border-white/5 bg-white dark:bg-[#0a0a0a] relative"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div data-reveal className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-4 border-b border-black/10 dark:border-white/10 pb-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#737373] dark:text-[#888888]">
              01 // Profile
            </span>
            <h2 className="font-grotesk text-3xl sm:text-5xl font-semibold tracking-tight text-[#0a0a0a] dark:text-[#f5f5f5] mt-2">
              {portfolioContent.about.title}
            </h2>
          </div>
          <p className="font-mono text-[11px] sm:text-xs text-[#525252] dark:text-[#a3a3a3] tracking-wide break-words">
            THEJUS ENGINEERING COLLEGE • CSE (AI)
          </p>
        </div>

        {/* 2-Column Editorial Grid: Left Photo/Stats & Right Bio */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Photo Placeholder & Quick Stats */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            {/* Minimalist Editorial Photo Card */}
            <div data-reveal className="relative aspect-[4/5] w-full rounded-2xl bg-[#fafafa] dark:bg-[#141414] border border-black/10 dark:border-white/10 overflow-hidden group shadow-sm transition-all hover:border-black/30 dark:hover:border-white/30">
              {/* Actual Profile Photo */}
              <Image
                src="/images/angel-profile.jpg"
                alt="Angel Mariya — Computer Science & AI Engineering student at the beach in Kerala, India"
                fill
                className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 40vw"
                priority
              />

              {/* Overlay gradient for legibility of text on top */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

              {/* Top labels */}
              <div className="absolute top-0 left-0 right-0 flex items-center justify-between z-10 p-6">
                <span className="font-mono text-[11px] uppercase tracking-wider text-white/90 px-3 py-1 rounded-full bg-black/30 backdrop-blur-sm border border-white/10">
                  ANGEL MARIYA
                </span>
                <span className="font-pixel text-xs text-emerald-400 bg-black/30 backdrop-blur-sm px-2 py-0.5 rounded-full border border-white/10">
                  AI // DEV
                </span>
              </div>

              {/* Bottom Card Meta */}
              <div className="absolute bottom-0 left-0 right-0 z-10 p-6">
                <div className="bg-white/95 dark:bg-black/95 backdrop-blur-md rounded-xl p-4 border border-black/5 dark:border-white/10">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#666] dark:text-[#999]">Location</span>
                    <span className="font-medium text-[#0a0a0a] dark:text-white">Kerala, India</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div data-reveal className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {portfolioContent.about.quickStats.map((stat, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-black/8 dark:border-white/10 bg-[#fafafa] dark:bg-[#111111]"
                >
                  <span className="block font-mono text-[10px] uppercase tracking-wider text-[#737373] dark:text-[#888888]">
                    {stat.label}
                  </span>
                  <span className="block font-grotesk text-sm sm:text-base font-semibold text-[#0a0a0a] dark:text-[#f5f5f5] mt-1">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Bio Prose & Categorized Skill Tags */}
          <div className="lg:col-span-7 flex flex-col gap-10">
            {/* Bio Paragraphs — scroll-triggered word highlight */}
            <div ref={bioHighlightRef} className="space-y-5 text-base sm:text-lg text-[#333333] dark:text-[#cccccc] leading-relaxed font-normal">
              {portfolioContent.about.bioParagraphs.map((p, i) => (
                <p key={i}>
                  {p.split(" ").map((word, wIdx) => (
                    <span key={wIdx} data-highlight-word className="inline">
                      {word}{" "}
                    </span>
                  ))}
                </p>
              ))}
            </div>

            {/* Education Timeline */}
            <div data-reveal className="border-t border-black/10 dark:border-white/10 pt-8">
              <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-[#737373] dark:text-[#888888] mb-6 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Education Milestones</span>
              </h3>

              <div className="space-y-8">
                {portfolioContent.about.education.map((edu, idx) => (
                  <div
                    key={idx}
                    className="relative pl-6 border-l-2 border-black/15 dark:border-white/20 pb-2 group"
                  >
                    {/* Circle Node */}
                    <div className="absolute -left-[7px] top-1 w-3 h-3 rounded-full bg-white dark:bg-black border-2 border-[#0a0a0a] dark:border-white group-hover:scale-125 transition-transform" />

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                      <h4 className="font-grotesk text-base sm:text-lg font-semibold text-[#0a0a0a] dark:text-white">
                        {edu.degree}
                      </h4>
                      <span className="font-mono text-xs text-[#737373] dark:text-[#888888] whitespace-nowrap">
                        {edu.period}
                      </span>
                    </div>

                    <p className="text-sm text-[#4a4a4a] dark:text-[#bbbbbb] font-medium mb-1">
                      {edu.institution}
                    </p>

                    <div className="flex items-center gap-3 text-xs font-mono text-[#737373] dark:text-[#888888] mb-3">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {edu.location}
                      </span>
                      {edu.grade && (
                        <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                          • {edu.grade}
                        </span>
                      )}
                    </div>

                    <ul className="space-y-1.5 text-xs text-[#555] dark:text-[#aaa]">
                      {edu.highlights.map((h, hIdx) => (
                        <li key={hIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
