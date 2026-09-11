'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface Project {
  id: string;
  title: string;
  slug: string;
  imageUrl: string;
  category?: string | null;
  featured: boolean;
}

// Set once the portfolio PDF is uploaded to Supabase; the page works without it.
const PDF_URL = process.env.NEXT_PUBLIC_PORTFOLIO_PDF_URL || '';

export default function PortfolioPage() {
  const t = useTranslations('portfolio');
  const locale = useLocale();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`/api/projects?locale=${locale}`, { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => setProjects(data.projects || []))
      .catch((err) => {
        if (err.name !== 'AbortError') console.error('Error fetching projects:', err);
      })
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, [locale]);

  return (
    <section className="section bg-bg-base">
      <div className="container-custom">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-script text-warm-darker text-center mb-12 md:mb-16"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 1.1 }}
        >
          {t('pageTitle')}
        </motion.h1>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-square rounded-lg bg-greige/20 animate-pulse" />
            ))}
          </div>
        ) : projects.length === 0 ? (
          <p className="text-center py-16 text-warm-dark text-lg font-light">{t('empty')}</p>
        ) : (
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
            }}
          >
            {projects.map((project) => (
              <motion.div
                key={project.id}
                variants={{
                  hidden: { opacity: 0, scale: 0.95 },
                  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
                }}
              >
                <Link href={`/${locale}/project/${project.slug}`} className="group block">
                  <div className="relative aspect-square overflow-hidden rounded-lg">
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-warm-darker/0 group-hover:bg-warm-darker/15 transition-colors duration-300" />
                  </div>
                  <h2 className="font-decorative text-warm-darker text-base md:text-lg mt-3 group-hover:text-peach transition-colors">
                    {project.title}
                  </h2>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}

        {PDF_URL && (
          <div className="text-center mt-16">
            <a
              href={PDF_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-sm uppercase tracking-[0.15em] text-warm-dark hover:text-warm-darker border-b border-greige/60 hover:border-warm-darker pb-1 transition-colors"
            >
              {t('pdfTitle')}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
