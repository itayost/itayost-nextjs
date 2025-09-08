// src/lib/framer-config.ts
// Default animation configurations to avoid cubic-bezier issues

export const defaultTransition = {
  duration: 0.8,
  ease: "easeOut"
};

export const fastTransition = {
  duration: 0.3,
  ease: "easeOut"
};

export const smoothTransition = {
  duration: 0.6,
  ease: "easeInOut"
};

// Animation variants with safe easing
export const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: defaultTransition
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: defaultTransition
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  transition: smoothTransition
};