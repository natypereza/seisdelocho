'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Experience } from '@/components/Experience';
import { Skills } from '@/components/Skills';
import { Education } from '@/components/Education';
import { Certifications } from '@/components/Certifications';
import { ArrowLeft, Download } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function CVPage() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <>
      {/* CV Header */}
      <section className="gradient-warm py-16 md:py-24">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href={`/${locale}`}
              className="inline-flex items-center gap-2 text-sm text-warm-dark hover:text-warm-darker transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              {t('cv.backHome')}
            </Link>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <h1 className="font-script text-warm-darker mb-4" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 1.1 }}>
                  Natalia Pérez Aguja
                </h1>
                <p className="text-lg md:text-xl text-warm-dark font-light tracking-wide">
                  Brand Manager & Marketing Strategist
                </p>
              </div>
              <a
                href="/cv/natalia-perez-cv.pdf"
                download
                className="inline-flex items-center gap-2 px-6 py-3 bg-warm-darker text-white rounded-full hover:bg-warm-dark transition-colors text-sm font-medium"
              >
                <Download className="w-4 h-4" />
                {t('cv.download')}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Experience />
      <Skills />
      <Education />
      <Certifications />
    </>
  );
}
