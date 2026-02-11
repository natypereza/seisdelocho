'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import type { CertificationItem } from '@/types';
import { AnimatedSection } from './AnimatedSection';

export function Certifications() {
  const t = useTranslations('certifications');
  const items: CertificationItem[] = t.raw('items');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <AnimatedSection id="certifications" className="section bg-bg-base">
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
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {items.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              className="border border-warm-light border-l-4 border-l-warm-base bg-bg-elevated p-6 md:p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="text-lg md:text-xl font-medium mb-2 text-warm-darker">
                {item.title}
              </h3>
              <p className="text-sm text-warm-dark mb-3">
                {item.issuer}
              </p>
              <p className="text-sm text-warm-base">
                {item.year}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
