'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { AnimatedSection } from './AnimatedSection';

export function About() {
  const t = useTranslations();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
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
    <AnimatedSection
      id="about"
      className="section bg-white"
    >
      <div className="container-custom">
        <div className="grid grid-cols-12 gap-8">
          <motion.div
            className="col-span-12 md:col-start-2 md:col-span-10 lg:col-start-3 lg:col-span-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.h2
              variants={itemVariants}
              className="section-heading text-neutral-900"
            >
              {t('about.heading')}
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-body-lg text-neutral-700 leading-relaxed mb-6 font-light tracking-wide"
            >
              {t('about.bio')}
            </motion.p>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
}
