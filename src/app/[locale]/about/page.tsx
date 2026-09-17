'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { DynamicImage } from '@/components/DynamicImage';
import { Instagram } from 'lucide-react';

const capabilities = [
  'branding',
  'brand identity',
  'brand strategy',
  'graphic design',
  'content creation',
  'social media management',
  'creative direction',
  'event design',
  'wedding experience',
  'photography',
] as const;

export default function AboutPage() {
  const t = useTranslations();

  return (
    <section className="section bg-bg-base">
      <div className="container-custom">
        <div className="mx-auto grid max-w-5xl grid-cols-1 items-start gap-12 md:grid-cols-[minmax(0,320px)_1fr] md:gap-16">
          {/* Portrait, framed the way the portfolio frames its reel. */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="border-[9px] border-black bg-black leading-[0]"
          >
            <DynamicImage
              category="profile"
              fallbackSrc="/natalia.jpg"
              className="aspect-[3/4] w-full object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <h1
              className="font-script text-warm-darker"
              style={{ fontSize: 'clamp(2.75rem, 6.5vw, 4.75rem)', lineHeight: 0.95 }}
            >
              Hi there!
            </h1>

            <p className="mt-3 font-decorative text-2xl font-extrabold uppercase leading-tight tracking-tight text-warm-darker md:text-3xl">
              I&rsquo;m Natalia P&eacute;rez
            </p>

            <p className="mt-3 text-xs font-bold uppercase tracking-[0.24em] text-greige">
              {t('about.heading')}
            </p>

            <p className="mt-6 max-w-[62ch] text-base leading-relaxed text-warm-dark">
              {t('about.bio')}
            </p>

            <a
              href="https://instagram.com/seisdelocho_"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 border-2 border-warm-darker px-6 py-3 text-sm font-medium uppercase tracking-[0.15em] text-warm-darker transition-all duration-300 hover:bg-warm-darker hover:text-peach"
            >
              <Instagram className="h-4 w-4" />
              @seisdelocho_
            </a>
          </motion.div>
        </div>

        {/* Capability band — the pinstriped strip from the portfolio layout. */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="band-striped mx-auto mt-16 max-w-5xl px-5 py-7 md:mt-20 md:px-8 md:py-9"
        >
          <div className="flex flex-wrap gap-2.5">
            {capabilities.map((c) => (
              <span key={c} className="chip">
                {c}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
