'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export function Hero() {
  const t = useTranslations();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' as const },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center gradient-warm overflow-hidden">
      {/* Subtle decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-warm-base/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-warm-light/15 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto"
        >
          {/* Brand name */}
          <motion.div
            variants={itemVariants}
            className="mb-6 flex justify-center"
          >
            <img src="/n-logo.png" alt="6del8" className="w-auto" style={{ height: 'clamp(8rem, 20vw, 16rem)' }} />
          </motion.div>

          {/* Tagline */}
          <motion.p
            variants={itemVariants}
            className="heading-creative text-warm-darker tracking-widest mb-6"
            style={{ fontSize: 'clamp(1.25rem, 3vw, 2.5rem)' }}
          >
            {t('hero.tagline')}
          </motion.p>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-warm-dark font-light tracking-wide max-w-2xl mx-auto mb-12"
          >
            {t('hero.subtitle')}
          </motion.p>

          {/* CTA */}
          <motion.div variants={itemVariants}>
            <a
              href="#work"
              className="inline-block px-10 py-4 border-2 border-warm-darker text-warm-darker text-sm uppercase tracking-[0.2em] font-medium hover:bg-warm-darker hover:text-white transition-all duration-300 rounded-sm"
            >
              {t('hero.cta')}
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-6 h-6 text-warm-dark/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
