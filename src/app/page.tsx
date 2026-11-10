"use client";

import React from "react";
import { SmoothScrollProvider } from "@/lib/lenis-provider";
import { CustomCursor } from "@/components/custom-cursor";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/sections/hero";
import { About } from "@/sections/about";
import { Contact } from "@/sections/contact";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <SmoothScrollProvider>
      <CustomCursor />
      
      <div className="relative min-h-screen max-w-full overflow-x-hidden bg-white text-[#0a0a0a] dark:bg-[#0a0a0a] dark:text-[#f5f5f5] flex flex-col selection:bg-[#0a0a0a] selection:text-white dark:selection:bg-white dark:selection:text-[#0a0a0a]">
        {/* Sticky Frosted Top Navigation */}
        <Navbar />

        <main className="flex-1 w-full max-w-full overflow-x-hidden">
          {/* 1. Hero Section */}
          <Hero />

          {/* 2. About Me Section */}
          <About />

          {/* 3. Contact Section */}
          <Contact />
        </main>

        {/* 4. Footer */}
        <Footer />
      </div>
    </SmoothScrollProvider>
  );
}
