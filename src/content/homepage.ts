/**
 * src/content/homepage.ts
 * Textos del Home centralizados (hero + bio).
 */
export const homepage = {
  hero: {
    headline: "Modern Rock. Big Stage Energy.",
    subheadline:
      "Zico Franco is a Miami-based rock project blending modern rock power with a funk-forward groove and a Santana-inspired flavor.",
    primaryCTA: { label: "Book Zico Franco", href: "/booking" },
    secondaryCTA: { label: "Listen Now", href: "#music" },
  },

  biography:
    "Zico Franco is a Miami-based rock project led by Ziko as the main figure, backed by a tight band built for big stages. The sound blends modern rock power with a funk-forward groove and a Santana-inspired flavor—reimagining covers with a signature identity and progressively adding original songs.",
} as const;
