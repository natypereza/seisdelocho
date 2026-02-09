'use client';

import { Palette, Code, Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { AnimatedSection } from './AnimatedSection';

export function Skills() {
  const t = useTranslations('skills');
  const categories = t.raw('categories');
  const items = t.raw('items');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5,  },
    },
  };

  return (
    <AnimatedSection id="skills" className="section bg-white">
      <div className="container-custom">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-heading text-neutral-900"
        >
          {t('heading')}
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Languages */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-3 mb-6">
              <motion.div
                whileHover={{ scale: 1.2, rotate: 10 }}
                transition={{ duration: 0.3 }}
              >
                <Palette className="w-6 h-6 text-accent" />
              </motion.div>
              <h3 className="text-lg md:text-xl font-medium text-neutral-900">
                {categories.languages}
              </h3>
            </div>
            <ul className="space-y-3">
              {(items.languages as string[]).map((skill, index) => (
                <motion.li
                  key={index}
                  className="text-base text-neutral-700 hover:text-accent transition-colors cursor-pointer"
                  whileHover={{ x: 5 }}
                >
                  {skill}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Design Tools */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-3 mb-6">
              <motion.div
                whileHover={{ scale: 1.2, rotate: -10 }}
                transition={{ duration: 0.3 }}
              >
                <Code className="w-6 h-6 text-accent" />
              </motion.div>
              <h3 className="text-lg md:text-xl font-medium text-neutral-900">
                {categories.design}
              </h3>
            </div>
            <ul className="space-y-3">
              {(items.design as string[]).map((skill, index) => (
                <motion.li
                  key={index}
                  className="text-base text-neutral-700 hover:text-accent transition-colors cursor-pointer"
                  whileHover={{ x: 5 }}
                >
                  {skill}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Strengths */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-3 mb-6">
              <motion.div
                whileHover={{ scale: 1.2, rotate: 10 }}
                transition={{ duration: 0.3 }}
              >
                <Sparkles className="w-6 h-6 text-accent" />
              </motion.div>
              <h3 className="text-lg md:text-xl font-medium text-neutral-900">
                {categories.strengths}
              </h3>
            </div>
            <ul className="space-y-3">
              {(items.strengths as string[]).map((skill, index) => (
                <motion.li
                  key={index}
                  className="text-base text-neutral-700 hover:text-accent transition-colors cursor-pointer"
                  whileHover={{ x: 5 }}
                >
                  {skill}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
