'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Mail, Phone, Instagram, MapPin } from 'lucide-react';

export function Contact() {
  const t = useTranslations('contact');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="contact" className="section gradient-warm">
      <div className="container-custom text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-2xl mx-auto"
        >
          <motion.h2
            variants={itemVariants}
            className="font-script text-warm-darker mb-6"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: 1.1 }}
          >
            {t('heading')}
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-warm-dark font-light text-lg mb-10"
          >
            {t('dm')}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <a
              href={`mailto:${t('email')}`}
              className="inline-flex items-center gap-2 px-8 py-4 bg-warm-darker text-white text-sm uppercase tracking-[0.15em] font-medium hover:bg-warm-dark transition-all duration-300 rounded-sm"
            >
              <Mail className="w-4 h-4" />
              {t('cta')}
            </a>
            <a
              href={`tel:${t('phone')}`}
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-warm-darker text-warm-darker text-sm uppercase tracking-[0.15em] font-medium hover:bg-warm-darker hover:text-white transition-all duration-300 rounded-sm"
            >
              <Phone className="w-4 h-4" />
              {t('phone')}
            </a>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 text-warm-dark"
          >
            <a
              href="https://instagram.com/seisdelocho_"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm hover:text-warm-darker transition-colors"
            >
              <Instagram className="w-4 h-4" />
              @seisdelocho_
            </a>
            <a
              href="https://instagram.com/natapereza"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm hover:text-warm-darker transition-colors"
            >
              <Instagram className="w-4 h-4" />
              @natapereza
            </a>
            <span className="inline-flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4" />
              {t('location')}
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
