'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import type { EducationItem } from '@/types';
import { AnimatedSection } from './AnimatedSection';

export function Education() {
  const t = useTranslations('education');
  const items: EducationItem[] = t.raw('items');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <AnimatedSection id="education" className="section bg-bg-subtle">
      <div className="container-custom">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="heading-creative gradient-text"
        >
          {t('heading')}
        </motion.h2>

        <motion.div
          className="max-w-3xl"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {items.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative pl-8 md:pl-10 pb-12 md:pb-16 border-l-2 border-warm-light transition-colors duration-300 hover:border-warm-base"
            >
              <motion.div
                className="absolute -left-[9px] md:-left-[11px] top-0 w-4 md:w-5 h-4 md:h-5 rounded-full bg-warm-darker"
                whileHover={{ scale: 1.25 }}
              />

              <div>
                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 mb-2">
                  <h3 className="text-xl md:text-2xl font-medium text-warm-darker">
                    {item.degree}
                  </h3>
                  {item.current && (
                    <span className="text-xs font-light uppercase tracking-widest text-warm-base md:text-right">
                      {t('current')}
                    </span>
                  )}
                </div>
                <p className="text-sm md:text-base text-warm-dark mb-1">
                  {item.institution}
                </p>
                {item.location && (
                  <p className="text-sm text-warm-base mb-2">
                    {item.location}
                  </p>
                )}
                {item.year && (
                  <p className="text-sm text-warm-base">
                    {item.year}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
