'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const services = [
  { key: 'eventDesign', slug: 'event-design' },
  { key: 'weddingExperience', slug: 'wedding-experience' },
  { key: 'brandDesign', slug: 'brand-design' },
  { key: 'creativeSupport', slug: 'creative-support' },
] as const;

export default function ServicesPage() {
  const t = useTranslations('services');
  const locale = useLocale();

  return (
    <section className="section bg-bg-base">
      <div className="container-custom max-w-3xl mx-auto">
        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-decorative text-warm-darker text-center mb-16 md:mb-24"
          style={{ fontSize: 'clamp(1.25rem, 3vw, 2rem)', lineHeight: 1.4 }}
        >
          {t('tagline')}
        </motion.p>

        {/* Service list */}
        <div className="space-y-0">
          {services.map(({ key, slug }, index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
            >
              <Link
                href={`/${locale}/services/${slug}`}
                className="group block py-8 md:py-10 border-b border-greige/40 hover:pl-4 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-decorative text-warm-darker text-2xl md:text-3xl mb-2 group-hover:text-peach transition-colors">
                      {t(`${key}.title`)}
                    </h2>
                    <p className="text-warm-dark font-light text-sm md:text-base">
                      {t(`${key}.tagline`)}
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-greige group-hover:text-warm-darker group-hover:translate-x-1 transition-all flex-shrink-0 ml-4" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
