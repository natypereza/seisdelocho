'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { MessageCircle, Instagram, Mail } from 'lucide-react';

export default function ContactPage() {
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
    <section className="section bg-bg-base">
      <div className="container-custom text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-2xl mx-auto"
        >
          {/* Heading */}
          <motion.h1
            variants={itemVariants}
            className="font-script text-warm-darker mb-10"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: 1.1 }}
          >
            {t('heading')}
          </motion.h1>

          {/* WhatsApp - primary */}
          <motion.div variants={itemVariants} className="mb-6">
            <a
              href="https://wa.me/50256968292"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-warm-darker text-white text-sm uppercase tracking-[0.15em] font-medium hover:bg-warm-dark transition-all duration-300 rounded-sm"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp
            </a>
          </motion.div>

          {/* Instagram links */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
          >
            <a
              href="https://instagram.com/seisdelocho"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-warm-darker text-warm-darker text-sm uppercase tracking-[0.15em] font-medium hover:bg-warm-darker hover:text-white transition-all duration-300 rounded-sm"
            >
              <Instagram className="w-4 h-4" />
              @seisdelocho
            </a>
            <a
              href="https://instagram.com/natapereza"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-warm-darker text-warm-darker text-sm uppercase tracking-[0.15em] font-medium hover:bg-warm-darker hover:text-white transition-all duration-300 rounded-sm"
            >
              <Instagram className="w-4 h-4" />
              @natapereza
            </a>
          </motion.div>

          {/* Email */}
          <motion.div variants={itemVariants}>
            <a
              href={`mailto:${t('email')}`}
              className="inline-flex items-center gap-2 text-warm-dark text-sm hover:text-warm-darker transition-colors"
            >
              <Mail className="w-4 h-4" />
              {t('email')}
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
