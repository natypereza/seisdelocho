'use client';

import { motion } from 'framer-motion';
import { strengths } from '@/content/portfolio';

/* Each camera's screen sits in a different spot on its body, so the panel is
   placed per camera — measured off the artwork, as a share of that crop. */
const cameras = [
  { src: '/cameras/blue.webp',   left: 8.6, top: 15.8, width: 58.3, height: 68.2 },
  { src: '/cameras/silver.webp', left: 7.3, top: 28.1, width: 50.3, height: 57.6 },
  { src: '/cameras/green.webp',  left: 4.4, top: 28.1, width: 51.5, height: 57.0 },
  { src: '/cameras/gold.webp',   left: 7.2, top: 17.6, width: 56.8, height: 72.5 },
  { src: '/cameras/red.webp',    left: 6.6, top: 18.9, width: 60.8, height: 73.4 },
  { src: '/cameras/pink.webp',   left: 8.3, top: 22.1, width: 58.3, height: 66.3 },
] as const;

export function Strengths() {
  return (
    <div className="grid grid-cols-1 items-center gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {strengths.map((s, i) => {
        const cam = cameras[i % cameras.length];
        return (
          <motion.figure
            key={s}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, delay: i * 0.08 }}
            className="relative m-0"
          >
            <img src={cam.src} alt="" aria-hidden="true" className="h-auto w-full" />
            <figcaption
              className="absolute grid place-items-center px-1 text-center"
              style={{
                left: `${cam.left}%`,
                top: `${cam.top}%`,
                width: `${cam.width}%`,
                height: `${cam.height}%`,
              }}
            >
              <span className="text-[.6rem] font-bold uppercase leading-tight tracking-[0.08em] text-warm-darker sm:text-[.68rem]">
                {s}
              </span>
            </figcaption>
          </motion.figure>
        );
      })}
    </div>
  );
}
