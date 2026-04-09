"use client";

import { useEffect, useRef } from "react";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Stagger delay in ms */
  delay?: number;
};

/**
 * Lightweight scroll-reveal wrapper.
 * Adds `reveal-block` class (starts hidden) and toggles `is-visible`
 * when the element enters the viewport. Respects prefers-reduced-motion.
 */
export function Reveal({ children, className = "", delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-visible");
      return;
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const timer = setTimeout(() => el.classList.add("is-visible"), delay);
          obs.disconnect();
          return () => clearTimeout(timer);
        }
      },
      { threshold: 0.07, rootMargin: "0px 0px -24px 0px" }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={`reveal-block ${className}`}>
      {children}
    </div>
  );
}
