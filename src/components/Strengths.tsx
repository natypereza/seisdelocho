'use client';

import { motion } from 'framer-motion';
import { strengths } from '@/content/portfolio';

/* Each camera's screen sits in a different spot on its body, so the panel is
   placed per camera — measured off the artwork, as a share of that crop. */
const cameras = [
  { src: '/cameras/blue.webp',   left: 17.0, top: 8.9,  width: 68.0, height: 58.0 },
  { src: '/cameras/silver.webp', left: 14.5, top: 7.0,  width: 57.4, height: 50.3 },
  { src: '/cameras/green.webp',  left: 15.4, top: 4.6,  width: 57.7, height: 51.0 },
  { src: '/cameras/gold.webp',   left: 7.1,  top: 17.3, width: 56.8, height: 72.8 },
  { src: '/cameras/red.webp',    left: 8.4,  top: 7.0,  width: 72.6, height: 60.8 },
  { src: '/cameras/pink.webp',   left: 8.2,  top: 22.3, width: 58.5, height: 66.1 },
] as const;

export function Strengths() {
  return (
    <div className="grid grid-cols-2 items-end gap-4 sm:grid-cols-3 lg:grid-cols-6 lg:gap-3">
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
