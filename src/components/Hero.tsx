'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export function Hero() {
  const t = useTranslations();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
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
    <section className="relative min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-5rem)] flex items-center justify-center bg-bg-base overflow-hidden">
      {/* Subtle decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 -left-32 w-72 h-72 bg-peach/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-greige/15 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto"
        >
          {/* Brand logo */}
          <motion.div
            variants={itemVariants}
            className="mb-8 flex justify-center"
          >
            <img src="/n-logo.png" alt="6del8" className="w-auto" style={{ height: 'clamp(8rem, 20vw, 16rem)' }} />
          </motion.div>

          {/* Tagline */}
          <motion.h1
            variants={itemVariants}
            className="font-script text-warm-darker mb-6"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: 1.1 }}
          >
            {t('hero.tagline')}
          </motion.h1>

          {/* Subtitle line 1 */}
          <motion.p
            variants={itemVariants}
            className="font-decorative text-warm-darker tracking-wide mb-3"
            style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.8rem)' }}
          >
            {t('hero.subtitle')}
          </motion.p>

          {/* Subtitle line 2 */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-warm-dark font-light tracking-wide max-w-2xl mx-auto"
          >
            {t('hero.subtitle2')}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
