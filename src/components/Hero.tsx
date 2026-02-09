'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { AnimatedSection } from './AnimatedSection';
import { DynamicImage } from './DynamicImage';

export function Hero() {
  const t = useTranslations();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6,  },
    },
  };

  return (
    <AnimatedSection className="pt-32 md:pt-40 pb-16 md:pb-32 gradient-warm">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20 items-center md:items-start">
          {/* Image */}
          <motion.div
            className="flex justify-center md:justify-start order-first md:order-last"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="relative w-72 h-72 md:w-96 md:h-96">
              <DynamicImage
                category="profile"
                fallbackSrc="/images/profile.jpg"
                priority
                className="rounded-3xl shadow-2xl object-cover w-full h-full transition-transform duration-500 hover:scale-105"
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="md:pl-4"
          >
            <motion.h1
              variants={itemVariants}
              className="heading-script text-warm-darker mb-4 md:mb-6 tracking-tight"
            >
              {t('header.name')}
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-2xl md:text-3xl font-light text-neutral-600 mb-8 md:mb-12 tracking-wide"
            >
              {t('hero.title')}
            </motion.p>
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-neutral-700 mb-8 md:mb-12 leading-relaxed max-w-prose font-light"
            >
              {t('hero.subtitle')}
            </motion.p>
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a
                href={`mailto:${t('contact.email')}`}
                className="px-8 py-3 border-2 border-neutral-900 text-neutral-900 text-center hover:bg-neutral-900 hover:text-white transition-all duration-300 hover:scale-105 inline-block rounded-sm"
              >
                {t('hero.cta')}
              </a>
              <a
                href={`tel:${t('contact.phone')}`}
                className="px-8 py-3 text-neutral-600 text-center hover:text-accent transition-colors inline-block touch-target"
              >
                {t('contact.phone')}
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
}
