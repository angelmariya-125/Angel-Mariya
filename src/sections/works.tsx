"use client";

import React from "react";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { portfolioContent, Project } from "@/data/content";
import { useScrollReveal } from "@/lib/use-scroll-reveal";

export function Works() {
  const sectionRef = useScrollReveal("#works");
  return (
    <section
      id="works"
      ref={sectionRef}
      className="py-20 sm:py-28 border-b border-black/5 dark:border-white/5 bg-white dark:bg-[#0a0a0a] relative"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div data-reveal className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-black/10 dark:border-white/10 pb-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#737373] dark:text-[#888888]">
              02 // Portfolio
            </span>
            <h2 className="font-grotesk text-3xl sm:text-5xl font-semibold tracking-tight text-[#0a0a0a] dark:text-[#f5f5f5] mt-2">
              {portfolioContent.works.title}
            </h2>
          </div>
          <p className="max-w-md text-sm text-[#525252] dark:text-[#a3a3a3] font-normal leading-relaxed">
            {portfolioContent.works.subtitle}
          </p>
        </div>

        {/* Large Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {portfolioContent.works.projects.map((project: Project, index: number) => (
            <div
              key={project.id}
              data-cursor="view"
              data-reveal
              className="group relative flex flex-col justify-between rounded-2xl border border-black/10 dark:border-white/15 bg-white dark:bg-[#111111] p-7 sm:p-9 hover:border-black dark:hover:border-white transition-all duration-300 hover:-translate-y-1.5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)]"
            >
              {/* Card Top: Category, Number & Metrics */}
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-6">
                  <span className="px-2.5 py-1 rounded-md bg-[#f5f5f5] dark:bg-[#202020] text-[#555] dark:text-[#aaa] uppercase tracking-wider font-medium">
                    {project.category}
                  </span>
                  <div className="flex items-center gap-2">
                    {project.metrics && (
                      <span className="hidden sm:inline-block font-mono text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                        {project.metrics}
                      </span>
                    )}
                    <span className="text-[#888] font-mono">0{index + 1}</span>
                  </div>
                </div>

                {/* Project Visual / Editorial Canvas Preview */}
                <div className="relative aspect-[16/9] w-full rounded-xl bg-[#fafafa] dark:bg-[#181818] border border-black/5 dark:border-white/10 mb-6 overflow-hidden flex items-center justify-center p-6 transition-transform duration-500 group-hover:scale-[1.01]">
                  <div className="w-full h-full rounded-lg border border-dashed border-black/10 dark:border-white/20 flex flex-col items-center justify-center text-center p-4">
                    <span className="font-pixel text-sm sm:text-base text-[#0a0a0a] dark:text-white uppercase tracking-wider mb-2">
                      {project.title}
                    </span>
                    <span className="text-xs font-mono text-[#737373] dark:text-[#999999] max-w-xs">
                      {project.tagline}
                    </span>
                  </div>
                </div>

                {/* Title & Tagline */}
                <h3 className="font-grotesk text-2xl sm:text-3xl font-semibold text-[#0a0a0a] dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors flex items-center justify-between">
                  <span>{project.title}</span>
                  <ArrowUpRight className="w-5 h-5 text-[#888] group-hover:text-emerald-600 dark:group-hover:text-emerald-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </h3>

                {/* One-Line Description */}
                <p className="text-sm text-[#4a4a4a] dark:text-[#b0b0b0] mt-3 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Card Bottom: Tech Tags + Links */}
              <div className="mt-8 pt-6 border-t border-black/5 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-[#f5f5f5] dark:bg-[#1a1a1a] text-[#555] dark:text-[#ccc] border border-black/5 dark:border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg border border-black/10 dark:border-white/15 hover:bg-black/5 dark:hover:bg-white/10 text-[#0a0a0a] dark:text-white transition-colors"
                      aria-label={`${project.title} GitHub Repository`}
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-[#0a0a0a] text-white dark:bg-white dark:text-[#0a0a0a] text-xs font-mono tracking-wider flex items-center gap-1.5 hover:bg-emerald-600 dark:hover:bg-emerald-400 dark:hover:text-black transition-colors"
                    >
                      <span>LIVE</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
