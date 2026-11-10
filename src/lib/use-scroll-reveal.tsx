"use client";

import { useEffect, useRef } from "react";

/**
 * GSAP ScrollTrigger-based scroll reveal hook.
 * Attaches fade-up + translateY reveal animations to all children
 * matching `[data-reveal]` inside the given container ref.
 *
 * Respects prefers-reduced-motion by skipping all animations.
 */
export function useScrollReveal(containerSelector?: string) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    let ctx: { revert: () => void } | null = null;

    // Dynamic import to keep GSAP tree-shakeable and avoid SSR issues
    import("gsap").then(({ gsap }) => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);

        const container = containerSelector
          ? document.querySelector(containerSelector)
          : ref.current;
        if (!container) return;

        const elements = container.querySelectorAll("[data-reveal]");

        ctx = gsap.context(() => {
          elements.forEach((el, index) => {
            const delay = (el as HTMLElement).dataset.revealDelay
              ? parseFloat((el as HTMLElement).dataset.revealDelay!)
              : index * 0.08;

            gsap.fromTo(
              el,
              {
                opacity: 0,
                y: 40,
              },
              {
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: el,
                  start: "top 88%",
                  end: "top 20%",
                  toggleActions: "play none none none",
                },
              }
            );
          });
        }, container);
      });
    });

    return () => {
      ctx?.revert();
    };
  }, [containerSelector]);

  return ref;
}

/**
 * GSAP ScrollTrigger text highlight effect.
 * Words transition from gray to black (or white in dark mode) as they scroll into view.
 */
export function useTextHighlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    let ctx: { revert: () => void } | null = null;

    import("gsap").then(({ gsap }) => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);

        const element = ref.current;
        if (!element) return;

        const words = element.querySelectorAll("[data-highlight-word]");
        if (words.length === 0) return;

        ctx = gsap.context(() => {
          gsap.fromTo(
            words,
            { color: "#b0b0b0" },
            {
              color: "var(--text-primary, #0a0a0a)",
              stagger: 0.06,
              ease: "none",
              scrollTrigger: {
                trigger: element,
                start: "top 80%",
                end: "top 30%",
                scrub: 1,
              },
            }
          );
        }, element);
      });
    });

    return () => {
      ctx?.revert();
    };
  }, []);

  return ref;
}

