"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { EASE_STUDIO, REVEAL_DURATION, REVEAL_Y } from "@/lib/motion/ease";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: REVEAL_Y }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: REVEAL_Y }}
      transition={{
        duration: REVEAL_DURATION,
        ease: EASE_STUDIO as unknown as number[],
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}
