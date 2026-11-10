"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, CheckCircle2, ArrowUpRight, Copy, Check } from "lucide-react";
import { LinkedinIcon, GithubIcon } from "@/components/icons";
import { portfolioContent } from "@/data/content";
import { useScrollReveal } from "@/lib/use-scroll-reveal";

export function Contact() {
  const sectionRef = useScrollReveal("#contact");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate lightweight client submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText(portfolioContent.personal.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-24 sm:py-32 relative"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div data-reveal className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-[#0a0a0a]/10 dark:border-white/10 pb-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#737373] dark:text-[#888888]">
              02 // Connect
            </span>
            <h2 className="font-grotesk text-3xl sm:text-5xl font-semibold tracking-tight text-[#0a0a0a] dark:text-[#f5f5f5] mt-2">
              {portfolioContent.contact.title}
            </h2>
          </div>
          <p className="max-w-md text-sm text-[#525252] dark:text-[#a3a3a3] font-normal leading-relaxed">
            {portfolioContent.contact.subtitle}
          </p>
        </div>

        {/* 2-Column Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Big Email Link & Socials */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-10">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-[#737373] dark:text-[#888888] block mb-3">
                {portfolioContent.contact.emailPrompt}
              </span>

              {/* Big Interactive Email Link */}
              <div className="group relative inline-block">
                <a
                  href={`mailto:${portfolioContent.personal.email}`}
                  className="font-grotesk text-2xl sm:text-4xl md:text-5xl font-semibold text-[#0a0a0a] dark:text-[#f5f5f5] hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors break-all leading-tight inline-block underline decoration-1 underline-offset-8"
                >
                  {portfolioContent.personal.email}
                </a>

                <button
                  onClick={copyEmailToClipboard}
                  className="mt-4 flex items-center gap-2 text-xs font-mono text-[#525252] dark:text-[#a3a3a3] hover:text-[#0a0a0a] dark:hover:text-white transition-colors"
                  aria-label="Copy email address"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-emerald-600 dark:text-emerald-400 font-medium">Copied to clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy email address</span>
                    </>
                  )}
                </button>
              </div>

              <div className="mt-8 space-y-2 text-xs font-mono text-[#666] dark:text-[#999]">
                <p>● {portfolioContent.contact.responseTime}</p>
                <p>● Based in {portfolioContent.contact.locationText}</p>
              </div>
            </div>

            {/* Social Links */}
            <div className="border-t border-[#0a0a0a]/10 dark:border-white/10 pt-8">
              <span className="font-mono text-xs uppercase tracking-widest text-[#737373] dark:text-[#888888] block mb-4">
                Online Profiles
              </span>

              <div className="flex flex-wrap gap-4">
                <a
                  href={portfolioContent.personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl border border-[#0a0a0a]/10 dark:border-white/15 hover:border-[#0a0a0a] dark:hover:border-white text-xs font-mono flex items-center gap-2 hover:-translate-y-0.5 transition-all text-[#0a0a0a] dark:text-white"
                >
                  <LinkedinIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#888]" />
                </a>

                <a
                  href={portfolioContent.personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl border border-[#0a0a0a]/10 dark:border-white/15 hover:border-[#0a0a0a] dark:hover:border-white text-xs font-mono flex items-center gap-2 hover:-translate-y-0.5 transition-all text-[#0a0a0a] dark:text-white"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>GitHub</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#888]" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Minimal Contact Form */}
          <div className="lg:col-span-6 rounded-2xl border border-[#0a0a0a]/10 dark:border-white/15 bg-[#fafafa] dark:bg-[#121212] p-8 sm:p-10">
            <h3 className="font-grotesk text-xl font-semibold text-[#0a0a0a] dark:text-white mb-2">
              Send a Direct Note
            </h3>
            <p className="text-xs text-[#666] dark:text-[#999] font-mono mb-8">
              Have a project or internship opening? Drop your note below.
            </p>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 flex flex-col items-center justify-center text-center space-y-3"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-grotesk text-lg font-semibold text-[#0a0a0a] dark:text-white">
                  Message Sent Successfully
                </h4>
                <p className="text-xs text-[#666] dark:text-[#999] max-w-xs font-mono">
                  Thank you! I will review your note and get back to you promptly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-4 py-2 rounded-lg text-xs font-mono border border-black/10 dark:border-white/10 hover:border-black transition-colors"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs font-mono uppercase tracking-wider text-[#555] dark:text-[#aaa] mb-2"
                  >
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Jane Doe"
                    className="w-full px-4 py-3 rounded-xl border border-[#0a0a0a]/10 dark:border-white/15 bg-white dark:bg-[#1a1a1a] text-sm text-[#0a0a0a] dark:text-white placeholder-[#999] focus:outline-none focus:ring-1 focus:ring-[#0a0a0a] dark:focus:ring-white transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-mono uppercase tracking-wider text-[#555] dark:text-[#aaa] mb-2"
                  >
                    Your Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@organization.com"
                    className="w-full px-4 py-3 rounded-xl border border-[#0a0a0a]/10 dark:border-white/15 bg-white dark:bg-[#1a1a1a] text-sm text-[#0a0a0a] dark:text-white placeholder-[#999] focus:outline-none focus:ring-1 focus:ring-[#0a0a0a] dark:focus:ring-white transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-mono uppercase tracking-wider text-[#555] dark:text-[#aaa] mb-2"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your project, idea, or role opportunity..."
                    className="w-full px-4 py-3 rounded-xl border border-[#0a0a0a]/10 dark:border-white/15 bg-white dark:bg-[#1a1a1a] text-sm text-[#0a0a0a] dark:text-white placeholder-[#999] focus:outline-none focus:ring-1 focus:ring-[#0a0a0a] dark:focus:ring-white transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-xl bg-[#0a0a0a] text-white dark:bg-white dark:text-[#0a0a0a] hover:bg-emerald-600 dark:hover:bg-emerald-400 dark:hover:text-black font-mono text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.99] disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Sending...</span>
                  ) : (
                    <>
                      <span>Transmit Message</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
