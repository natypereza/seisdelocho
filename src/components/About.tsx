'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { AnimatedSection } from './AnimatedSection';
import { DynamicImage } from './DynamicImage';
import { Instagram } from 'lucide-react';
import Link from 'next/link';

export function About() {
  const t = useTranslations();
  const locale = useLocale();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <AnimatedSection id="about" className="section bg-bg-base">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center max-w-5xl mx-auto">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <DynamicImage
                category="profile"
                fallbackSrc="/n-logo.png"
                className="rounded-2xl shadow-xl object-cover w-full h-full"
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.h2
              variants={itemVariants}
              className="heading-creative gradient-text"
            >
              {t('about.heading')}
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-lg text-warm-dark leading-relaxed font-light tracking-wide mb-8"
            >
              {t('about.bio')}
            </motion.p>
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4"
            >
              <Link
                href={`/${locale}/cv`}
                className="px-6 py-3 border-2 border-warm-darker text-warm-darker text-sm uppercase tracking-[0.15em] font-medium hover:bg-warm-darker hover:text-white transition-all duration-300 rounded-sm"
              >
                {t('about.viewCv')}
              </Link>
              <Link
                href={`/${locale}/portfolio`}
                className="px-6 py-3 border-2 border-warm-darker text-warm-darker text-sm uppercase tracking-[0.15em] font-medium hover:bg-warm-darker hover:text-white transition-all duration-300 rounded-sm"
              >
                {t('about.viewPortfolio')}
              </Link>
              <a
                href="https://instagram.com/seisdelocho_"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 text-warm-dark text-sm hover:text-warm-darker transition-colors"
              >
                <Instagram className="w-4 h-4" />
                @seisdelocho_
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
}
