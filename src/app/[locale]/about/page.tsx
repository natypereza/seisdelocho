'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { DynamicImage } from '@/components/DynamicImage';
import { Instagram } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <section className="section bg-bg-base">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center max-w-5xl mx-auto">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <div className="relative w-72 h-72 md:w-96 md:h-96">
              <DynamicImage
                category="profile"
                fallbackSrc="/n-logo.png"
                className="rounded-2xl shadow-xl object-cover w-full h-full"
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1
              className="font-decorative text-warm-darker italic mb-2"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.2 }}
            >
              {t('about.heading')}
            </h1>
            <div className="w-12 h-0.5 bg-peach mb-8" />
            <p className="text-lg text-warm-dark leading-relaxed font-light tracking-wide mb-8">
              {t('about.bio')}
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://instagram.com/seisdelocho"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-warm-darker text-warm-darker text-sm uppercase tracking-[0.15em] font-medium hover:bg-warm-darker hover:text-white transition-all duration-300 rounded-sm"
              >
                <Instagram className="w-4 h-4" />
                @seisdelocho
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
