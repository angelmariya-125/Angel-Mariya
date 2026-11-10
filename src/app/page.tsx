"use client";

import React, { useState } from "react";
import { SmoothScrollProvider } from "@/lib/lenis-provider";
import { CustomCursor } from "@/components/custom-cursor";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/sections/hero";
import { About } from "@/sections/about";
import { Works } from "@/sections/works";
import { GameSection } from "@/sections/game";
import { Contact } from "@/sections/contact";
import { Footer } from "@/components/footer";
import { GameModal } from "@/components/game-modal";

export default function Home() {
  const [isGameModalOpen, setIsGameModalOpen] = useState(false);

  return (
    <SmoothScrollProvider>
      <CustomCursor />
      
      <div className="relative min-h-screen max-w-full overflow-x-hidden bg-white text-[#0a0a0a] dark:bg-[#0a0a0a] dark:text-[#f5f5f5] flex flex-col selection:bg-[#0a0a0a] selection:text-white dark:selection:bg-white dark:selection:text-[#0a0a0a]">
        {/* Sticky Frosted Top Navigation */}
        <Navbar onOpenGameModal={() => setIsGameModalOpen(true)} />

        <main className="flex-1 w-full max-w-full overflow-x-hidden">
          {/* 1. Hero Section */}
          <Hero />

          {/* 2. About Me Section */}
          <About />

          {/* 3. Works Section */}
          <Works />

          {/* 4. Play Game Section */}
          <GameSection />

          {/* 5. Contact Section */}
          <Contact />
        </main>

        {/* 6. Footer */}
        <Footer />

        {/* Dedicated Arcade Modal for quick trigger from Nav */}
        <GameModal
          isOpen={isGameModalOpen}
          onClose={() => setIsGameModalOpen(false)}
        />
      </div>
    </SmoothScrollProvider>
  );
}
