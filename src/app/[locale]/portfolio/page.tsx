'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

// This URL will be set after uploading the PDF to Supabase
// Update it with the actual Supabase public URL from the upload script manifest
const PDF_URL = process.env.NEXT_PUBLIC_PORTFOLIO_PDF_URL || '';

export default function PortfolioPage() {
  const t = useTranslations('portfolio');
  const locale = useLocale();

  return (
    <>
      <Header />
      <main id="main" className="pt-20 md:pt-24">
        <section className="gradient-warm py-12 md:py-16">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link
                href={`/${locale}/#about`}
                className="inline-flex items-center gap-2 text-sm text-warm-dark hover:text-warm-darker transition-colors mb-8"
              >
                <ArrowLeft className="w-4 h-4" />
                {t('backHome')}
              </Link>
              <h1
                className="font-script text-warm-darker mb-4"
                style={{
                  fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                  lineHeight: 1.1,
                }}
              >
                {t('pdfTitle')}
              </h1>
            </motion.div>
          </div>
        </section>

        <section className="container-custom py-8 md:py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            {PDF_URL ? (
              <iframe
                src={`${PDF_URL}#toolbar=0&navpanes=0`}
                className="w-full rounded-xl border-2 border-warm-accent shadow-lg"
                style={{ height: '80vh', minHeight: '600px' }}
                title={t('pdfTitle')}
              />
            ) : (
              <div className="text-center py-16 text-warm-dark">
                <p className="text-lg font-light">Portfolio PDF coming soon.</p>
              </div>
            )}
          </motion.div>
        </section>
      </main>
      <Footer />
    </>
  );
}
