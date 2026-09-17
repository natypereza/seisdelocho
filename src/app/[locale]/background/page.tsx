'use client';

import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { CvGrid } from '@/components/CvGrid';

export default function BackgroundPage() {
  const locale = useLocale();

  return (
    <section className="bg-bg-base pt-5 pb-24 md:pt-7 md:pb-32">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            href={`/${locale}`}
            className="mb-10 inline-flex items-center gap-2 text-sm md:mb-12 text-warm-dark transition-colors hover:text-warm-darker"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>

          <h1
            className="text-center font-script text-warm-darker"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 1.1 }}
          >
            Background
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-center text-warm-dark">
            Where I studied, where I&rsquo;ve worked, what I work with, and what I&rsquo;ve trained
            in along the way.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-10 md:mt-14"
        >
          <CvGrid />
        </motion.div>
      </div>
    </section>
  );
}
