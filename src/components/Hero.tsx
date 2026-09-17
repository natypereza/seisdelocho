'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

const specialties = ['Branding', 'Content', 'Aesthetics'] as const;

export function Hero() {
  const t = useTranslations();
  const videoRef = useRef<HTMLVideoElement>(null);

  // The water loop is decoration, so it stops for anyone who asks the system
  // to reduce motion. The still frame keeps the hero looking the same.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      v.removeAttribute('autoplay');
      v.pause();
    }
  }, []);

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.18, delayChildren: 0.15 } },
  };

  const item = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' as const } },
  };

  return (
    <section className="relative flex items-center justify-center overflow-hidden bg-peach py-20 md:py-28 min-h-[70vh]">
      {/* Water loop. Sits above the section's own background but below the copy. */}
      <video
        ref={videoRef}
        className="absolute inset-0 z-0 h-full w-full object-cover"
        src="/hero-water.mp4"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        tabIndex={-1}
      />
      {/* Peach wash: ties the footage to the brand colour and steadies the
          contrast under the black wordmark as the ripples move. */}
      <div
        className="absolute inset-0 z-[1]"
        aria-hidden="true"
        style={{
          background:
            'linear-gradient(180deg, rgba(255,220,207,.52) 0%, rgba(255,220,207,.34) 45%, rgba(255,220,207,.58) 100%)',
        }}
      />

      <div className="container-custom relative z-10 text-center">
        <motion.div variants={container} initial="hidden" animate="visible" className="mx-auto max-w-4xl">
          <motion.div variants={item} className="flex justify-center">
            {/* Trimmed of its transparent margin, so the wordmark fills the box it is given. */}
            <img
              src="/logo-6del8.png"
              alt="6del8 — Natalia Pérez"
              className="h-auto"
              style={{ width: 'min(72%, 560px)' }}
            />
          </motion.div>

          <motion.p
            variants={item}
            className="mt-6 font-bold uppercase text-black"
            style={{ fontSize: 'clamp(.7rem, 1.35vw, .86rem)', letterSpacing: '.34em', textIndent: '.34em' }}
          >
            {t('hero.tagline')}
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap justify-center gap-3">
            {specialties.map((s) => (
              <span
                key={s}
                className="rounded-full border-[1.4px] border-black px-5 py-1.5 text-sm text-black"
              >
                {s}
              </span>
            ))}
          </motion.div>

          <motion.p
            variants={item}
            className="mx-auto mt-10 max-w-2xl font-decorative text-black"
            style={{ fontSize: 'clamp(1.1rem, 2.4vw, 1.7rem)' }}
          >
            {t('hero.subtitle')}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
