'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { AnimatedSection } from './AnimatedSection';
import { Palette, PenTool, Sparkles } from 'lucide-react';

const serviceIcons = [Palette, PenTool, Sparkles] as const;
const serviceKeys = ['branding', 'content', 'aesthetics'] as const;

export function Services() {
  const t = useTranslations('services');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <AnimatedSection id="services" className="section bg-bg-subtle">
      <div className="container-custom">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="heading-creative gradient-text text-center"
        >
          {t('heading')}
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {serviceKeys.map((key, index) => {
            const Icon = serviceIcons[index];
            return (
              <motion.div
                key={key}
                variants={itemVariants}
                className="text-center group"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                  className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-warm-light/40 to-warm-accent/40 mb-6"
                >
                  <Icon className="w-7 h-7 text-warm-darker" />
                </motion.div>
                <h3 className="text-xl font-medium text-warm-darker mb-3 tracking-wide">
                  {t(`${key}.title`)}
                </h3>
                <p className="text-warm-dark font-light leading-relaxed">
                  {t(`${key}.description`)}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
